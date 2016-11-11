angular.module('wf.angular.flyout').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyout/flyoutItem.html",
    "<li ng-cloak ng-click=\"$ctrl.handleItemSelected($event)\" ng-keydown=\"$ctrl.keyboardNavigation($event)\">\n" +
    "    <a href=\"#\">\n" +
    "        <span>{{$ctrl.displayText}}</span>\n" +
    "    </a>\n" +
    "</li>");
}]);
