/**
 * Created by jiangdai on 5/5/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

        'use strict';

        // SPINNER EYBOARD ACCESSIBILITY METHODS DEFINITION
        // ================================================
        var SPACE_BAR_KEY = 32;
        var UP_KEY = 38;
        var DOWN_KEY = 40;

        function spinnerKeyboardHandler(e) {
            var supportKeys = [SPACE_BAR_KEY, UP_KEY, DOWN_KEY];
            var key = e.keyCode;

            if (supportKeys.indexOf(key) === -1) {
                return;
            }

            if (key === SPACE_BAR_KEY) {
                $(e.target).trigger('mousedown');
                $(e.target).trigger('mouseup');
            } else {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        $(document)
            .on('keydown.wf.spinner.keyboard', '.spinbox .spinbox-up', spinnerKeyboardHandler)
            .on('keydown.wf.spinner.keyboard', '.spinbox .spinbox-down', spinnerKeyboardHandler);
    }
));