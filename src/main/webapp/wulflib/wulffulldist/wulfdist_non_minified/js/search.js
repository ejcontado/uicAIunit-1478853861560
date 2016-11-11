/**
 * Created by jilian on 10/20/2015.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', 'fuelux/selectlist', './inputfield'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('fuelux'), require('./inputfield'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
        'use strict';

        // SEARCH PUBLIC CLASS DEFINITION
        // ==============================
        var Search = function (element, options) {};

        if (!$.fn.nInputField) {
            throw new Error('Balloon requires WULF inputfield.js');
        }

        Search.VERSION = '1.1.0';

        // NOTE: SEARCH EXTENDS inputfield.js
        // ================================
        Search.prototype = $.extend({}, $.fn.nInputField.Constructor.prototype);
        Search.prototype.constructor = Search;

        // SEARCH INTERNAL METHODS
        // ========================

        // SEARCH PLUGIN DEFINITION
        // =========================
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('wf.search');
                var options = typeof option === 'object' && option;

                if (!data && /destroy|hide/.test(option)) {
                    return;
                }
                if (!data) {
                    $this.data('wf.search', (data = new Search(this, options)));
                }
                if (typeof option === 'string') {
                    data[option]();
                }
            });
        }

        var old = $.fn.nSearch;

        $.fn.nSearch = Plugin;
        $.fn.nSearch.Constructor = Search;

        // SEARCH NO CONFLICT
        // ===================
        $.fn.nSearch.noConflict = function () {
            $.fn.nSearch = old;
            return this;
        };

        // CLOSE OPEN DROPDOWN WITH MOUSE OR KEYBOARD INPUT
        // ================================================
        function CloseDropdown() {
            if ($(this).parent(".n-search").hasClass("open")) {
                $(this).parent(".n-search").removeClass("open");
                $(this).prev(".dropdown-toggle").attr("aria-expanded", "false");
            }
        }
        // MOUSE HOVER ON BUTTON
        // =====================
        function MouseOverButton() {
            if ($(this).parent(".n-search-clearable").hasClass("open") && $(this).siblings('.n-inputfield').is(":focus")) {
                $(this).parent().addClass("n-search-input-move");
            }
            if ($(this).siblings('.dropdown-toggle').is(":focus") && !$(this).parent().hasClass("open")){
                $(this).parent().addClass("n-search-dropdown-focus");
            }
        }
        function MouseLeaveButton() {
            $(this).parent().removeClass("n-search-input-move");
            $(this).parent().removeClass("n-search-dropdown-focus");
        }
        function SelectItemMoveFocus() {
            $(this).parent().siblings('.n-search-input').attr('placeholder',$(this).find('a>span').html());
            $(this).parent().siblings('.n-search-input').focus();
        }

        $(document)
            .on('click.wf.forms', '.n-search-clearable .n-search-control-icon', Search.prototype.clearContent)
            .on('click.wf.forms','.dropdown-menu>li', SelectItemMoveFocus)
            .on('click.wf.search.mouse', '.n-search-input', CloseDropdown)
            .on('mouseover.wf.search.mouse', '.n-search-control-icon', MouseOverButton)
            .on('mouseleave.wf.search.mouse', '.n-search-control-icon', MouseLeaveButton)
            .on('mouseover.wf.search.mouse', '.n-search-button', MouseOverButton)
            .on('mouseleave.wf.search.mouse', '.n-search-button', MouseLeaveButton)
            .on('keypress.wf.search.keyboard', '.n-search-input', CloseDropdown);
    }
));