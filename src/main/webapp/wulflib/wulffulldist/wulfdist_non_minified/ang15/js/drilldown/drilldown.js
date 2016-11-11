/**
 * Created by jiangdai on 2016/6/27.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants', '../drilldown/drilldown-handler'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants', '../drilldown/drilldown-handler'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';

        var DrilldownController = function (keyCodeConst, $animate, $element) {
            var ctrl = this;
            ctrl.drilldownItemId = "";
            ctrl.drilldownItemContent = "";
            ctrl.drilldownArrow = false;
            ctrl.height = "100px";

            if(this.identity) {
                ctrl.drilldownItemId = this.identity;
            }

            if( this.content) {
                if(typeof this.content === 'function') {
                    ctrl.drilldownItemContent = this.content()();
                } else {
                    ctrl.drilldownItemContent = this.content;
                }
            }

            if(this.arrow) {
                ctrl.drilldownArrow = this.arrow;
            }

            if(this.height) {
                ctrl.height = this.height;
            }
            
            ctrl.collapseDrilldown = function (drilldownId) {
                var targetContent = document.querySelector("#" + drilldownId);
                angular.element(targetContent).css('height', '0').removeClass('drilldown-expanded').addClass('drilldown-collapsed');
            };

            ctrl.clickStoppropagation = function (event) {
                event.stopPropagation();
            };
        };

        DrilldownController.$inject = ['WF-KEYCODE-CONST', '$animate', '$element'];

        angular.module('wf.angular.drilldown', ['wf.angular.constants', 'ngAnimate'])
            .filter('to_trusted', ['$sce', function($sce){
                return function(text) {
                    return $sce.trustAsHtml(text);
                };
            }])
            .component('wfDrilldown', {
                transclude: true,
                templateUrl: 'wf/ng-template/drilldown/drilldownItem.html',
                bindings: {
                    identity : "@",
                    content: "&",
                    arrow: "<?",
                    height: '@'
                },
                controller: DrilldownController
            });
    }
));
