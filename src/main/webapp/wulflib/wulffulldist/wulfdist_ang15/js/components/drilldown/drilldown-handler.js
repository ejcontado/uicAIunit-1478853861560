!function(a){"function"==typeof define&&define.amd?define(["angular","../../wulf/tables"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("../../wulf/tables")),c}:a(angular)}(function(a){function b(){for(var b=document.querySelectorAll(".n-drillDown-row"),c=0;c<b.length;c++){var d=i.attributes["data-target-selector"].value,e=b[c].attributes["data-target-selector"].value;if(d===e)for(var f=a.element(b[c]).children(),g=0;g<f.length;g++)a.element(f[g]).addClass("n-cell-selected")}}function c(b){if(b)for(var c=document.querySelectorAll(".n-drillDown-row"),d=0;d<c.length;d++)for(var e=a.element(c[d]).children(),f=0;f<e.length;f++)a.element(e[f]).removeClass("n-cell-selected");else for(var g=document.querySelectorAll(".n-drillDown-item"),h=0;h<g.length;h++)a.element(g[h]).removeClass("n-cell-selected").removeClass("n-drilldown-item-selected")}function d(b,c){for(var d=document.querySelectorAll(b),e=0;e<d.length;e++){var f="#"+d[e].attributes.id.value;f!==c&&a.element(d[e]).css("height","0").removeClass("drilldown-expanded").addClass("drilldown-collapsed")}}function e(b){var c=a.element(a.element(document.querySelector(b)).children()[0]).children(),d=i.offsetLeft,e=i.offsetWidth,f=d+e/2;a.element(c).css("left",f+"px")}function f(f){var g=i.attributes["data-target-selector"].value;c(f);var h=f?".n-drillDown-collapsed-row":".n-drillDown-collapsed";if(d(h,g),f){var j=a.element(document.querySelector(g)),k=document.querySelector(g).attributes.height.value;j.hasClass("drilldown-collapsed")?j.css("height",k).removeClass("drilldown-collapsed").addClass("drilldown-expanded"):j.hasClass("drilldown-expanded")&&j.css("height","0").removeClass("drilldown-expanded").addClass("drilldown-collapsed"),b()}else{var l=a.element(document.querySelector(g)),m=document.querySelector(g).attributes.height.value;l.hasClass("drilldown-collapsed")?(l.css("height",m).removeClass("drilldown-collapsed").addClass("drilldown-expanded"),e(g),a.element(i).addClass("n-cell-selected").addClass("n-drilldown-item-selected")):l.hasClass("drilldown-expanded")&&(l.css("height","0").removeClass("drilldown-expanded").addClass("drilldown-collapsed"),a.element(i).addClass("n-cell-selected"))}}function g(){for(var b=document.querySelectorAll(".n-drillDown-item"),c=0;c<b.length;c++)a.element(b[c]).on("click",function(a){i=this,f(!1)}).on("keyup",function(b){for(var c=a.element(document.querySelectorAll(".n-drillDown-collapsed")),d=!1,e=0;e<c.length;e++)a.element(c[e]).hasClass("drilldown-expanded")&&(d=!0);37!==b.keyCode&&39!==b.keyCode||!d||a.element(document.querySelector(".n-cell-selected"))[0].click()});for(var d=document.querySelectorAll(".n-drillDown-row"),e=0;e<d.length;e++)a.element(d[e]).on("click",function(a){i=this,f(!0)})}function h(){for(var b=document.querySelectorAll("td.n-drillDown-item"),c=0;c<b.length;c++)a.element(b[c]).attr("tabindex",0);for(var d=document.querySelectorAll("tr.n-drillDown-row"),e=0;e<d.length;e++)for(var f=a.element(d[e]).children(),g=0;g<f.length;g++)a.element(f[g]).attr("tabindex",0)}var i;a.element(document).ready(function(){h(),g()})});