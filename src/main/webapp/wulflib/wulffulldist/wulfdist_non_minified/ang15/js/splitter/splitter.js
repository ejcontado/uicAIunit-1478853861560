/**
 * Created by Charles on 10/26/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular);
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
        'use strict';
        var splitterController = function ($element) {
            var ctrl = this;
            var splitterContainer = $element.children();
            var orientation = ctrl.orientation || 'vertical';
            if (orientation === 'horizontal'){
                splitterContainer.addClass('horizontal');
            } else if (orientation === 'vertical'){
                splitterContainer.addClass('vertical');
            }
            splitterContainer.css(ctrl.splitterStyle);
        };
        var splitController = function ($element) {
            var ctrl = this;
            var orientation;
            var splitEle = $element;
            var splitPane = splitEle.children();
            var left = 0;
            var top = 0;

            /**
             * Calculate left offset
             */
            var calcLeft = function (ele) {
                var preEle = ele[0].previousElementSibling;
                if (preEle){
                    preEle = angular.element(preEle);
                    left = left + preEle.children()[0].offsetWidth;
                    calcLeft(preEle);
                }
            };
            /**
             * Calculate top offset
             */
            var calcTop = function (ele) {
                var preEle = ele[0].previousElementSibling;
                if (preEle){
                    preEle = angular.element(preEle);
                    top = top + preEle.children()[0].offsetHeight;
                    calcLeft(preEle);
                }
            };
            /**
             * Add resize handler if needed
             */
            var addVerticalHandler = function (ele) {
                if (ele[0].nextElementSibling){
                    var handler = angular.element('<div class="split-handler vertical"></div>');
                    var paneWidth = splitPane[0].offsetWidth;
                    handler.css('left',left + paneWidth - 4 + 'px');
                    splitPane.after(handler);
                }
            };
            var addHorizontalHandler = function (ele) {
                if (ele[0].nextElementSibling){
                    var handler = angular.element('<div class="split-handler horizontal"></div>');
                    var paneHeight = splitPane[0].offsetHeight;
                    handler.css('top',top + paneHeight - 4 + 'px');
                    splitPane.after(handler);
                }
            };
            /**
             * Handle different unit size
             */
            var calcSize = function (size) {
                if (/^\d.*px$/.test(size)){
                    size = parseInt(size);
                } else if (/^\d.*%$/.test(size)) {
                    if (orientation === 'vertical') {
                        size = parseInt(size) * 0.01 * splitEle.parent()[0].clientWidth;
                    } else if (orientation === 'horizontal') {
                        size = parseInt(size) * 0.01 * splitEle.parent()[0].clientHeight;
                    }
                }
                return size;
            };

            /**
             * Get splitter orientation
             */
            orientation = splitEle.parent().parent().attr('orientation') || 'vertical';
            ctrl.$onInit = function() {
                ctrl.onDrag = ctrl.splitterCtrl.onDrag;
            };
            /**
             * Handle split pane style
             */
            if (orientation === 'vertical'){
                splitPane.css('width', calcSize(ctrl.initSize) + 'px');
                splitPane.css('height', '100%');
                calcLeft(splitEle);
                splitPane.css('left', left + 'px');
                addVerticalHandler(splitEle);
            } else if (orientation === 'horizontal'){
                splitPane.css('height', calcSize(ctrl.initSize) + 'px');
                splitPane.css('width', '100%');
                calcTop(splitEle);
                splitPane.css('top', top + 'px');
                addHorizontalHandler(splitEle);
            }

            /**
             * Split vertical Handler mouse event
             */
            var handlerEle = splitEle[0].querySelector('div.split-handler');
            var activeDrag = function(bar, cloneHandler, orientation) {
                var flag = false;
                var currentOffset = 0;
                var handlerOffset;
                var changedOffset;
                bar.onmousedown = function (event) {
                    event.preventDefault();
                    cloneHandler[0].style.opacity = 1;
                    if (orientation === 'vertical'){
                        handlerOffset = handlerEle.style.left;
                        currentOffset = event.clientX;
                    } else if (orientation === 'horizontal'){
                        handlerOffset = handlerEle.style.top;
                        currentOffset = event.clientY;
                    }
                    flag = true;
                };
                splitEle[0].parentElement.onmousemove = function(event) {
                    var e = event ? event : window.event;
                    if (flag){
                        var maxOffset;
                        var minOffset = calcSize(ctrl.minSize) - 4 || 0;
                        var nextSplit = splitPane[0].parentElement.nextElementSibling;
                        handlerEle.style.opacity = 0.7;
                        if (orientation === 'vertical'){
                            changedOffset = parseInt(handlerOffset) + e.clientX - currentOffset;
                            if (nextSplit.getAttribute('min-size')){
                                maxOffset = parseInt(splitEle.parent().css('width')) - calcSize(nextSplit.getAttribute('min-size')) - 4;
                            } else{
                                maxOffset = parseInt(splitEle.parent().css('width')) - 10;
                            }
                            if (changedOffset < minOffset){
                                changedOffset = minOffset;
                            } else if (changedOffset > maxOffset){
                                changedOffset = maxOffset;
                            }
                            bar.style.left = changedOffset + 'px';
                        } else if (orientation === 'horizontal'){
                            changedOffset = parseInt(handlerOffset) + e.clientY - currentOffset;
                            if (nextSplit.getAttribute('min-size')){
                                maxOffset = parseInt(splitEle.parent().css('height')) - calcSize(nextSplit.getAttribute('min-size')) - 4;
                            } else{
                                maxOffset = parseInt(splitEle.parent().css('height')) - 10;
                            }
                            if (changedOffset < minOffset){
                                changedOffset = minOffset;
                            } else if (changedOffset > maxOffset){
                                changedOffset = maxOffset;
                            }
                            bar.style.top = changedOffset + 'px';
                        }

                        document.onmouseup = function(event) {
                            if (flag){
                                var nextPane = splitPane[0].parentElement.nextElementSibling.firstChild;
                                handlerEle.style.opacity = 1;
                                cloneHandler[0].style.opacity = 0;
                                if (orientation === 'vertical'){
                                    splitPane.css('width', changedOffset + 4 + 'px');
                                    nextPane.style.left = changedOffset + 4 + 'px';
                                    cloneHandler[0].style.left = changedOffset + 'px';
                                    nextPane.style.width = parseInt(splitEle.parent().css('width')) - (changedOffset + 4) + 'px';
                                } else if (orientation === 'horizontal'){
                                    splitPane.css('height', changedOffset + 4 + 'px');
                                    nextPane.style.top = changedOffset + 4 + 'px';
                                    cloneHandler[0].style.top = changedOffset + 'px';
                                    nextPane.style.height = parseInt(splitEle.parent().css('height')) - (changedOffset + 4) + 'px';
                                }
                                if (ctrl.onDrag() && typeof(ctrl.onDrag) === "function") {
                                    ctrl.onDrag()(splitPane[0], nextPane, event);
                                }
                            }
                            flag = false;
                        };
                    }
                };

            };
            if (handlerEle) {
                var cloneHandler = angular.element(handlerEle).clone();
                cloneHandler.css('z-index',0);
                splitEle.append(cloneHandler);
                activeDrag(handlerEle, cloneHandler, orientation);
            }

        };

        splitterController.$inject = ['$element'];
        splitController.$inject = ['$element'];
        angular.module('wf.angular.splitter',[])
            .component('wfSplitter', {
                templateUrl: 'wf/ng-template/splitter/splitter.html',
                transclude: true,
                bindings: {
                    splitterStyle: '<',
                    orientation: '@',
                    onDrag: '&'
                },
                controller: splitterController
            })
            .component('wfSplit', {
                template: '<div class="split-pane" ng-transclude></div>',
                transclude: true,
                require: {
                    splitterCtrl: '^^wfSplitter'
                },
                bindings: {
                    initSize: '@',
                    minSize: '@'
                },
                controller: splitController
            });
    }
));
