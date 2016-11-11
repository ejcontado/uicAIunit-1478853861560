/**
 * Created by jilian on 9/21/2015.
 * ========================================================================
 * Copyright (C) 2015 Nokia Solutions and Networks. All rights Reserved.
 * ======================================================================== */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery','./scroll'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');

                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, require('./scroll'));
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    $.fn.getCursorPosition = function () {
        var el = $(this).get(0),
            pos = 0;
        if ("selectionStart" in el) {
            pos = el.selectionStart;
        }
        else if ("selection" in document) {
            el.focus();
            var sel = document.selection.createRange(),
                selLength = document.selection.createRange().text.length;
            sel.moveStart("character", -el.value.length);
            pos = sel.text.length - selLength;
        }
        return pos;
    };

    var updateScrollbar = function (localTextArea, hiddenDiv) {
        var localContainer = localTextArea.parents(".mCSB_container");
        var localWrapper = localTextArea.parents(".textarea-wrapper");

        var content = localTextArea.val();
        var cursorPosition = localTextArea.getCursorPosition();
        content = "<span>" + content.substr(0, cursorPosition) + "</span>" + content.substr(cursorPosition, content.length);
        content = content.replace(/\n/g, "<br />");
        hiddenDiv.html(content + "<br />");

        localTextArea.css("height", hiddenDiv.height());
        localWrapper.nScrollbar("update");

        var hiddenDivSpan = hiddenDiv.children("span"),
            hiddenDivSpanOffset = 0,
            viewLimitBottom = (parseInt(hiddenDiv.css("min-height"))) - hiddenDivSpanOffset,
            viewRatio = Math.round(hiddenDivSpan.height() + localContainer.position().top),
            textareaLineHeight = parseInt (localTextArea.css("line-height"));
        if (viewRatio > viewLimitBottom || viewRatio < hiddenDivSpanOffset) {
            var scrollLocation = parseInt((hiddenDivSpan.height() - hiddenDivSpanOffset) / textareaLineHeight) * textareaLineHeight;
            localWrapper.mCustomScrollbar("scrollTo", scrollLocation);
        }
    };

    $(document).ready(function () {
        $.each($(".content-scroll"), function (i,item) {
            var $contentScroll = $(item);
            var textArea = $contentScroll.find(".n-textarea");
            var textAreaHeight = parseInt($contentScroll.css("height")) - 17;
            textArea.css("height", textAreaHeight);
            textArea.wrap("<div class='textarea-wrapper' />");

            var textAreaWrapper = textArea.parent(".textarea-wrapper");
            textAreaWrapper.css("height", $contentScroll.css("height"));
            textAreaWrapper.addClass("textarea-wrapper-normal");
            textAreaWrapper.mCustomScrollbar({
                scrollInertia: 0,
                advanced: { autoScrollOnFocus: false }
            });

            var hiddenDiv = $(document.createElement("div")),
                content = null;
            hiddenDiv.addClass("textareaHiddenDiv");
            hiddenDiv.css("width", parseInt(textArea.css("width")) - 12);
            hiddenDiv.css("min-height", textAreaHeight);

            $("body").prepend(hiddenDiv);

            if (textArea.length > 0) {
                updateScrollbar(textArea, hiddenDiv);
                textArea.bind("keyup keydown", function () {
                    updateScrollbar($(this), hiddenDiv);
                });
                textArea.bind("focus", function () {
                    var localWrapper = $(this).parents(".textarea-wrapper");
                    localWrapper.removeClass("textarea-wrapper-normal");
                    localWrapper.addClass("textarea-wrapper-focus");
                });
                textArea.bind("blur", function () {
                    var localWrapper = $(this).parents(".textarea-wrapper");
                    localWrapper.removeClass("textarea-wrapper-focus");
                    localWrapper.addClass("textarea-wrapper-normal");
                });
            }
        });

    });
}
));