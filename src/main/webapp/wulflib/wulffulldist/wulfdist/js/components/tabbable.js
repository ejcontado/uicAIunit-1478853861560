!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";function b(b){var c=a(b),d=a(":focus"),e=0;if(1===d.length){var f=c.index(d);f+1<c.length&&(e=f+1)}c.eq(e).focus()}function c(b){var c=a(b),d=a(":focus"),e=c.length-1;if(1===d.length){var f=c.index(d);f>0&&(e=f-1)}c.eq(e).focus()}function d(b){function c(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}var d,e,f,g=b.nodeName.toLowerCase(),h=!isNaN(a.attr(b,"tabindex"));return"area"===g?(d=b.parentNode,e=d.name,!(!b.href||!e||"map"!==d.nodeName.toLowerCase())&&(f=a("img[usemap=#"+e+"]")[0],!!f&&c(f))):(/^(input|select|textarea|button|object)$/.test(g)?!b.disabled:"a"===g?b.href||h:h)&&c(b)}a.focusNext=function(){b(":focusable")},a.focusPrev=function(){c(":focusable")},a.tabNext=function(){b(":tabbable")},a.tabPrev=function(){c(":tabbable")},a.getNextTabbale=function(){var b=a(":tabbable"),c=a(":focus"),d=0;if(1===c.length){var e=b.index(c);e+1<b.length&&(d=e+1)}return b.eq(d)},a.getPrevTabbale=function(){var b=a(":tabbable"),c=a(":focus"),d=b.length-1;if(1===c.length){var e=b.index(c);e>0&&(d=e-1)}return b.eq(d)},a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return d(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var c=a.attr(b,"tabindex"),e=isNaN(c);return(e||c>=0)&&d(b,!e)}})});