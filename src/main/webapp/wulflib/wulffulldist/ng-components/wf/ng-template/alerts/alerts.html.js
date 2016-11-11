angular.module('wf.angular.alerts').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/alerts/alerts.html",
    "<div role=\"alert\" class=\"alert\" ng-class=\"{'alert-error' : $ctrl.type === 'error'}\" ng-keypress=\"$ctrl.handleKeypress($event)\">\n" +
    "    <span class=\"icon\" ng-class=\"{true : 'icon-' + $ctrl.type, false: 'icon-info'}[$ctrl.typeSpecified]\"></span>\n" +
    "    <ng-transclude></ng-transclude>\n" +
    "    <a href=\"#\" aria-label=\"Alert close button\" role=\"button\" class=\"n-close\" ng-if=\"$ctrl.closeable\" ng-click=\"$ctrl.close()\">\n" +
    "        <span aria-hidden=\"true\" class=\"icon icon-close\"></span>\n" +
    "    </a>\n" +
    "</div>");
}]);
