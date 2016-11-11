/**
 * Created by Jason on 2016/10/09.
 * Angular Version of Tree-table.
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
    angular
        .module('wf.angular.treeTableService', [])
        .constant('treeTableServiceConst', {
            keys: {
                config: {
                    'hideRoot': 'hideRoot'
                }
            }
        })
        .factory('treeTableService', ['_', 'TreeModel', 'treeTableServiceConst', treeTableService]);

    function treeTableService(_, TreeModel, treeTableServiceConst) {

        return {newInstance: newInstance};

        function newInstance(config) {
            var treeData = {};
            var service = {
                config: config,
                getTreeData: getTreeData,
                getFlattedTreeData: getFlattedTreeData,
                getCheckedNodes: getCheckedNodes,
                reserve: reserve
            };

            return service;

            function reserve(treeDataIn) {
                treeData = new TreeModel().parse(treeDataIn);
                wrapTreeData();
                return treeData;
            }

            function wrapTreeData() {
                treeData.hideRoot = _.get(service.config, "treeTableServiceConst.keys.config.hideRoot", true);
                treeData.model.expanded = !treeData.hideRoot;
                treeData.walk(function (node) {
                    wrapNode(node);
                });
            }

            function wrapNode(node) {
                node.setAllExpanded = function () {
                    this.walk(function (node) {
                        node.setExpanded();
                    });
                };
                node.isExpanded = function () {
                    return this.model.expanded === true;
                };
                node.isSelected = function () {
                    return this.model.selected === true;
                };
                node.unSelect = function () {
                    this.model.selected = false;
                };
                node.toggleSelected = function () {
                    this.model.selected = !this.model.selected;
                };
                node.setExpanded = function () {
                    if (this.hasChildren()) {
                        this.model.expanded = true;
                    }
                };
                node.setCollapsed = function () {
                    var hideRoot = this.getPath()[0].hideRoot;
                    if (this.model.expanded === true) {
                        if (!hideRoot) {
                            this.model.expanded = false;
                        }
                        if (hideRoot && !this.isRoot()) {
                            this.model.expanded = false;
                        }
                    }

                    if (this.hasChildren()) {
                        this.children.forEach(function (n) {
                            n.setCollapsed();
                        });
                    } 
                };
                node.toggleExpand = function () {
                    if (this.model.expanded){
                        this.setCollapsed();
                    }
                    else {
                        this.setExpanded();
                    }
                };

            }

            function getCheckedNodes() {
                return treeData.all(function (node) {
                    return node.model.checked;
                });
            }

            function getTreeData() {
                return treeData;
            }

            function getFlattedTreeData() {
                return treeData.all();
            }

        }
    }
}));








