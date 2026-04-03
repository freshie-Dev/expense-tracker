import{c as U}from"./chunk-AZ4DW5N6.js";import{a as oe,b as le,c as fe,d as ye,e as he,f as be,g as _e,h as Ce,k as De,l as Pe,m as Ie,n as xe}from"./chunk-VFFFMUWT.js";import{$d as ge,Cb as L,Dd as h,Ed as P,Ga as b,Ha as B,J as k,Ja as F,K as N,Ka as z,La as R,Lb as C,M as A,Mb as T,Nb as q,O as m,Pd as ae,Qd as re,Rb as H,Sa as _,Sd as de,T as x,Td as p,U as w,Va as u,Vd as se,Wa as g,Wd as me,Xa as s,Ya as r,Yd as pe,Za as a,Zd as ce,_a as c,_d as ue,be as ve,da as v,fb as j,ga as S,hb as f,hd as J,ib as y,jb as V,kb as O,ld as Q,mc as K,nc as Y,oc as D,pd as W,qd as X,sb as $,sd as Z,ta as l,tb as M,ub as d,ud as ee,vb as E,vd as te,wd as ie,xb as G,xd as ne}from"./chunk-JIWESJUO.js";var we=`
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
`;var Ae=["*"],Be={root:({instance:e})=>({justifyContent:e.layout==="horizontal"?e.align==="center"||e.align==null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align==null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null})},Fe={root:({instance:e})=>["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}],content:"p-divider-content"},Se=(()=>{class e extends Z{name="divider";style=we;classes=Fe;inlineStyles=Be;static \u0275fac=(()=>{let i;return function(o){return(i||(i=S(e)))(o||e)}})();static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Me=new A("DIVIDER_INSTANCE"),ze=(()=>{class e extends ne{componentName="Divider";$pcDivider=m(Me,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=m(h,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=m(Se);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let i;return function(o){return(i||(i=S(e)))(o||e)}})();static \u0275cmp=b({type:e,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(t,o){t&2&&(_("aria-orientation",o.layout)("data-p",o.dataP),$(o.sx("root")),M(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[L([Se,{provide:Me,useExisting:e},{provide:ie,useExisting:e}]),F([h]),z],ngContentSelectors:Ae,decls:2,vars:3,consts:[[3,"pBind"]],template:function(t,o){t&1&&(V(),r(0,"div",0),O(1),a()),t&2&&(M(o.cx("content")),s("pBind",o.ptm("content")))},dependencies:[D,X,P,h],encapsulation:2,changeDetection:0})}return e})(),Ee=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=B({type:e});static \u0275inj=N({imports:[ze,P,P]})}return e})();function Re(e,n){e&1&&(r(0,"small",7),d(1,"Enter a name (3\u201364 characters)."),a())}function je(e,n){e&1&&(r(0,"small",7),d(1,"Income must be greater than 0."),a())}function Ve(e,n){e&1&&(r(0,"small",7),d(1,"End date must be on or after start date."),a())}function Oe(e,n){e&1&&(r(0,"div",19)(1,"p",21),d(2,"No plans yet. Create your first plan to start tracking."),a()())}function $e(e,n){e&1&&(r(0,"tr")(1,"th"),d(2,"Name"),a(),r(3,"th"),d(4,"Income"),a(),r(5,"th"),d(6,"Dates"),a(),r(7,"th",24),d(8,"Actions"),a()())}function Ge(e,n){e&1&&c(0,"p-tag",27)}function Le(e,n){if(e&1){let i=j();r(0,"tr")(1,"td")(2,"div",25)(3,"span",26),d(4),a(),u(5,Ge,1,0,"p-tag",27),a()(),r(6,"td"),d(7),C(8,"number"),a(),r(9,"td"),d(10),C(11,"date"),C(12,"date"),a(),r(13,"td")(14,"div",28)(15,"p-button",29),f("onClick",function(){let o=x(i).$implicit,I=y(2);return w(I.setActive(o.id))}),a(),r(16,"p-button",30),f("onClick",function(){let o=x(i).$implicit,I=y(2);return w(I.deletePlan(o.id))}),a()()()()}if(e&2){let i=n.$implicit,t=y(2);l(4),E(i.name),l(),g(i.id===t.activePlanId()?5:-1),l(2),E(q(8,9,i.totalIncome,"1.0-2")),l(3),G("",T(11,12,t.asDate(i.startDate))," \u2013 ",T(12,14,t.asDate(i.endDate))),l(5),s("loading",t.activatingId()===i.id)("disabled",i.id===t.activePlanId()||t.activatingId()!==null||t.deletingId()!==null),l(),s("loading",t.deletingId()===i.id)("disabled",t.activatingId()!==null||t.deletingId()!==null)}}function qe(e,n){if(e&1&&(r(0,"p-table",20),R(1,$e,9,0,"ng-template",22)(2,Le,17,16,"ng-template",23),a()),e&2){let i=y();s("value",i.plans())("rowHover",!0)}}function Te(e){let n=e.getFullYear(),i=String(e.getMonth()+1).padStart(2,"0"),t=String(e.getDate()).padStart(2,"0");return`${n}-${i}-${t}`}function He(e){let[n,i,t]=e.split("-").map(o=>Number(o));return new Date(n,(i??1)-1,t??1)}var ke=class e{fb=m(ge);router=m(U);store=m(te);messages=m(Q);confirm=m(J);activePlan=this.store.activePlan;plans=this.store.plans;creating=v(!1);activatingId=v(null);deletingId=v(null);resetting=v(!1);activePlanId=H(()=>this.activePlan()?.id??null);form=this.fb.nonNullable.group({name:["",[p.required,p.minLength(3),p.maxLength(64)]],totalIncome:[0,[p.required,p.min(1)]],startDate:[new Date,[p.required]],endDate:[new Date,[p.required]]},{validators:[n=>{let i=n.get("startDate")?.value,t=n.get("endDate")?.value;return!(i instanceof Date)||!(t instanceof Date)||i<=t?null:{dateRange:!0}}]});async setActive(n){this.activatingId.set(n);try{await this.store.setActivePlan(n),this.messages.add({severity:"success",summary:"Active plan updated",detail:"Dashboard and tracking now reflect this plan."})}catch(i){this.showError(i,"Could not activate plan")}finally{this.activatingId.set(null)}}async submit(){if(this.form.invalid){this.form.markAllAsTouched(),this.messages.add({severity:"warn",summary:"Fix form errors",detail:"Please check required fields and date range."});return}let n=this.form.getRawValue();this.creating.set(!0);try{let i=await this.store.createPlan({name:n.name,totalIncome:n.totalIncome,startDate:Te(n.startDate),endDate:Te(n.endDate)});this.messages.add({severity:"success",summary:"Plan created",detail:`Active plan: ${i.name}`}),this.router.navigateByUrl("/dashboard")}catch(i){this.showError(i,"Could not create plan")}finally{this.creating.set(!1)}}deletePlan(n){let i=this.plans().find(t=>t.id===n);this.confirm.confirm({header:"Delete budget plan?",message:"This will delete the plan and its categories and expenses on the server.",icon:"pi pi-exclamation-triangle",acceptLabel:"Delete",rejectLabel:"Cancel",accept:()=>{this.runDeletePlan(n,i?.name)}})}async runDeletePlan(n,i){this.deletingId.set(n);try{await this.store.deletePlan(n),this.messages.add({severity:"success",summary:"Plan deleted",detail:i?`Deleted: ${i}`:"The plan was removed."})}catch(t){this.showError(t,"Could not delete plan")}finally{this.deletingId.set(null)}}resetAll(){this.confirm.confirm({header:"Reset all data?",message:"This deletes all budget plans (and related data) on the server and clears the local cache.",icon:"pi pi-trash",acceptLabel:"Reset",rejectLabel:"Cancel",accept:()=>{this.runResetAll()}})}async runResetAll(){this.resetting.set(!0);try{await this.store.resetAll(),this.messages.add({severity:"info",summary:"Reset complete",detail:"All data has been cleared."}),this.form.reset({name:"",totalIncome:0,startDate:new Date,endDate:new Date})}catch(n){this.showError(n,"Could not reset data")}finally{this.resetting.set(!1)}}showError(n,i){let t=n instanceof ee?n.message:i;this.messages.add({severity:"error",summary:"Error",detail:t})}asDate(n){return He(n)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=b({type:e,selectors:[["app-plan-page"]],decls:30,vars:15,consts:[[1,"page"],[1,"grid"],["header","Create budget plan"],[1,"form",3,"ngSubmit","formGroup"],[1,"field"],["for","name"],["id","name","type","text","pInputText","","formControlName","name","autocomplete","off"],[1,"error"],["for","income"],["inputId","income","formControlName","totalIncome","mode","currency","currency","PKR",3,"min","useGrouping","maxFractionDigits"],[1,"two-col"],["for","start"],["inputId","start","formControlName","startDate",3,"showIcon"],["for","end"],["inputId","end","formControlName","endDate",3,"showIcon"],[1,"actions"],["type","submit","label","Create & Activate","icon","pi pi-check",3,"loading","disabled"],["type","button","severity","secondary","label","Reset all data","icon","pi pi-trash",3,"onClick","loading","disabled"],["header","Your plans"],[1,"empty"],["dataKey","id",3,"value","rowHover"],[1,"muted"],["pTemplate","header"],["pTemplate","body"],[2,"width","12rem"],[1,"plan-name"],[1,"name"],["severity","success","value","Active"],[1,"row-actions"],["type","button","size","small","label","Activate","icon","pi pi-bolt",3,"onClick","loading","disabled"],["type","button","size","small","severity","danger","label","Delete","icon","pi pi-trash",3,"onClick","loading","disabled"]],template:function(i,t){i&1&&(r(0,"div",0)(1,"div",1)(2,"p-card",2)(3,"form",3),f("ngSubmit",function(){return t.submit()}),r(4,"div",4)(5,"label",5),d(6,"Plan name"),a(),c(7,"input",6),u(8,Re,2,0,"small",7),a(),r(9,"div",4)(10,"label",8),d(11,"Total income"),a(),c(12,"p-inputNumber",9),u(13,je,2,0,"small",7),a(),r(14,"div",10)(15,"div",4)(16,"label",11),d(17,"Start date"),a(),c(18,"p-datepicker",12),a(),r(19,"div",4)(20,"label",13),d(21,"End date"),a(),c(22,"p-datepicker",14),a()(),u(23,Ve,2,0,"small",7),r(24,"div",15),c(25,"p-button",16),r(26,"p-button",17),f("onClick",function(){return t.resetAll()}),a()()()(),r(27,"p-card",18),u(28,Oe,3,0,"div",19)(29,qe,3,2,"p-table",20),a()()()),i&2&&(l(3),s("formGroup",t.form),l(4),_("aria-invalid",t.form.controls.name.invalid&&t.form.controls.name.touched),l(),g(t.form.controls.name.invalid&&t.form.controls.name.touched?8:-1),l(4),s("min",0)("useGrouping",!0)("maxFractionDigits",2),l(),g(t.form.controls.totalIncome.invalid&&t.form.controls.totalIncome.touched?13:-1),l(5),s("showIcon",!0),l(4),s("showIcon",!0),l(),g(t.form.errors!=null&&t.form.errors.dateRange?23:-1),l(2),s("loading",t.creating())("disabled",t.creating()||t.resetting()),l(),s("loading",t.resetting())("disabled",t.creating()||t.resetting()),l(2),g(t.plans().length===0?28:29))},dependencies:[D,ve,pe,de,se,me,ue,ce,le,oe,W,Ee,ye,fe,Ce,_e,be,he,re,ae,Pe,De,xe,Ie,Y,K],styles:[".page[_ngcontent-%COMP%]{max-width:1100px;margin:0 auto}.grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1.2fr;gap:1rem;align-items:start}.form[_ngcontent-%COMP%]{display:grid;gap:.9rem}.field[_ngcontent-%COMP%]{display:grid;gap:.35rem}.two-col[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}label[_ngcontent-%COMP%]{font-weight:600}.error[_ngcontent-%COMP%]{color:var(--red-400, #f87171)}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.25rem}.row-actions[_ngcontent-%COMP%]{display:flex;gap:.5rem;justify-content:flex-end}.plan-name[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.5rem}.muted[_ngcontent-%COMP%]{opacity:.85}@media(max-width:900px){.grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};export{ke as PlanPage};
