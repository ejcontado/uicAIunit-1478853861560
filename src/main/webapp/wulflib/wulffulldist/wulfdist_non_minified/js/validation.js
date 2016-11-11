/**
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory); 
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }

            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

        'use strict';
        var reg='';
        var customerReg;

        $('.n-inputfield-validation').bind('blur',function(){
            var value=$(this).val();
            if($(this).hasClass('n-inputfield-ip-address')){
                reg =/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
            }else if($(this).hasClass('n-inputfield-date')){
                reg =/^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
            }else if($(this).hasClass('n-inputfield-placeholder')){
                reg =/^([0-1]?[0-9]|3[0-1])\/([0-9]|1[0-2])\/\d{4}$/;
            }else if($(this).hasClass('n-inputfield-time')){
                reg =/^([0-1]?[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
            }else if($(this).hasClass('n-inputfield-customized')){
                reg=customerReg;
            }
            if(value && !reg.test(value)){
                $(this).addClass('n-inputfield-validation');
            }else {
                $(this).removeClass('n-inputfield-validation');
            }
        });
        $('.n-inputfield-validation').bind('focus',function(){
            $(this).removeClass('n-inputfield-validation');
        });
        $.fn.extend({
            customerReg: function(regex){
                customerReg=regex;
            }
        });
    }
));