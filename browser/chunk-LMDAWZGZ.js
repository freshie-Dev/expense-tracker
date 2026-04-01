import{d as Y}from"./chunk-COXDMVIB.js";import{a as ae,b as re,c as ge,d as fe,e as ve,f as ye,g as he,h as be,k as _e,l as Ce,m as De,n as Pe}from"./chunk-KM4FCMVA.js";import{Ad as y,Bd as D,Cb as G,Ha as h,Ia as A,J as T,K as k,Ka as B,La as F,Lb as _,M as N,Ma as z,Mb as E,Md as ie,Nb as L,Nd as ne,O as s,Pd as oe,Qd as p,Rb as q,Sa as b,Sd as le,T as x,Td as de,U as I,Va as u,Vd as se,Wa as g,Wd as me,Xa as m,Xd as pe,Ya as r,Yd as ce,Za as a,_a as c,_d as ue,fb as j,fd as U,ha as S,hb as f,ib as v,jb as V,jd as J,kb as R,mc as H,nc as K,nd as Q,oc as C,od as W,qd as X,sb as O,sd as Z,tb as M,td as ee,ua as d,ub as l,ud as te,vb as w,xb as $}from"./chunk-4ILDO5V3.js";var xe=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var ke=["*"],Ne={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Ae={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},Ie=(()=>{class e extends X{name="divider";style=xe;classes=Ae;inlineStyles=Ne;static \u0275fac=(()=>{let t;return function(o){return(t||(t=S(e)))(o||e)}})();static \u0275prov=T({token:e,factory:e.\u0275fac})}return e})();var Se=new N("DIVIDER_INSTANCE"),Be=(()=>{class e extends te{componentName="Divider";$pcDivider=s(Se,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=s(y,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=s(Ie);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=S(e)))(o||e)}})();static \u0275cmp=h({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(i,o){i&2&&(b("aria-orientation",o.layout)("data-p",o.dataP),O(o.sx("root")),M(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[G([Ie,{provide:Se,useExisting:e},{provide:ee,useExisting:e}]),B([y]),F],ngContentSelectors:ke,decls:2,vars:3,consts:[[3,"pBind"]],template:function(i,o){i&1&&(V(),r(0,"div",0),R(1),a()),i&2&&(M(o.cx("content")),m("pBind",o.ptm("content")))},dependencies:[C,W,D,y],encapsulation:2,changeDetection:0})}return e})(),Me=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=A({type:e});static \u0275inj=k({imports:[Be,D,D]})}return e})();function Fe(e,n){e&1&&(r(0,"small",7),l(1,"Enter a name (3\u201364 characters)."),a())}function ze(e,n){e&1&&(r(0,"small",7),l(1,"Income must be greater than 0."),a())}function je(e,n){e&1&&(r(0,"small",7),l(1,"End date must be on or after start date."),a())}function Ve(e,n){e&1&&(r(0,"div",19)(1,"p",21),l(2,"No plans yet. Create your first plan to start tracking."),a()())}function Re(e,n){e&1&&(r(0,"tr")(1,"th"),l(2,"Name"),a(),r(3,"th"),l(4,"Income"),a(),r(5,"th"),l(6,"Dates"),a(),r(7,"th",24),l(8,"Actions"),a()())}function Oe(e,n){e&1&&c(0,"p-tag",27)}function $e(e,n){if(e&1){let t=j();r(0,"tr")(1,"td")(2,"div",25)(3,"span",26),l(4),a(),u(5,Oe,1,0,"p-tag",27),a()(),r(6,"td"),l(7),_(8,"number"),a(),r(9,"td"),l(10),_(11,"date"),_(12,"date"),a(),r(13,"td")(14,"div",28)(15,"p-button",29),f("onClick",function(){let o=x(t).$implicit,P=v(2);return I(P.setActive(o.id))}),a(),r(16,"p-button",30),f("onClick",function(){let o=x(t).$implicit,P=v(2);return I(P.deletePlan(o.id))}),a()()()()}if(e&2){let t=n.$implicit,i=v(2);d(4),w(t.name),d(),g(t.id===i.activePlanId()?5:-1),d(2),w(L(8,6,t.totalIncome,"1.0-2")),d(3),$("",E(11,9,i.asDate(t.startDate))," \u2013 ",E(12,11,i.asDate(t.endDate))),d(5),m("disabled",t.id===i.activePlanId())}}function Ge(e,n){if(e&1&&(r(0,"p-table",20),z(1,Re,9,0,"ng-template",22)(2,$e,17,13,"ng-template",23),a()),e&2){let t=v();m("value",t.plans())("rowHover",!0)}}function we(e){let n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${i}`}function Le(e){let[n,t,i]=e.split("-").map(o=>Number(o));return new Date(n,(t??1)-1,i??1)}var Ee=class e{fb=s(ce);router=s(Y);store=s(Z);messages=s(J);confirm=s(U);activePlan=this.store.activePlan;plans=this.store.plans;activePlanId=q(()=>this.activePlan()?.id??null);form=this.fb.nonNullable.group({name:["",[p.required,p.minLength(3),p.maxLength(64)]],totalIncome:[0,[p.required,p.min(1)]],startDate:[new Date,[p.required]],endDate:[new Date,[p.required]]},{validators:[n=>{let t=n.get("startDate")?.value,i=n.get("endDate")?.value;return!(t instanceof Date)||!(i instanceof Date)||t<=i?null:{dateRange:!0}}]});setActive(n){this.store.setActivePlan(n),this.messages.add({severity:"success",summary:"Active plan updated",detail:"Dashboard and tracking now reflect this plan."})}submit(){if(this.form.invalid){this.form.markAllAsTouched(),this.messages.add({severity:"warn",summary:"Fix form errors",detail:"Please check required fields and date range."});return}let n=this.form.getRawValue(),t=this.store.createPlan({name:n.name,totalIncome:n.totalIncome,startDate:we(n.startDate),endDate:we(n.endDate)});this.messages.add({severity:"success",summary:"Plan created",detail:`Active plan: ${t.name}`}),this.router.navigateByUrl("/dashboard")}deletePlan(n){let t=this.plans().find(i=>i.id===n);this.confirm.confirm({header:"Delete budget plan?",message:"This will permanently delete the plan along with its categories and expenses stored on this device.",icon:"pi pi-exclamation-triangle",acceptLabel:"Delete",rejectLabel:"Cancel",accept:()=>{this.store.deletePlan(n),this.messages.add({severity:"success",summary:"Plan deleted",detail:t?`Deleted: ${t.name}`:"The plan was removed."})}})}resetAll(){this.confirm.confirm({header:"Reset all data?",message:"This clears all plans, categories, and expenses from local storage on this device. This cannot be undone.",icon:"pi pi-trash",acceptLabel:"Reset",rejectLabel:"Cancel",accept:()=>{this.store.resetAll(),this.messages.add({severity:"info",summary:"Reset complete",detail:"All local data has been cleared."}),this.form.reset({name:"",totalIncome:0,startDate:new Date,endDate:new Date})}})}asDate(n){return Le(n)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=h({type:e,selectors:[["app-plan-page"]],decls:30,vars:11,consts:[[1,"page"],[1,"grid"],["header","Create budget plan"],[1,"form",3,"ngSubmit","formGroup"],[1,"field"],["for","name"],["id","name","type","text","pInputText","","formControlName","name","autocomplete","off"],[1,"error"],["for","income"],["inputId","income","formControlName","totalIncome","mode","currency","currency","PKR",3,"min","useGrouping","maxFractionDigits"],[1,"two-col"],["for","start"],["inputId","start","formControlName","startDate",3,"showIcon"],["for","end"],["inputId","end","formControlName","endDate",3,"showIcon"],[1,"actions"],["type","submit","label","Create & Activate","icon","pi pi-check"],["type","button","severity","secondary","label","Reset all data","icon","pi pi-trash",3,"onClick"],["header","Your plans"],[1,"empty"],["dataKey","id",3,"value","rowHover"],[1,"muted"],["pTemplate","header"],["pTemplate","body"],[2,"width","12rem"],[1,"plan-name"],[1,"name"],["severity","success","value","Active"],[1,"row-actions"],["type","button","size","small","label","Activate","icon","pi pi-bolt",3,"onClick","disabled"],["type","button","size","small","severity","danger","label","Delete","icon","pi pi-trash",3,"onClick"]],template:function(t,i){t&1&&(r(0,"div",0)(1,"div",1)(2,"p-card",2)(3,"form",3),f("ngSubmit",function(){return i.submit()}),r(4,"div",4)(5,"label",5),l(6,"Plan name"),a(),c(7,"input",6),u(8,Fe,2,0,"small",7),a(),r(9,"div",4)(10,"label",8),l(11,"Total income"),a(),c(12,"p-inputNumber",9),u(13,ze,2,0,"small",7),a(),r(14,"div",10)(15,"div",4)(16,"label",11),l(17,"Start date"),a(),c(18,"p-datepicker",12),a(),r(19,"div",4)(20,"label",13),l(21,"End date"),a(),c(22,"p-datepicker",14),a()(),u(23,je,2,0,"small",7),r(24,"div",15),c(25,"p-button",16),r(26,"p-button",17),f("onClick",function(){return i.resetAll()}),a()()()(),r(27,"p-card",18),u(28,Ve,3,0,"div",19)(29,Ge,3,2,"p-table",20),a()()()),t&2&&(d(3),m("formGroup",i.form),d(4),b("aria-invalid",i.form.controls.name.invalid&&i.form.controls.name.touched),d(),g(i.form.controls.name.invalid&&i.form.controls.name.touched?8:-1),d(4),m("min",0)("useGrouping",!0)("maxFractionDigits",2),d(),g(i.form.controls.totalIncome.invalid&&i.form.controls.totalIncome.touched?13:-1),d(5),m("showIcon",!0),d(4),m("showIcon",!0),d(),g(i.form.errors!=null&&i.form.errors.dateRange?23:-1),d(5),g(i.plans().length===0?28:29))},dependencies:[C,ue,se,oe,le,de,pe,me,re,ae,Q,Me,fe,ge,be,he,ye,ve,ne,ie,Ce,_e,Pe,De,K,H],styles:[".page[_ngcontent-%COMP%]{max-width:1100px;margin:0 auto}.grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1.2fr;gap:1rem;align-items:start}.form[_ngcontent-%COMP%]{display:grid;gap:.9rem}.field[_ngcontent-%COMP%]{display:grid;gap:.35rem}.two-col[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}label[_ngcontent-%COMP%]{font-weight:600}.error[_ngcontent-%COMP%]{color:var(--red-400, #f87171)}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.25rem}.row-actions[_ngcontent-%COMP%]{display:flex;gap:.5rem;justify-content:flex-end}.plan-name[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.5rem}.muted[_ngcontent-%COMP%]{opacity:.85}@media(max-width:900px){.grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};export{Ee as PlanPage};
