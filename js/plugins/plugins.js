/*!
 * jquery.counterup.js 2.0.5
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Jun 21, 2016
 */
!function(t){"use strict";t.fn.counterUp=function(a){var e,n=t.extend({time:400,delay:10,formatter:!1,callback:function(){}},a);return this.each(function(){var a=t(this),u={time:t(this).data("counterup-time")||n.time,delay:t(this).data("counterup-delay")||n.delay},r=function(){var t=[],r=u.time/u.delay,o=a.text(),c=/[0-9]+,[0-9]+/.test(o);o=o.replace(/,/g,"");var i=(o.split(".")[1]||[]).length,l=/[0-9]+:[0-9]+:[0-9]+/.test(o);if(l){var s=o.split(":"),d=1;for(e=0;s.length>0;)e+=d*parseInt(s.pop(),10),d*=60}for(var f=r;f>=1;f--){var p=parseFloat(o/r*f).toFixed(i);if(l){p=parseInt(e/r*f);var m=parseInt(p/3600)%24,h=parseInt(p/60)%60,v=parseInt(p%60,10);p=(10>m?"0"+m:m)+":"+(10>h?"0"+h:h)+":"+(10>v?"0"+v:v)}if(c)for(;/(\d+)(\d{3})/.test(p.toString());)p=p.toString().replace(/(\d+)(\d{3})/,"$1,$2");n.formatter&&(p=n.formatter.call(this,p)),t.unshift(p)}a.data("counterup-nums",t),a.text("0");var y=function(){return a.data("counterup-nums")?(a.html(a.data("counterup-nums").shift()),void(a.data("counterup-nums").length?setTimeout(a.data("counterup-func"),u.delay):(a.data("counterup-nums",null),a.data("counterup-func",null),n.callback.call(this)))):void n.callback.call(this)};a.data("counterup-func",y),setTimeout(a.data("counterup-func"),u.delay)};a.waypoint(function(t){r(),this.destroy()},{offset:"100%"})})}}(jQuery);








/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) { 
    if (typeof define === 'function' && define.amd) { 
     // AMD. Register as an anonymous module. 
     define(['jquery'], factory); 
     } else if (typeof exports === 'object') { 
     // Node/CommonJS 
     factory(require('jquery')); 
     } else { 
     // Browser globals 
     factory(window.jQuery || window.Zepto); 
     } 
     }(function($) { 
    
    /*>>core*/
    /**
     * 
     * Magnific Popup Core JS file
     * 
     */
    
    
    /**
     * Private static constants
     */
    var CLOSE_EVENT = 'Close',
        BEFORE_CLOSE_EVENT = 'BeforeClose',
        AFTER_CLOSE_EVENT = 'AfterClose',
        BEFORE_APPEND_EVENT = 'BeforeAppend',
        MARKUP_PARSE_EVENT = 'MarkupParse',
        OPEN_EVENT = 'Open',
        CHANGE_EVENT = 'Change',
        NS = 'mfp',
        EVENT_NS = '.' + NS,
        READY_CLASS = 'mfp-ready',
        REMOVING_CLASS = 'mfp-removing',
        PREVENT_CLOSE_CLASS = 'mfp-prevent-close';
    
    
    /**
     * Private vars 
     */
    /*jshint -W079 */
    var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
        MagnificPopup = function(){},
        _isJQ = !!(window.jQuery),
        _prevStatus,
        _window = $(window),
        _document,
        _prevContentType,
        _wrapClasses,
        _currPopupType;
    
    
    /**
     * Private functions
     */
    var _mfpOn = function(name, f) {
            mfp.ev.on(NS + name + EVENT_NS, f);
        },
        _getEl = function(className, appendTo, html, raw) {
            var el = document.createElement('div');
            el.className = 'mfp-'+className;
            if(html) {
                el.innerHTML = html;
            }
            if(!raw) {
                el = $(el);
                if(appendTo) {
                    el.appendTo(appendTo);
                }
            } else if(appendTo) {
                appendTo.appendChild(el);
            }
            return el;
        },
        _mfpTrigger = function(e, data) {
            mfp.ev.triggerHandler(NS + e, data);
    
            if(mfp.st.callbacks) {
                // converts "mfpEventName" to "eventName" callback and triggers it if it's present
                e = e.charAt(0).toLowerCase() + e.slice(1);
                if(mfp.st.callbacks[e]) {
                    mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
                }
            }
        },
        _getCloseBtn = function(type) {
            if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
                mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
                _currPopupType = type;
            }
            return mfp.currTemplate.closeBtn;
        },
        // Initialize Magnific Popup only when called at least once
        _checkInstance = function() {
            if(!$.magnificPopup.instance) {
                /*jshint -W020 */
                mfp = new MagnificPopup();
                mfp.init();
                $.magnificPopup.instance = mfp;
            }
        },
        // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
        supportsTransitions = function() {
            var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
                v = ['ms','O','Moz','Webkit']; // 'v' for vendor
    
            if( s['transition'] !== undefined ) {
                return true; 
            }
                
            while( v.length ) {
                if( v.pop() + 'Transition' in s ) {
                    return true;
                }
            }
                    
            return false;
        };
    
    
    
    /**
     * Public functions
     */
    MagnificPopup.prototype = {
    
        constructor: MagnificPopup,
    
        /**
         * Initializes Magnific Popup plugin. 
         * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
         */
        init: function() {
            var appVersion = navigator.appVersion;
            mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
            mfp.isAndroid = (/android/gi).test(appVersion);
            mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
            mfp.supportsTransition = supportsTransitions();
    
            // We disable fixed positioned lightbox on devices that don't handle it nicely.
            // If you know a better way of detecting this - let me know.
            mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
            _document = $(document);
    
            mfp.popupsCache = {};
        },
    
        /**
         * Opens popup
         * @param  data [description]
         */
        open: function(data) {
    
            var i;
    
            if(data.isObj === false) { 
                // convert jQuery collection to array to avoid conflicts later
                mfp.items = data.items.toArray();
    
                mfp.index = 0;
                var items = data.items,
                    item;
                for(i = 0; i < items.length; i++) {
                    item = items[i];
                    if(item.parsed) {
                        item = item.el[0];
                    }
                    if(item === data.el[0]) {
                        mfp.index = i;
                        break;
                    }
                }
            } else {
                mfp.items = $.isArray(data.items) ? data.items : [data.items];
                mfp.index = data.index || 0;
            }
    
            // if popup is already opened - we just update the content
            if(mfp.isOpen) {
                mfp.updateItemHTML();
                return;
            }
            
            mfp.types = []; 
            _wrapClasses = '';
            if(data.mainEl && data.mainEl.length) {
                mfp.ev = data.mainEl.eq(0);
            } else {
                mfp.ev = _document;
            }
    
            if(data.key) {
                if(!mfp.popupsCache[data.key]) {
                    mfp.popupsCache[data.key] = {};
                }
                mfp.currTemplate = mfp.popupsCache[data.key];
            } else {
                mfp.currTemplate = {};
            }
    
    
    
            mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
            mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;
    
            if(mfp.st.modal) {
                mfp.st.closeOnContentClick = false;
                mfp.st.closeOnBgClick = false;
                mfp.st.showCloseBtn = false;
                mfp.st.enableEscapeKey = false;
            }
            
    
            // Building markup
            // main containers are created only once
            if(!mfp.bgOverlay) {
    
                // Dark overlay
                mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
                    mfp.close();
                });
    
                mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
                    if(mfp._checkIfClose(e.target)) {
                        mfp.close();
                    }
                });
    
                mfp.container = _getEl('container', mfp.wrap);
            }
    
            mfp.contentContainer = _getEl('content');
            if(mfp.st.preloader) {
                mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
            }
    
    
            // Initializing modules
            var modules = $.magnificPopup.modules;
            for(i = 0; i < modules.length; i++) {
                var n = modules[i];
                n = n.charAt(0).toUpperCase() + n.slice(1);
                mfp['init'+n].call(mfp);
            }
            _mfpTrigger('BeforeOpen');
    
    
            if(mfp.st.showCloseBtn) {
                // Close button
                if(!mfp.st.closeBtnInside) {
                    mfp.wrap.append( _getCloseBtn() );
                } else {
                    _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
                        values.close_replaceWith = _getCloseBtn(item.type);
                    });
                    _wrapClasses += ' mfp-close-btn-in';
                }
            }
    
            if(mfp.st.alignTop) {
                _wrapClasses += ' mfp-align-top';
            }
    
        
    
            if(mfp.fixedContentPos) {
                mfp.wrap.css({
                    overflow: mfp.st.overflowY,
                    overflowX: 'hidden',
                    overflowY: mfp.st.overflowY
                });
            } else {
                mfp.wrap.css({ 
                    top: _window.scrollTop(),
                    position: 'absolute'
                });
            }
            if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
                mfp.bgOverlay.css({
                    height: _document.height(),
                    position: 'absolute'
                });
            }
    
            
    
            if(mfp.st.enableEscapeKey) {
                // Close on ESC key
                _document.on('keyup' + EVENT_NS, function(e) {
                    if(e.keyCode === 27) {
                        mfp.close();
                    }
                });
            }
    
            _window.on('resize' + EVENT_NS, function() {
                mfp.updateSize();
            });
    
    
            if(!mfp.st.closeOnContentClick) {
                _wrapClasses += ' mfp-auto-cursor';
            }
            
            if(_wrapClasses)
                mfp.wrap.addClass(_wrapClasses);
    
    
            // this triggers recalculation of layout, so we get it once to not to trigger twice
            var windowHeight = mfp.wH = _window.height();
    
            
            var windowStyles = {};
    
            if( mfp.fixedContentPos ) {
                if(mfp._hasScrollBar(windowHeight)){
                    var s = mfp._getScrollbarSize();
                    if(s) {
                        windowStyles.marginRight = s;
                    }
                }
            }
    
            if(mfp.fixedContentPos) {
                if(!mfp.isIE7) {
                    windowStyles.overflow = 'hidden';
                } else {
                    // ie7 double-scroll bug
                    $('body, html').css('overflow', 'hidden');
                }
            }
    
            
            
            var classesToadd = mfp.st.mainClass;
            if(mfp.isIE7) {
                classesToadd += ' mfp-ie7';
            }
            if(classesToadd) {
                mfp._addClassToMFP( classesToadd );
            }
    
            // add content
            mfp.updateItemHTML();
    
            _mfpTrigger('BuildControls');
    
            // remove scrollbar, add margin e.t.c
            $('html').css(windowStyles);
            
            // add everything to DOM
            mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );
    
            // Save last focused element
            mfp._lastFocusedEl = document.activeElement;
            
            // Wait for next cycle to allow CSS transition
            setTimeout(function() {
                
                if(mfp.content) {
                    mfp._addClassToMFP(READY_CLASS);
                    mfp._setFocus();
                } else {
                    // if content is not defined (not loaded e.t.c) we add class only for BG
                    mfp.bgOverlay.addClass(READY_CLASS);
                }
                
                // Trap the focus in popup
                _document.on('focusin' + EVENT_NS, mfp._onFocusIn);
    
            }, 16);
    
            mfp.isOpen = true;
            mfp.updateSize(windowHeight);
            _mfpTrigger(OPEN_EVENT);
    
            return data;
        },
    
        /**
         * Closes the popup
         */
        close: function() {
            if(!mfp.isOpen) return;
            _mfpTrigger(BEFORE_CLOSE_EVENT);
    
            mfp.isOpen = false;
            // for CSS3 animation
            if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
                mfp._addClassToMFP(REMOVING_CLASS);
                setTimeout(function() {
                    mfp._close();
                }, mfp.st.removalDelay);
            } else {
                mfp._close();
            }
        },
    
        /**
         * Helper for close() function
         */
        _close: function() {
            _mfpTrigger(CLOSE_EVENT);
    
            var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';
    
            mfp.bgOverlay.detach();
            mfp.wrap.detach();
            mfp.container.empty();
    
            if(mfp.st.mainClass) {
                classesToRemove += mfp.st.mainClass + ' ';
            }
    
            mfp._removeClassFromMFP(classesToRemove);
    
            if(mfp.fixedContentPos) {
                var windowStyles = {marginRight: ''};
                if(mfp.isIE7) {
                    $('body, html').css('overflow', '');
                } else {
                    windowStyles.overflow = '';
                }
                $('html').css(windowStyles);
            }
            
            _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
            mfp.ev.off(EVENT_NS);
    
            // clean up DOM elements that aren't removed
            mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
            mfp.bgOverlay.attr('class', 'mfp-bg');
            mfp.container.attr('class', 'mfp-container');
    
            // remove close button from target element
            if(mfp.st.showCloseBtn &&
            (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
                if(mfp.currTemplate.closeBtn)
                    mfp.currTemplate.closeBtn.detach();
            }
    
    
            if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
                $(mfp._lastFocusedEl).focus(); // put tab focus back
            }
            mfp.currItem = null;	
            mfp.content = null;
            mfp.currTemplate = null;
            mfp.prevHeight = 0;
    
            _mfpTrigger(AFTER_CLOSE_EVENT);
        },
        
        updateSize: function(winHeight) {
    
            if(mfp.isIOS) {
                // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
                var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                var height = window.innerHeight * zoomLevel;
                mfp.wrap.css('height', height);
                mfp.wH = height;
            } else {
                mfp.wH = winHeight || _window.height();
            }
            // Fixes #84: popup incorrectly positioned with position:relative on body
            if(!mfp.fixedContentPos) {
                mfp.wrap.css('height', mfp.wH);
            }
    
            _mfpTrigger('Resize');
    
        },
    
        /**
         * Set content of popup based on current index
         */
        updateItemHTML: function() {
            var item = mfp.items[mfp.index];
    
            // Detach and perform modifications
            mfp.contentContainer.detach();
    
            if(mfp.content)
                mfp.content.detach();
    
            if(!item.parsed) {
                item = mfp.parseEl( mfp.index );
            }
    
            var type = item.type;
    
            _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
            // BeforeChange event works like so:
            // _mfpOn('BeforeChange', function(e, prevType, newType) { });
    
            mfp.currItem = item;
    
            if(!mfp.currTemplate[type]) {
                var markup = mfp.st[type] ? mfp.st[type].markup : false;
    
                // allows to modify markup
                _mfpTrigger('FirstMarkupParse', markup);
    
                if(markup) {
                    mfp.currTemplate[type] = $(markup);
                } else {
                    // if there is no markup found we just define that template is parsed
                    mfp.currTemplate[type] = true;
                }
            }
    
            if(_prevContentType && _prevContentType !== item.type) {
                mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
            }
    
            var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
            mfp.appendContent(newContent, type);
    
            item.preloaded = true;
    
            _mfpTrigger(CHANGE_EVENT, item);
            _prevContentType = item.type;
    
            // Append container back after its content changed
            mfp.container.prepend(mfp.contentContainer);
    
            _mfpTrigger('AfterChange');
        },
    
    
        /**
         * Set HTML content of popup
         */
        appendContent: function(newContent, type) {
            mfp.content = newContent;
    
            if(newContent) {
                if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
                    mfp.currTemplate[type] === true) {
                    // if there is no markup, we just append close button element inside
                    if(!mfp.content.find('.mfp-close').length) {
                        mfp.content.append(_getCloseBtn());
                    }
                } else {
                    mfp.content = newContent;
                }
            } else {
                mfp.content = '';
            }
    
            _mfpTrigger(BEFORE_APPEND_EVENT);
            mfp.container.addClass('mfp-'+type+'-holder');
    
            mfp.contentContainer.append(mfp.content);
        },
    
    
        /**
         * Creates Magnific Popup data object based on given data
         * @param  {int} index Index of item to parse
         */
        parseEl: function(index) {
            var item = mfp.items[index],
                type;
    
            if(item.tagName) {
                item = { el: $(item) };
            } else {
                type = item.type;
                item = { data: item, src: item.src };
            }
    
            if(item.el) {
                var types = mfp.types;
    
                // check for 'mfp-TYPE' class
                for(var i = 0; i < types.length; i++) {
                    if( item.el.hasClass('mfp-'+types[i]) ) {
                        type = types[i];
                        break;
                    }
                }
    
                item.src = item.el.attr('data-mfp-src');
                if(!item.src) {
                    item.src = item.el.attr('href');
                }
            }
    
            item.type = type || mfp.st.type || 'inline';
            item.index = index;
            item.parsed = true;
            mfp.items[index] = item;
            _mfpTrigger('ElementParse', item);
    
            return mfp.items[index];
        },
    
    
        /**
         * Initializes single popup or a group of popups
         */
        addGroup: function(el, options) {
            var eHandler = function(e) {
                e.mfpEl = this;
                mfp._openClick(e, el, options);
            };
    
            if(!options) {
                options = {};
            }
    
            var eName = 'click.magnificPopup';
            options.mainEl = el;
    
            if(options.items) {
                options.isObj = true;
                el.off(eName).on(eName, eHandler);
            } else {
                options.isObj = false;
                if(options.delegate) {
                    el.off(eName).on(eName, options.delegate , eHandler);
                } else {
                    options.items = el;
                    el.off(eName).on(eName, eHandler);
                }
            }
        },
        _openClick: function(e, el, options) {
            var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;
    
    
            if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
                return;
            }
    
            var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;
    
            if(disableOn) {
                if($.isFunction(disableOn)) {
                    if( !disableOn.call(mfp) ) {
                        return true;
                    }
                } else { // else it's number
                    if( _window.width() < disableOn ) {
                        return true;
                    }
                }
            }
    
            if(e.type) {
                e.preventDefault();
    
                // This will prevent popup from closing if element is inside and popup is already opened
                if(mfp.isOpen) {
                    e.stopPropagation();
                }
            }
    
            options.el = $(e.mfpEl);
            if(options.delegate) {
                options.items = el.find(options.delegate);
            }
            mfp.open(options);
        },
    
    
        /**
         * Updates text on preloader
         */
        updateStatus: function(status, text) {
    
            if(mfp.preloader) {
                if(_prevStatus !== status) {
                    mfp.container.removeClass('mfp-s-'+_prevStatus);
                }
    
                if(!text && status === 'loading') {
                    text = mfp.st.tLoading;
                }
    
                var data = {
                    status: status,
                    text: text
                };
                // allows to modify status
                _mfpTrigger('UpdateStatus', data);
    
                status = data.status;
                text = data.text;
    
                mfp.preloader.html(text);
    
                mfp.preloader.find('a').on('click', function(e) {
                    e.stopImmediatePropagation();
                });
    
                mfp.container.addClass('mfp-s-'+status);
                _prevStatus = status;
            }
        },
    
    
        /*
            "Private" helpers that aren't private at all
         */
        // Check to close popup or not
        // "target" is an element that was clicked
        _checkIfClose: function(target) {
    
            if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
                return;
            }
    
            var closeOnContent = mfp.st.closeOnContentClick;
            var closeOnBg = mfp.st.closeOnBgClick;
    
            if(closeOnContent && closeOnBg) {
                return true;
            } else {
    
                // We close the popup if click is on close button or on preloader. Or if there is no content.
                if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
                    return true;
                }
    
                // if click is outside the content
                if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
                    if(closeOnBg) {
                        // last check, if the clicked element is in DOM, (in case it's removed onclick)
                        if( $.contains(document, target) ) {
                            return true;
                        }
                    }
                } else if(closeOnContent) {
                    return true;
                }
    
            }
            return false;
        },
        _addClassToMFP: function(cName) {
            mfp.bgOverlay.addClass(cName);
            mfp.wrap.addClass(cName);
        },
        _removeClassFromMFP: function(cName) {
            this.bgOverlay.removeClass(cName);
            mfp.wrap.removeClass(cName);
        },
        _hasScrollBar: function(winHeight) {
            return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
        },
        _setFocus: function() {
            (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
        },
        _onFocusIn: function(e) {
            if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
                mfp._setFocus();
                return false;
            }
        },
        _parseMarkup: function(template, values, item) {
            var arr;
            if(item.data) {
                values = $.extend(item.data, values);
            }
            _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );
    
            $.each(values, function(key, value) {
                if(value === undefined || value === false) {
                    return true;
                }
                arr = key.split('_');
                if(arr.length > 1) {
                    var el = template.find(EVENT_NS + '-'+arr[0]);
    
                    if(el.length > 0) {
                        var attr = arr[1];
                        if(attr === 'replaceWith') {
                            if(el[0] !== value[0]) {
                                el.replaceWith(value);
                            }
                        } else if(attr === 'img') {
                            if(el.is('img')) {
                                el.attr('src', value);
                            } else {
                                el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
                            }
                        } else {
                            el.attr(arr[1], value);
                        }
                    }
    
                } else {
                    template.find(EVENT_NS + '-'+key).html(value);
                }
            });
        },
    
        _getScrollbarSize: function() {
            // thx David
            if(mfp.scrollbarSize === undefined) {
                var scrollDiv = document.createElement("div");
                scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
                document.body.appendChild(scrollDiv);
                mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
            return mfp.scrollbarSize;
        }
    
    }; /* MagnificPopup core prototype end */
    
    
    
    
    /**
     * Public static functions
     */
    $.magnificPopup = {
        instance: null,
        proto: MagnificPopup.prototype,
        modules: [],
    
        open: function(options, index) {
            _checkInstance();
    
            if(!options) {
                options = {};
            } else {
                options = $.extend(true, {}, options);
            }
    
            options.isObj = true;
            options.index = index || 0;
            return this.instance.open(options);
        },
    
        close: function() {
            return $.magnificPopup.instance && $.magnificPopup.instance.close();
        },
    
        registerModule: function(name, module) {
            if(module.options) {
                $.magnificPopup.defaults[name] = module.options;
            }
            $.extend(this.proto, module.proto);
            this.modules.push(name);
        },
    
        defaults: {
    
            // Info about options is in docs:
            // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
    
            disableOn: 0,
    
            key: null,
    
            midClick: false,
    
            mainClass: '',
    
            preloader: true,
    
            focus: '', // CSS selector of input to focus after popup is opened
    
            closeOnContentClick: false,
    
            closeOnBgClick: true,
    
            closeBtnInside: true,
    
            showCloseBtn: true,
    
            enableEscapeKey: true,
    
            modal: false,
    
            alignTop: false,
    
            removalDelay: 0,
    
            prependTo: null,
    
            fixedContentPos: 'auto',
    
            fixedBgPos: 'auto',
    
            overflowY: 'auto',
    
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
    
            tClose: 'Close (Esc)',
    
            tLoading: 'Loading...',
    
            autoFocusLast: true
    
        }
    };
    
    
    
    $.fn.magnificPopup = function(options) {
        _checkInstance();
    
        var jqEl = $(this);
    
        // We call some API method of first param is a string
        if (typeof options === "string" ) {
    
            if(options === 'open') {
                var items,
                    itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
                    index = parseInt(arguments[1], 10) || 0;
    
                if(itemOpts.items) {
                    items = itemOpts.items[index];
                } else {
                    items = jqEl;
                    if(itemOpts.delegate) {
                        items = items.find(itemOpts.delegate);
                    }
                    items = items.eq( index );
                }
                mfp._openClick({mfpEl:items}, jqEl, itemOpts);
            } else {
                if(mfp.isOpen)
                    mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
            }
    
        } else {
            // clone options obj
            options = $.extend(true, {}, options);
    
            /*
             * As Zepto doesn't support .data() method for objects
             * and it works only in normal browsers
             * we assign "options" object directly to the DOM element. FTW!
             */
            if(_isJQ) {
                jqEl.data('magnificPopup', options);
            } else {
                jqEl[0].magnificPopup = options;
            }
    
            mfp.addGroup(jqEl, options);
    
        }
        return jqEl;
    };
    
    /*>>core*/
    
    /*>>inline*/
    
    var INLINE_NS = 'inline',
        _hiddenClass,
        _inlinePlaceholder,
        _lastInlineElement,
        _putInlineElementsBack = function() {
            if(_lastInlineElement) {
                _inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
                _lastInlineElement = null;
            }
        };
    
    $.magnificPopup.registerModule(INLINE_NS, {
        options: {
            hiddenClass: 'hide', // will be appended with `mfp-` prefix
            markup: '',
            tNotFound: 'Content not found'
        },
        proto: {
    
            initInline: function() {
                mfp.types.push(INLINE_NS);
    
                _mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
                    _putInlineElementsBack();
                });
            },
    
            getInline: function(item, template) {
    
                _putInlineElementsBack();
    
                if(item.src) {
                    var inlineSt = mfp.st.inline,
                        el = $(item.src);
    
                    if(el.length) {
    
                        // If target element has parent - we replace it with placeholder and put it back after popup is closed
                        var parent = el[0].parentNode;
                        if(parent && parent.tagName) {
                            if(!_inlinePlaceholder) {
                                _hiddenClass = inlineSt.hiddenClass;
                                _inlinePlaceholder = _getEl(_hiddenClass);
                                _hiddenClass = 'mfp-'+_hiddenClass;
                            }
                            // replace target inline element with placeholder
                            _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                        }
    
                        mfp.updateStatus('ready');
                    } else {
                        mfp.updateStatus('error', inlineSt.tNotFound);
                        el = $('<div>');
                    }
    
                    item.inlineElement = el;
                    return el;
                }
    
                mfp.updateStatus('ready');
                mfp._parseMarkup(template, {}, item);
                return template;
            }
        }
    });
    
    /*>>inline*/
    
    /*>>ajax*/
    var AJAX_NS = 'ajax',
        _ajaxCur,
        _removeAjaxCursor = function() {
            if(_ajaxCur) {
                $(document.body).removeClass(_ajaxCur);
            }
        },
        _destroyAjaxRequest = function() {
            _removeAjaxCursor();
            if(mfp.req) {
                mfp.req.abort();
            }
        };
    
    $.magnificPopup.registerModule(AJAX_NS, {
    
        options: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
    
        proto: {
            initAjax: function() {
                mfp.types.push(AJAX_NS);
                _ajaxCur = mfp.st.ajax.cursor;
    
                _mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
                _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
            },
            getAjax: function(item) {
    
                if(_ajaxCur) {
                    $(document.body).addClass(_ajaxCur);
                }
    
                mfp.updateStatus('loading');
    
                var opts = $.extend({
                    url: item.src,
                    success: function(data, textStatus, jqXHR) {
                        var temp = {
                            data:data,
                            xhr:jqXHR
                        };
    
                        _mfpTrigger('ParseAjax', temp);
    
                        mfp.appendContent( $(temp.data), AJAX_NS );
    
                        item.finished = true;
    
                        _removeAjaxCursor();
    
                        mfp._setFocus();
    
                        setTimeout(function() {
                            mfp.wrap.addClass(READY_CLASS);
                        }, 16);
    
                        mfp.updateStatus('ready');
    
                        _mfpTrigger('AjaxContentAdded');
                    },
                    error: function() {
                        _removeAjaxCursor();
                        item.finished = item.loadError = true;
                        mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
                    }
                }, mfp.st.ajax.settings);
    
                mfp.req = $.ajax(opts);
    
                return '';
            }
        }
    });
    
    /*>>ajax*/
    
    /*>>image*/
    var _imgInterval,
        _getTitle = function(item) {
            if(item.data && item.data.title !== undefined)
                return item.data.title;
    
            var src = mfp.st.image.titleSrc;
    
            if(src) {
                if($.isFunction(src)) {
                    return src.call(mfp, item);
                } else if(item.el) {
                    return item.el.attr(src) || '';
                }
            }
            return '';
        };
    
    $.magnificPopup.registerModule('image', {
    
        options: {
            markup: '<div class="mfp-figure">'+
                        '<div class="mfp-close"></div>'+
                        '<figure>'+
                            '<div class="mfp-img"></div>'+
                            '<figcaption>'+
                                '<div class="mfp-bottom-bar">'+
                                    '<div class="mfp-title"></div>'+
                                    '<div class="mfp-counter"></div>'+
                                '</div>'+
                            '</figcaption>'+
                        '</figure>'+
                    '</div>',
            cursor: 'mfp-zoom-out-cur',
            titleSrc: 'title',
            verticalFit: true,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
    
        proto: {
            initImage: function() {
                var imgSt = mfp.st.image,
                    ns = '.image';
    
                mfp.types.push('image');
    
                _mfpOn(OPEN_EVENT+ns, function() {
                    if(mfp.currItem.type === 'image' && imgSt.cursor) {
                        $(document.body).addClass(imgSt.cursor);
                    }
                });
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    if(imgSt.cursor) {
                        $(document.body).removeClass(imgSt.cursor);
                    }
                    _window.off('resize' + EVENT_NS);
                });
    
                _mfpOn('Resize'+ns, mfp.resizeImage);
                if(mfp.isLowIE) {
                    _mfpOn('AfterChange', mfp.resizeImage);
                }
            },
            resizeImage: function() {
                var item = mfp.currItem;
                if(!item || !item.img) return;
    
                if(mfp.st.image.verticalFit) {
                    var decr = 0;
                    // fix box-sizing in ie7/8
                    if(mfp.isLowIE) {
                        decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
                    }
                    item.img.css('max-height', mfp.wH-decr);
                }
            },
            _onImageHasSize: function(item) {
                if(item.img) {
    
                    item.hasSize = true;
    
                    if(_imgInterval) {
                        clearInterval(_imgInterval);
                    }
    
                    item.isCheckingImgSize = false;
    
                    _mfpTrigger('ImageHasSize', item);
    
                    if(item.imgHidden) {
                        if(mfp.content)
                            mfp.content.removeClass('mfp-loading');
    
                        item.imgHidden = false;
                    }
    
                }
            },
    
            /**
             * Function that loops until the image has size to display elements that rely on it asap
             */
            findImageSize: function(item) {
    
                var counter = 0,
                    img = item.img[0],
                    mfpSetInterval = function(delay) {
    
                        if(_imgInterval) {
                            clearInterval(_imgInterval);
                        }
                        // decelerating interval that checks for size of an image
                        _imgInterval = setInterval(function() {
                            if(img.naturalWidth > 0) {
                                mfp._onImageHasSize(item);
                                return;
                            }
    
                            if(counter > 200) {
                                clearInterval(_imgInterval);
                            }
    
                            counter++;
                            if(counter === 3) {
                                mfpSetInterval(10);
                            } else if(counter === 40) {
                                mfpSetInterval(50);
                            } else if(counter === 100) {
                                mfpSetInterval(500);
                            }
                        }, delay);
                    };
    
                mfpSetInterval(1);
            },
    
            getImage: function(item, template) {
    
                var guard = 0,
    
                    // image load complete handler
                    onLoadComplete = function() {
                        if(item) {
                            if (item.img[0].complete) {
                                item.img.off('.mfploader');
    
                                if(item === mfp.currItem){
                                    mfp._onImageHasSize(item);
    
                                    mfp.updateStatus('ready');
                                }
    
                                item.hasSize = true;
                                item.loaded = true;
    
                                _mfpTrigger('ImageLoadComplete');
    
                            }
                            else {
                                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                                guard++;
                                if(guard < 200) {
                                    setTimeout(onLoadComplete,100);
                                } else {
                                    onLoadError();
                                }
                            }
                        }
                    },
    
                    // image error handler
                    onLoadError = function() {
                        if(item) {
                            item.img.off('.mfploader');
                            if(item === mfp.currItem){
                                mfp._onImageHasSize(item);
                                mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
                            }
    
                            item.hasSize = true;
                            item.loaded = true;
                            item.loadError = true;
                        }
                    },
                    imgSt = mfp.st.image;
    
    
                var el = template.find('.mfp-img');
                if(el.length) {
                    var img = document.createElement('img');
                    img.className = 'mfp-img';
                    if(item.el && item.el.find('img').length) {
                        img.alt = item.el.find('img').attr('alt');
                    }
                    item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
                    img.src = item.src;
    
                    // without clone() "error" event is not firing when IMG is replaced by new IMG
                    // TODO: find a way to avoid such cloning
                    if(el.is('img')) {
                        item.img = item.img.clone();
                    }
    
                    img = item.img[0];
                    if(img.naturalWidth > 0) {
                        item.hasSize = true;
                    } else if(!img.width) {
                        item.hasSize = false;
                    }
                }
    
                mfp._parseMarkup(template, {
                    title: _getTitle(item),
                    img_replaceWith: item.img
                }, item);
    
                mfp.resizeImage();
    
                if(item.hasSize) {
                    if(_imgInterval) clearInterval(_imgInterval);
    
                    if(item.loadError) {
                        template.addClass('mfp-loading');
                        mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
                    } else {
                        template.removeClass('mfp-loading');
                        mfp.updateStatus('ready');
                    }
                    return template;
                }
    
                mfp.updateStatus('loading');
                item.loading = true;
    
                if(!item.hasSize) {
                    item.imgHidden = true;
                    template.addClass('mfp-loading');
                    mfp.findImageSize(item);
                }
    
                return template;
            }
        }
    });
    
    /*>>image*/
    
    /*>>zoom*/
    var hasMozTransform,
        getHasMozTransform = function() {
            if(hasMozTransform === undefined) {
                hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
            }
            return hasMozTransform;
        };
    
    $.magnificPopup.registerModule('zoom', {
    
        options: {
            enabled: false,
            easing: 'ease-in-out',
            duration: 300,
            opener: function(element) {
                return element.is('img') ? element : element.find('img');
            }
        },
    
        proto: {
    
            initZoom: function() {
                var zoomSt = mfp.st.zoom,
                    ns = '.zoom',
                    image;
    
                if(!zoomSt.enabled || !mfp.supportsTransition) {
                    return;
                }
    
                var duration = zoomSt.duration,
                    getElToAnimate = function(image) {
                        var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                            transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
                            cssObj = {
                                position: 'fixed',
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                '-webkit-backface-visibility': 'hidden'
                            },
                            t = 'transition';
    
                        cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;
    
                        newImg.css(cssObj);
                        return newImg;
                    },
                    showMainContent = function() {
                        mfp.content.css('visibility', 'visible');
                    },
                    openTimeout,
                    animatedImg;
    
                _mfpOn('BuildControls'+ns, function() {
                    if(mfp._allowZoom()) {
    
                        clearTimeout(openTimeout);
                        mfp.content.css('visibility', 'hidden');
    
                        // Basically, all code below does is clones existing image, puts in on top of the current one and animated it
    
                        image = mfp._getItemToZoom();
    
                        if(!image) {
                            showMainContent();
                            return;
                        }
    
                        animatedImg = getElToAnimate(image);
    
                        animatedImg.css( mfp._getOffset() );
    
                        mfp.wrap.append(animatedImg);
    
                        openTimeout = setTimeout(function() {
                            animatedImg.css( mfp._getOffset( true ) );
                            openTimeout = setTimeout(function() {
    
                                showMainContent();
    
                                setTimeout(function() {
                                    animatedImg.remove();
                                    image = animatedImg = null;
                                    _mfpTrigger('ZoomAnimationEnded');
                                }, 16); // avoid blink when switching images
    
                            }, duration); // this timeout equals animation duration
    
                        }, 16); // by adding this timeout we avoid short glitch at the beginning of animation
    
    
                        // Lots of timeouts...
                    }
                });
                _mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
                    if(mfp._allowZoom()) {
    
                        clearTimeout(openTimeout);
    
                        mfp.st.removalDelay = duration;
    
                        if(!image) {
                            image = mfp._getItemToZoom();
                            if(!image) {
                                return;
                            }
                            animatedImg = getElToAnimate(image);
                        }
    
                        animatedImg.css( mfp._getOffset(true) );
                        mfp.wrap.append(animatedImg);
                        mfp.content.css('visibility', 'hidden');
    
                        setTimeout(function() {
                            animatedImg.css( mfp._getOffset() );
                        }, 16);
                    }
    
                });
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    if(mfp._allowZoom()) {
                        showMainContent();
                        if(animatedImg) {
                            animatedImg.remove();
                        }
                        image = null;
                    }
                });
            },
    
            _allowZoom: function() {
                return mfp.currItem.type === 'image';
            },
    
            _getItemToZoom: function() {
                if(mfp.currItem.hasSize) {
                    return mfp.currItem.img;
                } else {
                    return false;
                }
            },
    
            // Get element postion relative to viewport
            _getOffset: function(isLarge) {
                var el;
                if(isLarge) {
                    el = mfp.currItem.img;
                } else {
                    el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
                }
    
                var offset = el.offset();
                var paddingTop = parseInt(el.css('padding-top'),10);
                var paddingBottom = parseInt(el.css('padding-bottom'),10);
                offset.top -= ( $(window).scrollTop() - paddingTop );
    
    
                /*
    
                Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
    
                 */
                var obj = {
                    width: el.width(),
                    // fix Zepto height+padding issue
                    height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
                };
    
                // I hate to do this, but there is no another option
                if( getHasMozTransform() ) {
                    obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
                } else {
                    obj.left = offset.left;
                    obj.top = offset.top;
                }
                return obj;
            }
    
        }
    });
    
    
    
    /*>>zoom*/
    
    /*>>iframe*/
    
    var IFRAME_NS = 'iframe',
        _emptyPage = '//about:blank',
    
        _fixIframeBugs = function(isShowing) {
            if(mfp.currTemplate[IFRAME_NS]) {
                var el = mfp.currTemplate[IFRAME_NS].find('iframe');
                if(el.length) {
                    // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
                    if(!isShowing) {
                        el[0].src = _emptyPage;
                    }
    
                    // IE8 black screen bug fix
                    if(mfp.isIE8) {
                        el.css('display', isShowing ? 'block' : 'none');
                    }
                }
            }
        };
    
    $.magnificPopup.registerModule(IFRAME_NS, {
    
        options: {
            markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
                    '</div>',
    
            srcAction: 'iframe_src',
    
            // we don't care and support only one default type of URL by default
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        },
    
        proto: {
            initIframe: function() {
                mfp.types.push(IFRAME_NS);
    
                _mfpOn('BeforeChange', function(e, prevType, newType) {
                    if(prevType !== newType) {
                        if(prevType === IFRAME_NS) {
                            _fixIframeBugs(); // iframe if removed
                        } else if(newType === IFRAME_NS) {
                            _fixIframeBugs(true); // iframe is showing
                        }
                    }// else {
                        // iframe source is switched, don't do anything
                    //}
                });
    
                _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
                    _fixIframeBugs();
                });
            },
    
            getIframe: function(item, template) {
                var embedSrc = item.src;
                var iframeSt = mfp.st.iframe;
    
                $.each(iframeSt.patterns, function() {
                    if(embedSrc.indexOf( this.index ) > -1) {
                        if(this.id) {
                            if(typeof this.id === 'string') {
                                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
                            } else {
                                embedSrc = this.id.call( this, embedSrc );
                            }
                        }
                        embedSrc = this.src.replace('%id%', embedSrc );
                        return false; // break;
                    }
                });
    
                var dataObj = {};
                if(iframeSt.srcAction) {
                    dataObj[iframeSt.srcAction] = embedSrc;
                }
                mfp._parseMarkup(template, dataObj, item);
    
                mfp.updateStatus('ready');
    
                return template;
            }
        }
    });
    
    
    
    /*>>iframe*/
    
    /*>>gallery*/
    /**
     * Get looped index depending on number of slides
     */
    var _getLoopedId = function(index) {
            var numSlides = mfp.items.length;
            if(index > numSlides - 1) {
                return index - numSlides;
            } else  if(index < 0) {
                return numSlides + index;
            }
            return index;
        },
        _replaceCurrTotal = function(text, curr, total) {
            return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
        };
    
    $.magnificPopup.registerModule('gallery', {
    
        options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0,2],
            navigateByImgClick: true,
            arrows: true,
    
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },
    
        proto: {
            initGallery: function() {
    
                var gSt = mfp.st.gallery,
                    ns = '.mfp-gallery';
    
                mfp.direction = true; // true - next, false - prev
    
                if(!gSt || !gSt.enabled ) return false;
    
                _wrapClasses += ' mfp-gallery';
    
                _mfpOn(OPEN_EVENT+ns, function() {
    
                    if(gSt.navigateByImgClick) {
                        mfp.wrap.on('click'+ns, '.mfp-img', function() {
                            if(mfp.items.length > 1) {
                                mfp.next();
                                return false;
                            }
                        });
                    }
    
                    _document.on('keydown'+ns, function(e) {
                        if (e.keyCode === 37) {
                            mfp.prev();
                        } else if (e.keyCode === 39) {
                            mfp.next();
                        }
                    });
                });
    
                _mfpOn('UpdateStatus'+ns, function(e, data) {
                    if(data.text) {
                        data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
                    }
                });
    
                _mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
                    var l = mfp.items.length;
                    values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
                });
    
                _mfpOn('BuildControls' + ns, function() {
                    if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                        var markup = gSt.arrowMarkup,
                            arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
                            arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);
    
                        arrowLeft.click(function() {
                            mfp.prev();
                        });
                        arrowRight.click(function() {
                            mfp.next();
                        });
    
                        mfp.container.append(arrowLeft.add(arrowRight));
                    }
                });
    
                _mfpOn(CHANGE_EVENT+ns, function() {
                    if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);
    
                    mfp._preloadTimeout = setTimeout(function() {
                        mfp.preloadNearbyImages();
                        mfp._preloadTimeout = null;
                    }, 16);
                });
    
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    _document.off(ns);
                    mfp.wrap.off('click'+ns);
                    mfp.arrowRight = mfp.arrowLeft = null;
                });
    
            },
            next: function() {
                mfp.direction = true;
                mfp.index = _getLoopedId(mfp.index + 1);
                mfp.updateItemHTML();
            },
            prev: function() {
                mfp.direction = false;
                mfp.index = _getLoopedId(mfp.index - 1);
                mfp.updateItemHTML();
            },
            goTo: function(newIndex) {
                mfp.direction = (newIndex >= mfp.index);
                mfp.index = newIndex;
                mfp.updateItemHTML();
            },
            preloadNearbyImages: function() {
                var p = mfp.st.gallery.preload,
                    preloadBefore = Math.min(p[0], mfp.items.length),
                    preloadAfter = Math.min(p[1], mfp.items.length),
                    i;
    
                for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
                    mfp._preloadItem(mfp.index+i);
                }
                for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
                    mfp._preloadItem(mfp.index-i);
                }
            },
            _preloadItem: function(index) {
                index = _getLoopedId(index);
    
                if(mfp.items[index].preloaded) {
                    return;
                }
    
                var item = mfp.items[index];
                if(!item.parsed) {
                    item = mfp.parseEl( index );
                }
    
                _mfpTrigger('LazyLoad', item);
    
                if(item.type === 'image') {
                    item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
                        item.hasSize = true;
                    }).on('error.mfploader', function() {
                        item.hasSize = true;
                        item.loadError = true;
                        _mfpTrigger('LazyLoadError', item);
                    }).attr('src', item.src);
                }
    
    
                item.preloaded = true;
            }
        }
    });
    
    /*>>gallery*/
    
    /*>>retina*/
    
    var RETINA_NS = 'retina';
    
    $.magnificPopup.registerModule(RETINA_NS, {
        options: {
            replaceSrc: function(item) {
                return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
            },
            ratio: 1 // Function or number.  Set to 1 to disable.
        },
        proto: {
            initRetina: function() {
                if(window.devicePixelRatio > 1) {
    
                    var st = mfp.st.retina,
                        ratio = st.ratio;
    
                    ratio = !isNaN(ratio) ? ratio : ratio();
    
                    if(ratio > 1) {
                        _mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
                            item.img.css({
                                'max-width': item.img[0].naturalWidth / ratio,
                                'width': '100%'
                            });
                        });
                        _mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
                            item.src = st.replaceSrc(item, ratio);
                        });
                    }
                }
    
            }
        }
    });
    
    /*>>retina*/
     _checkInstance(); }));




 !function(n){"function"==typeof define&&define.amd?define(["jquery"],function(i){n(i,window,document)}):n(jQuery,window,document)}(function(n,i,t,a){"use strict";var e="countrySelect",s=1,o={defaultCountry:"",defaultStyling:"inside",excludeCountries:[],onlyCountries:[],preferredCountries:["us","gb"],responsiveDropdown:n(i).width()<768},r=38,u=40,l=13,h=27,c=65,d=90;function p(i,t){this.element=i,this.options=n.extend({},o,t),this._defaults=o,this.ns="."+e+s++,this._name=e,this.init()}n(i).on("load",function(){!0}),p.prototype={init:function(){return this._processCountryData(),this._generateMarkup(),this._setInitialState(),this._initListeners(),this.autoCountryDeferred=new n.Deferred,this._initAutoCountry(),this.autoCountryDeferred},_processCountryData:function(){this._setInstanceCountryData(),this._setPreferredCountries()},_setInstanceCountryData:function(){var i=this;if(this.options.onlyCountries.length){var t=[];n.each(this.options.onlyCountries,function(n,a){var e=i._getCountryData(a,!0);e&&t.push(e)}),this.countries=t}else if(this.options.excludeCountries.length){var a=this.options.excludeCountries.map(function(n){return n.toLowerCase()});this.countries=y.filter(function(n){return-1===a.indexOf(n.iso2)})}else this.countries=y},_setPreferredCountries:function(){var i=this;this.preferredCountries=[],n.each(this.options.preferredCountries,function(n,t){var a=i._getCountryData(t,!1);a&&i.preferredCountries.push(a)})},_generateMarkup:function(){this.countryInput=n(this.element);var t="country-select";this.options.defaultStyling&&(t+=" "+this.options.defaultStyling),this.countryInput.wrap(n("<div>",{class:t}));var a=n("<div>",{class:"flag-dropdown"}).insertAfter(this.countryInput),e=n("<div>",{class:"selected-flag"}).appendTo(a);this.selectedFlagInner=n("<div>",{class:"flag"}).appendTo(e),n("<div>",{class:"arrow"}).appendTo(e),this.countryList=n("<ul>",{class:"country-list v-hide"}).appendTo(a),this.preferredCountries.length&&(this._appendListItems(this.preferredCountries,"preferred"),n("<li>",{class:"divider"}).appendTo(this.countryList)),this._appendListItems(this.countries,""),this.countryCodeInput=n("#"+this.countryInput.attr("id")+"_code"),this.countryCodeInput||(this.countryCodeInput=n('<input type="hidden" id="'+this.countryInput.attr("id")+'_code" name="'+this.countryInput.attr("name")+'_code" value="" />'),this.countryCodeInput.insertAfter(this.countryInput)),this.dropdownHeight=this.countryList.outerHeight(),this.options.responsiveDropdown&&n(i).resize(function(){n(".country-select").each(function(){var i=this.offsetWidth;n(this).find(".country-list").css("width",i+"px")})}).resize(),this.countryList.removeClass("v-hide").addClass("hide"),this.countryListItems=this.countryList.children(".country")},_appendListItems:function(i,t){var a="";n.each(i,function(n,i){a+='<li class="country '+t+'" data-country-code="'+i.iso2+'">',a+='<div class="flag '+i.iso2+'"></div>',a+='<span class="country-name">'+i.name+"</span>",a+="</li>"}),this.countryList.append(a)},_setInitialState:function(){var n=!1;this.countryInput.val()&&(n=this._updateFlagFromInputVal());var i,t=this.countryCodeInput.val();(t&&this.selectCountry(t),n)||(this.options.defaultCountry&&(i=this._getCountryData(this.options.defaultCountry,!1))||(i=this.preferredCountries.length?this.preferredCountries[0]:this.countries[0]),this.defaultCountry=i.iso2)},_initListeners:function(){var n=this;this.countryInput.on("keyup"+this.ns,function(){n._updateFlagFromInputVal()}),this.selectedFlagInner.parent().on("click"+this.ns,function(i){n.countryList.hasClass("hide")&&!n.countryInput.prop("disabled")&&n._showDropdown()}),this.countryInput.on("blur"+this.ns,function(){n.countryInput.val()!=n.getSelectedCountryData().name&&n.setCountry(n.countryInput.val()),n.countryInput.val(n.getSelectedCountryData().name)})},_initAutoCountry:function(){"auto"===this.options.initialCountry?this._loadAutoCountry():(this.defaultCountry&&this.selectCountry(this.defaultCountry),this.autoCountryDeferred.resolve())},_loadAutoCountry:function(){n.fn[e].autoCountry?this.handleAutoCountry():n.fn[e].startedLoadingAutoCountry||(n.fn[e].startedLoadingAutoCountry=!0,"function"==typeof this.options.geoIpLookup&&this.options.geoIpLookup(function(i){n.fn[e].autoCountry=i.toLowerCase(),setTimeout(function(){n(".country-select input").countrySelect("handleAutoCountry")})}))},_focus:function(){this.countryInput.focus();var n=this.countryInput[0];if(n.setSelectionRange){var i=this.countryInput.val().length;n.setSelectionRange(i,i)}},_showDropdown:function(){this._setDropdownPosition();var n=this.countryList.children(".active");this._highlightListItem(n),this.countryList.removeClass("hide"),this._scrollTo(n),this._bindDropdownListeners(),this.selectedFlagInner.parent().children(".arrow").addClass("up")},_setDropdownPosition:function(){var t=this.countryInput.offset().top,a=n(i).scrollTop(),e=t+this.countryInput.outerHeight()+this.dropdownHeight<a+n(i).height(),s=t-this.dropdownHeight>a,o=!e&&s?"-"+(this.dropdownHeight-1)+"px":"";this.countryList.css("top",o)},_bindDropdownListeners:function(){var i=this;this.countryList.on("mouseover"+this.ns,".country",function(t){i._highlightListItem(n(this))}),this.countryList.on("click"+this.ns,".country",function(t){i._selectListItem(n(this))});var a=!0;n("html").on("click"+this.ns,function(n){a||i._closeDropdown(),a=!1}),n(t).on("keydown"+this.ns,function(n){n.preventDefault(),n.which==r||n.which==u?i._handleUpDownKey(n.which):n.which==l?i._handleEnterKey():n.which==h?i._closeDropdown():n.which>=c&&n.which<=d&&i._handleLetterKey(n.which)})},_handleUpDownKey:function(n){var i=this.countryList.children(".highlight").first(),t=n==r?i.prev():i.next();t.length&&(t.hasClass("divider")&&(t=n==r?t.prev():t.next()),this._highlightListItem(t),this._scrollTo(t))},_handleEnterKey:function(){var n=this.countryList.children(".highlight").first();n.length&&this._selectListItem(n)},_handleLetterKey:function(i){var t=String.fromCharCode(i),a=this.countryListItems.filter(function(){return n(this).text().charAt(0)==t&&!n(this).hasClass("preferred")});if(a.length){var e,s=a.filter(".highlight").first();e=s&&s.next()&&s.next().text().charAt(0)==t?s.next():a.first(),this._highlightListItem(e),this._scrollTo(e)}},_updateFlagFromInputVal:function(){var i=this,t=this.countryInput.val().replace(/(?=[() ])/g,"\\");if(t){for(var a=[],e=new RegExp("^"+t,"i"),s=0;s<this.countries.length;s++)this.countries[s].name.match(e)&&a.push(this.countries[s].iso2);var o=!1;return n.each(a,function(n,t){i.selectedFlagInner.hasClass(t)&&(o=!0)}),o||(this._selectFlag(a[0]),this.countryCodeInput.val(a[0]).trigger("change")),!0}return!1},_highlightListItem:function(n){this.countryListItems.removeClass("highlight"),n.addClass("highlight")},_getCountryData:function(n,i){for(var t=i?y:this.countries,a=0;a<t.length;a++)if(t[a].iso2==n)return t[a];return null},_selectFlag:function(n){if(!n)return!1;this.selectedFlagInner.attr("class","flag "+n);var i=this._getCountryData(n);this.selectedFlagInner.parent().attr("title",i.name);var t=this.countryListItems.children(".flag."+n).first().parent();this.countryListItems.removeClass("active"),t.addClass("active")},_selectListItem:function(n){var i=n.attr("data-country-code");this._selectFlag(i),this._closeDropdown(),this._updateName(i),this.countryInput.trigger("change"),this.countryCodeInput.trigger("change"),this._focus()},_closeDropdown:function(){this.countryList.addClass("hide"),this.selectedFlagInner.parent().children(".arrow").removeClass("up"),n(t).off("keydown"+this.ns),n("html").off("click"+this.ns),this.countryList.off(this.ns)},_scrollTo:function(n){if(n&&n.offset()){var i=this.countryList,t=i.height(),a=i.offset().top,e=a+t,s=n.outerHeight(),o=n.offset().top,r=o+s,u=o-a+i.scrollTop();if(o<a)i.scrollTop(u);else if(r>e){var l=t-s;i.scrollTop(u-l)}}},_updateName:function(n){this.countryCodeInput.val(n).trigger("change"),this.countryInput.val(this._getCountryData(n).name)},handleAutoCountry:function(){"auto"===this.options.initialCountry&&(this.defaultCountry=n.fn[e].autoCountry,this.countryInput.val()||this.selectCountry(this.defaultCountry),this.autoCountryDeferred.resolve())},getSelectedCountryData:function(){var n=this.selectedFlagInner.attr("class").split(" ")[1];return this._getCountryData(n)},selectCountry:function(n){n=n.toLowerCase(),this.selectedFlagInner.hasClass(n)||(this._selectFlag(n),this._updateName(n))},setCountry:function(n){this.countryInput.val(n),this._updateFlagFromInputVal()},destroy:function(){this.countryInput.off(this.ns),this.selectedFlagInner.parent().off(this.ns),this.countryInput.parent().before(this.countryInput).remove()}},n.fn[e]=function(i){var t,s=arguments;return i===a||"object"==typeof i?this.each(function(){n.data(this,"plugin_"+e)||n.data(this,"plugin_"+e,new p(this,i))}):"string"==typeof i&&"_"!==i[0]&&"init"!==i?(this.each(function(){var a=n.data(this,"plugin_"+e);a instanceof p&&"function"==typeof a[i]&&(t=a[i].apply(a,Array.prototype.slice.call(s,1))),"destroy"===i&&n.data(this,"plugin_"+e,null)}),t!==a?t:this):void 0},n.fn[e].getCountryData=function(){return y},n.fn[e].setCountryData=function(n){y=n};var y=n.each([{n:"Afghanistan (‫افغانستان‬‎)",i:"af"},{n:"Åland Islands (Åland)",i:"ax"},{n:"Albania (Shqipëri)",i:"al"},{n:"Algeria (‫الجزائر‬‎)",i:"dz"},{n:"American Samoa",i:"as"},{n:"Andorra",i:"ad"},{n:"Angola",i:"ao"},{n:"Anguilla",i:"ai"},{n:"Antigua and Barbuda",i:"ag"},{n:"Argentina",i:"ar"},{n:"Armenia (Հայաստան)",i:"am"},{n:"Aruba",i:"aw"},{n:"Australia",i:"au"},{n:"Austria (Österreich)",i:"at"},{n:"Azerbaijan (Azərbaycan)",i:"az"},{n:"Bahamas",i:"bs"},{n:"Bahrain (‫البحرين‬‎)",i:"bh"},{n:"Bangladesh",i:"bd"},{n:"Barbados",i:"bb"},{n:"Belarus (Беларусь)",i:"by"},{n:"Belgium (België)",i:"be"},{n:"Belize",i:"bz"},{n:"Benin (Bénin)",i:"bj"},{n:"Bermuda",i:"bm"},{n:"Bhutan (འབྲུག)",i:"bt"},{n:"Bolivia",i:"bo"},{n:"Bosnia and Herzegovina (Босна и Херцеговина)",i:"ba"},{n:"Botswana",i:"bw"},{n:"Brazil (Brasil)",i:"br"},{n:"British Indian Ocean Territory",i:"io"},{n:"British Virgin Islands",i:"vg"},{n:"Brunei",i:"bn"},{n:"Bulgaria (България)",i:"bg"},{n:"Burkina Faso",i:"bf"},{n:"Burundi (Uburundi)",i:"bi"},{n:"Cambodia (កម្ពុជា)",i:"kh"},{n:"Cameroon (Cameroun)",i:"cm"},{n:"Canada",i:"ca"},{n:"Cape Verde (Kabu Verdi)",i:"cv"},{n:"Caribbean Netherlands",i:"bq"},{n:"Cayman Islands",i:"ky"},{n:"Central African Republic (République Centrafricaine)",i:"cf"},{n:"Chad (Tchad)",i:"td"},{n:"Chile",i:"cl"},{n:"China (中国)",i:"cn"},{n:"Christmas Island",i:"cx"},{n:"Cocos (Keeling) Islands (Kepulauan Cocos (Keeling))",i:"cc"},{n:"Colombia",i:"co"},{n:"Comoros (‫جزر القمر‬‎)",i:"km"},{n:"Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",i:"cd"},{n:"Congo (Republic) (Congo-Brazzaville)",i:"cg"},{n:"Cook Islands",i:"ck"},{n:"Costa Rica",i:"cr"},{n:"Côte d’Ivoire",i:"ci"},{n:"Croatia (Hrvatska)",i:"hr"},{n:"Cuba",i:"cu"},{n:"Curaçao",i:"cw"},{n:"Cyprus (Κύπρος)",i:"cy"},{n:"Czech Republic (Česká republika)",i:"cz"},{n:"dansk",i:"dk"},{n:"Djibouti",i:"dj"},{n:"Dominica",i:"dm"},{n:"Dominican Republic (República Dominicana)",i:"do"},{n:"Ecuador",i:"ec"},{n:"Egypt (‫مصر‬‎)",i:"eg"},{n:"El Salvador",i:"sv"},{n:"Equatorial Guinea (Guinea Ecuatorial)",i:"gq"},{n:"Eritrea",i:"er"},{n:"Estonia (Eesti)",i:"ee"},{n:"Ethiopia",i:"et"},{n:"Falkland Islands (Islas Malvinas)",i:"fk"},{n:"Faroe Islands (Føroyar)",i:"fo"},{n:"Fiji",i:"fj"},{n:"Suomi",i:"fi"},{n:"France",i:"fr"},{n:"French Guiana (Guyane française)",i:"gf"},{n:"French",i:"pf"},{n:"Gabon",i:"ga"},{n:"Gambia",i:"gm"},{n:"Georgia (საქართველო)",i:"ge"},{n:"German",i:"de"},{n:"Ghana (Gaana)",i:"gh"},{n:"Gibraltar",i:"gi"},{n:"Greece (Ελλάδα)",i:"gr"},{n:"Greenland (Kalaallit Nunaat)",i:"gl"},{n:"Grenada",i:"gd"},{n:"Guadeloupe",i:"gp"},{n:"Guam",i:"gu"},{n:"Guatemala",i:"gt"},{n:"Guernsey",i:"gg"},{n:"Guinea (Guinée)",i:"gn"},{n:"Guinea-Bissau (Guiné Bissau)",i:"gw"},{n:"Guyana",i:"gy"},{n:"Haiti",i:"ht"},{n:"Honduras",i:"hn"},{n:"Hong Kong (香港)",i:"hk"},{n:"Hungary (Magyarország)",i:"hu"},{n:"Iceland (Ísland)",i:"is"},{n:"India",i:"in"},{n:"Indonesia",i:"id"},{n:"Iran (‫ایران‬‎)",i:"ir"},{n:"Iraq (‫العراق‬‎)",i:"iq"},{n:"Ireland",i:"ie"},{n:"Isle of Man",i:"im"},{n:"Israel (‫ישראל‬‎)",i:"il"},{n:"Italian",i:"it"},{n:"Jamaica",i:"jm"},{n:"Japan",i:"jp"},{n:"Jersey",i:"je"},{n:"Jordan (‫الأردن‬‎)",i:"jo"},{n:"Kazakhstan (Казахстан)",i:"kz"},{n:"Kenya",i:"ke"},{n:"Kiribati",i:"ki"},{n:"Kosovo (Kosovë)",i:"xk"},{n:"Kuwait (‫الكويت‬‎)",i:"kw"},{n:"Kyrgyzstan (Кыргызстан)",i:"kg"},{n:"Laos (ລາວ)",i:"la"},{n:"Latvia (Latvija)",i:"lv"},{n:"Lebanon (‫لبنان‬‎)",i:"lb"},{n:"Lesotho",i:"ls"},{n:"Liberia",i:"lr"},{n:"Libya (‫ليبيا‬‎)",i:"ly"},{n:"Liechtenstein",i:"li"},{n:"Lithuania (Lietuva)",i:"lt"},{n:"Luxembourg",i:"lu"},{n:"Macau (澳門)",i:"mo"},{n:"Macedonia (FYROM) (Македонија)",i:"mk"},{n:"Madagascar (Madagasikara)",i:"mg"},{n:"Malawi",i:"mw"},{n:"Malaysia",i:"my"},{n:"Maldives",i:"mv"},{n:"Mali",i:"ml"},{n:"Malta",i:"mt"},{n:"Marshall Islands",i:"mh"},{n:"Martinique",i:"mq"},{n:"Mauritania (‫موريتانيا‬‎)",i:"mr"},{n:"Mauritius (Moris)",i:"mu"},{n:"Mayotte",i:"yt"},{n:"Mexico (México)",i:"mx"},{n:"Micronesia",i:"fm"},{n:"Moldova (Republica Moldova)",i:"md"},{n:"Monaco",i:"mc"},{n:"Mongolia (Монгол)",i:"mn"},{n:"Montenegro (Crna Gora)",i:"me"},{n:"Montserrat",i:"ms"},{n:"Morocco (‫المغرب‬‎)",i:"ma"},{n:"Mozambique (Moçambique)",i:"mz"},{n:"Myanmar (Burma) (မြန်မာ)",i:"mm"},{n:"Namibia (Namibië)",i:"na"},{n:"Nauru",i:"nr"},{n:"Nepal (नेपाल)",i:"np"},{n:"Netherlands (Nederland)",i:"nl"},{n:"New Caledonia (Nouvelle-Calédonie)",i:"nc"},{n:"New Zealand",i:"nz"},{n:"Nicaragua",i:"ni"},{n:"Niger (Nijar)",i:"ne"},{n:"Nigeria",i:"ng"},{n:"Niue",i:"nu"},{n:"Norfolk Island",i:"nf"},{n:"North Korea (조선 민주주의 인민 공화국)",i:"kp"},{n:"Northern Mariana Islands",i:"mp"},{n:"Norway (Norge)",i:"no"},{n:"Oman (‫عُمان‬‎)",i:"om"},{n:"Pakistan",i:"pk"},{n:"Palau",i:"pw"},{n:"Palestine (‫فلسطين‬‎)",i:"ps"},{n:"Panama (Panamá)",i:"pa"},{n:"Papua New Guinea",i:"pg"},{n:"Paraguay",i:"py"},{n:"Peru (Perú)",i:"pe"},{n:"Philippines",i:"ph"},{n:"Pitcairn Islands",i:"pn"},{n:"Poland (Polska)",i:"pl"},{n:"Portugal",i:"pt"},{n:"Puerto Rico",i:"pr"},{n:"Qatar (‫قطر‬‎)",i:"qa"},{n:"Réunion (La Réunion)",i:"re"},{n:"Romania (România)",i:"ro"},{n:"Russia (Россия)",i:"ru"},{n:"Rwanda",i:"rw"},{n:"Saint Barthélemy (Saint-Barthélemy)",i:"bl"},{n:"Saint Helena",i:"sh"},{n:"Saint Kitts and Nevis",i:"kn"},{n:"Saint Lucia",i:"lc"},{n:"Saint Martin (Saint-Martin (partie française))",i:"mf"},{n:"Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",i:"pm"},{n:"Saint Vincent and the Grenadines",i:"vc"},{n:"Samoa",i:"ws"},{n:"San Marino",i:"sm"},{n:"São Tomé and Príncipe (São Tomé e Príncipe)",i:"st"},{n:"Saudi Arabia (‫المملكة العربية السعودية‬‎)",i:"sa"},{n:"Senegal (Sénégal)",i:"sn"},{n:"Serbia (Србија)",i:"rs"},{n:"Seychelles",i:"sc"},{n:"Sierra Leone",i:"sl"},{n:"Singapore",i:"sg"},{n:"Sint Maarten",i:"sx"},{n:"Slovakia (Slovensko)",i:"sk"},{n:"Slovenia (Slovenija)",i:"si"},{n:"Solomon Islands",i:"sb"},{n:"Somalia (Soomaaliya)",i:"so"},{n:"South Africa",i:"za"},{n:"South Georgia & South Sandwich Islands",i:"gs"},{n:"South Korea (대한민국)",i:"kr"},{n:"South Sudan (‫جنوب السودان‬‎)",i:"ss"},{n:"Spain (España)",i:"es"},{n:"Sri Lanka (ශ්‍රී ලංකාව)",i:"lk"},{n:"Sudan (‫السودان‬‎)",i:"sd"},{n:"Suriname",i:"sr"},{n:"Svalbard and Jan Mayen (Svalbard og Jan Mayen)",i:"sj"},{n:"Swaziland",i:"sz"},{n:"Sweden (Sverige)",i:"se"},{n:"Switzerland (Schweiz)",i:"ch"},{n:"Syria (‫سوريا‬‎)",i:"sy"},{n:"Taiwan (台灣)",i:"tw"},{n:"Tajikistan",i:"tj"},{n:"Tanzania",i:"tz"},{n:"Thailand (ไทย)",i:"th"},{n:"Timor-Leste",i:"tl"},{n:"Togo",i:"tg"},{n:"Tokelau",i:"tk"},{n:"Tonga",i:"to"},{n:"Trinidad and Tobago",i:"tt"},{n:"Tunisia (‫تونس‬‎)",i:"tn"},{n:"Turkey (Türkiye)",i:"tr"},{n:"Turkmenistan",i:"tm"},{n:"Turks and Caicos Islands",i:"tc"},{n:"Tuvalu",i:"tv"},{n:"Uganda",i:"ug"},{n:"Ukraine (Україна)",i:"ua"},{n:"United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",i:"ae"},{n:"English",i:"gb"},{n:"United States",i:"us"},{n:"U.S. Minor Outlying Islands",i:"um"},{n:"U.S. Virgin Islands",i:"vi"},{n:"Uruguay",i:"uy"},{n:"Uzbekistan (Oʻzbekiston)",i:"uz"},{n:"Vanuatu",i:"vu"},{n:"Vatican City (Città del Vaticano)",i:"va"},{n:"Venezuela",i:"ve"},{n:"Vietnam (Việt Nam)",i:"vn"},{n:"Wallis and Futuna",i:"wf"},{n:"Western Sahara (‫الصحراء الغربية‬‎)",i:"eh"},{n:"Yemen (‫اليمن‬‎)",i:"ye"},{n:"Zambia",i:"zm"},{n:"Zimbabwe",i:"zw"}],function(n,i){i.name=i.n,i.iso2=i.i,delete i.n,delete i.i})});    




 /*! UIkit 3.0.0-beta.40 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define("uikiticons",i):t.UIkitIcons=i()}(this,function(){"use strict";var t={album:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="5" y="2" width="10" height="1" /> <rect x="3" y="4" width="14" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11" /></svg>',ban:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5" /></svg>',behance:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z" /> <path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z" /> <rect x="13" y="4" width="5" height="1.4" /></svg>',bell:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z" /> <path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16" /></svg>',bold:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z" /></svg>',bolt:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z" /></svg>',bookmark:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5" /></svg>',calendar:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z" /> <rect width="1" height="3" x="6" y="2" /> <rect width="1" height="3" x="13" y="2" /></svg>',camera:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8" /> <path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z" /></svg>',cart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="7.3" cy="17.3" r="1.4" /> <circle cx="13.3" cy="17.3" r="1.4" /> <polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5" /></svg>',check:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4" /></svg>',clock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <rect x="9" y="4" width="1" height="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" /></svg>',close:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" /></svg>',code:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16" /></svg>',cog:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31" /> <path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z" /></svg>',comment:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z" /></svg>',commenting:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5" /> <circle cx="10" cy="8" r="1" /> <circle cx="6" cy="8" r="1" /> <circle cx="14" cy="8" r="1" /></svg>',comments:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13" /> <path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z" /></svg>',copy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16" /> <polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17" /></svg>',database:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14" /> <path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11" /> <path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25" /> <path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64" /></svg>',desktop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="8" y="15" width="1" height="2" /> <rect x="11" y="15" width="1" height="2" /> <rect x="5" y="16" width="10" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11" /></svg>',download:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10" /> <rect x="3" y="17" width="13" height="1" /> <line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3" /></svg>',dribbble:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5" /> <path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6" /> <path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4" /> <circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9" /></svg>',expand:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="13 2 18 2 18 7 17 7 17 3 13 3" /> <polygon points="2 13 3 13 3 17 7 17 7 18 2 18" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11" /></svg>',facebook:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z" /></svg>',file:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17" /></svg>',flickr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="5.5" cy="9.5" r="3.5" /> <circle cx="14.5" cy="9.5" r="3.5" /></svg>',folder:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5" /></svg>',forward:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z" /></svg>',foursquare:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z" /></svg>',future:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10" /> <rect x="9" y="4" width="1" height="7" /> <path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1" /></svg>',github:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z" /></svg>',gitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="3.5" y="1" width="1.531" height="11.471" /> <rect x="7.324" y="4.059" width="1.529" height="15.294" /> <rect x="11.148" y="4.059" width="1.527" height="15.294" /> <rect x="14.971" y="4.059" width="1.529" height="8.412" /></svg>',google:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z" /></svg>',grid:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="2" width="3" height="3" /> <rect x="8" y="2" width="3" height="3" /> <rect x="14" y="2" width="3" height="3" /> <rect x="2" y="8" width="3" height="3" /> <rect x="8" y="8" width="3" height="3" /> <rect x="14" y="8" width="3" height="3" /> <rect x="2" y="14" width="3" height="3" /> <rect x="8" y="14" width="3" height="3" /> <rect x="14" y="14" width="3" height="3" /></svg>',happy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="13" cy="7" r="1" /> <circle cx="7" cy="7" r="1" /> <circle fill="none" stroke="#000" cx="10" cy="10" r="8.5" /> <path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4" /></svg>',hashtag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z" /></svg>',heart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z" /></svg>',history:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10" /> <rect x="9" y="4" width="1" height="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" id="Shape" /></svg>',home:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65" /> <polygon points="15 4 18 4 18 7 17 7 17 5 15 5" /> <polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19" /></svg>',image:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="16.1" cy="6.1" r="1.1" /> <rect fill="none" stroke="#000" x="0.5" y="2.5" width="19" height="15" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14" /></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /></svg>',instagram:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z" /> <circle cx="14.87" cy="5.26" r="1.09" /> <path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z" /></svg>',italic:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z" /></svg>',joomla:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z" /> <path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8" /> <path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8" /> <path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7" /></svg>',laptop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect y="16" width="20" height="1" /> <rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10" /></svg>',lifesaver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z" /></svg>',link:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975" /></svg>',linkedin:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z" /> <path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z" /></svg>',list:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="6" y="4" width="12" height="1" /> <rect x="6" y="9" width="12" height="1" /> <rect x="6" y="14" width="12" height="1" /> <rect x="2" y="4" width="2" height="1" /> <rect x="2" y="9" width="2" height="1" /> <rect x="2" y="14" width="2" height="1" /></svg>',location:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z" /> <circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3" /></svg>',lock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5" /> <path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8" /></svg>',mail:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5" /> <path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z" /></svg>',menu:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="4" width="16" height="1" /> <rect x="2" y="9" width="16" height="1" /> <rect x="2" y="14" width="16" height="1" /></svg>',minus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect height="1" width="18" y="9" x="1" /></svg>',more:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="3" cy="10" r="2" /> <circle cx="10" cy="10" r="2" /> <circle cx="17" cy="10" r="2" /></svg>',move:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="4,5 1,5 1,9 2,9 2,6 4,6 " /> <polygon points="1,16 2,16 2,18 4,18 4,19 1,19 " /> <polygon points="14,16 14,19 11,19 11,18 13,18 13,16 " /> <rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13" /> <rect x="1" y="11" width="1" height="3" /> <rect x="6" y="18" width="3" height="1" /></svg>',nut:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3" /> <circle fill="none" stroke="#000" cx="10" cy="10" r="3.5" /></svg>',pagekit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19 " /></svg>',pencil:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z" /> <path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148" /></svg>',phone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z" /> <circle cx="10.5" cy="16.5" r="0.8" /></svg>',pinterest:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1" /></svg>',play:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15" /></svg>',plus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="9" y="1" width="1" height="17" /> <rect x="1" y="9" width="17" height="1" /></svg>',pull:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7" /> <line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2" /> <polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5" /></svg>',push:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3" /> <line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1" /> <polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5" /></svg>',question:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <circle cx="10.44" cy="14.42" r="1.05" /> <path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75" /></svg>',receiver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611" /></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5" /> <polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9" /></svg>',reply:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z" /></svg>',rss:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="3.12" cy="16.8" r="1.85" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5" /></svg>',search:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z" /></svg>',server:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="3" width="1" height="2" /> <rect x="5" y="3" width="1" height="2" /> <rect x="7" y="3" width="1" height="2" /> <rect x="16" y="3" width="1" height="1" /> <rect x="16" y="10" width="1" height="1" /> <circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4" /> <rect x="3" y="10" width="1" height="2" /> <rect x="5" y="10" width="1" height="2" /> <rect x="9.5" y="14" width="1" height="2" /> <rect x="3" y="17" width="6" height="1" /> <rect x="11" y="17" width="6" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5" /> <rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5" /></svg>',settings:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15" /> <ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15" /> <circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15" /> <rect x="1" y="3" width="3" height="1" /> <rect x="10" y="3" width="8" height="1" /> <rect x="1" y="9" width="8" height="1" /> <rect x="15" y="9" width="3" height="1" /> <rect x="1" y="15" width="3" height="1" /> <rect x="10" y="15" width="8" height="1" /></svg>',shrink:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /> <polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" /></svg>',social:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7" /> <line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3" /></svg>',soundcloud:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z" /> <rect x="6" y="6.5" width="1.5" height="8.5" /> <rect x="3" y="8" width="1.5" height="7" /> <rect y="10" width="1.5" height="5" /></svg>',star:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27" /></svg>',strikethrough:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z" /> <rect x="3" y="10" width="15" height="1" /></svg>',table:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="1" y="3" width="18" height="1" /> <rect x="1" y="7" width="18" height="1" /> <rect x="1" y="11" width="18" height="1" /> <rect x="1" y="15" width="18" height="1" /></svg>',tablet:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z" /> <circle cx="10.5" cy="16.3" r="0.8" /></svg>',tag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z" /> <circle cx="14" cy="6" r="1" /></svg>',thumbnails:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5" /></svg>',trash:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3" /> <polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4" /> <rect x="8" y="7" width="1" height="9" /> <rect x="11" y="7" width="1" height="9" /> <rect x="2" y="3" width="16" height="1" /></svg>',tripadvisor:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z" /></svg>',tumblr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z" /></svg>',tv:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="7" y="16" width="6" height="1" /> <rect fill="none" stroke="#000" x="0.5" y="3.5" width="19" height="11" /></svg>',twitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74" /></svg>',uikit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3" /> <polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3" /></svg>',unlock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10" /> <path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9" /></svg>',upload:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8 " /> <rect x="3" y="17" width="13" height="1" /> <line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4" /></svg>',user:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2" /></svg>',users:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1" /></svg>',vimeo:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z" /></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="14" r="1" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z" /></svg>',whatsapp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9" /></svg>',wordpress:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z" /></svg>',world:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M1,10.5 L19,10.5" /> <path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5" /> <path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5" /> <path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z" /> <circle fill="none" stroke="#000" cx="10" cy="10.5" r="9" /></svg>',xing:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z" /> <path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z" /></svg>',yelp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z" /></svg>',youtube:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z" /></svg>',"500px":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719\t\tc0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449\t\tc-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045\t\tc-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z" /> <path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066\t\tc0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564\t\tc0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271\t\tc0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z" /> <path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521\t\tc-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53\t\tc-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203\t\tc-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604\t\tc0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645\t\tc1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z" /> <path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461\t\tc0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882\t\tc0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881\t\tc-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461\t\tc-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915\t\tC5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0\t\tc0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408\t\tc0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406\t\tc-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799\t\tc0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468\t\tc-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607\t\tc0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038\t\tc-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113\t\tc-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z" /></svg>',"arrow-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66" /> <line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15" /></svg>',"arrow-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /> <line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" /></svg>',"arrow-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14" /> <line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5" /></svg>',"arrow-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4" /> <line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5" /></svg>',"chevron-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7" /></svg>',"chevron-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4" /></svg>',"chevron-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16" /></svg>',"chevron-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13" /></svg>',"cloud-download":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6" /> <polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16" /> <path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5" /></svg>',"cloud-upload":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6" /> <polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75" /> <path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5" /></svg>',"credit-card":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12" /> <rect x="1" y="7" width="18" height="3" /></svg>',"file-edit":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z" /> <polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5" /></svg>',"git-branch":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2" /> <path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5" /></svg>',"git-fork":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79" /> <ellipse fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" rx="1.79" ry="1.79" /> <path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57" /></svg>',"github-alt":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z" /></svg>',"google-plus":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.9,9c0,2.7-0.6,5-3.2,6.3c-3.7,1.8-8.1,0.2-9.4-3.6C-1.1,7.6,1.9,3.3,6.1,3c1.7-0.1,3.2,0.3,4.6,1.3 c0.1,0.1,0.3,0.2,0.4,0.4c-0.5,0.5-1.2,1-1.7,1.6c-1-0.8-2.1-1.1-3.5-0.9C5,5.6,4.2,6,3.6,6.7c-1.3,1.3-1.5,3.4-0.5,5 c1,1.7,2.6,2.3,4.6,1.9c1.4-0.3,2.4-1.2,2.6-2.6H6.9V9H12.9z" /> <polygon points="20,9 20,11 18,11 18,13 16,13 16,11 14,11 14,9 16,9 16,7 18,7 18,9 " /></svg>',"minus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /> <line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" /></svg>',"more-vertical":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="3" r="2" /> <circle cx="10" cy="10" r="2" /> <circle cx="10" cy="17" r="2" /></svg>',"paint-bucket":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61" /> <path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z" /></svg>',"phone-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z" /> <circle cx="3.8" cy="10.5" r="0.8" /></svg>',"play-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /></svg>',"plus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /> <line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14" /> <line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" /></svg>',"quote-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z" /> <path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z" /></svg>',"sign-in":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3" /> <polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5" /></svg>',"sign-out":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5" /> <polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3" /></svg>',"tablet-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z" /> <circle cx="3.7" cy="10.5" r="0.8" /></svg>',"triangle-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="5 7 15 7 10 12" /></svg>',"triangle-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="12 5 7 10 12 15" /></svg>',"triangle-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="8 5 13 10 8 15" /></svg>',"triangle-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="5 13 10 8 15 13" /></svg>',"video-camera":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="18,6 18,14 12,10 " /> <rect x="2" y="5" width="12" height="10" /></svg>'};function i(e){i.installed||e.icon.add(t)}return"undefined"!=typeof window&&window.UIkit&&window.UIkit.use(i),i});



/*! UIkit 3.0.0-beta.40 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):t.UIkit=e()}(this,function(){"use strict";function t(t,e){return function(i){var n=arguments.length;return n?n>1?t.apply(e,arguments):t.call(e,i):t.call(e)}}var e=Object.prototype.hasOwnProperty;function i(t,i){return e.call(t,i)}var n=/([a-z\d])([A-Z])/g;function o(t){return t.replace(n,"$1-$2").toLowerCase()}var r=/-(\w)/g;function s(t){return t.replace(r,a)}function a(t,e){return e?e.toUpperCase():""}function l(t){return t.length?a(0,t.charAt(0))+t.slice(1):""}var h=String.prototype,u=h.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function c(t,e){return u.call(t,e)}var d=h.endsWith||function(t){return this.substr(-t.length)===t};function f(t,e){return d.call(t,e)}var p=function(t){return~this.indexOf(t)},m=h.includes||p,g=Array.prototype.includes||p;function v(t,e){return t&&(S(t)?m:g).call(t,e)}var w=Array.isArray;function b(t){return"function"==typeof t}function y(t){return null!==t&&"object"==typeof t}function x(t){return y(t)&&Object.getPrototypeOf(t)===Object.prototype}function k(t){return y(t)&&t===t.window}function $(t){return y(t)&&9===t.nodeType}function I(t){return y(t)&&!!t.jquery}function T(t){return t instanceof Node||y(t)&&1===t.nodeType}function C(t){return t instanceof NodeList||t instanceof HTMLCollection}function E(t){return"boolean"==typeof t}function S(t){return"string"==typeof t}function _(t){return"number"==typeof t}function A(t){return _(t)||S(t)&&!isNaN(t-parseFloat(t))}function N(t){return void 0===t}function D(t){return E(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function M(t){var e=Number(t);return!isNaN(e)&&e}function B(t){return parseFloat(t)||0}function O(t){return T(t)||k(t)||$(t)?t:C(t)||I(t)?t[0]:w(t)?O(t[0]):null}var P=Array.prototype;function H(t){return T(t)?[t]:C(t)?P.slice.call(t):w(t)?t.map(O).filter(Boolean):I(t)?t.toArray():[]}function z(t){return w(t)?t:S(t)?t.split(/,(?![^(]*\))/).map(function(t){return A(t)?M(t):D(t.trim())}):[t]}function W(t){return t?f(t,"ms")?B(t):1e3*B(t):0}function L(t,e,i){return t.replace(new RegExp(e+"|"+i,"mg"),function(t){return t===e?i:e})}var j=Object.assign||function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];t=Object(t);for(var o=0;o<e.length;o++){var r=e[o];if(null!==r)for(var s in r)i(r,s)&&(t[s]=r[s])}return t};function F(t,e){for(var i in t)if(!1===e.call(t[i],t[i],i))break}function V(t,e,i){return void 0===e&&(e=0),void 0===i&&(i=1),Math.min(Math.max(t,e),i)}function R(){}function Y(t,e){return t.left<=e.right&&e.left<=t.right&&t.top<=e.bottom&&e.top<=t.bottom}function q(t,e){return Y({top:t.y,bottom:t.y,left:t.x,right:t.x},e)}var U={ratio:function(t,e,i){var n,o="width"===e?"height":"width";return(n={})[o]=Math.round(i*t[o]/t[e]),n[e]=i,n},contain:function(t,e){var i=this;return F(t=j({},t),function(n,o){return t=t[o]>e[o]?i.ratio(t,o,e[o]):t}),t},cover:function(t,e){var i=this;return F(t=this.contain(t,e),function(n,o){return t=t[o]<e[o]?i.ratio(t,o,e[o]):t}),t}};function X(t,e,i){if(y(e))for(var n in e)X(t,n,e[n]);else{if(N(i))return(t=O(t))&&t.getAttribute(e);H(t).forEach(function(t){b(i)&&(i=i.call(t,X(t,e))),null===i?G(t,e):t.setAttribute(e,i)})}}function J(t,e){return H(t).some(function(t){return t.hasAttribute(e)})}function G(t,e){t=H(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeAttribute(e)})})}function Z(t,e,i,n){X(t,e,function(t){return t?t.replace(i,n):t})}function Q(t,e){for(var i=0,n=[e,"data-"+e];i<n.length;i++)if(J(t,n[i]))return X(t,n[i])}var K="Promise"in window?window.Promise:it,tt=2,et="setImmediate"in window?setImmediate:setTimeout;function it(t){this.state=tt,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}it.reject=function(t){return new it(function(e,i){i(t)})},it.resolve=function(t){return new it(function(e,i){e(t)})},it.all=function(t){return new it(function(e,i){var n=[],o=0;function r(i){return function(r){n[i]=r,(o+=1)===t.length&&e(n)}}0===t.length&&e(n);for(var s=0;s<t.length;s+=1)it.resolve(t[s]).then(r(s),i)})},it.race=function(t){return new it(function(e,i){for(var n=0;n<t.length;n+=1)it.resolve(t[n]).then(e,i)})};var nt=it.prototype;nt.resolve=function(t){var e=this;if(e.state===tt){if(t===e)throw new TypeError("Promise settled with itself.");var i=!1;try{var n=t&&t.then;if(null!==t&&y(t)&&b(n))return void n.call(t,function(t){i||e.resolve(t),i=!0},function(t){i||e.reject(t),i=!0})}catch(t){return void(i||e.reject(t))}e.state=0,e.value=t,e.notify()}},nt.reject=function(t){var e=this;if(e.state===tt){if(t===e)throw new TypeError("Promise settled with itself.");e.state=1,e.value=t,e.notify()}},nt.notify=function(){var t=this;et(function(){if(t.state!==tt)for(;t.deferred.length;){var e=t.deferred.shift(),i=e[0],n=e[1],o=e[2],r=e[3];try{0===t.state?b(i)?o(i.call(void 0,t.value)):o(t.value):1===t.state&&(b(n)?o(n.call(void 0,t.value)):r(t.value))}catch(t){r(t)}}})},nt.then=function(t,e){var i=this;return new it(function(n,o){i.deferred.push([t,e,n,o]),i.notify()})},nt.catch=function(t){return this.then(void 0,t)};var ot=window,rt=document,st=rt.documentElement,at="rtl"===X(st,"dir"),lt=ot.MutationObserver,ht="ontouchstart"in ot,ut=ot.PointerEvent,ct=ht||ot.DocumentTouch&&rt instanceof DocumentTouch||navigator.maxTouchPoints,dt=ct?"mousedown "+(ht?"touchstart":"pointerdown"):"mousedown",ft=ct?"mousemove "+(ht?"touchmove":"pointermove"):"mousemove",pt=ct?"mouseup "+(ht?"touchend":"pointerup"):"mouseup",mt=ct&&ut?"pointerenter":"mouseenter",gt=ct&&ut?"pointerleave":"mouseleave";var vt,wt={};function bt(t,e){return O(t)||xt(t,Ct(t)?e:rt)}function yt(t,e){var i=H(t);return i.length&&i||kt(t,Ct(t)?e:rt)}function xt(t,e){return O($t(t,e,"querySelector"))}function kt(t,e){return H($t(t,e,"querySelectorAll"))}function $t(t,e,i){if(void 0===e&&(e=rt),!t||!S(t))return null;var n;Ct(t=t.replace(Tt,"$1 *"))&&(n=[],t=t.split(",").map(function(t,i){var o=e;if("!"===(t=t.trim())[0]){var r=t.substr(1).trim().split(" ");o=Nt(e.parentNode,r[0]),t=r.slice(1).join(" ")}return o?(o.id||(o.id="uk-"+Date.now()+i,n.push(function(){return G(o,"id")})),"#"+Bt(o.id)+" "+t):null}).filter(Boolean).join(","),e=rt);try{return e[i](t)}catch(t){return null}finally{n&&n.forEach(function(t){return t()})}}(vt=rt.createElement("_").classList)&&(vt.add("a","b"),vt.toggle("c",!1),wt.Multiple=vt.contains("b"),wt.Force=!vt.contains("c"),wt.ClassList=!0),vt=null;var It=/(^|,)\s*[!>+~]/,Tt=/([!>+~])(?=\s+[!>+~]|\s*$)/g;function Ct(t){return S(t)&&t.match(It)}var Et=Element.prototype,St=Et.matches||Et.webkitMatchesSelector||Et.msMatchesSelector;function _t(t,e){return H(t).some(function(t){return St.call(t,e)})}var At=Et.closest||function(t){var e=this;do{if(_t(e,t))return e;e=e.parentNode}while(e&&1===e.nodeType)};function Nt(t,e){return c(e,">")&&(e=e.slice(1)),T(t)?t.parentNode&&At.call(t,e):H(t).map(function(t){return t.parentNode&&At.call(t,e)}).filter(Boolean)}function Dt(t,e){for(var i=[],n=O(t).parentNode;n&&1===n.nodeType;)_t(n,e)&&i.push(n),n=n.parentNode;return i}var Mt=ot.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function Bt(t){return S(t)?Mt.call(null,t):""}var Ot={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function Pt(t){return H(t).some(function(t){return Ot[t.tagName.toLowerCase()]})}function Ht(t){return H(t).some(function(t){return t.offsetHeight||t.getBoundingClientRect().height})}var zt="input,select,textarea,button";function Wt(t){return H(t).some(function(t){return _t(t,zt)})}function Lt(t,e){return H(t).filter(function(t){return _t(t,e)})}function jt(t,e){return S(e)?_t(t,e)||Nt(t,e):t===e||O(e).contains(O(t))}function Ft(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i,n=Ut(t),o=n[0],r=n[1],s=n[2],a=n[3],l=n[4];return o=Jt(o),s&&(a=function(t,e,i){var n=this;return function(o){var r=o.target,s=">"===e[0]?kt(e,t).reverse().filter(function(t){return jt(r,t)})[0]:Nt(r,e);s&&(o.delegate=t,o.current=s,i.call(n,o))}}(o,s,a)),a.length>1&&(i=a,a=function(t){return w(t.detail)?i.apply(i,[t].concat(t.detail)):i(t)}),r.split(" ").forEach(function(t){return o&&o.addEventListener(t,a,l)}),function(){return Vt(o,r,a,l)}}function Vt(t,e,i,n){void 0===n&&(n=!1),(t=Jt(t))&&e.split(" ").forEach(function(e){return t.removeEventListener(e,i,n)})}function Rt(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i=Ut(t),n=i[0],o=i[1],r=i[2],s=i[3],a=i[4],l=i[5],h=Ft(n,o,r,function(t){var e=!l||l(t);e&&(h(),s(t,e))},a);return h}function Yt(t,e,i){return Gt(t).reduce(function(t,n){return t&&n.dispatchEvent(qt(e,!0,!0,i))},!0)}function qt(t,e,i,n){if(void 0===e&&(e=!0),void 0===i&&(i=!1),S(t)){var o=document.createEvent("CustomEvent");o.initCustomEvent(t,e,i,n),t=o}return t}function Ut(t){return S(t[0])&&(t[0]=xt(t[0])),b(t[2])&&t.splice(2,0,!1),t}function Xt(t){return"EventTarget"in window?t instanceof EventTarget:t&&"addEventListener"in t}function Jt(t){return Xt(t)?t:O(t)}function Gt(t){return Xt(t)?[t]:w(t)?t.map(Jt).filter(Boolean):H(t)}function Zt(t,e){return new K(function(i,n){var o=j({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:R,responseType:""},e);o.beforeSend(o);var r=o.xhr;for(var s in o)if(s in r)try{r[s]=o[s]}catch(t){}for(var a in r.open(o.method.toUpperCase(),t),o.headers)r.setRequestHeader(a,o.headers[a]);Ft(r,"load",function(){0===r.status||r.status>=200&&r.status<300||304===r.status?i(r):n(j(Error(r.statusText),{xhr:r,status:r.status}))}),Ft(r,"error",function(){return n(j(Error("Network Error"),{xhr:r}))}),Ft(r,"timeout",function(){return n(j(Error("Network Timeout"),{xhr:r}))}),r.send(o.data)})}function Qt(){return"complete"===rt.readyState||"loading"!==rt.readyState&&!st.doScroll}function Kt(t){if(Qt())t();else var e=function(){i(),n(),t()},i=Ft(rt,"DOMContentLoaded",e),n=Ft(ot,"load",e)}function te(t,e){return e?H(t).indexOf(O(e)):H((t=O(t))&&t.parentNode.children).indexOf(t)}function ee(t,e,i,n){void 0===i&&(i=0),void 0===n&&(n=!1);var o=(e=H(e)).length;return t=A(t)?M(t):"next"===t?i+1:"previous"===t?i-1:te(e,t),n?V(t,0,o-1):(t%=o)<0?t+o:t}function ie(t){return(t=O(t)).innerHTML="",t}function ne(t,e){return t=O(t),N(e)?t.innerHTML:oe(t.hasChildNodes()?ie(t):t,e)}function oe(t,e){return t=O(t),ae(e,function(e){return t.appendChild(e)})}function re(t,e){return t=O(t),ae(e,function(e){return t.parentNode.insertBefore(e,t)})}function se(t,e){return t=O(t),ae(e,function(e){return t.nextSibling?re(t.nextSibling,e):oe(t.parentNode,e)})}function ae(t,e){return(t=S(t)?pe(t):t)?"length"in t?H(t).map(e):e(t):null}function le(t){H(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function he(t,e){for(e=O(re(t,e));e.firstChild;)e=e.firstChild;return oe(e,t),e}function ue(t,e){return H(H(t).map(function(t){return t.hasChildNodes?he(H(t.childNodes),e):oe(t,e)}))}function ce(t){H(t).map(function(t){return t.parentNode}).filter(function(t,e,i){return i.indexOf(t)===e}).forEach(function(t){re(t,t.childNodes),le(t)})}var de=/^\s*<(\w+|!)[^>]*>/,fe=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function pe(t){var e=fe.exec(t);if(e)return rt.createElement(e[1]);var i=rt.createElement("div");return de.test(t)?i.insertAdjacentHTML("beforeend",t.trim()):i.textContent=t,i.childNodes.length>1?H(i.childNodes):i.firstChild}function me(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];xe(t,e,"add")}function ge(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];xe(t,e,"remove")}function ve(t,e){Z(t,"class",new RegExp("(^|\\s)"+e+"(?!\\S)","g"),"")}function we(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];e[0]&&ge(t,e[0]),e[1]&&me(t,e[1])}function be(t,e){return wt.ClassList&&H(t).some(function(t){return t.classList.contains(e)})}function ye(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];if(wt.ClassList&&e.length){var n=S((e=ke(e))[e.length-1])?[]:e.pop();e=e.filter(Boolean),H(t).forEach(function(t){for(var i=t.classList,o=0;o<e.length;o++)wt.Force?i.toggle.apply(i,[e[o]].concat(n)):i[(N(n)?!i.contains(e[o]):n)?"add":"remove"](e[o])})}}function xe(t,e,i){e=ke(e).filter(Boolean),wt.ClassList&&e.length&&H(t).forEach(function(t){var n=t.classList;wt.Multiple?n[i].apply(n,e):e.forEach(function(t){return n[i](t)})})}function ke(t){return t.reduce(function(t,e){return t.concat.call(t,S(e)&&v(e," ")?e.trim().split(" "):e)},[])}var $e={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,widows:!0,"z-index":!0,zoom:!0};function Ie(t,e,i){return H(t).map(function(t){if(S(e)){if(e=Ae(e),N(i))return Ce(t,e);i||0===i?t.style[e]=A(i)&&!$e[e]?i+"px":i:t.style.removeProperty(e)}else{if(w(e)){var n=Te(t);return e.reduce(function(t,e){return t[e]=n[Ae(e)],t},{})}y(e)&&F(e,function(e,i){return Ie(t,i,e)})}return t})[0]}function Te(t,e){return(t=O(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function Ce(t,e,i){return Te(t,i)[e]}var Ee={};function Se(t){if(!(t in Ee)){var e=oe(st,rt.createElement("div"));me(e,"var-"+t);try{Ee[t]=Ce(e,"content",":before").replace(/^["'](.*)["']$/,"$1"),Ee[t]=JSON.parse(Ee[t])}catch(t){}st.removeChild(e)}return Ee[t]}var _e={};function Ae(t){var e=_e[t];return e||(e=_e[t]=function(t){if((t=o(t))in De)return t;var e,i=Ne.length;for(;i--;)if((e="-"+Ne[i]+"-"+t)in De)return e}(t)||t),e}var Ne=["webkit","moz","ms"],De=rt.createElement("_").style;function Me(t,e,i,n){return void 0===i&&(i=400),void 0===n&&(n="linear"),K.all(H(t).map(function(t){return new K(function(o,r){for(var s in e){var a=Ie(t,s);""===a&&Ie(t,s,a)}var l=setTimeout(function(){return Yt(t,"transitionend")},i);Rt(t,"transitionend transitioncanceled",function(e){var i=e.type;clearTimeout(l),ge(t,"uk-transition"),Ie(t,{"transition-property":"","transition-duration":"","transition-timing-function":""}),"transitioncanceled"===i?r():o()},!1,function(e){var i=e.target;return t===i}),me(t,"uk-transition"),Ie(t,j({"transition-property":Object.keys(e).map(Ae).join(","),"transition-duration":i+"ms","transition-timing-function":n},e))})}))}var Be={start:Me,stop:function(t){return Yt(t,"transitionend"),K.resolve()},cancel:function(t){Yt(t,"transitioncanceled")},inProgress:function(t){return be(t,"uk-transition")}},Oe="uk-animation-",Pe="uk-cancel-animation";function He(t,e,i,n,o){var r=arguments;return void 0===i&&(i=200),K.all(H(t).map(function(t){return new K(function(s,a){if(be(t,Pe))requestAnimationFrame(function(){return K.resolve().then(function(){return He.apply(void 0,r).then(s,a)})});else{var l=e+" "+Oe+(o?"leave":"enter");c(e,Oe)&&(n&&(l+=" uk-transform-origin-"+n),o&&(l+=" "+Oe+"reverse")),h(),Rt(t,"animationend animationcancel",function(e){var i=!1;"animationcancel"===e.type?(a(),h()):(s(),K.resolve().then(function(){i=!0,h()})),requestAnimationFrame(function(){i||(me(t,Pe),requestAnimationFrame(function(){return ge(t,Pe)}))})},!1,function(e){var i=e.target;return t===i}),Ie(t,"animationDuration",i+"ms"),me(t,l)}function h(){Ie(t,"animationDuration",""),ve(t,Oe+"\\S*")}})}))}var ze=new RegExp(Oe+"(enter|leave)"),We={in:function(t,e,i,n){return He(t,e,i,n,!1)},out:function(t,e,i,n){return He(t,e,i,n,!0)},inProgress:function(t){return ze.test(X(t,"class"))},cancel:function(t){Yt(t,"animationcancel")}};function Le(t,e){return S(t)?Fe(t)?O(pe(t)):xt(t,e):O(t)}function je(t,e){return S(t)?Fe(t)?H(pe(t)):kt(t,e):H(t)}function Fe(t){return"<"===t[0]||t.match(/^\s*</)}var Ve={width:["x","left","right"],height:["y","top","bottom"]};function Re(t,e,i,n,o,r,s,a){i=Ke(i),n=Ke(n);var l={element:i,target:n};if(!t||!e)return l;var h=qe(t),u=qe(e),c=u;return Qe(c,i,h,-1),Qe(c,n,u,1),o=ti(o,h.width,h.height),r=ti(r,u.width,u.height),o.x+=r.x,o.y+=r.y,c.left+=o.x,c.top+=o.y,a=qe(a||ni(t)),s&&F(Ve,function(t,e){var r=t[0],d=t[1],f=t[2];if(!0===s||v(s,r)){var p=i[r]===d?-h[e]:i[r]===f?h[e]:0,m=n[r]===d?u[e]:n[r]===f?-u[e]:0;if(c[d]<a[d]||c[d]+h[e]>a[f]){var g=h[e]/2,w="center"===n[r]?-u[e]/2:0;"center"===i[r]&&(b(g,w)||b(-g,-w))||b(p,m)}}function b(t,i){var n=c[d]+t+i-2*o[r];if(n>=a[d]&&n+h[e]<=a[f])return c[d]=n,["element","target"].forEach(function(i){l[i][r]=t?l[i][r]===Ve[e][1]?Ve[e][2]:Ve[e][1]:l[i][r]}),!0}}),Ye(t,c),l}function Ye(t,e){if(t=O(t),!e)return qe(t);var i=Ye(t),n=Ie(t,"position");["left","top"].forEach(function(o){if(o in e){var r=Ie(t,o);t.style[o]=e[o]-i[o]+B("absolute"===n&&"auto"===r?Ue(t)[o]:r)+"px"}})}function qe(t){var e=ni(t=O(t)),i=e.pageYOffset,n=e.pageXOffset;if(k(t)){var o=t.innerHeight,r=t.innerWidth;return{top:i,left:n,height:o,width:r,bottom:i+o,right:n+r}}var s=!1;Ht(t)||(s=t.style.display,t.style.display="block");var a=t.getBoundingClientRect();return!1!==s&&(t.style.display=s),{height:a.height,width:a.width,top:a.top+i,left:a.left+n,bottom:a.bottom+i,right:a.right+n}}function Ue(t){var e=function(t){var e=O(t).offsetParent;for(;e&&"static"===Ie(e,"position");)e=e.offsetParent;return e||ri(t)}(t=O(t)),i=e===ri(t)?{top:0,left:0}:Ye(e),n=["top","left"].reduce(function(n,o){var r=l(o);return n[o]-=i[o]+(B(Ie(t,"margin"+r))||0)+(B(Ie(e,"border"+r+"Width"))||0),n},Ye(t));return{top:n.top,left:n.left}}var Xe=Ge("height"),Je=Ge("width");function Ge(t){var e=l(t);return function(i,n){if(i=O(i),N(n)){if(k(i))return i["inner"+e];if($(i)){var o=i.documentElement;return Math.max(o.offsetHeight,o.scrollHeight)}return n="auto"===(n=Ie(i,t))?i["offset"+e]:B(n)||0,Ze(t,i,n)}Ie(i,t,n||0===n?Ze(t,i,n)+"px":"")}}function Ze(t,e,i){return"border-box"===Ie(e,"boxSizing")?Ve[t].slice(1).map(l).reduce(function(t,i){return t-B(Ie(e,"padding"+i))-B(Ie(e,"border"+i+"Width"))},i):i}function Qe(t,e,i,n){F(Ve,function(o,r){var s=o[0],a=o[1],l=o[2];e[s]===l?t[a]+=i[r]*n:"center"===e[s]&&(t[a]+=i[r]*n/2)})}function Ke(t){var e=/left|center|right/,i=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat(["center"]):i.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:i.test(t[1])?t[1]:"center"}}function ti(t,e,i){var n=(t||"").split(" "),o=n[0],r=n[1];return{x:o?B(o)*(f(o,"%")?e/100:1):0,y:r?B(r)*(f(r,"%")?i/100:1):0}}function ei(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function ii(t,e,i){void 0===e&&(e=0),void 0===i&&(i=0);var n=ni(t=O(t));return Y(t.getBoundingClientRect(),{top:e,left:i,bottom:e+Xe(n),right:i+Je(n)})}function ni(t){return k(t)?t:oi(t).defaultView}function oi(t){return O(t).ownerDocument}function ri(t){return oi(t).documentElement}var si={reads:[],writes:[],read:function(t){return this.reads.push(t),ai(),t},write:function(t){return this.writes.push(t),ai(),t},clear:function(t){return hi(this.reads,t)||hi(this.writes,t)},flush:function(){li(this.reads),li(this.writes.splice(0,this.writes.length)),this.scheduled=!1,(this.reads.length||this.writes.length)&&ai()}};function ai(){si.scheduled||(si.scheduled=!0,requestAnimationFrame(si.flush.bind(si)))}function li(t){for(var e;e=t.shift();)e()}function hi(t,e){var i=t.indexOf(e);return!!~i&&!!t.splice(i,1)}function ui(){}function ci(t,e){return(e.y-t.y)/(e.x-t.x)}ui.prototype={positions:[],position:null,init:function(){var t=this;this.positions=[],this.position=null;var e=!1;this.unbind=Ft(rt,"mousemove",function(i){e||(setTimeout(function(){var n=Date.now(),o=t.positions.length;o&&n-t.positions[o-1].time>100&&t.positions.splice(0,o),t.positions.push({time:n,x:i.pageX,y:i.pageY}),t.positions.length>5&&t.positions.shift(),e=!1},5),e=!0)})},cancel:function(){this.unbind&&this.unbind()},movesTo:function(t){if(this.positions.length<2)return!1;var e=Ye(t),i=this.positions[this.positions.length-1],n=this.positions[0];if(e.left<=i.x&&i.x<=e.right&&e.top<=i.y&&i.y<=e.bottom)return!1;var o=[[{x:e.left,y:e.top},{x:e.right,y:e.bottom}],[{x:e.right,y:e.top},{x:e.left,y:e.bottom}]];return e.right<=i.x||(e.left>=i.x?(o[0].reverse(),o[1].reverse()):e.bottom<=i.y?o[0].reverse():e.top>=i.y&&o[1].reverse()),!!o.reduce(function(t,e){return t+(ci(n,e[0])<ci(i,e[0])&&ci(n,e[1])>ci(i,e[1]))},0)}};var di={};di.args=di.events=di.init=di.created=di.beforeConnect=di.connected=di.ready=di.beforeDisconnect=di.disconnected=di.destroy=function(t,e){return t=t&&!w(t)?[t]:t,e?t?t.concat(e):w(e)?e:[e]:t},di.update=function(t,e){return di.args(t,b(e)?{read:e}:e)},di.props=function(t,e){return w(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),di.methods(t,e)},di.computed=di.defaults=di.methods=function(t,e){return e?t?j({},t,e):e:t};var fi=function(t,e){return N(e)?t:e};function pi(t,e){var n={};if(e.mixins)for(var o=0,r=e.mixins.length;o<r;o++)t=pi(t,e.mixins[o]);for(var s in t)l(s);for(var a in e)i(t,a)||l(a);function l(i){n[i]=(di[i]||fi)(t[i],e[i])}return n}var mi=0,gi=function(t){this.id=++mi,this.el=O(t)};function vi(t,e){try{t.contentWindow.postMessage(JSON.stringify(j({event:"command"},e)),"*")}catch(t){}}gi.prototype.isVideo=function(){return this.isYoutube()||this.isVimeo()||this.isHTML5()},gi.prototype.isHTML5=function(){return"VIDEO"===this.el.tagName},gi.prototype.isIFrame=function(){return"IFRAME"===this.el.tagName},gi.prototype.isYoutube=function(){return this.isIFrame()&&!!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)},gi.prototype.isVimeo=function(){return this.isIFrame()&&!!this.el.src.match(/vimeo\.com\/video\/.*/)},gi.prototype.enableApi=function(){var t=this;if(this.ready)return this.ready;var e,i=this.isYoutube(),n=this.isVimeo();return i||n?this.ready=new K(function(o){var r;Rt(t.el,"load",function(){if(i){var n=function(){return vi(t.el,{event:"listening",id:t.id})};e=setInterval(n,100),n()}}),(r=function(e){return i&&e.id===t.id&&"onReady"===e.event||n&&Number(e.player_id)===t.id},new K(function(t){Rt(ot,"message",function(e,i){return t(i)},!1,function(t){var e=t.data;if(e&&S(e)){try{e=JSON.parse(e)}catch(t){return}return e&&r(e)}})})).then(function(){o(),e&&clearInterval(e)}),X(t.el,"src",t.el.src+(v(t.el.src,"?")?"&":"?")+(i?"enablejsapi=1":"api=1&player_id="+mi))}):K.resolve()},gi.prototype.play=function(){var t=this;if(this.isVideo())if(this.isIFrame())this.enableApi().then(function(){return vi(t.el,{func:"playVideo",method:"play"})});else if(this.isHTML5())try{this.el.play()}catch(t){}},gi.prototype.pause=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return vi(t.el,{func:"pauseVideo",method:"pause"})}):this.isHTML5()&&this.el.pause())},gi.prototype.mute=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return vi(t.el,{func:"mute",method:"setVolume",value:0})}):this.isHTML5()&&(this.el.muted=!0,X(this.el,"muted","")))};var wi,bi,yi,xi,ki={};function $i(){wi&&clearTimeout(wi),bi&&clearTimeout(bi),yi&&clearTimeout(yi),wi=bi=yi=null,ki={}}Kt(function(){Ft(rt,"click",function(){return xi=!0},!0),Ft(rt,dt,function(t){var e=t.target,i=Ci(t),n=i.x,o=i.y,r=Date.now(),s=Ei(t.type);ki.type&&ki.type!==s||(ki.el="tagName"in e?e:e.parentNode,wi&&clearTimeout(wi),ki.x1=n,ki.y1=o,ki.last&&r-ki.last<=250&&(ki={}),ki.type=s,ki.last=r,xi=t.button>0)}),Ft(rt,ft,function(t){if(!t.defaultPrevented){var e=Ci(t),i=e.x,n=e.y;ki.x2=i,ki.y2=n}}),Ft(rt,pt,function(t){var e=t.type,i=t.target;ki.type===Ei(e)&&(ki.x2&&Math.abs(ki.x1-ki.x2)>30||ki.y2&&Math.abs(ki.y1-ki.y2)>30?bi=setTimeout(function(){var t,e,i,n,o;ki.el&&(Yt(ki.el,"swipe"),Yt(ki.el,"swipe"+(e=(t=ki).x1,i=t.x2,n=t.y1,o=t.y2,Math.abs(e-i)>=Math.abs(n-o)?e-i>0?"Left":"Right":n-o>0?"Up":"Down"))),ki={}}):"last"in ki?(yi=setTimeout(function(){return Yt(ki.el,"tap")}),ki.el&&"mouseup"!==e&&jt(i,ki.el)&&(wi=setTimeout(function(){wi=null,ki.el&&!xi&&Yt(ki.el,"click"),ki={}},350))):ki={})}),Ft(rt,"touchcancel",$i),Ft(ot,"scroll",$i)});var Ii=!1;function Ti(t){return Ii||"touch"===t.pointerType}function Ci(t){var e=t.touches,i=t.changedTouches,n=e&&e[0]||i&&i[0]||t;return{x:n.pageX,y:n.pageY}}function Ei(t){return t.slice(0,5)}Ft(rt,"touchstart",function(){return Ii=!0},!0),Ft(rt,"click",function(){Ii=!1}),Ft(rt,"touchcancel",function(){return Ii=!1},!0);var Si=Object.freeze({ajax:Zt,transition:Me,Transition:Be,animate:He,Animation:We,attr:X,hasAttr:J,removeAttr:G,filterAttr:Z,data:Q,addClass:me,removeClass:ge,removeClasses:ve,replaceClass:we,hasClass:be,toggleClass:ye,$:Le,$$:je,positionAt:Re,offset:Ye,position:Ue,height:Xe,width:Je,flipPosition:ei,isInView:ii,scrolledOver:function(t){var e=ni(t=O(t)),i=oi(t),n=t.offsetHeight,o=function(t){var e=0;do{e+=t.offsetTop}while(t=t.offsetParent);return e}(t),r=Xe(e),s=r+Math.min(0,o-r),a=Math.max(0,r-(Xe(i)-(o+n)));return V((s+e.pageYOffset-o)/((s+(n-(a<r?a:0)))/100)/100)},isReady:Qt,ready:Kt,index:te,getIndex:ee,empty:ie,html:ne,prepend:function(t,e){return(t=O(t)).hasChildNodes()?ae(e,function(e){return t.insertBefore(e,t.firstChild)}):oe(t,e)},append:oe,before:re,after:se,remove:le,wrapAll:he,wrapInner:ue,unwrap:ce,fragment:pe,win:ot,doc:rt,docEl:st,isRtl:at,Observer:lt,hasTouch:ct,pointerDown:dt,pointerMove:ft,pointerUp:pt,pointerEnter:mt,pointerLeave:gt,getImage:function(t){return new K(function(e,i){var n=new Image;n.onerror=i,n.onload=function(){return e(n)},n.src=t})},supports:wt,on:Ft,off:Vt,once:Rt,trigger:Yt,createEvent:qt,toEventTargets:Gt,preventClick:function(){var t=setTimeout(Rt(document,"click",function(e){e.preventDefault(),e.stopImmediatePropagation(),clearTimeout(t)},!0))},fastdom:si,isVoidElement:Pt,isVisible:Ht,selInput:zt,isInput:Wt,filter:Lt,within:jt,bind:t,hasOwn:i,hyphenate:o,camelize:s,ucfirst:l,startsWith:c,endsWith:f,includes:v,isArray:w,isFunction:b,isObject:y,isPlainObject:x,isWindow:k,isDocument:$,isJQuery:I,isNode:T,isNodeCollection:C,isBoolean:E,isString:S,isNumber:_,isNumeric:A,isUndefined:N,toBoolean:D,toNumber:M,toFloat:B,toNode:O,toNodes:H,toList:z,toMs:W,swap:L,assign:j,each:F,sortBy:function(t,e){return t.sort(function(t,i){return t[e]>i[e]?1:i[e]>t[e]?-1:0})},clamp:V,noop:R,intersectRect:Y,pointInRect:q,Dimensions:U,MouseTracker:ui,mergeOptions:pi,Player:gi,Promise:K,Deferred:function(){var t=this;this.promise=new K(function(e,i){t.reject=i,t.resolve=e})},query:bt,queryAll:yt,find:xt,findAll:kt,matches:_t,closest:Nt,parents:Dt,escape:Bt,css:Ie,getStyles:Te,getStyle:Ce,getCssVar:Se,propName:Ae,isTouch:Ti,getPos:Ci});function _i(t){return!(!c(t,"uk-")&&!c(t,"data-uk-"))&&s(t.replace("data-uk-","").replace("uk-",""))}var Ai,Ni,Di,Mi,Bi,Oi=function(t){this._init(t)};Oi.util=Si,Oi.data="__uikit__",Oi.prefix="uk-",Oi.options={},Oi.instances={},Oi.elements=[],function(t){var e,i=t.data;function n(t,e){if(t)for(var i in t)t[i]._isReady&&t[i]._callUpdate(e)}t.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},t.mixin=function(e,i){i=(S(i)?t.components[i]:i)||this,(e=pi({},e)).mixins=i.options.mixins,delete i.options.mixins,i.options=pi(e,i.options)},t.extend=function(t){t=t||{};var e=function(t){this._init(t)};return(e.prototype=Object.create(this.prototype)).constructor=e,e.options=pi(this.options,t),e.super=this,e.extend=this.extend,e},t.update=function(e,o,r){if(void 0===r&&(r=!1),e=qt(e||"update"),o)if(o=O(o),r)do{n(o[i],e),o=o.parentNode}while(o);else!function t(e,i){if(1===e.nodeType)for(i(e),e=e.firstElementChild;e;)t(e,i),e=e.nextElementSibling}(o,function(t){return n(t[i],e)});else n(t.instances,e)},Object.defineProperty(t,"container",{get:function(){return e||rt.body},set:function(t){e=Le(t)}})}(Oi),(Ai=Oi).prototype._callHook=function(t){var e=this,i=this.$options[t];i&&i.forEach(function(t){return t.call(e)})},Ai.prototype._callConnected=function(){var t=this;this._connected||(v(Ai.elements,this.$options.el)||Ai.elements.push(this.$options.el),Ai.instances[this._uid]=this,this._data={},this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._isReady||Kt(function(){return t._callReady()}),this._callUpdate())},Ai.prototype._callDisconnected=function(){if(this._connected){this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null);var t=Ai.elements.indexOf(this.$options.el);~t&&Ai.elements.splice(t,1),delete Ai.instances[this._uid],this._unbindEvents(),this._callHook("disconnected"),this._connected=!1}},Ai.prototype._callReady=function(){this._isReady||(this._isReady=!0,this._callHook("ready"),this._resetComputeds(),this._callUpdate())},Ai.prototype._callUpdate=function(t){var e=this,i=(t=qt(t||"update")).type;v(["update","load","resize"],i)&&this._resetComputeds();var n=this.$options.update,o=this._frames,r=o.reads,s=o.writes;n&&n.forEach(function(n,o){var a=n.read,l=n.write,h=n.events;("update"===i||v(h,i))&&(a&&!v(si.reads,r[o])&&(r[o]=si.read(function(){var i=a.call(e,e._data,t);!1===i&&l?(si.clear(s[o]),delete s[o]):x(i)&&j(e._data,i),delete r[o]})),l&&!v(si.writes,s[o])&&(s[o]=si.write(function(){l.call(e,e._data,t),delete s[o]})))})},function(e){var n=0;function r(t,e){var i={},n=t.args;void 0===n&&(n=[]);var r=t.props;void 0===r&&(r={});var a=t.el;if(!r)return i;for(var l in r){var h=o(l);if(J(a,h)){var d=u(r[l],X(a,h),a);if("target"===h&&(!d||c(d,"_")))continue;i[l]=d}}var f=function(t,e){var i;void 0===e&&(e=[]);try{return t?c(t,"{")?JSON.parse(t):e.length&&!v(t,":")?((i={})[e[0]]=t,i):t.split(";").reduce(function(t,e){var i=e.split(/:(.+)/),n=i[0],o=i[1];return n&&o&&(t[n.trim()]=o.trim()),t},{}):{}}catch(t){return{}}}(Q(a,e),n);for(var p in f){var m=s(p);void 0!==r[m]&&(i[m]=u(r[m],f[p],a))}return i}function a(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:function(){var o=t._computeds,r=t.$props,s=t.$el;return i(o,e)||(o[e]=n.call(t,r,s)),o[e]},set:function(i){t._computeds[e]=i}})}function l(e,i,n){x(i)||(i={name:n,handler:i});var o,r,s=i.name,a=i.el,h=i.handler,u=i.capture,c=i.delegate,d=i.filter,f=i.self;a=b(a)?a.call(e):a||e.$el,w(a)?a.forEach(function(t){return l(e,j({},i,{el:t}),n)}):!a||d&&!d.call(e)||(o=S(h)?e[h]:t(h,e),h=function(t){return w(t.detail)?o.apply(void 0,[t].concat(t.detail)):o(t)},f&&(r=h,h=function(t){if(t.target===t.currentTarget||t.target===t.current)return r.call(null,t)}),e._events.push(Ft(a,s,c?S(c)?c:c.call(e):null,h,u)))}function h(t,e){return t.every(function(t){return!t||!i(t,e)})}function u(t,e,i){return t===Boolean?D(e):t===Number?M(e):"query"===t?bt(e,i):"list"===t?z(e):"media"===t?function(t){if(S(t))if("@"===t[0]){var e="media-"+t.substr(1);t=B(Se(e))}else if(isNaN(t))return t;return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}(e):t?t(e):e}e.prototype.props={},e.prototype._init=function(t){t=t||{},t=this.$options=pi(this.constructor.options,t),this.$el=null,this.$name=e.prefix+o(this.$options.name),this.$props={},this._frames={reads:{},writes:{}},this._events=[],this._uid=n++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),t.el&&this.$mount(t.el)},e.prototype._initData=function(){var t=this.$options,e=t.defaults,n=t.data;void 0===n&&(n={});var o=t.args;void 0===o&&(o=[]);var r=t.props;void 0===r&&(r={});var s=t.el;for(var a in o.length&&w(n)&&(n=n.slice(0,o.length).reduce(function(t,e,i){return x(e)?j(t,e):t[o[i]]=e,t},{})),j({},e,r))this.$props[a]=this[a]=i(n,a)&&!N(n[a])?u(r[a],n[a],s):e?e[a]&&w(e[a])?e[a].concat():e[a]:null},e.prototype._initMethods=function(){var e=this.$options.methods;if(e)for(var i in e)this[i]=t(e[i],this)},e.prototype._initComputeds=function(){var t=this.$options.computed;if(this._resetComputeds(),t)for(var e in t)a(this,e,t[e])},e.prototype._resetComputeds=function(){this._computeds={}},e.prototype._initProps=function(t){var e;for(e in this._resetComputeds(),t=t||r(this.$options,this.$name))N(t[e])||(this.$props[e]=t[e]);var i=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&h(i,e)&&(this[e]=this.$props[e])},e.prototype._initEvents=function(){var t=this,e=this.$options.events;e&&e.forEach(function(e){if(i(e,"handler"))l(t,e);else for(var n in e)l(t,e[n],n)})},e.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),this._events=[]},e.prototype._initObserver=function(){var t=this,e=this.$options,i=e.attrs,n=e.props,s=e.el;!this._observer&&n&&i&&lt&&(i=w(i)?i:Object.keys(n).map(function(t){return o(t)}),this._observer=new lt(function(){var e=r(t.$options,t.$name);i.some(function(i){return!N(e[i])&&e[i]!==t.$props[i]})&&t.$reset(e)}),this._observer.observe(s,{attributes:!0,attributeFilter:i.concat([this.$name,"data-"+this.$name])}))}}(Oi),Di=(Ni=Oi).data,Ni.prototype.$mount=function(t){var e=this.$options.name;t[Di]||(t[Di]={}),t[Di][e]||(t[Di][e]=this,this.$el=this.$options.el=this.$options.el||t,this._initProps(),this._callHook("init"),jt(t,st)&&this._callConnected())},Ni.prototype.$emit=function(t){this._callUpdate(t)},Ni.prototype.$update=function(t,e){Ni.update(t,this.$options.el,e)},Ni.prototype.$reset=function(t){this._callDisconnected(),this._initProps(t),this._callConnected()},Ni.prototype.$destroy=function(t){void 0===t&&(t=!1);var e=this.$options,i=e.el,n=e.name;i&&this._callDisconnected(),this._callHook("destroy"),i&&i[Di]&&(delete i[Di][n],Object.keys(i[Di]).length||delete i[Di],t&&le(this.$el))},Bi=(Mi=Oi).data,Mi.components={},Mi.component=function(t,e){var i=s(t);if(x(e))e.name=i,e=Mi.extend(e);else{if(N(e))return Mi.components[i];e.options.name=i}return Mi.components[i]=e,Mi[i]=function(t,e){for(var n=arguments.length,o=Array(n);n--;)o[n]=arguments[n];return x(t)?new Mi.components[i]({data:t}):Mi.components[i].options.functional?new Mi.components[i]({data:[].concat(o)}):t&&t.nodeType?r(t):je(t).map(r)[0];function r(t){var n=Mi.getComponent(t,i);return n&&e&&n.$reset(e),n||new Mi.components[i]({el:t,data:e||{}})}},Mi._initialized&&!e.options.functional&&si.read(function(){return Mi[i]("[uk-"+t+"],[data-uk-"+t+"]")}),Mi.components[i]},Mi.getComponents=function(t){return t&&(t=I(t)?t[0]:t)&&t[Bi]||{}},Mi.getComponent=function(t,e){return Mi.getComponents(t)[e]},Mi.connect=function(t){if(t[Bi])for(var e in t[Bi])t[Bi][e]._callConnected();for(var i=0;i<t.attributes.length;i++){var n=_i(t.attributes[i].name);n&&n in Mi.components&&Mi[n](t)}},Mi.disconnect=function(t){for(var e in t[Bi])t[Bi][e]._callDisconnected()};var Pi,Hi,zi={init:function(){me(this.$el,this.$name)}},Wi={props:{container:Boolean},defaults:{container:!0},computed:{container:function(t){var e=t.container;return!0===e&&Oi.container||e&&Le(e)}}},Li={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String,queued:Boolean},defaults:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",queued:!1,initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){var e=t.animation;return this.hasAnimation&&!0===e[0]}},methods:{toggleElement:function(t,e,i){var n=this;return new K(function(o){var r,s=function(t){return K.all(t.map(function(t){return n._toggleElement(t,e,i)}))},a=(t=H(t)).filter(function(t){return n.isToggled(t)}),l=t.filter(function(t){return!v(a,t)});if(n.queued&&N(i)&&N(e)&&n.hasAnimation&&!(t.length<2)){var h=rt.body,u=h.scrollTop,c=a[0],d=We.inProgress(c)&&be(c,"uk-animation-leave")||Be.inProgress(c)&&"0px"===c.style.height;r=s(a),d||(r=r.then(function(){var t=s(l);return h.scrollTop=u,t}))}else r=s(l.concat(a));r.then(o,R)})},toggleNow:function(t,e){var i=this;return new K(function(n){return K.all(H(t).map(function(t){return i._toggleElement(t,e,!1)})).then(n,R)})},isToggled:function(t){var e=H(t||this.$el);return this.cls?be(e,this.cls.split(" ")[0]):!J(e,"hidden")},updateAria:function(t){!1===this.cls&&X(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,i){var n=this;if(e=E(e)?e:We.inProgress(t)?be(t,"uk-animation-leave"):Be.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!Yt(t,"before"+(e?"show":"hide"),[this]))return K.reject();var o=(!1!==i&&this.hasAnimation?this.hasTransition?this._toggleHeight:this._toggleAnimation:this._toggleImmediate)(t,e);return Yt(t,e?"show":"hide",[this]),o.then(function(){Yt(t,e?"shown":"hidden",[n]),Oi.update(null,t)})},_toggle:function(t,e){t&&(this.cls?ye(t,this.cls,v(this.cls," ")?void 0:e):X(t,"hidden",e?null:""),je("[autofocus]",t).some(function(t){return Ht(t)&&(t.focus()||!0)}),this.updateAria(t),Oi.update(null,t))},_toggleImmediate:function(t,e){return this._toggle(t,e),K.resolve()},_toggleHeight:function(t,e){var i=this,n=Be.inProgress(t),o=t.hasChildNodes?B(Ie(t.firstElementChild,"marginTop"))+B(Ie(t.lastElementChild,"marginBottom")):0,r=Ht(t)?Xe(t)+(n?0:o):0;Be.cancel(t),this.isToggled(t)||this._toggle(t,!0),Xe(t,""),si.flush();var s=Xe(t)+(n?0:o);return Xe(t,r),(e?Be.start(t,j({},this.initProps,{overflow:"hidden",height:s}),Math.round(this.duration*(1-r/s)),this.transition):Be.start(t,this.hideProps,Math.round(this.duration*(r/s)),this.transition).then(function(){return i._toggle(t,!1)})).then(function(){return Ie(t,i.initProps)})},_toggleAnimation:function(t,e){var i=this;return We.cancel(t),e?(this._toggle(t,!0),We.in(t,this.animation[0],this.duration,this.origin)):We.out(t,this.animation[1]||this.animation[0],this.duration,this.origin).then(function(){return i._toggle(t,!1)})}}},ji={mixins:[zi,Wi,Li],props:{clsPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},defaults:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Le("."+t.clsPanel,e)},transitionElement:function(){return this.panel},transitionDuration:function(){return W(Ie(this.transitionElement,"transitionDuration"))}},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){var e=Pi&&Pi!==this&&Pi;if(Pi=this,e){if(!this.stack)return e.hide().then(this.show),void t.preventDefault();this.prev=e}!function(){if(Hi)return;Hi=[Ft(st,"click",function(t){var e=t.target,i=t.defaultPrevented;Pi&&Pi.bgClose&&!i&&!jt(e,Pi.panel||Pi.$el)&&Pi.hide()}),Ft(rt,"keydown",function(t){27===t.keyCode&&Pi&&Pi.escClose&&(t.preventDefault(),Pi.hide())})]}()}},{name:"beforehide",self:!0,handler:function(){(Pi=Pi&&Pi!==this&&Pi||this.prev)||(Hi&&Hi.forEach(function(t){return t()}),Hi=null)}},{name:"show",self:!0,handler:function(){be(st,this.clsPage)||(this.scrollbarWidth=Je(ot)-st.offsetWidth,Ie(rt.body,"overflowY",this.scrollbarWidth&&this.overlay?"scroll":"")),me(st,this.clsPage)}},{name:"hidden",self:!0,handler:function(){for(var t,e=this.prev;e;){if(e.clsPage===this.clsPage){t=!0;break}e=e.prev}t||ge(st,this.clsPage),!this.prev&&Ie(rt.body,"overflowY","")}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){if(!this.isToggled())return this.container&&this.$el.parentNode!==this.container&&(oe(this.container,this.$el),this._callConnected()),this.toggleNow(this.$el,!0)},hide:function(){if(this.isToggled())return this.toggleNow(this.$el,!1)},getActive:function(){return Pi},_toggleImmediate:function(t,e){var i=this;return new K(function(n){return requestAnimationFrame(function(){i._toggle(t,e),i.transitionDuration?Rt(i.transitionElement,"transitionend",n,!1,function(t){return t.target===i.transitionElement}):n()})})}}};var Fi={props:{pos:String,offset:null,flip:Boolean,clsPos:String},defaults:{pos:"bottom-"+(at?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){var e=t.pos;return(e+(v(e,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,i){var n;ve(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?"),Ie(t,{top:"",left:""});var o=this.offset;o=A(o)?o:(n=Le(o))?Ye(n)["x"===r?"left":"top"]-Ye(e)["x"===r?"right":"bottom"]:0;var r=this.getAxis(),s=Re(t,e,"x"===r?ei(this.dir)+" "+this.align:this.align+" "+ei(this.dir),"x"===r?this.dir+" "+this.align:this.align+" "+this.dir,"x"===r?""+("left"===this.dir?-o:o):" "+("top"===this.dir?-o:o),null,this.flip,i).target,a=s.x,l=s.y;this.dir="x"===r?a:l,this.align="x"===r?l:a,ye(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}};function Vi(t){t.component("accordion",{mixins:[zi,Li],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String},defaults:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease"},computed:{items:function(t,e){return je(t.targets,e)}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(te(je(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],connected:function(){if(!1!==this.active){var t=this.items[Number(this.active)];t&&!be(t,this.clsOpen)&&this.toggle(t,!1)}},update:function(){var t=this;this.items.forEach(function(e){return t._toggleImmediate(Le(t.content,e),be(e,t.clsOpen))});var e=!this.collapsible&&!be(this.items,this.clsOpen)&&this.items[0];e&&this.toggle(e,!1)},methods:{toggle:function(t,e){var i=this,n=ee(t,this.items),o=Lt(this.items,"."+this.clsOpen);(t=this.items[n])&&[t].concat(!this.multiple&&!v(o,t)&&o||[]).forEach(function(n){var r=n===t,s=r&&!be(n,i.clsOpen);if(s||!r||i.collapsible||!(o.length<2)){ye(n,i.clsOpen,s);var a=n._wrapper?n._wrapper.firstElementChild:Le(i.content,n);n._wrapper||(n._wrapper=he(a,"<div>"),X(n._wrapper,"hidden",s?"":null)),i._toggleImmediate(a,!0),i.toggleElement(n._wrapper,s,e).then(function(){be(n,i.clsOpen)===s&&(s||i._toggleImmediate(a,!1),n._wrapper=null,ce(a))})}})}}})}function Ri(t){t.component("alert",{attrs:!0,mixins:[zi,Li],args:"animation",props:{close:String},defaults:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:j({opacity:0},Li.defaults.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}})}function Yi(t){Kt(function(){var e=0,i=0;if(Ft(ot,"load resize",t.update),Ft(ot,"scroll",function(i){i.dir=e<=ot.pageYOffset?"down":"up",i.scrollY=e=ot.pageYOffset,t.update(i)}),Ft(rt,"animationstart",function(t){var e=t.target;(Ie(e,"animationName")||"").match(/^uk-.*(left|right)/)&&(i++,rt.body.style.overflowX="hidden",setTimeout(function(){--i||(rt.body.style.overflowX="")},W(Ie(e,"animationDuration"))+100))},!0),ct){var n="uk-hover";Ft(rt,"tap",function(t){var e=t.target;return je("."+n).forEach(function(t){return!jt(e,t)&&ge(t,n)})}),Object.defineProperty(t,"hoverSelector",{set:function(t){Ft(rt,"tap",t,function(t){return me(t.current,n)})}}),t.hoverSelector=".uk-animation-toggle, .uk-transition-toggle, [uk-hover]"}})}function qi(t){t.component("cover",{mixins:[zi,t.components.video.options],props:{width:Number,height:Number},defaults:{automute:!0},update:{write:function(){var t=this.$el;if(Ht(t)){var e=t.parentNode,i=e.offsetHeight,n=e.offsetWidth;Ie(Ie(t,{width:"",height:""}),U.cover({width:this.width||t.clientWidth,height:this.height||t.clientHeight},{width:n+(n%2?1:0),height:i+(i%2?1:0)}))}},events:["load","resize"]},events:{loadedmetadata:function(){this.$emit()}}})}function Ui(t){var e,i;t.component("drop",{mixins:[Fi,Li],args:"pos",props:{mode:"list",toggle:Boolean,boundary:"query",boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},defaults:{mode:["click","hover"],toggle:!0,boundary:ot,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,hoverIdle:200,animation:["uk-animation-fade"],cls:"uk-open"},computed:{clsDrop:function(t){var e=t.clsDrop;return e||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},init:function(){this.tracker=new ui,me(this.$el,this.clsDrop)},connected:function(){var e=this.$props.toggle;this.toggle=e&&t.toggle(S(e)?bt(e,this.$el):this.$el.previousElementSibling,{target:this.$el,mode:this.mode}),this.updateAria(this.$el)},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){if(!t.defaultPrevented){var e=t.target.hash;e||t.preventDefault(),e&&jt(e,this.$el)||this.hide(!1)}}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:mt,filter:function(){return v(this.mode,"hover")},handler:function(t){Ti(t)||(e&&e!==this&&e.toggle&&v(e.toggle.mode,"hover")&&!jt(t.target,e.toggle.$el)&&!q({x:t.pageX,y:t.pageY},Ye(e.$el))&&e.hide(!1),t.preventDefault(),this.show(this.toggle))}},{name:"toggleshow",handler:function(t,e){e&&!v(e.target,this.$el)||(t.preventDefault(),this.show(e||this.toggle))}},{name:"togglehide "+gt,handler:function(t,e){Ti(t)||e&&!v(e.target,this.$el)||(t.preventDefault(),this.toggle&&v(this.toggle.mode,"hover")&&this.hide())}},{name:"beforeshow",self:!0,handler:function(){this.clearTimers(),this.position()}},{name:"show",self:!0,handler:function(){this.tracker.init(),me(this.toggle.$el,this.cls),X(this.toggle.$el,"aria-expanded","true"),function(){if(i)return;i=!0,Ft(st,"click",function(t){var i,n=t.target,o=t.defaultPrevented;if(!o)for(;e&&e!==i&&!jt(n,e.$el)&&(!e.toggle||!jt(n,e.toggle.$el));)i=e,e.hide(!1)})}()}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){var i=t.target;this.$el===i?(e=this.isActive()?null:e,ge(this.toggle.$el,this.cls),X(this.toggle.$el,"aria-expanded","false"),this.toggle.$el.blur(),je("a, button",this.toggle.$el).forEach(function(t){return t.blur()}),this.tracker.cancel()):e=null===e&&jt(i,this.$el)&&this.isToggled()?this:e}}],update:{write:function(){this.isToggled()&&!We.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(t,i){var n=this;void 0===i&&(i=!0);var o=function(){return!n.isToggled()&&n.toggleElement(n.$el,!0)},r=function(){if(n.toggle=t||n.toggle,n.clearTimers(),!n.isActive())if(i&&e&&e!==n&&e.isDelaying)n.showTimer=setTimeout(n.show,10);else{if(n.isParentOf(e)){if(!e.hideTimer)return;e.hide(!1)}else if(e&&!n.isChildOf(e)&&!n.isParentOf(e))for(var r;e&&e!==r&&!n.isChildOf(e);)r=e,e.hide(!1);i&&n.delayShow?n.showTimer=setTimeout(o,n.delayShow):o(),e=n}};t&&this.toggle&&t.$el!==this.toggle.$el?(Rt(this.$el,"hide",r),this.hide(!1)):r()},hide:function(t){var e=this;void 0===t&&(t=!0);var i=function(){return e.toggleNow(e.$el,!1)};this.clearTimers(),this.isDelaying=this.tracker.movesTo(this.$el),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,this.hoverIdle):t&&this.delayHide?this.hideTimer=setTimeout(i,this.delayHide):i()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return e===this},isChildOf:function(t){return t&&t!==this&&jt(this.$el,t.$el)},isParentOf:function(t){return t&&t!==this&&jt(t.$el,this.$el)},position:function(){ve(this.$el,this.clsDrop+"-(stack|boundary)"),Ie(this.$el,{top:"",left:"",display:"block"}),ye(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t=Ye(this.boundary),e=this.boundaryAlign?t:Ye(this.toggle.$el);if("justify"===this.align){var i="y"===this.getAxis()?"width":"height";Ie(this.$el,i,e[i])}else this.$el.offsetWidth>Math.max(t.right-e.left,e.right-t.left)&&me(this.$el,this.clsDrop+"-stack");this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary),Ie(this.$el,"display","")}}}),t.drop.getActive=function(){return e}}function Xi(t){t.component("dropdown",t.components.drop.extend({name:"dropdown"}))}function Ji(t){t.component("form-custom",{mixins:[zi],args:"target",props:{target:Boolean},defaults:{target:!1},computed:{input:function(t,e){return Le(zt,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){var i=t.target;return i&&(!0===i&&this.input.parentNode===e&&this.input.nextElementSibling||bt(i,e))}},update:function(){var t,e=this.target,i=this.input;e&&(e[Wt(e)?"value":"textContent"]=i.files&&i.files[0]?i.files[0].name:_t(i,"select")&&(t=je("option",i).filter(function(t){return t.selected})[0])?t.textContent:i.value)},events:[{name:"focusin focusout mouseenter mouseleave",delegate:zt,handler:function(t){var e=t.type;t.current===this.input&&ye(this.state,"uk-"+(v(e,"focus")?"focus":"hover"),v(["focusin","mouseenter"],e))}},{name:"change",handler:function(){this.$emit()}}]})}function Gi(t){t.component("gif",{update:{read:function(t){var e=ii(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=this.$el.src},events:["scroll","load","resize"]}})}function Zi(t){t.component("grid",t.components.margin.extend({mixins:[zi],name:"grid",defaults:{margin:"uk-grid-margin",clsStack:"uk-grid-stack"},update:{write:function(t){var e=t.stacks;ye(this.$el,this.clsStack,e)},events:["load","resize"]}}))}function Qi(t){t.component("height-match",{args:"target",props:{target:String,row:Boolean},defaults:{target:"> *",row:!0},computed:{elements:function(t,e){return je(t.target,e)}},update:{read:function(){var t=this,e=!1;return Ie(this.elements,"minHeight",""),{rows:this.row?this.elements.reduce(function(t,i){return e!==i.offsetTop?t.push([i]):t[t.length-1].push(i),e=i.offsetTop,t},[]).map(function(e){return t.match(e)}):[this.match(this.elements)]}},write:function(t){t.rows.forEach(function(t){var e=t.height;return Ie(t.elements,"minHeight",e)})},events:["load","resize"]},methods:{match:function(t){if(t.length<2)return{};var e=[],i=0;return t.forEach(function(t){var n,o;Ht(t)||(n=X(t,"style"),o=X(t,"hidden"),X(t,{style:(n||"")+";display:block !important;",hidden:null})),i=Math.max(i,t.offsetHeight),e.push(t.offsetHeight),N(n)||X(t,{style:n,hidden:o})}),t=t.filter(function(t,n){return e[n]<i}),{height:i,elements:t}}}})}function Ki(t){function e(t){return t&&t.offsetHeight||0}t.component("height-viewport",{props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},defaults:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{write:function(){Ie(this.$el,"boxSizing","border-box");var t,i=Xe(ot),n=0;if(this.expand){Ie(this.$el,{height:"",minHeight:""});var o=i-e(st);o>0&&(t=e(this.$el)+o)}else{var r=Ye(this.$el).top;r<i/2&&this.offsetTop&&(n+=r),!0===this.offsetBottom?n+=e(this.$el.nextElementSibling):A(this.offsetBottom)?n+=i/100*this.offsetBottom:this.offsetBottom&&f(this.offsetBottom,"px")?n+=B(this.offsetBottom):S(this.offsetBottom)&&(n+=e(bt(this.offsetBottom,this.$el))),t=n?"calc(100vh - "+n+"px)":"100vh"}if(t){Ie(this.$el,{height:"",minHeight:t});var s=this.$el.offsetHeight;this.minHeight&&this.minHeight>s&&Ie(this.$el,"minHeight",this.minHeight),i-n>=s&&Ie(this.$el,"height",t)}},events:["load","resize"]}})}var tn,en='<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',nn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',on='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',rn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',sn='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',an='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',ln='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',hn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',un='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',cn='<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',dn='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',fn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',pn='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',mn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>',gn='<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',vn='<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';function wn(t){var e={},i={spinner:gn,totop:vn,marker:on,"close-icon":en,"close-large":nn,"navbar-toggle-icon":rn,"overlay-icon":sn,"pagination-next":an,"pagination-previous":ln,"search-icon":hn,"search-large":un,"search-navbar":cn,"slidenav-next":dn,"slidenav-next-large":fn,"slidenav-previous":pn,"slidenav-previous-large":mn};function n(e,i){t.component(e,t.components.icon.extend({name:e,mixins:i?[i]:[],defaults:{icon:e}}))}t.component("icon",t.components.svg.extend({attrs:["icon","ratio"],mixins:[zi],name:"icon",args:"icon",props:["icon"],defaults:{exclude:["id","style","class","src","icon"]},init:function(){me(this.$el,"uk-icon"),at&&(this.icon=L(L(this.icon,"left","right"),"previous","next"))},methods:{getSvg:function(){var t=function(t){if(!i[t])return null;e[t]||(e[t]=Le(i[t].trim()));return e[t]}(this.icon);return t?K.resolve(t):K.reject("Icon not found.")}}})),["marker","navbar-toggle-icon","overlay-icon","pagination-previous","pagination-next","totop"].forEach(function(t){return n(t)}),["slidenav-previous","slidenav-next"].forEach(function(t){return n(t,{init:function(){me(this.$el,"uk-slidenav"),be(this.$el,"uk-slidenav-large")&&(this.icon+="-large")}})}),n("search-icon",{init:function(){be(this.$el,"uk-search-icon")&&Dt(this.$el,".uk-search-large").length?this.icon="search-large":Dt(this.$el,".uk-search-navbar").length&&(this.icon="search-navbar")}}),n("close",{init:function(){this.icon="close-"+(be(this.$el,"uk-close-large")?"large":"icon")}}),n("spinner",{connected:function(){var t=this;this.svg.then(function(e){return 1!==t.ratio&&Ie(Le("circle",e),"stroke-width",1/t.ratio)},R)}}),t.icon.add=function(n){Object.keys(n).forEach(function(t){i[t]=n[t],delete e[t]}),t._initialized&&F(t.instances,function(t){"icon"===t.$options.name&&t.$reset()})}}function bn(t){t.component("leader",{mixins:[zi],props:{fill:String,media:"media"},defaults:{fill:"",media:!1,clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){var e=t.fill;return e||Se("leader-fill")}},connected:function(){var t;t=ue(this.$el,'<span class="'+this.clsWrapper+'">'),this.wrapper=t[0]},disconnected:function(){ce(this.wrapper.childNodes)},update:[{read:function(t){var e=t.changed,i=t.width,n=i;return{width:i=Math.floor(this.$el.offsetWidth/2),changed:e||n!==i,hide:this.media&&!ot.matchMedia(this.media).matches}},write:function(t){ye(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,X(this.wrapper,this.attrFill,new Array(t.width).join(this.fill)))},events:["load","resize"]}]})}function yn(t){t.component("margin",{props:{margin:String,firstColumn:Boolean},defaults:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(t){var e=this.$el.children;if(!e.length||!Ht(this.$el))return t.rows=!1;t.stacks=!0;for(var i=[[]],n=0;n<e.length;n++){var o=e[n],r=o.getBoundingClientRect();if(r.height)for(var s=i.length-1;s>=0;s--){var a=i[s];if(!a[0]){a.push(o);break}var l=a[0].getBoundingClientRect();if(r.top>=Math.floor(l.bottom)){i.push([o]);break}if(Math.floor(r.bottom)>l.top){if(t.stacks=!1,r.left<l.left&&!at){a.unshift(o);break}a.push(o);break}if(0===s){i.unshift([o]);break}}}t.rows=i},write:function(t){var e=this;t.rows.forEach(function(t,i){return t.forEach(function(t,n){ye(t,e.margin,0!==i),ye(t,e.firstColumn,0===n)})})},events:["load","resize"]}})}function xn(t){t.component("modal",{mixins:[ji],defaults:{clsPage:"uk-modal-page",clsPanel:"uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){be(this.panel,"uk-margin-auto-vertical")?me(this.$el,"uk-flex"):Ie(this.$el,"display","block"),Xe(this.$el)}},{name:"hidden",self:!0,handler:function(){Ie(this.$el,"display",""),ge(this.$el,"uk-flex")}}]}),t.component("overflow-auto",{mixins:[zi],computed:{modal:function(t,e){return Nt(e,".uk-modal")},panel:function(t,e){return Nt(e,".uk-modal-dialog")}},connected:function(){Ie(this.$el,"minHeight",150)},update:{write:function(){if(this.panel&&this.modal){var t=Ie(this.$el,"maxHeight");Ie(Ie(this.$el,"maxHeight",150),"maxHeight",Math.max(150,150+Xe(this.modal)-this.panel.offsetHeight)),t!==Ie(this.$el,"maxHeight")&&Yt(this.$el,"resize")}},events:["load","resize"]}}),t.modal.dialog=function(e,i){var n=t.modal(' <div class="uk-modal"> <div class="uk-modal-dialog">'+e+"</div> </div> ",i);return n.show(),Ft(n.$el,"hidden",function(t){t.target===t.currentTarget&&n.$destroy(!0)}),n},t.modal.alert=function(e,i){return i=j({bgClose:!1,escClose:!1,labels:t.modal.labels},i),new K(function(n){return Ft(t.modal.dialog(' <div class="uk-modal-body">'+(S(e)?e:ne(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+i.labels.ok+"</button> </div> ",i).$el,"hide",n)})},t.modal.confirm=function(e,i){return i=j({bgClose:!1,escClose:!0,labels:t.modal.labels},i),new K(function(n,o){var r=t.modal.dialog(' <form> <div class="uk-modal-body">'+(S(e)?e:ne(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+i.labels.cancel+'</button> <button class="uk-button uk-button-primary" autofocus>'+i.labels.ok+"</button> </div> </form> ",i),s=!1;Ft(r.$el,"submit","form",function(t){t.preventDefault(),n(),s=!0,r.hide()}),Ft(r.$el,"hide",function(){s||o()})})},t.modal.prompt=function(e,i,n){return n=j({bgClose:!1,escClose:!0,labels:t.modal.labels},n),new K(function(o){var r=t.modal.dialog(' <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(S(e)?e:ne(e))+'</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+n.labels.cancel+'</button> <button class="uk-button uk-button-primary">'+n.labels.ok+"</button> </div> </form> ",n),s=Le("input",r.$el);s.value=i;var a=!1;Ft(r.$el,"submit","form",function(t){t.preventDefault(),o(s.value),a=!0,r.hide()}),Ft(r.$el,"hide",function(){a||o(null)})})},t.modal.labels={ok:"Ok",cancel:"Cancel"}}function kn(t){t.component("nav",t.components.accordion.extend({name:"nav",defaults:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}}))}function $n(t){t.component("navbar",{mixins:[zi],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:"query",duration:Number},defaults:{dropdown:".uk-navbar-nav > li",align:at?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200},computed:{boundary:function(t,e){var i=t.boundary,n=t.boundaryAlign;return!0===i||n?e:i},pos:function(t){return"bottom-"+t.align}},beforeConnect:function(){var t=this.$props.dropbar;this.dropbar=t&&(S(t)&&bt(t,this.$el)||Le("<div></div>")),this.dropbar&&(me(this.dropbar,"uk-navbar-dropbar"),"slide"===this.dropbarMode&&me(this.dropbar,"uk-navbar-dropbar-slide"))},disconnected:function(){this.dropbar&&le(this.dropbar)},update:function(){t.drop(je(this.dropdown+" ."+this.clsDrop,this.$el).filter(function(e){return!t.getComponent(e,"drop")&&!t.getComponent(e,"dropdown")}),j({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,i=this.getActive();i&&i.toggle&&!jt(i.toggle.$el,e)&&!i.tracker.movesTo(i.$el)&&i.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!_t(this.dropbar,":hover")&&t.hide()}},{name:"beforeshow",capture:!0,filter:function(){return this.dropbar},handler:function(){this.dropbar.parentNode||se(this.dropbarAnchor||this.$el,this.dropbar)}},{name:"show",capture:!0,filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el;this.clsDrop&&me(i,this.clsDrop+"-dropbar"),this.transitionTo(i.offsetHeight+B(Ie(i,"margin-top"))+B(Ie(i,"margin-bottom")),i)}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();_t(this.dropbar,":hover")&&n&&n.$el===i&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();(!n||n&&n.$el===i)&&this.transitionTo(0)}}],methods:{getActive:function(){var e=t.drop.getActive();return e&&v(e.mode,"hover")&&jt(e.toggle.$el,this.$el)&&e},transitionTo:function(t,e){var i=this.dropbar,n=Ht(i)?Xe(i):0;return Ie(e=n<t&&e,{height:n,overflow:"hidden"}),Xe(i,n),Be.cancel([e,i]),Be.start([e,i],{height:t},this.duration).catch(R).finally(function(){return Ie(e,{height:"",overflow:""})})}}})}function In(t){t.component("offcanvas",{mixins:[ji],args:"mode",props:{content:String,mode:String,flip:Boolean,overlay:Boolean},defaults:{content:".uk-offcanvas-content",mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",clsPanel:"uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContent:"uk-offcanvas-content",clsContentAnimation:"uk-offcanvas-content-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close"},computed:{content:function(t){var e=t.content;return Le(e)||rt.body},clsFlip:function(t){var e=t.flip,i=t.clsFlip;return e?i:""},clsOverlay:function(t){var e=t.overlay,i=t.clsOverlay;return e?i:""},clsMode:function(t){var e=t.mode,i=t.clsMode;return i+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,i=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":i},clsContentAnimation:function(t){var e=t.mode,i=t.clsContentAnimation;return"push"!==e&&"reveal"!==e?"":i},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},update:{write:function(){this.getActive()===this&&((this.overlay||this.clsContentAnimation)&&Je(this.content,Je(ot)-this.scrollbarWidth),this.overlay&&(Xe(this.content,Xe(ot)),tn&&(this.content.scrollTop=tn.y)))},events:["resize"]},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current;e.hash&&Le(e.hash,this.content)&&(tn=null,this.hide())}},{name:"beforescroll",filter:function(){return this.overlay},handler:function(t,e,i){e&&i&&this.isToggled()&&Le(i,this.content)&&(Rt(this.$el,"hidden",function(){return e.scrollTo(i)}),t.preventDefault())}},{name:"show",self:!0,handler:function(){tn=tn||{x:ot.pageXOffset,y:ot.pageYOffset},"reveal"!==this.mode||be(this.panel,this.clsMode)||(he(this.panel,"<div>"),me(this.panel.parentNode,this.clsMode)),Ie(st,"overflowY",(!this.clsContentAnimation||this.flip)&&this.scrollbarWidth&&this.overlay?"scroll":""),me(rt.body,this.clsContainer,this.clsFlip,this.clsOverlay),Xe(rt.body),me(this.content,this.clsContentAnimation),me(this.panel,this.clsSidebarAnimation+" "+("reveal"!==this.mode?this.clsMode:"")),me(this.$el,this.clsOverlay),Ie(this.$el,"display","block"),Xe(this.$el)}},{name:"hide",self:!0,handler:function(){ge(this.content,this.clsContentAnimation);var t=this.getActive();("none"===this.mode||t&&t!==this&&t!==this.prev)&&Yt(this.panel,"transitionend")}},{name:"hidden",self:!0,handler:function(){if("reveal"===this.mode&&ce(this.panel),this.overlay){if(!tn){var t=this.content,e=t.scrollLeft,i=t.scrollTop;tn={x:e,y:i}}}else tn={x:ot.pageXOffset,y:ot.pageYOffset};ge(this.panel,this.clsSidebarAnimation,this.clsMode),ge(this.$el,this.clsOverlay),Ie(this.$el,"display",""),ge(rt.body,this.clsContainer,this.clsFlip,this.clsOverlay),rt.body.scrollTop=tn.y,Ie(st,"overflow-y",""),Je(this.content,""),Xe(this.content,""),ot.scrollTo(tn.x,tn.y),tn=null}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&Ti(t)&&("swipeLeft"===t.type&&!this.flip||"swipeRight"===t.type&&this.flip)&&this.hide()}}]})}function Tn(t){t.component("responsive",{props:["width","height"],init:function(){me(this.$el,"uk-responsive-width")},update:{read:function(){return!!(Ht(this.$el)&&this.width&&this.height)&&{width:Je(this.$el.parentNode),height:this.height}},write:function(t){Xe(this.$el,U.contain({height:this.height,width:this.width},t).height)},events:["load","resize"]}})}function Cn(t){t.component("scroll",{props:{duration:Number,offset:Number},defaults:{duration:1e3,offset:0},methods:{scrollTo:function(t){var e=this;t=t&&Le(t)||rt.body;var i=Xe(rt),n=Xe(ot),o=Ye(t).top-this.offset;if(o+n>i&&(o=i-n),Yt(this.$el,"beforescroll",[this,t])){var r=Date.now(),s=ot.pageYOffset,a=function(){var i,n=s+(o-s)*(i=V((Date.now()-r)/e.duration),.5*(1-Math.cos(Math.PI*i)));ot.scrollTo(ot.pageXOffset,n),n!==o?requestAnimationFrame(a):Yt(e.$el,"scrolled",[e,t])};a()}}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(Bt(this.$el.hash).substr(1)))}}})}function En(t){t.component("scrollspy",{args:"cls",props:{cls:"list",target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},defaults:{cls:[],target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"},computed:{elements:function(t,e){var i=t.target;return i?je(i,e):[e]}},update:[{write:function(){this.hidden&&Ie(Lt(this.elements,":not(."+this.inViewClass+")"),"visibility","hidden")}},{read:function(e){var i=this;if(!t._initialized)return"complete"===rt.readyState&&requestAnimationFrame(function(){return i.$emit()}),!1;this.elements.forEach(function(t,n){var o=e[n];if(!o||o.el!==t){var r=Q(t,"uk-scrollspy-class");o={el:t,toggles:r&&r.split(",")||i.cls}}o.show=ii(t,i.offsetTop,i.offsetLeft),e[n]=o})},write:function(e){var i=this,n=1===this.elements.length?1:0;this.elements.forEach(function(o,r){var s=e[r],a=s.toggles[r]||s.toggles[0];if(!s.show||s.inview||s.timer)!s.show&&s.inview&&i.repeat&&(s.timer&&(clearTimeout(s.timer),delete s.timer),Ie(o,"visibility",i.hidden?"hidden":""),ge(o,i.inViewClass),ye(o,a),Yt(o,"outview"),t.update(null,o),s.inview=!1);else{var l=function(){Ie(o,"visibility",""),me(o,i.inViewClass),ye(o,a),Yt(o,"inview"),t.update(null,o),s.inview=!0,delete s.timer};i.delay&&n?s.timer=setTimeout(l,i.delay*n):l(),n++}})},events:["scroll","load","resize"]}]})}function Sn(t){t.component("scrollspy-nav",{props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},defaults:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:function(t,e){return je('a[href^="#"]',e).filter(function(t){return t.hash})},elements:function(){return this.closest?Nt(this.links,this.closest):this.links},targets:function(){return je(this.links.map(function(t){return t.hash}).join(","))}},update:[{read:function(){this.scroll&&t.scroll(this.links,{offset:this.offset||0})}},{read:function(t){var e=this,i=ot.pageYOffset+this.offset+1,n=Xe(rt)-Xe(ot)+this.offset;t.active=!1,this.targets.every(function(o,r){var s=Ye(o).top,a=r+1===e.targets.length;if(!e.overflow&&(0===r&&s>i||a&&s+o.offsetTop<i))return!1;if(!a&&Ye(e.targets[r+1]).top<=i)return!0;if(i>=n)for(var l=e.targets.length-1;l>r;l--)if(ii(e.targets[l])){o=e.targets[l];break}return!(t.active=Le(Lt(e.links,'[href="#'+o.id+'"]')))})},write:function(t){var e=t.active;this.links.forEach(function(t){return t.blur()}),ge(this.elements,this.cls),e&&Yt(this.$el,"active",[e,me(this.closest?Nt(e,this.closest):e,this.cls)])},events:["scroll","load","resize"]}]})}function _n(t){function e(t,e){var i=e.$props,n=e.$el,o=e[t+"Offset"],r=i[t];if(r){if(A(r))return o+B(r);if(S(r)&&r.match(/^-?\d+vh$/))return Xe(ot)*B(r)/100;var s=!0===r?n.parentNode:bt(r,n);return s?Ye(s).top+s.offsetHeight:void 0}}t.component("sticky",{mixins:[zi],attrs:!0,props:{top:null,bottom:Boolean,offset:Number,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:"query",showOnUp:Boolean,media:"media",target:Number},defaults:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,media:!1,target:!1},computed:{selTarget:function(t,e){var i=t.selTarget;return i&&Le(i,e)||e}},connected:function(){this.placeholder=Le('<div class="uk-sticky-placeholder"></div>'),this.widthElement=this.$props.widthElement||this.placeholder,this.isActive||this.hide()},disconnected:function(){this.isActive&&(this.isActive=!1,this.hide(),ge(this.selTarget,this.clsInactive)),le(this.placeholder),this.placeholder=null,this.widthElement=null},ready:function(){var t=this;if(this.target&&location.hash&&ot.pageYOffset>0){var e=Le(location.hash);e&&si.read(function(){var i=Ye(e).top,n=Ye(t.$el).top,o=t.$el.offsetHeight;n+o>=i&&n<=i+e.offsetHeight&&ot.scrollTo(0,i-o-t.target-t.offset)})}},events:[{name:"active",self:!0,handler:function(){we(this.selTarget,this.clsInactive,this.clsActive)}},{name:"inactive",self:!0,handler:function(){we(this.selTarget,this.clsActive,this.clsInactive)}}],update:[{write:function(){var t=this.placeholder,i=(this.isActive?t:this.$el).offsetHeight;Ie(t,j({height:"absolute"!==Ie(this.$el,"position")?i:""},Ie(this.$el,["marginTop","marginBottom","marginLeft","marginRight"]))),jt(t,st)||(se(this.$el,t),X(t,"hidden","")),X(this.widthElement,"hidden",null),this.width=this.widthElement.offsetWidth,X(this.widthElement,"hidden",this.isActive?null:""),this.topOffset=Ye(this.isActive?t:this.$el).top,this.bottomOffset=this.topOffset+i;var n=e("bottom",this);this.top=Math.max(B(e("top",this)),this.topOffset)-this.offset,this.bottom=n&&n-i,this.inactive=this.media&&!ot.matchMedia(this.media).matches,this.isActive&&this.update()},events:["load","resize"]},{read:function(t,e){var i=e.scrollY;return void 0===i&&(i=ot.pageYOffset),{scroll:this.scroll=i,visible:Ht(this.$el)}},write:function(t,e){var i=this,n=t.visible,o=t.scroll;void 0===e&&(e={});var r=e.dir;if(!(o<0||!n||this.disabled||this.showOnUp&&!r))if(this.inactive||o<this.top||this.showOnUp&&(o<=this.top||"down"===r||"up"===r&&!this.isActive&&o<=this.bottomOffset)){if(!this.isActive)return;this.isActive=!1,this.animation&&o>this.topOffset?(We.cancel(this.$el),We.out(this.$el,this.animation).then(function(){return i.hide()},R)):this.hide()}else this.isActive?this.update():this.animation?(We.cancel(this.$el),this.show(),We.in(this.$el,this.animation).catch(R)):this.show()},events:["scroll"]}],methods:{show:function(){this.isActive=!0,this.update(),X(this.placeholder,"hidden",null)},hide:function(){this.isActive&&!be(this.selTarget,this.clsActive)||Yt(this.$el,"inactive"),ge(this.$el,this.clsFixed,this.clsBelow),Ie(this.$el,{position:"",top:"",width:""}),X(this.placeholder,"hidden","")},update:function(){var t=0!==this.top||this.scroll>this.top,e=Math.max(0,this.offset);this.bottom&&this.scroll>this.bottom-this.offset&&(e=this.bottom-this.scroll),Ie(this.$el,{position:"fixed",top:e+"px",width:this.width}),be(this.selTarget,this.clsActive)?t||Yt(this.$el,"inactive"):t&&Yt(this.$el,"active"),ye(this.$el,this.clsBelow,this.scroll>this.bottomOffset),me(this.$el,this.clsFixed)}}})}var An,Nn,Dn={};function Mn(t){t.component("svg",{attrs:!0,props:{id:String,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String},defaults:{ratio:1,id:!1,exclude:["src"],class:""},init:function(){this.class+=" uk-svg"},connected:function(){var t=this;if(!this.icon&&v(this.src,"#")){var n,o=this.src.split("#");if(o.length>1)n=o,this.src=n[0],this.icon=n[1]}this.svg=this.getSvg().then(function(n){var o;if(S(n)?(t.icon&&v(n,"<symbol")&&(n=function(t,n){if(!i[t]){var o;for(i[t]={};o=e.exec(t);)i[t][o[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+o[1]+"svg>"}return i[t][n]}(n,t.icon)||n),o=Le(n.substr(n.indexOf("<svg")))):o=n.cloneNode(!0),!o)return K.reject("SVG not found.");var r=X(o,"viewBox");for(var s in r&&(r=r.split(" "),t.width=t.$props.width||r[2],t.height=t.$props.height||r[3]),t.width*=t.ratio,t.height*=t.ratio,t.$options.props)t[s]&&!v(t.exclude,s)&&X(o,s,t[s]);t.id||G(o,"id"),t.width&&!t.height&&G(o,"height"),t.height&&!t.width&&G(o,"width");var a=t.$el;if(Pt(a)||"CANVAS"===a.tagName){X(a,{hidden:!0,id:null});var l=a.nextElementSibling;l&&o.isEqualNode(l)?o=l:se(a,o)}else{var h=a.lastElementChild;h&&o.isEqualNode(h)?o=h:oe(a,o)}return t.svgEl=o,o},R)},disconnected:function(){var t=this;Pt(this.$el)&&X(this.$el,{hidden:null,id:this.id||null}),this.svg&&this.svg.then(function(e){return(!t._connected||e!==t.svgEl)&&le(e)},R),this.svg=this.svgEl=null},methods:{getSvg:function(){var t=this;return this.src?Dn[this.src]?Dn[this.src]:(Dn[this.src]=new K(function(e,i){c(t.src,"data:")?e(decodeURIComponent(t.src.split(",")[1])):Zt(t.src).then(function(t){return e(t.response)},function(){return i("SVG not found.")})}),Dn[this.src]):K.reject()}}});var e=/<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,i={}}function Bn(t){t.component("switcher",{mixins:[Li],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},defaults:{connect:"~.uk-switcher",toggle:"> *",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item",queued:!0},computed:{connects:function(t,e){return yt(t.connect,e)},toggles:function(t,e){return je(t.toggle,e)}},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),this.show(t.current)}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(Q(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){Ti(t)&&(t.preventDefault(),ot.getSelection().toString()||this.show("swipeLeft"===t.type?"next":"previous"))}}],update:function(){var t=this;this.connects.forEach(function(e){return t.updateAria(e.children)}),this.show(Lt(this.toggles,"."+this.cls)[0]||this.toggles[this.active]||this.toggles[0])},methods:{show:function(t){for(var e,i=this,n=this.toggles.length,o=!!this.connects.length&&te(Lt(this.connects[0].children,"."+this.cls)[0]),r=o>=0,s="previous"===t?-1:1,a=ee(t,this.toggles,o),l=0;l<n;l++,a=(a+s+n)%n)if(!_t(i.toggles[a],".uk-disabled, [disabled]")){e=i.toggles[a];break}!e||o>=0&&be(e,this.cls)||o===a||(ge(this.toggles,this.cls),X(this.toggles,"aria-expanded",!1),me(e,this.cls),X(e,"aria-expanded",!0),this.connects.forEach(function(t){r?i.toggleElement([t.children[o],t.children[a]]):i.toggleNow(t.children[a])}))}}})}function On(t){t.component("tab",t.components.switcher.extend({mixins:[zi],name:"tab",props:{media:"media"},defaults:{media:960,attrItem:"uk-tab-item"},init:function(){var e=be(this.$el,"uk-tab-left")?"uk-tab-left":!!be(this.$el,"uk-tab-right")&&"uk-tab-right";e&&t.toggle(this.$el,{cls:e,mode:"media",media:this.media})}}))}function Pn(t){t.component("toggle",{mixins:[t.mixin.togglable],args:"target",props:{href:String,target:null,mode:"list",media:"media"},defaults:{href:!1,target:!1,mode:"click",queued:!0,media:!1},computed:{target:function(t,e){var i=t.href,n=t.target;return n=yt(n||i,e),n.length&&n||[e]}},events:[{name:mt+" "+gt,filter:function(){return v(this.mode,"hover")},handler:function(t){Ti(t)||this.toggle("toggle"+(t.type===mt?"show":"hide"))}},{name:"click",filter:function(){return v(this.mode,"click")||ct},handler:function(t){var e;(Ti(t)||v(this.mode,"click"))&&((Nt(t.target,'a[href="#"], button')||(e=Nt(t.target,"a[href]"))&&(this.cls||!Ht(this.target)||e.hash&&_t(this.target,e.hash)))&&Rt(rt,"click",function(t){return t.preventDefault()}),this.toggle())}}],update:{write:function(){if(v(this.mode,"media")&&this.media){var t=this.isToggled(this.target);(ot.matchMedia(this.media).matches?!t:t)&&this.toggle()}},events:["load","resize"]},methods:{toggle:function(t){Yt(this.target,t||"toggle",[this])&&this.toggleElement(this.target)}}})}function Hn(t){t.component("video",{props:{automute:Boolean,autoplay:Boolean},defaults:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},ready:function(){this.player=new gi(this.$el),this.automute&&this.player.mute()},update:[{read:function(t,e){var i=e.type;return!(!this.player||!("scroll"!==i&&"resize"!==i||this.inView))&&{visible:Ht(this.$el)&&"hidden"!==Ie(this.$el,"visibility"),inView:this.inView&&ii(this.$el)}},write:function(t){var e=t.visible,i=t.inView;!e||this.inView&&!i?this.player.pause():(!0===this.autoplay||this.inView&&i)&&this.player.play()},events:["load","resize","scroll"]}]})}function zn(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),"translateX("+t+(t?e:"")+")"}function Wn(t){return"scale3d("+t+", "+t+", 1)"}function Ln(t){if(!Ln.installed){var e,i,n,o,r,s,a,l,h,u,c,d,f,p,m,g,v,w,b,y,x,k,$,I,T,C,E,S=t.util,_=S.$,A=S.assign,N=S.clamp,D=S.fastdom,M=S.getIndex,B=S.hasClass,O=S.isNumber,P=S.isRtl,H=S.Promise,z=S.toNodes,W=S.trigger;t.mixin.slider={attrs:!0,mixins:[(I=t,T=I.util,C=T.doc,E=T.pointerDown,{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},defaults:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.startAutoplay()},disconnected:function(){this.stopAutoplay()},events:[{name:"visibilitychange",el:C,handler:function(){C.hidden?this.stopAutoplay():this.startAutoplay()}},{name:E,handler:"stopAutoplay"},{name:"mouseenter",filter:function(){return this.autoplay},handler:function(){this.isHovering=!0}},{name:"mouseleave",filter:function(){return this.autoplay},handler:function(){this.isHovering=!1}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.autoplay&&(this.interval=setInterval(function(){return!(t.isHovering&&t.pauseOnHover)&&!t.stack.length&&t.show("next")},this.autoplayInterval))},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}}),(h=t,u=h.util,c=u.doc,d=u.getPos,f=u.includes,p=u.isRtl,m=u.isTouch,g=u.off,v=u.on,w=u.pointerDown,b=u.pointerMove,y=u.pointerUp,x=u.preventClick,k=u.trigger,$=u.win,{defaults:{threshold:10,preventCatch:!1},init:function(){var t=this;["start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){var n=d(e).x*(p?-1:1);t.prevPos=n!==t.pos?t.pos:t.prevPos,t.pos=n,i(e)}})},events:[{name:w,delegate:function(){return this.slidesSelector},handler:function(t){var e;!m(t)&&!(e=t.target).children.length&&e.childNodes.length||t.button>0||this.length<2||this.preventCatch||this.start(t)}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(){this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.translate(this.percent),this._transitioner.cancel(),this.dragging=!0,this.stack=[]):this.prevIndex=this.index,this.unbindMove=v(c,b,this.move,{capture:!0,passive:!1}),v($,"scroll",this.unbindMove),v(c,y,this.end,!0)},move:function(t){var e=this,i=this.pos-this.drag;if(!(0===i||this.prevPos===this.pos||!this.dragging&&Math.abs(i)<this.threshold)){t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=i<0?1:-1;for(var n=this.slides,o=this.prevIndex,r=Math.abs(i),s=this.getIndex(o+this.dir,o),a=this._getDistance(o,s)||n[o].offsetWidth;s!==o&&r>a;)e.drag-=a*e.dir,o=s,r-=a,s=e.getIndex(o+e.dir,o),a=e._getDistance(o,s)||n[o].offsetWidth;this.percent=r/a;var l,h=n[o],u=n[s],c=this.index!==s,d=o===s;[this.index,this.prevIndex].filter(function(t){return!f([s,o],t)}).forEach(function(t){k(n[t],"itemhidden",[e]),l=!0,d&&(e.prevIndex=o)}),(this.index===o&&this.prevIndex!==o||l&&d)&&k(n[this.index],"itemshown",[this]),c&&(this.prevIndex=o,this.index=s,!d&&k(h,"beforeitemhide",[this]),k(u,"beforeitemshow",[this])),(l||this.length<3)&&this._transitioner&&this._transitioner.reset(),this._transitioner=this._translate(Math.abs(this.percent),h,!d&&u),c&&(!d&&k(h,"itemhide",[this]),k(u,"itemshow",[this]))}},end:function(){if(g($,"scroll",this.unbindMove),this.unbindMove(),g(c,y,this.end,!0),this.dragging){if(this.dragging=null,this.index===this.prevIndex)this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null;else{var t=(p?this.dir*(p?1:-1):this.dir)<0==this.prevPos>this.pos;this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(this.dir>0&&!t||this.dir<0&&t?"next":"previous",!0)}x()}this.drag=this.percent=null}}}),(e=t,i=e.util,n=i.$,o=i.$$,r=i.data,s=i.html,a=i.toggleClass,l=i.toNumber,{defaults:{selNav:!1},computed:{nav:function(t,e){var i=t.selNav;return n(i,e)},navItemSelector:function(t){var e=t.attrItem;return"["+e+"],[data-"+e+"]"},navItems:function(t,e){return o(this.navItemSelector,e)}},update:[{write:function(){var t=this;this.nav&&this.length!==this.nav.children.length&&s(this.nav,this.slides.map(function(e,i){return"<li "+t.attrItem+'="'+i+'"><a href="#"></a></li>'}).join("")),a(o(this.navItemSelector,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex),this.updateNav()},events:["load","resize"]}],events:[{name:"click",delegate:function(){return this.navItemSelector},handler:function(t){t.preventDefault(),t.current.blur(),this.show(r(t.current,this.attrItem))}},{name:"itemshow",handler:"updateNav"}],methods:{updateNav:function(){var t=this,e=this.getValidIndex();this.navItems.forEach(function(i){var n=r(i,t.attrItem);a(i,t.clsActive,l(n)===e),a(i,"uk-invisible",t.finite&&("previous"===n&&0===e||"next"===n&&e>=t.maxIndex))})}}})],props:{clsActivated:Boolean,easing:String,index:Number,finite:Boolean,velocity:Number},defaults:{easing:"ease",finite:!1,velocity:1,index:0,stack:[],percent:0,clsActive:"uk-active",clsActivated:!1,Transitioner:!1,transitionOptions:{}},computed:{duration:function(t,e){var i=t.velocity;return jn(e.offsetWidth/i)},length:function(){return this.slides.length},list:function(t,e){var i=t.selList;return _(i,e)},maxIndex:function(){return this.length-1},slidesSelector:function(t){return t.selList+" > *"},slides:function(){return z(this.list.children)}},methods:{show:function(t,e){var i=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var n=this.stack,o=e?0:n.length,r=function(){n.splice(o,1),n.length&&i.show(n.shift(),!0)};if(n[e?"unshift":"push"](t),!e&&n.length>1)2===n.length&&this._transitioner.forward(Math.min(this.duration,200));else{var s=this.index,a=B(this.slides,this.clsActive)&&this.slides[s],l=this.getIndex(t,this.index),h=this.slides[l];if(a!==h){var u;if(this.dir="next"===(u=t)?1:"previous"===u?-1:u<s?-1:1,this.prevIndex=s,this.index=l,a&&W(a,"beforeitemhide",[this]),!W(h,"beforeitemshow",[this,a]))return this.index=this.prevIndex,void r();var c=this._show(a,h,e).then(function(){return a&&W(a,"itemhidden",[i]),W(h,"itemshown",[i]),new H(function(t){D.write(function(){n.shift(),n.length?i.show(n.shift(),!0):i._transitioner=null,t()})})});return a&&W(a,"itemhide",[this]),W(h,"itemshow",[this]),c}r()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),N(M(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,i){if(this._transitioner=this._getTransitioner(t,e,this.dir,A({easing:i?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!i&&!t)return this._transitioner.translate(1),H.resolve();var n=this.stack.length;return this._transitioner[n>1?"forward":"show"](n>1?Math.min(this.duration,75+75/(n-1)):this.duration,this.percent)},_getDistance:function(t,e){return new this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,i){void 0===e&&(e=this.prevIndex),void 0===i&&(i=this.index);var n=this._getTransitioner(e!==i&&e,i);return n.translate(t),n},_getTransitioner:function(t,e,i,n){return void 0===t&&(t=this.prevIndex),void 0===e&&(e=this.index),void 0===i&&(i=this.dir||1),void 0===n&&(n=this.transitionOptions),new this.Transitioner(O(t)?this.slides[t]:t,O(e)?this.slides[e]:e,i*(P?-1:1),n)}}}}}function jn(t){return.5*t+300}function Fn(t){if(!Fn.installed){t.use(Ln);var e,i,n=t.mixin,o=t.util,r=o.addClass,s=o.assign,a=o.fastdom,l=o.isNumber,h=o.removeClass,u=(e=t.util.css,i={slide:{show:function(t){return[{transform:zn(-100*t)},{transform:zn()}]},percent:function(t){return i.translated(t)},translate:function(t,e){return[{transform:zn(-100*e*t)},{transform:zn(100*e*(1-t))}]}},translated:function(t){return Math.abs(e(t,"transform").split(",")[4]/t.offsetWidth)||0}}),c=function(t){var e=t.util,i=e.createEvent,n=e.clamp,o=e.css,r=e.Deferred,s=e.noop,a=e.Promise,l=e.Transition,h=e.trigger;function u(t,e,n){h(t,i(e,!1,!1,n))}return function(t,e,i,h){var c=h.animation,d=h.easing,f=c.percent,p=c.translate,m=c.show;void 0===m&&(m=s);var g=m(i),v=new r;return{dir:i,show:function(o,r,h){var c=this;void 0===r&&(r=0);var f=h?"linear":d;return o-=Math.round(o*n(r,-1,1)),this.translate(r),u(e,"itemin",{percent:r,duration:o,timing:f,dir:i}),u(t,"itemout",{percent:1-r,duration:o,timing:f,dir:i}),a.all([l.start(e,g[1],o,f),l.start(t,g[0],o,f)]).then(function(){c.reset(),v.resolve()},s),v.promise},stop:function(){return l.stop([e,t])},cancel:function(){l.cancel([e,t])},reset:function(){for(var i in g[0])o([e,t],i,"")},forward:function(i,n){return void 0===n&&(n=this.percent()),l.cancel([e,t]),this.show(i,n,!0)},translate:function(n){var r=p(n,i);o(e,r[1]),o(t,r[0]),u(e,"itemtranslatein",{percent:n,dir:i}),u(t,"itemtranslateout",{percent:1-n,dir:i})},percent:function(){return f(t||e,e,i)},getDistance:function(){return t.offsetWidth}}}}(t);t.mixin.slideshow={mixins:[n.slider],props:{animation:String},defaults:{animation:"slide",clsActivated:"uk-transition-active",Animations:u,Transitioner:c},computed:{animation:function(t){var e=t.animation,i=t.Animations;return s(e in i?i[e]:i.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(e){var i=e.target;t.update(null,i)},itemshow:function(){l(this.prevIndex)&&a.flush()},beforeitemshow:function(t){var e=t.target;r(e,this.clsActive)},itemshown:function(t){var e=t.target;r(e,this.clsActivated)},itemhidden:function(t){var e=t.target;h(e,this.clsActive,this.clsActivated)}}}}}function Vn(t){if(!Vn.installed){t.use(Fn);var e,i,n,o,r,s=t.mixin,a=t.util,l=a.$,h=a.addClass,u=a.ajax,c=a.append,d=a.assign,f=a.attr,p=a.css,m=a.doc,g=a.getImage,v=a.html,w=a.index,b=a.on,y=a.pointerDown,x=a.pointerMove,k=a.removeClass,$=a.Transition,I=a.trigger,T=(i=(e=t).mixin,n=e.util,o=n.assign,r=n.css,o({},i.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-r(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Wn(.8)},{opacity:1,transform:Wn(1)}]},percent:function(t){return 1-r(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Wn(1-.2*t)},{opacity:t,transform:Wn(.8+.2*t)}]}}}));t.component("lightbox-panel",{mixins:[s.container,s.modal,s.togglable,s.slideshow],functional:!0,defaults:{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",pauseOnHover:!1,velocity:2,Animations:T,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href="#" uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href="#" uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'},created:function(){var t=this;this.$mount(c(this.container,this.template)),this.caption=l(".uk-lightbox-caption",this.$el),this.items.forEach(function(){return c(t.list,"<li></li>")})},events:[{name:x+" "+y+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.slidesSelector},handler:function(t){t.preventDefault(),this.hide()}},{name:"shown",self:!0,handler:"showControls"},{name:"hide",self:!0,handler:function(){this.hideControls(),k(this.slides,this.clsActive),$.stop(this.slides)}},{name:"keyup",el:function(){return m},handler:function(t){if(this.isToggled(this.$el))switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.preventCatch=!0,t.preventDefault(),this.toggleNow(this.$el,!0),this.animation=T.scale,k(t.target,this.clsActive),this.stack.splice(1,0,this.index))}},{name:"itemshow",handler:function(t){var e=t.target,i=w(e),n=this.getItem(i).caption;p(this.caption,"display",n?"":"none"),v(this.caption,n);for(var o=0;o<=this.preload;o++)this.loadItem(this.getIndex(i+o)),this.loadItem(this.getIndex(i-o))}},{name:"itemshown",handler:function(){this.preventCatch=!1}},{name:"itemload",handler:function(t,e){var i,n=this,o=e.source,r=e.type,s=e.alt;if(this.setItem(e,"<span uk-spinner></span>"),o)if("image"===r||o.match(/\.(jp(e)?g|png|gif|svg)$/i))g(o).then(function(t){return n.setItem(e,'<img width="'+t.width+'" height="'+t.height+'" src="'+o+'" alt="'+(s||"")+'">')},function(){return n.setError(e)});else if("video"===r||o.match(/\.(mp4|webm|ogv)$/i)){var a=l("<video controls playsinline"+(e.poster?' poster="'+e.poster+'"':"")+' uk-video="autoplay: '+this.videoAutoplay+'"></video>');f(a,"src",o),b(a,"error",function(){return n.setError(e)}),b(a,"loadedmetadata",function(){f(a,{width:a.videoWidth,height:a.videoHeight}),n.setItem(e,a)})}else if("iframe"===r)this.setItem(e,'<iframe class="uk-lightbox-iframe" src="'+o+'" frameborder="0" allowfullscreen></iframe>');else if(i=o.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/)||o.match(/()youtu\.be\/(.*)/)){var h=i[2],c=function(t,o){return void 0===t&&(t=640),void 0===o&&(o=450),n.setItem(e,C("//www.youtube"+(i[1]||"")+".com/embed/"+h,t,o,n.videoAutoplay))};g("//img.youtube.com/vi/"+h+"/maxresdefault.jpg").then(function(t){var e=t.width,i=t.height;120===e&&90===i?g("//img.youtube.com/vi/"+h+"/0.jpg").then(function(t){var e=t.width,i=t.height;return c(e,i)},c):c(e,i)},c)}else(i=o.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))&&u("//vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(o),{responseType:"json"}).then(function(t){var o=t.response,r=o.height,s=o.width;return n.setItem(e,C("//player.vimeo.com/video/"+i[2],s,r,n.videoAutoplay))})}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);var e=this.getItem(t);e.content||I(this.$el,"itemload",[e])},getItem:function(t){return void 0===t&&(t=this.index),this.items[t]||{}},setItem:function(e,i){d(e,{content:i});var n=v(this.slides[this.items.indexOf(e)],i);I(this.$el,"itemloaded",[this,n]),t.update(null,n)},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),h(this.$el,"uk-active","uk-transition-active")},hideControls:function(){k(this.$el,"uk-active","uk-transition-active")}}})}function C(t,e,i,n){return'<iframe src="'+t+'" width="'+e+'" height="'+i+'" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: '+n+'" uk-responsive></iframe>'}}function Rn(t){if(!Rn.installed){var e=t.mixin,i=t.util,n=i.css,o=i.Dimensions,r=i.each,s=i.getImage,a=i.includes,l=i.isNumber,h=i.isUndefined,u=i.toFloat,c=i.win,d=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity"];e.parallax={props:d.reduce(function(t,e){return t[e]="list",t},{media:"media"}),defaults:d.reduce(function(t,e){return t[e]=void 0,t},{media:!1}),computed:{props:function(t,e){var i=this;return d.reduce(function(o,r){if(h(t[r]))return o;var s,l,c,d=r.match(/color/i),f=d||"opacity"===r,p=t[r].slice(0);f&&n(e,r,""),p.length<2&&p.unshift(("scale"===r?1:f?n(e,r):0)||0);var m=a(p.join(""),"%")?"%":"px";if(d){var g=e.style.color;p=p.map(function(t){return n(n(e,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(function(t){return u(t)})}),e.style.color=g}else p=p.map(u);if(r.match(/^bg/))if(n(e,"background-position-"+r[2],""),l=n(e,"backgroundPosition").split(" ")["x"===r[2]?0:1],i.covers){var v=Math.min.apply(Math,p),w=Math.max.apply(Math,p),b=p.indexOf(v)<p.indexOf(w);c=w-v,p=p.map(function(t){return t-(b?v:w)}),s=(b?-c:0)+"px"}else s=l;return o[r]={steps:p,unit:m,pos:s,bgPos:l,diff:c},o},{})},bgProps:function(){var t=this;return["bgx","bgy"].filter(function(e){return e in t.props})},covers:function(t,e){return"cover"===n(""!==e.style.backgroundSize?n(e,"backgroundSize",""):e,"backgroundSize")}},disconnected:function(){delete this._image},update:[{read:function(t){var e=this;if(t.active=!this.media||c.matchMedia(this.media).matches,t.image&&(t.image.dimEl={width:this.$el.offsetWidth,height:this.$el.offsetHeight}),!("image"in t)&&this.covers&&this.bgProps.length){var i=n(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1");i&&(t.image=!1,s(i).then(function(i){t.image={width:i.naturalWidth,height:i.naturalHeight},e.$emit()}))}},write:function(t){var e=this,i=t.image,r=t.active;if(i)if(r){var s=i.dimEl,a=o.cover(i,s);this.bgProps.forEach(function(t){var n=e.props[t],r=n.diff,l=n.bgPos,h=n.steps,u="bgy"===t?"height":"width",c=a[u]-s[u];if(l.match(/%$|0px/)){if(c<r)s[u]=a[u]+r-c;else if(c>r){var d=parseFloat(l);d&&(e.props[t].steps=h.map(function(t){return t-(c-r)/(100/d)}))}a=o.cover(i,s)}}),n(this.$el,{backgroundSize:a.width+"px "+a.height+"px",backgroundRepeat:"no-repeat"})}else n(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["load","resize"]}],methods:{reset:function(){var t=this;r(this.getCss(0),function(e,i){return n(t.$el,i,"")})},getCss:function(t){var e=this.props,i=!1;return Object.keys(e).reduce(function(n,o){var r=e[o],s=r.steps,a=r.unit,l=r.pos,h=p(s,t);switch(o){case"x":case"y":if(i)break;var c=["x","y"].map(function(i){return o===i?h+a:e[i]?p(e[i].steps,t)+e[i].unit:0}),d=c[0],m=c[1];i=n.transform+=" translate3d("+d+", "+m+", 0)";break;case"rotate":n.transform+=" rotate("+h+"deg)";break;case"scale":n.transform+=" scale("+h+")";break;case"bgy":case"bgx":n["background-position-"+o[2]]="calc("+l+" + "+(h+a)+")";break;case"color":case"backgroundColor":case"borderColor":var g=f(s,t),v=g[0],w=g[1],b=g[2];n[o]="rgba("+v.map(function(t,e){return t+=b*(w[e]-t),3===e?u(t):parseInt(t,10)}).join(",")+")";break;case"blur":n.filter+=" blur("+h+"px)";break;case"hue":n.filter+=" hue-rotate("+h+"deg)";break;case"fopacity":n.filter+=" opacity("+h+"%)";break;case"grayscale":case"invert":case"saturate":case"sepia":n.filter+=" "+o+"("+h+"%)";break;default:n[o]=h}return n},{transform:"",filter:""})}}}}function f(t,e){var i=t.length-1,n=Math.min(Math.floor(i*e),i-1),o=t.slice(n,n+2);return o.push(1===e?1:e%(1/i)*i),o}function p(t,e){var i=f(t,e),n=i[0],o=i[1],r=i[2];return(l(n)?n+Math.abs(n-o)*r*(n<o?1:-1):+o).toFixed(2)}}function Yn(t){var e=t.util.removeClass;return{update:[{write:function(){if(!this.stack.length&&!this.dragging){var t=this.getValidIndex();delete this.index,e(this.slides,this.clsActive,this.clsActivated),this.show(t)}},events:["load","resize"]}]}}function qn(t,e){t.use(Rn);var i=t.mixin,n=t.util,o=n.closest,r=n.css,s=n.endsWith,a=n.noop,l=n.Transition;return{mixins:[i.parallax],computed:{item:function(){var i=t.getComponent(o(this.$el,".uk-"+e),e);return i&&o(this.$el,i.slidesSelector)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){r(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,o=i.duration,s=i.timing,c=i.dir;l.cancel(this.$el),r(this.$el,this.getCss(u(e,c,n))),l.start(this.$el,this.getCss(h(e)?.5:c>0?1:0),o,s).catch(a)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){l.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,o=i.dir;l.cancel(this.$el),r(this.$el,this.getCss(u(e,o,n)))}}]};function h(t){return s(t,"in")}function u(t,e,i){return i/=2,h(t)?e<0?1-i:i:e<0?i:1-i}}return Oi.version="3.0.0-beta.40",(An=Oi).mixin.class=zi,An.mixin.container=Wi,An.mixin.modal=ji,An.mixin.position=Fi,An.mixin.togglable=Li,(Nn=Oi).use(Pn),Nn.use(Vi),Nn.use(Ri),Nn.use(Hn),Nn.use(qi),Nn.use(Ui),Nn.use(Xi),Nn.use(Ji),Nn.use(Qi),Nn.use(Ki),Nn.use(yn),Nn.use(Gi),Nn.use(Zi),Nn.use(bn),Nn.use(xn),Nn.use(kn),Nn.use($n),Nn.use(In),Nn.use(Tn),Nn.use(Cn),Nn.use(En),Nn.use(Sn),Nn.use(_n),Nn.use(Mn),Nn.use(wn),Nn.use(Bn),Nn.use(On),Nn.use(Yi),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.$,o=i.doc,r=i.empty,s=i.html;e.component("countdown",{mixins:[e.mixin.class],attrs:!0,props:{date:String,clsWrapper:String},defaults:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){var e=t.date;return Date.parse(e)},days:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","days"),e)},hours:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","hours"),e)},minutes:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","minutes"),e)},seconds:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","seconds"),e)},units:function(){var t=this;return["days","hours","minutes","seconds"].filter(function(e){return t[e]})}},connected:function(){this.start()},disconnected:function(){var t=this;this.stop(),this.units.forEach(function(e){return r(t[e])})},events:[{name:"visibilitychange",el:o,handler:function(){o.hidden?this.stop():this.start()}}],update:{write:function(){var t,e,i=this,n=(t=this.date,{total:e=t-Date.now(),seconds:e/1e3%60,minutes:e/1e3/60%60,hours:e/1e3/60/60%24,days:e/1e3/60/60/24});n.total<=0&&(this.stop(),n.days=n.hours=n.minutes=n.seconds=0),this.units.forEach(function(t){var e=String(Math.floor(n[t]));e=e.length<2?"0"+e:e;var o=i[t];o.textContent!==e&&((e=e.split("")).length!==o.children.length&&s(o,e.map(function(){return"<span></span>"}).join("")),e.forEach(function(t,e){return o.children[e].textContent=t}))})}},methods:{start:function(){var t=this;this.stop(),this.date&&this.units.length&&(this.$emit(),this.timer=setInterval(function(){return t.$emit()},1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}})}}),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.css,r=i.scrolledOver,s=i.sortBy,a=i.toFloat;e.component("grid-parallax",e.components.grid.extend({props:{target:String,translate:Number},defaults:{target:!1,translate:150},computed:{translate:function(t){var e=t.translate;return Math.abs(e)}},init:function(){n(this.$el,"uk-grid")},disconnected:function(){this.reset(),o(this.$el,"marginBottom","")},update:[{read:function(t){var e=t.rows;return{columns:e&&e[0]&&e[0].length||0,rows:e&&e.map(function(t){return s(t,"offsetLeft")})}},write:function(t){var e=t.columns;o(this.$el,"marginBottom",e>1?this.translate+a(o(o(this.$el,"marginBottom",""),"marginBottom")):"")},events:["load","resize"]},{read:function(){return{scrolled:r(this.$el)*this.translate}},write:function(t){var e=t.rows,i=t.columns,n=t.scrolled;if(!e||1===i||!n)return this.reset();e.forEach(function(t){return t.forEach(function(t,e){return o(t,"transform","translateY("+(e%2?n:n/8)+"px)")})})},events:["scroll","load","resize"]}],methods:{reset:function(){o(this.$el.children,"transform","")}}})),e.components.gridParallax.options.update.unshift({read:function(){this.reset()},events:["load","resize"]})}}),Oi.use(function t(e){if(!t.installed){e.use(Vn);var i=e.util,n=i.$$,o=i.assign,r=i.data,s=i.index,a=e.components.lightboxPanel.options;e.component("lightbox",{attrs:!0,props:o({toggle:String},a.props),defaults:o({toggle:"a"},Object.keys(a.props).reduce(function(t,e){return t[e]=a.defaults[e],t},{})),computed:{toggles:function(t,e){var i=t.toggle;return n(i,e)}},disconnected:function(){this._destroy()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),t.current.blur(),this.show(s(this.toggles,t.current))}}],update:function(t){var e,i;this.panel&&this.animation&&(this.panel.$props.animation=this.animation,this.panel.$emit()),!this.panel||t.toggles&&(e=t.toggles,i=this.toggles,e.length===i.length&&e.every(function(t,e){return t!==i[e]}))||(t.toggles=this.toggles,this._destroy(),this._init())},methods:{_init:function(){return this.panel=this.panel||e.lightboxPanel(o({},this.$props,{items:this.toggles.reduce(function(t,e){return t.push(["href","caption","type","poster","alt"].reduce(function(t,i){return t["href"===i?"source":i]=r(e,i),t},{})),t},[])}))},_destroy:function(){this.panel&&(this.panel.$destroy(!0),this.panel=null)},show:function(t){return this.panel||this._init(),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}})}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.util,o=n.append,r=n.closest,s=n.css,a=n.each,l=n.pointerEnter,h=n.pointerLeave,u=n.remove,c=n.toFloat,d=n.Transition,f=n.trigger,p={};e.component("notification",{functional:!0,args:["message","status"],defaults:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},created:function(){p[this.pos]||(p[this.pos]=o(e.container,'<div class="uk-notification uk-notification-'+this.pos+'"></div>'));var t=s(p[this.pos],"display","block");this.$mount(o(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href="#" class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},ready:function(){var t=this,e=c(s(this.$el,"marginBottom"));d.start(s(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}),{opacity:1,marginTop:0,marginBottom:e}).then(function(){t.timeout&&(t.timer=setTimeout(t.close,t.timeout))})},events:(i={click:function(t){r(t.target,'a[href="#"]')&&t.preventDefault(),this.close()}},i[l]=function(){this.timer&&clearTimeout(this.timer)},i[h]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},i),methods:{close:function(t){var e=this,i=function(){f(e.$el,"close",[e]),u(e.$el),p[e.pos].children.length||s(p[e.pos],"display","none")};this.timer&&clearTimeout(this.timer),t?i():d.start(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}).then(i)}}}),e.notification.closeAll=function(t,i){a(e.instances,function(e){"notification"!==e.$options.name||t&&t!==e.group||e.close(i)})}}}),Oi.use(function t(e){if(!t.installed){e.use(Rn);var i=e.mixin,n=e.util,o=n.clamp,r=n.css,s=n.scrolledOver,a=n.query;e.component("parallax",{mixins:[i.parallax],props:{target:String,viewport:Number,easing:Number},defaults:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){var i=t.target;return i&&a(i,e)||e}},update:[{read:function(t){var e,i;return{prev:t.percent,percent:(e=s(this.target)/(this.viewport||1),i=this.easing,o(e*(1-(i-i*e))))}},write:function(t,e){var i=t.prev,n=t.percent,o=t.active;"scroll"!==e.type&&(i=!1),o?i!==n&&r(this.$el,this.getCss(n)):this.reset()},events:["scroll","load","resize"]}]})}}),Oi.use(function t(e){if(!t.installed){e.use(Ln);var i=e.mixin,n=e.util,o=n.$,r=n.$$,s=n.addClass,a=n.css,l=n.data,h=n.includes,u=n.isNumeric,c=n.isUndefined,d=n.toggleClass,f=n.toFloat,p=function(t){var e=t.util,i=e.assign,n=e.clamp,o=e.createEvent,r=e.css,s=e.Deferred,a=e.includes,l=e.index,h=e.isRtl,u=e.noop,c=e.sortBy,d=e.toNodes,f=e.Transition,p=e.trigger,m=i(function(t,e,i,o){var d=o.center,p=o.easing,w=o.list,b=new s,y=t?m.getLeft(t,w,d):m.getLeft(e,w,d)+e.offsetWidth*i,x=e?m.getLeft(e,w,d):y+t.offsetWidth*i*(h?-1:1);return{dir:i,show:function(e,o,r){void 0===o&&(o=0);var s=r?"linear":p;return e-=Math.round(e*n(o,-1,1)),this.translate(o),t&&this.updateTranslates(),o=t?o:n(o,0,1),g(this.getItemIn(),"itemin",{percent:o,duration:e,timing:s,dir:i}),t&&g(this.getItemIn(!0),"itemout",{percent:1-o,duration:e,timing:s,dir:i}),f.start(w,{transform:zn(-x*(h?-1:1),"px")},e,s).then(b.resolve,u),b.promise},stop:function(){return f.stop(w)},cancel:function(){f.cancel(w)},reset:function(){r(w,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),f.cancel(w),this.show(t,e,!0)},translate:function(e){var o=this.getDistance()*i*(h?-1:1);r(w,"transform",zn(n(o-o*e-x,-m.getWidth(w),w.offsetWidth)*(h?-1:1),"px")),this.updateTranslates(),t&&(e=n(e,-1,1),g(this.getItemIn(),"itemtranslatein",{percent:e,dir:i}),g(this.getItemIn(!0),"itemtranslateout",{percent:1-e,dir:i}))},percent:function(){return Math.abs((r(w,"transform").split(",")[4]*(h?-1:1)+y)/(x-y))},getDistance:function(){return Math.abs(x-y)},getItemIn:function(e){void 0===e&&(e=!1);var n=this.getActives(),o=c(v(w),"offsetLeft"),r=l(o,n[i*(e?-1:1)>0?n.length-1:0]);return~r&&o[r+(t&&!e?i:0)]},getActives:function(){var i=m.getLeft(t||e,w,d);return c(v(w).filter(function(t){var e=m.getElLeft(t,w);return e>=i&&e+t.offsetWidth<=w.offsetWidth+i}),"offsetLeft")},updateTranslates:function(){var t=this.getActives();v(w).forEach(function(i){var n=a(t,i);g(i,"itemtranslate"+(n?"in":"out"),{percent:n?1:0,dir:i.offsetLeft<=e.offsetLeft?1:-1})})}}},{getLeft:function(t,e,i){var n=this.getElLeft(t,e);return i?n-this.center(t,e):Math.min(n,this.getMax(e))},getMax:function(t){return Math.max(0,this.getWidth(t)-t.offsetWidth)},getWidth:function(t){return v(t).reduce(function(t,e){return e.offsetWidth+t},0)},getMaxWidth:function(t){return v(t).reduce(function(t,e){return Math.max(t,e.offsetWidth)},0)},center:function(t,e){return e.offsetWidth/2-t.offsetWidth/2},getElLeft:function(t,e){return(t.offsetLeft+(h?t.offsetWidth-e.offsetWidth:0))*(h?-1:1)}});function g(t,e,i){p(t,o(e,!1,!1,i))}function v(t){return d(t.children)}return m}(e);e.component("slider-parallax",qn(e,"slider")),e.component("slider",{mixins:[i.class,i.slider,Yn(e)],props:{center:Boolean,sets:Boolean},defaults:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:p},computed:{avgWidth:function(){return p.getWidth(this.list)/this.length},finite:function(t){var e=t.finite;return e||p.getWidth(this.list)<this.list.offsetWidth+p.getMaxWidth(this.list)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return this.sets[this.sets.length-1];a(this.slides,"order","");for(var t=p.getMax(this.list),e=this.length;e--;)if(p.getElLeft(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var e=this,i=t.sets,n=this.list.offsetWidth/(this.center?2:1),o=0,r=n,s=0;return i=i&&this.slides.reduce(function(t,i,a){var l=i.offsetWidth;if(s+l>o&&(!e.center&&a>e.maxIndex&&(a=e.maxIndex),!h(t,a))){var u=e.slides[a+1];e.center&&u&&l<r-u.offsetWidth/2?r-=l:(r=n,t.push(a),o=s+n+(e.center?l/2:0))}return s+=l,t},[]),i&&i.length&&i},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){d(this.$el,this.clsContainer,!o("."+this.clsContainer,this.$el))},update:{write:function(){var t=this;r("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(e){var i=l(e,t.attrItem);t.maxIndex&&d(e,"uk-hidden",u(i)&&(t.sets&&!h(t.sets,f(i))||i>t.maxIndex))})},events:["load","resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!h(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index-this.prevIndex+(this.dir>0&&this.index<this.prevIndex||this.dir<0&&this.index>this.prevIndex?(this.maxIndex+1)*this.dir:0));if(!this.dragging&&e>1){for(var i=0;i<e;i++)this.stack.splice(1,0,this.dir>0?"next":"previous");t.preventDefault()}else this.duration=jn(this.avgWidth/this.velocity)*((this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).offsetWidth/this.avgWidth),this.reorder()},itemshow:function(){!c(this.prevIndex)&&s(this._getTransitioner().getItemIn(),this.clsActive)},itemshown:function(){var t=this,e=this._getTransitioner(this.index).getActives();this.slides.forEach(function(i){return d(i,t.clsActive,h(e,i))}),(!this.sets||h(this.sets,f(this.index)))&&this.slides.forEach(function(i){return d(i,t.clsActivated,h(e,i))})}},methods:{reorder:function(){var t=this;if(a(this.slides,"order",""),!this.finite){var e=this.dir>0&&this.slides[this.prevIndex]?this.prevIndex:this.index;if(this.slides.forEach(function(i,n){return a(i,"order",t.dir>0&&n<e?1:t.dir<0&&n>=t.index?-1:"")}),this.center)for(var i=this.slides[e],n=this.list.offsetWidth/2-i.offsetWidth/2,o=0;n>0;){var r=t.getIndex(--o+e,e),s=t.slides[r];a(s,"order",r>e?-2:-1),n-=s.offsetWidth}}},getValidIndex:function(t,e){var i;if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;do{if(h(this.sets,t))return t;i=t,t=this.getIndex(t+this.dir,e)}while(t!==i);return t}}})}}),Oi.use(function t(e){if(!t.installed){e.use(Fn);var i,n,o,r,s,a,l=e.mixin,h=e.util.height,u=(n=(i=e).mixin,o=i.util,r=o.assign,s=o.css,a=r({},n.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-s(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Wn(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-s(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Wn(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:zn(30),zIndex:-1},{transform:zn(),zIndex:0}]:[{transform:zn(-100),zIndex:0},{transform:zn(),zIndex:-1}]},percent:function(t,e,i){return i<0?1-a.translated(e):a.translated(t)},translate:function(t,e){return e<0?[{transform:zn(30*t),zIndex:-1},{transform:zn(-100*(1-t)),zIndex:0}]:[{transform:zn(100*-t),zIndex:0},{transform:zn(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:zn(100),zIndex:0},{transform:zn(),zIndex:-1}]:[{transform:zn(-30),zIndex:-1},{transform:zn(),zIndex:0}]},percent:function(t,e,i){return i>0?1-a.translated(e):a.translated(t)},translate:function(t,e){return e<0?[{transform:zn(100*t),zIndex:0},{transform:zn(-30*(1-t)),zIndex:-1}]:[{transform:zn(-30*t),zIndex:-1},{transform:zn(100*(1-t)),zIndex:0}]}}}));e.component("slideshow-parallax",qn(e,"slideshow")),e.component("slideshow",{mixins:[l.class,l.slideshow,Yn(e)],props:{ratio:String,minHeight:Boolean,maxHeight:Boolean},defaults:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:u},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],i=t[1];return i=i*this.$el.offsetWidth/e,this.minHeight&&(i=Math.max(this.minHeight,i)),this.maxHeight&&(i=Math.min(this.maxHeight,i)),{height:i}},write:function(t){var e=t.height;h(this.list,Math.floor(e))},events:["load","resize"]}})}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.mixin,o=e.util,r=o.addClass,s=o.after,a=o.assign,l=o.append,h=o.attr,u=o.before,c=o.closest,d=o.css,f=o.doc,p=o.docEl,m=o.height,g=o.fastdom,v=o.getPos,w=o.includes,b=o.index,y=o.isInput,x=o.noop,k=o.offset,$=o.off,I=o.on,T=o.pointerDown,C=o.pointerMove,E=o.pointerUp,S=o.position,_=o.preventClick,A=o.Promise,N=o.remove,D=o.removeClass,M=o.toggleClass,B=o.toNodes,O=o.Transition,P=o.trigger,H=o.win,z=o.within;e.component("sortable",{mixins:[n.class],props:{group:String,animation:Number,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},defaults:{group:!1,animation:150,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1},init:function(){var t=this;["init","start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){t.scrollY=H.pageYOffset;var n=v(e),o=n.x,r=n.y;t.pos={x:o,y:r},i(e)}})},events:(i={},i[T]="init",i),update:{write:function(){if(this.clsEmpty&&M(this.$el,this.clsEmpty,!this.$el.children.length),this.drag){k(this.drag,{top:this.pos.y+this.origin.top,left:this.pos.x+this.origin.left});var t,e=k(this.drag).top,i=e+this.drag.offsetHeight;e>0&&e<this.scrollY?t=this.scrollY-5:i<m(f)&&i>m(H)+this.scrollY&&(t=this.scrollY+5),t&&setTimeout(function(){return H.scrollTo(H.scrollX,t)},5)}}},methods:{init:function(t){var e=t.target,i=t.button,n=t.defaultPrevented,o=B(this.$el.children).filter(function(t){return z(e,t)})[0];!o||y(t.target)||this.handle&&!z(e,this.handle)||i>0||z(e,"."+this.clsNoDrag)||n||(t.preventDefault(),this.touched=[this],this.placeholder=o,this.origin=a({target:e,index:b(o)},this.pos),I(p,C,this.move),I(p,E,this.end),I(H,"scroll",this.scroll),this.threshold||this.start(t))},start:function(t){this.drag=l(e.container,this.placeholder.outerHTML.replace(/^<li/i,"<div").replace(/li>$/i,"div>")),d(this.drag,a({boxSizing:"border-box",width:this.placeholder.offsetWidth,height:this.placeholder.offsetHeight},d(this.placeholder,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),h(this.drag,"uk-no-boot",""),r(this.drag,this.clsDrag,this.clsCustom),m(this.drag.firstElementChild,m(this.placeholder.firstElementChild));var i=k(this.placeholder),n=i.left,o=i.top;a(this.origin,{left:n-this.pos.x,top:o-this.pos.y}),r(this.placeholder,this.clsPlaceholder),r(this.$el.children,this.clsItem),r(p,this.clsDragState),P(this.$el,"start",[this,this.placeholder,this.drag]),this.move(t)},move:function(t){if(this.drag){this.$emit();var e="mousemove"===t.type?t.target:f.elementFromPoint(this.pos.x-f.body.scrollLeft,this.pos.y-f.body.scrollTop),i=W(e),n=W(this.placeholder),o=i!==n;if(i&&!z(e,this.placeholder)&&(!o||i.group&&i.group===n.group)){if(e=i.$el===e.parentNode&&e||B(i.$el.children).filter(function(t){return z(e,t)})[0],o)n.remove(this.placeholder);else if(!e)return;i.insert(this.placeholder,e),w(this.touched,i)||this.touched.push(i)}}else(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},scroll:function(){var t=H.pageYOffset;t!==this.scrollY&&(this.pos.y+=t-this.scrollY,this.scrollY=t,this.$emit())},end:function(t){if($(p,C,this.move),$(p,E,this.end),$(H,"scroll",this.scroll),this.drag){_();var e=W(this.placeholder);this===e?this.origin.index!==b(this.placeholder)&&P(this.$el,"moved",[this,this.placeholder]):(P(e.$el,"added",[e,this.placeholder]),P(this.$el,"removed",[this,this.placeholder])),P(this.$el,"stop",[this]),N(this.drag),this.drag=null;var i=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" ");this.touched.forEach(function(t){return D(t.$el.children,i)}),D(p,this.clsDragState)}else"mouseup"!==t.type&&z(t.target,"a[href]")&&(location.href=c(t.target,"a[href]").href)},insert:function(t,e){var i=this;r(this.$el.children,this.clsItem);var n=function(){var n,o;e?!z(t,i.$el)||(o=e,(n=t).parentNode===o.parentNode&&b(n)>b(o))?u(e,t):s(e,t):l(i.$el,t)};this.animation?this.animate(n):n()},remove:function(t){z(t,this.$el)&&(this.animation?this.animate(function(){return N(t)}):N(t))},animate:function(t){var e=this,i=[],n=B(this.$el.children),o={position:"",width:"",height:"",pointerEvents:"",top:"",left:"",bottom:"",right:""};n.forEach(function(t){i.push(a({position:"absolute",pointerEvents:"none",width:t.offsetWidth,height:t.offsetHeight},S(t)))}),t(),n.forEach(O.cancel),d(this.$el.children,o),this.$update("update",!0),g.flush(),d(this.$el,"minHeight",m(this.$el));var r=n.map(function(t){return S(t)});A.all(n.map(function(t,n){return O.start(d(t,i[n]),r[n],e.animation)})).then(function(){d(e.$el,"minHeight",""),d(n,o),e.$update("update",!0),g.flush()},x)}}})}function W(t){return t&&(e.getComponent(t,"sortable")||W(t.parentNode))}}),Oi.use(function t(e){var i;if(!t.installed){var n=e.util,o=e.mixin,r=n.append,s=n.attr,a=n.doc,l=n.flipPosition,h=n.hasAttr,u=n.includes,c=n.isTouch,d=n.isVisible,f=n.matches,p=n.on,m=n.pointerDown,g=n.pointerEnter,v=n.pointerLeave,w=n.remove,b=n.within,y=[];e.component("tooltip",{attrs:!0,args:"title",mixins:[o.container,o.togglable,o.position],props:{delay:Number,title:String},defaults:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=h(this.$el,"title"),s(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),s(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var t=this;u(y,this)||(y.forEach(function(t){return t.hide()}),y.push(this),this._unbind=p(a,"click",function(e){return!b(e.target,t.$el)&&t.hide()}),clearTimeout(this.showTimer),this.tooltip=r(this.container,'<div class="'+this.clsPos+'" aria-hidden><div class="'+this.clsPos+'-inner">'+this.title+"</div></div>"),s(this.$el,"aria-expanded",!0),this.positionAt(this.tooltip,this.$el),this.origin="y"===this.getAxis()?l(this.dir)+"-"+this.align:this.align+"-"+l(this.dir),this.showTimer=setTimeout(function(){t.toggleElement(t.tooltip,!0),t.hideTimer=setInterval(function(){d(t.$el)||t.hide()},150)},this.delay))},hide:function(){var t=y.indexOf(this);!~t||f(this.$el,"input")&&this.$el===a.activeElement||(y.splice(t,1),clearTimeout(this.showTimer),clearInterval(this.hideTimer),s(this.$el,"aria-expanded",!1),this.toggleElement(this.tooltip,!1),this.tooltip&&w(this.tooltip),this.tooltip=!1,this._unbind())}},events:(i={},i["focus "+g+" "+m]=function(t){t.type===m&&c(t)||this.show()},i.blur="hide",i[v]=function(t){c(t)||this.hide()},i)})}}),Oi.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.ajax,r=i.matches,s=i.noop,a=i.on,l=i.removeClass,h=i.trigger;e.component("upload",{props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},defaults:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Bytes Max",multiple:!1,name:"files[]",params:{},type:"POST",url:"",abort:s,beforeAll:s,beforeSend:s,complete:s,completeAll:s,error:s,fail:s,load:s,loadEnd:s,loadStart:s,progress:s},events:{change:function(t){r(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){c(t);var e=t.dataTransfer;e&&e.files&&(l(this.$el,this.clsDragover),this.upload(e.files))},dragenter:function(t){c(t)},dragover:function(t){c(t),n(this.$el,this.clsDragover)},dragleave:function(t){c(t),l(this.$el,this.clsDragover)}},methods:{upload:function(t){var e=this;if(t.length){h(this.$el,"upload",[t]);for(var i=0;i<t.length;i++){if(e.maxSize&&1e3*e.maxSize<t[i].size)return void e.fail(e.msgInvalidSize.replace("%s",e.allow));if(e.allow&&!u(e.allow,t[i].name))return void e.fail(e.msgInvalidName.replace("%s",e.allow));if(e.mime&&!u(e.mime,t[i].type))return void e.fail(e.msgInvalidMime.replace("%s",e.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var n=function(t,e){for(var i=[],n=0;n<t.length;n+=e){for(var o=[],r=0;r<e;r++)o.push(t[n+r]);i.push(o)}return i}(t,this.concurrent),r=function(t){var i=new FormData;for(var s in t.forEach(function(t){return i.append(e.name,t)}),e.params)i.append(s,e.params[s]);o(e.url,{data:i,method:e.type,beforeSend:function(t){var i=t.xhr;i.upload&&a(i.upload,"progress",e.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return a(i,t.toLowerCase(),e[t])}),e.beforeSend(t)}}).then(function(t){e.complete(t),n.length?r(n.shift()):e.completeAll(t)},function(t){return e.error(t.message)})};r(n.shift())}}}})}function u(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function c(t){t.preventDefault(),t.stopPropagation()}}),function(t){var e=t.connect,i=t.disconnect;function n(){r(rt.body,e),si.flush(),new lt(function(t){return t.forEach(o)}).observe(st,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),t._initialized=!0}function o(n){var o=n.target;("attributes"!==n.type?function(t){for(var n=t.addedNodes,o=t.removedNodes,s=0;s<n.length;s++)r(n[s],e);for(var a=0;a<o.length;a++)r(o[a],i);return!0}(n):function(e){var i=e.target,n=e.attributeName;if("href"===n)return!0;var o=_i(n);if(o&&o in t.components){if(J(i,n))return t[o](i),!0;var r=t.getComponent(i,o);return r?(r.$destroy(),!0):void 0}}(n))&&t.update("update",o,!0)}function r(t,e){if(1===t.nodeType&&!J(t,"uk-no-boot"))for(e(t),t=t.firstElementChild;t;){var i=t.nextElementSibling;r(t,e),t=i}}lt&&(rt.body?n():new lt(function(){rt.body&&(this.disconnect(),n())}).observe(st,{childList:!0,subtree:!0}))}(Oi),Oi});




/*! Copyright (c) 2016 THE ULTRASOFT (http://theultrasoft.com)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Project: Parallaxie
 * Version: 0.5
 *
 * Requires: jQuery 1.9+
 */

(function( $ ){

    $.fn.parallaxie = function( options ){

        var options = $.extend({
            speed: 0.2,
            repeat: 'no-repeat',
            size: 'cover',
            pos_x: 'center',
            offset: 0,
        }, options );

        this.each(function(){

            var $el = $(this);
            var local_options = $el.data('parallaxie');
            if( typeof local_options != 'object' ) local_options = {};
            local_options = $.extend( {}, options, local_options );

            var image_url = $el.data('image');
            if( typeof image_url == 'undefined' ){
                image_url = $el.css('background-image');
                if( !image_url ) return;

                // APPLY DEFAULT CSS
                var pos_y =  local_options.offset + ($el.offset().top - $(window).scrollTop()) * (1 - local_options.speed );
                $el.css({
                    'background-image': image_url,
                    'background-size': local_options.size,
                    'background-repeat': local_options.repeat,
                    'background-attachment': 'fixed',
                    'background-position': local_options.pos_x + ' ' + pos_y + 'px',
                });

                $(window).scroll( function(){
                        //var pos_y = - ( $(window).scrollTop() - $el.offset().top ) * ( 1 + local_options.speed ) - ( $el.offset().top * local_options.speed );
                        var pos_y =  local_options.offset + ($el.offset().top - $(window).scrollTop()) * (1 - local_options.speed );
                        $el.data( 'pos_y', pos_y );
                        $el.css( 'background-position', local_options.pos_x + ' ' + pos_y + 'px' );
                    }
                );
            }
        });
        return this;
    };
}( jQuery ));


/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
