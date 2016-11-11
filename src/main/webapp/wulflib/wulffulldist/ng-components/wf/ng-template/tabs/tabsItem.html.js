angular.module('wf.angular.tabs').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tabs/tabsItem.html",
    "<div role=\"tab pane\" class=\"tab-pane ng-class:{active:$ctrl.selected}\" ng-show=\"$ctrl.selected\" ng-transclude></div>");
}]);
