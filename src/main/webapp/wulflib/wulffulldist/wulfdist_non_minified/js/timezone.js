/**
 * Created by jiangdai on 4/14/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'moment-timezone', 'bootstrap', 'fuelux/selectlist', 'malihu-custom-scrollbar-plugin',
            './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('moment-timezone'), require('bootstrap'), require('fuelux/selectlist'),
                require('malihu-custom-scrollbar-plugin'), require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($, moment) {

        'use strict';

        // TIMEZONE CLASS DEFINITION
        // =========================

        var Timezone = function (element, cities) {
            var $timezone = $(element);

            // Add n-timezone class if not exist
            if (!$timezone.hasClass('n-timezone')) {
                $timezone.addClass('n-timezone');
            }

            // get timezone by moment-timezone API
            if (!cities) {
                cities = getTimezones();
            }

            // sort timezone
            sortTimezones(cities);

            // append timezone items to pulldown list
            var $dropDown = $timezone.find('ul');
            $dropDown.append(buildDropdownMenuItems(cities, null));

            // generate the pulldown list by Fuelux API -- selectlist
            $timezone.selectlist();

            // add filter input field
            var filterHtml = '<div class="filter-input"><div class="n-inputfield-clearable n-inputfield-filter"><a class="n-inputfield-filter-icon"><span class="icon icon-filter"></span></a><input type="text" class="form-control n-inputfield n-inputfield-small" placeholder="Filter..."><a href="javascript:void(0)" class="n-inputfield-control-icon n-inputfield-control-icon-small" style="display: none;"><span role="button" aria-label="clear textfield content" class="icon icon-close"></span></a></div><div class="seperator"></div></div>';
            $dropDown.before(filterHtml);
            $timezone.find(".filter-input").hide();

            // Set default timezone based on client's timezone
            setDefaultTimezone($timezone);

            // generate scroll pulldown menu by mCustomerScroll API
            $dropDown.mCustomScrollbar({
                keyboard: { enable: false }
            });

            // Add events to timezone selectlist
            // =================================

            // Do filter when user type in
            $timezone.find(".n-inputfield-clearable input").on('keyup', function (event) {
                var inputValue = event.target.value;
                var controlIcon = $(event.target).next('.n-inputfield-control-icon');
                if (inputValue.length > 0) {
                    controlIcon.show();
                } else {
                    controlIcon.hide();
                }
                doFilter(inputValue, $(event.target));
            });

            // Clear input field by cancel button
            $timezone.find(".n-inputfield-control-icon").on("click", function (event) {
                event.stopPropagation();
                var prev = $(this).prev();
                if (prev.hasClass('n-inputfield')) {
                    prev.focus();
                    var $combobox = $(this).closest('.n-timezone');
                    clearFilterInputField($combobox);
                    resetAllItems($combobox);
                }
            });

            // Clear up all filtered result once user selects.
            $timezone.on('changed.fu.selectlist', function () {
                resetAllItems($(this));
                clearSelectedStrongItems($(this));
                clearFilterInputField($(this));
            });

            // Show and focus in filter input field when dropdown expanded.
            $timezone.on('shown.bs.dropdown', function () {
                var $combobox = $(this);
                $combobox.find('.filter-input').show();
                $combobox.find('.filter-input input').focus();
                var selectedIndex = $combobox.find('ul').find('[data-selected=true]').index();
                $combobox.find('ul')
                    .mCustomScrollbar("scrollTo", $combobox.find('ul').find('li:eq(' + selectedIndex + ')'), { scrollInertia: 0 });
            });

            // Hide filter input field when dropdown unexpanded
            $timezone.on('hide.bs.dropdown', function () {
                $(this).find('.filter-input').hide();
            });

            // Avoid closing the dropdown when click on scrollbar
            $timezone.on("click", '.mCSB_dragger_bar', function (e) {
                e.stopPropagation();
            });

            // Keyboard support -- Move focus to first visible item
            $timezone.on("keydown", '.filter-input', function (e) {
                // If trigger Down Arrow key
                if (e.keyCode === 40) {
                    e.preventDefault();
                    $(this).next('ul').find('li').each(function () {
                        if (isInViewPort($(this)) === true) {
                            $(this).children('a').focus();
                            return false;
                        }
                    });
                }
                // If Esc key
                if (e.keyCode === 27) {
                    $(this).prev('button').trigger('click');
                    $(this).prev('button').trigger('focus');
                }


                // Temporary solution for "shift+(".
                // Cannot find the root cause why focus will move to dropdown item when type in the character match the item's first character.
                if (e.keyCode === 57 && e.shiftKey) {
                    e.preventDefault();
                    $(this).find('input').val('(');
                }
            });

            // Keyboard support -- Move focus to filter input field
            $timezone.on("keydown", '.dropdown-menu li', function (e) {
                // If trigger Up Arrow key
                if (e.keyCode === 38) {
                    if ($(this).is(':visible') && isFirstVisibleItem($(this))) {
                        e.stopPropagation();
                        $(this).closest('.n-timezone').find('.filter-input input').focus();
                    }
                }
            });
        };

        Timezone.VERSION = '1.1.0';

        // TIMEZONE INTERNAL METHODS DEFINITION
        // ====================================

        function doFilter(inputValue, input) {
            var $dropDown = input.closest('.n-timezone').find('ul');
            $dropDown.find('li').each(function () {
                var timezoneString = $(this).find('span').html();
                timezoneString = timezoneString.replace('<strong>', '').replace('</strong>', '');
                if (timezoneString.toUpperCase().indexOf(inputValue.toUpperCase()) < 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                    var subIndex = timezoneString.toUpperCase().indexOf(inputValue.toUpperCase());
                    var subString = timezoneString.substring(subIndex, subIndex + inputValue.length);
                    timezoneString = timezoneString.replace(subString, '<strong>' + subString + '</strong>');
                }
                $(this).find('span').html(timezoneString);
            });
        }

        function resetAllItems($combobox) {
            $combobox.find('li').each(function () {
                var timezoneString = $(this).find('span').html();
                timezoneString = timezoneString.replace('<strong>', '').replace('</strong>', '');
                $(this).find('span').html(timezoneString);
                $(this).show();
            });
        }

        function clearSelectedStrongItems($combobox) {
            var selectedString = $combobox.find('.selected-label > span').html();
            selectedString = selectedString.replace('<strong>', '').replace('</strong>', '');
            $combobox.find('.selected-label > span').html(selectedString);
        }

        function clearFilterInputField($combobox) {
            var input = $combobox.find('.filter-input input');
            input.val('');
            input.next('.n-inputfield-control-icon').hide();
        }

        function sortTimezones(zones) {
            zones.sort(function (a, b) {
                var offsetA = parseInt(a.offset.replace(":", ""), 10);
                var offsetB = parseInt(b.offset.replace(":", ""), 10);
                if (offsetA - offsetB !== 0) {
                    return offsetA - offsetB;
                } else {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }
            });
        }

        function getTimezones() {
            var cities = [];
            var zones = moment.tz.names();
            for (var key in zones) {
                if (zones.hasOwnProperty(key) && zones[key] !== undefined) {
                    cities.push({ name: zones[key], offset: moment.tz(zones[key]).format('Z') });
                }
            }
            return cities;
        }

        function setDefaultTimezone($timezone) {
            var currentOffset = 'Etc/GMT' + (new Date().getTimezoneOffset() / 60);
            $timezone.find('li').each(function () {
                if ($(this).data('value') === currentOffset) {
                    $timezone.selectlist('selectByValue', currentOffset);
                }
            });
        }

        function buildDropdownMenuItems(zones, selectedValue) {
            var html = '';
            for (var i = 0; i < zones.length; i++) {
                var zone = zones[i];
                if (selectedValue === zone.name) {
                    html += '<li data-value="' + zone.name + '" data-offset="' + zone.offset + '" data-selected="true"><a href="#"><span>(GMT ' + zone.offset + ') ' + zone.name + '</span></a></li>';
                } else {
                    html += '<li data-value="' + zone.name + '" data-offset="' + zone.offset + '"><a href="#"><span>(GMT ' + zone.offset + ') ' + zone.name + '</span></a></li>';
                }
            }
            return html;
        }

        function isFirstVisibleItem($item) {
            var isFirstVisible = true;
            $item.prevAll('li').each(function () {
                if ($(this).is(':visible')) {
                    isFirstVisible = false;
                    return false;
                }
            });
            return isFirstVisible;
        }

        function validTimezone(timezone) {
            var isValid = false;
            var temp = timezone.split('|');
            if (temp.length === 2) {
                var name = temp[0];
                var offset = temp[1];
                var nameReg = new RegExp('\\S*\\/\\S*');
                var offsetReg = new RegExp('^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$');
                if (offset.match(offsetReg) !== null && name.match(nameReg) !== null) {
                    isValid = true;
                }
            }
            return isValid;
        }

        function getSelectedValue($combobox) {
            var selectedValue = '';
            $combobox.find('li').each(function () {
                if ($(this).data('selected') === true) {
                    selectedValue = $(this).data('value');
                    return false;
                }
            });
            return selectedValue;
        }

        function isInViewPort($el) {
            var content = $el.parents(".mCSB_container"), wrapper, cPos;
            if (!content.length) {
                return;
            }
            wrapper = content.parent();
            cPos = [content[0].offsetTop, content[0].offsetLeft];
            return cPos[0] + _childPos($el)[0] >= 0 && cPos[0] + _childPos($el)[0] <= wrapper.height() - $el.outerHeight(false) &&
                cPos[1] + _childPos($el)[1] >= 0 && cPos[1] + _childPos($el)[1] <= wrapper.width() - $el.outerWidth(false);
        }

        function _childPos(el) {
            var p = el.parents(".mCSB_container");
            return [el.offset().top - p.offset().top, el.offset().left - p.offset().left];
        }

        // TIMEZONE PLUGIN DEFINITION
        // ==========================

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('wf.timezone');

                if (!data && !option) {
                    $this.data('wf.timezone', (data = new Timezone(this)));
                }
                else if (!data && Object.prototype.toString.call(option) === '[object Array]') {
                    $this.data('wf.timezone', (data = new Timezone(this, option)));
                }
                if (typeof option === 'string') {
                    data[option].call($this);
                }
            });
        }

        // TIMEZONE TOOLTIP DEFINITION
        // ==========================

        function getCurrentStrWidth(text, element) {
            var currentObj = $('<span>').hide().appendTo(document.body);
            if (element.css("font") !== "") {
                $(currentObj).html(text).css("font",element.css("font"));
            }
            else {
                $(currentObj).html(text).css("font-size",element.css("font-size"));
            }
            var width = currentObj.width();
            currentObj.remove();
            return width;
        }

        function showDropdownItemTooltip() {
            /*jshint validthis:true */
            var $selectedElement = $(this);
            $selectedElement.removeAttr("data-original-title");
            $selectedElement.removeAttr("title");
            var $span = $selectedElement.find('span').not(".checkbox");
            var currentWidth = getCurrentStrWidth($span.html(), $span);
            if (currentWidth >= $selectedElement.width()) {
                $span.addClass("active");
                $span.css("border-bottom-color", "transparent");
                $selectedElement.attr("data-original-title", $($span).text());
                $selectedElement.tooltip("show");
            }
            else {
                $selectedElement.tooltip("hide");
            }
        }

        function showDropdownBtnTooltip() {
            /*jshint validthis:true */
            var $selectedElement = $(this);
            $selectedElement.removeAttr("data-original-title");
            $selectedElement.removeAttr("title");
            var $span = $selectedElement.find('.selected-label');
            var $trueSpan = $span.find("span");
            var valueLen = 0;
            var valuehtml = '';
            for (var i = 0; i < $trueSpan.length; i++) {
                valueLen += $($trueSpan[i]).width();
                valuehtml = valuehtml.concat($($trueSpan[i]).html());
            }
            var currentWidth = getCurrentStrWidth(valuehtml, $span);
            if (currentWidth >= $span.width()) {
                $selectedElement.attr("data-original-title", valuehtml);
                $selectedElement.tooltip("show");
            }
            else {
                $selectedElement.tooltip("hide");
            }
        }

        var old = $.fn.nTimezone;

        $.fn.nTimezone = Plugin;
        $.fn.nTimezone.Constructor = Timezone;


        // TIMEZONE NO CONFLICT
        // ====================

        $.fn.nTimezone.noConflict = function () {
            $.fn.nTimezone = old;
            return this;
        };

        // TIMEZONE DATA-API MARKUP
        // ========================

        $(function () {
            $('[data-markup^="timezone"]').each(function () {
                $(this).nTimezone();
            });
        });

        $(document)
            .on("mouseenter", ".n-timezone .dropdown-menu li a", showDropdownItemTooltip)
            .on("focus", ".n-timezone .dropdown-menu li a", showDropdownItemTooltip)
            .on("mouseleave", ".n-timezone .dropdown-menu li a", function () {
                var $selectedElement = $(this);
                var $span = $selectedElement.find('span').not(".checkbox");
                $span.css("border-bottom-color", "");
                $span.removeClass("active");
            })
            .on("blur", ".n-timezone .dropdown-menu li a", function () {
                var $selectedElement = $(this);
                var $span = $selectedElement.find('span').not(".checkbox");
                $span.css("border-bottom-color", "");
                $span.removeClass("active");
            })
            .on("mouseenter", ".n-timezone [data-toggle='dropdown']", showDropdownBtnTooltip)
            .on("focus", ".n-timezone [data-toggle='dropdown']", showDropdownBtnTooltip)
            .on("mouseleave", ".n-timezone [data-toggle='dropdown']", function () {
                var $selectedElement = $(this);
                $selectedElement.tooltip("hide");
            });

        // TIMEZONE EXTENDED METHODS
        // =========================

        $.fn.extend({
            setDefaultZone: function (value) {
                var $combobox = $(this);
                $combobox.find('li').each(function () {
                    if ($(this).data('value') === value) {
                        $combobox.selectlist('selectByValue', value);
                    }
                });
            },

            addZone: function (value) {
                var zones = [];
                $(this).find('li').each(function () {
                    zones.push({ name: $(this).data('value'), offset: $(this).data('offset') });
                });

                var values = [];
                if ($.isArray(value)) {
                    for (var key in value) {
                        if (value.hasOwnProperty(key) && value[key] !== undefined) {
                            if (validTimezone(value[key])) {
                                values = value[key].split('|');
                                zones.push({ name: values[0], offset: values[1] });
                            }
                        }
                    }
                } else {
                    if (validTimezone(value)) {
                        values = value.split('|');
                        zones.push({ name: values[0], offset: values[1] });
                    }
                }

                sortTimezones(zones);
                $(this).find('.mCSB_container').html(buildDropdownMenuItems(zones, getSelectedValue($(this))));
            },

            removeZone: function (value) {
                var zones = [];
                $(this).find('li').each(function () {
                    var name = $(this).data('value');
                    var offset = $(this).data('offset');
                    if ($.isArray(value)) {
                        if (value.indexOf(name) < 0) {
                            zones.push({ name: name, offset: offset });
                        }
                    } else {
                        if (value !== name) {
                            zones.push({ name: name, offset: offset });
                        }
                    }
                });

                sortTimezones(zones);
                $(this).find('.mCSB_container').html(buildDropdownMenuItems(zones, getSelectedValue($(this))));
            }
        });
    }
));
