/**
 * Created by jiangdai on 2016/3/4.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

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

    var createE = function () {
        var e = jQuery(document.createElement(arguments[0]));

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 0);
            args.shift();

            if (typeof args[0] === 'string') {
                e.addClass(args.shift());
            }

            for (var i = 0; i < args.length; i++) {
                if (args[i]) {
                    //if (!args[i].jquery && typeof args[i].length !== "undefined") {
                    //    args[i].forEach(function (_e) {
                    //        e.append(_e);
                    //    });
                    //}
                    //else {
                    //    e.append(args[i]);
                    //}
                    e.append(args[i]);
                }
            }
        }

        return e;
    };

    var fonts_done = false;
    var font_ready_listeners = [];

    var Scrollbar = function ($container, axis) {
        this.$container = $container;
        this.$content_container = $container.find('.scrolling-content-container');
        this.$content = $container.find('.scrolling-content');

        // Create the track and thumb
        this.$scrollbar = createE('div', 'scrollbar-container ' + axis,
            createE('div', 'track', createE('div')),
            createE('div', 'thumb')
        ).appendTo($container);
        this.$track = this.$scrollbar.find('.track');
        this.$thumb = this.$scrollbar.find('.thumb');
        this.$document = $(document);

        this.axis = this.axes[axis];

        this.content_offset = 0;
        this.max_content_offset = 0;
        this.max_thumb_offset = 0;
        this.thumb_size = (this.container_size() / this.content_size()) * this.container_size();
        this.$thumb.css(this.axis.track_size_property, this.thumb_size);
        //this.thumb_size = this.$thumb[this.axis.track_size_property]();
        this.drag_position = {
            thumb_start: null,
            mouse_start: null
        };

        this._drag_start = this.drag_start.bind(this);
        this._drag_move = this.drag_move.bind(this);
        this._drag_end = this.drag_end.bind(this);

        // Scroll when the thumb is dragged
        this.$thumb
            .bind('mousedown', this._drag_start)
            .bind('touchstart', this._drag_start);

        // Jump scroll position when the track is clicked
        this.$track
            .click(this.jump_to.bind(this));

        // Respond to mousewheel events
        this._mousewheel = this.mousewheel.bind(this);

        var container_elm = this.$container.get(0);

        if (container_elm.addEventListener) {
            container_elm.addEventListener('DOMMouseScroll', this._mousewheel, false);
            container_elm.addEventListener('mousewheel', this._mousewheel, false);
        }
        else {
            container_elm.onmousewheel = this._mousewheel;
        }

        // We set up the sizes twice. Once when fonts may not be ready and once after
        // to avoid a flash of the scollable content outside it's scrolling container
        this.size_changed();

        // Watch for changes in content size
        this.$content.bind('resize', this.size_changed.bind(this));
        // Watch for changes in container size
        this.$container.bind('resize', this.size_changed.bind(this));
    };

    Scrollbar.prototype =
    {
        // Functionality for a scrollbar is pretty much the same
        // whether it's vertical or horizontal but the way we
        // get some properties is different.
        axes: {
            'horizontal': {
                name: 'horizontal',
                dimension: 'x',
                container_size: function () {
                    return this.$container.innerWidth();
                },
                content_container_size: function () {
                    return this.$container.width();
                },
                content_size: function () {
                    return this.$content.outerWidth();
                },
                track_margin: function () {
                    return (parseInt(this.$scrollbar.css('margin-left')) || 0) +
                        (parseInt(this.$scrollbar.css('margin-right')) || 0);
                },
                track_size_property: 'width',
                position_property: 'left',
                page_position: 'pageX',
                wheel_delta: 'wheelDeltaX'
            },
            'vertical': {
                name: 'vertical',
                dimension: 'y',
                container_size: function () {
                    return this.$container.innerHeight();
                },
                content_container_size: function () {
                    return this.$container.height();
                },
                content_size: function () {
                    return this.$content_container.get(0).scrollHeight;
                },
                track_margin: function () {
                    return (parseInt(this.$scrollbar.css('margin-top')) || 0) +
                        (parseInt(this.$scrollbar.css('margin-bottom')) || 0);
                },
                track_size_property: 'height',
                position_property: 'top',
                page_position: 'pageY',
                wheel_delta: 'wheelDeltaY'
            }
        },

        animation_duration: 250,

        container_size: function () {
            return this.axis.container_size.call(this);
        },

        content_container_size: function () {
            return this.axis.content_container_size.call(this);
        },

        content_size: function () {
            return this.axis.content_size.call(this);
        },

        track_margin: function () {
            return this.axis.track_margin.call(this);
        },

        size_changed: function () {
            if (this.$container.is(':visible')) {
                this.$content_container.css({
                    width: this.$container.width(),
                    height: this.$container.height()
                });
            }

            var container_size = this.container_size();
            var content_container_size = this.content_container_size();
            var content_size = this.content_size();
            var track_margin = this.track_margin();

            if (!container_size || !content_size || !content_container_size) {
                return;
            }

            if (content_size <= content_container_size) {
                this.$container.removeClass('scrollbars-' + this.axis.name + '-visible');
                this.set_position(0);
            }
            else {
                this.$container.addClass('scrollbars-' + this.axis.name + '-visible');
                this.$scrollbar.css(this.axis.track_size_property, container_size - track_margin + 'px');
                this.max_content_offset = -1 * (content_size - content_container_size);
                this.max_thumb_offset = container_size - this.thumb_size - track_margin;

                // If we're scrolled and the size changes we need to change our offset
                if (this.content_offset < this.max_content_offset) {
                    this.set_position(this.max_content_offset);
                }
            }

            this.onsizechange();
        },

        onsizechange: function () {

        },

        set_position: function (new_offset, animated) {
            new_offset = parseInt(new_offset);

            if (this.content_offset === new_offset) {
                return;
            }

            this.content_offset = parseInt(Math.max(this.max_content_offset, Math.min(new_offset, 0)));
            var ratio = this.content_offset / this.max_content_offset;

            if (animated) {
                var options = {};
                options[this.axis.position_property] = this.content_offset;
                this.$content.animate(options, 250);

                options = {};
                options[this.axis.position_property] = parseInt(this.max_thumb_offset * ratio);
                this.$thumb.animate(options, 250);
            }
            else {
                this.$content.css(this.axis.position_property, this.content_offset);
                this.$thumb.css(this.axis.position_property, parseInt(this.max_thumb_offset * ratio));
            }

            this.onpositionchange(this.content_offset, animated);
            this.$container.trigger('scroll-position-changed');
            $(document).trigger('nsnscroll', this.$container.get(0));
        },

        // A hook for scroll changes
        onpositionchange: function (content_offset, animated) {
        },

        drag_start: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!this.$scrollbar.is(':visible')) {
                return;
            }

            this.drag_position.mouse_start = e[this.axis.page_position];
            this.drag_position.thumb_start = parseInt(this.$thumb.css(this.axis.position_property));

            this.$document.bind('mousemove', this._drag_move);
            this.$document.bind('mouseup', this._drag_end);
            this.$document.bind('touchmove', this._drag_move);
            this.$document.bind('touchend', this._drag_end);

            this.$container.trigger('scroll-start');
        },

        drag_move: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var thumb_offset = this.drag_position.thumb_start + (e[this.axis.page_position] - this.drag_position.mouse_start);
            var new_content_offset = Math.min(this.max_thumb_offset, thumb_offset) / this.max_thumb_offset * this.max_content_offset;
            this.set_position(new_content_offset);

            this.$container.trigger('scroll-move');
        },

        drag_end: function (e) {
            this.$document.unbind('mousemove', this._drag_move);
            this.$document.unbind('mouseup', this._drag_end);
            this.$document.unbind('touchmove', this._drag_move);
            this.$document.unbind('touchend', this._drag_end);

            this.drag_position.thumb_start = null;
            this.drag_position.mouse_start = null;

            this.$container.trigger('scroll-end');
        },

        jump_to: function (e) {
            var thumb_offset = e[this.axis.page_position] - this.$track.offset()[this.axis.position_property] - this.thumb_size / 2;
            var new_content_offset = parseInt(Math.min(this.max_thumb_offset, thumb_offset) / this.max_thumb_offset * this.max_content_offset);
            this.set_position(new_content_offset);
        },

        smooth_to: function (pos) {
            var new_offset = Math.min(Math.max(pos, this.max_content_offset), 0);
            this.set_position(pos, true);
        },

        mousewheel: function (event) {
            if (!this.$scrollbar.is(':visible')) {
                return;
            }

            var delta = 0, e = event || window.event;

            if (typeof e.wheelDeltaX === 'undefined' && typeof e.wheelDelta !== "undefined") {
                e.wheelDeltaX = e.wheelDeltaY = e.wheelDelta;
            }

            if (typeof e.wheelDelta !== "undefined") {
                delta = e[this.axis.wheel_delta] / 120;
            }
            else if (e.detail) {
                delta = -e.detail / 3;
            }

            this.set_position(this.content_offset + delta * 40);

            e = $.event.fix(e);
            e.preventDefault();

            this.$container.trigger('scroll-move');
        }
    };

    var old = $.fn.scrollbars;

    function Plugin() {
        return $(this).each(function () {
            var $container = $(this);

            var options =
            {
                horizontal: $container.is('.horizontal'),
                vertical: $container.is('.vertical')
            };

            $container.wrapInner(createE('div', 'scrolling-content-container', createE('div', 'scrolling-content')));
            var scrollbars = [];

            ['horizontal', 'vertical'].forEach(function (axis) {
                if (options[axis] && typeof $container.data('scrollbar-' + axis) === "undefined") {
                    var scrollbar = new Scrollbar($container, axis);
                    scrollbars.push(scrollbar);
                    $container.data('scrollbar-' + axis, scrollbar);
                }
            });
        });
    }

    $.fn.scrollbars = Plugin;
    $.fn.scrollbars.Constructor = Scrollbar;

    $.fn.scrollbars.noConflict = function () {
        $.fn.scrollbars = old;
        return this;
    };

    $(document).ready(function(){
        //$('.scrollbars').scrollbars();
    });
}));