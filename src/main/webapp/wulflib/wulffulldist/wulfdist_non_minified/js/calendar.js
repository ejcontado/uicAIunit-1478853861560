/* ========================================================================
 * Calendar: fix bugs and extends function for fuelux datapicker component
 * Fuelux: https://github.com/ExactTarget/fuelux
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', 'fuelux/spinbox', 'fuelux/datepicker', './spinner', './keyboard/keyboard-calendar'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('fuelux/spinbox'), require('fuelux/datepicker'),
                require('./spinner'), require('./keyboard/keyboard-calendar'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var classNoRadiusLb = 'n-inputfield-nonradius-lb';

    if (typeof $.fn.datepicker !== "function") {
        return;
    }

    $(document)
        .on('shown.bs.dropdown hidden.bs.dropdown', '.n-calendar', function () {
            $(this).children('input').toggleClass(classNoRadiusLb);
        })
        .on('blur.wf.calendar', '.n-calendar input', function () {
            var $input = $(this);
            $input.next().find(".dropdown-toggle").attr("aria-expanded", "false");
            if ($input.hasClass(classNoRadiusLb)) {
                $input.removeClass(classNoRadiusLb);
            }
        })
        //down key will result the focus to the back button
        .on('keydown.wf.calendar', '.n-calendar .datepicker-wheels-year', focusToWheelsBack)
        .on('keydown.wf.calendar', '.n-calendar .datepicker-wheels-month', focusToWheelsBack)
        //the focus will be switched to the title after clicking on back or select button.
        .on('click.wf.calendar', '.datepicker-wheels-footer .datepicker-wheels-back', focusToHeaderTitle)
        .on('click.wf.calendar', '.datepicker-wheels-footer .datepicker-wheels-select', focusToHeaderTitle)
        .on('shown.bs.dropdown', '.n-calendar .input-group-btn', onDatePickerExpand)
        .on('scroll.wf.calendar', closeDatePickerOnScroll)
        .on('changed.fu.datepicker', '.datepicker', updateTimer)
        .on('click.wf.calendar', '.n-calendar-lock-past button', DisablePastDays)
        .on('click.fu.datepicker', '.datepicker-calendar tr td', onDateBoxClicked)
        .on('click.wf.calendar', '.n-date-range-end button', DisableDaysBeforeSelected)
        .on('hidden.bs.dropdown', '.n-date-range .n-date-range-start', function () {
            focusToSecondCalendar(this);
        });

    $(window).on('resize.wf.calendar', function() {
        closeDatePickerOnScroll();
        $('.n-calendar').each(function () {
            var input = $(this).find('input');
            if (input.data('position') !== 'fixed') {
                relocateDatePicker($(this));
            }
        });
    });

    function onDateBoxClicked(e) {
        var $btn = $(e.currentTarget).find('button')[0];
        if (e.target !== $btn && $($btn).closest('span').css('display') !== 'none') {
            $btn.click();
        }
    }

    function focusToWheelsBack(evt) {
        if (evt.which === 40) {
            /*jshint validthis:true */
            $(this).nextAll('.datepicker-wheels-footer').find('.datepicker-wheels-back').focus();
            evt.preventDefault();
            evt.stopPropagation();
        }
    }

    function focusToHeaderTitle(evt) {
        /*jshint validthis:true */
        $(this).closest('.datepicker-calendar-wrapper').find('button.title').focus();
        evt.preventDefault();
        evt.stopPropagation();
    }

    function onDatePickerExpand() {
        /*jshint validthis:true */
        relocateDatePicker($(this).closest('.n-calendar'));
    }

    function relocateDatePicker (nCalendar) {
        var wrap = nCalendar.find('.datepicker-calendar-wrapper');
        var wrapExcess = wrap.outerWidth() - nCalendar.width();
        if (nCalendar.find('input').data('position') === 'fixed') {
            if (wrap.length !== 0) {
                wrap.css('position', 'fixed');
                wrap.css('top', nCalendar.offset().top + nCalendar.height() - $(document).scrollTop());
                var leftPos = nCalendar.offset().left - wrap.outerWidth() + nCalendar.width() - $(document).scrollLeft();
                if (leftPos < 0) {//move to right side if clipped on left side
                    leftPos += wrapExcess;
                }
                wrap.css('left', leftPos);
                wrap.css('right', 'auto');
            }
        } else {
            //move to right side if clipped on left side
            if (wrapExcess > nCalendar.offset().left) {
                wrap.css('right', -wrapExcess);
            } else {
                wrap.css('right', 0);
            }
        }
    }

    function closeDatePickerOnScroll() {
        $('.datepicker-calendar-wrapper').each(function () {
            if ($(this).css('display') === 'block') {
                var input = $(this).closest('.n-calendar').find('input');
                if (input.data('position') === 'fixed') {
                    $(this).parent().find('button.dropdown-toggle').trigger('click');
                }
            }
        });
    }

    //Data-API for data-markup=calendar, HTML markup will be generated automatically
    $(function () {
        $('[data-markup^="calendar"]').each(function () {
            if ($(this).parent().find('.datepicker-calendar-wrapper').length === 0) {
                $(this).after('<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>');
            }
        });

        $('[data-markup^="disabled_calendar"]').each(function () {
            if ($(this).parent().find('.datepicker-calendar-wrapper').length === 0) {
                $(this).after('<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" disabled>  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>');
            }
        });

        $('[data-markup^="timer_calendar"]').each(function () {
            if ($(this).parent().find('.datepicker-calendar-wrapper').length === 0) {
                $(this).after('<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table><div class=\"datepicker-calendar-timer\"><div class=\"spinner-container datepicker-calendar-hour\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-minute\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-AMPM\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input id=\"s-normal\" type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield n-inputfield-uneditable\" readonly><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div><input type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield ampm n-inputfield-uneditable\" readonly></div><div class=\"operator-btn\"><button type=\"button\" class=\"btn btn-small now\">Now</button> <button type=\"button\" class=\"btn btn-defaultBlue btn-small done\">Done</button></div></div></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>');
            }
        });

        $('[data-markup^="disabled_timer_calendar"]').each(function () {
            if ($(this).parent().find('.datepicker-calendar-wrapper').length === 0) {
                $(this).after('<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" disabled>  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table><div class=\"datepicker-calendar-timer\"><div class=\"spinner-container datepicker-calendar-hour\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-minute\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-AMPM\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input id=\"s-normal\" type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield n-inputfield-uneditable\" readonly><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div><input type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield ampm n-inputfield-uneditable\" readonly></div><div class=\"operator-btn\"><button type=\"button\" class=\"btn btn-small now\">Now</button> <button type=\"button\" class=\"btn btn-defaultBlue btn-small done\">Done</button></div></div></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>');
            }
        });

        //This is just a workaround method to off the focus event for input field
        //fuelux should provide an option to not to listen it.
        setTimeout(function () {
            $('.datepicker .n-calendar .form-control').off('focus.fu.datepicker');
        }, 25);

    });

    $.fn.datepicker.Constructor.prototype.initTimer = function () {
        //set time setting is shown
        this.options.showTime = true;

        //show timer setting panel
        $(this.$element.find('.datepicker-calendar-timer')).css('display', 'block');

        this.$input.off('blur.fu.datepicker');
        this.$input = this.$element.find('input:first');
        this.$input.on('blur.fu.datepicker', $.proxy(this.inputBlurred, this));

        this.$hour = this.$element.find('.datepicker-calendar-hour .spinbox');
        this.$minute = this.$element.find('.datepicker-calendar-minute .spinbox');
        this.$ampm = this.$element.find('.datepicker-calendar-AMPM .spinbox');

        this.$hour.spinbox('max', 12);
        this.$hour.spinbox('min', 1);
        this.$minute.spinbox('max', 59);
        this.$minute.spinbox('min', 0);
        this.$ampm.spinbox('max', 1);
        this.$ampm.spinbox('min', 0);

        this.$element.find('.now').on('click', showNow);
        this.$element.find('.done').on('click', timeDone);

        this.resetTimer();

        //show time format when it is 12h
        if (this.is12HoursFormat()) { //24 hours H/HH
            $(this.$element.find('.datepicker-calendar-AMPM')).css('display', 'inline-block');
        } else {
            this.$hour.spinbox('max', 23);
            this.$hour.spinbox('min', 0);
        }

        //add default button action for done
        this.$element.on('keyup', '.n-calendar div.dropdown-menu', function (e) {
            var ENTER_KEY = 13;
            if (e.which === ENTER_KEY) {
                timeDone(e);
            }
        });
    };

    $.fn.datepicker.Constructor.prototype.dateClicked = function (e) {
        var $td = $(e.currentTarget).parents('td:first');
        var date;

        if ($td.hasClass('restricted')) {
            return;
        }

        this.$days.find('td.selected').removeClass('selected');
        $td.addClass('selected');

        date = new Date($td.attr('data-year'), $td.attr('data-month'), $td.attr('data-date'));
        this.selectedDate = date;

        if (this.options.showTime) {
            e.stopPropagation();
        } else {
            this.$input.val(this.formatDate(date));
            this.inputValue = this.$input.val();
            this.$input.focus();
            this.$element.trigger('dateClicked.fu.datepicker', date);
        }
    };

    $.fn.datepicker.Constructor.prototype.resetTimer = function () {
        setTime(this.$hour, this.$minute, this.$ampm, new Date(), this.is12HoursFormat());
    };

    $.fn.datepicker.Constructor.prototype.is12HoursFormat = function () {
        return (this.options.momentConfig.format.indexOf('H') < 0);
    };

    $.fn.spinbox.Constructor.prototype.output = function (value, updateField) {
        var ampm = $(this.$element).parent().find('.ampm');
        if (ampm.length > 0) {
            $(ampm[0]).val(value % 2 === 0 ? 'PM' : 'AM');
        }
        value = (value + '').split('.').join(this.options.decimalMark);
        updateField = (updateField || true);

        if (updateField) {
            this.$input.val(value);
        }

        return value;
    };

    $.fn.spinbox.Constructor.prototype.max = function (maxValue) {
        this.options.max = maxValue;
    };

    $.fn.spinbox.Constructor.prototype.min = function (minValue) {
        this.options.min = minValue;
    };

    function setTime(hour, minute, ampm, date, is12HourFormat) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampmValue = 0;

        if (is12HourFormat) {
            if (hours >= 12) {
                ampmValue = 0;
            } else {
                ampmValue = 1;
            }

            if (hours > 12) {
                hours = hours - 12;
            }
        }

        hour.spinbox('value', hours);
        minute.spinbox('value', minutes);
        ampm.spinbox('value', ampmValue);
    }

    function showNow(e) {
        var calendar = $(e.currentTarget).parents('.datepicker');
        var is12HoursFormat = calendar.datepicker('is12HoursFormat');
        var currentDate = new Date();

        //show the correct date
        calendar.datepicker('setDate', currentDate);

        //show the correct time
        var timer = $(e.currentTarget).parents('.datepicker-calendar-timer');
        var hour = timer.find('.datepicker-calendar-hour .spinbox');
        var minute = timer.find('.datepicker-calendar-minute .spinbox');
        var ampm = timer.find('.datepicker-calendar-AMPM .spinbox');
        setTime(hour, minute, ampm, currentDate, is12HoursFormat);
    }

    function timeDone(e) {
        var calendar = $(e.currentTarget).parents('.datepicker');
        var is12HoursFormat = calendar.datepicker('is12HoursFormat');
        var d = calendar.datepicker('getDate');

        var timer = calendar.find('.datepicker-calendar-timer');
        var hour = timer.find('.datepicker-calendar-hour input');
        var minute = timer.find('.datepicker-calendar-minute input');
        var ampm = timer.find('.datepicker-calendar-AMPM .spinbox input');
        var hours = parseInt(hour.val());

        if (is12HoursFormat && ampm.val() === '0') {
            hours += 12;
        }

        d.setHours(hours);
        d.setMinutes(minute.val());
        calendar.datepicker('setDate', d);

        closeCalendar(calendar);
    }

    function closeCalendar(calendar) {
        calendar.find('.input-group-btn').removeClass('open');
        var $input = calendar.find('input:first');
        $input.next().find(".dropdown-toggle").attr("aria-expanded", "false");
        if ($input.hasClass(classNoRadiusLb)) {
            $input.removeClass(classNoRadiusLb);
        }
    }

    function updateTimer(e) {
        var calendar = $(e.currentTarget);
        var date = calendar.datepicker('getDate');
        var is12HoursFormat = calendar.datepicker('is12HoursFormat');
        var hour = calendar.find('.datepicker-calendar-hour .spinbox');
        var minute = calendar.find('.datepicker-calendar-minute .spinbox');
        var ampm = calendar.find('.datepicker-calendar-AMPM .spinbox');

        setTime(hour, minute, ampm, date, is12HoursFormat);
    }

    function DisablePastDays() {
        var calendar = $(this).closest('.n-calendar-lock-past');
        calendar.find('.past').each(function () {
            $(this).find('button').attr('disabled', 'disabled');
        });
    }

    function DisableDaysBeforeSelected() {
        var calendar1 = $(this).closest('.n-date-range').find("div.datepicker").get(0);
        var calendar2 = $(this).closest('.n-date-range').find("div.datepicker").get(1);
        var selectedDate = $(calendar1).datepicker('getDate');
        if (selectedDate.toString() !== 'Invalid Date') {
            $(calendar2).find('.datepicker-calendar tr td').each(function () {
                var currentDate = (parseInt($(this).attr("data-month")) + 1) + '/' + $(this).attr("data-date") + '/' + $(this).attr("data-year");
                if (new Date(currentDate) < selectedDate) {
                    $(this).addClass('past');
                    $(this).find('button').attr('disabled', 'disabled');
                }
                else {
                    $(this).removeClass('past');
                    $(this).find('button').removeAttr('disabled');
                }
            });
        }

    }

    function focusToSecondCalendar(element) {
        var calendar = $(element).closest('.n-date-range').find("div.datepicker").get(1);
        $(calendar).find('input').focus();
    }

    // CALENDAR KEYBOARD ACCESSIBILITY
    // ===============================
    $(document).on('keydown.wf.calendar.keyboard', '.datepicker-calendar-days', $.wfKBCalendar.calendarKeyboardHandler)
        .on('focusin.wf.calendar.keyboard', '.datepicker-calendar-days', $.wfKBCalendar.calendarFocusinHandler);

    // CALENDAR EXTENDED METHODS
    // =========================

    $.fn.extend({
        nDateRangePicker: function (option) {
            $(this).find("div.datepicker").each(function () {
                $(this).datepicker(option);
            });
        }
    });
}
));