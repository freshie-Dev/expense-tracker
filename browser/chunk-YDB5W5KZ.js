import{a as De}from"./chunk-XAQZXK5F.js";import{a as Se,b as Me}from"./chunk-GWNUMRZX.js";import{a as ae,b as oe,d as xe,e as he,f as ye,g as ve,h as be,i as _e,j as Ce,k as Ee,l as Te,n as we}from"./chunk-KM4FCMVA.js";import{$d as fe,Ad as _,Cb as $,Db as L,Ed as te,Ha as F,Ia as O,J as P,Ja as B,K as I,Ka as R,La as V,Lb as M,M as N,Ma as w,Mb as U,Md as ne,Nb as G,Nd as ie,O as d,Pd as re,Qd as x,Rb as v,Rd as se,Sd as le,T as C,Td as de,U as E,Va as h,Vb as g,Vd as pe,Wa as y,Wd as me,Xa as p,Xd as ce,Ya as o,Yb as b,Yd as ue,Za as a,_ as k,_a as c,_d as ge,da as A,fa as T,fb as S,fd as K,ha as z,hb as m,ib as u,jd as J,mc as q,nc as X,nd as Q,oc as Y,qd as W,sb as H,sd as Z,tb as j,td as ee,ua as l,ub as r,vb as f}from"./chunk-4ILDO5V3.js";var Pe=`
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
`;var Be=`
    ${Pe}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,Re={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},Ie=(()=>{class e extends W{name="textarea";style=Be;classes=Re;static \u0275fac=(()=>{let t;return function(s){return(t||(t=z(e)))(s||e)}})();static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})();var Ne=new N("TEXTAREA_INSTANCE"),ke=(()=>{class e extends fe{componentName="Textarea";bindDirectiveInstance=d(_,{self:!0});$pcTextarea=d(Ne,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=g();pTextareaUnstyled=g();autoResize;pSize;variant=g();fluid=g(void 0,{transform:b});invalid=g(void 0,{transform:b});$variant=v(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new k;ngControlSubscription;_componentStyle=d(Ie);ngControl=d(se,{optional:!0,self:!0});pcFluid=d(te,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),T(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t)}),T(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=B({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(i,s){i&1&&m("input",function(Fe){return s.onInput(Fe)}),i&2&&j(s.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",b],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[$([Ie,{provide:Ne,useExisting:e},{provide:ee,useExisting:e}]),R([_]),V]})}return e})(),Ae=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=O({type:e});static \u0275inj=I({})}return e})();var He=()=>({width:"min(92vw, 560px)"});function je(e,n){if(e&1){let t=S();o(0,"div",20)(1,"div",21)(2,"h2"),r(3,"Expenses"),a(),o(4,"p",22),r(5,"Log spending against a category. Remaining balances update instantly."),a()(),o(6,"p-button",23),m("onClick",function(){C(t);let s=u();return E(s.openCreate())}),a()()}if(e&2){let t=u();l(6),p("disabled",t.categories().length===0)}}function $e(e,n){e&1&&(o(0,"div",2)(1,"p",22),r(2,"Add at least one category before logging expenses."),a()())}function Le(e,n){e&1&&(o(0,"tr")(1,"th"),r(2,"Date"),a(),o(3,"th"),r(4,"Category"),a(),o(5,"th"),r(6,"Description"),a(),o(7,"th",26),r(8,"Amount"),a(),o(9,"th",27),r(10,"Actions"),a()())}function Ue(e,n){if(e&1){let t=S();o(0,"tr")(1,"td"),r(2),M(3,"date"),a(),o(4,"td"),r(5),a(),o(6,"td",28),r(7),a(),o(8,"td",26),r(9),M(10,"number"),a(),o(11,"td")(12,"div",29)(13,"p-button",30),m("onClick",function(){let s=C(t).$implicit,D=u(2);return E(D.remove(s))}),a()()()()}if(e&2){let t=n.$implicit,i=u(2);l(2),f(U(3,4,i.asDate(t.date))),l(3),f(i.categoryName(t.categoryId)),l(2),f(t.description??"\u2014"),l(2),f(G(10,6,t.amount,"1.0-2"))}}function Ge(e,n){e&1&&(o(0,"tr")(1,"td",31)(2,"div",2)(3,"p",22),r(4,"No expenses yet. Add one to start tracking."),a()()()())}function qe(e,n){if(e&1&&(o(0,"p-table",3),w(1,Le,11,0,"ng-template",1)(2,Ue,14,9,"ng-template",24)(3,Ge,5,0,"ng-template",25),a()),e&2){let t=u();p("value",t.expenses())("rowHover",!0)}}function Xe(e,n){e&1&&(o(0,"small",9),r(1,"Category is required."),a())}function Ye(e,n){e&1&&(o(0,"small",9),r(1,"Amount must be greater than 0."),a())}function Ke(e){let n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),i=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${i}`}function Je(e){let[n,t,i]=e.split("-").map(s=>Number(s));return new Date(n,(t??1)-1,i??1)}var ze=class e{store=d(Z);fb=d(ue);messages=d(J);confirm=d(K);plan=this.store.activePlan;categories=this.store.categoriesForActivePlan;spentByCategoryId=this.store.spentByCategoryId;expenses=this.store.expensesForActivePlan;settings=this.store.settings;categoryById=v(()=>{let n=new Map;for(let t of this.categories())n.set(t.id,t);return n});dialogOpen=A(!1);form=this.fb.nonNullable.group({categoryId:["",[x.required]],amount:[0,[x.required,x.min(.01)]],date:[new Date,[x.required]],description:[""]});openCreate(){let n=this.categories()[0];this.form.reset({categoryId:n?.id??"",amount:0,date:new Date,description:""}),this.dialogOpen.set(!0)}closeDialog(){this.dialogOpen.set(!1)}categoryRemainingAfter(n,t){let i=this.categoryById().get(n);if(!i)return 0;let s=this.spentByCategoryId().get(n)??0;return Math.round((i.allocatedAmount-s-t)*100)/100}save(){if(this.form.invalid){this.form.markAllAsTouched(),this.messages.add({severity:"warn",summary:"Fix form errors",detail:"Please select a category and enter an amount."});return}let n=this.form.getRawValue(),t=this.categoryRemainingAfter(n.categoryId,n.amount),i=this.settings().overspendBehavior,s=()=>{this.store.addExpense({categoryId:n.categoryId,amount:n.amount,date:Ke(n.date),description:n.description}),this.messages.add({severity:t<0?"warn":"success",summary:"Expense added",detail:t<0?"This category is now over budget.":"Logged successfully."}),this.dialogOpen.set(!1)};if(t<0&&i==="block"){this.messages.add({severity:"error",summary:"Overspending blocked",detail:"This expense would exceed the category budget. Change amount or allocation."});return}if(t<0&&i==="warn"){this.confirm.confirm({header:"Category will exceed budget",message:"Add this expense anyway?",icon:"pi pi-exclamation-triangle",acceptLabel:"Add",rejectLabel:"Cancel",accept:s});return}s()}remove(n){this.confirm.confirm({header:"Delete expense?",message:"This will remove the expense entry from this device.",icon:"pi pi-trash",acceptLabel:"Delete",rejectLabel:"Cancel",accept:()=>{this.store.deleteExpense(n.id),this.messages.add({severity:"success",summary:"Expense deleted",detail:"Removed successfully."})}})}categoryName(n){return this.categoryById().get(n)?.name??"Unknown"}asDate(n){return Je(n)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=F({type:e,selectors:[["app-expenses-page"]],decls:29,vars:16,consts:[[1,"page"],["pTemplate","header"],[1,"empty"],["dataKey","id",3,"value","rowHover"],["header","Add expense",3,"onHide","visible","modal","draggable","closable"],[1,"form",3,"ngSubmit","formGroup"],[1,"field"],["for","cat"],["inputId","cat","optionLabel","name","optionValue","id","formControlName","categoryId","placeholder","Select a category",3,"options"],[1,"error"],[1,"two-col"],["for","amt"],["inputId","amt","formControlName","amount","mode","decimal",3,"min","useGrouping","maxFractionDigits"],["for","dt"],["inputId","dt","formControlName","date",3,"showIcon"],["for","desc"],["id","desc","pTextarea","","rows","3","formControlName","description"],[1,"dialog-actions"],["type","button","severity","secondary","label","Cancel",3,"onClick"],["type","submit","label","Add","icon","pi pi-check"],[1,"header"],[1,"title"],[1,"muted"],["label","Add Expense","icon","pi pi-plus",3,"onClick","disabled"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"num"],[2,"width","9rem"],[1,"desc"],[1,"row-actions"],["type","button","size","small","severity","danger","icon","pi pi-trash","label","Delete",3,"onClick"],["colspan","5"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"p-card"),w(2,je,7,1,"ng-template",1),h(3,$e,3,0,"div",2)(4,qe,4,2,"p-table",3),a(),o(5,"p-dialog",4),m("onHide",function(){return i.closeDialog()}),o(6,"form",5),m("ngSubmit",function(){return i.save()}),o(7,"div",6)(8,"label",7),r(9,"Category"),a(),c(10,"p-select",8),h(11,Xe,2,0,"small",9),a(),o(12,"div",10)(13,"div",6)(14,"label",11),r(15,"Amount"),a(),c(16,"p-inputNumber",12),h(17,Ye,2,0,"small",9),a(),o(18,"div",6)(19,"label",13),r(20,"Date"),a(),c(21,"p-datepicker",14),a()(),o(22,"div",6)(23,"label",15),r(24,"Description (optional)"),a(),c(25,"textarea",16),a(),o(26,"div",17)(27,"p-button",18),m("onClick",function(){return i.closeDialog()}),a(),c(28,"p-button",19),a()()()()),t&2&&(l(3),y(i.categories().length===0?3:4),l(2),H(L(15,He)),p("visible",i.dialogOpen())("modal",!0)("draggable",!1)("closable",!0),l(),p("formGroup",i.form),l(4),p("options",i.categories()),l(),y(i.form.controls.categoryId.invalid&&i.form.controls.categoryId.touched?11:-1),l(5),p("min",0)("useGrouping",!0)("maxFractionDigits",2),l(),y(i.form.controls.amount.invalid&&i.form.controls.amount.touched?17:-1),l(4),p("showIcon",!0))},dependencies:[Y,ge,pe,re,le,de,ce,me,De,Q,oe,ae,Te,Ee,Me,Se,Ce,_e,be,ve,xe,Ae,ke,ye,he,ie,ne,we,X,q],styles:[".page[_ngcontent-%COMP%]{max-width:1100px;margin:0 auto}.header[_ngcontent-%COMP%]{display:flex;gap:1rem;align-items:start;justify-content:space-between;padding:1rem 1rem 0}.title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.muted[_ngcontent-%COMP%]{margin:.25rem 0 0;opacity:.85}.num[_ngcontent-%COMP%]{text-align:right}.desc[_ngcontent-%COMP%]{max-width:34rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.row-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.empty[_ngcontent-%COMP%]{padding:1rem}.form[_ngcontent-%COMP%]{display:grid;gap:.9rem}.field[_ngcontent-%COMP%]{display:grid;gap:.35rem}.two-col[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.error[_ngcontent-%COMP%]{color:var(--red-400, #f87171)}.dialog-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.5rem;margin-top:.25rem}@media(max-width:700px){.two-col[_ngcontent-%COMP%]{grid-template-columns:1fr}.desc[_ngcontent-%COMP%]{max-width:16rem}}"]})};export{ze as ExpensesPage};
