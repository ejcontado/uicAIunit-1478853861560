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
    angular.module('wf.angular.treeTableTd', []).component('wfTreeTableTd', {
        templateUrl: 'wf/ng-template/tree-table/treeTable-td.html',
        transclude: true,
        bindings: {
            treeTableTdRenderer: '<?',
            index: '<',
            colData: '<'
        },
        controller: ['$sce', TreeTableTdController]
    });

    function TreeTableTdController($sce) {
        var ctrl = this;

        var externalRender = ctrl.treeTableTdRenderer(ctrl.colData, ctrl.index);

        if (!externalRender) {
            ctrl.toAppendHtml = $sce.trustAsHtml(ctrl.colData[ctrl.index]);
        } 
        else {
            ctrl.toAppendHtml = $sce.trustAsHtml(externalRender);
        }
    }
}));




