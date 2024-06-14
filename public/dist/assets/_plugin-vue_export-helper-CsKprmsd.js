import{k as t,Q as e,d as n,X as i,U as r,x as o,aV as s,_ as a,au as c,ai as h,M as u,ag as f,L as d,bi as l,F as p}from"./index-DcSfbUpB.js";var v=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var n=-1;return t.some((function(t,i){return t[0]===e&&(n=i,!0)})),n}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),i=this.__entries__[n];return i&&i[1]},e.prototype.set=function(e,n){var i=t(this.__entries__,e);~i?this.__entries__[i][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,i=t(n,e);~i&&n.splice(i,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,i=this.__entries__;n<i.length;n++){var r=i[n];t.call(e,r[1],r[0])}},e}()}(),_="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,b="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),g="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(b):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var m=["top","right","bottom","left","width","height","size","weight"],y="undefined"!=typeof MutationObserver,w=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var n=!1,i=!1,r=0;function o(){n&&(n=!1,t()),i&&a()}function s(){g(o)}function a(){var t=Date.now();if(n){if(t-r<2)return;i=!0}else n=!0,i=!1,setTimeout(s,e);r=t}return a}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){_&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),y?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){_&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;m.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),O=function(t,e){for(var n=0,i=Object.keys(e);n<i.length;n++){var r=i[n];Object.defineProperty(t,r,{value:e[r],enumerable:!1,writable:!1,configurable:!0})}return t},E=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||b},M=W(0,0,0,0);function A(t){return parseFloat(t)||0}function R(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+A(t["border-"+n+"-width"])}),0)}function x(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return M;var i=E(t).getComputedStyle(t),r=function(t){for(var e={},n=0,i=["top","right","bottom","left"];n<i.length;n++){var r=i[n],o=t["padding-"+r];e[r]=A(o)}return e}(i),o=r.left+r.right,s=r.top+r.bottom,a=A(i.width),c=A(i.height);if("border-box"===i.boxSizing&&(Math.round(a+o)!==e&&(a-=R(i,"left","right")+o),Math.round(c+s)!==n&&(c-=R(i,"top","bottom")+s)),!function(t){return t===E(t).document.documentElement}(t)){var h=Math.round(a+o)-e,u=Math.round(c+s)-n;1!==Math.abs(h)&&(a-=h),1!==Math.abs(u)&&(c-=u)}return W(r.left,r.top,a,c)}var T="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof E(t).SVGGraphicsElement}:function(t){return t instanceof E(t).SVGElement&&"function"==typeof t.getBBox};function z(t){return _?T(t)?function(t){var e=t.getBBox();return W(0,0,e.width,e.height)}(t):x(t):M}function W(t,e,n,i){return{x:t,y:e,width:n,height:i}}var D=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=W(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=z(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),j=function(){return function(t,e){var n,i,r,o,s,a,c,h=(i=(n=e).x,r=n.y,o=n.width,s=n.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(a.prototype),O(c,{x:i,y:r,width:o,height:s,top:r,right:i+o,bottom:s+r,left:i}),c);O(this,{target:t,contentRect:h})}}(),k=function(){function t(t,e,n){if(this.activeObservations_=[],this.observations_=new v,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof E(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new D(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof E(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new j(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),H="undefined"!=typeof WeakMap?new WeakMap:new v,L=function(){return function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=w.getInstance(),i=new k(e,n,this);H.set(this,i)}}();["observe","unobserve","disconnect"].forEach((function(t){L.prototype[t]=function(){var e;return(e=H.get(this))[t].apply(e,arguments)}}));var S=void 0!==b.ResizeObserver?b.ResizeObserver:L;const B=t({compatConfig:{MODE:3},name:"ResizeObserver",props:{disabled:Boolean,onResize:Function},emits:["resize"],setup(t,h){let{slots:u}=h;const f=e({width:0,height:0,offsetHeight:0,offsetWidth:0});let d=null,l=null;const p=()=>{l&&(l.disconnect(),l=null)},v=e=>{const{onResize:n}=t,i=e[0].target,{width:r,height:o}=i.getBoundingClientRect(),{offsetWidth:s,offsetHeight:c}=i,h=Math.floor(r),u=Math.floor(o);if(f.width!==h||f.height!==u||f.offsetWidth!==s||f.offsetHeight!==c){const t={width:h,height:u,offsetWidth:s,offsetHeight:c};a(f,t),n&&Promise.resolve().then((()=>{n(a(a({},t),{offsetWidth:s,offsetHeight:c}),i)}))}},_=c(),b=()=>{const{disabled:e}=t;if(e)return void p();const n=s(_);n!==d&&(p(),d=n),!l&&n&&(l=new S(v),l.observe(n))};return n((()=>{b()})),i((()=>{b()})),r((()=>{p()})),o((()=>t.disabled),(()=>{b()}),{flush:"post"}),()=>{var t;return null===(t=u.default)||void 0===t?void 0:t.call(u)[0]}}});function C(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=t;if(Array.isArray(t)&&(r=h(t)[0]),!r)return null;const o=u(r,e,i);return o.props=n?a(a({},o.props),e):o.props,f("object"!=typeof o.props.class),o}function F(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return t.map((t=>C(t,e,n)))}const q=t=>(t||[]).some((t=>!d(t)||t.type!==l&&!(t.type===p&&!q(t.children))))?t:null;function G(t,e,n,i){var r;const o=null===(r=t[e])||void 0===r?void 0:r.call(t,n);return q(o)?o:null==i?void 0:i()}const V=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n};export{B as R,V as _,F as a,G as b,C as c,S as i};
