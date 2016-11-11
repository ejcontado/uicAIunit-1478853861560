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

        $.wfKBGrid = {
            gridFocusinHandler: function(e) {
                var current = $(e.target);
                var id = current.attr('id');
                if (id !== undefined && (id.indexOf('wrapper') === 0 || id.indexOf('content') === 0 || id.indexOf('tree') === 0)) {
                    if (isTreeGrid(current)) {
                        // For tree table grid
                        treeJQTableFocusinHandler(current);
                    } else {
                        var grid = current.closest('.jqx-grid');
                        if (grid.length > 0) {
                            //if (isFilterGrid(current)) {
                            //    if (!isFilterGridHeader(current)) {
                            //        standardJqTableFocusinHandler(grid);
                            //    }
                            //} else if (isPagingGrid(current)) {
                            //    if (!isPagingGridPager(current)) {
                            //        standardJqTableFocusinHandler(grid);
                            //    }
                            //} else {
                            //    standardJqTableFocusinHandler(grid);
                            //}
                            if (isPagingGrid(current)) {
                                if (!isPagingGridPager(current)) {
                                    standardJqTableFocusinHandler(grid);
                                }
                            }
                        }
                    }
                }
            }
        };

        function treeJQTableFocusinHandler(current) {
            var keyIndex = current.find('tr:first').data('key');
            var isFocused = false;
            var isTreeGrid = false;
            current.find('td').each(function () {
                if ($(this).hasClass('jqx-grid-cell-selected') && $(this).hasClass('jqx-fill-state-pressed')) {
                    isFocused = true;
                }
                if ($(this).find('span:first').hasClass('jqx-tree-grid-collapse-button')) {
                    isTreeGrid = true;
                }
            });
            if (!isFocused && isTreeGrid) {
                current.jqxTreeGrid('selectRow', keyIndex);
            }
        }

        function standardJqTableFocusinHandler(current) {
            var selectedMode = current.jqxGrid('selectionmode');
            if (selectedMode.indexOf('cell') >= 0) {
                var cells = current.jqxGrid('getselectedcells');
                if (cells.length === 0) {
                    focusOnFirstElementInPage(current);
                }
            } else if (selectedMode.indexOf('row') >= 0) {
                if (current.jqxGrid('getselectedrowindex') === -1) {
                    current.jqxGrid('clearselection');
                    current.jqxGrid('selectrow', 0);
                }
            }
        }

        function focusOnFirstElementInPage(current) {
            var datainformation = current.jqxGrid('getdatainformation');
            var paginginformation = datainformation.paginginformation;
            var pagenum = paginginformation.pagenum;
            var pagesize = paginginformation.pagesize;
            current.jqxGrid('clearselection');
            current.jqxGrid('selectcell', pagenum * pagesize, current.jqxGrid('columns').records[0].datafield);
        }

        function isTreeGrid(current) {
            var treeGrid = false;
            current.find('td').each(function () {
                if ($(this).find('span:first').hasClass('jqx-tree-grid-collapse-button')) {
                    treeGrid = true;
                }
            });
            return treeGrid;
        }

        function isPagingGrid(current) {
            var isPager = false;
            var grid = current.closest('.jqx-grid');
            var pager = grid.find('.jqx-grid-pager');
            if (pager.length > 0 && pager.height() > 0) {
                if (pager.find('.n-table-paging-middle').length > 0) {
                    isPager = true;
                }
            }
            return isPager;
        }

        function isPagingGridPager(current) {
            return current.closest('.jqx-grid-pager').length !== 0;
        }
    }
));