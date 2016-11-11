angular.module('wf.angular.toggleButton').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/toggle/toggleButton.html",
    "<div  class=\"n-toggle-switch\" ng-class=\"{'n-toggle-switch-standard': $ctrl.standardSize, 'n-toggle-switch-small': !$ctrl.standardSize, 'n-toggle-switch-color': $ctrl.color }\">\n" +
    "    <input role=\"checkbox\" ng-keydown=\"$ctrl.doKeyActive($event)\" ng-click=\"$ctrl.doActive($event)\" type=\"checkbox\" aria-checked=\"{{ $ctrl.ifActive }}\" ng-checked=\"$ctrl.checked\"  name=\"example-toggle-name\" class=\"n-toggle-switch-input\" id=\"{{$ctrl.toggleId}}\" ng-disabled=\"$ctrl.disable\">\n" +
    "    <label class=\"n-toggle-switch-container\" for=\"{{$ctrl.toggleId}}\">\n" +
    "        <span class=\"n-toggle-switch-handler\"></span>\n" +
    "        <span class=\"n-toggle-switch-slider\"></span>\n" +
    "    </label>\n" +
    "</div>\n" +
    "");
}]);
