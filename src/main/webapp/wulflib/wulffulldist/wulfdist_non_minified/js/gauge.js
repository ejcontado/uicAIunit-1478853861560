/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jqxcore', 'jqxdraw','jqxgauge'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('jqxcore'), require('jqxdraw'),require('jqxgauge'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';
}));
