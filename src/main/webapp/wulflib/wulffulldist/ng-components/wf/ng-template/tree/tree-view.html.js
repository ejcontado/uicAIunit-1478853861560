angular.module('wf.angular.tree').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tree/tree-view.html",
    "<div class=\"fuelux menu-tree\">\n" +
    "    <ul  class=\"tree\" ng-class=\"{'tree-has-checkbox':$ctrl.hasCheckbox,'disabled-tree':$ctrl.disable}\" role=\"tree\">\n" +
    "        <div ng-transclude></div>\n" +
    "    </ul>\n" +
    "</div>");
}]);
