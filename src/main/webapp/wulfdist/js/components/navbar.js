!function(a){"function"==typeof define&&define.amd?define(["jquery","bootstrap","./keyboard/keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("bootstrap"),require("./keyboard/keyboard-core")),c}:a(jQuery)}(function(a){"use strict";function b(){k.each(function(){var b=a(this),c=30,d=b.find(".n-banner-toggle"),e=b.find(".n-banner-1st-blue-to-gray").position().left+b.find(".n-banner-1st-blue-to-gray .blue-corner").width()-c,f=b.find(".n-banner-2nd .n-banner-tabs"),g=f.width(),h=b.attr("data-visual-break");void 0===h?e<g?b.trigger(i):b.trigger(j):"true"===h&&e>g&&"undefined"!=typeof d&&"none"===a(d).css("display")?b.trigger(j):"false"===h&&e<g&&b.trigger(i)})}function c(a){var b=a.$banner,c=a.detach,d=b.find(".hidden-on-blue-detached"),e=b.find(".show-on-blue-detached"),f=b.find(".overflow-toggle-area-cover"),g=b.find(".n-banner-3rd-filler-dark");c?(d.hide(),e.show(),f.show(),g.hide()):(d.show(),e.hide(),f.hide(),"none"!==b.find(".filter-bar").css("display")&&g.show())}function d(){var b=a(this);b.attr("data-visual-break",!0),c({$banner:b,detach:!0});var d=b.find(".n-banner-2nd .rightmost-tab");d.removeClass("rightmost-tab").addClass("rightmost-tab-disabled");var e=b.find(l.DetachedNavLinks),f=b.find(l.DetachedNavDropdownLinks);f.find("li.dropdown").each(function(){b.addClass("n-dropdown-menu-item-has-child")}),f.find("ul.dropdown-menu").each(function(){b.addClass("n-dropdown-sub-menu")}),e.removeClass(l.navLinksAttatchedClass).addClass(l.navLinksDetachedClass),f.removeClass(l.navDropdownLinksAttatchedClass).addClass(l.navDropdownLinksDetachedClass);var g=b.find(l.DetachedNavLinksSubmenu);g.addClass("n-collapse-dropdown-sub-menu")}function e(){var b=a(this);b.attr("data-visual-break",!1),c({$banner:b,detach:!1});var d=b.find(".n-banner-2nd .rightmost-tab-disabled");d.removeClass("rightmost-tab-disabled").addClass("rightmost-tab");var e=b.find(l.attachNavLinks),f=b.find(l.attachNavDropdownLinks);f.find("li.dropdown").each(function(){b.removeClass("n-dropdown-menu-item-has-child")}),f.find("ul.dropdown-menu").each(function(){b.removeClass("n-dropdown-sub-menu")}),e.removeClass(l.navLinksDetachedClass).addClass(l.navLinksAttatchedClass),f.removeClass(l.navDropdownLinksDetachedClass).addClass(l.navDropdownLinksAttatchedClass);var g=b.find(l.attachNavLinksSubmenu);g.removeClass("n-collapse-dropdown-sub-menu")}var f=a(".n-banner-links-collapse"),g=a(".n-banner-tabs"),h={up:38,down:40,right:39,left:37,space:32,enter:13},i="n.banner.blue.block.detached",j="n.banner.blue.block.attached",k=a(".n-banner"),l={collapseDropdownMenu:".n-banner-links-collapse-dropdown-menu > .dropdown",bannerRightDropdown:".n-banner-links .dropdown",navSecondHoverItem:".nav-secondary-horizontal li",dropdownItemHasChild:".n-dropdown-menu-item-has-child",navLinksDetachedClass:"dropdown-menu n-banner-links-collapse-dropdown-menu",navLinksAttatchedClass:"nav n-banner-nav n-banner-links",navDropdownLinksDetachedClass:"dropdown-menu n-banner-dropdown-links-collapse-dropdown-menu",navDropdownLinksAttatchedClass:"nav n-banner-nav n-banner-dropdown-links",attachNavLinks:".n-banner-2nd .n-banner-links-collapse-dropdown-menu",attachNavDropdownLinks:".n-banner-2nd .n-banner-dropdown-links-collapse-dropdown-menu",attachNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu.n-collapse-dropdown-sub-menu",DetachedNavLinks:".n-banner-2nd .n-banner-links",DetachedNavDropdownLinks:".n-banner-2nd .n-banner-dropdown-links",DetachedNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu"},m=function(a){a.css("left","auto"),a.removeClass("open"),a.siblings("a").removeClass("n-dropdown-sub-menu-parent-active")},n=function(a){var b=a.parent("ul").innerWidth(),c=a.children(".n-dropdown-sub-menu");b<a.closest(".n-banner").width()-a.offset().left?c.css("left",b+"px"):c.css("left","-"+c.innerWidth()+"px"),m(a.siblings("li.n-dropdown-menu-item-has-child").children(".n-dropdown-sub-menu.open")),c.addClass("open"),a.children("a").addClass("n-dropdown-sub-menu-parent-active")},o=function(a,b){a.siblings("li").children("a").blur();var c=b?a.prev("li"):a.next("li");0===c.length&&(c=b?a.parent().children("li").last():a.parent().children("li").first()),c.children("a").focus()},p=function(a){var b=a.parent("ul").innerWidth(),c=a.children(".n-collapse-dropdown-sub-menu");if(b<a.closest(".n-banner").width()-a.offset().left)c.css("left",b+"px");else{var d=c.innerWidth()+2;c.css("left","-"+d+"px")}a.addClass("open"),a.children("a").eq(0).addClass("n-dropdown-sub-menu-parent-active")},q=function(a){a.children(".n-collapse-dropdown-sub-menu").css("left","auto"),a.removeClass("open"),a.children("a").eq(0).removeClass("n-dropdown-sub-menu-parent-active")},r=function(){var b=a(this).find("div");if(b.hasClass("n-banner-overflow-control")||(a(".n-banner-3rd-filler-gray").hide(),a(".n-banner-3rd").find(".n_banner_3rd_subItem").hide()),a(this).hasClass("n-banner-3Link")){var c=a(this).find("a").data("item");a(".n-banner-3rd-filler-gray").show(),a(".n-banner-3rd").show(),a("#"+c).show()}},s=function(a){var b=a.closest("li");b.siblings("li").removeClass("active"),b.addClass("active");var c=b.closest(".n-banner-tabs").siblings(".n-banner-2nd-gray-to-blue");c.length>0&&(b.hasClass("rightmost-tab")?c.addClass("active"):c.removeClass("active"))};k.on(i,d).on(j,e),g.on("mouseover",l.dropdownItemHasChild,function(){n(a(this))}),g.on("mouseleave",l.dropdownItemHasChild,function(){m(a(this).children(".n-dropdown-sub-menu"))}),g.on("keydown",l.dropdownItemHasChild,function(b){if(b.keyCode===h.right||b.keyCode===h.space||b.keyCode===h.enter){var c=a(this).children(".n-dropdown-sub-menu");c.hasClass("open")||(n(a(this)),a(this).blur(),c.children("li").first().children("a").focus())}}),g.on("click",".n-banner-dropdown-toggle",function(){var b=b||a(".n-dropdown-sub-menu.open");0!==b.length&&(b.removeClass("open"),b.siblings("a").removeClass("n-dropdown-sub-menu-parent-active"))}),g.on("click",".dropdown-menu>li",function(){a(this).parent().hasClass("open")||a(this).closest(".dropdown").find("a").first().focus()}),g.on("keydown",".n-dropdown-sub-menu>li",function(b){if(b.stopPropagation(),b.keyCode===h.up)o(a(this),!0),b.preventDefault();else if(b.keyCode===h.down)o(a(this),!1),b.preventDefault();else if(b.keyCode===h.left){var c=a(this).parent(".n-dropdown-sub-menu");m(c),c.prev("a").focus()}}),g.on("keydown",">li>a",function(b){b.keyCode!==h.space&&b.keyCode!==h.enter||s(a(this))}),g.on("keydown","li",function(b){if(b.keyCode===h.space||b.keyCode===h.enter){b.preventDefault(),b.stopPropagation();var c=a(this).hasClass("n-dropdown-menu-item-has-child");c||a(b.target)[0].click(),r.call(this)}}),a(document).on("click.bs.dropdown.data-api",function(){var b=b||a(".n-dropdown-sub-menu.open");0!==b.length&&(b.removeClass("open"),b.siblings("a").removeClass("n-dropdown-sub-menu-parent-active"))}),a(document).on("click",l.navSecondHoverItem,function(){var b=a(this);a(l.navSecondHoverItem).removeClass("selected"),b.hasClass("selected")||b.addClass("selected")}),a(document).on("scroll",function(){a(this).scrollTop()?a(".n-banner-secondary-row").addClass("n-banner-secondary-row-scrolled"):a(".n-banner-secondary-row").removeClass("n-banner-secondary-row-scrolled")}),a(document).on("show.bs.dropdown",l.bannerRightDropdown,function(){a(this).offset().left+a(this).children("ul").eq(0).width()>a(window).width()?a(this).addClass("pull-right"):a(this).removeClass("pull-right")}),g.on("click",">li",function(){s(a(this)),r.call(this)}),a("a").blur(function(b){var c=a(b.target||b.srcElement),d=a(c.closest("li.dropdown"));d.length>0&&d.hasClass("open")&&setTimeout(function(){if(0===d.find("ul li a:focus").length){var b=a(d).find("a").first();a(b).is(":focus")||(m(d),a(d).find("a").first().attr("aria-expanded","false"))}},50)}),a(".n_banner_3rd_subItem").on("focus",">li>a",function(){var b=a(this),c=b.closest("li");c.siblings("li").removeClass("active"),c.addClass("active")}),f.on("mouseover",l.collapseDropdownMenu,function(){p(a(this))}),f.on("mouseleave",l.collapseDropdownMenu,function(){q(a(this))}),a(document).ready(b),a(window).resize(b),a(document).on("keydown.wf.banner.keyboard",".n-banner-tabs li, .n-banner-links li, .n_banner_3rd_subItem li",a.wfKBCore.commonKeyboardHandler),a(document).on("click",function(b){a("li.selected").each(function(c,d){d&&!d.contains(b.target)&&a(".local-navigation .nav-secondary-horizontal li").removeClass("selected")})}),a(document).on("keydown",".local-navigation .nav-secondary-horizontal li",function(b){b.keyCode===h.space||b.keyCode===h.enter?(b.preventDefault(),b.stopPropagation(),a(b.target)[0].click()):b.keyCode===h.left?a(this).prev().children("a").focus():b.keyCode===h.right&&a(this).next().children("a").focus()})});