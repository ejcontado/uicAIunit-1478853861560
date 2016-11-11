angular.module('wf.angular.panels').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/panels/panels-horizontal.html",
    "<!DOCTYPE html>\n" +
    "<div class=\"panel-slide-horizontal\">\n" +
    "    <div class=\"panel-left panel panel-container panel-shadow\">\n" +
    "        <div class=\"panel panel-blue-cap\" id=\"panelContent\"  aria-expanded=\"{{!$ctrl.isShow}}\">\n" +
    "            <div class=\"panel-heading\" ng-transclude=\"header\">\n" +
    "                <h1>{{$ctrl.header}}</h1>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\"  ng-transclude=\"body\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"panel-arrow panel-blue-cap\" aria-controls=\"panelContent\" role=\"button\" ng-attr-tabindex=\"{{ $ctrl.index }}\" ng-click=\"$ctrl.show($event)\" ng-keydown=\"$ctrl.showKeydown($event);\">\n" +
    "            <span class=\"icon icon-left\" aria-expanded=\"{{!$ctrl.isShow}}\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
