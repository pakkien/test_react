import{r as b,j as s,G as v,V as x,H as e}from"./index-Cl5CWA3E.js";const h=b.forwardRef(({id:n,className:m,children:d,isInline:r,isValid:l,isTouched:i,invalidFeedback:o,validFeedback:c,isTooltipFeedback:t,...f},p)=>s.jsxs(s.Fragment,{children:[s.jsx("div",{ref:p,id:n,className:v({"is-invalid":!l&&i&&o,"is-valid":!l&&i&&!o},m),...f,children:b.Children.map(d,a=>b.cloneElement(a,{isInline:a.props.isInline||r,isValid:l,isTouched:i,invalidFeedback:o,validFeedback:c,isTooltipFeedback:t,isValidMessage:!1}))}),s.jsx(x,{isTouched:i,invalidFeedback:o,validFeedback:c,isTooltip:t})]}));h.displayName="ChecksGroup";h.propTypes={id:e.string,className:e.string,children:e.node.isRequired,isInline:e.bool,isTouched:e.bool,isValid:e.bool,invalidFeedback:e.string,validFeedback:e.string,isTooltipFeedback:e.bool};h.defaultProps={id:void 0,className:void 0,isInline:!1,isTouched:!1,isValid:!1,invalidFeedback:void 0,validFeedback:void 0,isTooltipFeedback:!1};const g=b.forwardRef(({id:n,className:m,name:d,type:r,label:l,value:i,checked:o,disabled:c,isInline:t,isFormCheckInput:f,isValid:p,isTouched:a,invalidFeedback:u,validFeedback:N,isValidMessage:I,isTooltipFeedback:F,onBlur:T,onChange:j,onFocus:y,onInput:C,onInvalid:V,onSelect:w,ariaLabel:R,...E},O)=>{const k=s.jsx("input",{ref:O,className:v("form-check-input",{"mt-0":f,"is-invalid":!p&&a&&u,"is-valid":!p&&a&&!u},m),name:d===null?n:d,type:r==="radio"?"radio":"checkbox",id:n,value:i,checked:r==="radio"?o===i:!!o,disabled:c,onBlur:T,onChange:j,onFocus:y,onInput:C,onInvalid:V,onSelect:w,"aria-label":R,...E});return f?k:s.jsxs("div",{className:v("form-check",{"form-switch":r==="switch","form-check-inline":t}),children:[k,l&&s.jsx("label",{className:"form-check-label",htmlFor:n,children:l}),I&&s.jsx(x,{isTouched:a,invalidFeedback:u,validFeedback:N,isTooltip:F})]})});g.displayName="Checks";g.propTypes={id:e.string,className:e.string,name:e.string,type:e.oneOf(["checkbox","radio","switch"]),label:e.oneOfType([e.string,e.node]),value:e.oneOfType([e.string,e.number]),checked:e.oneOfType([e.string,e.bool]),disabled:e.bool,isInline:e.bool,isFormCheckInput:e.bool,isTouched:e.bool,isValid:e.bool,invalidFeedback:e.string,validFeedback:e.string,isValidMessage:e.bool,isTooltipFeedback:e.bool,onBlur:e.func,onChange:e.func,onFocus:e.func,onInput:e.func,onInvalid:e.func,onSelect:e.func,ariaLabel:e.string};g.defaultProps={id:void 0,className:void 0,name:null,type:"checkbox",label:null,checked:!1,disabled:!1,isInline:!1,isFormCheckInput:!1,isTouched:!1,isValid:!1,invalidFeedback:void 0,validFeedback:void 0,isValidMessage:!0,isTooltipFeedback:!1,onBlur:void 0,onChange:void 0,onFocus:void 0,onInput:void 0,onInvalid:void 0,onSelect:void 0,ariaLabel:void 0};export{g as C};