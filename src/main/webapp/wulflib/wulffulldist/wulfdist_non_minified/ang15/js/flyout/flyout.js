/**
 * Copyright (c) 2015 Nokia Solutions and Networks. All rights reserved
 */
(function(factory) {
        if (typeof define === 'function' && define.amd) {
            define(['angular', '../const/constants'], factory);
        }
        else if (typeof module === 'object' && module.exports) {
            module.exports = function(root, angular) {
                if (angular === undefined) {
                    if (typeof window !== 'undefined') {
                        angular = require('angular');
                    }
                    else {
                        angular = require('angular')(root);
                    }
                }
                factory(angular, require('../const/constants'));
                return angular;
            };
        }
        else {
            factory(angular);
        }
    }(function(angular) {

        var isVislibe = function(element){
            return (element.offsetWidth || element.offsetHeight);
        };

        var flyoutController = function($rootScope, $timeout,$animate,$document, $element, keyCodeConst) {
            var self = this;
            this.show = false;
            if (!self.direction) {
                //set direction to right if it is unset
                self.direction = "right";
            }
            $timeout(function () {
                var container = $element[0].querySelector('.n-flyout-container');
                var contaierWidth = container.offsetWidth;
                var containerHeight = container.offsetHeight;
                var openAnchor =$element[0].querySelector(".n-flyout-open");
                var openHeight = openAnchor.offsetHeight;
                if(self.direction === "left"){
                    angular.element($element[0].querySelector('.n-flyout-open')).addClass("left");
                    angular.element($element[0].querySelector('.n-flyout-menu')).addClass("left");
                    angular.element($element[0].querySelector(".n-flyout")).css("right", (-contaierWidth) + "px");
                    openAnchor.style.right =  (contaierWidth + 1) + "px";
                    openAnchor.style.top =  Math.ceil((containerHeight - openHeight) / 2) + "px";
                }else if(self.direction === "right"){
                    angular.element($element[0].querySelector(".n-flyout")).css("left", (-contaierWidth) + "px");
                    openAnchor.style.left =  (contaierWidth + 1) + "px";
                    openAnchor.style.top =  Math.ceil((containerHeight - openHeight) / 2) + "px";
                }
                container.style.display = "none";
            }, 300);

            this.handleFlyoutOpen = function(event){
                var flyout = $element[0].querySelector(".n-flyout");
                var container =  flyout.querySelector('.n-flyout-container');

                if (isVislibe(container)) {
                    hideFlyout(flyout, self);
                }
                else {
                    showFlyout(flyout, self);
                }
            };
        };

        flyoutController.$inject = ['$rootScope', '$timeout','$animate', '$document', '$element', 'WF-KEYCODE-CONST'];

        function hideFlyout(flyout, self) {
            var container = flyout.querySelector('.n-flyout-container');
            var contaierWidth = container.offsetWidth;
            //var containerHeight = container.offsetHeight;
            switch (self.direction) {
                case 'left':
                    flyout.style.right = -contaierWidth + "px";
                    container.style.display="none";
                    break;
                case 'right':
                    flyout.style.left = -contaierWidth + "px";
                    container.style.display="none";
                    break;
            }
            self.expand = "false";
        }
        var showFlyout = function(flyout,self){
            var container = flyout.querySelector('.n-flyout-container');
            switch (self.direction) {
                case 'left':
                    flyout.style.right = "0px";
                    container.style.display="block";
                    break;
                case 'right':
                    flyout.style.left = "0px";
                    container.style.display="block";
                    break;
            }
            //angular.element(flyout).attr('data-expand', 'true');
            self.expand = "true";
            container.querySelector("a").focus();
            angular.element(container.querySelectorAll("li")).removeClass('selected');
        };

        var flyoutItemController  = function(keyCodeConst, $timeout, $rootScope,$element) {
            var self = this;
            this.displayText = this.value;
            this.handleItemSelected = function(e){
                $element.parent().find("li").removeClass('selected');
                $element.find("li").toggleClass('selected');
                if (self.onClickCallback()) {
                    self.onClickCallback()(e);
                }
            };

            this.keyboardNavigation = function (e) {
                var keyCode = e.keyCode;
                var target = angular.element(e.target);
                var currentItem = target.parent();
                switch (keyCode) {
                    case keyCodeConst.UP:
                        //var isNext = false;
                        handleNavigate(e, currentItem, false);
                        break;
                    case keyCodeConst.DOWN:
                        //var isNext = true;
                        handleNavigate(e, currentItem, true);
                        break;
                    case keyCodeConst.SPACE:
                        e.preventDefault();
                        this.handleItemSelected(e);
                        break;
                }
            };

            var handleNavigate = function (e, currentItem, isNext) {
                e.preventDefault();
                var items = currentItem.parent().parent().find('li');
                var nextIdx = findNextSelectableIdx(currentItem, items, isNext);
                if (nextIdx !== null) {
                    focusElement(items, nextIdx);
                }
            };

            var focusElement = function (items, itemIdx) {
                var elem = getFocusElement(items, itemIdx);
                $timeout(function () {
                    elem.focus();
                }, 0);
            };

            var getFocusElement = function (items, itemIdx) {
                return items[itemIdx].firstElementChild;
            };

            var findNextSelectableIdx = function (currentItem, items, isNext) {
                var currIdx = findItemIndex(currentItem, items);
                // var panesLen = panes.length;
                var nextIdx = null;
                var indexTemp = 0;
                if (isNext) {
                    for (indexTemp = ++currIdx; indexTemp < items.length; indexTemp++) {
                        if (!items[indexTemp].firstElementChild.disabled) {
                            nextIdx = indexTemp;
                            break;
                        }
                    }
                } else {
                    for (indexTemp = --currIdx; indexTemp >= 0; indexTemp--) {
                        if (!items[indexTemp].firstElementChild.disabled) {
                            nextIdx = indexTemp;
                            break;
                        }
                    }
                }
                return nextIdx;
            };

            var findItemIndex = function (currentItem, items) {
                var index = null;
                for (var idx = 0; idx < items.length; idx++) {
                    if (items[idx] === currentItem[0]) {
                        index = idx;
                        break;
                    }
                }
                return index;
            };
        };

        flyoutItemController.$inject = ['WF-KEYCODE-CONST', '$timeout', '$rootScope','$element'];

        angular.module('wf.angular.flyout', ['wf.angular.constants','ngAnimate']).component('wfFlyout', {
            transclude: true,
            templateUrl: 'wf/ng-template/flyout/flyout.html',
            bindings: {
                direction: '@'
            },
            controller: flyoutController
        }).component('wfFlyoutItem', {
            templateUrl: 'wf/ng-template/flyout/flyoutItem.html',
            require: {
                parent: '^^wfFlyout'
            },
            bindings: {
                value: '@',
                onClickCallback:'&'
            },
            controller: flyoutItemController
        });
    })
);