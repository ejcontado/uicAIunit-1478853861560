/**
 * Created by Aaron on 5/30/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular);
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';

        angular.module('wf.angular.progress', [])
            .component('wfProgress', {
                templateUrl: 'wf/ng-template/progress/progress.html',
                bindings: {
                    percentage: '<',
                    showValue: '<',
                    pattern: '<',
                    active: '<'
                },
                controller: function () {}
            });
    }
));