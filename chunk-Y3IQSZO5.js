import{a as Pe}from"./chunk-QB5G6KHK.js";import{a as Me,b as Ie}from"./chunk-B7H36SHU.js";import{a as oe,b as se,d as he,e as ve,f as be,g as _e,h as Ce,i as Ee,j as we,k as Te,l as Se,n as De}from"./chunk-VFFFMUWT.js";import{$d as fe,Cb as U,Db as G,Dd as E,Ga as B,Ha as R,Hd as ie,Ia as V,J as k,Ja as H,K as A,Ka as j,La as M,Lb as P,M as z,Mb as q,Nb as X,O as l,Pd as ae,Qd as re,Rb as _,Sd as de,T,Td as y,U as S,Ud as le,Va as v,Vb as f,Vd as pe,Wa as b,Wd as me,Xa as p,Ya as r,Yb as C,Yd as ce,Za as a,Zd as ue,_ as F,_a as u,_d as ge,be as xe,ce as ye,da as h,ea as D,fb as I,ga as O,hb as c,hd as Q,ib as g,ld as W,mc as Y,nc as K,oc as J,pd as Z,sb as $,sd as ee,ta as d,tb as L,ub as o,ud as N,vb as x,vd as te,wd as ne}from"./chunk-JIWESJUO.js";var Ne=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var Re=`
    ${Ne}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,Ve={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},ke=(()=>{class e extends ee{name="textarea";style=Re;classes=Ve;static \u0275fac=(()=>{let t;return function(s){return(t||(t=O(e)))(s||e)}})();static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Ae=new z("TEXTAREA_INSTANCE"),ze=(()=>{class e extends ye{componentName="Textarea";bindDirectiveInstance=l(E,{self:!0});$pcTextarea=l(Ae,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=f();pTextareaUnstyled=f();autoResize;pSize;variant=f();fluid=f(void 0,{transform:C});invalid=f(void 0,{transform:C});$variant=_(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new F;ngControlSubscription;_componentStyle=l(ke);ngControl=l(le,{optional:!0,self:!0});pcFluid=l(ie,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),D(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t)}),D(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=V({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(n,s){n&1&&c("input",function(w){return s.onInput(w)}),n&2&&L(s.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",C],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[U([ke,{provide:Ae,useExisting:e},{provide:ne,useExisting:e}]),H([E]),j]})}return e})(),Fe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=R({type:e});static \u0275inj=A({})}return e})();var je=()=>({width:"min(92vw, 560px)"});function $e(e,i){if(e&1){let t=I();r(0,"div",20)(1,"div",21)(2,"h2"),o(3,"Expenses"),a(),r(4,"p",22),o(5,"Log spending against a category. Remaining balances update instantly."),a()(),r(6,"p-button",23),c("onClick",function(){T(t);let s=g();return S(s.openCreate())}),a()()}if(e&2){let t=g();d(6),p("disabled",t.categories().length===0||t.deletingId()!==null)}}function Le(e,i){e&1&&(r(0,"div",2)(1,"p",22),o(2,"Add at least one category before logging expenses."),a()())}function Ue(e,i){e&1&&(r(0,"tr")(1,"th"),o(2,"Date"),a(),r(3,"th"),o(4,"Category"),a(),r(5,"th"),o(6,"Description"),a(),r(7,"th",26),o(8,"Amount"),a(),r(9,"th",27),o(10,"Actions"),a()())}function Ge(e,i){if(e&1){let t=I();r(0,"tr")(1,"td"),o(2),P(3,"date"),a(),r(4,"td"),o(5),a(),r(6,"td",28),o(7),a(),r(8,"td",26),o(9),P(10,"number"),a(),r(11,"td")(12,"div",29)(13,"p-button",30),c("onClick",function(){let s=T(t).$implicit,m=g(2);return S(m.remove(s))}),a()()()()}if(e&2){let t=i.$implicit,n=g(2);d(2),x(q(3,4,n.asDate(t.date))),d(3),x(n.categoryName(t.categoryId)),d(2),x(t.description??"\u2014"),d(2),x(X(10,6,t.amount,"1.0-2"))}}function qe(e,i){e&1&&(r(0,"tr")(1,"td",31)(2,"div",2)(3,"p",22),o(4,"No expenses yet. Add one to start tracking."),a()()()())}function Xe(e,i){if(e&1&&(r(0,"p-table",3),M(1,Ue,11,0,"ng-template",1)(2,Ge,14,9,"ng-template",24)(3,qe,5,0,"ng-template",25),a()),e&2){let t=g();p("value",t.expenses())("rowHover",!0)}}function Ye(e,i){e&1&&(r(0,"small",9),o(1,"Category is required."),a())}function Ke(e,i){e&1&&(r(0,"small",9),o(1,"Amount must be greater than 0."),a())}function Je(e){let i=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${i}-${t}-${n}`}function Qe(e){let[i,t,n]=e.split("-").map(s=>Number(s));return new Date(i,(t??1)-1,n??1)}var Oe=class e{store=l(te);fb=l(fe);messages=l(W);confirm=l(Q);plan=this.store.activePlan;categories=this.store.categoriesForActivePlan;spentByCategoryId=this.store.spentByCategoryId;expenses=this.store.expensesForActivePlan;settings=this.store.settings;categoryById=_(()=>{let i=new Map;for(let t of this.categories())i.set(t.id,t);return i});dialogOpen=h(!1);adding=h(!1);deletingId=h(null);form=this.fb.nonNullable.group({categoryId:["",[y.required]],amount:[0,[y.required,y.min(.01)]],date:[new Date,[y.required]],description:[""]});openCreate(){let i=this.categories()[0];this.form.reset({categoryId:i?.id??"",amount:0,date:new Date,description:""}),this.dialogOpen.set(!0)}closeDialog(){this.dialogOpen.set(!1)}categoryRemainingAfter(i,t){let n=this.categoryById().get(i);if(!n)return 0;let s=this.spentByCategoryId().get(i)??0;return Math.round((n.allocatedAmount-s-t)*100)/100}save(){if(this.form.invalid){this.form.markAllAsTouched(),this.messages.add({severity:"warn",summary:"Fix form errors",detail:"Please select a category and enter an amount."});return}let i=this.form.getRawValue(),t=this.categoryRemainingAfter(i.categoryId,i.amount),n=this.settings().overspendBehavior,s=async()=>{this.adding.set(!0);try{let{warning:m}=await this.store.addExpense({categoryId:i.categoryId,amount:i.amount,date:Je(i.date),description:i.description});m?this.messages.add({severity:"warn",summary:"Overspending",detail:m}):this.messages.add({severity:t<0?"warn":"success",summary:"Expense added",detail:t<0?"This category is now over budget.":"Logged successfully."}),this.dialogOpen.set(!1)}catch(m){let w=m instanceof N?m.message:"Could not add expense";this.messages.add({severity:"error",summary:"Error",detail:w})}finally{this.adding.set(!1)}};if(t<0&&n==="block"){this.messages.add({severity:"error",summary:"Overspending blocked",detail:"This expense would exceed the category budget. Change amount or allocation."});return}if(t<0&&n==="warn"){this.confirm.confirm({header:"Category will exceed budget",message:"Add this expense anyway?",icon:"pi pi-exclamation-triangle",acceptLabel:"Add",rejectLabel:"Cancel",accept:()=>{s()}});return}s()}remove(i){this.confirm.confirm({header:"Delete expense?",message:"This will remove the expense on the server.",icon:"pi pi-trash",acceptLabel:"Delete",rejectLabel:"Cancel",accept:()=>{this.runDelete(i)}})}async runDelete(i){this.deletingId.set(i.id);try{await this.store.deleteExpense(i.id),this.messages.add({severity:"success",summary:"Expense deleted",detail:"Removed successfully."})}catch(t){let n=t instanceof N?t.message:"Could not delete expense";this.messages.add({severity:"error",summary:"Error",detail:n})}finally{this.deletingId.set(null)}}categoryName(i){return this.categoryById().get(i)?.name??"Unknown"}asDate(i){return Qe(i)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-expenses-page"]],decls:29,vars:19,consts:[[1,"page"],["pTemplate","header"],[1,"empty"],["dataKey","id",3,"value","rowHover"],["header","Add expense",3,"onHide","visible","modal","draggable","closable"],[1,"form",3,"ngSubmit","formGroup"],[1,"field"],["for","cat"],["inputId","cat","optionLabel","name","optionValue","id","formControlName","categoryId","placeholder","Select a category",3,"options"],[1,"error"],[1,"two-col"],["for","amt"],["inputId","amt","formControlName","amount","mode","decimal",3,"min","useGrouping","maxFractionDigits"],["for","dt"],["inputId","dt","formControlName","date",3,"showIcon"],["for","desc"],["id","desc","pTextarea","","rows","3","formControlName","description"],[1,"dialog-actions"],["type","button","severity","secondary","label","Cancel",3,"onClick","disabled"],["type","submit","label","Add","icon","pi pi-check",3,"loading","disabled"],[1,"header"],[1,"title"],[1,"muted"],["label","Add Expense","icon","pi pi-plus",3,"onClick","disabled"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"num"],[2,"width","9rem"],[1,"desc"],[1,"row-actions"],["type","button","size","small","severity","danger","icon","pi pi-trash","label","Delete",3,"onClick"],["colspan","5"]],template:function(t,n){t&1&&(r(0,"div",0)(1,"p-card"),M(2,$e,7,1,"ng-template",1),v(3,Le,3,0,"div",2)(4,Xe,4,2,"p-table",3),a(),r(5,"p-dialog",4),c("onHide",function(){return n.closeDialog()}),r(6,"form",5),c("ngSubmit",function(){return n.save()}),r(7,"div",6)(8,"label",7),o(9,"Category"),a(),u(10,"p-select",8),v(11,Ye,2,0,"small",9),a(),r(12,"div",10)(13,"div",6)(14,"label",11),o(15,"Amount"),a(),u(16,"p-inputNumber",12),v(17,Ke,2,0,"small",9),a(),r(18,"div",6)(19,"label",13),o(20,"Date"),a(),u(21,"p-datepicker",14),a()(),r(22,"div",6)(23,"label",15),o(24,"Description (optional)"),a(),u(25,"textarea",16),a(),r(26,"div",17)(27,"p-button",18),c("onClick",function(){return n.closeDialog()}),a(),u(28,"p-button",19),a()()()()),t&2&&(d(3),b(n.categories().length===0?3:4),d(2),$(G(18,je)),p("visible",n.dialogOpen())("modal",!0)("draggable",!1)("closable",!0),d(),p("formGroup",n.form),d(4),p("options",n.categories()),d(),b(n.form.controls.categoryId.invalid&&n.form.controls.categoryId.touched?11:-1),d(5),p("min",0)("useGrouping",!0)("maxFractionDigits",2),d(),b(n.form.controls.amount.invalid&&n.form.controls.amount.touched?17:-1),d(4),p("showIcon",!0),d(6),p("disabled",n.adding()),d(),p("loading",n.adding())("disabled",n.adding()))},dependencies:[J,xe,ce,de,pe,me,ge,ue,Pe,Z,se,oe,Se,Te,Ie,Me,we,Ee,Ce,_e,he,Fe,ze,be,ve,re,ae,De,K,Y],styles:[".page[_ngcontent-%COMP%]{max-width:1100px;margin:0 auto}.header[_ngcontent-%COMP%]{display:flex;gap:1rem;align-items:start;justify-content:space-between;padding:1rem 1rem 0}.title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.muted[_ngcontent-%COMP%]{margin:.25rem 0 0;opacity:.85}.num[_ngcontent-%COMP%]{text-align:right}.desc[_ngcontent-%COMP%]{max-width:34rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.empty[_ngcontent-%COMP%]{padding:1rem}.form[_ngcontent-%COMP%]{display:grid;gap:.9rem}.field[_ngcontent-%COMP%]{display:grid;gap:.35rem}.two-col[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.error[_ngcontent-%COMP%]{color:var(--red-400, #f87171)}.dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.5rem;margin-top:.25rem}@media(max-width:700px){.two-col[_ngcontent-%COMP%]{grid-template-columns:1fr}.desc[_ngcontent-%COMP%]{max-width:16rem}}"]})};export{Oe as ExpensesPage};
