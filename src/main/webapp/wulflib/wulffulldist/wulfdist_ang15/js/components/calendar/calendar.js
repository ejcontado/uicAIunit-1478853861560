!function(a){"function"==typeof define&&define.amd?define(["angular","wulf/calendar","../const/constants"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("wulf/calendar"),require("../const/constants")),c}:a(angular)}(function(a){"use strict";var b=function(a){var b=this,c={},d=$(a).find(".datepicker");void 0===b.optionalConfig&&(b.optionalConfig={allowPastDates:!0,momentConfig:{culture:"en",format:"DD.MM.YYYY"}});for(var e in b.optionalConfig)b.optionalConfig.hasOwnProperty(e)&&(c[e]=b.optionalConfig[e]);d.datepicker(c),d.datepicker("setDate",new Date),b.showTimer===!0&&d.datepicker("initTimer"),$(".datepicker .n-calendar .form-control").off("focus.fu.datepicker"),b.confirm=function(a){if(b.onDateSelected()&&"function"==typeof b.onDateSelected){var c=$(a.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).datepicker("getDate");b.onDateSelected()(c,a)}}};b.$inject=["$element"],a.module("wf.angular.calendar",[]).component("wfCalendar",{templateUrl:"wf/ng-template/calendar/calendar.html",controller:b,bindings:{optionalConfig:"<?",disable:"<?",showTimer:"<?",disablePastDays:"<?",onDateSelected:"&"}})});