    /**
 * Created by linaqiu on 2015/7/1.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('bootstrap'), require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    /*--------------- start module scope variables ---------------*/
    var nBannerLinksCollapse = $(".n-banner-links-collapse");
    var nBannerTabs = $(".n-banner-tabs");
    var KEY = { up: 38, down: 40, right: 39, left: 37, space: 32, enter: 13 };

    // variables used in responsiveness
    var bannerBlueDetachEvent = "n.banner.blue.block.detached";
    var bannerBlueAttachEvent = "n.banner.blue.block.attached";
    var $bannersInPage = $(".n-banner");
    var CSSSelectorMap = {
        collapseDropdownMenu:".n-banner-links-collapse-dropdown-menu > .dropdown",
        bannerRightDropdown:".n-banner-links .dropdown",
        navSecondHoverItem: ".nav-secondary-horizontal li",
        dropdownItemHasChild:".n-dropdown-menu-item-has-child",
        navLinksDetachedClass:"dropdown-menu n-banner-links-collapse-dropdown-menu",
        navLinksAttatchedClass:"nav n-banner-nav n-banner-links",
        navDropdownLinksDetachedClass:"dropdown-menu n-banner-dropdown-links-collapse-dropdown-menu",
        navDropdownLinksAttatchedClass:"nav n-banner-nav n-banner-dropdown-links",

        attachNavLinks: ".n-banner-2nd .n-banner-links-collapse-dropdown-menu",
        attachNavDropdownLinks: ".n-banner-2nd .n-banner-dropdown-links-collapse-dropdown-menu",
        attachNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu.n-collapse-dropdown-sub-menu",

        DetachedNavLinks: ".n-banner-2nd .n-banner-links",
        DetachedNavDropdownLinks: ".n-banner-2nd .n-banner-dropdown-links",
        DetachedNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu"
    };
    /*--------------- end module scope variables ----------------*/


    /*--------------- start utility methods ---------------*/
    /*--------------- end utility methods ---------------*/


    /*--------------- start dom methods ---------------*/
    //loop through every banner on the page
    function triggerCollapseBanner() {
        $bannersInPage.each(function () {
            var $banner = $(this);
            var compensation = 30;
            var bannerToggle = $banner.find(".n-banner-toggle");
            //blue part offset on the top banner
            var offsetUpBlue = $banner.find('.n-banner-1st-blue-to-gray').position().left + $banner.find('.n-banner-1st-blue-to-gray .blue-corner').width() - compensation;
            //grey part width in the bottom
            var $navTabDown = $banner.find('.n-banner-2nd .n-banner-tabs');
            //grey part off set in the bottom banner
            var offsetDownGray = $navTabDown.width();
            var breakPointState = $banner.attr("data-visual-break");
            if (breakPointState === undefined) {
                if (offsetUpBlue < offsetDownGray) {
                    $banner.trigger(bannerBlueDetachEvent);
                } else {
                    $banner.trigger(bannerBlueAttachEvent);
                }
            } else if (breakPointState === "true" && offsetUpBlue > offsetDownGray && typeof bannerToggle !== "undefined" && $(bannerToggle).css("display") === "none") {
                $banner.trigger(bannerBlueAttachEvent);
            } else if (breakPointState === "false" && offsetUpBlue < offsetDownGray) {
                $banner.trigger(bannerBlueDetachEvent);
            }
        });
    }

    //elements mark to be hidden on blue detached event in the banner
    function toggleVisibleBlocksWhenBlueDetached(parameters) {
        var $banner = parameters.$banner;
        var detach = parameters.detach;
        var hiddenOnBlueDetach = $banner.find('.hidden-on-blue-detached');
        var showOnBlueDetach = $banner.find('.show-on-blue-detached');
        var overflowCover = $banner.find('.overflow-toggle-area-cover');
        var filterBar = $banner.find('.n-banner-3rd-filler-dark');
        if (detach) {
            hiddenOnBlueDetach.hide();
            showOnBlueDetach.show();
            overflowCover.show();
            filterBar.hide();
        } else {
            hiddenOnBlueDetach.show();
            showOnBlueDetach.hide();
            overflowCover.hide();
            if ($banner.find('.filter-bar').css("display") !== "none") {
                filterBar.show();
            }
        }
    }
    function bannerBlueBlockDetached() {
        /*jshint validthis:true */
        var $banner = $(this);
        $banner.attr("data-visual-break", true);
        toggleVisibleBlocksWhenBlueDetached({ $banner: $banner, detach: true });

        //rightmost tab need to hide
        var navTabDownRightmostTab = $banner.find('.n-banner-2nd .rightmost-tab');
        navTabDownRightmostTab.removeClass('rightmost-tab').addClass('rightmost-tab-disabled');

        //transform style for nav links
        var navLinks = $banner.find(CSSSelectorMap.DetachedNavLinks);
        var navDropdownLinks = $banner.find(CSSSelectorMap.DetachedNavDropdownLinks);
        navDropdownLinks.find('li.dropdown').each(function () {
            $banner.addClass('n-dropdown-menu-item-has-child');
        });
        navDropdownLinks.find('ul.dropdown-menu').each(function () {
            $banner.addClass('n-dropdown-sub-menu');
        });
        navLinks.removeClass(CSSSelectorMap.navLinksAttatchedClass).addClass(CSSSelectorMap.navLinksDetachedClass);
        navDropdownLinks.removeClass(CSSSelectorMap.navDropdownLinksAttatchedClass).addClass(CSSSelectorMap.navDropdownLinksDetachedClass);

        //add class for showing dropdown correctly
        var navLinksSubmenu = $banner.find(CSSSelectorMap.DetachedNavLinksSubmenu);
        navLinksSubmenu.addClass('n-collapse-dropdown-sub-menu');
    }
    function bannerBlueBlockAttached() {
        /*jshint validthis:true */
        var $banner = $(this);
        $banner.attr("data-visual-break", false);
        toggleVisibleBlocksWhenBlueDetached({ $banner: $banner, detach: false });

        //rightmost tab need to show
        var navTabDownRightmosTab = $banner.find('.n-banner-2nd .rightmost-tab-disabled');
        navTabDownRightmosTab.removeClass('rightmost-tab-disabled').addClass('rightmost-tab');

        //transform style for nav links
        var navLinks = $banner.find(CSSSelectorMap.attachNavLinks);
        var navDropdownLinks = $banner.find(CSSSelectorMap.attachNavDropdownLinks);
        navDropdownLinks.find('li.dropdown').each(function () {
            $banner.removeClass('n-dropdown-menu-item-has-child');
        });
        navDropdownLinks.find('ul.dropdown-menu').each(function () {
            $banner.removeClass('n-dropdown-sub-menu');
        });
        navLinks.removeClass(CSSSelectorMap.navLinksDetachedClass).addClass(CSSSelectorMap.navLinksAttatchedClass);
        navDropdownLinks.removeClass(CSSSelectorMap.navDropdownLinksDetachedClass).addClass(CSSSelectorMap.navDropdownLinksAttatchedClass);

        //remove class
        var navLinksSubmenu = $banner.find(CSSSelectorMap.attachNavLinksSubmenu);
        navLinksSubmenu.removeClass('n-collapse-dropdown-sub-menu');
    }

    //show or hide menu function
    var hideSubMenu = function ($subMenu) {
        $subMenu.css("left", "auto");
        $subMenu.removeClass("open");
        $subMenu.siblings('a').removeClass("n-dropdown-sub-menu-parent-active");
    };
    var showSubMenu = function ($parent) {
        var parentMenuWidth = $parent.parent("ul").innerWidth();
        var $subMenu = $parent.children(".n-dropdown-sub-menu");
        if (parentMenuWidth < ($parent.closest(".n-banner").width() - $parent.offset().left)) {
            $subMenu.css("left", parentMenuWidth + "px");
        } else {
            $subMenu.css("left", "-" + $subMenu.innerWidth() + "px");
        }
        hideSubMenu($parent.siblings("li.n-dropdown-menu-item-has-child").children(".n-dropdown-sub-menu.open"));
        $subMenu.addClass("open");
        $parent.children('a').addClass("n-dropdown-sub-menu-parent-active");
    };
    var setSubMenuItemFocus = function ($item, isUpMove) {
        $item.siblings("li").children("a").blur();
        var prevItem = isUpMove ? $item.prev("li") : $item.next("li");
        if (prevItem.length === 0) {
            prevItem = isUpMove ? $item.parent().children("li").last() : $item.parent().children("li").first();
        }
        prevItem.children("a").focus();
    };

    var showCollapsedSubMenu = function ($parent) {
        var parentMenuWidth = $parent.parent("ul").innerWidth();
        var $subMenu = $parent.children(".n-collapse-dropdown-sub-menu");
        if (parentMenuWidth < ($parent.closest(".n-banner").width() - $parent.offset().left)) {
            $subMenu.css("left", parentMenuWidth + "px");
        } else {
            var subMenuPos = $subMenu.innerWidth() + 2;
            $subMenu.css("left", "-" + subMenuPos + "px");
        }

        $parent.addClass("open");
        $parent.children('a').eq(0).addClass("n-dropdown-sub-menu-parent-active");
    };
    var hideCollapsedSubMenu = function ($parent) {
        $parent.children(".n-collapse-dropdown-sub-menu").css("left", "auto");
        $parent.removeClass("open");
        $parent.children('a').eq(0).removeClass("n-dropdown-sub-menu-parent-active");

    };
    var bannerThirdLevelControl = function () {
        var div = $(this).find("div");
        if (!div.hasClass("n-banner-overflow-control")) {
            $(".n-banner-3rd-filler-gray").hide();
            $(".n-banner-3rd").find(".n_banner_3rd_subItem").hide();
        }

        if ($(this).hasClass("n-banner-3Link")) {
            var id = $(this).find("a").data("item");
            $(".n-banner-3rd-filler-gray").show();
            $(".n-banner-3rd").show();
            $("#" + id).show();
        }
    };

    var activateFocusedTab = function ($this) {
        var parentLi = $this.closest("li");
        parentLi.siblings("li").removeClass("active");
        parentLi.addClass("active");
        var barGrayToBlue = parentLi.closest(".n-banner-tabs").siblings(".n-banner-2nd-gray-to-blue");
        if (barGrayToBlue.length > 0) {
            if (parentLi.hasClass("rightmost-tab")) {
                barGrayToBlue.addClass("active");
            }
            else {
                barGrayToBlue.removeClass("active");
            }
        }
    };
    /*--------------- end dom methods ---------------*/


    /*--------------- start event handlers ----------*/
    $bannersInPage.on(bannerBlueDetachEvent, bannerBlueBlockDetached).on(bannerBlueAttachEvent, bannerBlueBlockAttached);
    nBannerTabs.on("mouseover", CSSSelectorMap.dropdownItemHasChild, function () {
        showSubMenu($(this));
    });
    nBannerTabs.on("mouseleave", CSSSelectorMap.dropdownItemHasChild, function () {
        hideSubMenu($(this).children(".n-dropdown-sub-menu"));
    });

    // add key event to show or close sub menu
    nBannerTabs.on("keydown", CSSSelectorMap.dropdownItemHasChild, function (event) {
        // click right arrow, open sub menu;
        if (event.keyCode === KEY.right ||event.keyCode === KEY.space ||event.keyCode === KEY.enter) {
            var $subMenu = $(this).children(".n-dropdown-sub-menu");
            if (!$subMenu.hasClass("open")) {
                showSubMenu($(this));
                $(this).blur();
                $subMenu.children("li").first().children("a").focus();
            }
        }
    });
    nBannerTabs.on("click", ".n-banner-dropdown-toggle", function () {
        var nDropdownSubmenuOpen = nDropdownSubmenuOpen || $(".n-dropdown-sub-menu.open");
        if (nDropdownSubmenuOpen.length !== 0) {
            nDropdownSubmenuOpen.removeClass("open");
            nDropdownSubmenuOpen.siblings('a').removeClass("n-dropdown-sub-menu-parent-active");
        }
    });
    nBannerTabs.on("click", ".dropdown-menu>li", function () {
        if (!$(this).parent().hasClass("open")) {
            $(this).closest(".dropdown").find("a").first().focus();
        }
    });

    // add key event to move focus of sub menu item
    nBannerTabs.on("keydown", ".n-dropdown-sub-menu>li", function (event) {
        event.stopPropagation();
        // click up arrow
        if (event.keyCode === KEY.up) {
            setSubMenuItemFocus($(this), true);
            event.preventDefault();
        }
        // click down arrow
        else if (event.keyCode === KEY.down) {
            setSubMenuItemFocus($(this), false);
            event.preventDefault();
        }
        // click left arrow, close sub menu;
        else if (event.keyCode === KEY.left) {
            var $subMenu = $(this).parent(".n-dropdown-sub-menu");
            hideSubMenu($subMenu);
            $subMenu.prev("a").focus();
        }
    });
    nBannerTabs.on("keydown", ">li>a", function (e) {
        if (e.keyCode === KEY.space || e.keyCode === KEY.enter) {
            activateFocusedTab($(this));
        }
    });
    nBannerTabs.on('keydown', "li", function (e) {
        if (e.keyCode === KEY.space || e.keyCode === KEY.enter) {
            e.preventDefault();
            e.stopPropagation();
            var haveChild=$(this).hasClass('n-dropdown-menu-item-has-child');
            if(!haveChild){
                $(e.target)[0].click();
            }
            bannerThirdLevelControl.call(this);
        }
    });

    // hide all sub menu
    $(document).on('click.bs.dropdown.data-api', function () {
        var nDropdownSubmenuOpen = nDropdownSubmenuOpen || $(".n-dropdown-sub-menu.open");
        if (nDropdownSubmenuOpen.length !== 0) {
            nDropdownSubmenuOpen.removeClass("open");nDropdownSubmenuOpen.siblings('a').removeClass("n-dropdown-sub-menu-parent-active");
        }
    });

    //Secondary Navigation Horizontal
    $(document).on('click', CSSSelectorMap.navSecondHoverItem, function() {
        var $this = $(this);
        $(CSSSelectorMap.navSecondHoverItem).removeClass('selected');
        if (!$this.hasClass('selected')) {
            $this.addClass('selected');
        }
    });
    $(document).on('scroll', function() {
        if ($(this).scrollTop()) {
            $('.n-banner-secondary-row').addClass('n-banner-secondary-row-scrolled');
        } else {
            $('.n-banner-secondary-row').removeClass('n-banner-secondary-row-scrolled');
        }
    });

    //Adjust Banner menu item alignment
    $(document).on('show.bs.dropdown', CSSSelectorMap.bannerRightDropdown, function() {
        if ($(this).offset().left + $(this).children("ul").eq(0).width() > $(window).width()){
            $(this).addClass("pull-right");
        } else {
            $(this).removeClass("pull-right");
        }
    });

    //update the info of 3rd nav
    nBannerTabs.on('click', ">li", function () {
        activateFocusedTab($(this));
        bannerThirdLevelControl.call(this);
    });

    //Check if open submenu looses focus and needs to be closed
    $('a').blur(function(event) {
        var tgt = $(event.target || event.srcElement);
        var parentLi$ = $(tgt.closest("li.dropdown"));
        if(parentLi$.length > 0 && parentLi$.hasClass("open")) {
            //Check if any of children is focused, timeout needed to wait for focus to change
            setTimeout(function() {
                //If focus is in header, do not close
                if(parentLi$.find("ul li a:focus").length === 0) {
                    var firstA = $(parentLi$).find('a').first();
                    if(!$(firstA).is(":focus")) {
                        hideSubMenu(parentLi$);
                        $(parentLi$).find('a').first().attr("aria-expanded", "false");
                    }
                }
            }, 50);
        }
    });

    $(".n_banner_3rd_subItem").on("focus", ">li>a", function () {
        var $this = $(this);
        var parentLi = $this.closest("li");
        parentLi.siblings("li").removeClass("active");
        parentLi.addClass("active");
    });
    //collapsed banner toggle
    nBannerLinksCollapse.on("mouseover", CSSSelectorMap.collapseDropdownMenu, function () {
        showCollapsedSubMenu($(this));
    });
    nBannerLinksCollapse.on("mouseleave", CSSSelectorMap.collapseDropdownMenu, function () {
        hideCollapsedSubMenu($(this));
    });
    /*--------------- end event handlers ----------*/


    /*--------------- start public methods ----------*/
    /*--------------- end public methods ----------*/


    /*-------------- start common event bind ----------*/
    // responsive banner behavior when blue areas in 2 rows are detached
    $(document).ready(triggerCollapseBanner);
    $(window).resize(triggerCollapseBanner);
    /*-------------- end common event bind ----------*/

    // BANNER KEYBOARD ACCESSIBILITY
    // =============================
    $(document).on('keydown.wf.banner.keyboard', '.n-banner-tabs li, .n-banner-links li, .n_banner_3rd_subItem li',
        $.wfKBCore.commonKeyboardHandler);

    $(document).on('click', function (e) {
        $('li.selected').each(function (index,el) {
            if (el && !el.contains(e.target)) {
                $('.local-navigation .nav-secondary-horizontal li').removeClass('selected');
            }
        });
    });

    $(document).on('keydown','.local-navigation .nav-secondary-horizontal li', function (e) {
        if (e.keyCode === KEY.space || e.keyCode === KEY.enter) {
            e.preventDefault();
            e.stopPropagation();
            $(e.target)[0].click();
        } else if (e.keyCode === KEY.left) {
            $(this).prev().children("a").focus();
        } else if (e.keyCode === KEY.right) {
            $(this).next().children("a").focus();
        }
    });
}
));


