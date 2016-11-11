angular.module('wf.angular.flyout').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyout/flyout.html",
    "<div class=\"n-flyout\" id=\"myFlyout\" data-expand=\"{{$ctrl.expand}}\">\n" +
    "    <div class=\"n-flyout-container\">\n" +
    "        <ul class=\"n-flyout-menu\" style=\"display: block\" ng-transclude>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <a class=\"n-flyout-open\" ng-click=\"$ctrl.handleFlyoutOpen($event)\" href=\"javascript:void(0)\">\n" +
    "        <span class=\"middle\"><i class=\"icon icon-list\"></i></span>\n" +
    "    </a>\n" +
    "</div>");
}]);
