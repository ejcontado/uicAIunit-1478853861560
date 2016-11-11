angular.module('wf.angular.validation').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/validation/validation.html",
    "<input class=\"date n-inputfield\" ng-class=\"$ctrl.class\" ng-blur=\"$ctrl.validation()\" ng-focus=\"$ctrl.reEdit()\" ng-model=\"$ctrl.value\" placeholder=\"{{$ctrl.placeholder}}\" aria-label=\"{{$ctrl.pattern === undefined ?'userDefined':$ctrl.pattern}}\">");
}]);
