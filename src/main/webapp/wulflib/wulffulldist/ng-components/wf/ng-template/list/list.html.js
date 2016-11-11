angular.module('wf.angular.list').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/list/list.html",
    "<div>\n" +
    "    <span ng-attr-aria-disabled=\"{{$ctrl.disable && 'true' || 'false'}}\" ng-class=\"{'label-disabled' : $ctrl.disable}\"\n" +
    "          role=\"heading\" class=\"n-list-group-header\" ng-if=\"$ctrl.heading.length > 0\">{{$ctrl.heading}}</span>\n" +
    "    <ul ng-attr-aria-disabled=\"{{$ctrl.disable && 'true' || 'false'}}\" ng-attr-role=\"{{ $ctrl.selectable && 'listbox' || 'list' }}\"\n" +
    "        ng-keydown=\"$ctrl.handleKeypress($event)\" class=\"n-list-group\"\n" +
    "     ng-class=\"{'disabled' : $ctrl.disable, 'n-list-striped' : $ctrl.design === 'striped', 'n-list-group-dark' : $ctrl.design === 'dark'}\">\n" +
    "        <ng-transclude></ng-transclude>\n" +
    "    </ul>\n" +
    "</div>");
}]);
