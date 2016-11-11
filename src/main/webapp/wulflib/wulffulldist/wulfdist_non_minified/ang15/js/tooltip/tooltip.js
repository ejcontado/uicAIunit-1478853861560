/**
 * Created by ablir on 7/11/2016.
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants','../helper/position'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants','../helper/position'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    
    angular.module('wf.angular.tooltip',['wf.angular.position'])
        .directive('wfTooltip',['$compile',function($compile) {
            return {
                restrict: 'A',
                transclude: false,
                controller:['$scope','$element','$compile','$timeout','$attrs', function(scope, element, compile, timeout, attrs) {
                    var ctrl = this;

                    var appendTooltip = function() {
                        var describedBy = element.attr('aria-describedby');
                        if (describedBy !== ""&& describedBy !== undefined){
                            return;
                        }
                        var tooltipNum = Math.floor(Math.random() * 100000);
                        var tooltipID = 'tooltip-' + tooltipNum;
                        element.attr('aria-describedby',tooltipID);
                        angular.element(document).find('body').eq(0).append(compile('<div wf-position="'+ attrs.wfLocation +'" id="' + tooltipID + '" class="tooltip fade '+ attrs.wfLocation +'" role="tooltip"' +
                            ' style="display: block; width:initial" >' +
                            '<div class="arrow" style="left: 50%;"></div>' +
                            '<div class="tooltip-inner">' + attrs.wfContext + '</div></div>')(scope));
                    };
                    var deleteTooltip = function() {
                        var describedBy = element.attr('aria-describedby');
                        if (describedBy !== ""|| describedBy !== undefined){
                            var toBeDeleted = angular.element(document.getElementById(describedBy));
                            element.removeAttr('aria-describedby');
                            toBeDeleted.removeClass("in");
                            timeout(function() {
                                toBeDeleted.remove();
                            },100);
                        }
                    };

                    angular.element(element).bind('mouseover', appendTooltip );
                    angular.element(element).bind('mouseleave', deleteTooltip );
                    return this;
                }
                ] };

        }]);

}));

