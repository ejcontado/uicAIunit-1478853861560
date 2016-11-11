angular.module('wf.angular.treeTable').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tree-table/treeTable.html",
    "<div class=\"n-tree-table-control-area\">\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"$ctrl.expandAll()\">\n" +
    "        <span class=\"icon icon-expand\"></span>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-icon\" ng-click=\"$ctrl.collapseAll()\">\n" +
    "        <span class=\"icon icon-collapse-rounded\"></span>\n" +
    "    </button>\n" +
    "</div>\n" +
    "<div class=\"n-tree-table-container\">\n" +
    "    <table class=\"n-tree-table\" border=\"1\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <td nowrap ng-repeat=\"headerText in $ctrl.tableHeaders track by $index\" ng-class=\"[$ctrl.getTdAlign($index)]\">{{headerText.title}}</td>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-click=\"$ctrl.onRowClick(item)\" ng-class=\"{'selected':item.model.selected}\"\n" +
    "            ng-repeat=\"item in $ctrl.treeTableModel.all() track by $index\" ng-show=\"$ctrl.showTr(item)\">\n" +
    "            <td ng-if=\"$ctrl.hasCheckBox()\">\n" +
    "                <div class=\"checkbox checkbox-small\">\n" +
    "                    <input id=\"{{'tableCheckbox' + $index}}\" type=\"checkbox\" ng-checked=\"item.model.checked\" ng-disabled=\"item.model.checkboxDisabled\" ng-click=\"$ctrl.onCheckBoxClicked($event)\"></input>\n" +
    "                    <label for=\"{{'tableCheckbox' + $index}}\"></label>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td ng-repeat=\"tdContent in item.model.colData track by $index\" \n" +
    "                ng-style='$ctrl.getIndent(item,$index)' \n" +
    "                ng-class=\"[$ctrl.getTdAlign($index + 1)]\">\n" +
    "                <span ng-if=\"$ctrl.hasToggleBtn(item,$index)\"\n" +
    "                      ng-class=\"{'btn_expand icon icon-arrow':item.model.expanded,'btn_collapse icon icon-next':!item.model.expanded}\"\n" +
    "                      ng-click=\"$ctrl.onToggleExpandClicked(item,$event);\"></span>\n" +
    "                <wf-tree-table-td tree-table-td-renderer=\"$ctrl.treeTableTdRenderer\" index=\"$index\"\n" +
    "                               ng-class=\"{'with-expand-span-ahead':$ctrl.hasToggleBtn(item,$index)}\"\n" +
    "                               col-data=\"item.model.colData\"></wf-tree-table-td>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);
