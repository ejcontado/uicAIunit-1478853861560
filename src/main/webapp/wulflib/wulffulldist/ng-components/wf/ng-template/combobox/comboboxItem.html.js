angular.module('wf.angular.combobox').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/combobox/comboboxItem.html",
    "<li ng-if=\"$ctrl.parent.pattern !== 'file-selection'\" ng-cloak data-value=\"{{$ctrl.itemValue}}\" data-selected=\"{{$ctrl.parent.selectedItemValue === $ctrl.itemValue}}\" ng-class=\"{'selected': $ctrl.parent.selectedItemValue === $ctrl.itemValue}\">\n" +
    "    <a href ng-click=\"$ctrl.selectItem($event)\" ng-keydown=\"$ctrl.keyboardNavigation($event)\"  ng-disabled=\"$ctrl.disable\" tabindex=\"{{$ctrl.disable ? -1 : null}}\">\n" +
    "        <span class=\"ng-item\">{{$ctrl.itemText === undefined ? $ctrl.itemValue : $ctrl.itemText}}</span>\n" +
    "    </a>\n" +
    "</li>\n" +
    "\n" +
    "\n" +
    "<li ng-if=\"$ctrl.parent.pattern === 'file-selection'\"  ng-cloak>\n" +
    "    <a href=\"javascript:void(0);\" ng-click=\"$ctrl.clearFile()\" ng-keydown=\"$ctrl.keyboardNavigation($event)\">\n" +
    "        <span class=\"ng-item\"></span>\n" +
    "    </a>\n" +
    "</li>\n" +
    "<li ng-if=\"$ctrl.parent.pattern === 'file-selection'\" ng-cloak>\n" +
    "    <a ng-click=\"$ctrl.fileSelection($event)\" class=\"n-file-select\"  href=\"javascript:void(0);\"  ng-keydown=\"$ctrl.keyboardNavigation($event)\"  ng-disabled=\"$ctrl.disable\" tabindex=\"{{$ctrl.disable ? -1 : null}}\">\n" +
    "        <span class=\"icon icon-folder-open\" style=\"border-bottom:none\"></span>\n" +
    "        <span class=\"ng-item\">{{$ctrl.itemValue === undefined ? \"Browse...\":$ctrl.itemValue}}</span>\n" +
    "    </a>\n" +
    "    <div  class=\"n-file-upload\">\n" +
    "        <input type=\"file\" class=\"n-file-input\" tabindex=\"-1\"/>\n" +
    "    </div>\n" +
    "</li>");
}]);
