/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'malihu-custom-scrollbar-plugin'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('jquery-mousewheel'), require('malihu-custom-scrollbar-plugin'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    function showDropdownScrollbar(obj) {
        return function() {
            $(obj).parent().find('.n-dropdown-menu-scroll').mCustomScrollbar("update");
        };
    }

    $.fn.extend({
        nScrollbar: function (options) {
            var $select = $(this);

            if (typeof options === "string"){
                $select.mCustomScrollbar(options);
                return;
            }

            if ($select.hasClass("n-dropdown-menu-scroll") || $select.hasClass("tree-scroll") || $select.hasClass("n-table-scrollbar") ||
                ($select.hasClass("n-list-group-scroll") && ($select.find("li.n-list-group-item").length > 0 || $select.find("dd.n-list-group-item").length > 0))) {
                options = $.extend({}, options, { keyboard: { enable: false }});
            }
            if ($select.hasClass("n-table-scrollbar") && $select.find(".datepicker-calendar").length > 0) {
                options = $.extend({}, options, { advanced: { autoScrollOnFocus: false }});
            }

            if ((options !== undefined && options.notAutoUpdate) || $select.hasClass("scrollbar-not-autoupdate")){
                if ($select.hasClass("n-table-scrollbar") && $select.find(".datepicker-calendar").length > 0) {
                    options = $.extend({}, options, {
                        advanced: {
                            autoScrollOnFocus: false,
                            updateOnContentResize: false,
                            updateOnImageLoad: false,
                            autoUpdateTimeout: 100
                        }
                    });
                }else {
                    options = $.extend({}, options, {
                        advanced: {
                            updateOnContentResize: false,
                            updateOnImageLoad: false,
                            autoUpdateTimeout: 100
                        }
                    });
                }

                if ($select.hasClass("n-dropdown-menu-scroll")){
                    $(".dropdown-toggle").on("click",function() {
                        setTimeout(showDropdownScrollbar(this), 10);
                    });
                }
            }

            options = $.extend({}, options, {
                callbacks: {
                    whileScrolling: function () {
                        setTimeout(function () {
                            $('.datepicker-calendar-wrapper').each(function () {
                                if ($(this).css('display') === 'block') {
                                    var input = $(this).closest('.n-calendar').find('input');
                                    if (input.data('position') === 'fixed') {
                                        $(this).parent().find('button.dropdown-toggle').trigger('click');
                                    }
                                }
                            });
                            $('.dropdown-menu').each(function () {
                                if ($(this).css('display') === 'block') {
                                    if ($(this).closest('.selectlist').data('position') === 'fixed') {
                                        $(this).parent().find('button.dropdown-toggle').trigger('click');
                                    }
                                }
                            });
                        }, 100);
                    }
                }
            });
            $select.mCustomScrollbar(options);
        }
    });
}
));
