/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './tables'], factory); //Currently drilldown can only be used in table, so table.js is dependence.
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }

            }
            factory(jQuery, require('./tables'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

        'use strict';

        var Drilldown = {
            toggle: function (e) {
                var $table = $(this).closest('table');

                initDrilldownContentBottomRadius($table);

                if (isFunctionKey(e)) {
                    return;
                }

                var isSelected, isExpanded;
                if ($(this).is('tr')) {
                    isSelected = true;
                    isExpanded = $(this).find('td').data('expanded');
                } else {
                    isSelected = $(this).hasClass('n-drilldown-item-selected');
                    isExpanded = $(this).data('expanded');
                }
                var targetContent = $($(this).data('targetSelector'));

                //collapseSiblingsContentIfNeeded(targetContent);
                if (isExpanded === true && isSelected === true) {
                    collapseDrilldownContent(targetContent);
                } else {
                    var arrowDistance = $(this).position().left + $(this).width() / 2;
                    var arrowDistancePxValue = arrowDistance + 'px';

                    if (isExpanded === true && isSelected === false) {
                        selectDrilldownContent(targetContent, $(this), arrowDistancePxValue);
                    } else {
                        expandDrilldownContent(targetContent, $(this), arrowDistancePxValue);
                    }
                }

            },

            collapse: function (e) {
                if (e.keyCode === 27 || typeof(e.keyCode) === "undefined") {
                    var content, row;
                    if ($(this).is('span')) {
                        content = $(this).closest('.n-drillDown-collapsed');
                        row = $(this).closest(".n-drillDown-collapsed-row");
                    }
                    else if ($(this).is('button')) {
                        content = $(this).closest('.n-drillDown-collapsed');
                        row = $(this).closest(".n-drillDown-collapsed-row");
                    }
                    else if ($(this).is('table')) {
                        content = $(this).find('.n-drillDown-collapsed');
                        row = $(this).find(".n-drillDown-collapsed-row");
                    }

                    if (content.length > 0) {
                        collapseDrilldownContent(content);
                    } else if (row.length > 0) {
                        collapseDrilldownRow(row);
                    }
                }
            },

            relocateArrow: function () {
                var drilldownItem = $('.n-drilldown-item-selected');
                if (drilldownItem.length === 0) {
                    return;
                }
                var arrowDistance = drilldownItem.position().left + drilldownItem.width() / 2;
                var arrowDistancePxValue = arrowDistance + "px";
                $(".n-drillDown-arrow").css("left", arrowDistancePxValue);
            }
        };

        // DRILLDOWN INTERNAL METHODS
        // ==========================

        function collapseDrilldownContent(content) {
            content.slideUp(function () {
                var $table = $(this).closest('table');
                setBottomRadius($table, '7');
            });
            itemCollapse(content);
        }

        function selectDrilldownContent(content, item, arrowDistance) {
            $('.n-drillDown-arrow').animate({ left: arrowDistance });
            if(content.parent().is('wf-drilldown')) {
                content.parent().show().siblings().children().stop(true, true).hide();
                content.show();
            } else {
                content.show().siblings().stop(true, true).hide();
            }
            itemSelect(item);
        }

        function expandDrilldownContent(content, item, arrowDistance) {
            $('.n-drillDown-collapsed').hide();
            $('.n-drillDown-collapsed-row').hide();
            $('.n-drillDown-arrow').css('left', arrowDistance);
            itemCollapse(content);

            content.slideDown();
            var $table = item.closest('table');
            var lastRowHeight = $table.find("tr:last").height();
            if (lastRowHeight > 0) {
                setBottomRadius($table, '0');
            } else {
                setBottomRadius($table, '7');
            }
            itemExpand(item);
        }

        function collapseDrilldownRow(row) {
            row.slideUp(function () {
                var $table = $(this).closest('table');
                setBottomRadius($table, '7');
            });
        }

        function initDrilldownContentBottomRadius (table) {
            var drilldownInner = table.find('tr:last-child').find('.n-drillDown-inner');
            drilldownInner.css('border-bottom-left-radius', '7px').css('border-bottom-right-radius', '7px');
            var drilldownContent = table.find('tr:last-child').find('.n-drillDown-content');
            drilldownContent.css('border-bottom-left-radius', '7px').css('border-bottom-right-radius', '7px');
        }

        function isFunctionKey(e) {
            var ctrlKeyPressed = (window.event && window.event.ctrlKey) || e.ctrlKey;
            var shiftKeyPressed = (window.event && window.event.shiftKey) || e.shiftKey;
            return ctrlKeyPressed || shiftKeyPressed;
        }

        function setBottomRadius(table, radius) {
            table.find('tr:nth-last-child(2)').find('td:first-child').css('border-bottom-left-radius', radius + 'px');
            table.find('tr:nth-last-child(2)').find('td:last-child').css('border-bottom-right-radius', radius + 'px');
        }

        function itemExpand(item) {
            $(item).children('span').addClass('n-drillDown-cell');
            if (item.is('td')){
                item.siblings('td').removeClass('n-drilldown-item-selected');
                item.addClass('n-drilldown-item-selected');
                item.data('expanded', true);
                item.siblings('td').data('expanded', true);
            }else {
                item.find('td').data('expanded', true);
            }
        }

        function itemCollapse(content) {
            content.closest('table').find('td').each(function() {
                $(this).data('expanded', false);
                $(this).removeClass('n-drilldown-item-selected');
            });
        }
        function itemSelect(item) {
            if (item.is('td')){
                item.siblings('td').removeClass('n-drilldown-item-selected');
                item.addClass('n-drilldown-item-selected');
            }
        }

        function collapseSiblingsContentIfNeeded(targetContent) {
            if(targetContent.parent().is('wf-drilldown')) {
                targetContent.parent().siblings().each(function (index, value) {
                    collapseDrilldownContent( $($(value).children()[0]) );
                });
            }
        }

        $(document).ready(function(){
            $("td.n-drillDown-item").attr("tabindex", 0);
            $("tr.n-drillDown-row").find('td').not('.text-center').attr("tabindex", 0);
        });
        $(document)
            .on('click.wf.drilldown', '.n-drillDown-item', Drilldown.toggle)
            .on('click.wf.drilldown', '.n-drillDown-row', Drilldown.toggle)
            .on('click.wf.drilldown', '.n-drillDown-content .icon-close-rounded', Drilldown.collapse)
            .on('click.wf.drilldown', '.n-drillDown-collapsed-row .icon-close-rounded', Drilldown.collapse)
            .on('click.wf.drilldown', '.n-drillDown-content .btn-close', Drilldown.collapse)
            .on('click.wf.drilldown', '.n-drillDown-collapsed-row .btn-close', Drilldown.collapse)
            .on('keyup.wf.drilldown.keyboard', '.n-drilldown-table', Drilldown.collapse);


        $(window).on('resize.wf.drilldown', Drilldown.relocateArrow);

        return Drilldown;
    }
));