angular.module('wf.angular.search').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/search/search.html",
    "<div class=\"n-search\"\n" +
    "     ng-class=\"{\n" +
    "     'n-search-clearable':($ctrl.type=='clear'||$ctrl.type =='clearDropDown'),\n" +
    "     'n-search-action':($ctrl.type=='searchBtnDropDown'||$ctrl.type =='searchBtn'),\n" +
    "     'n-search-disable':$ctrl.disable\n" +
    "     , 'open':($ctrl.isOpen )\n" +
    "     }\"\n" +
    ">\n" +
    "    <a ng-if=\"!$ctrl.disable && ($ctrl.type!='dropDown' && $ctrl.type!='clearDropDown'&& $ctrl.type!='searchBtnDropDown')\"  class=\"n-search-icon\" >\n" +
    "        <span class=\"icon icon-search\" ></span>\n" +
    "    </a>\n" +
    "    <a ng-if=\"$ctrl.disable && ($ctrl.type!='dropDown' && $ctrl.type!='clearDropDown'&& $ctrl.type!='searchBtnDropDown')\"  class=\"n-search-icon\" >\n" +
    "        <span class=\"icon icon-search\" ></span>\n" +
    "    </a>\n" +
    "\n" +
    "    <a  ng-if=\"!$ctrl.disable && ($ctrl.type=='dropDown' || $ctrl.type=='clearDropDown'|| $ctrl.type=='searchBtnDropDown')\" tabindex=\"0\" ng-click=\"$ctrl.search($event)\" ng-keydown=\"$ctrl.handelKeyboard($event)\"  class=\"n-search-icon dropdown-toggle\" >\n" +
    "        <span class=\"icon icon-search\" ></span>\n" +
    "        <span class=\"icon icon-arrow\"></span>\n" +
    "    </a>\n" +
    "\n" +
    "    <a  ng-if=\"$ctrl.disable && ($ctrl.type=='dropDown' || $ctrl.type=='clearDropDown'|| $ctrl.type=='searchBtnDropDown')\" tabindex=\"-1\"   class=\"n-search-icon dropdown-toggle\" disabled >\n" +
    "        <span class=\"icon icon-search\" ></span>\n" +
    "        <span class=\"icon icon-arrow\"></span>\n" +
    "    </a>\n" +
    "\n" +
    "    <input ng-if=\"!$ctrl.disable\"  ng-keydown=\"$ctrl.onTextInput($event)\"  ng-model=\"$ctrl.textValue\"  class=\"n-inputfield n-search-input\" placeholder=\"{{$ctrl.placeholder}}\">\n" +
    "\n" +
    "    <input ng-if=\"$ctrl.disable\" tabindex=\"-1\" disabled ng-model=\"$ctrl.textValue\" class=\"n-inputfield n-search-input\" placeholder=\"{{$ctrl.placeholder}}\">\n" +
    "\n" +
    "    <ul ng-if=\"$ctrl.type=='dropDown' || $ctrl.type=='clearDropDown' || $ctrl.type=='searchBtnDropDown'\" class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\n" +
    "        <li ng-if=\"!$ctrl.disable\" ng-click=\"$ctrl.onItemSelectedCallback()($event,item,$ctrl.textValue)\" ng-repeat=\"item in $ctrl.dropDownData\" role=\"presentation\"><a tabindex=\"{{$ctrl.disable?-1:0}}\" ng-keydown=\"$ctrl.updAndDown($event)\"  role=\"menuitem\" href=\"#\"><span value=\"{{item.value}}\">{{item.text}}</span></a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <a ng-if=\"( $ctrl.type == 'clear' || $ctrl.type=='clearDropDown' ) &&  !$ctrl.disable\" ng-click=\"$ctrl.clear($event)\"\n" +
    "       ng-keydown=\"$ctrl.clearOnKeyDown($event)\"\n" +
    "       class=\"n-search-control-icon\" href=\"#\" tabindex=\"0\" >\n" +
    "        <span class=\"icon icon-close\" ></span>\n" +
    "    </a>\n" +
    "    <a\n" +
    "        ng-if=\" ( $ctrl.type == 'clear' || $ctrl.type=='clearDropDown' ) && $ctrl.disable\"\n" +
    "        tabindex=\"-1\" disabled\n" +
    "        class=\"n-search-control-icon\" href=\"javascript:void(0)\" >\n" +
    "        <span class=\"icon icon-close\" ></span>\n" +
    "    </a>\n" +
    "\n" +
    "    <button ng-if=\"($ctrl.type == 'searchBtn' || $ctrl.type == 'searchBtnDropDown') && !$ctrl.disable \" class=\"btn n-search-button\"\n" +
    "    ng-click=\"$ctrl.onSubmitCallback()($event,$ctrl.textValue)\"\n" +
    "    >{{$ctrl.searchBtnText}}</button>\n" +
    "\n" +
    "    <button ng-if=\"($ctrl.type == 'searchBtn'|| $ctrl.type == 'searchBtnDropDown') && $ctrl.disable\" class=\"btn n-search-button\" disabled >{{$ctrl.searchBtnText}}</button>\n" +
    "</div>");
}]);
