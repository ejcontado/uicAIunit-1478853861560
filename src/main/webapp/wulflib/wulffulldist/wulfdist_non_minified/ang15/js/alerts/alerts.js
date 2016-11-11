/**
 * Created by Mikee on 5/18/2016.
 * Angular Version of Alert
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

    var AlertController = function(keyCodeConst, $attrs) {
        var ctrl = this;
        ctrl.closeable = !!$attrs.close;
        ctrl.typeSpecified = !!$attrs.type;

        ctrl.handleKeypress = function (evt) {
            if (evt.keyCode === keyCodeConst.SPACE) {
                evt.preventDefault();
                ctrl.close();
            }
        };
    };
    AlertController.$inject = ['WF-KEYCODE-CONST','$attrs'];

    angular.module('wf.angular.alerts',['wf.angular.constants'])
        .component('wfAlert', {
            transclude: true,
            templateUrl: 'wf/ng-template/alerts/alerts.html',
            bindings: {
                type: '@',
                close: '&'
            },
            controller: AlertController
        });
    }
));