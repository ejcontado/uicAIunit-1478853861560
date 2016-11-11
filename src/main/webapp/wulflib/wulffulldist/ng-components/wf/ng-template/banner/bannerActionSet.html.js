angular.module('wf.angular.bannerActionSet').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/bannerActionSet.html",
    "<div class=\"n-banner-right n-banner-links-collapse dropdown\">\n" +
    "    <a href=\"#\" class=\"n-banner-dropdown-toggle n-banner-links-collapse-dropdown-toggle show-on-blue-detached\"\n" +
    "       data-toggle=\"dropdown\" aria-expanded=\"false\" ng-if=\"$ctrl.overflowOpen\" role=\"button\">\n" +
    "        <span class=\"icon icon-dropdown-menu\"></span>\n" +
    "    </a>\n" +
    "    <ul class=\"n-banner-nav n-banner-links\">\n" +
    "        <li   ng-repeat=\"action  in  $ctrl.actionSet\" class={{action.cssClass}} wf-overflow-mouse-event>\n" +
    "            <a href={{action.link}}}  ng-if = \"!(action.hasChild)\" >\n" +
    "                <span>\n" +
    "                    <i class={{action.icon}}></i>\n" +
    "                    <span>{{action.name}}</span>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "            <a  aria-expanded=\"false\"  data-toggle=\"dropdown\" href={{action.link}} role=\"button\" ng-if=\"action.hasChild\">\n" +
    "                <span>\n" +
    "                    <i class=\"icon icon-back show-on-blue-detached\" ></i>\n" +
    "                    <i class={{action.icon}}></i>\n" +
    "                    <span>{{action.name}}</span>\n" +
    "                    <span class=\"caret hidden-on-blue-detached\"></span>\n" +
    "                </span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-if=\"action.hasChild\">\n" +
    "                <li ng-repeat=\"actionitem in action.childItems\">\n" +
    "                    <a href={{actionitem.link}} >\n" +
    "                        <span>{{actionitem.name}}</span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
