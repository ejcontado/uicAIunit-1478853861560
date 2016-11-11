/**
 * Created by ablir on 11/16/2015.
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

    var ENTER_KEY = 13;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    $.fn.radioButtonFocus = function () {
        var groups = [];

        // group the inputs by name
        $(this).each(function () {
            var el = this;
            var thisGroup = groups[el.name] = (groups[el.name] || []);
            thisGroup.push(el);
        });

        $(this).on('keydown', function (e) {
            var isCtrlKey = (window.event && window.event.ctrlKey) || e.ctrlKey;
            if (isCtrlKey && (e.keyCode === LEFT_KEY || e.keyCode === UP_KEY || e.keyCode === RIGHT_KEY || e.keyCode === DOWN_KEY)) {
                e.preventDefault();
            }

            setTimeout(function () {
                var el = e.target;
                var thisGroup = groups[el.name] = (groups[el.name] || []);
                var indexOfTarget = thisGroup.indexOf(e.target);
                var nextIndex = 0;

                if ((e.keyCode === LEFT_KEY || e.keyCode === UP_KEY) && isCtrlKey) {
                    if (indexOfTarget > 0) {
                        nextIndex = indexOfTarget - 1;
                    } else {
                        nextIndex = thisGroup.length - 1;
                    }
                    while($(thisGroup[nextIndex]).is(':disabled')){
                        if (nextIndex > 0) {
                            nextIndex = nextIndex - 1;
                        } else {
                            nextIndex = thisGroup.length - 1;
                        }
                    }
                    thisGroup[nextIndex].focus();
                }
                if ((e.keyCode === RIGHT_KEY || e.keyCode === DOWN_KEY) && isCtrlKey) {
                    if (indexOfTarget < (thisGroup.length - 1)) {
                        nextIndex = indexOfTarget + 1;
                    } else {
                        nextIndex = 0;
                    }
                    while($(thisGroup[nextIndex]).is(':disabled')){
                        if (nextIndex < (thisGroup.length - 1)) {
                            nextIndex = nextIndex + 1;
                        } else {
                            nextIndex = 0;
                        }
                    }
                    thisGroup[nextIndex].focus();
                }
                if (e.keyCode === ENTER_KEY) {
                    el.checked = true;
                }
            });
        });
    };

    $(document).ready(function () {
        $('.n-radio-btn').radioButtonFocus();
    });

}
));
