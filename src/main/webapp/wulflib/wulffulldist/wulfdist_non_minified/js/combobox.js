/**
 * Created by linaqiu on 2015/6/3.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery','./dropdowns','fuelux/combobox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./dropdowns'), require('fuelux/combobox'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    $(document).on('click.bs.dropdown.data-api', '[data-toggle="dropdown"]', function () {
        if (!$(this).parents(".combobox").hasClass("n-page-combox")) {
            $(".n-page-combox").removeClass("combobox-open");
        }

        var cbOpen = $(".combobox-open");
        if (cbOpen.length !== 0) {
            if (cbOpen.find("button").get(0) !== $(this).get(0)) {
                cbOpen.toggleClass('combobox-open');
            }
        }

        if ($(this).parents(".combobox").length !== 0) {
            $(this).parents(".combobox").toggleClass('combobox-open');
        }

        var comboBox = $(this).parents(".combobox");
        if ($(comboBox).hasClass("combobox-filter")) {
            var inputFiled = comboBox.find("input");
            inputFiled.focus();
            if ($(comboBox).hasClass("combobox-open")) {
                $(inputFiled).on("input", function () {
                    doFilter(comboBox);
                });

                var allItems = comboBox.find("ul li");
                var size = allItems.size();
                for (var i = 0; i < size; i++) {
                    $(allItems[i]).removeClass("combobox-item-hidden");
                }
            }
            else {
                inputFiled.unbind("input");
            }

            comboBox.find("ul").addClass("combobox-filter-dropdown-menu");
        }
    });

    $(document).on('keydown', '.combobox input', function (e) {
        var comboBox = $(this).parent(".combobox");
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
            var a = jQuery.Event("keydown");
            a.which = e.which;
            comboBox.find("button.dropdown-toggle").trigger(a);
            comboBox.find("button.dropdown-toggle").focus();
        }
        if (comboBox.hasClass("combobox-filter") && !comboBox.hasClass("combobox-open")) {
            if ((e.which === 229 || e.which === 65) || (e.which >= 48 && e.which <= 57) || (e.which > 65 && e.which <= 111) || (e.which >= 186 && e.which <= 222)) {
                comboBox.find("button.dropdown-toggle").trigger("click");
            }
        }
    });

    $(document).on('click.bs.dropdown.data-api', function () {
        var cbOpen = $(".combobox-open");
        if (cbOpen.length !== 0) {
            if (cbOpen.hasClass("combobox-filter")) {

                if (!cbOpen.find("input").is(":focus")) {
                    cbOpen.find("input").unbind("input");
                    cbOpen.removeClass('combobox-open');
                }
                else {
                    cbOpen.find(".input-group-btn").addClass("open");
                    cbOpen.find("button").attr("aria-expanded", "true");
                }
            }
            else {
                cbOpen.removeClass('combobox-open');
            }
        }
    });
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
        if (currentWidth > $selectedElement.width()) {
            $span.addClass("active");
            $span.css("border-bottom-color", "transparent");
            $selectedElement.attr("data-original-title", $($span).html());
            $selectedElement.tooltip("show");
        }
        else {
            $selectedElement.tooltip("hide");
        }
    }
    $(document)
        .on("mouseenter", ".dropdown .dropdown-menu li a", showDropdownItemTooltip)
        .on("focus", ".dropdown .dropdown-menu li a", showDropdownItemTooltip)
        .on("mouseleave", ".dropdown .dropdown-menu li a", function () {
            var $selectedElement = $(this);
            var $span = $selectedElement.find('span').not(".checkbox");
            $span.css("border-bottom-color", "");
            $span.removeClass("active");
        })
        .on("blur", ".dropdown .dropdown-menu li a", function () {
            var $selectedElement = $(this);
            var $span = $selectedElement.find('span').not(".checkbox");
            $span.css("border-bottom-color", "");
            $span.removeClass("active");
        })
        .on("mouseenter", ".n-combobutton .dropdown-menu li a", showDropdownItemTooltip)
        .on("focus", ".n-combobutton .dropdown-menu li a", showDropdownItemTooltip)
        .on("mouseleave", ".n-combobutton .dropdown-menu li a", function () {
            var $selectedElement = $(this);
            var $span = $selectedElement.find('span').not(".checkbox");
            $span.css("border-bottom-color", "");
            $span.removeClass("active");
        })
        .on("blur", ".n-combobutton .dropdown-menu li a", function () {
            var $selectedElement = $(this);
            var $span = $selectedElement.find('span').not(".checkbox");
            $span.css("border-bottom-color", "");
            $span.removeClass("active");
        });
    function doFilter(comboBox) {
        if (comboBox.find("ul").length !== 0) {
            var allItems = comboBox.find("ul li");
            var size = allItems.size();
            if (comboBox.find("input").val() !== "") {
                var inputText = comboBox.find("input").val();
                var reg = "/" + inputText.replace(/\*/g, ".*") + "/gi";
                for (var i = 0; i < size; i++) {
                    if (eval(reg).test(allItems[i].textContent)) {
                        $(allItems[i]).removeClass("combobox-item-hidden");
                    }
                    else {
                        $(allItems[i]).addClass("combobox-item-hidden");
                    }
                }
            }
            else {
                for (var j = 0; j < size; j++) {
                    $(allItems[j]).removeClass("combobox-item-hidden");
                }
            }
        }
    }

    $(document).on('keyup change', '.n-cancel-button input', function (event) {
        var inputValue = event.target.value;
        var controlIcon = $(event.target).next('.n-clear-button-icon');
        if (inputValue.length > 0){
            controlIcon.show();
        }
        else {
            controlIcon.hide();
        }
    });

    $(document).on('click', '.n-clear-button-icon', function () {
        var prev = $(this).prev();
        if (prev.hasClass("n-inputfield")) {
            $(this).hide();
            prev.val("");
            prev.focus();
        }
    });
    $(document).ready(function () {
        $(document).on('shown.bs.dropdown', '.combobox, .n-combobutton', function() {
            $(this).find('ul.dropdown-menu li a').each(function() {
                var $this = $(this);
                var hasTooltip = $this.attr('data-toggle') === "tooltip";
                var hasEllipsis = $this[0].offsetWidth < $this[0].scrollWidth;

                if (hasEllipsis) {
                    if (!hasTooltip) {
                        $this.attr('title', $this.text());
                        $this.attr('data-toggle', "tooltip");
                        $this.attr('data-placement', "right");
                        $this.tooltip();
                    } else {
                        $this.tooltip('enable');
                    }
                } else if (hasTooltip && !hasEllipsis) {
                    $this.tooltip('disable');
                }
            });
        });
    });

    // COMBOBOX KEYBOARD ACCESSIBILITY
    // ===============================
    function comboboxKeyboardHandler(e) {
        var current = $(e.target);
        if (e.keyCode === 13 || e.keyCode === 32) {
            if (current.hasClass('n-filter-clear-control')) {
                e.preventDefault();
                current.find('span').trigger('click');
            }
            if (current.hasClass('n-clear-button-icon')) {
                e.preventDefault();
                current.trigger('click');
            }
        }
        else if (9 === e.keyCode) {
            blurInDropdown(e);
        }
    }

    function blurInDropdown(e) {
        var current = $(e.target);
        if (9 === e.keyCode && e.shiftKey){
            if ((current[0].tagName === 'INPUT') && $(e.currentTarget).hasClass('combobox-open')) {
                $(e.currentTarget).find("button.dropdown-toggle").trigger('click');
            }
            else if (current.hasClass('n-combobutton-btn') && $(e.currentTarget).hasClass('open')) {
                $(e.currentTarget).find("button.dropdown-toggle").trigger('click');
            }
        }
        else if (9 === e.keyCode && !e.shiftKey) {
            if ((current[0].tagName === 'A') && (current.parent().nextAll(':not(.disabled)').length === 0)) {
                $(e.currentTarget).find("button.dropdown-toggle").trigger('click');
            }
        }
    }

    $(document).on('keydown.wf.combobox.keyboard', '.combobox', comboboxKeyboardHandler);
    $(document).on('keydown.wf.combobox.keyboard', '.n-combobutton', blurInDropdown);
}
));