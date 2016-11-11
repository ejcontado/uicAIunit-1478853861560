!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(a,b){a.addClass("tree-selected"),"item"===a.data("type")&&b.hasClass("fueluxicon-bullet")&&b.removeClass("fueluxicon-bullet").addClass("glyphicon-ok")}function c(a,b){a.removeClass("tree-selected"),"item"===a.data("type")&&b.hasClass("glyphicon-ok")&&b.removeClass("glyphicon-ok").addClass("fueluxicon-bullet")}function d(d,e,f){a.each(f.$elements,function(b,c){var d=a(c);d[0]!==e.$element[0]&&f.dataForEvent.push(a(d).data())}),e.$element.hasClass("tree-selected")?(c(e.$element,e.$icon),f.eventType="deselected"):(b(e.$element,e.$icon),f.eventType="selected",f.dataForEvent.push(e.elementData))}function e(a,d,e){if(e.$elements[0]!==d.$element[0]){a.deselectAll(a.$element);b(d.$element,d.$icon),e.eventType="selected",e.dataForEvent=[d.elementData]}else c(d.$element,d.$icon),e.eventType="deselected",e.dataForEvent=[]}var f=a.fn.tree,g=function(b,c){this.$element=a(b),this.options=a.extend({},a.fn.tree.defaults,c),this.options.itemSelect&&this.$element.on("click.fu.tree",".tree-item",a.proxy(function(a){this.selectItem(a.currentTarget)},this)),this.$element.on("click.fu.tree",".tree-branch-name",a.proxy(function(a){this.toggleFolder(a.currentTarget)},this)),this.options.folderSelect&&(this.$element.addClass("tree-folder-select"),this.$element.off("click.fu.tree",".tree-branch-name"),this.$element.on("click.fu.tree",".icon-caret",a.proxy(function(b){this.toggleFolder(a(b.currentTarget).parent())},this)),this.$element.on("click.fu.tree",".tree-branch-name",a.proxy(function(b){this.selectFolder(a(b.currentTarget))},this))),this.render()};g.prototype={constructor:g,deselectAll:function(b){b=b||this.$element;var d=a(b).find(".tree-selected");return d.each(function(b,d){c(a(d),a(d).find(".glyphicon"))}),d},destroy:function(){return this.$element.find("li:not([data-template])").remove(),this.$element.remove(),this.$element[0].outerHTML},render:function(){this.populate(this.$element)},populate:function(b){var c=this,d=b.hasClass("tree")?b:b.parent(),e=d.find(".tree-loader:eq(0)"),f=d.data();e.removeClass("hide hidden"),this.options.dataSource(f?f:{},function(f){e.addClass("hidden"),a.each(f.data,function(e,f){var g;"folder"===f.type?(g=c.$element.find("[data-template=treebranch]:eq(0)").clone().removeClass("hide hidden").removeData("template"),g.data(f),g.find(".tree-branch-name > .tree-label").html(f.text||f.name)):"item"===f.type&&(g=c.$element.find("[data-template=treeitem]:eq(0)").clone().removeClass("hide hidden").removeData("template"),g.find(".tree-item-name > .tree-label").html(f.text||f.name),g.data(f));var h=f.attr||f.dataAttributes||[];a.each(h,function(a,b){switch(a){case"cssClass":case"class":case"className":g.addClass(b);break;case"data-icon":g.find(".icon-item").removeClass().addClass("icon-item "+b),g.attr(a,b);break;case"id":g.attr(a,b),g.attr("aria-labelledby",b+"-label"),g.find(".tree-branch-name > .tree-label").attr("id",b+"-label");break;default:g.attr(a,b)}}),b.hasClass("tree-branch-header")?d.find(".tree-branch-children:eq(0)").append(g):b.append(g)}),c.$element.trigger("loaded.fu.tree",d)})},selectTreeNode:function(b,c){var f={};f.$element=a(b);var g={};g.$elements=this.$element.find(".tree-selected"),g.dataForEvent=[],"folder"===c?(f.$element=f.$element.closest(".tree-branch"),f.$icon=f.$element.find(".icon-folder")):f.$icon=f.$element.find(".icon-item"),f.elementData=f.$element.data(),this.options.multiSelect?d(this,f,g):e(this,f,g),this.$element.trigger(g.eventType+".fu.tree",{target:f.elementData,selected:g.dataForEvent}),f.$element.trigger("updated.fu.tree",{selected:g.dataForEvent,item:f.$element,eventType:g.eventType})},discloseFolder:function(b){var c=a(b),d=c.closest(".tree-branch"),e=d.find(".tree-branch-children"),f=e.eq(0);d.addClass("tree-open"),d.attr("aria-expanded","true"),f.removeClass("hide hidden"),d.find("> .tree-branch-header .icon-folder").eq(0).removeClass("glyphicon-folder-close").addClass("glyphicon-folder-open"),e.children().length||this.populate(e),this.$element.trigger("disclosedFolder.fu.tree",d.data())},closeFolder:function(b){var c=a(b),d=c.closest(".tree-branch"),e=d.find(".tree-branch-children"),f=e.eq(0);d.removeClass("tree-open"),d.attr("aria-expanded","false"),f.addClass("hidden"),d.find("> .tree-branch-header .icon-folder").eq(0).removeClass("glyphicon-folder-open").addClass("glyphicon-folder-close"),this.options.cacheItems||f.empty(),this.$element.trigger("closed.fu.tree",d.data())},toggleFolder:function(b){var c=a(b);c.find(".glyphicon-folder-close").length?this.discloseFolder(b):c.find(".glyphicon-folder-open").length&&this.closeFolder(b)},selectFolder:function(a){this.options.folderSelect&&this.selectTreeNode(a,"folder")},selectItem:function(a){this.options.itemSelect&&this.selectTreeNode(a,"item")},selectedItems:function(){var b=this.$element.find(".tree-selected"),c=[];return a.each(b,function(b,d){c.push(a(d).data())}),c},collapse:function(){var a=this,b=[],c=function c(d,e){b.push(e),0===a.$element.find(".tree-branch.tree-open:not('.hidden, .hide')").length&&(a.$element.trigger("closedAll.fu.tree",{tree:a.$element,reportedClosed:b}),a.$element.off("loaded.fu.tree",a.$element,c))};a.$element.on("closed.fu.tree",c),a.$element.find(".tree-branch.tree-open:not('.hidden, .hide')").each(function(){a.closeFolder(this)})},discloseVisible:function(){var b=this,c=b.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')"),d=[],e=function a(e,f){d.push(f),d.length===c.length&&(b.$element.trigger("disclosedVisible.fu.tree",{tree:b.$element,reportedOpened:d}),b.$element.off("loaded.fu.tree",b.$element,a))};b.$element.on("loaded.fu.tree",e),b.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')").each(function(){b.discloseFolder(a(this).find(".tree-branch-header"))})},discloseAll:function(){var a=this;"undefined"==typeof a.$element.data("disclosures")&&a.$element.data("disclosures",0);var b=a.options.disclosuresUpperLimit>=1&&a.$element.data("disclosures")>=a.options.disclosuresUpperLimit,c=0===a.$element.find(".tree-branch:not('.tree-open, .hidden, .hide')").length;if(c)a.$element.trigger("disclosedAll.fu.tree",{tree:a.$element,disclosures:a.$element.data("disclosures")}),a.options.cacheItems||a.$element.one("closeAll.fu.tree",function(){a.$element.data("disclosures",0)});else{if(b&&(a.$element.trigger("exceededDisclosuresLimit.fu.tree",{tree:a.$element,disclosures:a.$element.data("disclosures")}),!a.$element.data("ignore-disclosures-limit")))return;a.$element.data("disclosures",a.$element.data("disclosures")+1),a.$element.one("disclosedVisible.fu.tree",function(){a.discloseAll()}),a.discloseVisible()}}},g.prototype.closeAll=g.prototype.collapse,g.prototype.openFolder=g.prototype.discloseFolder,a.fn.tree=function(b){var c,d=Array.prototype.slice.call(arguments,1),e=this.each(function(){var e=a(this),f=e.data("fu.tree"),h="object"==typeof b&&b;f||e.data("fu.tree",f=new g(this,h)),"string"==typeof b&&(c=f[b].apply(f,d))});return void 0===c?e:c},a.fn.tree.defaults={dataSource:function(a,b){},multiSelect:!1,cacheItems:!0,folderSelect:!0,itemSelect:!0,disclosuresUpperLimit:0},a.fn.tree.Constructor=g,a.fn.tree.noConflict=function(){return a.fn.tree=f,this}});