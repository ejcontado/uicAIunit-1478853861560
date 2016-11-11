/**
 * Created by anwan on 16/8/3.
 *  ========================================================================
 * © 2016 Nokia. All rights reserved.
 * ======================================================================== */
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
}(function (angular) {
    'use strict';
    function BannerActionSetController() {
        var self = this;
        var showCollapsedSubMenu = function (parentLi) {
            var siblingUL = findItemByTypeAndKey(parentLi.children(), 'selector', 'n-collapse-dropdown-sub-menu');
            var siblingA = findItemByTypeAndKey(parentLi.children(), 'tagName', 'A');
            if (siblingUL) {
                var subMenuPos = window.getComputedStyle(siblingUL[0], null).getPropertyValue("min-width");
                siblingUL.css({left: "-" + subMenuPos});
            }
            parentLi.addClass("open");
            if (siblingA) {
                siblingA.eq(0).addClass("n-dropdown-sub-menu-parent-active");
            }
        };
        var hideCollapsedSubMenu = function (parentLi) {
            var siblingUL = findItemByTypeAndKey(parentLi.children(), 'selector', 'n-collapse-dropdown-sub-menu');
            var siblingA = findItemByTypeAndKey(parentLi.children(), 'tagName', 'A');
            if (siblingUL) {
                siblingUL.css({left: 'auto'});
            }
            parentLi.removeClass("open");
            if (siblingA) {
                siblingA.eq(0).removeClass("n-dropdown-sub-menu-parent-active");
            }
        };

        var findItemByTypeAndKey = function (elementsArray, type, key) {
            var index, tempElement, arrayLength = elementsArray.length;
            if (type === 'selector') {
                for (index = 0; index < arrayLength; index++) {
                    tempElement = elementsArray.eq(index);
                    if (tempElement.hasClass(key)) {
                        return tempElement;
                    }
                }
            } else if (type === 'tagName') {
                for (index = 0; index < arrayLength; index++) {
                    tempElement = elementsArray.eq(index);
                    if (tempElement[0].tagName === key) {
                        return tempElement;
                    }
                }
            }
        };

        self.mouseover = function (evt) {
            var target = angular.element(evt.target);//target  is span
            if (target.parent().parent().parent().hasClass('dropdown') && target.parent().parent().parent().parent().hasClass('n-banner-links-collapse-dropdown-menu')) {
                showCollapsedSubMenu(target.parent().parent().parent());
            } else if (target.parent().hasClass('dropdown') && target.parent().parent().hasClass('n-banner-links-collapse-dropdown-menu')) {
                showCollapsedSubMenu(target.parent());
            }
        };

        self.mouseleave = function (evt) {
            var target = angular.element(evt.target);//target is li.
            if (target.parent().parent().parent().hasClass('dropdown') && target.parent().parent().parent().parent().hasClass('n-banner-links-collapse-dropdown-menu')) {
                hideCollapsedSubMenu(target.parent().parent().parent());
            } else if (target.parent().hasClass('dropdown') && target.parent().parent().hasClass('n-banner-links-collapse-dropdown-menu')) {
                hideCollapsedSubMenu(target.parent());
            }
        };
    }

    BannerActionSetController.$inject = ['WF-KEYCODE-CONST'];

    angular.module('wf.angular.bannerActionSet', ['wf.angular.constants'])
        .controller('BannerActionSetController', BannerActionSetController)
        .component('wfBannerActionSet', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/bannerActionSet.html',
            bindings: {
                actionSet: '<',
                overflowOpen: '<'
            },
            controller: BannerActionSetController
        })
        .directive('wfOverflowMouseEvent', function () {
            return {
                restrict: 'A',
                controller: 'BannerActionSetController',
                link: function (scope, element, attrs, BannerActionSetController) {
                    element.on('mouseover', function (evt) {
                        BannerActionSetController.mouseover(evt);
                    });
                    element.on('mouseleave', function (evt) {
                        BannerActionSetController.mouseleave(evt);
                    });
                }
            };
        });
    }
));
