/**
 * Created by jiangdai on 2016/6/27.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../../wulf/tables'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../../wulf/tables'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
        var thiz;
        /*jshint -W069 */
        /*jshint loopfunc: true */
        function addCellSelectedClassForRow() {
            var drilldownRow = document.querySelectorAll('.n-drillDown-row');

            for(var index = 0; index < drilldownRow.length;index++) {
                var targetContentId = thiz.attributes['data-target-selector'].value;
                var currentContentId = drilldownRow[index].attributes['data-target-selector'].value;
                if(targetContentId === currentContentId) {
                    var tdCells = angular.element(drilldownRow[index]).children();
                    for(var ii = 0;ii < tdCells.length;ii++) {
                        angular.element(tdCells[ii]).addClass("n-cell-selected");
                    }
                }
            }
        }

        function removeDrilldownSelectClass(isRowToggle) {
            if(isRowToggle) {
                var drilldownRow = document.querySelectorAll('.n-drillDown-row');
                for(var index = 0; index < drilldownRow.length;index++) {
                    var tdCells = angular.element(drilldownRow[index]).children();
                    for(var ii = 0;ii < tdCells.length;ii++) {
                        angular.element(tdCells[ii]).removeClass("n-cell-selected");
                    }
                }

            } else {
                var drilldownCells = document.querySelectorAll('.n-drillDown-item');
                for(var index2 = 0; index2 < drilldownCells.length;index2++) {
                    angular.element(drilldownCells[index2]).removeClass("n-cell-selected").removeClass("n-drilldown-item-selected");
                }
            }
        }

        function collaspeDrilldown(drilldownClass, targetContentId) {
            var allDrilldownContent = document.querySelectorAll(drilldownClass);
            for(var i = 0; i < allDrilldownContent.length;i++) {
                var currentContentId = "#" + allDrilldownContent[i].attributes["id"].value;
                if( currentContentId === targetContentId) {
                    continue;
                }

                angular.element(allDrilldownContent[i]).css("height", "0").removeClass('drilldown-expanded').addClass('drilldown-collapsed');
            }
        }

        function setArrowDistance(targetContentId) {
            var arrowDiv = angular.element(angular.element(document.querySelector(targetContentId)).children()[0]).children();

            var left = thiz.offsetLeft;
            var width = thiz.offsetWidth;
            var distance = left + width / 2;
            angular.element(arrowDiv).css("left", distance + "px");
        }

        function toggleDrilldown(isRowToggle) {
            var targetContentId = thiz.attributes['data-target-selector'].value;
            removeDrilldownSelectClass(isRowToggle);
            var drilldownContentDivClass = isRowToggle ? ".n-drillDown-collapsed-row" : ".n-drillDown-collapsed";
            collaspeDrilldown(drilldownContentDivClass, targetContentId);

            if(isRowToggle) {
                var targetRowNgEle = angular.element(document.querySelector(targetContentId));
                var rowContentHeight = document.querySelector(targetContentId).attributes['height'].value;
                if(targetRowNgEle.hasClass('drilldown-collapsed')) {
                    targetRowNgEle.css("height", rowContentHeight).removeClass('drilldown-collapsed').addClass('drilldown-expanded');
                } else if(targetRowNgEle.hasClass('drilldown-expanded')) {
                    targetRowNgEle.css("height", "0").removeClass('drilldown-expanded').addClass('drilldown-collapsed');
                }
                addCellSelectedClassForRow();
            } else {
                var targetNgEle = angular.element(document.querySelector(targetContentId));
                var contentHeight = document.querySelector(targetContentId).attributes['height'].value;

                if(targetNgEle.hasClass('drilldown-collapsed')) {
                    targetNgEle.css("height", contentHeight).removeClass('drilldown-collapsed').addClass('drilldown-expanded');

                    setArrowDistance(targetContentId);
                    angular.element(thiz).addClass("n-cell-selected").addClass("n-drilldown-item-selected");
                } else if(targetNgEle.hasClass('drilldown-expanded')) {
                    targetNgEle.css("height", "0").removeClass('drilldown-expanded').addClass('drilldown-collapsed');
                    angular.element(thiz).addClass("n-cell-selected");
                }
            }

        }

        function registerEvent() {
            var drilldownCells = document.querySelectorAll('.n-drillDown-item');
            for(var index = 0; index < drilldownCells.length;index++) {
                angular.element(drilldownCells[index])
                    .on('click', function(e) {
                    thiz = this;
                    toggleDrilldown(false);
                    })
                    .on('keyup', function(e) {
                    var allItems = angular.element(document.querySelectorAll('.n-drillDown-collapsed'));
                    var hadExpanded = false;
                    for(var i = 0;i < allItems.length;i++) {
                        if(angular.element(allItems[i]).hasClass('drilldown-expanded')){
                            hadExpanded = true;
                        }
                    }
                    if((e.keyCode === 37 || e.keyCode === 39) && hadExpanded) {
                        angular.element(document.querySelector('.n-cell-selected'))[0].click();
                    }
                 });
            }

            var drilldownRow = document.querySelectorAll('.n-drillDown-row');
            for(var index2 = 0; index2 < drilldownRow.length;index2++) {
                angular.element(drilldownRow[index2]).on('click', function(e) {
                    thiz = this;
                    toggleDrilldown(true);
                });
            }
        }

        function initTabIndex() {
            var tdDrillDownItems = document.querySelectorAll('td.n-drillDown-item');
            for(var i = 0; i < tdDrillDownItems.length;i++) {
                angular.element(tdDrillDownItems[i]).attr("tabindex", 0);
            }

            var trDrillDown = document.querySelectorAll('tr.n-drillDown-row');
            for(var idx = 0; idx < trDrillDown.length;idx++) {
                var tdCells = angular.element(trDrillDown[idx]).children();

                for(var j = 0;j < tdCells.length; j++) {
                    angular.element(tdCells[j]).attr("tabindex", 0);
                }
            }
        }
        angular.element(document).ready(function () {
            initTabIndex();
            registerEvent();
        });
    }
));
