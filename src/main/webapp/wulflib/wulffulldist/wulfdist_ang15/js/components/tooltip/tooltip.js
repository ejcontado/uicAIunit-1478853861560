!function(a){"function"==typeof define&&define.amd?define(["angular","../const/constants","../helper/position"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("../const/constants","../helper/position")),c}:a(angular)}(function(a){a.module("wf.angular.tooltip",["wf.angular.position"]).directive("wfTooltip",["$compile",function(b){return{restrict:"A",transclude:!1,controller:["$scope","$element","$compile","$timeout","$attrs",function(b,c,d,e,f){var g=function(){var e=c.attr("aria-describedby");if(""===e||void 0===e){var g=Math.floor(1e5*Math.random()),h="tooltip-"+g;c.attr("aria-describedby",h),a.element(document).find("body").eq(0).append(d('<div wf-position="'+f.wfLocation+'" id="'+h+'" class="tooltip fade '+f.wfLocation+'" role="tooltip" style="display: block; width:initial" ><div class="arrow" style="left: 50%;"></div><div class="tooltip-inner">'+f.wfContext+"</div></div>")(b))}},h=function(){var b=c.attr("aria-describedby");if(""!==b||void 0!==b){var d=a.element(document.getElementById(b));c.removeAttr("aria-describedby"),d.removeClass("in"),e(function(){d.remove()},100)}};return a.element(c).bind("mouseover",g),a.element(c).bind("mouseleave",h),this}]}}])});