angular.module('wf.angular.dropdowns').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/dropdowns/dropdowns.html",
    "<div ng-class=\"$ctrl.dropdownClassStr\" data-resize=\"none\" data-initialize=\"selectlist\">\n" +
    "    <button ng-class=\"$ctrl.dropdownButtonClassStr\" ng-click=\"$ctrl.toggle($event)\" data-toggle=\"dropdown\" type=\"button\" aria-expanded=\"{{$ctrl.show}}\" ng-disabled=\"$ctrl.disable\"\n" +
    "            ng-keydown=\"$ctrl.keyboardStepInList($event)\">\n" +
    "        <span class=\"selected-label\"><span>{{$ctrl.selectedItem}}</span></span>\n" +
    "        <span class=\"selected-caret\"><span class=\"caret\"></span></span>\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu\" style=\"display: block\" role=\"menu\" ng-show=\"$ctrl.show\" ng-transclude>\n" +
    "    </ul>\n" +
    "    <input class=\"hidden hidden-field\" readonly=\"readonly\" aria-hidden=\"true\"\n" +
    "           type=\"text\"/>\n" +
    "</div>");
}]);
