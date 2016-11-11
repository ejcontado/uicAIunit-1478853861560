/**
 * Created by Charles on 8/28/2016.
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
        var spinnerController = function (keyCodeConst) {
            var ctrl = this;
            var min = ctrl.min || 0;
            var max = ctrl.max || 999;
            var init = ctrl.init || min;
            var step = ctrl.step || 1;
            var pattern = ctrl.pattern;
            var disable = ctrl.disable;
            ctrl.quantity = init;
            var oldQuantity = ctrl.quantity;
            if (pattern === 'small'){
                ctrl.class = 'spinbox n-spinbox-small';
            } else {
                ctrl.class = 'spinbox';
            }
            if (disable === undefined){
                ctrl.disable = false;
            }

            ctrl.increase = function (e) {
                updateValue(step, e);

            };
            ctrl.decrease = function (e) {
                updateValue(-step, e);
            };


            //Check input value
            ctrl.checkValue = function (event) {
                var numReg = /^[+-]?\d+(\.\d+)?$/;
                var floatReg = /^[+-]?\d+(\.+)?$/;
                var currentQuantity = ctrl.quantity;
                //Judge whether invalid/valid input
                if (numReg.test(currentQuantity) || currentQuantity === '-' || floatReg.test(currentQuantity) || currentQuantity === '') {
                    if (currentQuantity < min){
                        ctrl.quantity = min;
                    } else if (currentQuantity > max) {
                        ctrl.quantity = max;
                    }
                } else {
                    ctrl.quantity = min;
                }
                if (currentQuantity !== oldQuantity){
                    if (ctrl.onValueChanged() && typeof(ctrl.onValueChanged) === "function") {
                        ctrl.onValueChanged()(ctrl.quantity, event);
                    }
                }
            };


            //Check valid input
            ctrl.checkValid = function(e) {
                if (!isValidKeyCodeForPositiveNumberField(e.keyCode)) {
                    e.preventDefault();
                }
                if (e.keyCode === keyCodeConst.UP) {
                    updateValue(step, e);
                }
                if (e.keyCode === keyCodeConst.DOWN) {
                    updateValue(-step, e);
                }
                oldQuantity = ctrl.quantity;
            };
            function isValidKeyCodeForPositiveNumberField(keyCode) {
                var validKeyCodes = [
                    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // 0-9
                    96, 97, 98, 99, 100, 101, 102, 103, 104, 105, //0-9 numpad
                    189, 109, 110, 190, // comma, decimal
                    37, 39, 9, 8 // arrows, tab, backspace
                ];

                return validKeyCodes.indexOf(keyCode) > -1;
            }

            function updateValue(offset, event) {
                var numReg = /^[+-]?\d+(\.\d+)?$/;
                //Judge whether invalid/valid property
                //Update offset
                if (numReg.test(ctrl.quantity) || ctrl.quantity === 0) {
                    var quantity = parseFloat(ctrl.quantity);
                    quantity = accAdd(quantity,offset);
                    if (quantity < min){
                        ctrl.quantity = min;
                    } else if (quantity > max) {
                        ctrl.quantity = max;
                    } else {
                        ctrl.quantity = quantity;
                    }
                } else {
                    //Reset property to min
                    ctrl.quantity = min;
                }

                if (ctrl.onValueChanged() && typeof(ctrl.onValueChanged) === "function") {
                    ctrl.onValueChanged()(ctrl.quantity, event);
                }
            }

            //Handle accuracy for float /plus
            function accAdd(arg1,arg2) {
                var r1,r2,m;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                }catch (e){
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                }catch (e){
                    r2 = 0;
                }
                m = Math.pow(10,Math.max(r1,r2));
                return (arg1 * m + arg2 * m) / m;
            }
        };
        spinnerController.$inject = ['WF-KEYCODE-CONST'];
        angular.module('wf.angular.spinner', ['wf.angular.constants'])
            .component('wfSpinner', {
                templateUrl: 'wf/ng-template/spinner/spinner.html',
                bindings: {
                    min: '<',
                    max: '<',
                    init:'<',
                    step: '<',
                    pattern: '@',
                    disable: '<?',
                    onValueChanged:'&'
                },
                controller: spinnerController
            });
    }
));