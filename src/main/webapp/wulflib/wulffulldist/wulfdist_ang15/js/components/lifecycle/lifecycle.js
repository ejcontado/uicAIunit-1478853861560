!function(a){"function"==typeof define&&define.amd?define(["angular","../const/constants"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("wulf/calendar"),require("../const/constants")),c}:a(angular)}(function(a){"use strict";var b=function(){var a=this;a.generateLabelIdNumber=function(){var b=Math.floor(1e3*Math.random());a.labelId="lifecycleStepLabel"+b},a.generateLabelIdNumber()};a.module("wf.angular.lifecycle",[]).component("wfLifecycle",{templateUrl:"wf/ng-template/lifecycle/lifecycle.html",transclude:!0,controller:b,bindings:{isStart:"<?",isEnd:"<?",selected:"<?"}})});