/**
 * Created by jiangdai on 2016/3/4.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */



(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './flyout', './scrollbar'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./flyout'), require('./scrollbar'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var $flyout = $('.n-flyout');
    if ($flyout.has(".n-drawer-tabs")) {
        $flyout.on('click', '.n-drawer-tabs a', function () {
            var $li = $(this).parent('li');
            var id = $(this).attr('href');
            setTimeout(function () {
                $li.parent('ul').find('li').each(function () {
                    $(this).removeClass('focus').removeClass('before-focused').removeClass('after-focused');
                    $(this).removeClass('selected').removeClass('before-selected').removeClass('after-selected').removeClass('tab-selected');
                });
                $li.addClass('selected');
                $li.addClass('tab-selected');
                $li.next('li').addClass('after-selected');
                $li.prev('li').addClass('before-selected');

                $('.n-flyout-container').hide();
                id = id.replace('#', '');
                $('#' + id).show();
            }, 50);

        });
        $(document).on('focus', '.n-drawer-tabs > li > a', function () {
            var $li = $(this).parent('li');
            $li.parent('ul').find('li').each(function () {
                $(this).removeClass('focus').removeClass('before-focused').removeClass('after-focused');
                $(this).removeClass('selected').removeClass('before-selected').removeClass('after-selected');
            });
            $li.addClass('focus');
            $li.next('li').addClass('after-focused');
            $li.prev('li').addClass('before-focused');
        });

        $flyout.on('click', '.drawer-toggle-up', function () {
            $(this).removeClass('drawer-toggle-up').addClass('drawer-toggle-down');
            $('.n-flyout-open').trigger('click');
        });

        $flyout.on('click', '.drawer-toggle-down', function () {
            $(this).removeClass('drawer-toggle-down').addClass('drawer-toggle-up');
            $('.n-flyout-open').find('.selected').trigger('click');
        });
    }
}));