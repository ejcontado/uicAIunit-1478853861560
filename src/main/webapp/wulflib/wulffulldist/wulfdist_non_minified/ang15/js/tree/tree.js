/**
 * Created by dragon on 6/28/2016;
 * Angular version of tabs component;
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["angular", "../const/constants"], factory);
    }
    else if (typeof module === "object" && module.exports) {
        //TODO Jonathan, is the root needed for angular?  Will check it later.
        module.exports = function(root, angular) {
            if (angular === undefined) {
                if (typeof window !== "undefined") {
                    angular = require("angular");
                }
                else {
                    angular = require("angular")(root);
                }
            }
            factory(angular, require("../const/constants"));
            return angular;
        };
    }
    else {
        factory(angular);
    }
}(function(angular) {
    "use strict";

    var treeNodeControler;

    treeNodeControler = function($scope, $document, $element, keyCodeConst) {

        this.isSelected = this.node.isSelected || false;
        this.isExpend = this.node.isExpend || false;
        this.node.isIndeterminate = this.node.isIndeterminate || false;
        this.disable = this.disable || false;

        this.nodeTypeClass = function() {
            return this.isLeafClass() ? "tree-item" : "tree-branch";
        };
        this.isBranch = function() {
            return this.isLeafClass() ? "treeitem" : "treebranch";
        };
        this.selectedClass = function(node) {
            return this.parent.selectedNode === node ? "tree-selected" : "";
        };
        this.hasCheckbox = function() {
            return this.parent.hasCheckbox;
        };

        this.isNodeDisabled = function() {
            return this.parent.disable;
        };

        this.isOpenClass = function(node) {
            return node.isExpend ? "tree-open" : "";
        };
        this.isChildrenShow = function(node) {
            return node.isExpend;
        };
        this.itemExpended = function(node, $event) {
            node.isExpend = !node.isExpend;
            $event.stopPropagation();
        };
        this.selectCheckbox = function(node, evt) {
            switch (evt.which) {
                case keyCodeConst.SPACE:
                    this.triggerNode(node);
                    evt.stopPropagation();
                    evt.preventDefault();
                    break;
            }

        };
        this.selectKeydown = function(node, evt) {
            if (this.disable) {
                return -1;
            }
            switch (evt.which) {
                case keyCodeConst.UP:
                case keyCodeConst.DOWN:
                    this.parent.selectKeydown(node, evt, evt.which === keyCodeConst.DOWN);
                    evt.preventDefault();
                    break;
                case keyCodeConst.TAB:
                    var isUp = !evt.shiftKey;
                    this.parent.selectKeydown(node, evt, isUp,true);
                    break;
                case keyCodeConst.SPACE:
                case keyCodeConst.ENTER:
                    this.selectNode(node, evt);
                    //node.isExpend = !node.isExpend;
                    evt.preventDefault();
                    break;
                case keyCodeConst.LEFT:
                    node.isExpend = false;
                    evt.preventDefault();
                    break;
                case keyCodeConst.RIGHT:
                    node.isExpend = true;
                    evt.preventDefault();
                    break;
            }
        };

        this.triggerNode = function(node) {
            if (!this.disable) {
                var currentStatus = node.isSelected;
                var targetStatus = !currentStatus;
                this.parent.updateAllTree(node, targetStatus);
            }
        };
        this.selectNode = function(node, $event) {
            if (!this.disable) {
                if (this.parent.selectedNode === node) {
                    this.parent.selectedNode = null;
                }
                else {
                    this.parent.selectedNode = node;
                }
                $event.stopPropagation();
            }

        };
        this.isLeafClass = function() {
            return !(this.children && this.children.length !== 0);
        };
    };
    treeNodeControler.$inject = ["$scope", "$document", "$element", "WF-KEYCODE-CONST"];

    var TreeController;
    var isCheckboxFocus;
    TreeController = function($document, $element, $timeout, TreeviewOptions) {
        this.selectedNode = this.selectedNode || "";
        this.hasCheckbox = this.hasCheckbox || false;
        var ng = angular, options = new TreeviewOptions();

        isCheckboxFocus = true;

        var getFocusElement = function(paneIdx, isCheckbox,isTab) {
            var s = $element.find("li")[paneIdx].firstElementChild.firstElementChild;
            if (isCheckbox && !isCheckboxFocus && isTab) {
                isCheckboxFocus = !isCheckboxFocus;
                return angular.element(s).find("input")[0];
            }
            else {
                isCheckboxFocus = !isCheckboxFocus;
                return s;
            }

        };

        this.selectKeydown = function(node, evt, isDown,isTab) {
            //console.log(angular.element(event.target));
            var fIdx = findNextSelectableIdx(node, isDown, this.hasCheckbox,isTab);
            if (fIdx !== null && fIdx !== -1) {
                var elem = getFocusElement(fIdx, this.hasCheckbox,isTab);
                $timeout(function() {
                    elem.focus();
                }, 0);
            }
        };
        //keyboard support...
        var findNextSelectableIdx = function(node, isDown,hasCheckbox,isTab) {
            var nodes = $element.find("li");
            var currIdx = findNodeIndex(nodes, node);
            var panesLen = nodes.length;
            var nextIdx = null;
            var startIndex;
            if (hasCheckbox && !isCheckboxFocus && isTab) {
                startIndex = currIdx;
            }
            else {
                startIndex = isDown ? ++currIdx : --currIdx;
            }

            if (startIndex < panesLen) {
                nextIdx = startIndex;
            }
            return nextIdx;
        };
        var findNodeIndex = function(nodes, node) {
            var index = null;
            var panesLen = nodes.length;
            for (var idx = 0; idx < panesLen; idx++) {
                if (nodes[idx].id === node.title) {
                    index = idx;
                }
            }
            return index;
        };

        this.updateAllTree = function(node, isSelected) {
            select(this.treeData, node, isSelected);
        };
        // object
        var makeDeselected = function(node) {
            node[this.selectedAttribute] = false;
            node[this.indeterminateAttribute] = false;
        };

        var makeSelected = function(node) {
            node[this.selectedAttribute] = true;
            node[this.indeterminateAttribute] = false;
        };

        var validateParent = function(node) {
            var children = node[this.childrenAttribute];
            var selectedAttr = this.selectedAttribute;
            var indeterminateAttr = this.indeterminateAttribute;
            var numSelected = 0, numIndeterminate = 0;
            /* jslint ignore:start */
            ng.forEach(children, function(n, ix) {
                if (n[selectedAttr]) {
                    numSelected++;
                }
                else {
                    if (n[indeterminateAttr]) {
                        numIndeterminate++;
                    }
                }
            });
            /* jslint ignore:end */
            if (0 === numSelected && 0 === numIndeterminate) {
                node[selectedAttr] = false;
                node[indeterminateAttr] = false;
            }
            else if (numSelected === children.length) {
                node[selectedAttr] = true;
                node[indeterminateAttr] = false;
            }
            else {
                node[selectedAttr] = false;
                node[indeterminateAttr] = true;
            }
        };
        var isId = function(val) {
            return ng.isString(val) || ng.isNumber(val);
        };

        function select(tree, node, opts, isSelected) {
            if (arguments.length > 2) {
                if (typeof opts === "boolean") {
                    isSelected = opts;
                    opts = {};
                }
            }
            opts = ng.extend({}, options, opts);
            isSelected = ng.isDefined(isSelected) ? isSelected : true;

            var useId = isId(node), proceed = true, idAttr = "id";

            treeViewBFS(tree, opts, function(n, p) {
                var isNode = proceed && (useId ?
                    node === n[idAttr] :
                    node === n);

                if (isNode) {
                    // I"ve been looking for you all my life
                    proceed = false;

                    var cb = isSelected ?
                        makeSelected.bind(opts) :
                        makeDeselected.bind(opts);

                    treeViewBFS(n, opts, cb);
                    ng.forEach(p, validateParent.bind(opts));
                }

                return proceed;
            });
        }

        function treeViewBFS(tree, opts, cb) {
            if (arguments.length === 2 && ng.isFunction(opts)) {
                cb = opts;
                opts = {};
            }
            opts = ng.extend({}, options, opts);
            cb = cb || ng.noop;
            var queue = [], childAttr = "children", next, node, parents, ix, numChildren;

            if (ng.isArray(tree)) {
                ng.forEach(tree, function(n) {
                    // node and parents
                    queue.push([n, []]);
                });
                next = queue.shift();
            }
            else {
                // node and parents
                next = [tree, []];
            }

            while (next) {
                node = next[0];
                parents = next[1];
                // cb might return `undefined` so we have to actually check for equality
                // against `false`
                if (cb(node, parents) !== false) {
                    if (node[childAttr] && ng.isArray(node[childAttr])) {
                        numChildren = node[childAttr].length;
                        for (ix = 0; ix < numChildren; ix++) {
                            queue.push([node[childAttr][ix], [node].concat(parents)]);
                        }
                    }
                }
                next = queue.shift();
            }
        }
    };
    TreeController.$inject = ["$document", "$element", "$timeout", "TreeviewOptions"];
    angular.module("wf.angular.tree", ["wf.angular.constants"])
        .component("wfTreeNode",
        {
            transclude: true,
            templateUrl: "wf/ng-template/tree/tree-node.html",
            require: {
                parent: "^^wfTree"
            },
            bindings: {
                label: "<",
                isSelected: "<",
                disable: "<?",
                children: "<",
                node: "<"
            },
            controller: treeNodeControler
        })
        .component("wfTree",
        {
            transclude: true,
            templateUrl: "wf/ng-template/tree/tree-view.html",
            bindings: {
                treeData: "=",
                hasCheckbox: "<?",
                disable: "<?"
            },
            controller: TreeController
        })
        .directive("uiIndeterminate", [
            function() {
                return {
                    compile: function(tElm, tAttrs) {
                        if (!tAttrs.type || tAttrs.type.toLowerCase() !== "checkbox") {
                            return angular.noop;
                        }

                        return function($scope, elm, attrs) {
                            $scope.$watch(attrs.uiIndeterminate, function(newVal) {
                                elm[0].indeterminate = !!newVal;
                            });
                        };
                    }
                };
            }])
        .provider("TreeviewOptions", function() {
            var options = {
                idAttribute: "id",
                labelAttribute: "label",
                childrenAttribute: "children",
                selectedAttribute: "isSelected",
                expandToDepth: 0,
                useCheckboxes: true,
                validate: true,
                indeterminateAttribute: "isIndeterminate",
                expandedAttribute: "isExpend",
                defaultSelectedState: true
            };
            this.set = function(opts) {
                angular.extend(options, opts);
            };

            this.$get = function() {
                return function() {
                    return angular.copy(options);
                };
            };
        });

}));