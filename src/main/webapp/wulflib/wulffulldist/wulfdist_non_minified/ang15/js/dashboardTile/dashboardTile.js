/**
 * Created by Charles on 8/11/2016.
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
            factory(angular, require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    var tileController = function () {
        var ctrl = this;
        var pieData = ctrl.pieData;
        var tileStatus = ctrl.tileStatus;
        var num;

        if (pieData > 0 && pieData <= 100) {
            //Change tile style
            ctrl.warnStatus = true;
            if (pieData === 100) {
                ctrl.warnStatus = false;
                ctrl.normalStatus = true;
            }

            ctrl.maskData = pieData+'%';
            pieData = 100 - pieData;
            //Transform pie circle
            if (pieData > 50){
                ctrl.pieClass = 'progress-pie-chart gt-50';
            } else {
                ctrl.pieClass = 'progress-pie-chart';
            }
            num = 360*pieData/100;
            this.rotate = {
                'transform' : 'rotate(' + num + 'deg)'
            };

        } else {
            ctrl.maskData = 'OFF';
            ctrl.pieClass = 'progress-pie-chart off';
        }

        //Handle block status
        if (tileStatus) {
            ctrl.status = 'Unblocked';
        } else {
            ctrl.status = 'Blocked';
            ctrl.blocked = true;
        }

    };
    tileController.$inject = ['$document'];
    angular.module('wf.angular.dashboardTile', [])
        .component('wfDashboardTile', {
            templateUrl: 'wf/ng-template/dashboardTile/dashboardTile.html',
            bindings: {
                tileTitle: '<',
                tileStatus: '<',
                tileFrq: '<',
                tileId: '<',
                pieData: '<'
            },
            controller: tileController
        });
}
));