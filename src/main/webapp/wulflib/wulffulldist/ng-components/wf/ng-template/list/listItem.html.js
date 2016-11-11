angular.module('wf.angular.list').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/list/listItem.html",
    "<li role=\"listitem\" ng-attr-tabindex=\"{{$ctrl.tabindex}}\" ng-class=\n" +
    "\"{'n-list-group-item' : $ctrl.isSelectable === true, 'list-group-item' :  $ctrl.isSelectable === false, 'selected': $ctrl.select}\"\n" +
    "    ng-click=\"$ctrl.selectThis($event)\" ng-focus=\"$ctrl.focusThis()\">\n" +
    "    <ng-transclude></ng-transclude>\n" +
    "</li>\n" +
    "");
}]);
