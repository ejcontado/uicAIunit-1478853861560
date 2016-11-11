/**
 * Created by jiangdai on 2016/6/27.
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

        var InlineInfoController = function (keyCodeConst, $animate, $element) {
            var self = this;
            this.iconClass = '';

            if(self.pattern === 'info'){
                this.iconClass = 'icon modal-info-icon icon-info modal-icon-message';
            } else if(self.pattern === 'error'){
                this.iconClass = 'icon modal-info-icon icon-error modal-icon-errorMessage';
            } else if(self.pattern === 'success'){
                this.iconClass = 'icon modal-info-icon icon-ok modal-icon-message';
            } else if(self.pattern === 'warning'){
                this.iconClass = 'icon modal-info-icon icon-warning modal-icon-message';
            } else {
                self.pattern = 'info';
            }
        };

    InlineInfoController.$inject = ['WF-KEYCODE-CONST', '$animate', '$element'];

        angular.module('wf.angular.inlineinfo', ['wf.angular.constants', 'ngAnimate'])
            .component('wfInlineinfo', {
                transclude: true,
                templateUrl: 'wf/ng-template/inlineinfo/inlineinfo.html',
                bindings: {
                    pattern:'<',
                    message: '<'
                },
                controller: InlineInfoController
            });
    }
));