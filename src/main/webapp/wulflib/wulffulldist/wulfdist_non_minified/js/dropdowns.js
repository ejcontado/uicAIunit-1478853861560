/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', 'fuelux/selectlist', './scroll', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('fuelux'), require('./scroll'), require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {
'use strict';
$.fn.extend({
    adaptiveSelectlist: function () {
        $(this).on('shown.bs.dropdown', function () {
            adjustDropdownMenuWidth($(this));
        });
    }
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({container: 'body'});
    $(".n-dropdown-menu-scroll").on("click", ".mCSB_dragger_bar,.mCSB_draggerRail", function (e) {
        e.stopPropagation();
    });
    var nPulldownMultiple = '<p class="prompt">--Select items--</p>';
    $('.selectlist-multiple').find('.selected-label').empty().append(nPulldownMultiple);
    $('.selectlist-multiple ul').on('click', function (e) {
        e.stopPropagation();
    });
    $('.selectlist-multiple input[type="checkbox"]').on('click', function () {
        var html,
            tooltip = "",
            title = $(this).next().children().text(),
            $multiSelect = $(this).closest('.selectlist-multiple');
        if ($(this).is(':checked')) {
            if ($multiSelect.find('.selected-label').find('span').length > 0) {
                html = '<span wulf-title="' + title + '">' + ", " + title + '</span>';
            } else {
                html = '<span wulf-title="' + title + '">' + title + '</span>';
            }
            $multiSelect.find('.prompt').hide();
            $multiSelect.find('.selected-label').append(html);
            $multiSelect.find('button').find('span[wulf-title]').each(function () {
                tooltip = tooltip + $(this).text();
            });
            $multiSelect.find('button').attr('data-original-title', tooltip);
        } else {
            $multiSelect.find('span[wulf-title="' + title + '"]').remove();
            var $firstSelectedItem = $($multiSelect.find('span').find('span').get(0));
            if ($firstSelectedItem.text().indexOf(", ") === 0) {
                $firstSelectedItem.text($firstSelectedItem.text().slice(2));
            }
            $multiSelect.find('button').find('span[wulf-title]').each(function () {
                tooltip = tooltip + $(this).text();
            });
            $multiSelect.find('button').attr('data-original-title', tooltip);
            if ($multiSelect.find('.selected-label').children().length === 1) {
                $multiSelect.find('.prompt').show();
                $multiSelect.find('button').removeAttr('data-original-title');
            }
        }
    });
});

$(document)
    .on('shown.bs.dropdown', '.n-table .selectlist', relocateDropdown)
    .on('scroll.wf.dropdown', closeDropdownOnScroll)
    .on('click.fu.selectlist', '.n-table-scrollbar .selectlist .dropdown-menu a', selectDropdownItem)
    .on("click", ".selectlist ul li a", function () {
        var $select = $(this).closest('.selectlist');
        $select.find('.btn.dropdown-toggle').removeAttr("data-original-title");
    })
    .on("mouseenter", ".selectlist .dropdown-menu li a", showDropdownItemTooltip)
    .on("focus", ".selectlist .dropdown-menu li a", showDropdownItemTooltip)
    .on("mouseleave", ".selectlist .dropdown-menu li a", function () {
        var $selectedElement = $(this);
        var $span = $selectedElement.find('span').not(".checkbox");
        $span.css("border-bottom-color", "");
        $span.removeClass("active");
    })
    .on("blur", ".selectlist .dropdown-menu li a", function () {
        var $selectedElement = $(this);
        var $span = $selectedElement.find('span').not(".checkbox");
        $span.css("border-bottom-color", "");
        $span.removeClass("active");
    })
    .on("mouseenter", "[data-toggle='dropdown']", showDropdownBtnTooltip)
    .on("mouseenter", ".n-combobutton-btn[data-toggle='tooltip']", showDropdownBtnTooltip)
    .on("focus", ".n-combobutton-btn[data-toggle='tooltip']", showDropdownBtnTooltip)
    .on("mouseleave", ".n-combobutton-btn[data-toggle='tooltip']", function () {
        var $selectedElement = $(this);
        $selectedElement.tooltip("hide");
    })
    .on("focus", "[data-toggle='dropdown']", showDropdownBtnTooltip)
    .on("mouseleave", "[data-toggle='dropdown']", function () {
        var $selectedElement = $(this);
        $selectedElement.tooltip("hide");
    }).on('keypress.n-dropdown-menu-scroll', function(e){
        // get the key that was pressed
        var key = String.fromCharCode(e.which);
        // look the items to find the first item with the first character match and set focus
        var focusedEle = document.activeElement;
        var expectEle = $(e.target).parent();
        if(focusedEle.tagName.toLowerCase() === 'a') {
            expectEle = $(e.target).closest('ul');
        }
        expectEle.find('li').each(function(idx, item){
            if ($(item).text().charAt(0).toLowerCase() === key) {
                var parent = $(item).closest('ul');
                var nextItem = $(item).children('a');
                $(parent).mCustomScrollbar('scrollTo', nextItem, { scrollInertia: 0 });
                return false;
            }
        });
});

$(window).on('resize.wf.dropdown', closeDropdownOnScroll);
$(window).on('resize.wf.dropdown', function () {
    $('.selectlist').each(function () {
        if ($(this).hasClass('open')) {
            adjustDropdownMenuWidth($(this));
        }
    });
});

function showDropdownItemTooltip() {
    /*jshint validthis:true */
    var $selectedElement = $(this);
    $selectedElement.removeAttr("data-original-title");
    $selectedElement.removeAttr("title");
    var $span = $selectedElement.find('span').not(".checkbox");
    var currentWidth = getCurrentStrWidth($span.html(), $span);
    if (currentWidth >= $selectedElement.width()) {
        $span.addClass("active");
        $span.css("border-bottom-color", "transparent");
        $selectedElement.attr("data-original-title", $($span).html());
        $selectedElement.tooltip("show");
    }
    else {
        $selectedElement.tooltip("hide");
    }
}

function showDropdownBtnTooltip() {
    /*jshint validthis:true */
    var $selectedElement = $(this);
    $selectedElement.removeAttr("data-original-title");
    $selectedElement.removeAttr("title");
    var $span = $selectedElement.find('.selected-label');
    var $trueSpan = $span.find("span");
    var valueLen = 0;
    var valuehtml = '';
    for (var i = 0; i < $trueSpan.length; i++) {
        valueLen += $($trueSpan[i]).width();
        valuehtml = valuehtml.concat($($trueSpan[i]).html());
    }
    var currentWidth = getCurrentStrWidth(valuehtml, $span);
    if (currentWidth >= $span.width()) {
        $selectedElement.attr("data-original-title", valuehtml);
        $selectedElement.tooltip("show");
    }
    else {
        $selectedElement.tooltip("hide");
    }
}

function getCurrentStrWidth(text, element) {
    var currentObj = $('<span>').hide().appendTo(document.body);
    if (element.css("font") !== "") {
        $(currentObj).html(text).css("font",element.css("font"));
    }
    else {
        $(currentObj).html(text).css("font-size",element.css("font-size"));
    }
    var width = currentObj.width();
    currentObj.remove();
    return width;
}

function relocateDropdown() {
    /*jshint validthis:true */
    var $dropdown = $(this);
    var ul = $dropdown.find('ul');
    if ($dropdown.data('position') === 'fixed') {
        ul.css('position', 'fixed');
        ul.css('top', $(this).offset().top + $(this).parent().height() - $(document).scrollTop());
        ul.css('left', $(this).offset().left - $(document).scrollLeft());
        ul.width($(this).parent().width());
    }
}

function closeDropdownOnScroll() {
    $('.dropdown-menu').each(function () {
        if ($(this).css('display') === 'block') {
            if ($(this).closest('.selectlist').data('position') === 'fixed') {
                $(this).parent().find('button.dropdown-toggle').trigger('click');
            }
        }
    });
}

function adjustDropdownMenuWidth($select) {
    var offset = $select.offset().left;
    var $dropDownMecu = $select.find('> .dropdown-menu');
    $dropDownMecu.css('width', 'auto');
    var dropdownWidth = $dropDownMecu.width();
    var windowWidth = $(window).width();
    if (offset + dropdownWidth > windowWidth) {
        $dropDownMecu.width(windowWidth - offset - 20);
    }
}

function selectDropdownItem() {
    /*jshint validthis:true */
    var $selectlist = $(this).closest('.selectlist');
    var val = $(this).closest('li').data('value');
    $selectlist.selectlist('selectByValue', val);
}

        // LIST GROUP KEYBOARD ACCESSIBILITY
        // =================================
        $(document).on('keydown.wf.dropdown.keyboard', '.dropdown-menu', $.wfKBCore.commonKeyboardHandler);
}
));
