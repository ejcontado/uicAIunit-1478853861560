(function(factory) {
        if (typeof define === 'function' && define.amd) {
            define(['angular', '../const/constants'], factory);
        }
        else if (typeof module === 'object' && module.exports) {
            module.exports = function(root, angular) {
                if (angular === undefined) {
                    if (typeof window !== 'undefined') {
                        angular = require('angular');
                    }
                    else {
                        angular = require('angular')(root);
                    }
                }
                factory(angular, require('../const/constants'));
                return angular;
            };
        }
        else {
            factory(angular);
        }
    }(function(angular) {
        var flyoutActivityController = function(){
            var self = this;
            var tabsContainer;
            var areas = self.areas = [];
            var tabs = self.tabs = [];
            if (!self.direction) {
                //set direction to right if it is unset
                self.direction = "right";
            }

            switch (self.direction) {
                case 'left':
                    self.right = 0;
                    break;
                case 'right':
                    self.left = 0;
                    break;
            }

            this.getDirection = function(){
                return self.direction;
            };

            this.getAllAreas = function(){
                return areas;
            };

            this.getAllTabs = function(){
                return tabs;
            };

            this.addAreas = function (area) {
                areas.push(area);
            };

            this.addTabs = function (tab) {
                tabs.push(tab);
            };


            this.removeArea = function (area) {
                var index = findAreaIndex(area);
                if (index !== null) {
                    areas.splice(index, 1);
                }
            };

            this.removeTab = function (tab) {
                var index = findTabIndex(tab);
                if (index !== null) {
                    tabs.splice(index, 1);
                }
            };
        };

        var findAreaIndex = function (areas,area) {
            var index = null;
            var areasLen = areas.length;
            for (var idx = 0; idx < areasLen; idx++) {
                if (areas[idx] === area) {
                    index = idx;
                }
            }
            return index;
        };

        var findTabIndex = function (tabs,tab) {
            var index = null;
            var tabsLen = tabs.length;
            for (var idx = 0; idx < tabsLen; idx++) {
                if (tabs[idx] === tab) {
                    index = idx;
                }
            }
            return index;
        };

        var flyoutActivityAreaController = function(){
            var self = this;
            this.$onInit = function () {
                self.show = false;
                self.parent.addAreas(self);
                self.width = parseInt(self.parent.width);
                self.height = parseInt(self.parent.height);
                self.direction = self.parent.direction;
            };
            this.$onDestroy = function () {
                self.parent.removeArea(self);
            };
        };

        var flyoutTabsContainerController = function($attrs,$element){
            var self = this;
            this.$onInit = function () {
                self.parent.tabsContainer = self;
                if(self.parent.direction === "right"){
                    self.left =  0;
                    self.top =  0;
                }else if(self.parent.direction === "left"){
                    self.right =  0;
                    self.top =  0;
                }
            };
        };

        var flyoutTabController = function($element,keyCodeConst){
            var self = this;
            this.$onInit = function () {
                //init top to 0
                self.top = 0;
                self.parent.addTabs(self);
                self.direction = self.parent.direction;
                var tabs = self.parent.getAllTabs();
                var length = tabs.length;
                if(length > 1) {
                    tabs[length - 1].top = tabs[length - 2].top + $element.children()[0].offsetHeight * 2/3;
                }
            };

            var isVisible = function(element){
                for(var i=0;i< element.length; i++){
                    if(element[i].show){
                        return true;
                    }
                }
            };
            var showAll = function(element) {
                for(var i=0;i<element.length; i++){
                    element[i].show = true;
                }
            };

            var hideAll = function(element) {
                for(var i=0;i<element.length; i++){
                    element[i].show = false;
                }
            };

            var hideFlyout = function(areas,self){
                switch (self.direction) {
                    case 'left':
                        hideAll(areas);
                        self.parent.tabsContainer.right = 0;
                        break;
                    case 'right':
                        hideAll(areas);
                        self.parent.tabsContainer.left = 0;
                        break;
                }
            };
            var showFlyout = function(areas,self){
                switch (self.direction) {
                    case 'left':
                        self.parent.right = 0;
                        showAll(areas);
                        self.parent.tabsContainer.right = parseInt(self.parent.width) + 5;
                        break;
                    case 'right':
                        self.parent.left = 0;
                        showAll(areas);
                        self.parent.tabsContainer.left = parseInt(self.parent.width) - 2;
                        break;
                }
            };

            this.handleFlyoutOpen = function(event){
                var self = this;
                var areas =  self.parent.getAllAreas();
                var tabs =  self.parent.getAllTabs();
                if (isVisible(areas)) {
                    if (self.selected){
                        hideFlyout(areas, self);
                    }
                }else{
                    showFlyout(areas,self);
                }

                if (isVisible(areas)) {
                    for (var index = 0; index < tabs.length; index++) {
                        tabs[index].selected = false;
                        tabs[index].zIndex = tabs.length - index;
                    }
                    self.selected = true;
                    self.zIndex = tabs.length + 1;
                    self.focus = true;
                    hideAll(areas);
                    areas[findTabIndex(tabs,self)].show = true;
                }
            };

            this.handleFlyoutFocus = function(event) {
                var self = this;
                var tabs =  self.parent.getAllTabs();
                for (var index = 0; index < tabs.length; index++) {
                    if(!tabs[index].selected){
                        tabs[index].zIndex = tabs.length - index;
                    }
                }
                self.zIndex = tabs.length + 1;
            };


            var clearTabsStatus = function(tabs){
                for (var i = 0; i < tabs.length; i++) {
                    tabs[i].focus = false;
                    tabs[i].selected = false;
                    tabs[i].zIndex = 0;
                }
            };

            this.keyboardNavigation =function(event){
                var self =this;

                var tabs =  self.parent.getAllTabs();
                var areas = self.parent.getAllAreas();
                var index = findTabIndex(tabs,self);
                if((event.keyCode === keyCodeConst.TAB && event.shiftKey) || event.keyCode === keyCodeConst.UP){
                    clearTabsStatus(tabs);
                    if(index - 1>=0){
                        angular.element(event.target).parent().parent().parent().find("li")[index - 1].firstElementChild.focus();
                        tabs[index - 1].selected = true;
                        tabs[index - 1].zIndex = tabs.length + 1;
                        if (isVisible(areas)){
                            hideAll(areas);
                            areas[index - 1].show = true;
                        }
                        event.preventDefault();
                    }else if(index===0){
                        tabs[index].zIndex = tabs.length;
                    }
                }else if(event.keyCode === keyCodeConst.DOWN || event.keyCode === keyCodeConst.TAB) {
                    clearTabsStatus(tabs);
                    if(index + 1<tabs.length){
                        angular.element(event.target).parent().parent().parent().find("li")[index+1].firstElementChild.focus();
                        tabs[index + 1].selected = true;
                        tabs[index + 1].zIndex = tabs.length + 1;
                        if (isVisible(areas)) {
                            hideAll(areas);
                            areas[index + 1].show = true;
                        }
                        event.preventDefault();
                    }
                }
            };

            this.$onDestroy = function () {
                self.parent.removeTab(self);
            };
        };

        flyoutTabsContainerController.$inject = ['$attrs','$element'];
        flyoutTabController.$inject = ['$element','WF-KEYCODE-CONST'];

        angular.module('wf.angular.flyoutactivity', ['wf.angular.constants', 'ngAnimate'])
            .component('wfFlyoutActivity', {
                transclude: true,
                templateUrl: 'wf/ng-template/flyoutactivity/flyoutactivity.html',
                bindings: {
                    direction: '@',
                    height: '@',
                    width: '@'
                },
                controller: flyoutActivityController
            }).component('wfFlyoutActivityArea', {
                templateUrl: 'wf/ng-template/flyoutactivity/flyoutactivity-area.html',
                require: {
                    parent: '^wfFlyoutActivity'
                },
                transclude: true,
                controller: flyoutActivityAreaController
            }).component('wfFlyoutTabsContainer',{
                templateUrl: "wf/ng-template/flyoutactivity/flyoutactivity-tabs-container.html",
                require: {
                    parent: '^^wfFlyoutActivity'
                },
                transclude: true,
                controller: flyoutTabsContainerController
            }).component('wfFlyoutTab',{
                templateUrl: "wf/ng-template/flyoutactivity/flyoutactivity-tab.html",
                require: {
                    parent: '^^wfFlyoutActivity'
                },
                transclude: true,
                controller: flyoutTabController
            });
    })
);