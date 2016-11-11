angular.module('wf.angular.menuBar').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/menuBar-Insert.html",
    "<ul class='n-dropdown-sub-menu'>\n" +
    "    <wf-menu-item ng-cloak ng-repeat='menuItem in menuBar' menu-item='menuItem'></wf-menu-item>\n" +
    "</ul>");
}]);
