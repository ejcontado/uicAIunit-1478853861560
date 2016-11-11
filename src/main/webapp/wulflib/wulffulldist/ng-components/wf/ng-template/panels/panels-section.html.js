angular.module('wf.angular.panels').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/panels/panels-section.html",
    "<!DOCTYPE html>\n" +
    "<div class=\"panel-section\" ng-transclude></div>");
}]);
