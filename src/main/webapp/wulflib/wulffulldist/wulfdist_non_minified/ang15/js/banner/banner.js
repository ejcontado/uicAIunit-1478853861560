/**
 * Created by anwan on 2016/7/13.
 * Angular Version of Banner.
 * ========================================================================
 * © 2016 Nokia. All rights reserved.
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants', '../banner/bannerUtilitySet', '../banner/bannerNavTabs',
            '../banner/bannerActionSet', '../banner/bannerNavTabContent'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants', '../banner/bannerUtilitySet', '../banner/bannerNavTabs',
                '../banner/bannerActionSet', '../banner/bannerNavTabContent'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    function BannerController() {
        var ctrl = this;

        //insert separator "|" between utilitySet to simply input
        var idx, utilitySetInserted = [];
        var utilitySetLength = this.utilitySet.length;
        if (utilitySetLength >= 2) {
            utilitySetInserted[0] = this.utilitySet[0];
            for (idx = 1; idx < utilitySetLength; idx++) {
                utilitySetInserted[2 * idx] = this.utilitySet[idx];
                utilitySetInserted[2 * idx - 1] = {
                    label: "|",
                    cssClass: "hidden-xs",
                    link: "#",
                    menuItems: [],
                    disable: false
                };
            }

            for (idx = 0; idx < utilitySetInserted.length; idx++) {
                this.utilitySet[idx] = utilitySetInserted[idx];
            }
        }

        //overflow handle
        function blueblockDettached(bannersInPage) {
            if (bannersInPage !== null) {
                bannersInPage.attr("data-visual-break", true);
                toggleVisibleBlocksWhenBlueDetached(true);

                //rightmost nav tab need to hide
                var navTabDownRightmostTab = angular.element(document.querySelector('.n-banner-2nd .rightmost-tab'));
                navTabDownRightmostTab.removeClass('rightmost-tab').addClass('rightmost-tab-disabled');

                //transform style for nav links in ActionSet part to hide them into overflow
                var navLinks = angular.element(document.querySelector('.n-banner-2nd .n-banner-links'));
                var navDropdownLinks = angular.element(document.querySelector('.n-banner-2nd .n-banner-dropdown-links'));

                var navDropdownLis = navDropdownLinks.find('li.dropdown');
                var index;
                for (index = 0; index < navDropdownLis.length; index++) {
                    navDropdownLis.eq(index).addClass('n-dropdown-menu-item-has-child');
                }
                var navDropdownUls = navDropdownLinks.find('ul.dropdown-menu');
                for (index = 0; index < navDropdownUls.length; index++) {
                    navDropdownUls.eq(index).addClass('n-dropdown-sub-menu');
                }
                navLinks.removeClass('n-banner-nav n-banner-links').addClass('dropdown-menu n-banner-links-collapse-dropdown-menu');

                //add class for showing dropdown correctly
                var navLinksSubmenus = angular.element(document.querySelectorAll('.n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu'));
                for (index = 0; index < navLinksSubmenus.length; index++) {
                    navLinksSubmenus.eq(index).addClass('n-collapse-dropdown-sub-menu');
                }
            }
        }

        function blueblockAttached(bannersInPage) {
            if (bannersInPage !== null) {
                bannersInPage.attr("data-visual-break", false);
                toggleVisibleBlocksWhenBlueDetached(false);

                //rightmost tab need to hide
                var navTabsRightmostTab = angular.element(document.querySelector('.n-banner-2nd .rightmost-tab-disabled'));
                navTabsRightmostTab.removeClass('rightmost-tab-disabled').addClass('rightmost-tab');

                //transform style for nav links
                var index;
                var navLinks = angular.element(document.querySelector('.n-banner-2nd .n-banner-links-collapse-dropdown-menu'));
                var navDropdownLinks = angular.element(document.querySelector('.n-banner-2nd .n-banner-dropdown-links-collapse-dropdown-menu'));
                for (index = 0; index < navDropdownLinks.length; index++) {
                    var tempNavLink = navDropdownLinks.eq(index);
                    if (tempNavLink.hasClass("dropdown")) {
                        tempNavLink.removeClass('n-dropdown-menu-item-has-child');
                    }
                }

                var navDropdownLis = navDropdownLinks.find('li.dropdown');
                for (index = 0; index < navDropdownLis.length; index++) {
                    navDropdownLis.eq(index).removeClass('n-dropdown-menu-item-has-child');
                }

                var navDropdownUls = navDropdownLinks.find('ul.dropdown-menu');
                for (index = 0; index < navDropdownUls.length; index++) {
                    navDropdownUls.eq(index).removeClass('n-dropdown-sub-menu');
                }

                navLinks.removeClass('dropdown-menu n-banner-links-collapse-dropdown-menu').addClass('n-banner-nav n-banner-links');
                navDropdownLinks.removeClass('dropdown-menu n-banner-dropdown-links-collapse-dropdown-menu')
                    .addClass('nav n-banner-nav n-banner-dropdown-links');

                //remove class
                var navLinksSubmenus = angular.element(
                    document.querySelectorAll('.n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu.n-collapse-dropdown-sub-menu'));
                for (index = 0; index < navLinksSubmenus.length; index++) {
                    navLinksSubmenus.eq(index).removeClass('n-collapse-dropdown-sub-menu');
                }
            }
        }

        function showElements(elements, show) {
            var displayValue;
            if (show) {
                displayValue = 'block';
            } else {
                displayValue = 'none';
            }
            for (var index = 0; index < elements.length; index++) {
                elements.eq(index).css({display: displayValue});
            }
        }

        function toggleVisibleBlocksWhenBlueDetached(detach) {
            var hiddenOnBlueDetach = angular.element(document.querySelectorAll('.hidden-on-blue-detached'));
            var showOnBlueDetach = angular.element(document.querySelectorAll('.show-on-blue-detached'));
            var overflowCover = angular.element(document.querySelectorAll('.overflow-toggle-area-cover'));
            var filterBar = angular.element(document.querySelector('.n-banner-3rd-filler-dark'));
            var index;
            if (detach) {
                showElements(hiddenOnBlueDetach, false);

                //set showOnBlueDetach show.
                for (index = 0; index < showOnBlueDetach.length; index++) {
                    var showElement = showOnBlueDetach.eq(index);
                    if (showElement.hasClass("icon icon-back")) {
                        showElement.css({display: 'inline-block'});
                    } else {
                        showElement.css({display: 'block'});
                    }
                }

                showElements(overflowCover, true);
                showElements(filterBar, false);
            } else {
                //set hiddenOnBlueDetach show
                for (index = 0; index < hiddenOnBlueDetach.length; index++) {
                    var hiddenElement = hiddenOnBlueDetach.eq(index);
                    if (hiddenElement.hasClass("n-banner-2nd-gray-to-blue") || hiddenElement.hasClass("caret")) {
                        hiddenElement.css({display: 'inline-block'});
                    } else {
                        hiddenElement.css({display: 'block'});
                    }
                }

                showElements(showOnBlueDetach, false);
                showElements(overflowCover, false);
                if (filterBar !== null) {
                    var filterbar = angular.element(document.querySelector('.filter-bar'));
                    if (filterbar !== null && filterbar.css("display") !== "none") {
                        showElements(filterBar, true);
                    }
                }
            }
        }

        ctrl.triggerCollapseBanner = function () {
            var bannersInPage = angular.element(document.querySelector('.n-banner'));
            if (bannersInPage.length) {
                //grey part width in the bottom
                var navTabDown = angular.element(document.querySelector('#n-banner-collapse > div.row.n-banner-2nd > wf-banner-nav-tabs > ul'));
                if (navTabDown.length === 0) {
                    return;
                }
                var compensation = 30;
                var bannerToggle = angular.element(document.querySelector('.n-banner-toggle'));
                //blue part offset on the top banner
                var blueToGray = angular.element(document.querySelector('.n-banner-1st-blue-to-gray'));
                var blueToGrayCorner = angular.element(document.querySelector('.n-banner-1st-blue-to-gray .blue-corner'));
                var offsetUpBlue = blueToGray[0].offsetLeft + blueToGrayCorner[0].clientWidth - compensation;
                var offsetDownGray = navTabDown[0].clientWidth;
                var breakPointState = bannersInPage.attr("data-visual-break");
                if (breakPointState === undefined) {
                    if (offsetUpBlue < offsetDownGray) {
                        blueblockDettached(bannersInPage);
                    } else {
                        blueblockAttached(bannersInPage);
                    }
                } else if (breakPointState === "true" && offsetUpBlue > offsetDownGray && typeof bannerToggle !== "undefined") {
                    blueblockAttached(bannersInPage);
                } else if (breakPointState === "false" && offsetUpBlue < offsetDownGray) {
                    blueblockDettached(bannersInPage);
                }
            }
        };
    }

    angular.module('wf.angular.banner', ['wf.angular.constants', 'wf.angular.bannerUtilitySet', 'wf.angular.bannerNavTabs',
            'wf.angular.bannerActionSet', 'wf.angular.bannerNavTabContent'])
        .controller('BannerController', BannerController)
        .component('wfBanner', {
            transclude: true,
            templateUrl: 'wf/ng-template/banner/banner.html',
            bindings: {
                productInfo: '<',
                utilitySet: '<',
                navTabsInfo: '<',
                actionSet: '<',
                overflowOpen: '<'
            },
            controller: BannerController
        })
        .directive('resize', ['$window', '$timeout', function ($window, $timeout) {
            return {
                require: '^^wfBanner',
                link: function (scope, elem, attrs, BannerController) {
                    scope.onResize = function () {
                        if (!BannerController) {
                            return;
                        }
                        BannerController.triggerCollapseBanner();
                    };
                    scope.onResize();

                    angular.element($window).on('resize', function () {
                        $timeout(function () {
                            scope.onResize();
                        }, 0);
                    });
                }
            };
        }])
        .directive('emitNgRepeatLast', function () {
            return function (scope) {
                if (scope.$last) {
                    scope.$emit('LastElem');
                }
            };
        })
        .directive('listenNgRepeatLast', function () {
            return function (scope) {
                scope.$on('LastElem', function () {
                    angular.element(document.querySelector('.n-banner')).css({display: 'block'});
                });
            };
        });
    }
));
