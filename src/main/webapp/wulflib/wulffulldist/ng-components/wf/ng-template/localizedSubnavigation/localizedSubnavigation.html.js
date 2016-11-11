angular.module('wf.angular.localizedSubnavigation').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/localizedSubnavigation/localizedSubnavigation.html",
    "<div class=\"panel panel-shadow\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h1>{{$ctrl.navTitle}}</h1>\n" +
    "    </div>\n" +
    "    <ul class=\"nav-local nav-local-menu nav-local\" ng-class=\"$ctrl.ulClass\" >\n" +
    "        <li class=\"nav-local-menu-item\" ng-class=\"tab.selected\" ng-repeat=\"tab in $ctrl.tabs\">\n" +
    "            <a href ng-click=\"$ctrl.select($index)\">\n" +
    "                <span ng-if=\"tab.icon\" class=\"icon {{tab.icon}}\"></span>\n" +
    "                <span >{{tab.tabName}}</span>\n" +
    "                <span ng-class=\"$ctrl.caretClass\" ng-if=\"tab.selected\"></span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div class=\"panel-body\"  >\n" +
    "        <div class=\"panel-section text-center\" ng-repeat=\"content in $ctrl.tabs\" ng-if=\"content.selectedContent\">\n" +
    "            {{content.tabContent}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
