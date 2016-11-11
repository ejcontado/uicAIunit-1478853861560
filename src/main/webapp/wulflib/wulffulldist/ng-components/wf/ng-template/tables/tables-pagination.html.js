angular.module('wf.angular.tables').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tables/tables-pagination.html",
    "<div class=\"n-table-total has-filter\">\n" +
    "    <span class=\"icon icon-filter\"></span>\n" +
    "    <span class=\"n-table-filter-result\">{{'results'|translate}}: <span>{{totalItemCount}}</span></span>\n" +
    "    <span>{{'total'|translate}}: <span>{{totalRecords}}</span></span>\n" +
    "</div>\n" +
    "<div class=\"n-table-pagenum\">\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"firstPage(currentPage)\">\n" +
    "        <span class=\"icon icon-first\"></span>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"previousPage(currentPage)\">\n" +
    "        <span class=\"icon icon-back\"></span>\n" +
    "    </button>\n" +
    "    <span>{{'page'|translate}}</span>\n" +
    "    <input type=\"text\" class=\"n-inputfield n-inputfield-small\" ng-model=\"currentPage\" ng-change=\"goToPage(currentPage)\"/>\n" +
    "    <span>/ {{numPages}}</span>\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"nextPage(currentPage)\">\n" +
    "        <span class=\"icon icon-next\"></span>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"lastPage(currentPage)\">\n" +
    "        <span class=\"icon icon-last\"></span>\n" +
    "    </button>\n" +
    "</div>\n" +
    "<div class=\"n-table-pageselect\">\n" +
    "    <div class=\"n-table-pagecombox\">\n" +
    "        <div class=\"input-group input-append dropdown combobox n-combobutton-small n-page-combox\" data-initialize=\"combobox\" name=\"itemPerPageDiv\">\n" +
    "            <input type=\"text\" ng-model=\"wfItemsByPage\" class=\"form-control n-inputfield n-inputfield-small\" value=\"{{wfItemsByPage}}\" style=\"text-align: center;\">\n" +
    "\n" +
    "            <div class=\"input-group-btn\">\n" +
    "                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span></button>\n" +
    "                <ul class=\"dropdown-menu dropdown-menu-right\" role=\"menu\" style=\"width: 70px;\">\n" +
    "                    <li data-value=\"5\" ng-class=\"{'selected': wfItemsByPage === 5}\"><a href=\"#\" ng-click=\"selectDisplayItemsByPage(5)\" ><span>5</span></a></li>\n" +
    "                    <li data-value=\"10\" ng-class=\"{'selected': wfItemsByPage === 10}\"><a href=\"#\" ng-click=\"selectDisplayItemsByPage(10)\" ><span>10</span></a></li>\n" +
    "                    <li data-value=\"20\" ng-class=\"{'selected': wfItemsByPage === 20}\"><a href=\"#\" ng-click=\"selectDisplayItemsByPage(20)\" ><span>20</span></a></li>\n" +
    "                    <li data-value=\"30\" ng-class=\"{'selected': wfItemsByPage === 30}\"><a href=\"#\" ng-click=\"selectDisplayItemsByPage(30)\"><span>30</span></a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"n-table-suffix\">\n" +
    "        <span>{{'itemsPerpage'|translate}}</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
