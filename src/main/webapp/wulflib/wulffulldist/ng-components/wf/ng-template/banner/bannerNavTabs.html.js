angular.module('wf.angular.bannerNavTabs').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/bannerNavTabs.html",
    "<ul class=\"n-banner-nav n-banner-tabs\"   role=\"tabs\">\n" +
    "    <li ng-cloak ng-repeat=\"item in $ctrl.itemes\"  class=\"{{item.cssClass}}  ng-class:{active:item.selected}\"\n" +
    "        ng-click=\"$ctrl.click(item, $event)\" ng-keydown=\"$ctrl.handleKeyDown(item, $event)\"  wf-menu-bar-dropdown role=\"presentation\">\n" +
    "        <a  href={{item.link}}  data-item={{item.dataitem}}  aria-expanded=\"{{item.selected}}\" role=\"tab\"\n" +
    "             ng-if=\"item.cssClass !== 'dropdown'\">\n" +
    "            <span>{{item.label}}</span></a>\n" +
    "        <a  href={{item.link}}  data-item={{item.dataitem}} aria-expanded=\"false\"   class=\"n-banner-dropdown-toggle\" data-toggle=\"dropdown\"\n" +
    "            ng-if =\"item.cssClass === 'dropdown'\" role=\"button\">\n" +
    "            <span>{{item.label}}</span>\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </a>\n" +
    "        <wf-menu-bar ng-cloak menu-bar='item.menuBar' ng-if=\"item.cssClass === 'dropdown'\"></wf-menu-bar>\n" +
    "    </li>\n" +
    "    <div class=\"row n-banner-2nd\" ng-transclude></div>\n" +
    "</ul>");
}]);
