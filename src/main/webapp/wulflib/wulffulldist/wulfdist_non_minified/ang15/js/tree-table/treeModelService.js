/**
 * Created by Jason on 2016/10/09.
 * Angular Version of Tree-table.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular','./TreeModel','../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('./TreeModel'), require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular, TreeModel){
    'use strict';
    angular
        .module('wf.angular.treeTableTreeModelService', [])
        .factory('TreeModel', function (){
            return TreeModel;
        });
}));
