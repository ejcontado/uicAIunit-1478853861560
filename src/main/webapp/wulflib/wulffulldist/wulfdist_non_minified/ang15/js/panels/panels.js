/**
 * Created by Shawn on 5/18/2016.
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants', '../scroll/wfscrollbar'], factory);
    } else if (typeof module === 'object' && module.exports) {
        //TODO Jonathan, is the root needed for angular?  Will check it later.
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants'), require('../scroll/wfscrollbar'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

        'use strict';

        /**
        * @return {string}
        */
        function TemplateUrlFunc(elem, attrs) {
            if (attrs.slideDirection === "horizontal") {
                return 'wf/ng-template/panels/panels-horizontal.html';
            }else {
                return 'wf/ng-template/panels/panels-vertical.html';
            }
        }
        TemplateUrlFunc.$inject = ['$element', '$attrs'];

        var PanelsController = function (keyCodeConst, $timeout, $animate, $elem, $attrs) {
            var container, arrowStartDir, arrowEndDir;
            this.isShow = false;
            if (this.slideAnimation){
                this.index = 0;
            }
            this.show = function (event) {
                if ($attrs.slideDirection === "horizontal") {
                    arrowStartDir = "icon-left";
                    arrowEndDir = "icon-right";
                    container = angular.element($elem[0].querySelector('.panel.panel-blue-cap'));
                }else {
                    arrowStartDir = "icon-down";
                    arrowEndDir = "icon-right";
                    container = angular.element($elem[0].querySelector('.panel-body'));
                }
                if (this.slideAnimation) {
                    if (this.isShow) {
                        $animate.removeClass(container, 'panel-animation').then(function() {
                            angular.element($elem[0].querySelector('.panel-arrow .icon'))
                                .removeClass(arrowEndDir).addClass(arrowStartDir);
                            angular.element($elem[0].querySelector('.panel-container'))
                                .addClass('panel-shadow');
                        });
                        this.isShow = false;
                    } else {
                        angular.element($elem[0].querySelector('.panel-container'))
                            .removeClass('panel-shadow');
                        $animate.addClass(container, 'panel-animation').then(function() {
                            angular.element($elem[0].querySelector('.panel-arrow .icon'))
                                .removeClass(arrowStartDir).addClass(arrowEndDir);
                        });
                        this.isShow = true;
                    }
                }
                if (this.onToggle() && typeof(this.onToggle) === 'function') {
                    this.onToggle()(this.isShow, this.header, event);
                }
            };
            this.showKeydown = function (evt) {
                var keyCode = evt.which;
                if (keyCode === keyCodeConst.SPACE || keyCode === keyCodeConst.ENTER) {
                    this.show();
                    evt.preventDefault();
                }
            };
        };
        PanelsController.$inject = ['WF-KEYCODE-CONST', '$timeout', '$animate','$element','$attrs'];
        angular.module('wf.angular.panels', ['wf.angular.constants','ngAnimate','wf.angular.scrollbar'])
            .component('wfPanels', {
                transclude: {
                    'header': '?wfPanelHeader',
                    'body': 'wfPanelSection'
                },
                templateUrl: TemplateUrlFunc,
                bindings: {
                    header: '@',
                    slideAnimation: '<',
                    slideDirection: '<',
                    onToggle: '&',
                    scrollbar: '<'
                },
                controller: PanelsController
            })
            .component('wfPanelSection', {
                transclude: true,
                templateUrl: 'wf/ng-template/panels/panels-section.html'
            });
    }
));