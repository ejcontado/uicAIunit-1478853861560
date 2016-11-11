/**
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

    $(document).ready(function () {
        $(".nav.nav-tabs li:not('.disabled') .icon-close").click(function(e) {
            e.stopPropagation();
            var $parent = $(this).closest("ul");
            var $current = $(this).closest("li");
            $current.remove();
            if ($parent.find("li.active").length === 0) {
                $parent.find("li:nth-child(1):not('.disabled')").addClass("active").parent()
                    .next().children().removeClass("active");
                $($parent.find("li.active").children('a:nth-child(1)').attr("href")).addClass("active");
            }
            if ($parent.children("li:not('.disabled')").length === 0) {
                $parent.next().html("");
            }
            if ($parent.find("li.active").length !== 0) {
                $parent.find("li.active a:nth-child(1)").focus();
            }
        });

    });

    $(document).on('click.wf.tab', '.nav.nav-tabs li', function focusOnScroll(){
        var $parent = $(this).closest("ul");
        var $tabContent = $parent.next(".tab-content.tab-content-scroll");
        if($tabContent.length){
            setTimeout(function(){
                $tabContent.find(".mCustomScrollBox").focus();
            },50);
        }
    });

    $(document)
        .on('keydown.wf.common.keyboard', '.nav-tabs', $.wfKBCore.commonKeyboardHandler);

}));