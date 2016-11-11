angular.module('wf.angular.bannerNavTabs').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/bannerNavTabsItem.html",
    "<div role=\"tab pane\" class=\"row n-banner-2nd ng-class;{active:$ctrl.selected} ng-cloak\" ng-show=\"$ctrl.selected\" ng-transclude></div>");
}]);
