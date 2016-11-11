/**
 * Created by jiangdai on 2016/5/24.
 */

(function (factory) {
    /*global define:true*/
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

        /**
         * Focusses the next :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
         * Does not take into account that the taborder might be different as the :tabbable elements order
         * (which happens when using tabindexes which are greater than 0).
         */
        $.focusNext = function () {
            selectNextTabbableOrFocusable(':focusable');
        };

        /**
         * Focusses the previous :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
         * Does not take into account that the taborder might be different as the :tabbable elements order
         * (which happens when using tabindexes which are greater than 0).
         */
        $.focusPrev = function () {
            selectPrevTabbableOrFocusable(':focusable');
        };

        /**
         * Focusses the next :tabable element.
         * Does not take into account that the taborder might be different as the :tabbable elements order
         * (which happens when using tabindexes which are greater than 0).
         */
        $.tabNext = function () {
            selectNextTabbableOrFocusable(':tabbable');
        };

        /**
         * Focusses the previous :tabbable element
         * Does not take into account that the taborder might be different as the :tabbable elements order
         * (which happens when using tabindexes which are greater than 0).
         */
        $.tabPrev = function () {
            selectPrevTabbableOrFocusable(':tabbable');
        };

        $.getNextTabbale = function () {
            var selectables = $(':tabbable');
            var current = $(':focus');
            var nextIndex = 0;
            if (current.length === 1) {
                var currentIndex = selectables.index(current);
                if (currentIndex + 1 < selectables.length) {
                    nextIndex = currentIndex + 1;
                }
            }

            return selectables.eq(nextIndex);
        };

        $.getPrevTabbale = function () {
            var selectables = $(':tabbable');
            var current = $(':focus');
            var prevIndex = selectables.length - 1;
            if (current.length === 1) {
                var currentIndex = selectables.index(current);
                if (currentIndex > 0) {
                    prevIndex = currentIndex - 1;
                }
            }

            return selectables.eq(prevIndex);
        };

        function selectNextTabbableOrFocusable(selector) {
            var selectables = $(selector);
            var current = $(':focus');
            var nextIndex = 0;
            if (current.length === 1) {
                var currentIndex = selectables.index(current);
                if (currentIndex + 1 < selectables.length) {
                    nextIndex = currentIndex + 1;
                }
            }

            selectables.eq(nextIndex).focus();
        }

        function selectPrevTabbableOrFocusable(selector) {
            var selectables = $(selector);
            var current = $(':focus');
            var prevIndex = selectables.length - 1;
            if (current.length === 1) {
                var currentIndex = selectables.index(current);
                if (currentIndex > 0) {
                    prevIndex = currentIndex - 1;
                }
            }

            selectables.eq(prevIndex).focus();
        }

        /**
         * :focusable and :tabbable, both taken from jQuery UI Core
         */
        $.extend($.expr[':'], {
            data: $.expr.createPseudo ?
                $.expr.createPseudo(function (dataName) {
                    return function (elem) {
                        return !!$.data(elem, dataName);
                    };
                }) :
                // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },

            focusable: function (element) {
                return focusable(element, !isNaN($.attr(element, 'tabindex')));
            },

            tabbable: function (element) {
                var tabIndex = $.attr(element, 'tabindex'),
                    isTabIndexNaN = isNaN(tabIndex);
                return ( isTabIndexNaN || tabIndex >= 0 ) && focusable(element, !isTabIndexNaN);
            }
        });

        /**
         * focussable function, taken from jQuery UI Core
         * @param element
         * @returns {*}
         */
        function focusable(element) {
            var map, mapName, img,
                nodeName = element.nodeName.toLowerCase(),
                isTabIndexNotNaN = !isNaN($.attr(element, 'tabindex'));
            if ('area' === nodeName) {
                map = element.parentNode;
                mapName = map.name;
                if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
                    return false;
                }
                img = $('img[usemap=#' + mapName + ']')[0];
                return !!img && visible(img);
            }
            return ( /^(input|select|textarea|button|object)$/.test(nodeName) ?
                    !element.disabled :
                    'a' === nodeName ?
                    element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                    // the element and all of its ancestors must be visible
                visible(element);

            function visible(element) {
                return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
                        return $.css(this, 'visibility') === 'hidden';
                    }).length;
            }
        }
    }
));