!function(a){"function"==typeof define&&define.amd?define(["jquery","fuelux/repeater"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(b,c){function d(){var d,f,g;f=c.indexOf("{{"),d=c.indexOf("}}",f+2),f>-1&&d>-1?(g=a.trim(c.substring(f+2,d)),g=void 0!==b[g]?b[g]:"",c=c.substring(0,f)+g+c.substring(d+2)):e=!0}for(var e=!1;!e&&c.search("{{")>=0;)d(c);return c}a.fn.repeater&&(a.fn.repeater.Constructor.prototype.thumbnail_clearSelectedItems=function(){this.$canvas.find(".repeater-thumbnail-cont .selectable.selected").removeClass("selected")},a.fn.repeater.Constructor.prototype.thumbnail_getSelectedItems=function(){var b=[];return this.$canvas.find(".repeater-thumbnail-cont .selectable.selected").each(function(){b.push(a(this))}),b},a.fn.repeater.Constructor.prototype.thumbnail_setSelectedItems=function(b,c){function d(){return j===b[g].index?(h=a(this),!1):void j++}function e(){h=a(this),h.is(b[g].selector)&&f(h,b[g].selected)}function f(a,b){b=void 0===b||b,b?(c||"multi"===k||l.thumbnail_clearSelectedItems(),a.addClass("selected")):a.removeClass("selected")}var g,h,i,j,k=this.viewOptions.thumbnail_selectable,l=this;for(a.isArray(b)||(b=[b]),i=c===!0||"multi"===k?b.length:k&&b.length>0?1:0,g=0;g<i;g++)void 0!==b[g].index?(h=a(),j=0,this.$canvas.find(".repeater-thumbnail-cont .selectable").each(d),h.length>0&&f(h,b[g].selected)):b[g].selector&&this.$canvas.find(".repeater-thumbnail-cont .selectable").each(e)},a.fn.repeater.defaults=a.extend({},a.fn.repeater.defaults,{thumbnail_alignment:"left",thumbnail_infiniteScroll:!1,thumbnail_itemRendered:null,thumbnail_noItemsHTML:"no items found",thumbnail_selectable:!1,thumbnail_template:'<div class="thumbnail repeater-thumbnail"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>'}),a.fn.repeater.viewTypes.thumbnail={selected:function(){var a,b=this.viewOptions.thumbnail_infiniteScroll;b&&(a="object"==typeof b?b:{},this.infiniteScrolling(!0,a))},before:function(b){var c,d,e=this.viewOptions.thumbnail_alignment,f=this.$canvas.find(".repeater-thumbnail-cont"),g=b.data,h={};return f.length<1?(f=a('<div class="clearfix repeater-thumbnail-cont" data-container="true" data-infinite="true" data-preserve="shallow"></div>'),e&&"none"!==e?(d={center:1,justify:1,left:1,right:1},e=d[e]?e:"justify",f.addClass("align-"+e),this.thumbnail_injectSpacers=!0):this.thumbnail_injectSpacers=!1,h.item=f):h.action="none",g.items&&g.items.length<1?(c=a('<div class="empty"></div>'),c.append(this.viewOptions.thumbnail_noItemsHTML),f.append(c)):f.find(".empty:first").remove(),h},renderItem:function(c){var d=this.viewOptions.thumbnail_selectable,e="selected",f=this,g=a(b(c.subset[c.index],this.viewOptions.thumbnail_template));return d&&(g.addClass("selectable"),g.on("click",function(){g.hasClass(e)?(g.removeClass(e),f.$element.trigger("deselected.fu.repeaterThumbnail",g)):("multi"!==d&&f.$canvas.find(".repeater-thumbnail-cont .selectable.selected").each(function(){var b=a(this);b.removeClass(e),f.$element.trigger("deselected.fu.repeaterThumbnail",b)}),g.addClass(e),f.$element.trigger("selected.fu.repeaterThumbnail",g))})),c.container.append(g),this.thumbnail_injectSpacers&&g.after('<span class="spacer">&nbsp;</span>'),this.viewOptions.thumbnail_itemRendered&&this.viewOptions.thumbnail_itemRendered({container:c.container,item:g,itemData:c.subset[c.index]},function(){}),!1}})});