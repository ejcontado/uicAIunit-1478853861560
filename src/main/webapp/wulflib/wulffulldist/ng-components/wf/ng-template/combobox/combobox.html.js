angular.module('wf.angular.combobox').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/combobox/combobox.html",
    "<div ng-class=\"[$ctrl.comboboxClass, {'combobox-open':$ctrl.isOpen, 'open':$ctrl.isOpen, 'n-cancel-button': $ctrl.pattern === 'clearable-textfield'}]\">\n" +
    "    <input ng-show=\"$ctrl.pattern === 'textfield' || $ctrl.pattern === 'clearable-textfield'\" ng-click=\"$ctrl.toggle($event)\" type=\"text\"\n" +
    "           class=\"form-control n-inputfield\" ng-model=\"$ctrl.selectedItemText\" ng-disabled=\"$ctrl.disable\">\n" +
    "    <a ng-show=\"$ctrl.pattern === 'clearable-textfield' && $ctrl.selectedItemText.length > 0\" ng-click=\"$ctrl.clearContent($event)\"\n" +
    "       ng-keydown=\"$ctrl.clearContent($event)\" class=\"n-clear-button-icon\" href=\"javascript:void(0)\" ng-disabled=\"$ctrl.disable\">\n" +
    "        <span role=\"button\" aria-label=\"clear content\" class=\"icon icon-close\"></span>\n" +
    "    </a>\n" +
    "    <button ng-show=\"$ctrl.pattern === 'menu' || $ctrl.pattern === 'sm-menu' || $ctrl.pattern === 'file-selection'\" ng-disabled=\"$ctrl.disable\"\n" +
    "            ng-class=\"[{'combobox-menu-open':$ctrl.isOpen,'combobox-menu-close':!$ctrl.isOpen}]\" ng-style=\"{'padding-right': '8px'}\"\n" +
    "            type=\"button\" class=\"btn n-combobutton-btn\" aria-expanded=\"false\">\n" +
    "        <span class=\"selected-label\" ng-style=\"{'max-width':'100%'}\">\n" +
    "            <span ng-bind=\"$ctrl.selectedItemText\" ng-style=\"{'overflow':'hidden', 'text-overflow':'ellipsis', 'max-width':'100%'}\"></span>\n" +
    "        </span>\n" +
    "    </button>\n" +
    "    <button ng-show=\"$ctrl.pattern === 'menu' || $ctrl.pattern === 'sm-menu' || $ctrl.pattern === 'file-selection'\" ng-click=\"$ctrl.toggle($event)\"\n" +
    "            ng-disabled=\"$ctrl.disable\" type=\"button\" class=\"btn dropdown-toggle\" aria-expanded=\"{{$ctrl.isOpen}}\"\n" +
    "            ng-keydown=\"$ctrl.keyboardStepInList($event)\">\n" +
    "        <span class=\"caret\"></span>\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "    </button>\n" +
    "    <div class=\"input-group-btn\" ng-style=\"{'width':$ctrl.menuWidth,'display':$ctrl.menuDisplay}\">\n" +
    "        <button ng-show=\"$ctrl.pattern === 'textfield' || $ctrl.pattern === 'clearable-textfield'\" ng-click=\"$ctrl.toggle($event)\" ng-disabled=\"$ctrl.disable\"\n" +
    "                type=\"button\" class=\"btn btn-default dropdown-toggle\" aria-expanded=\"{{$ctrl.isOpen}}\"\n" +
    "                ng-keydown=\"$ctrl.keyboardStepInList($event)\">\n" +
    "            <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul ng-class=\"['dropdown-menu', {'dropdown-menu-right':$ctrl.pattern === 'textfield' || $ctrl.pattern === 'clearable-textfield'}]\" style=\"display: block\"\n" +
    "            ng-style=\"{'width':$ctrl.pattern === 'menu' || $ctrl.pattern === 'sm-menu' || $ctrl.pattern === 'file-selection' ? '100%' : $ctrl.dropdownWidth+'px'}\" ng-show=\"$ctrl.isOpen === true\" ng-transclude>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
