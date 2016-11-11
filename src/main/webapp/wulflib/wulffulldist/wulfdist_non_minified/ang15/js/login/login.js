/**
 * Created by andy on 7/5/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
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
            factory(angular);
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';
        var LoginController = function () {
            this.clickLoginButton = function (event) {
                if (this.onLogin() && typeof(this.onLogin) === 'function') {
                    this.onLogin()(this.usernameValue, this.passwordValue, event);
                }
                this.isAcceptanceShow = (this.loginType === 'acceptance');
                this.usernameValue = '';
                this.passwordValue = '';
                if (this.loginType === 'error'){
                    this.isAlertErrorShow = !this.isAlertErrorShow;
                }
            };
            this.forgotPsw = function (event) {
                this.forgetPasswordVisited = true;
                if (this.forgotPassword() && typeof(this.forgotPassword) === 'function') {
                    this.forgotPassword()(event);
                }
            };
            this.signUp = function (event) {
                if (this.onSignUp() && typeof(this.onSignUp) === 'function') {
                    this.onSignUp()(event);
                }
            };
        };
        LoginController.$inject = [];
        angular.module('wf.angular.login', [])
            .component('wfLogin', {
                templateUrl: 'wf/ng-template/login/login.html',
                transclude: true,
                bindings: {
                    loginType: '<',
                    titleText:'<',
                    version:'<',
                    usernameValue:'<',
                    passwordValue:'<',
                    forgetPasswordVisited:'<',
                    isAcceptanceShow:'<',
                    isAlertErrorShow:'<',
                    copyright:'<',
                    legalcopyText:'<',
                    productText:'<',
                    acceptanceText:'<',
                    errorText:'<',
                    onLogin:'&',
                    forgotPassword:'&',
                    onSignUp:'&'
                },
                controller:LoginController
            });
    }
));