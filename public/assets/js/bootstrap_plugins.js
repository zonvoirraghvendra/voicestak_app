// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

(function(){var d;window.AmCharts?d=window.AmCharts:(d={},window.AmCharts=d,d.themes={},d.maps={},d.inheriting={},d.charts=[],d.onReadyArray=[],d.useUTC=!1,d.updateRate=30,d.uid=0,d.lang={},d.translations={},d.mapTranslations={},d.windows={},d.initHandlers=[]);d.Class=function(a){var b=function(){arguments[0]!==d.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(d.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,a,b);this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events)for(a=a.events[b],b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var c=this.events[a],d=0,k=c.length;d<k;d++){var l=c[d];l.handler.call(l.scope,b)}});for(var c in a)b.prototype[c]=a[c];return b};d.addChart=function(a){d.updateInt||(d.updateInt=setInterval(function(){d.update()},Math.round(1E3/d.updateRate)));d.charts.push(a)};d.removeChart=function(a){for(var b=d.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);0===b.length&&d.updateInt&&(clearInterval(d.updateInt),d.updateInt=NaN)};d.isModern=!0;d.getIEVersion=function(){var a=0,b,c;"Microsoft Internet Explorer"==navigator.appName&&(b=navigator.userAgent,c=/MSIE ([0-9]{1,}[.0-9]{0,})/,null!==c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};d.applyLang=function(a,b){var c=d.translations;b.dayNames=d.extend({},d.dayNames);b.shortDayNames=d.extend({},d.shortDayNames);b.monthNames=d.extend({},d.monthNames);b.shortMonthNames=d.extend({},d.shortMonthNames);c&&(c=c[a])&&(d.lang=c,c.monthNames&&(b.dayNames=d.extend({},c.dayNames),b.shortDayNames=d.extend({},c.shortDayNames),b.monthNames=d.extend({},c.monthNames),b.shortMonthNames=d.extend({},c.shortMonthNames)))};d.IEversion=d.getIEVersion();9>d.IEversion&&0<d.IEversion&&(d.isModern=!1,d.isIE=!0);d.dx=0;d.dy=0;if(document.addEventListener||window.opera)d.isNN=!0,d.isIE=!1,d.dx=.5,d.dy=.5;document.attachEvent&&(d.isNN=!1,d.isIE=!0,d.isModern||(d.dx=0,d.dy=0));window.chrome&&(d.chrome=!0);d.handleMouseUp=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleReleaseOutside&&e.handleReleaseOutside(a)}};d.handleMouseMove=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleMouseMove&&e.handleMouseMove(a)}};d.handleWheel=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];if(e&&e.mouseIsOver){e.mouseWheelScrollEnabled||e.mouseWheelZoomEnabled?e.handleWheel&&e.handleWheel(a):a.stopPropagation&&a.stopPropagation();break}}};d.resetMouseOver=function(){for(var a=d.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};d.ready=function(a){d.onReadyArray.push(a)};d.handleLoad=function(){d.isReady=!0;for(var a=d.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(d.processDelay)?c():setTimeout(c,d.processDelay*b)}};d.addInitHandler=function(a,b){d.initHandlers.push({method:a,types:b})};d.callInitHandler=function(a){var b=d.initHandlers;if(d.initHandlers)for(var c=0;c<b.length;c++){var e=b[c];e.types?d.isInArray(e.types,a.type)&&e.method(a):e.method(a)}};d.getUniqueId=function(){d.uid++;return"AmChartsEl-"+d.uid};d.isNN&&(document.addEventListener("mousemove",d.handleMouseMove,!0),document.addEventListener("mouseup",d.handleMouseUp,!0),window.addEventListener("load",d.handleLoad,!0),window.addEventListener("DOMMouseScroll",d.handleWheel,!0),document.addEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.attachEvent("onmousemove",d.handleMouseMove),document.attachEvent("onmouseup",d.handleMouseUp),window.attachEvent("onload",d.handleLoad));d.clear=function(){var a=d.charts;if(a)for(var b=a.length-1;0<=b;b--)a[b].clear();d.updateInt&&clearInterval(d.updateInt);d.charts=[];d.isNN&&(document.removeEventListener("mousemove",d.handleMouseMove,!0),document.removeEventListener("mouseup",d.handleMouseUp,!0),window.removeEventListener("load",d.handleLoad,!0),window.removeEventListener("DOMMouseScroll",d.handleWheel,!0),document.removeEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.detachEvent("onmousemove",d.handleMouseMove),document.detachEvent("onmouseup",d.handleMouseUp),window.detachEvent("onload",d.handleLoad))};d.makeChart=function(a,b,c){var e=b.type,h=b.theme;d.isString(h)&&(h=d.themes[h],b.theme=h);var f;switch(e){case"serial":f=new d.AmSerialChart(h);break;case"xy":f=new d.AmXYChart(h);break;case"pie":f=new d.AmPieChart(h);break;case"radar":f=new d.AmRadarChart(h);break;case"gauge":f=new d.AmAngularGauge(h);break;case"funnel":f=new d.AmFunnelChart(h);break;case"map":f=new d.AmMap(h);break;case"stock":f=new d.AmStockChart(h);break;case"gantt":f=new d.AmGanttChart(h)}d.extend(f,b);d.isReady?isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c):d.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c)});return f};d.realWrite=function(a,b){a.write(b)};d.updateCount=0;d.validateAt=Math.round(d.updateRate/5);d.update=function(){var a=d.charts;d.updateCount++;var b=!1;d.updateCount==d.validateAt&&(b=!0,d.updateCount=0);if(a)for(var c=0;c<a.length;c++)a[c].update&&a[c].update(),b&&a[c].autoResize&&a[c].validateSize&&a[c].validateSize()};d.bezierX=3;d.bezierY=6})();(function(){var d=window.AmCharts;d.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(a)}};d.removeFromArray=function(a,b){var c;if(void 0!==b&&void 0!==a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};d.getPath=function(){var a=document.getElementsByTagName("script");if(a)for(var b=0;b<a.length;b++){var c=a[b].src;if(-1!==c.search(/\/(amcharts|ammap)\.js/))return c.replace(/\/(amcharts|ammap)\.js.*/,"/")}};d.normalizeUrl=function(a){return""!==a&&-1===a.search(/\/$/)?a+"/":a};d.isAbsolute=function(a){return 0===a.search(/^http[s]?:|^\//)};d.isInArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1};d.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};d.wrappedText=function(a,b,c,e,h,f,g,k,l){var m=d.text(a,b,c,e,h,f,g),n="\n";d.isModern||(n="<br>");if(10<l)return m;if(m){var q=m.getBBox();if(q.width>k){q=Math.ceil(q.width/k);m.remove();for(var m=[],p=0;-1<(p=b.indexOf(" ",p));)m.push(p),p+=1;for(var r,p=0;p<m.length;p+=Math.ceil(m.length/q))r=m[p],b=b.substr(0,r)+n+b.substr(r+1);if(isNaN(r)){if(0===l)for(p=1;p<q;p++)r=Math.round(b.length/q*p),b=b.substr(0,r)+n+b.substr(r);return d.text(a,b,c,e,h,f,g)}return d.wrappedText(a,b,c,e,h,f,g,k,l+1)}return m}};d.getStyle=function(a,b){var c="";document.defaultView&&document.defaultView.getComputedStyle?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};d.removePx=function(a){if(void 0!==a)return Number(a.substring(0,a.length-2))};d.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=d.windows[b])?c.opener&&!c.opener.closed?c.location.href=a:d.windows[b]=window.open(a):d.windows[b]=window.open(a)}else window.location.href=a};d.ifArray=function(a){return a&&0<a.length?!0:!1};d.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var e=b[c];if(e){if(e[a])e[a]();var h=e.length;if(0<h){var d;for(d=0;d<h;d++){var g=e[d];if(g&&g[a])g[a]()}}}}};d.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};d.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};d.toCoordinate=function(a,b,c){var e;void 0!==a&&(a=String(a),c&&c<b&&(b=c),e=Number(a),-1!=a.indexOf("!")&&(e=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(e=b*Number(a.substr(0,a.length-1))/100));return e};d.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};d.isDefined=function(a){return void 0===a?!1:!0};d.stripNumbers=function(a){return a.replace(/[0-9]+/g,
"")};d.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};d.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var e=c.length;if(e<b){var h;for(h=0;h<b-e;h++)c="0"+c}e=c.substring(0,c.length-b);""===e&&(e=0);return e+"."+c.substring(c.length-b,c.length)}return String(c)};d.formatDuration=function(a,b,c,e,h,f){var g=d.intervals,k=f.decimalSeparator;if(a>=g[b].contains){var l=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b&&(l=d.formatNumber(l,
f),1==l.split(k)[0].length&&(l="0"+l));("mm"==b||"hh"==b)&&10>l&&(l="0"+l);c=l+""+e[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return d.formatDuration(a,b,c,e,h,f)}"ss"==b&&(a=d.formatNumber(a,f),1==a.split(k)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+e[b]+""+c;if(g[h].count>g[b].count)for(a=g[b].count;a<g[h].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+e[b]+""+c:"DD"==b&&(c="0"+e[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-
1));return c};d.formatNumber=function(a,b,c,e,h){a=d.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var k=String(a),l=!1;-1!=k.indexOf("e")&&(l=!0);0<=c&&!l&&(k=d.toFixed(a,c));var m="";if(l)m=k;else{var k=k.split("."),l=String(k[0]),n;for(n=l.length;0<=n;n-=3)m=n!=l.length?0!==n?l.substring(n-3,n)+b+m:l.substring(n-3,n)+m:l.substring(n-3,n);void 0!==k[1]&&(m=m+f+k[1]);void 0!==c&&0<c&&"0"!=m&&(m=d.addZeroes(m,f,c))}m=g+m;""===g&&!0===e&&0!==a&&(m="+"+m);!0===h&&(m+="%");return m};d.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",d.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};d.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var e=0;b=a[0].split(".");b[1]&&(e=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-
e;c++)b+="0"}return b};d.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=String(e).split(".").join(b);return String(e)+"e"+c};d.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};d.hitTest=function(a,b,c){var e=!1,h=a.x,f=a.x+a.width,g=a.y,k=a.y+a.height,l=d.isInRectangle;e||(e=l(h,g,b));e||(e=l(h,k,b));e||(e=l(f,g,b));e||(e=l(f,k,b));e||!0===c||(e=d.hitTest(b,a,!0));return e};d.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};d.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};d.findPosX=function(a){var b=a,c=a.offsetLeft;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetLeft;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollLeft||0}return c};d.findPosY=function(a){var b=a,c=a.offsetTop;if(a.offsetParent){for(;a=a.offsetParent;)c+=a.offsetTop;for(;(b=b.parentNode)&&b!=document.body;)c-=b.scrollTop||0}return c};d.findIfFixed=function(a){if(a.offsetParent)for(;a=a.offsetParent;)if("fixed"==d.getStyle(a,"position"))return!0;return!1};d.findIfAuto=function(a){return a.style&&"auto"==d.getStyle(a,"overflow")?!0:a.parentNode?d.findIfAuto(a.parentNode):!1};d.findScrollLeft=function(a,b){a.scrollLeft&&(b+=a.scrollLeft);return a.parentNode?d.findScrollLeft(a.parentNode,b):b};d.findScrollTop=function(a,b){a.scrollTop&&(b+=a.scrollTop);return a.parentNode?d.findScrollTop(a.parentNode,b):b};d.formatValue=function(a,b,c,e,h,f,g,k){if(b){void 0===h&&(h="");var l;for(l=0;l<c.length;l++){var m=c[l],n=b[m];void 0!==n&&(n=f?d.addPrefix(n,k,g,e):d.formatNumber(n,e),a=a.replace(new RegExp("\\[\\["+h+""+m+"\\]\\]","g"),n))}}return a};d.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),e;for(e=0;e<c.length;e++){var h=c[e],h=h.substr(2,h.length-4);void 0!==b[h]&&(a=a.replace(new RegExp("\\[\\["+h+"\\]\\]","g"),b[h]))}}return a};d.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var e=b[c];void 0===e&&(e="");a=a.replace(c,e)}return a};d.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};d.addPrefix=function(a,b,c,e,h){var f=d.formatNumber(a,e),g="",k,l,m;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(k=b.length-1;-1<k;k--){if(a>=b[k].number&&(l=a/b[k].number,m=Number(e.precision),1>m&&(m=1),c=d.roundTo(l,m),m=d.formatNumber(c,{precision:-1,decimalSeparator:e.decimalSeparator,thousandsSeparator:e.thousandsSeparator}),!h||l==c)){f=g+""+m+""+b[k].prefix;break}}else for(k=0;k<c.length;k++)if(a<=c[k].number){l=a/c[k].number;m=Math.abs(Math.round(Math.log(l)*Math.LOG10E));l=d.roundTo(l,m);f=g+""+l+""+c[k].prefix;break}return f};d.remove=function(a){a&&a.remove()};d.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};d.getObjById=function(a,b){var c,e;for(e=0;e<a.length;e++){var h=a[e];h.id==b&&(c=h)}return c};d.applyTheme=function(a,b,c){b||(b=d.theme);b&&b[c]&&d.extend(a,b[c])};d.isString=function(a){return"string"==typeof a?!0:!1};d.extend=function(a,b,c){var e;a||(a={});for(e in b)c?a.hasOwnProperty(e)||(a[e]=b[e]):a[e]=b[e];return a};d.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};d.processObject=function(a,b,c,e){!1===a instanceof b&&(a=e?d.extend(new b(c),a):d.extend(a,new b(c),!0));return a};d.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};d.fixBrakes=function(a){if(d.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=d.fixNewLines(a);return a};d.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)d.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a)a[c]&&("object"==typeof a[c]&&d.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(e){}}};d.bounce=function(a,b,c,e,h){return(b/=h)<1/2.75?7.5625*e*b*b+c:b<2/2.75?e*(7.5625*(b-=1.5/2.75)*b+.75)+
c:b<2.5/2.75?e*(7.5625*(b-=2.25/2.75)*b+.9375)+c:e*(7.5625*(b-=2.625/2.75)*b+.984375)+c};d.easeInSine=function(a,b,c,e,h){return-e*Math.cos(b/h*(Math.PI/2))+e+c};d.easeOutSine=function(a,b,c,e,h){return e*Math.sin(b/h*(Math.PI/2))+c};d.easeOutElastic=function(a,b,c,e,h){a=1.70158;var d=0,g=e;if(0===b)return c;if(1==(b/=h))return c+e;d||(d=.3*h);g<Math.abs(e)?(g=e,a=d/4):a=d/(2*Math.PI)*Math.asin(e/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*h-a)*Math.PI/d)+e+c};d.fixStepE=function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);9==Number(a[0])&&b++;return d.generateNumber(1,b)};d.generateNumber=function(a,b){var c="",e;e=0>b?Math.abs(b)-1:Math.abs(b);var h;for(h=0;h<e;h++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)};d.setCN=function(a,b,c,e){if(a.addClassNames&&b&&(b=b.node)&&c){var h=b.getAttribute("class");a=a.classNamePrefix+"-";e&&(a="");h?b.setAttribute("class",h+" "+a+c):b.setAttribute("class",a+c)}};d.parseDefs=function(a,b){for(var c in a){var e=typeof a[c];if(0<a[c].length&&"object"==e)for(var h=0;h<a[c].length;h++)e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c][h],e);else"object"==e?(e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c],e)):b.setAttribute(c,a[c])}}})();(function(){var d=window.AmCharts;d.AxisBase=d.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem");this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;this.bcn="axis-";this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={fff:"ss",ss:"mm",mm:"hh",hh:"DD",DD:"MM",MM:"YYYY"};d.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=Math.max(a,1)):this.gridCountR=this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;this.titleLabel=null;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var e=this.titleFontSize;isNaN(e)&&(e=b.fontSize+1);a=d.text(b.container,a,c,b.fontFamily,e,this.titleAlign,this.titleBold);d.setCN(b,a,this.bcn+"title");this.titleLabel=a}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,e=this.labelsSet,h={};0<e.length()?h=e.getBBox():(h.x=0,h.y=0,h.width=this.viW,h.height=this.viH,d.VML&&(h.y+=this.y,h.x+=this.x));e.push(a);var e=h.x,f=h.y;d.VML&&(this.rotate?e-=this.x:f-=this.y);var g=h.width,h=h.height,k=this.viW,l=this.viH,m=0,n=a.getBBox().height/2,q=this.inside,p=this.titleAlign;switch(this.position){case"top":b="left"==p?-1:"right"==p?k:k/2;c=f-10-n;break;case"bottom":b="left"==p?-1:"right"==p?k:k/2;c=f+h+10+n;break;case"left":b=e-10-n;q&&(b-=5);c="left"==p?l+1:"right"==p?-1:l/2;m=-90;break;case"right":b=e+g+10+n-3,q&&(b+=7),c="left"==p?l+2:"right"==p?-2:l/2,m=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!==m&&a.rotate(m)}},pushAxisItem:function(a,b){var c=this,e=a.graphics();0<e.length()&&(b?c.labelsSet.push(e):c.set.push(e));if(e=a.getLabel())this.labelsSet.push(e),e.click(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,a,"rollOutItem")})},handleMouse:function(a,b,c){this.fire(c,{type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,e=b.length,h=0;h<b.length;h++)b[h]==a&&(c=!0,e=h);a=d.processObject(a,d.Guide,this.theme);a.id||(a.id="guideAuto"+e+"_"+(new Date).getTime());c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),c=b.x+b.width/2,b=b.y+b.height/2,e=a.fillColor;void 0===e&&(e=a.lineColor);this.chart.showBalloon(a.balloonText,e,!0,c,b)},handleGuideOut:function(){this.chart.hideBalloon()},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.touchstart(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();d.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height});return a},destroy:function(){d.remove(this.set);d.remove(this.labelsSet);var a=this.axisLine;a&&d.remove(a.set);d.remove(this.grid0)},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},parseDatesDraw:function(){var a,b=this.chart,c=this.showFirstLabel,e=this.showLastLabel,h,f="",g=d.extractPeriod(this.minPeriod),k=d.getPeriodDuration(g.period,g.count),l,m,n,q,p,r=this.firstDayOfWeek,t=this.boldPeriodBeginning;a=this.minorGridEnabled;var u,z=this.gridAlpha,v,w=this.choosePeriod(0),x=w.period,w=w.count,A=d.getPeriodDuration(x,w);A<k&&(x=g.period,w=g.count,A=k);g=x;"WW"==g&&(g="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var B=Math.ceil(this.timeDifference/A)+5,D=l=d.resetDateToMin(new Date(this.startTime-A),x,w,r).getTime();g==x&&1==w&&this.centerLabelOnFullPeriod&&(n=A*this.stepWidth);this.cellWidth=k*this.stepWidth;q=Math.round(l/A);k=-1;q/2==Math.round(q/2)&&(k=-2,l-=A);q=this.firstTime;var C=0;a&&1<w&&(u=this.chooseMinorFrequency(w),v=d.getPeriodDuration(x,u));if(0<this.gridCountR)for(a=k;a<=B;a++){p=q+A*(a+Math.floor((D-q)/A))-C;"DD"==x&&(p+=36E5);p=d.resetDateToMin(new Date(p),x,w,r).getTime();"MM"==x&&(h=(p-l)/A,1.5<=(p-l)/A&&(p=p-(h-1)*A+d.getPeriodDuration("DD",3),p=d.resetDateToMin(new Date(p),x,1).getTime(),C+=A));h=(p-this.startTime)*this.stepWidth;h=this.rotate?h+(this.x-this.viX):"date"==this.type?this.axisWidth-h+(this.y-this.viY):h+(this.y-this.viY);f=!1;this.nextPeriod[g]&&(f=this.checkPeriodChange(this.nextPeriod[g],
1,p,l,g));l=!1;f&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[g]],this.twoLineMode&&(f=this.dateFormatsObject[g]+"\n"+f,f=d.fixBrakes(f)),l=!0):f=this.dateFormatsObject[g];t||(l=!1);this.currentDateFormat=f;f=d.formatDate(new Date(p),f,b);if(a==k&&!c||a==B&&!e)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(p),this,x,w,m).toString());this.boldLabels&&(l=!0);m=new this.axisItemRenderer(this,h,f,!1,n,0,!1,l);this.pushAxisItem(m);m=l=p;if(!isNaN(u))for(h=1;h<w;h+=u)this.gridAlpha=this.minorGridAlpha,f=p+v*h,f=d.resetDateToMin(new Date(f),x,u,r).getTime(),f=new this.axisItemRenderer(this,(f-this.startTime)*this.stepWidth,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(f);this.gridAlpha=z}},choosePeriod:function(a){var b=d.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=Math.ceil(this.timeDifference/b),e=this.periods;return this.timeDifference<b&&0<a?e[a-1]:c<=this.gridCountR?e[a]:a+1<e.length?this.choosePeriod(a+1):e[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=d.extractPeriod(this.minPeriod);return d.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,e,h){c=new Date(c);var f=new Date(e),g=this.firstDayOfWeek;e=b;"DD"==a&&(b=1);c=d.resetDateToMin(c,a,b,g).getTime();b=d.resetDateToMin(f,a,b,g).getTime();return"DD"==a&&"hh"!=h&&c-b<=d.getPeriodDuration(a,e)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}}})})();(function(){var d=window.AmCharts;d.ValueAxis=d.Class({inherits:d.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");d.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.minMaxMultiplier=1;this.logGridLimit=2;this.totalTextOffset=this.treatZeroAs=0;this.minPeriod="ss";d.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();this.synchronizationMultiplier&&this.synchronizeWith?(d.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax())},draw:function(){d.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;d.setCN(a,this.set,"value-axis value-axis-"+this.id);d.setCN(a,this.labelsSet,"value-axis value-axis-"+this.id);d.setCN(a,this.axisLine.axisSet,"value-axis value-axis-"+this.id);var c=this.type;"duration"==c&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);"date"==c&&(this.logarithmic=!1,this.min=this.minRR,this.max=this.maxRR,this.minimumDate&&(this.min=this.minimumDate.getTime()),this.maximumDate&&(this.max=this.maximumDate.getTime()));if(this.logarithmic){var e=this.treatZeroAs,h=this.getMin(0,this.data.length-1);this.minReal<h&&(this.minReal=h);isNaN(this.minReal)&&(this.minReal=h);0<e&&0===h&&(this.minReal=h=e);if(0>=h||0>=this.minimum){this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var f,g,k=a.dx,l=a.dy,e=!1,h=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)e=!0;else{var m=this.labelFrequency,n=this.showFirstLabel,q=this.showLastLabel,p=1;f=0;this.minCalc=this.min;this.maxCalc=this.max;this.strictMinMax&&(isNaN(this.minimum)||(this.min=this.minimum),isNaN(this.maximum)||(this.max=this.maximum));isNaN(this.minZoom)||(this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);var r=Math.round((this.maxCalc-this.minCalc)/this.step)+1,t;!0===h?(t=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/t,t>this.logGridLimit&&(r=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,f=Math.round(Math.log(this.minReal)*Math.LOG10E),r>this.gridCountR&&(p=Math.ceil(r/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);
var u=0;1>this.step&&-1<this.step&&(u=d.getDecimals(this.step));this.integersOnly&&(u=0);u>this.maxDecCount&&(u=this.maxDecCount);var z=this.precision;isNaN(z)||(u=z);this.max=d.roundTo(this.max,this.maxDecCount);this.min=d.roundTo(this.min,this.maxDecCount);g={};g.precision=u;g.decimalSeparator=a.nf.decimalSeparator;g.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=g;var v,w=this.guides,x=w.length;if(0<x){var A=this.fillAlpha;for(g=this.fillAlpha=0;g<x;g++){var B=w[g],D=NaN,C=B.above;isNaN(B.toValue)||(D=this.getCoordinate(B.toValue),v=new this.axisItemRenderer(this,D,"",!0,NaN,NaN,B),this.pushAxisItem(v,C));var I=NaN;isNaN(B.value)||(I=this.getCoordinate(B.value),v=new this.axisItemRenderer(this,I,B.label,!0,NaN,(D-I)/2,B),this.pushAxisItem(v,C));isNaN(D-I)||(v=new this.guideFillRenderer(this,I,D,B),this.pushAxisItem(v,C),v=v.graphics(),B.graphics=v,B.balloonText&&this.addEventListeners(v,B))}this.fillAlpha=A}this.exponential=!1;for(g=f;g<r;g+=p)w=d.roundTo(this.step*g+this.min,
u),-1!=String(w).indexOf("e")&&(this.exponential=!0);this.duration&&(this.maxInterval=d.getMaxInterval(this.max,this.duration));var u=this.step,H,w=this.minorGridAlpha;this.minorGridEnabled&&(H=this.getMinorGridStep(u,this.stepWidth*u));if("date"==c)this.generateDFObject(),this.timeDifference=this.max-this.min,this.maxTime=this.lastTime=this.max,this.startTime=this.firstTime=this.min,this.parseDatesDraw();else for(g=f;g<r;g+=p)if(c=u*g+this.minCalc,h&&this.max-this.min>10*this.min&&(c-=this.min),c=d.roundTo(c,this.maxDecCount+1),!this.integersOnly||Math.round(c)==c)if(isNaN(z)||Number(d.toFixed(c,z))==c){!0===h&&(0===c&&(c=this.minReal),t>this.logGridLimit&&(c=Math.pow(10,g)));v=this.formatValue(c,!1,g);Math.round(g/m)!=g/m&&(v=void 0);if(0===g&&!n||g==r-1&&!q)v=" ";f=this.getCoordinate(c);v=new this.axisItemRenderer(this,f,v,void 0,void 0,void 0,void 0,this.boldLabels);this.pushAxisItem(v);if(c==this.baseValue&&"radar"!=a.type){var O,J,A=this.viW,B=this.viH;v=this.viX;x=this.viY;"H"==this.orientation?0<=f&&f<=A+1&&(O=[f,f,f+k],J=[B,0,l]):0<=f&&f<=B+1&&(O=[0,A,A+k],J=[f,f,f+l]);O&&(f=d.fitToBounds(2*this.gridAlpha,0,1),f=d.line(a.container,O,J,this.gridColor,f,1,this.dashLength),f.translate(v,x),this.grid0=f,a.axesSet.push(f),f.toBack(),d.setCN(a,f,this.bcn+"zero-grid-"+this.id),d.setCN(a,f,this.bcn+"zero-grid"))}if(!isNaN(H)&&0<w&&g<r-1){f=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(v=1;v<u/H;v++)x=this.getCoordinate(c+H*v),x=new this.axisItemRenderer(this,x,"",!1,0,0,!1,!1,0,!0),this.pushAxisItem(x);this.gridAlpha=f}}t=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(t=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(t=this.max);h&&t<this.minReal&&(t=this.minReal);this.baseCoord=this.getCoordinate(t);t={type:"axisChanged",target:this,chart:a};t.min=h?this.minReal:this.min;t.max=this.max;this.fire("axisChanged",t);this.axisCreated=!0}h=this.axisLine.set;t=this.labelsSet;this.positionTitle();"radar"!=a.type?(a=this.viX,H=this.viY,b.translate(a,H),t.translate(a,H)):h.toFront();!this.visible||e?(b.hide(),h.hide(),t.hide()):(b.show(),h.show(),t.show());this.axisY=this.y-this.viY;this.axisX=this.x-this.viX},formatValue:function(a,b,c){var e=this.exponential,h=this.logarithmic,f=this.numberFormatter,g=this.chart;!0===this.logarithmic&&(e=-1!=String(a).indexOf("e")?!0:!1);this.useScientificNotation&&(e=!0);this.usePrefixes&&(e=!1);e?(b=-1==String(a).indexOf("e")?a.toExponential(15):String(a),c=b.split("e"),b=Number(c[0]),c=Number(c[1]),b=d.roundTo(b,14),10==b&&(b=1,c+=1),b=b+"e"+c,0===a&&(b="0"),1==a&&(b="1")):(h&&(e=String(a).split("."),e[1]?(f.precision=e[1].length,0>c&&(f.precision=Math.abs(c)),b&&1<a&&(f.precision=0)):f.precision=-1),b=this.usePrefixes?d.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):d.formatNumber(a,f,f.precision));this.duration&&(b=d.formatDuration(a,this.duration,"",this.durationUnits,this.maxInterval,f));"date"==this.type&&(b=d.formatDate(new Date(a),this.currentDateFormat,g));this.recalculateToPercents?b+="%":(f=this.unit)&&(b="left"==this.unitPosition?f+b:b+f);this.labelFunction&&(b=this.labelFunction(a,b,this).toString());return b},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var e=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),h=0;h<c.length;h++){var d=a/c[h],g=Math.floor(Math.log(Math.abs(d))*Math.LOG10E);if(!(0<Math.abs(e-g)))if(1>a){if(g=Math.pow(10,-g)*d,g==Math.round(g))return d}else if(d==Math.round(d))return d}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],e=[],h=[],f=[],g,k=this.chart.graphs,l,m,n,q,p=this.baseValue,r=!1;if("line"==a||"step"==a||"smoothedLine"==a)r=!0;if(r&&("regular"==b||"100%"==b))for(q=0;q<k.length;q++)n=k[q],n.hidden||(m=n.type,n.chart==this.chart&&n.valueAxis==this&&a==m&&n.stackable&&(l&&(n.stackGraph=l),l=n));for(l=this.start;l<=this.end;l++){var t=0;for(q=0;q<k.length;q++)if(n=k[q],n.hidden)n.newStack&&(h[l]=NaN,e[l]=NaN);else if(m=n.type,n.chart==this.chart&&n.valueAxis==this&&a==m&&n.stackable)if(m=this.data[l].axes[this.id].graphs[n.id],g=m.values.value,isNaN(g))n.newStack&&(h[l]=NaN,e[l]=NaN);else{var u=d.getDecimals(g);t<u&&(t=u);isNaN(f[l])?f[l]=Math.abs(g):f[l]+=Math.abs(g);f[l]=d.roundTo(f[l],t);u=n.fillToGraph;r&&u&&(u=this.data[l].axes[this.id].graphs[u.id])&&(m.values.open=u.values.value);"regular"==b&&(r&&(isNaN(c[l])?(c[l]=g,m.values.close=g,m.values.open=this.baseValue):(isNaN(g)?m.values.close=c[l]:m.values.close=g+c[l],m.values.open=c[l],c[l]=m.values.close)),"column"==a&&(n.newStack&&(h[l]=NaN,e[l]=NaN),m.values.close=g,0>g?(m.values.close=g,isNaN(e[l])?m.values.open=p:(m.values.close+=e[l],m.values.open=e[l]),e[l]=m.values.close):(m.values.close=g,isNaN(h[l])?m.values.open=p:(m.values.close+=h[l],m.values.open=h[l]),h[l]=m.values.close)))}}for(l=this.start;l<=this.end;l++)for(q=0;q<k.length;q++)(n=k[q],n.hidden)?n.newStack&&(h[l]=NaN,e[l]=NaN):(m=n.type,n.chart==this.chart&&n.valueAxis==this&&a==m&&n.stackable&&(m=this.data[l].axes[this.id].graphs[n.id],g=m.values.value,isNaN(g)||(c=g/f[l]*100,m.values.percents=c,m.values.total=f[l],n.newStack&&(h[l]=NaN,e[l]=NaN),"100%"==b&&(isNaN(e[l])&&(e[l]=0),isNaN(h[l])&&(h[l]=0),0>c?(m.values.close=d.fitToBounds(c+e[l],-100,100),m.values.open=e[l],e[l]=m.values.close):(m.values.close=d.fitToBounds(c+h[l],-100,100),m.values.open=h[l],h[l]=m.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(e.valueAxis==this){var h="value";if("candlestick"==e.type||"ohlc"==e.type)h="open";var f,g,k=this.end+2,k=d.fitToBounds(this.end+1,0,this.data.length-1),l=this.start;0<l&&l--;var m;g=this.start;e.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(m=a.categoryAxis)){var n=m.minDuration(),n=new Date(a.startTime+n/2),q=d.resetDateToMin(new Date(a.startTime),m.minPeriod).getTime();d.resetDateToMin(new Date(n),m.minPeriod).getTime()>q&&g++}if(m=a.recalculateFromDate)m=d.getDate(m,a.dataDateFormat,"fff"),g=a.getClosestIndex(a.chartData,"time",m.getTime(),!0,0,a.chartData.length),k=a.chartData.length-1;for(m=g;m<=k&&(g=this.data[m].axes[this.id].graphs[e.id],f=g.values[h],isNaN(f));m++);this.recBaseValue=f;for(h=l;h<=k;h++){g=this.data[h].axes[this.id].graphs[e.id];g.percents={};var l=g.values,p;for(p in l)g.percents[p]="percents"!=p?l[p]/f*100-100:l[p]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,e;for(e=0;e<c.length;e++){var h=c[e].type;("line"==h||"step"==h||"smoothedLine"==h)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-
1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);a=this.minMaxMultiplier;this.min=this.getMin(this.start,this.end);this.max=this.getMax();this.minRR=this.min;this.maxRR=this.max;a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.minimumDate&&(this.min=this.minimumDate.getTime());this.maximumDate&&(this.max=this.maximumDate.getTime());this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=this.maxTemp);this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-
1);a=this.min;b=this.max;c=this.max-this.min;e=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/e)*e+e);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/e)*e-e);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;
e=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/e)*e;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=d.fixStepE(c);e=Math.ceil(this.step/c);5<e&&(e=10);5>=e&&2<e&&(e=5);this.step=Math.ceil(this.step/(c*e))*c*e;1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=d.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/
this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);this.logarithmic&&(2<Math.log(b)*Math.LOG10E-
Math.log(a)*Math.LOG10E?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},getMin:function(a,b){var c,e;for(e=a;e<=b;e++){var h=this.data[e].axes[this.id].graphs,d;for(d in h)if(h.hasOwnProperty(d)){var g=this.chart.getGraphById(d);
if(g.includeInMinMax&&(!g.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);this.foundGraphs=!0;g=h[d].values;this.recalculateToPercents&&(g=h[d].percents);var k;if(this.minMaxField)k=g[this.minMaxField],k<c&&(c=k);else for(var l in g)g.hasOwnProperty(l)&&"percents"!=l&&"total"!=l&&(k=g[l],k<c&&(c=k))}}}return c},getMax:function(){var a,b;for(b=this.start;b<=this.end;b++){var c=this.data[b].axes[this.id].graphs,e;for(e in c)if(c.hasOwnProperty(e)){var d=this.chart.getGraphById(e);if(d.includeInMinMax&&(!d.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;d=c[e].values;this.recalculateToPercents&&(d=c[e].percents);var f;if(this.minMaxField)f=d[this.minMaxField],f>a&&(a=f);else for(var g in d)d.hasOwnProperty(g)&&"percents"!=g&&"total"!=g&&(f=d[g],f>a&&(a=f))}}}return a},dispatchZoomEvent:function(a,b){var c={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(c.type,c)},zoomOut:function(){var a=this.chart;"xy"!=a.type&&(this.maxZoom=this.minZoom=void 0,a.updateAfterValueZoom())},zoomToValues:function(a,b){var c=this.chart;"xy"==c.type?(b<a&&(c=b,b=a,a=c),a<this.min&&(a=this.min),b>this.max&&(b=this.max),c={type:"axisSelfZoomed"},c.chart=this.chart,c.valueAxis=this,c.multiplier=this.axisWidth/Math.abs(this.getCoordinate(b)-this.getCoordinate(a)),c.startValue=a,c.endValue=b,c.position="V"==this.orientation?this.reversed?this.getCoordinate(a):this.getCoordinate(b):this.reversed?this.getCoordinate(b):this.getCoordinate(a),this.fire(c.type,c)):(this.minZoom=a,this.maxZoom=b,c.updateAfterValueZoom())},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,e=this.reversed,d=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(d?!0===e?(b-a)/c:a/c:!0===e?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===e?d?f-(a-b)/c:a/c+f:d?a/c+f:f-(a-b)/c},getCoordinate:function(a){if(isNaN(a))return NaN;var b=this.rotate,c=this.reversed,e=this.axisWidth,d=this.stepWidth,f=this.min,g=this.minReal;!0===
this.logarithmic?(0===a&&(a=this.treatZeroAs),a=Math.log(a)*Math.LOG10E-Math.log(g)*Math.LOG10E,b=b?!0===c?e-d*a:d*a:!0===c?d*a:e-d*a):b=!0===c?b?e-d*(a-f):d*(a-f):b?d*(a-f):e-d*(a-f);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);1E7<Math.abs(b)&&(b=1E7*(b/Math.abs(b)));return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(){if(this.synchronizeWith){d.isString(this.synchronizeWith)&&(this.synchronizeWith=this.chart.getValueAxisById(this.synchronizeWith));var a=this.synchronizeWith,b=a.min,c=a.max,a=a.step,e=this.synchronizationMultiplier;e&&(this.min=b*e,this.max=c*e,this.step=a*e,b=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),b=Math.abs(Math.log(Math.abs(b))*Math.LOG10E),this.maxDecCount=b=Math.round(b),this.draw())}}})})();(function(){var d=window.AmCharts;d.RecAxis=d.Class({construct:function(a){var b=a.chart,c=a.axisThickness,e=a.axisColor,h=a.axisAlpha,f=a.offset,g=a.dx,k=a.dy,l=a.viX,m=a.viY,n=a.viH,q=a.viW,p=b.container;"H"==a.orientation?(e=d.line(p,[0,q],[0,0],e,h,c),this.axisWidth=a.width,"bottom"==a.position?(k=c/2+f+n+m-1,c=l):(k=-c/2-f+m+k,c=g+l)):(this.axisWidth=a.height,"right"==a.position?(e=d.line(p,[0,0,-g],[0,n,n-k],e,h,c),k=m+k,c=c/2+f+g+q+l-1):(e=d.line(p,[0,0],[0,n],e,h,c),k=m,c=-c/2-f+l));e.translate(c,k);c=b.container.set();c.push(e);b.axesSet.push(c);d.setCN(b,e,a.bcn+"line");this.axisSet=c;this.set=e}})})();(function(){var d=window.AmCharts;d.RecItem=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,n,q){b=Math.round(b);var p=a.chart;this.value=c;void 0==c&&(c="");l||(l=0);void 0==e&&(e=!0);var r=p.fontFamily,t=a.fontSize;void 0==t&&(t=p.fontSize);var u=a.color;void 0==u&&(u=p.color);void 0!==n&&(u=n);var z=a.chart.container,v=z.set();this.set=v;var w=a.axisThickness,x=a.axisColor,A=a.axisAlpha,B=a.tickLength,D=a.gridAlpha,C=a.gridThickness,I=a.gridColor,H=a.dashLength,O=a.fillColor,J=a.fillAlpha,da=a.labelsEnabled;n=a.labelRotation;var pa=a.counter,U=a.inside,na=a.labelOffset,qa=a.dx,ja=a.dy,Pa=a.orientation,aa=a.position,Z=a.previousCoord,V=a.viH,sa=a.viW,ba=a.offset,ca,ta;g?(void 0!==g.id&&(q=p.classNamePrefix+"-guide-"+g.id),da=!0,isNaN(g.tickLength)||(B=g.tickLength),void 0!=g.lineColor&&(I=g.lineColor),void 0!=g.color&&(u=g.color),isNaN(g.lineAlpha)||(D=g.lineAlpha),isNaN(g.dashLength)||(H=g.dashLength),isNaN(g.lineThickness)||(C=g.lineThickness),!0===g.inside&&(U=!0),isNaN(g.labelRotation)||(n=g.labelRotation),isNaN(g.fontSize)||(t=g.fontSize),g.position&&(aa=g.position),void 0!==g.boldLabel&&(k=g.boldLabel),isNaN(g.labelOffset)||(na=g.labelOffset)):""===c&&(B=0);m&&!isNaN(a.minorTickLength)&&(B=a.minorTickLength);var ia="start";h&&(ia="middle");var Q=n*Math.PI/180,W,wa,G=0,y=0,ka=0,ea=W=0,Qa=0;"V"==Pa&&(n=0);var Y;da&&""!==c&&(Y=a.autoWrap&&0===n?d.wrappedText(z,c,u,r,t,ia,k,h,0):d.text(z,c,u,r,t,ia,k),ia=Y.getBBox(),ea=ia.width,Qa=ia.height);if("H"==Pa){if(0<=b&&b<=sa+1&&(0<B&&0<A&&b+l<=sa+1&&(ca=d.line(z,[b+l,b+l],[0,B],x,A,C),v.push(ca)),0<D&&(ta=d.line(z,[b,b+qa,b+qa],[V,V+ja,ja],I,D,C,H),v.push(ta))),y=0,G=b,g&&90==n&&U&&(G-=t),!1===e?(ia="start",y="bottom"==aa?U?y+B:y-B:U?y-B:y+B,G+=3,h&&(G+=h/2-3,ia="middle"),0<n&&(ia="middle")):ia="middle",1==pa&&0<J&&!g&&!m&&Z<sa&&(e=d.fitToBounds(b,0,sa),Z=d.fitToBounds(Z,0,sa),W=e-Z,0<W&&(wa=d.rect(z,W,a.height,O,J),wa.translate(e-W+qa,ja),v.push(wa))),"bottom"==aa?(y+=V+t/2+ba,U?(0<n?(y=V-ea/2*Math.sin(Q)-B-3,G+=ea/2*Math.cos(Q)-4+2):0>n?(y=V+ea*Math.sin(Q)-
B-3+2,G+=-ea*Math.cos(Q)-Qa*Math.sin(Q)-4):y-=B+t+3+3,y-=na):(0<n?(y=V+ea/2*Math.sin(Q)+B+3,G-=ea/2*Math.cos(Q)):0>n?(y=V+B+3-ea/2*Math.sin(Q)+2,G+=ea/2*Math.cos(Q)):y+=B+w+3+3,y+=na)):(y+=ja+t/2-ba,G+=qa,U?(0<n?(y=ea/2*Math.sin(Q)+B+3,G-=ea/2*Math.cos(Q)):y+=B+3,y+=na):(0<n?(y=-(ea/2)*Math.sin(Q)-B-6,G+=ea/2*Math.cos(Q)):y-=B+t+3+w+3,y-=na)),"bottom"==aa?W=(U?V-B-1:V+w-1)+ba:(ka=qa,W=(U?ja:ja-B-w+1)-ba),f&&(G+=f),f=G,0<n&&(f+=ea/2*Math.cos(Q)),Y&&(t=0,U&&(t=ea/2*Math.cos(Q)),f+t>sa+2||0>f))Y.remove(),Y=null}else{0<=b&&b<=V+1&&(0<B&&0<A&&b+l<=V+1&&(ca=d.line(z,[0,B],[b+l,b+l],x,A,C),v.push(ca)),0<D&&(ta=d.line(z,[0,qa,sa+qa],[b,b+ja,b+ja],I,D,C,H),v.push(ta)));ia="end";if(!0===U&&"left"==aa||!1===U&&"right"==aa)ia="start";y=b-t/2;1==pa&&0<J&&!g&&!m&&(e=d.fitToBounds(b,0,V),Z=d.fitToBounds(Z,0,V),Q=e-Z,wa=d.polygon(z,[0,a.width,a.width,0],[0,0,Q,Q],O,J),wa.translate(qa,e-Q+ja),v.push(wa));y+=t/2;"right"==aa?(G+=qa+sa+ba,y+=ja,U?(f||(y-=t/2+3),G=G-(B+4)-na):(G+=B+4+w,y-=2,G+=na)):U?(G+=B+4-ba,f||(y-=t/2+3),g&&(G+=qa,y+=ja),G+=na):(G+=-B-w-4-2-ba,y-=2,G-=na);ca&&("right"==aa?(ka+=qa+ba+sa,W+=ja,ka=U?ka-w:ka+w):(ka-=ba,U||(ka-=B+w)));f&&(y+=f);U=-3;"right"==aa&&(U+=ja);Y&&(y>V+1||y<U)&&(Y.remove(),Y=null)}ca&&(ca.translate(ka,W),d.setCN(p,ca,a.bcn+"tick"),d.setCN(p,ca,q,!0),g&&d.setCN(p,ca,"guide"));!1===a.visible&&(ca&&ca.remove(),Y&&(Y.remove(),Y=null));Y&&(Y.attr({"text-anchor":ia}),Y.translate(G,y),0!==n&&Y.rotate(-n,a.chart.backgroundColor),a.allLabels.push(Y),this.label=Y,d.setCN(p,Y,a.bcn+"label"),d.setCN(p,Y,q,!0),g&&d.setCN(p,Y,"guide"));ta&&(d.setCN(p,ta,a.bcn+"grid"),d.setCN(p,ta,q,!0),g&&d.setCN(p,ta,"guide"));wa&&(d.setCN(p,wa,a.bcn+"fill"),d.setCN(p,wa,q,!0));m?ta&&d.setCN(p,ta,a.bcn+"grid-minor"):(a.counter=0===pa?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}})})();(function(){var d=window.AmCharts;d.RecFill=d.Class({construct:function(a,b,c,e){var h=a.dx,f=a.dy,g=a.orientation,k=0;if(c<b){var l=b;b=c;c=l}var m=e.fillAlpha;isNaN(m)&&(m=0);var l=a.chart.container,n=e.fillColor;"V"==g?(b=d.fitToBounds(b,0,a.viH),c=d.fitToBounds(c,0,a.viH)):(b=d.fitToBounds(b,0,a.viW),c=d.fitToBounds(c,0,a.viW));c-=b;isNaN(c)&&(c=4,k=2,m=0);0>c&&"object"==typeof n&&(n=n.join(",").split(",").reverse());"V"==g?(g=d.rect(l,a.viW,c,n,m),g.translate(h,b-k+f)):(g=d.rect(l,c,a.viH,n,m),g.translate(b-k+h,f));d.setCN(a.chart,g,"guide-fill");e.id&&d.setCN(a.chart,g,"guide-fill-"+e.id);this.set=l.set([g])},graphics:function(){return this.set},getLabel:function(){}})})();(function(){var d=window.AmCharts;d.AmChart=d.Class({construct:function(a){this.theme=a;this.classNamePrefix="amcharts";this.addClassNames=!1;this.version="3.14.5";d.addChart(this);this.createEvents("dataUpdated","init","rendered","drawn","failed","resized");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.addCodeCredits=this.autoResize=!0;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.handDrawThickness=1;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=!0;this.product="amcharts";this.animations=[];this.balloon=new d.AmBalloon(this.theme);this.balloon.chart=this;d.applyTheme(this,a,"AmChart")},drawChart:function(){this.drawBackground();this.redrawLabels();this.drawTitles();this.brr()},drawBackground:function(){d.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,e=this.set;d.isModern||0!==c||(c=.001);var h=this.updateWidth();this.realWidth=h;var f=this.updateHeight();this.realHeight=f;b=d.polygon(a,[0,h-1,h-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.setCN(this,b,"bg");this.background=b;e.push(b);if(b=this.backgroundImage)a=a.image(b,0,0,h,f),d.setCN(this,b,"bg-image"),this.bgImg=a,e.push(a)},drawTitles:function(){var a=this.titles;if(d.ifArray(a)){var b=20,c;for(c=0;c<a.length;c++){var e=a[c],e=d.processObject(e,d.Title,this.theme);if(!1!==e.enabled){var h=e.color;void 0===h&&(h=this.color);var f=e.size;isNaN(f)&&(f=this.fontSize+2);isNaN(e.alpha);var g=this.marginLeft,h=d.text(this.container,e.text,h,this.fontFamily,f);h.translate(g+(this.realWidth-this.marginRight-g)/2,b);h.node.style.pointerEvents="none";d.setCN(this,h,"title");e.id&&d.setCN(this,h,"title-"+e.id);g=!0;void 0!==e.bold&&(g=e.bold);g&&h.attr({"font-weight":"bold"});h.attr({opacity:e.alpha});b+=f+6;this.freeLabelsSet.push(h)}}}},write:function(a){if(a="object"!=typeof a?document.getElementById(a):
a){for(;a.firstChild;)a.removeChild(a.firstChild);this.div=a;a.style.overflow="hidden";a.style.textAlign="left";var b=this.chartDiv,c=this.legendDiv,e=this.legend,h=c.style,f=b.style;this.measure();this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;var g,k=document.createElement("div");g=k.style;g.position="relative";this.containerDiv=k;k.className=this.classNamePrefix+"-main-div";b.className=this.classNamePrefix+"-chart-div";a.appendChild(k);var l=this.exportConfig;l&&d.AmExport&&!this.AmExport&&(this.AmExport=new d.AmExport(this,l));this.amExport&&d.AmExport&&(this.AmExport=d.extend(this.amExport,new d.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(e)if(e=this.addLegend(e,e.divId),e.enabled)switch(e.position){case"bottom":k.appendChild(b);k.appendChild(c);break;case"top":k.appendChild(c);k.appendChild(b);break;case"absolute":g.width=a.style.width;g.height=a.style.height;h.position="absolute";f.position="absolute";void 0!==e.left&&(h.left=e.left+"px");void 0!==e.right&&(h.right=e.right+"px");void 0!==e.top&&(h.top=e.top+"px");void 0!==e.bottom&&(h.bottom=e.bottom+"px");e.marginLeft=0;e.marginRight=0;k.appendChild(b);k.appendChild(c);break;case"right":g.width=a.style.width;g.height=a.style.height;h.position="relative";f.position="absolute";k.appendChild(b);k.appendChild(c);break;case"left":g.width=a.style.width;g.height=a.style.height;h.position="absolute";f.position="relative";k.appendChild(b);k.appendChild(c);break;case"outside":k.appendChild(b)}else k.appendChild(b);else k.appendChild(b);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);this.initChart()}},createLabelsSet:function(){d.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){window.AmCharts_path&&(this.path=window.AmCharts_path);void 0===this.path&&(this.path=d.getPath());void 0===this.path&&(this.path="amcharts/");this.path=d.normalizeUrl(this.path);void 0===this.pathToImages&&(this.pathToImages=this.path+"images/");this.initHC||(d.callInitHandler(this),this.initHC=!0);this.renderFix();d.applyLang(this.language,this);var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.divIsFixed=d.findIfFixed(this.chartDiv);this.destroy();a=0;document.attachEvent&&!window.opera&&(a=1);this.dmouseX=this.dmouseY=0;var b=document.getElementsByTagName("html")[0];b&&window.getComputedStyle&&(b=window.getComputedStyle(b,null))&&(this.dmouseY=d.removePx(b.getPropertyValue("margin-top")),this.dmouseX=d.removePx(b.getPropertyValue("margin-left")));this.mouseMode=a;(a=this.container)?(a.container.innerHTML="",a.width=this.realWidth,a.height=this.realHeight,a.addDefs(this),this.chartDiv.appendChild(a.container)):a=new d.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);a.chart=this;d.VML||d.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,this.container=a,this.set&&this.set.remove(),this.set=a.set(),this.gridSet&&this.gridSet.remove(),this.gridSet=a.set(),this.cursorLineSet&&this.cursorLineSet.remove(),this.cursorLineSet=a.set(),this.graphsBehindSet&&this.graphsBehindSet.remove(),this.graphsBehindSet=a.set(),this.bulletBehindSet&&this.bulletBehindSet.remove(),this.bulletBehindSet=a.set(),this.columnSet&&this.columnSet.remove(),this.columnSet=a.set(),this.graphsSet&&this.graphsSet.remove(),this.graphsSet=a.set(),this.trendLinesSet&&this.trendLinesSet.remove(),this.trendLinesSet=a.set(),this.axesSet&&this.axesSet.remove(),this.axesSet=a.set(),this.cursorSet&&this.cursorSet.remove(),this.cursorSet=a.set(),this.scrollbarsSet&&this.scrollbarsSet.remove(),this.scrollbarsSet=a.set(),this.bulletSet&&this.bulletSet.remove(),this.bulletSet=a.set(),this.freeLabelsSet&&this.freeLabelsSet.remove(),this.axesLabelsSet&&this.axesLabelsSet.remove(),this.axesLabelsSet=a.set(),this.freeLabelsSet=a.set(),this.balloonsSet&&this.balloonsSet.remove(),this.balloonsSet=a.set(),this.zoomButtonSet&&this.zoomButtonSet.remove(),this.zbSet&&(this.zbSet.remove(),this.zbSet=null),this.zoomButtonSet=a.set(),this.linkSet&&this.linkSet.remove(),this.linkSet=a.set()):this.fire("failed",{type:"failed",chart:this})},premeasure:function(){var a=this.div;if(a){var b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);if(b!=this.mw||c!=this.mh)this.mw=b,this.mh=c,this.measure()}},measure:function(){var a=this.div;if(a){var b=this.chartDiv,c=a.offsetWidth,e=a.offsetHeight,h=this.container;a.clientHeight&&(c=a.clientWidth,e=a.clientHeight);var f=d.removePx(d.getStyle(a,"padding-left")),g=d.removePx(d.getStyle(a,"padding-right")),k=d.removePx(d.getStyle(a,"padding-top")),l=d.removePx(d.getStyle(a,"padding-bottom"));isNaN(f)||(c-=f);isNaN(g)||(c-=g);isNaN(k)||(e-=k);isNaN(l)||(e-=l);f=a.style;a=f.width;f=f.height;-1!=a.indexOf("px")&&(c=d.removePx(a));-1!=f.indexOf("px")&&(e=d.removePx(f));e=Math.round(e);c=Math.round(c);a=Math.round(d.toCoordinate(this.width,c));f=Math.round(d.toCoordinate(this.height,e));(c!=this.previousWidth||e!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",h&&h.setSize(a,f),this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme),this.balloon.setBounds(2,2,a-2,f));this.balloon.chart=this;this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=e}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.legend&&this.legend.destroy()},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){d.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||d.removeChart(this);if(a=this.div)for(;a.firstChild;)a.removeChild(a.firstChild);this.legend&&this.legend.destroy()},setMouseCursor:function(a){"auto"==a&&d.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container&&!1!==a.enabled){a=d.processObject(a,d.Label,this.theme);var b=a.y,c=a.text,e=a.align,h=a.size,f=a.color,g=a.rotation,k=a.alpha,l=a.bold,m=d.toCoordinate(a.x,this.realWidth),b=d.toCoordinate(b,this.realHeight);m||(m=0);b||(b=0);void 0===f&&(f=this.color);isNaN(h)&&(h=this.fontSize);e||(e="start");"left"==e&&(e="start");"right"==e&&(e="end");"center"==e&&(e="middle",g?b=this.realHeight-b+b/2:m=this.realWidth/2-m);void 0===k&&(k=1);void 0===g&&(g=0);b+=h/2;c=d.text(this.container,c,f,this.fontFamily,h,e,l,k);c.translate(m,b);d.setCN(this,c,"label");a.id&&d.setCN(this,c,"label-"+a.id);0!==g&&c.rotate(g);a.url?(c.setAttr("cursor","pointer"),c.click(function(){d.getURL(a.url)})):c.node.style.pointerEvents="none";this.labelsSet.push(c);this.labels.push(c)}},addLabel:function(a,b,c,e,d,f,g,k,l,m){a={x:a,y:b,text:c,align:e,size:d,color:f,alpha:k,rotation:g,bold:l,url:m,enabled:!0};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var e=this.legendDiv,d=e.offsetWidth;isNaN(c.width)||(d=c.width);c.ieW&&(d=c.ieW);var f=e.offsetHeight,e=e.style,g=this.chartDiv.style,c=c.position;if("right"==c||"left"==c){a-=d;if(0>a||isNaN(a))a=0;g.width=a+"px";"left"==c?(g.left=d+"px",e.left="0px"):(g.left="0px",e.left=a+"px");b>f&&(e.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){var a=0,b=this.titles,c=!0;if(0<b.length){var a=20,e;for(e=0;e<b.length;e++){var d=b[e];!1!==d.enabled&&(c=!1,d=d.size,isNaN(d)&&(d=this.fontSize+2),a+=d+6)}c&&(a=0)}return a},
addTitle:function(a,b,c,e,d){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:e,bold:d,enabled:!0};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(){},addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?(a.panEventsEnabled&&(b.style.msTouchAction="none"),"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b);a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,b);a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){if(!this.skipEvents){var a;this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,a="dataUpdated",this.fire(a,{type:a,chart:this}));this.chartCreated||(a="init",this.fire(a,{type:a,chart:this}));this.chartRendered||(a="rendered",this.fire(a,{type:a,chart:this}),this.chartRendered=!0);a="drawn";this.fire(a,{type:a,chart:this})}this.skipEvents=!1},validateSize:function(){var a=this;a.premeasure();if(a.divRealWidth!=a.previousWidth||a.divRealHeight!=a.previousHeight){var b=a.legend;if(0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){a.legendInitTO&&clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},10);a.timeOuts.push(c);a.legendInitTO=c}"xy"!=a.type?a.marginsUpdated=!1:(a.marginsUpdated=!0,a.selfZoom=!0);clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},10);a.timeOuts.push(c);a.initTO=c}a.fire("resized",{type:"resized",chart:a});a.renderFix();b&&b.renderFix&&b.renderFix();a.previousHeight=a.divRealHeight;a.previousWidth=a.divRealWidth}},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated=!1,this.initChart(a))},validateNow:function(a,b){this.initTO&&clearTimeout(this.initTO);a&&(this.dataChanged=!0);this.skipEvents=b;this.chartRendered=!1;this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearTimeout(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide()},showBalloon:function(a,b,c,e,d){var f=this;clearTimeout(f.balloonTO);clearTimeout(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,e,d)},1)},showBalloonReal:function(a,b,c,e,d){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(e,d),f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-d.findPosX(b),this.mouseY=a.pageY-d.findPosY(b))},handleMouseOver:function(){this.outTO&&clearTimeout(this.outTO);d.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(){var a=this;a.outTO&&clearTimeout(a.outTO);a.outTO=setTimeout(function(){a.handleMouseOutReal()},10)},handleMouseOutReal:function(){d.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);var c,e;if(a){this.posX=d.findPosX(b);this.posY=d.findPosY(b);switch(this.mouseMode){case 1:c=a.clientX-this.posX;e=a.clientY-this.posY;if(!this.divIsFixed){var b=document.body,h,f,g,k;b&&(h=b.scrollLeft,g=b.scrollTop);if(b=document.documentElement)f=b.scrollLeft,k=b.scrollTop;h=Math.max(h,f);g=Math.max(g,k);c+=h;e+=g}break;case 0:this.divIsFixed?(c=a.clientX-this.posX,e=a.clientY-this.posY):(c=a.pageX-this.posX,e=a.pageY-this.posY)}a.touches&&(a=a.touches.item(0),c=a.pageX-this.posX,e=a.pageY-this.posY);this.mouseX=c-this.dmouseX;this.mouseY=e-this.dmouseY}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){d.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(){},handleMouseDown:function(a){d.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=d.processObject(a,d.AmLegend,this.theme);a.divId=b;a.ieW=0;var c;c="object"!=typeof b&&b?document.getElementById(b):b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;c=this.handleLegendEvent;this.listenTo(a,"showItem",c);this.listenTo(a,"hideItem",c);this.listenTo(a,"clickMarker",c);this.listenTo(a,"rollOverItem",c);this.listenTo(a,"rollOutItem",c);this.listenTo(a,"rollOverMarker",c);this.listenTo(a,"rollOutMarker",c);this.listenTo(a,"clickLabel",c);return a},removeLegend:function(){this.legend=void 0;this.legendDiv.innerHTML=""},handleResize:function(){(d.isPercents(this.width)||d.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(d.hasSVG)return this.container},animate:function(a,b,c,e,h,f,g){a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:e,time:h,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},stopAnim:function(a){d.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();if(this.animations)for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=1E3*b.time/d.updateRate,e=b.frame+1,h=b.obj,f=b.attribute;if(e<=c){b.frame++;var g=Number(b.from),k=Number(b.to)-g,c=d[b.effect](0,e,g,k,c);0===k?(this.animations.splice(a,1),h.node.style[f]=Number(b.to)+b.suffix):h.node.style[f]=c+b.suffix}else h.node.style[f]=Number(b.to)+b.suffix,this.animations.splice(a,1)}},update:function(){this.updateAnimations()},inIframe:function(){try{return window.self!==window.top}catch(a){return!0}},brr:function(){var a=window.location.hostname.split("."),b;2<=a.length&&(b=a[a.length-2]+"."+a[a.length-1]);this.amLink&&(a=this.amLink.parentNode)&&a.removeChild(this.amLink);a=this.creditsPosition;if("amcharts.com"!=b||!0===this.inIframe()){var c=b=0,e=this.realWidth,d=this.realHeight,f=this.type;if("serial"==f||"xy"==f||"gantt"==f)b=this.marginLeftReal,c=this.marginTopReal,e=b+this.plotAreaWidth,d=c+this.plotAreaHeight;var g="http://www.amcharts.com/javascript-charts/",k="JavaScript charts",l="JS chart by amCharts";"ammap"==this.product&&(g="http://www.ammap.com/javascript-maps/",k="Interactive JavaScript maps",l="JS map by amCharts");f=document.createElement("a");l=document.createTextNode(l);f.setAttribute("href",g);f.setAttribute("title",k);f.appendChild(l);this.chartDiv.appendChild(f);this.amLink=f;g=f.style;g.position="absolute";g.textDecoration="none";g.color=this.color;g.fontFamily=this.fontFamily;g.fontSize=this.fontSize+"px";g.opacity=.7;g.display="block";var k=f.offsetWidth,f=f.offsetHeight,l=5+b,m=c+5;"bottom-left"==a&&(l=5+b,m=d-f-3);"bottom-right"==a&&(l=e-k-5,m=d-f-3);"top-right"==a&&(l=e-k-5,m=c+5);g.left=l+"px";g.top=m+"px"}}});d.Slice=d.Class({construct:function(){}});d.SerialDataItem=d.Class({construct:function(){}});d.GraphDataItem=d.Class({construct:function(){}});d.Guide=d.Class({construct:function(a){this.cname="Guide";d.applyTheme(this,a,this.cname)}});d.Title=d.Class({construct:function(a){this.cname="Title";d.applyTheme(this,a,this.cname)}});d.Label=d.Class({construct:function(a){this.cname="Label";d.applyTheme(this,a,this.cname)}})})();(function(){var d=window.AmCharts;d.AmGraph=d.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";this.clustered=!0;this.periodSpan=1;this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;this.bcn="graph-";this.dateFormat="MMM DD, YYYY";d.applyTheme(this,a,this.cname)},draw:function(){var a=this.chart,b=a.type;isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var c=a.container;this.container=c;this.destroy();var e=c.set(),h=c.set();this.behindColumns?(a.graphsBehindSet.push(e),a.bulletBehindSet.push(h)):(a.graphsSet.push(e),a.bulletSet.push(h));var f=this.bulletAxis;d.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));this.bulletSet=h;if(!this.scrollbar){var f=a.marginLeftReal,g=a.marginTopReal;e.translate(f,g);h.translate(f,g)}c=c.set();d.remove(this.columnsSet);e.push(c);this.set=e;d.setCN(a,e,"graph-"+this.type);d.setCN(a,e,"graph-"+this.id);d.setCN(a,h,"graph-"+this.type);d.setCN(a,h,"graph-"+this.id);this.columnsSet=c;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];e=this.labelPosition;e||(h=this.valueAxis.stackType,e="top","column"==this.type&&(a.rotate&&(e="right"),"100%"==h||"regular"==h)&&(e="middle"),this.labelPosition=e);d.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph())},createGraph:function(){var a=this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);b=b.type;"gantt"==b&&(b="serial");clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(b){case"serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case"radar":a.createRadarGraph();break;case"xy":a.createXYGraph(),a.positiveClip(a.set)}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,e=this.yAxis;this.pmh=e.viH+1;this.pmw=c.viW+1;this.pmy=this.pmx=0;var d;for(d=this.start;d<=this.end;d++){var f=this.data[d].axes[c.id].graphs[this.id],g=f.values,k=g.x,l=g.y,g=c.getCoordinate(k),m=e.getCoordinate(l);!isNaN(k)&&!isNaN(l)&&(a.push(g),b.push(m),f.x=g,f.y=m,k=this.createBullet(f,g,m,d),l=this.labelText)&&(f=this.createLabel(f,g,m,l),this.positionLabel(g,m,f,k),this.allBullets.push(f))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],e,d,f;for(f=this.start;f<=this.end;f++){var g=this.data[f].axes[this.valueAxis.id].graphs[this.id],k;k="none"==a||"3d"==a?g.values.value:g.values.close;if(isNaN(k))this.drawLineGraph(b,c),b=[],c=[];else{var l=this.y-(this.valueAxis.getCoordinate(k)-this.height),m=180-360/(this.end-this.start+1)*f;k=l*Math.sin(m/180*Math.PI);l*=Math.cos(m/180*Math.PI);b.push(k);c.push(l);var m=this.createBullet(g,k,l,f),n=this.labelText;n&&(g=this.createLabel(g,k,l,n),this.positionLabel(k,l,g,m),this.allBullets.push(g));isNaN(e)&&(e=k);isNaN(d)&&(d=l)}}b.push(e);c.push(d);this.drawLineGraph(b,c);this.launchAnimation()},positionLabel:function(a,b,c,e){var d="middle",f=!1,g=this.labelPosition,k=c.getBBox();if(e){var l=e.graphDataItem,m=this.chart.rotate,n=l.isNegative,q=this.chart;b-=k.height/4/2;switch(g){case"top":g=m?"top":n?"bottom":"top";break;case"right":g=m?n?"left":"right":"right";break;case"bottom":g=m?"bottom":n?"top":"bottom";break;case"left":g=m?n?"right":"left":"left"}var p=l.columnGraphics,r=0,t=0;p&&(r=p.x,t=p.y);var u=this.labelOffset;switch(g){case"top":b-=e.size/2+k.height/2+u;break;case"right":d="start";a+=e.size/2+u;break;case"bottom":b+=e.size/2+k.height/2+u;break;case"left":d="end";a-=e.size/2+u;break;case"inside":"column"==this.type&&(f=!0,m?n?(d="end",a=r-3-u):(d="start",a=r+3+u):b=n?t+7+u:t-10-u);break;case"middle":"column"==this.type&&(f=!0,m?a-=(a-r)/2+u-3:b-=(b-t)/2+u-3)}"auto"!=this.labelAnchor&&(d=this.labelAnchor);c.attr({"text-anchor":d});this.labelRotation&&c.rotate(this.labelRotation);c.translate(a,b);k=c.getBBox();!this.showAllValueLabels&&p&&f&&(k.height>l.columnHeight||k.width>l.columnWidth)&&
(c.remove(),c=!1);if(c&&("serial"==q.type||"gantt"==q.type))if(m){if(0>b||b>this.height)c.remove(),c=!1}else if(0>a||a>this.width)c.remove(),c=!1;return c}},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,e=this.data,h=this.chart.container,f=this.valueAxis,g=this.type,k=this.columnWidthReal,l=this.showBulletsAt;isNaN(this.columnWidth)||(k=this.columnWidth);isNaN(k)&&(k=.8);var m=this.useNegativeColorIfDown,n=this.width,q=this.height,p=this.y,r=this.rotate,t=this.columnCount,u=d.toCoordinate(this.cornerRadiusTop,k/2),z=this.connect,v=[],w=[],x,A,B,D,C=this.chart.graphs.length,I,H=this.dx/this.tcc,O=this.dy/this.tcc,J=f.stackType,da=this.start,pa=this.end,U=this.scrollbar,na="graph-column-";U&&(na="scrollbar-graph-column-");var qa=this.categoryAxis,ja=this.baseCoord,Pa=this.negativeBase,aa=this.columnIndex,Z=this.lineThickness,V=this.lineAlpha,sa=this.lineColorR,ba=this.dashLength,ca=this.set,ta,ia=this.getGradRotation(),Q=this.chart.columnSpacing,W=qa.cellWidth,wa=(W*k-t)/t;Q>wa&&(Q=wa);var G,y,ka,ea=q+1,Qa=n+1,Y=0,qb=0,rb,sb,eb,fb,tb=this.fillColorsR,Ja=this.negativeFillColors,Da=this.negativeLineColor,Wa=this.fillAlphas,Xa=this.negativeFillAlphas;"object"==typeof Wa&&(Wa=Wa[0]);"object"==typeof Xa&&(Xa=Xa[0]);var gb=f.getCoordinate(f.min);f.logarithmic&&(gb=f.getCoordinate(f.minReal));
this.minCoord=gb;this.resetBullet&&(this.bullet="none");if(!(U||"line"!=g&&"smoothedLine"!=g&&"step"!=g||(1==e.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Ja&&void 0==Da||m))){var Ra=Pa;Ra>f.max&&(Ra=f.max);Ra<f.min&&(Ra=f.min);f.logarithmic&&(Ra=f.minReal);var Ga=f.getCoordinate(Ra),Ib=f.getCoordinate(f.max);r?(ea=q,Qa=Math.abs(Ib-Ga)+1,rb=q,sb=Math.abs(gb-Ga)+1,fb=qb=0,f.reversed?(Y=0,eb=Ga):(Y=Ga,eb=0)):(Qa=n,ea=Math.abs(Ib-Ga)+1,sb=n,rb=Math.abs(gb-Ga)+1,eb=Y=0,f.reversed?(fb=p,qb=Ga):fb=Ga+1)}var Ha=Math.round;this.pmx=Ha(Y);this.pmy=Ha(qb);this.pmh=Ha(ea);this.pmw=Ha(Qa);this.nmx=Ha(eb);this.nmy=Ha(fb);this.nmh=Ha(rb);this.nmw=Ha(sb);d.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(t=1);k="column"==g?(W*k-Q*(t-1))/t:W*k;1>k&&(k=1);var Jb=this.fixedColumnWidth;isNaN(Jb)||(k=Jb);var K;if("line"==g||"step"==g||"smoothedLine"==g){if(0<da){for(K=da-1;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],ka=y.values.value,!isNaN(ka)){da=
K;break}if(this.lineColorField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],y.lineColor){this.bulletColorSwitched=this.lineColorSwitched=y.lineColor;break}if(this.fillColorsField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],y.fillColors){this.fillColorsSwitched=y.fillColors;break}if(this.dashLengthField)for(K=da;-1<K;K--)if(G=e[K],y=G.axes[f.id].graphs[b],!isNaN(y.dashLength)){this.dashLengthSwitched=y.dashLength;break}}if(pa<e.length-1)for(K=pa+1;K<e.length;K++)if(G=e[K],y=G.axes[f.id].graphs[b],ka=y.values.value,!isNaN(ka)){pa=K;break}}pa<e.length-1&&pa++;var R=[],S=[],Ka=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==J||"100%"==J||this.fillToGraph)Ka=!0;var Kb=this.noStepRisers,hb=-1E3,ib=-1E3,jb=this.minDistance,La=!0,Ya=!1;for(K=da;K<=pa;K++){G=e[K];y=G.axes[f.id].graphs[b];y.index=K;var Za,Ma=NaN;if(m&&void 0==this.openField)for(var ub=K+1;ub<e.length&&(!e[ub]||!(Za=e[K+1].axes[f.id].graphs[b])||!Za.values||(Ma=Za.values.value,isNaN(Ma)));ub++);var T,P,M,fa,la=NaN,F=NaN,E=NaN,N=NaN,L=NaN,Na=NaN,Ea=NaN,Oa=NaN,Fa=NaN,ya=NaN,za=NaN,ga=NaN,ha=NaN,X=NaN,vb=NaN,wb=NaN,ma=NaN,oa=void 0,Ia=tb,Sa=Wa,Ba=sa,ua,xa,xb=this.proCandlesticks,kb=this.topRadius,$a=this.pattern;void 0!=y.pattern&&($a=y.pattern);isNaN(y.alpha)||(Sa=y.alpha);isNaN(y.dashLength)||(ba=y.dashLength);var Ca=y.values;f.recalculateToPercents&&(Ca=y.percents);if(Ca){X=this.stackable&&"none"!=J&&"3d"!=J?Ca.close:Ca.value;if("candlestick"==g||"ohlc"==g)X=Ca.close,wb=Ca.low,Ea=f.getCoordinate(wb),vb=Ca.high,Fa=f.getCoordinate(vb);ma=Ca.open;E=f.getCoordinate(X);isNaN(ma)||(L=f.getCoordinate(ma),m&&(Ma=ma,ma=L=NaN));m&&(void 0==this.openField?Za&&(Za.isNegative=Ma<X?!0:!1,isNaN(Ma)&&(y.isNegative=!La)):y.isNegative=Ma>X?!0:!1);if(!U)switch(this.showBalloonAt){case"close":y.y=E;break;case"open":y.y=L;break;case"high":y.y=Fa;break;case"low":y.y=Ea}var la=G.x[qa.id],Ta=this.periodSpan-1,ra=Math.floor(W/2)+Math.floor(Ta*W/2),Aa=ra,lb=0;"left"==this.stepDirection&&(lb=(2*W+Ta*W)/2,la-=lb);"center"==
this.stepDirection&&(lb=W/2,la-=lb);"start"==this.pointPosition&&(la-=W/2+Math.floor(Ta*W/2),ra=0,Aa=Math.floor(W)+Math.floor(Ta*W));"end"==this.pointPosition&&(la+=W/2+Math.floor(Ta*W/2),ra=Math.floor(W)+Math.floor(Ta*W),Aa=0);if(Kb){var yb=this.columnWidth;isNaN(yb)||(ra*=yb,Aa*=yb)}U||(y.x=la);-1E5>la&&(la=-1E5);la>n+1E5&&(la=n+1E5);r?(F=E,N=L,L=E=la,isNaN(ma)&&!this.fillToGraph&&(N=ja),Na=Ea,Oa=Fa):(N=F=la,isNaN(ma)&&!this.fillToGraph&&(L=ja));if(!xb&&X<ma||xb&&X<ta)y.isNegative=!0,Ja&&(Ia=Ja),Xa&&(Sa=Xa),void 0!=Da&&(Ba=Da);Ya=!1;isNaN(X)||(m?X>Ma?(La&&(Ya=!0),La=!1):(La||(Ya=!0),La=!0):y.isNegative=X<Pa?!0:!1,ta=X);var Lb=!1;U&&a.chartScrollbar.ignoreCustomColors&&(Lb=!0);Lb||(void 0!=y.color&&(Ia=y.color),y.fillColors&&(Ia=y.fillColors));switch(g){case"line":if(isNaN(X))z||(this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[]);else{if(Math.abs(F-hb)>=jb||Math.abs(E-ib)>=jb)v.push(F),w.push(E),hb=F,ib=E;ya=F;za=E;ga=F;ha=E;!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L));if(Ya||void 0!=y.lineColor||void 0!=y.fillColors||!isNaN(y.dashLength))this.drawLineGraph(v,w,R,S),v=[F],w=[E],R=[],S=[],!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L)),m?La?(this.lineColorSwitched=sa,this.fillColorsSwitched=tb):(this.lineColorSwitched=Da,this.fillColorsSwitched=Ja):(this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors),this.dashLengthSwitched=y.dashLength;y.gap&&(this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[])}break;case"smoothedLine":if(isNaN(X))z||(this.drawSmoothedGraph(v,w,R,S),v=[],w=[],R=[],S=[]);else{if(Math.abs(F-hb)>=jb||Math.abs(E-ib)>=jb)v.push(F),w.push(E),hb=F,ib=E;ya=F;za=E;ga=F;ha=E;!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L));void 0==y.lineColor&&void 0==y.fillColors&&isNaN(y.dashLength)||(this.drawSmoothedGraph(v,w,R,S),v=[F],w=[E],R=[],S=[],!Ka||isNaN(L)||isNaN(N)||(R.push(N),S.push(L)),this.lineColorSwitched=y.lineColor,this.fillColorsSwitched=y.fillColors,this.dashLengthSwitched=y.dashLength);y.gap&&(this.drawSmoothedGraph(v,w,R,S),v=[],w=[],R=[],S=[])}break;case"step":if(!isNaN(X)){r?(isNaN(x)||(v.push(x),w.push(E-ra)),w.push(E-ra),v.push(F),w.push(E+Aa),v.push(F),!Ka||isNaN(L)||isNaN(N)||(isNaN(B)||(R.push(B),S.push(L-ra)),R.push(N),S.push(L-ra),R.push(N),S.push(L+Aa))):(isNaN(A)||(w.push(A),v.push(F-ra)),v.push(F-ra),w.push(E),v.push(F+Aa),w.push(E),!Ka||isNaN(L)||isNaN(N)||(isNaN(D)||(R.push(N-ra),S.push(D)),R.push(N-ra),S.push(L),R.push(N+Aa),S.push(L)));x=F;A=E;B=N;D=L;ya=F;za=E;ga=F;ha=E;if(Ya||void 0!=y.lineColor||void 0!=y.fillColors||!isNaN(y.dashLength)){var Zb=v[v.length-2],$b=w[w.length-2];v.pop();w.pop();this.drawLineGraph(v,w,R,S);v=[Zb];w=[$b];r?(w.push(E+Aa),v.push(F)):(v.push(F+Aa),w.push(E));R=[];S=[];this.lineColorSwitched=y.lineColor;this.fillColorsSwitched=y.fillColors;this.dashLengthSwitched=y.dashLength;m&&(La?(this.lineColorSwitched=sa,this.fillColorsSwitched=tb):(this.lineColorSwitched=Da,this.fillColorsSwitched=Ja))}if(Kb||y.gap)x=A=NaN,this.drawLineGraph(v,w,R,S),v=[],w=[],R=[],S=[]}else if(!z){if(1>=this.periodSpan||1<this.periodSpan&&F-x>ra+Aa)x=A=NaN;this.drawLineGraph(v,w,R,S);v=[];w=[];R=[];S=[]}break;case"column":ua=Ba;void 0!=y.lineColor&&(ua=y.lineColor);if(!isNaN(X)){m||(y.isNegative=X<Pa?!0:!1);y.isNegative&&(Ja&&(Ia=Ja),void 0!=Da&&(ua=Da));var Mb=f.min,Nb=f.max;if(!(X<Mb&&ma<Mb||X>Nb&&ma>Nb)){var va;if(r){"3d"==J?(P=E-(t/2-this.depthCount+1)*(k+Q)+Q/2+O*aa,T=N+H*aa,va=aa):(P=Math.floor(E-(t/2-aa)*(k+Q)+Q/2),T=N,va=0);M=k;ya=F;za=P+k/2;isNaN(N)||N>F&&!y.isNegative&&(ya=N);ga=F;ha=P+k/2;P+M>q+va*O&&(M=q-P+va*O);P<va*O&&(M+=P,P=va*O);fa=F-N;var ac=T;T=d.fitToBounds(T,0,n);fa+=ac-T;fa=d.fitToBounds(fa,-T,n-T+H*aa);P<q&&0<M&&(oa=new d.Cuboid(h,fa,M,H-a.d3x,O-a.d3y,Ia,Sa,Z,ua,V,ia,u,r,ba,$a,kb,na),y.columnWidth=Math.abs(fa),y.columnHeight=Math.abs(M))}else{"3d"==J?(T=F-(t/2-this.depthCount+1)*(k+Q)+Q/2+H*aa,P=L+O*aa,va=aa):(T=F-(t/2-aa)*(k+Q)+Q/2,P=L,va=0);M=k;ya=T+k/2;za=E;isNaN(L)||L<E&&!y.isNegative&&(za=L);ga=T+k/2;ha=E;T+M>n+va*H&&(M=n-T+va*H);T<va*H&&(M+=T-va*H,T=va*H);fa=E-L;var bc=P;P=d.fitToBounds(P,this.dy,q);fa+=bc-P;fa=d.fitToBounds(fa,-P+O*aa,q-P);T<n+aa*H&&0<M&&(this.showOnAxis&&(P-=O/2),oa=new d.Cuboid(h,M,fa,H-a.d3x,O-a.d3y,Ia,Sa,Z,ua,this.lineAlpha,ia,u,r,ba,$a,kb,na),y.columnHeight=Math.abs(fa),y.columnWidth=Math.abs(M))}}if(oa&&(xa=oa.set,d.setCN(a,oa.set,"graph-"+this.type),d.setCN(a,oa.set,"graph-"+this.id),y.className&&d.setCN(a,oa.set,y.className,!0),y.columnGraphics=xa,xa.translate(T,P),this.columnsSet.push(xa),(y.url||this.showHandOnHover)&&xa.setAttr("cursor","pointer"),!U)){"none"==J&&(I=r?(this.end+1-K)*C-c:C*K+c);"3d"==J&&(r?(I=(this.end+1-K)*C-c-1E3*this.depthCount,ya+=H*this.columnIndex,ga+=H*this.columnIndex,y.y+=H*this.columnIndex):(I=(C-c)*(K+1)+1E3*this.depthCount,za+=O*this.columnIndex,ha+=O*this.columnIndex,y.y+=O*this.columnIndex));if("regular"==J||"100%"==J)I=r?0<Ca.value?(this.end+1-K)*C+c:(this.end+1-K)*C-c:0<Ca.value?C*K+c:C*K-c;this.columnsArray.push({column:oa,depth:I});y.x=r?P+M/2:T+M/2;this.ownColumns.push(oa);this.animateColumns(oa,K,F,N,E,L);this.addListeners(xa,y)}}break;case"candlestick":if(!isNaN(ma)&&!isNaN(X)){var Ua,ab;ua=Ba;void 0!=y.lineColor&&(ua=y.lineColor);if(r){if(P=E-k/2,T=N,M=k,P+M>q&&(M=q-P),0>P&&(M+=P,P=0),P<q&&0<M){var zb,Ab;X>ma?(zb=[F,Oa],Ab=[N,Na]):(zb=[N,Oa],Ab=[F,Na]);!isNaN(Oa)&&!isNaN(Na)&&E<q&&0<E&&(Ua=d.line(h,zb,[E,E],ua,V,Z),ab=d.line(h,Ab,[E,E],ua,V,Z));fa=F-N;oa=new d.Cuboid(h,fa,M,H,O,Ia,Wa,Z,ua,V,ia,u,r,ba,$a,kb,na)}}else if(T=F-k/2,P=L+Z/2,M=k,T+M>n&&(M=n-T),0>T&&(M+=T,T=0),fa=E-L,T<n&&0<M){xb&&X>=ma&&(Sa=0);var oa=new d.Cuboid(h,M,fa,H,O,Ia,Sa,Z,ua,V,ia,u,r,ba,$a,kb,na),Bb,Cb;X>ma?(Bb=[E,Fa],Cb=[L,Ea]):(Bb=[L,Fa],Cb=[E,Ea]);!isNaN(Fa)&&!isNaN(Ea)&&F<n&&0<F&&(Ua=d.line(h,[F,F],Bb,ua,V,Z),ab=d.line(h,[F,F],Cb,ua,V,Z),d.setCN(a,Ua,this.bcn+"line-high"),y.className&&d.setCN(a,Ua,y.className,!0),d.setCN(a,ab,this.bcn+"line-low"),y.className&&d.setCN(a,ab,y.className,!0))}oa&&(xa=oa.set,y.columnGraphics=xa,ca.push(xa),xa.translate(T,P-Z/2),(y.url||this.showHandOnHover)&&xa.setAttr("cursor","pointer"),Ua&&(ca.push(Ua),ca.push(ab)),ya=F,za=E,r?(ha=E,ga=F,"open"==l&&(ga=N),"high"==l&&(ga=Oa),"low"==l&&(ga=Na)):(ha=E,"open"==l&&(ha=L),"high"==l&&(ha=Fa),"low"==l&&(ha=Ea),ga=F),U||(y.x=r?P+M/2:T+M/2,this.animateColumns(oa,K,F,N,E,L),this.addListeners(xa,y)))}break;case"ohlc":if(!(isNaN(ma)||isNaN(vb)||isNaN(wb)||isNaN(X))){var Ob=h.set();ca.push(Ob);X<ma&&(y.isNegative=!0,void 0!=Da&&(Ba=Da));var mb,nb,ob;if(r){var Db=E-k/2,Db=d.fitToBounds(Db,0,q),Pb=d.fitToBounds(E,0,q),Eb=E+k/2,Eb=d.fitToBounds(Eb,0,q);nb=d.line(h,[N,N],[Db,Pb],Ba,V,Z,ba);0<E&&E<q&&(mb=d.line(h,[Na,Oa],[E,E],Ba,V,Z,ba));ob=d.line(h,[F,F],[Pb,Eb],Ba,V,Z,ba);ha=E;ga=F;"open"==l&&(ga=N);"high"==l&&(ga=Oa);"low"==l&&(ga=Na)}else{var Fb=F-k/2,Fb=d.fitToBounds(Fb,0,n),Qb=d.fitToBounds(F,0,n),Gb=F+k/2,Gb=d.fitToBounds(Gb,0,n);nb=d.line(h,[Fb,Qb],[L,L],Ba,V,Z,ba);0<F&&F<n&&(mb=d.line(h,[F,F],[Ea,Fa],Ba,V,Z,ba));ob=d.line(h,[Qb,Gb],[E,E],Ba,V,Z,ba);ha=E;"open"==l&&(ha=L);"high"==l&&(ha=Fa);"low"==l&&(ha=Ea);ga=F}ca.push(nb);ca.push(mb);ca.push(ob);d.setCN(a,nb,this.bcn+"stroke-open");d.setCN(a,ob,this.bcn+"stroke-close");d.setCN(a,mb,this.bcn+"stroke");y.className&&d.setCN(a,Ob,y.className,!0);ya=F;za=E}}if(!U&&!isNaN(X)){var Rb=this.hideBulletsCount;if(this.end-this.start<=Rb||0===Rb){var Sb=this.createBullet(y,ga,ha,K),Tb=this.labelText;if(Tb&&Sb){var Hb=this.createLabel(y,ga,ha,Tb);(Hb=this.positionLabel(ya,za,Hb,Sb,M,fa))&&this.allBullets.push(Hb)}if("regular"==J||"100%"==J){var Ub=f.totalText;if(Ub){var Va=this.createLabel(y,0,0,Ub,f.totalTextColor);this.allBullets.push(Va);var Vb=Va.getBBox(),Wb=Vb.width,Xb=Vb.height,bb,cb,pb=f.totalTextOffset,Yb=f.totals[K];Yb&&Yb.remove();var db=0;"column"!=g&&(db=this.bulletSize);r?(cb=E,bb=0>X?F-Wb/2-2-db-pb:F+Wb/2+3+db+pb):(bb=F,cb=0>X?E+Xb/2+db+pb:E-Xb/2-3-db-pb);Va.translate(bb,cb);f.totals[K]=Va;r?(0>cb||cb>q)&&Va.remove():(0>bb||bb>n)&&Va.remove()}}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(v,w,R,S):this.drawLineGraph(v,w,R,S),U||this.launchAnimation();this.bulletsHidden&&this.hideBullets();this.customBulletsHidden&&this.hideCustomBullets()},animateColumns:function(a,b){var c=this,e=c.chart.startDuration;0<e&&!c.animationPlayed&&(c.seqAn?(a.set.hide(),c.animationArray.push(a),e=setTimeout(function(){c.animate.call(c)},e/(c.end-c.start+1)*(b-c.start)*1E3),c.timeOuts.push(e)):c.animate(a))},createLabel:function(a,b,c,e,h){var f=this.chart,g=a.labelColor;g||(g=this.color);g||(g=f.color);h&&(g=h);h=this.fontSize;void 0===h&&(this.fontSize=h=f.fontSize);var k=this.labelFunction;e=f.formatString(e,a);e=d.cleanFromEmpty(e);k&&(e=k(a,e));a=d.text(this.container,e,g,f.fontFamily,h);a.node.style.pointerEvents="none";a.translate(b,c);this.bulletSet.push(a);return a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,e){var h=this;if(1<a.length){var f=h.set,g=h.chart,k=h.container,l=k.set(),m=k.set();f.push(m);f.push(l);var n=h.lineAlpha,q=h.lineThickness,f=h.fillAlphas,p=h.lineColorR,r=h.negativeLineAlpha;isNaN(r)&&(r=n);var t=h.lineColorSwitched;t&&(p=t);var t=h.fillColorsR,u=h.fillColorsSwitched;u&&(t=u);var z=h.dashLength;(u=h.dashLengthSwitched)&&(z=u);var u=h.negativeLineColor,v=h.negativeFillColors,w=h.negativeFillAlphas,x=h.baseCoord;0!==h.negativeBase&&(x=h.valueAxis.getCoordinate(h.negativeBase),x>h.height&&(x=h.height),0>x&&(x=0));n=d.line(k,a,b,p,n,q,z,!1,!0);d.setCN(g,n,h.bcn+"stroke");l.push(n);l.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")});void 0===u||h.useNegativeColorIfDown||(q=d.line(k,a,b,u,r,q,z,!1,!0),d.setCN(g,q,h.bcn+"stroke"),d.setCN(g,q,h.bcn+"stroke-negative"),m.push(q));if(0<f||0<w)if(q=a.join(";").split(";"),r=b.join(";").split(";"),n=g.type,"serial"==n?0<c.length?(c.reverse(),e.reverse(),q=a.concat(c),r=b.concat(e)):h.rotate?(r.push(r[r.length-1]),q.push(x),r.push(r[0]),q.push(x),r.push(r[0]),q.push(q[0])):(q.push(q[q.length-1]),r.push(x),q.push(q[0]),r.push(x),q.push(a[0]),r.push(r[0])):"xy"==n&&(b=h.fillToAxis)&&(d.isString(b)&&(b=g.getValueAxisById(b)),"H"==b.orientation?(x="top"==b.position?0:b.viH,q.push(q[q.length-1]),r.push(x),q.push(q[0]),r.push(x),q.push(a[0]),r.push(r[0])):(x="left"==b.position?0:b.viW,r.push(r[r.length-1]),q.push(x),r.push(r[0]),q.push(x),r.push(r[0]),q.push(q[0]))),a=h.gradientRotation,0<f&&(b=d.polygon(k,q,r,t,f,1,"#000",0,a),b.pattern(h.pattern,NaN,g.path),d.setCN(g,b,h.bcn+"fill"),l.push(b)),v||void 0!==u)isNaN(w)&&(w=f),v||(v=u),k=d.polygon(k,q,r,v,w,1,"#000",0,a),d.setCN(g,k,h.bcn+"fill"),d.setCN(g,k,h.bcn+"fill-negative"),k.pattern(h.pattern,NaN,g.path),m.push(k),m.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")});h.applyMask(m,l)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,e){if(1<a.length){var h=this.set,f=this.chart,g=this.container,k=g.set(),l=g.set();h.push(l);h.push(k);var m=this.lineAlpha,n=this.lineThickness,h=this.dashLength,q=this.fillAlphas,p=this.lineColorR,r=this.fillColorsR,t=this.negativeLineColor,u=this.negativeFillColors,z=this.negativeFillAlphas,v=this.baseCoord,w=this.lineColorSwitched;w&&(p=w);(w=this.fillColorsSwitched)&&(r=w);w=this.negativeLineAlpha;isNaN(w)&&(w=m);m=new d.Bezier(g,a,b,p,m,n,r,0,h);d.setCN(f,m,this.bcn+"stroke");k.push(m.path);void 0!==t&&(n=new d.Bezier(g,a,b,t,w,n,r,0,h),d.setCN(f,n,this.bcn+"stroke"),d.setCN(f,n,this.bcn+"stroke-negative"),l.push(n.path));0<q&&(m=a.join(";").split(";"),p=b.join(";").split(";"),n="",0<c.length?(c.push("M"),e.push("M"),c.reverse(),e.reverse(),m=a.concat(c),p=b.concat(e)):(this.rotate?(n+=" L"+v+","+b[b.length-1],n+=" L"+v+","+b[0]):(n+=" L"+a[a.length-1]+","+v,n+=" L"+a[0]+","+v),n+=" L"+a[0]+","+b[0]),c=new d.Bezier(g,m,p,NaN,0,0,r,q,h,n),d.setCN(f,c,this.bcn+"fill"),c.path.pattern(this.pattern,NaN,f.path),k.push(c.path),u||void 0!==t)&&(z||(z=q),u||(u=t),a=new d.Bezier(g,a,b,NaN,0,0,u,z,h,n),a.path.pattern(this.pattern,NaN,f.path),d.setCN(f,a,this.bcn+"fill"),d.setCN(f,a,this.bcn+"fill-negative"),l.push(a.path));this.applyMask(l,k)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,e=a.bulletSet;d.VML||(c.attr({opacity:a.startAlpha}),e.attr({opacity:a.startAlpha}));c.hide();e.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,e=this.x,d=this.y;b.show();c.show();var f=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,d),c.translate(-1E3,d)):(b.translate(e,-1E3),c.translate(e,-1E3)),b.animate({opacity:1,translate:e+","+d},f,a),c.animate({opacity:1,translate:e+","+d},f,a))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=d[d.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c){if(!isNaN(b)&&!isNaN(c)){var e=this.chart,h=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);var k=a.values.value,l=this.maxValue,m=this.minValue,n=this.maxBulletSize,q=this.minBulletSize;isNaN(l)||(isNaN(k)||(g=(k-m)/(l-m)*(n-q)+q),m==l&&(g=n));l=g;this.bulletAxis&&(g=a.values.error,isNaN(g)||(k=g),g=this.bulletAxis.stepWidth*k);g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b=a.isNegative?b-f:b+f:c=a.isNegative?
c+f:c-f;var p,q=this.bulletColorR;a.lineColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(q=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(q=this.bulletColorNegative);void 0!==a.color&&(q=a.color);var r;"xy"==e.type&&this.valueField&&(r=this.pattern,a.pattern&&(r=a.pattern));f=this.bullet;a.bullet&&(f=a.bullet);var k=this.bulletBorderThickness,m=this.bulletBorderColorR,n=this.bulletBorderAlpha,t=this.bulletAlpha;m||(m=q);this.useLineColorForBulletBorder&&(m=this.lineColorR);var u=a.alpha;isNaN(u)||(t=u);if("none"!=this.bullet||a.bullet)p=d.bullet(h,f,g,q,t,k,m,n,l,0,r,e.path);if(this.customBullet||a.customBullet)r=this.customBullet,a.customBullet&&(r=a.customBullet),r&&(p&&p.remove(),"function"==typeof r?(p=new r,p.chart=e,a.bulletConfig&&(p.availableSpace=c,p.graph=this,p.graphDataItem=a,p.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,p.bulletConfig=a.bulletConfig),p.write(h),p=p.set):(p=h.set(),h=h.image(r,0,0,g,g),p.push(h),this.centerCustomBullets&&h.translate(-g/2,-g/2)));if(p){(a.url||this.showHandOnHover)&&p.setAttr("cursor","pointer");if("serial"==e.type||"gantt"==e.type)if(-.5>b-0||b-0>this.width||c<-g/2||c-0>this.height)p.remove(),p=null;p&&(this.bulletSet.push(p),p.translate(b,c),this.addListeners(p,a),this.allBullets.push(p));a.bx=b;a.by=c;d.setCN(e,p,this.bcn+"bullet");a.className&&d.setCN(e,p,a.className,!0)}p?(p.size=g||0,a.bulletGraphics=p):p={size:0};p.graphDataItem=a;return p}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},showCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!1;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].show()},hideCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!0;for(b=0;b<a.length;b++)a[b].graphDataItem.customBullet&&a[b].hide()},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},handleRollOver:function(a,b){if(a){var c=this.chart,e={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOverGraphItem",e);c.fire("rollOverGraphItem",e);clearTimeout(c.hoverInt);e=this.showBalloon;!c.chartCursor||"serial"!=c.type&&"gantt"!=c.type||(e=!1,!c.chartCursor.valueBalloonsEnabled&&this.showBalloon&&(e=!0));if(e){var e=c.formatString(this.balloonText,a,!0),h=this.balloonFunction;h&&(e=h(a,a.graph));e=d.cleanFromEmpty(e);h=c.getBalloonColor(this,a);c.balloon.showBullet=!1;c.balloon.pointerOrientation="V";var f=a.x,g=a.y;c.rotate&&(f=a.y,g=a.x);""!==e?c.showBalloon(e,h,!0,f+c.marginLeftReal,g+c.marginTopReal):this.chart.hideBalloonReal()}else this.chart.hideBalloonReal()}this.handleGraphEvent(b,"rollOverGraph")},handleRollOut:function(a,b){this.chart.hideBalloon();if(a){var c={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rollOutGraphItem",c);this.chart.fire("rollOutGraphItem",c)}this.handleGraphEvent(b,"rollOutGraph")},handleClick:function(a,b){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("clickGraphItem",c);this.chart.fire("clickGraphItem",c);d.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(b,c);this.chart.fire(b,c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("rightClickGraphItem",c);this.chart.fire("rightClickGraphItem",c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire("doubleClickGraphItem",c);this.chart.fire("doubleClickGraphItem",c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var e=b[c].set;e&&e.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){d.remove(this.set);d.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]}})})();(function(){var d=window.AmCharts;d.ChartCursor=d.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","draw","selected","moved");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition="middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;this.leaveCursor=!1;d.applyTheme(this,a,this.cname)},draw:function(){this.destroy();var a=this.chart,b=a.container;this.rotate=a.rotate;this.container=b;b=b.set();b.translate(this.x,this.y);this.set=b;a.cursorSet.push(b);b=new d.AmBalloon;b.className="category";b.chart=a;this.categoryBalloon=b;d.copyProperties(a.balloon,b);b.cornerRadius=0;b.shadowAlpha=0;b.borderThickness=1;b.borderAlpha=1;b.showBullet=!1;var c=this.categoryBalloonColor;void 0===c&&(c=this.cursorColor);b.fillColor=c;b.balloonColor=c;b.fillAlpha=this.categoryBalloonAlpha;b.borderColor=c;b.color=this.color;c=this.valueLineAxis;d.isString(c)&&(c=a.getValueAxisById(c));c||(c=a.valueAxes[0]);this.valueLineAxis=c;this.valueLineBalloonEnabled&&(this.vaBalloon=c=new d.AmBalloon,d.copyProperties(b,c),c.animationDuration=0,this.rotate||(c.pointerOrientation="H"));this.rotate&&(b.pointerOrientation="H");this.extraWidth=0;this.prevX=[];this.prevY=[];this.prevTX=[];this.prevTY=[];if(this.valueBalloonsEnabled)for(b=0;b<a.graphs.length;b++)c=new d.AmBalloon,c.className=a.graphs[b].id,c.chart=a,d.copyProperties(a.balloon,c),a.graphs[b].valueBalloon=c;"cursor"==this.type?this.createCursor():this.createCrosshair()},updateData:function(){var a=this.chart;this.data=a.chartData;this.firstTime=a.firstTime;this.lastTime=a.lastTime},createCursor:function(){var a=this.chart,b=this.cursorAlpha,c=a.categoryAxis,e=this.categoryBalloon,h,f,g,k;g=a.dx;k=a.dy;var l=this.width,m=this.height,n=a.rotate;e.pointerWidth=c.tickLength;n?(h=[0,l,l+g],f=[0,0,k],g=[g,0,0],k=[k,0,m]):(h=[g,0,0],f=[k,0,m],g=[0,l,l+g],k=[0,0,k]);h=d.line(this.container,h,f,this.cursorColor,b,1);d.setCN(a,h,"cursor-line");this.line=h;h.node.style.pointerEvents="none";(f=this.fullRectSet)?(f.push(h),f.translate(this.x,this.y)):this.set.push(h);this.valueLineEnabled&&(h=this.valueLineAlpha,isNaN(h)||(b=h),b=d.line(this.container,g,k,this.cursorColor,b,1),b.node.style.pointerEvents="none",d.setCN(a,b,"cursor-value-line"),this.vLine=b,this.set.push(b));this.setBalloonBounds(e,c,n);(a=this.vaBalloon)&&this.setBalloonBounds(a,this.valueLineAxis,!n);this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,c=d.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=d.line(b,[0,this.width],[0,0],this.cursorColor,a,1);d.setCN(this.chart,c,"cursor-line");d.setCN(this.chart,a,"cursor-line");this.set.push(c);this.set.push(a);this.vLine=c;this.hLine=a;this.hideCursor()},update:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,c=a.mouseY-this.y;-.5<b&&b<this.width+1&&0<c&&c<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||a.setMouseCursor("move")),this.rolledOver=!0,(this.valueLineEnabled||this.valueLineBalloonEnabled)&&this.updateVLine(b,c),this.setPosition()):this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},updateVLine:function(a,b){var c=this.vLine,e=this.vaBalloon;if((c||e)&&!this.panning&&!this.drawing){c&&c.show();var d=this.valueLineAxis,f,g=this.rotate;g?(c&&c.translate(a,0),d&&(f=d.coordinateToValue(a)),c=a):(c&&c.translate(0,b),d&&(f=d.coordinateToValue(b)),c=b-1);if(e&&!isNaN(f)&&this.prevLineValue!=f){var k=d.formatValue(f,!0);this.setBalloonPosition(e,d,c,!g);e.showBalloon(k)}this.prevLineValue=f}},getMousePosition:function(){var a,b=this.width,c=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>c&&(a=c)):(a=a.mouseX-this.x-1,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,c=a.mouseY-this.y,e=this.vLine,h=this.hLine,b=d.fitToBounds(b,0,this.width),c=d.fitToBounds(c,0,this.height);e&&0<this.cursorAlpha&&(e.show(),h.show(),e.translate(b,0),h.translate(0,c));this.zooming&&(a.hideXScrollbar&&(b=NaN),a.hideYScrollbar&&(c=NaN),this.updateSelectionSize(b,c));this.fireMoved();a.mouseIsOver||this.zooming||this.hideCursor()},fireMoved:function(){var a=this.chart,b={type:"moved",target:this};b.chart=a;b.zooming=this.zooming;b.x=a.mouseX-this.x;b.y=a.mouseY-this.y;this.fire("moved",b)},updateSelectionSize:function(a,b){d.remove(this.selection);var c=this.selectionPosX,e=this.selectionPosY,h=0,f=0,g=this.width,k=this.height;isNaN(a)||(c>a&&(h=a,g=c-a),c<a&&(h=c,g=a-c),c==a&&(h=a,g=0),g+=this.extraWidth,h-=this.extraWidth/2);isNaN(b)||(e>b&&(f=b,k=e-b),e<b&&(f=e,k=b-e),e==b&&(f=b,k=0),k+=this.extraWidth,f-=this.extraWidth/2);0<g&&0<k&&(c=d.rect(this.container,g,k,this.cursorColor,this.selectionAlpha),d.setCN(this.chart,c,"cursor-selection"),c.translate(h+this.x,f+this.y),this.selection=c)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,c=this.y,e=this.height+c;a.sort(this.compareY);var d;for(d=0;d<a.length;d++){var f=a[d].balloon;f.setBounds(b,c,b+this.width,e);f.prevX=this.prevX[d];f.prevY=this.prevY[d];f.prevTX=this.prevTX[d];f.prevTY=this.prevTY[d];f.draw();e=f.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();var b,c=this.x,e,d,f=a.length;for(d=0;d<f;d++){var g=a[d].balloon;b=g.bottom;var k=g.bottom-g.yPos,l=f-d-1;0<d&&b-k<e+3&&(g.setBounds(c,e+3,c+this.width,e+k+3),g.prevX=this.prevX[l],g.prevY=this.prevY[l],g.prevTX=this.prevTX[l],g.prevTY=this.prevTY[l],g.draw());g.set&&g.set.show();this.prevX[l]=g.prevX;this.prevY[l]=g.prevY;this.prevTX[l]=g.prevTX;this.prevTY[l]=g.prevTY;e=g.bottom}},showBullets:function(){d.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;var b=this.chart.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(!e.hidden&&e.balloonText){var h=this.data[this.index].axes[e.valueAxis.id].graphs[e.id],f=h.y;if(!isNaN(f)){var g,k;g=h.x;this.rotate?(k=f,f=g):k=g;e=d.circle(a,this.bulletSize/2,this.chart.getBalloonColor(e,h,!0),e.cursorBulletAlpha);e.translate(k,f);this.allBullets.push(e)}}}},destroy:function(){this.clear();d.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();(a=this.vaBalloon)&&a.destroy();this.destroyValueBalloons();d.remove(this.set)},clear:function(){},destroyValueBalloons:function(){var a=this.valueBalloons;if(a){var b;for(b=0;b<a.length;b++)a[b].balloon.hide()}},zoom:function(a,b,c,e){var h=this.chart;this.destroyValueBalloons();this.zooming=!1;var f;this.rotate?this.selectionPosY=f=h.mouseY:this.selectionPosX=f=h.mouseX;this.start=a;this.end=b;this.startTime=c;this.endTime=e;this.zoomed=!0;e=h.categoryAxis;f=this.rotate;b=this.width;c=this.height;a=e.stepWidth;if(this.fullWidth){var g=1;e.parseDates&&!e.equalSpacing&&(g=e.minDuration());f?this.extraWidth=c=a*g:(this.extraWidth=b=a*g,this.categoryBalloon.minWidth=b);this.line&&this.line.remove();this.line=d.rect(this.container,b,c,this.cursorColor,this.cursorAlpha,0);this.line.node.style.pointerEvents="none";d.setCN(h,this.line,"cursor-fill");this.fullRectSet&&this.fullRectSet.push(this.line)}this.stepWidth=a;this.tempVal=this.valueBalloonsEnabled;this.valueBalloonsEnabled=!1;this.setPosition();this.valueBalloonsEnabled=this.tempVal;this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0===a&&(a=!0);this.leaveCursor||(this.hideObj(this.set),this.hideObj(this.categoryBalloon),this.hideObj(this.line),this.hideObj(this.vLine),this.hideObj(this.hLine),this.hideObj(this.vaBalloon),this.hideObj(this.allBullets),this.destroyValueBalloons(),this.selectWithoutZooming||d.remove(this.selection),this.previousIndex=NaN,a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this}),this.drawing||this.chart.setMouseCursor("auto"),this.normalizeBulletSize())},setPosition:function(a,b,c){void 0===b&&(b=!0);if("cursor"==this.type){if(this.tempPosition=NaN,d.ifArray(this.data))isNaN(a)&&(a=this.getMousePosition()),(a!=this.previousMousePosition||!0===this.zoomed||this.oneBalloonOnly)&&!isNaN(a)&&("mouse"==this.cursorPosition&&(this.tempPosition=a),isNaN(c)&&(c=this.chart.categoryAxis.xToIndex(a)),c!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)&&(this.updateCursor(c,b),this.zoomed=!1),this.previousMousePosition=a}else this.updateCrosshair()},normalizeBulletSize:function(){var a=this.resizedBullets;if(a)for(var b=0;b<a.length;b++){var c=a[b],e=c.bulletGraphics;e&&(e.translate(c.bx,c.by,1),c=c.graph,isNaN(this.graphBulletAlpha)||(e.setAttr("fill-opacity",c.bulletAlpha),e.setAttr("stroke-opacity",c.bulletBorderAlpha)))}},updateCursor:function(a,b){var c=this.chart,e=this.fullWidth,h=c.mouseX-this.x,f=c.mouseY-this.y;this.drawingNow&&(d.remove(this.drawingLine),this.drawingLine=d.line(this.container,[this.x+this.drawStartX,this.x+h],[this.y+this.drawStartY,this.y+f],this.cursorColor,1,1));if(this.enabled){void 0===b&&(b=!0);this.index=a+=this.adjustment;var g=c.categoryAxis,k=c.dx,l=c.dy,m=this.x+1,n=this.y+1,q=this.width,p=this.height,r=this.data[a];this.fireMoved();if(r){var t=r.x[g.id],u=c.rotate,z=this.stepWidth,v=this.categoryBalloon,w=this.firstTime,x=this.lastTime,A=this.cursorPosition,B=this.zooming,D=this.panning,C=c.graphs;if(c.mouseIsOver||B||D||this.forceShow)if(this.forceShow=!1,D){var k=this.panClickPos,c=this.panClickEndTime,B=this.panClickStartTime,I=this.panClickEnd,m=this.panClickStart,h=(u?k-f:k-h)/z;if(!g.parseDates||g.equalSpacing)h=Math.round(h);0!==h&&(k={type:"zoomed",target:this},k.chart=this.chart,g.parseDates&&!g.equalSpacing?(c+h>x&&(h=x-c),B+h<w&&(h=w-
B),k.start=Math.round(B+h),k.end=Math.round(c+h),this.fire(k.type,k)):I+h>=this.data.length||0>m+h||(k.start=m+h,k.end=I+h,this.fire(k.type,k)))}else{"start"==A?t-=g.cellWidth/2:"mouse"==A&&(c.mouseIsOver?t=u?f-2:h-2:isNaN(this.tempPosition)||(t=this.tempPosition-2));if(u){if(0>t)if(B)t=0;else{this.hideCursor();return}if(t>p+1)if(B)t=p+1;else{this.hideCursor();return}}else{if(0>t)if(B)t=0;else{this.hideCursor();return}if(t>q)if(B)t=q;else{this.hideCursor();return}}w=this.line;0<this.cursorAlpha&&(u?(x=0,z=t+l,e&&(z-=g.cellWidth/2)):(x=t,z=0,e&&(x-=g.cellWidth/2)),A=this.animationDuration,0<A&&!this.zooming?isNaN(this.previousX)?w.translate(x,z):(w.translate(this.previousX,this.previousY),w.animate({translate:x+","+z},A,"easeOutSine")):w.translate(x,z),this.previousX=x,this.previousY=z,w.show());this.linePos=u?t+l:t;B&&(e&&w.hide(),u?this.updateSelectionSize(NaN,t):this.updateSelectionSize(t,NaN));z=!0;B&&(z=!1);this.categoryBalloonEnabled&&z?(this.setBalloonPosition(v,g,t,u),(w=this.categoryBalloonFunction)?v.showBalloon(w(r.category)):g.parseDates?(g=d.formatDate(r.category,this.categoryBalloonDateFormat,c),-1!=g.indexOf("fff")&&(g=d.formatMilliseconds(g,r.category)),v.showBalloon(g)):v.showBalloon(d.fixNewLines(r.category))):v.hide();C&&this.bulletsEnabled&&this.showBullets();if(this.oneBalloonOnly){t=Infinity;for(g=0;g<C.length;g++)v=C[g],v.showBalloon&&!v.hidden&&v.balloonText&&(w=r.axes[v.valueAxis.id].graphs[v.id],x=w.y,isNaN(x)||(u?Math.abs(h-x)<t&&(t=Math.abs(h-x),I=v):Math.abs(f-x)<t&&(t=Math.abs(f-
x),I=v)));this.mostCloseGraph&&(I=this.mostCloseGraph)}if(a!=this.previousIndex||I!=this.previousMostCloseGraph)if(this.normalizeBulletSize(),this.destroyValueBalloons(),this.resizedBullets=[],C&&this.valueBalloonsEnabled&&z&&c.balloon.enabled){this.valueBalloons=t=[];for(g=0;g<C.length;g++)if(v=C[g],x=NaN,(!this.oneBalloonOnly||v==I)&&v.showBalloon&&!v.hidden&&v.balloonText&&("step"==v.type&&"left"==v.stepDirection&&(r=this.data[a+1]),r)){if(w=r.axes[v.valueAxis.id].graphs[v.id])x=w.y;if(this.showNextAvailable&&isNaN(x)&&a+1<this.data.length)for(z=a+1;z<this.data.length;z++)if(e=this.data[z])if(w=e.axes[v.valueAxis.id].graphs[v.id],x=w.y,!isNaN(x))break;if(!isNaN(x)){e=w.x;l=!0;if(u){if(z=x,0>e||e>p)l=!1}else if(z=e,e=x,0>z||z>q+k+1)l=!1;l&&(l=this.graphBulletSize,A=this.graphBulletAlpha,1==l&&isNaN(A)||!d.isModern||!(D=w.bulletGraphics)||(D.translate(w.bx,w.by,l),this.resizedBullets.push(w),isNaN(A)||(D.setAttr("fill-opacity",A),D.setAttr("stroke-opacity",A))),l=v.valueBalloon,A=c.getBalloonColor(v,w),l.setBounds(m,n,m+q,n+p),l.pointerOrientation="H",D=this.balloonPointerOrientation,"vertical"==D&&(l.pointerOrientation="V"),"horizontal"==D&&(l.pointerOrientation="H"),l.changeColor(A),void 0!==v.balloonAlpha&&(l.fillAlpha=v.balloonAlpha),void 0!==v.balloonTextColor&&(l.color=v.balloonTextColor),l.setPosition(z+m,e+n),z=c.formatString(v.balloonText,w,!0),(e=v.balloonFunction)&&(z=e(w,v).toString()),""!==z&&(u?l.showBalloon(z):(l.text=z,l.show=!0),t.push({yy:x,balloon:l})),!u&&l.set&&(l.set.hide(),v=l.textDiv)&&(v.style.visibility="hidden"))}}this.avoidBalloonOverlapping&&this.arrangeBalloons()}b?(k={type:"changed"},k.index=a,k.chart=this.chart,k.zooming=B,k.mostCloseGraph=I,k.position=u?f:h,k.target=this,c.fire("changed",k),this.fire("changed",k),this.skipZoomDispatch=!1):(this.skipZoomDispatch=!0,c.updateLegendValues(a));this.previousIndex=a;this.previousMostCloseGraph=I}}}else this.hideCursor()},setBalloonPosition:function(a,b,c,e){var d=b.position,f=b.inside;b=b.axisThickness;var g=this.chart,k=g.dx,g=g.dy,l=this.x,m=this.y,n=this.width,q=this.height;e?(f&&("right"==d?a.setBounds(l,m+g,l+n+k,m+c+g):a.setBounds(l,m+g,l+n+k,m+c)),"right"==d?f?a.setPosition(l+n+k,m+c+g):a.setPosition(l+n+k+b,m+c+g):f?a.setPosition(l,m+c):a.setPosition(l-b,m+c)):"top"==d?f?a.setPosition(l+c+k,m+g):a.setPosition(l+c+k,m+g-b+1):f?a.setPosition(l+c,m+q):a.setPosition(l+c,m+q+b-1)},setBalloonBounds:function(a,b,c){var e=b.position,d=b.inside,f=b.axisThickness,g=b.tickLength,k=this.chart,l=k.dx,k=k.dy,m=this.x,n=this.y,q=this.width,p=this.height;c?(d&&(a.pointerWidth=0),"right"==e?d?a.setBounds(m,n+k,m+q+l,n+p+k):a.setBounds(m+q+l+f,n+k,m+q+1E3,n+p+k):d?a.setBounds(m,n,q+m,p+n):a.setBounds(-1E3,-1E3,m-g-f,n+p+15)):(a.maxWidth=q,b.parseDates&&(g=0,a.pointerWidth=0),"top"==e?d?a.setBounds(m+l,n+k,q+l+m,p+n):a.setBounds(m+l,-1E3,q+l+m,n+k-g-f):d?a.setBounds(m,n,q+m,p+n-g):a.setBounds(m,n+p+g+f-1,m+q,n+p+g+f))},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");a||a==this.zooming||this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=this.data,c;if(a){var e=a.mouseX-this.x,h=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;d.remove(this.drawingLine);c=this.drawStartX;var f=this.drawStartY;if(2<Math.abs(c-e)||2<Math.abs(f-h))c={type:"draw",target:this,chart:a,initialX:c,initialY:f,finalX:e,finalY:h},this.fire(c.type,c)}if(this.enabled&&0<b.length){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){c=this.selectWithoutZooming?{type:"selected"}:{type:"zoomed"};c.target=this;c.chart=a;if("cursor"==this.type)this.rotate?this.selectionPosY=h:this.selectionPosX=h=e,4>Math.abs(h-this.initialMouse)&&this.fromIndex==this.index||(this.index<this.fromIndex?(c.end=this.fromIndex,c.start=this.index):(c.end=this.index,c.start=this.fromIndex),h=a.categoryAxis,h.parseDates&&!h.equalSpacing&&(b[c.start]&&(c.start=b[c.start].time),b[c.end]&&(c.end=a.getEndTime(b[c.end].time))),this.skipZoomDispatch||this.fire(c.type,c));else{var g=this.initialMouseX,k=this.initialMouseY;3>Math.abs(e-g)&&3>Math.abs(h-k)||(b=Math.min(g,e),f=Math.min(k,h),e=Math.abs(g-e),h=Math.abs(k-h),a.hideXScrollbar&&(b=0,e=this.width),a.hideYScrollbar&&(f=0,h=this.height),c.selectionHeight=h,c.selectionWidth=e,c.selectionY=f,c.selectionX=b,this.skipZoomDispatch||this.fire(c.type,c))}this.selectWithoutZooming||d.remove(this.selection)}this.skipZoomDispatch=!1}}this.panning=this.zooming=!1},showCursorAt:function(a){var b=this.chart.categoryAxis;a=b.parseDates?b.dateToCoordinate(a):b.categoryToCoordinate(a);this.previousMousePosition=NaN;this.forceShow=!0;this.setPosition(a,!1)},clearSelection:function(){d.remove(this.selection)},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,c=this.chart,e=c.mouseX-this.x,h=c.mouseY-this.y;if(0<e&&e<this.width&&0<h&&h<this.height||"fake"==a)this.setPosition(),this.selectWithoutZooming&&d.remove(this.selection),this.drawing?(this.drawStartY=h,this.drawStartX=e,this.drawingNow=!0):this.pan?(this.zoomable=!1,c.setMouseCursor("move"),this.panning=!0,this.panClickPos=b?h:e,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=h,this.selectionPosY=this.linePos):(this.initialMouse=e,this.selectionPosX=this.linePos)):(this.initialMouseX=e,this.initialMouseY=h,this.selectionPosX=e,this.selectionPosY=h),this.zooming=!0)}}})})();(function(){var d=window.AmCharts;d.SimpleChartScrollbar=d.Class({construct:function(a){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconHeight=this.dragIconWidth=35;this.dragIcon="dragIconRoundBig";d.applyTheme(this,a,"SimpleChartScrollbar")},draw:function(){var a=this;a.destroy();if(a.enabled){var b=a.chart.container,c=a.rotate,e=a.chart,h=b.set();a.set=h;e.scrollbarsSet.push(h);var f,g;c?(f=a.scrollbarHeight,g=e.plotAreaHeight):(g=a.scrollbarHeight,f=e.plotAreaWidth);a.width=f;if((a.height=g)&&f){var k=d.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);d.setCN(e,k,"scrollbar-bg");a.bg=k;h.push(k);k=d.rect(b,f,g,"#000",.005);h.push(k);a.invisibleBg=k;k.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});k=d.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);d.setCN(e,k,"scrollbar-bg-selected");a.selectedBG=k;h.push(k);f=d.rect(b,f,g,"#000",.005);a.dragger=f;h.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});f=e.pathToImages;c?(k=f+a.dragIcon+"H.png",f=a.dragIconWidth,c=a.dragIconHeight):(k=f+a.dragIcon+".png",c=a.dragIconWidth,f=a.dragIconHeight);g=b.image(k,0,0,c,f);d.setCN(e,g,"scrollbar-grip-left");k=b.image(k,0,0,c,f);d.setCN(e,k,"scrollbar-grip-right");var l=10,m=20;e.panEventsEnabled&&(l=25,m=a.scrollbarHeight);var n=d.rect(b,l,m,"#000",.005),q=d.rect(b,l,m,"#000",.005);q.translate(-(l-c)/2,-(m-f)/2);n.translate(-(l-c)/2,-(m-f)/2);c=b.set([g,q]);b=b.set([k,n]);a.iconLeft=c;h.push(a.iconLeft);a.iconRight=b;h.push(b);c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.leftDragStart()}).touchend(function(){a.leftDragStop()});
b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.rightDragStart()}).touchend(function(){a.rightDragStop()});d.ifArray(e.chartData)?h.show():h.hide();a.hideDragIcons();a.clipDragger(!1)}h.translate(a.x,a.y);h.node.style.msTouchAction="none"}},updateScrollbarSize:function(a,b){a=Math.round(a);b=Math.round(b);var c=this.dragger,e,d,f,g;this.rotate?(e=0,d=a,f=this.width+
1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",d)):(e=a,d=0,f=b-a,g=this.height+1,c.setAttr("width",b-a),c.setAttr("x",e));this.clipAndUpdate(e,d,f,g)},update:function(){var a,b=!1,c,e,d=this.x,f=this.y,g=this.dragger,k=this.getDBox();if(k){c=k.x+d;e=k.y+f;var l=k.width,k=k.height,m=this.rotate,n=this.chart,q=this.width,p=this.height,r=n.mouseX,t=n.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);n.mouseIsOver&&(this.dragging&&(n=this.initialCoord,m?(a=n+(t-a),0>a&&(a=0),n=p-k,a>n&&(a=n),g.setAttr("y",a)):(a=n+(r-a),0>a&&(a=0),n=q-l,a>n&&(a=n),g.setAttr("x",a)),this.clipDragger(!0)),this.resizingRight&&(m?(a=t-e,a+e>p+f&&(a=p-e+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("height",a))):(a=r-c,a+c>q+d&&(a=q-c+d),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0===a&&(a=.1),g.setAttr("width",a))),this.clipDragger(!0)),this.resizingLeft&&(m?(c=e,e=t,e<f&&(e=f),e>p+f&&(e=p+f),a=!0===b?c-e:k+c-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+k-f)):(0===a&&(a=.1),g.setAttr("y",e-f),g.setAttr("height",a))):(e=r,e<d&&(e=d),e>q+d&&(e=q+d),a=!0===b?c-e:l+c-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+l-d)):(0===a&&(a=.1),g.setAttr("x",e-d),g.setAttr("width",a))),this.clipDragger(!0)))}},stopForceClip:function(){this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,e=b.y,d=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,d=this.width+1,this.clipY!=e||this.clipH!=b)f=!0}else if(e=0,b=this.height+1,this.clipX!=c||this.clipW!=d)f=!0;f&&(this.clipAndUpdate(c,e,d,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,e){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=e;this.selectedBG.clipRect(a,b,c,e);this.updateDragIconPositions();this.maskGraphs(a,b,c,e)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,e=b.y,d=b.width,b=b.height;this.rotate?(c=e,d=this.height/b):d=this.width/d;a={type:"zoomed",position:c,chart:a,target:this,multiplier:d};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,e=this.iconLeft,d=this.iconRight,f,g,k=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,e.translate((k-g)/2,c-f/2),d.translate((k-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,e.translate(b-g/2,(k-f)/2),d.translate(b-g/2+a.width,(k-f)/2))},showDragIcons:function(){this.resizeEnabled&&
(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.enabled&&(this.dragger.stop(),this.multiplier=a,this.position=b,this.updateScrollbarSize(b,this.rotate?b+this.height/a:b+this.width/a),this.clipDragger())},destroy:function(){this.clear();d.remove(this.set);d.remove(this.iconRight);d.remove(this.iconLeft)},clear:function(){},handleDragStart:function(){if(this.enabled){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)}},handleDragStop:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();this.update()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,e=a.scrollDuration,h=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var k=a.y,l=a.x,m=a.rotate;m?(b="y",c=c.mouseY-f/2-k,c=d.fitToBounds(c,0,a.height-f)):(b="x",c=c.mouseX-g/2-l,c=d.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?(a.skipEvent=!1,h.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(c=Math.round(c),m?h.animate({y:c},e,">"):h.animate({x:c},e,">"),a.forceClip=!0,clearTimeout(a.forceTO),a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*e))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.update()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}})})();(function(){var d=window.AmCharts;d.ChartScrollbar=d.Class({inherits:d.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";d.ChartScrollbar.base.construct.call(this,a);this.enabled=!0;this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.offset=0;this.oppositeAxis=!0;d.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new d.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.markPeriodChange=b.categoryAxis.markPeriodChange;a.boldPeriodBeginning=b.categoryAxis.boldPeriodBeginning;a.axisItemRenderer=d.RecItem;a.axisRenderer=d.RecAxis;a.guideFillRenderer=d.RecFill;a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;d.isString(this.graph)&&(this.graph=d.getObjById(b.graphs,this.graph));if(a=this.graph){var c=this.valueAxis;c||(this.valueAxis=c=new d.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=d.RecItem,c.axisRenderer=d.RecAxis,c.guideFillRenderer=d.RecFill,c.labelsEnabled=!1,c.chart=b);b=this.unselectedGraph;b||(b=new d.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers);b=this.selectedGraph;b||(b=new d.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers)}this.scrollbarCreated=!0},draw:function(){var a=this;d.ChartScrollbar.base.draw.call(a);if(a.enabled){a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,e=a.categoryAxis,h=a.rotate,f=a.x,g=a.y,k=a.width,l=a.height,m=b.categoryAxis,n=a.set;e.setOrientation(!h);e.parseDates=m.parseDates;e.rotate=h;e.equalSpacing=m.equalSpacing;e.minPeriod=m.minPeriod;e.startOnAxis=m.startOnAxis;e.viW=k;e.viH=l;e.width=k;e.height=l;e.gridCount=a.gridCount;e.gridColor=a.gridColor;e.gridAlpha=a.gridAlpha;e.color=a.color;e.tickLength=0;e.axisAlpha=0;e.autoGridCount=a.autoGridCount;e.parseDates&&!e.equalSpacing&&e.timeZoom(b.firstTime,b.lastTime);e.zoom(0,c.length-1);if(m=a.graph){var q=a.valueAxis,p=m.valueAxis;q.id=p.id;q.rotate=h;q.setOrientation(h);q.width=k;q.height=l;q.viW=k;q.viH=l;q.dataProvider=c;q.reversed=p.reversed;q.logarithmic=p.logarithmic;q.gridAlpha=0;q.axisAlpha=0;n.push(q.set);h?(q.y=g,q.x=0):(q.x=f,q.y=0);var f=Infinity,g=-Infinity,r;for(r=0;r<c.length;r++){var t=c[r].axes[p.id].graphs[m.id].values,u;for(u in t)if(t.hasOwnProperty(u)&&"percents"!=u&&"total"!=u){var z=t[u];z<f&&(f=z);z>g&&(g=z)}}Infinity!=f&&(q.minimum=f);-Infinity!=g&&(q.maximum=g+.1*(g-f));f==g&&(--q.minimum,q.maximum+=1);void 0!==a.minimum&&(q.minimum=a.minimum);void 0!==a.maximum&&(q.maximum=a.maximum);q.zoom(0,c.length-1);u=a.unselectedGraph;u.id=m.id;u.bcn="scrollbar-graph-";u.rotate=h;u.chart=b;u.data=c;u.valueAxis=q;u.chart=m.chart;u.categoryAxis=a.categoryAxis;u.periodSpan=m.periodSpan;u.valueField=m.valueField;u.openField=m.openField;u.closeField=m.closeField;u.highField=m.highField;u.lowField=m.lowField;u.lineAlpha=a.graphLineAlpha;u.lineColorR=a.graphLineColor;u.fillAlphas=a.graphFillAlpha;u.fillColorsR=a.graphFillColor;u.connect=m.connect;u.hidden=m.hidden;u.width=k;u.height=l;u.pointPosition=m.pointPosition;u.stepDirection=m.stepDirection;u.periodSpan=m.periodSpan;p=a.selectedGraph;p.id=m.id;p.bcn=u.bcn+"selected-";p.rotate=h;p.chart=b;p.data=c;p.valueAxis=q;p.chart=m.chart;p.categoryAxis=e;p.periodSpan=m.periodSpan;p.valueField=m.valueField;p.openField=m.openField;p.closeField=m.closeField;p.highField=m.highField;p.lowField=m.lowField;p.lineAlpha=a.selectedGraphLineAlpha;p.lineColorR=a.selectedGraphLineColor;p.fillAlphas=a.selectedGraphFillAlpha;p.fillColorsR=a.selectedGraphFillColor;p.connect=m.connect;p.hidden=m.hidden;p.width=k;p.height=l;p.pointPosition=m.pointPosition;p.stepDirection=m.stepDirection;p.periodSpan=m.periodSpan;b=a.graphType;b||(b=m.type);u.type=b;p.type=b;c=c.length-1;u.zoom(0,c);p.zoom(0,c);p.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});u.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});n.push(u.set);n.push(p.set)}n.push(e.set);n.push(e.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()}},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!d.toBoolean(c);this.zoomScrollbar();this.skipEvent||this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,e=this.dragger.getBBox();b=e.x;var d=e.y,f=e.width,e=e.height,g=this.chart;this.rotate?(b=d,c=e):c=f;f={type:"zoomed",target:this};f.chart=g;var k=this.categoryAxis,l=this.stepWidth,d=g.minSelectedTime,e=!1;if(k.parseDates&&!k.equalSpacing){if(a=g.lastTime,g=g.firstTime,k=Math.round(b/l)+g,b=this.dragging?k+this.timeDifference:Math.round((b+c)/l)+g,k>b&&(k=b),0<d&&b-k<d&&(b=Math.round(k+(b-k)/2),e=Math.round(d/2),k=b-e,b+=e,e=!0),b>a&&(b=a),b-d<k&&(k=b-d),k<g&&(k=g),k+d>b&&(b=k+d),k!=this.startTime||b!=this.endTime)this.startTime=k,this.endTime=b,f.start=k,f.end=b,f.startDate=
new Date(k),f.endDate=new Date(b),this.fire(f.type,f)}else if(k.startOnAxis||(b+=l/2),c-=this.stepWidth/2,d=k.xToIndex(b),b=k.xToIndex(b+c),d!=this.start||this.end!=b)k.startOnAxis&&(this.resizingRight&&d==b&&b++,this.resizingLeft&&d==b&&(0<d?d--:b=1)),this.start=d,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,k.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),this.fire(f.type,f);e&&this.zoomScrollbar()}},zoomScrollbar:function(){var a,b;a=this.chart;var c=a.chartData,e=this.categoryAxis;e.parseDates&&!e.equalSpacing?(c=e.stepWidth,e=a.firstTime,a=c*(this.startTime-e),b=c*(this.endTime-e)):(a=c[this.start].x[e.id],b=c[this.end].x[e.id],c=e.stepWidth,e.startOnAxis||(e=c/2,a-=e,b+=e));this.stepWidth=c;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,c,e){var d=this.selectedGraph;d&&d.set.clipRect(a,b,c,e)},handleDragStart:function(){d.ChartScrollbar.base.handleDragStart.call(this);this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){d.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}})})();(function(){var d=window.AmCharts;d.AmBalloon=d.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor="#000000";this.fadeOutDuration=this.animationDuration=.3;this.fixedPosition=!1;this.offsetY=6;this.offsetX=1;this.textAlign="center";this.disableMouseEvents=!0;this.deltaSignX=this.deltaSignY=1;d.isModern||(this.offsetY*=1.5);d.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY,c=this.chart;d.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);if(!isNaN(a)){var e=this.follow,h=c.container,f=this.set;d.remove(f);this.removeDiv();f=h.set();f.node.style.pointerEvents="none";this.set=f;c.balloonsSet.push(f);if(this.show){var g=this.l,k=this.t,l=this.r,m=this.b,n=this.balloonColor,q=this.fillColor,p=this.borderColor,r=q;void 0!=n&&(this.adjustBorderColor?r=p=n:q=n);var t=this.horizontalPadding,u=this.verticalPadding,z=this.pointerWidth,v=this.pointerOrientation,w=this.cornerRadius,x=c.fontFamily,A=this.fontSize;void 0==A&&(A=c.fontSize);var n=document.createElement("div"),B=c.classNamePrefix;n.className=B+"-balloon-div";this.className&&(n.className=n.className+" "+B+"-balloon-div-"+this.className);B=n.style;this.disableMouseEvents&&(B.pointerEvents="none");B.position="absolute";var D=this.minWidth,C="";isNaN(D)||(C="min-width:"+(D-2*t)+"px; ");n.innerHTML="<div style='text-align:"+this.textAlign+"; "+C+"max-width:"+this.maxWidth+"px; font-size:"+A+"px; color:"+this.color+"; font-family:"+x+"'>"+this.text+"</div>";c.chartDiv.appendChild(n);this.textDiv=n;A=n.offsetWidth;x=n.offsetHeight;n.clientHeight&&(A=n.clientWidth,x=n.clientHeight);x+=2*u;C=A+2*t;!isNaN(D)&&C<D&&(C=D);window.opera&&(x+=2);var I=!1,A=this.offsetY;c.handDrawn&&(A+=c.handDrawScatter+2);"H"!=v?(D=a-C/2,b<k+x+10&&"down"!=v?(I=!0,e&&(b+=A),A=b+z,this.deltaSignY=-1):(e&&(b-=A),A=b-x-z,this.deltaSignY=1)):(2*z>x&&(z=x/2),A=b-x/2,a<g+(l-g)/2?(D=a+z,this.deltaSignX=-1):(D=a-C-z,this.deltaSignX=1));A+x>=m&&(A=m-x);A<k&&(A=k);D<g&&(D=g);D+C>l&&(D=l-C);var k=A+u,m=D+t,u=this.shadowAlpha,H=this.shadowColor,t=this.borderThickness,O=this.bulletSize,J;0<w||0===z?(0<u&&(a=d.rect(h,
C,x,q,0,t+1,H,u,this.cornerRadius),d.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),q=d.rect(h,C,x,q,this.fillAlpha,t,p,this.borderAlpha,this.cornerRadius),this.showBullet&&(J=d.circle(h,O,r,this.fillAlpha),f.push(J))):(r=[],w=[],"H"!=v?(g=a-D,g>C-z&&(g=C-z),g<z&&(g=z),r=[0,g-z,a-D,g+z,C,C,0,0],w=I?[0,0,b-A,0,0,x,x,0]:[x,x,b-A,x,x,0,0,x]):(r=b-A,r>x-z&&(r=x-z),r<z&&(r=z),w=[0,r-z,b-A,r+z,x,x,0,0],r=a<g+(l-g)/2?[0,0,D<a?0:a-D,0,0,C,C,0]:[C,C,D+C>a?C:a-D,C,C,0,0,C]),0<u&&(a=d.polygon(h,r,w,q,
0,t,H,u),a.translate(1,1),f.push(a)),q=d.polygon(h,r,w,q,this.fillAlpha,t,p,this.borderAlpha));this.bg=q;f.push(q);q.toFront();d.setCN(c,q,"balloon-bg");this.className&&d.setCN(c,q,"balloon-bg-"+this.className);h=1*this.deltaSignX;B.left=m+"px";B.top=k+"px";f.translate(D-h,A);q=q.getBBox();this.bottom=A+x+1;this.yPos=q.y+A;J&&J.translate(this.pointToX-D+h,b-A);b=this.animationDuration;0<this.animationDuration&&!e&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY),f.animate({translate:D-h+","+
A},b,"easeOutSine"),n&&(B.left=this.prevTX+"px",B.top=this.prevTY+"px",this.xAnim=c.animate({node:n},"left",this.prevTX,m,b,"easeOutSine","px"),this.yAnim=c.animate({node:n},"top",this.prevTY,k,b,"easeOutSine","px")));this.prevX=D-h;this.prevY=A;this.prevTX=m;this.prevTY=k}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var e=c.getBBox(),a=a-e.width/2,d=b-e.height-10;a<this.l&&(a=this.l);a>this.r-e.width&&(a=this.r-e.width);d<this.t&&(d=b+10);c.translate(a,d);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=d+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,e){this.l=a;this.t=b;this.r=c;this.b=e;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){this.text=a;this.show=!0;this.destroyTO&&clearTimeout(this.destroyTO);a=this.chart;this.fadeAnim1&&a.stopAnim(this.fadeAnim1);this.fadeAnim2&&a.stopAnim(this.fadeAnim2);this.draw()},hide:function(a){var b=this;isNaN(a)&&(a=b.fadeOutDuration);var c=b.chart;if(0<a){b.destroyTO&&clearTimeout(b.destroyTO);b.destroyTO=setTimeout(function(){b.destroy.call(b)},1E3*a);b.follow=!1;b.show=!1;var e=b.set;e&&(e.setAttr("opacity",b.fillAlpha),b.fadeAnim1=e.animate({opacity:0},a,"easeInSine"));b.textDiv&&(b.fadeAnim2=c.animate({node:b.textDiv},"opacity",1,0,a,"easeInSine",""))}else b.show=!1,b.follow=!1,b.destroy()},setPosition:function(a,b,c){this.pointToX=a;this.pointToY=b;c&&(a==this.previousX&&b==this.previousY||this.draw());this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!==b.pShowBullet&&(b.showBullet=b.pShowBullet);clearInterval(b.interval);var c=b.chart.mouseX,e=b.chart.mouseY;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=e,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);d.remove(this.set);this.removeDiv();this.set=null}})})();(function(){var d=window.AmCharts;d.AmCoordinateChart=d.Class({inherits:d.AmChart,construct:function(a){d.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;d.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){d.AmCoordinateChart.base.initChart.call(this);var a=this.categoryAxis;a&&(this.categoryAxis=d.processObject(a,d.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();d.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&this.gridSet.toFront()},createValueAxes:function(){if(0===this.valueAxes.length){var a=new d.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(a){var b=this.graphs,c,e={},h=this.seriesIdField;h||(h=this.categoryField);this.chartData=[];if(a){var f=!1,g,k=this.categoryAxis,l,m,n;k&&(f=k.parseDates,l=k.forceShowField,n=k.classNameField,m=k.labelColorField,g=k.categoryFunction);var q,p,r={},t;f&&(c=d.extractPeriod(k.minPeriod),q=c.period,p=c.count,t=d.getPeriodDuration(q,p));var u={};this.lookupTable=u;var z,v=this.dataDateFormat,w={};for(z=0;z<a.length;z++){var x={},A=a[z];c=A[this.categoryField];x.dataContext=A;x.category=g?g(c,A,k):String(c);l&&(x.forceShow=A[l]);n&&(x.className=A[n]);m&&(x.labelColor=A[m]);u[A[h]]=x;if(f&&(k.categoryFunction?c=k.categoryFunction(c,A,k):(!v||c instanceof Date||(c=c.toString()+" |"),c=d.getDate(c,v,k.minPeriod)),c=d.resetDateToMin(c,q,p,k.firstDayOfWeek),x.category=c,x.time=c.getTime(),isNaN(x.time)))continue;var B=this.valueAxes;x.axes={};x.x={};var D;for(D=0;D<B.length;D++){var C=B[D].id;x.axes[C]={};x.axes[C].graphs={};var I;for(I=0;I<b.length;I++){c=b[I];var H=c.id,O=1.1;isNaN(c.gapPeriod)||(O=c.gapPeriod);var J=c.periodValue;if(c.valueAxis.id==C){x.axes[C].graphs[H]={};var da={};da.index=z;var pa=A;c.dataProvider&&(pa=e);da.values=this.processValues(pa,c,J);!c.connect&&w&&w[H]&&x.time-r[H]>=t*O&&(w[H].gap=!0);this.processFields(c,da,pa);da.category=x.category;da.serialDataItem=x;da.graph=c;x.axes[C].graphs[H]=da;r[H]=x.time;w[H]=da}}}this.chartData[z]=x}}for(a=0;a<b.length;a++)c=b[a],c.dataProvider&&this.parseGraphData(c)},processValues:function(a,b,c){var e={},h,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);for(var g="value error open close low high".split(" "),k=0;k<g.length;k++){var l=g[k];"value"!=l&&"error"!=l&&f&&(c=l.charAt(0).toUpperCase()+l.slice(1));var m=a[b[l+"Field"]+c];h=Number(m);isNaN(h)||(e[l]=h);"date"==b.valueAxis.type&&void 0!==m&&(h=d.getDate(m,b.chart.dataDateFormat),e[l]=h.getTime())}return e},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var e;for(e=0;e<b.length;e++){var d=b[e],f=this.lookupTable[String(d[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(d,a,a.periodValue),this.processFields(a,g,d))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var e=b[c];e&&e.valueAxis==a&&this.removeGraph(e)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.ValueAxis,this.theme);a[b]=c;c.chart=this;c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var e=a[c];(void 0!==e.category||void 0!==e.date)&&b&&b.addGuide(e);e.id||(e.id="guideAuto"+c+"_"+(new Date).getTime());var h=e.valueAxis;h?(d.isString(h)&&(h=this.getValueAxisById(h)),h?h.addGuide(e):this.valueAxes[0].addGuide(e)):isNaN(e.value)||this.valueAxes[0].addGuide(e)}},processGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;d.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime())}},formatString:function(a,b,c){var e=b.graph,h=e.valueAxis;h.duration&&b.values.value&&(h=d.formatDuration(b.values.value,h.duration,"",h.durationUnits,h.maxInterval,h.numberFormatter),a=a.split("[[value]]").join(h));a=d.massReplace(a,{"[[title]]":e.title,"[[description]]":b.description});a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var e=a.lineColor,d=a.balloonColor;c&&(d=e);c=a.fillColorsR;"object"==typeof c?e=c[0]:void 0!==c&&(e=c);b.isNegative&&(c=a.negativeLineColor,a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(e=c));void 0!==b.color&&(e=b.color);void 0===d&&(d=e);return d},getGraphById:function(a){return d.getObjById(this.graphs,a)},getValueAxisById:function(a){return d.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var e=a.itemColors,h=b.index;b.color=h<e.length?e[h]:d.randomColor()}e="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" ");for(h=0;h<e.length;h++){var f=e[h],g=a[f+"Field"];g&&(g=c[g],d.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:d.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;a=a.dataItem;if(!this.legend.data&&a){var c=a.hidden,e=a.showBalloon;switch(b){case"clickMarker":this.textClickEnabled&&(e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case"clickLabel":e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case"rollOverItem":c||this.highlightGraph(a);break;case"rollOutItem":c||this.unhighlightGraph();break;case"hideItem":this.hideGraph(a);break;case"showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs,c,e=.2;this.legend&&(e=this.legend.rollOverGraphAlpha);if(1!=e)for(c=0;c<b.length;c++){var d=b[c];d!=a&&d.changeOpacity(e)}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&(this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}})})();(function(){var d=window.AmCharts;d.AmSlicedChart=d.Class({inherits:d.AmChart,construct:function(a){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice","rightClickSlice");d.AmSlicedChart.base.construct.call(this,a);this.colors="#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");this.alpha=1;this.groupPercent=0;this.groupedTitle="Other";this.groupedPulled=!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.hoverAlpha=1;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startAlpha=0;this.startDuration=1;this.startEffect="bounce";this.sequencedAnimation=!0;this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelTickColor="#000000";this.labelTickAlpha=.2;this.hideLabelsPercent=0;this.urlTarget="_self";this.autoMarginOffset=10;this.gradientRatio=[];this.maxLabelWidth=200;d.applyTheme(this,a,"AmSlicedChart")},initChart:function(){d.AmSlicedChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.setLegendData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type,c=a.dataItem,e=this.legend;if(!e.data&&c){var d=c.hidden;a=a.event;switch(b){case"clickMarker":d||e.switchable||this.clickSlice(c,a);break;case"clickLabel":d||this.clickSlice(c,a,!1);break;case"rollOverItem":d||this.rollOverSlice(c,!1,a);break;case"rollOutItem":d||this.rollOutSlice(c,a);break;case"hideItem":this.hideSlice(c,a);break;case"showItem":this.showSlice(c,a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;a&&a.invalidateSize()},addEventListeners:function(a,b){var c=this;a.mouseover(function(a){c.rollOverSlice(b,!0,a)}).mouseout(function(a){c.rollOutSlice(b,a)}).touchend(function(a){c.rollOverSlice(b,a);c.panEventsEnabled&&c.clickSlice(b,a)}).touchstart(function(a){c.rollOverSlice(b,a)}).click(function(a){c.clickSlice(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)})},formatString:function(a,b,c){a=d.formatValue(a,b,["value"],this.nf,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);var e=this.pf.precision;isNaN(this.tempPrec)||(this.pf.precision=this.tempPrec);a=d.formatValue(a,b,["percents"],this.pf);a=d.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description});this.pf.precision=e;-1!=a.indexOf("[[")&&(a=d.formatDataContextValue(a,b.dataContext));a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},startSlices:function(){var a;for(a=0;a<this.chartData.length;a++)0<this.startDuration&&this.sequencedAnimation?this.setStartTO(a):this.startSlice(this.chartData[a])},setStartTO:function(a){var b=this;a=setTimeout(function(){b.startSequenced.call(b)},b.startDuration/b.chartData.length*500*a);b.timeOuts.push(a)},pullSlices:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++){var e=b[c];e.pulled&&this.pullSlice(e,1,a)}},startSequenced:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);break}},startSlice:function(a){a.started=!0;var b=a.wedge,c=this.startDuration;b&&0<c&&(0<a.alpha&&b.show(),b.translate(a.startX,a.startY),b.animate({opacity:1,translate:"0,0"},c,this.startEffect))},showLabels:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(0<c.alpha){var e=c.label;e&&e.show();(c=c.tick)&&c.show()}}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=!1;this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);if(!a.hidden){this.pullOnHover&&this.pullSlice(a,1);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var e=a.balloonX,h=a.balloonY;a.pulled&&(e+=a.pullX,h+=a.pullY);var f=this.formatString(this.balloonText,a,!0),g=this.balloonFunction;g&&(f=g(a,f));g=d.adjustLuminosity(a.color,-.15);f?this.showBalloon(f,g,b,e,h):this.hideBalloon();0===a.value&&this.hideBalloon();a={type:"rollOverSlice",dataItem:a,chart:this,event:c};this.fire(a.type,a)}},rollOutSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:1});this.hideBalloon();var c={type:"rollOutSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},clickSlice:function(a,b,c){isNaN(a)||(a=this.chartData[a]);a.pulled?this.pullSlice(a,0):this.pullSlice(a,1);d.getURL(a.url,this.urlTarget);c||(a={type:"clickSlice",dataItem:a,chart:this,event:b},this.fire(a.type,a))},handleRightClick:function(a,b){isNaN(a)||(a=this.chartData[a]);var c={type:"rightClickSlice",dataItem:a,chart:this,event:b};this.fire(c.type,c)},drawTicks:function(){var a=this.chartData,b;for(b=0;b<a.length;b++){var c=a[b];if(c.label){var e=c.ty,e=d.line(this.container,[c.tx0,c.tx,c.tx2],[c.ty0,e,e],this.labelTickColor,this.labelTickAlpha);d.setCN(this,e,this.type+"-tick");d.setCN(this,e,c.className,!0);c.tick=e;c.wedge.push(e)}}},initialStart:function(){var a=this,b=a.startDuration,c=setTimeout(function(){a.showLabels.call(a)},1E3*b);a.timeOuts.push(c);a.chartCreated?a.pullSlices(!0):(a.startSlices(),0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices(!0))},pullSlice:function(a,b,c){var e=this.pullOutDuration;!0===c&&(e=0);(c=a.wedge)&&(0<e?c.animate({translate:b*a.pullX+","+b*a.pullY},e,this.pullOutEffect):c.translate(b*a.pullX,b*a.pullY));1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){var b=this.chartData,c;for(c=0;c<this.chartData.length;c++)c!=a&&b[c].pulled&&this.pullSlice(b[c],0)},pullOutAll:function(){var a=this.chartData,b;for(b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;isNaN(this.pieAlpha)||(this.alpha=this.pieAlpha);if(void 0!==b){var c=b.length,e=0,h,f,g;for(h=0;h<c;h++){f={};var k=b[h];f.dataContext=k;f.value=Number(k[this.valueField]);(g=k[this.titleField])||(g="");f.title=g;f.pulled=d.toBoolean(k[this.pulledField],!1);(g=k[this.descriptionField])||(g="");f.description=g;f.labelRadius=Number(k[this.labelRadiusField]);f.switchable=!0;f.className=k[this.classNameField];f.url=k[this.urlField];g=k[this.patternField];!g&&this.patterns&&(g=this.patterns[h]);f.pattern=g;f.visibleInLegend=d.toBoolean(k[this.visibleInLegendField],!0);g=k[this.alphaField];f.alpha=void 0!==g?Number(g):this.alpha;g=k[this.colorField];void 0!==g&&(f.color=g);f.labelColor=d.toColor(k[this.labelColorField]);e+=f.value;f.hidden=!1;a[h]=f}for(h=b=0;h<c;h++)f=a[h],f.percents=f.value/e*100,f.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),a.push({title:this.groupedTitle,value:this.groupValue,percents:this.groupValue/
e*100,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha,pattern:this.groupedPattern,className:this.groupedClassName,dataContext:{}}));c=this.baseColor;c||(c=this.pieBaseColor);e=this.brightnessStep;e||(e=this.pieBrightnessStep);for(h=0;h<a.length;h++)c?g=d.adjustLuminosity(c,h*e/100):(g=this.colors[h],void 0===g&&(g=d.randomColor())),void 0===a[h].color&&(a[h].color=g);this.recalculatePercents()}},recalculatePercents:function(){var a=this.chartData,b=0,c,e;for(c=0;c<a.length;c++)e=a[c],!e.hidden&&0<e.value&&(b+=e.value);for(c=0;c<a.length;c++)e=this.chartData[c],e.percents=!e.hidden&&0<e.value?100*e.value/b:0},removeSmallSlices:function(){var a=this.chartData,b;for(b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();for(var b=0;b<a.chartData.length;b++){var c=a.chartData[b];c.started=!1;var e=c.wedge;e&&e.translate(c.startX,c.startY)}b=a.startDuration;0<b?(b=setTimeout(function(){a.pullSlices.call(a)},1200*b),a.timeOuts.push(b)):a.pullSlices()},measureMaxLabel:function(){var a=this.chartData,b=0,c;for(c=0;c<a.length;c++){var e=a[c],h=this.formatString(this.labelText,e),f=this.labelFunction;f&&(h=f(e,h));e=d.text(this.container,h,this.color,this.fontFamily,this.fontSize);h=e.getBBox().width;h>b&&(b=h);e.remove()}return b}})})();(function(){var d=window.AmCharts;d.AmRectangularChart=d.Class({inherits:d.AmCoordinateChart,construct:function(a){d.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplier=this.widthMultiplier=1;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=0;this.zoomOutButtonImageSize=19;this.zoomOutButtonImage="lens.png";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;d.applyTheme(this,a,"AmRectangularChart")},initChart:function(){d.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),a=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){d.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(d.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw()}},resetMargins:function(){var a={},b;if("xy"==this.type){var c=this.xAxes,e=this.yAxes;for(b=0;b<c.length;b++){var d=c[b];d.ignoreAxisWidth||(d.setOrientation(!0),d.fixAxisPosition(),a[d.position]=!0)}for(b=0;b<e.length;b++)c=e[b],c.ignoreAxisWidth||(c.setOrientation(!1),c.fixAxisPosition(),a[c.position]=!0)}else{e=this.valueAxes;for(b=0;b<e.length;b++)c=e[b],c.ignoreAxisWidth||(c.setOrientation(this.rotate),c.fixAxisPosition(),a[c.position]=!0);(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,e=this.fixMargins,d=this.realWidth,f=this.realHeight,g=c,k=c,l=d;b=f;var m;for(m=0;m<a.length;m++)a[m].handleSynchronization(),b=this.getAxisBounds(a[m],g,l,k,b),g=Math.round(b.l),l=Math.round(b.r),k=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,g,l,k,b),g=Math.round(b.l),l=Math.round(b.r),k=Math.round(b.t),b=Math.round(b.b);e.left&&g<c&&(this.marginLeft=Math.round(-g+c));e.right&&l>=d-c&&(this.marginRight=Math.round(l-d+c));e.top&&k<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-k+c+this.titleHeight));e.bottom&&b>f-c&&(this.marginBottom=Math.round(this.marginBottom+b-f+c));this.initChart()},getAxisBounds:function(a,b,c,e,d){if(!a.ignoreAxisWidth){var f=a.labelsSet,g=a.tickLength;a.inside&&(g=0);if(f)switch(f=a.getBBox(),a.position){case"top":a=f.y;e>a&&(e=a);break;case"bottom":a=f.y+f.height;d<a&&(d=a);break;case"right":a=f.x+f.width+g+3;c<a&&(c=a);break;case"left":a=f.x-g,b>a&&(b=a)}}return{l:b,t:e,r:c,b:d}},drawZoomOutButton:function(){var a=this;if(!a.zbSet){var b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,e=a.fontSize,h=a.zoomOutButtonImageSize,f=a.zoomOutButtonImage,g=d.lang.zoomOutText||a.zoomOutText,k=a.zoomOutButtonColor,l=a.zoomOutButtonAlpha,m=a.zoomOutButtonFontSize,n=a.zoomOutButtonPadding;isNaN(m)||(e=m);(m=a.zoomOutButtonFontColor)&&(c=m);var m=a.zoomOutButton,q;m&&(m.fontSize&&(e=m.fontSize),m.color&&(c=m.color),m.backgroundColor&&(k=m.backgroundColor),isNaN(m.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=m.backgroundAlpha));var p=m=0;void 0!==a.pathToImages&&f&&(q=a.container.image(a.pathToImages+f,0,0,h,h),d.setCN(a,q,"zoom-out-image"),b.push(q),q=q.getBBox(),m=q.width+5);void 0!==g&&(c=d.text(a.container,g,c,a.fontFamily,e,"start"),d.setCN(a,c,"zoom-out-label"),e=c.getBBox(),p=q?q.height/2-3:e.height/2,c.translate(m,p),b.push(c));q=b.getBBox();c=1;d.isModern||(c=0);k=d.rect(a.container,q.width+2*n+5,q.height+2*n-2,k,1,1,k,c);k.setAttr("opacity",l);k.translate(-n,-n);d.setCN(a,k,"zoom-out-bg");b.push(k);k.toBack();a.zbBG=k;q=k.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-q.width+n,a.marginTopReal+n);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(l=0;l<b.length;l++)b[l].attr({cursor:"pointer"});a.zbSet=b}},rollOverZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,e=this.marginTopReal,h=this.plotAreaWidth-1,f=this.plotAreaHeight-1,g=this.plotAreaFillColors,k=this.plotAreaFillAlphas,l=this.plotAreaBorderColor,m=this.plotAreaBorderAlpha;"object"==typeof k&&(k=k[0]);g=d.polygon(this.container,[0,h,h,0,0],[0,0,f,f,0],g,k,1,l,m,this.plotAreaGradientAngle);d.setCN(this,g,"plot-area");g.translate(c+a,e+b);this.set.push(g);0!==a&&0!==b&&(g=this.plotAreaFillColors,"object"==typeof g&&(g=g[0]),g=d.adjustLuminosity(g,-.15),h=d.polygon(this.container,[0,a,h+a,h,0],[0,b,b,0,0],g,k,1,l,m),d.setCN(this,h,"plot-area-bottom"),h.translate(c,e+f),this.set.push(h),a=d.polygon(this.container,[0,0,a,a,0],[0,f,f+b,b,0],g,k,1,l,m),d.setCN(this,a,"plot-area-left"),a.translate(c,e),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);a=a-this.marginLeftReal-this.marginRightReal-this.dx;b=b-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/
180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy;this.fixMargins&&!this.fixMargins.top&&(this.marginTopReal+=a);this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b=this.marginLeftReal,c=this.marginTopReal,e=this.plotAreaHeight,h=this.plotAreaWidth,f;for(f=0;f<a.length;f++){var g=a[f];g.axisRenderer=d.RecAxis;g.guideFillRenderer=d.RecFill;g.axisItemRenderer=d.RecItem;g.dx=this.dx;g.dy=this.dy;g.viW=h-1;g.viH=e-1;g.marginsChanged=!0;g.viX=b;g.viY=c;this.updateObjectSize(g)}},updateObjectSize:function(a){a.width=(this.plotAreaWidth-1)*this.widthMultiplier;a.height=(this.plotAreaHeight-1)*this.heightMultiplier;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.x=this.marginLeftReal+this.horizontalPosition;c.y=this.marginTopReal+this.verticalPosition;c.width=this.plotAreaWidth*this.widthMultiplier;c.height=this.plotAreaHeight*this.heightMultiplier;c.index=b;c.dx=this.dx;c.dy=this.dy;c.rotate=this.rotate}},updateChartCursor:function(){var a=this.chartCursor;a&&(a=d.processObject(a,d.ChartCursor,this.theme),this.addChartCursor(a),a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth-1,a.height=this.plotAreaHeight-1,a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=d.processObject(a,d.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},addChartCursor:function(a){d.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){d.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal+this.horizontalPosition,c.y=this.marginTopReal+this.verticalPosition,c.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.position,e=a.scrollbarHeight+a.offset;a.enabled&&("top"==c?b?this.marginLeftReal+=e:this.marginTopReal+=e:b?this.marginRightReal+=e:this.marginBottomReal+=e)},getScrollbarPosition:function(a,b,c){var e="bottom",d="top";a.oppositeAxis||(d=e,e="top");a.position=b?"bottom"==c||"left"==c?e:d:"top"==c||"right"==c?e:d},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,e=this.marginLeftReal,d=a.scrollbarHeight,f=this.dx,g=this.dy,k=a.offset;"top"==a.position?b?(a.y=c,a.x=e-d-k):(a.y=c-d+g-k,a.x=e+f):b?(a.y=c+g,a.x=e+this.plotAreaWidth+f+k):(a.y=c+this.plotAreaHeight+k,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;a&&(b=this.zoomOutText,""!==b&&b&&this.drawZoomOutButton());if(b=this.zbSet)this.zoomButtonSet.push(b),a?b.show():b.hide(),this.rollOutZB()},handleReleaseOutside:function(a){d.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside&&a.handleReleaseOutside()},handleMouseDown:function(a){d.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(){},update:function(){d.AmRectangularChart.base.update.call(this);this.chartCursor&&this.chartCursor.update&&this.chartCursor.update()}})})();(function(){var d=window.AmCharts;d.TrendLine=d.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,e,h,f,g,k=a.categoryAxis,l=a.initialDate,m=a.initialCategory,n=a.finalDate,q=a.finalCategory,p=a.valueAxis,r=a.valueAxisX,t=a.initialXValue,u=a.finalXValue,z=a.initialValue,v=a.finalValue,w=p.recalculateToPercents,x=b.dataDateFormat;k&&(l&&(l=d.getDate(l,x,"fff"),a.initialDate=l,e=k.dateToCoordinate(l)),m&&(e=k.categoryToCoordinate(m)),n&&(n=d.getDate(n,x,"fff"),a.finalDate=n,h=k.dateToCoordinate(n)),q&&(h=k.categoryToCoordinate(q)));r&&!w&&(isNaN(t)||(e=r.getCoordinate(t)),isNaN(u)||(h=r.getCoordinate(u)));p&&!w&&(isNaN(z)||(f=p.getCoordinate(z)),isNaN(v)||(g=p.getCoordinate(v)));isNaN(e)||isNaN(h)||isNaN(f)||isNaN(f)||(b.rotate?(k=[f,g],h=[e,h]):(k=[e,h],h=[f,g]),f=a.lineColor,e=d.line(c,k,h,f,a.lineAlpha,a.lineThickness,a.dashLength),g=k,l=h,q=k[1]-k[0],p=h[1]-h[0],0===q&&(q=.01),0===p&&(p=.01),m=q/Math.abs(q),n=p/Math.abs(p),p=q*p/Math.abs(q*p)*Math.sqrt(Math.pow(q,2)+Math.pow(p,2)),q=Math.asin(q/p),p=90*Math.PI/180-q,q=Math.abs(5*Math.cos(p)),p=Math.abs(5*Math.sin(p)),g.push(k[1]-m*p,k[0]-m*p),l.push(h[1]+n*q,h[0]+n*q),k=d.polygon(c,g,l,f,.005,0),c=c.set([k,e]),c.translate(b.marginLeftReal,b.marginTopReal),b.trendLinesSet.push(c),d.setCN(b,e,"trend-line"),d.setCN(b,e,"trend-line-"+a.id),a.line=e,a.set=c,k.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}),k.touchend&&k.touchend(function(){a.handleLineClick()}),c.clipRect(0,0,b.plotAreaWidth,b.plotAreaHeight))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.circle=function(a,b,c,e,h,f,g,k,l){0>=b&&(b=.001);if(void 0==h||0===h)h=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);e={fill:c,stroke:f,"fill-opacity":e,"stroke-width":h,"stroke-opacity":g};a=isNaN(l)?a.circle(0,0,b).attr(e):a.ellipse(0,0,b,l).attr(e);k&&a.gradient("radialGradient",[c,d.adjustLuminosity(c,-.6)]);return a};d.text=function(a,b,c,e,h,f,g,k){f||(f="middle");"right"==f&&(f="end");"left"==f&&(f="start");isNaN(k)&&(k=1);void 0!==b&&(b=String(b),d.isIE&&!d.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":e,"font-size":h,opacity:k};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};d.polygon=function(a,b,c,e,h,f,g,k,l,m,n){isNaN(f)&&(f=.01);isNaN(k)&&(k=h);var q=e,p=!1;"object"==typeof q&&1<q.length&&(p=!0,q=q[0]);void 0===g&&(g=q);h={fill:q,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};void 0!==n&&0<n&&(h["stroke-dasharray"]=n);n=d.dx;f=d.dy;a.handDrawn&&(c=d.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;m&&(g=d.doNothing);m="M"+(g(b[0])+n)+","+(g(c[0])+f);for(k=1;k<b.length;k++)m+=" L"+(g(b[k])+n)+","+(g(c[k])+f);a=a.path(m+" Z").attr(h);p&&a.gradient("linearGradient",e,l);return a};d.rect=function(a,b,c,e,h,f,g,k,l,m,n){if(isNaN(b)||isNaN(c))return a.set();isNaN(f)&&(f=0);void 0===l&&(l=0);void 0===m&&(m=270);isNaN(h)&&(h=0);var q=e,p=!1;"object"==typeof q&&(q=q[0],p=!0);void 0===g&&(g=q);void 0===k&&(k=h);b=Math.round(b);c=Math.round(c);var r=0,t=0;0>b&&(b=Math.abs(b),r=-b);0>c&&(c=Math.abs(c),t=-c);r+=d.dx;t+=d.dy;h={fill:q,stroke:g,"fill-opacity":h,"stroke-opacity":k};void 0!==n&&0<n&&(h["stroke-dasharray"]=n);a=a.rect(r,t,b,c,l,f).attr(h);p&&a.gradient("linearGradient",e,m);return a};d.bullet=function(a,b,c,e,h,f,g,k,l,m,n,q){var p;"circle"==b&&(b="round");switch(b){case"round":p=d.circle(a,c/2,e,h,f,g,k);break;case"square":p=d.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180);break;case"rectangle":p=d.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180);break;case"diamond":p=d.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],e,h,f,g,k);break;case"triangleUp":p=d.triangle(a,c,0,e,h,f,g,k);break;case"triangleDown":p=d.triangle(a,c,180,e,h,f,g,k);break;case"triangleLeft":p=d.triangle(a,c,270,e,h,f,g,k);break;case"triangleRight":p=d.triangle(a,c,90,e,h,f,g,k);break;case"bubble":p=d.circle(a,c/2,e,h,f,g,k,!0);break;case"line":p=d.line(a,[-c/2,c/2],[0,0],e,h,f,g,k);break;case"yError":p=a.set();p.push(d.line(a,[0,0],[-c/2,c/2],e,h,f));p.push(d.line(a,[-l,l],[-c/2,-c/2],e,h,f));p.push(d.line(a,[-l,l],[c/2,c/2],e,h,f));break;case"xError":p=a.set(),p.push(d.line(a,[-c/2,c/2],[0,0],e,h,f)),p.push(d.line(a,[-c/2,-c/2],[-l,l],e,h,f)),p.push(d.line(a,[c/2,c/2],[-l,l],e,h,f))}p&&p.pattern(n,NaN,q);return p};d.triangle=function(a,b,c,e,d,f,g,k){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===k&&(k=0);e={fill:e,stroke:g,"fill-opacity":d,"stroke-width":f,"stroke-opacity":k};b/=2;var l;0===c&&(l=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(l=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(l=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(l=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(l).attr(e)};d.line=function(a,b,c,e,h,f,g,k,l,m,n){if(a.handDrawn&&!n)return d.handDrawnLine(a,b,c,e,h,f,g,k,l,m,n);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e=Math.round;m&&(e=d.doNothing);m=d.dx;h=d.dy;g="M"+(e(b[0])+m)+","+(e(c[0])+h);for(k=1;k<b.length;k++)g+=" L"+(e(b[k])+m)+","+(e(c[k])+h);if(d.VML)return a.path(g,void 0,!0).attr(f);l&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};d.makeHD=function(a,b,c){for(var e=[],d=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),k=Number(b[f-1]),l=Number(a[f]),m=Number(b[f]),n=Math.sqrt(Math.pow(l-g,2)+Math.pow(m-k,2)),n=Math.round(n/50)+1,l=(l-g)/n,m=(m-k)/n,q=0;q<=n;q++){var p=g+q*l+Math.random()*c,r=k+q*m+Math.random()*c;e.push(p);d.push(r)}return[e,d]};
d.handDrawnLine=function(a,b,c,e,h,f,g,k,l,m){var n,q=a.set();for(n=1;n<b.length;n++)for(var p=[b[n-1],b[n]],r=[c[n-1],c[n]],r=d.makeHD(p,r,a.handDrawScatter),p=r[0],r=r[1],t=1;t<p.length;t++)q.push(d.line(a,[p[t-1],p[t]],[r[t-1],r[t]],e,h,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,k,l,m,!0));return q};d.doNothing=function(a){return a};d.wedge=function(a,b,c,e,h,f,g,k,l,m,n,q,p){var r=Math.round;f=r(f);g=r(g);k=r(k);var t=r(g/f*k),u=d.VML,z=359.5+f/100;359.94<z&&(z=359.94);h>=z&&(h=z);var v=1/180*Math.PI,z=b+Math.sin(e*v)*k,w=c-Math.cos(e*v)*t,x=b+Math.sin(e*v)*f,A=c-Math.cos(e*v)*g,B=b+Math.sin((e+h)*v)*f,D=c-Math.cos((e+h)*v)*g,C=b+Math.sin((e+h)*v)*k,v=c-Math.cos((e+h)*v)*t,I={fill:d.adjustLuminosity(m.fill,-.2),"stroke-opacity":0,"fill-opacity":m["fill-opacity"]},H=0;180<Math.abs(h)&&(H=1);e=a.set();var O;u&&(z=r(10*z),x=r(10*x),B=r(10*B),C=r(10*C),w=r(10*w),A=r(10*A),D=r(10*D),v=r(10*v),b=r(10*b),l=r(10*l),c=r(10*c),f*=10,g*=10,k*=10,t*=10,1>Math.abs(h)&&1>=Math.abs(B-
x)&&1>=Math.abs(D-A)&&(O=!0));h="";var J;q&&(I["fill-opacity"]=0,I["stroke-opacity"]=m["stroke-opacity"]/2,I.stroke=m.stroke);0<l&&(J=" M"+z+","+(w+l)+" L"+x+","+(A+l),u?(O||(J+=" A"+(b-f)+","+(l+c-g)+","+(b+f)+","+(l+c+g)+","+x+","+(A+l)+","+B+","+(D+l)),J+=" L"+C+","+(v+l),0<k&&(O||(J+=" B"+(b-k)+","+(l+c-t)+","+(b+k)+","+(l+c+t)+","+C+","+(l+v)+","+z+","+(l+w)))):(J+=" A"+f+","+g+",0,"+H+",1,"+B+","+(D+l)+" L"+C+","+(v+l),0<k&&(J+=" A"+k+","+t+",0,"+H+",0,"+z+","+(w+l))),J=a.path(J+" Z",void 0,void 0,"1000,1000").attr(I),e.push(J),J=a.path(" M"+z+","+w+" L"+z+","+(w+l)+" L"+x+","+(A+l)+" L"+x+","+A+" L"+z+","+w+" Z",void 0,void 0,"1000,1000").attr(I),l=a.path(" M"+B+","+D+" L"+B+","+(D+l)+" L"+C+","+(v+l)+" L"+C+","+v+" L"+B+","+D+" Z",void 0,void 0,"1000,1000").attr(I),e.push(J),e.push(l));u?(O||(h=" A"+r(b-f)+","+r(c-g)+","+r(b+f)+","+r(c+g)+","+r(x)+","+r(A)+","+r(B)+","+r(D)),f=" M"+r(z)+","+r(w)+" L"+r(x)+","+r(A)+h+" L"+r(C)+","+r(v)):f=" M"+z+","+w+" L"+x+","+A+(" A"+f+","+g+",0,"+
H+",1,"+B+","+D)+" L"+C+","+v;0<k&&(u?O||(f+=" B"+(b-k)+","+(c-t)+","+(b+k)+","+(c+t)+","+C+","+v+","+z+","+w):f+=" A"+k+","+t+",0,"+H+",0,"+z+","+w);a.handDrawn&&(b=d.line(a,[z,x],[w,A],m.stroke,m.thickness*Math.random()*a.handDrawThickness,m["stroke-opacity"]),e.push(b));a=a.path(f+" Z",void 0,void 0,"1000,1000").attr(m);if(n){b=[];for(c=0;c<n.length;c++)b.push(d.adjustLuminosity(m.fill,n[c]));0<b.length&&a.gradient("linearGradient",b)}a.pattern(q,NaN,p);e.wedge=a;e.push(a);return e};d.adjustLuminosity=function(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",d,h;for(h=0;3>h;h++)d=parseInt(a.substr(2*h,2),16),d=Math.round(Math.min(Math.max(0,d+d*b),255)).toString(16),c+=("00"+d).substr(d.length);return c}})();(function(){var d=window.AmCharts;d.Bezier=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m){"object"==typeof g&&(g=g[0]);"object"==typeof k&&(k=k[0]);0===k&&(g="none");f={fill:g,"fill-opacity":k,"stroke-width":f};void 0!==l&&0<l&&(f["stroke-dasharray"]=l);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e="M"+Math.round(b[0])+","+Math.round(c[0]);h=[];for(l=0;l<b.length;l++)h.push({x:Number(b[l]),y:Number(c[l])});1<h.length&&(b=this.interpolate(h),e+=this.drawBeziers(b));m?e+=m:d.VML||(e+="M0,0 L0,0");this.path=a.path(e).attr(f);this.node=this.path.node},interpolate:function(a){var b=[];b.push({x:a[0].x,y:a[0].y});var c=a[1].x-a[0].x,e=a[1].y-a[0].y,h=d.bezierX,f=d.bezierY;b.push({x:a[0].x+c/h,y:a[0].y+e/f});var g;for(g=1;g<a.length-1;g++){var k=a[g-1],l=a[g],e=a[g+1];isNaN(e.x)&&(e=l);isNaN(l.x)&&(l=k);isNaN(k.x)&&(k=l);c=e.x-l.x;e=e.y-k.y;k=l.x-k.x;k>c&&(k=c);b.push({x:l.x-k/h,y:l.y-e/f});b.push({x:l.x,y:l.y});b.push({x:l.x+k/h,y:l.y+e/f})}e=a[a.length-1].y-a[a.length-2].y;c=a[a.length-1].x-
a[a.length-2].x;b.push({x:a[a.length-1].x-c/h,y:a[a.length-1].y-e/f});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){var b="",c;for(c=0;c<(a.length-1)/3;c++)b+=this.drawBezierMidpoint(a[3*c],a[3*c+1],a[3*c+2],a[3*c+3]);return b},drawBezierMidpoint:function(a,b,c,d){var h=Math.round,f=this.getPointOnSegment(a,b,.75),g=this.getPointOnSegment(d,c,.75),k=(d.x-a.x)/16,l=(d.y-a.y)/16,m=this.getPointOnSegment(a,b,.375);a=this.getPointOnSegment(f,g,.375);a.x-=k;a.y-=l;b=this.getPointOnSegment(g,
f,.375);b.x+=k;b.y+=l;c=this.getPointOnSegment(d,c,.375);k=this.getMiddle(m,a);f=this.getMiddle(f,g);g=this.getMiddle(b,c);m=" Q"+h(m.x)+","+h(m.y)+","+h(k.x)+","+h(k.y);m+=" Q"+h(a.x)+","+h(a.y)+","+h(f.x)+","+h(f.y);m+=" Q"+h(b.x)+","+h(b.y)+","+h(g.x)+","+h(g.y);return m+=" Q"+h(c.x)+","+h(c.y)+","+h(d.x)+","+h(d.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}}})})();(function(){var d=window.AmCharts;d.AmDraw=d.Class({construct:function(a,b,c,e){d.SVG_NS="http://www.w3.org/2000/svg";d.SVG_XLINK="http://www.w3.org/1999/xlink";d.hasSVG=!!document.createElementNS&&!!document.createElementNS(d.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");d.hasSVG?(d.SVG=!0,b=this.createSvgElement("svg"),a.appendChild(b),this.container=b,this.addDefs(e),this.R=new d.SVGRenderer(this)):d.isIE&&d.VMLRenderer&&
(d.VML=!0,d.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?(b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),d.vmlStyleSheet=b):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new d.VMLRenderer(this,e),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(d.SVG_NS,a)},circle:function(a,b,c,e){var h=new d.AmDObject("circle",this);h.attr({r:c,cx:a,cy:b});this.addToContainer(h.node,e);return h},ellipse:function(a,b,c,e,h){var f=new d.AmDObject("ellipse",this);f.attr({rx:c,ry:e,cx:a,cy:b});this.addToContainer(f.node,h);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,e,h,f,g){var k=new d.AmDObject("rect",this);d.VML&&(h=Math.round(100*h/Math.min(c,e)),c+=2*f,e+=2*f,k.bw=f,k.node.style.marginLeft=-f,k.node.style.marginTop=-f);1>c&&(c=1);1>e&&(e=1);k.attr({x:a,y:b,width:c,height:e,rx:h,ry:h,"stroke-width":f});this.addToContainer(k.node,g);return k},image:function(a,b,c,e,h,f){var g=new d.AmDObject("image",this);g.attr({x:b,y:c,width:e,height:h});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,e){var h=new d.AmDObject("path",this);e||(e="100,100");h.attr({cs:e});c?h.attr({dd:a}):h.attr({d:a});this.addToContainer(h.node,b);return h},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}a=1-c.e%1;c=1-c.f%1;.5<a&&--a;.5<c&&--c;a&&(b.left=a+"px");c&&(b.top=c+"px")},update:function(){this.R.update()},addDefs:function(a){if(d.hasSVG){var b=this.createSvgElement("desc"),c=this.container;c.setAttribute("version","1.1");c.style.position="absolute";this.setSize(this.width,this.height);d.rtl&&(c.setAttribute("direction","rtl"),c.style.left="auto",c.style.right="0px");a.addCodeCredits&&b.appendChild(document.createTextNode("JavaScript chart by amCharts "+a.version));c.appendChild(b);a.defs&&(b=this.createSvgElement("defs"),c.appendChild(b),d.parseDefs(a.defs,b),this.defs=b)}}})})();(function(){var d=window.AmCharts;d.AmDObject=d.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var e in a)if(a.hasOwnProperty(e)){var h=e,f=a[e];c=d.getEffect(c);this.R.animate(this,h,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(){d.removeFromArray(this.R.animations,this.an_x);d.removeFromArray(this.R.animations,this.an_y)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,b,c){a&&this.R.pattern(this,a,b,c)}})})();(function(){var d=window.AmCharts;d.VMLRenderer=d.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type="image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var h=document.createElement("amvml:fill");c.appendChild(h);a.fill=h;h.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var e;8===document.documentMode&&(e=!0);var h=a.node,f=a.type,g=h.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-d.removePx(g.width)/2);"cy"==b&&(g.top=c-d.removePx(g.height)/2);var k=this.styleMap[b];void 0!==k&&(g[k]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,k=h.clientWidth,"end"==c&&(g.marginLeft=-k+"px"),"middle"==c&&(g.marginLeft=-(k/2)+"px",g.textAlign="center"),
"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(k=0;k<g.length;k++)g[k].setAttr(b,c);if("shape"==f){"cs"==b&&(h.style.width="100px",h.style.height="100px",h.setAttribute("coordsize",c));"d"==b&&h.setAttribute("path",this.svgPathToVml(c));"dd"==b&&h.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(e?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(e?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(e?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),e?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?e?a.on=!1:a.setAttribute("on",!1):e?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(e?a.color=c:a.setAttribute("color",c));"rx"==b&&(e?h.arcSize=c+"%":h.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,b,c){var e=new d.AmDObject("text",this.D),h=e.node;h.style.whiteSpace="pre";h.innerHTML=a;this.D.addToContainer(h,c);this.attr(e,b);return e},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,h=a.offsetHeight,f;if(a.hasChildNodes()){var g,k,l;for(l=0;l<a.childNodes.length;l++){f=this.getBox(a.childNodes[l]);var m=f.x;isNaN(m)||(isNaN(g)?g=m:m<g&&(g=m));var n=f.y;isNaN(n)||(isNaN(k)?k=n:n<k&&(k=n));m=f.width+m;isNaN(m)||(d=Math.max(d,m));f=f.height+n;isNaN(f)||(h=Math.max(h,f))}0>g&&(b+=g);0>k&&(c+=k)}return{x:b,y:c,width:d,height:h}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var e=a.node,h=e.style;"text"==a.type&&(c-=d.removePx(h.fontSize)/2-1);"oval"==a.shapeType&&(b-=d.removePx(h.width)/2,c-=d.removePx(h.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(e.style.left=b+"px",e.style.top=c+"px")},svgPathToVml:function(a){var b=
a.split(" ");a="";var c,d=Math.round,h;for(h=0;h<b.length;h++){var f=b[h],g=f.substring(0,1),f=f.substring(1),k=f.split(","),l=d(k[0])+","+d(k[1]);"M"==g&&(a+=" m "+l);"L"==g&&(a+=" l "+l);"Z"==g&&(a+=" x e");if("Q"==g){var m=c.length,n=c[m-1],q=k[0],p=k[1],l=k[2],r=k[3];c=d(c[m-2]/3+2/3*q);n=d(n/3+2/3*p);q=d(2/3*q+l/3);p=d(2/3*p+r/3);a+=" c "+c+","+n+","+q+","+p+","+l+","+r}"A"==g&&(a+=" wa "+f);"B"==g&&(a+=" at "+f);c=k}return a},animate:function(a,b,c,d,h){var f=a.node,g=this.chart;if("translate"==b){b=c.split(",");c=b[1];var k=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,h,"px");g.animate(a,"top",k,c,d,h,"px")}},clipRect:function(a,b,c,d,h){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=h+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+h)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var e=a.node;a=e.style;c||(c=this.getBGColor(e.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var h=Math.cos(c),f=Math.sin(c),g=d.removePx(a.left),k=d.removePx(a.top),l=e.offsetWidth,e=e.offsetHeight;b/=Math.abs(b);a.left=g+l/2-l/2*Math.cos(c)-b*e/2*Math.sin(c)+3;a.top=k-b*l/2*Math.sin(c)+b*e/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+h+"', M12='"+-f+"', M21='"+f+"', M22='"+h+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new d.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var h="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++){var g=Math.round(100*f/(c.length-1)),h=h+(g+"% "+c[f]);f<c.length-1&&(h+=",")}a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));h&&(a.colors.value=h)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){void 0!==typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"},pattern:function(a,b,c,e){c=a.node;a=a.fill;var h="none";b.color&&(h=b.color);c.fillColor=h;b=b.url;d.isAbsolute(b)||(b=e+b);8===document.documentMode?(a.type="tile",a.src=b):(a.setAttribute("type","tile"),a.setAttribute("src",b))},update:function(){}})})();(function(){var d=window.AmCharts;d.SVGRenderer=d.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(d.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,e,h){var f=a.node;a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:e,effect:h};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],e=1E3*c.time/d.updateRate,h=c.frame+1,f=c.obj,g=c.attribute,k,l,m;h<=e?(c.frame++,"translate"==g?(k=c.from.split(","),g=Number(k[0]),k=Number(k[1]),isNaN(k)&&(k=0),l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),m=0===m-g?m:Math.round(d[c.effect](0,h,g,m-g,e)),c=0===l-k?l:Math.round(d[c.effect](0,h,k,l-k,e)),g="transform",c="translate("+m+","+c+")"):(l=Number(c.from),k=Number(c.to),m=k-l,c=d[c.effect](0,h,l,m,e),isNaN(c)&&(c=k),0===m&&this.animations.splice(a,1)),this.setAttr(f,g,c)):("translate"==g?(l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),f.translate(m,l)):(k=Number(c.to),this.setAttr(f,g,k)),this.animations.splice(a,1))}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(d.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,e,h){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var k=f.parentNode;k&&(f=document.createElementNS(d.SVG_NS,"clipPath"),g=d.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,e,h,0,0,f),k.appendChild(f),b="#",d.baseHref&&!d.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,c){var e=new d.AmDObject("text",this.D);a=String(a).split("\n");var h=b["font-size"],f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(h+2)*f+Math.round(h/2));g.setAttribute("x",0);g.style.fontSize=h+"px";e.node.appendChild(g)}e.node.setAttribute("y",Math.round(h/2));this.attr(e,b);this.D.addToContainer(e.node,c);return e},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new d.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,e){var h=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(d.SVG_NS,b);f=d.getUniqueId();b.setAttribute("id",f);if(!isNaN(e)){var g=0,k=0,l=0,m=0;90==e?l=100:270==e?m=100:180==e?g=100:0===e&&(k=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",k+"%");b.setAttribute("y1",l+"%");b.setAttribute("y2",m+"%")}for(e=0;e<c.length;e++)g=document.createElementNS(d.SVG_NS,"stop"),k=100*e/(c.length-1),0===e&&(k=0),g.setAttribute("offset",k+"%"),g.setAttribute("stop-color",c[e]),b.appendChild(g);h.parentNode.appendChild(b);c="#";d.baseHref&&!d.isIE&&(c=this.removeTarget(window.location.href)+
c);h.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){return a.split("#")[0]},pattern:function(a,b,c,e){var h=a.node;isNaN(c)&&(c=1);var f=a.patternNode;f&&this.D.remove(f);var f=document.createElementNS(d.SVG_NS,"pattern"),g=d.getUniqueId(),k=b;b.url&&(k=b.url);d.isAbsolute(k)||(k=e+k);e=Number(b.width);isNaN(e)&&(e=4);var l=Number(b.height);isNaN(l)&&(l=4);e/=c;l/=c;c=b.x;isNaN(c)&&(c=0);var m=-Math.random()*Number(b.randomX);isNaN(m)||(c=m);m=b.y;isNaN(m)&&(m=0);var n=-Math.random()*Number(b.randomY);isNaN(n)||(m=n);f.setAttribute("id",g);f.setAttribute("width",e);f.setAttribute("height",l);f.setAttribute("patternUnits","userSpaceOnUse");f.setAttribute("xlink:href",k);b.color&&(n=document.createElementNS(d.SVG_NS,"rect"),n.setAttributeNS(null,"height",e),n.setAttributeNS(null,"width",l),n.setAttributeNS(null,"fill",b.color),f.appendChild(n));this.D.image(k,0,0,e,l,f).translate(c,m);k="#";d.baseHref&&!d.isIE&&(k=this.removeTarget(window.location.href)+k);h.setAttribute("fill","url("+k+g+")");a.patternNode=f;h.parentNode.appendChild(f)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}})})();AmCharts.AmDSet=AmCharts.Class({construct:function(d){this.create("g")},attr:function(d){this.R.attr(this.node,d)},move:function(d,a){this.R.move(this.node,d,a)}});(function(){var d=window.AmCharts;d.AmLegend=d.Class({construct:function(a){this.enabled=!0;this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=!1;this.showEntries=!0;d.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];var a=this.legendData;this.enabled&&(d.ifArray(a)||d.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,e=a.divRealWidth,h=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.data);isNaN(this.fontSize)&&(this.fontSize=a.fontSize);if("right"==b||"left"==b)this.maxColumns=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var k=a.autoMarginOffset;"bottom"==b?(this.marginBottom=k,this.marginTop=0):(this.marginTop=k,this.marginBottom=0)}c=void 0!==c?d.toCoordinate(c,e):a.realWidth;"outside"==b?(c=f.offsetWidth,h=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,h=f.clientHeight)):(isNaN(c)||(f.style.width=c+"px"),f.className="amChartsLegend "+a.classNamePrefix+"-legend-div");this.divWidth=c;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.width=c,b.height=h,b.addDefs(a)):b=new d.AmDraw(f,c,h,a);this.container=b;this.lx=0;this.ly=8;h=this.markerSize;h>this.fontSize&&(this.ly=h/2-1);0<h&&(this.lx+=h+this.markerLabelGap);this.titleWidth=0;if(h=this.title)h=d.text(this.container,h,this.color,a.fontFamily,this.fontSize,"start",!0),d.setCN(a,h,"legend-title"),h.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=h.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,c=this.marginRight,e=this.marginTop,h=this.marginBottom,f=this.horizontalGap,g=this.div,k=this.divWidth,l=this.maxColumns,m=this.verticalGap,n=this.spacing,q=k-c-b,p=0,r=0,t=this.container;this.set&&this.set.remove();var u=t.set();this.set=u;var z=t.set();u.push(z);var v=this.entries,w,x;for(x=0;x<v.length;x++){w=v[x].getBBox();var A=w.width;A>p&&(p=A);w=w.height;w>r&&(r=w)}var A=r=0,B=f,D=0,C=0;for(x=0;x<v.length;x++){var I=v[x];this.reversedOrder&&(I=v[v.length-x-1]);w=I.getBBox();var H;this.equalWidths?H=f+A*(p+n+this.markerLabelGap):(H=B,B=B+w.width+f+n);w.height>C&&(C=w.height);H+w.width>q&&0<x&&0!==A&&(r++,A=0,H=f,B=H+w.width+f+n,D=D+C+m,C=0);I.translate(H,D);A++;!isNaN(l)&&A>=l&&(A=0,r++,D=D+C+m,B=f,C=0);z.push(I)}w=z.getBBox();l=w.height+2*m-1;"left"==a||"right"==a?(n=w.width+2*f,k=n+b+c,g.style.width=k+"px",this.ieW=k):n=k-b-c-1;c=d.polygon(this.container,[0,n,n,0],[0,0,l,l],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);d.setCN(this.chart,c,"legend-bg");u.push(c);u.translate(b,e);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(n-w.width)/2:"right"==this.align&&(b=f+n-w.width);z.translate(b,m+1);this.titleHeight>l&&(l=this.titleHeight);a=l+e+h+1;0>a&&(a=0);a>this.chart.divRealHeight&&(g.style.top="0px");g.style.height=Math.round(a)+"px";t.setSize(this.divWidth,a)},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,c=a.markerType;a.legendEntryWidth=this.markerSize;c||(c=this.markerType);var e=a.color,h=a.alpha;a.legendKeyColor&&(e=a.legendKeyColor());a.legendKeyAlpha&&(h=a.legendKeyAlpha());var f;!0===
a.hidden&&(f=e=this.markerDisabledColor);var g=a.pattern,k=a.customMarker;k||(k=this.customMarker);var l=this.container,m=this.markerSize,n=0,q=0,p=m/2;if(this.useGraphSettings){c=a.type;this.switchType=void 0;if("line"==c||"step"==c||"smoothedLine"==c||"ohlc"==c)g=l.set(),a.hidden||(e=a.lineColorR,f=a.bulletBorderColorR),n=d.line(l,[0,2*m],[m/2,m/2],e,a.lineAlpha,a.lineThickness,a.dashLength),d.setCN(b,n,"graph-stroke"),g.push(n),a.bullet&&(a.hidden||(e=a.bulletColorR),n=d.bullet(l,a.bullet,a.bulletSize,e,a.bulletAlpha,a.bulletBorderThickness,f,a.bulletBorderAlpha))&&(d.setCN(b,n,"graph-bullet"),n.translate(m+1,m/2),g.push(n)),p=0,n=m,q=m/3;else{var r;a.getGradRotation&&(r=a.getGradRotation());n=a.fillColorsR;!0===a.hidden&&(n=e);if(g=this.createMarker("rectangle",n,a.fillAlphas,a.lineThickness,e,a.lineAlpha,r,g))p=m,g.translate(p,m/2);n=m}d.setCN(b,g,"graph-"+c);d.setCN(b,g,"graph-"+a.id)}else k?g=l.image(k,0,0,m,m):(g=this.createMarker(c,e,h,void 0,void 0,void 0,void 0,g))&&g.translate(m/2,m/2);d.setCN(b,g,"legend-marker");this.addListeners(g,a);l=l.set([g]);this.switchable&&a.switchable&&l.setAttr("cursor","pointer");void 0!==a.id&&d.setCN(b,l,"legend-item-"+a.id);d.setCN(b,l,a.className,!0);(f=this.switchType)&&"none"!=f&&0<m&&("x"==f?(c=this.createX(),c.translate(m/2,m/2)):c=this.createV(),c.dItem=a,!0!==a.hidden?"x"==f?c.hide():c.show():"x"!=f&&c.hide(),this.switchable||c.hide(),this.addListeners(c,a),a.legendSwitch=c,l.push(c),d.setCN(b,c,"legend-switch"));f=this.color;a.showBalloon&&this.textClickEnabled&&void 0!==this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=e);!0===a.hidden&&(f=this.markerDisabledColor);e=d.massReplace(this.labelText,{"[[title]]":a.title});c=this.fontSize;g&&(m<=c&&g.translate(p,m/2+this.ly-c/2+(c+2-m)/2-q),a.legendEntryWidth=g.getBBox().width);var t;e&&(e=d.fixBrakes(e),a.legendTextReal=e,t=this.labelWidth,t=isNaN(t)?d.text(this.container,e,f,b.fontFamily,c,"start"):d.wrappedText(this.container,e,f,b.fontFamily,c,"start",!1,t,
0),d.setCN(b,t,"legend-label"),t.translate(this.lx+n,this.ly),l.push(t),b=t.getBBox().width,this.maxLabelWidth<b&&(this.maxLabelWidth=b));this.entries[this.index]=l;a.legendEntry=this.entries[this.index];a.legendLabel=t;this.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),this.dispatch("rollOverItem",a,b))},rollOutLabel:function(a,b){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var c=this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)}},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b))},dispatch:function(a,b,c){this.fire(a,{type:a,dataItem:b,target:this,event:c,chart:this.chart})},createValue:function(a){var b=this,c=b.fontSize,e=b.chart;if(!1!==a.visibleInLegend){var h=b.maxLabelWidth;b.forceWidth&&(h=b.labelWidth);b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(h=a.legendEntry.getBBox().width);var f=h;if(b.valueText&&0<b.valueWidth){var g=b.color;b.useMarkerColorForValues&&(g=a.color,a.legendKeyColor&&(g=a.legendKeyColor()));!0===a.hidden&&(g=b.markerDisabledColor);var k=b.valueText,h=h+b.lx+b.markerLabelGap+b.valueWidth,l="end";"left"==b.valueAlign&&(h-=b.valueWidth,l="start");g=d.text(b.container,k,g,b.chart.fontFamily,c,l);d.setCN(e,g,"legend-value");g.translate(h,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+2*b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;e=b.markerSize;e<c+7&&(e=c+7,d.VML&&(e+=3));c=b.container.rect(a.legendEntryWidth,0,f,e,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,c)}).mouseout(function(c){b.rollOutLabel(a,c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=this.markerSize;return d.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,e=d.line(c,[-a,a],[-a,a]).attr(b),a=d.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([e,a])},createMarker:function(a,b,c,e,h,f,g,k){var l=this.markerSize,m=this.container;h||(h=this.markerBorderColor);h||(h=b);isNaN(e)&&(e=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);
return d.bullet(m,a,l,b,c,e,h,f,l,g,k,this.chart.path)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,d=this.data;for(c=0;c<a.length;c++){var h=a[c],f=h.dItem,g=" ";if(d)f.value?h.text(f.value):h.text("");else{var k;if(void 0!==f.type){k=f.currentDataItem;var l=this.periodValueText;f.legendPeriodValueText&&(l=f.legendPeriodValueText);k?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),g=b.formatString(g,k)):l&&(g=b.formatPeriodString(l,f))}else g=b.formatString(this.valueText,f);if(l=this.valueFunction)k&&(f=k),g=l(f,g);h.text(g)}}},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};d.extractPeriod=function(a){var b=d.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};d.getDate=function(a,b,c){return a instanceof Date?d.newDate(a,c):b&&isNaN(a)?d.stringToDate(a,b):new Date(a)};d.newDate=function(a,b){return b&&"fff"!=b?new Date(a):d.useUTC?new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds())};d.resetDateToMin=function(a,b,c,e){void 0===e&&(e=1);var h,f,g,k,l,m,n;d.useUTC?(h=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),n=a.getUTCMilliseconds(),a=a.getUTCDay()):(h=a.getFullYear(),f=a.getMonth(),g=a.getDate(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),n=a.getMilliseconds(),a=a.getDay());switch(b){case"YYYY":h=Math.floor(h/c)*c;f=0;g=1;n=m=l=k=0;break;case"MM":f=Math.floor(f/c)*c;g=1;n=m=l=k=0;break;case"WW":g=a>=e?g-a+e:g-(7+a)+e;n=m=l=k=0;break;case"DD":n=m=l=k=0;break;case"hh":k=Math.floor(k/c)*c;n=m=l=0;break;case"mm":l=Math.floor(l/c)*c;n=m=0;break;case"ss":m=Math.floor(m/c)*c;n=0;break;case"fff":n=Math.floor(n/c)*c}d.useUTC?(a=new Date,a.setUTCFullYear(h,f,g),a.setUTCHours(k,l,m,n)):a=new Date(h,f,g,k,l,m,n);return a};d.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case"YYYY":c=316224E5;break;case"MM":c=26784E5;break;case"WW":c=6048E5;break;case"DD":c=864E5;break;case"hh":c=36E5;break;case"mm":c=6E4;break;case"ss":c=1E3;break;case"fff":c=1}return c*b};d.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};d.getMaxInterval=function(a,b){var c=d.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,d.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};d.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");d.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");d.monthNames="January February March April May June July August September October November December".split(" ");d.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");d.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};d.stringToDate=function(a,b){var c={},e=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},
{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],h=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(h=!1));var f=b,g,k,l;for(l=0;l<e.length;l++)k=e[l].period,c[k]=0,"date"==k&&(c[k]=1);for(l=0;l<e.length;l++)if(g=e[l].pattern,k=e[l].period,-1!=b.indexOf(g)){var m=d.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==g||"L"==g)h||(m+=12);c[k]=m}d.useUTC?(e=new Date,e.setUTCFullYear(c.year,c.month,c.date),e.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):e=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return e};d.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=String(b),b=b.substr(c,a.length),"0"==b.charAt(0)&&(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};d.formatDate=function(a,b,c){c||(c=d);var e,h,f,g,k,l,m,n=d.getWeekNumber(a);d.useUTC?(e=a.getUTCFullYear(),h=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),a=a.getUTCMilliseconds()):(e=a.getFullYear(),h=a.getMonth(),f=a.getDate(),g=a.getDay(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),a=a.getMilliseconds());var q=String(e).substr(2,2),p=h+1;9>h&&(p="0"+
p);var r="0"+g;b=b.replace(/W/g,n);n=k;24==n&&(n=0);var t=n;10>t&&(t="0"+t);b=b.replace(/JJ/g,t);b=b.replace(/J/g,n);t=k;0===t&&(t=24,-1!=b.indexOf("H")&&f--);n=f;10>f&&(n="0"+f);var u=t;10>u&&(u="0"+u);b=b.replace(/HH/g,u);b=b.replace(/H/g,t);t=k;11<t&&(t-=12);u=t;10>u&&(u="0"+u);b=b.replace(/KK/g,u);b=b.replace(/K/g,t);t=k;0===t&&(t=12);12<t&&(t-=12);u=t;10>u&&(u="0"+u);b=b.replace(/LL/g,u);b=b.replace(/L/g,t);t=l;10>t&&(t="0"+t);b=b.replace(/NN/g,t);b=b.replace(/N/g,l);l=m;10>l&&(l="0"+l);b=b.replace(/SS/g,l);b=b.replace(/S/g,m);m=a;10>m&&(m="00"+m);100>m&&(m="0"+m);l=a;10>l&&(l="00"+l);b=b.replace(/QQQ/g,m);b=b.replace(/QQ/g,l);b=b.replace(/Q/g,a);b=12>k?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,e);b=b.replace(/@II@/g,q);b=b.replace(/@XXXX@/g,c.monthNames[h]);b=b.replace(/@XXX@/g,c.shortMonthNames[h]);b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,h+1);b=b.replace(/@RR@/g,n);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,r);return b=b.replace(/@P@/g,g)};d.changeDate=function(a,b,c,e,h){if(d.useUTC)return d.changeUTCDate(a,b,c,e,h);var f=-1;void 0===e&&(e=!0);void 0===h&&(h=!1);!0===e&&(f=1);switch(b){case"YYYY":a.setFullYear(a.getFullYear()+
c*f);e||h||a.setDate(a.getDate()+1);break;case"MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);e||h||a.setDate(a.getDate()+1);break;case"DD":a.setDate(a.getDate()+c*f);break;case"WW":a.setDate(a.getDate()+c*f*7);break;case"hh":a.setHours(a.getHours()+c*f);break;case"mm":a.setMinutes(a.getMinutes()+c*f);break;case"ss":a.setSeconds(a.getSeconds()+c*f);break;case"fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};d.changeUTCDate=function(a,b,c,d,h){var f=-1;void 0===d&&(d=!0);void 0===h&&(h=!1);!0===d&&(f=1);switch(b){case"YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"DD":a.setUTCDate(a.getUTCDate()+c*f);break;case"WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case"hh":a.setUTCHours(a.getUTCHours()+c*f);break;case"mm":a.setUTCMinutes(a.getUTCMinutes()+
c*f);break;case"ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case"fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a}})();

(function(){var e=window.AmCharts;e.AmSerialChart=e.Class({inherits:e.AmRectangularChart,construct:function(a){this.type="serial";e.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=.8;this.updateScrollbar=!0;var b=new e.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=0;e.applyTheme(this,a,this.cname)},initChart:function(){e.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&(a.updateData(),a.fullWidth&&(a.fullRectSet=this.cursorLineSet));var a=this.countColumns(),b=this.graphs,c;for(c=0;c<b.length;c++)b[c].columnCount=a;this.updateScrollbar=!0;this.drawChart();this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins())},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,g=c.minDuration(),e=c=1;this.mouseWheelZoomEnabled?b||(c=-1):b&&(c=-1);var f=this.chartData.length,m=this.lastTime,l=this.firstTime;0>a?d?(f=this.endTime-this.startTime,d=this.startTime+c*g,g=this.endTime+e*g,0<e&&0<c&&g>=m&&(g=m,d=m-f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<c&&this.end>=f-1&&(c=e=0),d=this.start+c,g=this.end+e,this.zoomToIndexes(d,g)):d?(f=this.endTime-this.startTime,d=this.startTime-c*g,g=this.endTime-e*g,0<e&&0<c&&d<=l&&(d=l,g=l+f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<c&&1>this.start&&(c=e=0),d=this.start-c,g=this.end-e,this.zoomToIndexes(d,g))}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);e.AmSerialChart.base.validateData.call(this)},drawChart:function(){e.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(e.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,c,b=this.categoryAxis;if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,c=this.endTime,isNaN(b)||isNaN(c))b=this.firstTime,c=this.lastTime}else if(b=this.start,c=this.end,isNaN(b)||isNaN(c))b=0,c=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,c)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){e.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=c;a.rotate=b;a.axisRenderer=e.RecAxis;a.guideFillRenderer=e.RecFill;a.axisItemRenderer=e.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){e.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.graphs,b,c=this.chartData;for(b=0;b<a.length;b++)a[b].data=c;0<c.length&&(this.firstTime=this.getStartTime(c[0].time),this.lastTime=this.getEndTime(c[c.length-1].time))},getStartTime:function(a){var b=this.categoryAxis;return e.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=e.extractPeriod(this.categoryAxis.minPeriod);return e.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){e.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){e.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b);this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.startTime&&b-a>c&&(b=a+c,this.updateScrollbar=!0));var d=this.minSelectedTime;if(0<d&&b-a<d){var g=Math.round(a+(b-a)/2),d=Math.round(d/2);a=g-d;b=g+d}var h=this.chartData,g=this.categoryAxis;
if(e.ifArray(h)&&(a!=this.startTime||b!=this.endTime)){var f=g.minDuration(),d=this.firstTime,m=this.lastTime;a||(a=d,isNaN(c)||(a=m-c));b||(b=m);a>m&&(a=m);b<d&&(b=d);a<d&&(a=d);b>m&&(b=m);b<a&&(b=a+f);b-a<f/5&&(b<m?b=a+f/5:a=b-f/5);this.startTime=a;this.endTime=b;c=h.length-1;f=this.getClosestIndex(h,"time",a,!0,0,c);h=this.getClosestIndex(h,"time",b,!1,f,c);g.timeZoom(a,b);g.zoom(f,h);this.start=e.fitToBounds(f,0,c);this.end=e.fitToBounds(h,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=d||b!=m?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},updateAfterValueZoom:function(){this.zoomAxesAndGraphs();this.zoomScrollbar();this.updateColumnsDepth()},indexZoom:function(a,b){var c=this.maxSelectedSeries;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.start&&b-a>c&&(b=a+c,this.updateScrollbar=!0));if(a!=this.start||b!=this.end){var d=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(c)||(a=d-c));isNaN(b)&&(b=d);b<a&&(b=a);b>d&&(b=d);a>d&&(a=d-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},updateGraphs:function(){e.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;e.isString(c.fillToGraph)&&(c.fillToGraph=this.getGraphById(c.fillToGraph))}},updateColumnsDepth:function(){var a,b=this.graphs,c;e.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var g;for(g=0;g<d.length;g++)this.columnsArray.push(d[g])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);c&&b.translate(c.x,c.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&a.enabled&&(a.dragger.stop(),b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=e.processObject(c,e.TrendLine,this.theme);a[b]=c;c.chart=this;c.id||(c.id="trendLineAuto"+b+"_"+(new Date).getTime());e.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,e,h=!1,f,m;for(m=0;m<b;m++){e=this.valueAxes[m];var l=e.stackType;if("100%"==l||"regular"==l)for(h=!1,f=0;f<c;f++)d=this.graphs[f],d.tcc=1,d.valueAxis==e&&"column"==d.type&&(!h&&d.stackable&&(a++,h=!0),(!d.stackable&&d.clustered||d.newStack)&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0));if("none"==l||"3d"==l){h=!1;for(f=0;f<c;f++)d=this.graphs[f],d.valueAxis==e&&"column"==d.type&&(d.clustered?(d.tcc=1,d.newStack&&(a=0),d.hidden||(d.columnIndex=a,a++)):d.hidden||(h=!0,d.tcc=1,d.columnIndex=0));h&&0===a&&(a=1)}if("3d"==l){e=1;for(m=0;m<c;m++)d=this.graphs[m],d.newStack&&e++,d.depthCount=e,d.tcc=a;a=e}}return a},parseData:function(){e.AmSerialChart.base.parseData.call(this);this.parseSerialData(this.dataProvider)},getCategoryIndexByValue:function(a){var b=this.chartData,c,d;for(d=0;d<b.length;d++)b[d].category==a&&(c=d);return c},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=!1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=e.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=e.formatDate(a.startDate,b,this);a.endValue=e.formatDate(a.endDate,b,this);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(e.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=this.graphs,c;for(c=0;c<b.length;c++){var d=b[c];isNaN(a)?d.currentDataItem=void 0:d.currentDataItem=this.chartData[a].axes[d.valueAxis.id].graphs[d.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,c,d,e,h){0>e&&(e=0);h>a.length-1&&(h=a.length-1);var f=e+Math.round((h-e)/2),m=a[f][b];if(c==m)return f;if(1>=h-e){if(d)return e;d=a[h][b];return Math.abs(a[e][b]-c)<Math.abs(d-c)?e:h}return c==m?f:c<m?this.getClosestIndex(a,b,c,d,e,f):this.getClosestIndex(a,b,c,d,f,h)},zoomToIndexes:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,
b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length);b=e.resetDateToMin(b,this.categoryAxis.minPeriod,1);c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),g=b.valueAxis,h=this.chartData,f=b.numberFormatter;f||(f=this.nf);for(var m=0;m<c.length;m++){for(var l=c[m],k=0,p=0,n,x,A,v,t,u=0,q=0,r,w,z,B,F,G=this.start;G<=this.end;G++){var y=h[G];if(y&&(y=y.axes[g.id].graphs[b.id])){if(y.values){var C=y.values[l];if(this.rotate){if(0>y.x||y.x>y.graph.height)C=NaN}else if(0>y.x||y.x>y.graph.width)C=NaN;if(!isNaN(C)){isNaN(n)&&(n=C);x=C;if(isNaN(A)||A>C)A=C;if(isNaN(v)||v<C)v=C;t=e.getDecimals(k);var E=e.getDecimals(C),k=k+C,k=e.roundTo(k,Math.max(t,E));p++;t=k/p}}if(y.percents&&(y=y.percents[l],!isNaN(y))){isNaN(r)&&(r=y);w=y;if(isNaN(z)||z>y)z=y;if(isNaN(B)||B<y)B=y;F=e.getDecimals(u);C=e.getDecimals(y);u+=y;u=e.roundTo(u,Math.max(F,C));q++;F=u/q}}}u={open:r,close:w,high:B,low:z,average:F,sum:u,count:q};a=e.formatValue(a,{open:n,close:x,high:v,low:A,average:t,sum:k,count:p},d,f,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=e.formatValue(a,u,d,this.pf,"percents\\."+l+"\\.")}}return a=e.cleanFromEmpty(a)},formatString:function(a,b,c){var d=b.graph;if(-1!=a.indexOf("[[category]]")){var g=b.serialDataItem.category;if(this.categoryAxis.parseDates){var h=this.balloonDateFormat,f=this.chartCursor;f&&(h=f.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(h=e.formatDate(g,h,this),-1!=h.indexOf("fff")&&(h=e.formatMilliseconds(h,g)),g=h)}a=a.replace(/\[\[category\]\]/g,String(g))}g=d.numberFormatter;g||(g=this.nf);h=b.graph.valueAxis;(f=h.duration)&&!isNaN(b.values.value)&&(f=e.formatDuration(b.values.value,f,"",h.durationUnits,h.maxInterval,g),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),f));"date"==h.type&&(h=e.formatDate(new Date(b.values.value),d.dateFormat,this),f=RegExp("\\[\\[value\\]\\]","g"),a=a.replace(f,h),h=e.formatDate(new Date(b.values.open),d.dateFormat,this),f=RegExp("\\[\\[open\\]\\]","g"),a=a.replace(f,h));d="value open low high close total".split(" ");h=this.pf;a=e.formatValue(a,b.percents,d,h,"percents\\.");a=e.formatValue(a,b.values,d,g,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=e.formatValue(a,b.values,["percents"],h);-1!=a.indexOf("[[")&&(a=e.formatDataContextValue(a,b.dataContext));-1!=a.indexOf("[[")&&b.graph.customData&&(a=e.formatDataContextValue(a,b.graph.customData));return a=e.AmSerialChart.base.formatString.call(this,a,b,c)},addChartScrollbar:function(a){e.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){e.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){e.AmSerialChart.base.handleReleaseOutside.call(this,a);e.callMethod("handleReleaseOutside",[this.chartScrollbar])},update:function(){e.AmSerialChart.base.update.call(this);this.chartScrollbar&&this.chartScrollbar.update&&this.chartScrollbar.update()}})})();(function(){var e=window.AmCharts;e.Cuboid=e.Class({construct:function(a,b,c,d,e,h,f,m,l,k,p,n,x,A,v,t,u){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=h;this.alpha=f;this.bwidth=m;this.bcolor=l;this.balpha=k;this.dashLength=A;this.topRadius=t;this.pattern=v;this.rotate=x;this.bcn=u;x?0>b&&0===p&&(p=180):0>c&&270==p&&(p=90);this.gradientRotation=p;0===d&&0===e&&(this.cornerRadius=n);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=b.chart,d=this.w,g=this.h,h=this.dx,f=this.dy,m=this.colors,l=this.alpha,k=this.bwidth,p=this.bcolor,n=this.balpha,x=this.gradientRotation,A=this.cornerRadius,v=this.dashLength,t=this.pattern,u=this.topRadius,q=this.bcn,r=m,w=m;"object"==typeof m&&(r=m[0],w=m[m.length-1]);var z,B,F,G,y,C,E,L,M,Q=l;t&&(l=0);var D,H,I,J,K=this.rotate;if(0<Math.abs(h)||0<Math.abs(f))if(isNaN(u))E=w,w=e.adjustLuminosity(r,-.2),w=e.adjustLuminosity(r,-.2),z=e.polygon(b,[0,h,d+h,d,0],[0,f,f,0,0],w,l,1,p,0,x),0<n&&(M=e.line(b,[0,h,d+h],[0,f,f],p,n,k,v)),B=e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],w,l,1,p,0,x),B.translate(h,f),0<n&&(F=e.line(b,[h,h],[f,f+g],p,n,k,v)),G=e.polygon(b,[0,0,h,h,0],[0,g,g+f,f,0],w,l,1,p,0,x),y=e.polygon(b,[d,d,d+h,d+h,d],[0,g,g+f,f,0],w,l,1,p,0,x),0<n&&(C=e.line(b,[d,d+h,d+h,d],[0,f,g+f,g],p,n,k,v)),w=e.adjustLuminosity(E,.2),E=e.polygon(b,[0,h,d+h,d,0],[g,g+f,g+f,g,g],w,l,1,p,0,x),0<n&&(L=e.line(b,[0,h,d+h],[g,g+f,g+f],p,n,k,v));else{var N,O,P;K?(N=g/2,w=h/2,P=g/2,O=d+h/2,H=Math.abs(g/2),D=Math.abs(h/2)):(w=d/2,N=f/2,O=d/2,P=g+f/2+1,D=Math.abs(d/2),H=Math.abs(f/2));I=D*u;J=H*u;.1<D&&.1<D&&(z=e.circle(b,D,r,l,k,p,n,!1,H),z.translate(w,N));.1<I&&.1<I&&(E=e.circle(b,I,e.adjustLuminosity(r,.5),l,k,p,n,!1,J),E.translate(O,P))}l=Q;1>Math.abs(g)&&(g=0);1>Math.abs(d)&&(d=0);!isNaN(u)&&(0<Math.abs(h)||0<Math.abs(f))?(m=[r],m={fill:m,stroke:p,"stroke-width":k,"stroke-opacity":n,"fill-opacity":l},K?(l="M0,0 L"+d+","+(g/2-g/2*u),k=" B",0<d&&(k=" A"),e.VML?(l+=k+Math.round(d-
I)+","+Math.round(g/2-J)+","+Math.round(d+I)+","+Math.round(g/2+J)+","+d+",0,"+d+","+g,l=l+(" L0,"+g)+(k+Math.round(-D)+","+Math.round(g/2-H)+","+Math.round(D)+","+Math.round(g/2+H)+",0,"+g+",0,0")):(l+="A"+I+","+J+",0,0,0,"+d+","+(g-g/2*(1-u))+"L0,"+g,l+="A"+D+","+H+",0,0,1,0,0"),D=90):(k=d/2-d/2*u,l="M0,0 L"+k+","+g,e.VML?(l="M0,0 L"+k+","+g,k=" B",0>g&&(k=" A"),l+=k+Math.round(d/2-I)+","+Math.round(g-J)+","+Math.round(d/2+I)+","+Math.round(g+J)+",0,"+g+","+d+","+g,l+=" L"+d+",0",l+=k+Math.round(d/
2+D)+","+Math.round(H)+","+Math.round(d/2-D)+","+Math.round(-H)+","+d+",0,0,0"):(l+="A"+I+","+J+",0,0,0,"+(d-d/2*(1-u))+","+g+"L"+d+",0",l+="A"+D+","+H+",0,0,1,0,0"),D=180),b=b.path(l).attr(m),b.gradient("linearGradient",[r,e.adjustLuminosity(r,-.3),e.adjustLuminosity(r,-.3),r],D),K?b.translate(h/2,0):b.translate(0,f/2)):b=0===g?e.line(b,[0,d],[0,0],p,n,k,v):0===d?e.line(b,[0,0],[0,g],p,n,k,v):0<A?e.rect(b,d,g,m,l,k,p,n,A,x,v):e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],m,l,k,p,n,x,!1,v);d=isNaN(u)?0>g?[z,M,B,F,G,y,C,E,L,b]:[E,L,B,F,G,y,z,M,C,b]:K?0<d?[z,b,E]:[E,b,z]:0>g?[z,b,E]:[E,b,z];e.setCN(c,b,q+"front");e.setCN(c,B,q+"back");e.setCN(c,E,q+"top");e.setCN(c,z,q+"bottom");e.setCN(c,G,q+"left");e.setCN(c,y,q+"right");for(z=0;z<d.length;z++)if(B=d[z])a.push(B),e.setCN(c,B,q+"element");t&&b.pattern(t,NaN,c.path)},width:function(a){isNaN(a)&&(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var c=this;c.easing=b;c.totalFrames=Math.round(1E3*a/e.updateRate);c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},e.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},e.updateRate))},animateWidth:function(a,b){var c=this;c.easing=b;c.totalFrames=Math.round(1E3*a/e.updateRate);c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},e.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},e.updateRate))}})})();(function(){var e=window.AmCharts;e.CategoryAxis=e.Class({inherits:e.AxisBase,construct:function(a){this.cname="CategoryAxis";e.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;e.applyTheme(this,a,this.cname)},draw:function(){e.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;if(e.ifArray(a)){var b,c=this.chart;"scrollbar"!=this.id?(e.setCN(c,this.set,"category-axis"),e.setCN(c,this.labelsSet,"category-axis"),e.setCN(c,this.axisLine.axisSet,"category-axis")):this.bcn=this.id+"-";var d=this.start,g=this.labelFrequency,h=0,f=this.end-d+1,m=this.gridCountR,l=this.showFirstLabel,k=this.showLastLabel,p,n="",n=e.extractPeriod(this.minPeriod),x=e.getPeriodDuration(n.period,n.count),A,v,t,u,q;A=this.rotate;b=this.firstDayOfWeek;p=this.boldPeriodBeginning;var r=e.resetDateToMin(new Date(a[a.length-1].time+1.05*x),this.minPeriod,1,b).getTime();this.firstTime=c.firstTime;this.endTime>r&&(this.endTime=r);q=this.minorGridEnabled;var w,r=this.gridAlpha;if(this.parseDates&&!this.equalSpacing)this.lastTime=a[a.length-1].time,this.maxTime=e.resetDateToMin(new Date(this.lastTime+1.05*x),this.minPeriod,1,b).getTime(),this.timeDifference=this.endTime-this.startTime,this.parseDatesDraw();else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(f),f<m&&(m=f),h+=this.start,this.stepWidth=this.getStepWidth(f),0<m){m=Math.floor(f/m);w=this.chooseMinorFrequency(m);f=h;f/2==Math.round(f/2)&&f--;0>f&&(f=0);var z=0;this.end-f+1>=this.autoRotateCount&&(this.labelRotation=this.autoRotateAngle);for(b=f;b<=this.end+2;b++){p=!1;0<=b&&b<this.data.length?(v=this.data[b],n=v.category,p=v.forceShow):n="";if(q&&!isNaN(w))if(b/w==Math.round(b/w)||p)b/m==Math.round(b/m)||p||(this.gridAlpha=this.minorGridAlpha,n=void 0);else continue;else if(b/m!=Math.round(b/
m)&&!p)continue;f=this.getCoordinate(b-h);t=0;"start"==this.gridPosition&&(f-=this.cellWidth/2,t=this.cellWidth/2);p=!0;a=t;"start"==this.tickPosition&&(a=0,p=!1,t=0);if(b==d&&!l||b==this.end&&!k)n=void 0;Math.round(z/g)!=z/g&&(n=void 0);z++;var B=this.cellWidth;A&&(B=NaN);this.labelFunction&&v&&(n=this.labelFunction(n,v,this));n=e.fixBrakes(n);x=!1;this.boldLabels&&(x=!0);b>this.end&&"start"==this.tickPosition&&(n=" ");this.rotate&&this.inside&&(t=-2);t=new this.axisItemRenderer(this,f,n,p,B,t,void 0,x,a,!1,v.labelColor,v.className);t.serialDataItem=v;this.pushAxisItem(t);this.gridAlpha=r}}}else if(this.parseDates&&this.equalSpacing){h=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);g=d.period;A=d.count;a=e.getPeriodDuration(g,A);a<x&&(g=n.period,A=n.count,a=x);v=g;"WW"==v&&(v="DD");this.stepWidth=this.getStepWidth(f);m=Math.ceil(this.timeDifference/a)+1;n=e.resetDateToMin(new Date(this.startTime-
a),g,A,b).getTime();this.cellWidth=this.getStepWidth(f);f=Math.round(n/a);d=-1;f/2==Math.round(f/2)&&(d=-2,n-=a);f=this.start;f/2==Math.round(f/2)&&f--;0>f&&(f=0);a=this.end+2;a>=this.data.length&&(a=this.data.length);B=!1;B=!l;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);var F=f;if(this.data[f].time!=e.resetDateToMin(new Date(this.data[f].time),g,A,b).getTime()){var x=0,G=n;for(b=f;b<a;b++)u=this.data[b].time,this.checkPeriodChange(g,A,u,G)&&(x++,2<=x&&(F=b,b=a),G=u)}q&&1<A&&(w=this.chooseMinorFrequency(A),e.getPeriodDuration(g,w));if(0<this.gridCountR)for(b=f;b<a;b++)if(u=this.data[b].time,this.checkPeriodChange(g,A,u,n)&&b>=F){f=this.getCoordinate(b-this.start);q=!1;this.nextPeriod[v]&&(q=this.checkPeriodChange(this.nextPeriod[v],1,u,n,v));x=!1;q&&this.markPeriodChange?(q=this.dateFormatsObject[this.nextPeriod[v]],x=!0):q=this.dateFormatsObject[v];n=e.formatDate(new Date(u),q,c);if(b==d&&!l||b==m&&!k)n=" ";B?B=!1:(p||(x=!1),f-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*Math.PI/180)&&(this.labelFunction&&(n=this.labelFunction(n,new Date(u),this,g,A,t)),this.boldLabels&&(x=!0),t=new this.axisItemRenderer(this,f,n,void 0,void 0,void 0,void 0,x),q=t.graphics(),this.pushAxisItem(t),q=q.getBBox().width,e.isModern||(q-=f),this.previousPos=f+q));t=n=u}else isNaN(w)||(this.checkPeriodChange(g,w,u,z)&&(this.gridAlpha=this.minorGridAlpha,f=this.getCoordinate(b-this.start),q=new this.axisItemRenderer(this,f,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(q),z=u),this.gridAlpha=r)}for(b=0;b<this.data.length;b++)if(l=this.data[b])k=this.parseDates&&!this.equalSpacing?Math.round((l.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-h),l.x[this.id]=k;l=this.guides.length;for(b=0;b<l;b++)k=this.guides[b],q=p=q=r=d=NaN,w=k.above,k.toCategory&&(p=c.getCategoryIndexByValue(k.toCategory),isNaN(p)||(d=this.getCoordinate(p-h),k.expand&&(d+=this.cellWidth/2),t=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(t,w))),k.category&&(q=c.getCategoryIndexByValue(k.category),isNaN(q)||(r=this.getCoordinate(q-h),k.expand&&(r-=this.cellWidth/2),q=(d-r)/2,t=new this.axisItemRenderer(this,r,k.label,!0,NaN,q,k),this.pushAxisItem(t,w))),q=c.dataDateFormat,k.toDate&&(k.toDate=e.getDate(k.toDate,q,this.minPeriod),this.equalSpacing?(p=c.getClosestIndex(this.data,"time",k.toDate.getTime(),!1,0,this.data.length-1),isNaN(p)||(d=this.getCoordinate(p-h))):d=(k.toDate.getTime()-this.startTime)*this.stepWidth,t=new this.axisItemRenderer(this,
d,"",!0,NaN,NaN,k),this.pushAxisItem(t,w)),k.date&&(k.date=e.getDate(k.date,q,this.minPeriod),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",k.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(r=this.getCoordinate(q-h))):r=(k.date.getTime()-this.startTime)*this.stepWidth,q=(d-r)/2,p=!0,k.toDate&&(p=!1),t="H"==this.orientation?new this.axisItemRenderer(this,r,k.label,p,2*q,NaN,k):new this.axisItemRenderer(this,r,k.label,!1,NaN,q,k),this.pushAxisItem(t,w)),(0<d||0<r)&&(d<this.width||r<this.width)&&
(d=new this.guideFillRenderer(this,r,d,k),r=d.graphics(),this.pushAxisItem(d,w),k.graphics=r,r.index=b,k.balloonText&&this.addEventListeners(r,k))}this.axisCreated=!0;c=this.x;h=this.y;this.set.translate(c,h);this.labelsSet.translate(c,h);this.positionTitle();(c=this.axisLine.set)&&c.toFront();c=this.getBBox().height;2<c-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1);this.previousHeight=c},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,g=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/g)-this.minDuration()/2,c=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=g/2),c=this.start+Math.round(a/g));var c=e.fitToBounds(c,0,b.length-1),h;b[c]&&(h=b[c].x[this.id]);d?h>this.height+1&&c--:h>this.width+1&&c--;0>h&&c++;return c=e.fitToBounds(c,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&
this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)}})})();

AmCharts.themes.light={themeName:"light",AmChart:{color:"#000000",backgroundColor:"#FFFFFF"},AmCoordinateChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"]},AmStockChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"]},AmSlicedChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"],outlineAlpha:1,outlineThickness:2,labelTickColor:"#000000",labelTickAlpha:0.3},AmRectangularChart:{zoomOutButtonColor:'#000000',zoomOutButtonRollOverAlpha:0.15,zoomOutButtonImage:"lens.png"},AxisBase:{axisColor:"#000000",axisAlpha:0.3,gridAlpha:0.1,gridColor:"#000000"},ChartScrollbar:{backgroundColor:"#000000",backgroundAlpha:0.12,graphFillAlpha:0.5,graphLineAlpha:0,selectedBackgroundColor:"#FFFFFF",selectedBackgroundAlpha:0.4,gridAlpha:0.15},ChartCursor:{cursorColor:"#000000",color:"#FFFFFF",cursorAlpha:0.5},AmLegend:{color:"#000000"},AmGraph:{lineAlpha:0.9},GaugeArrow:{color:"#000000",alpha:0.8,nailAlpha:0,innerRadius:"40%",nailRadius:15,startWidth:15,borderAlpha:0.8,nailBorderAlpha:0},GaugeAxis:{tickColor:"#000000",tickAlpha:1,tickLength:15,minorTickLength:8,axisThickness:3,axisColor:'#000000',axisAlpha:1,bandAlpha:0.8},TrendLine:{lineColor:"#c03246",lineAlpha:0.8},AreasSettings:{alpha:0.8,color:"#67b7dc",colorSolid:"#003767",unlistedAreasAlpha:0.4,unlistedAreasColor:"#000000",outlineColor:"#FFFFFF",outlineAlpha:0.5,outlineThickness:0.5,rollOverColor:"#3c5bdc",rollOverOutlineColor:"#FFFFFF",selectedOutlineColor:"#FFFFFF",selectedColor:"#f15135",unlistedAreasOutlineColor:"#FFFFFF",unlistedAreasOutlineAlpha:0.5},LinesSettings:{color:"#000000",alpha:0.8},ImagesSettings:{alpha:0.8,labelColor:"#000000",color:"#000000",labelRollOverColor:"#3c5bdc"},ZoomControl:{buttonRollOverColor:"#3c5bdc",buttonFillColor:"#3994e2",buttonBorderColor:"#3994e2",buttonFillAlpha:0.8,gridBackgroundColor:"#FFFFFF",buttonBorderAlpha:0,buttonCornerRadius:2,gridColor:"#FFFFFF",gridBackgroundColor:"#000000",buttonIconAlpha:0.6,gridAlpha:0.6,buttonSize:20},SmallMap:{mapColor:"#000000",rectangleColor:"#f15135",backgroundColor:"#FFFFFF",backgroundAlpha:0.7,borderThickness:1,borderAlpha:0.8},PeriodSelector:{color:"#000000"},PeriodButton:{color:"#000000",background:"transparent",opacity:0.7,border:"1px solid rgba(0, 0, 0, .3)",MozBorderRadius:"5px",borderRadius:"5px",margin:"1px",outline:"none",boxSizing:"border-box"},PeriodButtonSelected:{color:"#000000",backgroundColor:"#b9cdf5",border:"1px solid rgba(0, 0, 0, .3)",MozBorderRadius:"5px",borderRadius:"5px",margin:"1px",outline:"none",opacity:1,boxSizing:"border-box"},PeriodInputField:{color:"#000000",background:"transparent",border:"1px solid rgba(0, 0, 0, .3)",outline:"none"},DataSetSelector:{color:"#000000",selectedBackgroundColor:"#b9cdf5",rollOverBackgroundColor:"#a8b0e4"},DataSetCompareList:{color:"#000000",lineHeight:"100%",boxSizing:"initial",webkitBoxSizing:"initial",border:"1px solid rgba(0, 0, 0, .3)"},DataSetSelect:{border:"1px solid rgba(0, 0, 0, .3)",outline:"none"}};

//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return Bb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){vb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return o(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){sc[a]||(e(b),sc[a]=!0)}function h(a,b){return function(c){return r(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function k(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function l(){}function m(a,b){b!==!1&&H(a),p(this,a),this._d=new Date(+a._d),uc===!1&&(uc=!0,vb.updateOffset(this),uc=!1)}function n(a){var b=A(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=vb.localeData(),this._bubble()}function o(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function p(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Kb.length>0)for(c in Kb)d=Kb[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function s(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function t(a,b){var c;return b=M(b,a),a.isBefore(b)?c=s(a,b):(c=s(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function u(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=vb.duration(c,d),v(this,e,a),this}}function v(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&pb(a,"Date",ob(a,"Date")+f*c),g&&nb(a,ob(a,"Month")+g*c),d&&vb.updateOffset(a,f||g)}function w(a){return"[object Array]"===Object.prototype.toString.call(a)}function x(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function y(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&C(a[d])!==C(b[d]))&&g++;return g+f}function z(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=lc[a]||mc[b]||b}return a}function A(a){var b,d,e={};for(d in a)c(a,d)&&(b=z(d),b&&(e[b]=a[d]));return e}function B(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}vb[b]=function(e,f){var g,h,i=vb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=vb().utc().set(d,a);return i.call(vb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function C(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function D(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function E(a,b,c){return jb(vb([a,11,31+b-c]),b,c).week}function F(a){return G(a)?366:365}function G(a){return a%4===0&&a%100!==0||a%400===0}function H(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Db]<0||a._a[Db]>11?Db:a._a[Eb]<1||a._a[Eb]>D(a._a[Cb],a._a[Db])?Eb:a._a[Fb]<0||a._a[Fb]>24||24===a._a[Fb]&&(0!==a._a[Gb]||0!==a._a[Hb]||0!==a._a[Ib])?Fb:a._a[Gb]<0||a._a[Gb]>59?Gb:a._a[Hb]<0||a._a[Hb]>59?Hb:a._a[Ib]<0||a._a[Ib]>999?Ib:-1,a._pf._overflowDayOfYear&&(Cb>b||b>Eb)&&(b=Eb),a._pf.overflow=b)}function I(b){return null==b._isValid&&(b._isValid=!isNaN(b._d.getTime())&&b._pf.overflow<0&&!b._pf.empty&&!b._pf.invalidMonth&&!b._pf.nullInput&&!b._pf.invalidFormat&&!b._pf.userInvalidated,b._strict&&(b._isValid=b._isValid&&0===b._pf.charsLeftOver&&0===b._pf.unusedTokens.length&&b._pf.bigHour===a)),b._isValid}function J(a){return a?a.toLowerCase().replace("_","-"):a}function K(a){for(var b,c,d,e,f=0;f<a.length;){for(e=J(a[f]).split("-"),b=e.length,c=J(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=L(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&y(e,c,!0)>=b-1)break;b--}f++}return null}function L(a){var b=null;if(!Jb[a]&&Lb)try{b=vb.locale(),require("./locale/"+a),vb.locale(b)}catch(c){}return Jb[a]}function M(a,b){var c,d;return b._isUTC?(c=b.clone(),d=(vb.isMoment(a)||x(a)?+a:+vb(a))-+c,c._d.setTime(+c._d+d),vb.updateOffset(c,!1),c):vb(a).local()}function N(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function O(a){var b,c,d=a.match(Pb);for(b=0,c=d.length;c>b;b++)d[b]=rc[d[b]]?rc[d[b]]:N(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function P(a,b){return a.isValid()?(b=Q(b,a.localeData()),nc[b]||(nc[b]=O(b)),nc[b](a)):a.localeData().invalidDate()}function Q(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Qb.lastIndex=0;d>=0&&Qb.test(a);)a=a.replace(Qb,c),Qb.lastIndex=0,d-=1;return a}function R(a,b){var c,d=b._strict;switch(a){case"Q":return _b;case"DDDD":return bc;case"YYYY":case"GGGG":case"gggg":return d?cc:Tb;case"Y":case"G":case"g":return ec;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?dc:Ub;case"S":if(d)return _b;case"SS":if(d)return ac;case"SSS":if(d)return bc;case"DDD":return Sb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Wb;case"a":case"A":return b._locale._meridiemParse;case"x":return Zb;case"X":return $b;case"Z":case"ZZ":return Xb;case"T":return Yb;case"SSSS":return Vb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?ac:Rb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Rb;case"Do":return d?b._locale._ordinalParse:b._locale._ordinalParseLenient;default:return c=new RegExp($(Z(a.replace("\\","")),"i"))}}function S(a){a=a||"";var b=a.match(Xb)||[],c=b[b.length-1]||[],d=(c+"").match(jc)||["-",0,0],e=+(60*d[1])+C(d[2]);return"+"===d[0]?e:-e}function T(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Db]=3*(C(b)-1));break;case"M":case"MM":null!=b&&(e[Db]=C(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b,a,c._strict),null!=d?e[Db]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Eb]=C(b));break;case"Do":null!=b&&(e[Eb]=C(parseInt(b.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=C(b));break;case"YY":e[Cb]=vb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Cb]=C(b);break;case"a":case"A":c._meridiem=b;break;case"h":case"hh":c._pf.bigHour=!0;case"H":case"HH":e[Fb]=C(b);break;case"m":case"mm":e[Gb]=C(b);break;case"s":case"ss":e[Hb]=C(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Ib]=C(1e3*("0."+b));break;case"x":c._d=new Date(C(b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=S(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=C(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=vb.parseTwoDigitYear(b)}}function U(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Cb],jb(vb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Cb],jb(vb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=kb(d,e,f,h,g),a._a[Cb]=i.year,a._dayOfYear=i.dayOfYear}function V(a){var c,d,e,f,g=[];if(!a._d){for(e=X(a),a._w&&null==a._a[Eb]&&null==a._a[Db]&&U(a),a._dayOfYear&&(f=b(a._a[Cb],e[Cb]),a._dayOfYear>F(f)&&(a._pf._overflowDayOfYear=!0),d=fb(f,0,a._dayOfYear),a._a[Db]=d.getUTCMonth(),a._a[Eb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];24===a._a[Fb]&&0===a._a[Gb]&&0===a._a[Hb]&&0===a._a[Ib]&&(a._nextDay=!0,a._a[Fb]=0),a._d=(a._useUTC?fb:eb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Fb]=24)}}function W(a){var b;a._d||(b=A(a._i),a._a=[b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],V(a))}function X(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function Y(b){if(b._f===vb.ISO_8601)return void ab(b);b._a=[],b._pf.empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Q(b._f,b._locale).match(Pb)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(R(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&b._pf.unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),rc[f]?(d?b._pf.empty=!1:b._pf.unusedTokens.push(f),T(f,d,b)):b._strict&&!d&&b._pf.unusedTokens.push(f);b._pf.charsLeftOver=i-j,h.length>0&&b._pf.unusedInput.push(h),b._pf.bigHour===!0&&b._a[Fb]<=12&&(b._pf.bigHour=a),b._a[Fb]=k(b._locale,b._a[Fb],b._meridiem),V(b),H(b)}function Z(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function $(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function _(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=p({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],Y(b),I(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));o(a,c||b)}function ab(a){var b,c,d=a._i,e=fc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=hc.length;c>b;b++)if(hc[b][1].exec(d)){a._f=hc[b][0]+(e[6]||" ");break}for(b=0,c=ic.length;c>b;b++)if(ic[b][1].exec(d)){a._f+=ic[b][0];break}d.match(Xb)&&(a._f+="Z"),Y(a)}else a._isValid=!1}function bb(a){ab(a),a._isValid===!1&&(delete a._isValid,vb.createFromInputFallback(a))}function cb(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function db(b){var c,d=b._i;d===a?b._d=new Date:x(d)?b._d=new Date(+d):null!==(c=Mb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?bb(b):w(d)?(b._a=cb(d.slice(0),function(a){return parseInt(a,10)}),V(b)):"object"==typeof d?W(b):"number"==typeof d?b._d=new Date(d):vb.createFromInputFallback(b)}function eb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function fb(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function gb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function hb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function ib(a,b,c){var d=vb.duration(a).abs(),e=Ab(d.as("s")),f=Ab(d.as("m")),g=Ab(d.as("h")),h=Ab(d.as("d")),i=Ab(d.as("M")),j=Ab(d.as("y")),k=e<oc.s&&["s",e]||1===f&&["m"]||f<oc.m&&["mm",f]||1===g&&["h"]||g<oc.h&&["hh",g]||1===h&&["d"]||h<oc.d&&["dd",h]||1===i&&["M"]||i<oc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,hb.apply({},k)}function jb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=vb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function kb(a,b,c,d,e){var f,g,h=fb(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:F(a-1)+g}}function lb(b){var c,d=b._i,e=b._f;return b._locale=b._locale||vb.localeData(b._l),null===d||e===a&&""===d?vb.invalid({nullInput:!0}):("string"==typeof d&&(b._i=d=b._locale.preparse(d)),vb.isMoment(d)?new m(d,!0):(e?w(e)?_(b):Y(b):db(b),c=new m(b),c._nextDay&&(c.add(1,"d"),c._nextDay=a),c))}function mb(a,b){var c,d;if(1===b.length&&w(b[0])&&(b=b[0]),!b.length)return vb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function nb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),D(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function ob(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function pb(a,b,c){return"Month"===b?nb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function qb(a,b){return function(c){return null!=c?(pb(this,a,c),vb.updateOffset(this,b),this):ob(this,a)}}function rb(a){return 400*a/146097}function sb(a){return 146097*a/400}function tb(a){vb.duration.fn[a]=function(){return this._data[a]}}function ub(a){"undefined"==typeof ender&&(wb=zb.moment,zb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",vb):vb)}for(var vb,wb,xb,yb="2.9.0",zb="undefined"==typeof global||"undefined"!=typeof window&&window!==global.window?this:global,Ab=Math.round,Bb=Object.prototype.hasOwnProperty,Cb=0,Db=1,Eb=2,Fb=3,Gb=4,Hb=5,Ib=6,Jb={},Kb=[],Lb="undefined"!=typeof module&&module&&module.exports,Mb=/^\/?Date\((\-?\d+)/i,Nb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ob=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Pb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,Qb=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Rb=/\d\d?/,Sb=/\d{1,3}/,Tb=/\d{1,4}/,Ub=/[+\-]?\d{1,6}/,Vb=/\d+/,Wb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Xb=/Z|[\+\-]\d\d:?\d\d/gi,Yb=/T/i,Zb=/[\+\-]?\d+/,$b=/[\+\-]?\d+(\.\d{1,3})?/,_b=/\d/,ac=/\d\d/,bc=/\d{3}/,cc=/\d{4}/,dc=/[+-]?\d{6}/,ec=/[+-]?\d+/,fc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,gc="YYYY-MM-DDTHH:mm:ssZ",hc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],ic=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],jc=/([\+\-]|\d\d)/gi,kc=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),lc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},mc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},nc={},oc={s:45,m:45,h:22,d:26,M:11},pc="DDD w W M D d".split(" "),qc="M D H h m s w W".split(" "),rc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return r(this.year()%100,2)},YYYY:function(){return r(this.year(),4)},YYYYY:function(){return r(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+r(Math.abs(a),6)},gg:function(){return r(this.weekYear()%100,2)},gggg:function(){return r(this.weekYear(),4)},ggggg:function(){return r(this.weekYear(),5)},GG:function(){return r(this.isoWeekYear()%100,2)},GGGG:function(){return r(this.isoWeekYear(),4)},GGGGG:function(){return r(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return C(this.milliseconds()/100)},SS:function(){return r(C(this.milliseconds()/10),2)},SSS:function(){return r(this.milliseconds(),3)},SSSS:function(){return r(this.milliseconds(),3)},Z:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+":"+r(C(a)%60,2)},ZZ:function(){var a=this.utcOffset(),b="+";return 0>a&&(a=-a,b="-"),b+r(C(a/60),2)+r(C(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},sc={},tc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"],uc=!1;pc.length;)xb=pc.pop(),rc[xb+"o"]=i(rc[xb],xb);for(;qc.length;)xb=qc.pop(),rc[xb+xb]=h(rc[xb],2);rc.DDDD=h(rc.DDD,3),o(l.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=vb.utc([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=vb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b,c){var d=this._calendar[a];return"function"==typeof d?d.apply(b,[c]):d},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(a){return a},postformat:function(a){return a},week:function(a){return jb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},firstDayOfWeek:function(){return this._week.dow},firstDayOfYear:function(){return this._week.doy},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),vb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),lb(g)},vb.suppressDeprecationWarnings=!1,vb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),vb.min=function(){var a=[].slice.call(arguments,0);return mb("isBefore",a)},vb.max=function(){var a=[].slice.call(arguments,0);return mb("isAfter",a)},vb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),lb(g).utc()},vb.unix=function(a){return vb(1e3*a)},vb.duration=function(a,b){var d,e,f,g,h=a,i=null;return vb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Nb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:C(i[Eb])*d,h:C(i[Fb])*d,m:C(i[Gb])*d,s:C(i[Hb])*d,ms:C(i[Ib])*d}):(i=Ob.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):null==h?h={}:"object"==typeof h&&("from"in h||"to"in h)&&(g=t(vb(h.from),vb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new n(h),vb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},vb.version=yb,vb.defaultFormat=gc,vb.ISO_8601=function(){},vb.momentProperties=Kb,vb.updateOffset=function(){},vb.relativeTimeThreshold=function(b,c){return oc[b]===a?!1:c===a?oc[b]:(oc[b]=c,!0)},vb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return vb.locale(a,b)}),vb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?vb.defineLocale(a,b):vb.localeData(a),c&&(vb.duration._locale=vb._locale=c)),vb._locale._abbr},vb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Jb[a]||(Jb[a]=new l),Jb[a].set(b),vb.locale(a),Jb[a]):(delete Jb[a],null)},vb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return vb.localeData(a)}),vb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return vb._locale;if(!w(a)){if(b=L(a))return b;a=[a]}return K(a)},vb.isMoment=function(a){return a instanceof m||null!=a&&c(a,"_isAMomentObject")},vb.isDuration=function(a){return a instanceof n};for(xb=tc.length-1;xb>=0;--xb)B(tc[xb]);vb.normalizeUnits=function(a){return z(a)},vb.invalid=function(a){var b=vb.utc(0/0);return null!=a?o(b._pf,a):b._pf.userInvalidated=!0,b},vb.parseZone=function(){return vb.apply(null,arguments).parseZone()},vb.parseTwoDigitYear=function(a){return C(a)+(C(a)>68?1900:2e3)},vb.isDate=x,o(vb.fn=m.prototype,{clone:function(){return vb(this)},valueOf:function(){return+this._d-6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=vb(this).utc();return 0<a.year()&&a.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():P(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return I(this)},isDSTShifted:function(){return this._a?this.isValid()&&y(this._a,(this._isUTC?vb.utc(this._a):vb(this._a)).toArray())>0:!1},parsingFlags:function(){return o({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.utcOffset(0,a)},local:function(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(this._dateUtcOffset(),"m")),this},format:function(a){var b=P(this,a||vb.defaultFormat);return this.localeData().postformat(b)},add:u(1,"add"),subtract:u(-1,"subtract"),diff:function(a,b,c){var d,e,f=M(a,this),g=6e4*(f.utcOffset()-this.utcOffset());return b=z(b),"year"===b||"month"===b||"quarter"===b?(e=j(this,f),"quarter"===b?e/=3:"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:q(e)},from:function(a,b){return vb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(vb(),a)},calendar:function(a){var b=a||vb(),c=M(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this,vb(b)))},isLeapYear:function(){return G(this.year())},isDST:function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=gb(a,this.localeData()),this.add(a-b,"d")):b},month:qb("Month",!0),startOf:function(a){switch(a=z(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(b){return b=z(b),b===a||"millisecond"===b?this:this.startOf(b).add(1,"isoWeek"===b?"week":b).subtract(1,"ms")},isAfter:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this>+a):(c=vb.isMoment(a)?+a:+vb(a),c<+this.clone().startOf(b))},isBefore:function(a,b){var c;return b=z("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+a>+this):(c=vb.isMoment(a)?+a:+vb(a),+this.clone().endOf(b)<c)},isBetween:function(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)},isSame:function(a,b){var c;return b=z(b||"millisecond"),"millisecond"===b?(a=vb.isMoment(a)?a:vb(a),+this===+a):(c=+vb(a),+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=vb.apply(null,arguments),a>this?this:a}),zone:f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",function(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}),utcOffset:function(a,b){var c,d=this._offset||0;return null!=a?("string"==typeof a&&(a=S(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateUtcOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.add(c,"m"),d!==a&&(!b||this._changeInProgress?v(this,vb.duration(a-d,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,vb.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?d:this._dateUtcOffset()},isLocal:function(){return!this._isUTC},isUtcOffset:function(){return this._isUTC},isUtc:function(){return this._isUTC&&0===this._offset},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(S(this._i)),this},hasAlignedHourOffset:function(a){return a=a?vb(a).utcOffset():0,(this.utcOffset()-a)%60===0},daysInMonth:function(){return D(this.year(),this.month())},dayOfYear:function(a){var b=Ab((vb(this).startOf("day")-vb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=jb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=jb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=jb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return E(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return E(this.year(),a.dow,a.doy)},get:function(a){return a=z(a),this[a]()},set:function(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else a=z(a),"function"==typeof this[a]&&this[a](b);return this},locale:function(b){var c;return b===a?this._locale._abbr:(c=vb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateUtcOffset:function(){return 15*-Math.round(this._d.getTimezoneOffset()/15)}}),vb.fn.millisecond=vb.fn.milliseconds=qb("Milliseconds",!1),vb.fn.second=vb.fn.seconds=qb("Seconds",!1),vb.fn.minute=vb.fn.minutes=qb("Minutes",!1),vb.fn.hour=vb.fn.hours=qb("Hours",!0),vb.fn.date=qb("Date",!0),vb.fn.dates=f("dates accessor is deprecated. Use date instead.",qb("Date",!0)),vb.fn.year=qb("FullYear",!0),vb.fn.years=f("years accessor is deprecated. Use year instead.",qb("FullYear",!0)),vb.fn.days=vb.fn.day,vb.fn.months=vb.fn.month,vb.fn.weeks=vb.fn.week,vb.fn.isoWeeks=vb.fn.isoWeek,vb.fn.quarters=vb.fn.quarter,vb.fn.toJSON=vb.fn.toISOString,vb.fn.isUTC=vb.fn.isUtc,o(vb.duration.fn=n.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=q(d/1e3),g.seconds=a%60,b=q(a/60),g.minutes=b%60,c=q(b/60),g.hours=c%24,e+=q(c/24),h=q(rb(e)),e-=q(sb(h)),f+=q(e/30),e%=30,h+=q(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return q(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*C(this._months/12)
},humanize:function(a){var b=ib(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=vb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=vb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=z(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=z(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*rb(b),"month"===a?c:c/12;switch(b=this._days+Math.round(sb(this._months/12)),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:vb.fn.lang,locale:vb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale},toJSON:function(){return this.toISOString()}}),vb.duration.fn.toString=vb.duration.fn.toISOString;for(xb in kc)c(kc,xb)&&tb(xb.toLowerCase());vb.duration.fn.asMilliseconds=function(){return this.as("ms")},vb.duration.fn.asSeconds=function(){return this.as("s")},vb.duration.fn.asMinutes=function(){return this.as("m")},vb.duration.fn.asHours=function(){return this.as("h")},vb.duration.fn.asDays=function(){return this.as("d")},vb.duration.fn.asWeeks=function(){return this.as("weeks")},vb.duration.fn.asMonths=function(){return this.as("M")},vb.duration.fn.asYears=function(){return this.as("y")},vb.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===C(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Lb?module.exports=vb:"function"==typeof define&&define.amd?(define(function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(zb.moment=wb),vb}),ub(!0)):ub()}).call(this);

/**
* @version: 2.0
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['moment', 'jquery', 'exports'], function(momentjs, $, exports) {
      root.daterangepicker = factory(root, exports, momentjs, $);
    });

  } else if (typeof exports !== 'undefined') {
    var momentjs = require('moment');
    var jQuery;
    try {
      jQuery = require('jquery');
    } catch (err) {
      jQuery = window.jQuery;
      if (!jQuery) throw new Error('jQuery dependnecy not found');
    }

    factory(root, exports, momentjs, jQuery);

  // Finally, as a browser global.
  } else {
    root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, daterangepicker, moment, $) {

    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.timeZone = moment().utcOffset();
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData()._week.dow
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string')
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' + 
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' + 
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;
        
        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        // bind the time zone used to build the calendar to either the timeZone passed in through the options or the zone of the startDate (which will be the local time zone by default)
        if (typeof options.timeZone === 'string' || typeof options.timeZone === 'number') {
            if (typeof options.timeZone === 'string' && typeof moment.tz !== 'undefined') {
                this.timeZone = moment.tz.zone(options.timeZone).parse(new Date) * -1;  // Offset is positive if the timezone is behind UTC and negative if it is ahead.
            } else {
                this.timeZone = options.timeZone;
            }
          this.startDate.utcOffset(this.timeZone);
          this.endDate.utcOffset(this.timeZone);
        } else {
            this.timeZone = moment(this.startDate).utcOffset();
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is 
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;

                this.ranges[range] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges ul').remove();
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input i').hide();
            if (!this.timePicker) {
                this.container.find('.ranges').hide();
            }
        }

        if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
            this.container.addClass('show-calendar');
        }

        this.container.removeClass('opensleft opensright').addClass('opens' + this.opens);

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            .on('keyup.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.updateFormInputs, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.controlChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input')) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format).utcOffset(this.timeZone);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format).utcOffset(this.timeZone);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.updateMonthsInView();
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {
                this.leftCalendar.month = this.startDate.clone().day(1);
                if (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year()) {
                    this.rightCalendar.month = this.endDate.clone().day(1);
                } else {
                    this.rightCalendar.month = this.startDate.clone().day(1).add(1, 'month');
                }
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    console.log('here2');
                    this.leftCalendar.month = this.startDate.clone().day(1);
                    this.rightCalendar.month = this.startDate.clone().day(1).add(1, 'month');
                }
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                this.showCalendars();
            }

        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            // Possible patch for issue #626 https://github.com/dangrossman/bootstrap-daterangepicker/issues/626
            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]); // .utcOffset(this.timeZone);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if (!minDate || minDate.isBefore(calendar.firstDay)) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if (!maxDate || maxDate.isAfter(calendar.lastDay)) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];
                    
                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i in classes) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.trim() + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {
  
            var selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate ? this.endDate.clone() : this.startDate.clone();
                minDate = this.startDate;
            }
 
            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {
            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }
        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }
            
            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);
            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
 
            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            if (this.element.is('input') && !this.singleDatePicker) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input')) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }

            $(document).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.hideCalendars();
                this.hide();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (this.endDate || date.isBefore(this.startDate)) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = cal.find('.ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply)
                    this.clickApply();
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            this[leftOrRight+'Calendar'].month.month(month).year(year);
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker)
                    this.endDate = this.startDate.clone();
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateCalendars();
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
            }
        },

        controlChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format).utcOffset(this.timeZone);
                end = moment(dateString[1], this.locale.format).utcOffset(this.timeZone);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format).utcOffset(this.timeZone);
                end = start;
            }

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },
        
        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };

}));

(function ($) {
  'use strict';

  //<editor-fold desc="Shims">
  if (!String.prototype.includes) {
    (function () {
      'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
      var toString = {}.toString;
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }());
      var indexOf = ''.indexOf;
      var includes = function (search) {
        if (this == null) {
          throw TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        return indexOf.call(string, searchString, pos) != -1;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'includes', {
          'value': includes,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.includes = includes;
      }
    }());
  }

  if (!String.prototype.startsWith) {
    (function () {
      'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }());
      var toString = {}.toString;
      var startsWith = function (search) {
        if (this == null) {
          throw TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        var index = -1;
        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }
        return true;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    }());
  }

  if (!Object.keys) {
    Object.keys = function (
      o, // object
      k, // key
      r  // result array
      ){
      // initialize object and result
      r=[];
      // iterate over object keys
      for (k in o) 
          // fill result array with non-prototypical keys
        r.hasOwnProperty.call(o, k) && r.push(k);
      // return result
      return r
    };
  }
  //</editor-fold>

  // Case insensitive contains search
  $.expr[':'].icontains = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
    return haystack.includes(meta[3].toUpperCase());
  };

  // Case insensitive begins search
  $.expr[':'].ibegins = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
    return haystack.startsWith(meta[3].toUpperCase());
  };

  // Case and accent insensitive contains search
  $.expr[':'].aicontains = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
    return haystack.includes(meta[3].toUpperCase());
  };

  // Case and accent insensitive begins search
  $.expr[':'].aibegins = function (obj, index, meta) {
    var $obj = $(obj);
    var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
    return haystack.startsWith(meta[3].toUpperCase());
  };

  /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
  function normalizeToBase(text) {
    var rExps = [
      {re: /[\xC0-\xC6]/g, ch: "A"},
      {re: /[\xE0-\xE6]/g, ch: "a"},
      {re: /[\xC8-\xCB]/g, ch: "E"},
      {re: /[\xE8-\xEB]/g, ch: "e"},
      {re: /[\xCC-\xCF]/g, ch: "I"},
      {re: /[\xEC-\xEF]/g, ch: "i"},
      {re: /[\xD2-\xD6]/g, ch: "O"},
      {re: /[\xF2-\xF6]/g, ch: "o"},
      {re: /[\xD9-\xDC]/g, ch: "U"},
      {re: /[\xF9-\xFC]/g, ch: "u"},
      {re: /[\xC7-\xE7]/g, ch: "c"},
      {re: /[\xD1]/g, ch: "N"},
      {re: /[\xF1]/g, ch: "n"}
    ];
    $.each(rExps, function () {
      text = text.replace(this.re, this.ch);
    });
    return text;
  }


  function htmlEscape(html) {
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
    var source = '(?:' + Object.keys(escapeMap).join('|') + ')',
        testRegexp = new RegExp(source),
        replaceRegexp = new RegExp(source, 'g'),
        string = html == null ? '' : '' + html;
    return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
      return escapeMap[match];
    }) : string;
  }

  var Selectpicker = function (element, options, e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.$element = $(element);
    this.$newElement = null;
    this.$button = null;
    this.$menu = null;
    this.$lis = null;
    this.options = options;

    // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
    // data-attribute)
    if (this.options.title === null) {
      this.options.title = this.$element.attr('title');
    }

    //Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.refresh = Selectpicker.prototype.refresh;
    this.setStyle = Selectpicker.prototype.setStyle;
    this.selectAll = Selectpicker.prototype.selectAll;
    this.deselectAll = Selectpicker.prototype.deselectAll;
    this.destroy = Selectpicker.prototype.remove;
    this.remove = Selectpicker.prototype.remove;
    this.show = Selectpicker.prototype.show;
    this.hide = Selectpicker.prototype.hide;

    this.init();
  };

  Selectpicker.VERSION = '1.7.2';

  // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
  Selectpicker.DEFAULTS = {
    noneSelectedText: 'Nothing selected',
    noneResultsText: 'No results matched {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
        (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
      ];
    },
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    doneButton: false,
    doneButtonText: 'Close',
    multipleSeparator: ', ',
    styleBase: 'btn',
    style: 'btn-default',
    size: 'auto',
    title: null,
    selectedTextFormat: 'values',
    width: false,
    container: false,
    hideDisabled: false,
    showSubtext: false,
    showIcon: true,
    showContent: true,
    dropupAuto: true,
    header: false,
    liveSearch: false,
    liveSearchPlaceholder: null,
    liveSearchNormalize: false,
    liveSearchStyle: 'contains',
    actionsBox: false,
    iconBase: 'glyphicon',
    tickIcon: 'glyphicon-ok',
    maxOptions: false,
    mobile: false,
    selectOnTab: false,
    dropdownAlignRight: false
  };

  Selectpicker.prototype = {

    constructor: Selectpicker,

    init: function () {
      var that = this,
          id = this.$element.attr('id');

      this.$element.addClass('bs-select-hidden');
      // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
      // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
      this.liObj = {};
      this.multiple = this.$element.prop('multiple');
      this.autofocus = this.$element.prop('autofocus');
      this.$newElement = this.createView();
      this.$element.after(this.$newElement);
      this.$button = this.$newElement.children('button');
      this.$menu = this.$newElement.children('.dropdown-menu');
      this.$menuInner = this.$menu.children('.inner');
      this.$searchbox = this.$menu.find('input');

      if (this.options.dropdownAlignRight)
        this.$menu.addClass('dropdown-menu-right');

      if (typeof id !== 'undefined') {
        this.$button.attr('data-id', id);
        $('label[for="' + id + '"]').click(function (e) {
          e.preventDefault();
          that.$button.focus();
        });
      }

      this.checkDisabled();
      this.clickListener();
      if (this.options.liveSearch) this.liveSearchListener();
      this.render();
      this.setStyle();
      this.setWidth();
      if (this.options.container) this.selectPosition();
      this.$menu.data('this', this);
      this.$newElement.data('this', this);
      if (this.options.mobile) this.mobile();

      this.$newElement.on('hide.bs.dropdown', function (e) {
        that.$element.trigger('hide.bs.select', e);
      });
      
      this.$newElement.on('hidden.bs.dropdown', function (e) {
        that.$element.trigger('hidden.bs.select', e);
      });
      
      this.$newElement.on('show.bs.dropdown', function (e) {
        that.$element.trigger('show.bs.select', e);
      });
      
      this.$newElement.on('shown.bs.dropdown', function (e) {
        that.$element.trigger('shown.bs.select', e);
      });

      setTimeout(function () {
        that.$element.trigger('loaded.bs.select');
      });
    },

    createDropdown: function () {
      // Options
      // If we are multiple, then add the show-tick class by default
      var multiple = this.multiple ? ' show-tick' : '',
          inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
          autofocus = this.autofocus ? ' autofocus' : '';
      // Elements
      var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
      var searchbox = this.options.liveSearch ?
      '<div class="bs-searchbox">' +
      '<input type="text" class="form-control" autocomplete="off"' +
      (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + '>' +
      '</div>'
          : '';
      var actionsbox = this.multiple && this.options.actionsBox ?
      '<div class="bs-actionsbox">' +
      '<div class="btn-group btn-group-sm btn-block">' +
      '<button type="button" class="actions-btn bs-select-all btn btn-default">' +
      this.options.selectAllText +
      '</button>' +
      '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
      this.options.deselectAllText +
      '</button>' +
      '</div>' +
      '</div>'
          : '';
      var donebutton = this.multiple && this.options.doneButton ?
      '<div class="bs-donebutton">' +
      '<div class="btn-group btn-block">' +
      '<button type="button" class="btn btn-sm btn-default">' +
      this.options.doneButtonText +
      '</button>' +
      '</div>' +
      '</div>'
          : '';
      var drop =
          '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' +
          '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + '>' +
          '<span class="filter-option pull-left"></span>&nbsp;' +
          '<span class="caret"></span>' +
          '</button>' +
          '<div class="dropdown-menu open">' +
          header +
          searchbox +
          actionsbox +
          '<ul class="dropdown-menu inner" role="menu">' +
          '</ul>' +
          donebutton +
          '</div>' +
          '</div>';

      return $(drop);
    },

    createView: function () {
      var $drop = this.createDropdown(),
          li = this.createLi();

      $drop.find('ul')[0].innerHTML = li;
      return $drop;
    },

    reloadLi: function () {
      //Remove all children.
      this.destroyLi();
      //Re build
      var li = this.createLi();
      this.$menuInner[0].innerHTML = li;
    },

    destroyLi: function () {
      this.$menu.find('li').remove();
    },

    createLi: function () {
      var that = this,
          _li = [],
          optID = 0,
          titleOption = document.createElement('option'),
          liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

      // Helper functions
      /**
       * @param content
       * @param [index]
       * @param [classes]
       * @param [optgroup]
       * @returns {string}
       */
      var generateLI = function (content, index, classes, optgroup) {
        return '<li' +
            ((typeof classes !== 'undefined' & '' !== classes) ? ' class="' + classes + '"' : '') +
            ((typeof index !== 'undefined' & null !== index) ? ' data-original-index="' + index + '"' : '') +
            ((typeof optgroup !== 'undefined' & null !== optgroup) ? 'data-optgroup="' + optgroup + '"' : '') +
            '>' + content + '</li>';
      };

      /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [tokens]
       * @returns {string}
       */
      var generateA = function (text, classes, inline, tokens) {
        return '<a tabindex="0"' +
            (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
            (typeof inline !== 'undefined' ? ' style="' + inline + '"' : '') +
            (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape(text)) + '"' : '') +
            (typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') +
            '>' + text +
            '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
            '</a>';
      };

      if (this.options.title && !this.multiple) {
        // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
        // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
        liIndex--;

        if (!this.$element.find('.bs-title-option').length) {
          // Use native JS to prepend option (faster)
          var element = this.$element[0];
          titleOption.className = 'bs-title-option';
          titleOption.appendChild(document.createTextNode(this.options.title));
          titleOption.value = '';
          element.insertBefore(titleOption, element.firstChild);
          // Check if selected attribute is already set on an option. If not, select the titleOption option.
          if (element.options[element.selectedIndex].getAttribute('selected') === null) titleOption.selected = true;
        }
      }

      this.$element.find('option').each(function (index) {
        var $this = $(this);

        liIndex++;

        if ($this.hasClass('bs-title-option')) return;

        // Get the class and text for the option
        var optionClass = this.className || '',
            inline = this.style.cssText,
            text = $this.data('content') ? $this.data('content') : $this.html(),
            tokens = $this.data('tokens') ? $this.data('tokens') : null,
            subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
            icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
            isDisabled = this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled;

        if (icon !== '' && isDisabled) {
          icon = '<span>' + icon + '</span>';
        }

        if (that.options.hideDisabled && isDisabled) {
          liIndex--;
          return;
        }

        if (!$this.data('content')) {
          // Prepend any icon and append any subtext to the main text.
          text = icon + '<span class="text">' + text + subtext + '</span>';
        }

        if (this.parentElement.tagName === 'OPTGROUP' && $this.data('divider') !== true) {
          if ($this.index() === 0) { // Is it the first option of the optgroup?
            optID += 1;

            // Get the opt group label
            var label = this.parentElement.label,
                labelSubtext = typeof $this.parent().data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.parent().data('subtext') + '</small>' : '',
                labelIcon = $this.parent().data('icon') ? '<span class="' + that.options.iconBase + ' ' + $this.parent().data('icon') + '"></span> ' : '',
                optGroupClass = ' ' + this.parentElement.className || '';
            
            label = labelIcon + '<span class="text">' + label + labelSubtext + '</span>';

            if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
              liIndex++;
              _li.push(generateLI('', null, 'divider', optID + 'div'));
            }
            liIndex++;
            _li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
          }
          _li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
        } else if ($this.data('divider') === true) {
          _li.push(generateLI('', index, 'divider'));
        } else if ($this.data('hidden') === true) {
          _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
        } else {
          if (this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP') {
            liIndex++;
            _li.push(generateLI('', null, 'divider', optID + 'div'));
          }
          _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
        }

        that.liObj[index] = liIndex;
      });

      //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
      if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
        this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
      }

      return _li.join('');
    },

    findLis: function () {
      if (this.$lis == null) this.$lis = this.$menu.find('li');
      return this.$lis;
    },

    /**
     * @param [updateLi] defaults to true
     */
    render: function (updateLi) {
      var that = this,
          notDisabled;

      //Update the LI to match the SELECT
      if (updateLi !== false) {
        this.$element.find('option').each(function (index) {
          var $lis = that.findLis().eq(that.liObj[index]);

          that.setDisabled(index, this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled, $lis);
          that.setSelected(index, this.selected, $lis);
        });
      }

      this.tabIndex();

      var selectedItems = this.$element.find('option').map(function () {
        if (this.selected) {
          if (that.options.hideDisabled && (this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled)) return false;

          var $this = $(this),
              icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
              subtext;

          if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
            subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
          } else {
            subtext = '';
          }
          if (typeof $this.attr('title') !== 'undefined') {
            return $this.attr('title');
          } else if ($this.data('content') && that.options.showContent) {
            return $this.data('content');
          } else {
            return icon + $this.html() + subtext;
          }
        }
      }).toArray();

      //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
      //Convert all the values into a comma delimited string
      var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

      //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
      if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
        var max = this.options.selectedTextFormat.split('>');
        if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
          notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
          var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
          title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
        }
      }

      if (this.options.title == undefined) {
        this.options.title = this.$element.attr('title');
      }

      if (this.options.selectedTextFormat == 'static') {
        title = this.options.title;
      }

      //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
      if (!title) {
        title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
      }

      //strip all html-tags and trim the result
      this.$button.attr('title', $.trim(title.replace(/<[^>]*>?/g, '')));
      this.$button.children('.filter-option').html(title);

      this.$element.trigger('rendered.bs.select');
    },

    /**
     * @param [style]
     * @param [status]
     */
    setStyle: function (style, status) {
      if (this.$element.attr('class')) {
        this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
      }

      var buttonClass = style ? style : this.options.style;

      if (status == 'add') {
        this.$button.addClass(buttonClass);
      } else if (status == 'remove') {
        this.$button.removeClass(buttonClass);
      } else {
        this.$button.removeClass(this.options.style);
        this.$button.addClass(buttonClass);
      }
    },

    liHeight: function (refresh) {
      if (!refresh && (this.options.size === false || this.sizeInfo)) return;

      var newElement = document.createElement('div'),
          menu = document.createElement('div'),
          menuInner = document.createElement('ul'),
          divider = document.createElement('li'),
          li = document.createElement('li'),
          a = document.createElement('a'),
          text = document.createElement('span'),
          header = this.options.header ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
          search = this.options.liveSearch ? document.createElement('div') : null,
          actions = this.options.actionsBox && this.multiple ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
          doneButton = this.options.doneButton && this.multiple ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

      text.className = 'text';
      newElement.className = this.$menu[0].parentNode.className + ' open';
      menu.className = 'dropdown-menu open';
      menuInner.className = 'dropdown-menu inner';
      divider.className = 'divider';

      text.appendChild(document.createTextNode('Inner text'));
      a.appendChild(text);
      li.appendChild(a);
      menuInner.appendChild(li);
      menuInner.appendChild(divider);
      if (header) menu.appendChild(header);
      if (search) {
        // create a span instead of input as creating an input element is slower
        var input = document.createElement('span');
        search.className = 'bs-searchbox';
        input.className = 'form-control';
        search.appendChild(input);
        menu.appendChild(search);
      }
      if (actions) menu.appendChild(actions);
      menu.appendChild(menuInner);
      if (doneButton) menu.appendChild(doneButton);
      newElement.appendChild(menu);

      document.body.appendChild(newElement);

      var liHeight = a.offsetHeight,
          headerHeight = header ? header.offsetHeight : 0,
          searchHeight = search ? search.offsetHeight : 0,
          actionsHeight = actions ? actions.offsetHeight : 0,
          doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
          dividerHeight = $(divider).outerHeight(true),
          // fall back to jQuery if getComputedStyle is not supported
          menuStyle = getComputedStyle ? getComputedStyle(menu) : false,
          $menu = menuStyle ? $(menu) : null,
          menuPadding = parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                        parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                        parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                        parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
          menuExtras =  menuPadding + 
                        parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) + 
                        parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2;

      document.body.removeChild(newElement);

      this.sizeInfo = {
        liHeight: liHeight,
        headerHeight: headerHeight,
        searchHeight: searchHeight,
        actionsHeight: actionsHeight,
        doneButtonHeight: doneButtonHeight,
        dividerHeight: dividerHeight,
        menuPadding: menuPadding,
        menuExtras: menuExtras
      };
    },

    setSize: function () {
      this.findLis();
      this.liHeight();
      var that = this,
          $menu = this.$menu,
          $menuInner = this.$menuInner,
          $window = $(window),
          selectHeight = this.$newElement[0].offsetHeight,
          liHeight = this.sizeInfo['liHeight'],
          headerHeight = this.sizeInfo['headerHeight'],
          searchHeight = this.sizeInfo['searchHeight'],
          actionsHeight = this.sizeInfo['actionsHeight'],
          doneButtonHeight = this.sizeInfo['doneButtonHeight'],
          divHeight = this.sizeInfo['dividerHeight'],
          menuPadding = this.sizeInfo['menuPadding'],
          menuExtras = this.sizeInfo['menuExtras'],
          notDisabled = this.options.hideDisabled ? '.disabled' : '',
          menuHeight,
          getHeight,
          selectOffsetTop,
          selectOffsetBot,
          posVert = function () {
            selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
            selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
          };

      posVert();

      if (this.options.header) $menu.css('padding-top', 0);

      if (this.options.size === 'auto') {
        var getSize = function () {
          var minHeight,
              hasClass = function (className, include) {
                return function (element) {
                    if (include) {
                        return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                    } else {
                        return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                    }
                };
              },
              lis = that.$menuInner[0].getElementsByTagName('li'),
              lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
              optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

          posVert();
          menuHeight = selectOffsetBot - menuExtras;

          if (that.options.container) {
            if (!$menu.data('height')) $menu.data('height', $menu.height());
            getHeight = $menu.data('height');
          } else {
            getHeight = $menu.height();
          }

          if (that.options.dropupAuto) {
            that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
          }
          if (that.$newElement.hasClass('dropup')) {
            menuHeight = selectOffsetTop - menuExtras;
          }

          if ((lisVisible.length + optGroup.length) > 3) {
            minHeight = liHeight * 3 + menuExtras - 2;
          } else {
            minHeight = 0;
          }

          $menu.css({
            'max-height': menuHeight + 'px',
            'overflow': 'hidden',
            'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
          });
          $menuInner.css({
            'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding + 'px',
            'overflow-y': 'auto',
            'min-height': Math.max(minHeight - menuPadding, 0) + 'px'
          });
        };
        getSize();
        this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
        $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
      } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
        var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
            divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;

        if (that.options.container) {
          if (!$menu.data('height')) $menu.data('height', $menu.height());
          getHeight = $menu.data('height');
        } else {
          getHeight = $menu.height();
        }

        if (that.options.dropupAuto) {
          //noinspection JSUnusedAssignment
          this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
        }
        $menu.css({
          'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
          'overflow': 'hidden',
          'min-height': ''
        });
        $menuInner.css({
          'max-height': menuHeight - menuPadding + 'px',
          'overflow-y': 'auto',
          'min-height': ''
        });
      }
    },

    setWidth: function () {
      if (this.options.width === 'auto') {
        this.$menu.css('min-width', '0');

        // Get correct width if element is hidden
        var $selectClone = this.$menu.parent().clone().appendTo('body'),
            $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
            ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
            btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

        $selectClone.remove();
        $selectClone2.remove();

        // Set width to whatever's larger, button title or longest option
        this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
      } else if (this.options.width === 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '').addClass('fit-width');
      } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', this.options.width);
      } else {
        // Remove inline min-width/width so width can be changed
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '');
      }
      // Remove fit-width class if width is changed programmatically
      if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
        this.$newElement.removeClass('fit-width');
      }
    },

    selectPosition: function () {
      var that = this,
          drop = '<div />',
          $drop = $(drop),
          pos,
          actualHeight,
          getPlacement = function ($element) {
            $drop.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
            pos = $element.offset();
            actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
            $drop.css({
              'top': pos.top + actualHeight,
              'left': pos.left,
              'width': $element[0].offsetWidth,
              'position': 'absolute'
            });
          };

      this.$newElement.on('click', function () {
        if (that.isDisabled()) {
          return;
        }
        getPlacement($(this));
        $drop.appendTo(that.options.container);
        $drop.toggleClass('open', !$(this).hasClass('open'));
        $drop.append(that.$menu);
      });

      $(window).on('resize scroll', function () {
        getPlacement(that.$newElement);
      });

      this.$element.on('hide.bs.select', function () {
        that.$menu.data('height', that.$menu.height());
        $drop.detach();
      });
    },

    setSelected: function (index, selected, $lis) {
      if (!$lis) {
        var $lis = this.findLis().eq(this.liObj[index]);
      }

      $lis.toggleClass('selected', selected);
    },

    setDisabled: function (index, disabled, $lis) {
      if (!$lis) {
        var $lis = this.findLis().eq(this.liObj[index]);
      }

      if (disabled) {
        $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1);
      } else {
        $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0);
      }
    },

    isDisabled: function () {
      return this.$element[0].disabled;
    },

    checkDisabled: function () {
      var that = this;

      if (this.isDisabled()) {
        this.$newElement.addClass('disabled');
        this.$button.addClass('disabled').attr('tabindex', -1);
      } else {
        if (this.$button.hasClass('disabled')) {
          this.$newElement.removeClass('disabled');
          this.$button.removeClass('disabled');
        }

        if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
          this.$button.removeAttr('tabindex');
        }
      }

      this.$button.click(function () {
        return !that.isDisabled();
      });
    },

    tabIndex: function () {
      if (this.$element.is('[tabindex]')) {
        this.$element.data('tabindex', this.$element.attr('tabindex'));
        this.$button.attr('tabindex', this.$element.data('tabindex'));
      }
    },

    clickListener: function () {
      var that = this,
          $document = $(document);

      this.$newElement.on('touchstart.dropdown', '.dropdown-menu', function (e) {
        e.stopPropagation();
      });

      $document.data('spaceSelect', false);
      
      this.$button.on('keyup', function (e) {
        if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
        }
      });

      this.$newElement.on('click', function () {
        that.setSize();
        that.$element.on('shown.bs.select', function () {
          if (!that.options.liveSearch && !that.multiple) {
            that.$menu.find('.selected a').focus();
          } else if (!that.multiple) {
            var selectedIndex = that.liObj[that.$element[0].selectedIndex];

            if (typeof selectedIndex !== 'number') return;
            
            // scroll to selected option
            var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
            offset = offset - that.$menuInner[0].offsetHeight/2 + that.sizeInfo.liHeight/2;
            that.$menuInner[0].scrollTop = offset;
          }
        });
      });

      this.$menu.on('click', 'li a', function (e) {
        var $this = $(this),
            clickedIndex = $this.parent().data('originalIndex'),
            prevValue = that.$element.val(),
            prevIndex = that.$element.prop('selectedIndex');

        // Don't close on multi choice menu
        if (that.multiple) {
          e.stopPropagation();
        }

        e.preventDefault();

        //Don't run if we have been disabled
        if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
          var $options = that.$element.find('option'),
              $option = $options.eq(clickedIndex),
              state = $option.prop('selected'),
              $optgroup = $option.parent('optgroup'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

          if (!that.multiple) { // Deselect all others if not multi select box
            $options.prop('selected', false);
            $option.prop('selected', true);
            that.$menu.find('.selected').removeClass('selected');
            that.setSelected(clickedIndex, true);
          } else { // Toggle the one we have chosen if we are multi select.
            $option.prop('selected', !state);
            that.setSelected(clickedIndex, !state);
            $this.blur();

            if (maxOptions !== false || maxOptionsGrp !== false) {
              var maxReached = maxOptions < $options.filter(':selected').length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

              if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                if (maxOptions && maxOptions == 1) {
                  $options.prop('selected', false);
                  $option.prop('selected', true);
                  that.$menu.find('.selected').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                  $optgroup.find('option:selected').prop('selected', false);
                  $option.prop('selected', true);
                  var optgroupID = $this.parent().data('optgroup');
                  that.$menu.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else {
                  var maxOptionsArr = (typeof that.options.maxOptionsText === 'function') ?
                          that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                  // If {var} is set in array, replace it
                  /** @deprecated */
                  if (maxOptionsArr[2]) {
                    maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                    maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                  }

                  $option.prop('selected', false);

                  that.$menu.append($notify);

                  if (maxOptions && maxReached) {
                    $notify.append($('<div>' + maxTxt + '</div>'));
                    that.$element.trigger('maxReached.bs.select');
                  }

                  if (maxOptionsGrp && maxReachedGrp) {
                    $notify.append($('<div>' + maxTxtGrp + '</div>'));
                    that.$element.trigger('maxReachedGrp.bs.select');
                  }

                  setTimeout(function () {
                    that.setSelected(clickedIndex, false);
                  }, 10);

                  $notify.delay(750).fadeOut(300, function () {
                    $(this).remove();
                  });
                }
              }
            }
          }

          if (!that.multiple) {
            that.$button.focus();
          } else if (that.options.liveSearch) {
            that.$searchbox.focus();
          }

          // Trigger select 'change'
          if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
            that.$element.change();
            // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
            that.$element.trigger('changed.bs.select', [clickedIndex, $option.prop('selected'), state]);
          }
        }
      });

      this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
        if (e.currentTarget == this) {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch && !$(e.target).hasClass('close')) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }
        }
      });

      this.$menu.on('click', 'li.divider, li.dropdown-header', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }
      });

      this.$menu.on('click', '.popover-title .close', function () {
        that.$button.click();
      });

      this.$searchbox.on('click', function (e) {
        e.stopPropagation();
      });

      this.$menu.on('click', '.actions-btn', function (e) {
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('bs-select-all')) {
          that.selectAll();
        } else {
          that.deselectAll();
        }
        that.$element.change();
      });

      this.$element.change(function () {
        that.render(false);
      });
    },

    liveSearchListener: function () {
      var that = this,
          $no_results = $('<li class="no-results"></li>');

      this.$newElement.on('click.dropdown.data-api touchstart.dropdown.data-api', function () {
        that.$menuInner.find('.active').removeClass('active');
        if (!!that.$searchbox.val()) {
          that.$searchbox.val('');
          that.$lis.not('.is-hidden').removeClass('hidden');
          if (!!$no_results.parent().length) $no_results.remove();
        }
        if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
        setTimeout(function () {
          that.$searchbox.focus();
        }, 10);
      });

      this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
        e.stopPropagation();
      });

      this.$searchbox.on('input propertychange', function () {
        if (that.$searchbox.val()) {
          var $searchBase = that.$lis.not('.is-hidden').removeClass('hidden').children('a');
          if (that.options.liveSearchNormalize) {
            $searchBase = $searchBase.not(':a' + that._searchStyle() + '(' + normalizeToBase(that.$searchbox.val()) + ')');
          } else {
            $searchBase = $searchBase.not(':' + that._searchStyle() + '(' + that.$searchbox.val() + ')');
          }
          $searchBase.parent().addClass('hidden');

          that.$lis.filter('.dropdown-header').each(function () {
            var $this = $(this),
                optgroup = $this.data('optgroup');

            if (that.$lis.filter('[data-optgroup=' + optgroup + ']').not($this).not('.hidden').length === 0) {
              $this.addClass('hidden');
              that.$lis.filter('[data-optgroup=' + optgroup + 'div]').addClass('hidden');
            }
          });

          var $lisVisible = that.$lis.not('.hidden');

          // hide divider if first or last visible, or if followed by another divider
          $lisVisible.each(function (index) {
            var $this = $(this);

            if ($this.hasClass('divider') && (
              $this.index() === $lisVisible.eq(0).index() ||
              $this.index() === $lisVisible.last().index() ||
              $lisVisible.eq(index + 1).hasClass('divider'))) {
              $this.addClass('hidden');
            }
          });

          if (!that.$lis.not('.hidden, .no-results').length) {
            if (!!$no_results.parent().length) {
              $no_results.remove();
            }
            $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"')).show();
            that.$menuInner.append($no_results);
          } else if (!!$no_results.parent().length) {
            $no_results.remove();
          }

        } else {
          that.$lis.not('.is-hidden').removeClass('hidden');
          if (!!$no_results.parent().length) {
            $no_results.remove();
          }
        }

        that.$lis.filter('.active').removeClass('active');
        that.$lis.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a').focus();
        $(this).focus();
      });
    },

    _searchStyle: function () {
      var style = 'icontains';
      switch (this.options.liveSearchStyle) {
        case 'begins':
        case 'startsWith':
          style = 'ibegins';
          break;
        case 'contains':
        default:
          break; //no need to change the default
      }

      return style;
    },

    val: function (value) {
      if (typeof value !== 'undefined') {
        this.$element.val(value);
        this.render();

        return this.$element;
      } else {
        return this.$element.val();
      }
    },

    selectAll: function () {
      this.findLis();
      this.$element.find('option:enabled').not('[data-divider], [data-hidden]').prop('selected', true);
      this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').addClass('selected');
      this.render(false);
    },

    deselectAll: function () {
      this.findLis();
      this.$element.find('option:enabled').not('[data-divider], [data-hidden]').prop('selected', false);
      this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').removeClass('selected');
      this.render(false);
    },

    keydown: function (e) {
      var $this = $(this),
          $parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
          $items,
          that = $parent.data('this'),
          index,
          next,
          first,
          last,
          prev,
          nextPrev,
          prevIndex,
          isActive,
          selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
          keyCodeMap = {
            32: ' ',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
          };

      if (that.options.liveSearch) $parent = $this.parent().parent();

      if (that.options.container) $parent = that.$menu;

      $items = $('[role=menu] li a', $parent);

      isActive = that.$menu.parent().hasClass('open');

      if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90)) {
        if (!that.options.container) {
          that.setSize();
          that.$menu.parent().addClass('open');
          isActive = true;
        } else {
          that.$newElement.trigger('click');
        }
        that.$searchbox.focus();
      }

      if (that.options.liveSearch) {
        if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find('.active').length === 0) {
          e.preventDefault();
          that.$menu.parent().removeClass('open');
          if (that.options.container) that.$newElement.removeClass('open');
          that.$button.focus();
        }
        // $items contains li elements when liveSearch is enabled
        $items = $('[role=menu] li:not(.disabled, .hidden, .dropdown-header, .divider)', $parent);
        if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
          if ($items.filter('.active').length === 0) {
            $items = that.$newElement.find('li');
            if (that.options.liveSearchNormalize) {
              $items = $items.filter(':a' + that._searchStyle() + '(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
            } else {
              $items = $items.filter(':' + that._searchStyle() + '(' + keyCodeMap[e.keyCode] + ')');
            }
          }
        }
      }

      if (!$items.length) return;

      if (/(38|40)/.test(e.keyCode.toString(10))) {
        index = $items.index($items.filter(':focus'));
        first = $items.parent(selector).first().data('originalIndex');
        last = $items.parent(selector).last().data('originalIndex');
        next = $items.eq(index).parent().nextAll(selector).eq(0).data('originalIndex');
        prev = $items.eq(index).parent().prevAll(selector).eq(0).data('originalIndex');
        nextPrev = $items.eq(next).parent().prevAll(selector).eq(0).data('originalIndex');

        if (that.options.liveSearch) {
          $items.each(function (i) {
            if (!$(this).hasClass('disabled')) {
              $(this).data('index', i);
            }
          });
          index = $items.index($items.filter('.active'));
          first = $items.first().data('index');
          last = $items.last().data('index');
          next = $items.eq(index).nextAll().eq(0).data('index');
          prev = $items.eq(index).prevAll().eq(0).data('index');
          nextPrev = $items.eq(next).prevAll().eq(0).data('index');
        }

        prevIndex = $this.data('prevIndex');

        if (e.keyCode == 38) {
          if (that.options.liveSearch) index -= 1;
          if (index != nextPrev && index > prev) index = prev;
          if (index < first) index = first;
          if (index == prevIndex) index = last;
        } else if (e.keyCode == 40) {
          if (that.options.liveSearch) index += 1;
          if (index == -1) index = 0;
          if (index != nextPrev && index < next) index = next;
          if (index > last) index = last;
          if (index == prevIndex) index = first;
        }

        $this.data('prevIndex', index);

        if (!that.options.liveSearch) {
          $items.eq(index).focus();
        } else {
          e.preventDefault();
          if (!$this.hasClass('dropdown-toggle')) {
            $items.removeClass('active').eq(index).addClass('active').children('a').focus();
            $this.focus();
          }
        }

      } else if (!$this.is('input')) {
        var keyIndex = [],
            count,
            prevKey;

        $items.each(function () {
          if (!$(this).parent().hasClass('disabled')) {
            if ($.trim($(this).text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
              keyIndex.push($(this).parent().index());
            }
          }
        });

        count = $(document).data('keycount');
        count++;
        $(document).data('keycount', count);

        prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

        if (prevKey != keyCodeMap[e.keyCode]) {
          count = 1;
          $(document).data('keycount', count);
        } else if (count >= keyIndex.length) {
          $(document).data('keycount', 0);
          if (count > keyIndex.length) count = 1;
        }

        $items.eq(keyIndex[count - 1]).focus();
      }

      // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
      if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
        if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
        if (!that.options.liveSearch) {
          var elem = $(':focus');
          elem.click();
          // Bring back focus for multiselects
          elem.focus();
          // Prevent screen from scrolling if the user hit the spacebar
          e.preventDefault();
          // Fixes spacebar selection of dropdown items in FF & IE
          $(document).data('spaceSelect', true);
        } else if (!/(32)/.test(e.keyCode.toString(10))) {
          that.$menu.find('.active a').click();
          $this.focus();
        }
        $(document).data('keycount', 0);
      }

      if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
        that.$menu.parent().removeClass('open');
        if (that.options.container) that.$newElement.removeClass('open');
        that.$button.focus();
      }
    },

    mobile: function () {
      this.$element.addClass('mobile-device').appendTo(this.$newElement);
      if (this.options.container) this.$menu.hide();
    },

    refresh: function () {
      this.$lis = null;
      this.reloadLi();
      this.render();
      this.checkDisabled();
      this.liHeight(true);
      this.setStyle();
      this.setWidth();
      if (this.$lis) this.$searchbox.trigger('propertychange');

      this.$element.trigger('refreshed.bs.select');
    },

    hide: function () {
      this.$newElement.hide();
    },

    show: function () {
      this.$newElement.show();
    },

    remove: function () {
      this.$newElement.remove();
      this.$element.remove();
    }
  };

  // SELECTPICKER PLUGIN DEFINITION
  // ==============================
  function Plugin(option, event) {
    // get the args of the outer function..
    var args = arguments;
    // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
    // to get lost/corrupted in android 2.3 and IE9 #715 #775
    var _option = option,
        _event = event;
    [].shift.apply(args);

    var value;
    var chain = this.each(function () {
      var $this = $(this);
      if ($this.is('select')) {
        var data = $this.data('selectpicker'),
            options = typeof _option == 'object' && _option;

        if (!data) {
          var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
          $this.data('selectpicker', (data = new Selectpicker(this, config, _event)));
        } else if (options) {
          for (var i in options) {
            if (options.hasOwnProperty(i)) {
              data.options[i] = options[i];
            }
          }
        }

        if (typeof _option == 'string') {
          if (data[_option] instanceof Function) {
            value = data[_option].apply(data, args);
          } else {
            value = data.options[_option];
          }
        }
      }
    });

    if (typeof value !== 'undefined') {
      //noinspection JSUnusedAssignment
      return value;
    } else {
      return chain;
    }
  }

  var old = $.fn.selectpicker;
  $.fn.selectpicker = Plugin;
  $.fn.selectpicker.Constructor = Selectpicker;

  // SELECTPICKER NO CONFLICT
  // ========================
  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old;
    return this;
  };

  $(document)
      .data('keycount', 0)
      .on('keydown', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function (e) {
        e.stopPropagation();
      });

  // SELECTPICKER DATA-API
  // =====================
  $(window).on('load.bs.select.data-api', function () {
    $('.selectpicker').each(function () {
      var $selectpicker = $(this);
      Plugin.call($selectpicker, $selectpicker.data());
    })
  });
})(jQuery);

/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */


 +function ($) {
  'use strict';

  // TOGGLE PUBLIC CLASS DEFINITION
  // ==============================

  var Toggle = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, this.defaults(), options)
    this.render()
  }

  Toggle.VERSION  = '2.2.0'

  Toggle.DEFAULTS = {
    on: 'On',
    off: 'Off',
    onstyle: 'primary',
    offstyle: 'default',
    size: 'normal',
    style: '',
    width: null,
    height: null
  }

  Toggle.prototype.defaults = function() {
    return {
      on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
      off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
      onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
      offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
      size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
      style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
      width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
      height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
    }
  }

  Toggle.prototype.render = function () {
    this._onstyle = 'btn-' + this.options.onstyle
    this._offstyle = 'btn-' + this.options.offstyle
    var size = this.options.size === 'large' ? 'btn-lg'
      : this.options.size === 'small' ? 'btn-sm'
      : this.options.size === 'mini' ? 'btn-xs'
      : ''
    var $toggleOn = $('<label class="btn">').html(this.options.on)
      .addClass(this._onstyle + ' ' + size)
    var $toggleOff = $('<label class="btn">').html(this.options.off)
      .addClass(this._offstyle + ' ' + size + ' active')
    var $toggleHandle = $('<span class="toggle-handle btn btn-default">')
      .addClass(size)
    var $toggleGroup = $('<div class="toggle-group">')
      .append($toggleOn, $toggleOff, $toggleHandle)
    var $toggle = $('<div class="toggle btn" data-toggle="toggle">')
      .addClass( this.$element.prop('checked') ? this._onstyle : this._offstyle+' off' )
      .addClass(size).addClass(this.options.style)

    this.$element.wrap($toggle)
    $.extend(this, {
      $toggle: this.$element.parent(),
      $toggleOn: $toggleOn,
      $toggleOff: $toggleOff,
      $toggleGroup: $toggleGroup
    })
    this.$toggle.append($toggleGroup)

    var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2)
    var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())
    $toggleOn.addClass('toggle-on')
    $toggleOff.addClass('toggle-off')
    this.$toggle.css({ width: width, height: height })
    if (this.options.height) {
      $toggleOn.css('line-height', $toggleOn.height() + 'px')
      $toggleOff.css('line-height', $toggleOff.height() + 'px')
    }
    this.update(true)
    this.trigger(true)
  }

  Toggle.prototype.toggle = function () {
    if (this.$element.prop('checked')) this.off()
    else this.on()
  }

  Toggle.prototype.on = function (silent) {
    if (this.$element.prop('disabled')) return false
    this.$toggle.removeClass(this._offstyle + ' off').addClass(this._onstyle)
    this.$element.prop('checked', true)
    if (!silent) this.trigger()
  }

  Toggle.prototype.off = function (silent) {
    if (this.$element.prop('disabled')) return false
    this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + ' off')
    this.$element.prop('checked', false)
    if (!silent) this.trigger()
  }

  Toggle.prototype.enable = function () {
    this.$toggle.removeAttr('disabled')
    this.$element.prop('disabled', false)
  }

  Toggle.prototype.disable = function () {
    this.$toggle.attr('disabled', 'disabled')
    this.$element.prop('disabled', true)
  }

  Toggle.prototype.update = function (silent) {
    if (this.$element.prop('disabled')) this.disable()
    else this.enable()
    if (this.$element.prop('checked')) this.on(silent)
    else this.off(silent)
  }

  Toggle.prototype.trigger = function (silent) {
    this.$element.off('change.bs.toggle')
    if (!silent) this.$element.change()
    this.$element.on('change.bs.toggle', $.proxy(function() {
      this.update()
    }, this))
  }

  Toggle.prototype.destroy = function() {
    this.$element.off('change.bs.toggle')
    this.$toggleGroup.remove()
    this.$element.removeData('bs.toggle')
    this.$element.unwrap()
  }

  // TOGGLE PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.toggle')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.toggle', (data = new Toggle(this, options)))
      if (typeof option == 'string' && data[option]) data[option]()
    })
  }

  var old = $.fn.bootstrapToggle

  $.fn.bootstrapToggle             = Plugin
  $.fn.bootstrapToggle.Constructor = Toggle

  // TOGGLE NO CONFLICT
  // ==================

  $.fn.toggle.noConflict = function () {
    $.fn.bootstrapToggle = old
    return this
  }

  // TOGGLE DATA-API
  // ===============

  $(function() {
    $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
  })

  $(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    var $checkbox = $(this).find('input[type=checkbox]')
    $checkbox.bootstrapToggle('toggle')
    e.preventDefault()
  })

}(jQuery);

