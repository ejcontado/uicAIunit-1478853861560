!function(a){"function"==typeof define&&define.amd?define(["jquery","./keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("./keyboard-core")),c}:a(jQuery)}(function(a){"use strict";function b(b,c){var d=a(b.target);d.closest("table").find("td").each(function(){a(this).removeClass(c)}),d.is("td")&&(d.closest("table").hasClass("n-table-hover")?d.closest("tr").find("td").each(function(){a(this).addClass(c)}):d.addClass(c))}function c(b){var c=a(b.target);c.is("td")&&(b.preventDefault(),a(b.target).trigger("click"),c.find("input").length>0&&(c.find("input").focus(),c.find("input").val(c.find("input").val()),c.find(".selectlist").length>0&&c.find("button").trigger("click"),c.find(".n-calendar").length>0&&c.find("button").focus()))}function d(b,c){var d=a(b.target);"text"!==d.attr("type")&&!d.is("td")&&!d.parent().parent().parent().hasClass("n-multicolumn-list")&&d.find(".n-calendar").length<=0&&(h(d),d=d.closest("td"));var e=g(d,b);e.length>0&&!d.hasClass("n-inputfield")&&(b.preventDefault(),d.closest("table").hasClass("n-table-hover")?(d.closest("tr").find("td").each(function(){a(this).removeClass(c)}),e.closest("tr").find("td").each(function(){a(this).addClass(c)})):(d.closest("table").hasClass("datepicker-calendar-days")||b.keyCode!==k&&b.keyCode!==l&&b.keyCode!==m&&b.keyCode!==n||"true"!==d.find(".datepicker").find(".dropdown-toggle").attr("aria-expanded")||d.find(".datepicker").find(".dropdown-toggle").trigger("click").blur(),d.removeClass(c),e.addClass(c)),d.hasClass("n-drillDown-item")||d.removeAttr("tabindex"),e.attr("tabindex",0),e.trigger("focus"));var f=e.closest(".n-table-scrollbar");a.wfKBCore.isScrollNeeded(f,e)&&a(f).mCustomScrollbar("scrollTo",e,{scrollInertia:0})}function e(b,c){var d=a(b.target);d.closest("table").not(".n-drilldown-table").find("td").removeAttr("tabindex"),d.parent().parent().parent().hasClass("n-multicolumn-list")&&a(".n-multicolumn-list tbody:not(.group) td, th, .n-multicolumn-list tbody.group").prop("tabIndex",0),d.closest(".n-table").find("td").each(function(){a(this).removeClass(c)})}function f(b,c){var d=a(b.target);"INPUT"===d.get(0).tagName&&d.hasClass("n-inputfield")&&d.parent().focus().addClass(c)}function g(b,c){b.hasClass("n-inputfield")&&!b.parent().hasClass("n-calendar")&&(b=b.closest("td"));var d,e,f=a.wfKBCore.getAllVisibleSubItems(b.parent()),g=f.index(b);switch(c.keyCode){case o:if(c.shiftKey)if(g>0)g--;else{for(g=f.length-1,d=b.parent().prev();a.wfKBCore.isHiddenElement(d);)d=d.prev();f=a.wfKBCore.getAllVisibleSubItems(d)}else if(g<f.length-1)g++;else{for(g=0,e=b.parent().next();a.wfKBCore.isHiddenElement(e);)e=e.next();f=a.wfKBCore.getAllVisibleSubItems(e)}break;case k:g=g>0?g-1:0;break;case l:g=g<f.length-1?g+1:f.length-1;break;case m:for(d=b.parent().is(".n-multicolumn-list tbody tr:first-child")?b.parent().parent().prev().find("tr"):b.parent().prev();a.wfKBCore.isHiddenElement(d);)d=d.prev();f=d.length>0?a.wfKBCore.getAllVisibleSubItems(d):f;break;case n:for(e=b.hasClass("n-multicolumn-list-th")?b.parent().parent().next().find("tr:first-child"):b.parent().next();a.wfKBCore.isHiddenElement(e);)e=e.next();f=e.length>0?a.wfKBCore.getAllVisibleSubItems(e):f}if(b.closest(".n-calendar").length>0){if(f.eq(g).hasClass("last-month")||f.eq(g).hasClass("next-month"))return b;if((b.closest(".n-calendar-lock-past").length>0||b.closest(".n-data-range-end").length>0)&&f.eq(g).hasClass("past"))return b}return f.eq(g)}function h(a){a.closest("div").hasClass("selectlist")&&"true"===a.closest("div").find("button").attr("aria-expanded")&&a.closest("div").find("button").trigger("click")}var i=13,j=32,k=37,l=39,m=38,n=40,o=9,p=27;a.wfKBTable={tableKeyboardHandler:function(a){var g=[o,j,i,k,l,m,n,p],h="n-cell-selected";if(g.indexOf(a.which)!==-1)switch(b(a,h),a.keyCode){case j:case i:c(a);break;case k:case l:case m:case n:d(a,h);break;case o:e(a,h);break;case p:f(a,h)}},handleTableDirectionKeyAction:function(a,b){d(a,b)}}});