angular.module('wf.angular.splitter').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/splitter/splitter.html",
    "<div class=\"splitter-container\" ng-transclude></div>\n" +
    "");
}]);
