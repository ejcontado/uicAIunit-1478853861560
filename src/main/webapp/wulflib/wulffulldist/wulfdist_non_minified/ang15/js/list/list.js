/**
 * Created by Mikee on 5/18/2016.
 * Angular Version of List
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular','../const/constants'], factory);
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

    var ListController = function(keyCodeConst,$attrs) {
        var ctrl = this;
        var itemControllers = [];
        var selectedIndex = -1;
        ctrl.focusedIndex = selectedIndex;
        ctrl.selectable = $attrs.type === 'selection';

        ctrl.addItem = function(item, selected) {
            if (item.isFocusable && itemControllers.length === 0) {
                item.tabindex = 0;
            }
            itemControllers.push(item);
            if (selected) {
                selectedIndex = itemControllers.length - 1;
                ctrl.focusedIndex = selectedIndex;
                itemControllers[0].tabindex = -1;
                item.tabindex = 0;
            }
        };

        var findItemIndex = function(item) {
            for (var idx = 0; idx < itemControllers.length; idx++) {
                if (itemControllers[idx] === item) {
                    return idx;
                }
            }
        };

        ctrl.setSelectedItemByIndex = function(index, event) {
            if (selectedIndex !== -1) {
                itemControllers[selectedIndex].toggleSelect(false);
            }
            else {
                itemControllers[0].tabindex = -1;
            }
            itemControllers[index].toggleSelect(true);
            selectedIndex = index;
            ctrl.focusedIndex = selectedIndex;
            if (ctrl.onItemSelected() && typeof(ctrl.onItemSelected) === "function"){
                ctrl.onItemSelected()(index, ctrl.heading, event);
            }
        };

        ctrl.setSelectedItem = function(item, event) {
            var index = findItemIndex(item);
            ctrl.setSelectedItemByIndex(index, event);
        };

        ctrl.$onChanges = function(changesObj) {
            for (var i = 0; i < itemControllers.length; i++){
                itemControllers[i].onChange(changesObj);
            }
        };

        ctrl.setFocusItem = function (item) {
            ctrl.focusedIndex = findItemIndex(item);
        };

        ctrl.handleKeypress = function(event) {
            var ul =  angular.element(event.target).parent().parent().parent();
            switch (event.keyCode) {
                case keyCodeConst.DOWN:
                    if (ctrl.focusedIndex < itemControllers.length - 1) {
                        ctrl.focusedIndex++;
                        ul.find('li')[ctrl.focusedIndex].focus();
                    }
                    break;
                case keyCodeConst.UP:
                    if (ctrl.focusedIndex > 0) {
                        ctrl.focusedIndex--;
                        ul.find('li')[ctrl.focusedIndex].focus();
                    }
                    break;
                case keyCodeConst.SPACE:
                case keyCodeConst.ENTER:
                    if (ctrl.focusedIndex !== -1) {
                        ctrl.setSelectedItemByIndex(ctrl.focusedIndex, event);
                    }
                    break;
                default:
                    break;
            }
            event.preventDefault();
        };
    };
    ListController.$inject = ['WF-KEYCODE-CONST','$attrs'];

    var ListItemController = function() {
        var ctrl = this;

        ctrl.$onInit = function() {
            ctrl.isSelectable = ctrl.listCtrl.selectable;
            ctrl.isDisabled =  ctrl.listCtrl.disable;
            ctrl.isFocusable = ctrl.isSelectable && !ctrl.isDisabled;
            ctrl.tabindex = ctrl.isFocusable ? -1 : undefined;
            ctrl.listCtrl.addItem(this, ctrl.select);
        };

        ctrl.onChange = function(changeObj) {
            if (changeObj.disable !== undefined) {
                ctrl.isDisabled = changeObj.disable.currentValue;
                ctrl.isFocusable = ctrl.isSelectable && !ctrl.isDisabled;
            }
        };

        ctrl.selectThis = function(event) {
            if ((ctrl.isDisabled  === false || ctrl.isDisabled  === undefined) && ctrl.isSelectable === true) {
                ctrl.listCtrl.setSelectedItem(this, event);
            }
        };

        ctrl.toggleSelect = function(isSelected) {
            ctrl.select = isSelected;
            ctrl.tabindex = isSelected ? 0 : -1;
        };

        ctrl.focusThis = function() {
            ctrl.listCtrl.setFocusItem(this);
        };
    };

    angular.module('wf.angular.list',['wf.angular.constants'])
        .component('wfList', {
            transclude: true,
            templateUrl: 'wf/ng-template/list/list.html',
            controller: ListController,
            bindings: {
                disable: '<?',
                design: '@',
                type: '<',
                heading: '@',
                onItemSelected: '&'
            }
        })
        .component('wfListItem', {
            transclude: true,
            templateUrl: 'wf/ng-template/list/listItem.html',
            bindings: {
                select: '<?'
            },
            require: {
                listCtrl: '^wfList'
            },
            controller: ListItemController
        });
}
));
