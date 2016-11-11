angular.module('wf.angular.flyoutactivity').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyoutactivity/flyoutactivity-area.html",
    "<div ng-if=\"$ctrl.show\" class=\"n-flyout-container n-flyout-activity-area {{$ctrl.direction}}\" ng-style=\"{height: $ctrl.height + 'px', width: $ctrl.width + 'px'}\">\n" +
    "    <div class=\"n-flyout-activity\">\n" +
    "        <div class=\"n-flyout-content\"  ng-transclude>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
