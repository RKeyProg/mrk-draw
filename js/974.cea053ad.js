"use strict";(self["webpackChunkmrk_draw"]=self["webpackChunkmrk_draw"]||[]).push([[974],{7467:function(e,t,n){n.d(t,{Z:function(){return W}});var a=n(3396);const s=e=>((0,a.dD)("data-v-74e3bb04"),e=e(),(0,a.Cn)(),e),o={key:0,class:"project-list"},r=s((()=>(0,a._)("div",{class:"projects__title"},[(0,a._)("span",null,"Имя файла"),(0,a._)("span",null,"Вид схемы БД"),(0,a._)("span",null,"Последняя активность")],-1))),i={class:"project__item"},l=["onClick"],c={key:1,class:"project-list__not-exist"};function p(e,t,n,s,p,d){const u=(0,a.up)("project-list-item");return n.projects.length?((0,a.wg)(),(0,a.iD)("div",o,[r,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.projects,(e=>((0,a.wg)(),(0,a.iD)("ul",{class:"project__menu",key:e.id},[(0,a._)("li",i,[(0,a._)("div",{class:"item__link",onClick:t=>d.openProject(e.id)},[(0,a.Wm)(u,{project:e,editable:n.editable},null,8,["project","editable"])],8,l)])])))),128))])):((0,a.wg)(),(0,a.iD)("div",c,"Сохраненные проекты не найдены"))}var d=n(9242),u=n(7139);const _={class:"project-item"},v={class:"project__preview"},m={class:"project__file"},h={class:"project__title"},w={class:"project__name"},D={class:"project__last-active"};function P(e,t,n,s,o,r){const i=(0,a.up)("base-button"),l=(0,a.up)("base-icon");return(0,a.wg)(),(0,a.iD)("div",_,[n.editable?((0,a.wg)(),(0,a.j4)(i,{key:0,class:"project__remove",customType:"icon",name:"trash",onClick:(0,d.iM)(r.removeExistedProject,["prevent"])},null,8,["onClick"])):(0,a.kq)("",!0),(0,a._)("div",v,[(0,a.Wm)(l,{class:"project__icon",name:"user"})]),(0,a._)("div",m,[(0,a._)("div",h,(0,u.zw)(n.project.title),1),(0,a._)("div",w,(0,u.zw)(n.project.DBSheme),1),(0,a._)("div",D,(0,u.zw)(n.project.activity),1)])])}var g=n(1672),f=n(8111),j=n(65),b={components:{BaseIcon:g.Z,BaseButton:f.Z},props:{project:Object,editable:Boolean},methods:{...(0,j.nv)({removeProject:"user/removeProject"}),removeExistedProject(){this.removeProject(this.project.id)}}},C=n(89);const k=(0,C.Z)(b,[["render",P],["__scopeId","data-v-4dbc3254"]]);var y=k,I=n(8291),Z={components:{projectListItem:y},props:{projects:Array,editable:Boolean},methods:{...(0,j.nv)({setCurrentProjectId:"user/setCurrentProject",setCurrentProject:"user/setCurrentProject",showTooltip:"tooltips/show"}),async openProject(e){try{const t=await I.Z.post("/getProjectSave",{projectId:e}),n={id:e,json:JSON.stringify(t.data)};this.setCurrentProject(n),this.$nextTick((()=>{this.$router.replace(`/project/${e}`)}))}catch(t){this.showTooltip({text:t.response.data.message,type:"error"})}}}};const B=(0,C.Z)(Z,[["render",p],["__scopeId","data-v-74e3bb04"]]);var W=B},8510:function(e,t,n){n.d(t,{Z:function(){return P}});var a=n(3396),s=n(7139);const o={class:"section-title"},r={key:1,class:"rappid__toolbar-container"};function i(e,t,n,i,l,c){const p=(0,a.up)("section-title-nav");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("h2",null,(0,s.zw)(n.title),1),n.simply&&!e.isProjectPage?((0,a.wg)(),(0,a.j4)(p,{key:0})):((0,a.wg)(),(0,a.iD)("div",r))])}const l={class:"section-navigation"},c={class:"navigation__list"};function p(e,t,n,o,r,i){const p=(0,a.up)("base-button");return(0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("nav",null,[(0,a._)("ul",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.navigation,(e=>((0,a.wg)(),(0,a.iD)("li",{key:e.id,class:(0,s.C_)(["navigation__item",{active:e.active}])},[(0,a.Wm)(p,{customType:"transparent",onClick:t=>i.changeCurrentComponent(e)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,s.zw)(e.title),1)])),_:2},1032,["onClick"])],2)))),128))])])])}var d=n(8111),u=n(65),_={components:{BaseButton:d.Z},methods:{...(0,u.nv)({setMainCurrentComponent:"main/setCurrentComponent",setProfileCurrentComponent:"profile/setCurrentComponent"}),changeCurrentComponent(e){switch(this.$route.name){case"profile":this.setProfileCurrentComponent(e);break;case"main":this.setMainCurrentComponent(e);break;default:break}}},computed:{...(0,u.rn)({navigation:function(e){return e[this.$route.name].componentNavigation}})}},v=n(89);const m=(0,v.Z)(_,[["render",p],["__scopeId","data-v-5a052ab4"]]);var h=m,w={components:{sectionTitleNav:h},props:{title:{type:String,default:"Untitled"},simply:{type:Boolean,default:!1}},computed:{...(0,u.rn)({isProjectPage:e=>e.rappidStore.isProjectOpen})}};const D=(0,v.Z)(w,[["render",i],["__scopeId","data-v-5b18ee08"]]);var P=D},3593:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var a=n(3396);const s={class:"profile"},o={class:"section__healine"},r={class:"section__container"};function i(e,t,n,i,l,c){const p=(0,a.up)("section-title");return(0,a.wg)(),(0,a.iD)("div",s,[(0,a._)("div",o,[(0,a.Wm)(p,{title:"Мой профиль",simply:""})]),(0,a._)("div",r,[((0,a.wg)(),(0,a.j4)((0,a.LL)(e.currentComponent)))])])}var l=n(8510);const c={class:"profile-user"};function p(e,t,n,s,o,r){const i=(0,a.up)("profile-person-data"),l=(0,a.up)("project-list");return(0,a.wg)(),(0,a.iD)("div",c,[(0,a.Wm)(i,{class:"profile__person"}),(0,a.Wm)(l,{projects:e.getProjects,editable:""},null,8,["projects"])])}var d=n(7139),u=n(9242);const _=e=>((0,a.dD)("data-v-7f88b9fb"),e=e(),(0,a.Cn)(),e),v={class:"person-component"},m={key:0,class:"person"},h={class:"person__content"},w={class:"person__data"},D=_((()=>(0,a._)("span",null,"Почта:",-1))),P=_((()=>(0,a._)("span",null,"Телефон:",-1))),g={class:"person__settings"},f={key:1,class:"person"},j={class:"person__content"},b={class:"person__inputs"},C={class:"person__buttons"};function k(e,t,n,s,o,r){const i=(0,a.up)("base-avatar"),l=(0,a.up)("base-button"),c=(0,a.up)("base-input");return(0,a.wg)(),(0,a.iD)("div",v,[o.isDataProfileEditing?((0,a.wg)(),(0,a.iD)("div",f,[(0,a._)("div",j,[(0,a._)("label",{class:(0,d.C_)(["person__avatar_editing",{hovered:o.avatarIsHovered}])},[(0,a.Wm)(i,{class:"person__avatar",onDragover:t[0]||(t[0]=(0,u.iM)((e=>o.avatarIsHovered=!0),["prevent"])),onDragleave:t[1]||(t[1]=(0,u.iM)((e=>o.avatarIsHovered=!1),["prevent"])),onDragstart:t[2]||(t[2]=(0,u.iM)((()=>{}),["prevent"])),onDrop:t[3]||(t[3]=(0,u.iM)((e=>r.setPhoto(e.dataTransfer.files[0])),["prevent"]))}),(0,a.Wm)(c,{class:"person__file",type:"file",onHandleChange:r.setPhoto},null,8,["onHandleChange"])],2),(0,a._)("form",{class:"person__form",onSubmit:t[8]||(t[8]=(0,u.iM)(((...e)=>r.setPersonData&&r.setPersonData(...e)),["prevent"]))},[(0,a._)("div",b,[(0,a.Wm)(c,{class:"person__input",placeholder:"Имя",modelValue:o.newPersonalData.name,"onUpdate:modelValue":t[4]||(t[4]=e=>o.newPersonalData.name=e),error:e.validation.firstError("newPersonalData.name")},null,8,["modelValue","error"]),(0,a.Wm)(c,{class:"person__input",placeholder:"Телефон",modelValue:o.newPersonalData.phone_number,"onUpdate:modelValue":t[5]||(t[5]=e=>o.newPersonalData.phone_number=e),error:e.validation.firstError("newPersonalData.phone_number")},null,8,["modelValue","error"]),(0,a.Wm)(c,{class:"person__input",placeholder:"Новый пароль",type:"password",modelValue:o.newPersonalData.password,"onUpdate:modelValue":t[6]||(t[6]=e=>o.newPersonalData.password=e),error:e.validation.firstError("newPersonalData.password")},null,8,["modelValue","error"])]),(0,a._)("div",C,[(0,a.Wm)(l,{class:"person__btn person__btn_editing",customType:"submit"},{default:(0,a.w5)((()=>[(0,a.Uk)("Сохранить")])),_:1}),(0,a.Wm)(l,{class:"person__btn person__btn_editing",customType:"fill",onHandleClick:t[7]||(t[7]=e=>r.resetChanges())},{default:(0,a.w5)((()=>[(0,a.Uk)("Отмена")])),_:1})])],32)])])):((0,a.wg)(),(0,a.iD)("div",m,[(0,a._)("div",h,[(0,a.Wm)(i,{class:"person__avatar"}),(0,a._)("div",w,[(0,a._)("div",null,[(0,a._)("h3",null,(0,d.zw)(e.personalData.name),1)]),(0,a._)("div",null,[D,(0,a._)("span",null,(0,d.zw)(e.personalData.email),1)]),(0,a._)("div",null,[P,(0,a._)("span",null,(0,d.zw)(e.personalData.phone_number),1)])])]),(0,a._)("div",g,[(0,a.Wm)(l,{class:"person__btn",customType:"transparent",onHandleClick:r.changePersonalData},{default:(0,a.w5)((()=>[(0,a.Uk)("Редактировать профиль")])),_:1},8,["onHandleClick"])])]))])}var y=n(2780);const I={class:"avatar-component"},Z={key:1,class:"photo"};function B(e,t,n,s,o,r){const i=(0,a.up)("base-icon");return(0,a.wg)(),(0,a.iD)("div",I,[this.preview?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"photo",style:(0,d.j5)({backgroundImage:`url(${this.preview})`})},null,4)):((0,a.wg)(),(0,a.iD)("div",Z,[(0,a.Wm)(i,{class:"photo__icon",name:"camera"})]))])}var W=n(1672),H=n(3338),T=n(65),U={components:{BaseIcon:W.Z,BaseInput:H.Z},data(){return{avatarIsHovered:!1}},computed:{...(0,T.rn)({preview:e=>e.user.preview})}},E=n(89);const V=(0,E.Z)(U,[["render",B],["__scopeId","data-v-b0c18ee8"]]);var S=V,z=n(8111),M={name:"profilePersonData",components:{BaseAvatar:S,BaseButton:z.Z,BaseInput:H.Z},mixins:[n(2780).jB],validators:{"newPersonalData.name"(e){return y.cX.value(e).required("Введите имя")},"newPersonalData.phone_number"(e){return y.cX.value(e).required("Введите телефон").regex(/^(\+375|80)(25|29|33|44)(\d{3})(\d{2})(\d{2})$/,"Некорректный формат телефона")},"newPersonalData.password"(e){return y.cX.value(e).minLength(6,"Минимум 6 символов")}},data(){return{isDataProfileEditing:!1,avatarIsHovered:!1,newPersonalData:{}}},methods:{...(0,T.nv)({setUserPreview:"user/setUserPreview",editData:"user/editData",renderPhoto:"user/renderPhoto"}),setPhoto(e){this.avatarIsHovered=!1,this.newPersonalData.photo=e,this.renderPhoto(e)},resetChanges(){this.isDataProfileEditing=!1,this.personalData.photo&&this.renderPhoto(this.personalData.photo)},async setPersonData(){!1!==await this.$validate()&&(this.newPersonalData.password||(this.newPersonalData.password=this.personalData.password),JSON.stringify(this.newPersonalData)!==JSON.stringify(this.personalData)&&this.editData(this.newPersonalData),this.isDataProfileEditing=!1)},changePersonalData(){this.newPersonalData=Object.assign({},this.personalData),this.newPersonalData.password="",this.isDataProfileEditing=!0}},computed:{...(0,T.rn)("user",{personalData:e=>e.user})}};const $=(0,E.Z)(M,[["render",k],["__scopeId","data-v-7f88b9fb"]]);var x=$,O=n(7467),L={components:{profilePersonData:x,projectList:O.Z},computed:{...(0,T.Se)({getProjects:"user/getProjects"})}};const N=(0,E.Z)(L,[["render",p],["__scopeId","data-v-c27c16f8"]]);var q=N,J={name:"ProfileView",components:{sectionTitle:l.Z,profileUser:q},computed:{...(0,T.rn)({currentComponent:e=>e.profile.currentComponent})}};const X=(0,E.Z)(J,[["render",i]]);var A=X}}]);
//# sourceMappingURL=974.cea053ad.js.map