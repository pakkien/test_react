import{n as e,j as s,T as m,r as b,I as f,m as x,N as j}from"./index-ioQ9WToT.js";const c=({children:i,ariaLabel:t,className:d,tag:g,to:l,isActive:o,divider:r})=>s.jsxs(m,{tag:g,className:x("breadcrumb-item",{active:o},d),"aria-current":o?"page":null,"aria-label":t||i,children:[r&&typeof r!="string"&&b.cloneElement(r,{className:x("breadcrumb-icon",r.props.className)}),o?i:s.jsx(j,{to:l,"aria-label":t,children:i})]});c.propTypes={children:e.node.isRequired,ariaLabel:e.string,className:e.string,tag:e.string,to:e.string.isRequired,isActive:e.bool,divider:e.node};c.defaultProps={className:void 0,ariaLabel:void 0,tag:"li",isActive:!1,divider:void 0};const T=({children:i,list:t,tag:d,listTag:g,itemTag:l,ariaLabel:o,autoActive:r,isToHome:u,divider:n})=>{const v=n!=="string"&&n;return s.jsx(m,{tag:d,"aria-label":o,style:n?{"--bs-breadcrumb-divider":typeof n=="string"?`'${n}'`:"none"}:null,children:s.jsxs(m,{tag:g,className:"breadcrumb",children:[u&&s.jsx(c,{to:"/",ariaLabel:"Home",children:u}),t?t.map((a,p)=>s.jsx(c,{tag:a.tag||l,to:a.to,isActive:r&&t.length===p+1,divider:v,children:a.title},a.title)):b.Children.map(i,(a,p)=>b.cloneElement(a,{tag:a.props.tag||l,isActive:r&&i.length===p+1,divider:a.props.divider||v}))]})})};T.propTypes={children:e.node,tag:e.oneOf(["nav","div","section"]),listTag:e.oneOf(["div","ol","ul"]),itemTag:e.oneOf(["div","li"]),ariaLabel:e.string,list:e.arrayOf(e.shape({title:e.string.isRequired,to:e.string.isRequired})),autoActive:e.bool,isToHome:e.oneOfType([e.string,e.node]),divider:e.oneOfType([e.string,e.node])};T.defaultProps={children:void 0,tag:"nav",listTag:"ol",itemTag:"li",ariaLabel:"breadcrumb",list:void 0,autoActive:!0,isToHome:s.jsx(f,{icon:"HolidayVillage"}),divider:s.jsx(f,{icon:"ChevronRight"})};export{T as B};
