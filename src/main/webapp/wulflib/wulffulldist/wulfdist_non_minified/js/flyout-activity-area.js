/**
 * Copyright (c) 2015 Nokia Solutions and Networks. All rights reserved
 */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './flyout','./scroll'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-core'), require('./flyout'), require('./scroll'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var $flyout = $('.n-flyout');
    if ($flyout.has(".n-flyout-activity-area-tabs")) {
        $flyout.on('click', '.n-flyout-activity-area-tabs a', function () {
            var $li = $(this).parent('li');
            var id = $(this).attr('href');
            setTimeout(function () {
                $li.parent('ul').find('li').each(function () {
                    $(this).removeClass('selected').removeClass('before-selected').removeClass('after-selected').css('z-index', '');
                });
                $li.addClass('selected');
                $li.next('li').addClass('after-selected');
                $li.prev('li').addClass('before-selected');
                $li.css('z-index', '1');
                $('.n-flyout-container').hide();
                $('[data-target-selector=' + id + ']').show();
            }, 50);

        });

        $(document).on('focus', '.n-flyout-activity-area-tabs > li > a', function (){
            var $li = $(this).parent('li');
            $li.parent('ul').find('li').each(function () {
                $(this).removeClass('focus').removeClass('before-focused').removeClass('after-focused').css('z-index','');
            });
            $li.addClass('focus');
            $li.css('z-index','1');
            $li.next('li').addClass('after-focused');
            $li.prev('li').addClass('before-focused');
        });

        $(document).on('keydown.wf.flyoutActivity.keyboard', '.n-flyout', $.wfKBCore.commonKeyboardHandler);

        $(function () {
            $('[data-markup^="flyout"]').each(function () {
                $('.n-flyout-content').nScrollbar({
                    autoHideScrollbar:false,
                    axis: "y"
                });
                var $flyout = $(this);
                var $container = $flyout.find("[data-target-selector='#one'].n-flyout-container");
                var containerWidth = $container.outerWidth();
                var direction = $flyout.data('direction');

                var headerHeight = $($flyout.find('[data-target-selector="#one"] .panel-heading')).outerHeight();

                switch (direction) {
                    case 'right':
                        $flyout.css("left", (-containerWidth) + "px");
                        var $openAnchor = $flyout.find(".n-flyout-open");
                        $openAnchor.css("left", (containerWidth -4) + "px");
                        $openAnchor.css("top", (headerHeight-4) + "px");
                        var $li = $flyout.find(".n-flyout-activity-area-tabs > li");
                        $.each($li, function(i, item) {
                            if (i > 0) {
                                var offsetTop = $(item).prev('li').offset().top + $(item).height() * 2/3;
                                $(item).offset({top:offsetTop});
                            }
                        });
                        break;
                }
                $container.hide();
            });
        });
    }

}));