/*
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-core','./keyboard/keyboard-table','./scroll'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery,require('./keyboard/keyboard-core'),require('./keyboard/keyboard-table'),require('./scroll'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    $(document).on("click", ".n-list-group-item", function () {
        var listGroupParent = $(this).parents(".n-list-group");
        if (!listGroupParent.hasClass('disabled')) {
            listGroupParent.find(".n-list-group-item").removeClass("selected");
            listGroupParent.find(".n-list-group-item").attr("tabindex", -1);
            $(this).addClass("selected");
            $(this).attr("tabindex", 0);
        }
    });

    $(document).ready(function () {
        var listGroup = $("ul.n-list-group");
        $.each(listGroup, function () {
            if (!$(this).hasClass("disabled")) {
                $(this).find(".n-list-group-item").attr("tabindex", -1);
                var itemSelected = $(this).find(".n-list-group-item.selected");
                if (itemSelected.length > 0) {
                    itemSelected.attr("tabindex", 0);
                }
                else {
                    $(this).find(".n-list-group-item:first").attr("tabindex", 0);
                }
                //$(this).find(".n-list-group-item").bind("click", function () {
                //    $(this).parents(".n-list-group").find(".n-list-group-item").removeClass("selected");
                //    $(this).addClass("selected");
                //});
            }
        });

        var descriptionListGroup = $("dl.n-list-group");
        $.each(descriptionListGroup, function () {
            if (!$(this).hasClass("disabled")) {
                $(this).find("dd").attr("tabindex", -1);
                var ddSelected = $(this).find("dd.selected");
                if (ddSelected.length > 0) {
                    ddSelected.attr("tabindex", 0);
                }
                else  {
                    $(this).find("dd:first").attr("tabindex", 0);
                }
                $(this).find("dd").bind("click", function () {
                    $(this).parents(".n-list-group").find("dd").removeClass("selected");
                    $(this).parents(".n-list-group").find("dd").attr("tabindex", -1);
                    $(this).addClass("selected");
                    $(this).attr("tabindex", 0);
                });
            }
        });

        var listScrollGroup = $("ul.n-list-group-scroll");
        $.each(listScrollGroup, function () {

            if ($(this).hasClass("disabled")) {
                $(this).nScrollbar({
                    alwaysShowScrollbar: 2,
                    theme: "disabled",
                    mouseWheel: { enable: false }
                });

                $(this).nScrollbar("disable");
            }
            else {
                $(this).nScrollbar();
            }
            $(this).find("div[tabindex='0']").removeAttr("tabindex");
        });

        var descriptionListScrollGroup = $("dl.n-list-group-scroll");
        $.each(descriptionListScrollGroup, function () {

            if ($(this).hasClass("disabled")) {

                $(this).nScrollbar({
                    alwaysShowScrollbar: 2,
                    theme: "disabled",
                    mouseWheel: { enable: false }
                });

                $(this).nScrollbar("disable");
            }
            else {
                $(this).nScrollbar();
            }
            $(this).find("div[tabindex='0']").removeAttr("tabindex");
        });

        /**---multicolumn list functions-----**/

        $(".n-multicolumn-list").each(function () {
            var lastSubheader = $(this).find(".subheader:last");
            var lastSubheaderItem = $(this).find(".subheader-item:last");
            if (lastSubheaderItem.next().length === 0) {
                lastSubheader.addClass("last");
            }
        });

        $(".n-multicolumn-list th").each(function () {
            addBoldBufferWidth($(this));
        });


        $(".n-multicolumn-list tbody:not(.group) td, th, .n-multicolumn-list tbody.group")
            .prop("tabIndex", 0)
            .off('keydown mouseup').on('keydown mouseup', function (event) {
                if (event.type === 'mouseup' || event.keyCode === 13 || event.keyCode === 32) {
                    event.preventDefault();
                    $(this).closest(".n-multicolumn-list").find('.selected').removeClass('selected');
                    $(this).toggleClass('selected');
                }
            });

        $(".n-multicolumn-list .subheader").off('keydown mouseup').on('keydown mouseup', function (event) {
            if (event.type === 'mouseup' || event.keyCode === 13 || event.keyCode === 32) {
                $(this).toggleClass('open');
                $(this).find('span.icon').toggleClass('icon-next');
                $(this).find('span.icon').toggleClass('icon-arrow');
                $(this).nextUntil('tr:not(.subheader-item)').toggleClass('open');

                if ($(this).parent().find(".subheader:last").is($(this)) && $(this).parent().children('tr:last').hasClass('subheader-item')) {
                    $(this).toggleClass("last");
                }
            }
        });


    });

    function addBoldBufferWidth(element) {
        var wid = element.width();
        var normalBuffer = 16;
        var selectedBuffer = 14;

        if (element.hasClass('selected')) {
            wid += selectedBuffer;
        }
        else {
            wid += normalBuffer;
        }
        element.css('width', wid + 'px');
    }

    // LIST GROUP KEYBOARD ACCESSIBILITY
    // =================================
    $(document).on('keydown.wf.listgroup.keyboard', '.n-list-group', $.wfKBCore.commonKeyboardHandler);
    $(document).on('keydown.wf.Multi-column-list.keyboard', '.n-multicolumn-list', $.wfKBTable.tableKeyboardHandler);
}
));