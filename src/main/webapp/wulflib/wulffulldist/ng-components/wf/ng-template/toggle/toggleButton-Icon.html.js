angular.module('wf.angular.toggleButton').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/toggle/toggleButton-Icon.html",
    "<button role=\"button\" aria-pressed=\"{{$ctrl.ifActive}}\" ng-click=\"$ctrl.doActive($event)\" class=\"btn  n-toggle-button\" data-toggle=\"button\" ng-disabled=\"$ctrl.disable\" ng-class=\"[$ctrl.iconDisplayStyle, {'n-toggle-button-small':!$ctrl.standardSize,'n-toggle-button-color':$ctrl.emphasis, active: $ctrl.ifActive}]\">\n" +
    "    <span class=\"icon\"  ng-class=\"$ctrl.iconClassName\"></span>\n" +
    "    <span ng-show=\"$ctrl.text\">{{$ctrl.text}}</span>\n" +
    "</button>\n" +
    "");
}]);
