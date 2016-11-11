angular.module('wf.angular.treeTable').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tree-table/treeTable-td.html",
    "<div class=\"tree-table-td\" ng-bind-html=\"$ctrl.toAppendHtml\"></div>\n" +
    "");
}]);
