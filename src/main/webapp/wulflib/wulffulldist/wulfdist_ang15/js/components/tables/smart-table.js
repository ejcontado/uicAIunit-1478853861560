!function(a){"function"==typeof define&&define.amd?define(["angular","../const/constants"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("../const/constants")),c}:a(angular)}(function(a,b){"use strict";a.module("wf.angular.tables",[]).run(["$templateCache",function(a){a.put("ng-template/smart-table/pagination.html",'<nav ng-if="numPages && pages.length >= 2"><ul class="pagination"><li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a href="javascript: void(0);" ng-click="selectPage(page)">{{page}}</a></li></ul></nav>')}]),a.module("wf.angular.tables").constant("wfConfig",{summary:{template:"wf/ng-template/tables/tables-summary.html"},pagination:{template:"wf/ng-template/tables/tables-pagination.html",itemsByPage:10,displayedPages:5},search:{delay:400,inputEvent:"input"},select:{mode:"single",selectedClass:"st-selected"},sort:{ascentClass:"st-sort-ascent",descentClass:"st-sort-descent",descendingFirst:!1,skipNatural:!1,delay:300},pipe:{delay:100}}),a.module("wf.angular.tables").controller("wfTableController",["$scope","$parse","$filter","$attrs",function(c,d,e,f){function g(a){return a?[].concat(a):[]}function h(){s=g(k(c)),u===!0&&v.pipe()}function i(a,b){if(b.indexOf(".")!==-1){var c=b.split("."),e=c.pop(),f=c.join("."),g=d(f)(a);delete g[e],0===Object.keys(g).length&&i(a,f)}else delete a[b]}function j(a){x.indexOf(a)===-1&&x.push(a)}var k,l,m,n=f.wfTable,o=d(n),p=o.assign,q=e("orderBy"),r=e("filter"),s=g(o(c)),t={sort:{},search:{},pagination:{start:0,totalItemCount:0}},u=!0,v=this,w=s.length,x=[];f.wfSafeSrc&&(k=d(f.wfSafeSrc),c.$watch(function(){var a=k(c);return a&&a.length?a[0]:b},function(a,b){a!==b&&h()}),c.$watch(function(){var a=k(c);return a?a.length:0},function(a,b){a!==s.length&&h()}),c.$watch(function(){return k(c)},function(a,b){a!==b&&(t.pagination.start=0,h())})),this.getTotalRecords=function(){return w},this.sortBy=function(b,c){return t.sort.predicate=b,t.sort.reverse=c===!0,a.isFunction(b)?t.sort.functionName=b.name:delete t.sort.functionName,t.pagination.start=0,this.pipe()},this.search=function(b,c){j(c);var e=t.search.predicateObject||{},f=c?c:"$";return b=a.isString(b)?b.trim():b,d(f).assign(e,b),b||i(e,f),t.search.predicateObject=e,t.pagination.start=0,this.pipe()},this.clearSearch=function(){for(var a=0;a<x.length;a++){var b=x[a].trim();this.search("",b)}},this.pipe=function(){var a,d=t.pagination;l=t.search.predicateObject?r(s,t.search.predicateObject):s,t.sort.predicate&&(l=q(l,t.sort.predicate,t.sort.reverse)),d.totalItemCount=l.length,d.number!==b&&(d.numberOfPages=l.length>0?Math.ceil(l.length/d.number):1,d.start=d.start>=l.length?(d.numberOfPages-1)*d.number:d.start,a=l.slice(d.start,d.start+parseInt(d.number))),p(c,a||l)},this.select=function(a,d){var e=g(o(c)),f=e.indexOf(a);f!==-1&&("single"===d?(a.isSelected=a.isSelected!==!0,m&&(m.isSelected=!1),m=a.isSelected===!0?a:b):e[f].isSelected=!e[f].isSelected)},this.slice=function(a,b){return t.pagination.start=a,t.pagination.number=b,this.pipe()},this.tableState=function(){return t},this.getFilteredCollection=function(){return l||s},this.setFilterFunction=function(a){r=e(a)},this.setSortFunction=function(a){q=e(a)},this.preventPipeOnWatch=function(){u=!1}}]).directive("wfTable",function(){return{restrict:"A",controller:"wfTableController",link:function(a,b,c,d){c.wfSetFilter&&d.setFilterFunction(c.wfSetFilter),c.wfSetSort&&d.setSortFunction(c.wfSetSort)}}}),a.module("wf.angular.tables").directive("wfClear",["wfConfig","$timeout","$parse",function(a,b,c,d){return{require:"^wfTable",link:function(a,b,c,d){b.bind("click",function(){d.clearSearch(),a.$apply()})}}}]),a.module("wf.angular.tables").directive("wfSearch",["wfConfig","$timeout","$parse",function(a,b,c){return{require:"^wfTable",link:function(d,e,f,g){var h=g,i=null,j=f.wfDelay||a.search.delay,k=f.wfInputEvent||a.search.inputEvent;f.$observe("wfSearch",function(a,b){var c=e[0].value;a!==b&&c&&(g.tableState().search={},h.search(c,a))}),d.$watch(function(){return g.tableState().search},function(a,b){var d=f.wfSearch||"$";a.predicateObject&&c(d)(a.predicateObject)!==e[0].value&&(e[0].value=c(d)(a.predicateObject)||"")},!0),e.bind(k,function(a){a=a.originalEvent||a,null!==i&&b.cancel(i),i=b(function(){h.search(a.target.value,f.wfSearch||""),i=null},j)})}}}]),a.module("wf.angular.tables").directive("wfSelectRow",["wfConfig",function(a){return{restrict:"A",require:"^wfTable",scope:{row:"=wfSelectRow"},link:function(b,c,d,e){var f=d.wfSelectMode||a.select.mode;c.bind("click",function(){b.$apply(function(){e.select(b.row,f)})}),b.$watch("row.isSelected",function(b){b===!0?c.addClass(a.select.selectedClass):c.removeClass(a.select.selectedClass)})}}}]),a.module("wf.angular.tables").directive("wfSort",["wfConfig","$parse","$timeout",function(c,d,e){return{restrict:"A",require:"^wfTable",link:function(f,g,h,i){function j(){s?n=0===n?2:n-1:n++;var b;l=a.isFunction(m(f))||a.isArray(m(f))?m(f):h.wfSort,n%3===0&&r!==!0?(n=0,i.tableState().sort={},i.tableState().pagination.start=0,b=i.pipe.bind(i)):b=i.sortBy.bind(i,l,n%2===0),null!==t&&e.cancel(t),u<0?b():t=e(b,u)}var k,l=h.wfSort,m=d(l),n=0,o=h.wfClassAscent||c.sort.ascentClass,p=h.wfClassDescent||c.sort.descentClass,q=[o,p],r=h.wfSkipNatural!==b?"true"===h.wfSkipNatural:c.sort.skipNatural,s=h.wfDescendingFirst!==b?h.wfDescendingFirst:c.sort.descendingFirst,t=null,u=h.wfDelay||c.sort.delay;h.wfSortDefault&&(k=f.$eval(h.wfSortDefault)!==b?f.$eval(h.wfSortDefault):h.wfSortDefault),g.bind("click",function(){l&&f.$apply(j)}),k&&(n="reverse"===k?1:0,j()),f.$watch(function(){return i.tableState().sort},function(a){a.predicate!==l?(n=0,g.removeClass(o).removeClass(p)):(n=a.reverse===!0?2:1,g.removeClass(q[n%2]).addClass(q[n-1]))},!0)}}}]),a.module("wf.angular.tables").directive("wfIndicator",["wfConfig","$parse",function(b,c){return{restrict:"A",require:"^wfTable",link:function(b,d,e,f){var g=c(e.wfIndicator),h=a.copy(g(b));d.addClass("ng-n-hideEle"),b.$watch(function(){return g(b)},function(b,c){a.equals(b,h)?d.hasClass("ng-n-hideEle")||d.addClass("ng-n-hideEle"):d.removeClass("ng-n-hideEle")},!0)}}}]),a.module("wf.angular.tables").directive("wfSummary",["wfConfig",function(a){return{restrict:"EA",require:"^wfTable",templateUrl:function(b,c){return c.wfSummaryTemplate?c.wfSummaryTemplate:a.summary.template},link:function(b,c,d,e){function f(){var a,c,d=e.tableState().pagination,f=1,g=b.currentPage;for(b.totalRecords=e.getTotalRecords(),b.totalItemCount=d.totalItemCount,b.currentPage=Math.floor(d.start/d.number)+1,f=Math.max(f,b.currentPage-Math.abs(Math.floor(b.wfDisplayedPages/2))),a=f+b.wfDisplayedPages,a>d.numberOfPages&&(a=d.numberOfPages+1,f=Math.max(1,a-b.wfDisplayedPages)),b.pages=[],b.numPages=d.numberOfPages,c=f;c<a;c++)b.pages.push(c);g!==b.currentPage&&b.wfPageChange({newPage:b.currentPage})}b.wfItemsByPage=b.wfItemsByPage?+b.wfItemsByPage:a.pagination.itemsByPage,b.wfDisplayedPages=b.wfDisplayedPages?+b.wfDisplayedPages:a.pagination.displayedPages,b.currentPage=1,b.pages=[],b.$watch(function(){return e.tableState().pagination},f,!0),b.$watch("wfItemsByPage",function(a,c){a!==c&&b.selectPage(1)}),b.selectPage=function(a){a>0&&a<=b.numPages&&e.slice((a-1)*b.wfItemsByPage,b.wfItemsByPage)},e.tableState().pagination.number||e.slice(0,b.wfItemsByPage)}}}]),a.module("wf.angular.tables").directive("wfPagination",["wfConfig",function(a){return{restrict:"EA",require:"^wfTable",scope:{wfItemsByPage:"=?",wfDisplayedPages:"=?",wfPageChange:"&"},templateUrl:function(b,c){return c.wfTemplate?c.wfTemplate:a.pagination.template},link:function(b,c,d,e){function f(){var a,c,d=e.tableState().pagination,f=1,g=b.currentPage;for(b.totalRecords=e.getTotalRecords(),b.totalItemCount=d.totalItemCount,b.currentPage=Math.floor(d.start/d.number)+1,f=Math.max(f,b.currentPage-Math.abs(Math.floor(b.wfDisplayedPages/2))),a=f+b.wfDisplayedPages,a>d.numberOfPages&&(a=d.numberOfPages+1,f=Math.max(1,a-b.wfDisplayedPages)),b.pages=[],b.numPages=d.numberOfPages,c=f;c<a;c++)b.pages.push(c);g!==b.currentPage&&b.wfPageChange({newPage:b.currentPage})}b.wfItemsByPage=b.wfItemsByPage?+b.wfItemsByPage:a.pagination.itemsByPage,b.wfDisplayedPages=b.wfDisplayedPages?+b.wfDisplayedPages:a.pagination.displayedPages,b.currentPage=1,b.pages=[],b.$watch(function(){return e.tableState().pagination},f,!0),b.$watch("wfItemsByPage",function(a,c){a!==c&&b.selectPage(1)}),b.$watch("wfDisplayedPages",f),b.selectPage=function(a){a>0&&a<=b.numPages&&e.slice((a-1)*b.wfItemsByPage,b.wfItemsByPage)},b.goToPage=function(a){a>b.numPages?a=b.numPages:a<=0&&(a=1),b.currentPage=a,e.slice((a-1)*b.wfItemsByPage,b.wfItemsByPage)},b.nextPage=function(a){var c=a+1;c>0&&c<=b.numPages&&e.slice((c-1)*b.wfItemsByPage,b.wfItemsByPage)},b.previousPage=function(a){var c=a-1;c>0&&c<=b.numPages&&e.slice((c-1)*b.wfItemsByPage,b.wfItemsByPage)},b.firstPage=function(a){var c=1;c>0&&c<=b.numPages&&e.slice((c-1)*b.wfItemsByPage,b.wfItemsByPage)},b.lastPage=function(a){var c=b.numPages;c>0&&c<=b.numPages&&e.slice((c-1)*b.wfItemsByPage,b.wfItemsByPage)},b.selectDisplayItemsByPage=function(a){b.wfItemsByPage=a},e.tableState().pagination.number||e.slice(0,b.wfItemsByPage)}}}]),a.module("wf.angular.tables").directive("wfPipe",["wfConfig","$timeout",function(b,c){return{require:"wfTable",scope:{wfPipe:"="},link:{pre:function(d,e,f,g){var h=null;a.isFunction(d.wfPipe)&&(g.preventPipeOnWatch(),g.pipe=function(){return null!==h&&c.cancel(h),h=c(function(){d.wfPipe(g.tableState(),g)},b.pipe.delay)})},post:function(a,b,c,d){d.pipe()}}}}])});