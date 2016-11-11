!function(a){"function"==typeof define&&define.amd?define(["jquery","fuelux/dropdown-autoflip"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){if(!a.fn.dropdownautoflip)throw new Error("Fuel UX pillbox control requires dropdown-autoflip.");var b=a.fn.pillbox,c=function(b,c){this.$element=a(b),this.$moreCount=this.$element.find(".pillbox-more-count"),this.$pillGroup=this.$element.find(".pill-group"),this.$addItem=this.$element.find(".pillbox-add-item"),this.$addItemWrap=this.$addItem.parent(),this.$suggest=this.$element.find(".suggest"),this.$pillHTML='<li class="btn btn-default pill">\t<span></span>\t<span class="glyphicon glyphicon-close">\t\t<span class="sr-only">Remove</span>\t</span></li>',this.options=a.extend({},a.fn.pillbox.defaults,c),this.options.readonly===-1?void 0!==this.$element.attr("data-readonly")&&this.readonly(!0):this.options.readonly&&this.readonly(!0),this.acceptKeyCodes=this._generateObject(this.options.acceptKeyCodes),this.$element.on("click.fu.pillbox",".pill-group > .pill",a.proxy(this.itemClicked,this)),this.$element.on("click.fu.pillbox",a.proxy(this.inputFocus,this)),this.$element.on("keydown.fu.pillbox",".pillbox-add-item",a.proxy(this.inputEvent,this)),this.options.onKeyDown&&this.$element.on("mousedown.fu.pillbox",".suggest > li",a.proxy(this.suggestionClick,this)),this.options.edit&&(this.$element.addClass("pills-editable"),this.$element.on("blur.fu.pillbox",".pillbox-add-item",a.proxy(this.cancelEdit,this)))};c.prototype={constructor:c,destroy:function(){return this.$element.remove(),this.$element[0].outerHTML},items:function(){var b=this;return this.$pillGroup.children(".pill").map(function(){return b.getItemData(a(this))}).get()},itemClicked:function(b){var c,d=a(b.target);if(b.preventDefault(),b.stopPropagation(),this._closeSuggestions(),d.hasClass("pill"))c=d;else if(c=d.parent(),void 0===this.$element.attr("data-readonly")){if(d.hasClass("glyphicon-close"))return this.options.onRemove?this.options.onRemove(this.getItemData(c,{el:c}),a.proxy(this._removeElement,this)):this._removeElement(this.getItemData(c,{el:c})),!1;if(this.options.edit){if(c.find(".pillbox-list-edit").length)return!1;this.openEdit(c)}}this.$element.trigger("clicked.fu.pillbox",this.getItemData(c))},readonly:function(a){a?this.$element.attr("data-readonly","readonly"):this.$element.removeAttr("data-readonly"),this.options.truncate&&this.truncate(a)},suggestionClick:function(b){var c=a(b.currentTarget),d={text:c.html(),value:c.data("value")};b.preventDefault(),this.$addItem.val(""),c.data("attr")&&(d.attr=JSON.parse(c.data("attr"))),d.data=c.data("data"),this.addItems(d,!0),this._closeSuggestions()},itemCount:function(){return this.$pillGroup.children(".pill").length},addItems:function(){var b,c,d,e=this;!isFinite(String(arguments[0]))||arguments[0]instanceof Array?(b=[].slice.call(arguments).slice(0),d=b[1]&&!b[1].text):(b=[].slice.call(arguments).slice(1),c=arguments[0]),b[0]instanceof Array&&(b=b[0]),b.length&&(a.each(b,function(a,c){var d={text:c.text,value:c.value?c.value:c.text,el:e.$pillHTML};c.attr&&(d.attr=c.attr),c.data&&(d.data=c.data),b[a]=d}),this.options.edit&&this.currentEdit&&(b[0].el=this.currentEdit.wrap("<div></div>").parent().html()),d&&b.pop(1),e.options.onAdd&&d?this.options.edit&&this.currentEdit?e.options.onAdd(b[0],a.proxy(e.saveEdit,this)):e.options.onAdd(b[0],a.proxy(e.placeItems,this)):this.options.edit&&this.currentEdit?e.saveEdit(b):c?e.placeItems(c,b):e.placeItems(b,d))},removeItems:function(a,b){var c,d,e=this;if(a)for(b=b?b:1,c=0;c<b&&(d=e.$pillGroup.find("> .pill:nth-child("+a+")"),d);c++)d.remove();else this.$pillGroup.find(".pill").remove(),this._removePillTrigger({method:"removeAll"})},placeItems:function(){var b,c,d,e,f=[];!isFinite(String(arguments[0]))||arguments[0]instanceof Array?(b=[].slice.call(arguments).slice(0),e=b[1]&&!b[1].text):(b=[].slice.call(arguments).slice(1),c=arguments[0]),b[0]instanceof Array&&(b=b[0]),b.length&&(a.each(b,function(b,c){var d=a(c.el);d.attr("data-value",c.value),d.find("span:first").html(c.text),c.attr&&a.each(c.attr,function(a,b){"cssClass"===a||"class"===a?d.addClass(b):d.attr(a,b)}),c.data&&d.data("data",c.data),f.push(d)}),this.$pillGroup.children(".pill").length>0?c?(d=this.$pillGroup.find(".pill:nth-child("+c+")"),d.length?d.before(f):this.$pillGroup.children(".pill:last").after(f)):this.$pillGroup.children(".pill:last").after(f):this.$pillGroup.prepend(f),e&&this.$element.trigger("added.fu.pillbox",{text:b[0].text,value:b[0].value}))},inputEvent:function(a){var b,c,d,e,f=this,g=this.$addItem.val();if(this.acceptKeyCodes[a.keyCode])return this.options.onKeyDown&&this._isSuggestionsOpen()&&(e=this.$suggest.find(".pillbox-suggest-sel"),e.length&&(g=e.html(),b=e.data("value"),c=e.data("attr"))),(g.replace(/[ ]*\,[ ]*/,"").match(/\S/)||this.options.allowEmptyPills&&g.length)&&(this._closeSuggestions(),this.$addItem.hide(),c?this.addItems({text:g,value:b,attr:JSON.parse(c)},!0):this.addItems({text:g,value:b},!0),setTimeout(function(){f.$addItem.show().val("").attr({size:10})},0)),a.preventDefault(),!0;if(8===a.keyCode||46===a.keyCode){if(!g.length)return a.preventDefault(),this.options.edit&&this.currentEdit?(this.cancelEdit(),!0):(this._closeSuggestions(),d=this.$pillGroup.children(".pill:last"),d.hasClass("pillbox-highlight")?this._removeElement(this.getItemData(d,{el:d})):d.addClass("pillbox-highlight"),!0)}else g.length>10&&this.$addItem.width()<this.$pillGroup.width()-6&&this.$addItem.attr({size:g.length+3});if(this.$pillGroup.find(".pill").removeClass("pillbox-highlight"),this.options.onKeyDown){if(9===a.keyCode||38===a.keyCode||40===a.keyCode)return this._isSuggestionsOpen()&&this._keySuggestions(a),!0;this.callbackId=a.timeStamp,this.options.onKeyDown({event:a,value:g},function(b){f._openSuggestions(a,b)})}},openEdit:function(a){var b=a.index()+1,c=this.$addItemWrap.detach().hide();this.$pillGroup.find(".pill:nth-child("+b+")").before(c),this.currentEdit=a.detach(),c.addClass("editing"),this.$addItem.val(a.find("span:first").html()),c.show(),this.$addItem.focus().select()},cancelEdit:function(a){var b;return!!this.currentEdit&&(this._closeSuggestions(),a&&this.$addItemWrap.before(this.currentEdit),this.currentEdit=!1,b=this.$addItemWrap.detach(),b.removeClass("editing"),this.$addItem.val(""),void this.$pillGroup.append(b))},saveEdit:function(){var b=arguments[0][0]?arguments[0][0]:arguments[0];this.currentEdit=a(b.el),this.currentEdit.data("value",b.value),this.currentEdit.find("span:first").html(b.text),this.$addItemWrap.hide(),this.$addItemWrap.before(this.currentEdit),this.currentEdit=!1,this.$addItem.val(""),this.$addItemWrap.removeClass("editing"),this.$pillGroup.append(this.$addItemWrap.detach().show()),this.$element.trigger("edited.fu.pillbox",{value:b.value,text:b.text})},removeBySelector:function(){var b=[].slice.call(arguments).slice(0),c=this;a.each(b,function(a,b){c.$pillGroup.find(b).remove()}),this._removePillTrigger({method:"removeBySelector",removedSelectors:b})},removeByValue:function(){var b=[].slice.call(arguments).slice(0),c=this;a.each(b,function(a,b){c.$pillGroup.find('> .pill[data-value="'+b+'"]').remove()}),this._removePillTrigger({method:"removeByValue",removedValues:b})},removeByText:function(){var b=[].slice.call(arguments).slice(0),c=this;a.each(b,function(a,b){c.$pillGroup.find('> .pill:contains("'+b+'")').remove()}),this._removePillTrigger({method:"removeByText",removedText:b})},truncate:function(b){var c,d,e,f,g,h=this;this.$element.removeClass("truncate"),this.$addItemWrap.removeClass("truncated"),this.$pillGroup.find(".pill").removeClass("truncated"),b&&(this.$element.addClass("truncate"),c=this.$element.width(),d=!1,e=0,f=this.$pillGroup.find(".pill").length,g=0,this.$pillGroup.find(".pill").each(function(){var b=a(this);d?b.addClass("truncated"):(e++,h.$moreCount.text(f-e),g+b.outerWidth(!0)+h.$addItemWrap.outerWidth(!0)<=c?g+=b.outerWidth(!0):(h.$moreCount.text(f-e+1),b.addClass("truncated"),d=!0))}),e===f&&this.$addItemWrap.addClass("truncated"))},inputFocus:function(a){this.$element.find(".pillbox-add-item").focus()},getItemData:function(b,c){return a.extend({text:b.find("span:first").html()},b.data(),c)},_removeElement:function(a){a.el.remove(),delete a.el,this.$element.trigger("removed.fu.pillbox",a)},_removePillTrigger:function(a){this.$element.trigger("removed.fu.pillbox",a)},_generateObject:function(b){var c={};return a.each(b,function(a,b){c[b]=!0}),c},_openSuggestions:function(b,c){var d=a("<ul>");return this.callbackId===b.timeStamp&&void(c.data&&c.data.length&&(a.each(c.data,function(b,c){var e=c.value?c.value:c.text,f=a('<li data-value="'+e+'">'+c.text+"</li>");c.attr&&f.data("attr",JSON.stringify(c.attr)),c.data&&f.data("data",c.data),d.append(f)}),this.$suggest.html("").append(d.children()),a(document.body).trigger("suggested.fu.pillbox",this.$suggest)))},_closeSuggestions:function(){this.$suggest.html("").parent().removeClass("open")},_isSuggestionsOpen:function(){return this.$suggest.parent().hasClass("open")},_keySuggestions:function(a){var b,c=this.$suggest.find("li.pillbox-suggest-sel"),d=38===a.keyCode;a.preventDefault(),c.length?(b=d?c.prev():c.next(),b.length||(b=d?this.$suggest.find("li:last"):this.$suggest.find("li:first")),b&&(b.addClass("pillbox-suggest-sel"),c.removeClass("pillbox-suggest-sel"))):(c=this.$suggest.find("li:first"),c.addClass("pillbox-suggest-sel"))}},a.fn.pillbox=function(b){var d,e=Array.prototype.slice.call(arguments,1),f=this.each(function(){var f=a(this),g=f.data("fu.pillbox"),h="object"==typeof b&&b;g||f.data("fu.pillbox",g=new c(this,h)),"string"==typeof b&&(d=g[b].apply(g,e))});return void 0===d?f:d},a.fn.pillbox.defaults={onAdd:void 0,onRemove:void 0,onKeyDown:void 0,edit:!1,readonly:-1,truncate:!1,acceptKeyCodes:[13,188],allowEmptyPills:!1},a.fn.pillbox.Constructor=c,a.fn.pillbox.noConflict=function(){return a.fn.pillbox=b,this},a(document).on("mousedown.fu.pillbox.data-api","[data-initialize=pillbox]",function(b){var c=a(b.target).closest(".pillbox");c.data("fu.pillbox")||c.pillbox(c.data())}),a(function(){a("[data-initialize=pillbox]").each(function(){var b=a(this);b.data("fu.pillbox")||b.pillbox(b.data())})})});