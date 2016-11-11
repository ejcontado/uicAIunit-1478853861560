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

        var DialogController = function (keyCodeConst, $animate, $element) {
            var self = this;
            this.isShow = false;

            if (this.pattern === undefined){
                this.pattern = 'standard';
            }
            if (this.active === undefined){
                this.active = false;
            }
            if (this.toggleText === undefined){
                this.toggleText = 'link';
            }
            if (this.buttonText === undefined){
                this.buttonText = 'OK';
            }

            this.keydownHandler = function (event) {
                if (event.keyCode === keyCodeConst.ESC){
                    this.open(event);
                }
            };

            this.open = function (event) {
                var modal = $element[0].querySelector('.modal');
                if (this.animation === true){
                    if (!this.isShow){
                        this.isShow = true;
                        $animate.removeClass(modal, 'open').then(function() {
                            $animate.addClass(modal, 'open').then(function() {
                                modal.focus();
                            });
                        });
                    } else {
                        $animate.removeClass(modal, 'open').then(function() {
                            self.isShow  = false;
                        });
                    }
                } else {
                    this.isShow = !this.isShow;
                    if (this.isShow){
                        setTimeout(function() {
                            modal.focus();
                        },0);
                    }
                }
                if (this.onToggle() && typeof(this.onToggle) === 'function') {
                    this.onToggle()(this.isShow, event);
                }

                // On open, run the callback on the selectedStep
                if(self.isWizard && self.wizardCtrl !== undefined && self.isShow) {
                       self.wizardCtrl.runStepCallback();
                }
            };

            this.confirm = function(event) {
                if (this.onConfirm() && typeof(this.onConfirm) === 'function') {
                    this.onConfirm()(event);
                }
                this.open(event);

                // On confirm, reset to step 1
                if(self.isWizard && self.wizardCtrl !== undefined) {
                    self.wizardCtrl.resetStep();
                }
            };

            this.cancel = function(event) {
                if (this.onCancel() && typeof(this.onCancel) === 'function') {
                    this.onCancel()(event);
                }
                this.open(event);

                // On cancel, reset to step 1
                if(self.isWizard && self.wizardCtrl !== undefined) {
                    self.wizardCtrl.resetStep();
                }
            };

            // Prevent the focus out of modal if it is opened.
            document.addEventListener('focus', function(event) {
                var modal = $element[0].querySelector('.modal');
                if (self.isShow && !modal.contains(event.target)) {
                    event.preventDefault();
                    modal.focus();
                }
            }, true);
        };

        DialogController.$inject = ['WF-KEYCODE-CONST', '$animate', '$element'];

        angular.module('wf.angular.dialog', ['wf.angular.constants', 'ngAnimate'])
            .component('wfDialog', {
                transclude: true,
                templateUrl: 'wf/ng-template/dialog/dialog.html',
                bindings: {
                    pattern: '<',
                    titleText: '<',
                    subheader: '<',
                    instruction: '<',
                    active: '<?',
                    confirmBtnText: '<',
                    toggleStyle: '<',
                    toggleText: '<',
                    animation: '<?',
                    isWizard: '<?',
                    onConfirm:'&',
                    onCancel:'&',
                    onToggle:'&'
                },
                controller: DialogController
            });
    }
));
