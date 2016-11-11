/**
 * Created by grelin on 2016/6/16.
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';

        var DropdownController = function ($rootScope, $timeout, $document, $element, keyCodeConst) {
            var self = this;

            this.dropdownClass = [];
            this.dropdownClassStr = "";

            this.dropdownButtonClass = [];
            this.dropdownButtonClassStr = '';
            this.show = false;
            this.selectedItem = '';

            this.dropdownClass.push('btn-group');
            this.dropdownClass.push('selectlist');
            this.dropdownClass.push('selectlist-resize');

            this.dropdownButtonClass.push('btn');
            this.dropdownButtonClass.push('btn-default');
            this.dropdownButtonClass.push('dropdown-toggle');

            if (this.pattern === undefined) {
                this.pattern = 'standard';
            } else if (this.pattern === 'small') {
                this.dropdownClass.push('selectlist-small');
            } else if (this.pattern === 'dark') {
                this.dropdownClass.push('selectlist-dark');
            }

            if (this.disable === undefined) {
                this.disable = false;
            } else if (this.disable === true) {
                this.dropdownClass.push("disabled");
                this.dropdownButtonClass.push("disabled");
            }

            this.dropdownClassStr = this.dropdownClass.join(' ');
            this.dropdownButtonClassStr = this.dropdownButtonClass.join(' ');

            this.open = function() {
                this.show = true;
                this.dropdownClass.push("open");
                $timeout(function () {
                    $document.on('click', closeDropdown);
                }, 0);
                this.dropdownClassStr = this.dropdownClass.join(' ');
            };

            this.close = function() {
                this.show = false;
                var indexOfOpenClass = this.dropdownClass.indexOf("open");
                if (indexOfOpenClass > -1) {
                    this.dropdownClass.splice(indexOfOpenClass, 1);
                }
                $timeout(function () {
                    $document.off('click', closeDropdown);
                }, 0);
                this.dropdownClassStr = this.dropdownClass.join(' ');
            };

            var closeDropdown = function() {
                setTimeout(function() {
                    if(self.show){
                        self.close();
                    }
                }, 0);
            };

            this.toggle = function (e) {
                if(this.show) {
                    this.close();
                } else {
                    this.open();
                }
            };

            this.keyboardStepInList = function (e) {
                var keyCode = e.keyCode;
                var target = angular.element(e.target);
                if (keyCode === keyCodeConst.DOWN) {
                    if (e.target.className.replace(/[\n\t]/g, " ").indexOf("dropdown-toggle") > -1) {
                        e.preventDefault();
                        var items = target.parent().find('ul').find('li');
                        for (var index = 0; index < items.length; index++) {
                            if (!items.eq(index).find('a')[0].disabled) {
                                items.eq(index).find('a')[0].focus();
                                break;
                            }
                        }
                    }
                }

                if(keyCode === keyCodeConst.ESC) {
                    this.toggle();
                }
            };
        };

        DropdownController.$inject = ['$rootScope', '$timeout', '$document', '$element', 'WF-KEYCODE-CONST'];

        var DropdownItemController = function (keyCodeConst, $timeout, $rootScope) {
            var self = this;
            this.displayText = '';

            if(this.disable === undefined) {
                this.disable = false;
            }
            
            if(this.label !== undefined) {
                this.displayText = this.label;
            } else {
                this.displayText = this.value;
            }

            if(this.select === true) {
                $timeout(function () {
                    if(self.label !== undefined) {
                        self.parent.selectedItem = self.label;
                    } else {
                        self.parent.selectedItem = self.value;
                    }
                }, 0);
            }

            this.selectItem = function (e) {
                this.parent.toggle(e);
                if(this.label !== undefined) {
                    this.parent.selectedItem = this.label;
                } else {
                    this.parent.selectedItem = this.value;
                }
                if (this.onItemSelected() && typeof(this.onItemSelected) === 'function') {
                    this.onItemSelected()(this.value,this.label,e);
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
                        this.selectItem(e);
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

            var getFocusElement = function (items, itemIdx) {
                return items[itemIdx].firstElementChild;
            };

            var focusElement = function (items, itemIdx) {
                var elem = getFocusElement(items, itemIdx);
                $timeout(function () {
                    elem.focus();
                }, 0);
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
                    }
                }
                return index;
            };
        };

    DropdownItemController.$inject = ['WF-KEYCODE-CONST', '$timeout', '$rootScope'];

        angular.module('wf.angular.dropdowns', ['wf.angular.constants'])
            .component('wfDropdown', {
                transclude: true,
                templateUrl: 'wf/ng-template/dropdowns/dropdowns.html',
                bindings: {
                    pattern: '<',
                    disable: '<?'
                },
                controller: DropdownController
            })
            .component('wfDropdownItem', {
                //transclude: true,
                templateUrl: 'wf/ng-template/dropdowns/dropdownsItem.html',
                require: {
                    parent: '^^wfDropdown'
                },
                bindings: {
                    value: '<',
                    label: '<',
                    disable: '<?',
                    select: '<?',
                    onItemSelected: '&'
                },
                controller: DropdownItemController
            });
        }
));