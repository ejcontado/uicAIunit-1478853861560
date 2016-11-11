/**
 * Created by linaqiu on 2015/8/5.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-core', './keyboard/keyboard-grid','./tabbable', 'jqxcore', 'jqxdata', 'jqxbuttons', 'jqxscrollbar',
            'jqxmenu', 'jqxcheckbox', 'jqxlistbox', 'jqxdropdownlist',
            'jqxgrid', 'jqxgrid.filter', 'jqxgrid.pager', 'jqxgrid.sort',
            'jqxgrid.edit', 'jqxgrid.selection', 'jqxgrid.columnsresize',
            'jqxgrid.columnsreorder', 'jqxdata.export', 'jqxgrid.export', 'jqxpanel', 'jqxcombobox'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-core'), require('./keyboard/keyboard-grid'), require('jqwidgets-framework/jqwidgets/jqx-all'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    jQuery.browser = {};
    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    var $jqxTable = $('.n-jqxgrid-table');
    $.grid = {
        /*---------------- nokia TextField render/editor ----------------*/
        nTextFieldCellRenderer: function (row, column, value) {
            var gridId = $(this.element).closest('.jqx-grid').attr('id');
            var disabled = $("#" + gridId).jqxGrid('disabled');
            if (disabled)
            {
                return '<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1" disabled/>';
            }
            return '<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1"/>';
        },

        nCreateTextFieldEditor: function (row, cellValue, editor) {
            // construct the editor.
            var element = $('<input class="n-inputfield n-inputfield-small" />');
            editor.append(element);

            editor.on('keydown', function(e) {
                handleTabKey(e, $(this), row);
            });
        },

        nInitTextFieldEditor: function (row, cellValue, editor) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var inputHTMLElement = editor.find("input");
            inputHTMLElement.val(cellValue);
            setTimeout(function() {
                inputHTMLElement.focus();
            }, 50);
        },

        nGetTextFieldEditorValue: function (row, cellValue, editor) {
            return editor.find("input").val();
        },

        /*---------------- nokia Indicator textField render/editor ----------------*/
        nIndicatorTextFieldCellRenderer: function (gridId) {
            return function (row, columnfield, value) {
                var edited = '';
                $(gridId + " .n-grid-inputfield-indicated").each(function () {
                    var idMatched = false;
                    var id = $(this).parent().attr('id');
                    if (id !== undefined) {
                        if (id.indexOf(columnfield + "_" + row) >= 0) {
                            idMatched = true;
                        }
                    }

                    if ($(this).find("input").val() === value && idMatched) {
                        if ($(this).find(".icon").hasClass("icon-edited-small")) {
                            edited = 'icon-edited-small';
                        }
                    }
                });

                return '<div class="n-grid-inputfield-indicated">' +
                    '<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1">' +
                    '<a class="form-control-feedback"><span class="icon ' + edited + '"></span></a>' +
                    '</div>';
            };
        },

        nCreateIndicatorTextFieldEditor: function (row, cellValue, editor) {
            // construct the editor.
            var gridId = editor.parent().attr("id").replace("contenttable", "");
            var isIndicatedByCell = checkIndicatedByCell(editor);
            var element = '<div class="n-grid-inputfield-indicated">' +
                '<input class="n-inputfield n-inputfield-small"/>' +
                '<a class="form-control-feedback"><span class="icon"></span></a>' +
                '</div>';
            editor.append(element);
            var editorId = editor.attr("id");
            var inputHTMLElement = editor.find("input");
            inputHTMLElement.bind('input', function () {
                if (inputHTMLElement.val() !== cellValue) {
                    if (isIndicatedByCell) {
                        editor.find(".icon").addClass("icon-edited-small");
                    }
                    $("#" + gridId + " #n-row-indicated-" + row + " > span").addClass("icon-edited-white");
                    addChangedCol(row, editorId, gridId);
                } else {
                    editor.find(".icon").removeClass("icon-edited-small");
                    removeChangedCol(row, editorId, gridId);
                }
            });

            editor.on('keydown', function(e) {
                handleTabKey(e, $(this), row);
            });
        },

        nInitIndicatorTextFieldEditor: function (row, cellValue, editor) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var inputHTMLElement = editor.find("input");
            inputHTMLElement.val(cellValue);
            inputHTMLElement.focus();
        },

        nGetIndicatorTextFieldEditorValue: function (row, cellValue, editor) {
            return editor.find("input").val();
        },

        /*---------------- nokia String Field render/editor ----------------*/
        nStringCellRenderer: function (row, columnfield, value, defaulthtml) {
            var html = defaulthtml;
            if (value.indexOf('#errordata#') !== -1) {
                html = html.replace('class="', 'class="n-cell-error ');
                html = html.replace('#errordata#', '');
            }
            return html;
        },

        /*---------------- nokia Number Field render/editor ----------------*/
        nNumberCellRenderer: function (row, columnfield, value, defaulthtml) {
            var cellValue = value.toString();
            var html = defaulthtml;
            if (cellValue.indexOf('((') === 0 && cellValue.indexOf('))') === cellValue.length - 2) {
                html = html.replace('class="', 'class="n-cell-error ');
                html = html.replace('((', '');
                html = html.replace('))', '');
            }
            return html;
        },

        /*---------------- nokia Checkbox render/editor ----------------*/
        nCheckboxCellsrenderer: function (checkLabel) {
            var _checkLabel = checkLabel;

            return function (row, column, value) {
                var gridId = $(this.element).closest('.jqx-grid').attr('id');
                var disabled = $("#" + gridId).jqxGrid('disabled');
                var checkboxId = 'cb' + row + Date.now();
                return '<div class="checkbox checkbox-small">' +
                    '<input id="' + checkboxId + '" type="checkbox" ' + (value ? ' checked="true"' : '') + ' tabindex="-1" ' + (disabled ? ' disabled ': '')+ '/>' +
                    '<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
                    '</div>';
            };
        },
        nCreateCheckboxEditor: function (checkLabel) {
            var _checkLabel = checkLabel;
            return function (row, value, editor) {
                // construct the editor.
                var checkboxId = 'cb' + row + Date.now();
                var target = (value) ? ' checked="true"' : '';
                var element = '<div class="checkbox checkbox-small margin-add-one">' +
                    '<input id="' + checkboxId + '" type="checkbox" ' + (target) + '/>' +
                    '<label for="' + checkboxId + '">' + _checkLabel + '</label>' + '</div>';
                editor.append(element);

                editor.on('keydown', function(e) {
                    handleTabKey(e, $(this), row);
                });
            };
        },

        nInitCheckboxEditor: function (row, cellValue, editor) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var inputHTMLElement = editor.find("input");
            var current = inputHTMLElement.prop("checked");
            inputHTMLElement.prop({
                checked: !current
            });
            inputHTMLElement.prop("checked");
            inputHTMLElement.focus();
        },
        nGetCheckboxEditorValue: function (row, cellValue, editor) {
            var inputHTMLElement = editor.find("input");
            return inputHTMLElement.prop("checked");
        },
        /*---------------- nokia Indicator Checkbox render/editor ----------------*/
        nIndicatorCheckboxCellsrenderer: function (gridId, checkLabel) {
            var _checkLabel = checkLabel;
            return function (row, column, value) {
                var edited = '';
                var orignalValue = '';
                $(gridId + " .grid-checkbox-indicated").each(function () {
                    var idMatched = false;
                    var id = $(this).parent().attr('id');
                    if (id !== undefined) {
                        if (id.indexOf(column + "_" + row) >= 0) {
                            idMatched = true;
                        }
                    }

                    if (idMatched) {
                        if ($(this).find(".icon").hasClass("icon-edited-small")) {
                            edited = 'icon-edited-small';
                        }
                        if ($(this).find(".icon").hasClass("icon-edited-small-white")) {
                            edited = 'icon-edited-small-white';
                        }
                        orignalValue = $(this).find("input").attr("orignal-value");
                    }
                });
                var checkboxId = 'cb' + row + Date.now();
                return '<div id="indicator-checkbox-' + row + '" class="checkbox checkbox-small grid-checkbox-indicated">' +
                    '<input id="' + checkboxId + '" type="checkbox" ' + (value ? ' checked="true"' : '') + ' orignal-value="' + orignalValue + '" tabindex="-1"/>' +
                    '<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
                    '<span class="icon align-right ' + edited + '"></span>' +
                    '</div>';
            };
        },
        nCreateIndicatorCheckboxEditor: function (checkLabel) {
            var _checkLabel = checkLabel;
            return function (row, value, editor) {
                // construct the editor.
                var checkboxId = 'cb' + row + Date.now();
                var target = (value) ? ' checked="true"' : '';
                var element = '<div id="indicator-checkbox-' + row + '" class="checkbox checkbox-small margin-add-one grid-checkbox-indicated">' +
                    '<input id="' + checkboxId + '" type="checkbox" ' + (target) + ' orignal-value="' + value + '"/>' +
                    '<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
                    '<span class="icon align-right editor"></span>' + '</div>';
                editor.append(element);

                editor.on('keydown', function(e) {
                    handleTabKey(e, $(this), row);
                });
            };
        },

        nInitIndicatorCheckboxEditor: function (row, cellValue, editor) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var gridId = editor.parent().attr("id").replace("contenttable", "");
            var isIndicatedByCell = checkIndicatedByCell(editor);
            var inputHTMLElement = editor.find("input");
            var current = inputHTMLElement.prop("checked");
            inputHTMLElement.prop({
                checked: !current
            });
            inputHTMLElement.prop("checked");
            inputHTMLElement.focus();
            var editorId = editor.attr("id");
            if (current.toString() === inputHTMLElement.attr("orignal-value")) {
                if (isIndicatedByCell) {
                    editor.find(".icon").addClass("icon-edited-small-white");
                }
                $("#" + gridId + " #n-row-indicated-" + row + " > span").addClass("icon-edited-white");
                addChangedCol(row, editorId, gridId);
            } else {
                editor.find(".icon").removeClass("icon-edited-small-white");
                removeChangedCol(row, editorId, gridId);
            }
            inputHTMLElement.change(function () {
                if (inputHTMLElement.prop("checked").toString() === inputHTMLElement.attr("orignal-value")) {
                    editor.find(".icon").removeClass("icon-edited-small-white");
                    removeChangedCol(row, editorId, gridId);
                } else {
                    if (isIndicatedByCell) {
                        editor.find(".icon").addClass("icon-edited-small-white");
                    }
                    $("#" + gridId + " #n-row-indicated-" + row + " > span").addClass("icon-edited-white");
                    addChangedCol(row, editorId, gridId);
                }
            });
        },
        nGetIndicatorCheckboxEditorValue: function (row, cellValue, editor) {
            var inputHTMLElement = editor.find("input");
            return inputHTMLElement.prop("checked");
        },
        /*---------------- nokia dropdownlist render/editor ----------------*/
        dropdownlistCellsrenderer: function (row, columnfield, value) {
            var gridId = $(this.element).closest('.jqx-grid').attr('id');
            var disabled = $("#" + gridId).jqxGrid('disabled');

            return '<div class="btn-group selectlist selectlist-small selectlist-resize' + (disabled ? ' disabled"' : '"')  + 'data-resize="none" data-initialize="selectlist">' +
                '<button class="btn btn-default dropdown-toggle' + (disabled ? ' disabled"' : '"') + 'data-toggle="dropdown" type="button" tabindex="-1"'+ (disabled ? ' disabled' : '') + '>' +
                '<span class="selected-label">' + value + '</span>' +
                '<span class="selected-caret" ><span class="caret"></span></span>' +
                '</button>' +
                '<ul class="dropdown-menu" role="menu">' +
                '<li data-value="1">' + '<a href="#">' + '<span>' + value + '</span>' + '</a>' + '</li>' +
                '</ul>' + '</div>';
        },

        dropdownlistEditor: function (dropdownlists) {
            var _dropdownlists = dropdownlists;
            return function (row, cellValue, editor, cellText, width) {
                editor.jqxDropDownList(
                    {
                        autoDropDownHeight: false,
                        itemHeight: 27,
                        dropDownHeight: '150px',
                        scrollBarSize: 8, width: width - 4, height: 24,
                        source: _dropdownlists.map(function (name) {
                            return "<span>" + name + "</span>";
                        })
                    });

                editor.on('keydown', function(e) {
                    handleTabKey(e, $(this), row);
                });
            };
        },

        dropdownlistInitEditor: function (row, cellValue, editor) {
            editor.jqxDropDownList('selectItem', '<span>' + cellValue + '</span>');
            editor.jqxDropDownList('focus');
            editor.jqxDropDownList('open');
        },

        dropdownlistEditorValue: function (row, cellValue, editor) {
            return editor.val();
        },
        /*---------------- nokia dropdownlist render/editor ----------------*/
        indicatorDropdownlistCellsrenderer: function (gridId) {
            return function (row, columnfield, value) {
                var edited = '';
                $(gridId + " .grid-selectlist-indicated").each(function () {
                    var idMatched = false;
                    var id = $(this).parent().attr('id');
                    if (id !== undefined) {
                        if (id.indexOf(columnfield + "_" + row) >= 0) {
                            idMatched = true;
                        }
                    }
                    if (idMatched) {
                        if ($(this).find(".icon").hasClass("icon-edited-small")) {
                            edited = 'icon-edited-small';
                        }
                    }
                });

                return '<div class="btn-group selectlist selectlist-small selectlist-resize selectlist-indicated" data-resize="none" data-initialize="selectlist" id="mySelectlist' + row + '">' +
                    '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" tabindex="-1">' +
                    '<span class="selected-label">' + value + '</span>' +
                    '<span class="selected-caret" ><span class="caret"></span></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' +
                    '<li data-value="1">' + '<a href="#">' + '<span>' + value + '</span>' + '</a>' + '</li>' +
                    '</ul>' +
                    '<a class="form-control-feedback">' +
                    '<span class="icon ' + edited + '"></span>' +
                    '</a>' +
                    '</div>';
            };
        },

        indicatorDropdownlistEditor: function (dropdownlists) {
            var _dropdownlists = dropdownlists;
            return function (row, cellValue, editor, cellText, width) {
                var gridId = editor.parent().attr("id").replace("contenttable", "");
                var isIndicatedByCell = checkIndicatedByCell(editor);
                var editorId = editor.attr("id");
                editor.jqxDropDownList({
                    autoDropDownHeight: false,
                    itemHeight: 27,
                    dropDownHeight: '150px',
                    scrollBarSize: 8, width: width - 4, height: 24,
                    source: _dropdownlists.map(function (name) {
                        return "<span>" + name + "</span>";
                    }),
                    selectionRenderer: function () {
                        var item = editor.jqxDropDownList('getSelectedItem');
                        if (item !== null) {
                            if (item.value.indexOf(cellText) >= 0) {
                                removeChangedCol(row, editorId, gridId);
                                return item.value;
                            } else {
                                addChangedCol(row, editorId, gridId);
                                $("#" + gridId + " #n-row-indicated-" + row + " > span").addClass("icon-edited-white");
                                if (isIndicatedByCell) {
                                    return item.value + '<div class="grid-selectlist-indicated"><a class="form-control-feedback"><span class="icon icon-edited-small"></span></a></div>';
                                } else {
                                    return item.value;
                                }
                            }
                        }
                    }
                });
                editor.on('keydown', function(e) {
                    handleTabKey(e, $(this), row);
                });
            };
        },

        indicatorDropdownlistInitEditor: function (row, cellValue, editor) {
            editor.jqxDropDownList('selectItem', '<span>' + cellValue + '</span>');
            editor.jqxDropDownList('focus');
            editor.jqxDropDownList('open');
        },

        indicatorDropdownlistEditorValue: function (row, cellValue, editor) {
            return editor.val();
        },

        /*---------------- nokia indicator ----------------*/
        indicatorRenderer: function (gridId) {
            return function (row) {
                var edited = '';
                if ($(gridId + " #n-row-indicated-" + row + " > span").hasClass("icon-edited")) {
                    edited = "icon-edited";
                }
                if ($(gridId + " #n-row-indicated-" + row + " > span").hasClass("icon-edited-white")) {
                    edited = "icon-edited-white";
                }
                var changedCol = $(gridId + " #n-row-indicated-" + row).attr("changed-col");
                if (changedCol === undefined) {
                    changedCol = '';
                }
                return '<div id="n-row-indicated-' + row + '" class="n-row-indicated text-center" changed-col="' + changedCol + '"><span class="icon ' + edited + '"></span></div>';
            };

        },

        indicatorRowSelectRenderer: function (gridId) {
            var $grid = $(gridId);
            $grid.bind('rowselect', function (event) {
                var row = event.args.rowindex;
                $(gridId + " .n-row-indicated").each(function () {
                    var icon = $(this).find("span");
                    if (icon.hasClass("icon-edited-white")) {
                        icon.removeClass("icon-edited-white");
                        icon.addClass("icon-edited");
                    }
                });
                if ($(gridId + " #n-row-indicated-" + row + " > span").hasClass("icon-edited")) {
                    $(gridId + " #n-row-indicated-" + row + " > span").removeClass("icon-edited");
                    $(gridId + " #n-row-indicated-" + row + " > span").addClass("icon-edited-white");
                }

                $(gridId + " .grid-checkbox-indicated").each(function () {
                    var cbId = $(this).attr("id");
                    var icon = $(this).find("span");
                    if (cbId.indexOf(row, cbId.length - row.length) === -1) {
                        if (icon.hasClass("icon-edited-small-white")) {
                            icon.removeClass("icon-edited-small-white");
                            icon.addClass("icon-edited-small");
                        }
                    } else {
                        if (icon.hasClass("icon-edited-small")) {
                            icon.removeClass("icon-edited-small");
                            icon.addClass("icon-edited-small-white");
                        }
                    }
                });
            });
        },

        /*---------------- nokia dropdownlist filter ----------------*/
        dropdownFilterRender: function (column, columnElement, widget) {
            widget.jqxDropDownList({
                scrollBarSize: 8,
                placeHolder: "No filter",
                filterable: true,
                filterPlaceHolder: "Filter",
                searchMode: 'containsignorecase',
                renderer: function (index, label) {
                    return "<span>" + label + "</span>";
                }
            });
        },

        dropdownFilterString: { filterchoosestring: "No filter" },

        //update the total information for paging bar on bottom-left
        updatePageInfor: function(gridID, totalRows, pagescount){
            var filterResult = $(gridID).find(".n-table-paging-left .n-table-data-total");
            filterResult.text('Total: ' + totalRows);
            if (pagescount) {
                var pagescountField = $(gridID).find('.pageField span').get(1);
                $(pagescountField).html('/ ' + pagescount);
            }

        },

        /*---------------- nokia paging render ----------------*/
        pagerrenderer: function (gridId, showPageAndFilter, pagesizeSource) {
            var $grid = $(gridId);
            var element = $("<div class=\"page-container\"></div>");
            var datainfo = $grid.jqxGrid('getdatainformation');
            var paginginfo = datainfo.paginginformation;
            var pagescount = paginginfo.pagescount;

            if (showPageAndFilter) {
                appendFilterPageLeft();
                addFilterEvent();
                appendMiddle();
                appendRight(pagesizeSource);
            }
            else {
                var filterable = $grid.jqxGrid('filterable');
                if (filterable) {
                    appendFilterPageLeft();
                    addFilterEvent();
                }
                else {
                    appendLeft();
                    appendMiddle();
                    appendRight(pagesizeSource);
                }
            }

            function addFilterEvent() {
                $grid.on("filter", function () {
                    var filterRows = $grid.jqxGrid('getrows');
                    var dataRows = $grid.jqxGrid('getboundrows');
                    var filterPageLeft = $grid.find(".n-table-paging-left");

                    if (dataRows.length === filterRows.length) {
                        filterPageLeft.removeClass("has-filter");
                        filterPageLeft.addClass("no-filter");
                    }
                    else {
                        filterPageLeft.removeClass("no-filter");
                        filterPageLeft.addClass("has-filter");
                        $(filterPageLeft).find(".n-table-filter-result span").html(filterRows.length);
                    }
                    setTimeout(recalculateScrollbars, 50);
                });
            }

            function appendFilterPageLeft() {
                var totalItem = $("<span class=\"n-table-paging-left no-filter\"><span class=\"icon icon-filter\"></span><span class=\"n-table-filter-result\">Results: <span></span></span><span class='n-table-data-total'>Total: " + datainfo.rowscount + "</span></span>");
                totalItem.appendTo(element);
            }

            function appendLeft() {
                var totalItem = $("<span class=\"n-table-paging-left\"><span class='n-table-data-total'>Total:" + datainfo.rowscount + "</span></span>");
                totalItem.appendTo(element);
            }

            function appendMiddle() {
                var centerField = $("<div class=\"n-table-paging-middle\"></div>");

                var firstButton = $("<button class=\"btn btn-icon page-first\" ><span class=\"icon icon-first\"></span></button>");
                var prevButton = $("<button class=\"btn btn-icon page-prev\" ><span class=\"icon icon-back\"></span></button>");

                var pageField = $("<div class='pageField'></div>");
                var pageInput = $("<input type=\"text\" class=\"n-inputfield n-inputfield-small\" />");
                $("<span>Page</span>").appendTo(pageField);
                pageInput.appendTo(pageField);
                $("<span>\/ " + pagescount + "</span>").appendTo(pageField);


                var nextButton = $("<button class=\"btn btn-icon page-next\" ><span class=\"icon icon-next\"></span></button>");
                var lastButton = $("<button class=\"btn btn-icon page-last\" ><span class=\"icon icon-last\"></span></button>");

                firstButton.appendTo(centerField);
                prevButton.appendTo(centerField);
                pageField.appendTo(centerField);
                nextButton.appendTo(centerField);
                lastButton.appendTo(centerField);
                centerField.appendTo(element);

                pageInput.val(parseInt(paginginfo.pagenum) + 1);

                firstButton.on('click', function () {
                    $grid.jqxGrid('gotopage', 0);
                    setTimeout(recalculateScrollbars, 50);
                });

                firstButton.off('keydown').on('keydown', function(e) {
                    if (e.which === 9 && e.shiftKey) {
                        e.preventDefault();
                        var id = $(this).closest('.jqx-widget-content').attr('id');
                        $('#wrapper' + id).trigger('focus');
                    }
                });

                prevButton.off('click').on('click', function () {
                    $grid.jqxGrid('gotoprevpage');
                    setTimeout(recalculateScrollbars, 50);
                });

                nextButton.off('click').on('click', function () {
                    $grid.jqxGrid('gotonextpage');
                    setTimeout(recalculateScrollbars, 50);
                });

                lastButton.off('click').on('click', function () {
                    $grid.jqxGrid('gotopage', pagescount);
                    setTimeout(recalculateScrollbars, 50);
                });

                pageInput.off('change').on('change', function () {
                    goToPage($(this).val());
                    setTimeout(recalculateScrollbars, 50);
                });

                pageInput.off('keydown').on('keydown', function (event) {
                    if (event.keyCode === 13) {
                        goToPage(pageInput.val());
                    }
                });

                $grid.off('pagechanged').on('pagechanged', function () {
                    var datainfo = $grid.jqxGrid('getdatainformation');
                    var paginginfo = datainfo.paginginformation;
                    pageInput.val(parseInt(paginginfo.pagenum) + 1);
                    setTimeout(recalculateScrollbars, 50);
                });

                function goToPage(inputVal) {
                    var pageIndex = parseInt(inputVal) - 1;
                    $grid.jqxGrid('gotopage', pageIndex);
                }
            }

            function appendRight(pagesizeSource) {
                var perPageField = $("<div class='n-table-paging-right'></div>");
                var perPageCombo = $("<div id=\"" + gridId + "jqxPerPageCombo" + "\"></div>");
                var index = $grid.jqxGrid('pagesize');
                var pSource = [10, 20, 30];
                if (pagesizeSource !== undefined){
                    pSource = pagesizeSource;
                }
                var selectedIndex = pSource.indexOf(index);
                perPageCombo.jqxComboBox({
                    source: pSource, width: 60, height: 24, selectedIndex: selectedIndex, autoDropDownHeight: true,
                    enableBrowserBoundsDetection: true,
                    renderer: function (index, label) {
                        return "<span>" + label + "</span>";
                    }
                });

                perPageCombo.appendTo(perPageField);
                $("<span>Items per page</span>").appendTo(perPageField);

                perPageField.appendTo(element);

                perPageCombo.on('open', function () {
                    $("div[id^='dropdownlistContent'] > input").attr("readonly", "readonly");
                });
                perPageCombo.off('change').on('change', function (event) {
                    var args = event.args;
                    if (args) {
                        $grid.jqxGrid('pagesize', args.item.originalItem);
                    }
                    setTimeout(recalculateScrollbars, 50);
                });
            }

            return element;
        },

        handlekeyboardnavigation: function (event) {
            var focusItem = $(':focus');
            if (($(event.target).is('body') && focusItem.get(0) === undefined) || focusItem.get(0) === event.target) {
                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if (key === 9) {
                    var $grid = $(event.target).closest('.jqx-grid');
                    var item;
                    if (event.shiftKey) {
                        if ($grid.length > 0) {
                            item = handleShiftTabInGrid(event, $grid);
                            if(!item) {
                                return true;
                            }
                            $grid.jqxGrid('clearselection');
                        }
                        else {
                            item = $.getPrevTabbale();
                        }
                        tabToPrevItem(item);
                    }
                    else {
                        if ($grid.length > 0) {
                            item = handleTabInGrid(event, $grid);
                            if(!item) {
                                return true;
                            }
                            $grid.jqxGrid('clearselection');
                        }
                        else {
                            item = $.getNextTabbale();
                        }
                        tabToNextItem(item);
                    }
                    return true;
                }
            }
        },

        enableErrorHeaderRow: function (gridId) {
            setTimeout(function () {
                var $gridId = '#' + gridId;
                var errorNum = 0;
                var rows = $($gridId).jqxGrid('getrows');
                var cols = $($gridId).jqxGrid('columns').records;
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < cols.length; j++) {
                        var datafield = cols[j].datafield;
                        var cellValue = rows[i][datafield].toString();
                        if ((cellValue.indexOf('#errordata#') !== -1 && cols[j].columntype === 'textbox') || (cols[j].columntype === 'NumberInput' && (cellValue.indexOf('((') === 0 && cellValue.indexOf('))') === cellValue.length - 2))) {
                            errorNum += 1;
                        }
                    }
                }
                var gridHeader = $($gridId).find('.jqx-grid-header');
                gridHeader.children().after('<div class="grid-error-header">' +
                    '<span><span class="icon icon-error"></span>There are ' + errorNum + ' errors in this table.</span>' +
                    '</div>');
                gridHeader.css('height', '50px');
                gridHeader.children().css('height', '50%');
                gridHeader.after('<div class="grid-error-header-icon"><a href="#"><span class="icon icon-close-rounded"></span></a></div>');
                $('.icon-close-rounded').parent('a').on('click', function () {
                    var gridHeader = $($gridId).find('.jqx-grid-header');
                    gridHeader.css('height', '25px');
                    gridHeader.children().css('height', '100%');
                    $($gridId).find('.grid-error-header').css('display', 'none');
                    $($gridId).jqxGrid('render');
                });
            }, 50);
        },

        enableHeadErrorIndicator: function (gridId) {
            setTimeout(function () {
                var $gridId = '#' + gridId;
                var rows = $($gridId).jqxGrid('getrows');
                var cols = $($gridId).jqxGrid('columns').records;

                var errorsCount = [];
                for (var x = 0; x < cols.length; x++) {
                    errorsCount[x] = 0;
                }

                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < cols.length; j++) {
                        var datafield = cols[j].datafield;
                        var cellValue = rows[i][datafield].toString();
                        if ((cellValue.indexOf('#errordata#') !== -1 && cols[j].columntype === 'textbox') || (cols[j].columntype === 'NumberInput' && (cellValue.indexOf('((') === 0 && cellValue.indexOf('))') === cellValue.length - 2))) {
                            errorsCount[j] = errorsCount[j] + 1;
                        }
                    }
                }

                var headCount = $($gridId).find('.jqx-grid-column-header').length;
                for (var n = 0; n < headCount; n++) {
                    var errors = errorsCount[n];
                    if (errors > 0) {
                        $($gridId).find('.jqx-grid-column-header').eq(n).find('span')
                            .after('<span class="icon text-center n-error-indicator">' + errors + '</span>');
                    }
                }
            }, 50);
        },

        /*-------------- nokia Add/Delete Rows implementation*/
        nDeleteButtonOnCellRenderer: function(row, datafield, value) {
            return '<div class="n-cell-icon-container">' +
                '<button class="n-cell-icon n-cell-icon-control n-del-row-btn" tabindex="-1" data-row-index="' + row + '">' +
                '<span class="icon ' + value + '"></span></button></div>';
        },

        nAddRow: function(grid, rowData) {
            grid.jqxGrid('beginupdate');
            grid.jqxGrid('addrow', null, rowData);
            setTimeout(recalculateScrollbars, 50);
            var datainfo = grid.jqxGrid('getdatainformation');
            var rowscount = datainfo.rowscount;
            var pagescount = datainfo.paginginformation.pagescount;
            //unselect all the selected row
            var selectedrowindexs = grid.jqxGrid('getselectedrowindexes');
            var tempRowindexs = selectedrowindexs ? [].concat(selectedrowindexs) : [];
            for (var m = 0; m < tempRowindexs.length; m++) {
                var selectedrowindex = tempRowindexs[tempRowindexs.length - m - 1];
                var id = grid.jqxGrid('getrowboundindex',selectedrowindex);
                grid.jqxGrid('unselectrow', id);
            }
            grid.jqxGrid('endupdate');
            grid.jqxGrid('selectrow', rowscount-1);
            grid.jqxGrid('ensurerowvisible', rowscount-1);
            $.grid.updatePageInfor(grid, rowscount, pagescount);
        },

        nDelRow: function(grid) {
            var selectedrowindexs = grid.jqxGrid('getselectedrowindexes');
            var rowscount        = grid.jqxGrid('getdatainformation').rowscount;
            // begin update. Stops the Grid's rendering.
            grid.jqxGrid('beginupdate');
            selectedrowindexs.sort(function(a,b){return a-b;});
            //use a temp to hold the origin selectedrowindexes as the selectedrowindexes will change after deleted row.
            var tempRowindexs = selectedrowindexs ? [].concat(selectedrowindexs) : [];
            var selectRowindexsAfterDelete;
            if(tempRowindexs[tempRowindexs.length -1] +1 <  rowscount){
                selectRowindexsAfterDelete = tempRowindexs[tempRowindexs.length -1] - tempRowindexs.length +1;
            }else{
                selectRowindexsAfterDelete = tempRowindexs[tempRowindexs.length -1] - tempRowindexs.length;
            }

            for (var m = 0; m < tempRowindexs.length; m++) {
                var selectedrowindex = tempRowindexs[tempRowindexs.length - m - 1];
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = grid.jqxGrid('getrowid',selectedrowindex);
                    grid.jqxGrid('deleterow', id);
                }
            }
            // end update. Resume the Grid's rendering.
            setTimeout(recalculateScrollbars, 10);
            var selectRowId = grid.jqxGrid('getrowboundindex',selectRowindexsAfterDelete);
            grid.jqxGrid('endupdate');
            grid.jqxGrid('selectrow', selectRowId);
            grid.jqxGrid('ensurerowvisible', selectRowId);
            var pagescount = grid.jqxGrid('getdatainformation').paginginformation.pagescount;
            $.grid.updatePageInfor(grid, rowscount-tempRowindexs.length, pagescount);
        },

        nEnableDeleteButtonOnCell: function(grid) {
            //change document to grid to avoid impacting other grids.
            grid.on('click', '.n-del-row-btn',function() {
                //var index = $(this).data("row-index");
                grid.jqxGrid('beginupdate');
                var selectedrowindex = grid.jqxGrid('getselectedrowindex');
                var rowscount        = grid.jqxGrid('getdatainformation').rowscount;
                var selectRowindexsAfterDelete;
                if(selectedrowindex+1 < rowscount) {
                    selectRowindexsAfterDelete = selectedrowindex;
                }else{
                    selectRowindexsAfterDelete = selectedrowindex-1;
                }
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id      = grid.jqxGrid('getrowid', selectedrowindex);
                    grid.jqxGrid('deleterow', id);
                    $.grid.updatePageInfor(grid, rowscount-1);
                }
                var selectRowId = grid.jqxGrid('getrowboundindex',selectRowindexsAfterDelete);
                setTimeout(recalculateScrollbars, 10);
                grid.jqxGrid('endupdate');
                grid.jqxGrid('selectrow', selectRowId);
                grid.jqxGrid('ensurerowvisible', selectRowId);
            });
        }
    };

    $jqxTable.on('bindingcomplete', function () {
        $(this).find('div[id^=verticalScrollBar]').first().before('<div class="n-extra-scrollbar-div"></div>');
        $(this).jqxGrid({
            rendered: function () {
                setTimeout(recalculateScrollbars, 50);
            }
        });
        var height = $(this).find('.jqx-scrollbar').first().jqxScrollBar('height');
        $(this).find('.jqx-scrollbar').first().jqxScrollBar({ thumbMinSize: 50 });
        if ($.browser.mozilla) {
            var contentTable = $(this).find('div[id^=content].jqx-overflow-hidden');
            contentTable.css('height', 'none');
            contentTable.css('height', contentTable.height() - 1 + 'px');
        }
        setTimeout(recalculateScrollbars, 50);
    });

    $jqxTable.on("filter", function () {
        setTimeout(recalculateScrollbars, 50);
    });

    function recalculateScrollbars() {
        $jqxTable.each(function () {
            var verticalScrollbar = $(this).find('div[id^=verticalScrollBar]').first();
            var horizontalScrollbar = $(this).find('div[id^=horizontalScrollBar]').first();

            verticalScrollbar.css('max-height', 'none');
            if (horizontalScrollbar.length > 0) {
                verticalScrollbar.css('max-height', verticalScrollbar.outerHeight() - 39 + 'px'); //26 - height of extraScrollbarDiv, 12-height of horizontal scrollbar
            }
            else {
                verticalScrollbar.css('max-height', verticalScrollbar.outerHeight() - 26 + 'px');
            }

            var verticalThumbScrollbar = $(this).find('div[id^=jqxScrollThumbverticalScrollBar]').first();
            verticalThumbScrollbar.css('max-height', 'none');
            verticalThumbScrollbar.css('max-height', verticalThumbScrollbar.height() - 26 + 'px');
        });
    }

    $(document).ready(function () {
        setTimeout(function() {
            var headerColumns = $(".jqx-grid-column-header");
            for (var i = 0; i < headerColumns.length; i++) {
                headerColumns[i].onclick = handleColumnHeadSort;
            }

            $(".jqx-grid").each(function () {
                $(this).on('cellselect', function (event) {
                    var gridId = $(this).attr('id');
                    var currentTarget = $(document.activeElement);
                    var editComponentId = currentTarget.parent().attr('id');
                    if (currentTarget.attr('type') === 'checkbox') {
                        editComponentId = currentTarget.parent().parent().attr('id');
                    }
                    var dataField = event.args.datafield;
                    var rowBoundIndex = event.args.rowindex;
                    if (editComponentId !== undefined &&
                        'customeditor' + gridId + dataField + '_' + rowBoundIndex !== editComponentId) {
                        editComponentId = editComponentId.replace('customeditor' + gridId, '');
                        var strings = editComponentId.split('_');
                        $(this).jqxGrid('endcelledit', strings[1], strings[0]);
                    }
                });

                $(this).attr('tabindex', '0');
            });

            // For filter row jqwDropdown keyboard support.
            $(".jqx-grid-cell-filter-row .jqx-dropdownlist-state-normal").on("keydown", function(e) {
                if (e.which === 32){
                    var opened = $(this).jqxDropDownList('isOpened');
                    if (!opened){
                        $(this).jqxDropDownList('open');
                    } else {
                        $(this).jqxDropDownList('close');
                    }
                }
            });
        }, 50);
    });

    function handleColumnHeadSort() {
        /*jshint validthis:true */
        var columnSortType = $(this).attr("aria-sort");
        if (columnSortType === "" || columnSortType === undefined) {
            return;
        }

        var columnHeadTextDiv = $(this).children("div").children("div")[0];
        var columnAlignType = $(columnHeadTextDiv).css("text-align");

        //add right padding if it is right alignment and is sorting.
        if (columnAlignType === "right" && (columnSortType === "ascending" || columnSortType === "descending")) {
            $(columnHeadTextDiv).css("padding-right", "18px");
        }
        else {
            $(columnHeadTextDiv).css("padding-right", "8px");
        }
    }

    function addChangedCol(row, editorId, gridId) {
        var $targetCol = $("#" + gridId + " #n-row-indicated-" + row);
        var changedCol = $targetCol.attr("changed-col");
        if (changedCol === undefined) {
            changedCol = '';
        }
        if (changedCol.indexOf(editorId) === -1) {
            changedCol = changedCol + editorId;
            $targetCol.attr("changed-col", changedCol);
        }
    }

    function removeChangedCol(row, editorId, gridId) {
        var $targetCol = $("#" + gridId + " #n-row-indicated-" + row);
        var changedCol = $targetCol.attr("changed-col");
        if (changedCol === undefined) {
            changedCol = '';
        }
        changedCol = changedCol.replace(editorId, '');
        $targetCol.attr("changed-col", changedCol);
        var currentChangedCol = $targetCol.attr("changed-col");
        if (currentChangedCol !== undefined) {
            if (currentChangedCol.replace('editorId', '') === '') {
                $("#" + gridId + " #n-row-indicated-" + row + " > span").removeClass("icon-edited-white");
            }
        }
    }

    function checkIndicatedByCell(editor) {
        var gridId = editor.parent().attr("id").replace("contenttable", "");
        var tmpColumnName = editor.attr("id").replace("customeditor" + gridId, "");
        var columnName = tmpColumnName.substring(0, tmpColumnName.indexOf("_"));
        var isIndicatedByCell = $("#" + gridId).jqxGrid('getcolumnproperty', columnName, 'indicator');
        if (isIndicatedByCell === undefined) {
            isIndicatedByCell = false;
        }
        return isIndicatedByCell;
    }

    function handleTabKey(e, editor, row) {
        if (e.which === 9) {
            e.preventDefault();
            e.stopPropagation();

            var $grid = editor.closest('.jqx-grid');
            var editorId = editor.attr('id');
            var columnName = editorId.split('_')[0];
            columnName = columnName.replace('customeditor' + $grid.attr('id'), '');
            var currentIndex = $grid.jqxGrid('getcolumnindex', columnName);
            var data = $grid.jqxGrid('getrowdata', row);
            var keys = [];
            $.each(data, function (key) {
                keys.push(key);
            });
            $grid.jqxGrid('selectcell', row, keys[currentIndex + 1]);
        }
    }

    /*------------------- functions for tab keyboard accessibility -------------------*/
    function isSameTable (id, gridId) {
        return id === gridId || id === 'wrapper' + gridId || id === 'content' + gridId;
    }

    function isTableIconCloseRounded ($grid, $item) {
        return $grid.find('.icon-close-rounded').parent('a').get(0) === $item.get(0);
    }

    function isTableHeaderItem ($grid, $item, selector) {
        return $grid.find('.jqx-grid-header :tabbable' + selector).get(0) === $item.get(0);
    }

    function focusToTableIconClose ($grid) {
        if ($grid.find('.icon-close-rounded').parent('a').length > 0){
            $grid.find('.icon-close-rounded').parent('a').focus();
            $grid.jqxGrid('clearselection');
            return true;
        }
        return false;
    }

    function focusToTableHeader ($grid, selector) {
        if ($grid.find('.jqx-grid-header :tabbable').length > 0) {
            $grid.find('.jqx-grid-header :tabbable' + selector).focus();
            $grid.jqxGrid('clearselection');
            return true;
        }
        return false;
    }

    function focusToTable ($grid) {
        $grid.jqxGrid('focus');
        if ($grid.jqxGrid('getselectedcell') === null && $grid.jqxGrid('getselectedrowindex') === -1) {
            var columnName = $grid.jqxGrid("columns").records[0].datafield;
            $grid.jqxGrid('selectcell', 0, columnName);
            $grid.jqxGrid('selectrow', 0);
        }
    }

        /**
         * handle shift tab in grid, return the pre tabbable item. If prev tabbable item is also in grid, return undefined.
         * @param event
         * @param $grid
         * @returns {undefined}
         */
    function handleShiftTabInGrid(event, $grid){
        var id = $(event.target).attr('id');
        var gridId = $grid.attr('id');
        // if focus on the table
        if (isSameTable (id, gridId)) {
            // focus move to header of table
            if (focusToTableIconClose ($grid) || focusToTableHeader ($grid, ':last')){
                return undefined;
            }
        }
        // if focus on the close icon of table
        else if (isTableIconCloseRounded ($grid, $(event.target))) {
            // focus move to header of table
            if (focusToTableHeader ($grid, ':last')) {
                return undefined;
            }
            $grid.focus();
        }
        var item = $.getPrevTabbale();
        id = item.attr('id');
        if (isSameTable (id, gridId)) {
            item.closest('.jqx-grid').focus();
            item = $.getPrevTabbale();
        }
        return item;
    }

        /**
         * handle tab in grid, return the next tabbable item. If next tabbable item is also in grid, return undefined.
         * @param event
         * @param $grid
         * @returns {undefined}
         */
    function handleTabInGrid(event, $grid){
        var gridId = $grid.attr('id');
        // if focus on the header of table
        if (isTableHeaderItem ($grid, $(event.target), ':last')) {
            if (focusToTableIconClose ($grid)){
                return undefined;
            }
            focusToTable ($grid);
            return undefined;
        }
        else if (isTableIconCloseRounded ($grid, $(event.target))) {
            focusToTable ($grid);
            return undefined;
        }

        var item = $.getNextTabbale();
        var id = item.attr('id');
        if(isSameTable (id, gridId)){
            item.focus();
            item = $.getNextTabbale();
        }
        if (isTableHeaderItem ($grid, item, ':first')) {
            $grid.find('.jqx-grid-header :tabbable:last').get(0).focus();
            item = $.getNextTabbale();
        }
        if (isTableIconCloseRounded ($grid, item)) {
            item.focus();
            item = $.getNextTabbale();
        }
        return item;
    }

        /**
         * handle shift tab to prev item
         * @param $item
         * @returns {boolean}
         */
    function tabToPrevItem ($item) {
        var $grid = $item.closest('.jqx-grid');
        var id = $item.attr('id');
        var gridId = $grid.attr('id');
        if ($grid.length < 1) {
            $item.focus();
            return true;
        }
        if (isSameTable (id, gridId) || isTableIconCloseRounded ($grid, $item) || isTableHeaderItem ($grid, $item, ':last')) {
            focusToTable ($grid);
        }
        else {
            $item.focus();
        }
    }

        /**
         * handle tab to next item
         * @param $item
         * @returns {boolean}
         */
    function tabToNextItem ($item) {
        var $grid = $item.closest('.jqx-grid');
        var id = $item.attr('id');
        var gridId = $grid.attr('id');
        if ($grid.length < 1) {
            $item.focus();
            return true;
        }
        if (isSameTable (id, gridId)) {
            if (!(focusToTableHeader ($grid, ':first') || focusToTableIconClose ($grid))) {
                focusToTable ($grid);
            }
        }
        else {
            $item.focus();
        }
    }
    /*------------------- functions for tab keyboard accessibility -------------------*/

    //Hide the up and down button in scroll bar for jqx table
    if ($.jqx !== undefined) {
        $.jqx.init({ scrollBarButtonsVisibility: "hidden" });
    }

    // GRIDS KEYBOARD ACCESSIBILITY
    // ============================
    $(document)
        .on('keydown.wf.grid.keyboard', '.grid-error-header-icon', $.wfKBCore.commonKeyboardHandler)
        .on('focusin.wf.grid.keyboard', '.jqx-widget-content', $.wfKBGrid.gridFocusinHandler);
}
));
