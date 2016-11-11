/**
 * Created by linaqiu on 2015/7/20.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

//TODO If button is disabled, the focus should move as follows:
//TODO Back is disabled -> focus to Next
//TODO Next is disabled AND we are at the last step -> focus to Finish
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', 'twitter-bootstrap-wizard', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('twitter-bootstrap-wizard'), require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
        'use strict';

        $.fn.extend({
            initWizard: function () {
                $(this).bootstrapWizard({
                    nextSelector: '.button-next', previousSelector: '.button-previous',
                    firstSelector: '.button-first', lastSelector: '.button-last'
                });

                // init steps width
                var $steps = $(this).find(".navbar-inner>ul>li");
                var distance = (100 / ($steps.length - 1)).toFixed(3);
                var remainder = (40 / ($steps.length - 1));
                $steps.not(":last-child").css("width", "calc(" + distance + "% - " + remainder + "px)");
            }
        });

        $(".n-dlg-wizard").on("click", ".modal-footer>input[type=button]", function () {
            var activeTab = $(this).closest(".modal-footer").prev(".modal-body").find("li.active");
            addPassStyle(activeTab);
        });

        $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function () {
            var $wizard = $(".n-dlg-wizard.in");
            if ($wizard.length > 0) {
                // set next button as focus and reset to the first step
                $wizard.find("input[type=button][name=next]").focus();
                $wizard.find("input[type=button][name=first]").trigger("click");
            }
        });

        function addPassStyle(activeTab) {
            activeTab.removeClass("passed").siblings("li").removeClass("passed");
            var $passedSteps = activeTab.prevAll("li");
            if ($passedSteps.length > 0) {
                $passedSteps.addClass("passed");
            }
        }
    }
));