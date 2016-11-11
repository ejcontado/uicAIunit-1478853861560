/**
 * Created by Charles on 10/8/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'jquery', 'malihu-custom-scrollbar-plugin'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular,require('jquery'),require('malihu-custom-scrollbar-plugin'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
        'use strict';

        angular.module('wf.angular.scrollbar',[])
            .directive('wfScrollbar',[function () {
                return {
                    restrict:'A',
                    transclude: true,
                    scope: {
                        scrollbarConfig: '<scrollbarConfig'
                    },
                    link: function (scope, element) {
                        angular.element(document).ready(function () {
                            var config = scope.scrollbarConfig;
                            var height = config.height;
                            var axis = config.axis;
                            var width = config.width;
                            var onScroll = config.onScroll;
                            if (config.disable){
                                var alwaysShowScrollbar = 2;
                                var theme = 'disabled';
                                var mouseWheel = { enable : false };
                            }
                            setTimeout(function () {
                                $(element).mCustomScrollbar({
                                    setHeight: height,
                                    setWidth: width,
                                    axis: axis,
                                    advanced: { autoExpandHorizontalScroll : true },
                                    alwaysShowScrollbar: alwaysShowScrollbar,
                                    theme: theme,
                                    mouseWheel: mouseWheel,
                                    callbacks: {
                                        onScroll: onScroll
                                    }
                                });
                                $(element).find('.mCSB_inside>.mCSB_container').css('margin-right','0');
                                $(element).find('.mCustomScrollBox').css('padding','0');
                                if (config.disable){
                                    $(element).mCustomScrollbar("disable");
                                    $(element).find('.mCustomScrollBox')[0].tabIndex = -1;
                                    $(element).css('cursor','default');
                                }
                            },0);
                        });
                    }
                };
            }]);
    }
));