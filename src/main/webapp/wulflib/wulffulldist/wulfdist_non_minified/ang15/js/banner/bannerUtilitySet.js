/**
 * Created by anwan on 2016/7/13.
 * Angular Version of Banner.
 *  * ========================================================================
 * © 2016 Nokia. All rights reserved.
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
            factory(angular, require());
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    function BannerUtilitySetController() {
    }

    angular.module('wf.angular.bannerUtilitySet', [])
        .component('wfBannerUtilitySet', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/bannerUtilitySet.html',
            bindings: {
                utilitySet: '<'
            },
            controller: BannerUtilitySetController
        });
    }
));
