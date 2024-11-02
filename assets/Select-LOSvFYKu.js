import{o as e,j as l,r as C,n as D,V as E}from"./index-4mTFlNZn.js";const s=({children:i,value:a,disabled:r,ariaLabelledby:n,...o})=>l.jsx("option",{value:a,disabled:r,"aria-labelledby":n||i,...o,children:i});s.propTypes={children:e.string.isRequired,value:e.oneOfType([e.string,e.number]),disabled:e.bool,ariaLabelledby:e.string};s.defaultProps={disabled:!1,ariaLabelledby:null,value:void 0};const g=({list:i})=>i==null?void 0:i.map(a=>l.jsx(s,{value:a.value,...a,children:a.text||a.label},a.value));g.propTypes={list:e.arrayOf(e.shape({value:e.oneOfType([e.string,e.number]),text:e.oneOfType([e.string,e.number]),label:e.oneOfType([e.string,e.number])})).isRequired};const b=C.forwardRef(({id:i,name:a,className:r,children:n,required:o,placeholder:d,ariaDescribedby:y,ariaLabelledby:m,ariaLabel:O,list:p,multiple:T,title:x,size:c,disabled:h,value:f,defaultValue:j,isValid:v,isTouched:t,invalidFeedback:u,validFeedback:F,isValidMessage:V,isTooltipFeedback:q,onBlur:L,onChange:N,onFocus:R,onInput:S,onInvalid:k,onSelect:I,...P},B)=>l.jsxs(l.Fragment,{children:[l.jsxs("select",{ref:B,id:i,className:D("form-select",{[`form-select-${c}`]:c,"text-muted":f===""&&d,"is-invalid":!v&&t&&u,"is-valid":!v&&t&&!u},r),name:a,"aria-label":O,"aria-describedby":y,"aria-labelledby":m,multiple:T,disabled:h,title:x,value:f,defaultValue:j,required:o,onBlur:L,onChange:N,onFocus:R,onInput:S,onInvalid:k,onSelect:I,...P,children:[d&&l.jsx(s,{value:"",hidden:!0,children:d}),n||p&&l.jsx(g,{list:p})]}),V&&l.jsx(E,{isTouched:t,invalidFeedback:u,validFeedback:F,isTooltip:q})]}));b.displayName="Select";b.propTypes={id:e.string,className:e.string,name:e.string,children:e.node,ariaLabel:e.string.isRequired,placeholder:e.string,size:e.oneOf(["lg","sm"]),multiple:e.bool,disabled:e.bool,required:e.bool,ariaDescribedby:e.string,ariaLabelledby:e.string,title:e.string,value:e.oneOfType([e.string,e.arrayOf(e.string)]),defaultValue:e.oneOfType([e.string,e.arrayOf(e.string)]),list:e.arrayOf(e.shape({value:e.oneOfType([e.string,e.number]),text:e.oneOfType([e.string,e.number]),label:e.oneOfType([e.string,e.number])})),isTouched:e.bool,isValid:e.bool,invalidFeedback:e.string,validFeedback:e.string,isValidMessage:e.bool,isTooltipFeedback:e.bool,onBlur:e.func,onChange:e.func,onFocus:e.func,onInput:e.func,onInvalid:e.func,onSelect:e.func};b.defaultProps={id:void 0,className:void 0,name:void 0,children:null,placeholder:void 0,multiple:!1,size:void 0,disabled:!1,required:!1,ariaDescribedby:void 0,ariaLabelledby:void 0,title:void 0,value:void 0,defaultValue:void 0,list:void 0,isTouched:!1,isValid:!1,invalidFeedback:void 0,validFeedback:void 0,isValidMessage:!0,isTooltipFeedback:!1,onBlur:void 0,onChange:void 0,onFocus:void 0,onInput:void 0,onInvalid:void 0,onSelect:void 0};export{s as O,b as S};