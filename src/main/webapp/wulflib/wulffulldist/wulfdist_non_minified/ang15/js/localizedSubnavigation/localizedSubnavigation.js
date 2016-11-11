/**
 * Created by Jonathan on 5/18/2016;
 * Angular version of tabs component;
 * ========================================================================
 * Copyright (C) 2016 Nokia Solutions and Networks. All rights Reserved.
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
        var NavigationController = function () {

            var self = this;
            var tabs = this.tabs;
            var selectedItem = 0;
            
            tabs[0].selectedContent = true;
            tabs[0].selected = "selected";

            self.select = function (index) {
                tabs[selectedItem].selected = "";
                tabs[selectedItem].selectedContent = false;
                tabs[index].selected = "selected";
                tabs[index].selectedContent = true;
                selectedItem = index;
            };
            self.ulClass = "";
            self.caretClass = "";
            if(self.type ==="arrows"){
                this.ulClass = "nav-local-menu-divided";
                this.caretClass = "icon icon-arrow";
            }

        };
        angular.module('wf.angular.localizedSubnavigation', ['wf.angular.constants'])
            .component('wfSubnav', {
                transclude: true,
                templateUrl: 'wf/ng-template/localizedSubnavigation/localizedSubnavigation.html',
                bindings: {
                    type: '<',
                    navTitle: '<',
                    tabs: '<'
                },
                controller: NavigationController
            });
    }
));
