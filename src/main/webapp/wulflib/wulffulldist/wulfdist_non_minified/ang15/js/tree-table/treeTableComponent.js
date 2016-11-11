/**
 * Created by Jason on 2016/10/09.
 * Angular Version of Tree-table.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'angular',
            '../const/constants',
            './treeTableTdComponent',
            './treeTableService',
            './treeModelService',
            './lodashService'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, 
                require('../const/constants'),
                require('./treeTableTdComponent'),
                require('./treeTableService'),
                require('./treeModelService'),
                require('./lodashService')
            );
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';

    angular.module('wf.angular.treeTable', ['wf.angular.treeTableService', 'wf.angular.treeTableTd', 'wf.angular.treeTableLodashService', 'wf.angular.treeTableTreeModelService']).component('wfTreeTable', {
        templateUrl: 'wf/ng-template/tree-table/treeTable.html',
        transclude: true,
        bindings: {
            treeTableModel: '<',
            tableHeaders: '<',
            checkbox: '<',
            onRowSelected: '<',
            onCheckBoxClicked: '<',
            drawBranchColIndex: '<',
            indentPerLevel: '<?',
            treeTableTdRenderer: '<?'
        },
        controller: [TreeTableController]
    });

    function TreeTableController() {
        var ctrl = this;
        var doesHaveCheckbox = ctrl.checkbox === true;
        ctrl.getIndent = getIndent;
        ctrl.expandAll = expandAll;
        ctrl.collapseAll = collapseAll;
        ctrl.onRowClick = onRowClick;
        ctrl.showTr = showTr;
        ctrl.hasToggleBtn = hasToggleBtn;
        ctrl.hasCheckBox = hasCheckBox;
        ctrl.onToggleExpandClicked = onToggleExpandClicked;
        ctrl.indentPerLevel = ctrl.indentPerLevel || 24;
        ctrl.getTdAlign = getTdAlign;

        function hasCheckBox() {
            return doesHaveCheckbox;
        }

        function hasToggleBtn(item, index) {
            return item.children.length > 0 && index === ctrl.drawBranchColIndex;
        }

        function showTr(item) {
            return (item.isRoot() && !ctrl.treeTableModel.hideRoot ) || (item.parent && item.parent.isExpanded()) || (item.parent === ctrl.treeTableModel && ctrl.treeTableModel.hideRoot);
        }

        function onRowClick(item) {
            var selectedData = ctrl.treeTableModel.first(function (data) {
                return data.isSelected();
            });
            if (selectedData && selectedData !== item) {
                selectedData.unSelect();
            }

            item.toggleSelected();
            if (ctrl.onRowSelected) {
                if (item.isSelected()) {
                    ctrl.onRowSelected(item);
                }
                else {
                    ctrl.onRowSelected();
                }
            }
        }

        function expandAll() {
            ctrl.treeTableModel.setAllExpanded();
        }

        function collapseAll() {
            ctrl.treeTableModel.setCollapsed();
        }

        function onToggleExpandClicked(item, $event) {
            $event.stopPropagation();
            item.toggleExpand();
        }

        function getIndent(item, $index) {
            if ($index !== ctrl.drawBranchColIndex) {
                return {};
            }
            var hasToggleBtn = ctrl.hasToggleBtn(item, $index);
            var depth = item.getPath().length;
            var indent = ctrl.indentPerLevel * (depth - (ctrl.treeTableModel.hideRoot ? 2 : 1));
            return indent > 0 ? {'padding-left': '' + (indent / 14 + (!hasToggleBtn && 1)) + 'em'} : {};
        }

        function getTdAlign ($index){
            var align = ctrl.tableHeaders[$index].textAlign;
            return 'n-tree-table-td-' + align;
        }
    }
}));








