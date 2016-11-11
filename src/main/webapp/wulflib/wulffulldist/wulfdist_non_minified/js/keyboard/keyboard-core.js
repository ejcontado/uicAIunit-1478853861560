/**
 * Created by jiangdai on 2016/5/10.
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

    var SPACE_BAR_KEY = 32;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var ESC_KEY = 27;
    var TAB_KEY = 9;

    var KeyboardCore = {
        commonKeyboardHandler: function (e) {
            var supportKeys = [TAB_KEY, SPACE_BAR_KEY, UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY, ESC_KEY];

            if (supportKeys.indexOf(e.keyCode) === -1) {
                return;
            }

            if (e.data && e.data.notSupport) {
                if (e.data.notSupport.indexOf(e.keyCode) !== -1) {
                    return;
                }
            }

            var target = $(e.target);

            if (e.keyCode !== TAB_KEY) {
                e.preventDefault();
            }

            var parent, nextItem;

            //Handle focus status
            switch (e.keyCode) {
                case TAB_KEY:
                    if (target.get(0).tagName === "A" && target.closest("ul").closest("div").hasClass("selectlist-multiple")) {
                        target.find("input[type='checkbox']").focus();
                    }
                    //Handle scrollbar status
                    parent = getRootNode($(e.target));
                    nextItem = getNextItem(parent, e);
                    if (isScrollNeeded(parent, nextItem)) {
                        $(parent).mCustomScrollbar('scrollTo', nextItem, { scrollInertia: 0 });
                    }
                    break;
                case ESC_KEY:
                    if (target.get(0).tagName === "A" && target.closest("ul").closest("div").hasClass("selectlist-multiple")) {
                        target.closest(".dropdown-menu").prev().trigger('click');
                    }
                    else if (target.get(0).tagName === "INPUT" && target.closest("ul").closest("div").hasClass("selectlist-multiple")) {
                        //target is input, somewhere call this section again, so need stop event propagation
                        target.closest(".dropdown-menu").prev().trigger('click');
                        e.stopPropagation();
                    }
                    break;
                case SPACE_BAR_KEY:
                    if (target.get(0).tagName === "A" && target.closest("ul").closest("div").hasClass("selectlist-multiple")) {
                        target.find("input[type='checkbox']").trigger('click');
                    }
                    else if (target.get(0).tagName === "INPUT" && target.closest("ul").closest("div").hasClass("selectlist-multiple")) {
                        //target is input, somewhere call this section again, so need stop event propagation
                        target.trigger('click');
                        e.stopPropagation();
                    } else if (target.is('li') && target.parent().hasClass('n-banner-nav')) {
                        if (!target.closest('li').hasClass('disabled')) {
                            target.tab('show');
                        }
                    } else if (target.hasClass("n-close")){
                        target.find(".icon-close").click();
                    }else {
                        target.trigger('click');
                    }
                    break;
                case UP_KEY:
                case DOWN_KEY:
                    e.preventDefault();
                    e.stopPropagation();
                    parent = getRootNode($(e.target));
                    nextItem = getNextItem(parent, e);
                    nextItem.trigger('focus');
                    //Handle scrollbar status
                    if (isScrollNeeded(parent, nextItem)) {
                        $(parent).mCustomScrollbar('scrollTo', nextItem, { scrollInertia: 0, timeout: 1 });
                    }
                    break;
                case LEFT_KEY:
                case RIGHT_KEY:
                    if (target.is('a') && (target.closest('ul').hasClass('n-banner-nav') ||
                        target.closest('ul').hasClass('nav-tabs')) ||
                        target.closest('ul').hasClass('n_banner_3rd_subItem')) {
                        parent = getRootNode(target);
                        nextItem = getNextItem(parent, e);
                        nextItem.trigger('focus');
                    }
                    break;
                default:
                    break;
            }
        },

        getAllVisibleSubItems: function (target) {
            return getAllVisibleSubItems(target);
        },

        isScrollNeeded: function (parent, item) {
            return isScrollNeeded(parent, item);
        },

        isHiddenElement: function (target) {
            return isHiddenElement(target);
        }
    };

    // KEYBOARD CORE INTERNAL METHODS
    // ==============================

    function getRootNode(target) {
        if (target.hasClass('n-list-group-item')) {
            if (target.is('dd')) {
                return target.closest('dl');
            }
            return target.closest('ul');
        }

        if (target.hasClass('tree-branch-name') || target.hasClass('tree-item-name')) {
            return target.closest('ul.tree');
        }

        return target.closest('ul');
    }

    function getNextItem(parent, e) {
        var items = getAllVisibleSubItems(parent);
        var indx = items.index(e.target);
        switch (e.keyCode) {
            case TAB_KEY: // Tab or Shift+tab
                indx = (e.shiftKey ? (indx > 0 ? indx - 1 : 0) : (indx < items.length - 1 ? indx + 1 : items.length - 1));
                break;
            case LEFT_KEY:
            case UP_KEY:
                indx = indx > 0 ? indx - 1 : 0;
                break;
            case RIGHT_KEY:
            case DOWN_KEY:
                indx = indx < items.length - 1 ? indx + 1 : items.length - 1;
                break;
            default:
                break;
        }
        return items.eq(indx);
    }

    function getAllVisibleSubItems(target) {
        if (target.children().children().hasClass("datepicker")) {
            return target.children();
        }
        if (target.children().hasClass("datepicker")) {
            return target.parent().children();
        }
        if (target.prev().children().hasClass("datepicker")) {
            return target.parent().children();
        }

        if ($(target).hasClass('n-list-group')) {
            if ($(target).is('dl')) {
                return target.find('dd');
            }
            return target.find('li');
        }

        if ($(target).hasClass('n-flyout-menu')) {
            return target.find('li a');
        }

        if ($(target).hasClass('n-banner-tabs') || $(target).hasClass('nav-tabs')) {
            return target.children('li:not([disabled])').children('a');
        }

        if ($(target).hasClass('dropdown-menu')) {
            if (target.closest("ul.n-banner-links").length > 0) {
                return target.parent('li:not(.disabled)').find('a:not([disabled]):visible');
            }
            else {
                return target.find('li:not(.disabled)').children('a:not([disabled]):visible');
            }
        }

        if ($(target).hasClass('tree')) {
            var itemArr = [];
            var items = target.find('li:not(.hide) a');
            for (var i = 0; i <= items.length - 1; i++) {
                if (!isTreeItemHidden($(items[i]))) {
                    itemArr.push(items[i]);
                }
            }
            return $(itemArr);
        }
        if ($(target).is('tr') && !isHiddenElement(target)) {
            if($(target).parent().is('.n-multicolumn-list thead')){
                return target.find('th');
            }else{
                return target.find('td');
            }
        }

        if ($(target).hasClass('n-banner-links') || $(target).hasClass('n_banner_3rd_subItem')) {
            return target.children('li:not([disabled])').find(">a");
        }

        return target.find('li');
    }

    function isScrollNeeded(parent, item) {
        if ($(parent).find('.mCSB_container').length === 0) {
            return;
        }
        if ($(item).closest('table').hasClass('datepicker-calendar-days')) {
            return;
        }

        var parentTop = $(parent).offset().top;
        var itemTop = $(item).offset().top;
        var parentHeight = $(parent).get(0).clientHeight;
        var itemHeight = item.get(0).offsetHeight;
        var topDiff = itemTop - parentTop;
        var bottomDiff = topDiff + itemHeight;
        return (topDiff < 10 || bottomDiff > parentHeight - 10);
    }

    function isTreeItemHidden(target) {
        var isHidden = false;
        var parent = target.parent();
        while (!parent.hasClass('tree') && !parent.is('html')) {
            if (parent.closest('ul').hasClass('hidden')) {
                isHidden = true;
                break;
            }
            parent = parent.parent();
        }
        return isHidden;
    }

    function isHiddenElement(target) {
        var display = target.css ('display') === 'none';
        var visibility = target.css ('visibility') === 'hidden';
        var height = target.height () === 0;
        return display || visibility || height;
    }

    $(document)
    /** add keyboard event for pull down && combo box*/
        .on('keydown.wf.common.keyboard', '.dropdown-menu', KeyboardCore.commonKeyboardHandler)
        //.on('keydown.wf.selectlist.keyboard', '.selectlist', KeyboardCore.commonKeyboardHandler)
        .on('keydown.wf.common.keyboard', '.icon-close', { notSupport: [UP_KEY, DOWN_KEY] }, KeyboardCore.commonKeyboardHandler)
        .on('keydown.wf.common.keyboard', '.n-close', { notSupport: [UP_KEY, DOWN_KEY] }, KeyboardCore.commonKeyboardHandler)
        .on('keydown.wf.common.keyboard', 'a[data-toggle=modal]', KeyboardCore.commonKeyboardHandler);

    $.wfKBCore = KeyboardCore;
}
));