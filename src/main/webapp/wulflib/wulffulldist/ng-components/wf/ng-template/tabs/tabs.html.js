angular.module('wf.angular.tabs').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tabs/tabs.html",
    "<ul class=\"nav nav-tabs\" role=\"tabs\">\n" +
    "    <li ng-repeat=\"pane in $ctrl.panes\" ng-class=\"{active:pane.selected, disabled: pane.disable}\"\n" +
    "        role=\"presentation\">\n" +
    "        <a href ng-click=\"$ctrl.select($index, $event)\" aria-expanded=\"{{pane.selected}}\" role=\"tab\"\n" +
    "           ng-disabled=\"pane.disable\"\n" +
    "           ng-keydown=\"$ctrl.selectKeydown(pane, $event);\">{{pane.label}}</a>\n" +
    "        <a href class=\"n-close\" role=\"button\" aria-label=\"Close\" ng-if=\"pane.closeable\"\n" +
    "           ng-click=\"$ctrl.closePane($index, $event)\" ng-keydown=\"$ctrl.closeKeydown($index, $event)\"\n" +
    "           ng-disabled=\"pane.disable\">\n" +
    "            <span class=\"icon icon-close\" aria-hidden=\"true\"></span>\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<div class=\"tab-content\" ng-transclude></div>\n" +
    "");
}]);
