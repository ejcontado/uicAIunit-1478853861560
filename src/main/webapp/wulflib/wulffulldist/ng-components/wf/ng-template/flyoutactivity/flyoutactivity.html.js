angular.module('wf.angular.flyoutactivity').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyoutactivity/flyoutactivity.html",
    "<div class=\"n-flyout\" ng-style=\"{'left': $ctrl.left+'px','top':$ctrl.top + 'px','right': $ctrl.right + 'px'}\" ng-transclude>\n" +
    "</div>");
}]);
