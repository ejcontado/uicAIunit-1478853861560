/* Created by jilian on 8/12/2015. */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', './keyboard/keyboard-core'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./keyboard/keyboard-core'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    // INPUTFIELD PUBLIC CLASS DEFINITION
    // ======================
    var InputField = function (element, options) {};

    InputField.VERSION = '1.1.0';

    InputField.prototype.constructor = InputField;

    InputField.prototype.clearContent = function () {
        var prev = $(this).prev();
        if (prev.hasClass("n-inputfield")) {
            if (!prev.hasClass("n-search-input")) {
                $(this).hide();
            }
            prev.val("");
            prev.attr("placeholder", "");
            prev.focus();
        }
    };

    // INPUTFIELD INTERNAL METHODS
    // ========================
    function detectMandatory(event) {
        var inputValue = event.target.value;
        var mandatoryElement = $(event.target).next(".form-control-feedback").find(".icon");

        if (inputValue.length > 0) {
            mandatoryElement.removeClass("icon-mandatory");
        }
        else {
            mandatoryElement.addClass("icon-mandatory");
        }
    }

    function showClearIcon(event) {
        var inputValue = event.target.value;
        var controlIcon = $(event.target).next('.n-inputfield-control-icon');
        if (inputValue.length > 0) {
            controlIcon.show();
        } else {
            controlIcon.hide();
        }
    }

    function bindOnblurForClearableInputField() {
        $('.n-inputfield-clearable input').each(function () {
            var placeholderText = $(this).attr("placeholder");
            $(this).on('blur', function () {
                $(this).attr('placeholder', placeholderText);
            });
        });
    }

    function handleForgetPwd(event) {
        $(event.target).removeClass("n-link-visited").addClass("n-link-visited");
    }

    function handleLoginbutton(event) {
        var isEmpty = false;
        $(event.target).closest('.n-login-textfields').find('.n-inputfield').each(function () {
            if (!$(this).val()) {
                isEmpty = true;
                return false;
            }
        });
        var $login = $(event.target).closest('.n-login').find('.n-login-action button');
        if (isEmpty) {
            $login.prop('disabled', true);
        } else {
            $login.prop('disabled', false);
        }
    }

    // INPUTFIELD PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('wf.inputfield');
            var options = typeof option === 'object' && option;

            if (!data && /destroy|hide/.test(option)) {
                return;
            }
            if (!data) {
                $this.data('wf.inputfield', (data = new InputField(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }

    var old = $.fn.nInputField;

    $.fn.nInputField = Plugin;
    $.fn.nInputField.Constructor = InputField;


    // INPUTFIELD NO CONFLICT
    // ===================

    $.fn.nInputField.noConflict = function () {
        $.fn.nInputField = old;
        return this;
    };

    $(document)
        .on('keyup.wf.forms', '.input-required input', detectMandatory)
        .on('keyup.wf.forms', '.n-inputfield-clearable input', showClearIcon)
        .on('click.wf.forms', '.n-inputfield-clearable .n-inputfield-control-icon', InputField.prototype.clearContent)
        .on('click.wf.forms', '.n-login-forget-password > a', handleForgetPwd)
        .on('keyup.wf.forms change.wulf.forms', '.n-login .n-inputfield', handleLoginbutton)
        .on('keydown.wf.forms.keyboard', '[class$="-clearable"] a', $.wfKBCore.commonKeyboardHandler);

    $(document).ready(function () {
        bindOnblurForClearableInputField();
    });
}
));