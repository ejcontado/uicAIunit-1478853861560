/*
 * WULF (http://networks.nokia.com/)
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-core', './scrollbar'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-core'), require('./scrollbar'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var lastSelected = null;
    $(".visualizationtablecell tbody tr:nth-child(odd) th").click(function () {

        if ($(this).data('isSelected')) {
            $(this).data('isSelected', false);
            $(this).parent().removeClass('selected-grey');
        } else {
            $(".visualizationtablecell thead tr th").removeClass('selected-column-header');
            $(this).parent().siblings().removeClass('selected-grey').removeClass('selected-blue').children().removeClass('selected-grey-cell').removeClass('selected-blue-cell');
            $(this).parent().addClass('selected-grey');
            if (lastSelected !== null) {
                lastSelected.data('isSelected', false);
            }
            lastSelected = $(this);
            $(this).data('isSelected', true);
        }
    });

    $(".visualizationtablecell tbody tr:nth-child(even) th").click(function () {
        if ($(this).data('isSelected')) {
            $(this).data('isSelected', false);
            $(this).parent().removeClass('selected-blue');
        } else {

            $(".visualizationtablecell thead tr th").removeClass('selected-column-header');
            $(this).parent().addClass('selected-blue').siblings().removeClass('selected-grey').removeClass('selected-blue').children().removeClass('selected-grey-cell').removeClass('selected-blue-cell');
            if (lastSelected !== null) {
                lastSelected.data('isSelected', false);
            }
            lastSelected = $(this);
            $(this).data('isSelected', true);
        }
    });

    $(".visualizationtablecell thead tr th").click(function () {
        if ($(this).index() === 0) {
            return;
        }
        $(this).data('isSelected', true);
        $(this).addClass('selected-column-header').siblings().removeClass('selected-column-header');
        var colIndex = $(this).index() + 1;
        var tr = $(".visualizationtablecell tbody tr");
        tr.removeClass('selected-grey').removeClass('selected-blue');
        var rowCount = tr.length;
        for (var ctr = 1; ctr <= rowCount; ctr++) {
            var td = $(".visualizationtablecell tbody tr:nth-child(" + ctr + ") td:nth-child(" + colIndex + ")");
            td.siblings().removeClass('selected-grey-cell').removeClass('selected-blue-cell');
            if (ctr === 0 || (ctr % 2) === 0) {
                td.addClass('selected-blue-cell');
            } else {
                td.addClass('selected-grey-cell');
            }
        }
    });

    $(".visualizationtablecell").attr("cellspacing", 0);
    $(".visualizationtablecell tbody tr th:first-child").wrapInner("<div style='white-space: nowrap' align='left'></div>");
    $(".visualizationtablecell tbody tr th:first-child div").prepend("<span class='visualization-header-bullet'></span>");

    var maxWidth = null;
    $(".visualizationtablecell tbody tr th:first-child div").each(function () {
        var currWidth = $(this).width();
        console.log(currWidth);
        if (maxWidth === null || maxWidth < currWidth) {
            maxWidth = currWidth;
        }
    }).width(maxWidth + 11);
}));