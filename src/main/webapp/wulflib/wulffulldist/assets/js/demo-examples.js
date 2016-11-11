/**
 * Created by ejacob on 3/30/2016.
 */

require(['jquery', 'jqxsplitter'], function ($) {

    $(document).ready(function () {
        'use strict';

        var panels = [{size: 250, collapsible: false}, {collapsible: false}];
        $('#demoExampleSplitterVertical').jqxSplitter({panels: panels});

        var hash = location.hash;

        $(window).on('hashchange', function () {
            location.reload();
        });
        $(window).resize(function () {
            $('#demoExampleSplitterVertical').jqxSplitter('refresh');
        });

        $('#content').attr('src', "components/common.html");
        $('#menu').attr('src', "demo-examples-menu.html" + hash);
    });

});