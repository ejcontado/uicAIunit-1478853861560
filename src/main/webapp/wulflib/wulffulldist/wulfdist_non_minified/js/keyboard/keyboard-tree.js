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

    var SPACE_BAR_KEY = 32;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;

    $.wfKBTree = {
        treeKeyboardHandler: function (e) {
            var iconFolder;
            switch (e.which) {
                case SPACE_BAR_KEY:
                    var href = $(e.target).attr("href");
                    if (href !== "" && href !== "#") {
                        var target = $(e.target).attr("target");
                        var targetParent = window.parent.document.getElementById(target);
                        var targetSelf = document.getElementById(target);
                        if (targetParent !== null) {
                            targetParent.src = href;
                        }
                        else if (targetSelf !== null) {
                            targetSelf.src = href;
                        }
                        else {
                            location.href = href;
                        }
                    }

                    var currentStatus = $(e.target).find("input").prop("checked");
                    var targetStatus = !currentStatus;
                    $(e.target).find("input").prop("checked", targetStatus);
                    updateTree();

                    break;
                case LEFT_KEY:
                    var iconCaret = $(e.target).find(".icon-caret");
                    if (iconCaret.length > 0) {
                        if ($(e.target).find('.glyphicon-folder-open').length) {
                            $(iconCaret).trigger("click");
                        }
                    }
                    // This is for table item that does not have the caret icon
                    iconFolder = $(e.target).find(".icon-folder");
                    if (iconFolder.length > 0) {
                        if (iconFolder.hasClass('glyphicon-folder-open')) {
                            $(e.target).trigger("click");
                        }
                    }
                    break;
                case RIGHT_KEY:
                    iconCaret = $(e.target).find(".icon-caret");
                    if (iconCaret.length > 0) {
                        if ($(e.target).find('.glyphicon-folder-close').length) {
                            $(iconCaret).trigger("click");
                        }
                    }
                    // This is for table item that does not have the caret icon
                    iconFolder = $(e.target).find(".icon-folder");
                    if (iconFolder.length > 0) {
                        if (iconFolder.hasClass('glyphicon-folder-close')) {
                            $(e.target).trigger("click");
                        }
                    }
                    break;
            }

            $.wfKBCore.commonKeyboardHandler(e);
        }
    };

    // KEYBOARD TREE INTERNAL METHODS
    // ==============================

    function updateTree() {
        $(".tree-branch-name > .checkbox > input[name='folder']").each(function () {
            var statuses = [];
            $(this).closest(".tree-branch").find("input[name='file']").each(
                function () {
                    statuses.push($(this).prop("checked"));
                }
            );
            if (statuses.length !== 0) {
                var allfileschecked = statuses.reduce(function (a, b) {
                    return a && b;
                });
                var partfilechecked = statuses.reduce(function (a, b) {
                    return a || b;
                });
                $(this).prop("checked", allfileschecked);
                if (allfileschecked) {
                    $(this).prop({
                        checked: true,
                        indeterminate: false
                    });
                }
                else if (partfilechecked) {
                    $(this).prop({
                        checked: false,
                        indeterminate: true
                    });
                }
                else {
                    $(this).prop({
                        checked: false,
                        indeterminate: false
                    });
                }
            }
        });
    }
}
));