/**
 * Created by Mikee on 7/28/2016.
 * Angular Version of Lifecycle
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
                factory(angular, require('wulf/calendar'), require('../const/constants'));
                return angular;
            };
        } else {
            factory(angular);
        }
    }(function (angular) {
        'use strict';

        var LifecycleController = function() {
            var ctrl = this;

            ctrl.generateLabelIdNumber = function() {
                // randomly generate unique id for aria-labeledby
                var idNumber = Math.floor(Math.random() * 1000);
                ctrl.labelId = 'lifecycleStepLabel' + idNumber;
            };

            ctrl.generateLabelIdNumber();
        };

        angular.module('wf.angular.lifecycle', [])
            .component('wfLifecycle', {
                templateUrl: 'wf/ng-template/lifecycle/lifecycle.html',
                transclude: true,
                controller: LifecycleController,
                bindings: {
                    isStart: '<?',
                    isEnd: '<?',
                    selected: '<?'
                }
            });
    })
);