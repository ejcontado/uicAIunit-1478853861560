(function (factory) {
    //noinspection JSUnresolvedVariable
    if (typeof define === 'function' && define.amd) {
        //noinspection JSUnresolvedFunction
        define(['angular', '../const/constants'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    //noinspection JSUnresolvedFunction
                    angular = require('angular');
                } else {
                    //noinspection JSUnresolvedFunction
                    angular = require('angular')(root);
                }
            }//noinspection JSUnresolvedFunction
            factory(angular, require('../var/constants'));
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

    //noinspection SpellCheckingInspection
    var SearchController = function (keyCodeConst, $attrs, $document, $timeout) {


        //define the component types
        var typeDropDown = 'dropDown';
        var typeClearDropDown = 'clearDropDown';
        var typeSearchBtnDropDown = 'searchBtnDropDown';

        var ctrl = this;
        if (!ctrl.type) {
            ctrl.type = 'standard';
        }
        ctrl.isOpen = false;
        function hideDropDown() {
            ctrl.isOpen = false;
        }

        function toggleClassOpenOnClick(ele) {
            if (ctrl.type === typeDropDown || ctrl.type === typeClearDropDown || ctrl.type === typeSearchBtnDropDown) {
                var classFromDom = ele.attr('class');
                if (classFromDom.indexOf('open') > -1) {
                    ele.removeClass('open');
                    ctrl.isOpen = false;
                } else {
                    ele.addClass('open');
                    ctrl.isOpen = true;
                    angular.element($document).find('body').one('click', cancelDropdownListener);
                }
            }
        }

        ctrl.updAndDown = function (event) {
            //noinspection JSValidateTypes
            var currentLi = angular.element(event.target).parent();
            var prevLi = currentLi.prev();
            var nextLi = currentLi.next();
            if (event.keyCode === keyCodeConst.UP) {
                if (prevLi.length === 1) {
                    prevLi.find('a')[0].focus();
                }
                event.preventDefault();
            } else if (event.keyCode === keyCodeConst.DOWN) {
                if (1 === nextLi.length) {
                    nextLi.find('a')[0].focus();
                }
                event.preventDefault();
            } else if (event.keyCode === keyCodeConst.ESC) {
                hideDropDown();
                event.preventDefault();
            } else if (event.keyCode === keyCodeConst.SPACE) {
                event.preventDefault();
                event.stopPropagation();
                $timeout(function(){
                    currentLi.find('a').trigger('click');
                },0);
            }
        };

        function findALlOpened() {
            return angular.element($document).find('body .n-search.open');
        }

        ctrl.search = function (event) {
            var ele = angular.element(event.target).parent().parent();
            var opened = findALlOpened();
            if (opened.length > 0) {
                opened.not(ele).removeClass('open');
            }
            toggleClassOpenOnClick(ele);
            event.preventDefault();
            if (event) {
                event.stopPropagation();
            }
        };

        //set clear behavior
        ctrl.clear = function (event) {
            ctrl.textValue = '';
            findALlOpened().removeClass('open');
            event.stopPropagation();
            event.preventDefault();
        };
        //set clear behavior on keyboard case
        ctrl.clearOnKeyDown = function (event) {
            if (event.keyCode === keyCodeConst.ENTER || event.keyCode === keyCodeConst.SPACE) {
                ctrl.textValue = '';
                event.stopPropagation();
                event.preventDefault();
            } else if (event.keyCode === keyCodeConst.ESC) {
                event.target.blur();
            }
        };

        ctrl.handelKeyboard = function (event) {
            var ele = angular.element(event.target);
            if (event.keyCode === keyCodeConst.ESC) {
                angular.element(event.target).parent().removeClass('open');
            } else if (event.keyCode === keyCodeConst.SPACE || event.keyCode === keyCodeConst.ENTER) {
                if (ele.hasClass('dropdown-toggle')) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleClassOpenOnClick(ele.parent());
                }
            } else if (event.keyCode === keyCodeConst.UP || event.keyCode === keyCodeConst.DOWN) {
                //noinspection JSValidateTypes
                angular.element(event.target).parent().find('ul>li>a:first')[0].focus();
                event.preventDefault();
                event.stopPropagation();
            }
        };

        ctrl.onTextInput = function (event) {
            if (event.keyCode === keyCodeConst.ENTER) {
                //noinspection JSUnresolvedVariable
                if (this.onSubmitCallback) {
                    //noinspection JSUnresolvedFunction
                    //this.onSubmitCallback({'event':event,'textValue':ctrl.textValue});
                    this.onSubmitCallback()(event,ctrl.textValue);
                }
            }
        };

        function cancelDropdownListener() {
            var opened = angular.element($document).find("body .open a.dropdown-toggle");
            if (opened && opened.length > 0) {opened.click();}
        }

        ctrl.$onChanges = function (changes) {
            if (changes.disable ) {
                if(changes.disable.currentValue){
                    ctrl.isOpen = false;
                }
            }
        };
    };
    //$scope, $element, $attrs
    SearchController.$inject = ['WF-KEYCODE-CONST', '$attrs', '$document', '$timeout'];

    angular.module('wf.angular.search', ['wf.angular.constants'])
        .component('wfSearch', {
            transclude: true,
            templateUrl: 'wf/ng-template/search/search.html',
            bindings: {
                textValue : '<',
                dropDownData: '<',
                disable: '<',
                type: '@',
                placeholder: '@',
                searchBtnText: '@',
                onSubmitCallback: '&',
                onItemSelectedCallback: '&'
            },
            controller: SearchController
        });
}));