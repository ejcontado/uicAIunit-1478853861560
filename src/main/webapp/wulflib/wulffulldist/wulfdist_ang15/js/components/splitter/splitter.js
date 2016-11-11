!function(a){"function"==typeof define&&define.amd?define(["angular"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c),c}:a(angular)}(function(a){"use strict";var b=function(a){var b=this,c=a.children(),d=b.orientation||"vertical";"horizontal"===d?c.addClass("horizontal"):"vertical"===d&&c.addClass("vertical"),c.css(b.splitterStyle)},c=function(b){var c,d=this,e=b,f=e.children(),g=0,h=0,i=function(b){var c=b[0].previousElementSibling;c&&(c=a.element(c),g+=c.children()[0].offsetWidth,i(c))},j=function(b){var c=b[0].previousElementSibling;c&&(c=a.element(c),h+=c.children()[0].offsetHeight,i(c))},k=function(b){if(b[0].nextElementSibling){var c=a.element('<div class="split-handler vertical"></div>'),d=f[0].offsetWidth;c.css("left",g+d-4+"px"),f.after(c)}},l=function(b){if(b[0].nextElementSibling){var c=a.element('<div class="split-handler horizontal"></div>'),d=f[0].offsetHeight;c.css("top",h+d-4+"px"),f.after(c)}},m=function(a){return/^\d.*px$/.test(a)?a=parseInt(a):/^\d.*%$/.test(a)&&("vertical"===c?a=.01*parseInt(a)*e.parent()[0].clientWidth:"horizontal"===c&&(a=.01*parseInt(a)*e.parent()[0].clientHeight)),a};c=e.parent().parent().attr("orientation")||"vertical",d.$onInit=function(){d.onDrag=d.splitterCtrl.onDrag},"vertical"===c?(f.css("width",m(d.initSize)+"px"),f.css("height","100%"),i(e),f.css("left",g+"px"),k(e)):"horizontal"===c&&(f.css("height",m(d.initSize)+"px"),f.css("width","100%"),j(e),f.css("top",h+"px"),l(e));var n=e[0].querySelector("div.split-handler"),o=function(a,b,c){var g,h,i=!1,j=0;a.onmousedown=function(a){a.preventDefault(),b[0].style.opacity=1,"vertical"===c?(g=n.style.left,j=a.clientX):"horizontal"===c&&(g=n.style.top,j=a.clientY),i=!0},e[0].parentElement.onmousemove=function(k){var l=k?k:window.event;if(i){var o,p=m(d.minSize)-4||0,q=f[0].parentElement.nextElementSibling;n.style.opacity=.7,"vertical"===c?(h=parseInt(g)+l.clientX-j,o=q.getAttribute("min-size")?parseInt(e.parent().css("width"))-m(q.getAttribute("min-size"))-4:parseInt(e.parent().css("width"))-10,h<p?h=p:h>o&&(h=o),a.style.left=h+"px"):"horizontal"===c&&(h=parseInt(g)+l.clientY-j,o=q.getAttribute("min-size")?parseInt(e.parent().css("height"))-m(q.getAttribute("min-size"))-4:parseInt(e.parent().css("height"))-10,h<p?h=p:h>o&&(h=o),a.style.top=h+"px"),document.onmouseup=function(a){if(i){var g=f[0].parentElement.nextElementSibling.firstChild;n.style.opacity=1,b[0].style.opacity=0,"vertical"===c?(f.css("width",h+4+"px"),g.style.left=h+4+"px",b[0].style.left=h+"px",g.style.width=parseInt(e.parent().css("width"))-(h+4)+"px"):"horizontal"===c&&(f.css("height",h+4+"px"),g.style.top=h+4+"px",b[0].style.top=h+"px",g.style.height=parseInt(e.parent().css("height"))-(h+4)+"px"),d.onDrag()&&"function"==typeof d.onDrag&&d.onDrag()(f[0],g,a)}i=!1}}}};if(n){var p=a.element(n).clone();p.css("z-index",0),e.append(p),o(n,p,c)}};b.$inject=["$element"],c.$inject=["$element"],a.module("wf.angular.splitter",[]).component("wfSplitter",{templateUrl:"wf/ng-template/splitter/splitter.html",transclude:!0,bindings:{splitterStyle:"<",orientation:"@",onDrag:"&"},controller:b}).component("wfSplit",{template:'<div class="split-pane" ng-transclude></div>',transclude:!0,require:{splitterCtrl:"^^wfSplitter"},bindings:{initSize:"@",minSize:"@"},controller:c})});