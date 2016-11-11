angular.module('wf.angular.panels').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/panels/panels-vertical.html",
    "<!DOCTYPE html>\n" +
    "<div class=\"panel panel-slide-vertical panel-container panel-shadow panel-blue-cap\">\n" +
    "    <div class=\"panel-heading\" role=\"button\" aria-controls=\"panelContent\" ng-attr-tabindex=\"{{ $ctrl.index }}\"\n" +
    "         ng-click=\"$ctrl.show($event)\" ng-keydown=\"$ctrl.showKeydown($event);\" ng-transclude=\"header\">\n" +
    "        <h1>\n" +
    "            <div class=\"panel-arrow\">\n" +
    "                <span class=\"icon icon-down\" ng-show=\"$ctrl.slideAnimation\" aria-expanded=\"{{!$ctrl.isShow}}\"></span>\n" +
    "                <label>{{$ctrl.header}}</label >\n" +
    "            </div>\n" +
    "        </h1>\n" +
    "    </div>\n" +
    "    <div ng-if=\"$ctrl.scrollbar\"\n" +
    "         wf-scrollbar\n" +
    "         scrollbar-config = $ctrl.scrollbar ng-transclude>\n" +
    "        <div class=\"panel-body\" aria-expanded=\"{{!$ctrl.isShow}}\" ng-transclude=\"body\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!$ctrl.scrollbar\" class=\"panel-body\" aria-expanded=\"{{!$ctrl.isShow}}\" ng-transclude=\"body\">\n" +
    "    </div>\n" +
    "</div>");
}]);
