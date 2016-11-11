/**
 * Created by lonlin on 11/12/2015.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    // BALLOON PUBLIC CLASS DEFINITION
    // ======================
    var Balloon = function (element, options) {
        this.element = element;

        // Build content for balloon with close icon
        if ($(element).hasClass('balloon-icon')) {
            options = $.extend({}, options, {
                html: true,
                content: function () {
                    return $($(element).data('target-selector')).html();
                }
            });
        }

        // For hover balloon
        if ($(element).hasClass('n-hover-balloon')) {
            options = $.extend({}, options, { trigger: 'click hover' });
        }

        // Init balloon component
        this.init('balloon', element, options);

        // Bind close icon event
        $(element).on('shown.bs.balloon', function () {
            var $popover = $(this);
            $popover.parent().find('.n-close').on('click', function () {
                $popover.data('bs.balloon').hide();
            });
        });
    };

    if (!$.fn.popover) {
        throw new Error('Balloon requires Bootstrap popover.js');
    }

    Balloon.VERSION = '1.1.0';

    // NOTE: BALLOON EXTENDS popover.js
    // ================================
    Balloon.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

    Balloon.prototype.constructor = Balloon;

    // Extends popover.toggle method
    (function (toggle) {
        Balloon.prototype.toggle = function () {
            // call original method
            toggle.call(this);

            // add extended logic -- close other opened balloon
            var element = this.element;
            $('[data-toggle^="balloon"]').each(function (idx, el) {
                if (element !== el) {
                    $(this).data('bs.balloon').hide();
                }
                $(this).parent().tooltip('hide');
            });

        };
    }($.fn.popover.Constructor.prototype.toggle));

    Balloon.prototype.fadeout = function () {
        var $balloon = $(this);
        var $tip = $balloon.data('bs.balloon').tip();
        setTimeout(function () {
            if ($tip.hasClass('in')) {
                $tip.fadeOut(1000, function () {
                    $balloon.data('bs.balloon').hide();
                });
            }
        }, 1000);
    };

    // BALLOON PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.balloon');
            var options = typeof option === 'object' && option;

            if (!data && /destroy|hide/.test(option)) {
                return;
            }
            if (!data) {
                $this.data('bs.balloon', (data = new Balloon(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }

    var old = $.fn.nBalloon;

    $.fn.nBalloon = Plugin;
    $.fn.nBalloon.Constructor = Balloon;


    // BALLOON NO CONFLICT
    // ===================

    $.fn.nBalloon.noConflict = function () {
        $.fn.nBalloon = old;
        return this;
    };

    // BALLOON INTERNAL METHODS
    // ========================
    var restore = function () {
        $('[data-toggle^="balloon"]').each(function () {
            var $balloon = $(this).data('bs.balloon');
            var $tip = $balloon.tip();
            if ($tip.hasClass('in')) {
                $balloon.show();
            }
        });
    };

    $(document)
        .on('shown.bs.balloon', '[data-toggle="balloon"][class~="fadeout"]', Balloon.prototype.fadeout)
        .on('keydown.wf.balloon.keyboard', 'a[data-toggle=balloon]', $.wfKBCore.commonKeyboardHandler);

        $(document).on('click.wf.balloon', function (e) {
            $('[data-toggle^="balloon"]').each(function (index,el) {
                if (e.target !== el && !$(e.target).hasClass("popover-content") ) {
                    var popover = $(this).data('bs.balloon');
                    var $tip = popover.tip();
                    if ($tip.hasClass('in')) {
                        $(this).triggerHandler('click.balloon');
                    }
                }
            });
        });

    // TODO:Jonathan, the resize events should be throttled.
    $(window).on('resize', restore);

}
));
