angular.module('wf.angular.wizard').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/wizard/wizard.html",
    "<div class=\"navbar\" ng-keydown=\"$ctrl.keydownHandler($event)\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <ul class=\"nav nav-pills\">\n" +
    "            <li ng-repeat=\"step in $ctrl.steps\"\n" +
    "                ng-class=\"{'active' : step.setActive, 'passed' : $index < $ctrl.selectedStepIdx}\"\n" +
    "                ng-attr-ng-style=\"{{!$last && $ctrl.stepDistance || undefined}}\">\n" +
    "                <a href=\"javascript:void(0)\" aria-expanded=\"true\">\n" +
    "                    <span>{{step.bulletText}}</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"tab-content\" ng-transclude>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
