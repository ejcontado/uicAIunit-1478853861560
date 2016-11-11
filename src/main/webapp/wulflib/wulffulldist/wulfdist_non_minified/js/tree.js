/**
 * Created by jiangdai on 2016/1/4.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-tree', 'fuelux/tree', './scroll'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-tree'), require('fuelux'), require('./scroll'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    $(document).ready(
        function () {
            if ($.fn.tree !== undefined) {
                $.fn.tree.Constructor.prototype.disable = function () {
                    var self = this;
                    self.$element.addClass('disabled-tree');
                    self.$element.find('a').each(function () {
                        $(this).removeAttr("href");
                        $(this).attr('disabled', 'disabled');
                    });
                    self.$element.find('input').attr('disabled','disabled');
                    self.$element.off('click.fu.tree', '.tree-branch-name');

                    // Disable scroll bar if exists
                    if (self.$element.find(".mCSB_scrollTools").length > 0) {
                        self.$element.mCustomScrollbar('destroy');
                        self.$element.mCustomScrollbar({
                            advanced: { autoExpandHorizontalScroll: true },
                            alwaysShowScrollbar: 2,
                            theme: 'disabled',
                            mouseWheel: { enable: false, axis: 'x' }

                        });
                        self.$element.mCustomScrollbar("disable");
                    }
                };

                $.fn.tree.Constructor.prototype.enableScrollbar = function (width, height) {
                    var self = this;
                    self.$element.nScrollbar();
                    self.$element.css('width', width + 'px');
                    self.$element.css('height', height + 'px');
                };

                $.fn.tree.Constructor.prototype.populate = function ($el) {
                    var self = this;
                    var $parent = ($el.hasClass('tree')) ? $el : $el.parent();
                    var loader = $parent.find('.tree-loader:eq(0)');
                    var treeData = $parent.data();

                    loader.removeClass('hide hidden'); // hide is deprecated
                    this.options.dataSource(treeData ? treeData : {}, function (items) {
                        loader.addClass('hidden');
                        $.each(items.data, function (index, value) {
                            var $entity;

                            if (value.type === 'folder') {
                                $entity = self.$element.find('[data-template=treebranch]:eq(0)').clone().removeClass('hide hidden').removeData('template'); // hide is deprecated
                                $entity.data(value);
                                $entity.find('.tree-branch-name > .tree-label').html(value.text || value.name);
                            } else if (value.type === 'item') {
                                $entity = self.$element.find('[data-template=treeitem]:eq(0)').clone().removeClass('hide hidden').removeData('template'); // hide is deprecated
                                $entity.find('.tree-item-name > .tree-label').html(value.text || value.name);
                                $entity.data(value);
                            }

                            // Added support for description and icon
                            if (value.desc) {
                                $entity.find('.tree-label').append("<span class='tree-description'> &ndash; " + value.desc + "</span>");
                            }
                            if (value.icon) {
                                $entity.find('.tree-label').append("<span class='icon " + value.icon + "'></span>");
                            }

                            // add attributes to tree-branch or tree-item

                            var attr = value.attr || value.dataAttributes || [];
                            $.each(attr, function (key, value) {
                                switch (key) {
                                    case 'cssClass':
                                    case 'class':
                                    case 'className':
                                        $entity.addClass(value);
                                        break;

                                    // allow custom icons
                                    case 'data-icon':
                                        $entity.find('.icon-item').removeClass().addClass('icon-item ' + value);
                                        $entity.attr(key, value);
                                        break;

                                    // ARIA support
                                    case 'id':
                                        $entity.attr(key, value);
                                        $entity.attr('aria-labelledby', value + '-label');
                                        //$entity.find('.tree-branch-name > .tree-label').attr('id', value + '-label');
                                        break;

                                    // style, data-*
                                    default:
                                        $entity.attr(key, value);
                                        break;
                                }
                            });

                            // add child nodes
                            if ($el.hasClass('tree-branch-header')) {
                                $parent.find('.tree-branch-children:eq(0)').append($entity);
                            } else {
                                $el.append($entity);
                            }
                        });
                        // return newly populated folder
                        self.$element.trigger('loaded.fu.tree', $parent);
                    });
                };
            }
            // function of tree of checkbox
            function clickTree(ev) {
                updateLinkInTree(ev.currentTarget);
            }

            function updateLinkInTree(e) {
                var allBranchMenu = $(e).find(".tree-branch");
                for (var j = 0; j < allBranchMenu.length; j++) {
                    var branch = allBranchMenu[j];
                    if ($(branch).attr("src") !== "") {
                        var header = $(branch).children(".tree-branch-header");
                        var a = $(header).children(".tree-branch-name");
                        $(a).attr("href", $(branch).attr("src"));
                    }
                }

                var allItemMenu = $(e).find(".tree-item");
                for (var k = 0; k < allItemMenu.length; k++) {
                    var item = allItemMenu[k];
                    if ($(item).attr("src") !== "") {
                        var b = $(item).children(".tree-item-name");
                        $(b).attr("href", $(item).attr("src"));
                    }
                }
            }

            function trigerTreeItem(ev) {
                if (ev.which !== 32 && ev.which !== 1) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                /*jshint validthis:true */
                var currentStatus = $(this).find("input").prop("checked");
                var targetStatus = !currentStatus;
                /*jshint validthis:true */
                $(this).find("input").prop("checked", targetStatus);
                updateTree();
            }
            function trigerTreeFolder(ev) {
                if (ev.which !== 32 && ev.which !== 1) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                /*jshint validthis:true */
                var currentStatus = $(this).find("input").prop("checked");
                var targetStatus = !currentStatus;
                $(this).find("input").prop({
                    checked: targetStatus,
                    indeterminate: false
                });
                var arrChk = $(this).closest(".tree-branch").find("input");
                arrChk.each(function () {
                    $(this).prop({
                        checked: targetStatus,
                        indeterminate: false
                    });
                });
                updateTree();
            }

            function scrollTree(e) {
                var currentTarget = e.currentTarget;
                var parentNode = $(currentTarget).parent();
                if ($(parentNode).hasClass('tree-branch-name') || $(parentNode).hasClass('tree-branch-header')) {
                    var closetLiNode = parentNode.closest('li');
                    if (!$(closetLiNode).hasClass('tree-open')) {
                        var rootNode = parentNode.closest('ul.tree');
                        var treeClientHeight = rootNode.get(0).clientHeight;
                        var childNodesNum = closetLiNode.find('ul li').size();
                        var lineHeight = $(parentNode).get(0).offsetHeight;
                        var currentOffsetHeight = $(currentTarget).offset().top - rootNode.offset().top;
                        var initScroll = (childNodesNum === 0 && currentOffsetHeight > treeClientHeight * 3 / 4);
                        if ((treeClientHeight < (currentOffsetHeight + (childNodesNum + 1) * lineHeight)) || initScroll) {
                            rootNode.mCustomScrollbar('scrollTo', currentTarget, { scrollInertia: 0 });
                        }
                    }
                }
            }

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
            // change the href of every item and branch
            setTimeout(function () {
                var trees = $('.tree');
                for (var i = 0; i < trees.length; i++) {
                    updateLinkInTree(trees[i]);
                    $(trees[i]).on("click", clickTree);
                }
            }, 500);
            /** For tree with checkbox */
            // process the leaf check box click events
            // when click the select item then expand the tree item 's children with scrool
            $(document)
            .on("keydown", ".tree-has-checkbox li.tree-item .checkbox[name='file']", trigerTreeItem)
            .on("click", ".tree-has-checkbox li.tree-item .checkbox[name='file']", trigerTreeItem)
            .on("keydown", ".tree-has-checkbox li.tree-branch .checkbox[name='folder']", trigerTreeFolder)
            .on("click", ".tree-has-checkbox li.tree-branch .checkbox[name='folder']", trigerTreeFolder)
            .on('click.fu.tree', '.tree .icon-caret', function (e) {
                scrollTree(e);
            })
            .on('click.fu.tree', '.tree .tree-label', function (e) {
                scrollTree(e);
            });
        });

    // TREE KEYBOARD ACCESSIBILITY METHODS DEFINITION
    // ==============================================
    $(document).on('keydown.wf.tree.keyboard', '.tree', $.wfKBTree.treeKeyboardHandler);
}
));