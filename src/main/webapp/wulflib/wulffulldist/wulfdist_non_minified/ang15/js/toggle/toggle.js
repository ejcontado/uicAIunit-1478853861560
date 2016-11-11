/**
 * Created by Shawn on 6/30/2016.
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

    function TemplateUrlFunc(elem, attrs) {
        if (attrs.toggleIcon === "true") {
            return 'wf/ng-template/toggle/toggleButton-Icon.html';
        }else {
            return 'wf/ng-template/toggle/toggleButton.html';
        }
    }
    TemplateUrlFunc.$inject = ['$element', '$attrs'];

    var toggleController = function (keyCodeConst) {
        this.ifActive = false;
        this.standardSize = this.size !== "small";
        this.doActive = function(event) {
            this.ifActive = !this.ifActive;
            if (this.onClick() && typeof(this.onClick) === 'function') {
                this.onClick()(event);
            }
        };
        this.doKeyActive = function(evt) {
            var keyCode = evt.which;
            if (keyCode === keyCodeConst.ENTER) {
                this.checked = !this.checked;
                evt.preventDefault();
            }
        };
    };
    toggleController.$inject = ['WF-KEYCODE-CONST'];
    angular.module('wf.angular.toggleButton', ['wf.angular.constants'])
        .component('wfToggleButton', {
            templateUrl: TemplateUrlFunc,
            bindings: {
                toggleId: '@',
                iconDisplayStyle:'@',
                iconClassName:'@',
                text:'@',
                size: '@',
                color: '<',
                disable: '<',
                emphasis:'<',
                checked:'<',
                toggleIcon:'<',
                onClick: '&'
            },
            controller: toggleController
        });
}
));