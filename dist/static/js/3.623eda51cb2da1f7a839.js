webpackJsonp([3],{"2MRt":function(t,e){},A7yg:function(t,e,i){
/*!
 * vue-virtual-scroll-list v2.1.3
 * open source under the MIT license
 * https://github.com/tangbc/vue-virtual-scroll-list#readme
 */var s;s=function(t){"use strict";function e(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var i="FRONT",s="BEHIND",n="INIT",a="FIXED",r="DYNAMIC",o=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.init(e,i)}var o,l,c;return o=t,(l=[{key:"init",value:function(t,e){this.param=t,this.callUpdate=e,this.sizes=new Map,this.firstRangeTotalSize=0,this.firstRangeAverageSize=0,this.lastCalcIndex=0,this.fixedSizeValue=0,this.calcType=n,this.offset=0,this.direction="",this.range=Object.create(null),t&&this.checkRange(0,t.keeps-1)}},{key:"destroy",value:function(){this.init(null,null)}},{key:"getRange",value:function(){var t=Object.create(null);return t.start=this.range.start,t.end=this.range.end,t.padFront=this.range.padFront,t.padBehind=this.range.padBehind,t}},{key:"isBehind",value:function(){return this.direction===s}},{key:"isFront",value:function(){return this.direction===i}},{key:"getOffset",value:function(t){return t<1?0:this.getIndexOffset(t)}},{key:"updateParam",value:function(t,e){this.param&&t in this.param&&(this.param[t]=e)}},{key:"saveSize",value:function(t,e){this.sizes.set(t,e),this.calcType===n?(this.fixedSizeValue=e,this.calcType=a):this.calcType===a&&this.fixedSizeValue!==e&&(this.calcType=r,delete this.fixedSizeValue),this.sizes.size<=this.param.keeps?(this.firstRangeTotalSize=this.firstRangeTotalSize+e,this.firstRangeAverageSize=Math.round(this.firstRangeTotalSize/this.sizes.size)):delete this.firstRangeTotalSize}},{key:"handleDataSourcesChange",value:function(){var t=this.range.start;this.isFront()?t-=2:this.isBehind()&&(t+=2),t=Math.max(t,0),this.updateRange(this.range.start,this.getEndByStart(t))}},{key:"handleSlotSizeChange",value:function(){this.handleDataSourcesChange()}},{key:"handleScroll",value:function(t){this.direction=t<this.offset?i:s,this.offset=t,this.direction===i?this.handleFront():this.direction===s&&this.handleBehind()}},{key:"handleFront",value:function(){var t=this.getScrollOvers();if(!(t>this.range.start)){var e=Math.max(t-this.param.buffer,0);this.checkRange(e,this.getEndByStart(e))}}},{key:"handleBehind",value:function(){var t=this.getScrollOvers();t<this.range.start+this.param.buffer||this.checkRange(t,this.getEndByStart(t))}},{key:"getScrollOvers",value:function(){var t=this.offset-this.param.slotHeaderSize;if(t<=0)return 0;if(this.isFixedType())return Math.floor(t/this.fixedSizeValue);for(var e=0,i=0,s=0,n=this.param.uniqueIds.length;e<=n;){if(i=e+Math.floor((n-e)/2),(s=this.getIndexOffset(i))===t)return i;s<t?e=i+1:s>t&&(n=i-1)}return e>0?--e:0}},{key:"getIndexOffset",value:function(t){if(!t)return 0;for(var e=0,i=0;i<t;i++)e+=this.sizes.get(this.param.uniqueIds[i])||this.getEstimateSize();return this.lastCalcIndex=Math.max(this.lastCalcIndex,t-1),this.lastCalcIndex=Math.min(this.lastCalcIndex,this.getLastIndex()),e}},{key:"isFixedType",value:function(){return this.calcType===a}},{key:"getLastIndex",value:function(){return this.param.uniqueIds.length-1}},{key:"checkRange",value:function(t,e){var i=this.param.keeps;this.param.uniqueIds.length<=i?(t=0,e=this.getLastIndex()):e-t<i-1&&(t=e-i+1),this.range.start!==t&&this.updateRange(t,e)}},{key:"updateRange",value:function(t,e){this.range.start=t,this.range.end=e,this.range.padFront=this.getPadFront(),this.range.padBehind=this.getPadBehind(),this.callUpdate(this.getRange())}},{key:"getEndByStart",value:function(t){var e=t+this.param.keeps-1;return Math.min(e,this.getLastIndex())}},{key:"getPadFront",value:function(){return this.isFixedType()?this.fixedSizeValue*this.range.start:this.getIndexOffset(this.range.start)}},{key:"getPadBehind",value:function(){var t=this.range.end,e=this.getLastIndex();return this.isFixedType()?(e-t)*this.fixedSizeValue:this.lastCalcIndex===e?this.getIndexOffset(e)-this.getIndexOffset(t):(e-t)*this.getEstimateSize()}},{key:"getEstimateSize",value:function(){return this.firstRangeAverageSize||this.param.size}}])&&e(o.prototype,l),c&&e(o,c),t}(),l={size:{type:Number,required:!0},keeps:{type:Number,required:!0},dataKey:{type:String,required:!0},dataSources:{type:Array,required:!0},dataComponent:{type:[Object,Function],required:!0},extraProps:{type:Object},rootTag:{type:String,default:"div"},wrapTag:{type:String,default:"div"},wrapClass:{type:String,default:""},direction:{type:String,default:"vertical"},topThreshold:{type:Number,default:0},bottomThreshold:{type:Number,default:0},start:{type:Number,default:0},offset:{type:Number,default:0},itemTag:{type:String,default:"div"},itemClass:{type:String,default:""},itemClassAdd:{type:Function},headerTag:{type:String,default:"div"},headerClass:{type:String,default:""},footerTag:{type:String,default:"div"},footerClass:{type:String,default:""},disabled:{type:Boolean,default:!1}},c={index:{type:Number},event:{type:String},tag:{type:String},horizontal:{type:Boolean},source:{type:Object},component:{type:[Object,Function]},uniqueKey:{type:String},extraProps:{type:Object}},u={event:{type:String},uniqueKey:{type:String},tag:{type:String},horizontal:{type:Boolean}},h={created:function(){this.shapeKey=this.horizontal?"offsetWidth":"offsetHeight"},mounted:function(){var t=this;"undefined"!=typeof ResizeObserver&&(this.resizeObserver=new ResizeObserver(function(){t.dispatchSizeChange()}),this.resizeObserver.observe(this.$el))},updated:function(){this.dispatchSizeChange()},beforeDestroy:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)},methods:{getCurrentSize:function(){return this.$el?this.$el[this.shapeKey]:0},dispatchSizeChange:function(){this.$parent.$emit(this.event,this.uniqueKey,this.getCurrentSize(),this.hasInitial)}}},d=t.component("virtual-list-item",{mixins:[h],props:c,render:function(t){var e=this.tag,i=this.component,s=this.extraProps,n=void 0===s?{}:s,a=this.index;return n.source=this.source,n.index=a,t(e,{role:"item"},[t(i,{props:n})])}}),f=t.component("virtual-list-slot",{mixins:[h],props:u,render:function(t){return t(this.tag,{attrs:{role:this.uniqueKey}},this.$slots.default)}}),g="item_resize",p="slot_resize",m="header",v="footer";return t.component("virtual-list",{props:l,data:function(){return{range:null}},watch:{"dataSources.length":function(){this.virtual.updateParam("uniqueIds",this.getUniqueIdFromDataSources()),this.virtual.handleDataSourcesChange()},start:function(t){this.scrollToIndex(t)},offset:function(t){this.scrollToOffset(t)}},created:function(){this.isHorizontal="horizontal"===this.direction,this.directionKey=this.isHorizontal?"scrollLeft":"scrollTop",this.installVirtual(),this.$on(g,this.onItemResized),(this.$slots.header||this.$slots.footer)&&this.$on(p,this.onSlotResized)},activated:function(){this.scrollToOffset(this.virtual.offset)},mounted:function(){this.start?this.scrollToIndex(this.start):this.offset&&this.scrollToOffset(this.offset)},beforeDestroy:function(){this.virtual.destroy()},methods:{getSize:function(t){return this.virtual.sizes.get(t)},getSizes:function(){return this.virtual.sizes.size},scrollToOffset:function(t){var e=this.$refs.root;e&&(e[this.directionKey]=t||0)},scrollToIndex:function(t){if(t>=this.dataSources.length-1)this.scrollToBottom();else{var e=this.virtual.getOffset(t);this.scrollToOffset(e)}},scrollToBottom:function(){var t=this,e=this.$refs.shepherd;e&&(e.scrollIntoView(!1),setTimeout(function(){t.getOffset()+t.getClientSize()<t.getScrollSize()&&t.scrollToBottom()},3))},reset:function(){this.virtual.destroy(),this.scrollToOffset(0),this.installVirtual()},installVirtual:function(){this.virtual=new o({size:this.size,slotHeaderSize:0,slotFooterSize:0,keeps:this.keeps,buffer:Math.round(this.keeps/3),uniqueIds:this.getUniqueIdFromDataSources()},this.onRangeChanged),this.range=this.virtual.getRange()},getUniqueIdFromDataSources:function(){var t=this;return this.dataSources.map(function(e){return e[t.dataKey]})},getOffset:function(){var t=this.$refs.root;return t?Math.ceil(t[this.directionKey]):0},getClientSize:function(){var t=this.$refs.root;return t?t[this.isHorizontal?"clientWidth":"clientHeight"]:0},getScrollSize:function(){var t=this.$refs.root;return t?t[this.isHorizontal?"scrollWidth":"scrollHeight"]:0},onItemResized:function(t,e){this.virtual.saveSize(t,e),this.$emit("resized",t,e)},onSlotResized:function(t,e,i){t===m?this.virtual.updateParam("slotHeaderSize",e):t===v&&this.virtual.updateParam("slotFooterSize",e),i&&this.virtual.handleSlotSizeChange()},onRangeChanged:function(t){this.range=t},onScroll:function(t){var e=this.getOffset(),i=this.getClientSize(),s=this.getScrollSize();e<0||e+i>s||!s||(this.virtual.handleScroll(e),this.emitEvent(e,i,s,t))},emitEvent:function(t,e,i,s){this.$emit("scroll",s,this.virtual.getRange()),this.virtual.isFront()&&this.dataSources.length&&t-this.topThreshold<=0?this.$emit("totop"):this.virtual.isBehind()&&t+e+this.bottomThreshold>=i&&this.$emit("tobottom")},getRenderSlots:function(t){for(var e=[],i=this.range,s=i.start,n=i.end,a=this.dataSources,r=this.dataKey,o=this.itemClass,l=this.itemTag,c=this.isHorizontal,u=this.extraProps,h=this.dataComponent,f=s;f<=n;f++){var p=a[f];p?p[r]?e.push(t(d,{props:{index:f,tag:l,event:g,horizontal:c,uniqueKey:p[r],source:p,extraProps:u,component:h},class:"".concat(o," ").concat(this.itemClassAdd?this.itemClassAdd(f):"")})):console.warn("Cannot get the data-key '".concat(r,"' from data-sources.")):console.warn("Cannot get the index '".concat(f,"' from data-sources."))}return e}},render:function(t){var e=this.$slots,i=e.header,s=e.footer,n=this.range,a=n.padFront,r=n.padBehind,o=this.rootTag,l=this.headerClass,c=this.headerTag,u=this.wrapTag,h=this.wrapClass,d=this.footerClass,g=this.footerTag,y=this.isHorizontal?"0px ".concat(r,"px 0px ").concat(a,"px"):"".concat(a,"px 0px ").concat(r,"px");return t(o,{ref:"root",on:{"&scroll":this.onScroll}},[i?t(f,{class:l,props:{tag:c,event:p,uniqueKey:m}},i):null,t(u,{class:h,attrs:{role:"group"},style:{padding:y}},this.getRenderSlots(t)),s?t(f,{class:d,props:{tag:g,event:p,uniqueKey:v}},s):null,t("div",{ref:"shepherd"})])}})},t.exports=s(i("7+uW"))},BO1k:function(t,e,i){t.exports={default:i("fxRn"),__esModule:!0}},MgP8:function(t,e){},RZbu:function(t,e){},fxRn:function(t,e,i){i("+tPU"),i("zQR9"),t.exports=i("g8Ux")},g8Ux:function(t,e,i){var s=i("77Pl"),n=i("3fs2");t.exports=i("FeBl").getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return s(e.call(t))}},kwHR:function(t,e){},zfg2:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Xxa5"),n=i.n(s),a=i("exGp"),r=i.n(a),o=i("Dd8w"),l=i.n(o),c=i("PJh5"),u=i.n(c),h=i("NYxO"),d={name:"ImDialog",props:{active:Boolean,push:Number,online:Boolean,me:Boolean,info:Object},computed:{statusText:function(){return this.online?this.$t("online"):this.$t("was")+u()(this.info.recipient_id.last_online_time).fromNow()}},created:function(){console.log(this.info.last_message)},i18n:{messages:{en:{online:"Online",was:"was online "},ru:{online:"Онлайн",was:"был в сети "}}}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"im-dialog",class:{active:t.active,push:t.push}},[i("router-link",{staticClass:"im-dailog__pic",attrs:{to:{name:"ProfileId",params:{id:t.info.recipient_id.id}}}},[i("img",{attrs:{src:t.info.recipient_id.photo,alt:t.info.recipient_id.first_name}})]),i("div",{staticClass:"im-dialog__info"},[i("router-link",{staticClass:"im-dialog__name",attrs:{to:{name:"ProfileId",params:{id:t.info.recipient_id.id}}}},[t._v(t._s(t.info.recipient_id.first_name+" "+t.info.recipient_id.last_name))]),i("span",{staticClass:"user-status",class:{online:t.online}},[t._v(t._s(t.statusText))])],1),i("div",{staticClass:"im-dialog__content"},[i("p",{staticClass:"im-dialog__last"},[t.me&&t.info.last_message?i("span",{staticClass:"im-dialog__last-me"},[t._v("Вы:")]):t._e(),t._v(t._s(t.info.last_message.message_text))]),t.me&&t.info.last_message?i("span",{staticClass:"im-dialog__time"},[t._v(t._s(t._f("moment")(t.info.last_message.time-10800,"from")))]):t._e()]),t.push>0?i("span",{staticClass:"im-dialog__push"},[t._v(t._s(t.push))]):t._e()],1)},staticRenderFns:[]};var g=i("VU/8")(d,f,!1,function(t){i("MgP8")},null,null).exports,p=i("BO1k"),m=i.n(p),v={name:"infinite-loading-item",props:{source:{type:Object,default:function(){return{}}}}},y={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.source.stubDate?i("h5",{staticClass:"im-chat__message-title"},[t._v(t._s(t._f("moment")(t.source.date,"DD MMMM YYYY")))]):i("div",{staticClass:"im-chat__message-block",class:{me:t.source.sendByMe}},[i("p",{staticClass:"im-chat__message-text"},[t._v(t._s(t.source.message_text))]),i("span",{staticClass:"im-chat__message-time"},[t._v(t._s(t._f("moment")(t.source.time,"YYYY-MM-DD hh:mm")))])])},staticRenderFns:[]};var _=i("VU/8")(v,y,!1,function(t){i("kwHR")},"data-v-0aaee62f",null).exports,x=i("A7yg"),S=function(t){return{sid:"group-"+t,stubDate:!0,date:t}},z={name:"ImChat",props:{info:Object,messages:Array,online:Boolean},components:{VirtualList:i.n(x).a},data:function(){return{mes:"",itemComponent:_,isUserViewHistory:!1,fetching:!1}},mounted:function(){this.follow=!0},watch:{messages:function(){this.follow&&this.setVirtualListToBottom()}},computed:{statusText:function(){return this.online?this.$t("online"):this.$t("was")+u()(this.info.recipient_id.last_online_time).fromNow()},messagesGrouped:function(){var t=[],e=null,i=!0,s=!1,n=void 0;try{for(var a,r=m()(this.messages);!(i=(a=r.next()).done);i=!0){var o=a.value,l=u()(o.time).format("YYYY-MM-DD");l!==e&&(e=l,t.push(S(e))),t.push(o)}}catch(t){s=!0,n=t}finally{try{!i&&r.return&&r.return()}finally{if(s)throw n}}return t}},methods:l()({},Object(h.b)("profile/dialogs",["postMessage","loadOlderMessages"]),Object(h.c)("profile/dialogs",["isHistoryEndReached"]),{onSubmitMessage:function(){this.postMessage({id:this.info.id,message_text:this.mes}),this.mes=""},onScrollToTop:function(){var t=this;return r()(n.a.mark(function e(){var i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.$refs.vsl){e.next=8;break}if(t.isHistoryEndReached()){e.next=8;break}return i=t.messagesGrouped[0],t.fetching=!0,e.next=6,t.loadOlderMessages();case 6:t.setVirtualListToOffset(1),t.$nextTick(function(){var e=0,s=!0,n=!1,a=void 0;try{for(var r,o=m()(t.messagesGrouped);!(s=(r=o.next()).done);s=!0){var l=r.value;if(l.sid===i.sid)break;e+=t.$refs.vsl.getSize(l.sid)}}catch(t){n=!0,a=t}finally{try{!s&&o.return&&o.return()}finally{if(n)throw a}}t.setVirtualListToOffset(e),t.fetching=!1});case 8:case"end":return e.stop()}},e,t)}))()},onScroll:function(){this.follow=!1},onScrollToBottom:function(){this.follow=!0},setVirtualListToOffset:function(t){this.$refs.vsl&&this.$refs.vsl.scrollToOffset(t)},setVirtualListToBottom:function(){this.$refs.vsl&&this.$refs.vsl.scrollToBottom()}}),created:function(){console.log(this.info)},i18n:{messages:{en:{nomore:"No more messages",placeholder:"Your message...",online:"Online",was:"was online "},ru:{nomore:"Больше сообщений нет",placeholder:"Ваше сообщение...",online:"Онлайн",was:"был в сети "}}}},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"im-chat"},[i("div",{staticClass:"im-chat__user"},[i("router-link",{staticClass:"im-chat__user-pic",attrs:{to:{name:"ProfileId",params:{id:t.info.recipient_id.id}}}},[i("img",{attrs:{src:t.info.recipient_id.photo,alt:t.info.recipient_id.first_name}})]),i("router-link",{staticClass:"im-chat__user-name",attrs:{to:{name:"ProfileId",params:{id:t.info.recipient_id.id}}}},[t._v(t._s(t.info.recipient_id.first_name+" "+t.info.recipient_id.last_name))]),i("span",{staticClass:"user-status",class:{online:t.online}},[t._v(t._s(t.statusText))])],1),i("div",{staticClass:"im-chat__infitite_list_wrapper"},[i("virtual-list",{ref:"vsl",staticClass:"im-chat__infitite_list scroll-touch",attrs:{size:60,keeps:120,"data-key":"sid","data-sources":t.messagesGrouped,"data-component":t.itemComponent,"wrap-class":"im-chat__message","root-tag":"section"},on:{totop:t.onScrollToTop,"&scroll":function(e){return t.onScroll(e)},tobottom:t.onScrollToBottom}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.fetching,expression:"fetching"}],staticClass:"im-chat__loader",attrs:{slot:"header"},slot:"header"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isHistoryEndReached(),expression:"!isHistoryEndReached()"}],staticClass:"spinner"}),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isHistoryEndReached(),expression:"isHistoryEndReached()"}],staticClass:"finished"},[t._v(t._s(t.$t("nomore")))])])])],1),i("form",{staticClass:"im-chat__enter",attrs:{action:"#"},on:{submit:function(e){return e.preventDefault(),t.onSubmitMessage(e)}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.mes,expression:"mes"}],staticClass:"im-chat__enter-input",attrs:{type:"text",placeholder:t.$t("placeholder")},domProps:{value:t.mes},on:{input:function(e){e.target.composing||(t.mes=e.target.value)}}})])])},staticRenderFns:[]};var C={name:"Im",components:{ImDialog:g,ImChat:i("VU/8")(z,b,!1,function(t){i("RZbu")},null,null).exports,isLoading:i("vjHR").a},data:function(){return{intervalForMessages:null,total:0,offset:0,isLoad:!1}},computed:l()({},Object(h.c)("profile/dialogs",["getMessages","getActiveDialog","getDialogs"])),methods:l()({},Object(h.b)("profile/dialogs",["loadFreshMessages","switchDialog","closeDialog","createDialogWithUser","apiLoadAllDialogs"]),{countPush:function(t){return t>0?t:null},checkOnlineUser:function(t){return u()().diff(u()(t),"seconds")<=60},clickOnDialog:function(t){this.$router.push({name:"Im",query:{getActiveDialog:t}})},selectDialogByRoute:function(t,e){var i=this;return r()(n.a.mark(function s(){return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(!t.query.getActiveDialog){s.next=4;break}e.switchDialog(t.query.getActiveDialog),s.next=16;break;case 4:if(!t.query.userId){s.next=8;break}e.createDialogWithUser(t.query.userId),s.next=16;break;case 8:if(!(e.getDialogs.length>0)){s.next=12;break}e.$router.push({name:"Im",query:{getActiveDialog:e.getDialogs[0].id}}),s.next=16;break;case 12:return s.next=14,e.apiLoadAllDialogs().then(function(t){i.offset=t});case 14:e.getDialogs.length>0&&e.$router.push({name:"Im",query:{getActiveDialog:e.getDialogs[0].id}}),console.log("No dialogs at all");case 16:case"end":return s.stop()}},s,i)}))()},loadDialogs:function(){}}),beforeRouteEnter:function(t,e,i){var s,a=this;i((s=r()(n.a.mark(function e(i){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i.selectDialogByRoute(t,i);case 1:case"end":return e.stop()}},e,a)})),function(t){return s.apply(this,arguments)}))},beforeRouteUpdate:function(t,e,i){this.selectDialogByRoute(t,this),i()},beforeDestroy:function(){this.closeDialog()}},k={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"im"},[i("div",{staticClass:"im__dialogs"},[t._l(t.getDialogs,function(e){return i("im-dialog",{key:e.id,attrs:{info:e,push:t.countPush(e.unread_count),me:e.sendByMe,active:t.getActiveDialog&&e.id===t.getActiveDialog.id,online:t.checkOnlineUser(e.recipient_id.last_online_time)},nativeOn:{click:function(i){return t.clickOnDialog(e.id)}}})}),t.total>t.offset?i("is-loading",{directives:[{name:"load",rawName:"v-load",value:t.loadFeeds,expression:"loadFeeds"}],attrs:{isLoad:t.isLoad}}):t._e()],2),t.getActiveDialog?i("div",{staticClass:"im__chat"},[i("im-chat",{attrs:{info:t.getActiveDialog,messages:t.getMessages,online:t.checkOnlineUser(t.getActiveDialog.recipient_id.last_online_time)}})],1):t._e()])},staticRenderFns:[]};var T=i("VU/8")(C,k,!1,function(t){i("2MRt")},null,null);e.default=T.exports}});
//# sourceMappingURL=3.623eda51cb2da1f7a839.js.map