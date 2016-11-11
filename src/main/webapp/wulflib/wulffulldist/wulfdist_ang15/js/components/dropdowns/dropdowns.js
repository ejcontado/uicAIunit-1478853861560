!function(a){"function"==typeof define&&define.amd?define(["angular","../const/constants"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("angular"):require("angular")(b)),a(c,require("../const/constants")),c}:a(angular)}(function(a){"use strict";var b=function(b,c,d,e,f){var g=this;this.dropdownClass=[],this.dropdownClassStr="",this.dropdownButtonClass=[],this.dropdownButtonClassStr="",this.show=!1,this.selectedItem="",this.dropdownClass.push("btn-group"),this.dropdownClass.push("selectlist"),this.dropdownClass.push("selectlist-resize"),this.dropdownButtonClass.push("btn"),this.dropdownButtonClass.push("btn-default"),this.dropdownButtonClass.push("dropdown-toggle"),void 0===this.pattern?this.pattern="standard":"small"===this.pattern?this.dropdownClass.push("selectlist-small"):"dark"===this.pattern&&this.dropdownClass.push("selectlist-dark"),void 0===this.disable?this.disable=!1:this.disable===!0&&(this.dropdownClass.push("disabled"),this.dropdownButtonClass.push("disabled")),this.dropdownClassStr=this.dropdownClass.join(" "),this.dropdownButtonClassStr=this.dropdownButtonClass.join(" "),this.open=function(){this.show=!0,this.dropdownClass.push("open"),c(function(){d.on("click",h)},0),this.dropdownClassStr=this.dropdownClass.join(" ")},this.close=function(){this.show=!1;var a=this.dropdownClass.indexOf("open");a>-1&&this.dropdownClass.splice(a,1),c(function(){d.off("click",h)},0),this.dropdownClassStr=this.dropdownClass.join(" ")};var h=function(){setTimeout(function(){g.show&&g.close()},0)};this.toggle=function(a){this.show?this.close():this.open()},this.keyboardStepInList=function(b){var c=b.keyCode,d=a.element(b.target);if(c===f.DOWN&&b.target.className.replace(/[\n\t]/g," ").indexOf("dropdown-toggle")>-1){b.preventDefault();for(var e=d.parent().find("ul").find("li"),g=0;g<e.length;g++)if(!e.eq(g).find("a")[0].disabled){e.eq(g).find("a")[0].focus();break}}c===f.ESC&&this.toggle()}};b.$inject=["$rootScope","$timeout","$document","$element","WF-KEYCODE-CONST"];var c=function(b,c,d){var e=this;this.displayText="",void 0===this.disable&&(this.disable=!1),void 0!==this.label?this.displayText=this.label:this.displayText=this.value,this.select===!0&&c(function(){void 0!==e.label?e.parent.selectedItem=e.label:e.parent.selectedItem=e.value},0),this.selectItem=function(a){this.parent.toggle(a),void 0!==this.label?this.parent.selectedItem=this.label:this.parent.selectedItem=this.value,this.onItemSelected()&&"function"==typeof this.onItemSelected&&this.onItemSelected()(this.value,this.label,a)},this.keyboardNavigation=function(c){var d=c.keyCode,e=a.element(c.target),g=e.parent();switch(d){case b.UP:f(c,g,!1);break;case b.DOWN:f(c,g,!0);break;case b.SPACE:c.preventDefault(),this.selectItem(c)}};var f=function(a,b,c){a.preventDefault();var d=b.parent().parent().find("li"),e=i(b,d,c);null!==e&&h(d,e)},g=function(a,b){return a[b].firstElementChild},h=function(a,b){var d=g(a,b);c(function(){d.focus()},0)},i=function(a,b,c){var d=j(a,b),e=null,f=0;if(c){for(f=++d;f<b.length;f++)if(!b[f].firstElementChild.disabled){e=f;break}}else for(f=--d;f>=0;f--)if(!b[f].firstElementChild.disabled){e=f;break}return e},j=function(a,b){for(var c=null,d=0;d<b.length;d++)b[d]===a[0]&&(c=d);return c}};c.$inject=["WF-KEYCODE-CONST","$timeout","$rootScope"],a.module("wf.angular.dropdowns",["wf.angular.constants"]).component("wfDropdown",{transclude:!0,templateUrl:"wf/ng-template/dropdowns/dropdowns.html",bindings:{pattern:"<",disable:"<?"},controller:b}).component("wfDropdownItem",{templateUrl:"wf/ng-template/dropdowns/dropdownsItem.html",require:{parent:"^^wfDropdown"},bindings:{value:"<",label:"<",disable:"<?",select:"<?",onItemSelected:"&"},controller:c})});