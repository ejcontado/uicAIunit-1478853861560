angular.module('wf.angular.inlineinfo').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/inlineinfo/inlineinfo.html",
    "<div  ng-class=\"$ctrl.iconClass\">\n" +
    "    <span ng-class=\"$ctrl.iconMessage\">{{$ctrl.message}}</span>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
