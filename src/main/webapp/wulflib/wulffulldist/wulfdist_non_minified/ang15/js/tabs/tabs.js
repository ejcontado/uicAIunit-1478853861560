/**
 * Created by Jonathan on 5/18/2016;
 * Angular version of tabs component;
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        //TODO Jonathan, is the root needed for angular?  Will check it later.
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

        var TabsController = function ($scope, keyCodeConst, $timeout) {
            var oldIndex ;
            var ctrl = this;
            var panes = this.panes = [];

            $scope.$watch('$ctrl.active', function(newVal, oldVal) {
                if((!!newVal) && (newVal!==oldIndex) ){
                    ctrl.select(findTabIndex(newVal));
                }
            });

            function findTabIndex(index) {
                for (var i = 0; i < ctrl.panes.length; i++) {
                    if (i === index) {
                        return i;
                    }
                }
            }

            this.select = function(index, evt){
                var selected = ctrl.panes[index];
                if (selected && !selected.disable){
                    var previousIndex = findTabIndex(oldIndex);
                    var previousSelected = ctrl.panes[previousIndex];
                    if (previousSelected) {
                        previousSelected.onDeselect({
                            $event: evt,
                            $selectedIndex: index
                        });
                        if (evt && evt.isDefaultPrevented()) {
                            return;
                        }
                        previousSelected.selected = false;
                    }

                    selected.onSelect({
                        $event: evt
                    });
                    selected.selected = true;
                    ctrl.active = index;
                    oldIndex = index;
                }
            };

            var deActivateTab = function (deActiveIdx, evt) {
                var currActiveTab = ctrl.panes[deActiveIdx];
                if (currActiveTab){
                    currActiveTab.selected = false;
                }
                return true;
            };

            var activateTab = function (activeIdx, evt) {
                var activatingTab = panes[activeIdx];
                activatingTab.onSelect({
                    $event: evt
                });
                activatingTab.selected = true;
            };

            //Find new tab index that can be activated from left to right.
            var findNewActiveTabIndex = function () {
                var panesLen = panes.length;
                var index = null;
                for (var idx = 0; idx < panesLen; idx++) {
                    if (!panes[idx].disable) {
                        index = idx;
                        break;
                    }
                }
                return index;
            };

            var findPaneIndex = function (pane) {
                var index = null;
                var panesLen = panes.length;
                for (var idx = 0; idx < panesLen; idx++) {
                    if (panes[idx] === pane) {
                        index = idx;
                    }
                }
                return index;
            };

            this.addPane = function (pane) {
                panes.push(pane);
                var paneIndex = panes.length - 1;
                if (ctrl.active === paneIndex) {
                    pane.selected = true;
                }
            };

            this.selectPane = function (pane, evt) {
                var index = findPaneIndex(pane);
                if (index !== null) {
                    if (pane.disable) {
                        return;
                    }
                    //before deactivate, be sure there was active tab before that.
                    if (ctrl.active !== null && !deActivateTab(index, evt)) {
                        return;
                    }
                    deActivateTab(ctrl.active);
                    activateTab(index, evt);
                    ctrl.active = index;
                }
            };

            this.removePane = function (pane) {
                var index = findPaneIndex(pane);
                if (index !== null) {
                    var oldActive = oldIndex;
                    panes.splice(index, 1);
                    if (index === oldIndex) {
                        //If the tab to be closed is the active one, close it and then select a new tab to be active.
                        ctrl.active = null; //because the active tab has been removed, so reset the active to null.
                        var newActiveTabIndex = findNewActiveTabIndex();
                        ctrl.select(newActiveTabIndex);
                    } else if (index < oldIndex) {
                        ctrl.select(findTabIndex(ctrl.active - 1));
                    }
                }
            };

            this.closePane = function (index, evt) {
                index = findTabIndex(index);
                var pane = ctrl.panes[index];

                if ((index !== null) && pane) {
                    if (!pane.disable) {
                        //call onClose to close/destroy the pane content
                        pane.onClose({
                            $event: evt,
                            $closedIndex: index
                        });
                    }
                }
            };

            //keyboard support...
            //TODO Jonathan - not perfect solution to deal with keyboard support:(, need to improve it later.
            var findNextSelectableIdx = function (pane) {
                var currIdx = findPaneIndex(pane);
                var panesLen = panes.length;
                var nextIdx = null;
                for (var index = ++currIdx; index < panesLen; index++) {
                    if (!panes[index].disable) {
                        nextIdx = index;
                        break;
                    }
                }
                return nextIdx;
            };

            var findPrevSelectableIdx = function (pane) {
                var currIdx = findPaneIndex(pane);
                var prevIdx = null;
                for (var index = --currIdx; index >= 0; index--) {
                    if (!panes[index].disable) {
                        prevIdx = index;
                        break;
                    }
                }
                return prevIdx;
            };

            var getFocusElement = function (evt, paneIdx) {
                var ul = angular.element(evt.target).parent().parent();
                return ul.find('li')[paneIdx].firstElementChild;
            };

            var focusElement = function (evt, paneIdx) {
                var elem = getFocusElement(evt, paneIdx);
                $timeout(function () {
                    elem.focus();
                }, 0);
            };

            this.closeKeydown = function (index, evt) {
                var keyCode = evt.which;
                if (keyCode === keyCodeConst.SPACE) {
                    this.closePane(index, evt);
                    evt.preventDefault();
                }
            };

            this.selectKeydown = function (currFocusPane, evt) {
                var nextIdx;
                switch (evt.which) {
                    case keyCodeConst.TAB:
                        nextIdx = findNextSelectableIdx(currFocusPane);
                        if (nextIdx === null) {
                            angular.element(evt.target).parent().next().find('a').attr('tabIndex', -1);
                        }
                        break;
                    case keyCodeConst.SPACE:
                        this.select(findPaneIndex(currFocusPane), evt);
                        evt.preventDefault();
                        break;
                    case keyCodeConst.RIGHT:
                    case keyCodeConst.DOWN:
                        nextIdx = findNextSelectableIdx(currFocusPane);
                        if (nextIdx !== null) {
                            focusElement(evt, nextIdx);
                        }
                        evt.preventDefault();
                        break;
                    case keyCodeConst.LEFT:
                    case keyCodeConst.UP:
                        var prevIdx = findPrevSelectableIdx(currFocusPane);
                        if (prevIdx !== null) {
                            focusElement(evt, prevIdx);
                        }
                        evt.preventDefault();
                        break;
                }
            };

            //Lifecycle hooks..
            this.$onInit = function () {
                this.active = (angular.isDefined(this.active) && !isNaN(this.active)) ? this.active : 0;
                oldIndex = this.active;
            };

            this.$onDestroy = function () {
                this.destroyed = true;
            };

            this.selectNextPane = function (pane) {
                var nextIdx = findNextSelectableIdx(pane);
                if (nextIdx === null) {
                    nextIdx = findNewActiveTabIndex();
                }
                ctrl.select(nextIdx);
            };
        };

        TabsController.$inject = ['$scope', 'WF-KEYCODE-CONST', '$timeout'];

        var PaneController = function ($scope, $attrs) {
            var ctrl = this;
            this.selected = false;
            this.closeable = !!$attrs.close;
            this.$onInit = function () {
                this.tabsCtrl.addPane(this);
            };

            $scope.$watch('$ctrl.disable', function(newVal, oldVal) {
                if ( (newVal !== oldVal) && newVal && ctrl.selected ) {
                    var tabCtrl = ctrl.tabsCtrl;
                    tabCtrl.selectNextPane(ctrl);
                }
            });

            //Lifecycle hooks...
            this.$onDestroy = function () {
                if (this.tabsCtrl && !this.tabsCtrl.destroyed) {
                    this.tabsCtrl.removePane(this);
                }
            };
        };

        PaneController.$inject = ['$scope', '$attrs'];

        angular.module('wf.angular.tabs', ['wf.angular.constants'])
            .component('wfTabs', {
                transclude: true,
                templateUrl: 'wf/ng-template/tabs/tabs.html',
                bindings: {
                    active: '=?'
                },
                controller: TabsController
            })
            .component('wfPane', {
                transclude: true,
                templateUrl: 'wf/ng-template/tabs/tabsItem.html',
                require: {
                    tabsCtrl: '^wfTabs'
                },
                bindings: {
                    label: '@',
                    disable: '<?',
                    onSelect: '&select',
                    onDeselect: '&deselect',
                    onClose: '&close'
                },
                controller: PaneController
            });
    }
));
