/**
 * Created by aboque on 4/11/2016.
 */
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

    $(document).ready(function() {
        /* Adds buffer width for bold style to prevent unnecessary movement of items*/
        $('.nav-local-menu li').each(function() {
            addBoldBufferWidth($(this));
        });

        $('.nav-local-menu-divided li').each(function() {
            addBoldBufferWidth($(this));
        });
    });

    $('.nav-local').on('click', 'li', function() {
        $(this).siblings('li').removeClass('selected');
        $(this).addClass('selected');
    });

    function addBoldBufferWidth(element) {
        var wid = element.width();
        var normalBuffer = 3;
        var selectedBuffer = 1;

        if (element.hasClass('selected')){
            wid += selectedBuffer;
        }
        else {
            wid += normalBuffer;
        }

        element.css('width', wid + 'px');
    }

    var Drilldown = {
        toggle: function () {

            var isSelected;
            if($(this).is('.n-drillDown-item')){
                isSelected = $(this).hasClass('n-drilldown-item-selected');
            }
            var targetContent = $($(this).data('targetSelector'));
            if (isSelected === true) {
                collapseDrilldownContent(targetContent,$(this));
            } else {
                expandDrilldownContent(targetContent, $(this));
            }
        },
        collapse: function (e) {
            if (e.keyCode === 27 || typeof(e.keyCode) === "undefined") {
                var content;
                if ($(this).is('span')) {
                    content = $(this).closest('.n-drillDown-collapsed');
                } else if ($(this).is(".nav-local-inline-toolbar")) {
                    content = $(this).siblings().find('.n-drillDown-collapsed');
                }
                if (content.length > 0) {
                    collapseDrilldownContent(content);
                }
            }
        }
    };
    function itemSelect(){
        $(".n-drillDown-item").removeClass('n-drilldown-item-selected');
    }
    function expandDrilldownContent(content, item) {
        $(".n-drillDown-collapsed").hide();
        $(".contents").removeClass('select');
        item.closest(".contents").addClass('select');
        content.slideDown();
        itemSelect();
        itemExpand(item);
    }
    function collapseDrilldownContent(content) {
        $(".contents").removeClass('select');
        content.slideUp();
        itemSelect();
    }
    function itemExpand(item) {
        if (item.is('.n-drillDown-item')){
            item.addClass('n-drilldown-item-selected');
        }
    }
    $(document)
        .on('click.wf.drilldown', '.n-drillDown-item', Drilldown.toggle)
        .on('click.wf.drilldown', '.n-drillDown-content .icon-close-rounded', Drilldown.collapse)
        .on('keyup.wf.drilldown.keyboard', '.nav-local-inline-toolbar', Drilldown.collapse);
    return Drilldown;

}));