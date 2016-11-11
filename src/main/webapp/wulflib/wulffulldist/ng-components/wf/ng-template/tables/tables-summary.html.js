angular.module('wf.angular.tables').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tables/tables-summary.html",
    "<div class=\"n-table-total has-filter\">\n" +
    "    <span class=\"icon icon-filter\"></span>\n" +
    "    <span class=\"n-table-filter-result\">{{'results'|translate}}: <span>{{totalItemCount}}</span></span>\n" +
    "    <span>{{'total'|translate}}: <span>{{totalRecords}}</span></span>\n" +
    "</div>");
}]);
