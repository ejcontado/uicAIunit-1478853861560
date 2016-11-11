angular.module('wf.angular.dropdowns').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/dropdowns/dropdownsItem.html",
    "<li data-value=\"{{$ctrl.value}}\" data-selected=\"{{$ctrl.parent.selectedItem == $ctrl.value ||  $ctrl.parent.selectedItem == $ctrl.label }}\" >\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"$ctrl.selectItem($event)\" ng-keydown=\"$ctrl.keyboardNavigation($event)\" ng-disabled=\"$ctrl.disable\" tabindex=\"{{$ctrl.disable ? -1 : null}}\">\n" +
    "        <span class=\"ng-item\">{{$ctrl.displayText}}</span>\n" +
    "    </a>\n" +
    "</li>");
}]);
