import{m as a,t as i,j as m,l as c}from"./index-CjnLntvo.js";const l=({children:r,className:n,color:e,shadow:t,rounded:s,isLight:o,...p})=>{const{darkModeStatus:d}=i();return m.jsx("span",{className:c("badge",{[`bg-${e}`]:!o,[`bg-l${d?"o25":"10"}-${e}`]:o,[`text-${e}`]:o,[`shadow${t!=="default"?`-${t}`:""}`]:!!t,[`rounded${s!=="default"?`-${s}`:""}`]:s,"rounded-0":s==="bottom"||s==="top"||s==="end"||s==="start"||s===0},n),...p,children:r})};l.propTypes={children:a.node.isRequired,className:a.string,color:a.oneOf(["primary","secondary","success","info","warning","danger","light","dark"]),rounded:a.oneOf(["default",0,1,2,3,"bottom","top","circle","end","start","pill"]),shadow:a.oneOf([null,"none","sm","default","lg"]),isLight:a.bool};l.defaultProps={className:void 0,color:"primary",rounded:null,shadow:null,isLight:!1};export{l as B};