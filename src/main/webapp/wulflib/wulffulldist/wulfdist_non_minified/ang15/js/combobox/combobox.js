/**
 * Created by jiangdai on 2016/6/14.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

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

        var ComboboxController = function ($document, $element, $timeout, keyCodeConst) {
            var self = this;

            this.isOpen = false;
            this.comboboxClass = [];
            this.dropdownWidth = 0;
            this.selectedItemText = '';
            this.selectedItemValue = '';
            this.menuWidth = '';
            this.menuDisplay = '';

            var closeDropdown = function () {
                setTimeout(function() {
                    if (self.isOpen){
                        self.close();
                    }
                }, 0);
            };

            var hasClass = function (ele, className) {
                return (" " + ele.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1;
            };

            var calculateWidth = function (target) {
                var targetType = target.prop('tagName');
                if (targetType === 'BUTTON') {
                    if (self.isTextfield(self.pattern)) {
                        self.dropdownWidth = target.parent().parent()[0].clientWidth;
                    } else if (self.isMenu(self.pattern)) {
                        self.dropdownWidth = target.parent().find('button')[0].clientWidth + target[0].clientWidth + 2;
                    }
                } else if (targetType === 'SPAN') {
                    if (self.isTextfield(self.pattern)) {
                        self.dropdownWidth = target.parent().parent().parent()[0].clientWidth;
                    } else if (self.isMenu(self.pattern)) {
                        if (target.parent().attr('class') !== undefined) {
                            self.dropdownWidth = target.parent().parent().find('button')[0].clientWidth + target.parent()[0].clientWidth + 2;
                        }
                    }
                }
            };

            this.isTextfield = function (pattern) {
                return pattern === 'textfield' || pattern === 'clearable-textfield';
            };

            this.isMenu = function (pattern) {
                return pattern === 'menu' || pattern === 'sm-menu' || pattern === 'file-selection';
            };

            if (this.pattern === undefined) {
                this.pattern = 'textfield';
            }

            if (this.disable === undefined) {
                this.disable = false;
            }

            if (this.isTextfield(this.pattern)) {
                this.comboboxClass.push('input-group');
                this.comboboxClass.push('combobox');
            } else if (this.isMenu(this.pattern)) {
                this.menuWidth = '100%';
                this.menuDisplay = 'block';
                this.comboboxClass.push('btn-group');
                this.comboboxClass.push('n-combobutton');
                if (this.pattern === 'sm-menu' || this.sizeStyle === 'small') {
                    this.comboboxClass.push('n-combobutton-small');
                }
            }

            this.open = function () {
                this.isOpen = true;
                $timeout(function () {
                    $document.on('click', closeDropdown);
                }, 0);
            };

            this.close = function () {
                this.isOpen = false;
                $timeout(function () {
                    $document.off('click', closeDropdown);
                }, 0);
            };

            this.toggle = function (e) {
                var target = angular.element(e.target);
                var targetType = target.prop('tagName');
                if (targetType === 'INPUT') {
                    this.close();
                } else if (targetType === 'BUTTON' || targetType === 'SPAN' || targetType === 'A') {
                    if (this.isOpen) {
                        this.close();
                    } else {
                        calculateWidth(target);
                        this.open();
                    }
                }
            };

            this.keyboardStepInList = function (e) {
                var keyCode = e.keyCode;
                var target = angular.element(e.target);
                if (keyCode === keyCodeConst.DOWN) {
                    if (hasClass(e.target, "dropdown-toggle")) {
                        e.preventDefault();
                        var items = target.parent().find('ul').find('li');
                        for (var index = 0; index < items.length; index++) {
                            if (!items.eq(index).find('a')[0].disabled) {
                                items.eq(index).find('a')[0].focus();
                                break;
                            }
                        }
                    }
                } else if (keyCode === keyCodeConst.ESC){
                    this.close();
                }
            };

            this.clearContent = function (e) {
                var keyCode = e.keyCode;
                var target = angular.element(e.target);
                if (keyCode === keyCodeConst.SPACE) {
                    e.preventDefault();
                    this.selectedItemText = '';
                    target.parent().find('input')[0].focus();
                } else if (keyCode === undefined) {
                    this.selectedItemText = '';
                    target.parent().parent().find('input')[0].focus();
                }
            };
        };

        ComboboxController.$inject = ['$document', '$element', '$timeout', 'WF-KEYCODE-CONST'];

        var ComboboxItemController = function (keyCodeConst, $timeout, $element) {
            var self = this;
            if (this.disable === undefined) {
                this.disable = false;
            }

            if (this.selected === undefined) {
                this.disable = false;
            }

            if (this.itemText === undefined) {
                this.itemText = this.itemValue;
            }

            this.init = function() {
                if (this.selected){
                    this.parent.selectedItemValue = this.itemValue;
                    if (this.itemText === undefined) {
                        this.parent.selectedItemText = this.itemValue;
                    }else {
                        this.parent.selectedItemText = this.itemText;
                    }
                }
                //For File Selection
                if(this.parent.pattern === "file-selection"){
                    this.fileSelection = function (e) {
                        $element[0].querySelector('.n-file-input').click();
                    };
                    this.clearFile = function () {
                        angular.element($element.parent().parent().parent()[0].querySelector('.n-combobutton-btn>span>span')).html('');
                    };
                    angular.element(document).ready(function () {

                        var fileInput = angular.element($element[0].querySelector('.n-file-input'));
                        fileInput.on('change',function () {
                            var fileName = this.value.split("\\")[this.value.split("\\").length-1];
                            angular.element($element.parent().parent().parent()[0].querySelector('.n-combobutton-btn>span>span')).html(fileName);
                            if (self.getFile() && typeof(self.getFile) === "function"){
                                self.getFile()(fileName,this.value);
                            }
                        });

                    });
                }

            };
            $timeout(function() {
                self.init();
            },0);

            this.selectItem = function (e) {
                this.parent.toggle(e);
                var current = angular.element(e.target);
                this.selected = true;
                this.parent.selectedItemValue = this.itemValue;
                this.parent.selectedItemText = this.itemText;
                if (this.parent.pattern === 'file-selection') {
                  if (current.attr('class') === 'n-file-select') {
                      this.fileSelection();
                  } else {
                      this.clearFile();
                  }
                }
                var focusTarget = null;
                if (this.parent.isTextfield(this.pattern)) {
                    focusTarget = current.parent().parent().parent().parent().find('button')[0];
                    if (focusTarget === undefined) {
                        focusTarget = current.parent().parent().parent().parent().parent().parent().find('button')[0];
                    }
                    focusTarget.focus();
                } else if (this.parent.isMenu(this.pattern)) {
                    focusTarget = current.parent().parent().parent().parent().parent().find('button')[1];
                    if (focusTarget === undefined) {
                        focusTarget = current.parent().parent().parent().parent().parent().parent().parent().find('button')[1];
                    }
                    focusTarget.focus();
                }
                if (this.onItemSelected() && typeof(this.onItemSelected) === "function"){
                    this.onItemSelected()(this.itemValue,this.itemText,e);
                }
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

            var findNextSelectableIdx = function (currentItem, items, isNext) {
                var currIdx = findItemIndex(currentItem, items);
                // var panesLen = panes.length;
                var nextIdx = null;
                var index = 0;
                if (isNext) {
                    for (index = ++currIdx; index < items.length; index++) {
                        if (!items[index].firstElementChild.disabled) {
                            nextIdx = index;
                            break;
                        }
                    }
                } else {
                    for (index = --currIdx; index >= 0; index--) {
                        if (!items[index].firstElementChild.disabled) {
                            nextIdx = index;
                            break;
                        }
                    }
                }
                return nextIdx;
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

            var handleNavigate = function (e, currentItem, isNext) {
                e.preventDefault();
                var items = currentItem.parent().parent().find('li');
                var nextIdx = findNextSelectableIdx(currentItem, items, isNext);
                if (nextIdx !== null) {
                    focusElement(items, nextIdx);
                }
            };
            this.keyboardNavigation = function (e) {
                var keyCode = e.keyCode;
                var target = angular.element(e.target);
                var currentItem = target.parent();
                var isNext = false;
                switch (keyCode) {
                    case keyCodeConst.UP:
                        isNext = false;
                        handleNavigate(e, currentItem, isNext);
                        break;
                    case keyCodeConst.DOWN:
                        isNext = true;
                        handleNavigate(e, currentItem, isNext);
                        break;
                    case keyCodeConst.SPACE:
                        e.preventDefault();
                        this.selectItem(e);
                        break;
                    case keyCodeConst.ESC:
                        e.preventDefault();
                        this.parent.close();
                        break;
                }
            };


        };

        ComboboxItemController.$inject = ['WF-KEYCODE-CONST', '$timeout','$element'];

        angular.module('wf.angular.combobox', ['wf.angular.constants'])
            .component('wfCombobox', {
                transclude: true,
                templateUrl: 'wf/ng-template/combobox/combobox.html',
                bindings: {
                    pattern: '<',
                    disable: '<?',
                    sizeStyle:'<?'
                },
                controller: ComboboxController
            })
            .component('wfComboboxItem', {
                transclude: true,
                templateUrl: 'wf/ng-template/combobox/comboboxItem.html',
                require: {
                    parent: '^^wfCombobox'
                },
                bindings: {
                    pattern: '<',
                    itemValue: '<',
                    itemText: '<',
                    disable: '<?',
                    selected: '<?',
                    onItemSelected:'&',
                    getFile: '&'
                },
                controller: ComboboxItemController
            });
    }
));
