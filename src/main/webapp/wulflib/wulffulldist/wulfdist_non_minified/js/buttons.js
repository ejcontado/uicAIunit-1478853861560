/**
 * Created by aboque on 1/11/2016.
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
        'use strict';

        // BUTTONS INTERNAL METHODS
        // ========================

        var selectTabButton = function() {
            $(this).siblings('.selected').removeClass('selected');
            $(this).addClass('selected');
        };

        var handleEnterKeyInToggleButton = function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                $(e.target).trigger('click');
            }
        };

        $(document)
            .on('click.wf.buttons', '.btn-group.n-tab-buttons .btn', selectTabButton)
            .on('keydown.wf.buttons.keyboard', '.n-toggle-switch-input', handleEnterKeyInToggleButton);

    }
));