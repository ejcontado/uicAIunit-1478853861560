angular.module('wf.angular.drilldown').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/drilldown/drilldownItem.html",
    "<div ng-if=\"$ctrl.drilldownArrow\" ng-click=\"$ctrl.clickStoppropagation($event)\" height=\"{{$ctrl.height}}\" class=\"n-drillDown-collapsed drilldown-animation drilldown-collapsed\" id=\"{{$ctrl.drilldownItemId}}\" style=\"display: block\">\n" +
    "    <div class=\"n-drillDown-arrowContainer\">\n" +
    "        <div class=\"n-drillDown-arrow\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"n-drillDown-content\">\n" +
    "        <div class=\"n-drillDown-inner\" ng-bind-html=\"$ctrl.drilldownItemContent | to_trusted\"></div>\n" +
    "        <button class=\"btn btn-close\" aria-label=\"close\" ng-click=\"$ctrl.collapseDrilldown($ctrl.drilldownItemId)\"><span class=\"icon icon-close\" aria-label=\"close\"></span></button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!$ctrl.drilldownArrow\" ng-click=\"$ctrl.clickStoppropagation($event)\" height=\"{{$ctrl.height}}\" class=\"n-drillDown-collapsed-row drilldown-animation drilldown-collapsed\" id=\"{{$ctrl.drilldownItemId}}\" style=\"display: block\">\n" +
    "    <div class=\"n-drillDown-content-row\">\n" +
    "        <div class=\"n-drillDown-inner\" ng-bind-html=\"$ctrl.drilldownItemContent | to_trusted\"></div>\n" +
    "        <button class=\"btn btn-close\" ng-click=\"$ctrl.collapseDrilldown($ctrl.drilldownItemId)\" style=\"position: absolute;z-index: 3;top: 0;right: 30px;margin-top: 30px;cursor: pointer;\" aria-label=\"close\"><span class=\"icon icon-close\" aria-label=\"close\"></span></button>\n" +
    "    </div>\n" +
    "</div>");
}]);
