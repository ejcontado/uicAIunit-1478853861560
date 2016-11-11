angular.module('wf.angular.banner').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/banner/banner.html",
    "<nav class=\"n-banner nokia_banner_normal\" role=\"banner\" resize listen-ng-repeat-last>\n" +
    "\n" +
    "    <div class=\"n-banner-1st-filler-white\"></div>\n" +
    "    <div class=\"n-banner-1st-filler-blue\"></div>\n" +
    "    <div class=\"n-banner-2nd-filler-blue hidden-xs hidden-on-blue-detached\"></div>\n" +
    "    <div class=\"n-banner-2nd-filler-gray hidden-xs\"></div>\n" +
    "    <div class=\"n-banner-3rd-filler-gray hidden-xs\"></div>\n" +
    "\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"n-banner-header\" ng-cloak>\n" +
    "            <button class=\"n-banner-toggle collapsed\" data-target=\"#n-banner-collapse\" data-toggle=\"collapse\" type=\"button\">\n" +
    "            <span class=\"sr-only\">\n" +
    "              Toggle navigation\n" +
    "            </span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"n-banner-brand\" href=\"#\">\n" +
    "                {{$ctrl.productInfo.productName}} <span>{{$ctrl.productInfo.suiteName}} </span>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"collapse n-banner-collapse\" id=\"n-banner-collapse\" ng-cloak>\n" +
    "            <div class=\"row n-banner-1st\">\n" +
    "                <div class=\"n-banner-right n-banner-logo-img hidden-xs\">\n" +
    "                    <img alt=\"Nokia\" src=\"../wulfdist/img/logo.png\">\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"n-banner-right n-banner-1st-gray-to-white hidden-xs\">\n" +
    "                    <div class=\"gray-mask\"></div>\n" +
    "                    <div class=\"white-mask\"></div>\n" +
    "                    <div class=\"gray-corner\"></div>\n" +
    "                    <div class=\"white-corner\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- utility -->\n" +
    "                <wf-banner-utility-set utility-set=\"$ctrl.utilitySet\" ng-cloak>\n" +
    "                </wf-banner-utility-set>\n" +
    "\n" +
    "                <div class=\"n-banner-right n-banner-1st-blue-to-gray hidden-xs\" ng-cloak>\n" +
    "                    <div class=\"blue-mask\"></div>\n" +
    "                    <div class=\"gray-mask\"></div>\n" +
    "                    <div class=\"blue-corner\"></div>\n" +
    "                    <div class=\"gray-corner\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- search-->\n" +
    "                <div class=\"n-banner-right n-search hidden-on-blue-detached\" ng-cloak>\n" +
    "                    <a class=\"n-search-icon\" href=\"javascript:void(0)\" >\n" +
    "                        <span class=\"icon icon-search\" ng-if=\"$ctrl.productInfo.search\"></span>\n" +
    "                    </a>\n" +
    "                    <input id='TA_banner_search' type=\"text\" class=\"n-inputfield n-search-input\" ng-if=\"$ctrl.productInfo.search\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row n-banner-2nd\" ng-cloak >\n" +
    "                <wf-banner-nav-tabs  active=\"$ctrl.navTabsInfo.navTabIndex\" ng-cloak>\n" +
    "                    <wf-banner-nav-tab-item  ng-cloak ng-repeat=\"tab in $ctrl.navTabsInfo.navTabs\"  label=\"{{tab.label}}\" css-class=\"{{tab.cssClass }}\"  link=\"tab.link\"  dataitem=\"tab.dataItem\" menu-bar=\"tab.menuBar\"  emit-ng-repeat-last>\n" +
    "                    </wf-banner-nav-tab-item>\n" +
    "                </wf-banner-nav-tabs>\n" +
    "\n" +
    "                <wf-banner-action-set ng-cloak action-set = \"$ctrl.actionSet\" overflow-open = \"$ctrl.overflowOpen\">\n" +
    "                </wf-banner-action-set>\n" +
    "\n" +
    "                <div class=\"n-banner-2nd-gray-to-blue hidden-xs hidden-on-blue-detached\" ng-cloak>\n" +
    "                    <div ng-cloak class=\"gray-mask\"></div>\n" +
    "                    <div ng-cloak class=\"blue-mask\"></div>\n" +
    "                    <div ng-cloak class=\"gray-corner\"></div>\n" +
    "                    <div ng-cloak class=\"blue-corner\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- TA_banner_Anchor1one -->\n" +
    "            <div class=\"row n-banner-3rd\">\n" +
    "                <wf-banner-nav-tab-content>\n" +
    "                </wf-banner-nav-tab-content>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "");
}]);
