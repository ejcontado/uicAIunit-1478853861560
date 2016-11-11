/**
 * Created by Mikee on 7/28/2016.
 * Angular Version of Calendar
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'wulf/calendar', '../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('wulf/calendar'), require('../const/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
        'use strict';

        var CalendarController = function ($element) {
            var ctrl = this;
            var datepickerConfig = {};

            //find Jquery element of datepicker div to use datepicker in
            var jqElement = $($element).find(".datepicker");

            // default WULF Config if config is not passed
            if (ctrl.optionalConfig === undefined) {
                ctrl.optionalConfig = {
                    allowPastDates: true,
                    momentConfig: {
                        culture: 'en',
                        format: 'DD.MM.YYYY'
                    }
                };
            }
            for (var prop in ctrl.optionalConfig) {
                if (ctrl.optionalConfig.hasOwnProperty(prop)) {
                    datepickerConfig[prop] = ctrl.optionalConfig[prop];
                }
            }
            jqElement.datepicker(datepickerConfig);

            /** The fuelux Date instance remains as is from initialization.
             * This gets new Date instance in the case that this component is recompiled. **/
            jqElement.datepicker('setDate', new Date());

            if (ctrl.showTimer === true) {
                jqElement.datepicker('initTimer');
            }

            // Un-listen to datepicker event to prevent default fuelux behavior that datepicker shows upon clicking textbox
            $('.datepicker .n-calendar .form-control').off('focus.fu.datepicker');

            ctrl.confirm = function (event) {
                if (ctrl.onDateSelected() && typeof(ctrl.onDateSelected) === "function") {
                    var date = $(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).datepicker('getDate');
                    ctrl.onDateSelected()(date, event);
                }
            };
        };

        CalendarController.$inject = ['$element'];

        angular.module('wf.angular.calendar', [])
            .component('wfCalendar', {
                templateUrl: 'wf/ng-template/calendar/calendar.html',
                controller: CalendarController,
                bindings: {
                    optionalConfig: '<?',
                    disable: '<?',
                    showTimer: '<?',
                    disablePastDays: '<?',
                    onDateSelected:'&'
                }
            });
    }
));