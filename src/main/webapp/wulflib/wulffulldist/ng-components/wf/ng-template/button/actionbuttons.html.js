angular.module('wf.angular.actionbuttons').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/button/actionbuttons.html",
    "<div class=\"btn-group n-tab-buttons\">\n" +
    "    <button class=\"btn\" ng-class=\"$ctrl.class\" ng-repeat=\"info in $ctrl.buttonInfo\" ng-disabled=\"$ctrl.disable || info.disable\" ng-click=\"$ctrl.clickCallback($event)\"\n" +
    "            ng-keydown=\"$ctrl.handelKeyboard($event, $index, $first, $last)\" role=\"button\" aria-label=\"{{info.text}}\">\n" +
    "        {{info.text}}\n" +
    "    </button>\n" +
    "</div>");
}]);
