angular.module('wf.angular.lifecycle').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/lifecycle/lifecycle.html",
    "<div role=\"complementary\" aria-labelledby=\"{{$ctrl.labelId}}\" class=\"n-lifecycle\" ng-class=\"{'n-lifecycle-start' : $ctrl.isStart, 'n-lifecycle-end' : $ctrl.isEnd, 'selected' : $ctrl.selected}\">\n" +
    "    <div ng-if=\"$ctrl.isStart === undefined || $ctrl.isStart === false\" class=\"n-lifecycle-content bottom\"></div>\n" +
    "    <div class=\"n-lifecycle-content top\"><ng-transclude id=\"{{$ctrl.labelId}}\"></ng-transclude></div>\n" +
    "</div>");
}]);
