(()=>{"use strict";var e={8119:(e,n,o)=>{o(6992),o(8674),o(9601),o(7727);var r=o(5010),t=o(3396);function a(e,n){var o=(0,t.up)("router-view");return(0,t.wg)(),(0,t.j4)(o)}var l=o(89);const s={},u=(0,l.Z)(s,[["render",a]]),i=u;var c=o(5431);(0,c.z)("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});o(8309);var d=o(2483),v=(o(1539),o(3948),o(7658),o(7139)),p=o(4870);const m=o.p+"img/eye.39e6a7e3.svg",f=o.p+"img/eye-hide.ff3ea511.svg";function _(e,n){return(0,t.wg)(),(0,t.j4)(r.uT,{name:"app-transition"},{default:(0,t.w5)((function(){return[(0,t.WI)(e.$slots,"default")]})),_:3})}const w={},h=(0,l.Z)(w,[["render",_]]),g=h;var b={key:0,class:"app-modal__body"};const y={__name:"app-modal",props:{modelValue:{type:Boolean,default:!1},width:{type:String}},setup:function(e){return function(n,o){return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t._)("div",{class:(0,v.C_)(["app-modal",{"app-modal-show":e.modelValue}])},[(0,t.Wm)(g,null,{default:(0,t.w5)((function(){return[e.modelValue?((0,t.wg)(),(0,t.iD)("div",b,[(0,t.WI)(n.$slots,"default")])):(0,t.kq)("",!0)]})),_:3})],2),(0,t.Wm)(g,null,{default:(0,t.w5)((function(){return[e.modelValue?((0,t.wg)(),(0,t.iD)("span",{key:0,onClick:o[0]||(o[0]=function(e){return n.$emit("update:modelValue",!1)}),class:"app-modal-shadow"})):(0,t.kq)("",!0)]})),_:1})],64)}}},k=(0,l.Z)(y,[["__scopeId","data-v-7bf81028"]]),D=k;var C=o(5708),W=o(4161),S=W.Z.create({baseURL:"http://vm4415096.25ssd.had.wf"});S.interceptors.request.use((function(e){var n=sessionStorage.getItem("token");return n&&(e.headers["Authorization"]="Bearer ".concat(n)),e.headers["Accept"]="application/json",e}),(function(e){return Promise.reject(e)}));const V=S;o(2564);var x=o(3508),I=function(e,n){return setTimeout((function(){(0,x.Yz)(e.text,{type:n.type,position:"top-right",showIcon:!0,timeout:2e3})}))};const z=I;var U=function(e){return(0,t.dD)("data-v-7df0c788"),e=e(),(0,t.Cn)(),e},H={class:"wropper"},O={class:"Login__roles col-md-6 mx-auto"},Z=U((function(){return(0,t._)("h2",{class:"text-center my-4"},"Select your roles",-1)})),$=U((function(){return(0,t._)("option",{value:"",hidden:"",disabled:""},"Select your role",-1)})),j=["value"],M={class:"wropper__div"},q={class:"wropper__div__card col-md-6 p-5 rounded-3"},L=U((function(){return(0,t._)("h3",{class:"text-center"},"System entrance",-1)})),P=U((function(){return(0,t._)("label",{for:"login"},"Username",-1)})),E={key:0,class:"login__input-error"},Y=U((function(){return(0,t._)("label",{for:"password"},"Password",-1)})),A={class:"Login_form-input"},N=["type"],T={key:0,class:"login__input-error"},F=U((function(){return(0,t._)("button",{type:"submit",class:"form-control btn btn-primary text-white"},"Enter",-1)}));const B={__name:"Login",setup:function(e){var n=(0,p.iH)({role:[],selected_role:""}),o=(0,p.iH)({username:"",password:""}),a=(0,d.tv)(),l=(0,p.iH)(!1),s=(0,p.iH)(!1),u=function(){s.value=!s.value},i=function(){V.post("/api/user/token/",{username:o.value.username,password:o.value.password}).then((function(e){console.log(e)}))["catch"]((function(e){console.log(e),400===e.response.status?e.response.data.keys&&(z({text:"Select your role !!!"},{type:"success"}),l.value=!0):z({text:"Error !!!"},{type:"danger"}),n.value.role=e.response.data.roles}))},c=function(){V.post("/api/user/token/",{username:o.value.username,password:o.value.password,current_role:n.value.selected_role}).then((function(e){e.data.access&&(sessionStorage.setItem("token",e.data.access),sessionStorage.setItem("role",e.data.current_role),"director"===e.data.current_role?a.push({name:"director"}):"warehouseman"===e.data.current_role?a.push({name:"warhen"}):"salesman"===e.data.current_role?a.push({name:"salesman"}):"financier"===e.data.current_role&&a.push({name:"financier"}),l.value=!1)}))["catch"]((function(e){console.log(e)}))};return function(e,a){return(0,t.wg)(),(0,t.iD)("div",H,[(0,t.Wm)(D,{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=function(e){return l.value=e}),width:"50%"},{default:(0,t.w5)((function(){return[(0,t._)("div",O,[Z,(0,t.wy)((0,t._)("select",{class:"form-control","onUpdate:modelValue":a[0]||(a[0]=function(e){return n.value.selected_role=e})},[$,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(n.value.role,(function(e){return(0,t.wg)(),(0,t.iD)("option",{class:"form-control",value:e,key:e.id},(0,v.zw)(e),9,j)})),128))],512),[[r.bM,n.value.selected_role]]),(0,t._)("button",{class:"btn btn-primary mt-2",onClick:c},"save")])]})),_:1},8,["modelValue"]),(0,t._)("div",M,[(0,t._)("div",q,[L,(0,t.Wm)((0,p.SU)(C.l0),{class:"col-md-6 mx-auto",onSubmit:i},{default:(0,t.w5)((function(){return[P,(0,t.Wm)((0,p.SU)(C.gN),{rules:"required",modelValue:o.value.username,name:"Username"},{default:(0,t.w5)((function(e){var n=e.errors;return[(0,t.wy)((0,t._)("input",{class:"form-control my-2",name:"username",type:"text",placeholder:"Username","onUpdate:modelValue":a[2]||(a[2]=function(e){return o.value.username=e}),id:"login"},null,512),[[r.nr,o.value.username]]),n&&n.length?((0,t.wg)(),(0,t.iD)("p",E,(0,v.zw)(n[0]),1)):(0,t.kq)("",!0)]})),_:1},8,["modelValue"]),Y,(0,t.Wm)((0,p.SU)(C.gN),{rules:"required",modelValue:o.value.password,name:"Password"},{default:(0,t.w5)((function(e){var n=e.errors;return[(0,t._)("div",A,[(0,t.wy)((0,t._)("input",{class:"form-control my-3","onUpdate:modelValue":a[3]||(a[3]=function(e){return o.value.password=e}),id:"password",type:s.value?"text":"password",placeholder:"password"},null,8,N),[[r.YZ,o.value.password]]),(0,t._)("img",{src:m,width:"26",height:"26",onClick:u,class:(0,v.C_)(s.value?"Login__hide":"Login__show"),alt:"eye"},null,2),(0,t._)("img",{src:f,width:"26",height:"26",onClick:u,class:(0,v.C_)(s.value?"Login__show":"Login__hide"),alt:"eye"},null,2)]),n&&n.length?((0,t.wg)(),(0,t.iD)("p",T,(0,v.zw)(n[0]),1)):(0,t.kq)("",!0)]})),_:1},8,["modelValue"]),F]})),_:1})])])])}}},K=(0,l.Z)(B,[["__scopeId","data-v-7df0c788"]]),R=K;var G=(0,t._)("h1",null,"Saidbar",-1),J=[G];function Q(e,n){return(0,t.wg)(),(0,t.iD)("div",null,J)}const X={},ee=(0,l.Z)(X,[["render",Q]]),ne=ee;var oe={class:"warehouse__navbar"},re={class:"warehouse__navbar-prof"},te=["src"];const ae={__name:"navbar",setup:function(e){var n=(0,d.tv)(),o=(0,p.iH)(!1),r=function(){o.value=!o.value},a=function(){sessionStorage.removeItem("token"),sessionStorage.removeItem("role"),location.reload()},l=function(){n.push({name:"profile"})};return function(e,n){var s,u,i;return(0,t.wg)(),(0,t.iD)("section",oe,[(0,t._)("div",re,[(0,t._)("img",{src:null===(s=e.$store)||void 0===s||null===(u=s.state)||void 0===u||null===(i=u.me)||void 0===i?void 0:i.image,alt:"user",onClick:r},null,8,te),(0,t._)("article",{class:(0,v.C_)(o.value?"article1":"article2")},null,2),(0,t._)("aside",{class:(0,v.C_)(o.value?"warehouse__user-show":"warehouse__user-hide")},[(0,t._)("ul",null,[(0,t._)("li",{onClick:l},"Profile"),(0,t._)("li",{onClick:a},"Log Out")])],2)])])}}},le=(0,l.Z)(ae,[["__scopeId","data-v-28b84525"]]),se=le;var ue=o(65);const ie=(0,ue.MT)({state:{me:{}},getters:{},mutations:{getMe:function(e,n){e.me=n}},actions:{getMe:function(e){var n=e.commit;V.get("/api/user/me").then((function(e){console.log(e.data),n("getMe",e.data)}))}},modules:{}});var ce={class:"warehouse"},de={class:"warehouse__sidebar"},ve={class:"warehouse__main1"},pe={class:"warehouse-navbar"};const me={__name:"Director",setup:function(e){return(0,t.bv)((function(){ie.dispatch("getMe")})),function(e,n){var o=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)("section",ce,[(0,t._)("div",de,[(0,t.Wm)(ne)]),(0,t._)("div",ve,[(0,t._)("div",pe,[(0,t.Wm)(se)]),(0,t.Wm)(o)])])}}},fe=(0,l.Z)(me,[["__scopeId","data-v-10af4776"]]),_e=fe;var we={class:"warehouse"},he={class:"warehouse__sidebar"},ge={class:"warehouse__main1"},be={class:"warehouse-navbar"};const ye={__name:"Financier",setup:function(e){return(0,t.bv)((function(){ie.dispatch("getMe")})),function(e,n){var o=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)("section",we,[(0,t._)("div",he,[(0,t.Wm)(ne)]),(0,t._)("div",ge,[(0,t._)("div",be,[(0,t.Wm)(se)]),(0,t.Wm)(o)])])}}},ke=(0,l.Z)(ye,[["__scopeId","data-v-4bbdf3a9"]]),De=ke;var Ce={class:"warehouse"},We={class:"warehouse__sidebar"},Se={class:"warehouse__main1"},Ve={class:"warehouse-navbar"};const xe={__name:"Warhen",setup:function(e){return(0,t.bv)((function(){ie.dispatch("getMe")})),function(e,n){var o=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)("section",Ce,[(0,t._)("div",We,[(0,t.Wm)(ne)]),(0,t._)("div",Se,[(0,t._)("div",Ve,[(0,t.Wm)(se)]),(0,t.Wm)(o)])])}}},Ie=(0,l.Z)(xe,[["__scopeId","data-v-372fc7be"]]),ze=Ie;var Ue={class:"warehouse"},He={class:"warehouse__sidebar"},Oe={class:"warehouse__main1"},Ze={class:"warehouse-navbar"};const $e={__name:"Salesman",setup:function(e){return(0,t.bv)((function(){ie.dispatch("getMe")})),function(e,n){var o=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)("section",Ue,[(0,t._)("div",He,[(0,t.Wm)(ne)]),(0,t._)("div",Oe,[(0,t._)("div",Ze,[(0,t.Wm)(se)]),(0,t.Wm)(o)])])}}},je=(0,l.Z)($e,[["__scopeId","data-v-1447a701"]]),Me=je;var qe=function(e){return(0,t.dD)("data-v-72e9bc32"),e=e(),(0,t.Cn)(),e},Le={class:"section"},Pe={class:"section__div mx-4"},Ee={class:"col-md-8 mx-auto"},Ye=qe((function(){return(0,t._)("h2",{class:"text-center my-4"},"Select your roles",-1)})),Ae=qe((function(){return(0,t._)("option",{value:"",hidden:"",disabled:""},"Select your role",-1)})),Ne=["value"],Te=["src"],Fe=qe((function(){return(0,t._)("button",null,"Edit profile",-1)})),Be={class:"secont__part"},Ke=qe((function(){return(0,t._)("span",null,"Phone number",-1)})),Re=qe((function(){return(0,t._)("i",{class:"bi bi-forward-fill"},null,-1)})),Ge=qe((function(){return(0,t._)("span",null,"Email",-1)})),Je=qe((function(){return(0,t._)("i",{class:"bi bi-forward-fill"},null,-1)})),Qe=qe((function(){return(0,t._)("span",null,"User name",-1)})),Xe=qe((function(){return(0,t._)("i",{class:"bi bi-forward-fill"},null,-1)})),en=qe((function(){return(0,t._)("span",null,"Roles",-1)})),nn=qe((function(){return(0,t._)("i",{class:"bi bi-forward-fill"},null,-1)})),on=qe((function(){return(0,t._)("span",null,"Current role",-1)})),rn=qe((function(){return(0,t._)("i",{class:"bi bi-forward-fill"},null,-1)})),tn=qe((function(){return(0,t._)("button",{class:"chage btn btn-warning"},"Change password",-1)}));const an={__name:"profile",setup:function(e){var n=(0,p.iH)(!1),o=(0,p.iH)(""),a=(0,d.tv)(),l=function(){V.post("/api/user/change-role/",{role:o.value}).then((function(e){console.log(e),200===e.status&&("warehouseman"===o.value?a.push({name:"profile_warhen"}):"salesman"===o.value?a.push({name:"profile_salesman"}):"director"===o.value?a.push({name:"profile_director"}):"financier"===o.value&&a.push({name:"profile_financier"}),n.value=!1)}))["catch"]((function(e){console.log(e),n.value=!1}))},s=function(){n.value=!0};return function(e,a){var u,i,c,d,p,m,f,_,w,h,g,b,y,k,C,W,S,V,x,I,z,U,H,O;return(0,t.wg)(),(0,t.iD)("section",Le,[(0,t._)("div",Pe,[(0,t.Wm)(D,{modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=function(e){return n.value=e}),width:"50%"},{default:(0,t.w5)((function(){var n,s,u;return[(0,t._)("div",Ee,[Ye,(0,t.wy)((0,t._)("select",{class:"form-control","onUpdate:modelValue":a[0]||(a[0]=function(e){return o.value=e})},[Ae,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(null===(n=e.$store)||void 0===n||null===(s=n.state)||void 0===s||null===(u=s.me)||void 0===u?void 0:u.roles,(function(e){return(0,t.wg)(),(0,t.iD)("option",{value:e,class:"form-control"},(0,v.zw)(e),9,Ne)})),256))],512),[[r.bM,o.value]]),(0,t._)("button",{class:"btn btn-primary mt-2",onClick:l},"save")])]})),_:1},8,["modelValue"]),(0,t._)("div",null,[(0,t._)("img",{src:null===(u=e.$store)||void 0===u||null===(i=u.state)||void 0===i||null===(c=i.me)||void 0===c?void 0:c.image,alt:"user"},null,8,Te)]),(0,t._)("p",null,[(0,t._)("span",null,(0,v.zw)(null===(d=e.$store)||void 0===d||null===(p=d.state)||void 0===p||null===(m=p.me)||void 0===m?void 0:m.first_name),1),(0,t._)("span",null,(0,v.zw)(null===(f=e.$store)||void 0===f||null===(_=f.state)||void 0===_||null===(w=_.me)||void 0===w?void 0:w.last_name),1)]),Fe]),(0,t._)("div",Be,[(0,t._)("p",null,[Ke,Re,(0,t._)("span",null,(0,v.zw)(null===(h=e.$store)||void 0===h||null===(g=h.state)||void 0===g||null===(b=g.me)||void 0===b?void 0:b.phone_number),1)]),(0,t._)("p",null,[Ge,Je,(0,t._)("span",null,(0,v.zw)(null===(y=e.$store)||void 0===y||null===(k=y.state)||void 0===k||null===(C=k.me)||void 0===C?void 0:C.email),1)]),(0,t._)("p",null,[Qe,Xe,(0,t._)("span",null,(0,v.zw)(null===(W=e.$store)||void 0===W||null===(S=W.state)||void 0===S||null===(V=S.me)||void 0===V?void 0:V.username),1)]),(0,t._)("p",null,[en,nn,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(null===(x=e.$store)||void 0===x||null===(I=x.state)||void 0===I||null===(z=I.me)||void 0===z?void 0:z.roles,(function(e){return(0,t.wg)(),(0,t.iD)("span",{key:e.id,class:"mx-1"},(0,v.zw)(e),1)})),128))]),(0,t._)("p",null,[on,rn,(0,t._)("span",null,(0,v.zw)(null===(U=e.$store)||void 0===U||null===(H=U.state)||void 0===H||null===(O=H.me)||void 0===O?void 0:O.current_role),1),(0,t._)("button",{class:"btn btn-info",onClick:s},"change")]),tn])])}}},ln=(0,l.Z)(an,[["__scopeId","data-v-72e9bc32"]]),sn=ln;var un=[{path:"/",name:"login",component:R},{path:"/director",name:"director",component:_e,children:[{path:"/profile",name:"profile_director",component:sn}]},{path:"/financier",name:"financier",component:De,children:[{path:"/profile",name:"profile_financier",component:sn}]},{path:"/warhen",name:"warhen",component:ze,children:[{path:"/profile",name:"profile_warhen",component:sn}]},{path:"/salesman",name:"salesman",component:Me,children:[{path:"/profile",name:"profile_salesman",component:sn}]}],cn=(0,d.p7)({history:(0,d.PO)("/"),routes:un});cn.beforeEach((function(e,n,o){var r=sessionStorage.getItem("token"),t=sessionStorage.getItem("role"),a="login"===e.name;if(!r&&!a)return o({name:"login"});if(r&&a){if("warehouseman"===t)return o({name:"warhen"});if("financier"===t)return o({name:"financier"});if("salesman"===t)return o({name:"salesman"});if("director"===t)return o({name:"director"})}else o()}));const dn=cn;var vn=o(3990);(0,C.aH)("required",vn.C1),(0,C.aH)("email",vn.Do),(0,r.ri)(i).use(ie).use(dn).mount("#app")}},n={};function o(r){var t=n[r];if(void 0!==t)return t.exports;var a=n[r]={exports:{}};return e[r](a,a.exports,o),a.exports}o.m=e,(()=>{var e=[];o.O=(n,r,t,a)=>{if(!r){var l=1/0;for(c=0;c<e.length;c++){for(var[r,t,a]=e[c],s=!0,u=0;u<r.length;u++)(!1&a||l>=a)&&Object.keys(o.O).every((e=>o.O[e](r[u])))?r.splice(u--,1):(s=!1,a<l&&(l=a));if(s){e.splice(c--,1);var i=t();void 0!==i&&(n=i)}}return n}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,t,a]}})(),(()=>{o.n=e=>{var n=e&&e.__esModule?()=>e["default"]:()=>e;return o.d(n,{a:n}),n}})(),(()=>{o.d=(e,n)=>{for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}})(),(()=>{o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n)})(),(()=>{o.p="/"})(),(()=>{var e={143:0};o.O.j=n=>0===e[n];var n=(n,r)=>{var t,a,[l,s,u]=r,i=0;if(l.some((n=>0!==e[n]))){for(t in s)o.o(s,t)&&(o.m[t]=s[t]);if(u)var c=u(o)}for(n&&n(r);i<l.length;i++)a=l[i],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},r=self["webpackChunklesson3"]=self["webpackChunklesson3"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))})();var r=o.O(void 0,[998],(()=>o(8119)));r=o.O(r)})();
//# sourceMappingURL=app.9bea2135.js.map