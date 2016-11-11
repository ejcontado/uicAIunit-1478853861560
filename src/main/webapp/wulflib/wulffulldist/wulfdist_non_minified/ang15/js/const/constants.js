/**
 * Created by Jonathan on 2016/6/7;
 * Angular version of tabs component;
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
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
            factory(angular);
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
        'use strict';
        angular.module('wf.angular.constants', [])
            .constant('WF-KEYCODE-CONST', {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40
            });
    }
));