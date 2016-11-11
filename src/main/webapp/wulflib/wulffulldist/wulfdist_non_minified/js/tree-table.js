/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jqxcore', 'jqxdata', 'jqxbuttons',
            'jqxscrollbar', 'jqxdatatable', 'jqxtreegrid'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('jqwidgets-framework/jqwidgets/jqx-all'), require('./scroll'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

        'use strict';

        if ($.jqx !== undefined) {
            if ($.jqx._jqxTreeGrid !== undefined) {
                $.extend($.jqx._jqxTreeGrid.prototype, {
                    expandRow: function (h, j) {
                        // Original code -- Get from jqxtreegrid.js
                        var d = this.base;
                        if (d._loading) {
                            return;
                        }
                        var e = d._names();
                        var f = this;
                        var b = d.rowinfo[h];
                        if (!b) {
                            var k = this.getRow(h);
                            if (k) {
                                d.rowinfo[h] = { row: k };
                                if (k.originalRecord) {
                                    d.rowinfo[h].originalRecord = k.originalRecord;
                                }
                                b = d.rowinfo[h];
                            }
                        }
                        if (b) {
                            if (b.expanded) {
                                b.row[e.expanded] = true;
                                return;
                            }
                            b.expanded = true;
                            b.row[e.expanded] = true;
                            if (b.originalRecord) {
                                b.originalRecord[e.expanded] = true;
                            }
                            if (this.virtualModeCreateRecords && !b.row._loadedOnDemand) {
                                var c = function (m) {
                                    b.row._loadedOnDemand = true;
                                    if (m === false) {
                                        d._loading = false;
                                        f._hideLoadElement();
                                        b.leaf = true;
                                        b.row[e.leaf] = true;
                                        d._renderrows();
                                        if (j) {
                                            j();
                                        }
                                        return;
                                    }
                                    for (var n = 0; n < m.length; n++) {
                                        m[n][e.level] = b.row[e.level] + 1;
                                        m[n][e.parent] = b.row;
                                        if (d.rowsByKey[m[n].uid]) {
                                            d._loading = false;
                                            f._hideLoadElement();
                                            b.leaf = true;
                                            b.row[e.leaf] = true;
                                            d._renderrows();
                                            if (j) {
                                                j();
                                            }
                                            throw new Error("Please, check whether you Add Records with unique ID/Key. ");
                                        }
                                        d.rowsByKey[m[n].uid] = m[n];
                                        f.virtualModeRecordCreating(m[n]);
                                    }
                                    if (!b.row.records) {
                                        b.row.records = m;
                                    } else {
                                        b.row.records = b.row.records.concat(m);
                                    }
                                    if ((!m) || (m && m.length === 0)) {
                                        b.leaf = true;
                                        b.row[e.leaf] = true;
                                    }
                                    if (b.originalRecord) {
                                        b.originalRecord.records = m;
                                        b.originalRecord[e.expanded] = true;

                                        if (m.length === 0) {
                                            b.originalRecord[e.leaf] = true;
                                        }
                                    }
                                    d._loading = false;
                                    f._hideLoadElement();
                                    var l = d.vScrollBar.css("visibility");
                                    d._renderrows();
                                    d._updateScrollbars();
                                    var o = l !== d.vScrollBar.css("visibility");
                                    if (d.height === "auto" || d.height === null || d.autoheight || o) {
                                        d._arrange();
                                    }
                                    d._renderhorizontalscroll();
                                    if (j) {
                                        j();
                                    }
                                };
                                if (!b.row[e.leaf]) {
                                    d._loading = true;
                                    this._showLoadElement();
                                    this.virtualModeCreateRecords(b.row, c);
                                    return;
                                }
                            }
                            if (!d.updating()) {
                                var g = d.vScrollBar.css("visibility");
                                d._renderrows();
                                d._updateScrollbars();
                                var i = g !== d.vScrollBar.css("visibility");
                                if (d.height === "auto" || d.height === null || d.autoheight || i) {
                                    d._arrange();
                                }
                                d._renderhorizontalscroll();
                                d._raiseEvent("rowExpand", { row: b.row, key: h });
                            }
                        }

                        // Extended code -- trigger scroll bar to right position
                        var hostHeight = d.host.height();
                        var tableHeight = d.table.height();
                        var currentRow = this.getRow(h);
                        var rows = d.getRows();
                        var count = 0;
                        while (currentRow.parent !== null) {
                            count = count + getItemsBeforeInTable(currentRow, rows);
                            currentRow = this.getRow(currentRow.parent);
                        }
                        var height = d.columnsHeight * count;
                        var max = d.vScrollBar.jqxScrollBar("max");
                        if (tableHeight > hostHeight) {
                            if (height > max) {
                                height = max;
                            }
                            d.vScrollBar.jqxScrollBar("setPosition", height);
                        }
                    }
                });
            }
        }

        /**
         * Return the visible row count before the current row
         *
         * @param currentRow
         * @param rows
         * @returns {number}
         */
        function getItemsBeforeInTable(currentRow, rows) {
            var count = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].uid === currentRow.uid) {
                    break;
                }
                if (rows[i].parent === currentRow.parent) {
                    count++;
                }
            }
            return count;
        }

        //attach expand/collapse event to whole row
        $(document)
            .on('rowClick', '.jqx-grid:not([class~="n-jqxgrid-table"])', function (event) {
                var args = event.args;
                var row = args.row;
                var key = args.key;
                if (row.records) {
                    if (row.expanded){
                        $(this).jqxTreeGrid('collapseRow',key);
                    }
                    else {
                        $(this).jqxTreeGrid('expandRow',key);
                    }
                }
            })
            .on('keydown.wf.treeTable.keyboard', '.jqx-grid:not(.n-jqxgrid-table)', function (e) {
                if (e.which === 9) {
                    var current = $(e.target);
                    var selection = current.jqxTreeGrid("getSelection");
                    if (selection.length > 0) {
                        current.jqxTreeGrid('clearSelection');
                    }
                    else {
                        var rows = current.jqxTreeGrid("getRows");
                        if (rows.length > 0) {
                            var rowId = rows[0].ID;
                            current.jqxTreeGrid("selectRow",rowId);
                            return false;
                        }
                    }
                }
            });
    }
));