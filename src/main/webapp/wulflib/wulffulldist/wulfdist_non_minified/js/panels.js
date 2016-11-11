/**
 * Created by lonlin on 10/22/2015.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    $.fn.extend({
        slideToggleVertical: function (options) {
            var $slideBar = $(this);
            var currentImg = $slideBar.find(".icon");
            var speed = 500;
            var isOpen = options && options.isOpen;
            var panelBody = $slideBar.parent().find(".panel-body");
            speed = options && options.speed;
            if (isOpen) {
                $(panelBody).css("display", "block");
                currentImg.removeClass('icon-right').addClass("icon-down");
            }
            else {
                $(panelBody).css("display", "none");
                currentImg.removeClass('icon-down').addClass("icon-right");
            }
            $slideBar.click(function () {
                panelBody.slideToggle(speed, function () {
                    if (panelBody.is(":visible")){
                        currentImg.removeClass('icon-right').addClass("icon-down");
                    } else {
                        currentImg.removeClass('icon-down').addClass("icon-right");
                    }
                });
            });
        },
        slideToggleHorizontal: function (options) {
            var isLeftOpen = options && options.isLeftOpen;
            var leftWidth = options && options.leftWidth;
            var $span = $(this);
            var parentLeft = $span.parent();
            var parentRight = parentLeft.parent().find(".panel-right");
            var panelBody = parentLeft.find(".panel .panel-body");
            var parent = $span.parent().find(".panel");
            var currentImg = $span.find("span");
            var myLeftWidth = typeof(leftWidth) === "undefined" ? 30 : leftWidth;
            var myLeftOpen = typeof(isLeftOpen) === "undefined" ? true : isLeftOpen;
            if (myLeftOpen) {
                parentLeft.css({ width: myLeftWidth + "%" });
                parentRight.css({ width: "calc(" + (100 - myLeftWidth) + "% - " + "20px)", "margin-left": "20px" });
                parentLeft.addClass("panel-shadow");
                parentLeft.find("div").each(function () {
                    $(this).show();
                });
                $span.css({ 'border-top-left-radius': '0px', 'border-bottom-left-radius': '0px' });
                parentRight.addClass("open");
                currentImg.removeClass('icon-right').addClass('icon-left');
            }
            else {
                parentLeft.css({ width: "0" });
                parentRight.css({ width: "calc(100% - 40px)", 'margin-left': '40px' });
                $(parent).find("div").each(function () {
                    $(this).hide();
                });
                parentLeft.removeClass("panel-shadow");
                $span.css({ 'border-top-left-radius': '7px', 'border-bottom-left-radius': '7px' });
                currentImg.removeClass('icon-left').addClass('icon-right');
            }
            $span.click(function () {
                var currentArrow = $(this);
                if (panelBody.is(":visible")) {

                    var leftWidth = parentLeft.width();
                    var rightWidth = parentRight.width();
                    parentLeft.removeClass("panel-shadow");
                    parentLeft.animate({ width: 0 }, "show", function () {
                        $(parent).find("div").each(function () {
                            $(this).hide();
                        });
                        currentArrow.css({ 'border-top-left-radius': '7px', 'border-bottom-left-radius': '7px' });
                        currentImg.removeClass('icon-left').addClass('icon-right');
                    });
                    var current = leftWidth + rightWidth - 20;
                    parentRight.animate({ width: current + "px", 'margin-left': '40px' });

                } else {
                    parentLeft.find("div").each(function () {
                        $(this).show();
                    });
                    parentRight.css({ width: "calc(" + (100 - myLeftWidth) + "% - " + "20px)", "margin-left": "20px" });
                    parentLeft.animate({ width: myLeftWidth + "%" }, "show", function () {
                        parentLeft.addClass("panel-shadow");
                        currentArrow.css({ 'border-top-left-radius': '0px', 'border-bottom-left-radius': '0px' });
                    });
                    currentImg.removeClass('icon-right').addClass('icon-left');
                }
            });
        }
    });

    // PANEL KEYBOARD ACCESSIBILITY
    // ============================
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    $(document).on('keydown.wf.panel.keyboard', '.panel-heading', { notSupport: [UP_KEY, DOWN_KEY] }, $.wfKBCore.commonKeyboardHandler)
        .on('keydown.wf.panel.keyboard', '.panel-arrow', { notSupport: [UP_KEY, DOWN_KEY] }, $.wfKBCore.commonKeyboardHandler);
}
));

