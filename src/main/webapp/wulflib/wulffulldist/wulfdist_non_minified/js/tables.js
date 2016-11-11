/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', './keyboard/keyboard-table', './scroll', './dropdowns'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('./keyboard/keyboard-table'), require('./scroll'), require('./dropdowns'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

        'use strict';

        $(document).ready(function () {
            $(".n-table-hover, .n-table-cell-hover").mousedown(function (e) {
                if (e.shiftKey) {
                    // For non-IE browsers
                    e.preventDefault();
                    // For IE
                    if (typeof $.browser !== "undefined" && $.browser.msie) {
                        this.onselectstart = function () {
                            return false;
                        };
                        var selectionEvent = this;
                        window.setTimeout(function () {
                            selectionEvent.onselectstart = null;
                        }, 0);
                    }
                }
            });

            initTableScrollbar();

            //Cell selection
            $('.n-table-cell-hover').on('click', 'td', function () {
                $(this).closest('table').find('td').removeClass('n-cell-selected');
                $(this).closest('table').find('td').not('.n-drillDown-item').removeAttr('tabindex');
                // Do not add selected class to td in tfoot.
                if ($(this).closest('tfoot').length <= 0) {
                    $(this).addClass('n-cell-selected');
                    $(this).attr('tabindex', 0);
                    if(!$(this).closest('table').hasClass('n-drilldown-table')) {
                        $(this).trigger('focus');
                    }

                    // Cell with input field
                    $(this).children().each(function(){
                        if($(this).is('input') && $(this).attr('type') === 'text') {
                            $(this).trigger('focus');
                        } else if($(this).find('input')) {
                            if($(this).find('input').attr('type') === 'text'&& !$(this).closest('table').hasClass('n-drilldown-table')) {
                                $(this).find('input').trigger('focus');
                            }
                        }
                    });
                }
            });

            //Row selection
            var selectionPivot;
            $('.n-table-hover').on('click', 'td', function (e) {
                var trElements = $(this).closest('table').find('tr');
                var ctrlKeyPressed = (window.event && window.event.ctrlKey) || e.ctrlKey;
                var shiftKeyPressed = (window.event && window.event.shiftKey) || e.shiftKey;

                var isHighLighted = $(this).closest("tr").children("td").hasClass("n-cell-selected");

                if ($(this).closest('tfoot').length <= 0) {
                    $(this).closest("tr").children("td").removeClass("n-cell-selected");
                    $(this).closest('table').not('.n-drilldown-table').find('td').removeAttr('tabindex');

                    if (!ctrlKeyPressed && !shiftKeyPressed) {
                        selectionPivot = $(this).closest("tr");
                        $(this).closest('table').find('td').removeClass('n-cell-selected');
                        $(this).closest("tr").children("td").addClass("n-cell-selected");
                    }
                    else if (ctrlKeyPressed && !shiftKeyPressed) {
                        selectionPivot = $(this).closest("tr");
                        if (!isHighLighted) {
                            $(this).closest("tr").children("td").addClass("n-cell-selected");
                        }
                    }
                    else {
                        if (!ctrlKeyPressed) {
                            $(this).closest('table').find('td').removeClass('n-cell-selected');
                        }
                        if (typeof selectionPivot === "undefined" || ($(selectionPivot).closest("table").get(0) !== $(this).closest("table").get(0))) {
                            selectionPivot = $(this).closest("tr");
                            $(this).closest("tr").children("td").addClass("n-cell-selected");
                            return;
                        }
                        var bot = Math.min(selectionPivot[0].rowIndex, $(this).closest("tr")[0].rowIndex);
                        var top = Math.max(selectionPivot[0].rowIndex, $(this).closest("tr")[0].rowIndex);
                        for (var i = bot; i <= top; i++) {
                            $(trElements[i]).children("td").addClass("n-cell-selected");
                        }
                    }

                    $(this).attr('tabindex', 0);
                    if(!$(this).closest('table').hasClass('n-drilldown-table')) {
                        $(this).trigger('focus');
                    }
                    // Cell with input field
                    $(this).children().each(function(){
                        if($(this).is('input') && $(this).attr('type') === 'text'){
                            $(this).trigger('focus');
                        }
                    });
                }
            });

            $('.n-sortable').on('click', function () {
                $(this).find('> span').each(function () {
                    if ($(this).hasClass('icon-arrow')) {
                        $(this).removeClass('icon-arrow');
                        $(this).addClass("icon-arrow-up");
                    } else if ($(this).hasClass('icon-arrow-up')) {
                        $(this).removeClass('icon-arrow-up');
                        $(this).addClass("icon-arrow");
                    }
                });
            });

            $('.n-table-scrollbar').on('hidden.bs.dropdown', '.selectlist', function () {
                synchronizeTableColumnWidth();
            });
        });

        $(window).resize(function () {
            updateScrollTableWidth();
            synchronizeTableColumnWidth();
        });

        function initTableScrollbar() {
            adjustScrollTable();
            hideInvisibleHead();
            setTimeout(synchronizeTableColumnWidth, 0);
        }

        //insert and update some html code for every scroll table
        function adjustScrollTable() {
            $(".n-table-scrollbar").each(function () {
                var colspanTotal = $(this).closest("table.n-table").find("thead").eq(0).find("th").length;
                var theader = $(this).closest("table.n-table").find("thead").eq(0).html();
                var theaderReplace = theader.replace(/id="[a-zA-Z\-_0-9]*"/g,""); //WULF-1845, remove id definition in the theader part.
                var scrollTablePrefx = "<tr><th colspan='" + colspanTotal + "' style='padding: 0; border:none; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px;'><table class='n-table-scrollbar'>" + theaderReplace;
                var scrollTableSuffix = "</table></th></tr>";
                var scrollTableHtml = $(this).html();

                $(this).html(scrollTablePrefx + scrollTableHtml + scrollTableSuffix);
                $(this).removeClass("n-table-scrollbar");

                var scrollBody = $(this).find('.n-table-scrollbar');
                var option = {};
                if($(this).hasClass('scrollbar-not-autoupdate')){
                    option = {notAutoUpdate:true};
                }
                packageScrollTable(scrollBody, option);
            });
        }

        function packageScrollTable(scrollBody, option){
            scrollBody.nScrollbar(option);

            var tableWidth = scrollBody.closest("table.n-table").width();
            var container = scrollBody.find(".mCSB_container");
            var containerPrefix = "<table style='width: " + tableWidth + "px;'>";
            var containerSuffix = "</table>";
            container.html(containerPrefix + container.html() + containerSuffix);

            /** Temproary solution -- Remove the border-radius for mCustomScrollBox because of IE' bug.
             *
             * Refer to: https://connect.microsoft.com/IE/feedback/details/809779/ie9-ie10-position-fixed-child-disappears-when-inside-a-parent-with-position-border-radius-and-overflow-hidden
             * Refer to: http://stackoverflow.com/questions/20213286/ie10-border-radius-overflow-position-and-hidden-positionfixed-child
             * **/
            var ua= navigator.userAgent;
            var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                scrollBody.find('.mCustomScrollBox').css('border-radius', '0');
            }
        }

        function updateScrollTableWidth() {
            $(".n-table-scrollbar").each(function () {
                var tableWidth = $(this).closest("table.n-table").width();
                var table = $(this).find(".mCSB_container table");

                $(this).find(".mCSB_container table").each(function(){
                    if(!$(this).hasClass('datepicker-calendar-days')){
                        $(this).width(tableWidth);
                    }
                });
            });
        }

        function hideInvisibleHead() {
            $(".n-table-scrollbar").each(function () {
                var theadRowCount = $(this).closest("table.n-table").find("thead").children().length;
                // Hide the thead in scroll content
                for (var j = 0; j < theadRowCount; j++) {
                    /*jshint loopfunc: true */
                    $(this).closest("table.n-table").find(".mCSB_container").find('tr').eq(j).find('th').each(function () {
                        $(this).css('visibility', 'hidden').css('height', '0').css('line-height', '0').css('border-bottom', '0');
                        $(this).find('span').css('display', 'none');
                        // For filter header in scroll content.
                        $(this).find('div').css('visibility', 'hidden').css('height', '0')
                            .css('padding-top', '0').css('padding-bottom', '0').css('margin-top', '0').css('margin-bottom', '0')
                            .css('border-top', '0').css('border-bottom', '0');
                        $(this).find('input').css('visibility', 'hidden').css('height', '0')
                            .css('padding-top', '0').css('padding-bottom', '0').css('margin', '0').css('margin-bottom', '0')
                            .css('border-top', '0').css('border-bottom', '0');
                        $(this).find('button').css('visibility', 'hidden').css('height', '0')
                            .css('padding-top', '0').css('padding-bottom', '0').css('margin', '0').css('margin-bottom', '0')
                            .css('border-top', '0').css('border-bottom', '0');
                    });
                }
            });
        }

        function synchronizeTableColumnWidth() {
            $(".n-table-scrollbar").each(function () {
                var tableWidth = $(this).closest("table.n-table").width();
                // reset the widht of thead to fit tbody
                var theadCols = $(this).closest("table.n-table").find("thead").eq(0).find("th");
                var tbodyCols = $(this).find("tr").eq(0).children();
                var sumColWidth = 0;
                var targetWidths = [];
                var i;
                for (i = 0; i < tbodyCols.length; i++) {
                    sumColWidth += parseFloat($(tbodyCols[i]).outerWidth());
                    var targetWidth = parseFloat($(tbodyCols[i]).width());
                    if (i === tbodyCols.length - 1 && sumColWidth !== tableWidth) {
                        targetWidth = targetWidth + (tableWidth - sumColWidth);
                    }
                    targetWidths.push(targetWidth);
                }
                for (i = 0; i < tbodyCols.length; i++) {
                    $(theadCols[i]).width(targetWidths[i]);
                    $(tbodyCols[i]).width(targetWidths[i]);
                }
            });
        }


        // TABLE KEYBOARD ACCESSIBILITY
        // ============================
        $(document).on('keydown.wf.table.keyboard', '.n-table:not(.n-keyboard-off) tbody', $.wfKBTable.tableKeyboardHandler);
    }
));

