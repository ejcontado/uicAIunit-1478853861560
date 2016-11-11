angular.module('wf.angular.flyoutactivity').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyoutactivity/flyoutactivity-tabs-container.html",
    "<ul class=\"n-flyout-open n-flyout-activity-area-tabs\" ng-style=\"{'left': $ctrl.left+'px','top':$ctrl.top + 'px','right': $ctrl.right + 'px'}\" ng-transclude>\n" +
    "</ul>");
}]);
