
(function (factory) {
        if (typeof define === 'function' && define.amd) {
            define(['angular', '../const/constants'], factory);
        } else if (typeof module === 'object' && module.exports) {
            module.exports = function (root, angular) {
                if (angular === undefined) {
                    if (typeof window !== 'undefined') {
                        angular = require('angular');

                    } else {
                        angular = require('angular')(root);
                    }
                }
                factory(angular, require('../const/constants'));
                return angular;
            };
        } else {
            factory(angular);
        }
    }(function (ng, undefined){
        'use strict';

        ng.module('wf.angular.tables', []).run(['$templateCache', function ($templateCache) {
            $templateCache.put('ng-template/smart-table/pagination.html',
                '<nav ng-if="numPages && pages.length >= 2"><ul class="pagination">' +
                '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a href="javascript: void(0);" ng-click="selectPage(page)">{{page}}</a></li>' +
                '</ul></nav>');
        }]);

        ng.module('wf.angular.tables')
            .constant('wfConfig', {
                summary: {
                    template: "wf/ng-template/tables/tables-summary.html"
                },
                pagination: {
                    template: 'wf/ng-template/tables/tables-pagination.html',
                    itemsByPage: 10,
                    displayedPages: 5
                },
                search: {
                    delay: 400, // ms
                    inputEvent: 'input'
                },
                select: {
                    mode: 'single',
                    selectedClass: 'st-selected'
                },
                sort: {
                    ascentClass: 'st-sort-ascent',
                    descentClass: 'st-sort-descent',
                    descendingFirst: false,
                    skipNatural: false,
                    delay:300
                },
                pipe: {
                    delay: 100 //ms
                }
            });
        ng.module('wf.angular.tables')
            .controller('wfTableController', ['$scope', '$parse', '$filter', '$attrs', function StTableController ($scope, $parse, $filter, $attrs) {
                var propertyName = $attrs.wfTable;
                var displayGetter = $parse(propertyName);
                var displaySetter = displayGetter.assign;

                var safeGetter;
                var orderBy = $filter('orderBy');
                var filter = $filter('filter');
                var safeCopy = copyRefs(displayGetter($scope));
                var tableState = {
                    sort: {},
                    search: {},
                    pagination: {
                        start: 0,
                        totalItemCount: 0
                    }
                };
                var filtered;
                var pipeAfterSafeCopy = true;
                var ctrl = this;
                var lastSelected;
                var totalRecords = safeCopy.length;
                var predicateArray = [];

                function copyRefs (src) {
                    return src ? [].concat(src) : [];
                }

                function updateSafeCopy () {
                    safeCopy = copyRefs(safeGetter($scope));
                    if (pipeAfterSafeCopy === true) {
                        ctrl.pipe();
                    }
                }

                function deepDelete (object, path) {
                    if (path.indexOf('.') !== -1) {
                        var partials = path.split('.');
                        var key = partials.pop();
                        var parentPath = partials.join('.');
                        var parentObject = $parse(parentPath)(object);
                        delete parentObject[key];
                        if (Object.keys(parentObject).length === 0) {
                            deepDelete(object, parentPath);
                        }
                    } else {
                        delete object[path];
                    }
                }

                if ($attrs.wfSafeSrc) {
                    safeGetter = $parse($attrs.wfSafeSrc);
                    $scope.$watch(function () {
                        var safeSrc = safeGetter($scope);
                        return safeSrc && safeSrc.length ? safeSrc[0] : undefined;
                    }, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            updateSafeCopy();
                        }
                    });
                    $scope.$watch(function () {
                        var safeSrc = safeGetter($scope);
                        return safeSrc ? safeSrc.length : 0;
                    }, function (newValue, oldValue) {
                        if (newValue !== safeCopy.length) {
                            updateSafeCopy();
                        }
                    });
                    $scope.$watch(function () {
                        return safeGetter($scope);
                    }, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            tableState.pagination.start = 0;
                            updateSafeCopy();
                        }
                    });
                }

                this.getTotalRecords = function () {
                    return totalRecords;
                };
                /**
                 * sort the rows
                 * @param {Function | String} predicate - function or string which will be used as predicate for the sorting
                 * @param [reverse] - if you want to reverse the order
                 */
                this.sortBy = function sortBy (predicate, reverse) {
                    tableState.sort.predicate = predicate;
                    tableState.sort.reverse = reverse === true;

                    if (ng.isFunction(predicate)) {
                        tableState.sort.functionName = predicate.name;
                    } else {
                        delete tableState.sort.functionName;
                    }

                    tableState.pagination.start = 0;
                    return this.pipe();
                };

                function putEleIntoPredicateArray(predicate) {
                    if(predicateArray.indexOf(predicate) === -1) {
                        predicateArray.push(predicate);
                    }
                }

                /**
                 * search matching rows
                 * @param {String} input - the input string
                 * @param {String} [predicate] - the property name against you want to check the match, otherwise it will search on all properties
                 */
                this.search = function search (input, predicate) {
                    putEleIntoPredicateArray(predicate);
                    var predicateObject = tableState.search.predicateObject || {};
                    var prop = predicate ? predicate : '$';

                    input = ng.isString(input) ? input.trim() : input;
                    $parse(prop).assign(predicateObject, input);
                    // to avoid to filter out null value
                    if (!input) {
                        deepDelete(predicateObject, prop);
                    }

                    tableState.search.predicateObject = predicateObject;
                    tableState.pagination.start = 0;
                    return this.pipe();
                };

                this.clearSearch = function () {
                    for(var index = 0; index < predicateArray.length; index++) {
                        var predicate = predicateArray[index].trim();
                        this.search('', predicate);
                    }
                };

                /**
                 * this will chain the operations of sorting and filtering based on the current table state (sort options, filtering, ect)
                 */
                this.pipe = function pipe () {
                    var pagination = tableState.pagination;
                    var output;
                    filtered = tableState.search.predicateObject ? filter(safeCopy, tableState.search.predicateObject) : safeCopy;
                    if (tableState.sort.predicate) {
                        filtered = orderBy(filtered, tableState.sort.predicate, tableState.sort.reverse);
                    }
                    pagination.totalItemCount = filtered.length;
                    if (pagination.number !== undefined) {
                        pagination.numberOfPages = filtered.length > 0 ? Math.ceil(filtered.length / pagination.number) : 1;
                        pagination.start = pagination.start >= filtered.length ? (pagination.numberOfPages - 1) * pagination.number : pagination.start;
                        output = filtered.slice(pagination.start, pagination.start + parseInt(pagination.number));
                    }

                    //resultRecords = output || filtered;
                    displaySetter($scope, output || filtered);
                };

                /**
                 * select a dataRow (it will add the attribute isSelected to the row object)
                 * @param {Object} row - the row to select
                 * @param {String} [mode] - "single" or "multiple" (multiple by default)
                 */
                this.select = function select (row, mode) {
                    var rows = copyRefs(displayGetter($scope));
                    var index = rows.indexOf(row);
                    if (index !== -1) {
                        if (mode === 'single') {
                            row.isSelected = row.isSelected !== true;
                            if (lastSelected) {
                                lastSelected.isSelected = false;
                            }
                            lastSelected = row.isSelected === true ? row : undefined;
                        } else {
                            rows[index].isSelected = !rows[index].isSelected;
                        }
                    }
                };

                /**
                 * take a slice of the current sorted/filtered collection (pagination)
                 *
                 * @param {Number} start - start index of the slice
                 * @param {Number} number - the number of item in the slice
                 */
                this.slice = function splice (start, number) {
                    tableState.pagination.start = start;
                    tableState.pagination.number = number;
                    return this.pipe();
                };

                /**
                 * return the current state of the table
                 * @returns {{sort: {}, search: {}, pagination: {start: number}}}
                 */
                this.tableState = function getTableState () {
                    return tableState;
                };

                this.getFilteredCollection = function getFilteredCollection () {
                    return filtered || safeCopy;
                };

                /**
                 * Use a different filter function than the angular FilterFilter
                 * @param filterName the name under which the custom filter is registered
                 */
                this.setFilterFunction = function setFilterFunction (filterName) {
                    filter = $filter(filterName);
                };

                /**
                 * Use a different function than the angular orderBy
                 * @param sortFunctionName the name under which the custom order function is registered
                 */
                this.setSortFunction = function setSortFunction (sortFunctionName) {
                    orderBy = $filter(sortFunctionName);
                };

                /**
                 * Usually when the safe copy is updated the pipe function is called.
                 * Calling this method will prevent it, which is something required when using a custom pipe function
                 */
                this.preventPipeOnWatch = function preventPipe () {
                    pipeAfterSafeCopy = false;
                };
            }])
            .directive('wfTable', function () {
                return {
                    restrict: 'A',
                    controller: 'wfTableController',
                    link: function (scope, element, attr, ctrl) {

                        if (attr.wfSetFilter) {
                            ctrl.setFilterFunction(attr.wfSetFilter);
                        }

                        if (attr.wfSetSort) {
                            ctrl.setSortFunction(attr.wfSetSort);
                        }
                    }
                };
            });

        ng.module('wf.angular.tables').directive('wfClear', ['wfConfig', '$timeout','$parse', function (wfConfig, $timeout, $parse,$scope) {
            return {
                require: '^wfTable',
                link: function (scope, element, attr, ctrl) {
                    element.bind('click', function clearClick () {
                        ctrl.clearSearch();
                        scope.$apply();
                    });
                }
            };
        }]);

        ng.module('wf.angular.tables')
            .directive('wfSearch', ['wfConfig', '$timeout','$parse', function (wfConfig, $timeout, $parse) {
                return {
                    require: '^wfTable',
                    link: function (scope, element, attr, ctrl) {
                        var tableCtrl = ctrl;
                        var promise = null;
                        var throttle = attr.wfDelay || wfConfig.search.delay;
                        var event = attr.wfInputEvent || wfConfig.search.inputEvent;

                        attr.$observe('wfSearch', function (newValue, oldValue) {
                            var input = element[0].value;

                            if (newValue !== oldValue && input) {
                                ctrl.tableState().search = {};
                                tableCtrl.search(input, newValue);
                            }
                        });

                        scope.$watch(function () {
                            return ctrl.tableState().search;
                        }, function (newValue, oldValue) {
                            var predicateExpression = attr.wfSearch || '$';

                            if (newValue.predicateObject && $parse(predicateExpression)(newValue.predicateObject) !== element[0].value) {
                                element[0].value = $parse(predicateExpression)(newValue.predicateObject) || '';
                            }
                        }, true);

                        // view -> table state
                        element.bind(event, function (evt) {
                            evt = evt.originalEvent || evt;
                            if (promise !== null) {
                                $timeout.cancel(promise);
                            }

                            promise = $timeout(function () {
                                tableCtrl.search(evt.target.value, attr.wfSearch || '');
                                promise = null;
                            }, throttle);
                        });
                    }
                };
            }]);

        ng.module('wf.angular.tables')
            .directive('wfSelectRow', ['wfConfig', function (wfConfig) {
                return {
                    restrict: 'A',
                    require: '^wfTable',
                    scope: {
                        row: '=wfSelectRow'
                    },
                    link: function (scope, element, attr, ctrl) {
                        var mode = attr.wfSelectMode || wfConfig.select.mode;
                        element.bind('click', function () {
                            scope.$apply(function () {
                                ctrl.select(scope.row, mode);
                            });
                        });

                        scope.$watch('row.isSelected', function (newValue) {
                            if (newValue === true) {
                                element.addClass(wfConfig.select.selectedClass);
                            } else {
                                element.removeClass(wfConfig.select.selectedClass);
                            }
                        });
                    }
                };
            }]);

        ng.module('wf.angular.tables')
            .directive('wfSort', ['wfConfig', '$parse', '$timeout', function (wfConfig, $parse, $timeout) {
                return {
                    restrict: 'A',
                    require: '^wfTable',
                    link: function (scope, element, attr, ctrl) {
                        var predicate = attr.wfSort;
                        var getter = $parse(predicate);
                        var index = 0;
                        var classAscent = attr.wfClassAscent || wfConfig.sort.ascentClass;
                        var classDescent = attr.wfClassDescent || wfConfig.sort.descentClass;
                        var stateClasses = [classAscent, classDescent];
                        var sortDefault;
                        var skipNatural = attr.wfSkipNatural !== undefined ? attr.wfSkipNatural === "true" : wfConfig.sort.skipNatural;
                        var descendingFirst = attr.wfDescendingFirst !== undefined ? attr.wfDescendingFirst : wfConfig.sort.descendingFirst;
                        var promise = null;
                        var throttle = attr.wfDelay || wfConfig.sort.delay;

                        if (attr.wfSortDefault) {
                            sortDefault = scope.$eval(attr.wfSortDefault) !== undefined ? scope.$eval(attr.wfSortDefault) : attr.wfSortDefault;
                        }

                        //view --> table state
                        function sort () {
                            if (descendingFirst) {
                                index = index === 0 ? 2 : index - 1;
                            } else {
                                index++;
                            }

                            var func;
                            predicate = ng.isFunction(getter(scope)) || ng.isArray(getter(scope)) ? getter(scope) : attr.wfSort;
                            if (index % 3 === 0 && skipNatural !== true) {
                                //manual reset
                                index = 0;
                                ctrl.tableState().sort = {};
                                ctrl.tableState().pagination.start = 0;
                                func = ctrl.pipe.bind(ctrl);
                            } else {
                                func = ctrl.sortBy.bind(ctrl, predicate, index % 2 === 0);
                            }
                            if (promise !== null) {
                                $timeout.cancel(promise);
                            }
                            if (throttle < 0) {
                                func();
                            } else {
                                promise = $timeout(func, throttle);
                            }
                        }

                        element.bind('click', function sortClick () {
                            if (predicate) {
                                scope.$apply(sort);
                            }
                        });

                        if (sortDefault) {
                            index = sortDefault === 'reverse' ? 1 : 0;
                            sort();
                        }

                        //table state --> view
                        scope.$watch(function () {
                            return ctrl.tableState().sort;
                        }, function (newValue) {
                            if (newValue.predicate !== predicate) {
                                index = 0;
                                element
                                    .removeClass(classAscent)
                                    .removeClass(classDescent);
                            } else {
                                index = newValue.reverse === true ? 2 : 1;
                                element
                                    .removeClass(stateClasses[index % 2])
                                    .addClass(stateClasses[index - 1]);
                            }
                        }, true);
                    }
                };
            }]);

        ng.module('wf.angular.tables').directive('wfIndicator', ['wfConfig', '$parse', function (wfConfig, $parse) {
            return {
                restrict: 'A',
                require: '^wfTable',
                link: function (scope, element, attrs, ctrl) {
                    var safeDataGetter = $parse(attrs.wfIndicator);
                    var originalValue = ng.copy(safeDataGetter(scope));
                    element.addClass("ng-n-hideEle");

                    scope.$watch(function () {
                        return safeDataGetter(scope);
                    }, function (newValue, oldValue) {
                        if (!ng.equals(newValue, originalValue)) {
                            element.removeClass("ng-n-hideEle");
                        } else {
                            if(!element.hasClass("ng-n-hideEle") ) {
                                element.addClass("ng-n-hideEle");
                            }
                        }
                    }, true);
                }

            };
        }]);

        ng.module('wf.angular.tables').directive('wfSummary', ['wfConfig', function (wfConfig) {
            return {
                restrict: 'EA',
                require: '^wfTable',
                templateUrl: function (element, attrs) {
                    if (attrs.wfSummaryTemplate) {
                        return attrs.wfSummaryTemplate;
                    }
                    return wfConfig.summary.template;
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.wfItemsByPage = scope.wfItemsByPage ? +(scope.wfItemsByPage) : wfConfig.pagination.itemsByPage;
                    scope.wfDisplayedPages = scope.wfDisplayedPages ? +(scope.wfDisplayedPages) : wfConfig.pagination.displayedPages;

                    scope.currentPage = 1;
                    scope.pages = [];

                    function redraw () {
                        var paginationState = ctrl.tableState().pagination;
                        var start = 1;
                        var end;
                        var i;
                        var prevPage = scope.currentPage;
                        scope.totalRecords = ctrl.getTotalRecords();
                        scope.totalItemCount = paginationState.totalItemCount;
                        scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;

                        start = Math.max(start, scope.currentPage - Math.abs(Math.floor(scope.wfDisplayedPages / 2)));
                        end = start + scope.wfDisplayedPages;

                        if (end > paginationState.numberOfPages) {
                            end = paginationState.numberOfPages + 1;
                            start = Math.max(1, end - scope.wfDisplayedPages);
                        }

                        scope.pages = [];
                        scope.numPages = paginationState.numberOfPages;

                        for (i = start; i < end; i++) {
                            scope.pages.push(i);
                        }

                        if (prevPage !== scope.currentPage) {
                            scope.wfPageChange({newPage: scope.currentPage});
                        }
                    }

                    //table state --> view
                    scope.$watch(function () {
                        return ctrl.tableState().pagination;
                    }, redraw, true);

                    //scope --> table state  (--> view)
                    scope.$watch('wfItemsByPage', function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            scope.selectPage(1);
                        }
                    });

                    //view -> table state
                    scope.selectPage = function (page) {
                        if (page > 0 && page <= scope.numPages) {
                            ctrl.slice((page - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                        }
                    };

                    if (!ctrl.tableState().pagination.number) {
                        ctrl.slice(0, scope.wfItemsByPage);
                    }
                }
            };
        }]);

        ng.module('wf.angular.tables')
            .directive('wfPagination', ['wfConfig', function (wfConfig) {
                return {
                    restrict: 'EA',
                    require: '^wfTable',
                    scope: {
                        wfItemsByPage: '=?',
                        wfDisplayedPages: '=?',
                        wfPageChange: '&'
                    },
                    templateUrl: function (element, attrs) {
                        if (attrs.wfTemplate) {
                            return attrs.wfTemplate;
                        }
                        return wfConfig.pagination.template;
                    },
                    link: function (scope, element, attrs, ctrl) {

                        scope.wfItemsByPage = scope.wfItemsByPage ? +(scope.wfItemsByPage) : wfConfig.pagination.itemsByPage;
                        scope.wfDisplayedPages = scope.wfDisplayedPages ? +(scope.wfDisplayedPages) : wfConfig.pagination.displayedPages;

                        scope.currentPage = 1;
                        scope.pages = [];

                        function redraw () {
                            var paginationState = ctrl.tableState().pagination;
                            var start = 1;
                            var end;
                            var i;
                            var prevPage = scope.currentPage;
                            scope.totalRecords = ctrl.getTotalRecords();
                            scope.totalItemCount = paginationState.totalItemCount;
                            scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;

                            start = Math.max(start, scope.currentPage - Math.abs(Math.floor(scope.wfDisplayedPages / 2)));
                            end = start + scope.wfDisplayedPages;

                            if (end > paginationState.numberOfPages) {
                                end = paginationState.numberOfPages + 1;
                                start = Math.max(1, end - scope.wfDisplayedPages);
                            }

                            scope.pages = [];
                            scope.numPages = paginationState.numberOfPages;

                            for (i = start; i < end; i++) {
                                scope.pages.push(i);
                            }

                            if (prevPage !== scope.currentPage) {
                                scope.wfPageChange({newPage: scope.currentPage});
                            }
                        }

                        //table state --> view
                        scope.$watch(function () {
                            return ctrl.tableState().pagination;
                        }, redraw, true);

                        //scope --> table state  (--> view)
                        scope.$watch('wfItemsByPage', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.selectPage(1);
                            }
                        });

                        scope.$watch('wfDisplayedPages', redraw);

                        //view -> table state
                        scope.selectPage = function (page) {
                            if (page > 0 && page <= scope.numPages) {
                                ctrl.slice((page - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                            }
                        };

                        scope.goToPage = function (pageNum) {
                            if(pageNum > scope.numPages) {
                                pageNum = scope.numPages;
                            } else if(pageNum <= 0) {
                                pageNum = 1;
                            }
                            scope.currentPage = pageNum;

                            ctrl.slice((pageNum - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                        };

                        scope.nextPage = function (currentPage) {
                            var nextPageNumber = currentPage + 1;
                            if (nextPageNumber > 0 && nextPageNumber <= scope.numPages) {
                                ctrl.slice((nextPageNumber - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                            }
                        };

                        scope.previousPage = function (currentPage) {
                            var previousPageNumber = currentPage - 1;
                            if (previousPageNumber > 0 && previousPageNumber <= scope.numPages) {
                                ctrl.slice((previousPageNumber - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                            }
                        };

                        scope.firstPage = function (currentPage) {
                            var firstPageNumber = 1;
                            if (firstPageNumber > 0 && firstPageNumber <= scope.numPages) {
                                ctrl.slice((firstPageNumber - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                            }
                        };

                        scope.lastPage = function (currentPage) {
                            var lastPageNumber = scope.numPages;
                            if (lastPageNumber > 0 && lastPageNumber <= scope.numPages) {
                                ctrl.slice((lastPageNumber - 1) * scope.wfItemsByPage, scope.wfItemsByPage);
                            }
                        };

                        scope.selectDisplayItemsByPage = function (number) {
                            scope.wfItemsByPage = number;
                        };

                        if (!ctrl.tableState().pagination.number) {
                            ctrl.slice(0, scope.wfItemsByPage);
                        }
                    }
                };
            }]);

        ng.module('wf.angular.tables')
            .directive('wfPipe', ['wfConfig', '$timeout', function (config, $timeout) {
                return {
                    require: 'wfTable',
                    scope: {
                        wfPipe: '='
                    },
                    link: {
                        pre: function (scope, element, attrs, ctrl) {
                            var pipePromise = null;
                            if (ng.isFunction(scope.wfPipe)) {
                                ctrl.preventPipeOnWatch();
                                ctrl.pipe = function () {

                                    if (pipePromise !== null) {
                                        $timeout.cancel(pipePromise);
                                    }

                                    pipePromise = $timeout(function () {
                                        scope.wfPipe(ctrl.tableState(), ctrl);
                                    }, config.pipe.delay);

                                    return pipePromise;
                                };
                            }
                        },

                        post: function (scope, element, attrs, ctrl) {
                            ctrl.pipe();
                        }
                    }
                };
            }]);
    })
);
