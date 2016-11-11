/**
 * Created by anwan on 16/8/3.
 *  ========================================================================
 * © 2016 Nokia. All rights reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants', '../banner/menuBar'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants', '../banner/menuBar'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    function BannerNavTabsController(keyCodeConst, $timeout) {
        var active = null;
        var itemes = this.itemes = [];

        var deActivateTab = function () {
            if ((active >= 0) && (active < itemes.length)) {
                var currActiveItem = itemes[active];
                currActiveItem.selected = false;
            }
        };

        var activateTab = function (activeIdx) {
            var activatingTab = itemes[activeIdx];
            if (activatingTab !== null) {
                activatingTab.selected = true;
                active = activeIdx;
            }
        };

        //Find new tab that can be activated from left to right.
        var findNewActiveTab = function (beginIdx) {
            var itemesLen = itemes.length;
            var idx = beginIdx < (itemesLen - 1) ? (beginIdx + 1) : (itemesLen - 1);
            return itemes[idx];
        };

        var findItemIndex = function (item) {
            var index = null;
            var itemesLen = itemes.length;
            for (var idx = 0; idx < itemesLen; idx++) {
                if (itemes[idx] === item) {
                    index = idx;
                    break;
                }
            }
            return index;
        };

        this.addItem = function (item) {
            itemes.push(item);
            var itemIndex = itemes.length - 1;
            if (active === itemIndex) {
                item.selected = true;
            }
        };

        this.click = function (item, evt) {
            this.selectItem(item, evt);
            this.activateFocusedTab(evt);
            tabContentDisplayControl(angular.element(evt.target).parent().parent());
        };

        this.selectItem = function (item, evt) {
            var index = findItemIndex(item);
            if (index !== null) {
                if (active !== null) {
                    if (active === -1) {
                        active = index;
                    }
                    deActivateTab();
                }
                activateTab(index);
            }
        };

        this.removeItem = function (item) {
            var index = findItemIndex(item);
            if (index !== null) {
                var oldActive = active;
                itemes.splice(index, 1);
                if (index === oldActive) {
                    var newActiveTab = findNewActiveTab(index);
                    if (newActiveTab !== null) {
                        this.selectItem(newActiveTab);
                    }
                } else if (index < oldActive) {
                    active -= 1;
                }
            }
        };

        //keyboard support...
        var focusElement = function (elem) {
            $timeout(function () {
                elem.focus();
            }, 0);
        };

        var findNextSelectTab = function (item) {
            var currIdx = findItemIndex(item);
            var itemesLen = itemes.length;
            var nextIdx = null;
            if (currIdx !== null) {
                nextIdx = currIdx < (itemesLen - 1) ? (currIdx + 1) : currIdx;
                return itemes[nextIdx];
            }
        };

        var findPrevSelectTab = function (item) {
            var currIdx = findItemIndex(item);
            var prevIdx = null;
            if (currIdx !== null) {
                prevIdx = currIdx > 0 ? (currIdx - 1) : currIdx;
                return itemes[prevIdx];
            }
        };

        this.handleKeyDown = function (currFocusItem, evt) {
            var target = angular.element(evt.target);
            switch (evt.keyCode) {
                case keyCodeConst.SPACE:
                case keyCodeConst.ENTER:
                    this.selectItem(currFocusItem, evt);
                    this.activateFocusedTab(evt);
                    tabContentDisplayControl(target.parent());
                    evt.preventDefault();
                    break;
                case keyCodeConst.RIGHT:
                    focusElement(findNextSelectTab(currFocusItem));
                    evt.preventDefault();
                    break;
                case keyCodeConst.DOWN:
                    if (!target.parent().hasClass('dropdown')) {
                        focusElement(findNextSelectTab(currFocusItem));
                        evt.preventDefault();
                    }
                    break;
                case keyCodeConst.LEFT:
                case keyCodeConst.UP:
                    focusElement(findPrevSelectTab(currFocusItem));
                    evt.preventDefault();
                    break;
            }
        };

        this.activateFocusedTab = function (evt) {
            var target = angular.element(evt.target);
            var items = target.parent().parent().parent().find('ul').find('li');

            for (var index = 0; index < items.length; index++) {
                if (items.eq(index).hasClass('active')) {
                    items.eq(index).removeClass('active');
                }
            }
            target.parent().addClass('active');

            // if right most item is selected also activate necessary div
            var barGrayToBlue = angular.element(document.querySelector('.n-banner-2nd-gray-to-blue'));
            if (barGrayToBlue.length > 0) {
                if (target.parent().hasClass("rightmost-tab")) {
                    barGrayToBlue.addClass('active');
                }
                else {
                    barGrayToBlue.removeClass('active');
                }
            }
        };

        function tabContentDisplayControl(target) {
            var index, div = target.find('div');
            var thirdGray = angular.element(document.querySelector('.n-banner-3rd-filler-gray'));
            var navTabContent = angular.element(document).find('wf-banner-nav-tab-content');
            var navTabSubItems = navTabContent.children();

            //used for nav tabs overflow, in this case item1 still show.
            if (((div.length > 0) && (!div.hasClass('n-banner-overflow-control')) || (div.length === 0))) {
                thirdGray.css({display: 'none'});
                for (index = 0; index < navTabSubItems.length; index++) {
                    var navTabSubItem = navTabSubItems.eq(index);
                    if (navTabSubItem.hasClass('n_banner_3rd_subItem')) {
                        navTabSubItem.css({display: 'none'});
                    }
                }
            }

            if (target.hasClass('n-banner-3Link')) {
                thirdGray.css({display: 'block'});
                navTabContent.css({display: 'block'});
                var id = target.find('a')[0].dataset.item;
                var thirdUL = document.getElementById(id);
                if (thirdUL) {
                    angular.element(thirdUL).css({display: 'block'});
                }
            }
        }

        //Lifecycle hooks..
        this.$onInit = function () {
            active = (angular.isDefined(this.active) && !isNaN(this.active)) ? this.active : 0;
        };

        this.$onChanges = function (changesObj) {
            if (changesObj.active) {
                var currentVal = changesObj.active.currentValue;
                if (currentVal && !isNaN(currentVal)) {
                    var item = itemes[Number(currentVal)];
                    if (item) {
                        this.selectItem(item);
                    }
                }
            }
        };

        this.$onDestroy = function () {
            this.destroyed = true;
        };
    }

    BannerNavTabsController.$inject = ['WF-KEYCODE-CONST', '$timeout'];

    var BannerTabItemController = function () {
        this.selected = false;
        this.$onInit = function () {
            this.navTabCtrl.addItem(this);
        };

        //Lifecycle hooks...
        this.$onDestroy = function () {
            if (this.navTabCtrl && !this.navTabCtrl.destroyed) {
                this.navTabCtrl.removeItem(this);
            }
        };
    };

    angular.module('wf.angular.bannerNavTabs', ['wf.angular.constants', 'wf.angular.menuBar'])
        .component('wfBannerNavTabs', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/bannerNavTabs.html',
            bindings: {
                active: '<?'
            },
            controller: BannerNavTabsController
        })
        .component('wfBannerNavTabItem', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/bannerNavTabsItem.html',
            require: {
                navTabCtrl: '^wfBannerNavTabs'
            },
            bindings: {
                label: '@',
                cssClass: '@',
                link: '<',
                dataitem: '<?',
                menuBar: '<?'
            },
            controller: BannerTabItemController
        });
    }
));
