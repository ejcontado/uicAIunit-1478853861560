/**
 * Created by anwan on 2016/11/5.
 * ========================================================================
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
    function BannerNavTabContentController() {
        var self = this;
        //n-banner-3rd event  handle
        self.focus = function (evt) {
            var parentLi = angular.element(evt.target).parent();
            var parentSiblingLis = parentLi.parent().children();
            for (var index = 0; index < parentSiblingLis.length; index++) {
                parentSiblingLis.eq(index).removeClass('active');
            }
            parentLi.addClass("active");
        };
    }

    angular.module('wf.angular.bannerNavTabContent', [])
        .component('wfBannerNavTabContent', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/bannerNavTabContent.html',
            bindings: {
                template: '<?'
            },
            controller: BannerNavTabContentController
        });
    }
));
