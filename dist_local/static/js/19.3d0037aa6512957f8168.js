webpackJsonp([19],{IMvm:function(e,t){},X2fu:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("Dd8w"),n=r.n(o),i=r("+cKO"),s={name:"CodeField",props:{value:{type:String,default:""},v:{type:Object,required:!0},id:{type:String,required:!0},placeholder:{type:String,default:"Code"}},computed:{code:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}},i18n:{messages:{en:{enterCode:"Enter Code",correctCode:"Enter correct Code"},ru:{enterCode:"Введите Код",correctCode:"Введите корректный код"}}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"form__group",class:{fill:e.code.length>0}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"form__input",class:{invalid:e.v.$dirty&&!e.v.required||e.v.$dirty&&!e.v.minLength},attrs:{id:e.id,name:"code"},domProps:{value:e.code},on:{change:function(t){return e.v.$touch()},input:function(t){t.target.composing||(e.code=t.target.value)}}}),r("label",{staticClass:"form__label",attrs:{for:e.id}},[e._v(e._s(e.placeholder))]),e.v.$dirty&&!e.v.code?r("span",{staticClass:"form__error"},[e._v(e._s(e.$t("enterCode")))]):e.v.$dirty&&!e.v.minLength?r("span",{staticClass:"form__error"},[e._v(e._s(e.$t("correctCode")))]):e._e()])},staticRenderFns:[]},a=r("VU/8")(s,c,!1,null,null,null).exports,d=r("NYxO"),l={name:"Forgot",components:{CodeField:a},data:function(){return{code:""}},computed:n()({},Object(d.c)("profile/account",["getMail"])),methods:n()({},Object(d.b)("profile/account",["passwordRecovery"]),{submitHandler:function(){var e=this;this.$v.$invalid?this.$v.$touch():this.passwordRecovery({email:this.getMail,key:this.code}).then(function(t){200===t.status&&e.$router.push({name:"ForgotSuccess"})}).catch(function(t){e.$router.push({name:"ChangePasswordFailed"})})}}),validations:{code:{required:i.required,minLength:Object(i.minLength)(4)}},i18n:{messages:{en:{title:"Enter the received code",send:"Send"},ru:{title:"Введите код",send:"Отправить"}}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"forgot"},[r("h2",{staticClass:"forgot__title form__title"},[e._v(e._s(e.$t("title")))]),r("form",{staticClass:"forgot__form",on:{submit:function(t){return t.preventDefault(),e.submitHandler(t)}}},[r("code-field",{attrs:{id:"forgot-code",v:e.$v.code},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),r("div",{staticClass:"forgot__action"},[r("button-hover",{attrs:{tag:"button",type:"submit",variant:"white"}},[e._v(e._s(e.$t("send")))])],1)],1)])},staticRenderFns:[]};var v=r("VU/8")(l,u,!1,function(e){r("IMvm")},null,null);t.default=v.exports}});
//# sourceMappingURL=19.3d0037aa6512957f8168.js.map