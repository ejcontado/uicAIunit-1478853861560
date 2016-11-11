/**
 * Created by Sam on 9/8/2016.
 * Angular Version of timezone
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'wulf/timezone','../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('wulf/timezone'), require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    var timezoneController = function ($element) {
        var ctrl = this;
        var $timezone = $($element).find("[data-markup^='timezone']");

        $timezone.nTimezone(ctrl.zoneDataBundle);

        if (ctrl.defaultZone) {
            $timezone.setDefaultZone(ctrl.defaultZone);
        }
        if (ctrl.disable === undefined) {
            ctrl.disable = false;
        }
        $timezone.on('click.mo.timezone', 'ul li', function(e) {
            if (ctrl.onItemSelected()) {
                ctrl.onItemSelected()(e);
            }
        });
    };

    timezoneController.$inject = ['$element'];

    angular.module('wf.angular.timezone', [])
        .component('wfTimezone', {
            templateUrl: 'wf/ng-template/timezone/timezone.html',
            bindings: {
                zoneDataBundle: '<',
                defaultZone: '<',
                disable: '<?',
                onItemSelected: '&'
            },
            controller: timezoneController
        });
}));