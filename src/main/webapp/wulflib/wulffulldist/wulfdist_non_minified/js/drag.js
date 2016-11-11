/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
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

    var Drag = function (el, opt) {
        opt = $.extend({ handle: "", cursor: "move" }, opt);
        var dragObject = this;
        el = $(el);
        dragObject.init = function () {
            el.css('cursor', opt.cursor);
            var $drag = el.parent().addClass('draggable');
            var zIdx, drgH, drgW, posY, posX;
            el.get(0).addEventListener('mousedown', initDrag, false);

            function initDrag(e) {
                zIdx = $drag.css('z-index');
                drgH = $drag.outerHeight();
                drgW = $drag.outerWidth();
                posY = $drag.offset().top + drgH - e.pageY;
                posX = $drag.offset().left + drgW - e.pageX;
                $drag.css('z-index', 1000);
                document.documentElement.addEventListener('mousemove', doDrag, false);
                document.documentElement.addEventListener('mouseup', stopDrag, false);
            }

            function doDrag(e) {
                var top = e.pageY + posY - drgH;
                var left = e.pageX + posX - drgW;


                // check if target is outside fo window
                if (top < -20) {
                    top = -20;
                }
                if (top > window.innerHeight - drgH / 2) {
                    top = window.innerHeight - drgH / 2;
                }
                if (left < -drgH * 0.8) {
                    left = -drgH * 0.8;
                }
                if (left > window.innerWidth - drgH / 2) {
                    left = window.innerWidth - drgH / 2;
                }

                $drag.offset({
                    top: top,
                    left: left
                });
                e.preventDefault();
            }

            function stopDrag() {
                $drag.removeClass('draggable').css('z-index', zIdx);
                document.documentElement.removeEventListener('mousemove', doDrag, false);
                document.documentElement.removeEventListener('mouseup', stopDrag, false);
            }
        };

        dragObject.init();
    };

    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            drag = (input.attr('data-drag') === 'true' || input.attr('data-drag') === 'True');

        if (drag) {
            return input.data('wf.dragable', new Drag(this, options));
        }
    };

    var globalsDrag = {
        dragElements: 'div',
        dataDragAttr: '*[data-drag]'
    };

    var applyDataDrag = function (selector) {
        selector = selector || globalsDrag.dragElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter(globalsDrag.dataDragAttr).each(HTMLAttributes);
    };

    var old = $.fn.dragable;

    $.fn.dragable = function (options) {
        options = options || {};
        var dragFunction = function () {
            return $(this).data('wf.dragable', new Drag(this, options));

        };
        $(this).each(dragFunction);
        return this;
    };

    $.fn.dragable.noConflict = function () {
        $.fn.dragable = old;
        return this;
    };

    $(document).ready(function () {
        applyDataDrag('div');
    });
}
));