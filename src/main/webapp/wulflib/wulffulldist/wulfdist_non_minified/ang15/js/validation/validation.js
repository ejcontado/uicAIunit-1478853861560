/**
 * Created by jiangdai on 2016/6/27.
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
        var ValidationController = function ( ) {

            var self = this;
            self.placeholder ="";

            if(self.pattern){
                switch (self.pattern){
                    case "ip_address" :
                        self.reg =/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
                        break;
                    case "date" :
                        self.reg =/^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
                        break;
                    case "dateWP" :
                        self.reg =/^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
                        this.placeholder = "DD/MM/YYYY";
                        break;
                    case "time" :
                        self.reg =/^([0-1]?[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/ ;
                        break;
                    default:break;
                }
            }
            this.validation = function () {
                if (this.value) {
                    if((self.reg &&!self.regex && !self.reg.test(this.value))||(!self.reg &&self.regex && !self.regex.test(this.value))) {
                        this.class = "has-error";
                    }else if(self.regex && !self.reg &&!self.regex.test(this.value)){
                        this.class = "has-error";
                    }else{
                        this.class="";
                    }
                }else {
                    this.class = "";
                }
            };
            this.reEdit = function(){
                this.class = "";
            };

        };

        ValidationController.$inject = ['WF-KEYCODE-CONST', '$element'];

        angular.module('wf.angular.validation', ['wf.angular.constants'])
            .component('wfValidation', {
                transclude: true,
                templateUrl: 'wf/ng-template/validation/validation.html',
                bindings: {
                    pattern: '<',
                    regex:'<'
                },
                controller: ValidationController
            });

    }
));
