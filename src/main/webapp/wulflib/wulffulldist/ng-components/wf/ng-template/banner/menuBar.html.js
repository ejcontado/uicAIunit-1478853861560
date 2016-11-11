angular.module('wf.angular.menuBar').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/menuBar.html",
    "<ul class='dropdown-menu'>\n" +
    "    <wf-menu-item ng-cloak ng-repeat='menuItem in menuBar' menu-item='menuItem'></wf-menu-item>\n" +
    "</ul>");
}]);
