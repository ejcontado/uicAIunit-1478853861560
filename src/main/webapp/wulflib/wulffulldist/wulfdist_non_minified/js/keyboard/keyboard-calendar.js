/**
 * Created by jiangdai on 2016/5/10.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard-table'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard-table'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    var ENTER_KEY = 13;
    var SPACE_BAR_KEY = 32;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var TAB_KEY = 9;

    $.wfKBCalendar = {
        calendarKeyboardHandler: function (e) {
            var supportKeys = [TAB_KEY, SPACE_BAR_KEY, ENTER_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY];
            var selectedClassName = 'selected';

            if (supportKeys.indexOf(e.which) === -1) {
                return;
            }

            initDatePickerSelected(e, selectedClassName);

            switch (e.keyCode) {
                case LEFT_KEY:
                case RIGHT_KEY:
                case UP_KEY:
                case DOWN_KEY:
                    handleCalendarDirectionKeyAction(e, selectedClassName);
                    break;
                case TAB_KEY:
                    handleCalendarTabKeyboardAction(e, selectedClassName);
                    break;
                case SPACE_BAR_KEY:
                case ENTER_KEY:
                    $(e.target).find('button').trigger('click');
                    break;
            }
        },

        calendarFocusinHandler: function(e) {
            var td = $(e.target).closest('td');
            if (!td.hasClass('selected')) {
                initDatePickerSelected(e, 'selected');
            }
        }
    };

    // KEYBOARD CALENDAR INTERNAL METHODS
    // ==================================

    function initDatePickerSelected(e, className) {
        var current = $(e.target);
        current.closest('table').find('td').each(function () {
            $(this).removeClass(className);
        });
    }

    function handleCalendarDirectionKeyAction(e, className) {
        $.wfKBTable.handleTableDirectionKeyAction(e, className);
    }

    function handleCalendarTabKeyboardAction(e, className) {
        var current = $(e.target);
        current.removeAttr('tabindex');
        current.closest('.datepicker-calendar-days').find('td').each(function () {
            $(this).removeClass(className);
        });
    }
}
));