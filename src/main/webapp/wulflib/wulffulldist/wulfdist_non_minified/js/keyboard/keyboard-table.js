/**
 * Created by jiangdai on 2016/5/10.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    var ENTER_KEY = 13;
    var SPACE_BAR_KEY = 32;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var TAB_KEY = 9;
    var ESC_KEY = 27;

    $.wfKBTable =  {
        tableKeyboardHandler: function (e) {
            var supportKeys = [TAB_KEY, SPACE_BAR_KEY, ENTER_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY,ESC_KEY];
            var selectedClassName = 'n-cell-selected';

            if (supportKeys.indexOf(e.which) === -1) {
                return;
            }

            initTableSelected(e, selectedClassName);

            switch (e.keyCode) {
                case SPACE_BAR_KEY:
                case ENTER_KEY:
                    handleTableSpaceAndEntryKeyboardAction(e);
                    break;
                case LEFT_KEY:
                case RIGHT_KEY:
                case UP_KEY:
                case DOWN_KEY:
                    handleTableDirectionKeyAction(e, selectedClassName);
                    break;
                case TAB_KEY:
                    handleTableTabKeyboardAction(e, selectedClassName);
                    break;
                case ESC_KEY:
                    handleEscapeKeyAction(e,selectedClassName);
                    break;
            }
        },

        handleTableDirectionKeyAction: function(e, className) {
            handleTableDirectionKeyAction(e, className);
        }
    };

    // KEYBOARD TABLE INTERNAL METHODS
    // ===============================

    function initTableSelected(e, className) {
        var current = $(e.target);

        // Remove the selected class for all items in table
        current.closest('table').find('td').each(function () {
            $(this).removeClass(className);
        });

        // Only keep the selected class for current item
        if (current.is('td')) {
            if (current.closest('table').hasClass('n-table-hover')) {
                current.closest('tr').find('td').each(function () {
                    $(this).addClass(className);
                });
            } else {
                current.addClass(className);
            }
        }
    }

    function handleTableSpaceAndEntryKeyboardAction(e) {
        var current = $(e.target);
        if (current.is('td')) {
            // If the current focus is on table element, prevent the default key action.
            e.preventDefault();
            $(e.target).trigger('click');
            if (current.find('input').length > 0) {
                // If the focused element is input filed or checkbox.
                current.find('input').focus();
                //make the cursor to the end.
                current.find('input').val(current.find('input').val());

                // If the focused element is dropdown list.
                if (current.find('.selectlist').length > 0) {
                    current.find('button').trigger("click");
                }

                //WULF-867 calendar keyboard support in table
                if (current.find('.n-calendar').length > 0) {
                    current.find('button').focus();
                }
            }
        }
    }

    function handleTableDirectionKeyAction(e, className) {
        var current = $(e.target);

        // If the current focus is on table element, prevent the default key action.
        if ((current.attr('type') !== 'text') && (!current.is('td')) && (!current.parent().parent().parent().hasClass('n-multicolumn-list')) && current.find('.n-calendar').length <= 0) {
            // dropup the possible list element.
            collapseListInTable(current);
            current = current.closest('td');
        }

        var target = getNextTableItem(current, e);

        // Remove the selected class on current element and add selected class to target element.
        if (target.length > 0 && !(current.hasClass('n-inputfield'))) {
            e.preventDefault();
            if (!current.closest('table').hasClass('n-table-hover')) {
                //WULF-867 calendar keyboard support in table
                if (!current.closest('table').hasClass('datepicker-calendar-days') &&
                    (e.keyCode === LEFT_KEY || e.keyCode === RIGHT_KEY || e.keyCode === UP_KEY || e.keyCode === DOWN_KEY) &&
                    current.find('.datepicker').find('.dropdown-toggle').attr('aria-expanded') === 'true'){
                    current.find('.datepicker').find('.dropdown-toggle').trigger('click').blur();
                }
                current.removeClass(className);
                target.addClass(className);
            } else {
                current.closest('tr').find('td').each(function () {
                    $(this).removeClass(className);
                });
                target.closest('tr').find('td').each(function () {
                    $(this).addClass(className);
                });
            }
            if (!current.hasClass('n-drillDown-item')){
                current.removeAttr('tabindex');
            }
            target.attr('tabindex', 0);
            target.trigger('focus');
        }

        //Handle scrollbar status
        var parent = target.closest('.n-table-scrollbar');
        if ($.wfKBCore.isScrollNeeded(parent, target)) {
            $(parent).mCustomScrollbar('scrollTo', target, { scrollInertia: 0 });
        }
    }

    function handleTableTabKeyboardAction(e, className) {
        var current = $(e.target);
        current.closest('table').not('.n-drilldown-table').find('td').removeAttr('tabindex');
        if(current.parent().parent().parent().hasClass('n-multicolumn-list')){
            $(".n-multicolumn-list tbody:not(.group) td, th, .n-multicolumn-list tbody.group").prop("tabIndex", 0);
        }
        current.closest('.n-table').find('td').each(function () {
            $(this).removeClass(className);
        });
    }

    function handleEscapeKeyAction(e,selectedClassName){
        var current = $(e.target);
        if (current.get(0).tagName === "INPUT" && current.hasClass("n-inputfield")){
            current.parent().focus().addClass(selectedClassName);
        }
    }
    function getNextTableItem(current, e) {
        if (current.hasClass("n-inputfield") && !current.parent().hasClass('n-calendar')) {
            current = current.closest('td');
        }

        var items = $.wfKBCore.getAllVisibleSubItems(current.parent());

        var index = items.index(current);
        var prev, next;
        switch (e.keyCode) {
            case TAB_KEY:
                if (e.shiftKey) {
                    if (index > 0) {
                        index--;
                    } else {
                        index = items.length - 1;
                        prev = current.parent().prev();
                        while ($.wfKBCore.isHiddenElement(prev)) {
                            prev = prev.prev();
                        }
                        items = $.wfKBCore.getAllVisibleSubItems(prev);
                    }
                } else {
                    if (index < items.length - 1) {
                        index++;
                    } else {
                        index = 0;
                        next = current.parent().next();
                        while ($.wfKBCore.isHiddenElement(next)) {
                            next = next.next();
                        }
                        items = $.wfKBCore.getAllVisibleSubItems(next);
                    }
                }
                break;
            case LEFT_KEY:
                index = index > 0 ? index - 1 : 0;
                break;
            case RIGHT_KEY:
                index = index < items.length - 1 ? index + 1 : items.length - 1;
                break;
            case UP_KEY:
                    if(current.parent().is('.n-multicolumn-list tbody tr:first-child')){
                        prev = current.parent().parent().prev().find('tr');
                    }else{
                        prev = current.parent().prev();
                    }
                while ($.wfKBCore.isHiddenElement(prev)) {
                    prev = prev.prev();
                }
                items = prev.length > 0 ? $.wfKBCore.getAllVisibleSubItems(prev) : items;
                break;
            case DOWN_KEY:
                    if(current.hasClass('n-multicolumn-list-th')){
                        next = current.parent().parent().next().find('tr:first-child');
                    }else{
                        next = current.parent().next();
                    }
                while ($.wfKBCore.isHiddenElement(next)) {
                    next = next.next();
                }
                items = next.length > 0 ? $.wfKBCore.getAllVisibleSubItems(next) : items;
                break;
            default:
                break;
        }
        if (current.closest('.n-calendar').length > 0) {
            if (items.eq(index).hasClass('last-month') || items.eq(index).hasClass('next-month')) {
                return current;
            }
            if ((current.closest('.n-calendar-lock-past').length > 0 || current.closest('.n-data-range-end').length > 0) && items.eq(index).hasClass('past')) {
                return current;
            }
        }
        return items.eq(index);
    }

    /**
     * Dropup the list if the element is a dropdown list.
     *
     * @param current - the current focused element.
     */
    function collapseListInTable(current) {
        if (current.closest('div').hasClass('selectlist')) {
            if (current.closest('div').find('button').attr('aria-expanded') === 'true') {
                current.closest('div').find('button').trigger('click');
            }
        }
    }
}
));