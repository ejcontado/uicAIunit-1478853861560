/**
 * Created by Sam on 8/29/2016.
 * Angular Version of Tab buttons
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular','../const/constants'], factory);
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
    var actionbuttonsController = function (keyCodeConst) {
        var ctrl = this;
        ctrl.buttonNum = ctrl.buttonInfo.length;

        ctrl.class = "btn-standard";
        if (ctrl.disable === undefined) {
            ctrl.disable = false;
        }
        if (ctrl.pattern === "small") {
            ctrl.class = "btn-small";
        }
        ctrl.clickCallback = function (e) {
            var buttons = e.target.parentElement.children;
            for (var i = 0;i < buttons.length; i++) {
                if (angular.element(buttons[i]).hasClass("selected")) {
                    angular.element(buttons[i]).removeClass("selected");
                }
            }
            if (!angular.element(e.target).hasClass("selected")) {
                angular.element(e.target).addClass("selected");
            }
            if (ctrl.onClickCallback()) {
                ctrl.onClickCallback()(e);
            }
        };
        ctrl.handelKeyboard = function (e, index, isFirst, isLast) {
            var buttonToFocus;
            var buttonIndex;
            if (keyCodeConst.LEFT === e.which && !isFirst) {
                buttonToFocus = e.target.previousElementSibling;
                buttonIndex = index - 1;
                while (buttonIndex > -1) {
                    if (buttonToFocus.disabled) {
                        buttonToFocus = buttonToFocus.previousElementSibling;
                        buttonIndex--;
                    }
                    else {
                        buttonToFocus.focus();
                        break;
                    }
                }
            } else if (keyCodeConst.RIGHT === e.which && !isLast) {
                buttonToFocus = e.target.nextElementSibling;
                buttonIndex = index + 1;
                while (buttonIndex < ctrl.buttonNum) {
                    if (buttonToFocus.disabled) {
                        buttonToFocus = buttonToFocus.nextElementSibling;
                        buttonIndex++;
                    }
                    else {
                        buttonToFocus.focus();
                        break;
                    }
                }
            }
        };
    };

    actionbuttonsController.$inject = ['WF-KEYCODE-CONST'];
    
    angular.module('wf.angular.actionbuttons', ['wf.angular.constants'])
        .component('wfTabButton', {
            templateUrl: 'wf/ng-template/button/actionbuttons.html',
            bindings: {
                buttonInfo: '<',
                disable: '<?',
                pattern: '@',
                onClickCallback: '&'
            },
            controller: actionbuttonsController
        });
}));