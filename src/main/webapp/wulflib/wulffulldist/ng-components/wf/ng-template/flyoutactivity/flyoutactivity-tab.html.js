angular.module('wf.angular.flyoutactivity').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/flyoutactivity/flyoutactivity-tab.html",
    "<li ng-click=\"$ctrl.handleFlyoutOpen($event)\" ng-keydown=\"$ctrl.keyboardNavigation($event)\" ng-style=\"{'left': $ctrl.left+'px','top':$ctrl.top + 'px','right': $ctrl.right + 'px','z-index': $ctrl.zIndex}\" ng-class=\"{selected:$ctrl.selected}\">\n" +
    "    <a href=\"#{{tab}}\" ng-class=\"[$ctrl.direction,{focus:$ctrl.focus,selected:$ctrl.selected}]\" ng-focus=\"$ctrl.handleFlyoutFocus($event)\"><span class=\"border-container\" ng-class=\"[$ctrl.direction,{selected:$ctrl.selected}]\" ng-transclude></span></a>\n" +
    "</li>");
}]);
