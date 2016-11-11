angular.module('wf.angular.timezone').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/timezone/timezone.html",
    "<div class=\"btn-group selectlist selectlist-resize n-timezone\" data-resize=\"none\" data-markup=\"timezone\" >\n" +
    "    <button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" type=\"button\" aria-expanded=\"false\" ng-disabled=\"$ctrl.disable\" role=\"timezone\">\n" +
    "        <span class=\"selected-label\"></span>\n" +
    "        <span class=\"selected-caret\"><span class=\"caret\"></span></span>\n" +
    "        <span class=\"sr-only\" role=\"timezone\">Timezone Toggle Dropdown</span>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu n-dropdown-menu-scroll\" role=\"menu\"></ul>\n" +
    "</div>");
}]);
