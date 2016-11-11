angular.module('wf.angular.wizard').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/wizard/wizard-step.html",
    "<div class=\"tab-pane\" ng-class=\"{'active' : $ctrl.setActive}\">\n" +
    "    <div class=\"n-dlg-wizard-step-description\" ng-transclude=\"description\"></div>\n" +
    "    <div class=\"n-dlg-wizard-step-content\" ng-transclude=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);
