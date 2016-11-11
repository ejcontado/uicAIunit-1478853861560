/**
 * Created by madelos on 2016/10/18
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

    var WizardController = function() {
        var ctrl = this;

        ctrl.steps = [];
        ctrl.selectedStepIdx = -1;

        ctrl.addStep = function(stepCtrl) {
            ctrl.steps.push(stepCtrl);
            if(stepCtrl.setActive) {
                ctrl.selectedStepIdx = ctrl.steps.length - 1;
            }
            ctrl.computeStepDistance();
        };

        ctrl.runStepCallback = function() {
            var stepCtrl = ctrl.steps[ctrl.selectedStepIdx];
            var stepTravCallback = stepCtrl.onStepTraversed;
            if (stepTravCallback() && typeof(stepTravCallback) === "function"){
                stepTravCallback()(ctrl.selectedStepIdx);
            }
        };

        // Per-step distance calculations
        ctrl.computeStepDistance = function() {
            var distance = (100 / (ctrl.steps.length - 1)).toFixed(3);
            var remainder = (40 / (ctrl.steps.length - 1));
            this.stepDistance = { "width" : "calc(" + distance + "% - " + remainder + "px)"};
        };

        ctrl.$postLink = function() {
            ctrl.computeStepDistance();
            ctrl.dialogCtrl.wizardCtrl = this;
        };

        this.nextStep = function() {
            if(ctrl.selectedStepIdx < ctrl.steps.length-1){
                ctrl.steps[ctrl.selectedStepIdx].setActive = false;
                ctrl.selectedStepIdx++;
                ctrl.steps[ctrl.selectedStepIdx].setActive = true;
                ctrl.runStepCallback();
            }
        };

        this.previousStep = function() {
            if(this.selectedStepIdx > 0){
                this.steps[this.selectedStepIdx].setActive = false;
                this.selectedStepIdx--;
                this.steps[this.selectedStepIdx].setActive = true;
                ctrl.runStepCallback();
            }
        };

        this.resetStep = function() {
            if(this.selectedStepIdx !== 0) {
                this.steps[this.selectedStepIdx].setActive = false;
                this.selectedStepIdx = 0;
                this.steps[this.selectedStepIdx].setActive = true;
            }
        };
    };

    var WizardStepController = function() {
        var ctrl = this;

        ctrl.$onInit = function() {
            ctrl.wizardCtrl.addStep(this);
        };
    };

    angular.module('wf.angular.wizard', ['wf.angular.constants'])
        .component('wfWizard', {
            transclude: true,
            templateUrl: 'wf/ng-template/wizard/wizard.html',
            controller: WizardController,
            require: {
                dialogCtrl: '^wfDialog'
            }
        })
        .component('wfWizardStep', {
            transclude: {
                description: 'wfWizardStepDescription',
                content: 'wfWizardStepContent'
            },
            templateUrl: 'wf/ng-template/wizard/wizard-step.html',
            bindings: {
                bulletText: '<',
                setActive: '<?',
                onStepTraversed: '&'
            },
            controller: WizardStepController,
            require: {
                wizardCtrl: '^wfWizard'
            }
        });
}));