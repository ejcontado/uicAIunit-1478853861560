/**
 * Created by jinzhang on 2016/8/1.
 */

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
            factory(angular, require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';

        var footerController = function () {};
    
        footerController.$inject = [];
        angular.module('wf.angular.footer', [])
            .component('wfFooter', {
                templateUrl: 'wf/ng-template/footer/footer.html',
                bindings: {
                    copyright:"<",
                    links: "<",
                    icons:"<"
                },
                controller: footerController
            });
    }
));