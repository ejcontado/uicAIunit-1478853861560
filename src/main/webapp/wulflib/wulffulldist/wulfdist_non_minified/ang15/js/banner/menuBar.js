/**
 * Created by anwan on 2016/8/26.
 * Angular Version of menuBar.
 *  ========================================================================
 * © 2016 Nokia. All rights reserved..
 * ======================================================================== */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', '../const/constants', '../banner/position'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');
                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular, require('../const/constants', '../banner/position'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {
    'use strict';
    angular.module('wf.angular.menuBar', ['wf.angular.constants', 'wf.angular.position'])
        .constant('wfMenuBarConfig', {
            appendToOpenClass: 'wf-dropdown-open',
            openClass: 'open'
        })
        .service('wfMenuBarService', ['WF-KEYCODE-CONST', '$document', '$rootScope',
            function (keyCodeConst, $document, $rootScope) {
                var openScope = null;

                this.open = function (dropdownScope) {
                    if (!openScope) {
                        $document.on('click', closeDropdown);
                    }

                    if (openScope && openScope !== dropdownScope) {
                        openScope.isOpen = false;
                    }

                    openScope = dropdownScope;
                };

                var closeDropdown = function (evt) {
                    if (!openScope) {
                        return;
                    }

                    if (evt && openScope.getAutoClose() === 'disabled') {
                        return;
                    }

                    if (evt && evt.keyCode === 3) {
                        return;
                    }

                    var toggleElement = openScope.getToggleElement();
                    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
                        return;
                    }

                    var dropdownElement = openScope.getDropdownElement();
                    if (evt && openScope.getAutoClose() === 'outsideClick' &&
                        dropdownElement && dropdownElement[0].contains(evt.target)) {
                        return;
                    }

                    openScope.isOpen = false;
                    openScope.focusToggleElement();

                    if (!$rootScope.$$phase) {
                        if (openScope !== null) {
                            openScope.$apply();
                        }
                    }
                };

                this.close = function (dropdownScope) {
                    if (openScope === dropdownScope) {
                        openScope = null;
                        $document.off('click', closeDropdown);
                    }
                };
            }])
        .controller('MenuBarController', ['WF-KEYCODE-CONST', '$timeout', '$scope', '$element', '$attrs', '$parse',
            'wfMenuBarConfig', 'wfMenuBarService', '$animate', '$wfPosition', '$document', '$compile', '$templateRequest',
            function (keyCodeConst, $timeout, $scope, $element, $attrs, $parse,
                      dropdownConfig, wfMenuBarService, $animate, $position, $document, $compile, $templateRequest) {
                var self = this,
                    scope = $scope.$new(),
                    templateScope,
                    appendToOpenClass = dropdownConfig.appendToOpenClass,
                    openClass = dropdownConfig.openClass,
                    getIsOpen,
                    setIsOpen = angular.noop,
                    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
                    appendToBody = false,
                    appendTo = null,
                    body = $document.find('body');
                this.$element = $element;

                $element.addClass('dropdown');

                //keyboard and mouse event support.
                var hideSubMenu = function (subMenu) {
                    subMenu.css("left", "auto");
                    subMenu.removeClass("open");
                    var siblingsA = subMenu.parent().find('a').eq(0);
                    siblingsA.removeClass("n-dropdown-sub-menu-parent-active");
                };

                var showSubMenu = function (targetParent) {
                    var parentMenuWidth = targetParent.parent()[0].clientWidth;
                    var targetChildren = targetParent.children();
                    var selectorType = {
                        selector: 'n-dropdown-sub-menu',
                    };
                    var tagType = {
                        tagName: 'A',
                    };
                    var targetSubmenu = targetChildren.eq(findItemIdxByType(targetChildren, selectorType));
                    var targetA = targetChildren.eq(findItemIdxByType(targetChildren, tagType));

                    if (parentMenuWidth < (angular.element(document.querySelector('.n-banner'))[0].clientWidth - targetParent[0].getBoundingClientRect().left)) {
                        targetSubmenu.css({left: parentMenuWidth + "px"});
                    } else {
                        targetSubmenu.css({left: "-" + targetSubmenu.clientWidth + "px"});
                    }

                    //hide submenu firstly
                    var siblingsLi = targetParent.parent().children();
                    for (var index = 0; index < siblingsLi.length; index++) {
                        var tempLi = siblingsLi.eq(index);
                        if (tempLi.hasClass('n-dropdown-menu-item-has-child')) {
                            var tempLiChildren = tempLi.children();
                            if (tempLiChildren.length) {
                                for (var index2 = 0; index2 < tempLiChildren.length; index2++) {
                                    var tempUL = tempLiChildren.eq(index2);
                                    if (tempUL.hasClass('n-dropdown-sub-menu open')) {
                                        hideSubMenu(tempUL);
                                    }
                                }
                            }
                        }
                    }
                    //open it
                    targetSubmenu.addClass("open");
                    //add a active.
                    targetA.addClass("n-dropdown-sub-menu-parent-active");
                };

                var keyboardShowSubMenu = function (evt) {
                    var target = angular.element(evt.target);//target is a,
                    if (target.parent().hasClass('n-dropdown-menu-item-has-child')) {//li
                        var siblingUL = target.parent().children().eq(1);
                        if (siblingUL && (!siblingUL.hasClass("open")) && siblingUL.hasClass('n-dropdown-sub-menu')) {
                            showSubMenu(target.parent());
                            var subMenuLi = siblingUL.children();
                            var targetFocus = subMenuLi[0].firstElementChild;
                            targetFocus.focus();
                        }
                    }
                };

                var keyboardHideSubMenu = function (evt) {
                    var topparent = angular.element(evt.target).parent().parent();
                    if (topparent.parent().hasClass('n-dropdown-menu-item-has-child')) {
                        evt.stopPropagation();
                        hideSubMenu(topparent);
                        if (topparent.parent().hasClass("open")) {
                            topparent.parent().removeClass('open');
                        }
                        var topsiblings = topparent.parent().children();
                        if (topsiblings.length) {
                            topsiblings.eq(0).removeClass('n-dropdown-sub-menu-parent-active');
                            topsiblings[0].focus();
                        }
                    }
                };

                var setSubMenuItemFocus = function (evt, isUpMove) {
                    var item = angular.element(evt.target);
                    var currIdx, nextIdx, siblingsLi;
                    if ((item.parent().hasClass('dropdown') ) && (item.parent().parent().hasClass('dropdown-menu') || item.parent().parent().hasClass('n-dropdown-sub-menu'))) {
                        evt.stopPropagation();
                        siblingsLi = item.parent().parent().children();
                        var innerText = item[0].innerText.replace(/[\r\n]/g, "");
                        var innertextType = {
                            innerText: innerText
                        };
                        currIdx = findItemIdxByType(siblingsLi, innertextType);

                        if (currIdx !== null) {
                            if (isUpMove) {
                                nextIdx = currIdx >= 1 ? (currIdx - 1) : 0;
                            } else {
                                nextIdx = currIdx < (siblingsLi.length - 1) ? (currIdx + 1) : (siblingsLi.length - 1);
                            }
                        }

                        if (nextIdx !== null) {
                            if (siblingsLi[currIdx].firstElementChild.tagName === "A") {
                                siblingsLi.eq(currIdx).children().eq(0).removeClass('n-dropdown-sub-menu-parent-active');
                            }
                            var targetFocus = siblingsLi[nextIdx].firstElementChild;
                            targetFocus.focus();
                        }
                    }
                };

                var showMenuItems = function (currentItem) {
                    if (currentItem.hasClass('n-banner-dropdown-toggle')) {
                        currentItem.parent().addClass('open');
                        currentItem.attr("aria-expanded", "true");
                    }
                };

                var findItemIdxByType = function (elementsArray, type) {
                    var index, tempElement, arrayLength = elementsArray.length;
                    if (type.selector) {
                        for (index = 0; index < arrayLength; index++) {
                            tempElement = elementsArray.eq(index);
                            if (tempElement.hasClass(type.selector)) {
                                return index;
                            }
                        }
                    } else if (type.tagName) {
                        for (index = 0; index < arrayLength; index++) {
                            tempElement = elementsArray.eq(index);
                            if (tempElement[0].nodeName === type.tagName) {
                                return index;
                            }
                        }
                    } else if (type.innerText) {
                        var searchLength = type.innerText.length;
                        for (index = 0; index < elementsArray.length; index++) {
                            var tempText = elementsArray[index].innerText.substr(0, searchLength);
                            tempText = tempText.replace(/[\r\n]/g, "");
                            if (tempText === type.innerText) {
                                return index;
                            }
                        }
                    }
                };

                //key event to move focus of sub menu item
                this.handleKeyDown = function (evt) {
                    var target = angular.element(evt.target);
                    switch (evt.keyCode) {
                        case keyCodeConst.SPACE:
                        case keyCodeConst.ENTER:
                            evt.preventDefault();
                            evt.stopPropagation();
                            showMenuItems(target);
                            evt.preventDefault();
                            keyboardShowSubMenu(evt);
                            break;
                        case keyCodeConst.UP:
                            setSubMenuItemFocus(evt, true);
                            evt.preventDefault();
                            break;
                        case keyCodeConst.DOWN:
                            setSubMenuItemFocus(evt, false);
                            evt.preventDefault();
                            break;
                        case keyCodeConst.LEFT:
                            keyboardHideSubMenu(evt);
                            break;
                        case  keyCodeConst.RIGHT:
                            keyboardShowSubMenu(evt);
                            break;
                        default:
                            return;
                    }
                };

                angular.bind(this, this.handleKeyDown);

                //mouse over/leave event
                this.mouseOver = function (evt) {
                    var target = angular.element(evt.target);//target is in a, target.parent() is li.
                    if (target.parent().hasClass('n-dropdown-menu-item-has-child')) {
                        showSubMenu(target.parent());
                    }
                };

                this.mouseLeave = function (evt) {
                    var target = angular.element(evt.target);//target is in a, target.parent() is li.
                    var parent = target.parent();
                    if (parent.hasClass('n-dropdown-menu-item-has-child')) {
                        var selectorType = {
                            selector: 'n-dropdown-sub-menu'
                        };
                        var hideTarget = parent.children().eq(findItemIdxByType(parent.children(), selectorType));
                        hideSubMenu(hideTarget);
                    }
                };

                this.init = function () {
                    var $element = this.$element;
                    $element.on("keydown", this.handleKeyDown);

                    if ($attrs.isOpen) {
                        getIsOpen = $parse($attrs.isOpen);
                        setIsOpen = getIsOpen.assign;

                        $scope.$watch(getIsOpen, function (value) {
                            scope.isOpen = !!value;
                        });
                    }

                    if (angular.isDefined($attrs.dropdownAppendTo)) {
                        var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
                        if (appendToEl) {
                            appendTo = angular.element(appendToEl);
                        }
                    }

                    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);

                    if (appendToBody && !appendTo) {
                        appendTo = body;
                    }

                    if (appendTo && self.dropdownMenu) {
                        appendTo.append(self.dropdownMenu);
                        $element.on('$destroy', function handleDestroyEvent() {
                            self.dropdownMenu.remove();
                        });
                    }
                };

                this.toggle = function (open) {
                    scope.isOpen = arguments.length ? !!open : !scope.isOpen;
                    if (angular.isFunction(setIsOpen)) {
                        setIsOpen(scope, scope.isOpen);
                    }

                    return scope.isOpen;
                };

                // Allow other directives to watch status
                this.isOpen = function () {
                    return scope.isOpen;
                };

                scope.getToggleElement = function () {
                    return self.toggleElement;
                };

                scope.getAutoClose = function () {
                    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
                };

                scope.getElement = function () {
                    return $element;
                };

                scope.getDropdownElement = function () {
                    return self.dropdownMenu;
                };

                scope.focusToggleElement = function () {
                    if (self.toggleElement) {
                        self.toggleElement[0].focus();
                    }
                };

                scope.$watch('isOpen', function (isOpen, wasOpen) {
                    if (appendTo && self.dropdownMenu) {
                        var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
                            css,
                            rightalign,
                            scrollbarPadding,
                            scrollbarWidth = 0;

                        css = {
                            top: pos.top + 'px',
                            display: isOpen ? 'block' : 'none'
                        };

                        rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
                        if (!rightalign) {
                            css.left = pos.left + 'px';
                            css.right = 'auto';
                        } else {
                            css.left = 'auto';
                            scrollbarPadding = $position.scrollbarPadding(appendTo);

                            if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
                                scrollbarWidth = scrollbarPadding.scrollbarWidth;
                            }

                            css.right = window.innerWidth - scrollbarWidth -
                                (pos.left + $element.prop('offsetWidth')) + 'px';
                        }

                        // Need to adjust our positioning to be relative to the appendTo container
                        // if it's not the body element
                        if (!appendToBody) {
                            var appendOffset = $position.offset(appendTo);

                            css.top = pos.top - appendOffset.top + 'px';

                            if (!rightalign) {
                                css.left = pos.left - appendOffset.left + 'px';
                            } else {
                                css.right = window.innerWidth -
                                    (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                            }
                        }

                        self.dropdownMenu.css(css);
                    }

                    var openContainer = appendTo ? appendTo : $element;
                    var hasOpenClass = openContainer.hasClass(appendTo ? appendToOpenClass : openClass);

                    if (hasOpenClass !== isOpen) {
                        $animate[isOpen ? 'addClass' : 'removeClass'](openContainer, appendTo ? appendToOpenClass : openClass).then(function () {
                            if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
                                toggleInvoker($scope, {open: !!isOpen});
                            }
                        });
                    }

                    if (isOpen) {
                        if (self.dropdownMenuTemplateUrl) {
                            $templateRequest(self.dropdownMenuTemplateUrl).then(function (tplContent) {
                                templateScope = scope.$new();
                                $compile(tplContent.trim())(templateScope, function (dropdownElement) {
                                    var newEl = dropdownElement;
                                    self.dropdownMenu.replaceWith(newEl);
                                    self.dropdownMenu = newEl;
                                });
                            });
                        }

                        scope.focusToggleElement();
                        wfMenuBarService.open(scope, $element);
                    } else {
                        wfMenuBarService.close(scope, $element);
                        if (self.dropdownMenuTemplateUrl) {
                            if (templateScope) {
                                templateScope.$destroy();
                            }
                            var newEl = angular.element('<ul class="dropdown-menu"></ul>');
                            self.dropdownMenu.replaceWith(newEl);
                            self.dropdownMenu = newEl;
                        }

                        self.selectedOption = null;
                    }

                    if (angular.isFunction(setIsOpen)) {
                        setIsOpen($scope, isOpen);
                    }
                });
            }])
        .directive('wfMenuBarDropdown', function () {
            return {
                controller: 'MenuBarController',
                link: function (scope, element, attrs, MenuBarController) {
                    MenuBarController.init();
                }
            };
        })
        .directive('wfMenuBarDropdownToggle', function () {
            return {
                require: '?^wfMenuBarDropdown',
                link: function (scope, element, attrs, MenuBarController) {
                    if (!MenuBarController) {
                        return;
                    }

                    MenuBarController.toggleElement = element;

                    var toggleDropdown = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!element.hasClass('disabled') && !attrs.disabled) {
                            scope.$apply(function () {
                                MenuBarController.toggle();
                            });
                        }
                    };

                    element.bind('click', toggleDropdown);

                    // WAI-ARIA
                    element.attr({'aria-haspopup': true, 'aria-expanded': false});
                    scope.$watch(MenuBarController.isOpen, function (isOpen) {
                        element.attr('aria-expanded', !!isOpen);
                    });

                    scope.$on('$destroy', function () {
                        element.unbind('click', toggleDropdown);
                    });
                }
            };
        })
        .directive('wfMenuBar', function () {
            return {
                restrict: 'E',
                controller: 'MenuBarController',
                replace: true,
                scope: {
                    menuBar: '='
                },
                templateUrl: 'wf/ng-template/banner/menuBar.html'
            };
        })
        .directive('wfMenuBarInsert', function () {
            return {
                restrict: 'E',
                controller: 'MenuBarController',
                replace: true,
                scope: {
                    menuBar: '='
                },
                templateUrl: 'wf/ng-template/banner/menuBar-Insert.html'
            };
        })
        .directive('wfMenuItem', ['$compile', function ($compile) {
            return {
                restrict: 'E',
                controller: 'MenuBarController',
                replace: true,
                scope: {
                    menuItem: '='
                },
                templateUrl: 'wf/ng-template/banner/menuBarItem.html',
                link: function (scope, element, attrs, MenuBarController) {
                    if (!MenuBarController) {
                        return;
                    }
                    if (angular.isArray(scope.menuItem.children)) {
                        element.append('<wf-menu-bar-insert  menu-bar=\"menuItem.children\" ></wf-menu-bar-insert>');

                        element.on('mouseleave', function (event) {
                            MenuBarController.mouseLeave(event);
                        });

                        element.on('mouseover', function (event) {
                            MenuBarController.mouseOver(event);
                        });

                        // find the parent of the element
                        var parent = element.parent();
                        var classFound = false;

                        // check if in the hierarchy of the element exists a dropdown with class navbar-right
                        while (parent.length > 0 && !classFound) {
                            // check if the dropdown has been push to right
                            if (parent.hasClass('navbar-right')) {
                                classFound = true;
                            }
                            parent = parent.parent();
                        }

                        // add a different class according to the position of the dropdown
                        if (classFound) {
                            element.addClass('dropdown-submenu-right');
                        }

                        $compile(element.contents())(scope);
                    }
                }
            };
        }]);
    }
));