angular.module('wf.angular.spinner').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/spinner/spinner.html",
    "<div class=\"spinner-container\">\n" +
    "    <div ng-class=\"$ctrl.class\">\n" +
    "        <input ng-model=\"$ctrl.quantity\" onpaste=\"return false;\" oncontextmenu=\"return false;\" style=\"ime-mode:disabled;\"  ng-keydown=\"$ctrl.checkValid($event)\" ng-keyup=\"$ctrl.checkValue($event)\" ng-disabled=\"$ctrl.disable\" type=\"text\" class=\"form-control spinbox-input n-inputfield\"/>\n" +
    "        <div class=\"spinbox-buttons btn-group btn-group-vertical\">\n" +
    "            <button ng-click=\"$ctrl.increase($event)\" type=\"button\" class=\"btn btn-default spinbox-up btn-xs\" ng-disabled=\"$ctrl.disable\" role=\"button\" aria-label=\"increase\">\n" +
    "                <span class=\"icon icon-arrow-up\"></span>\n" +
    "            </button>\n" +
    "            <button ng-click=\"$ctrl.decrease($event)\" type=\"button\" class=\"btn btn-default spinbox-down btn-xs\"  ng-disabled=\"$ctrl.disable\" role=\"button\" aria-label=\"decrease\">\n" +
    "                <span class=\"icon icon-arrow\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
