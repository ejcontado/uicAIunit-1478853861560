angular.module('wf.angular.bannerUtilitySet').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/bannerUtilitySet.html",
    "<ul class=\"n-banner-right n-banner-nav n-banner-controls\">\n" +
    "    <li  ng-repeat=\"utility in $ctrl.utilitySet\"   class=\"{{utility.cssClass}}\"  role=\"presentation\">\n" +
    "        <a  href={{utility.link}} ng-if=\"utility.cssClass !== 'hidden-xs' && utility.cssClass !== 'dropdown'\">\n" +
    "            <i ng-class=\"{'icon icon-profile': (($ctrl.utilitySet.indexOf(utility) === 0)  && ($ctrl.utilitySet.length >= 1))}\"></i>\n" +
    "            {{utility.label}}\n" +
    "        </a>\n" +
    "        <p  ng-if=\"utility.cssClass === 'hidden-xs'\">\n" +
    "            {{utility.label}}\n" +
    "        </p>\n" +
    "        <a aria-expanded=\"false\" class=\"n-banner-dropdown-toggle\" data-toggle=\"dropdown\" href={{utility.link}} role=\"button\" ng-if=\"utility.cssClass === 'dropdown'\">\n" +
    "            <span> {{utility.label}}</span>\n" +
    "            <i class=\"icon icon-arrow\" ></i>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" ng-if=\"utility.cssClass === 'dropdown'\">\n" +
    "            <li ng-repeat=\"utilityItem in utility.menuItems\">\n" +
    "                <a  href={{utilityItem.link}}>\n" +
    "                    <span>{{utilityItem.label}}</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "</ul>");
}]);
