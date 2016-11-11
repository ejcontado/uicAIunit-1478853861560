/**
 * Created by jiangdai on 2016/3/2.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

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

    // FLYOUT PUBLIC CLASS DEFINITION
    // ======================

    $.fn.nFlyout = function Plugin() {
        return new Flyout(this);
    };

    var Flyout = function (element) {
        var $flyout = $(element);
        if ($flyout.data('initialized') !== true) {
            var $container = $flyout.find(".n-flyout-container");
            var contaierWidth = $container.outerWidth();
            var containerHeight = $container.outerHeight();
            var direction = $flyout.data('direction');

            if (!direction) {
                direction = "right";
                $flyout.data('direction', "right");
            }

            switch (direction) {
                case 'top':
                    $flyout.css("bottom", (-containerHeight) + "px");
                    break;
                case 'bottom':
                    $flyout.css("top", (-containerHeight) + "px");
                    break;
                case 'left':
                    $flyout.css("right", (-contaierWidth) + "px");
                    break;
                case 'right':
                    $flyout.css("left", (-contaierWidth) + "px");
                    var $openAnchor = $flyout.find(".n-flyout-open");
                    var openHeight = $openAnchor.outerHeight();
                    $openAnchor.css("left", (contaierWidth + 1) + "px");
                    $openAnchor.css("top", Math.ceil((containerHeight - openHeight) / 2) + "px");
                    break;
            }

            // Generate the scroll content (if there is) before container hide.
            $('.scrollbars').scrollbars();
            $container.hide();
            $flyout.on('keydown','*:focus', function (event) {
                if (event.keyCode === 27) {
                    var $flyout = $(this).parents('.n-flyout');
                    var direction = $flyout.data('direction');
                    hideFlyout($flyout, direction);
                }
            });

            $flyout.data('initialized', true);
        }
    };

    $(function () {
        $('body').click(function (e) {

            $(".n-flyout").each(function () {
                var $flyout = $(this);
                var $closestFlyout = $(e.target).closest('.n-flyout');

                if ($closestFlyout === 0 || $flyout[0] !== $closestFlyout[0]) {
                    var container = $flyout.find('.n-flyout-container');
                    if (container.is(':visible')) {
                        var direction = $flyout.data('direction');
                        hideFlyout($flyout, direction);
                    }
                }
            });
        });

        $(".n-flyout").each(function () {
            $(this).nFlyout();
        });

        $('.n-flyout-activity-area-tabs').on('keydown','*:focus', function (event) {
            if (event.keyCode === 27) {
                var $flyout = $('.n-flyout');
                var direction = $flyout.data('direction');
                hideFlyout($flyout, direction);
            }
        });
    });

    $(document).on('click.wf.flyout','.n-flyout .n-flyout-menu li',function() {
        $('li').removeClass('selected');
        $(this).toggleClass('selected');
    });
    $(document).on('click.wf.flyout', '.n-flyout .n-flyout-open', HandleFlyoutOpen)
        .on('keydown.wf.flyout.keyboard', '.n-flyout-menu', $.wfKBCore.commonKeyboardHandler);

    function HandleFlyoutOpen(event) {
        var $clickTarget = $(event.target);
        var $openAnchor = $(this);
        var $flyout = $openAnchor.parent();
        var $container = $flyout.find('.n-flyout-container');
        var direction = $flyout.data('direction');

        if ($openAnchor.hasClass('n-drawer-tabs')) {
            if ($container.is(':visible')) {
                if ($clickTarget.closest('li').hasClass('tab-selected')){
                    hideFlyout($flyout, direction);
                }
            }
            else {
                showFlyout($flyout, direction);
            }
        } else if ($openAnchor.hasClass('n-flyout-activity-area-tabs')){
            if ($container.is(':visible')) {
                if ($clickTarget.closest('li').hasClass('selected')){
                    hideFlyout($flyout, direction);
                }
            }
            else {
                showFlyout($flyout, direction);
            }
        } else {
            if ($container.is(':visible')) {
                hideFlyout($flyout, direction);
            }
            else {
                showFlyout($flyout, direction);
            }
        }
    }

    function hideFlyout($flyout, direction) {
        var $container = $flyout.find('.n-flyout-container');
        var menuHeight = $container.outerHeight();
        var menuWidth = $container.outerWidth();
        switch (direction) {
            case 'top':
                $container.parent(".n-flyout").animate({ bottom: -menuHeight }, 400, function () {
                        $container.hide();
                    }
                );
                break;
            case 'bottom':
                $container.parent(".n-flyout").animate({ top: -menuHeight }, 400, function () {
                        $container.hide();
                    }
                );
                break;
            case 'left':
                $container.parent(".n-flyout").animate({ right: -menuWidth }, 400, function () {
                        $container.hide();
                    }
                );
                break;
            case 'right':
                $container.parent(".n-flyout").animate({ left: -menuWidth }, 400, function () {
                        $container.hide();
                    }
                );
                break;
        }
        $flyout.attr('data-expand', 'false');

        if ($flyout.hasClass('n-drawer')) {
            $flyout.find('.drawer-toggle-down').removeClass('drawer-toggle-down').addClass('drawer-toggle-up');
            $flyout.find('.drawer-shadow').fadeOut(400);
        }
    }

    function showFlyout($flyout, direction) {
        var $container = $flyout.find('.n-flyout-container');
        if (!$container.hasClass('n-flyout-activity-area')){
            $container.show();
        }

        switch (direction) {
            case 'top':
                $container.parent(".n-flyout").animate({ bottom: 0 }, 400);
                break;
            case 'bottom':
                $container.parent(".n-flyout").animate({ top: 0 }, 400);
                break;
            case 'left':
                $container.parent(".n-flyout").animate({ right: 0 }, 400);
                break;
            case 'right':
                $container.parent(".n-flyout").animate({ left: 0 }, 400);
                break;
        }
        $flyout.attr('data-expand', 'true');

        if ($flyout.hasClass('n-taskpad')){
            $container.find(".n-search-input").focus();
        }else if ($flyout.hasClass('n-drawer')) {
            $flyout.find('.drawer-toggle-up').removeClass('drawer-toggle-up').addClass('drawer-toggle-down');
            $flyout.find('.drawer-shadow').fadeIn(400);
        }else if ($flyout.find('.n-flyout-activity-area .n-flyout-foot').length > 0){
            setTimeout(function() {
                $container.find(".form-control").focus();
            },50);
        }
        else {
            $container.find("a:first").focus();
            //clear all selected status.
            $container.find("li").removeClass('selected');
        }
    }
}));