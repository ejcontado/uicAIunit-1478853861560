angular.module('wf.angular.progress').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/progress/progress.html",
    "<div ng-if=\"$ctrl.pattern === 'bar' || $ctrl.pattern === 'sm-bar' || $ctrl.pattern === 'indeterminate-bar'\"\n" +
    "     class=\"progress\"\n" +
    "     ng-class=\"{'progress-small': $ctrl.pattern === 'sm-bar', 'n-indeterminate-progress':$ctrl.pattern === 'indeterminate-bar', 'with-value': $ctrl.showValue === 'end'}\">\n" +
    "    <div class=\"progress-bar\"\n" +
    "         ng-class=\"{active:$ctrl.active, 'progress-bar-striped':$ctrl.pattern === 'indeterminate-bar'}\"\n" +
    "         role=\"progressbar\" aria-valuenow=\"{{$ctrl.percentage}}\"\n" +
    "         aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{'width': $ctrl.percentage + '%'}\">\n" +
    "        <span ng-if=\"$ctrl.showValue == 'inline'\" class=\"progress-value\">{{$ctrl.percentage}}%</span>\n" +
    "        <span ng-if=\"$ctrl.showValue == null\" class=\"sr-only\">{{$ctrl.percentage}}% completed</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<span ng-if=\"($ctrl.pattern === 'bar' || $ctrl.pattern === 'sm-bar' || $ctrl.pattern === 'indeterminate-bar')\n" +
    "    && $ctrl.showValue == 'end'\" class=\"progress-value-inverse\">{{$ctrl.percentage}}%</span>\n" +
    "<span ng-if=\"$ctrl.pattern === 'loading' || $ctrl.pattern === 'sm-loading'\" class=\"icon icon-spinner\"\n" +
    "      ng-class=\"{'icon-spinner-large':$ctrl.pattern === 'loading'}\"></span>\n" +
    "");
}]);
