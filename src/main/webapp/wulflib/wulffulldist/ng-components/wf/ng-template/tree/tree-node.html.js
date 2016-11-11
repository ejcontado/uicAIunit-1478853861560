angular.module('wf.angular.tree').run(['$templateCache', function($templateCache) {
  $templateCache.put("wf/ng-template/tree/tree-node.html",
    "<li ng-class='[$ctrl.nodeTypeClass(),$ctrl.isOpenClass($ctrl.node),$ctrl.selectedClass($ctrl.node)]'\n" +
    "    ng-click=\"$ctrl.selectNode($ctrl.node,$event)\"\n" +
    "    data-template=\"{{$ctrl.isBranch()}}\"\n" +
    "    role=\"treeitem\" src=\"\" id=\"{{$ctrl.label}}\"\n" +
    "    aria-label=\"treeitem {{$ctrl.label}}\"\n" +
    "    aria-selected=\"{{$ctrl.node.isSelected}}\"\n" +
    "    aria-expanded=\"{{$ctrl.node.isExpend}}\">\n" +
    "    <div ng-class={\"tree-branch-header\":!$ctrl.isLeafClass()}>\n" +
    "        <a tabindex=\"0\" ng-class={\"tree-branch-name\":!$ctrl.isLeafClass(),\"tree-item-name\":$ctrl.isLeafClass()}\n" +
    "           ng-disabled=\"$ctrl.isNodeDisabled()\"\n" +
    "           ng-keydown=\"$ctrl.selectKeydown($ctrl.node, $event)\" role=\"button\">\n" +
    "            <span class=\"glyphicon icon-caret glyphicon-play\"\n" +
    "                  ng-click=\"$ctrl.itemExpended($ctrl.node, $event);\"\n" +
    "                  ng-if=\"!$ctrl.isLeafClass()\"></span>\n" +
    "            <span class=\"glyphicon icon-folder\"\n" +
    "                  ng-class=\"$ctrl.isOpenClass($ctrl.node)?'glyphicon-folder-open':'glyphicon-folder-close'\"\n" +
    "                  ng-if=\"!$ctrl.isLeafClass()\"></span>\n" +
    "            <span class=\"glyphicon icon-bullet\" ng-if=\"$ctrl.isLeafClass()\"></span>\n" +
    "            <span ng-if=\"$ctrl.hasCheckbox()\" class=\"checkbox\" name=\"file\">\n" +
    "				<input id=\"{{$ctrl.label}}-check\"\n" +
    "                       ng-keydown=\"$ctrl.selectCheckbox($ctrl.node,$event)\"\n" +
    "                       ng-model=\"$ctrl.node.isSelected\"\n" +
    "                       ui-indeterminate=\"$ctrl.node.isIndeterminate\"\n" +
    "                       ng-disabled=\"$ctrl.isNodeDisabled()\"\n" +
    "                       name=\"file\" type=\"checkbox\"/>\n" +
    "			    <label for=\"{{$ctrl.label}}-check\"\n" +
    "                       ng-click=\"$ctrl.triggerNode($ctrl.node)\"></label>\n" +
    "            </span>\n" +
    "            <!--+ {{$ctrl.node.isSelected}} + \"- \" + {{$ctrl.node.isIndeterminate}} + \"- \" + {{$ctrl.node.isExpend}}-->\n" +
    "            <span href class=\"tree-label\" role=\"button\" id=\"{{$ctrl.label}}-label\">\n" +
    "                {{$ctrl.label}}\n" +
    "            </span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <ul class=\"tree-branch-children\" ng-if=\"$ctrl.isChildrenShow($ctrl.node)\" role=\"group\">\n" +
    "        <wf-tree-node ng-repeat=\"item in $ctrl.children\"\n" +
    "                      label=\"item.title\"\n" +
    "                      children=\"item.children\"\n" +
    "                      node=\"item\"\n" +
    "                      disable=\"$ctrl.disable\"\n" +
    "                      src=\"\" on-selected=\"&\" on-expanded=\"\" on-cllapsed=\"\"\n" +
    "                      has-checkbox=\"$ctrl.hasCheckbox()\" ng-class=\"{'last':$last}\">\n" +
    "        </wf-tree-node>\n" +
    "    </ul>\n" +
    "</li>");
}]);
