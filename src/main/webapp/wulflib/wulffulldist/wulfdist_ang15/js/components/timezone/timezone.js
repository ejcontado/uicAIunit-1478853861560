!function(a){"function"==typeof define&&define.amd?define(["angular","wulf/timezone","../const/constants"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("wulf/timezone"),require("../const/constants")),c}:a(angular)}(function(a){"use strict";var b=function(a){var b=this,c=$(a).find("[data-markup^='timezone']");c.nTimezone(b.zoneDataBundle),b.defaultZone&&c.setDefaultZone(b.defaultZone),void 0===b.disable&&(b.disable=!1),c.on("click.mo.timezone","ul li",function(a){b.onItemSelected()&&b.onItemSelected()(a)})};b.$inject=["$element"],a.module("wf.angular.timezone",[]).component("wfTimezone",{templateUrl:"wf/ng-template/timezone/timezone.html",bindings:{zoneDataBundle:"<",defaultZone:"<",disable:"<?",onItemSelected:"&"},controller:b})});