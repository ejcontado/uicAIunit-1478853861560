/*!
 * WULF v1.2.16 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright 2016 Nokia Solutions and Networks. All rights Reserved.
 */
//bootstrap.min.js
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
//jquery.mousewheel.min.js
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
//jquery.mCustomScrollbar.concat.min.js
/* == jquery mousewheel plugin == Version: 3.1.12, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.9, License: MIT License (MIT) */
!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0,autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&V(t),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),S.call(this),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r.children())),n.overflowed=B.call(this),O.call(this),i.autoDraggerLength&&b.call(this),C.call(this),k.call(this);var s=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?l[0].height()>l[0].parent().height()?T.call(this):(Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(T.call(this),"y"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[1]&&Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?l[1].width()>l[1].parent().width()?T.call(this):(Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(T.call(this),"x"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[0]&&Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=j.call(this,c[0],"y"),c[1]=j.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",Q(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",Q(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&V(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),M.call(this),t&&T.call(this),O.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),M.call(this),T.call(this),n.removeData(a),Z(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),Z(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p.children())),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){return Math.max.apply(Math,t.map(function(){return e(this).outerWidth(!0)}).get())},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis&&i.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),position:"relative"}).unwrap()},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=te(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=t.css("max-height")||"none",r=-1!==i.indexOf("%"),l=t.css("box-sizing");if("none"!==i){var s=r?t.parent().height()*parseInt(i)/100:parseInt(i);"border-box"===l&&(s-=t.innerHeight()-t.height()+(t.outerHeight()-t.innerHeight())),n.css("max-height",Math.round(s))}},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},C=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},y=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},B=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1);return[r>n.height(),l>n.width()]},T=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(V(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),Q(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),Q(t,"_resetX")}},k=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(R.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),H.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&U.call(this),i.keyboard.enable&&F.call(this),n.bindEvents=!0}},M=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),o.bindEvents&&(e(document).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),Z(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),Z(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),Z(s[0],"onCompleteTimeout"),o.bindEvents=!1)},O=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},I=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var o=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[o.screenY,o.screenX,a>1]:[o.pageY,o.pageX,a>1];default:return[e.pageY,e.pageX,!1]}},R=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;Q(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p;p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),$(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),V(l),n=e(this);var a=n.offset(),d=I(o)[0]-a.top,f=I(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),y(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;o(i,r,a,l)}),e(document).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;if(i===a)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(y(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,S=0,b=0,C.removeClass("mCS_touch_action");var o=M.offset();d=I(e)[0]-o.top,u=I(e)[1]-o.left,A=[I(e)[0],I(e)[1]]}function n(e){if(ee(e)&&!c&&!I(e)[2]&&(e.stopImmediatePropagation(),!b||S)){p=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left,n="mcsLinearOut";if(R.push(o),D.push(a),A[2]=Math.abs(I(e)[0]-A[0]),A[3]=Math.abs(I(e)[1]-A[1]),y.overflowed[0])var i=O[0].parent().height()-O[0].height(),r=d-o>0&&o-d>-(i*y.scrollRatio.y)&&(2*A[3]<A[2]||"yx"===B.axis);if(y.overflowed[1])var l=O[1].parent().width()-O[1].width(),f=u-a>0&&a-u>-(l*y.scrollRatio.x)&&(2*A[2]<A[3]||"yx"===B.axis);r||f?(e.preventDefault(),S=1):(b=1,C.addClass("mCS_touch_action")),_="yx"===B.axis?[d-o,u-a]:"x"===B.axis?[null,u-a]:[d-o,null],M[0].idleTimer=250,y.overflowed[0]&&s(_[0],E,n,"y","all",!0),y.overflowed[1]&&s(_[1],E,n,"x",W,!0)}}function i(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),V(C),m=J();var o=k.offset();f=I(e)[0]-o.top,h=I(e)[1]-o.left,R=[],D=[]}function r(e){if(ee(e)&&!c&&!I(e)[2]){e.stopImmediatePropagation(),S=0,b=0,g=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left;if(!(g-p>30)){x=1e3/(g-m);var n="mcsEaseOut",i=2.5>x,r=i?[R[R.length-2],D[D.length-2]]:[0,0];v=i?[o-r[0],a-r[1]]:[o-f,a-h];var d=[Math.abs(v[0]),Math.abs(v[1])];x=i?[Math.abs(v[0]/4),Math.abs(v[1]/4)]:[x,x];var u=[Math.abs(M[0].offsetTop)-v[0]*l(d[0]/x[0],x[0]),Math.abs(M[0].offsetLeft)-v[1]*l(d[1]/x[1],x[1])];_="yx"===B.axis?[u[0],u[1]]:"x"===B.axis?[null,u[1]]:[u[0],null],w=[4*d[0]+B.scrollInertia,4*d[1]+B.scrollInertia];var C=parseInt(B.contentTouchScroll)||0;_[0]=d[0]>C?_[0]:0,_[1]=d[1]>C?_[1]:0,y.overflowed[0]&&s(_[0],w[0],n,"y",W,!1),y.overflowed[1]&&s(_[1],w[1],n,"x",W,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&Q(C,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C=e(this),y=C.data(a),B=y.opt,T=a+"_"+y.idx,k=e("#mCSB_"+y.idx),M=e("#mCSB_"+y.idx+"_container"),O=[e("#mCSB_"+y.idx+"_dragger_vertical"),e("#mCSB_"+y.idx+"_dragger_horizontal")],R=[],D=[],E=0,W="yx"===B.axis?"none":"all",A=[],P=M.find("iframe"),z=["touchstart."+T+" pointerdown."+T+" MSPointerDown."+T,"touchmove."+T+" pointermove."+T+" MSPointerMove."+T,"touchend."+T+" pointerup."+T+" MSPointerUp."+T];M.bind(z[0],function(e){o(e)}).bind(z[1],function(e){n(e)}),k.bind(z[0],function(e){i(e)}).bind(z[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(z[0],function(e){o(e),i(e)}).bind(z[1],function(e){n(e)}).bind(z[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,q(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=I(e)[0]-a.top+f[0].offsetTop,c=I(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(V(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===i.axis||"x"===i.mouseWheel.axis)var d="x",u=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.width()?.9*l.width():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),m=c[1][0].offsetLeft,p=c[1].parent().width()-c[1].width(),g=t.deltaX||t.deltaY||a;else var d="y",u=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.height()?.9*l.height():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),m=c[0][0].offsetTop,p=c[0].parent().height()-c[0].height(),g=t.deltaY||a;"y"===d&&!n.overflowed[0]||"x"===d&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(g=-g),i.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==p||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),Q(o,(h-g*f).toString(),{dir:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},L=function(e){var t=null;try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container"),r=i.parent(),l=e(".mCSB_"+o.idx+"_scrollbar ."+d[12]);l.bind("touchstart."+n+" pointerdown."+n+" MSPointerDown."+n,function(e){c=!0}).bind("touchend."+n+" pointerup."+n+" MSPointerUp."+n,function(e){c=!1}).bind("click."+n,function(a){if(e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail")){V(t);var n=e(this),l=n.find(".mCSB_dragger");if(n.parent(".mCSB_scrollTools_horizontal").length>0){if(!o.overflowed[1])return;var s="x",c=a.pageX>l.offset().left?-1:1,u=Math.abs(i[0].offsetLeft)-.9*c*r.width()}else{if(!o.overflowed[0])return;var s="y",c=a.pageY>l.offset().top?-1:1,u=Math.abs(i[0].offsetTop)-.9*c*r.height()}Q(t,u.toString(),{dir:s,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(V(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[oe(a)[0],oe(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||Q(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||Q(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},H=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},U=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.snapAmount||n.scrollButtons.scrollAmount,q(t,e,o)}if(a.preventDefault(),$(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},F=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.snapAmount||i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||q(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){V(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},q=function(t,o,n,i,r){function l(e){var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],u="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,m="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),v="auto"!==f.scrollAmount?m:u,x=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",_=e?!0:!1;return e&&17>a&&(v="x"===f.dir[0]?s[1]:s[0]),Q(t,v.toString(),{dir:f.dir[0],scrollEasing:x,dur:a,onComplete:_}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),Z(f,"step"),V(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],V(t),te(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},j=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?oe(m)[1]:oe(m)[0];case"string":case"number":if(te(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&te(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?oe(m)[1]:oe(m)[0]}return e(t).length?"x"===o?oe(e(t))[1]:oe(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(h[0].autoUpdate),0===s.parents("html").length?void(s=null):void(h[0].autoUpdate=setTimeout(function(){return f.advanced.updateOnSelectorChange&&(m=r(),m!==w)?(l(3),void(w=m)):(f.advanced.updateOnContentResize&&(p=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],(p[0]!==S[0]||p[1]!==S[1]||p[2]!==S[2]||p[3]!==S[3]||p[4]!==S[4]||p[5]!==S[5])&&(l(p[0]!==S[0]||p[1]!==S[1]),S=p)),f.advanced.updateOnImageLoad&&(g=n(),g!==b&&(h.find("img").each(function(){i(this)}),b=g)),void((f.advanced.updateOnSelectorChange||f.advanced.updateOnContentResize||f.advanced.updateOnImageLoad)&&o()))},f.advanced.autoUpdateTimeout))}function n(){var e=0;return f.advanced.updateOnImageLoad&&(e=h.find("img").length),e}function i(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),l(2)}if(e(t).hasClass(d[2]))return void l();var n=new Image;n.onload=o(n,a),n.src=t.src}function r(){f.advanced.updateOnSelectorChange===!0&&(f.advanced.updateOnSelectorChange="*");var t=0,o=h.find(f.advanced.updateOnSelectorChange);return f.advanced.updateOnSelectorChange&&o.length>0&&o.each(function(){t+=e(this).height()+e(this).width()}),t}function l(e){clearTimeout(h[0].autoUpdate),u.update.call(null,s[0],e)}var s=e(this),c=s.data(a),f=c.opt,h=e("#mCSB_"+c.idx+"_container");if(t)return clearTimeout(h[0].autoUpdate),void Z(h[0],"autoUpdate");var m,p,g,v=h.parent(),x=[e("#mCSB_"+c.idx+"_scrollbar_vertical"),e("#mCSB_"+c.idx+"_scrollbar_horizontal")],_=function(){return[x[0].is(":visible")?x[0].outerHeight(!0):0,x[1].is(":visible")?x[1].outerWidth(!0):0]},w=r(),S=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],b=n();o()},N=function(e,t,o){return Math.round(e/t)*t-o},V=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){K.call(this)})},Q=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||_>=w[0]+b,c.callbacks.alwaysTriggerOffsets||-C>=_]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[v[0].offsetTop,v[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",
callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(o=N(o,c.snapAmount,c.snapOffset)),n.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",_=h[0].offsetLeft,w=[f.width()-h.outerWidth(!1),v.parent().width()-v.width()],S=[o,0===o?0:o/s.scrollRatio.x],b=p[1],C=g[1],B=b>0?b/s.scrollRatio.x:0,T=C>0?C/s.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",_=h[0].offsetTop,w=[f.height()-h.outerHeight(!1),v.parent().height()-v.height()],S=[o,0===o?0:o/s.scrollRatio.y],b=p[0],C=g[0],B=b>0?b/s.scrollRatio.y:0,T=C>0?C/s.scrollRatio.y:0}S[1]<0||0===S[0]&&0===S[1]?S=[0,0]:S[1]>=w[1]?S=[w[0],w[1]]:S[0]=-S[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(s.tweenRunning||!(0===_&&S[0]>=0||_===w[0]&&S[0]<=w[0]))&&(G(v[0],x,Math.round(S[1]),u[1],n.scrollEasing),G(h[0],x,Math.round(S[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,y(v),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&S[1]>=w[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&S[1]<=T&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,y(v,"hide")},e)}}}))}},G=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=J()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=J(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},J=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},K=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},Z=function(e,t){try{delete e[t]}catch(o){e[t]=null}},$=function(e){return!(e.which&&1!==e.which)},ee=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},te=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},oe=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+oe(n)[0]>=0&&a[0]+oe(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+oe(n)[1]>=0&&a[1]+oe(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
//wulf.js
/*!
 * WULF v1.2.16 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright 2016 Nokia Solutions and Networks. All rights Reserved.
 */



( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery', 'moment-timezone',
			'bootstrap',
			'fuelux/datepicker',
			'fuelux/selectlist',
			'fuelux/tree',
			'fuelux/combobox',
			'fuelux/spinbox',
			'malihu-custom-scrollbar-plugin',
			'twitter-bootstrap-wizard',
			'jqxcore',
			'jqxdata',
			'jqxbuttons',
			'jqxscrollbar',
			'jqxmenu',
			'jqxcheckbox',
			'jqxlistbox',
			'jqxdropdownlist',
			'jqxgrid',
			'jqxgrid.filter',
			'jqxgrid.pager',
			'jqxgrid.sort',
			'jqxgrid.edit',
			'jqxgrid.selection',
			'jqxgrid.columnsresize',
			'jqxgrid.columnsreorder',
			'jqxpanel',
			'jqxcombobox',
			'jqxdatatable',
			'jqxtreegrid',
			'jqxdraw',
			'jqxchart.core',
			'jqxchart',
			'jqxspinner'
		], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== 'undefined' ) {
					jQuery = require( 'jquery' );

				} else {
					jQuery = require( 'jquery' )( root );
				}
			}
			factory( jQuery, require( 'moment-timezone' ), require( 'bootstrap' ), require( 'fuelux' ), require( 'jquery-mousewheel' ), require( 'malihu-custom-scrollbar-plugin' ), require( 'twitter-bootstrap-wizard' ), require( 'jqwidgets-framework/jqwidgets/jqx-all' ) );
			return jQuery;
		};
	} else {
		factory( jQuery );
	}
}( function( $, moment ) {
	'use strict';
	/* jshint ignore:start */
	if ( typeof $ === 'undefined' ) {
		throw new Error( 'WULF\'s JavaScript requires jQuery' )
	}

	var version = $.fn.jquery.split( ' ' )[ 0 ].split( '.' )
	if ( ( version[ 0 ] < 2 && version[ 1 ] < 9 ) || ( version[ 0 ] == 1 && version[ 1 ] == 9 && version[ 2 ] < 1 ) ) {
		throw new Error( 'WULF\'s JavaScript requires jQuery version 1.9.1 or higher' )
	}
	//keyboard-core.js
	( function( $ ) {

		var SPACE_BAR_KEY = 32;
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;
		var UP_KEY = 38;
		var DOWN_KEY = 40;
		var ESC_KEY = 27;
		var TAB_KEY = 9;

		var KeyboardCore = {
			commonKeyboardHandler: function( e ) {
				var supportKeys = [ TAB_KEY, SPACE_BAR_KEY, UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY, ESC_KEY ];

				if ( supportKeys.indexOf( e.keyCode ) === -1 ) {
					return;
				}

				if ( e.data && e.data.notSupport ) {
					if ( e.data.notSupport.indexOf( e.keyCode ) !== -1 ) {
						return;
					}
				}

				var target = $( e.target );

				if ( e.keyCode !== TAB_KEY ) {
					e.preventDefault();
				}

				var parent, nextItem;

				//Handle focus status
				switch ( e.keyCode ) {
					case TAB_KEY:
						if ( target.get( 0 ).tagName === "A" && target.closest( "ul" ).closest( "div" ).hasClass( "selectlist-multiple" ) ) {
							target.find( "input[type='checkbox']" ).focus();
						}
						//Handle scrollbar status
						parent = getRootNode( $( e.target ) );
						nextItem = getNextItem( parent, e );
						if ( isScrollNeeded( parent, nextItem ) ) {
							$( parent ).mCustomScrollbar( 'scrollTo', nextItem, {
								scrollInertia: 0
							} );
						}
						break;
					case ESC_KEY:
						if ( target.get( 0 ).tagName === "A" && target.closest( "ul" ).closest( "div" ).hasClass( "selectlist-multiple" ) ) {
							target.closest( ".dropdown-menu" ).prev().trigger( 'click' );
						} else if ( target.get( 0 ).tagName === "INPUT" && target.closest( "ul" ).closest( "div" ).hasClass( "selectlist-multiple" ) ) {
							//target is input, somewhere call this section again, so need stop event propagation
							target.closest( ".dropdown-menu" ).prev().trigger( 'click' );
							e.stopPropagation();
						}
						break;
					case SPACE_BAR_KEY:
						if ( target.get( 0 ).tagName === "A" && target.closest( "ul" ).closest( "div" ).hasClass( "selectlist-multiple" ) ) {
							target.find( "input[type='checkbox']" ).trigger( 'click' );
						} else if ( target.get( 0 ).tagName === "INPUT" && target.closest( "ul" ).closest( "div" ).hasClass( "selectlist-multiple" ) ) {
							//target is input, somewhere call this section again, so need stop event propagation
							target.trigger( 'click' );
							e.stopPropagation();
						} else if ( target.is( 'li' ) && target.parent().hasClass( 'n-banner-nav' ) ) {
							if ( !target.closest( 'li' ).hasClass( 'disabled' ) ) {
								target.tab( 'show' );
							}
						} else if ( target.hasClass( "n-close" ) ) {
							target.find( ".icon-close" ).click();
						} else {
							target.trigger( 'click' );
						}
						break;
					case UP_KEY:
					case DOWN_KEY:
						e.preventDefault();
						e.stopPropagation();
						parent = getRootNode( $( e.target ) );
						nextItem = getNextItem( parent, e );
						nextItem.trigger( 'focus' );
						//Handle scrollbar status
						if ( isScrollNeeded( parent, nextItem ) ) {
							$( parent ).mCustomScrollbar( 'scrollTo', nextItem, {
								scrollInertia: 0,
								timeout: 1
							} );
						}
						break;
					case LEFT_KEY:
					case RIGHT_KEY:
						if ( target.is( 'a' ) && ( target.closest( 'ul' ).hasClass( 'n-banner-nav' ) ||
								target.closest( 'ul' ).hasClass( 'nav-tabs' ) ) ||
							target.closest( 'ul' ).hasClass( 'n_banner_3rd_subItem' ) ) {
							parent = getRootNode( target );
							nextItem = getNextItem( parent, e );
							nextItem.trigger( 'focus' );
						}
						break;
					default:
						break;
				}
			},

			getAllVisibleSubItems: function( target ) {
				return getAllVisibleSubItems( target );
			},

			isScrollNeeded: function( parent, item ) {
				return isScrollNeeded( parent, item );
			},

			isHiddenElement: function( target ) {
				return isHiddenElement( target );
			}
		};

		// KEYBOARD CORE INTERNAL METHODS
		// ==============================

		function getRootNode( target ) {
			if ( target.hasClass( 'n-list-group-item' ) ) {
				if ( target.is( 'dd' ) ) {
					return target.closest( 'dl' );
				}
				return target.closest( 'ul' );
			}

			if ( target.hasClass( 'tree-branch-name' ) || target.hasClass( 'tree-item-name' ) ) {
				return target.closest( 'ul.tree' );
			}

			return target.closest( 'ul' );
		}

		function getNextItem( parent, e ) {
			var items = getAllVisibleSubItems( parent );
			var indx = items.index( e.target );
			switch ( e.keyCode ) {
				case TAB_KEY: // Tab or Shift+tab
					indx = ( e.shiftKey ? ( indx > 0 ? indx - 1 : 0 ) : ( indx < items.length - 1 ? indx + 1 : items.length - 1 ) );
					break;
				case LEFT_KEY:
				case UP_KEY:
					indx = indx > 0 ? indx - 1 : 0;
					break;
				case RIGHT_KEY:
				case DOWN_KEY:
					indx = indx < items.length - 1 ? indx + 1 : items.length - 1;
					break;
				default:
					break;
			}
			return items.eq( indx );
		}

		function getAllVisibleSubItems( target ) {
			if ( target.children().children().hasClass( "datepicker" ) ) {
				return target.children();
			}
			if ( target.children().hasClass( "datepicker" ) ) {
				return target.parent().children();
			}
			if ( target.prev().children().hasClass( "datepicker" ) ) {
				return target.parent().children();
			}

			if ( $( target ).hasClass( 'n-list-group' ) ) {
				if ( $( target ).is( 'dl' ) ) {
					return target.find( 'dd' );
				}
				return target.find( 'li' );
			}

			if ( $( target ).hasClass( 'n-flyout-menu' ) ) {
				return target.find( 'li a' );
			}

			if ( $( target ).hasClass( 'n-banner-tabs' ) || $( target ).hasClass( 'nav-tabs' ) ) {
				return target.children( 'li:not([disabled])' ).children( 'a' );
			}

			if ( $( target ).hasClass( 'dropdown-menu' ) ) {
				if ( target.closest( "ul.n-banner-links" ).length > 0 ) {
					return target.parent( 'li:not(.disabled)' ).find( 'a:not([disabled]):visible' );
				} else {
					return target.find( 'li:not(.disabled)' ).children( 'a:not([disabled]):visible' );
				}
			}

			if ( $( target ).hasClass( 'tree' ) ) {
				var itemArr = [];
				var items = target.find( 'li:not(.hide) a' );
				for ( var i = 0; i <= items.length - 1; i++ ) {
					if ( !isTreeItemHidden( $( items[ i ] ) ) ) {
						itemArr.push( items[ i ] );
					}
				}
				return $( itemArr );
			}
			if ( $( target ).is( 'tr' ) && !isHiddenElement( target ) ) {
				if ( $( target ).parent().is( '.n-multicolumn-list thead' ) ) {
					return target.find( 'th' );
				} else {
					return target.find( 'td' );
				}
			}

			if ( $( target ).hasClass( 'n-banner-links' ) || $( target ).hasClass( 'n_banner_3rd_subItem' ) ) {
				return target.children( 'li:not([disabled])' ).find( ">a" );
			}

			return target.find( 'li' );
		}

		function isScrollNeeded( parent, item ) {
			if ( $( parent ).find( '.mCSB_container' ).length === 0 ) {
				return;
			}
			if ( $( item ).closest( 'table' ).hasClass( 'datepicker-calendar-days' ) ) {
				return;
			}

			var parentTop = $( parent ).offset().top;
			var itemTop = $( item ).offset().top;
			var parentHeight = $( parent ).get( 0 ).clientHeight;
			var itemHeight = item.get( 0 ).offsetHeight;
			var topDiff = itemTop - parentTop;
			var bottomDiff = topDiff + itemHeight;
			return ( topDiff < 10 || bottomDiff > parentHeight - 10 );
		}

		function isTreeItemHidden( target ) {
			var isHidden = false;
			var parent = target.parent();
			while ( !parent.hasClass( 'tree' ) && !parent.is( 'html' ) ) {
				if ( parent.closest( 'ul' ).hasClass( 'hidden' ) ) {
					isHidden = true;
					break;
				}
				parent = parent.parent();
			}
			return isHidden;
		}

		function isHiddenElement( target ) {
			var display = target.css( 'display' ) === 'none';
			var visibility = target.css( 'visibility' ) === 'hidden';
			var height = target.height() === 0;
			return display || visibility || height;
		}

		$( document )
			/** add keyboard event for pull down && combo box*/
			.on( 'keydown.wf.common.keyboard', '.dropdown-menu', KeyboardCore.commonKeyboardHandler )
			//.on('keydown.wf.selectlist.keyboard', '.selectlist', KeyboardCore.commonKeyboardHandler)
			.on( 'keydown.wf.common.keyboard', '.icon-close', {
				notSupport: [ UP_KEY, DOWN_KEY ]
			}, KeyboardCore.commonKeyboardHandler )
			.on( 'keydown.wf.common.keyboard', '.n-close', {
				notSupport: [ UP_KEY, DOWN_KEY ]
			}, KeyboardCore.commonKeyboardHandler )
			.on( 'keydown.wf.common.keyboard', 'a[data-toggle=modal]', KeyboardCore.commonKeyboardHandler );

		$.wfKBCore = KeyboardCore;

	} )( $ );


	//keyboard-tree.js
	( function( $ ) {

		var SPACE_BAR_KEY = 32;
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;

		$.wfKBTree = {
			treeKeyboardHandler: function( e ) {
				var iconFolder;
				switch ( e.which ) {
					case SPACE_BAR_KEY:
						var href = $( e.target ).attr( "href" );
						if ( href !== "" && href !== "#" ) {
							var target = $( e.target ).attr( "target" );
							var targetParent = window.parent.document.getElementById( target );
							var targetSelf = document.getElementById( target );
							if ( targetParent !== null ) {
								targetParent.src = href;
							} else if ( targetSelf !== null ) {
								targetSelf.src = href;
							} else {
								location.href = href;
							}
						}

						var currentStatus = $( e.target ).find( "input" ).prop( "checked" );
						var targetStatus = !currentStatus;
						$( e.target ).find( "input" ).prop( "checked", targetStatus );
						updateTree();

						break;
					case LEFT_KEY:
						var iconCaret = $( e.target ).find( ".icon-caret" );
						if ( iconCaret.length > 0 ) {
							if ( $( e.target ).find( '.glyphicon-folder-open' ).length ) {
								$( iconCaret ).trigger( "click" );
							}
						}
						// This is for table item that does not have the caret icon
						iconFolder = $( e.target ).find( ".icon-folder" );
						if ( iconFolder.length > 0 ) {
							if ( iconFolder.hasClass( 'glyphicon-folder-open' ) ) {
								$( e.target ).trigger( "click" );
							}
						}
						break;
					case RIGHT_KEY:
						iconCaret = $( e.target ).find( ".icon-caret" );
						if ( iconCaret.length > 0 ) {
							if ( $( e.target ).find( '.glyphicon-folder-close' ).length ) {
								$( iconCaret ).trigger( "click" );
							}
						}
						// This is for table item that does not have the caret icon
						iconFolder = $( e.target ).find( ".icon-folder" );
						if ( iconFolder.length > 0 ) {
							if ( iconFolder.hasClass( 'glyphicon-folder-close' ) ) {
								$( e.target ).trigger( "click" );
							}
						}
						break;
				}

				$.wfKBCore.commonKeyboardHandler( e );
			}
		};

		// KEYBOARD TREE INTERNAL METHODS
		// ==============================

		function updateTree() {
			$( ".tree-branch-name > .checkbox > input[name='folder']" ).each( function() {
				var statuses = [];
				$( this ).closest( ".tree-branch" ).find( "input[name='file']" ).each(
					function() {
						statuses.push( $( this ).prop( "checked" ) );
					}
				);
				if ( statuses.length !== 0 ) {
					var allfileschecked = statuses.reduce( function( a, b ) {
						return a && b;
					} );
					var partfilechecked = statuses.reduce( function( a, b ) {
						return a || b;
					} );
					$( this ).prop( "checked", allfileschecked );
					if ( allfileschecked ) {
						$( this ).prop( {
							checked: true,
							indeterminate: false
						} );
					} else if ( partfilechecked ) {
						$( this ).prop( {
							checked: false,
							indeterminate: true
						} );
					} else {
						$( this ).prop( {
							checked: false,
							indeterminate: false
						} );
					}
				}
			} );
		}

	} )( $ );


	//keyboard-table.js
	( function( $ ) {

		var ENTER_KEY = 13;
		var SPACE_BAR_KEY = 32;
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;
		var UP_KEY = 38;
		var DOWN_KEY = 40;
		var TAB_KEY = 9;
		var ESC_KEY = 27;

		$.wfKBTable = {
			tableKeyboardHandler: function( e ) {
				var supportKeys = [ TAB_KEY, SPACE_BAR_KEY, ENTER_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY, ESC_KEY ];
				var selectedClassName = 'n-cell-selected';

				if ( supportKeys.indexOf( e.which ) === -1 ) {
					return;
				}

				initTableSelected( e, selectedClassName );

				switch ( e.keyCode ) {
					case SPACE_BAR_KEY:
					case ENTER_KEY:
						handleTableSpaceAndEntryKeyboardAction( e );
						break;
					case LEFT_KEY:
					case RIGHT_KEY:
					case UP_KEY:
					case DOWN_KEY:
						handleTableDirectionKeyAction( e, selectedClassName );
						break;
					case TAB_KEY:
						handleTableTabKeyboardAction( e, selectedClassName );
						break;
					case ESC_KEY:
						handleEscapeKeyAction( e, selectedClassName );
						break;
				}
			},

			handleTableDirectionKeyAction: function( e, className ) {
				handleTableDirectionKeyAction( e, className );
			}
		};

		// KEYBOARD TABLE INTERNAL METHODS
		// ===============================

		function initTableSelected( e, className ) {
			var current = $( e.target );

			// Remove the selected class for all items in table
			current.closest( 'table' ).find( 'td' ).each( function() {
				$( this ).removeClass( className );
			} );

			// Only keep the selected class for current item
			if ( current.is( 'td' ) ) {
				if ( current.closest( 'table' ).hasClass( 'n-table-hover' ) ) {
					current.closest( 'tr' ).find( 'td' ).each( function() {
						$( this ).addClass( className );
					} );
				} else {
					current.addClass( className );
				}
			}
		}

		function handleTableSpaceAndEntryKeyboardAction( e ) {
			var current = $( e.target );
			if ( current.is( 'td' ) ) {
				// If the current focus is on table element, prevent the default key action.
				e.preventDefault();
				$( e.target ).trigger( 'click' );
				if ( current.find( 'input' ).length > 0 ) {
					// If the focused element is input filed or checkbox.
					current.find( 'input' ).focus();
					//make the cursor to the end.
					current.find( 'input' ).val( current.find( 'input' ).val() );

					// If the focused element is dropdown list.
					if ( current.find( '.selectlist' ).length > 0 ) {
						current.find( 'button' ).trigger( "click" );
					}

					//WULF-867 calendar keyboard support in table
					if ( current.find( '.n-calendar' ).length > 0 ) {
						current.find( 'button' ).focus();
					}
				}
			}
		}

		function handleTableDirectionKeyAction( e, className ) {
			var current = $( e.target );

			// If the current focus is on table element, prevent the default key action.
			if ( ( current.attr( 'type' ) !== 'text' ) && ( !current.is( 'td' ) ) && ( !current.parent().parent().parent().hasClass( 'n-multicolumn-list' ) ) && current.find( '.n-calendar' ).length <= 0 ) {
				// dropup the possible list element.
				collapseListInTable( current );
				current = current.closest( 'td' );
			}

			var target = getNextTableItem( current, e );

			// Remove the selected class on current element and add selected class to target element.
			if ( target.length > 0 && !( current.hasClass( 'n-inputfield' ) ) ) {
				e.preventDefault();
				if ( !current.closest( 'table' ).hasClass( 'n-table-hover' ) ) {
					//WULF-867 calendar keyboard support in table
					if ( !current.closest( 'table' ).hasClass( 'datepicker-calendar-days' ) &&
						( e.keyCode === LEFT_KEY || e.keyCode === RIGHT_KEY || e.keyCode === UP_KEY || e.keyCode === DOWN_KEY ) &&
						current.find( '.datepicker' ).find( '.dropdown-toggle' ).attr( 'aria-expanded' ) === 'true' ) {
						current.find( '.datepicker' ).find( '.dropdown-toggle' ).trigger( 'click' ).blur();
					}
					current.removeClass( className );
					target.addClass( className );
				} else {
					current.closest( 'tr' ).find( 'td' ).each( function() {
						$( this ).removeClass( className );
					} );
					target.closest( 'tr' ).find( 'td' ).each( function() {
						$( this ).addClass( className );
					} );
				}
				if ( !current.hasClass( 'n-drillDown-item' ) ) {
					current.removeAttr( 'tabindex' );
				}
				target.attr( 'tabindex', 0 );
				target.trigger( 'focus' );
			}

			//Handle scrollbar status
			var parent = target.closest( '.n-table-scrollbar' );
			if ( $.wfKBCore.isScrollNeeded( parent, target ) ) {
				$( parent ).mCustomScrollbar( 'scrollTo', target, {
					scrollInertia: 0
				} );
			}
		}

		function handleTableTabKeyboardAction( e, className ) {
			var current = $( e.target );
			current.closest( 'table' ).not( '.n-drilldown-table' ).find( 'td' ).removeAttr( 'tabindex' );
			if ( current.parent().parent().parent().hasClass( 'n-multicolumn-list' ) ) {
				$( ".n-multicolumn-list tbody:not(.group) td, th, .n-multicolumn-list tbody.group" ).prop( "tabIndex", 0 );
			}
			current.closest( '.n-table' ).find( 'td' ).each( function() {
				$( this ).removeClass( className );
			} );
		}

		function handleEscapeKeyAction( e, selectedClassName ) {
			var current = $( e.target );
			if ( current.get( 0 ).tagName === "INPUT" && current.hasClass( "n-inputfield" ) ) {
				current.parent().focus().addClass( selectedClassName );
			}
		}

		function getNextTableItem( current, e ) {
			if ( current.hasClass( "n-inputfield" ) && !current.parent().hasClass( 'n-calendar' ) ) {
				current = current.closest( 'td' );
			}

			var items = $.wfKBCore.getAllVisibleSubItems( current.parent() );

			var index = items.index( current );
			var prev, next;
			switch ( e.keyCode ) {
				case TAB_KEY:
					if ( e.shiftKey ) {
						if ( index > 0 ) {
							index--;
						} else {
							index = items.length - 1;
							prev = current.parent().prev();
							while ( $.wfKBCore.isHiddenElement( prev ) ) {
								prev = prev.prev();
							}
							items = $.wfKBCore.getAllVisibleSubItems( prev );
						}
					} else {
						if ( index < items.length - 1 ) {
							index++;
						} else {
							index = 0;
							next = current.parent().next();
							while ( $.wfKBCore.isHiddenElement( next ) ) {
								next = next.next();
							}
							items = $.wfKBCore.getAllVisibleSubItems( next );
						}
					}
					break;
				case LEFT_KEY:
					index = index > 0 ? index - 1 : 0;
					break;
				case RIGHT_KEY:
					index = index < items.length - 1 ? index + 1 : items.length - 1;
					break;
				case UP_KEY:
					if ( current.parent().is( '.n-multicolumn-list tbody tr:first-child' ) ) {
						prev = current.parent().parent().prev().find( 'tr' );
					} else {
						prev = current.parent().prev();
					}
					while ( $.wfKBCore.isHiddenElement( prev ) ) {
						prev = prev.prev();
					}
					items = prev.length > 0 ? $.wfKBCore.getAllVisibleSubItems( prev ) : items;
					break;
				case DOWN_KEY:
					if ( current.hasClass( 'n-multicolumn-list-th' ) ) {
						next = current.parent().parent().next().find( 'tr:first-child' );
					} else {
						next = current.parent().next();
					}
					while ( $.wfKBCore.isHiddenElement( next ) ) {
						next = next.next();
					}
					items = next.length > 0 ? $.wfKBCore.getAllVisibleSubItems( next ) : items;
					break;
				default:
					break;
			}
			if ( current.closest( '.n-calendar' ).length > 0 ) {
				if ( items.eq( index ).hasClass( 'last-month' ) || items.eq( index ).hasClass( 'next-month' ) ) {
					return current;
				}
				if ( ( current.closest( '.n-calendar-lock-past' ).length > 0 || current.closest( '.n-data-range-end' ).length > 0 ) && items.eq( index ).hasClass( 'past' ) ) {
					return current;
				}
			}
			return items.eq( index );
		}

		/**
		 * Dropup the list if the element is a dropdown list.
		 *
		 * @param current - the current focused element.
		 */
		function collapseListInTable( current ) {
			if ( current.closest( 'div' ).hasClass( 'selectlist' ) ) {
				if ( current.closest( 'div' ).find( 'button' ).attr( 'aria-expanded' ) === 'true' ) {
					current.closest( 'div' ).find( 'button' ).trigger( 'click' );
				}
			}
		}

	} )( $ );


	//keyboard-calendar.js
	( function( $ ) {

		var ENTER_KEY = 13;
		var SPACE_BAR_KEY = 32;
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;
		var UP_KEY = 38;
		var DOWN_KEY = 40;
		var TAB_KEY = 9;

		$.wfKBCalendar = {
			calendarKeyboardHandler: function( e ) {
				var supportKeys = [ TAB_KEY, SPACE_BAR_KEY, ENTER_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY ];
				var selectedClassName = 'selected';

				if ( supportKeys.indexOf( e.which ) === -1 ) {
					return;
				}

				initDatePickerSelected( e, selectedClassName );

				switch ( e.keyCode ) {
					case LEFT_KEY:
					case RIGHT_KEY:
					case UP_KEY:
					case DOWN_KEY:
						handleCalendarDirectionKeyAction( e, selectedClassName );
						break;
					case TAB_KEY:
						handleCalendarTabKeyboardAction( e, selectedClassName );
						break;
					case SPACE_BAR_KEY:
					case ENTER_KEY:
						$( e.target ).find( 'button' ).trigger( 'click' );
						break;
				}
			},

			calendarFocusinHandler: function( e ) {
				var td = $( e.target ).closest( 'td' );
				if ( !td.hasClass( 'selected' ) ) {
					initDatePickerSelected( e, 'selected' );
				}
			}
		};

		// KEYBOARD CALENDAR INTERNAL METHODS
		// ==================================

		function initDatePickerSelected( e, className ) {
			var current = $( e.target );
			current.closest( 'table' ).find( 'td' ).each( function() {
				$( this ).removeClass( className );
			} );
		}

		function handleCalendarDirectionKeyAction( e, className ) {
			$.wfKBTable.handleTableDirectionKeyAction( e, className );
		}

		function handleCalendarTabKeyboardAction( e, className ) {
			var current = $( e.target );
			current.removeAttr( 'tabindex' );
			current.closest( '.datepicker-calendar-days' ).find( 'td' ).each( function() {
				$( this ).removeClass( className );
			} );
		}

	} )( $ );


	//keyboard-grid.js
	( function( $ ) {

		$.wfKBGrid = {
			gridFocusinHandler: function( e ) {
				var current = $( e.target );
				var id = current.attr( 'id' );
				if ( id !== undefined && ( id.indexOf( 'wrapper' ) === 0 || id.indexOf( 'content' ) === 0 || id.indexOf( 'tree' ) === 0 ) ) {
					if ( isTreeGrid( current ) ) {
						// For tree table grid
						treeJQTableFocusinHandler( current );
					} else {
						var grid = current.closest( '.jqx-grid' );
						if ( grid.length > 0 ) {
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
							if ( isPagingGrid( current ) ) {
								if ( !isPagingGridPager( current ) ) {
									standardJqTableFocusinHandler( grid );
								}
							}
						}
					}
				}
			}
		};

		function treeJQTableFocusinHandler( current ) {
			var keyIndex = current.find( 'tr:first' ).data( 'key' );
			var isFocused = false;
			var isTreeGrid = false;
			current.find( 'td' ).each( function() {
				if ( $( this ).hasClass( 'jqx-grid-cell-selected' ) && $( this ).hasClass( 'jqx-fill-state-pressed' ) ) {
					isFocused = true;
				}
				if ( $( this ).find( 'span:first' ).hasClass( 'jqx-tree-grid-collapse-button' ) ) {
					isTreeGrid = true;
				}
			} );
			if ( !isFocused && isTreeGrid ) {
				current.jqxTreeGrid( 'selectRow', keyIndex );
			}
		}

		function standardJqTableFocusinHandler( current ) {
			var selectedMode = current.jqxGrid( 'selectionmode' );
			if ( selectedMode.indexOf( 'cell' ) >= 0 ) {
				var cells = current.jqxGrid( 'getselectedcells' );
				if ( cells.length === 0 ) {
					focusOnFirstElementInPage( current );
				}
			} else if ( selectedMode.indexOf( 'row' ) >= 0 ) {
				if ( current.jqxGrid( 'getselectedrowindex' ) === -1 ) {
					current.jqxGrid( 'clearselection' );
					current.jqxGrid( 'selectrow', 0 );
				}
			}
		}

		function focusOnFirstElementInPage( current ) {
			var datainformation = current.jqxGrid( 'getdatainformation' );
			var paginginformation = datainformation.paginginformation;
			var pagenum = paginginformation.pagenum;
			var pagesize = paginginformation.pagesize;
			current.jqxGrid( 'clearselection' );
			current.jqxGrid( 'selectcell', pagenum * pagesize, current.jqxGrid( 'columns' ).records[ 0 ].datafield );
		}

		function isTreeGrid( current ) {
			var treeGrid = false;
			current.find( 'td' ).each( function() {
				if ( $( this ).find( 'span:first' ).hasClass( 'jqx-tree-grid-collapse-button' ) ) {
					treeGrid = true;
				}
			} );
			return treeGrid;
		}

		function isPagingGrid( current ) {
			var isPager = false;
			var grid = current.closest( '.jqx-grid' );
			var pager = grid.find( '.jqx-grid-pager' );
			if ( pager.length > 0 && pager.height() > 0 ) {
				if ( pager.find( '.n-table-paging-middle' ).length > 0 ) {
					isPager = true;
				}
			}
			return isPager;
		}

		function isPagingGridPager( current ) {
			return current.closest( '.jqx-grid-pager' ).length !== 0;
		}

	} )( $ );


	//scroll.js
	( function( $ ) {

		function showDropdownScrollbar( obj ) {
			return function() {
				$( obj ).parent().find( '.n-dropdown-menu-scroll' ).mCustomScrollbar( "update" );
			};
		}

		$.fn.extend( {
			nScrollbar: function( options ) {
				var $select = $( this );

				if ( typeof options === "string" ) {
					$select.mCustomScrollbar( options );
					return;
				}

				if ( $select.hasClass( "n-dropdown-menu-scroll" ) || $select.hasClass( "tree-scroll" ) || $select.hasClass( "n-table-scrollbar" ) ||
					( $select.hasClass( "n-list-group-scroll" ) && ( $select.find( "li.n-list-group-item" ).length > 0 || $select.find( "dd.n-list-group-item" ).length > 0 ) ) ) {
					options = $.extend( {}, options, {
						keyboard: {
							enable: false
						}
					} );
				}
				if ( $select.hasClass( "n-table-scrollbar" ) && $select.find( ".datepicker-calendar" ).length > 0 ) {
					options = $.extend( {}, options, {
						advanced: {
							autoScrollOnFocus: false
						}
					} );
				}

				if ( ( options !== undefined && options.notAutoUpdate ) || $select.hasClass( "scrollbar-not-autoupdate" ) ) {
					if ( $select.hasClass( "n-table-scrollbar" ) && $select.find( ".datepicker-calendar" ).length > 0 ) {
						options = $.extend( {}, options, {
							advanced: {
								autoScrollOnFocus: false,
								updateOnContentResize: false,
								updateOnImageLoad: false,
								autoUpdateTimeout: 100
							}
						} );
					} else {
						options = $.extend( {}, options, {
							advanced: {
								updateOnContentResize: false,
								updateOnImageLoad: false,
								autoUpdateTimeout: 100
							}
						} );
					}

					if ( $select.hasClass( "n-dropdown-menu-scroll" ) ) {
						$( ".dropdown-toggle" ).on( "click", function() {
							setTimeout( showDropdownScrollbar( this ), 10 );
						} );
					}
				}

				options = $.extend( {}, options, {
					callbacks: {
						whileScrolling: function() {
							setTimeout( function() {
								$( '.datepicker-calendar-wrapper' ).each( function() {
									if ( $( this ).css( 'display' ) === 'block' ) {
										var input = $( this ).closest( '.n-calendar' ).find( 'input' );
										if ( input.data( 'position' ) === 'fixed' ) {
											$( this ).parent().find( 'button.dropdown-toggle' ).trigger( 'click' );
										}
									}
								} );
								$( '.dropdown-menu' ).each( function() {
									if ( $( this ).css( 'display' ) === 'block' ) {
										if ( $( this ).closest( '.selectlist' ).data( 'position' ) === 'fixed' ) {
											$( this ).parent().find( 'button.dropdown-toggle' ).trigger( 'click' );
										}
									}
								} );
							}, 100 );
						}
					}
				} );
				$select.mCustomScrollbar( options );
			}
		} );

	} )( $ );


	//dropdowns.js
	( function( $ ) {
		$.fn.extend( {
			adaptiveSelectlist: function() {
				$( this ).on( 'shown.bs.dropdown', function() {
					adjustDropdownMenuWidth( $( this ) );
				} );
			}
		} );

		$( document ).ready( function() {
			$( '[data-toggle="tooltip"]' ).tooltip( {
				container: 'body'
			} );
			$( ".n-dropdown-menu-scroll" ).on( "click", ".mCSB_dragger_bar,.mCSB_draggerRail", function( e ) {
				e.stopPropagation();
			} );
			var nPulldownMultiple = '<p class="prompt">--Select items--</p>';
			$( '.selectlist-multiple' ).find( '.selected-label' ).empty().append( nPulldownMultiple );
			$( '.selectlist-multiple ul' ).on( 'click', function( e ) {
				e.stopPropagation();
			} );
			$( '.selectlist-multiple input[type="checkbox"]' ).on( 'click', function() {
				var html,
					tooltip = "",
					title = $( this ).next().children().text(),
					$multiSelect = $( this ).closest( '.selectlist-multiple' );
				if ( $( this ).is( ':checked' ) ) {
					if ( $multiSelect.find( '.selected-label' ).find( 'span' ).length > 0 ) {
						html = '<span wulf-title="' + title + '">' + ", " + title + '</span>';
					} else {
						html = '<span wulf-title="' + title + '">' + title + '</span>';
					}
					$multiSelect.find( '.prompt' ).hide();
					$multiSelect.find( '.selected-label' ).append( html );
					$multiSelect.find( 'button' ).find( 'span[wulf-title]' ).each( function() {
						tooltip = tooltip + $( this ).text();
					} );
					$multiSelect.find( 'button' ).attr( 'data-original-title', tooltip );
				} else {
					$multiSelect.find( 'span[wulf-title="' + title + '"]' ).remove();
					var $firstSelectedItem = $( $multiSelect.find( 'span' ).find( 'span' ).get( 0 ) );
					if ( $firstSelectedItem.text().indexOf( ", " ) === 0 ) {
						$firstSelectedItem.text( $firstSelectedItem.text().slice( 2 ) );
					}
					$multiSelect.find( 'button' ).find( 'span[wulf-title]' ).each( function() {
						tooltip = tooltip + $( this ).text();
					} );
					$multiSelect.find( 'button' ).attr( 'data-original-title', tooltip );
					if ( $multiSelect.find( '.selected-label' ).children().length === 1 ) {
						$multiSelect.find( '.prompt' ).show();
						$multiSelect.find( 'button' ).removeAttr( 'data-original-title' );
					}
				}
			} );
		} );

		$( document )
			.on( 'shown.bs.dropdown', '.n-table .selectlist', relocateDropdown )
			.on( 'scroll.wf.dropdown', closeDropdownOnScroll )
			.on( 'click.fu.selectlist', '.n-table-scrollbar .selectlist .dropdown-menu a', selectDropdownItem )
			.on( "click", ".selectlist ul li a", function() {
				var $select = $( this ).closest( '.selectlist' );
				$select.find( '.btn.dropdown-toggle' ).removeAttr( "data-original-title" );
			} )
			.on( "mouseenter", ".selectlist .dropdown-menu li a", showDropdownItemTooltip )
			.on( "focus", ".selectlist .dropdown-menu li a", showDropdownItemTooltip )
			.on( "mouseleave", ".selectlist .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "blur", ".selectlist .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "mouseenter", "[data-toggle='dropdown']", showDropdownBtnTooltip )
			.on( "mouseenter", ".n-combobutton-btn[data-toggle='tooltip']", showDropdownBtnTooltip )
			.on( "focus", ".n-combobutton-btn[data-toggle='tooltip']", showDropdownBtnTooltip )
			.on( "mouseleave", ".n-combobutton-btn[data-toggle='tooltip']", function() {
				var $selectedElement = $( this );
				$selectedElement.tooltip( "hide" );
			} )
			.on( "focus", "[data-toggle='dropdown']", showDropdownBtnTooltip )
			.on( "mouseleave", "[data-toggle='dropdown']", function() {
				var $selectedElement = $( this );
				$selectedElement.tooltip( "hide" );
			} ).on( 'keypress.n-dropdown-menu-scroll', function( e ) {
				// get the key that was pressed
				var key = String.fromCharCode( e.which );
				// look the items to find the first item with the first character match and set focus
				var focusedEle = document.activeElement;
				var expectEle = $( e.target ).parent();
				if ( focusedEle.tagName.toLowerCase() === 'a' ) {
					expectEle = $( e.target ).closest( 'ul' );
				}
				expectEle.find( 'li' ).each( function( idx, item ) {
					if ( $( item ).text().charAt( 0 ).toLowerCase() === key ) {
						var parent = $( item ).closest( 'ul' );
						var nextItem = $( item ).children( 'a' );
						$( parent ).mCustomScrollbar( 'scrollTo', nextItem, {
							scrollInertia: 0
						} );
						return false;
					}
				} );
			} );

		$( window ).on( 'resize.wf.dropdown', closeDropdownOnScroll );
		$( window ).on( 'resize.wf.dropdown', function() {
			$( '.selectlist' ).each( function() {
				if ( $( this ).hasClass( 'open' ) ) {
					adjustDropdownMenuWidth( $( this ) );
				}
			} );
		} );

		function showDropdownItemTooltip() {
			/*jshint validthis:true */
			var $selectedElement = $( this );
			$selectedElement.removeAttr( "data-original-title" );
			$selectedElement.removeAttr( "title" );
			var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
			var currentWidth = getCurrentStrWidth( $span.html(), $span );
			if ( currentWidth >= $selectedElement.width() ) {
				$span.addClass( "active" );
				$span.css( "border-bottom-color", "transparent" );
				$selectedElement.attr( "data-original-title", $( $span ).html() );
				$selectedElement.tooltip( "show" );
			} else {
				$selectedElement.tooltip( "hide" );
			}
		}

		function showDropdownBtnTooltip() {
			/*jshint validthis:true */
			var $selectedElement = $( this );
			$selectedElement.removeAttr( "data-original-title" );
			$selectedElement.removeAttr( "title" );
			var $span = $selectedElement.find( '.selected-label' );
			var $trueSpan = $span.find( "span" );
			var valueLen = 0;
			var valuehtml = '';
			for ( var i = 0; i < $trueSpan.length; i++ ) {
				valueLen += $( $trueSpan[ i ] ).width();
				valuehtml = valuehtml.concat( $( $trueSpan[ i ] ).html() );
			}
			var currentWidth = getCurrentStrWidth( valuehtml, $span );
			if ( currentWidth >= $span.width() ) {
				$selectedElement.attr( "data-original-title", valuehtml );
				$selectedElement.tooltip( "show" );
			} else {
				$selectedElement.tooltip( "hide" );
			}
		}

		function getCurrentStrWidth( text, element ) {
			var currentObj = $( '<span>' ).hide().appendTo( document.body );
			if ( element.css( "font" ) !== "" ) {
				$( currentObj ).html( text ).css( "font", element.css( "font" ) );
			} else {
				$( currentObj ).html( text ).css( "font-size", element.css( "font-size" ) );
			}
			var width = currentObj.width();
			currentObj.remove();
			return width;
		}

		function relocateDropdown() {
			/*jshint validthis:true */
			var $dropdown = $( this );
			var ul = $dropdown.find( 'ul' );
			if ( $dropdown.data( 'position' ) === 'fixed' ) {
				ul.css( 'position', 'fixed' );
				ul.css( 'top', $( this ).offset().top + $( this ).parent().height() - $( document ).scrollTop() );
				ul.css( 'left', $( this ).offset().left - $( document ).scrollLeft() );
				ul.width( $( this ).parent().width() );
			}
		}

		function closeDropdownOnScroll() {
			$( '.dropdown-menu' ).each( function() {
				if ( $( this ).css( 'display' ) === 'block' ) {
					if ( $( this ).closest( '.selectlist' ).data( 'position' ) === 'fixed' ) {
						$( this ).parent().find( 'button.dropdown-toggle' ).trigger( 'click' );
					}
				}
			} );
		}

		function adjustDropdownMenuWidth( $select ) {
			var offset = $select.offset().left;
			var $dropDownMecu = $select.find( '> .dropdown-menu' );
			$dropDownMecu.css( 'width', 'auto' );
			var dropdownWidth = $dropDownMecu.width();
			var windowWidth = $( window ).width();
			if ( offset + dropdownWidth > windowWidth ) {
				$dropDownMecu.width( windowWidth - offset - 20 );
			}
		}

		function selectDropdownItem() {
			/*jshint validthis:true */
			var $selectlist = $( this ).closest( '.selectlist' );
			var val = $( this ).closest( 'li' ).data( 'value' );
			$selectlist.selectlist( 'selectByValue', val );
		}

		// LIST GROUP KEYBOARD ACCESSIBILITY
		// =================================
		$( document ).on( 'keydown.wf.dropdown.keyboard', '.dropdown-menu', $.wfKBCore.commonKeyboardHandler );

	} )( $ );


	//tables.js
	( function( $ ) {

		$( document ).ready( function() {
			$( ".n-table-hover, .n-table-cell-hover" ).mousedown( function( e ) {
				if ( e.shiftKey ) {
					// For non-IE browsers
					e.preventDefault();
					// For IE
					if ( typeof $.browser !== "undefined" && $.browser.msie ) {
						this.onselectstart = function() {
							return false;
						};
						var selectionEvent = this;
						window.setTimeout( function() {
							selectionEvent.onselectstart = null;
						}, 0 );
					}
				}
			} );

			initTableScrollbar();

			//Cell selection
			$( '.n-table-cell-hover' ).on( 'click', 'td', function() {
				$( this ).closest( 'table' ).find( 'td' ).removeClass( 'n-cell-selected' );
				$( this ).closest( 'table' ).find( 'td' ).not( '.n-drillDown-item' ).removeAttr( 'tabindex' );
				// Do not add selected class to td in tfoot.
				if ( $( this ).closest( 'tfoot' ).length <= 0 ) {
					$( this ).addClass( 'n-cell-selected' );
					$( this ).attr( 'tabindex', 0 );
					if ( !$( this ).closest( 'table' ).hasClass( 'n-drilldown-table' ) ) {
						$( this ).trigger( 'focus' );
					}

					// Cell with input field
					$( this ).children().each( function() {
						if ( $( this ).is( 'input' ) && $( this ).attr( 'type' ) === 'text' ) {
							$( this ).trigger( 'focus' );
						} else if ( $( this ).find( 'input' ) ) {
							if ( $( this ).find( 'input' ).attr( 'type' ) === 'text' && !$( this ).closest( 'table' ).hasClass( 'n-drilldown-table' ) ) {
								$( this ).find( 'input' ).trigger( 'focus' );
							}
						}
					} );
				}
			} );

			//Row selection
			var selectionPivot;
			$( '.n-table-hover' ).on( 'click', 'td', function( e ) {
				var trElements = $( this ).closest( 'table' ).find( 'tr' );
				var ctrlKeyPressed = ( window.event && window.event.ctrlKey ) || e.ctrlKey;
				var shiftKeyPressed = ( window.event && window.event.shiftKey ) || e.shiftKey;

				var isHighLighted = $( this ).closest( "tr" ).children( "td" ).hasClass( "n-cell-selected" );

				if ( $( this ).closest( 'tfoot' ).length <= 0 ) {
					$( this ).closest( "tr" ).children( "td" ).removeClass( "n-cell-selected" );
					$( this ).closest( 'table' ).not( '.n-drilldown-table' ).find( 'td' ).removeAttr( 'tabindex' );

					if ( !ctrlKeyPressed && !shiftKeyPressed ) {
						selectionPivot = $( this ).closest( "tr" );
						$( this ).closest( 'table' ).find( 'td' ).removeClass( 'n-cell-selected' );
						$( this ).closest( "tr" ).children( "td" ).addClass( "n-cell-selected" );
					} else if ( ctrlKeyPressed && !shiftKeyPressed ) {
						selectionPivot = $( this ).closest( "tr" );
						if ( !isHighLighted ) {
							$( this ).closest( "tr" ).children( "td" ).addClass( "n-cell-selected" );
						}
					} else {
						if ( !ctrlKeyPressed ) {
							$( this ).closest( 'table' ).find( 'td' ).removeClass( 'n-cell-selected' );
						}
						if ( typeof selectionPivot === "undefined" || ( $( selectionPivot ).closest( "table" ).get( 0 ) !== $( this ).closest( "table" ).get( 0 ) ) ) {
							selectionPivot = $( this ).closest( "tr" );
							$( this ).closest( "tr" ).children( "td" ).addClass( "n-cell-selected" );
							return;
						}
						var bot = Math.min( selectionPivot[ 0 ].rowIndex, $( this ).closest( "tr" )[ 0 ].rowIndex );
						var top = Math.max( selectionPivot[ 0 ].rowIndex, $( this ).closest( "tr" )[ 0 ].rowIndex );
						for ( var i = bot; i <= top; i++ ) {
							$( trElements[ i ] ).children( "td" ).addClass( "n-cell-selected" );
						}
					}

					$( this ).attr( 'tabindex', 0 );
					if ( !$( this ).closest( 'table' ).hasClass( 'n-drilldown-table' ) ) {
						$( this ).trigger( 'focus' );
					}
					// Cell with input field
					$( this ).children().each( function() {
						if ( $( this ).is( 'input' ) && $( this ).attr( 'type' ) === 'text' ) {
							$( this ).trigger( 'focus' );
						}
					} );
				}
			} );

			$( '.n-sortable' ).on( 'click', function() {
				$( this ).find( '> span' ).each( function() {
					if ( $( this ).hasClass( 'icon-arrow' ) ) {
						$( this ).removeClass( 'icon-arrow' );
						$( this ).addClass( "icon-arrow-up" );
					} else if ( $( this ).hasClass( 'icon-arrow-up' ) ) {
						$( this ).removeClass( 'icon-arrow-up' );
						$( this ).addClass( "icon-arrow" );
					}
				} );
			} );

			$( '.n-table-scrollbar' ).on( 'hidden.bs.dropdown', '.selectlist', function() {
				synchronizeTableColumnWidth();
			} );
		} );

		$( window ).resize( function() {
			updateScrollTableWidth();
			synchronizeTableColumnWidth();
		} );

		function initTableScrollbar() {
			adjustScrollTable();
			hideInvisibleHead();
			setTimeout( synchronizeTableColumnWidth, 0 );
		}

		//insert and update some html code for every scroll table
		function adjustScrollTable() {
			$( ".n-table-scrollbar" ).each( function() {
				var colspanTotal = $( this ).closest( "table.n-table" ).find( "thead" ).eq( 0 ).find( "th" ).length;
				var theader = $( this ).closest( "table.n-table" ).find( "thead" ).eq( 0 ).html();
				var theaderReplace = theader.replace( /id="[a-zA-Z\-_0-9]*"/g, "" ); //WULF-1845, remove id definition in the theader part.
				var scrollTablePrefx = "<tr><th colspan='" + colspanTotal + "' style='padding: 0; border:none; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px;'><table class='n-table-scrollbar'>" + theaderReplace;
				var scrollTableSuffix = "</table></th></tr>";
				var scrollTableHtml = $( this ).html();

				$( this ).html( scrollTablePrefx + scrollTableHtml + scrollTableSuffix );
				$( this ).removeClass( "n-table-scrollbar" );

				var scrollBody = $( this ).find( '.n-table-scrollbar' );
				var option = {};
				if ( $( this ).hasClass( 'scrollbar-not-autoupdate' ) ) {
					option = {
						notAutoUpdate: true
					};
				}
				packageScrollTable( scrollBody, option );
			} );
		}

		function packageScrollTable( scrollBody, option ) {
			scrollBody.nScrollbar( option );

			var tableWidth = scrollBody.closest( "table.n-table" ).width();
			var container = scrollBody.find( ".mCSB_container" );
			var containerPrefix = "<table style='width: " + tableWidth + "px;'>";
			var containerSuffix = "</table>";
			container.html( containerPrefix + container.html() + containerSuffix );

			/** Temproary solution -- Remove the border-radius for mCustomScrollBox because of IE' bug.
			 *
			 * Refer to: https://connect.microsoft.com/IE/feedback/details/809779/ie9-ie10-position-fixed-child-disappears-when-inside-a-parent-with-position-border-radius-and-overflow-hidden
			 * Refer to: http://stackoverflow.com/questions/20213286/ie10-border-radius-overflow-position-and-hidden-positionfixed-child
			 * **/
			var ua = navigator.userAgent;
			var M = ua.match( /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i ) || [];
			if ( /trident/i.test( M[ 1 ] ) ) {
				scrollBody.find( '.mCustomScrollBox' ).css( 'border-radius', '0' );
			}
		}

		function updateScrollTableWidth() {
			$( ".n-table-scrollbar" ).each( function() {
				var tableWidth = $( this ).closest( "table.n-table" ).width();
				var table = $( this ).find( ".mCSB_container table" );

				$( this ).find( ".mCSB_container table" ).each( function() {
					if ( !$( this ).hasClass( 'datepicker-calendar-days' ) ) {
						$( this ).width( tableWidth );
					}
				} );
			} );
		}

		function hideInvisibleHead() {
			$( ".n-table-scrollbar" ).each( function() {
				var theadRowCount = $( this ).closest( "table.n-table" ).find( "thead" ).children().length;
				// Hide the thead in scroll content
				for ( var j = 0; j < theadRowCount; j++ ) {
					/*jshint loopfunc: true */
					$( this ).closest( "table.n-table" ).find( ".mCSB_container" ).find( 'tr' ).eq( j ).find( 'th' ).each( function() {
						$( this ).css( 'visibility', 'hidden' ).css( 'height', '0' ).css( 'line-height', '0' ).css( 'border-bottom', '0' );
						$( this ).find( 'span' ).css( 'display', 'none' );
						// For filter header in scroll content.
						$( this ).find( 'div' ).css( 'visibility', 'hidden' ).css( 'height', '0' )
							.css( 'padding-top', '0' ).css( 'padding-bottom', '0' ).css( 'margin-top', '0' ).css( 'margin-bottom', '0' )
							.css( 'border-top', '0' ).css( 'border-bottom', '0' );
						$( this ).find( 'input' ).css( 'visibility', 'hidden' ).css( 'height', '0' )
							.css( 'padding-top', '0' ).css( 'padding-bottom', '0' ).css( 'margin', '0' ).css( 'margin-bottom', '0' )
							.css( 'border-top', '0' ).css( 'border-bottom', '0' );
						$( this ).find( 'button' ).css( 'visibility', 'hidden' ).css( 'height', '0' )
							.css( 'padding-top', '0' ).css( 'padding-bottom', '0' ).css( 'margin', '0' ).css( 'margin-bottom', '0' )
							.css( 'border-top', '0' ).css( 'border-bottom', '0' );
					} );
				}
			} );
		}

		function synchronizeTableColumnWidth() {
			$( ".n-table-scrollbar" ).each( function() {
				var tableWidth = $( this ).closest( "table.n-table" ).width();
				// reset the widht of thead to fit tbody
				var theadCols = $( this ).closest( "table.n-table" ).find( "thead" ).eq( 0 ).find( "th" );
				var tbodyCols = $( this ).find( "tr" ).eq( 0 ).children();
				var sumColWidth = 0;
				var targetWidths = [];
				var i;
				for ( i = 0; i < tbodyCols.length; i++ ) {
					sumColWidth += parseFloat( $( tbodyCols[ i ] ).outerWidth() );
					var targetWidth = parseFloat( $( tbodyCols[ i ] ).width() );
					if ( i === tbodyCols.length - 1 && sumColWidth !== tableWidth ) {
						targetWidth = targetWidth + ( tableWidth - sumColWidth );
					}
					targetWidths.push( targetWidth );
				}
				for ( i = 0; i < tbodyCols.length; i++ ) {
					$( theadCols[ i ] ).width( targetWidths[ i ] );
					$( tbodyCols[ i ] ).width( targetWidths[ i ] );
				}
			} );
		}


		// TABLE KEYBOARD ACCESSIBILITY
		// ============================
		$( document ).on( 'keydown.wf.table.keyboard', '.n-table:not(.n-keyboard-off) tbody', $.wfKBTable.tableKeyboardHandler );

	} )( $ );


	//scrollbar.js
	( function( $ ) {

		var createE = function() {
			var e = jQuery( document.createElement( arguments[ 0 ] ) );

			if ( arguments.length > 1 ) {
				var args = Array.prototype.slice.call( arguments, 0 );
				args.shift();

				if ( typeof args[ 0 ] === 'string' ) {
					e.addClass( args.shift() );
				}

				for ( var i = 0; i < args.length; i++ ) {
					if ( args[ i ] ) {
						//if (!args[i].jquery && typeof args[i].length !== "undefined") {
						//    args[i].forEach(function (_e) {
						//        e.append(_e);
						//    });
						//}
						//else {
						//    e.append(args[i]);
						//}
						e.append( args[ i ] );
					}
				}
			}

			return e;
		};

		var fonts_done = false;
		var font_ready_listeners = [];

		var Scrollbar = function( $container, axis ) {
			this.$container = $container;
			this.$content_container = $container.find( '.scrolling-content-container' );
			this.$content = $container.find( '.scrolling-content' );

			// Create the track and thumb
			this.$scrollbar = createE( 'div', 'scrollbar-container ' + axis,
				createE( 'div', 'track', createE( 'div' ) ),
				createE( 'div', 'thumb' )
			).appendTo( $container );
			this.$track = this.$scrollbar.find( '.track' );
			this.$thumb = this.$scrollbar.find( '.thumb' );
			this.$document = $( document );

			this.axis = this.axes[ axis ];

			this.content_offset = 0;
			this.max_content_offset = 0;
			this.max_thumb_offset = 0;
			this.thumb_size = ( this.container_size() / this.content_size() ) * this.container_size();
			this.$thumb.css( this.axis.track_size_property, this.thumb_size );
			//this.thumb_size = this.$thumb[this.axis.track_size_property]();
			this.drag_position = {
				thumb_start: null,
				mouse_start: null
			};

			this._drag_start = this.drag_start.bind( this );
			this._drag_move = this.drag_move.bind( this );
			this._drag_end = this.drag_end.bind( this );

			// Scroll when the thumb is dragged
			this.$thumb
				.bind( 'mousedown', this._drag_start )
				.bind( 'touchstart', this._drag_start );

			// Jump scroll position when the track is clicked
			this.$track
				.click( this.jump_to.bind( this ) );

			// Respond to mousewheel events
			this._mousewheel = this.mousewheel.bind( this );

			var container_elm = this.$container.get( 0 );

			if ( container_elm.addEventListener ) {
				container_elm.addEventListener( 'DOMMouseScroll', this._mousewheel, false );
				container_elm.addEventListener( 'mousewheel', this._mousewheel, false );
			} else {
				container_elm.onmousewheel = this._mousewheel;
			}

			// We set up the sizes twice. Once when fonts may not be ready and once after
			// to avoid a flash of the scollable content outside it's scrolling container
			this.size_changed();

			// Watch for changes in content size
			this.$content.bind( 'resize', this.size_changed.bind( this ) );
			// Watch for changes in container size
			this.$container.bind( 'resize', this.size_changed.bind( this ) );
		};

		Scrollbar.prototype = {
			// Functionality for a scrollbar is pretty much the same
			// whether it's vertical or horizontal but the way we
			// get some properties is different.
			axes: {
				'horizontal': {
					name: 'horizontal',
					dimension: 'x',
					container_size: function() {
						return this.$container.innerWidth();
					},
					content_container_size: function() {
						return this.$container.width();
					},
					content_size: function() {
						return this.$content.outerWidth();
					},
					track_margin: function() {
						return ( parseInt( this.$scrollbar.css( 'margin-left' ) ) || 0 ) +
							( parseInt( this.$scrollbar.css( 'margin-right' ) ) || 0 );
					},
					track_size_property: 'width',
					position_property: 'left',
					page_position: 'pageX',
					wheel_delta: 'wheelDeltaX'
				},
				'vertical': {
					name: 'vertical',
					dimension: 'y',
					container_size: function() {
						return this.$container.innerHeight();
					},
					content_container_size: function() {
						return this.$container.height();
					},
					content_size: function() {
						return this.$content_container.get( 0 ).scrollHeight;
					},
					track_margin: function() {
						return ( parseInt( this.$scrollbar.css( 'margin-top' ) ) || 0 ) +
							( parseInt( this.$scrollbar.css( 'margin-bottom' ) ) || 0 );
					},
					track_size_property: 'height',
					position_property: 'top',
					page_position: 'pageY',
					wheel_delta: 'wheelDeltaY'
				}
			},

			animation_duration: 250,

			container_size: function() {
				return this.axis.container_size.call( this );
			},

			content_container_size: function() {
				return this.axis.content_container_size.call( this );
			},

			content_size: function() {
				return this.axis.content_size.call( this );
			},

			track_margin: function() {
				return this.axis.track_margin.call( this );
			},

			size_changed: function() {
				if ( this.$container.is( ':visible' ) ) {
					this.$content_container.css( {
						width: this.$container.width(),
						height: this.$container.height()
					} );
				}

				var container_size = this.container_size();
				var content_container_size = this.content_container_size();
				var content_size = this.content_size();
				var track_margin = this.track_margin();

				if ( !container_size || !content_size || !content_container_size ) {
					return;
				}

				if ( content_size <= content_container_size ) {
					this.$container.removeClass( 'scrollbars-' + this.axis.name + '-visible' );
					this.set_position( 0 );
				} else {
					this.$container.addClass( 'scrollbars-' + this.axis.name + '-visible' );
					this.$scrollbar.css( this.axis.track_size_property, container_size - track_margin + 'px' );
					this.max_content_offset = -1 * ( content_size - content_container_size );
					this.max_thumb_offset = container_size - this.thumb_size - track_margin;

					// If we're scrolled and the size changes we need to change our offset
					if ( this.content_offset < this.max_content_offset ) {
						this.set_position( this.max_content_offset );
					}
				}

				this.onsizechange();
			},

			onsizechange: function() {

			},

			set_position: function( new_offset, animated ) {
				new_offset = parseInt( new_offset );

				if ( this.content_offset === new_offset ) {
					return;
				}

				this.content_offset = parseInt( Math.max( this.max_content_offset, Math.min( new_offset, 0 ) ) );
				var ratio = this.content_offset / this.max_content_offset;

				if ( animated ) {
					var options = {};
					options[ this.axis.position_property ] = this.content_offset;
					this.$content.animate( options, 250 );

					options = {};
					options[ this.axis.position_property ] = parseInt( this.max_thumb_offset * ratio );
					this.$thumb.animate( options, 250 );
				} else {
					this.$content.css( this.axis.position_property, this.content_offset );
					this.$thumb.css( this.axis.position_property, parseInt( this.max_thumb_offset * ratio ) );
				}

				this.onpositionchange( this.content_offset, animated );
				this.$container.trigger( 'scroll-position-changed' );
				$( document ).trigger( 'nsnscroll', this.$container.get( 0 ) );
			},

			// A hook for scroll changes
			onpositionchange: function( content_offset, animated ) {},

			drag_start: function( e ) {
				e.preventDefault();
				e.stopPropagation();

				if ( !this.$scrollbar.is( ':visible' ) ) {
					return;
				}

				this.drag_position.mouse_start = e[ this.axis.page_position ];
				this.drag_position.thumb_start = parseInt( this.$thumb.css( this.axis.position_property ) );

				this.$document.bind( 'mousemove', this._drag_move );
				this.$document.bind( 'mouseup', this._drag_end );
				this.$document.bind( 'touchmove', this._drag_move );
				this.$document.bind( 'touchend', this._drag_end );

				this.$container.trigger( 'scroll-start' );
			},

			drag_move: function( e ) {
				e.preventDefault();
				e.stopPropagation();
				var thumb_offset = this.drag_position.thumb_start + ( e[ this.axis.page_position ] - this.drag_position.mouse_start );
				var new_content_offset = Math.min( this.max_thumb_offset, thumb_offset ) / this.max_thumb_offset * this.max_content_offset;
				this.set_position( new_content_offset );

				this.$container.trigger( 'scroll-move' );
			},

			drag_end: function( e ) {
				this.$document.unbind( 'mousemove', this._drag_move );
				this.$document.unbind( 'mouseup', this._drag_end );
				this.$document.unbind( 'touchmove', this._drag_move );
				this.$document.unbind( 'touchend', this._drag_end );

				this.drag_position.thumb_start = null;
				this.drag_position.mouse_start = null;

				this.$container.trigger( 'scroll-end' );
			},

			jump_to: function( e ) {
				var thumb_offset = e[ this.axis.page_position ] - this.$track.offset()[ this.axis.position_property ] - this.thumb_size / 2;
				var new_content_offset = parseInt( Math.min( this.max_thumb_offset, thumb_offset ) / this.max_thumb_offset * this.max_content_offset );
				this.set_position( new_content_offset );
			},

			smooth_to: function( pos ) {
				var new_offset = Math.min( Math.max( pos, this.max_content_offset ), 0 );
				this.set_position( pos, true );
			},

			mousewheel: function( event ) {
				if ( !this.$scrollbar.is( ':visible' ) ) {
					return;
				}

				var delta = 0,
					e = event || window.event;

				if ( typeof e.wheelDeltaX === 'undefined' && typeof e.wheelDelta !== "undefined" ) {
					e.wheelDeltaX = e.wheelDeltaY = e.wheelDelta;
				}

				if ( typeof e.wheelDelta !== "undefined" ) {
					delta = e[ this.axis.wheel_delta ] / 120;
				} else if ( e.detail ) {
					delta = -e.detail / 3;
				}

				this.set_position( this.content_offset + delta * 40 );

				e = $.event.fix( e );
				e.preventDefault();

				this.$container.trigger( 'scroll-move' );
			}
		};

		var old = $.fn.scrollbars;

		function Plugin() {
			return $( this ).each( function() {
				var $container = $( this );

				var options = {
					horizontal: $container.is( '.horizontal' ),
					vertical: $container.is( '.vertical' )
				};

				$container.wrapInner( createE( 'div', 'scrolling-content-container', createE( 'div', 'scrolling-content' ) ) );
				var scrollbars = [];

				[ 'horizontal', 'vertical' ].forEach( function( axis ) {
					if ( options[ axis ] && typeof $container.data( 'scrollbar-' + axis ) === "undefined" ) {
						var scrollbar = new Scrollbar( $container, axis );
						scrollbars.push( scrollbar );
						$container.data( 'scrollbar-' + axis, scrollbar );
					}
				} );
			} );
		}

		$.fn.scrollbars = Plugin;
		$.fn.scrollbars.Constructor = Scrollbar;

		$.fn.scrollbars.noConflict = function() {
			$.fn.scrollbars = old;
			return this;
		};

		$( document ).ready( function() {
			//$('.scrollbars').scrollbars();
		} );

	} )( $ );


	//flyout.js
	( function( $ ) {

		// FLYOUT PUBLIC CLASS DEFINITION
		// ======================

		$.fn.nFlyout = function Plugin() {
			return new Flyout( this );
		};

		var Flyout = function( element ) {
			var $flyout = $( element );
			if ( $flyout.data( 'initialized' ) !== true ) {
				var $container = $flyout.find( ".n-flyout-container" );
				var contaierWidth = $container.outerWidth();
				var containerHeight = $container.outerHeight();
				var direction = $flyout.data( 'direction' );

				if ( !direction ) {
					direction = "right";
					$flyout.data( 'direction', "right" );
				}

				switch ( direction ) {
					case 'top':
						$flyout.css( "bottom", ( -containerHeight ) + "px" );
						break;
					case 'bottom':
						$flyout.css( "top", ( -containerHeight ) + "px" );
						break;
					case 'left':
						$flyout.css( "right", ( -contaierWidth ) + "px" );
						break;
					case 'right':
						$flyout.css( "left", ( -contaierWidth ) + "px" );
						var $openAnchor = $flyout.find( ".n-flyout-open" );
						var openHeight = $openAnchor.outerHeight();
						$openAnchor.css( "left", ( contaierWidth + 1 ) + "px" );
						$openAnchor.css( "top", Math.ceil( ( containerHeight - openHeight ) / 2 ) + "px" );
						break;
				}

				// Generate the scroll content (if there is) before container hide.
				$( '.scrollbars' ).scrollbars();
				$container.hide();
				$flyout.on( 'keydown', '*:focus', function( event ) {
					if ( event.keyCode === 27 ) {
						var $flyout = $( this ).parents( '.n-flyout' );
						var direction = $flyout.data( 'direction' );
						hideFlyout( $flyout, direction );
					}
				} );

				$flyout.data( 'initialized', true );
			}
		};

		$( function() {
			$( 'body' ).click( function( e ) {

				$( ".n-flyout" ).each( function() {
					var $flyout = $( this );
					var $closestFlyout = $( e.target ).closest( '.n-flyout' );

					if ( $closestFlyout === 0 || $flyout[ 0 ] !== $closestFlyout[ 0 ] ) {
						var container = $flyout.find( '.n-flyout-container' );
						if ( container.is( ':visible' ) ) {
							var direction = $flyout.data( 'direction' );
							hideFlyout( $flyout, direction );
						}
					}
				} );
			} );

			$( ".n-flyout" ).each( function() {
				$( this ).nFlyout();
			} );

			$( '.n-flyout-activity-area-tabs' ).on( 'keydown', '*:focus', function( event ) {
				if ( event.keyCode === 27 ) {
					var $flyout = $( '.n-flyout' );
					var direction = $flyout.data( 'direction' );
					hideFlyout( $flyout, direction );
				}
			} );
		} );

		$( document ).on( 'click.wf.flyout', '.n-flyout .n-flyout-menu li', function() {
			$( 'li' ).removeClass( 'selected' );
			$( this ).toggleClass( 'selected' );
		} );
		$( document ).on( 'click.wf.flyout', '.n-flyout .n-flyout-open', HandleFlyoutOpen )
			.on( 'keydown.wf.flyout.keyboard', '.n-flyout-menu', $.wfKBCore.commonKeyboardHandler );

		function HandleFlyoutOpen( event ) {
			var $clickTarget = $( event.target );
			var $openAnchor = $( this );
			var $flyout = $openAnchor.parent();
			var $container = $flyout.find( '.n-flyout-container' );
			var direction = $flyout.data( 'direction' );

			if ( $openAnchor.hasClass( 'n-drawer-tabs' ) ) {
				if ( $container.is( ':visible' ) ) {
					if ( $clickTarget.closest( 'li' ).hasClass( 'tab-selected' ) ) {
						hideFlyout( $flyout, direction );
					}
				} else {
					showFlyout( $flyout, direction );
				}
			} else if ( $openAnchor.hasClass( 'n-flyout-activity-area-tabs' ) ) {
				if ( $container.is( ':visible' ) ) {
					if ( $clickTarget.closest( 'li' ).hasClass( 'selected' ) ) {
						hideFlyout( $flyout, direction );
					}
				} else {
					showFlyout( $flyout, direction );
				}
			} else {
				if ( $container.is( ':visible' ) ) {
					hideFlyout( $flyout, direction );
				} else {
					showFlyout( $flyout, direction );
				}
			}
		}

		function hideFlyout( $flyout, direction ) {
			var $container = $flyout.find( '.n-flyout-container' );
			var menuHeight = $container.outerHeight();
			var menuWidth = $container.outerWidth();
			switch ( direction ) {
				case 'top':
					$container.parent( ".n-flyout" ).animate( {
						bottom: -menuHeight
					}, 400, function() {
						$container.hide();
					} );
					break;
				case 'bottom':
					$container.parent( ".n-flyout" ).animate( {
						top: -menuHeight
					}, 400, function() {
						$container.hide();
					} );
					break;
				case 'left':
					$container.parent( ".n-flyout" ).animate( {
						right: -menuWidth
					}, 400, function() {
						$container.hide();
					} );
					break;
				case 'right':
					$container.parent( ".n-flyout" ).animate( {
						left: -menuWidth
					}, 400, function() {
						$container.hide();
					} );
					break;
			}
			$flyout.attr( 'data-expand', 'false' );

			if ( $flyout.hasClass( 'n-drawer' ) ) {
				$flyout.find( '.drawer-toggle-down' ).removeClass( 'drawer-toggle-down' ).addClass( 'drawer-toggle-up' );
				$flyout.find( '.drawer-shadow' ).fadeOut( 400 );
			}
		}

		function showFlyout( $flyout, direction ) {
			var $container = $flyout.find( '.n-flyout-container' );
			if ( !$container.hasClass( 'n-flyout-activity-area' ) ) {
				$container.show();
			}

			switch ( direction ) {
				case 'top':
					$container.parent( ".n-flyout" ).animate( {
						bottom: 0
					}, 400 );
					break;
				case 'bottom':
					$container.parent( ".n-flyout" ).animate( {
						top: 0
					}, 400 );
					break;
				case 'left':
					$container.parent( ".n-flyout" ).animate( {
						right: 0
					}, 400 );
					break;
				case 'right':
					$container.parent( ".n-flyout" ).animate( {
						left: 0
					}, 400 );
					break;
			}
			$flyout.attr( 'data-expand', 'true' );

			if ( $flyout.hasClass( 'n-taskpad' ) ) {
				$container.find( ".n-search-input" ).focus();
			} else if ( $flyout.hasClass( 'n-drawer' ) ) {
				$flyout.find( '.drawer-toggle-up' ).removeClass( 'drawer-toggle-up' ).addClass( 'drawer-toggle-down' );
				$flyout.find( '.drawer-shadow' ).fadeIn( 400 );
			} else if ( $flyout.find( '.n-flyout-activity-area .n-flyout-foot' ).length > 0 ) {
				setTimeout( function() {
					$container.find( ".form-control" ).focus();
				}, 50 );
			} else {
				$container.find( "a:first" ).focus();
				//clear all selected status.
				$container.find( "li" ).removeClass( 'selected' );
			}
		}

	} )( $ );


	//inputfield.js
	( function( $ ) {

		// INPUTFIELD PUBLIC CLASS DEFINITION
		// ======================
		var InputField = function( element, options ) {};

		InputField.VERSION = '1.1.0';

		InputField.prototype.constructor = InputField;

		InputField.prototype.clearContent = function() {
			var prev = $( this ).prev();
			if ( prev.hasClass( "n-inputfield" ) ) {
				if ( !prev.hasClass( "n-search-input" ) ) {
					$( this ).hide();
				}
				prev.val( "" );
				prev.attr( "placeholder", "" );
				prev.focus();
			}
		};

		// INPUTFIELD INTERNAL METHODS
		// ========================
		function detectMandatory( event ) {
			var inputValue = event.target.value;
			var mandatoryElement = $( event.target ).next( ".form-control-feedback" ).find( ".icon" );

			if ( inputValue.length > 0 ) {
				mandatoryElement.removeClass( "icon-mandatory" );
			} else {
				mandatoryElement.addClass( "icon-mandatory" );
			}
		}

		function showClearIcon( event ) {
			var inputValue = event.target.value;
			var controlIcon = $( event.target ).next( '.n-inputfield-control-icon' );
			if ( inputValue.length > 0 ) {
				controlIcon.show();
			} else {
				controlIcon.hide();
			}
		}

		function bindOnblurForClearableInputField() {
			$( '.n-inputfield-clearable input' ).each( function() {
				var placeholderText = $( this ).attr( "placeholder" );
				$( this ).on( 'blur', function() {
					$( this ).attr( 'placeholder', placeholderText );
				} );
			} );
		}

		function handleForgetPwd( event ) {
			$( event.target ).removeClass( "n-link-visited" ).addClass( "n-link-visited" );
		}

		function handleLoginbutton( event ) {
			var isEmpty = false;
			$( event.target ).closest( '.n-login-textfields' ).find( '.n-inputfield' ).each( function() {
				if ( !$( this ).val() ) {
					isEmpty = true;
					return false;
				}
			} );
			var $login = $( event.target ).closest( '.n-login' ).find( '.n-login-action button' );
			if ( isEmpty ) {
				$login.prop( 'disabled', true );
			} else {
				$login.prop( 'disabled', false );
			}
		}

		// INPUTFIELD PLUGIN DEFINITION
		// =========================

		function Plugin( option ) {
			return this.each( function() {
				var $this = $( this );
				var data = $this.data( 'wf.inputfield' );
				var options = typeof option === 'object' && option;

				if ( !data && /destroy|hide/.test( option ) ) {
					return;
				}
				if ( !data ) {
					$this.data( 'wf.inputfield', ( data = new InputField( this, options ) ) );
				}
				if ( typeof option === 'string' ) {
					data[ option ]();
				}
			} );
		}

		var old = $.fn.nInputField;

		$.fn.nInputField = Plugin;
		$.fn.nInputField.Constructor = InputField;


		// INPUTFIELD NO CONFLICT
		// ===================

		$.fn.nInputField.noConflict = function() {
			$.fn.nInputField = old;
			return this;
		};

		$( document )
			.on( 'keyup.wf.forms', '.input-required input', detectMandatory )
			.on( 'keyup.wf.forms', '.n-inputfield-clearable input', showClearIcon )
			.on( 'click.wf.forms', '.n-inputfield-clearable .n-inputfield-control-icon', InputField.prototype.clearContent )
			.on( 'click.wf.forms', '.n-login-forget-password > a', handleForgetPwd )
			.on( 'keyup.wf.forms change.wulf.forms', '.n-login .n-inputfield', handleLoginbutton )
			.on( 'keydown.wf.forms.keyboard', '[class$="-clearable"] a', $.wfKBCore.commonKeyboardHandler );

		$( document ).ready( function() {
			bindOnblurForClearableInputField();
		} );

	} )( $ );


	//spinner.js
	( function( $ ) {

		// SPINNER EYBOARD ACCESSIBILITY METHODS DEFINITION
		// ================================================
		var SPACE_BAR_KEY = 32;
		var UP_KEY = 38;
		var DOWN_KEY = 40;

		function spinnerKeyboardHandler( e ) {
			var supportKeys = [ SPACE_BAR_KEY, UP_KEY, DOWN_KEY ];
			var key = e.keyCode;

			if ( supportKeys.indexOf( key ) === -1 ) {
				return;
			}

			if ( key === SPACE_BAR_KEY ) {
				$( e.target ).trigger( 'mousedown' );
				$( e.target ).trigger( 'mouseup' );
			} else {
				e.preventDefault();
				e.stopPropagation();
			}
		}

		$( document )
			.on( 'keydown.wf.spinner.keyboard', '.spinbox .spinbox-up', spinnerKeyboardHandler )
			.on( 'keydown.wf.spinner.keyboard', '.spinbox .spinbox-down', spinnerKeyboardHandler );

	} )( $ );


	//balloon.js
	( function( $ ) {

		// BALLOON PUBLIC CLASS DEFINITION
		// ======================
		var Balloon = function( element, options ) {
			this.element = element;

			// Build content for balloon with close icon
			if ( $( element ).hasClass( 'balloon-icon' ) ) {
				options = $.extend( {}, options, {
					html: true,
					content: function() {
						return $( $( element ).data( 'target-selector' ) ).html();
					}
				} );
			}

			// For hover balloon
			if ( $( element ).hasClass( 'n-hover-balloon' ) ) {
				options = $.extend( {}, options, {
					trigger: 'click hover'
				} );
			}

			// Init balloon component
			this.init( 'balloon', element, options );

			// Bind close icon event
			$( element ).on( 'shown.bs.balloon', function() {
				var $popover = $( this );
				$popover.parent().find( '.n-close' ).on( 'click', function() {
					$popover.data( 'bs.balloon' ).hide();
				} );
			} );
		};

		if ( !$.fn.popover ) {
			throw new Error( 'Balloon requires Bootstrap popover.js' );
		}

		Balloon.VERSION = '1.1.0';

		// NOTE: BALLOON EXTENDS popover.js
		// ================================
		Balloon.prototype = $.extend( {}, $.fn.popover.Constructor.prototype );

		Balloon.prototype.constructor = Balloon;

		// Extends popover.toggle method
		( function( toggle ) {
			Balloon.prototype.toggle = function() {
				// call original method
				toggle.call( this );

				// add extended logic -- close other opened balloon
				var element = this.element;
				$( '[data-toggle^="balloon"]' ).each( function( idx, el ) {
					if ( element !== el ) {
						$( this ).data( 'bs.balloon' ).hide();
					}
					$( this ).parent().tooltip( 'hide' );
				} );

			};
		}( $.fn.popover.Constructor.prototype.toggle ) );

		Balloon.prototype.fadeout = function() {
			var $balloon = $( this );
			var $tip = $balloon.data( 'bs.balloon' ).tip();
			setTimeout( function() {
				if ( $tip.hasClass( 'in' ) ) {
					$tip.fadeOut( 1000, function() {
						$balloon.data( 'bs.balloon' ).hide();
					} );
				}
			}, 1000 );
		};

		// BALLOON PLUGIN DEFINITION
		// =========================

		function Plugin( option ) {
			return this.each( function() {
				var $this = $( this );
				var data = $this.data( 'bs.balloon' );
				var options = typeof option === 'object' && option;

				if ( !data && /destroy|hide/.test( option ) ) {
					return;
				}
				if ( !data ) {
					$this.data( 'bs.balloon', ( data = new Balloon( this, options ) ) );
				}
				if ( typeof option === 'string' ) {
					data[ option ]();
				}
			} );
		}

		var old = $.fn.nBalloon;

		$.fn.nBalloon = Plugin;
		$.fn.nBalloon.Constructor = Balloon;


		// BALLOON NO CONFLICT
		// ===================

		$.fn.nBalloon.noConflict = function() {
			$.fn.nBalloon = old;
			return this;
		};

		// BALLOON INTERNAL METHODS
		// ========================
		var restore = function() {
			$( '[data-toggle^="balloon"]' ).each( function() {
				var $balloon = $( this ).data( 'bs.balloon' );
				var $tip = $balloon.tip();
				if ( $tip.hasClass( 'in' ) ) {
					$balloon.show();
				}
			} );
		};

		$( document )
			.on( 'shown.bs.balloon', '[data-toggle="balloon"][class~="fadeout"]', Balloon.prototype.fadeout )
			.on( 'keydown.wf.balloon.keyboard', 'a[data-toggle=balloon]', $.wfKBCore.commonKeyboardHandler );

		$( document ).on( 'click.wf.balloon', function( e ) {
			$( '[data-toggle^="balloon"]' ).each( function( index, el ) {
				if ( e.target !== el && !$( e.target ).hasClass( "popover-content" ) ) {
					var popover = $( this ).data( 'bs.balloon' );
					var $tip = popover.tip();
					if ( $tip.hasClass( 'in' ) ) {
						$( this ).triggerHandler( 'click.balloon' );
					}
				}
			} );
		} );

		// TODO:Jonathan, the resize events should be throttled.
		$( window ).on( 'resize', restore );


	} )( $ );


	//buttons.js
	( function( $ ) {

		// BUTTONS INTERNAL METHODS
		// ========================

		var selectTabButton = function() {
			$( this ).siblings( '.selected' ).removeClass( 'selected' );
			$( this ).addClass( 'selected' );
		};

		var handleEnterKeyInToggleButton = function( e ) {
			if ( e.keyCode === 13 ) {
				e.preventDefault();
				$( e.target ).trigger( 'click' );
			}
		};

		$( document )
			.on( 'click.wf.buttons', '.btn-group.n-tab-buttons .btn', selectTabButton )
			.on( 'keydown.wf.buttons.keyboard', '.n-toggle-switch-input', handleEnterKeyInToggleButton );


	} )( $ );


	//calendar.js
	( function( $ ) {

		var classNoRadiusLb = 'n-inputfield-nonradius-lb';

		if ( typeof $.fn.datepicker !== "function" ) {
			return;
		}

		$( document )
			.on( 'shown.bs.dropdown hidden.bs.dropdown', '.n-calendar', function() {
				$( this ).children( 'input' ).toggleClass( classNoRadiusLb );
			} )
			.on( 'blur.wf.calendar', '.n-calendar input', function() {
				var $input = $( this );
				$input.next().find( ".dropdown-toggle" ).attr( "aria-expanded", "false" );
				if ( $input.hasClass( classNoRadiusLb ) ) {
					$input.removeClass( classNoRadiusLb );
				}
			} )
			//down key will result the focus to the back button
			.on( 'keydown.wf.calendar', '.n-calendar .datepicker-wheels-year', focusToWheelsBack )
			.on( 'keydown.wf.calendar', '.n-calendar .datepicker-wheels-month', focusToWheelsBack )
			//the focus will be switched to the title after clicking on back or select button.
			.on( 'click.wf.calendar', '.datepicker-wheels-footer .datepicker-wheels-back', focusToHeaderTitle )
			.on( 'click.wf.calendar', '.datepicker-wheels-footer .datepicker-wheels-select', focusToHeaderTitle )
			.on( 'shown.bs.dropdown', '.n-calendar .input-group-btn', onDatePickerExpand )
			.on( 'scroll.wf.calendar', closeDatePickerOnScroll )
			.on( 'changed.fu.datepicker', '.datepicker', updateTimer )
			.on( 'click.wf.calendar', '.n-calendar-lock-past button', DisablePastDays )
			.on( 'click.fu.datepicker', '.datepicker-calendar tr td', onDateBoxClicked )
			.on( 'click.wf.calendar', '.n-date-range-end button', DisableDaysBeforeSelected )
			.on( 'hidden.bs.dropdown', '.n-date-range .n-date-range-start', function() {
				focusToSecondCalendar( this );
			} );

		$( window ).on( 'resize.wf.calendar', function() {
			closeDatePickerOnScroll();
			$( '.n-calendar' ).each( function() {
				var input = $( this ).find( 'input' );
				if ( input.data( 'position' ) !== 'fixed' ) {
					relocateDatePicker( $( this ) );
				}
			} );
		} );

		function onDateBoxClicked( e ) {
			var $btn = $( e.currentTarget ).find( 'button' )[ 0 ];
			if ( e.target !== $btn && $( $btn ).closest( 'span' ).css( 'display' ) !== 'none' ) {
				$btn.click();
			}
		}

		function focusToWheelsBack( evt ) {
			if ( evt.which === 40 ) {
				/*jshint validthis:true */
				$( this ).nextAll( '.datepicker-wheels-footer' ).find( '.datepicker-wheels-back' ).focus();
				evt.preventDefault();
				evt.stopPropagation();
			}
		}

		function focusToHeaderTitle( evt ) {
			/*jshint validthis:true */
			$( this ).closest( '.datepicker-calendar-wrapper' ).find( 'button.title' ).focus();
			evt.preventDefault();
			evt.stopPropagation();
		}

		function onDatePickerExpand() {
			/*jshint validthis:true */
			relocateDatePicker( $( this ).closest( '.n-calendar' ) );
		}

		function relocateDatePicker( nCalendar ) {
			var wrap = nCalendar.find( '.datepicker-calendar-wrapper' );
			var wrapExcess = wrap.outerWidth() - nCalendar.width();
			if ( nCalendar.find( 'input' ).data( 'position' ) === 'fixed' ) {
				if ( wrap.length !== 0 ) {
					wrap.css( 'position', 'fixed' );
					wrap.css( 'top', nCalendar.offset().top + nCalendar.height() - $( document ).scrollTop() );
					var leftPos = nCalendar.offset().left - wrap.outerWidth() + nCalendar.width() - $( document ).scrollLeft();
					if ( leftPos < 0 ) { //move to right side if clipped on left side
						leftPos += wrapExcess;
					}
					wrap.css( 'left', leftPos );
					wrap.css( 'right', 'auto' );
				}
			} else {
				//move to right side if clipped on left side
				if ( wrapExcess > nCalendar.offset().left ) {
					wrap.css( 'right', -wrapExcess );
				} else {
					wrap.css( 'right', 0 );
				}
			}
		}

		function closeDatePickerOnScroll() {
			$( '.datepicker-calendar-wrapper' ).each( function() {
				if ( $( this ).css( 'display' ) === 'block' ) {
					var input = $( this ).closest( '.n-calendar' ).find( 'input' );
					if ( input.data( 'position' ) === 'fixed' ) {
						$( this ).parent().find( 'button.dropdown-toggle' ).trigger( 'click' );
					}
				}
			} );
		}

		//Data-API for data-markup=calendar, HTML markup will be generated automatically
		$( function() {
			$( '[data-markup^="calendar"]' ).each( function() {
				if ( $( this ).parent().find( '.datepicker-calendar-wrapper' ).length === 0 ) {
					$( this ).after( '<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>' );
				}
			} );

			$( '[data-markup^="disabled_calendar"]' ).each( function() {
				if ( $( this ).parent().find( '.datepicker-calendar-wrapper' ).length === 0 ) {
					$( this ).after( '<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" disabled>  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>' );
				}
			} );

			$( '[data-markup^="timer_calendar"]' ).each( function() {
				if ( $( this ).parent().find( '.datepicker-calendar-wrapper' ).length === 0 ) {
					$( this ).after( '<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table><div class=\"datepicker-calendar-timer\"><div class=\"spinner-container datepicker-calendar-hour\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-minute\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-AMPM\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input id=\"s-normal\" type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield n-inputfield-uneditable\" readonly><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div><input type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield ampm n-inputfield-uneditable\" readonly></div><div class=\"operator-btn\"><button type=\"button\" class=\"btn btn-small now\">Now</button> <button type=\"button\" class=\"btn btn-defaultBlue btn-small done\">Done</button></div></div></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>' );
				}
			} );

			$( '[data-markup^="disabled_timer_calendar"]' ).each( function() {
				if ( $( this ).parent().find( '.datepicker-calendar-wrapper' ).length === 0 ) {
					$( this ).after( '<div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" disabled>  <span class=\"glyphicon glyphicon-calendar\"></span>  <span class=\"sr-only\">Toggle Calendar</span></button><div class=\"dropdown-menu dropdown-menu-right datepicker-calendar-wrapper\" role=\"menu\">  <div class=\"datepicker-calendar\"><div class=\"datepicker-calendar-header\"><button type=\"button\" class=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span class=\"sr-only\">Previous Month</span></button><button type=\"button\" class=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span><span class=\"sr-only\">Next Month</span></button><button type=\"button\" class=\"title\"><span class=\"month\">  <span data-month=\"0\">January</span>  <span data-month=\"1\">February</span>  <span data-month=\"2\">March</span>  <span data-month=\"3\">April</span>  <span data-month=\"4\">May</span>  <span data-month=\"5\">June</span>  <span data-month=\"6\">July</span>  <span data-month=\"7\">August</span>  <span data-month=\"8\">September</span>  <span data-month=\"9\">October</span>  <span data-month=\"10\">November</span>  <span data-month=\"11\">December</span></span> <span class=\"year\"></span></button></div><table class=\"datepicker-calendar-days\"><thead><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr></thead><tbody></tbody></table><div class=\"datepicker-calendar-timer\"><div class=\"spinner-container datepicker-calendar-hour\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-minute\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input type=\"text\" class=\"form-control spinbox-input n-inputfield\"><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div></div><div class=\"spinner-container datepicker-calendar-AMPM\"><div class=\"spinbox\" data-initialize=\"spinbox\"><input id=\"s-normal\" type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield n-inputfield-uneditable\" readonly><div class=\"spinbox-buttons btn-group btn-group-vertical\"><button type=\"button\" class=\"btn btn-default spinbox-up btn-xs\"><span class=\"icon icon-arrow-up\"></span><span class=\"sr-only\">Increase</span></button><button type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"><span class=\"icon icon-arrow\"></span><span class=\"sr-only\">Decrease</span></button></div></div><input type=\"text\" tabIndex=\"-1\" class=\"form-control spinbox-input n-inputfield ampm n-inputfield-uneditable\" readonly></div><div class=\"operator-btn\"><button type=\"button\" class=\"btn btn-small now\">Now</button> <button type=\"button\" class=\"btn btn-defaultBlue btn-small done\">Done</button></div></div></div><div class=\"datepicker-wheels\" aria-hidden=\"true\"><div class=\"datepicker-wheels-month\"><h2 class=\"header\">Month</h2><ul><li data-month=\"0\"><button type=\"button\">Jan</button></li><li data-month=\"1\"><button type=\"button\">Feb</button></li><li data-month=\"2\"><button type=\"button\">Mar</button></li><li data-month=\"3\"><button type=\"button\">Apr</button></li><li data-month=\"4\"><button type=\"button\">May</button></li><li data-month=\"5\"><button type=\"button\">Jun</button></li><li data-month=\"6\"><button type=\"button\">Jul</button></li><li data-month=\"7\"><button type=\"button\">Aug</button></li><li data-month=\"8\"><button type=\"button\">Sep</button></li><li data-month=\"9\"><button type=\"button\">Oct</button></li><li data-month=\"10\"><button type=\"button\">Nov</button></li><li data-month=\"11\"><button type=\"button\">Dec</button></li></ul></div><div class=\"datepicker-wheels-year\"><h2 class=\"header\">Year</h2><ul></ul></div><div class=\"datepicker-wheels-footer clearfix\"><button type=\"button\" class=\"btn datepicker-wheels-back\"><span class=\"icon icon-left\"></span><span class=\"sr-only\">Return to Calendar</span></button><button type=\"button\" class=\"btn datepicker-wheels-select\">Select <span class=\"sr-only\">Month and Year</span></button></div></div></div></div> </div></div>' );
				}
			} );

			//This is just a workaround method to off the focus event for input field
			//fuelux should provide an option to not to listen it.
			setTimeout( function() {
				$( '.datepicker .n-calendar .form-control' ).off( 'focus.fu.datepicker' );
			}, 25 );

		} );

		$.fn.datepicker.Constructor.prototype.initTimer = function() {
			//set time setting is shown
			this.options.showTime = true;

			//show timer setting panel
			$( this.$element.find( '.datepicker-calendar-timer' ) ).css( 'display', 'block' );

			this.$input.off( 'blur.fu.datepicker' );
			this.$input = this.$element.find( 'input:first' );
			this.$input.on( 'blur.fu.datepicker', $.proxy( this.inputBlurred, this ) );

			this.$hour = this.$element.find( '.datepicker-calendar-hour .spinbox' );
			this.$minute = this.$element.find( '.datepicker-calendar-minute .spinbox' );
			this.$ampm = this.$element.find( '.datepicker-calendar-AMPM .spinbox' );

			this.$hour.spinbox( 'max', 12 );
			this.$hour.spinbox( 'min', 1 );
			this.$minute.spinbox( 'max', 59 );
			this.$minute.spinbox( 'min', 0 );
			this.$ampm.spinbox( 'max', 1 );
			this.$ampm.spinbox( 'min', 0 );

			this.$element.find( '.now' ).on( 'click', showNow );
			this.$element.find( '.done' ).on( 'click', timeDone );

			this.resetTimer();

			//show time format when it is 12h
			if ( this.is12HoursFormat() ) { //24 hours H/HH
				$( this.$element.find( '.datepicker-calendar-AMPM' ) ).css( 'display', 'inline-block' );
			} else {
				this.$hour.spinbox( 'max', 23 );
				this.$hour.spinbox( 'min', 0 );
			}

			//add default button action for done
			this.$element.on( 'keyup', '.n-calendar div.dropdown-menu', function( e ) {
				var ENTER_KEY = 13;
				if ( e.which === ENTER_KEY ) {
					timeDone( e );
				}
			} );
		};

		$.fn.datepicker.Constructor.prototype.dateClicked = function( e ) {
			var $td = $( e.currentTarget ).parents( 'td:first' );
			var date;

			if ( $td.hasClass( 'restricted' ) ) {
				return;
			}

			this.$days.find( 'td.selected' ).removeClass( 'selected' );
			$td.addClass( 'selected' );

			date = new Date( $td.attr( 'data-year' ), $td.attr( 'data-month' ), $td.attr( 'data-date' ) );
			this.selectedDate = date;

			if ( this.options.showTime ) {
				e.stopPropagation();
			} else {
				this.$input.val( this.formatDate( date ) );
				this.inputValue = this.$input.val();
				this.$input.focus();
				this.$element.trigger( 'dateClicked.fu.datepicker', date );
			}
		};

		$.fn.datepicker.Constructor.prototype.resetTimer = function() {
			setTime( this.$hour, this.$minute, this.$ampm, new Date(), this.is12HoursFormat() );
		};

		$.fn.datepicker.Constructor.prototype.is12HoursFormat = function() {
			return ( this.options.momentConfig.format.indexOf( 'H' ) < 0 );
		};

		$.fn.spinbox.Constructor.prototype.output = function( value, updateField ) {
			var ampm = $( this.$element ).parent().find( '.ampm' );
			if ( ampm.length > 0 ) {
				$( ampm[ 0 ] ).val( value % 2 === 0 ? 'PM' : 'AM' );
			}
			value = ( value + '' ).split( '.' ).join( this.options.decimalMark );
			updateField = ( updateField || true );

			if ( updateField ) {
				this.$input.val( value );
			}

			return value;
		};

		$.fn.spinbox.Constructor.prototype.max = function( maxValue ) {
			this.options.max = maxValue;
		};

		$.fn.spinbox.Constructor.prototype.min = function( minValue ) {
			this.options.min = minValue;
		};

		function setTime( hour, minute, ampm, date, is12HourFormat ) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampmValue = 0;

			if ( is12HourFormat ) {
				if ( hours >= 12 ) {
					ampmValue = 0;
				} else {
					ampmValue = 1;
				}

				if ( hours > 12 ) {
					hours = hours - 12;
				}
			}

			hour.spinbox( 'value', hours );
			minute.spinbox( 'value', minutes );
			ampm.spinbox( 'value', ampmValue );
		}

		function showNow( e ) {
			var calendar = $( e.currentTarget ).parents( '.datepicker' );
			var is12HoursFormat = calendar.datepicker( 'is12HoursFormat' );
			var currentDate = new Date();

			//show the correct date
			calendar.datepicker( 'setDate', currentDate );

			//show the correct time
			var timer = $( e.currentTarget ).parents( '.datepicker-calendar-timer' );
			var hour = timer.find( '.datepicker-calendar-hour .spinbox' );
			var minute = timer.find( '.datepicker-calendar-minute .spinbox' );
			var ampm = timer.find( '.datepicker-calendar-AMPM .spinbox' );
			setTime( hour, minute, ampm, currentDate, is12HoursFormat );
		}

		function timeDone( e ) {
			var calendar = $( e.currentTarget ).parents( '.datepicker' );
			var is12HoursFormat = calendar.datepicker( 'is12HoursFormat' );
			var d = calendar.datepicker( 'getDate' );

			var timer = calendar.find( '.datepicker-calendar-timer' );
			var hour = timer.find( '.datepicker-calendar-hour input' );
			var minute = timer.find( '.datepicker-calendar-minute input' );
			var ampm = timer.find( '.datepicker-calendar-AMPM .spinbox input' );
			var hours = parseInt( hour.val() );

			if ( is12HoursFormat && ampm.val() === '0' ) {
				hours += 12;
			}

			d.setHours( hours );
			d.setMinutes( minute.val() );
			calendar.datepicker( 'setDate', d );

			closeCalendar( calendar );
		}

		function closeCalendar( calendar ) {
			calendar.find( '.input-group-btn' ).removeClass( 'open' );
			var $input = calendar.find( 'input:first' );
			$input.next().find( ".dropdown-toggle" ).attr( "aria-expanded", "false" );
			if ( $input.hasClass( classNoRadiusLb ) ) {
				$input.removeClass( classNoRadiusLb );
			}
		}

		function updateTimer( e ) {
			var calendar = $( e.currentTarget );
			var date = calendar.datepicker( 'getDate' );
			var is12HoursFormat = calendar.datepicker( 'is12HoursFormat' );
			var hour = calendar.find( '.datepicker-calendar-hour .spinbox' );
			var minute = calendar.find( '.datepicker-calendar-minute .spinbox' );
			var ampm = calendar.find( '.datepicker-calendar-AMPM .spinbox' );

			setTime( hour, minute, ampm, date, is12HoursFormat );
		}

		function DisablePastDays() {
			var calendar = $( this ).closest( '.n-calendar-lock-past' );
			calendar.find( '.past' ).each( function() {
				$( this ).find( 'button' ).attr( 'disabled', 'disabled' );
			} );
		}

		function DisableDaysBeforeSelected() {
			var calendar1 = $( this ).closest( '.n-date-range' ).find( "div.datepicker" ).get( 0 );
			var calendar2 = $( this ).closest( '.n-date-range' ).find( "div.datepicker" ).get( 1 );
			var selectedDate = $( calendar1 ).datepicker( 'getDate' );
			if ( selectedDate.toString() !== 'Invalid Date' ) {
				$( calendar2 ).find( '.datepicker-calendar tr td' ).each( function() {
					var currentDate = ( parseInt( $( this ).attr( "data-month" ) ) + 1 ) + '/' + $( this ).attr( "data-date" ) + '/' + $( this ).attr( "data-year" );
					if ( new Date( currentDate ) < selectedDate ) {
						$( this ).addClass( 'past' );
						$( this ).find( 'button' ).attr( 'disabled', 'disabled' );
					} else {
						$( this ).removeClass( 'past' );
						$( this ).find( 'button' ).removeAttr( 'disabled' );
					}
				} );
			}

		}

		function focusToSecondCalendar( element ) {
			var calendar = $( element ).closest( '.n-date-range' ).find( "div.datepicker" ).get( 1 );
			$( calendar ).find( 'input' ).focus();
		}

		// CALENDAR KEYBOARD ACCESSIBILITY
		// ===============================
		$( document ).on( 'keydown.wf.calendar.keyboard', '.datepicker-calendar-days', $.wfKBCalendar.calendarKeyboardHandler )
			.on( 'focusin.wf.calendar.keyboard', '.datepicker-calendar-days', $.wfKBCalendar.calendarFocusinHandler );

		// CALENDAR EXTENDED METHODS
		// =========================

		$.fn.extend( {
			nDateRangePicker: function( option ) {
				$( this ).find( "div.datepicker" ).each( function() {
					$( this ).datepicker( option );
				} );
			}
		} );

	} )( $ );


	//chart.js
	( function( $ ) {
		if ( $.jqx && $.jqx._jqxChart && $.jqx.svgRenderer ) {
			/** @private */
			$.jqx.adjustColor = function( color ) {
				if ( typeof( color ) != 'string' )
					return '#000000';

				if ( color.indexOf( '#' ) == -1 )
					return color;

				return color.toUpperCase();
			};
			$.extend( $.jqx._jqxChart.prototype, {
				_defaultLineColor: '#B1B1B1',
				/** @private */
				_initRenderer: function( host ) {
					if ( !$.jqx.createRenderer ) {
						throw 'Please include jqxdraw.js';
					}

					//Draw panel shadow
					var shadowDiv = document.createElement( 'div' );
					var type = this.seriesGroups[ 0 ].type;
					var orientation = this.seriesGroups[ 0 ].orientation;
					$( shadowDiv ).addClass( 'panel-shadow chart-panel' );
					if ( type === 'line' || type === 'column' ) {
						if ( orientation === 'horizontal' ) {
							shadowDiv.style.width = ( host.width() - 384 ) + 'px';
							shadowDiv.style.height = ( host.height() - 50 ) + 'px';
							shadowDiv.style.left = '152px';
						} else {
							shadowDiv.style.width = ( host.width() - 70 ) + 'px';
							shadowDiv.style.height = ( host.height() - 60 ) + 'px';
							this.padding = {
								top: 12,
								left: 9,
								right: 28,
								bottom: 32
							};
						}
					} else {
						shadowDiv.style.width = host.width() + 'px';
						shadowDiv.style.height = host.height() + 'px';
					}

					// Draw pie shadow
					if ( type === 'donut' ) {
						var pieShadow = document.createElement( 'div' );
						var pieSetting = this.seriesGroups[ 0 ].series[ 0 ];
						var height = pieSetting.innerRadius;
						var width = pieSetting.radius * 1.5;
						var bottom = host.height() / 2 - pieSetting.radius - height;
						pieShadow.className = 'pie-shadow';
						pieShadow.style.width = width + 'px';
						pieShadow.style.height = height + 'px';
						pieShadow.style.marginLeft = -width / 2 + 'px';
						pieShadow.style.bottom = bottom + 'px';
						shadowDiv.appendChild( pieShadow );
						host.addClass( 'pie-chart' );
					}

					//Draw top legend
					var seriesLen = this.seriesGroups[ 0 ].series.length;
					if ( seriesLen && this.showLegend ) {
						var legendHeight = seriesLen * 25;
						this.padding.top = 12 + legendHeight;
						shadowDiv.style.height = ( host.height() - 60 - legendHeight ) + 'px';
						legendHeight += 'px';
						$( shadowDiv ).css( {
							top: legendHeight
						} );

						//horizontal column legend should be on right, fix shadowDiv
						if ( ( type === 'column' ) && ( orientation === "horizontal" ) ) {
							shadowDiv.style.height = ( host.height() - 99 ) + 'px';
							shadowDiv.style.top = '29px'
						}
					}
					$( shadowDiv ).css( {
						"background-color": "white",
						"border-radius": "9px"
					} );
					var render = $.jqx.createRenderer( this, host );
					$( host.find( ".chartContainer" ) ).css( {
						"z-index": "1"
					} );
					host.append( shadowDiv );
					return render;
				},
				/* jshint ignore:start */
				_render: function( rect ) {
					var self = this;
					var renderer = self.renderer;

					self._colorsCache.clear();

					if ( !self._isToggleRefresh && self._isUpdate && self._renderData )
						self._renderDataClone();

					self._renderData = [];

					renderer.clear();
					self._unselect();
					self._hideToolTip( 0 );

					var bckgImg = self.backgroundImage;
					if ( bckgImg == undefined || bckgImg == '' )
						self.host.css( {
							'background-image': ''
						} );
					else
						self.host.css( {
							'background-image': ( bckgImg.indexOf( '(' ) != -1 ? bckgImg : "url('" + bckgImg + "')" )
						} );

					self._rect = rect;

					var padding = self.padding || {
						left: 5,
						top: 5,
						right: 5,
						bottom: 5
					};

					var clipAll = renderer.createClipRect( rect );
					var groupAll = renderer.beginGroup();
					renderer.setClip( groupAll, clipAll );

					var rFill = renderer.rect( rect.x, rect.y, rect.width - 2, rect.height - 2 );

					if ( bckgImg == undefined || bckgImg == '' )
						renderer.attr( rFill, {
							fill: self.backgroundColor || self.background || 'white'
						} );
					else
						renderer.attr( rFill, {
							fill: 'transparent'
						} );

					if ( self.showBorderLine != false ) {
						var borderColor = self.borderLineColor == undefined ? self.borderColor : self.borderLineColor;
						if ( borderColor == undefined )
							borderColor = self._defaultLineColor;

						var borderLineWidth = this.borderLineWidth;
						if ( isNaN( borderLineWidth ) || borderLineWidth < 0 || borderLineWidth > 10 )
							borderLineWidth = 1;

						renderer.attr( rFill, {
							'stroke-width': borderLineWidth,
							stroke: borderColor
						} );
					} else {
						if ( $.jqx.browser.msie && $.jqx.browser.version < 9 ) {
							renderer.attr( rFill, {
								'stroke-width': 1,
								stroke: self.backgroundColor || 'white'
							} );
						}
					}

					// Invoke user-defined drawing
					if ( $.isFunction( self.drawBefore ) ) {
						self.drawBefore( renderer, rect );
					}

					var paddedRect = {
						x: padding.left,
						y: padding.top,
						width: rect.width - padding.left - padding.right,
						height: rect.height - padding.top - padding.bottom
					};
					self._paddedRect = paddedRect;
					var titlePadding = self.titlePadding || {
						left: 2,
						top: 2,
						right: 2,
						bottom: 2
					};

					var sz;
					if ( self.title && self.title.length > 0 ) {
						var cssTitle = self.toThemeProperty( 'jqx-chart-title-text', null );
						sz = renderer.measureText( self.title, 0, {
							'class': cssTitle
						} );
						renderer.text( self.title, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - ( titlePadding.left + titlePadding.right ), sz.height, 0, {
							'class': cssTitle
						}, true, 'center', 'center' );
						paddedRect.y += sz.height;
						paddedRect.height -= sz.height;
					}
					if ( self.description && self.description.length > 0 ) {
						var cssDesc = self.toThemeProperty( 'jqx-chart-title-description', null );
						sz = renderer.measureText( self.description, 0, {
							'class': cssDesc
						} );
						renderer.text( self.description, paddedRect.x + titlePadding.left, paddedRect.y + titlePadding.top, paddedRect.width - ( titlePadding.left + titlePadding.right ), sz.height, 0, {
							'class': cssDesc
						}, true, 'center', 'center' );

						paddedRect.y += sz.height;
						paddedRect.height -= sz.height;
					}

					if ( self.title || self.description ) {
						paddedRect.y += ( titlePadding.bottom + titlePadding.top );
						paddedRect.height -= ( titlePadding.bottom + titlePadding.top );
					}

					var plotRect = {
						x: paddedRect.x,
						y: paddedRect.y,
						width: paddedRect.width,
						height: paddedRect.height
					};
					self._plotRect = plotRect;

					// build stats
					self._buildStats( plotRect );

					var isPieOnly = self._isPieOnlySeries();

					var seriesGroups = self.seriesGroups;

					// axis validation
					var swap;
					var hashAxis = {
						xAxis: {},
						valueAxis: {}
					};
					for ( var i = 0; i < seriesGroups.length && !isPieOnly; i++ ) {
						if ( seriesGroups[ i ].type == 'pie' || seriesGroups[ i ].type == 'donut' )
							continue;

						var xAxis = self._getXAxis( i );
						if ( !xAxis )
							throw 'seriesGroup[' + i + '] is missing xAxis definition';

						var xAxisId = xAxis == self._getXAxis() ? -1 : i;
						hashAxis.xAxis[ xAxisId ] = 0x00;
					}

					var axisPadding = self.axisPadding;
					if ( isNaN( axisPadding ) )
						axisPadding = 5;

					// get vertical axis width
					var wYAxis = {
						left: 0,
						right: 0,
						leftCount: 0,
						rightCount: 0
					};
					var wYAxisArr = [];

					for ( i = 0; i < seriesGroups.length; i++ ) {
						var g = seriesGroups[ i ];
						if ( g.type == 'pie' || g.type == 'donut' || g.spider == true || g.polar == true ) {
							wYAxisArr.push( {
								width: 0,
								position: 0,
								xRel: 0
							} );
							continue;
						}

						swap = g.orientation == 'horizontal';

						var xAxis = self._getXAxis( i );
						var xAxisId = xAxis == self._getXAxis() ? -1 : i;

						var valueAxis = self._getValueAxis( i );
						var valueAxisId = valueAxis == self._getValueAxis() ? -1 : i;

						var w = !swap ? valueAxis.axisSize : xAxis.axisSize;
						var axisR = {
							x: 0,
							y: plotRect.y,
							width: plotRect.width,
							height: plotRect.height
						};
						var position = swap ? self._getXAxis( i ).position : valueAxis.position;

						if ( !w || w == 'auto' ) {
							if ( swap ) {
								w = this._renderXAxis( i, axisR, true, plotRect ).width;
								if ( ( hashAxis.xAxis[ xAxisId ] & 0x01 ) == 0x01 )
									w = 0;
								else if ( w > 0 )
									hashAxis.xAxis[ xAxisId ] |= 0x01;
							} else {
								w = self._renderValueAxis( i, axisR, true, plotRect ).width;
								if ( ( hashAxis.valueAxis[ valueAxisId ] & 0x01 ) == 0x01 )
									w = 0;
								else if ( w > 0 )
									hashAxis.valueAxis[ valueAxisId ] |= 0x01;
							}
						}

						if ( position != 'left' && self.rtl == true )
							position = 'right';
						if ( position != 'right' )
							position = 'left';

						if ( wYAxis[ position + 'Count' ] > 0 && wYAxis[ position ] > 0 && w > 0 )
							wYAxis[ position ] += axisPadding;

						wYAxisArr.push( {
							width: w,
							position: position,
							xRel: wYAxis[ position ]
						} );
						wYAxis[ position ] += w;
						wYAxis[ position + 'Count' ]++;
					}

					var measureSize = Math.max( 1, Math.max( rect.width, rect.height ) );

					// get horizontal axis height
					var hXAxis = {
						top: 0,
						bottom: 0,
						topCount: 0,
						bottomCount: 0
					};
					var hXAxisArr = [];

					for ( i = 0; i < seriesGroups.length; i++ ) {
						var g = seriesGroups[ i ];
						if ( g.type == 'pie' || g.type == 'donut' || g.spider == true || g.polar == true ) {
							hXAxisArr.push( {
								height: 0,
								position: 0,
								yRel: 0
							} );
							continue;
						}

						swap = g.orientation == 'horizontal';

						var valueAxis = this._getValueAxis( i );
						var valueAxisId = valueAxis == self._getValueAxis() ? -1 : i;

						var xAxis = self._getXAxis( i );
						var xAxisId = xAxis == self._getXAxis() ? -1 : i;

						var h = !swap ? xAxis.axisSize : valueAxis.axisSize;
						var position = swap ? valueAxis.position : xAxis.position;

						if ( !h || h == 'auto' ) {
							if ( swap ) {
								h = self._renderValueAxis( i, {
									x: 0,
									y: 0,
									width: measureSize,
									height: 0
								}, true, plotRect ).height;
								if ( ( hashAxis.valueAxis[ valueAxisId ] & 0x02 ) == 0x02 )
									h = 0;
								else if ( h > 0 )
									hashAxis.valueAxis[ valueAxisId ] |= 0x02;
							} else {
								h = self._renderXAxis( i, {
									x: 0,
									y: 0,
									width: measureSize,
									height: 0
								}, true ).height;
								if ( ( hashAxis.xAxis[ xAxisId ] & 0x02 ) == 0x02 )
									h = 0;
								else if ( h > 0 )
									hashAxis.xAxis[ xAxisId ] |= 0x02;
							}
						}

						if ( position != 'top' )
							position = 'bottom';

						if ( hXAxis[ position + 'Count' ] > 0 && hXAxis[ position ] > 0 && h > 0 )
							hXAxis[ position ] += axisPadding;

						hXAxisArr.push( {
							height: h,
							position: position,
							yRel: hXAxis[ position ]
						} );

						hXAxis[ position ] += h;
						hXAxis[ position + 'Count' ]++;
					}

					self._createAnimationGroup( "series" );

					var showLegend = ( self.showLegend != false );
					var szLegend = !showLegend ? {
						width: 0,
						height: 0
					} : self._renderLegend( self.legendLayout ? self._rect : paddedRect, true );
					if ( this.legendLayout && ( !isNaN( this.legendLayout.left ) || !isNaN( this.legendLayout.top ) ) )
						szLegend = {
							width: 0,
							height: 0
						};

					if ( paddedRect.height < hXAxis.top + hXAxis.bottom + szLegend.height || paddedRect.width < wYAxis.left + wYAxis.right ) {
						renderer.endGroup();
						return;
					}

					plotRect.height -= hXAxis.top + hXAxis.bottom + szLegend.height;

					plotRect.x += wYAxis.left;
					plotRect.width -= wYAxis.left + wYAxis.right;
					plotRect.y += hXAxis.top;

					var xAxisRect = [];

					if ( !isPieOnly ) {
						var lineColor = self._getXAxis().tickMarksColor || self._defaultLineColor;

						for ( i = 0; i < seriesGroups.length; i++ ) {
							var g = seriesGroups[ i ];
							if ( g.polar == true || g.spider == true || g.type == 'pie' || g.type == 'donut' )
								continue;

							swap = g.orientation == 'horizontal';
							var xAxisId = self._getXAxis( i ) == self._getXAxis() ? -1 : i;
							var valueAxisId = self._getValueAxis( i ) == self._getValueAxis() ? -1 : i;

							var axisR = {
								x: plotRect.x,
								y: 0,
								width: plotRect.width,
								height: hXAxisArr[ i ].height
							};
							if ( hXAxisArr[ i ].position != 'top' )
								axisR.y = plotRect.y + plotRect.height + hXAxisArr[ i ].yRel;
							else
								axisR.y = plotRect.y - hXAxisArr[ i ].yRel - hXAxisArr[ i ].height;

							if ( swap ) {
								if ( ( hashAxis.valueAxis[ valueAxisId ] & 0x04 ) == 0x04 )
									continue;

								if ( !self._isGroupVisible( i ) )
									continue;

								self._renderValueAxis( i, axisR, false, plotRect );

								hashAxis.valueAxis[ valueAxisId ] |= 0x04;
							} else {
								xAxisRect.push( axisR );

								if ( ( hashAxis.xAxis[ xAxisId ] & 0x04 ) == 0x04 )
									continue;

								if ( !self._isGroupVisible( i ) )
									continue;

								self._renderXAxis( i, axisR, false, plotRect );
								hashAxis.xAxis[ xAxisId ] |= 0x04;
							}
						}
					}

					if ( showLegend ) {
						var containerRect = self.legendLayout ? self._rect : paddedRect;

						var x = paddedRect.x + $.jqx._ptrnd( ( paddedRect.width - szLegend.width ) / 2 );
						var y = plotRect.y + plotRect.height + hXAxis.bottom;
						var w = paddedRect.width;
						var h = szLegend.height;
						if ( self.legendLayout ) {
							if ( !isNaN( self.legendLayout.left ) )
								x = self.legendLayout.left;

							if ( !isNaN( self.legendLayout.top ) )
								y = self.legendLayout.top;

							if ( !isNaN( self.legendLayout.width ) )
								w = self.legendLayout.width;

							if ( !isNaN( self.legendLayout.height ) )
								h = self.legendLayout.height;
						}

						if ( x + w > containerRect.x + containerRect.width )
							w = containerRect.x + containerRect.width - x;
						if ( y + h > containerRect.y + containerRect.height )
							h = containerRect.y + containerRect.height - y;

						self._renderLegend( {
							x: x,
							y: y,
							width: w,
							height: h
						} );
					}

					self._hasHorizontalLines = false;
					if ( !isPieOnly ) {
						for ( i = 0; i < seriesGroups.length; i++ ) {
							var g = seriesGroups[ i ];

							if ( g.polar == true || g.spider == true || g.type == 'pie' || g.type == 'donut' )
								continue;

							swap = seriesGroups[ i ].orientation == 'horizontal';
							var axisR = {
								x: plotRect.x - wYAxisArr[ i ].xRel - wYAxisArr[ i ].width,
								y: plotRect.y,
								width: wYAxisArr[ i ].width,
								height: plotRect.height
							};
							if ( wYAxisArr[ i ].position != 'left' )
								axisR.x = plotRect.x + plotRect.width + wYAxisArr[ i ].xRel;

							var xAxisId = self._getXAxis( i ) == self._getXAxis() ? -1 : i;
							var valueAxisId = self._getValueAxis( i ) == self._getValueAxis() ? -1 : i;

							if ( swap ) {
								xAxisRect.push( axisR );

								if ( ( hashAxis.xAxis[ xAxisId ] & 0x08 ) == 0x08 )
									continue;

								if ( !self._isGroupVisible( i ) )
									continue;

								self._renderXAxis( i, axisR, false, plotRect );
								hashAxis.xAxis[ xAxisId ] |= 0x08;
							} else {
								if ( ( hashAxis.valueAxis[ valueAxisId ] & 0x08 ) == 0x08 )
									continue;

								if ( !self._isGroupVisible( i ) )
									continue;

								self._renderValueAxis( i, axisR, false, plotRect );
								hashAxis.valueAxis[ valueAxisId ] |= 0x08;
							}
						}
					}

					if ( plotRect.width <= 0 || plotRect.height <= 0 )
						return;

					self._plotRect = {
						x: plotRect.x,
						y: plotRect.y,
						width: plotRect.width,
						height: plotRect.height
					};

					for ( i = 0; i < seriesGroups.length; i++ ) {
						this._drawPlotAreaLines( i, true, {
							gridLines: false,
							tickMarks: false,
							alternatingBackground: true
						} );
						this._drawPlotAreaLines( i, false, {
							gridLines: false,
							tickMarks: false,
							alternatingBackground: true
						} );
					}

					for ( i = 0; i < seriesGroups.length; i++ ) {
						this._drawPlotAreaLines( i, true, {
							gridLines: true,
							tickMarks: true,
							alternatingBackground: false
						} );
						this._drawPlotAreaLines( i, false, {
							gridLines: true,
							tickMarks: true,
							alternatingBackground: false
						} );
					}

					var hasCustomDraw = false;
					for ( i = 0; i < seriesGroups.length && !hasCustomDraw; i++ ) {
						var g = seriesGroups[ i ];
						if ( g.annotations !== undefined ||
							$.isFunction( g.draw ) ||
							$.isFunction( g.drawBefore )
						) {
							hasCustomDraw = true;
							break;
						}
					}

					var gPlot = renderer.beginGroup();

					if ( !hasCustomDraw ) {
						var clip = renderer.createClipRect( {
							x: plotRect.x + 1,
							y: plotRect.y,
							width: plotRect.width + 4,
							height: plotRect.height
						} ); //need swift for bar chart radius, modifyed by Al
						renderer.setClip( gPlot, clip );
					}

					for ( i = 0; i < seriesGroups.length; i++ ) {
						var g = seriesGroups[ i ];
						var isValid = false;
						for ( var validtype in self._seriesTypes ) {
							if ( self._seriesTypes[ validtype ] == g.type ) {
								isValid = true;
								break;
							}
						}
						if ( !isValid )
							throw 'Invalid serie type "' + g.type + '"';

						// custom drawing before the group
						if ( $.isFunction( g.drawBefore ) )
							g.drawBefore( renderer, rect, i, this );

						// polar series drawing
						if ( g.polar == true || g.spider == true ) {
							if ( g.type.indexOf( 'pie' ) == -1 && g.type.indexOf( 'donut' ) == -1 )
								self._renderSpiderAxis( i, plotRect );
						}

						self._renderAxisBands( i, plotRect, true );
						self._renderAxisBands( i, plotRect, false );
					}

					for ( i = 0; i < seriesGroups.length; i++ ) {
						var g = seriesGroups[ i ];

						if ( self._isColumnType( g.type ) )
							self._renderColumnSeries( i, plotRect );
						else if ( g.type.indexOf( 'pie' ) != -1 || g.type.indexOf( 'donut' ) != -1 )
							self._renderPieSeries( i, plotRect );
						else if ( g.type.indexOf( 'line' ) != -1 || g.type.indexOf( 'area' ) != -1 )
							self._renderLineSeries( i, plotRect );
						else if ( g.type.indexOf( 'scatter' ) != -1 || g.type.indexOf( 'bubble' ) != -1 )
							self._renderScatterSeries( i, plotRect );
						else if ( g.type.indexOf( 'candlestick' ) != -1 || g.type.indexOf( 'ohlc' ) != -1 )
							self._renderCandleStickSeries( i, plotRect, g.type.indexOf( 'ohlc' ) != -1 );

						if ( g.annotations ) {
							if ( !this._moduleAnnotations )
								throw "Please include 'jqxchart.annotations.js'";

							for ( var j = 0; j < g.annotations.length; j++ )
								self._renderAnnotation( i, g.annotations[ j ], plotRect );
						}

						// custom drawing after the group
						if ( $.isFunction( g.draw ) )
							self.draw( renderer, rect, i, this );
					}

					renderer.endGroup();

					if ( self.enabled == false ) {
						var el = renderer.rect( rect.x, rect.y, rect.width, rect.height );
						renderer.attr( el, {
							fill: '#777777',
							opacity: 0.5,
							stroke: '#00FFFFFF'
						} );
					}

					// Invoke user-defined drawing
					if ( $.isFunction( self.draw ) ) {
						self.draw( renderer, rect );
					}

					renderer.endGroup();

					self._startAnimation( "series" );

					// render range selector
					var hasRangeSelector = false;
					for ( var i = 0; i < self.seriesGroups.length && !hasRangeSelector; i++ ) {
						var xAxis = self._getXAxis( i );
						if ( xAxis && xAxis.rangeSelector )
							hasRangeSelector = true;
					}

					if ( hasRangeSelector ) {
						if ( !this._moduleRangeSelector )
							throw "Please include 'jqxchart.rangeselector.js'";

						var isRendered = [];

						if ( !this._isSelectorRefresh ) {
							self.removeHandler( $( document ), self._getEvent( 'mousemove' ), self._onSliderMouseMove );
							self.removeHandler( $( document ), self._getEvent( 'mousedown' ), self._onSliderMouseDown );
							self.removeHandler( $( document ), self._getEvent( 'mouseup' ), self._onSliderMouseUp );
						}

						if ( !self._isSelectorRefresh )
							self._rangeSelectorInstances = {};

						for ( i = 0; i < self.seriesGroups.length; i++ ) {
							var axis = this._getXAxis( i );

							if ( isRendered.indexOf( axis ) == -1 ) {
								if ( this._renderXAxisRangeSelector( i, xAxisRect[ i ] ) )
									isRendered.push( axis );
							}
						}
					}
				},


				/** @private */
				_showLabel: function( gidx, sidx, iidx, rect, halign, valign, isMeasure, inverseHAlign, inverseVAlign, labelAngleOverride, renderedRect ) {
					var group = this.seriesGroups[ gidx ];
					var series = group.series[ sidx ];
					var sz = {
							width: 0,
							height: 0
						},
						szSave;

					if ( isNaN( iidx ) )
						return;

					var settings = this._getLabelsSettings( gidx, sidx, iidx );

					if ( !settings.visible )
						return isMeasure ? sz : undefined;

					if ( rect.width < 0 || rect.height < 0 )
						return isMeasure ? sz : undefined;

					var labelsAngle = settings.angle;
					if ( !isNaN( labelAngleOverride ) )
						labelsAngle = labelAngleOverride;

					var offset = settings.offset || {};
					var labelOffset = {
						x: offset.x,
						y: offset.y
					};
					if ( isNaN( labelOffset.x ) )
						labelOffset.x = 0;
					if ( isNaN( labelOffset.y ) )
						labelOffset.y = 0;

					halign = halign || settings.horizontalAlignment || 'center';
					valign = valign || settings.verticalAlignment || 'center';

					var text = this._getFormattedValue( gidx, sidx, iidx, undefined, undefined, true );

					var w = rect.width;
					var h = rect.height;

					if ( inverseHAlign == true && halign != 'center' )
						halign = halign == 'right' ? 'left' : 'right';

					if ( inverseVAlign == true && valign != 'center' && valign != 'middle' ) {
						valign = valign == 'top' ? 'bottom' : 'top';
						labelOffset.y *= -1;
					}

					sz = this.renderer.measureText( text, labelsAngle, {
						'class': settings[ 'class' ]
					} );

					if ( isMeasure )
						return sz;

					var x = 0,
						y = 0;

					if ( w > 0 ) {
						if ( halign == '' || halign == 'center' )
							x += ( w - sz.width ) / 2;
						else if ( halign == 'right' )
							x += ( w - sz.width );
					}

					if ( h > 0 ) {
						if ( valign == '' || valign == 'center' )
							y += ( h - sz.height ) / 2;
						else if ( valign == 'bottom' )
							y += ( h - sz.height );
					}

					x += rect.x + labelOffset.x;
					y += rect.y + labelOffset.y;

					var plotRect = this._plotRect;

					//if (x <= plotRect.x)
					//    x = plotRect.x + 2;

					//if (y <= plotRect.y)
					//    y = plotRect.y + 2;
					if ( this.seriesGroups[ 0 ].orientation === "horizontal" ) {
						x = plotRect.x - 30 + labelOffset.x;
						y = y - 2;
					}

					var labelSize = {
						width: Math.max( sz.width, 1 ),
						height: Math.max( sz.height, 1 )
					};

					if ( y + labelSize.height >= plotRect.y + plotRect.height )
						y = plotRect.y + plotRect.height - ( szSave ? ( labelSize.height + szSave.height ) / 2 : labelSize.height ) - 2;

					if ( x + labelSize.width >= plotRect.x + plotRect.width )
						x = plotRect.x + plotRect.width - labelSize.width - 2;

					var renderGroup;

					var labelsBackground = settings.backgroundColor;
					var labelsBorder = settings.borderColor;

					var padding = settings.padding;
					if ( labelsBackground || labelsBorder ) {
						renderGroup = this.renderer.beginGroup();

						var rect = this.renderer.rect(
							x - padding.left,
							y - padding.top,
							sz.width + padding.left + padding.right,
							sz.height + padding.bottom + padding.bottom, {
								fill: labelsBackground || 'transparent',
								'fill-opacity': settings.backgroundOpacity || 1,
								stroke: labelsBorder || 'transparent',
								'stroke-opacity': settings.borderOpacity,
								'stroke-width': 1
							}
						);
					}

					var elemLabel = this.renderer.text( text, x, y, sz.width, sz.height, labelsAngle, {
						'class': settings[ 'class' ],
						opacity: settings.opacity || 1
					}, false, 'center', 'center' );

					if ( renderedRect ) {
						// return the renderedRect
						renderedRect.x = x - padding.left;
						renderedRect.y = y - padding.top;
						renderedRect.width = sz.width + padding.left + padding.right;
						renderedRect.height = sz.height + padding.bottom + padding.bottom;
					}

					if ( this._isVML ) {
						this.renderer.removeElement( elemLabel );
						this.renderer.getContainer()[ 0 ].appendChild( elemLabel );
					}

					if ( renderGroup )
						this.renderer.endGroup();

					return renderGroup || elemLabel;
				},


				_animColumns: function( context, percent ) {
					var gidx = context.groupIndex;
					var group = this.seriesGroups[ gidx ];
					var renderData = context.renderData;
					var isWaterfall = group.type.indexOf( 'waterfall' ) != -1;
					var xAxis = this._getXAxis( gidx );

					var isStacked = group.type.indexOf( 'stacked' ) != -1;

					var polarAxisCoords = context.polarAxisCoords;

					var gradientType = this._getGroupGradientType( gidx );

					var columnWidth = context.columnGroupWidth.targetWidth;

					var firstVisibleSerie = -1;
					for ( var j = 0; j < group.series.length; j++ ) {
						if ( this._isSerieVisible( gidx, j ) ) {
							firstVisibleSerie = j;
							break;
						}
					}

					var minPos = NaN,
						maxPos = NaN;
					for ( var j = 0; j < context.seriesCtx.length; j++ ) {
						var serieCtx = context.seriesCtx[ j ];
						if ( isNaN( minPos ) || minPos > serieCtx.xAdjust )
							minPos = serieCtx.xAdjust;
						if ( isNaN( maxPos ) || maxPos < serieCtx.xAdjust + serieCtx.columnWidth )
							maxPos = serieCtx.xAdjust + serieCtx.columnWidth;
					}

					var realGroupWidth = Math.abs( maxPos - minPos );

					var xoffsets = context.renderData.xoffsets;

					var xPrev = -1;

					var yWaterfallPrev = {};

					// skipOverlappingPoints is off by default in column series
					var skipOverlappingPoints = group.skipOverlappingPoints == true;

					for ( var i = xoffsets.first; i <= xoffsets.last; i++ ) {
						var x = xoffsets.data[ i ];
						if ( isNaN( x ) )
							continue;

						if ( xPrev != -1 && Math.abs( x - xPrev ) < realGroupWidth && skipOverlappingPoints )
							continue;
						else
							xPrev = x;

						var offsets = this._getColumnVOffsets( renderData, gidx, context.seriesCtx, i, isStacked, percent );

						var isSummary = false;

						if ( isWaterfall ) {
							for ( var iSerie = 0; iSerie < group.series.length; iSerie++ ) {
								if ( group.series[ iSerie ].summary && xoffsets.xvalues[ i ][ group.series[ iSerie ].summary ] )
									isSummary = true;
							}
						}

						for ( var iSerie = 0; iSerie < context.seriesCtx.length; iSerie++ ) {
							var serieCtx = context.seriesCtx[ iSerie ];
							var sidx = serieCtx.seriesIndex;
							var serie = group.series[ sidx ];

							var from = offsets[ iSerie ].from;
							var to = offsets[ iSerie ].to;
							var xOffset = offsets[ iSerie ].xOffset;

							if ( !serieCtx.elements )
								serieCtx.elements = {};

							if ( !serieCtx.labelElements )
								serieCtx.labelElements = {};

							var elements = serieCtx.elements;
							var labelElements = serieCtx.labelElements;

							var startOffset = ( context.vertical ? context.rect.x : context.rect.y ) + serieCtx.xAdjust;

							var settings = serieCtx.settings;
							var colors = serieCtx.itemsColors.length != 0 ? serieCtx.itemsColors[ i - renderData.xoffsets.first ] : serieCtx.serieColors;

							var isVisible = this._isSerieVisible( gidx, sidx );

							if ( !isVisible /*&& !isStacked*/ )
								continue;

							var x = $.jqx._ptrnd( startOffset + xOffset );

							var rect = {
								x: x,
								width: serieCtx.columnWidth
							};

							if ( offsets[ iSerie ].funnel ) {
								rect.fromWidthPercent = offsets[ iSerie ].fromWidthPercent;
								rect.toWidthPercent = offsets[ iSerie ].toWidthPercent;
							}

							var isInverseDirection = true;

							if ( context.vertical ) {
								rect.y = from;
								rect.height = to - from;
								if ( rect.height < 0 ) {
									rect.y += rect.height;
									rect.height = -rect.height;
									isInverseDirection = false;
								}
							} else {
								rect.x = from < to ? from : to;
								rect.width = Math.abs( from - to );
								isInverseDirection = from - to < 0;
								rect.y = x;
								rect.height = serieCtx.columnWidth;
							}

							var size = from - to;
							if ( isNaN( size ) )
								continue;

							size = Math.abs( size );

							var pieSliceInfo = undefined;
							var isNewElement = elements[ i ] == undefined;

							if ( !polarAxisCoords ) {
								if ( offsets[ iSerie ].funnel ) // funnel or pyramid
								{
									var path = this._getTrapezoidPath( $.extend( {}, rect ), context.vertical, isInverseDirection );
									if ( isNewElement )
										elements[ i ] = this.renderer.path( path, {} );
									else
										this.renderer.attr( elements[ i ], {
											d: path
										} );
								} else { // regular column
									if ( isNewElement ) {
										elements[ i ] = this.renderer.rect( rect.x, rect.y, context.vertical ? rect.width : 0, context.vertical ? 0 : rect.height );
									} else {
										if ( context.vertical == true )
											this.renderer.attr( elements[ i ], {
												x: rect.x,
												y: rect.y,
												height: size + 5,
												class: "bar"
											} ); //fixed by long
										else
											this.renderer.attr( elements[ i ], {
												x: rect.x - 5,
												y: rect.y,
												width: size + 5,
												class: "bar"
											} ); //fixed by Al
									}
								}
							} else // column on polar axis
							{
								pieSliceInfo = this._columnAsPieSlice( elements, i, context.rect, polarAxisCoords, rect );
								var colors = this._getColors( gidx, sidx, undefined, 'radialGradient', pieSliceInfo.outerRadius );
							}

							if ( size < 1 && ( percent != 1 || polarAxisCoords ) )
								this.renderer.attr( elements[ i ], {
									display: 'none'
								} );
							else
								this.renderer.attr( elements[ i ], {
									display: 'block'
								} );

							if ( isNewElement )
								this.renderer.attr( elements[ i ], {
									fill: colors.fillColor,
									'fill-opacity': settings.opacity,
									'stroke-opacity': settings.opacity,
									stroke: colors.lineColor,
									'stroke-width': settings.stroke,
									'stroke-dasharray': settings.dashStyle
								} );

							this.renderer.removeElement( labelElements[ i ] );

							if ( !isVisible || ( size == 0 && percent < 1 ) )
								continue;

							/// Waterfall start
							if ( isWaterfall && this._get( [ serie.showWaterfallLines, group.showWaterfallLines ] ) != false ) {
								if ( !isStacked || ( isStacked && iSerie == firstVisibleSerie ) ) {
									var serieKey = isStacked ? -1 : iSerie;
									if ( percent == 1 && !isNaN( renderData.offsets[ iSerie ][ i ].from ) && !isNaN( renderData.offsets[ iSerie ][ i ].to ) ) {
										var prevWFInfo = yWaterfallPrev[ serieKey ];
										if ( prevWFInfo != undefined ) {

											var p1 = {
												x: prevWFInfo.x,
												y: $.jqx._ptrnd( prevWFInfo.y )
											};

											var p2 = {
												x: x,
												y: p1.y
											};

											var topWP = group.columnsTopWidthPercent / 100;
											if ( isNaN( topWP ) )
												topWP = 1;
											else if ( topWP > 1 || topWP < 0 )
												topWP = 1;

											var bottomWP = group.columnsBottomWidthPercent / 100;
											if ( isNaN( bottomWP ) )
												bottomWP = 1;
											else if ( bottomWP > 1 || bottomWP < 0 )
												bottomWP = 1;

											var sz = context.vertical ? rect.width : rect.height;

											p1.x = p1.x - sz / 2 + sz / 2 * topWP;

											if ( isSummary ) {
												var adj = sz * topWP / 2;
												p2.x = p2.x + sz / 2 - ( xAxis.flip ? -adj : adj );
											} else {
												var adj = sz * bottomWP / 2;
												p2.x = p2.x + sz / 2 - ( xAxis.flip ? -adj : adj );
											}

											if ( !context.vertical ) {
												this._swapXY( [ p1 ] );
												this._swapXY( [ p2 ] );
											}

											this.renderer.line(
												p1.x,
												p1.y,
												p2.x,
												p2.y, {
													stroke: prevWFInfo.color,
													'stroke-width': settings.stroke,
													'stroke-opacity': settings.opacity,
													'fill-opacity': settings.opacity,
													'stroke-dasharray': settings.dashStyle
												}
											);
										}
									}
								}

								if ( percent == 1 && size != 0 ) {
									yWaterfallPrev[ isStacked ? -1 : iSerie ] = {
										y: to,
										x: ( context.vertical ? rect.x + rect.width : rect.y + rect.height ),
										color: colors.lineColor
									};
								}
							}
							// Waterfall end

							if ( polarAxisCoords ) {
								var pointOuter = this._toPolarCoord( polarAxisCoords, context.rect, rect.x + rect.width / 2, rect.y );
								var sz = this._showLabel( gidx, sidx, i, rect, undefined, undefined, true );
								var labelRadius = pieSliceInfo.outerRadius + 10;

								var labelOffset = this._adjustTextBoxPosition(
									polarAxisCoords.x,
									polarAxisCoords.y,
									sz,
									labelRadius,
									( pieSliceInfo.fromAngle + pieSliceInfo.toAngle ) / 2,
									true,
									false,
									false
								);

								labelElements[ i ] = this._showLabel( gidx, sidx, i, {
									x: labelOffset.x,
									y: labelOffset.y
								}, undefined, undefined, false, false, false );
							} else {
								labelElements[ i ] = this._showLabel( gidx, sidx, i, rect, undefined, undefined, false, false, isInverseDirection );
							}

							if ( percent == 1.0 ) {
								this._installHandlers( elements[ i ], 'column', gidx, sidx, i );
							}
						}
					}
				},
				/** @private */
				_createTooltip: function( position, group, content, style ) {
					var self = this;

					var groupType = group.type;

					// create tooltip elements
					var isNew = false;

					var divToolTip = self._ttEl.box;
					if ( !divToolTip ) {
						isNew = true;

						divToolTip = self._ttEl.box = document.createElement( "div" );

						var baseZIndex = 10000000;
						var arrowOuterDiv = document.createElement( "div" );
						divToolTip.style.position = 'absolute';
						divToolTip.style.cursor = 'default';
						divToolTip.style.zIndex = 9;
						divToolTip.setAttribute( 'aria-labelledby', 'tooltip-msg' );
						divToolTip.setAttribute( 'role', 'alertdialog' );
						$( arrowOuterDiv ).css( {
							'z-index': baseZIndex,
							'box-sizing': 'content-box'
						} );
						$( document.body ).append( divToolTip );


						arrowOuterDiv.id = 'arrowOuterDiv';
						arrowOuterDiv.style.width = '0px';
						arrowOuterDiv.style.height = '0px';
						arrowOuterDiv.style.position = 'absolute';
						$( arrowOuterDiv ).css( {
							'z-index': baseZIndex + 1,
							'box-sizing': 'content-box'
						} );

						var arrowInnerDiv = document.createElement( "div" );
						arrowInnerDiv.id = 'arrowInnerDiv';
						arrowInnerDiv.style.width = '0px';
						arrowInnerDiv.style.height = '0px';
						arrowInnerDiv.style.position = 'absolute';

						var contentDiv = document.createElement( "div" );
						contentDiv.id = 'contentDiv';
						contentDiv.style.position = 'absolute';
						contentDiv.style.borderRadius = '7px';
						$( contentDiv ).css( {
							'box-sizing': 'content-box'
						} );

						$( contentDiv ).addClass( 'jqx-rc-all jqx-button' );
						$( contentDiv ).appendTo( $( divToolTip ) );
						$( arrowOuterDiv ).appendTo( $( divToolTip ) );
						$( arrowInnerDiv ).appendTo( $( divToolTip ) );
						$( arrowInnerDiv ).css( {
							'z-index': baseZIndex + 2,
							'box-sizing': 'content-box'
						} );

					}

					if ( !content || content.length == 0 ) {
						$( divToolTip ).fadeTo( 0, 0 );
						return;
					}

					contentDiv = $( divToolTip ).find( '#contentDiv' )[ 0 ];
					arrowOuterDiv = $( divToolTip ).find( '#arrowOuterDiv' )[ 0 ];
					arrowInnerDiv = $( divToolTip ).find( '#arrowInnerDiv' )[ 0 ];
					arrowInnerDiv.style.opacity = arrowOuterDiv.style.opacity = style.fillOpacity;


					// set styles and content
					contentDiv.style.backgroundColor = 'black';
					contentDiv.style.backgroundImage = 'linear-gradient(to bottom, #666 0%, #000 100%)';
					contentDiv.style.borderColor = 'black';
					contentDiv.style.color = 'white';
					contentDiv.style.opacity = style.fillOpacity;
					contentDiv.style.boxShadow = '0 3px 5px rgba(0, 0, 0, 0.65)';

					var html = "<span id='tooltip-msg' style='text-align: left;color:#fff;font-size:14px;display:inline-block;padding:9px 7px 8px 7px;' class='" + style.css + "'>" + content + "</span>";
					$( contentDiv ).html( html );

					var size = this._measureHtml( html, 'jqx-rc-all jqx-button' );

					// calculate tooltip positioning and arrow location
					var rect = self._plotRect;

					if ( size.width > rect.width || size.height > rect.height )
						return;

					var totalSize = {
						width: size.width,
						height: size.height
					};

					var arrowLocation = '';
					var space = 5;
					var arrowSize = 10;

					var isColumn = self._isColumnType( groupType );

					var x = Math.max( position.x, rect.x );
					var y = Math.max( position.y, rect.y );

					if ( self.toolTipAlignment == 'dataPoint' ) {
						if ( groupType.indexOf( 'pie' ) != -1 || groupType.indexOf( 'donut' ) != -1 ) {
							var midAngle = ( position.fromAngle + position.toAngle ) / 2;
							midAngle = midAngle * ( Math.PI / 180 );

							var radius = ( !isNaN( position.innerRadius ) && position.innerRadius > 0 ) ? ( position.innerRadius + position.outerRadius ) / 2 : position.outerRadius * 0.75;

							x = position.x = position.center.x + Math.cos( midAngle ) * radius;
							y = position.y = position.center.y - Math.sin( midAngle ) * radius;
							position.width = position.height = 1;
						} else if ( isColumn && ( group.polar || group.spider ) ) {
							position.width = position.height = 1;
						}

						var ttFit = this._fitTooltip( this._plotRect, position, totalSize, group, style.symbolSize );
						if ( ttFit.arrowLocation != '' ) {
							arrowLocation = ttFit.arrowLocation;
							x = ttFit.x;
							y = ttFit.y;
							totalSize.width = ttFit.width;
							totalSize.height = ttFit.height;
						}
					} else {
						arrowLocation = '';
					}

					if ( arrowLocation == 'top' || arrowLocation == 'bottom' ) {
						totalSize.height += arrowSize;
						x -= arrowSize / 2;
						if ( arrowLocation == 'bottom' )
							y -= arrowSize;
					} else if ( arrowLocation == 'left' || arrowLocation == 'right' ) {
						totalSize.width += arrowSize;
						y -= arrowSize / 2;
						if ( arrowLocation == 'right' )
							x -= arrowSize;
					}

					if ( x + totalSize.width > rect.x + rect.width ) {
						arrowLocation = '';
						x = rect.x + rect.width - totalSize.width;
					}

					if ( y + totalSize.height > rect.y + rect.height ) {
						arrowLocation = '';
						y = rect.y + rect.height - totalSize.height;
					}

					// set arrow and content position
					var arrowPosition = {
							x: 0,
							y: 0
						},
						contentPosition = {
							x: 0,
							y: 0
						};
					$( contentDiv ).css( {
						width: size.width,
						height: size.height,
						left: 0,
						top: 0
					} );

					arrowOuterDiv.style[ 'margin-top' ] = arrowOuterDiv.style[ 'margin-left' ] = 0;
					arrowInnerDiv.style[ 'margin-top' ] = arrowInnerDiv.style[ 'margin-left' ] = 0;
					contentDiv.style[ 'margin-top' ] = contentDiv.style[ 'margin-left' ] = 0;

					var arrowSizeSolid = arrowSize + 'px solid';
					var arrowSizeSolidTransparent = arrowSize + 'px solid transparent';
					style.fill = '#000';
					style.stroke = '#000';
					if ( groupType.indexOf( 'line' ) != -1 ) {
						arrowLocation = 'top';
					}
					if ( groupType.indexOf( 'column' ) != -1 ) {
						arrowLocation = 'top';
					}
					switch ( arrowLocation ) {
						case 'left':
							arrowPosition = {
								x: 0,
								y: ( size.height - arrowSize ) / 2
							};
							contentPosition = {
								x: arrowSize,
								y: 0
							};
							contentDiv.style[ 'margin-left' ] = arrowSize + 'px';

							arrowOuterDiv.style[ 'margin-left' ] = 1 + 'px';
							arrowOuterDiv.style[ 'margin-top' ] = arrowPosition.y + 'px';

							arrowOuterDiv.style[ 'border-left' ] = '';
							arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-top' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = 1 + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = arrowPosition.y + 'px';
							arrowInnerDiv.style[ 'border-left' ] = '';
							arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolid + ' ' + style.fill;
							arrowInnerDiv.style[ 'border-top' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolidTransparent;
							break;
						case 'right':
							arrowPosition = {
								x: totalSize.width - arrowSize,
								y: ( size.height - arrowSize ) / 2
							};
							contentPosition = {
								x: 0,
								y: 0
							};

							arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowOuterDiv.style[ 'margin-top' ] = arrowPosition.y + 'px';

							arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-right' ] = '';
							arrowOuterDiv.style[ 'border-top' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x - 1 + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = arrowPosition.y + 'px';

							arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolid + ' ' + style.fill;
							arrowInnerDiv.style[ 'border-right' ] = '';
							arrowInnerDiv.style[ 'border-top' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolidTransparent;

							break;
						case 'top':
							arrowPosition = {
								x: totalSize.width / 2 - arrowSize / 2,
								y: 0
							};
							contentPosition = {
								x: 0,
								y: arrowSize
							};

							contentDiv.style[ 'margin-top' ] = contentPosition.y + 'px';
							arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';

							arrowOuterDiv.style[ 'border-top' ] = '';
							arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = 1 + 'px';
							arrowInnerDiv.style[ 'border-top' ] = '';
							arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + '#666';
							arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;
							break;
						case 'bottom':
							arrowPosition = {
								x: totalSize.width / 2 - arrowSize / 2,
								y: totalSize.height - arrowSize
							};
							contentPosition = {
								x: 0,
								y: 0
							};

							arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowOuterDiv.style[ 'margin-top' ] = arrowPosition.y + 'px';

							arrowOuterDiv.style[ 'border-top' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-bottom' ] = '';
							arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = arrowPosition.y - 1 + 'px';
							arrowInnerDiv.style[ 'border-top' ] = arrowSizeSolid + ' ' + style.fill;
							arrowInnerDiv.style[ 'border-bottom' ] = '';
							arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

							break;
					}

					if ( groupType.indexOf( 'line' ) != -1 ) {
						if ( ( this.element.clientWidth - position.x ) <= 150 ) {
							x = position.x - totalSize.width + arrowSize * 4;
							y = position.y + 20;
							arrowPosition = {
								x: totalSize.width - arrowSize * 5,
								y: 0
							};
							contentPosition = {
								x: 0,
								y: arrowSize
							};

							contentDiv.style[ 'margin-top' ] = contentPosition.y + 'px';
							arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';

							arrowOuterDiv.style[ 'border-top' ] = '';
							arrowOuterDiv.style[ 'margin-top' ] = '1px';
							arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = 2 + 'px';
							arrowInnerDiv.style[ 'border-top' ] = '';
							arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + '#666';
							arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;
						} else {
							x = position.x - 30;
							y = position.y + 20;
							arrowPosition = {
								x: arrowSize * 2,
								y: 0
							};
							contentPosition = {
								x: 0,
								y: arrowSize
							};

							contentDiv.style[ 'margin-top' ] = contentPosition.y + 'px';
							arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';

							arrowOuterDiv.style[ 'border-top' ] = '';
							arrowOuterDiv.style[ 'margin-top' ] = '1px';
							arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + style.stroke;
							arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

							arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
							arrowInnerDiv.style[ 'margin-top' ] = 2 + 'px';
							arrowInnerDiv.style[ 'border-top' ] = '';
							arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + '#666';
							arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
							arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;
						}
					}

					if ( groupType.indexOf( 'column' ) != -1 ) {
						x = position.x - 30;
						y = position.y + 20;
						arrowPosition = {
							x: totalSize.width - arrowSize * 5,
							y: 0
						};
						contentPosition = {
							x: 0,
							y: arrowSize
						};

						contentDiv.style[ 'margin-top' ] = contentPosition.y + 'px';
						arrowOuterDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';

						arrowOuterDiv.style[ 'border-top' ] = '';
						arrowOuterDiv.style[ 'margin-top' ] = '1px';
						arrowOuterDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + style.stroke;
						arrowOuterDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
						arrowOuterDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;

						arrowInnerDiv.style[ 'margin-left' ] = arrowPosition.x + 'px';
						arrowInnerDiv.style[ 'margin-top' ] = 2 + 'px';
						arrowInnerDiv.style[ 'border-top' ] = '';
						arrowInnerDiv.style[ 'border-bottom' ] = arrowSizeSolid + ' ' + '#666';
						arrowInnerDiv.style[ 'border-left' ] = arrowSizeSolidTransparent;
						arrowInnerDiv.style[ 'border-right' ] = arrowSizeSolidTransparent;
					}

					if ( arrowLocation == '' ) {
						$( arrowOuterDiv ).hide();
						$( arrowInnerDiv ).hide();
					} else {
						$( arrowOuterDiv ).show();
						$( arrowInnerDiv ).show();
					}

					// update size
					$( divToolTip ).css( {
						width: totalSize.width + 'px',
						height: totalSize.height + 'px'
					} );

					var hostPosition = self.host.coord();
					if ( isNew ) {
						$( divToolTip ).fadeOut( 0, 0 );
						divToolTip.style.left = x + hostPosition.left + 'px';
						divToolTip.style.top = y + hostPosition.top - 20 + 'px';
					}

					$( divToolTip ).clearQueue();
					// $(divToolTip).animate({ left: x + hostPosition.left, top: y + hostPosition.top - 20, opacity: 1 }, self.toolTipMoveDuration, 'easeInOutCirc');
					$( divToolTip ).css( {
						left: x + hostPosition.left,
						top: y + hostPosition.top - 20
					} );
					if ( ( group.type === "column" ) && ( group.orientation === "horizontal" ) )
						$( divToolTip ).css( {
							left: position.x - 23 + position.width / 2,
							top: y + hostPosition.top - 20
						} );

					$( divToolTip ).fadeTo( 0, 1 );
				},
				_applyPieSelect: function() {
					var selected = this._selected;
					if ( !selected )
						return;
					selected.element.style.strokeWidth = 2;
					selected.element.style.stroke = '#00A1CC';
				},
				_applyPieUnselect: function() {
						var selected = this._selected;
						if ( !selected )
							return;
						selected.element.style.strokeWidth = 0;
					}
					/* jshint ignore:end */
			} );
			$.extend( $.jqx.svgRenderer.prototype, {
				line: function( x1, y1, x2, y2, params ) {
					if ( y1 === y2 ) {
						x2 += 16;
					}
					var line = this.shape( 'line', {
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2
					} );
					this.attr( line, params );
					if ( x1 === x2 ) {
						this.attr( line, {
							"stroke-width": "1"
						} );
					}
					return line;
				},
				rect: function( c, j, d, f, i ) {
					c = $.jqx._ptrnd( c );
					j = $.jqx._ptrnd( j );
					d = Math.max( 1, $.jqx._rnd( d, 1, false ) );
					f = Math.max( 1, $.jqx._rnd( f, 1, false ) );
					var e = this.shape( "rect", {
						x: c,
						y: j,
						width: d,
						height: f
					} );
					if ( i ) {
						this.attr( e, i );
					}
					var round = f > 50 ? 9 : 5;
					this.attr( e, {
						rx: round
					} );
					return e;
				},
				_toLinearGradient: function( f, k ) {
					var d = "grd" + this._id + f.replace( "#", "" ) + ( k ? "v" : "h" );
					var c = "url(" + this.getWindowHref() + "#" + d + ")";
					if ( this._gradients[ c ] ) {
						return c;
					}

					var e = document.createElementNS( this._svgns, "linearGradient" );
					this.attr( e, {
						x1: "0%",
						y1: "0%",
						x2: k ? "0%" : "100%",
						y2: k ? "100%" : "0%",
						id: d
					} );
					var j = [ 0, 50, 50, 100 ];
					f = [ "#0B6DAF", "#0B6DAF", "#09578C", "#09578C" ];
					for ( var i = 0; i < j.length; i++ ) {
						var n = document.createElementNS( this._svgns, "stop" );
						var m = "stop-color:" + f[ i ]; //$.jqx.adjustColor(f, j[1]);
						this.attr( n, {
							offset: j[ i ] + "%",
							style: m
						} );
						e.appendChild( n );
					}
					this._defs.appendChild( e );
					this._gradients[ c ] = true;
					return c;
				},
				/** @private */
				_toRadialGradient: function( color, stops, coords ) {
					var id = 'grd' + this._id + color.replace( '#', '' ) + 'r' + ( coords != undefined ? coords.key : '' );

					var url = 'url(' + this.getWindowHref() + '#' + id + ')';
					if ( this._gradients[ url ] )
						return url;

					var gr = document.createElementNS( this._svgns, 'radialGradient' );
					if ( coords == undefined )
						this.attr( gr, {
							cx: '50%',
							cy: '50%',
							r: '100%',
							fx: '50%',
							fy: '50%',
							id: id
						} );
					else
						this.attr( gr, {
							cx: coords.x,
							cy: coords.y,
							r: coords.outerRadius,
							id: id,
							gradientUnits: 'userSpaceOnUse'
						} );
					stops = [
						[ 0, 0 ],
						[ 80, 0 ],
						[ 81, -20 ],
						[ 100, -20 ]
					];

					function adjustColor( col, amt ) {
						var usePound = false;

						if ( col[ 0 ] == "#" ) {
							col = col.slice( 1 );
							usePound = true;
						}

						var num = parseInt( col, 16 );

						var r = ( num >> 16 ) + amt;

						if ( r > 255 ) r = 255;
						else if ( r < 0 ) r = 0;
						var b = ( ( num >> 8 ) & 0x00FF ) + amt;

						if ( b > 255 ) b = 255;
						else if ( b < 0 ) b = 0;

						var g = ( num & 0x0000FF ) + amt;

						if ( g > 255 ) g = 255;
						else if ( g < 0 ) g = 0;
						return ( usePound ? "#" : "" ) + String( "000000" + ( g | ( b << 8 ) | ( r << 16 ) ).toString( 16 ) ).slice( -6 );
					}
					for ( var i = 0; i < stops.length; i++ ) {
						var stop = stops[ i ];
						var s = document.createElementNS( this._svgns, 'stop' );
						var st = 'stop-color:' + adjustColor( color, stop[ 1 ] );
						this.attr( s, {
							offset: stop[ 0 ] + '%',
							style: st
						} );
						gr.appendChild( s );
					}
					this._defs.appendChild( gr );
					this._gradients[ url ] = true;
					return url;
				}
			} );
		}

	} )( $ );


	//combobox.js
	( function( $ ) {

		$( document ).on( 'click.bs.dropdown.data-api', '[data-toggle="dropdown"]', function() {
			if ( !$( this ).parents( ".combobox" ).hasClass( "n-page-combox" ) ) {
				$( ".n-page-combox" ).removeClass( "combobox-open" );
			}

			var cbOpen = $( ".combobox-open" );
			if ( cbOpen.length !== 0 ) {
				if ( cbOpen.find( "button" ).get( 0 ) !== $( this ).get( 0 ) ) {
					cbOpen.toggleClass( 'combobox-open' );
				}
			}

			if ( $( this ).parents( ".combobox" ).length !== 0 ) {
				$( this ).parents( ".combobox" ).toggleClass( 'combobox-open' );
			}

			var comboBox = $( this ).parents( ".combobox" );
			if ( $( comboBox ).hasClass( "combobox-filter" ) ) {
				var inputFiled = comboBox.find( "input" );
				inputFiled.focus();
				if ( $( comboBox ).hasClass( "combobox-open" ) ) {
					$( inputFiled ).on( "input", function() {
						doFilter( comboBox );
					} );

					var allItems = comboBox.find( "ul li" );
					var size = allItems.size();
					for ( var i = 0; i < size; i++ ) {
						$( allItems[ i ] ).removeClass( "combobox-item-hidden" );
					}
				} else {
					inputFiled.unbind( "input" );
				}

				comboBox.find( "ul" ).addClass( "combobox-filter-dropdown-menu" );
			}
		} );

		$( document ).on( 'keydown', '.combobox input', function( e ) {
			var comboBox = $( this ).parent( ".combobox" );
			if ( e.which === 38 || e.which === 40 ) {
				e.preventDefault();
				var a = jQuery.Event( "keydown" );
				a.which = e.which;
				comboBox.find( "button.dropdown-toggle" ).trigger( a );
				comboBox.find( "button.dropdown-toggle" ).focus();
			}
			if ( comboBox.hasClass( "combobox-filter" ) && !comboBox.hasClass( "combobox-open" ) ) {
				if ( ( e.which === 229 || e.which === 65 ) || ( e.which >= 48 && e.which <= 57 ) || ( e.which > 65 && e.which <= 111 ) || ( e.which >= 186 && e.which <= 222 ) ) {
					comboBox.find( "button.dropdown-toggle" ).trigger( "click" );
				}
			}
		} );

		$( document ).on( 'click.bs.dropdown.data-api', function() {
			var cbOpen = $( ".combobox-open" );
			if ( cbOpen.length !== 0 ) {
				if ( cbOpen.hasClass( "combobox-filter" ) ) {

					if ( !cbOpen.find( "input" ).is( ":focus" ) ) {
						cbOpen.find( "input" ).unbind( "input" );
						cbOpen.removeClass( 'combobox-open' );
					} else {
						cbOpen.find( ".input-group-btn" ).addClass( "open" );
						cbOpen.find( "button" ).attr( "aria-expanded", "true" );
					}
				} else {
					cbOpen.removeClass( 'combobox-open' );
				}
			}
		} );

		function getCurrentStrWidth( text, element ) {
			var currentObj = $( '<span>' ).hide().appendTo( document.body );
			if ( element.css( "font" ) !== "" ) {
				$( currentObj ).html( text ).css( "font", element.css( "font" ) );
			} else {
				$( currentObj ).html( text ).css( "font-size", element.css( "font-size" ) );
			}
			var width = currentObj.width();
			currentObj.remove();
			return width;
		}

		function showDropdownItemTooltip() {
			/*jshint validthis:true */
			var $selectedElement = $( this );
			$selectedElement.removeAttr( "data-original-title" );
			$selectedElement.removeAttr( "title" );
			var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
			var currentWidth = getCurrentStrWidth( $span.html(), $span );
			if ( currentWidth > $selectedElement.width() ) {
				$span.addClass( "active" );
				$span.css( "border-bottom-color", "transparent" );
				$selectedElement.attr( "data-original-title", $( $span ).html() );
				$selectedElement.tooltip( "show" );
			} else {
				$selectedElement.tooltip( "hide" );
			}
		}
		$( document )
			.on( "mouseenter", ".dropdown .dropdown-menu li a", showDropdownItemTooltip )
			.on( "focus", ".dropdown .dropdown-menu li a", showDropdownItemTooltip )
			.on( "mouseleave", ".dropdown .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "blur", ".dropdown .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "mouseenter", ".n-combobutton .dropdown-menu li a", showDropdownItemTooltip )
			.on( "focus", ".n-combobutton .dropdown-menu li a", showDropdownItemTooltip )
			.on( "mouseleave", ".n-combobutton .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "blur", ".n-combobutton .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} );

		function doFilter( comboBox ) {
			if ( comboBox.find( "ul" ).length !== 0 ) {
				var allItems = comboBox.find( "ul li" );
				var size = allItems.size();
				if ( comboBox.find( "input" ).val() !== "" ) {
					var inputText = comboBox.find( "input" ).val();
					var reg = "/" + inputText.replace( /\*/g, ".*" ) + "/gi";
					for ( var i = 0; i < size; i++ ) {
						if ( eval( reg ).test( allItems[ i ].textContent ) ) {
							$( allItems[ i ] ).removeClass( "combobox-item-hidden" );
						} else {
							$( allItems[ i ] ).addClass( "combobox-item-hidden" );
						}
					}
				} else {
					for ( var j = 0; j < size; j++ ) {
						$( allItems[ j ] ).removeClass( "combobox-item-hidden" );
					}
				}
			}
		}

		$( document ).on( 'keyup change', '.n-cancel-button input', function( event ) {
			var inputValue = event.target.value;
			var controlIcon = $( event.target ).next( '.n-clear-button-icon' );
			if ( inputValue.length > 0 ) {
				controlIcon.show();
			} else {
				controlIcon.hide();
			}
		} );

		$( document ).on( 'click', '.n-clear-button-icon', function() {
			var prev = $( this ).prev();
			if ( prev.hasClass( "n-inputfield" ) ) {
				$( this ).hide();
				prev.val( "" );
				prev.focus();
			}
		} );
		$( document ).ready( function() {
			$( document ).on( 'shown.bs.dropdown', '.combobox, .n-combobutton', function() {
				$( this ).find( 'ul.dropdown-menu li a' ).each( function() {
					var $this = $( this );
					var hasTooltip = $this.attr( 'data-toggle' ) === "tooltip";
					var hasEllipsis = $this[ 0 ].offsetWidth < $this[ 0 ].scrollWidth;

					if ( hasEllipsis ) {
						if ( !hasTooltip ) {
							$this.attr( 'title', $this.text() );
							$this.attr( 'data-toggle', "tooltip" );
							$this.attr( 'data-placement', "right" );
							$this.tooltip();
						} else {
							$this.tooltip( 'enable' );
						}
					} else if ( hasTooltip && !hasEllipsis ) {
						$this.tooltip( 'disable' );
					}
				} );
			} );
		} );

		// COMBOBOX KEYBOARD ACCESSIBILITY
		// ===============================
		function comboboxKeyboardHandler( e ) {
			var current = $( e.target );
			if ( e.keyCode === 13 || e.keyCode === 32 ) {
				if ( current.hasClass( 'n-filter-clear-control' ) ) {
					e.preventDefault();
					current.find( 'span' ).trigger( 'click' );
				}
				if ( current.hasClass( 'n-clear-button-icon' ) ) {
					e.preventDefault();
					current.trigger( 'click' );
				}
			} else if ( 9 === e.keyCode ) {
				blurInDropdown( e );
			}
		}

		function blurInDropdown( e ) {
			var current = $( e.target );
			if ( 9 === e.keyCode && e.shiftKey ) {
				if ( ( current[ 0 ].tagName === 'INPUT' ) && $( e.currentTarget ).hasClass( 'combobox-open' ) ) {
					$( e.currentTarget ).find( "button.dropdown-toggle" ).trigger( 'click' );
				} else if ( current.hasClass( 'n-combobutton-btn' ) && $( e.currentTarget ).hasClass( 'open' ) ) {
					$( e.currentTarget ).find( "button.dropdown-toggle" ).trigger( 'click' );
				}
			} else if ( 9 === e.keyCode && !e.shiftKey ) {
				if ( ( current[ 0 ].tagName === 'A' ) && ( current.parent().nextAll( ':not(.disabled)' ).length === 0 ) ) {
					$( e.currentTarget ).find( "button.dropdown-toggle" ).trigger( 'click' );
				}
			}
		}

		$( document ).on( 'keydown.wf.combobox.keyboard', '.combobox', comboboxKeyboardHandler );
		$( document ).on( 'keydown.wf.combobox.keyboard', '.n-combobutton', blurInDropdown );

	} )( $ );


	//dlg-wizard.js
	( function( $ ) {

		$.fn.extend( {
			initWizard: function() {
				$( this ).bootstrapWizard( {
					nextSelector: '.button-next',
					previousSelector: '.button-previous',
					firstSelector: '.button-first',
					lastSelector: '.button-last'
				} );

				// init steps width
				var $steps = $( this ).find( ".navbar-inner>ul>li" );
				var distance = ( 100 / ( $steps.length - 1 ) ).toFixed( 3 );
				var remainder = ( 40 / ( $steps.length - 1 ) );
				$steps.not( ":last-child" ).css( "width", "calc(" + distance + "% - " + remainder + "px)" );
			}
		} );

		$( ".n-dlg-wizard" ).on( "click", ".modal-footer>input[type=button]", function() {
			var activeTab = $( this ).closest( ".modal-footer" ).prev( ".modal-body" ).find( "li.active" );
			addPassStyle( activeTab );
		} );

		$( document ).on( 'click.bs.modal.data-api', '[data-toggle="modal"]', function() {
			var $wizard = $( ".n-dlg-wizard.in" );
			if ( $wizard.length > 0 ) {
				// set next button as focus and reset to the first step
				$wizard.find( "input[type=button][name=next]" ).focus();
				$wizard.find( "input[type=button][name=first]" ).trigger( "click" );
			}
		} );

		function addPassStyle( activeTab ) {
			activeTab.removeClass( "passed" ).siblings( "li" ).removeClass( "passed" );
			var $passedSteps = activeTab.prevAll( "li" );
			if ( $passedSteps.length > 0 ) {
				$passedSteps.addClass( "passed" );
			}
		}

	} )( $ );


	//drag.js
	( function( $ ) {

		var Drag = function( el, opt ) {
			opt = $.extend( {
				handle: "",
				cursor: "move"
			}, opt );
			var dragObject = this;
			el = $( el );
			dragObject.init = function() {
				el.css( 'cursor', opt.cursor );
				var $drag = el.parent().addClass( 'draggable' );
				var zIdx, drgH, drgW, posY, posX;
				el.get( 0 ).addEventListener( 'mousedown', initDrag, false );

				function initDrag( e ) {
					zIdx = $drag.css( 'z-index' );
					drgH = $drag.outerHeight();
					drgW = $drag.outerWidth();
					posY = $drag.offset().top + drgH - e.pageY;
					posX = $drag.offset().left + drgW - e.pageX;
					$drag.css( 'z-index', 1000 );
					document.documentElement.addEventListener( 'mousemove', doDrag, false );
					document.documentElement.addEventListener( 'mouseup', stopDrag, false );
				}

				function doDrag( e ) {
					var top = e.pageY + posY - drgH;
					var left = e.pageX + posX - drgW;


					// check if target is outside fo window
					if ( top < -20 ) {
						top = -20;
					}
					if ( top > window.innerHeight - drgH / 2 ) {
						top = window.innerHeight - drgH / 2;
					}
					if ( left < -drgH * 0.8 ) {
						left = -drgH * 0.8;
					}
					if ( left > window.innerWidth - drgH / 2 ) {
						left = window.innerWidth - drgH / 2;
					}

					$drag.offset( {
						top: top,
						left: left
					} );
					e.preventDefault();
				}

				function stopDrag() {
					$drag.removeClass( 'draggable' ).css( 'z-index', zIdx );
					document.documentElement.removeEventListener( 'mousemove', doDrag, false );
					document.documentElement.removeEventListener( 'mouseup', stopDrag, false );
				}
			};

			dragObject.init();
		};

		var HTMLAttributes = function() {
			var input = $( this ),
				options = {},
				drag = ( input.attr( 'data-drag' ) === 'true' || input.attr( 'data-drag' ) === 'True' );

			if ( drag ) {
				return input.data( 'wf.dragable', new Drag( this, options ) );
			}
		};

		var globalsDrag = {
			dragElements: 'div',
			dataDragAttr: '*[data-drag]'
		};

		var applyDataDrag = function( selector ) {
			selector = selector || globalsDrag.dragElements;
			var $selector = ( selector instanceof $ ) ? selector : $( selector );
			$selector.filter( globalsDrag.dataDragAttr ).each( HTMLAttributes );
		};

		var old = $.fn.dragable;

		$.fn.dragable = function( options ) {
			options = options || {};
			var dragFunction = function() {
				return $( this ).data( 'wf.dragable', new Drag( this, options ) );

			};
			$( this ).each( dragFunction );
			return this;
		};

		$.fn.dragable.noConflict = function() {
			$.fn.dragable = old;
			return this;
		};

		$( document ).ready( function() {
			applyDataDrag( 'div' );
		} );

	} )( $ );


	//drawer.js
	( function( $ ) {

		var $flyout = $( '.n-flyout' );
		if ( $flyout.has( ".n-drawer-tabs" ) ) {
			$flyout.on( 'click', '.n-drawer-tabs a', function() {
				var $li = $( this ).parent( 'li' );
				var id = $( this ).attr( 'href' );
				setTimeout( function() {
					$li.parent( 'ul' ).find( 'li' ).each( function() {
						$( this ).removeClass( 'focus' ).removeClass( 'before-focused' ).removeClass( 'after-focused' );
						$( this ).removeClass( 'selected' ).removeClass( 'before-selected' ).removeClass( 'after-selected' ).removeClass( 'tab-selected' );
					} );
					$li.addClass( 'selected' );
					$li.addClass( 'tab-selected' );
					$li.next( 'li' ).addClass( 'after-selected' );
					$li.prev( 'li' ).addClass( 'before-selected' );

					$( '.n-flyout-container' ).hide();
					id = id.replace( '#', '' );
					$( '#' + id ).show();
				}, 50 );

			} );
			$( document ).on( 'focus', '.n-drawer-tabs > li > a', function() {
				var $li = $( this ).parent( 'li' );
				$li.parent( 'ul' ).find( 'li' ).each( function() {
					$( this ).removeClass( 'focus' ).removeClass( 'before-focused' ).removeClass( 'after-focused' );
					$( this ).removeClass( 'selected' ).removeClass( 'before-selected' ).removeClass( 'after-selected' );
				} );
				$li.addClass( 'focus' );
				$li.next( 'li' ).addClass( 'after-focused' );
				$li.prev( 'li' ).addClass( 'before-focused' );
			} );

			$flyout.on( 'click', '.drawer-toggle-up', function() {
				$( this ).removeClass( 'drawer-toggle-up' ).addClass( 'drawer-toggle-down' );
				$( '.n-flyout-open' ).trigger( 'click' );
			} );

			$flyout.on( 'click', '.drawer-toggle-down', function() {
				$( this ).removeClass( 'drawer-toggle-down' ).addClass( 'drawer-toggle-up' );
				$( '.n-flyout-open' ).find( '.selected' ).trigger( 'click' );
			} );
		}

	} )( $ );


	//drilldown.js
	( function( $ ) {

		var Drilldown = {
			toggle: function( e ) {
				var $table = $( this ).closest( 'table' );

				initDrilldownContentBottomRadius( $table );

				if ( isFunctionKey( e ) ) {
					return;
				}

				var isSelected, isExpanded;
				if ( $( this ).is( 'tr' ) ) {
					isSelected = true;
					isExpanded = $( this ).find( 'td' ).data( 'expanded' );
				} else {
					isSelected = $( this ).hasClass( 'n-drilldown-item-selected' );
					isExpanded = $( this ).data( 'expanded' );
				}
				var targetContent = $( $( this ).data( 'targetSelector' ) );

				//collapseSiblingsContentIfNeeded(targetContent);
				if ( isExpanded === true && isSelected === true ) {
					collapseDrilldownContent( targetContent );
				} else {
					var arrowDistance = $( this ).position().left + $( this ).width() / 2;
					var arrowDistancePxValue = arrowDistance + 'px';

					if ( isExpanded === true && isSelected === false ) {
						selectDrilldownContent( targetContent, $( this ), arrowDistancePxValue );
					} else {
						expandDrilldownContent( targetContent, $( this ), arrowDistancePxValue );
					}
				}

			},

			collapse: function( e ) {
				if ( e.keyCode === 27 || typeof( e.keyCode ) === "undefined" ) {
					var content, row;
					if ( $( this ).is( 'span' ) ) {
						content = $( this ).closest( '.n-drillDown-collapsed' );
						row = $( this ).closest( ".n-drillDown-collapsed-row" );
					} else if ( $( this ).is( 'button' ) ) {
						content = $( this ).closest( '.n-drillDown-collapsed' );
						row = $( this ).closest( ".n-drillDown-collapsed-row" );
					} else if ( $( this ).is( 'table' ) ) {
						content = $( this ).find( '.n-drillDown-collapsed' );
						row = $( this ).find( ".n-drillDown-collapsed-row" );
					}

					if ( content.length > 0 ) {
						collapseDrilldownContent( content );
					} else if ( row.length > 0 ) {
						collapseDrilldownRow( row );
					}
				}
			},

			relocateArrow: function() {
				var drilldownItem = $( '.n-drilldown-item-selected' );
				if ( drilldownItem.length === 0 ) {
					return;
				}
				var arrowDistance = drilldownItem.position().left + drilldownItem.width() / 2;
				var arrowDistancePxValue = arrowDistance + "px";
				$( ".n-drillDown-arrow" ).css( "left", arrowDistancePxValue );
			}
		};

		// DRILLDOWN INTERNAL METHODS
		// ==========================

		function collapseDrilldownContent( content ) {
			content.slideUp( function() {
				var $table = $( this ).closest( 'table' );
				setBottomRadius( $table, '7' );
			} );
			itemCollapse( content );
		}

		function selectDrilldownContent( content, item, arrowDistance ) {
			$( '.n-drillDown-arrow' ).animate( {
				left: arrowDistance
			} );
			if ( content.parent().is( 'wf-drilldown' ) ) {
				content.parent().show().siblings().children().stop( true, true ).hide();
				content.show();
			} else {
				content.show().siblings().stop( true, true ).hide();
			}
			itemSelect( item );
		}

		function expandDrilldownContent( content, item, arrowDistance ) {
			$( '.n-drillDown-collapsed' ).hide();
			$( '.n-drillDown-collapsed-row' ).hide();
			$( '.n-drillDown-arrow' ).css( 'left', arrowDistance );
			itemCollapse( content );

			content.slideDown();
			var $table = item.closest( 'table' );
			var lastRowHeight = $table.find( "tr:last" ).height();
			if ( lastRowHeight > 0 ) {
				setBottomRadius( $table, '0' );
			} else {
				setBottomRadius( $table, '7' );
			}
			itemExpand( item );
		}

		function collapseDrilldownRow( row ) {
			row.slideUp( function() {
				var $table = $( this ).closest( 'table' );
				setBottomRadius( $table, '7' );
			} );
		}

		function initDrilldownContentBottomRadius( table ) {
			var drilldownInner = table.find( 'tr:last-child' ).find( '.n-drillDown-inner' );
			drilldownInner.css( 'border-bottom-left-radius', '7px' ).css( 'border-bottom-right-radius', '7px' );
			var drilldownContent = table.find( 'tr:last-child' ).find( '.n-drillDown-content' );
			drilldownContent.css( 'border-bottom-left-radius', '7px' ).css( 'border-bottom-right-radius', '7px' );
		}

		function isFunctionKey( e ) {
			var ctrlKeyPressed = ( window.event && window.event.ctrlKey ) || e.ctrlKey;
			var shiftKeyPressed = ( window.event && window.event.shiftKey ) || e.shiftKey;
			return ctrlKeyPressed || shiftKeyPressed;
		}

		function setBottomRadius( table, radius ) {
			table.find( 'tr:nth-last-child(2)' ).find( 'td:first-child' ).css( 'border-bottom-left-radius', radius + 'px' );
			table.find( 'tr:nth-last-child(2)' ).find( 'td:last-child' ).css( 'border-bottom-right-radius', radius + 'px' );
		}

		function itemExpand( item ) {
			$( item ).children( 'span' ).addClass( 'n-drillDown-cell' );
			if ( item.is( 'td' ) ) {
				item.siblings( 'td' ).removeClass( 'n-drilldown-item-selected' );
				item.addClass( 'n-drilldown-item-selected' );
				item.data( 'expanded', true );
				item.siblings( 'td' ).data( 'expanded', true );
			} else {
				item.find( 'td' ).data( 'expanded', true );
			}
		}

		function itemCollapse( content ) {
			content.closest( 'table' ).find( 'td' ).each( function() {
				$( this ).data( 'expanded', false );
				$( this ).removeClass( 'n-drilldown-item-selected' );
			} );
		}

		function itemSelect( item ) {
			if ( item.is( 'td' ) ) {
				item.siblings( 'td' ).removeClass( 'n-drilldown-item-selected' );
				item.addClass( 'n-drilldown-item-selected' );
			}
		}

		function collapseSiblingsContentIfNeeded( targetContent ) {
			if ( targetContent.parent().is( 'wf-drilldown' ) ) {
				targetContent.parent().siblings().each( function( index, value ) {
					collapseDrilldownContent( $( $( value ).children()[ 0 ] ) );
				} );
			}
		}

		$( document ).ready( function() {
			$( "td.n-drillDown-item" ).attr( "tabindex", 0 );
			$( "tr.n-drillDown-row" ).find( 'td' ).not( '.text-center' ).attr( "tabindex", 0 );
		} );
		$( document )
			.on( 'click.wf.drilldown', '.n-drillDown-item', Drilldown.toggle )
			.on( 'click.wf.drilldown', '.n-drillDown-row', Drilldown.toggle )
			.on( 'click.wf.drilldown', '.n-drillDown-content .icon-close-rounded', Drilldown.collapse )
			.on( 'click.wf.drilldown', '.n-drillDown-collapsed-row .icon-close-rounded', Drilldown.collapse )
			.on( 'click.wf.drilldown', '.n-drillDown-content .btn-close', Drilldown.collapse )
			.on( 'click.wf.drilldown', '.n-drillDown-collapsed-row .btn-close', Drilldown.collapse )
			.on( 'keyup.wf.drilldown.keyboard', '.n-drilldown-table', Drilldown.collapse );


		$( window ).on( 'resize.wf.drilldown', Drilldown.relocateArrow );

		return Drilldown;

	} )( $ );


	//flyout-activity-area.js
	( function( $ ) {

		var $flyout = $( '.n-flyout' );
		if ( $flyout.has( ".n-flyout-activity-area-tabs" ) ) {
			$flyout.on( 'click', '.n-flyout-activity-area-tabs a', function() {
				var $li = $( this ).parent( 'li' );
				var id = $( this ).attr( 'href' );
				setTimeout( function() {
					$li.parent( 'ul' ).find( 'li' ).each( function() {
						$( this ).removeClass( 'selected' ).removeClass( 'before-selected' ).removeClass( 'after-selected' ).css( 'z-index', '' );
					} );
					$li.addClass( 'selected' );
					$li.next( 'li' ).addClass( 'after-selected' );
					$li.prev( 'li' ).addClass( 'before-selected' );
					$li.css( 'z-index', '1' );
					$( '.n-flyout-container' ).hide();
					$( '[data-target-selector=' + id + ']' ).show();
				}, 50 );

			} );

			$( document ).on( 'focus', '.n-flyout-activity-area-tabs > li > a', function() {
				var $li = $( this ).parent( 'li' );
				$li.parent( 'ul' ).find( 'li' ).each( function() {
					$( this ).removeClass( 'focus' ).removeClass( 'before-focused' ).removeClass( 'after-focused' ).css( 'z-index', '' );
				} );
				$li.addClass( 'focus' );
				$li.css( 'z-index', '1' );
				$li.next( 'li' ).addClass( 'after-focused' );
				$li.prev( 'li' ).addClass( 'before-focused' );
			} );

			$( document ).on( 'keydown.wf.flyoutActivity.keyboard', '.n-flyout', $.wfKBCore.commonKeyboardHandler );

			$( function() {
				$( '[data-markup^="flyout"]' ).each( function() {
					$( '.n-flyout-content' ).nScrollbar( {
						autoHideScrollbar: false,
						axis: "y"
					} );
					var $flyout = $( this );
					var $container = $flyout.find( "[data-target-selector='#one'].n-flyout-container" );
					var containerWidth = $container.outerWidth();
					var direction = $flyout.data( 'direction' );

					var headerHeight = $( $flyout.find( '[data-target-selector="#one"] .panel-heading' ) ).outerHeight();

					switch ( direction ) {
						case 'right':
							$flyout.css( "left", ( -containerWidth ) + "px" );
							var $openAnchor = $flyout.find( ".n-flyout-open" );
							$openAnchor.css( "left", ( containerWidth - 4 ) + "px" );
							$openAnchor.css( "top", ( headerHeight - 4 ) + "px" );
							var $li = $flyout.find( ".n-flyout-activity-area-tabs > li" );
							$.each( $li, function( i, item ) {
								if ( i > 0 ) {
									var offsetTop = $( item ).prev( 'li' ).offset().top + $( item ).height() * 2 / 3;
									$( item ).offset( {
										top: offsetTop
									} );
								}
							} );
							break;
					}
					$container.hide();
				} );
			} );
		}


	} )( $ );


	//gauge.js
	( function( $ ) {

	} )( $ );


	//grid.js
	( function( $ ) {

		jQuery.browser = {};
		jQuery.browser.mozilla = /mozilla/.test( navigator.userAgent.toLowerCase() ) && !/webkit/.test( navigator.userAgent.toLowerCase() );
		jQuery.browser.webkit = /webkit/.test( navigator.userAgent.toLowerCase() );
		jQuery.browser.opera = /opera/.test( navigator.userAgent.toLowerCase() );
		jQuery.browser.msie = /msie/.test( navigator.userAgent.toLowerCase() );

		var $jqxTable = $( '.n-jqxgrid-table' );
		$.grid = {
			/*---------------- nokia TextField render/editor ----------------*/
			nTextFieldCellRenderer: function( row, column, value ) {
				var gridId = $( this.element ).closest( '.jqx-grid' ).attr( 'id' );
				var disabled = $( "#" + gridId ).jqxGrid( 'disabled' );
				if ( disabled ) {
					return '<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1" disabled/>';
				}
				return '<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1"/>';
			},

			nCreateTextFieldEditor: function( row, cellValue, editor ) {
				// construct the editor.
				var element = $( '<input class="n-inputfield n-inputfield-small" />' );
				editor.append( element );

				editor.on( 'keydown', function( e ) {
					handleTabKey( e, $( this ), row );
				} );
			},

			nInitTextFieldEditor: function( row, cellValue, editor ) {
				// set the editor's current value. The callback is called each time the editor is displayed.
				var inputHTMLElement = editor.find( "input" );
				inputHTMLElement.val( cellValue );
				setTimeout( function() {
					inputHTMLElement.focus();
				}, 50 );
			},

			nGetTextFieldEditorValue: function( row, cellValue, editor ) {
				return editor.find( "input" ).val();
			},

			/*---------------- nokia Indicator textField render/editor ----------------*/
			nIndicatorTextFieldCellRenderer: function( gridId ) {
				return function( row, columnfield, value ) {
					var edited = '';
					$( gridId + " .n-grid-inputfield-indicated" ).each( function() {
						var idMatched = false;
						var id = $( this ).parent().attr( 'id' );
						if ( id !== undefined ) {
							if ( id.indexOf( columnfield + "_" + row ) >= 0 ) {
								idMatched = true;
							}
						}

						if ( $( this ).find( "input" ).val() === value && idMatched ) {
							if ( $( this ).find( ".icon" ).hasClass( "icon-edited-small" ) ) {
								edited = 'icon-edited-small';
							}
						}
					} );

					return '<div class="n-grid-inputfield-indicated">' +
						'<input class="n-inputfield n-inputfield-small" value="' + value + '" tabindex="-1">' +
						'<a class="form-control-feedback"><span class="icon ' + edited + '"></span></a>' +
						'</div>';
				};
			},

			nCreateIndicatorTextFieldEditor: function( row, cellValue, editor ) {
				// construct the editor.
				var gridId = editor.parent().attr( "id" ).replace( "contenttable", "" );
				var isIndicatedByCell = checkIndicatedByCell( editor );
				var element = '<div class="n-grid-inputfield-indicated">' +
					'<input class="n-inputfield n-inputfield-small"/>' +
					'<a class="form-control-feedback"><span class="icon"></span></a>' +
					'</div>';
				editor.append( element );
				var editorId = editor.attr( "id" );
				var inputHTMLElement = editor.find( "input" );
				inputHTMLElement.bind( 'input', function() {
					if ( inputHTMLElement.val() !== cellValue ) {
						if ( isIndicatedByCell ) {
							editor.find( ".icon" ).addClass( "icon-edited-small" );
						}
						$( "#" + gridId + " #n-row-indicated-" + row + " > span" ).addClass( "icon-edited-white" );
						addChangedCol( row, editorId, gridId );
					} else {
						editor.find( ".icon" ).removeClass( "icon-edited-small" );
						removeChangedCol( row, editorId, gridId );
					}
				} );

				editor.on( 'keydown', function( e ) {
					handleTabKey( e, $( this ), row );
				} );
			},

			nInitIndicatorTextFieldEditor: function( row, cellValue, editor ) {
				// set the editor's current value. The callback is called each time the editor is displayed.
				var inputHTMLElement = editor.find( "input" );
				inputHTMLElement.val( cellValue );
				inputHTMLElement.focus();
			},

			nGetIndicatorTextFieldEditorValue: function( row, cellValue, editor ) {
				return editor.find( "input" ).val();
			},

			/*---------------- nokia String Field render/editor ----------------*/
			nStringCellRenderer: function( row, columnfield, value, defaulthtml ) {
				var html = defaulthtml;
				if ( value.indexOf( '#errordata#' ) !== -1 ) {
					html = html.replace( 'class="', 'class="n-cell-error ' );
					html = html.replace( '#errordata#', '' );
				}
				return html;
			},

			/*---------------- nokia Number Field render/editor ----------------*/
			nNumberCellRenderer: function( row, columnfield, value, defaulthtml ) {
				var cellValue = value.toString();
				var html = defaulthtml;
				if ( cellValue.indexOf( '((' ) === 0 && cellValue.indexOf( '))' ) === cellValue.length - 2 ) {
					html = html.replace( 'class="', 'class="n-cell-error ' );
					html = html.replace( '((', '' );
					html = html.replace( '))', '' );
				}
				return html;
			},

			/*---------------- nokia Checkbox render/editor ----------------*/
			nCheckboxCellsrenderer: function( checkLabel ) {
				var _checkLabel = checkLabel;

				return function( row, column, value ) {
					var gridId = $( this.element ).closest( '.jqx-grid' ).attr( 'id' );
					var disabled = $( "#" + gridId ).jqxGrid( 'disabled' );
					var checkboxId = 'cb' + row + Date.now();
					return '<div class="checkbox checkbox-small">' +
						'<input id="' + checkboxId + '" type="checkbox" ' + ( value ? ' checked="true"' : '' ) + ' tabindex="-1" ' + ( disabled ? ' disabled ' : '' ) + '/>' +
						'<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
						'</div>';
				};
			},
			nCreateCheckboxEditor: function( checkLabel ) {
				var _checkLabel = checkLabel;
				return function( row, value, editor ) {
					// construct the editor.
					var checkboxId = 'cb' + row + Date.now();
					var target = ( value ) ? ' checked="true"' : '';
					var element = '<div class="checkbox checkbox-small margin-add-one">' +
						'<input id="' + checkboxId + '" type="checkbox" ' + ( target ) + '/>' +
						'<label for="' + checkboxId + '">' + _checkLabel + '</label>' + '</div>';
					editor.append( element );

					editor.on( 'keydown', function( e ) {
						handleTabKey( e, $( this ), row );
					} );
				};
			},

			nInitCheckboxEditor: function( row, cellValue, editor ) {
				// set the editor's current value. The callback is called each time the editor is displayed.
				var inputHTMLElement = editor.find( "input" );
				var current = inputHTMLElement.prop( "checked" );
				inputHTMLElement.prop( {
					checked: !current
				} );
				inputHTMLElement.prop( "checked" );
				inputHTMLElement.focus();
			},
			nGetCheckboxEditorValue: function( row, cellValue, editor ) {
				var inputHTMLElement = editor.find( "input" );
				return inputHTMLElement.prop( "checked" );
			},
			/*---------------- nokia Indicator Checkbox render/editor ----------------*/
			nIndicatorCheckboxCellsrenderer: function( gridId, checkLabel ) {
				var _checkLabel = checkLabel;
				return function( row, column, value ) {
					var edited = '';
					var orignalValue = '';
					$( gridId + " .grid-checkbox-indicated" ).each( function() {
						var idMatched = false;
						var id = $( this ).parent().attr( 'id' );
						if ( id !== undefined ) {
							if ( id.indexOf( column + "_" + row ) >= 0 ) {
								idMatched = true;
							}
						}

						if ( idMatched ) {
							if ( $( this ).find( ".icon" ).hasClass( "icon-edited-small" ) ) {
								edited = 'icon-edited-small';
							}
							if ( $( this ).find( ".icon" ).hasClass( "icon-edited-small-white" ) ) {
								edited = 'icon-edited-small-white';
							}
							orignalValue = $( this ).find( "input" ).attr( "orignal-value" );
						}
					} );
					var checkboxId = 'cb' + row + Date.now();
					return '<div id="indicator-checkbox-' + row + '" class="checkbox checkbox-small grid-checkbox-indicated">' +
						'<input id="' + checkboxId + '" type="checkbox" ' + ( value ? ' checked="true"' : '' ) + ' orignal-value="' + orignalValue + '" tabindex="-1"/>' +
						'<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
						'<span class="icon align-right ' + edited + '"></span>' +
						'</div>';
				};
			},
			nCreateIndicatorCheckboxEditor: function( checkLabel ) {
				var _checkLabel = checkLabel;
				return function( row, value, editor ) {
					// construct the editor.
					var checkboxId = 'cb' + row + Date.now();
					var target = ( value ) ? ' checked="true"' : '';
					var element = '<div id="indicator-checkbox-' + row + '" class="checkbox checkbox-small margin-add-one grid-checkbox-indicated">' +
						'<input id="' + checkboxId + '" type="checkbox" ' + ( target ) + ' orignal-value="' + value + '"/>' +
						'<label for="' + checkboxId + '">' + _checkLabel + '</label>' +
						'<span class="icon align-right editor"></span>' + '</div>';
					editor.append( element );

					editor.on( 'keydown', function( e ) {
						handleTabKey( e, $( this ), row );
					} );
				};
			},

			nInitIndicatorCheckboxEditor: function( row, cellValue, editor ) {
				// set the editor's current value. The callback is called each time the editor is displayed.
				var gridId = editor.parent().attr( "id" ).replace( "contenttable", "" );
				var isIndicatedByCell = checkIndicatedByCell( editor );
				var inputHTMLElement = editor.find( "input" );
				var current = inputHTMLElement.prop( "checked" );
				inputHTMLElement.prop( {
					checked: !current
				} );
				inputHTMLElement.prop( "checked" );
				inputHTMLElement.focus();
				var editorId = editor.attr( "id" );
				if ( current.toString() === inputHTMLElement.attr( "orignal-value" ) ) {
					if ( isIndicatedByCell ) {
						editor.find( ".icon" ).addClass( "icon-edited-small-white" );
					}
					$( "#" + gridId + " #n-row-indicated-" + row + " > span" ).addClass( "icon-edited-white" );
					addChangedCol( row, editorId, gridId );
				} else {
					editor.find( ".icon" ).removeClass( "icon-edited-small-white" );
					removeChangedCol( row, editorId, gridId );
				}
				inputHTMLElement.change( function() {
					if ( inputHTMLElement.prop( "checked" ).toString() === inputHTMLElement.attr( "orignal-value" ) ) {
						editor.find( ".icon" ).removeClass( "icon-edited-small-white" );
						removeChangedCol( row, editorId, gridId );
					} else {
						if ( isIndicatedByCell ) {
							editor.find( ".icon" ).addClass( "icon-edited-small-white" );
						}
						$( "#" + gridId + " #n-row-indicated-" + row + " > span" ).addClass( "icon-edited-white" );
						addChangedCol( row, editorId, gridId );
					}
				} );
			},
			nGetIndicatorCheckboxEditorValue: function( row, cellValue, editor ) {
				var inputHTMLElement = editor.find( "input" );
				return inputHTMLElement.prop( "checked" );
			},
			/*---------------- nokia dropdownlist render/editor ----------------*/
			dropdownlistCellsrenderer: function( row, columnfield, value ) {
				var gridId = $( this.element ).closest( '.jqx-grid' ).attr( 'id' );
				var disabled = $( "#" + gridId ).jqxGrid( 'disabled' );

				return '<div class="btn-group selectlist selectlist-small selectlist-resize' + ( disabled ? ' disabled"' : '"' ) + 'data-resize="none" data-initialize="selectlist">' +
					'<button class="btn btn-default dropdown-toggle' + ( disabled ? ' disabled"' : '"' ) + 'data-toggle="dropdown" type="button" tabindex="-1"' + ( disabled ? ' disabled' : '' ) + '>' +
					'<span class="selected-label">' + value + '</span>' +
					'<span class="selected-caret" ><span class="caret"></span></span>' +
					'</button>' +
					'<ul class="dropdown-menu" role="menu">' +
					'<li data-value="1">' + '<a href="#">' + '<span>' + value + '</span>' + '</a>' + '</li>' +
					'</ul>' + '</div>';
			},

			dropdownlistEditor: function( dropdownlists ) {
				var _dropdownlists = dropdownlists;
				return function( row, cellValue, editor, cellText, width ) {
					editor.jqxDropDownList( {
						autoDropDownHeight: false,
						itemHeight: 27,
						dropDownHeight: '150px',
						scrollBarSize: 8,
						width: width - 4,
						height: 24,
						source: _dropdownlists.map( function( name ) {
							return "<span>" + name + "</span>";
						} )
					} );

					editor.on( 'keydown', function( e ) {
						handleTabKey( e, $( this ), row );
					} );
				};
			},

			dropdownlistInitEditor: function( row, cellValue, editor ) {
				editor.jqxDropDownList( 'selectItem', '<span>' + cellValue + '</span>' );
				editor.jqxDropDownList( 'focus' );
				editor.jqxDropDownList( 'open' );
			},

			dropdownlistEditorValue: function( row, cellValue, editor ) {
				return editor.val();
			},
			/*---------------- nokia dropdownlist render/editor ----------------*/
			indicatorDropdownlistCellsrenderer: function( gridId ) {
				return function( row, columnfield, value ) {
					var edited = '';
					$( gridId + " .grid-selectlist-indicated" ).each( function() {
						var idMatched = false;
						var id = $( this ).parent().attr( 'id' );
						if ( id !== undefined ) {
							if ( id.indexOf( columnfield + "_" + row ) >= 0 ) {
								idMatched = true;
							}
						}
						if ( idMatched ) {
							if ( $( this ).find( ".icon" ).hasClass( "icon-edited-small" ) ) {
								edited = 'icon-edited-small';
							}
						}
					} );

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

			indicatorDropdownlistEditor: function( dropdownlists ) {
				var _dropdownlists = dropdownlists;
				return function( row, cellValue, editor, cellText, width ) {
					var gridId = editor.parent().attr( "id" ).replace( "contenttable", "" );
					var isIndicatedByCell = checkIndicatedByCell( editor );
					var editorId = editor.attr( "id" );
					editor.jqxDropDownList( {
						autoDropDownHeight: false,
						itemHeight: 27,
						dropDownHeight: '150px',
						scrollBarSize: 8,
						width: width - 4,
						height: 24,
						source: _dropdownlists.map( function( name ) {
							return "<span>" + name + "</span>";
						} ),
						selectionRenderer: function() {
							var item = editor.jqxDropDownList( 'getSelectedItem' );
							if ( item !== null ) {
								if ( item.value.indexOf( cellText ) >= 0 ) {
									removeChangedCol( row, editorId, gridId );
									return item.value;
								} else {
									addChangedCol( row, editorId, gridId );
									$( "#" + gridId + " #n-row-indicated-" + row + " > span" ).addClass( "icon-edited-white" );
									if ( isIndicatedByCell ) {
										return item.value + '<div class="grid-selectlist-indicated"><a class="form-control-feedback"><span class="icon icon-edited-small"></span></a></div>';
									} else {
										return item.value;
									}
								}
							}
						}
					} );
					editor.on( 'keydown', function( e ) {
						handleTabKey( e, $( this ), row );
					} );
				};
			},

			indicatorDropdownlistInitEditor: function( row, cellValue, editor ) {
				editor.jqxDropDownList( 'selectItem', '<span>' + cellValue + '</span>' );
				editor.jqxDropDownList( 'focus' );
				editor.jqxDropDownList( 'open' );
			},

			indicatorDropdownlistEditorValue: function( row, cellValue, editor ) {
				return editor.val();
			},

			/*---------------- nokia indicator ----------------*/
			indicatorRenderer: function( gridId ) {
				return function( row ) {
					var edited = '';
					if ( $( gridId + " #n-row-indicated-" + row + " > span" ).hasClass( "icon-edited" ) ) {
						edited = "icon-edited";
					}
					if ( $( gridId + " #n-row-indicated-" + row + " > span" ).hasClass( "icon-edited-white" ) ) {
						edited = "icon-edited-white";
					}
					var changedCol = $( gridId + " #n-row-indicated-" + row ).attr( "changed-col" );
					if ( changedCol === undefined ) {
						changedCol = '';
					}
					return '<div id="n-row-indicated-' + row + '" class="n-row-indicated text-center" changed-col="' + changedCol + '"><span class="icon ' + edited + '"></span></div>';
				};

			},

			indicatorRowSelectRenderer: function( gridId ) {
				var $grid = $( gridId );
				$grid.bind( 'rowselect', function( event ) {
					var row = event.args.rowindex;
					$( gridId + " .n-row-indicated" ).each( function() {
						var icon = $( this ).find( "span" );
						if ( icon.hasClass( "icon-edited-white" ) ) {
							icon.removeClass( "icon-edited-white" );
							icon.addClass( "icon-edited" );
						}
					} );
					if ( $( gridId + " #n-row-indicated-" + row + " > span" ).hasClass( "icon-edited" ) ) {
						$( gridId + " #n-row-indicated-" + row + " > span" ).removeClass( "icon-edited" );
						$( gridId + " #n-row-indicated-" + row + " > span" ).addClass( "icon-edited-white" );
					}

					$( gridId + " .grid-checkbox-indicated" ).each( function() {
						var cbId = $( this ).attr( "id" );
						var icon = $( this ).find( "span" );
						if ( cbId.indexOf( row, cbId.length - row.length ) === -1 ) {
							if ( icon.hasClass( "icon-edited-small-white" ) ) {
								icon.removeClass( "icon-edited-small-white" );
								icon.addClass( "icon-edited-small" );
							}
						} else {
							if ( icon.hasClass( "icon-edited-small" ) ) {
								icon.removeClass( "icon-edited-small" );
								icon.addClass( "icon-edited-small-white" );
							}
						}
					} );
				} );
			},

			/*---------------- nokia dropdownlist filter ----------------*/
			dropdownFilterRender: function( column, columnElement, widget ) {
				widget.jqxDropDownList( {
					scrollBarSize: 8,
					placeHolder: "No filter",
					filterable: true,
					filterPlaceHolder: "Filter",
					searchMode: 'containsignorecase',
					renderer: function( index, label ) {
						return "<span>" + label + "</span>";
					}
				} );
			},

			dropdownFilterString: {
				filterchoosestring: "No filter"
			},

			//update the total information for paging bar on bottom-left
			updatePageInfor: function( gridID, totalRows, pagescount ) {
				var filterResult = $( gridID ).find( ".n-table-paging-left .n-table-data-total" );
				filterResult.text( 'Total: ' + totalRows );
				if ( pagescount ) {
					var pagescountField = $( gridID ).find( '.pageField span' ).get( 1 );
					$( pagescountField ).html( '/ ' + pagescount );
				}

			},

			/*---------------- nokia paging render ----------------*/
			pagerrenderer: function( gridId, showPageAndFilter, pagesizeSource ) {
				var $grid = $( gridId );
				var element = $( "<div class=\"page-container\"></div>" );
				var datainfo = $grid.jqxGrid( 'getdatainformation' );
				var paginginfo = datainfo.paginginformation;
				var pagescount = paginginfo.pagescount;

				if ( showPageAndFilter ) {
					appendFilterPageLeft();
					addFilterEvent();
					appendMiddle();
					appendRight( pagesizeSource );
				} else {
					var filterable = $grid.jqxGrid( 'filterable' );
					if ( filterable ) {
						appendFilterPageLeft();
						addFilterEvent();
					} else {
						appendLeft();
						appendMiddle();
						appendRight( pagesizeSource );
					}
				}

				function addFilterEvent() {
					$grid.on( "filter", function() {
						var filterRows = $grid.jqxGrid( 'getrows' );
						var dataRows = $grid.jqxGrid( 'getboundrows' );
						var filterPageLeft = $grid.find( ".n-table-paging-left" );

						if ( dataRows.length === filterRows.length ) {
							filterPageLeft.removeClass( "has-filter" );
							filterPageLeft.addClass( "no-filter" );
						} else {
							filterPageLeft.removeClass( "no-filter" );
							filterPageLeft.addClass( "has-filter" );
							$( filterPageLeft ).find( ".n-table-filter-result span" ).html( filterRows.length );
						}
						setTimeout( recalculateScrollbars, 50 );
					} );
				}

				function appendFilterPageLeft() {
					var totalItem = $( "<span class=\"n-table-paging-left no-filter\"><span class=\"icon icon-filter\"></span><span class=\"n-table-filter-result\">Results: <span></span></span><span class='n-table-data-total'>Total: " + datainfo.rowscount + "</span></span>" );
					totalItem.appendTo( element );
				}

				function appendLeft() {
					var totalItem = $( "<span class=\"n-table-paging-left\"><span class='n-table-data-total'>Total:" + datainfo.rowscount + "</span></span>" );
					totalItem.appendTo( element );
				}

				function appendMiddle() {
					var centerField = $( "<div class=\"n-table-paging-middle\"></div>" );

					var firstButton = $( "<button class=\"btn btn-icon page-first\" ><span class=\"icon icon-first\"></span></button>" );
					var prevButton = $( "<button class=\"btn btn-icon page-prev\" ><span class=\"icon icon-back\"></span></button>" );

					var pageField = $( "<div class='pageField'></div>" );
					var pageInput = $( "<input type=\"text\" class=\"n-inputfield n-inputfield-small\" />" );
					$( "<span>Page</span>" ).appendTo( pageField );
					pageInput.appendTo( pageField );
					$( "<span>\/ " + pagescount + "</span>" ).appendTo( pageField );


					var nextButton = $( "<button class=\"btn btn-icon page-next\" ><span class=\"icon icon-next\"></span></button>" );
					var lastButton = $( "<button class=\"btn btn-icon page-last\" ><span class=\"icon icon-last\"></span></button>" );

					firstButton.appendTo( centerField );
					prevButton.appendTo( centerField );
					pageField.appendTo( centerField );
					nextButton.appendTo( centerField );
					lastButton.appendTo( centerField );
					centerField.appendTo( element );

					pageInput.val( parseInt( paginginfo.pagenum ) + 1 );

					firstButton.on( 'click', function() {
						$grid.jqxGrid( 'gotopage', 0 );
						setTimeout( recalculateScrollbars, 50 );
					} );

					firstButton.off( 'keydown' ).on( 'keydown', function( e ) {
						if ( e.which === 9 && e.shiftKey ) {
							e.preventDefault();
							var id = $( this ).closest( '.jqx-widget-content' ).attr( 'id' );
							$( '#wrapper' + id ).trigger( 'focus' );
						}
					} );

					prevButton.off( 'click' ).on( 'click', function() {
						$grid.jqxGrid( 'gotoprevpage' );
						setTimeout( recalculateScrollbars, 50 );
					} );

					nextButton.off( 'click' ).on( 'click', function() {
						$grid.jqxGrid( 'gotonextpage' );
						setTimeout( recalculateScrollbars, 50 );
					} );

					lastButton.off( 'click' ).on( 'click', function() {
						$grid.jqxGrid( 'gotopage', pagescount );
						setTimeout( recalculateScrollbars, 50 );
					} );

					pageInput.off( 'change' ).on( 'change', function() {
						goToPage( $( this ).val() );
						setTimeout( recalculateScrollbars, 50 );
					} );

					pageInput.off( 'keydown' ).on( 'keydown', function( event ) {
						if ( event.keyCode === 13 ) {
							goToPage( pageInput.val() );
						}
					} );

					$grid.off( 'pagechanged' ).on( 'pagechanged', function() {
						var datainfo = $grid.jqxGrid( 'getdatainformation' );
						var paginginfo = datainfo.paginginformation;
						pageInput.val( parseInt( paginginfo.pagenum ) + 1 );
						setTimeout( recalculateScrollbars, 50 );
					} );

					function goToPage( inputVal ) {
						var pageIndex = parseInt( inputVal ) - 1;
						$grid.jqxGrid( 'gotopage', pageIndex );
					}
				}

				function appendRight( pagesizeSource ) {
					var perPageField = $( "<div class='n-table-paging-right'></div>" );
					var perPageCombo = $( "<div id=\"" + gridId + "jqxPerPageCombo" + "\"></div>" );
					var index = $grid.jqxGrid( 'pagesize' );
					var pSource = [ 10, 20, 30 ];
					if ( pagesizeSource !== undefined ) {
						pSource = pagesizeSource;
					}
					var selectedIndex = pSource.indexOf( index );
					perPageCombo.jqxComboBox( {
						source: pSource,
						width: 60,
						height: 24,
						selectedIndex: selectedIndex,
						autoDropDownHeight: true,
						enableBrowserBoundsDetection: true,
						renderer: function( index, label ) {
							return "<span>" + label + "</span>";
						}
					} );

					perPageCombo.appendTo( perPageField );
					$( "<span>Items per page</span>" ).appendTo( perPageField );

					perPageField.appendTo( element );

					perPageCombo.on( 'open', function() {
						$( "div[id^='dropdownlistContent'] > input" ).attr( "readonly", "readonly" );
					} );
					perPageCombo.off( 'change' ).on( 'change', function( event ) {
						var args = event.args;
						if ( args ) {
							$grid.jqxGrid( 'pagesize', args.item.originalItem );
						}
						setTimeout( recalculateScrollbars, 50 );
					} );
				}

				return element;
			},

			handlekeyboardnavigation: function( event ) {
				var focusItem = $( ':focus' );
				if ( ( $( event.target ).is( 'body' ) && focusItem.get( 0 ) === undefined ) || focusItem.get( 0 ) === event.target ) {
					var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
					if ( key === 9 ) {
						var $grid = $( event.target ).closest( '.jqx-grid' );
						var item;
						if ( event.shiftKey ) {
							if ( $grid.length > 0 ) {
								item = handleShiftTabInGrid( event, $grid );
								if ( !item ) {
									return true;
								}
								$grid.jqxGrid( 'clearselection' );
							} else {
								item = $.getPrevTabbale();
							}
							tabToPrevItem( item );
						} else {
							if ( $grid.length > 0 ) {
								item = handleTabInGrid( event, $grid );
								if ( !item ) {
									return true;
								}
								$grid.jqxGrid( 'clearselection' );
							} else {
								item = $.getNextTabbale();
							}
							tabToNextItem( item );
						}
						return true;
					}
				}
			},

			enableErrorHeaderRow: function( gridId ) {
				setTimeout( function() {
					var $gridId = '#' + gridId;
					var errorNum = 0;
					var rows = $( $gridId ).jqxGrid( 'getrows' );
					var cols = $( $gridId ).jqxGrid( 'columns' ).records;
					for ( var i = 0; i < rows.length; i++ ) {
						for ( var j = 0; j < cols.length; j++ ) {
							var datafield = cols[ j ].datafield;
							var cellValue = rows[ i ][ datafield ].toString();
							if ( ( cellValue.indexOf( '#errordata#' ) !== -1 && cols[ j ].columntype === 'textbox' ) || ( cols[ j ].columntype === 'NumberInput' && ( cellValue.indexOf( '((' ) === 0 && cellValue.indexOf( '))' ) === cellValue.length - 2 ) ) ) {
								errorNum += 1;
							}
						}
					}
					var gridHeader = $( $gridId ).find( '.jqx-grid-header' );
					gridHeader.children().after( '<div class="grid-error-header">' +
						'<span><span class="icon icon-error"></span>There are ' + errorNum + ' errors in this table.</span>' +
						'</div>' );
					gridHeader.css( 'height', '50px' );
					gridHeader.children().css( 'height', '50%' );
					gridHeader.after( '<div class="grid-error-header-icon"><a href="#"><span class="icon icon-close-rounded"></span></a></div>' );
					$( '.icon-close-rounded' ).parent( 'a' ).on( 'click', function() {
						var gridHeader = $( $gridId ).find( '.jqx-grid-header' );
						gridHeader.css( 'height', '25px' );
						gridHeader.children().css( 'height', '100%' );
						$( $gridId ).find( '.grid-error-header' ).css( 'display', 'none' );
						$( $gridId ).jqxGrid( 'render' );
					} );
				}, 50 );
			},

			enableHeadErrorIndicator: function( gridId ) {
				setTimeout( function() {
					var $gridId = '#' + gridId;
					var rows = $( $gridId ).jqxGrid( 'getrows' );
					var cols = $( $gridId ).jqxGrid( 'columns' ).records;

					var errorsCount = [];
					for ( var x = 0; x < cols.length; x++ ) {
						errorsCount[ x ] = 0;
					}

					for ( var i = 0; i < rows.length; i++ ) {
						for ( var j = 0; j < cols.length; j++ ) {
							var datafield = cols[ j ].datafield;
							var cellValue = rows[ i ][ datafield ].toString();
							if ( ( cellValue.indexOf( '#errordata#' ) !== -1 && cols[ j ].columntype === 'textbox' ) || ( cols[ j ].columntype === 'NumberInput' && ( cellValue.indexOf( '((' ) === 0 && cellValue.indexOf( '))' ) === cellValue.length - 2 ) ) ) {
								errorsCount[ j ] = errorsCount[ j ] + 1;
							}
						}
					}

					var headCount = $( $gridId ).find( '.jqx-grid-column-header' ).length;
					for ( var n = 0; n < headCount; n++ ) {
						var errors = errorsCount[ n ];
						if ( errors > 0 ) {
							$( $gridId ).find( '.jqx-grid-column-header' ).eq( n ).find( 'span' )
								.after( '<span class="icon text-center n-error-indicator">' + errors + '</span>' );
						}
					}
				}, 50 );
			},

			/*-------------- nokia Add/Delete Rows implementation*/
			nDeleteButtonOnCellRenderer: function( row, datafield, value ) {
				return '<div class="n-cell-icon-container">' +
					'<button class="n-cell-icon n-cell-icon-control n-del-row-btn" tabindex="-1" data-row-index="' + row + '">' +
					'<span class="icon ' + value + '"></span></button></div>';
			},

			nAddRow: function( grid, rowData ) {
				grid.jqxGrid( 'beginupdate' );
				grid.jqxGrid( 'addrow', null, rowData );
				setTimeout( recalculateScrollbars, 50 );
				var datainfo = grid.jqxGrid( 'getdatainformation' );
				var rowscount = datainfo.rowscount;
				var pagescount = datainfo.paginginformation.pagescount;
				//unselect all the selected row
				var selectedrowindexs = grid.jqxGrid( 'getselectedrowindexes' );
				var tempRowindexs = selectedrowindexs ? [].concat( selectedrowindexs ) : [];
				for ( var m = 0; m < tempRowindexs.length; m++ ) {
					var selectedrowindex = tempRowindexs[ tempRowindexs.length - m - 1 ];
					var id = grid.jqxGrid( 'getrowboundindex', selectedrowindex );
					grid.jqxGrid( 'unselectrow', id );
				}
				grid.jqxGrid( 'endupdate' );
				grid.jqxGrid( 'selectrow', rowscount - 1 );
				grid.jqxGrid( 'ensurerowvisible', rowscount - 1 );
				$.grid.updatePageInfor( grid, rowscount, pagescount );
			},

			nDelRow: function( grid ) {
				var selectedrowindexs = grid.jqxGrid( 'getselectedrowindexes' );
				var rowscount = grid.jqxGrid( 'getdatainformation' ).rowscount;
				// begin update. Stops the Grid's rendering.
				grid.jqxGrid( 'beginupdate' );
				selectedrowindexs.sort( function( a, b ) {
					return a - b;
				} );
				//use a temp to hold the origin selectedrowindexes as the selectedrowindexes will change after deleted row.
				var tempRowindexs = selectedrowindexs ? [].concat( selectedrowindexs ) : [];
				var selectRowindexsAfterDelete;
				if ( tempRowindexs[ tempRowindexs.length - 1 ] + 1 < rowscount ) {
					selectRowindexsAfterDelete = tempRowindexs[ tempRowindexs.length - 1 ] - tempRowindexs.length + 1;
				} else {
					selectRowindexsAfterDelete = tempRowindexs[ tempRowindexs.length - 1 ] - tempRowindexs.length;
				}

				for ( var m = 0; m < tempRowindexs.length; m++ ) {
					var selectedrowindex = tempRowindexs[ tempRowindexs.length - m - 1 ];
					if ( selectedrowindex >= 0 && selectedrowindex < rowscount ) {
						var id = grid.jqxGrid( 'getrowid', selectedrowindex );
						grid.jqxGrid( 'deleterow', id );
					}
				}
				// end update. Resume the Grid's rendering.
				setTimeout( recalculateScrollbars, 10 );
				var selectRowId = grid.jqxGrid( 'getrowboundindex', selectRowindexsAfterDelete );
				grid.jqxGrid( 'endupdate' );
				grid.jqxGrid( 'selectrow', selectRowId );
				grid.jqxGrid( 'ensurerowvisible', selectRowId );
				var pagescount = grid.jqxGrid( 'getdatainformation' ).paginginformation.pagescount;
				$.grid.updatePageInfor( grid, rowscount - tempRowindexs.length, pagescount );
			},

			nEnableDeleteButtonOnCell: function( grid ) {
				//change document to grid to avoid impacting other grids.
				grid.on( 'click', '.n-del-row-btn', function() {
					//var index = $(this).data("row-index");
					grid.jqxGrid( 'beginupdate' );
					var selectedrowindex = grid.jqxGrid( 'getselectedrowindex' );
					var rowscount = grid.jqxGrid( 'getdatainformation' ).rowscount;
					var selectRowindexsAfterDelete;
					if ( selectedrowindex + 1 < rowscount ) {
						selectRowindexsAfterDelete = selectedrowindex;
					} else {
						selectRowindexsAfterDelete = selectedrowindex - 1;
					}
					if ( selectedrowindex >= 0 && selectedrowindex < rowscount ) {
						var id = grid.jqxGrid( 'getrowid', selectedrowindex );
						grid.jqxGrid( 'deleterow', id );
						$.grid.updatePageInfor( grid, rowscount - 1 );
					}
					var selectRowId = grid.jqxGrid( 'getrowboundindex', selectRowindexsAfterDelete );
					setTimeout( recalculateScrollbars, 10 );
					grid.jqxGrid( 'endupdate' );
					grid.jqxGrid( 'selectrow', selectRowId );
					grid.jqxGrid( 'ensurerowvisible', selectRowId );
				} );
			}
		};

		$jqxTable.on( 'bindingcomplete', function() {
			$( this ).find( 'div[id^=verticalScrollBar]' ).first().before( '<div class="n-extra-scrollbar-div"></div>' );
			$( this ).jqxGrid( {
				rendered: function() {
					setTimeout( recalculateScrollbars, 50 );
				}
			} );
			var height = $( this ).find( '.jqx-scrollbar' ).first().jqxScrollBar( 'height' );
			$( this ).find( '.jqx-scrollbar' ).first().jqxScrollBar( {
				thumbMinSize: 50
			} );
			if ( $.browser.mozilla ) {
				var contentTable = $( this ).find( 'div[id^=content].jqx-overflow-hidden' );
				contentTable.css( 'height', 'none' );
				contentTable.css( 'height', contentTable.height() - 1 + 'px' );
			}
			setTimeout( recalculateScrollbars, 50 );
		} );

		$jqxTable.on( "filter", function() {
			setTimeout( recalculateScrollbars, 50 );
		} );

		function recalculateScrollbars() {
			$jqxTable.each( function() {
				var verticalScrollbar = $( this ).find( 'div[id^=verticalScrollBar]' ).first();
				var horizontalScrollbar = $( this ).find( 'div[id^=horizontalScrollBar]' ).first();

				verticalScrollbar.css( 'max-height', 'none' );
				if ( horizontalScrollbar.length > 0 ) {
					verticalScrollbar.css( 'max-height', verticalScrollbar.outerHeight() - 39 + 'px' ); //26 - height of extraScrollbarDiv, 12-height of horizontal scrollbar
				} else {
					verticalScrollbar.css( 'max-height', verticalScrollbar.outerHeight() - 26 + 'px' );
				}

				var verticalThumbScrollbar = $( this ).find( 'div[id^=jqxScrollThumbverticalScrollBar]' ).first();
				verticalThumbScrollbar.css( 'max-height', 'none' );
				verticalThumbScrollbar.css( 'max-height', verticalThumbScrollbar.height() - 26 + 'px' );
			} );
		}

		$( document ).ready( function() {
			setTimeout( function() {
				var headerColumns = $( ".jqx-grid-column-header" );
				for ( var i = 0; i < headerColumns.length; i++ ) {
					headerColumns[ i ].onclick = handleColumnHeadSort;
				}

				$( ".jqx-grid" ).each( function() {
					$( this ).on( 'cellselect', function( event ) {
						var gridId = $( this ).attr( 'id' );
						var currentTarget = $( document.activeElement );
						var editComponentId = currentTarget.parent().attr( 'id' );
						if ( currentTarget.attr( 'type' ) === 'checkbox' ) {
							editComponentId = currentTarget.parent().parent().attr( 'id' );
						}
						var dataField = event.args.datafield;
						var rowBoundIndex = event.args.rowindex;
						if ( editComponentId !== undefined &&
							'customeditor' + gridId + dataField + '_' + rowBoundIndex !== editComponentId ) {
							editComponentId = editComponentId.replace( 'customeditor' + gridId, '' );
							var strings = editComponentId.split( '_' );
							$( this ).jqxGrid( 'endcelledit', strings[ 1 ], strings[ 0 ] );
						}
					} );

					$( this ).attr( 'tabindex', '0' );
				} );

				// For filter row jqwDropdown keyboard support.
				$( ".jqx-grid-cell-filter-row .jqx-dropdownlist-state-normal" ).on( "keydown", function( e ) {
					if ( e.which === 32 ) {
						var opened = $( this ).jqxDropDownList( 'isOpened' );
						if ( !opened ) {
							$( this ).jqxDropDownList( 'open' );
						} else {
							$( this ).jqxDropDownList( 'close' );
						}
					}
				} );
			}, 50 );
		} );

		function handleColumnHeadSort() {
			/*jshint validthis:true */
			var columnSortType = $( this ).attr( "aria-sort" );
			if ( columnSortType === "" || columnSortType === undefined ) {
				return;
			}

			var columnHeadTextDiv = $( this ).children( "div" ).children( "div" )[ 0 ];
			var columnAlignType = $( columnHeadTextDiv ).css( "text-align" );

			//add right padding if it is right alignment and is sorting.
			if ( columnAlignType === "right" && ( columnSortType === "ascending" || columnSortType === "descending" ) ) {
				$( columnHeadTextDiv ).css( "padding-right", "18px" );
			} else {
				$( columnHeadTextDiv ).css( "padding-right", "8px" );
			}
		}

		function addChangedCol( row, editorId, gridId ) {
			var $targetCol = $( "#" + gridId + " #n-row-indicated-" + row );
			var changedCol = $targetCol.attr( "changed-col" );
			if ( changedCol === undefined ) {
				changedCol = '';
			}
			if ( changedCol.indexOf( editorId ) === -1 ) {
				changedCol = changedCol + editorId;
				$targetCol.attr( "changed-col", changedCol );
			}
		}

		function removeChangedCol( row, editorId, gridId ) {
			var $targetCol = $( "#" + gridId + " #n-row-indicated-" + row );
			var changedCol = $targetCol.attr( "changed-col" );
			if ( changedCol === undefined ) {
				changedCol = '';
			}
			changedCol = changedCol.replace( editorId, '' );
			$targetCol.attr( "changed-col", changedCol );
			var currentChangedCol = $targetCol.attr( "changed-col" );
			if ( currentChangedCol !== undefined ) {
				if ( currentChangedCol.replace( 'editorId', '' ) === '' ) {
					$( "#" + gridId + " #n-row-indicated-" + row + " > span" ).removeClass( "icon-edited-white" );
				}
			}
		}

		function checkIndicatedByCell( editor ) {
			var gridId = editor.parent().attr( "id" ).replace( "contenttable", "" );
			var tmpColumnName = editor.attr( "id" ).replace( "customeditor" + gridId, "" );
			var columnName = tmpColumnName.substring( 0, tmpColumnName.indexOf( "_" ) );
			var isIndicatedByCell = $( "#" + gridId ).jqxGrid( 'getcolumnproperty', columnName, 'indicator' );
			if ( isIndicatedByCell === undefined ) {
				isIndicatedByCell = false;
			}
			return isIndicatedByCell;
		}

		function handleTabKey( e, editor, row ) {
			if ( e.which === 9 ) {
				e.preventDefault();
				e.stopPropagation();

				var $grid = editor.closest( '.jqx-grid' );
				var editorId = editor.attr( 'id' );
				var columnName = editorId.split( '_' )[ 0 ];
				columnName = columnName.replace( 'customeditor' + $grid.attr( 'id' ), '' );
				var currentIndex = $grid.jqxGrid( 'getcolumnindex', columnName );
				var data = $grid.jqxGrid( 'getrowdata', row );
				var keys = [];
				$.each( data, function( key ) {
					keys.push( key );
				} );
				$grid.jqxGrid( 'selectcell', row, keys[ currentIndex + 1 ] );
			}
		}

		/*------------------- functions for tab keyboard accessibility -------------------*/
		function isSameTable( id, gridId ) {
			return id === gridId || id === 'wrapper' + gridId || id === 'content' + gridId;
		}

		function isTableIconCloseRounded( $grid, $item ) {
			return $grid.find( '.icon-close-rounded' ).parent( 'a' ).get( 0 ) === $item.get( 0 );
		}

		function isTableHeaderItem( $grid, $item, selector ) {
			return $grid.find( '.jqx-grid-header :tabbable' + selector ).get( 0 ) === $item.get( 0 );
		}

		function focusToTableIconClose( $grid ) {
			if ( $grid.find( '.icon-close-rounded' ).parent( 'a' ).length > 0 ) {
				$grid.find( '.icon-close-rounded' ).parent( 'a' ).focus();
				$grid.jqxGrid( 'clearselection' );
				return true;
			}
			return false;
		}

		function focusToTableHeader( $grid, selector ) {
			if ( $grid.find( '.jqx-grid-header :tabbable' ).length > 0 ) {
				$grid.find( '.jqx-grid-header :tabbable' + selector ).focus();
				$grid.jqxGrid( 'clearselection' );
				return true;
			}
			return false;
		}

		function focusToTable( $grid ) {
			$grid.jqxGrid( 'focus' );
			if ( $grid.jqxGrid( 'getselectedcell' ) === null && $grid.jqxGrid( 'getselectedrowindex' ) === -1 ) {
				var columnName = $grid.jqxGrid( "columns" ).records[ 0 ].datafield;
				$grid.jqxGrid( 'selectcell', 0, columnName );
				$grid.jqxGrid( 'selectrow', 0 );
			}
		}

		/**
		 * handle shift tab in grid, return the pre tabbable item. If prev tabbable item is also in grid, return undefined.
		 * @param event
		 * @param $grid
		 * @returns {undefined}
		 */
		function handleShiftTabInGrid( event, $grid ) {
			var id = $( event.target ).attr( 'id' );
			var gridId = $grid.attr( 'id' );
			// if focus on the table
			if ( isSameTable( id, gridId ) ) {
				// focus move to header of table
				if ( focusToTableIconClose( $grid ) || focusToTableHeader( $grid, ':last' ) ) {
					return undefined;
				}
			}
			// if focus on the close icon of table
			else if ( isTableIconCloseRounded( $grid, $( event.target ) ) ) {
				// focus move to header of table
				if ( focusToTableHeader( $grid, ':last' ) ) {
					return undefined;
				}
				$grid.focus();
			}
			var item = $.getPrevTabbale();
			id = item.attr( 'id' );
			if ( isSameTable( id, gridId ) ) {
				item.closest( '.jqx-grid' ).focus();
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
		function handleTabInGrid( event, $grid ) {
			var gridId = $grid.attr( 'id' );
			// if focus on the header of table
			if ( isTableHeaderItem( $grid, $( event.target ), ':last' ) ) {
				if ( focusToTableIconClose( $grid ) ) {
					return undefined;
				}
				focusToTable( $grid );
				return undefined;
			} else if ( isTableIconCloseRounded( $grid, $( event.target ) ) ) {
				focusToTable( $grid );
				return undefined;
			}

			var item = $.getNextTabbale();
			var id = item.attr( 'id' );
			if ( isSameTable( id, gridId ) ) {
				item.focus();
				item = $.getNextTabbale();
			}
			if ( isTableHeaderItem( $grid, item, ':first' ) ) {
				$grid.find( '.jqx-grid-header :tabbable:last' ).get( 0 ).focus();
				item = $.getNextTabbale();
			}
			if ( isTableIconCloseRounded( $grid, item ) ) {
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
		function tabToPrevItem( $item ) {
			var $grid = $item.closest( '.jqx-grid' );
			var id = $item.attr( 'id' );
			var gridId = $grid.attr( 'id' );
			if ( $grid.length < 1 ) {
				$item.focus();
				return true;
			}
			if ( isSameTable( id, gridId ) || isTableIconCloseRounded( $grid, $item ) || isTableHeaderItem( $grid, $item, ':last' ) ) {
				focusToTable( $grid );
			} else {
				$item.focus();
			}
		}

		/**
		 * handle tab to next item
		 * @param $item
		 * @returns {boolean}
		 */
		function tabToNextItem( $item ) {
			var $grid = $item.closest( '.jqx-grid' );
			var id = $item.attr( 'id' );
			var gridId = $grid.attr( 'id' );
			if ( $grid.length < 1 ) {
				$item.focus();
				return true;
			}
			if ( isSameTable( id, gridId ) ) {
				if ( !( focusToTableHeader( $grid, ':first' ) || focusToTableIconClose( $grid ) ) ) {
					focusToTable( $grid );
				}
			} else {
				$item.focus();
			}
		}
		/*------------------- functions for tab keyboard accessibility -------------------*/

		//Hide the up and down button in scroll bar for jqx table
		if ( $.jqx !== undefined ) {
			$.jqx.init( {
				scrollBarButtonsVisibility: "hidden"
			} );
		}

		// GRIDS KEYBOARD ACCESSIBILITY
		// ============================
		$( document )
			.on( 'keydown.wf.grid.keyboard', '.grid-error-header-icon', $.wfKBCore.commonKeyboardHandler )
			.on( 'focusin.wf.grid.keyboard', '.jqx-widget-content', $.wfKBGrid.gridFocusinHandler );

	} )( $ );


	//jquery.mask.js
	( function( $ ) {
		var Mask = function( el, mask, options ) {
			el = $( el );

			var jMask = this,
				oldValue = el.val(),
				regexMask;

			mask = typeof mask === 'function' ? mask( el.val(), undefined, el, options ) : mask;

			var p = {
				invalid: [],
				getCaret: function() {
					try {
						var sel,
							pos = 0,
							ctrl = el.get( 0 ),
							dSel = document.selection,
							cSelStart = ctrl.selectionStart;

						// IE Support
						if ( dSel && navigator.appVersion.indexOf( 'MSIE 10' ) === -1 ) {
							sel = dSel.createRange();
							sel.moveStart( 'character', el.is( 'input' ) ? -el.val().length : -el.text().length );
							pos = sel.text.length;
						}
						// Firefox support
						else if ( cSelStart || cSelStart === '0' ) {
							pos = cSelStart;
						}

						return pos;
					} catch ( e ) {}
				},
				setCaret: function( pos ) {
					try {
						if ( el.is( ':focus' ) ) {
							var range, ctrl = el.get( 0 );

							if ( ctrl.setSelectionRange ) {
								ctrl.setSelectionRange( pos, pos );
							} else if ( ctrl.createTextRange ) {
								range = ctrl.createTextRange();
								range.collapse( true );
								range.moveEnd( 'character', pos );
								range.moveStart( 'character', pos );
								range.select();
							}
						}
					} catch ( e ) {}
				},
				events: function() {
					el
					// SPEC added keydown mask to prevent a lot of illegal characters to show up when key kept down
					// Still it shows the pressed key and erases it in key up if char is illegal - that could be
					// also blocked to get the user experience better - also some message/tooltip should be
					// shown what is the correct input format.
						.on( 'keydown.mask', p.behaviour )
						.on( 'keyup.mask', p.behaviour )
						.on( 'paste.mask drop.mask', function() {
							setTimeout( function() {
								el.keydown().keyup();
							}, 100 );
						} )
						.on( 'change.mask', function() {
							el.data( 'changed', true );
						} )
						.on( 'blur.mask', function() {
							if ( oldValue !== el.val() && !el.data( 'changed' ) ) {
								el.triggerHandler( 'change' );
							}
							el.data( 'changed', false );
						} )
						// it's very important that this callback remains in this position
						// otherwhise oldValue it's going to work buggy
						.on( 'keydown.mask, blur.mask', function() {
							oldValue = el.val();
						} )
						// select all text on focus
						.on( 'focus.mask', function( e ) {
							if ( options.selectOnFocus === true ) {
								$( e.target ).select();
							}
						} )
						// clear the value if it not complete the mask
						.on( 'focusout.mask', function() {
							if ( options.clearIfNotMatch && !regexMask.test( p.val() ) ) {
								p.val( '' );
							}
						} );
				},
				getRegexMask: function() {
					var maskChunks = [],
						translation, pattern, optional, recursive, oRecursive, r;

					for ( var i = 0; i < mask.length; i++ ) {
						translation = jMask.translation[ mask.charAt( i ) ];

						if ( translation ) {

							pattern = translation.pattern.toString().replace( /.{1}$|^.{1}/g, '' );
							optional = translation.optional;
							recursive = translation.recursive;

							if ( recursive ) {
								maskChunks.push( mask.charAt( i ) );
								oRecursive = {
									digit: mask.charAt( i ),
									pattern: pattern
								};
							} else {
								maskChunks.push( !optional && !recursive ? pattern : ( pattern + '?' ) );
							}

						} else {
							maskChunks.push( mask.charAt( i ).replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' ) );
						}
					}

					r = maskChunks.join( '' );

					if ( oRecursive ) {
						r = r.replace( new RegExp( '(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)' ), '($1)?' )
							.replace( new RegExp( oRecursive.digit, 'g' ), oRecursive.pattern );
					}

					return new RegExp( r );
				},
				destroyEvents: function() {
					el.off( [ 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', '' ].join( '.mask ' ) );
				},
				val: function( v ) {
					var isInput = el.is( 'input' ),
						method = isInput ? 'val' : 'text',
						r;

					if ( arguments.length > 0 ) {
						if ( el[ method ]() !== v ) {
							el[ method ]( v );
						}
						r = el;
					} else {
						r = el[ method ]();
					}

					return r;
				},
				getMCharsBeforeCount: function( index, onCleanVal ) {
					for ( var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++ ) {
						if ( !jMask.translation[ mask.charAt( i ) ] ) {
							index = onCleanVal ? index + 1 : index;
							count++;
						}
					}
					return count;
				},
				caretPos: function( originalCaretPos, oldLength, newLength, maskDif ) {
					var translation = jMask.translation[ mask.charAt( Math.min( originalCaretPos - 1, mask.length - 1 ) ) ];

					return !translation ? p.caretPos( originalCaretPos + 1, oldLength, newLength, maskDif ) :
						Math.min( originalCaretPos + newLength - oldLength - maskDif, newLength );
				},
				behaviour: function( e ) {
					e = e || window.event;
					p.invalid = [];
					var keyCode = e.keyCode || e.which;
					if ( $.inArray( keyCode, jMask.byPassKeys ) === -1 ) {

						var caretPos = p.getCaret(),
							currVal = p.val(),
							currValL = currVal.length,
							changeCaret = caretPos < currValL,
							newVal = p.getMasked(),
							newValL = newVal.length,
							maskDif = p.getMCharsBeforeCount( newValL - 1 ) - p.getMCharsBeforeCount( currValL - 1 );

						p.val( newVal );

						// change caret but avoid CTRL+A
						if ( changeCaret && !( keyCode === 65 && e.ctrlKey ) ) {
							// Avoid adjusting caret on backspace or delete
							if ( !( keyCode === 8 || keyCode === 46 ) ) {
								caretPos = p.caretPos( caretPos, currValL, newValL, maskDif );
							}
							p.setCaret( caretPos );
						}

						return p.callbacks( e );
					}
				},
				getMasked: function( skipMaskChars ) {
					var buf = [],
						value = p.val(),
						m = 0,
						maskLen = mask.length,
						v = 0,
						valLen = value.length,
						offset = 1,
						addMethod = 'push',
						resetPos = -1,
						lastMaskChar,
						check;

					if ( options.reverse ) {
						addMethod = 'unshift';
						offset = -1;
						lastMaskChar = 0;
						m = maskLen - 1;
						v = valLen - 1;
						check = function() {
							return m > -1 && v > -1;
						};
					} else {
						lastMaskChar = maskLen - 1;
						check = function() {
							return m < maskLen && v < valLen;
						};
					}

					while ( check() ) {
						var maskDigit = mask.charAt( m ),
							valDigit = value.charAt( v ),
							translation = jMask.translation[ maskDigit ];

						if ( translation ) {
							if ( valDigit.match( translation.pattern ) ) {
								buf[ addMethod ]( valDigit );
								if ( translation.recursive ) {
									if ( resetPos === -1 ) {
										resetPos = m;
									} else if ( m === lastMaskChar ) {
										m = resetPos - offset;
									}

									if ( lastMaskChar === resetPos ) {
										m -= offset;
									}
								}
								m += offset;
							} else if ( translation.optional ) {
								m += offset;
								v -= offset;
							} else if ( translation.fallback ) {
								buf[ addMethod ]( translation.fallback );
								m += offset;
								v -= offset;
							} else {
								p.invalid.push( {
									p: v,
									v: valDigit,
									e: translation.pattern
								} );
							}
							v += offset;
						} else {
							if ( !skipMaskChars ) {
								buf[ addMethod ]( maskDigit );
							}

							if ( valDigit === maskDigit ) {
								v += offset;
							}

							m += offset;
						}
					}

					var lastMaskCharDigit = mask.charAt( lastMaskChar );
					if ( maskLen === valLen + 1 && !jMask.translation[ lastMaskCharDigit ] ) {
						buf.push( lastMaskCharDigit );
					}

					return buf.join( '' );
				},
				callbacks: function( e ) {
					var val = p.val(),
						changed = val !== oldValue,
						defaultArgs = [ val, e, el, options ],
						callback = function( name, criteria, args ) {
							if ( typeof options[ name ] === 'function' && criteria ) {
								options[ name ].apply( this, args );
							}
						};

					callback( 'onChange', changed === true, defaultArgs );
					callback( 'onKeyPress', changed === true, defaultArgs );
					callback( 'onComplete', val.length === mask.length, defaultArgs );
					callback( 'onInvalid', p.invalid.length > 0, [ val, e, el, p.invalid, options ] );
				}
			};


			// public methods
			jMask.mask = mask;
			jMask.options = options;
			jMask.remove = function() {
				var caret = p.getCaret();
				p.destroyEvents();
				p.val( jMask.getCleanVal() );
				p.setCaret( caret - p.getMCharsBeforeCount( caret ) );
				return el;
			};

			// get value without mask
			jMask.getCleanVal = function() {
				return p.getMasked( true );
			};

			jMask.init = function( onlyMask ) {
				onlyMask = onlyMask || false;
				options = options || {};

				jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
				jMask.translation = $.jMaskGlobals.translation;

				jMask.translation = $.extend( {}, jMask.translation, options.translation );
				jMask = $.extend( true, {}, jMask, options );

				regexMask = p.getRegexMask();

				if ( onlyMask === false ) {

					if ( options.placeholder ) {
						el.attr( 'placeholder', options.placeholder );
					}

					// autocomplete needs to be off. we can't intercept events
					// the browser doesn't  fire any kind of event when something is
					// selected in a autocomplete list so we can't sanitize it.
					el.attr( 'autocomplete', 'off' );
					p.destroyEvents();
					p.events();

					var caret = p.getCaret();
					p.val( p.getMasked() );
					p.setCaret( caret + p.getMCharsBeforeCount( caret, true ) );

				} else {
					p.events();
					p.val( p.getMasked() );
				}
			};

			jMask.init( !el.is( 'input' ) );
		};

		$.maskWatchers = {};
		var HTMLAttributes = function() {
				var input = $( this ),
					options = {},
					prefix = 'data-mask-',
					mask = input.attr( 'data-mask' );

				if ( input.attr( prefix + 'reverse' ) ) {
					options.reverse = true;
				}

				if ( input.attr( prefix + 'clearifnotmatch' ) ) {
					options.clearIfNotMatch = true;
				}

				if ( input.attr( prefix + 'selectonfocus' ) === 'true' ) {
					options.selectOnFocus = true;
				}

				if ( notSameMaskObject( input, mask, options ) ) {
					return input.data( 'mask', new Mask( this, mask, options ) );
				}
			},
			notSameMaskObject = function( field, mask, options ) {
				options = options || {};
				var maskObject = $( field ).data( 'mask' ),
					stringify = JSON.stringify,
					value = $( field ).val() || $( field ).text();
				try {
					if ( typeof mask === 'function' ) {
						mask = mask( value );
					}
					return typeof maskObject !== 'object' || stringify( maskObject.options ) !== stringify( options ) || maskObject.mask !== mask;
				} catch ( e ) {}
			};


		$.fn.mask = function( mask, options ) {
			options = options || {};
			var selector = this.selector,
				globals = $.jMaskGlobals,
				interval = $.jMaskGlobals.watchInterval,
				maskFunction = function() {
					if ( notSameMaskObject( this, mask, options ) ) {
						return $( this ).data( 'mask', new Mask( this, mask, options ) );
					}
				};

			$( this ).each( maskFunction );

			if ( selector && selector !== '' && globals.watchInputs ) {
				clearInterval( $.maskWatchers[ selector ] );
				$.maskWatchers[ selector ] = setInterval( function() {
					$( document ).find( selector ).each( maskFunction );
				}, interval );
			}
			return this;
		};

		$.fn.unmask = function() {
			clearInterval( $.maskWatchers[ this.selector ] );
			delete $.maskWatchers[ this.selector ];
			return this.each( function() {
				var dataMask = $( this ).data( 'mask' );
				if ( dataMask ) {
					dataMask.remove().removeData( 'mask' );
				}
			} );
		};

		$.fn.cleanVal = function() {
			return this.data( 'mask' ).getCleanVal();
		};

		$.applyDataMask = function( selector ) {
			selector = selector || $.jMaskGlobals.maskElements;
			var $selector = ( selector instanceof $ ) ? selector : $( selector );
			$selector.filter( $.jMaskGlobals.dataMaskAttr ).each( HTMLAttributes );
		};

		var globals = {
			maskElements: 'input,td,span,div',
			dataMaskAttr: '*[data-mask]',
			dataMask: true,
			watchInterval: 300,
			watchInputs: true,
			watchDataMask: false,
			byPassKeys: [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ],
			translation: {
				0: {
					pattern: /\d/
				},
				9: {
					pattern: /\d/,
					optional: true
				},
				'#': {
					pattern: /\d/,
					recursive: true
				},
				A: {
					pattern: /[a-zA-Z0-9]/
				},
				S: {
					pattern: /[a-zA-Z]/
				}
			}
		};

		$.jMaskGlobals = $.jMaskGlobals || {};
		globals = $.jMaskGlobals = $.extend( true, {}, globals, $.jMaskGlobals );

		// looking for inputs with data-mask attribute
		if ( globals.dataMask ) {
			$.applyDataMask();
		}


		//remove this for unit test delay issue
		//setInterval(function(){
		//    if ($.jMaskGlobals.watchDataMask) { $.applyDataMask(); }
		//}, globals.watchInterval);


	} )( $ );


	//list-group.js
	( function( $ ) {

		$( document ).on( "click", ".n-list-group-item", function() {
			var listGroupParent = $( this ).parents( ".n-list-group" );
			if ( !listGroupParent.hasClass( 'disabled' ) ) {
				listGroupParent.find( ".n-list-group-item" ).removeClass( "selected" );
				listGroupParent.find( ".n-list-group-item" ).attr( "tabindex", -1 );
				$( this ).addClass( "selected" );
				$( this ).attr( "tabindex", 0 );
			}
		} );

		$( document ).ready( function() {
			var listGroup = $( "ul.n-list-group" );
			$.each( listGroup, function() {
				if ( !$( this ).hasClass( "disabled" ) ) {
					$( this ).find( ".n-list-group-item" ).attr( "tabindex", -1 );
					var itemSelected = $( this ).find( ".n-list-group-item.selected" );
					if ( itemSelected.length > 0 ) {
						itemSelected.attr( "tabindex", 0 );
					} else {
						$( this ).find( ".n-list-group-item:first" ).attr( "tabindex", 0 );
					}
					//$(this).find(".n-list-group-item").bind("click", function () {
					//    $(this).parents(".n-list-group").find(".n-list-group-item").removeClass("selected");
					//    $(this).addClass("selected");
					//});
				}
			} );

			var descriptionListGroup = $( "dl.n-list-group" );
			$.each( descriptionListGroup, function() {
				if ( !$( this ).hasClass( "disabled" ) ) {
					$( this ).find( "dd" ).attr( "tabindex", -1 );
					var ddSelected = $( this ).find( "dd.selected" );
					if ( ddSelected.length > 0 ) {
						ddSelected.attr( "tabindex", 0 );
					} else {
						$( this ).find( "dd:first" ).attr( "tabindex", 0 );
					}
					$( this ).find( "dd" ).bind( "click", function() {
						$( this ).parents( ".n-list-group" ).find( "dd" ).removeClass( "selected" );
						$( this ).parents( ".n-list-group" ).find( "dd" ).attr( "tabindex", -1 );
						$( this ).addClass( "selected" );
						$( this ).attr( "tabindex", 0 );
					} );
				}
			} );

			var listScrollGroup = $( "ul.n-list-group-scroll" );
			$.each( listScrollGroup, function() {

				if ( $( this ).hasClass( "disabled" ) ) {
					$( this ).nScrollbar( {
						alwaysShowScrollbar: 2,
						theme: "disabled",
						mouseWheel: {
							enable: false
						}
					} );

					$( this ).nScrollbar( "disable" );
				} else {
					$( this ).nScrollbar();
				}
				$( this ).find( "div[tabindex='0']" ).removeAttr( "tabindex" );
			} );

			var descriptionListScrollGroup = $( "dl.n-list-group-scroll" );
			$.each( descriptionListScrollGroup, function() {

				if ( $( this ).hasClass( "disabled" ) ) {

					$( this ).nScrollbar( {
						alwaysShowScrollbar: 2,
						theme: "disabled",
						mouseWheel: {
							enable: false
						}
					} );

					$( this ).nScrollbar( "disable" );
				} else {
					$( this ).nScrollbar();
				}
				$( this ).find( "div[tabindex='0']" ).removeAttr( "tabindex" );
			} );

			/**---multicolumn list functions-----**/

			$( ".n-multicolumn-list" ).each( function() {
				var lastSubheader = $( this ).find( ".subheader:last" );
				var lastSubheaderItem = $( this ).find( ".subheader-item:last" );
				if ( lastSubheaderItem.next().length === 0 ) {
					lastSubheader.addClass( "last" );
				}
			} );

			$( ".n-multicolumn-list th" ).each( function() {
				addBoldBufferWidth( $( this ) );
			} );


			$( ".n-multicolumn-list tbody:not(.group) td, th, .n-multicolumn-list tbody.group" )
				.prop( "tabIndex", 0 )
				.off( 'keydown mouseup' ).on( 'keydown mouseup', function( event ) {
					if ( event.type === 'mouseup' || event.keyCode === 13 || event.keyCode === 32 ) {
						event.preventDefault();
						$( this ).closest( ".n-multicolumn-list" ).find( '.selected' ).removeClass( 'selected' );
						$( this ).toggleClass( 'selected' );
					}
				} );

			$( ".n-multicolumn-list .subheader" ).off( 'keydown mouseup' ).on( 'keydown mouseup', function( event ) {
				if ( event.type === 'mouseup' || event.keyCode === 13 || event.keyCode === 32 ) {
					$( this ).toggleClass( 'open' );
					$( this ).find( 'span.icon' ).toggleClass( 'icon-next' );
					$( this ).find( 'span.icon' ).toggleClass( 'icon-arrow' );
					$( this ).nextUntil( 'tr:not(.subheader-item)' ).toggleClass( 'open' );

					if ( $( this ).parent().find( ".subheader:last" ).is( $( this ) ) && $( this ).parent().children( 'tr:last' ).hasClass( 'subheader-item' ) ) {
						$( this ).toggleClass( "last" );
					}
				}
			} );


		} );

		function addBoldBufferWidth( element ) {
			var wid = element.width();
			var normalBuffer = 16;
			var selectedBuffer = 14;

			if ( element.hasClass( 'selected' ) ) {
				wid += selectedBuffer;
			} else {
				wid += normalBuffer;
			}
			element.css( 'width', wid + 'px' );
		}

		// LIST GROUP KEYBOARD ACCESSIBILITY
		// =================================
		$( document ).on( 'keydown.wf.listgroup.keyboard', '.n-list-group', $.wfKBCore.commonKeyboardHandler );
		$( document ).on( 'keydown.wf.Multi-column-list.keyboard', '.n-multicolumn-list', $.wfKBTable.tableKeyboardHandler );

	} )( $ );


	//localized-navigation.js
	( function( $ ) {

		$( document ).ready( function() {
			/* Adds buffer width for bold style to prevent unnecessary movement of items*/
			$( '.nav-local-menu li' ).each( function() {
				addBoldBufferWidth( $( this ) );
			} );

			$( '.nav-local-menu-divided li' ).each( function() {
				addBoldBufferWidth( $( this ) );
			} );
		} );

		$( '.nav-local' ).on( 'click', 'li', function() {
			$( this ).siblings( 'li' ).removeClass( 'selected' );
			$( this ).addClass( 'selected' );
		} );

		function addBoldBufferWidth( element ) {
			var wid = element.width();
			var normalBuffer = 3;
			var selectedBuffer = 1;

			if ( element.hasClass( 'selected' ) ) {
				wid += selectedBuffer;
			} else {
				wid += normalBuffer;
			}

			element.css( 'width', wid + 'px' );
		}

		var Drilldown = {
			toggle: function() {

				var isSelected;
				if ( $( this ).is( '.n-drillDown-item' ) ) {
					isSelected = $( this ).hasClass( 'n-drilldown-item-selected' );
				}
				var targetContent = $( $( this ).data( 'targetSelector' ) );
				if ( isSelected === true ) {
					collapseDrilldownContent( targetContent, $( this ) );
				} else {
					expandDrilldownContent( targetContent, $( this ) );
				}
			},
			collapse: function( e ) {
				if ( e.keyCode === 27 || typeof( e.keyCode ) === "undefined" ) {
					var content;
					if ( $( this ).is( 'span' ) ) {
						content = $( this ).closest( '.n-drillDown-collapsed' );
					} else if ( $( this ).is( ".nav-local-inline-toolbar" ) ) {
						content = $( this ).siblings().find( '.n-drillDown-collapsed' );
					}
					if ( content.length > 0 ) {
						collapseDrilldownContent( content );
					}
				}
			}
		};

		function itemSelect() {
			$( ".n-drillDown-item" ).removeClass( 'n-drilldown-item-selected' );
		}

		function expandDrilldownContent( content, item ) {
			$( ".n-drillDown-collapsed" ).hide();
			$( ".contents" ).removeClass( 'select' );
			item.closest( ".contents" ).addClass( 'select' );
			content.slideDown();
			itemSelect();
			itemExpand( item );
		}

		function collapseDrilldownContent( content ) {
			$( ".contents" ).removeClass( 'select' );
			content.slideUp();
			itemSelect();
		}

		function itemExpand( item ) {
			if ( item.is( '.n-drillDown-item' ) ) {
				item.addClass( 'n-drilldown-item-selected' );
			}
		}
		$( document )
			.on( 'click.wf.drilldown', '.n-drillDown-item', Drilldown.toggle )
			.on( 'click.wf.drilldown', '.n-drillDown-content .icon-close-rounded', Drilldown.collapse )
			.on( 'keyup.wf.drilldown.keyboard', '.nav-local-inline-toolbar', Drilldown.collapse );
		return Drilldown;


	} )( $ );


	//navbar.js
	( function( $ ) {

		/*--------------- start module scope variables ---------------*/
		var nBannerLinksCollapse = $( ".n-banner-links-collapse" );
		var nBannerTabs = $( ".n-banner-tabs" );
		var KEY = {
			up: 38,
			down: 40,
			right: 39,
			left: 37,
			space: 32,
			enter: 13
		};

		// variables used in responsiveness
		var bannerBlueDetachEvent = "n.banner.blue.block.detached";
		var bannerBlueAttachEvent = "n.banner.blue.block.attached";
		var $bannersInPage = $( ".n-banner" );
		var CSSSelectorMap = {
			collapseDropdownMenu: ".n-banner-links-collapse-dropdown-menu > .dropdown",
			bannerRightDropdown: ".n-banner-links .dropdown",
			navSecondHoverItem: ".nav-secondary-horizontal li",
			dropdownItemHasChild: ".n-dropdown-menu-item-has-child",
			navLinksDetachedClass: "dropdown-menu n-banner-links-collapse-dropdown-menu",
			navLinksAttatchedClass: "nav n-banner-nav n-banner-links",
			navDropdownLinksDetachedClass: "dropdown-menu n-banner-dropdown-links-collapse-dropdown-menu",
			navDropdownLinksAttatchedClass: "nav n-banner-nav n-banner-dropdown-links",

			attachNavLinks: ".n-banner-2nd .n-banner-links-collapse-dropdown-menu",
			attachNavDropdownLinks: ".n-banner-2nd .n-banner-dropdown-links-collapse-dropdown-menu",
			attachNavLinksSubmenu: ".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu.n-collapse-dropdown-sub-menu",

			DetachedNavLinks: ".n-banner-2nd .n-banner-links",
			DetachedNavDropdownLinks: ".n-banner-2nd .n-banner-dropdown-links",
			DetachedNavLinksSubmenu: ".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu"
		};
		/*--------------- end module scope variables ----------------*/


		/*--------------- start utility methods ---------------*/
		/*--------------- end utility methods ---------------*/


		/*--------------- start dom methods ---------------*/
		//loop through every banner on the page
		function triggerCollapseBanner() {
			$bannersInPage.each( function() {
				var $banner = $( this );
				var compensation = 30;
				var bannerToggle = $banner.find( ".n-banner-toggle" );
				//blue part offset on the top banner
				var offsetUpBlue = $banner.find( '.n-banner-1st-blue-to-gray' ).position().left + $banner.find( '.n-banner-1st-blue-to-gray .blue-corner' ).width() - compensation;
				//grey part width in the bottom
				var $navTabDown = $banner.find( '.n-banner-2nd .n-banner-tabs' );
				//grey part off set in the bottom banner
				var offsetDownGray = $navTabDown.width();
				var breakPointState = $banner.attr( "data-visual-break" );
				if ( breakPointState === undefined ) {
					if ( offsetUpBlue < offsetDownGray ) {
						$banner.trigger( bannerBlueDetachEvent );
					} else {
						$banner.trigger( bannerBlueAttachEvent );
					}
				} else if ( breakPointState === "true" && offsetUpBlue > offsetDownGray && typeof bannerToggle !== "undefined" && $( bannerToggle ).css( "display" ) === "none" ) {
					$banner.trigger( bannerBlueAttachEvent );
				} else if ( breakPointState === "false" && offsetUpBlue < offsetDownGray ) {
					$banner.trigger( bannerBlueDetachEvent );
				}
			} );
		}

		//elements mark to be hidden on blue detached event in the banner
		function toggleVisibleBlocksWhenBlueDetached( parameters ) {
			var $banner = parameters.$banner;
			var detach = parameters.detach;
			var hiddenOnBlueDetach = $banner.find( '.hidden-on-blue-detached' );
			var showOnBlueDetach = $banner.find( '.show-on-blue-detached' );
			var overflowCover = $banner.find( '.overflow-toggle-area-cover' );
			var filterBar = $banner.find( '.n-banner-3rd-filler-dark' );
			if ( detach ) {
				hiddenOnBlueDetach.hide();
				showOnBlueDetach.show();
				overflowCover.show();
				filterBar.hide();
			} else {
				hiddenOnBlueDetach.show();
				showOnBlueDetach.hide();
				overflowCover.hide();
				if ( $banner.find( '.filter-bar' ).css( "display" ) !== "none" ) {
					filterBar.show();
				}
			}
		}

		function bannerBlueBlockDetached() {
			/*jshint validthis:true */
			var $banner = $( this );
			$banner.attr( "data-visual-break", true );
			toggleVisibleBlocksWhenBlueDetached( {
				$banner: $banner,
				detach: true
			} );

			//rightmost tab need to hide
			var navTabDownRightmostTab = $banner.find( '.n-banner-2nd .rightmost-tab' );
			navTabDownRightmostTab.removeClass( 'rightmost-tab' ).addClass( 'rightmost-tab-disabled' );

			//transform style for nav links
			var navLinks = $banner.find( CSSSelectorMap.DetachedNavLinks );
			var navDropdownLinks = $banner.find( CSSSelectorMap.DetachedNavDropdownLinks );
			navDropdownLinks.find( 'li.dropdown' ).each( function() {
				$banner.addClass( 'n-dropdown-menu-item-has-child' );
			} );
			navDropdownLinks.find( 'ul.dropdown-menu' ).each( function() {
				$banner.addClass( 'n-dropdown-sub-menu' );
			} );
			navLinks.removeClass( CSSSelectorMap.navLinksAttatchedClass ).addClass( CSSSelectorMap.navLinksDetachedClass );
			navDropdownLinks.removeClass( CSSSelectorMap.navDropdownLinksAttatchedClass ).addClass( CSSSelectorMap.navDropdownLinksDetachedClass );

			//add class for showing dropdown correctly
			var navLinksSubmenu = $banner.find( CSSSelectorMap.DetachedNavLinksSubmenu );
			navLinksSubmenu.addClass( 'n-collapse-dropdown-sub-menu' );
		}

		function bannerBlueBlockAttached() {
			/*jshint validthis:true */
			var $banner = $( this );
			$banner.attr( "data-visual-break", false );
			toggleVisibleBlocksWhenBlueDetached( {
				$banner: $banner,
				detach: false
			} );

			//rightmost tab need to show
			var navTabDownRightmosTab = $banner.find( '.n-banner-2nd .rightmost-tab-disabled' );
			navTabDownRightmosTab.removeClass( 'rightmost-tab-disabled' ).addClass( 'rightmost-tab' );

			//transform style for nav links
			var navLinks = $banner.find( CSSSelectorMap.attachNavLinks );
			var navDropdownLinks = $banner.find( CSSSelectorMap.attachNavDropdownLinks );
			navDropdownLinks.find( 'li.dropdown' ).each( function() {
				$banner.removeClass( 'n-dropdown-menu-item-has-child' );
			} );
			navDropdownLinks.find( 'ul.dropdown-menu' ).each( function() {
				$banner.removeClass( 'n-dropdown-sub-menu' );
			} );
			navLinks.removeClass( CSSSelectorMap.navLinksDetachedClass ).addClass( CSSSelectorMap.navLinksAttatchedClass );
			navDropdownLinks.removeClass( CSSSelectorMap.navDropdownLinksDetachedClass ).addClass( CSSSelectorMap.navDropdownLinksAttatchedClass );

			//remove class
			var navLinksSubmenu = $banner.find( CSSSelectorMap.attachNavLinksSubmenu );
			navLinksSubmenu.removeClass( 'n-collapse-dropdown-sub-menu' );
		}

		//show or hide menu function
		var hideSubMenu = function( $subMenu ) {
			$subMenu.css( "left", "auto" );
			$subMenu.removeClass( "open" );
			$subMenu.siblings( 'a' ).removeClass( "n-dropdown-sub-menu-parent-active" );
		};
		var showSubMenu = function( $parent ) {
			var parentMenuWidth = $parent.parent( "ul" ).innerWidth();
			var $subMenu = $parent.children( ".n-dropdown-sub-menu" );
			if ( parentMenuWidth < ( $parent.closest( ".n-banner" ).width() - $parent.offset().left ) ) {
				$subMenu.css( "left", parentMenuWidth + "px" );
			} else {
				$subMenu.css( "left", "-" + $subMenu.innerWidth() + "px" );
			}
			hideSubMenu( $parent.siblings( "li.n-dropdown-menu-item-has-child" ).children( ".n-dropdown-sub-menu.open" ) );
			$subMenu.addClass( "open" );
			$parent.children( 'a' ).addClass( "n-dropdown-sub-menu-parent-active" );
		};
		var setSubMenuItemFocus = function( $item, isUpMove ) {
			$item.siblings( "li" ).children( "a" ).blur();
			var prevItem = isUpMove ? $item.prev( "li" ) : $item.next( "li" );
			if ( prevItem.length === 0 ) {
				prevItem = isUpMove ? $item.parent().children( "li" ).last() : $item.parent().children( "li" ).first();
			}
			prevItem.children( "a" ).focus();
		};

		var showCollapsedSubMenu = function( $parent ) {
			var parentMenuWidth = $parent.parent( "ul" ).innerWidth();
			var $subMenu = $parent.children( ".n-collapse-dropdown-sub-menu" );
			if ( parentMenuWidth < ( $parent.closest( ".n-banner" ).width() - $parent.offset().left ) ) {
				$subMenu.css( "left", parentMenuWidth + "px" );
			} else {
				var subMenuPos = $subMenu.innerWidth() + 2;
				$subMenu.css( "left", "-" + subMenuPos + "px" );
			}

			$parent.addClass( "open" );
			$parent.children( 'a' ).eq( 0 ).addClass( "n-dropdown-sub-menu-parent-active" );
		};
		var hideCollapsedSubMenu = function( $parent ) {
			$parent.children( ".n-collapse-dropdown-sub-menu" ).css( "left", "auto" );
			$parent.removeClass( "open" );
			$parent.children( 'a' ).eq( 0 ).removeClass( "n-dropdown-sub-menu-parent-active" );

		};
		var bannerThirdLevelControl = function() {
			var div = $( this ).find( "div" );
			if ( !div.hasClass( "n-banner-overflow-control" ) ) {
				$( ".n-banner-3rd-filler-gray" ).hide();
				$( ".n-banner-3rd" ).find( ".n_banner_3rd_subItem" ).hide();
			}

			if ( $( this ).hasClass( "n-banner-3Link" ) ) {
				var id = $( this ).find( "a" ).data( "item" );
				$( ".n-banner-3rd-filler-gray" ).show();
				$( ".n-banner-3rd" ).show();
				$( "#" + id ).show();
			}
		};

		var activateFocusedTab = function( $this ) {
			var parentLi = $this.closest( "li" );
			parentLi.siblings( "li" ).removeClass( "active" );
			parentLi.addClass( "active" );
			var barGrayToBlue = parentLi.closest( ".n-banner-tabs" ).siblings( ".n-banner-2nd-gray-to-blue" );
			if ( barGrayToBlue.length > 0 ) {
				if ( parentLi.hasClass( "rightmost-tab" ) ) {
					barGrayToBlue.addClass( "active" );
				} else {
					barGrayToBlue.removeClass( "active" );
				}
			}
		};
		/*--------------- end dom methods ---------------*/


		/*--------------- start event handlers ----------*/
		$bannersInPage.on( bannerBlueDetachEvent, bannerBlueBlockDetached ).on( bannerBlueAttachEvent, bannerBlueBlockAttached );
		nBannerTabs.on( "mouseover", CSSSelectorMap.dropdownItemHasChild, function() {
			showSubMenu( $( this ) );
		} );
		nBannerTabs.on( "mouseleave", CSSSelectorMap.dropdownItemHasChild, function() {
			hideSubMenu( $( this ).children( ".n-dropdown-sub-menu" ) );
		} );

		// add key event to show or close sub menu
		nBannerTabs.on( "keydown", CSSSelectorMap.dropdownItemHasChild, function( event ) {
			// click right arrow, open sub menu;
			if ( event.keyCode === KEY.right || event.keyCode === KEY.space || event.keyCode === KEY.enter ) {
				var $subMenu = $( this ).children( ".n-dropdown-sub-menu" );
				if ( !$subMenu.hasClass( "open" ) ) {
					showSubMenu( $( this ) );
					$( this ).blur();
					$subMenu.children( "li" ).first().children( "a" ).focus();
				}
			}
		} );
		nBannerTabs.on( "click", ".n-banner-dropdown-toggle", function() {
			var nDropdownSubmenuOpen = nDropdownSubmenuOpen || $( ".n-dropdown-sub-menu.open" );
			if ( nDropdownSubmenuOpen.length !== 0 ) {
				nDropdownSubmenuOpen.removeClass( "open" );
				nDropdownSubmenuOpen.siblings( 'a' ).removeClass( "n-dropdown-sub-menu-parent-active" );
			}
		} );
		nBannerTabs.on( "click", ".dropdown-menu>li", function() {
			if ( !$( this ).parent().hasClass( "open" ) ) {
				$( this ).closest( ".dropdown" ).find( "a" ).first().focus();
			}
		} );

		// add key event to move focus of sub menu item
		nBannerTabs.on( "keydown", ".n-dropdown-sub-menu>li", function( event ) {
			event.stopPropagation();
			// click up arrow
			if ( event.keyCode === KEY.up ) {
				setSubMenuItemFocus( $( this ), true );
				event.preventDefault();
			}
			// click down arrow
			else if ( event.keyCode === KEY.down ) {
				setSubMenuItemFocus( $( this ), false );
				event.preventDefault();
			}
			// click left arrow, close sub menu;
			else if ( event.keyCode === KEY.left ) {
				var $subMenu = $( this ).parent( ".n-dropdown-sub-menu" );
				hideSubMenu( $subMenu );
				$subMenu.prev( "a" ).focus();
			}
		} );
		nBannerTabs.on( "keydown", ">li>a", function( e ) {
			if ( e.keyCode === KEY.space || e.keyCode === KEY.enter ) {
				activateFocusedTab( $( this ) );
			}
		} );
		nBannerTabs.on( 'keydown', "li", function( e ) {
			if ( e.keyCode === KEY.space || e.keyCode === KEY.enter ) {
				e.preventDefault();
				e.stopPropagation();
				var haveChild = $( this ).hasClass( 'n-dropdown-menu-item-has-child' );
				if ( !haveChild ) {
					$( e.target )[ 0 ].click();
				}
				bannerThirdLevelControl.call( this );
			}
		} );

		// hide all sub menu
		$( document ).on( 'click.bs.dropdown.data-api', function() {
			var nDropdownSubmenuOpen = nDropdownSubmenuOpen || $( ".n-dropdown-sub-menu.open" );
			if ( nDropdownSubmenuOpen.length !== 0 ) {
				nDropdownSubmenuOpen.removeClass( "open" );
				nDropdownSubmenuOpen.siblings( 'a' ).removeClass( "n-dropdown-sub-menu-parent-active" );
			}
		} );

		//Secondary Navigation Horizontal
		$( document ).on( 'click', CSSSelectorMap.navSecondHoverItem, function() {
			var $this = $( this );
			$( CSSSelectorMap.navSecondHoverItem ).removeClass( 'selected' );
			if ( !$this.hasClass( 'selected' ) ) {
				$this.addClass( 'selected' );
			}
		} );
		$( document ).on( 'scroll', function() {
			if ( $( this ).scrollTop() ) {
				$( '.n-banner-secondary-row' ).addClass( 'n-banner-secondary-row-scrolled' );
			} else {
				$( '.n-banner-secondary-row' ).removeClass( 'n-banner-secondary-row-scrolled' );
			}
		} );

		//Adjust Banner menu item alignment
		$( document ).on( 'show.bs.dropdown', CSSSelectorMap.bannerRightDropdown, function() {
			if ( $( this ).offset().left + $( this ).children( "ul" ).eq( 0 ).width() > $( window ).width() ) {
				$( this ).addClass( "pull-right" );
			} else {
				$( this ).removeClass( "pull-right" );
			}
		} );

		//update the info of 3rd nav
		nBannerTabs.on( 'click', ">li", function() {
			activateFocusedTab( $( this ) );
			bannerThirdLevelControl.call( this );
		} );

		//Check if open submenu looses focus and needs to be closed
		$( 'a' ).blur( function( event ) {
			var tgt = $( event.target || event.srcElement );
			var parentLi$ = $( tgt.closest( "li.dropdown" ) );
			if ( parentLi$.length > 0 && parentLi$.hasClass( "open" ) ) {
				//Check if any of children is focused, timeout needed to wait for focus to change
				setTimeout( function() {
					//If focus is in header, do not close
					if ( parentLi$.find( "ul li a:focus" ).length === 0 ) {
						var firstA = $( parentLi$ ).find( 'a' ).first();
						if ( !$( firstA ).is( ":focus" ) ) {
							hideSubMenu( parentLi$ );
							$( parentLi$ ).find( 'a' ).first().attr( "aria-expanded", "false" );
						}
					}
				}, 50 );
			}
		} );

		$( ".n_banner_3rd_subItem" ).on( "focus", ">li>a", function() {
			var $this = $( this );
			var parentLi = $this.closest( "li" );
			parentLi.siblings( "li" ).removeClass( "active" );
			parentLi.addClass( "active" );
		} );
		//collapsed banner toggle
		nBannerLinksCollapse.on( "mouseover", CSSSelectorMap.collapseDropdownMenu, function() {
			showCollapsedSubMenu( $( this ) );
		} );
		nBannerLinksCollapse.on( "mouseleave", CSSSelectorMap.collapseDropdownMenu, function() {
			hideCollapsedSubMenu( $( this ) );
		} );
		/*--------------- end event handlers ----------*/


		/*--------------- start public methods ----------*/
		/*--------------- end public methods ----------*/


		/*-------------- start common event bind ----------*/
		// responsive banner behavior when blue areas in 2 rows are detached
		$( document ).ready( triggerCollapseBanner );
		$( window ).resize( triggerCollapseBanner );
		/*-------------- end common event bind ----------*/

		// BANNER KEYBOARD ACCESSIBILITY
		// =============================
		$( document ).on( 'keydown.wf.banner.keyboard', '.n-banner-tabs li, .n-banner-links li, .n_banner_3rd_subItem li',
			$.wfKBCore.commonKeyboardHandler );

		$( document ).on( 'click', function( e ) {
			$( 'li.selected' ).each( function( index, el ) {
				if ( el && !el.contains( e.target ) ) {
					$( '.local-navigation .nav-secondary-horizontal li' ).removeClass( 'selected' );
				}
			} );
		} );

		$( document ).on( 'keydown', '.local-navigation .nav-secondary-horizontal li', function( e ) {
			if ( e.keyCode === KEY.space || e.keyCode === KEY.enter ) {
				e.preventDefault();
				e.stopPropagation();
				$( e.target )[ 0 ].click();
			} else if ( e.keyCode === KEY.left ) {
				$( this ).prev().children( "a" ).focus();
			} else if ( e.keyCode === KEY.right ) {
				$( this ).next().children( "a" ).focus();
			}
		} );

	} )( $ );


	//navfilterbar.js
	( function( $ ) {

		var updateFilterBarContent = function( $item ) {
			var filterBar = $( '.filter-bar' );
			var month = filterBar.find( ".n-list-months" ).find( ".selected span" ).html();
			var year = filterBar.find( ".n-list-years" ).find( ".selected span" ).html();
			var country = filterBar.find( ".n-list-countries" ).find( ".selected span" ).html();
			var city = filterBar.find( ".n-list-cities" ).find( ".selected span" ).html();
			if ( month && year && country && city ) {
				$item.find( ".filter-bar-setting-item" ).html( month.substr( 0, 3 ) + " " + year + ", " + country + ", " + city );
			}
		};

		var appendLiItems = function( item, itemSelected, $itemParent ) {
			var liItem = "<li class='n-list-group-item ";
			if ( item === itemSelected ) {
				liItem += "selected' tabindex='0'";
			} else {
				liItem += "' tabindex='-1'";
			}
			liItem += "><span>" + item + "</span></li>";
			$itemParent.append( liItem );
		};

		var loadCities = function( citiesData, citySelected ) {
			var citiesContainer = $( ".n-list-cities" );
			if ( citiesContainer ) {
				if ( citiesContainer.find( ".mCSB_container" ).html() ) {
					citiesContainer = citiesContainer.find( ".mCSB_container" );
				}
				citiesContainer.empty();
				appendLiItems( "All cities", citySelected, citiesContainer );
				$.each( citiesData, function( i, item ) {
					appendLiItems( item.city, citySelected, citiesContainer );
				} );
				if ( citiesContainer.find( ".n-list-group-item[tabindex='0']" ).length < 1 ) {
					citiesContainer.find( ".n-list-group-item:first" ).attr( "tabindex", 0 );
				}
			}
		};

		var loadCountries = function( countriesCities ) {
			var filterBarContent = $( this ).find( ".filter-bar-tab .filter-bar-setting-item" ).html().split( "," );
			var countryCurrent = filterBarContent[ 1 ].trim();
			var cityCurrent = filterBarContent[ 2 ].trim();
			var countriesContainer = $( ".n-list-countries" );
			if ( countriesContainer ) {
				var countriesUl = countriesContainer;
				if ( countriesUl.find( ".mCSB_container" ).html() ) {
					countriesUl = countriesUl.find( ".mCSB_container" );
				}
				countriesUl.empty();
				$.each( countriesCities.countries, function( i, item ) {
					appendLiItems( item.country, countryCurrent, countriesUl );
					if ( item.country === countryCurrent ) {
						loadCities( item.cities, cityCurrent );
					}
				} );
				if ( countriesUl.find( ".n-list-group-item[tabindex='0']" ).length < 1 ) {
					countriesUl.find( ".n-list-group-item:first" ).attr( "tabindex", 0 );
				}
			}
			countriesContainer.on( "click", function( e ) {
				var divCitiesContainer = $( ".n-list-cities" ).find( "div.mCSB_container" );
				var country = "";
				if ( e.toElement ) {
					country = e.toElement.innerText;
				} else {
					country = e.target.innerText;
				}
				if ( divCitiesContainer ) {
					$.each( countriesCities.countries, function( i, item ) {
						if ( item.country === country ) {
							loadCities( item.cities, cityCurrent );
							return true;
						}
					} );
				}
			} );
		};

		$( ".filter-bar-nav" )
			.on( 'click', 'li', function( e ) {
				var filterBar = $( '.filter-bar' );
				var bannerSecond = $( e.target ).closest( '.n-banner-2nd' );
				var ulFilter = bannerSecond.find( "ul" ).first();
				var maskFilter = bannerSecond.find( ".gray-mask" ).first();
				var cornerFilter = bannerSecond.find( ".gray-corner" ).first();
				if ( filterBar.css( "display" ) !== "none" ) {
					ulFilter.find( "span" ).css( 'display', 'block' );
					ulFilter.removeAttr( "style" );
					ulFilter.removeClass( 'n-banner-filter-background' );
					maskFilter.removeClass( 'n-banner-filter-background' );
					cornerFilter.removeClass( 'n-banner-filter-background' );
					$( ".n-banner-3rd-filler-dark" ).css( 'display', 'none' );
					filterBar.css( 'display', 'none' );
					$( this ).find( ".icon-settings-menu" ).removeClass( "icon-transform-upside-down" );
					updateFilterBarContent( $( this ) );
				} else {
					ulFilter.css( 'width', ulFilter.css( 'width' ) );
					ulFilter.find( "span" ).css( 'display', 'none' );
					ulFilter.addClass( 'n-banner-filter-background' );
					maskFilter.addClass( 'n-banner-filter-background' );
					cornerFilter.addClass( 'n-banner-filter-background' );
					$( ".n-banner-3rd-filler-dark" ).css( 'display', 'block' );
					filterBar.css( 'display', 'block' );
					$( this ).find( ".icon-settings-menu" ).addClass( "icon-transform-upside-down" );
				}
			} )
			.on( 'mouseenter', 'li', function() {
				updateFilterBarContent( $( this ) );
			} );

		$( document ).ready( function() {
			var filterBarSettingItem = $( ".filter-bar-tab" ).find( ".filter-bar-setting-item" );
			if ( filterBarSettingItem.length > 0 ) {
				var filterBarContent = filterBarSettingItem.html().split( "," );
				var dateContent = filterBarContent[ 0 ].trim().split( " " );
				var monthCurrent = dateContent[ 0 ];
				var yearCurrent = dateContent[ 1 ];
				$( ".n-banner-2nd > ul" ).clone().insertBefore( "div.filter-bar-footer > div.n-banner-right" );
				$( ".n-banner-2nd > .n-banner-2nd-gray-to-blue" ).clone().insertAfter( "div.filter-bar-footer > div.n-banner-right" );
				var months = [ "December", "November", "October", "September", "August", "July", "June", "May", "April", "March", "February", "January" ];
				$.each( months, function( i, item ) {
					var liItem = "<li class='n-list-group-item ";
					if ( item.substr( 0, 3 ) === monthCurrent ) {
						liItem += "selected";
					}
					liItem += "'><span>" + item + "</span></li>";
					$( "ul.n-list-months" ).append( liItem );
				} );
				var currentYear = new Date().getFullYear();
				for ( var i = 0; i < 11; i++ ) {
					appendLiItems( currentYear - i + "", yearCurrent, $( "ul.n-list-years" ) );
				}
				$( "ul.n-list-countries" ).append( "<li class='n-list-group-item' tabindex='0'><span>All</span></li>" );
				$( "ul.n-list-cities" ).append( "<li class='n-list-group-item' tabindex='0'><span>All cities</span></li>" );
			}
		} );

		$.fn.extend( {
			loadCountries: loadCountries
		} );

	} )( $ );


	//panels.js
	( function( $ ) {

		$.fn.extend( {
			slideToggleVertical: function( options ) {
				var $slideBar = $( this );
				var currentImg = $slideBar.find( ".icon" );
				var speed = 500;
				var isOpen = options && options.isOpen;
				var panelBody = $slideBar.parent().find( ".panel-body" );
				speed = options && options.speed;
				if ( isOpen ) {
					$( panelBody ).css( "display", "block" );
					currentImg.removeClass( 'icon-right' ).addClass( "icon-down" );
				} else {
					$( panelBody ).css( "display", "none" );
					currentImg.removeClass( 'icon-down' ).addClass( "icon-right" );
				}
				$slideBar.click( function() {
					panelBody.slideToggle( speed, function() {
						if ( panelBody.is( ":visible" ) ) {
							currentImg.removeClass( 'icon-right' ).addClass( "icon-down" );
						} else {
							currentImg.removeClass( 'icon-down' ).addClass( "icon-right" );
						}
					} );
				} );
			},
			slideToggleHorizontal: function( options ) {
				var isLeftOpen = options && options.isLeftOpen;
				var leftWidth = options && options.leftWidth;
				var $span = $( this );
				var parentLeft = $span.parent();
				var parentRight = parentLeft.parent().find( ".panel-right" );
				var panelBody = parentLeft.find( ".panel .panel-body" );
				var parent = $span.parent().find( ".panel" );
				var currentImg = $span.find( "span" );
				var myLeftWidth = typeof( leftWidth ) === "undefined" ? 30 : leftWidth;
				var myLeftOpen = typeof( isLeftOpen ) === "undefined" ? true : isLeftOpen;
				if ( myLeftOpen ) {
					parentLeft.css( {
						width: myLeftWidth + "%"
					} );
					parentRight.css( {
						width: "calc(" + ( 100 - myLeftWidth ) + "% - " + "20px)",
						"margin-left": "20px"
					} );
					parentLeft.addClass( "panel-shadow" );
					parentLeft.find( "div" ).each( function() {
						$( this ).show();
					} );
					$span.css( {
						'border-top-left-radius': '0px',
						'border-bottom-left-radius': '0px'
					} );
					parentRight.addClass( "open" );
					currentImg.removeClass( 'icon-right' ).addClass( 'icon-left' );
				} else {
					parentLeft.css( {
						width: "0"
					} );
					parentRight.css( {
						width: "calc(100% - 40px)",
						'margin-left': '40px'
					} );
					$( parent ).find( "div" ).each( function() {
						$( this ).hide();
					} );
					parentLeft.removeClass( "panel-shadow" );
					$span.css( {
						'border-top-left-radius': '7px',
						'border-bottom-left-radius': '7px'
					} );
					currentImg.removeClass( 'icon-left' ).addClass( 'icon-right' );
				}
				$span.click( function() {
					var currentArrow = $( this );
					if ( panelBody.is( ":visible" ) ) {

						var leftWidth = parentLeft.width();
						var rightWidth = parentRight.width();
						parentLeft.removeClass( "panel-shadow" );
						parentLeft.animate( {
							width: 0
						}, "show", function() {
							$( parent ).find( "div" ).each( function() {
								$( this ).hide();
							} );
							currentArrow.css( {
								'border-top-left-radius': '7px',
								'border-bottom-left-radius': '7px'
							} );
							currentImg.removeClass( 'icon-left' ).addClass( 'icon-right' );
						} );
						var current = leftWidth + rightWidth - 20;
						parentRight.animate( {
							width: current + "px",
							'margin-left': '40px'
						} );

					} else {
						parentLeft.find( "div" ).each( function() {
							$( this ).show();
						} );
						parentRight.css( {
							width: "calc(" + ( 100 - myLeftWidth ) + "% - " + "20px)",
							"margin-left": "20px"
						} );
						parentLeft.animate( {
							width: myLeftWidth + "%"
						}, "show", function() {
							parentLeft.addClass( "panel-shadow" );
							currentArrow.css( {
								'border-top-left-radius': '0px',
								'border-bottom-left-radius': '0px'
							} );
						} );
						currentImg.removeClass( 'icon-right' ).addClass( 'icon-left' );
					}
				} );
			}
		} );

		// PANEL KEYBOARD ACCESSIBILITY
		// ============================
		var UP_KEY = 38;
		var DOWN_KEY = 40;

		$( document ).on( 'keydown.wf.panel.keyboard', '.panel-heading', {
				notSupport: [ UP_KEY, DOWN_KEY ]
			}, $.wfKBCore.commonKeyboardHandler )
			.on( 'keydown.wf.panel.keyboard', '.panel-arrow', {
				notSupport: [ UP_KEY, DOWN_KEY ]
			}, $.wfKBCore.commonKeyboardHandler );

	} )( $ );


	//radiogroup.js
	( function( $ ) {

		var ENTER_KEY = 13;
		var LEFT_KEY = 37;
		var RIGHT_KEY = 39;
		var UP_KEY = 38;
		var DOWN_KEY = 40;

		$.fn.radioButtonFocus = function() {
			var groups = [];

			// group the inputs by name
			$( this ).each( function() {
				var el = this;
				var thisGroup = groups[ el.name ] = ( groups[ el.name ] || [] );
				thisGroup.push( el );
			} );

			$( this ).on( 'keydown', function( e ) {
				var isCtrlKey = ( window.event && window.event.ctrlKey ) || e.ctrlKey;
				if ( isCtrlKey && ( e.keyCode === LEFT_KEY || e.keyCode === UP_KEY || e.keyCode === RIGHT_KEY || e.keyCode === DOWN_KEY ) ) {
					e.preventDefault();
				}

				setTimeout( function() {
					var el = e.target;
					var thisGroup = groups[ el.name ] = ( groups[ el.name ] || [] );
					var indexOfTarget = thisGroup.indexOf( e.target );
					var nextIndex = 0;

					if ( ( e.keyCode === LEFT_KEY || e.keyCode === UP_KEY ) && isCtrlKey ) {
						if ( indexOfTarget > 0 ) {
							nextIndex = indexOfTarget - 1;
						} else {
							nextIndex = thisGroup.length - 1;
						}
						while ( $( thisGroup[ nextIndex ] ).is( ':disabled' ) ) {
							if ( nextIndex > 0 ) {
								nextIndex = nextIndex - 1;
							} else {
								nextIndex = thisGroup.length - 1;
							}
						}
						thisGroup[ nextIndex ].focus();
					}
					if ( ( e.keyCode === RIGHT_KEY || e.keyCode === DOWN_KEY ) && isCtrlKey ) {
						if ( indexOfTarget < ( thisGroup.length - 1 ) ) {
							nextIndex = indexOfTarget + 1;
						} else {
							nextIndex = 0;
						}
						while ( $( thisGroup[ nextIndex ] ).is( ':disabled' ) ) {
							if ( nextIndex < ( thisGroup.length - 1 ) ) {
								nextIndex = nextIndex + 1;
							} else {
								nextIndex = 0;
							}
						}
						thisGroup[ nextIndex ].focus();
					}
					if ( e.keyCode === ENTER_KEY ) {
						el.checked = true;
					}
				} );
			} );
		};

		$( document ).ready( function() {
			$( '.n-radio-btn' ).radioButtonFocus();
		} );


	} )( $ );


	//resize.js
	( function( $ ) {

		var Resizable = function( el ) {
			el = $( el );
			var resizeObject = this;

			resizeObject.init = function() {
				var p = $( el ).get( 0 );
				var resizer = document.createElement( 'div' );
				resizer.style.width = '10px';
				resizer.style.height = '10px';
				resizer.style.position = 'absolute';
				resizer.style.right = 0;
				resizer.style.bottom = 0;
				resizer.style.cursor = 'se-resize';
				resizer.className = 'resizer';
				p.className = p.className + ' resizable';
				p.appendChild( resizer );
				resizer.addEventListener( 'mousedown', initResize, false );

				var startX, startY, startWidth, startHeight;

				function initResize( e ) {
					startX = e.clientX;
					startY = e.clientY;
					startWidth = parseInt( document.defaultView.getComputedStyle( p, null ).width, 10 );
					startHeight = parseInt( document.defaultView.getComputedStyle( p, null ).height, 10 );
					document.documentElement.addEventListener( 'mousemove', doResize, false );
					document.documentElement.addEventListener( 'mouseup', stopResize, false );
				}

				function doResize( e ) {
					p.style.width = ( startWidth + e.clientX - startX ) + 'px';
					p.style.height = ( startHeight + e.clientY - startY ) + 'px';
					e.preventDefault();
				}

				function stopResize() {
					document.documentElement.removeEventListener( 'mousemove', doResize, false );
					document.documentElement.removeEventListener( 'mouseup', stopResize, false );
				}
			};
			resizeObject.init();
		};

		var HTMLAttributes = function() {
			var input = $( this ),
				options = {},
				resize = ( input.attr( 'data-resize' ) === 'true' || input.attr( 'data-resize' ) === 'True' );
			if ( resize ) {
				return input.data( 'wf.resizable', new Resizable( this, options ) );
			}
		};

		var globalsResize = {
			resizeElements: 'div',
			dataResizeAttr: '*[data-resize]'
		};

		var applyDataResize = function( selector ) {
			selector = selector || globalsResize.resizeElements;
			var $selector = ( selector instanceof $ ) ? selector : $( selector );
			$selector.filter( globalsResize.dataResizeAttr ).each( HTMLAttributes );
		};

		var old = $.fn.resizeable;

		$.fn.resizeable = function() {
			var resizeFunction = function() {
				return $( this ).data( 'wf.resizable', new Resizable( this ) );

			};
			$( this ).each( resizeFunction );
			return this;
		};

		$.fn.resizeable.noConflict = function() {
			$.fn.resizeable = old;
			return this;
		};

		$( document ).ready( function() {
			applyDataResize( 'div' );
		} );


	} )( $ );


	//search.js
	( function( $ ) {

		// SEARCH PUBLIC CLASS DEFINITION
		// ==============================
		var Search = function( element, options ) {};

		if ( !$.fn.nInputField ) {
			throw new Error( 'Balloon requires WULF inputfield.js' );
		}

		Search.VERSION = '1.1.0';

		// NOTE: SEARCH EXTENDS inputfield.js
		// ================================
		Search.prototype = $.extend( {}, $.fn.nInputField.Constructor.prototype );
		Search.prototype.constructor = Search;

		// SEARCH INTERNAL METHODS
		// ========================

		// SEARCH PLUGIN DEFINITION
		// =========================
		function Plugin( option ) {
			return this.each( function() {
				var $this = $( this );
				var data = $this.data( 'wf.search' );
				var options = typeof option === 'object' && option;

				if ( !data && /destroy|hide/.test( option ) ) {
					return;
				}
				if ( !data ) {
					$this.data( 'wf.search', ( data = new Search( this, options ) ) );
				}
				if ( typeof option === 'string' ) {
					data[ option ]();
				}
			} );
		}

		var old = $.fn.nSearch;

		$.fn.nSearch = Plugin;
		$.fn.nSearch.Constructor = Search;

		// SEARCH NO CONFLICT
		// ===================
		$.fn.nSearch.noConflict = function() {
			$.fn.nSearch = old;
			return this;
		};

		// CLOSE OPEN DROPDOWN WITH MOUSE OR KEYBOARD INPUT
		// ================================================
		function CloseDropdown() {
			if ( $( this ).parent( ".n-search" ).hasClass( "open" ) ) {
				$( this ).parent( ".n-search" ).removeClass( "open" );
				$( this ).prev( ".dropdown-toggle" ).attr( "aria-expanded", "false" );
			}
		}
		// MOUSE HOVER ON BUTTON
		// =====================
		function MouseOverButton() {
			if ( $( this ).parent( ".n-search-clearable" ).hasClass( "open" ) && $( this ).siblings( '.n-inputfield' ).is( ":focus" ) ) {
				$( this ).parent().addClass( "n-search-input-move" );
			}
			if ( $( this ).siblings( '.dropdown-toggle' ).is( ":focus" ) && !$( this ).parent().hasClass( "open" ) ) {
				$( this ).parent().addClass( "n-search-dropdown-focus" );
			}
		}

		function MouseLeaveButton() {
			$( this ).parent().removeClass( "n-search-input-move" );
			$( this ).parent().removeClass( "n-search-dropdown-focus" );
		}

		function SelectItemMoveFocus() {
			$( this ).parent().siblings( '.n-search-input' ).attr( 'placeholder', $( this ).find( 'a>span' ).html() );
			$( this ).parent().siblings( '.n-search-input' ).focus();
		}

		$( document )
			.on( 'click.wf.forms', '.n-search-clearable .n-search-control-icon', Search.prototype.clearContent )
			.on( 'click.wf.forms', '.dropdown-menu>li', SelectItemMoveFocus )
			.on( 'click.wf.search.mouse', '.n-search-input', CloseDropdown )
			.on( 'mouseover.wf.search.mouse', '.n-search-control-icon', MouseOverButton )
			.on( 'mouseleave.wf.search.mouse', '.n-search-control-icon', MouseLeaveButton )
			.on( 'mouseover.wf.search.mouse', '.n-search-button', MouseOverButton )
			.on( 'mouseleave.wf.search.mouse', '.n-search-button', MouseLeaveButton )
			.on( 'keypress.wf.search.keyboard', '.n-search-input', CloseDropdown );

	} )( $ );


	//tab.js
	( function( $ ) {

		$( document ).ready( function() {
			$( ".nav.nav-tabs li:not('.disabled') .icon-close" ).click( function( e ) {
				e.stopPropagation();
				var $parent = $( this ).closest( "ul" );
				var $current = $( this ).closest( "li" );
				$current.remove();
				if ( $parent.find( "li.active" ).length === 0 ) {
					$parent.find( "li:nth-child(1):not('.disabled')" ).addClass( "active" ).parent()
						.next().children().removeClass( "active" );
					$( $parent.find( "li.active" ).children( 'a:nth-child(1)' ).attr( "href" ) ).addClass( "active" );
				}
				if ( $parent.children( "li:not('.disabled')" ).length === 0 ) {
					$parent.next().html( "" );
				}
				if ( $parent.find( "li.active" ).length !== 0 ) {
					$parent.find( "li.active a:nth-child(1)" ).focus();
				}
			} );

		} );

		$( document ).on( 'click.wf.tab', '.nav.nav-tabs li', function focusOnScroll() {
			var $parent = $( this ).closest( "ul" );
			var $tabContent = $parent.next( ".tab-content.tab-content-scroll" );
			if ( $tabContent.length ) {
				setTimeout( function() {
					$tabContent.find( ".mCustomScrollBox" ).focus();
				}, 50 );
			}
		} );

		$( document )
			.on( 'keydown.wf.common.keyboard', '.nav-tabs', $.wfKBCore.commonKeyboardHandler );


	} )( $ );


	//tabbable.js
	( function( $ ) {

		/**
		 * Focusses the next :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
		 * Does not take into account that the taborder might be different as the :tabbable elements order
		 * (which happens when using tabindexes which are greater than 0).
		 */
		$.focusNext = function() {
			selectNextTabbableOrFocusable( ':focusable' );
		};

		/**
		 * Focusses the previous :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
		 * Does not take into account that the taborder might be different as the :tabbable elements order
		 * (which happens when using tabindexes which are greater than 0).
		 */
		$.focusPrev = function() {
			selectPrevTabbableOrFocusable( ':focusable' );
		};

		/**
		 * Focusses the next :tabable element.
		 * Does not take into account that the taborder might be different as the :tabbable elements order
		 * (which happens when using tabindexes which are greater than 0).
		 */
		$.tabNext = function() {
			selectNextTabbableOrFocusable( ':tabbable' );
		};

		/**
		 * Focusses the previous :tabbable element
		 * Does not take into account that the taborder might be different as the :tabbable elements order
		 * (which happens when using tabindexes which are greater than 0).
		 */
		$.tabPrev = function() {
			selectPrevTabbableOrFocusable( ':tabbable' );
		};

		$.getNextTabbale = function() {
			var selectables = $( ':tabbable' );
			var current = $( ':focus' );
			var nextIndex = 0;
			if ( current.length === 1 ) {
				var currentIndex = selectables.index( current );
				if ( currentIndex + 1 < selectables.length ) {
					nextIndex = currentIndex + 1;
				}
			}

			return selectables.eq( nextIndex );
		};

		$.getPrevTabbale = function() {
			var selectables = $( ':tabbable' );
			var current = $( ':focus' );
			var prevIndex = selectables.length - 1;
			if ( current.length === 1 ) {
				var currentIndex = selectables.index( current );
				if ( currentIndex > 0 ) {
					prevIndex = currentIndex - 1;
				}
			}

			return selectables.eq( prevIndex );
		};

		function selectNextTabbableOrFocusable( selector ) {
			var selectables = $( selector );
			var current = $( ':focus' );
			var nextIndex = 0;
			if ( current.length === 1 ) {
				var currentIndex = selectables.index( current );
				if ( currentIndex + 1 < selectables.length ) {
					nextIndex = currentIndex + 1;
				}
			}

			selectables.eq( nextIndex ).focus();
		}

		function selectPrevTabbableOrFocusable( selector ) {
			var selectables = $( selector );
			var current = $( ':focus' );
			var prevIndex = selectables.length - 1;
			if ( current.length === 1 ) {
				var currentIndex = selectables.index( current );
				if ( currentIndex > 0 ) {
					prevIndex = currentIndex - 1;
				}
			}

			selectables.eq( prevIndex ).focus();
		}

		/**
		 * :focusable and :tabbable, both taken from jQuery UI Core
		 */
		$.extend( $.expr[ ':' ], {
			data: $.expr.createPseudo ?
				$.expr.createPseudo( function( dataName ) {
					return function( elem ) {
						return !!$.data( elem, dataName );
					};
				} ) :
				// support: jQuery <1.8
				function( elem, i, match ) {
					return !!$.data( elem, match[ 3 ] );
				},

			focusable: function( element ) {
				return focusable( element, !isNaN( $.attr( element, 'tabindex' ) ) );
			},

			tabbable: function( element ) {
				var tabIndex = $.attr( element, 'tabindex' ),
					isTabIndexNaN = isNaN( tabIndex );
				return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
			}
		} );

		/**
		 * focussable function, taken from jQuery UI Core
		 * @param element
		 * @returns {*}
		 */
		function focusable( element ) {
			var map, mapName, img,
				nodeName = element.nodeName.toLowerCase(),
				isTabIndexNotNaN = !isNaN( $.attr( element, 'tabindex' ) );
			if ( 'area' === nodeName ) {
				map = element.parentNode;
				mapName = map.name;
				if ( !element.href || !mapName || map.nodeName.toLowerCase() !== 'map' ) {
					return false;
				}
				img = $( 'img[usemap=#' + mapName + ']' )[ 0 ];
				return !!img && visible( img );
			}
			return ( /^(input|select|textarea|button|object)$/.test( nodeName ) ?
					!element.disabled :
					'a' === nodeName ?
					element.href || isTabIndexNotNaN :
					isTabIndexNotNaN ) &&
				// the element and all of its ancestors must be visible
				visible( element );

			function visible( element ) {
				return $.expr.filters.visible( element ) && !$( element ).parents().addBack().filter( function() {
					return $.css( this, 'visibility' ) === 'hidden';
				} ).length;
			}
		}

	} )( $ );


	//textarea.js
	( function( $ ) {

		$.fn.getCursorPosition = function() {
			var el = $( this ).get( 0 ),
				pos = 0;
			if ( "selectionStart" in el ) {
				pos = el.selectionStart;
			} else if ( "selection" in document ) {
				el.focus();
				var sel = document.selection.createRange(),
					selLength = document.selection.createRange().text.length;
				sel.moveStart( "character", -el.value.length );
				pos = sel.text.length - selLength;
			}
			return pos;
		};

		var updateScrollbar = function( localTextArea, hiddenDiv ) {
			var localContainer = localTextArea.parents( ".mCSB_container" );
			var localWrapper = localTextArea.parents( ".textarea-wrapper" );

			var content = localTextArea.val();
			var cursorPosition = localTextArea.getCursorPosition();
			content = "<span>" + content.substr( 0, cursorPosition ) + "</span>" + content.substr( cursorPosition, content.length );
			content = content.replace( /\n/g, "<br />" );
			hiddenDiv.html( content + "<br />" );

			localTextArea.css( "height", hiddenDiv.height() );
			localWrapper.nScrollbar( "update" );

			var hiddenDivSpan = hiddenDiv.children( "span" ),
				hiddenDivSpanOffset = 0,
				viewLimitBottom = ( parseInt( hiddenDiv.css( "min-height" ) ) ) - hiddenDivSpanOffset,
				viewRatio = Math.round( hiddenDivSpan.height() + localContainer.position().top ),
				textareaLineHeight = parseInt( localTextArea.css( "line-height" ) );
			if ( viewRatio > viewLimitBottom || viewRatio < hiddenDivSpanOffset ) {
				var scrollLocation = parseInt( ( hiddenDivSpan.height() - hiddenDivSpanOffset ) / textareaLineHeight ) * textareaLineHeight;
				localWrapper.mCustomScrollbar( "scrollTo", scrollLocation );
			}
		};

		$( document ).ready( function() {
			$.each( $( ".content-scroll" ), function( i, item ) {
				var $contentScroll = $( item );
				var textArea = $contentScroll.find( ".n-textarea" );
				var textAreaHeight = parseInt( $contentScroll.css( "height" ) ) - 17;
				textArea.css( "height", textAreaHeight );
				textArea.wrap( "<div class='textarea-wrapper' />" );

				var textAreaWrapper = textArea.parent( ".textarea-wrapper" );
				textAreaWrapper.css( "height", $contentScroll.css( "height" ) );
				textAreaWrapper.addClass( "textarea-wrapper-normal" );
				textAreaWrapper.mCustomScrollbar( {
					scrollInertia: 0,
					advanced: {
						autoScrollOnFocus: false
					}
				} );

				var hiddenDiv = $( document.createElement( "div" ) ),
					content = null;
				hiddenDiv.addClass( "textareaHiddenDiv" );
				hiddenDiv.css( "width", parseInt( textArea.css( "width" ) ) - 12 );
				hiddenDiv.css( "min-height", textAreaHeight );

				$( "body" ).prepend( hiddenDiv );

				if ( textArea.length > 0 ) {
					updateScrollbar( textArea, hiddenDiv );
					textArea.bind( "keyup keydown", function() {
						updateScrollbar( $( this ), hiddenDiv );
					} );
					textArea.bind( "focus", function() {
						var localWrapper = $( this ).parents( ".textarea-wrapper" );
						localWrapper.removeClass( "textarea-wrapper-normal" );
						localWrapper.addClass( "textarea-wrapper-focus" );
					} );
					textArea.bind( "blur", function() {
						var localWrapper = $( this ).parents( ".textarea-wrapper" );
						localWrapper.removeClass( "textarea-wrapper-focus" );
						localWrapper.addClass( "textarea-wrapper-normal" );
					} );
				}
			} );

		} );

	} )( $ );


	//timezone.js
	( function( $ ) {

		// TIMEZONE CLASS DEFINITION
		// =========================

		var Timezone = function( element, cities ) {
			var $timezone = $( element );

			// Add n-timezone class if not exist
			if ( !$timezone.hasClass( 'n-timezone' ) ) {
				$timezone.addClass( 'n-timezone' );
			}

			// get timezone by moment-timezone API
			if ( !cities ) {
				cities = getTimezones();
			}

			// sort timezone
			sortTimezones( cities );

			// append timezone items to pulldown list
			var $dropDown = $timezone.find( 'ul' );
			$dropDown.append( buildDropdownMenuItems( cities, null ) );

			// generate the pulldown list by Fuelux API -- selectlist
			$timezone.selectlist();

			// add filter input field
			var filterHtml = '<div class="filter-input"><div class="n-inputfield-clearable n-inputfield-filter"><a class="n-inputfield-filter-icon"><span class="icon icon-filter"></span></a><input type="text" class="form-control n-inputfield n-inputfield-small" placeholder="Filter..."><a href="javascript:void(0)" class="n-inputfield-control-icon n-inputfield-control-icon-small" style="display: none;"><span role="button" aria-label="clear textfield content" class="icon icon-close"></span></a></div><div class="seperator"></div></div>';
			$dropDown.before( filterHtml );
			$timezone.find( ".filter-input" ).hide();

			// Set default timezone based on client's timezone
			setDefaultTimezone( $timezone );

			// generate scroll pulldown menu by mCustomerScroll API
			$dropDown.mCustomScrollbar( {
				keyboard: {
					enable: false
				}
			} );

			// Add events to timezone selectlist
			// =================================

			// Do filter when user type in
			$timezone.find( ".n-inputfield-clearable input" ).on( 'keyup', function( event ) {
				var inputValue = event.target.value;
				var controlIcon = $( event.target ).next( '.n-inputfield-control-icon' );
				if ( inputValue.length > 0 ) {
					controlIcon.show();
				} else {
					controlIcon.hide();
				}
				doFilter( inputValue, $( event.target ) );
			} );

			// Clear input field by cancel button
			$timezone.find( ".n-inputfield-control-icon" ).on( "click", function( event ) {
				event.stopPropagation();
				var prev = $( this ).prev();
				if ( prev.hasClass( 'n-inputfield' ) ) {
					prev.focus();
					var $combobox = $( this ).closest( '.n-timezone' );
					clearFilterInputField( $combobox );
					resetAllItems( $combobox );
				}
			} );

			// Clear up all filtered result once user selects.
			$timezone.on( 'changed.fu.selectlist', function() {
				resetAllItems( $( this ) );
				clearSelectedStrongItems( $( this ) );
				clearFilterInputField( $( this ) );
			} );

			// Show and focus in filter input field when dropdown expanded.
			$timezone.on( 'shown.bs.dropdown', function() {
				var $combobox = $( this );
				$combobox.find( '.filter-input' ).show();
				$combobox.find( '.filter-input input' ).focus();
				var selectedIndex = $combobox.find( 'ul' ).find( '[data-selected=true]' ).index();
				$combobox.find( 'ul' )
					.mCustomScrollbar( "scrollTo", $combobox.find( 'ul' ).find( 'li:eq(' + selectedIndex + ')' ), {
						scrollInertia: 0
					} );
			} );

			// Hide filter input field when dropdown unexpanded
			$timezone.on( 'hide.bs.dropdown', function() {
				$( this ).find( '.filter-input' ).hide();
			} );

			// Avoid closing the dropdown when click on scrollbar
			$timezone.on( "click", '.mCSB_dragger_bar', function( e ) {
				e.stopPropagation();
			} );

			// Keyboard support -- Move focus to first visible item
			$timezone.on( "keydown", '.filter-input', function( e ) {
				// If trigger Down Arrow key
				if ( e.keyCode === 40 ) {
					e.preventDefault();
					$( this ).next( 'ul' ).find( 'li' ).each( function() {
						if ( isInViewPort( $( this ) ) === true ) {
							$( this ).children( 'a' ).focus();
							return false;
						}
					} );
				}
				// If Esc key
				if ( e.keyCode === 27 ) {
					$( this ).prev( 'button' ).trigger( 'click' );
					$( this ).prev( 'button' ).trigger( 'focus' );
				}


				// Temporary solution for "shift+(".
				// Cannot find the root cause why focus will move to dropdown item when type in the character match the item's first character.
				if ( e.keyCode === 57 && e.shiftKey ) {
					e.preventDefault();
					$( this ).find( 'input' ).val( '(' );
				}
			} );

			// Keyboard support -- Move focus to filter input field
			$timezone.on( "keydown", '.dropdown-menu li', function( e ) {
				// If trigger Up Arrow key
				if ( e.keyCode === 38 ) {
					if ( $( this ).is( ':visible' ) && isFirstVisibleItem( $( this ) ) ) {
						e.stopPropagation();
						$( this ).closest( '.n-timezone' ).find( '.filter-input input' ).focus();
					}
				}
			} );
		};

		Timezone.VERSION = '1.1.0';

		// TIMEZONE INTERNAL METHODS DEFINITION
		// ====================================

		function doFilter( inputValue, input ) {
			var $dropDown = input.closest( '.n-timezone' ).find( 'ul' );
			$dropDown.find( 'li' ).each( function() {
				var timezoneString = $( this ).find( 'span' ).html();
				timezoneString = timezoneString.replace( '<strong>', '' ).replace( '</strong>', '' );
				if ( timezoneString.toUpperCase().indexOf( inputValue.toUpperCase() ) < 0 ) {
					$( this ).hide();
				} else {
					$( this ).show();
					var subIndex = timezoneString.toUpperCase().indexOf( inputValue.toUpperCase() );
					var subString = timezoneString.substring( subIndex, subIndex + inputValue.length );
					timezoneString = timezoneString.replace( subString, '<strong>' + subString + '</strong>' );
				}
				$( this ).find( 'span' ).html( timezoneString );
			} );
		}

		function resetAllItems( $combobox ) {
			$combobox.find( 'li' ).each( function() {
				var timezoneString = $( this ).find( 'span' ).html();
				timezoneString = timezoneString.replace( '<strong>', '' ).replace( '</strong>', '' );
				$( this ).find( 'span' ).html( timezoneString );
				$( this ).show();
			} );
		}

		function clearSelectedStrongItems( $combobox ) {
			var selectedString = $combobox.find( '.selected-label > span' ).html();
			selectedString = selectedString.replace( '<strong>', '' ).replace( '</strong>', '' );
			$combobox.find( '.selected-label > span' ).html( selectedString );
		}

		function clearFilterInputField( $combobox ) {
			var input = $combobox.find( '.filter-input input' );
			input.val( '' );
			input.next( '.n-inputfield-control-icon' ).hide();
		}

		function sortTimezones( zones ) {
			zones.sort( function( a, b ) {
				var offsetA = parseInt( a.offset.replace( ":", "" ), 10 );
				var offsetB = parseInt( b.offset.replace( ":", "" ), 10 );
				if ( offsetA - offsetB !== 0 ) {
					return offsetA - offsetB;
				} else {
					if ( a.name > b.name ) {
						return 1;
					}
					if ( a.name < b.name ) {
						return -1;
					}
					return 0;
				}
			} );
		}

		function getTimezones() {
			var cities = [];
			var zones = moment.tz.names();
			for ( var key in zones ) {
				if ( zones.hasOwnProperty( key ) && zones[ key ] !== undefined ) {
					cities.push( {
						name: zones[ key ],
						offset: moment.tz( zones[ key ] ).format( 'Z' )
					} );
				}
			}
			return cities;
		}

		function setDefaultTimezone( $timezone ) {
			var currentOffset = 'Etc/GMT' + ( new Date().getTimezoneOffset() / 60 );
			$timezone.find( 'li' ).each( function() {
				if ( $( this ).data( 'value' ) === currentOffset ) {
					$timezone.selectlist( 'selectByValue', currentOffset );
				}
			} );
		}

		function buildDropdownMenuItems( zones, selectedValue ) {
			var html = '';
			for ( var i = 0; i < zones.length; i++ ) {
				var zone = zones[ i ];
				if ( selectedValue === zone.name ) {
					html += '<li data-value="' + zone.name + '" data-offset="' + zone.offset + '" data-selected="true"><a href="#"><span>(GMT ' + zone.offset + ') ' + zone.name + '</span></a></li>';
				} else {
					html += '<li data-value="' + zone.name + '" data-offset="' + zone.offset + '"><a href="#"><span>(GMT ' + zone.offset + ') ' + zone.name + '</span></a></li>';
				}
			}
			return html;
		}

		function isFirstVisibleItem( $item ) {
			var isFirstVisible = true;
			$item.prevAll( 'li' ).each( function() {
				if ( $( this ).is( ':visible' ) ) {
					isFirstVisible = false;
					return false;
				}
			} );
			return isFirstVisible;
		}

		function validTimezone( timezone ) {
			var isValid = false;
			var temp = timezone.split( '|' );
			if ( temp.length === 2 ) {
				var name = temp[ 0 ];
				var offset = temp[ 1 ];
				var nameReg = new RegExp( '\\S*\\/\\S*' );
				var offsetReg = new RegExp( '^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$' );
				if ( offset.match( offsetReg ) !== null && name.match( nameReg ) !== null ) {
					isValid = true;
				}
			}
			return isValid;
		}

		function getSelectedValue( $combobox ) {
			var selectedValue = '';
			$combobox.find( 'li' ).each( function() {
				if ( $( this ).data( 'selected' ) === true ) {
					selectedValue = $( this ).data( 'value' );
					return false;
				}
			} );
			return selectedValue;
		}

		function isInViewPort( $el ) {
			var content = $el.parents( ".mCSB_container" ),
				wrapper, cPos;
			if ( !content.length ) {
				return;
			}
			wrapper = content.parent();
			cPos = [ content[ 0 ].offsetTop, content[ 0 ].offsetLeft ];
			return cPos[ 0 ] + _childPos( $el )[ 0 ] >= 0 && cPos[ 0 ] + _childPos( $el )[ 0 ] <= wrapper.height() - $el.outerHeight( false ) &&
				cPos[ 1 ] + _childPos( $el )[ 1 ] >= 0 && cPos[ 1 ] + _childPos( $el )[ 1 ] <= wrapper.width() - $el.outerWidth( false );
		}

		function _childPos( el ) {
			var p = el.parents( ".mCSB_container" );
			return [ el.offset().top - p.offset().top, el.offset().left - p.offset().left ];
		}

		// TIMEZONE PLUGIN DEFINITION
		// ==========================

		function Plugin( option ) {
			return this.each( function() {
				var $this = $( this );
				var data = $this.data( 'wf.timezone' );

				if ( !data && !option ) {
					$this.data( 'wf.timezone', ( data = new Timezone( this ) ) );
				} else if ( !data && Object.prototype.toString.call( option ) === '[object Array]' ) {
					$this.data( 'wf.timezone', ( data = new Timezone( this, option ) ) );
				}
				if ( typeof option === 'string' ) {
					data[ option ].call( $this );
				}
			} );
		}

		// TIMEZONE TOOLTIP DEFINITION
		// ==========================

		function getCurrentStrWidth( text, element ) {
			var currentObj = $( '<span>' ).hide().appendTo( document.body );
			if ( element.css( "font" ) !== "" ) {
				$( currentObj ).html( text ).css( "font", element.css( "font" ) );
			} else {
				$( currentObj ).html( text ).css( "font-size", element.css( "font-size" ) );
			}
			var width = currentObj.width();
			currentObj.remove();
			return width;
		}

		function showDropdownItemTooltip() {
			/*jshint validthis:true */
			var $selectedElement = $( this );
			$selectedElement.removeAttr( "data-original-title" );
			$selectedElement.removeAttr( "title" );
			var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
			var currentWidth = getCurrentStrWidth( $span.html(), $span );
			if ( currentWidth >= $selectedElement.width() ) {
				$span.addClass( "active" );
				$span.css( "border-bottom-color", "transparent" );
				$selectedElement.attr( "data-original-title", $( $span ).text() );
				$selectedElement.tooltip( "show" );
			} else {
				$selectedElement.tooltip( "hide" );
			}
		}

		function showDropdownBtnTooltip() {
			/*jshint validthis:true */
			var $selectedElement = $( this );
			$selectedElement.removeAttr( "data-original-title" );
			$selectedElement.removeAttr( "title" );
			var $span = $selectedElement.find( '.selected-label' );
			var $trueSpan = $span.find( "span" );
			var valueLen = 0;
			var valuehtml = '';
			for ( var i = 0; i < $trueSpan.length; i++ ) {
				valueLen += $( $trueSpan[ i ] ).width();
				valuehtml = valuehtml.concat( $( $trueSpan[ i ] ).html() );
			}
			var currentWidth = getCurrentStrWidth( valuehtml, $span );
			if ( currentWidth >= $span.width() ) {
				$selectedElement.attr( "data-original-title", valuehtml );
				$selectedElement.tooltip( "show" );
			} else {
				$selectedElement.tooltip( "hide" );
			}
		}

		var old = $.fn.nTimezone;

		$.fn.nTimezone = Plugin;
		$.fn.nTimezone.Constructor = Timezone;


		// TIMEZONE NO CONFLICT
		// ====================

		$.fn.nTimezone.noConflict = function() {
			$.fn.nTimezone = old;
			return this;
		};

		// TIMEZONE DATA-API MARKUP
		// ========================

		$( function() {
			$( '[data-markup^="timezone"]' ).each( function() {
				$( this ).nTimezone();
			} );
		} );

		$( document )
			.on( "mouseenter", ".n-timezone .dropdown-menu li a", showDropdownItemTooltip )
			.on( "focus", ".n-timezone .dropdown-menu li a", showDropdownItemTooltip )
			.on( "mouseleave", ".n-timezone .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "blur", ".n-timezone .dropdown-menu li a", function() {
				var $selectedElement = $( this );
				var $span = $selectedElement.find( 'span' ).not( ".checkbox" );
				$span.css( "border-bottom-color", "" );
				$span.removeClass( "active" );
			} )
			.on( "mouseenter", ".n-timezone [data-toggle='dropdown']", showDropdownBtnTooltip )
			.on( "focus", ".n-timezone [data-toggle='dropdown']", showDropdownBtnTooltip )
			.on( "mouseleave", ".n-timezone [data-toggle='dropdown']", function() {
				var $selectedElement = $( this );
				$selectedElement.tooltip( "hide" );
			} );

		// TIMEZONE EXTENDED METHODS
		// =========================

		$.fn.extend( {
			setDefaultZone: function( value ) {
				var $combobox = $( this );
				$combobox.find( 'li' ).each( function() {
					if ( $( this ).data( 'value' ) === value ) {
						$combobox.selectlist( 'selectByValue', value );
					}
				} );
			},

			addZone: function( value ) {
				var zones = [];
				$( this ).find( 'li' ).each( function() {
					zones.push( {
						name: $( this ).data( 'value' ),
						offset: $( this ).data( 'offset' )
					} );
				} );

				var values = [];
				if ( $.isArray( value ) ) {
					for ( var key in value ) {
						if ( value.hasOwnProperty( key ) && value[ key ] !== undefined ) {
							if ( validTimezone( value[ key ] ) ) {
								values = value[ key ].split( '|' );
								zones.push( {
									name: values[ 0 ],
									offset: values[ 1 ]
								} );
							}
						}
					}
				} else {
					if ( validTimezone( value ) ) {
						values = value.split( '|' );
						zones.push( {
							name: values[ 0 ],
							offset: values[ 1 ]
						} );
					}
				}

				sortTimezones( zones );
				$( this ).find( '.mCSB_container' ).html( buildDropdownMenuItems( zones, getSelectedValue( $( this ) ) ) );
			},

			removeZone: function( value ) {
				var zones = [];
				$( this ).find( 'li' ).each( function() {
					var name = $( this ).data( 'value' );
					var offset = $( this ).data( 'offset' );
					if ( $.isArray( value ) ) {
						if ( value.indexOf( name ) < 0 ) {
							zones.push( {
								name: name,
								offset: offset
							} );
						}
					} else {
						if ( value !== name ) {
							zones.push( {
								name: name,
								offset: offset
							} );
						}
					}
				} );

				sortTimezones( zones );
				$( this ).find( '.mCSB_container' ).html( buildDropdownMenuItems( zones, getSelectedValue( $( this ) ) ) );
			}
		} );

	} )( $ );


	//tree-table.js
	( function( $ ) {

		if ( $.jqx !== undefined ) {
			if ( $.jqx._jqxTreeGrid !== undefined ) {
				$.extend( $.jqx._jqxTreeGrid.prototype, {
					expandRow: function( h, j ) {
						// Original code -- Get from jqxtreegrid.js
						var d = this.base;
						if ( d._loading ) {
							return;
						}
						var e = d._names();
						var f = this;
						var b = d.rowinfo[ h ];
						if ( !b ) {
							var k = this.getRow( h );
							if ( k ) {
								d.rowinfo[ h ] = {
									row: k
								};
								if ( k.originalRecord ) {
									d.rowinfo[ h ].originalRecord = k.originalRecord;
								}
								b = d.rowinfo[ h ];
							}
						}
						if ( b ) {
							if ( b.expanded ) {
								b.row[ e.expanded ] = true;
								return;
							}
							b.expanded = true;
							b.row[ e.expanded ] = true;
							if ( b.originalRecord ) {
								b.originalRecord[ e.expanded ] = true;
							}
							if ( this.virtualModeCreateRecords && !b.row._loadedOnDemand ) {
								var c = function( m ) {
									b.row._loadedOnDemand = true;
									if ( m === false ) {
										d._loading = false;
										f._hideLoadElement();
										b.leaf = true;
										b.row[ e.leaf ] = true;
										d._renderrows();
										if ( j ) {
											j();
										}
										return;
									}
									for ( var n = 0; n < m.length; n++ ) {
										m[ n ][ e.level ] = b.row[ e.level ] + 1;
										m[ n ][ e.parent ] = b.row;
										if ( d.rowsByKey[ m[ n ].uid ] ) {
											d._loading = false;
											f._hideLoadElement();
											b.leaf = true;
											b.row[ e.leaf ] = true;
											d._renderrows();
											if ( j ) {
												j();
											}
											throw new Error( "Please, check whether you Add Records with unique ID/Key. " );
										}
										d.rowsByKey[ m[ n ].uid ] = m[ n ];
										f.virtualModeRecordCreating( m[ n ] );
									}
									if ( !b.row.records ) {
										b.row.records = m;
									} else {
										b.row.records = b.row.records.concat( m );
									}
									if ( ( !m ) || ( m && m.length === 0 ) ) {
										b.leaf = true;
										b.row[ e.leaf ] = true;
									}
									if ( b.originalRecord ) {
										b.originalRecord.records = m;
										b.originalRecord[ e.expanded ] = true;

										if ( m.length === 0 ) {
											b.originalRecord[ e.leaf ] = true;
										}
									}
									d._loading = false;
									f._hideLoadElement();
									var l = d.vScrollBar.css( "visibility" );
									d._renderrows();
									d._updateScrollbars();
									var o = l !== d.vScrollBar.css( "visibility" );
									if ( d.height === "auto" || d.height === null || d.autoheight || o ) {
										d._arrange();
									}
									d._renderhorizontalscroll();
									if ( j ) {
										j();
									}
								};
								if ( !b.row[ e.leaf ] ) {
									d._loading = true;
									this._showLoadElement();
									this.virtualModeCreateRecords( b.row, c );
									return;
								}
							}
							if ( !d.updating() ) {
								var g = d.vScrollBar.css( "visibility" );
								d._renderrows();
								d._updateScrollbars();
								var i = g !== d.vScrollBar.css( "visibility" );
								if ( d.height === "auto" || d.height === null || d.autoheight || i ) {
									d._arrange();
								}
								d._renderhorizontalscroll();
								d._raiseEvent( "rowExpand", {
									row: b.row,
									key: h
								} );
							}
						}

						// Extended code -- trigger scroll bar to right position
						var hostHeight = d.host.height();
						var tableHeight = d.table.height();
						var currentRow = this.getRow( h );
						var rows = d.getRows();
						var count = 0;
						while ( currentRow.parent !== null ) {
							count = count + getItemsBeforeInTable( currentRow, rows );
							currentRow = this.getRow( currentRow.parent );
						}
						var height = d.columnsHeight * count;
						var max = d.vScrollBar.jqxScrollBar( "max" );
						if ( tableHeight > hostHeight ) {
							if ( height > max ) {
								height = max;
							}
							d.vScrollBar.jqxScrollBar( "setPosition", height );
						}
					}
				} );
			}
		}

		/**
		 * Return the visible row count before the current row
		 *
		 * @param currentRow
		 * @param rows
		 * @returns {number}
		 */
		function getItemsBeforeInTable( currentRow, rows ) {
			var count = 0;
			for ( var i = 0; i < rows.length; i++ ) {
				if ( rows[ i ].uid === currentRow.uid ) {
					break;
				}
				if ( rows[ i ].parent === currentRow.parent ) {
					count++;
				}
			}
			return count;
		}

		//attach expand/collapse event to whole row
		$( document )
			.on( 'rowClick', '.jqx-grid:not([class~="n-jqxgrid-table"])', function( event ) {
				var args = event.args;
				var row = args.row;
				var key = args.key;
				if ( row.records ) {
					if ( row.expanded ) {
						$( this ).jqxTreeGrid( 'collapseRow', key );
					} else {
						$( this ).jqxTreeGrid( 'expandRow', key );
					}
				}
			} )
			.on( 'keydown.wf.treeTable.keyboard', '.jqx-grid:not(.n-jqxgrid-table)', function( e ) {
				if ( e.which === 9 ) {
					var current = $( e.target );
					var selection = current.jqxTreeGrid( "getSelection" );
					if ( selection.length > 0 ) {
						current.jqxTreeGrid( 'clearSelection' );
					} else {
						var rows = current.jqxTreeGrid( "getRows" );
						if ( rows.length > 0 ) {
							var rowId = rows[ 0 ].ID;
							current.jqxTreeGrid( "selectRow", rowId );
							return false;
						}
					}
				}
			} );

	} )( $ );


	//tree.js
	( function( $ ) {

		$( document ).ready(
			function() {
				if ( $.fn.tree !== undefined ) {
					$.fn.tree.Constructor.prototype.disable = function() {
						var self = this;
						self.$element.addClass( 'disabled-tree' );
						self.$element.find( 'a' ).each( function() {
							$( this ).removeAttr( "href" );
							$( this ).attr( 'disabled', 'disabled' );
						} );
						self.$element.find( 'input' ).attr( 'disabled', 'disabled' );
						self.$element.off( 'click.fu.tree', '.tree-branch-name' );

						// Disable scroll bar if exists
						if ( self.$element.find( ".mCSB_scrollTools" ).length > 0 ) {
							self.$element.mCustomScrollbar( 'destroy' );
							self.$element.mCustomScrollbar( {
								advanced: {
									autoExpandHorizontalScroll: true
								},
								alwaysShowScrollbar: 2,
								theme: 'disabled',
								mouseWheel: {
									enable: false,
									axis: 'x'
								}

							} );
							self.$element.mCustomScrollbar( "disable" );
						}
					};

					$.fn.tree.Constructor.prototype.enableScrollbar = function( width, height ) {
						var self = this;
						self.$element.nScrollbar();
						self.$element.css( 'width', width + 'px' );
						self.$element.css( 'height', height + 'px' );
					};

					$.fn.tree.Constructor.prototype.populate = function( $el ) {
						var self = this;
						var $parent = ( $el.hasClass( 'tree' ) ) ? $el : $el.parent();
						var loader = $parent.find( '.tree-loader:eq(0)' );
						var treeData = $parent.data();

						loader.removeClass( 'hide hidden' ); // hide is deprecated
						this.options.dataSource( treeData ? treeData : {}, function( items ) {
							loader.addClass( 'hidden' );
							$.each( items.data, function( index, value ) {
								var $entity;

								if ( value.type === 'folder' ) {
									$entity = self.$element.find( '[data-template=treebranch]:eq(0)' ).clone().removeClass( 'hide hidden' ).removeData( 'template' ); // hide is deprecated
									$entity.data( value );
									$entity.find( '.tree-branch-name > .tree-label' ).html( value.text || value.name );
								} else if ( value.type === 'item' ) {
									$entity = self.$element.find( '[data-template=treeitem]:eq(0)' ).clone().removeClass( 'hide hidden' ).removeData( 'template' ); // hide is deprecated
									$entity.find( '.tree-item-name > .tree-label' ).html( value.text || value.name );
									$entity.data( value );
								}

								// Added support for description and icon
								if ( value.desc ) {
									$entity.find( '.tree-label' ).append( "<span class='tree-description'> &ndash; " + value.desc + "</span>" );
								}
								if ( value.icon ) {
									$entity.find( '.tree-label' ).append( "<span class='icon " + value.icon + "'></span>" );
								}

								// add attributes to tree-branch or tree-item

								var attr = value.attr || value.dataAttributes || [];
								$.each( attr, function( key, value ) {
									switch ( key ) {
										case 'cssClass':
										case 'class':
										case 'className':
											$entity.addClass( value );
											break;

											// allow custom icons
										case 'data-icon':
											$entity.find( '.icon-item' ).removeClass().addClass( 'icon-item ' + value );
											$entity.attr( key, value );
											break;

											// ARIA support
										case 'id':
											$entity.attr( key, value );
											$entity.attr( 'aria-labelledby', value + '-label' );
											//$entity.find('.tree-branch-name > .tree-label').attr('id', value + '-label');
											break;

											// style, data-*
										default:
											$entity.attr( key, value );
											break;
									}
								} );

								// add child nodes
								if ( $el.hasClass( 'tree-branch-header' ) ) {
									$parent.find( '.tree-branch-children:eq(0)' ).append( $entity );
								} else {
									$el.append( $entity );
								}
							} );
							// return newly populated folder
							self.$element.trigger( 'loaded.fu.tree', $parent );
						} );
					};
				}
				// function of tree of checkbox
				function clickTree( ev ) {
					updateLinkInTree( ev.currentTarget );
				}

				function updateLinkInTree( e ) {
					var allBranchMenu = $( e ).find( ".tree-branch" );
					for ( var j = 0; j < allBranchMenu.length; j++ ) {
						var branch = allBranchMenu[ j ];
						if ( $( branch ).attr( "src" ) !== "" ) {
							var header = $( branch ).children( ".tree-branch-header" );
							var a = $( header ).children( ".tree-branch-name" );
							$( a ).attr( "href", $( branch ).attr( "src" ) );
						}
					}

					var allItemMenu = $( e ).find( ".tree-item" );
					for ( var k = 0; k < allItemMenu.length; k++ ) {
						var item = allItemMenu[ k ];
						if ( $( item ).attr( "src" ) !== "" ) {
							var b = $( item ).children( ".tree-item-name" );
							$( b ).attr( "href", $( item ).attr( "src" ) );
						}
					}
				}

				function trigerTreeItem( ev ) {
					if ( ev.which !== 32 && ev.which !== 1 ) {
						return;
					}
					ev.preventDefault();
					ev.stopPropagation();
					/*jshint validthis:true */
					var currentStatus = $( this ).find( "input" ).prop( "checked" );
					var targetStatus = !currentStatus;
					/*jshint validthis:true */
					$( this ).find( "input" ).prop( "checked", targetStatus );
					updateTree();
				}

				function trigerTreeFolder( ev ) {
					if ( ev.which !== 32 && ev.which !== 1 ) {
						return;
					}
					ev.preventDefault();
					ev.stopPropagation();
					/*jshint validthis:true */
					var currentStatus = $( this ).find( "input" ).prop( "checked" );
					var targetStatus = !currentStatus;
					$( this ).find( "input" ).prop( {
						checked: targetStatus,
						indeterminate: false
					} );
					var arrChk = $( this ).closest( ".tree-branch" ).find( "input" );
					arrChk.each( function() {
						$( this ).prop( {
							checked: targetStatus,
							indeterminate: false
						} );
					} );
					updateTree();
				}

				function scrollTree( e ) {
					var currentTarget = e.currentTarget;
					var parentNode = $( currentTarget ).parent();
					if ( $( parentNode ).hasClass( 'tree-branch-name' ) || $( parentNode ).hasClass( 'tree-branch-header' ) ) {
						var closetLiNode = parentNode.closest( 'li' );
						if ( !$( closetLiNode ).hasClass( 'tree-open' ) ) {
							var rootNode = parentNode.closest( 'ul.tree' );
							var treeClientHeight = rootNode.get( 0 ).clientHeight;
							var childNodesNum = closetLiNode.find( 'ul li' ).size();
							var lineHeight = $( parentNode ).get( 0 ).offsetHeight;
							var currentOffsetHeight = $( currentTarget ).offset().top - rootNode.offset().top;
							var initScroll = ( childNodesNum === 0 && currentOffsetHeight > treeClientHeight * 3 / 4 );
							if ( ( treeClientHeight < ( currentOffsetHeight + ( childNodesNum + 1 ) * lineHeight ) ) || initScroll ) {
								rootNode.mCustomScrollbar( 'scrollTo', currentTarget, {
									scrollInertia: 0
								} );
							}
						}
					}
				}

				function updateTree() {
					$( ".tree-branch-name > .checkbox > input[name='folder']" ).each( function() {
						var statuses = [];
						$( this ).closest( ".tree-branch" ).find( "input[name='file']" ).each(
							function() {
								statuses.push( $( this ).prop( "checked" ) );
							}
						);
						if ( statuses.length !== 0 ) {
							var allfileschecked = statuses.reduce( function( a, b ) {
								return a && b;
							} );
							var partfilechecked = statuses.reduce( function( a, b ) {
								return a || b;
							} );
							$( this ).prop( "checked", allfileschecked );
							if ( allfileschecked ) {
								$( this ).prop( {
									checked: true,
									indeterminate: false
								} );
							} else if ( partfilechecked ) {
								$( this ).prop( {
									checked: false,
									indeterminate: true
								} );
							} else {
								$( this ).prop( {
									checked: false,
									indeterminate: false
								} );
							}
						}
					} );
				}
				// change the href of every item and branch
				setTimeout( function() {
					var trees = $( '.tree' );
					for ( var i = 0; i < trees.length; i++ ) {
						updateLinkInTree( trees[ i ] );
						$( trees[ i ] ).on( "click", clickTree );
					}
				}, 500 );
				/** For tree with checkbox */
				// process the leaf check box click events
				// when click the select item then expand the tree item 's children with scrool
				$( document )
					.on( "keydown", ".tree-has-checkbox li.tree-item .checkbox[name='file']", trigerTreeItem )
					.on( "click", ".tree-has-checkbox li.tree-item .checkbox[name='file']", trigerTreeItem )
					.on( "keydown", ".tree-has-checkbox li.tree-branch .checkbox[name='folder']", trigerTreeFolder )
					.on( "click", ".tree-has-checkbox li.tree-branch .checkbox[name='folder']", trigerTreeFolder )
					.on( 'click.fu.tree', '.tree .icon-caret', function( e ) {
						scrollTree( e );
					} )
					.on( 'click.fu.tree', '.tree .tree-label', function( e ) {
						scrollTree( e );
					} );
			} );

		// TREE KEYBOARD ACCESSIBILITY METHODS DEFINITION
		// ==============================================
		$( document ).on( 'keydown.wf.tree.keyboard', '.tree', $.wfKBTree.treeKeyboardHandler );

	} )( $ );


	//validation.js
	( function( $ ) {
		var reg = '';
		var customerReg;

		$( '.n-inputfield-validation' ).bind( 'blur', function() {
			var value = $( this ).val();
			if ( $( this ).hasClass( 'n-inputfield-ip-address' ) ) {
				reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
			} else if ( $( this ).hasClass( 'n-inputfield-date' ) ) {
				reg = /^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
			} else if ( $( this ).hasClass( 'n-inputfield-placeholder' ) ) {
				reg = /^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
			} else if ( $( this ).hasClass( 'n-inputfield-time' ) ) {
				reg = /^([0-1]?[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
			} else if ( $( this ).hasClass( 'n-inputfield-customized' ) ) {
				reg = customerReg;
			}
			if ( value && !reg.test( value ) ) {
				$( this ).addClass( 'n-inputfield-validation' );
			} else {
				$( this ).removeClass( 'n-inputfield-validation' );
			}
		} );
		$( '.n-inputfield-validation' ).bind( 'focus', function() {
			$( this ).removeClass( 'n-inputfield-validation' );
		} );
		$.fn.extend( {
			customerReg: function( regex ) {
				customerReg = regex;
			}
		} );

	} )( $ );


	//visualizationtablecell.js
	( function( $ ) {

		var lastSelected = null;
		$( ".visualizationtablecell tbody tr:nth-child(odd) th" ).click( function() {

			if ( $( this ).data( 'isSelected' ) ) {
				$( this ).data( 'isSelected', false );
				$( this ).parent().removeClass( 'selected-grey' );
			} else {
				$( ".visualizationtablecell thead tr th" ).removeClass( 'selected-column-header' );
				$( this ).parent().siblings().removeClass( 'selected-grey' ).removeClass( 'selected-blue' ).children().removeClass( 'selected-grey-cell' ).removeClass( 'selected-blue-cell' );
				$( this ).parent().addClass( 'selected-grey' );
				if ( lastSelected !== null ) {
					lastSelected.data( 'isSelected', false );
				}
				lastSelected = $( this );
				$( this ).data( 'isSelected', true );
			}
		} );

		$( ".visualizationtablecell tbody tr:nth-child(even) th" ).click( function() {
			if ( $( this ).data( 'isSelected' ) ) {
				$( this ).data( 'isSelected', false );
				$( this ).parent().removeClass( 'selected-blue' );
			} else {

				$( ".visualizationtablecell thead tr th" ).removeClass( 'selected-column-header' );
				$( this ).parent().addClass( 'selected-blue' ).siblings().removeClass( 'selected-grey' ).removeClass( 'selected-blue' ).children().removeClass( 'selected-grey-cell' ).removeClass( 'selected-blue-cell' );
				if ( lastSelected !== null ) {
					lastSelected.data( 'isSelected', false );
				}
				lastSelected = $( this );
				$( this ).data( 'isSelected', true );
			}
		} );

		$( ".visualizationtablecell thead tr th" ).click( function() {
			if ( $( this ).index() === 0 ) {
				return;
			}
			$( this ).data( 'isSelected', true );
			$( this ).addClass( 'selected-column-header' ).siblings().removeClass( 'selected-column-header' );
			var colIndex = $( this ).index() + 1;
			var tr = $( ".visualizationtablecell tbody tr" );
			tr.removeClass( 'selected-grey' ).removeClass( 'selected-blue' );
			var rowCount = tr.length;
			for ( var ctr = 1; ctr <= rowCount; ctr++ ) {
				var td = $( ".visualizationtablecell tbody tr:nth-child(" + ctr + ") td:nth-child(" + colIndex + ")" );
				td.siblings().removeClass( 'selected-grey-cell' ).removeClass( 'selected-blue-cell' );
				if ( ctr === 0 || ( ctr % 2 ) === 0 ) {
					td.addClass( 'selected-blue-cell' );
				} else {
					td.addClass( 'selected-grey-cell' );
				}
			}
		} );

		$( ".visualizationtablecell" ).attr( "cellspacing", 0 );
		$( ".visualizationtablecell tbody tr th:first-child" ).wrapInner( "<div style='white-space: nowrap' align='left'></div>" );
		$( ".visualizationtablecell tbody tr th:first-child div" ).prepend( "<span class='visualization-header-bullet'></span>" );

		var maxWidth = null;
		$( ".visualizationtablecell tbody tr th:first-child div" ).each( function() {
			var currWidth = $( this ).width();
			console.log( currWidth );
			if ( maxWidth === null || maxWidth < currWidth ) {
				maxWidth = currWidth;
			}
		} ).width( maxWidth + 11 );

	} )( $ );

	/* jshint ignore:end */
} ) );
