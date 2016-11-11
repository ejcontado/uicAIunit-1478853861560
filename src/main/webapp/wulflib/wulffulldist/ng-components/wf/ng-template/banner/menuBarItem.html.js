angular.module('wf.angular.menuBar').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/menuBarItem.html",
    "<li  ng-cloak ng-class=\"{'n-dropdown-menu-item-has-child': menuItem.hasChild}\">\n" +
    "    <a href={{menuItem.link}}>\n" +
    "        <span>{{menuItem.label}}</span>\n" +
    "        <i  ng-class=\"{'icon icon-next': menuItem.hasChild}\"></i>\n" +
    "    </a>\n" +
    "</li>");
}]);
