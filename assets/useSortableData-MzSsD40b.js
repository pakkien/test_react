import{r as j,j as e,G as b,I as h,H as a,t as N,U as k,v as y}from"./index-CwoEAzsp.js";import{S as C,O as R}from"./Select-CrRuHbm0.js";const r=j.forwardRef(({className:o,isDisabled:s,isActive:i,isPrev:d,isFirst:m,isNext:p,isLast:x,children:n,onClick:c,...f},t)=>e.jsx("li",{ref:t,className:b("page-item",{disabled:s,active:i},o),...f,children:e.jsxs("span",{role:"button",onClick:c,onKeyDown:c,className:"page-link",tabIndex:s?-1:void 0,"aria-disabled":s?"true":void 0,"aria-label":d&&"First Page"||p&&"Last Page"||`${n} page`,children:[d&&e.jsx(h,{icon:"ChevronLeft"}),m&&e.jsx(h,{icon:"FirstPage"}),p&&e.jsx(h,{icon:"ChevronRight"}),x&&e.jsx(h,{icon:"LastPage"}),n]})}));r.displayName="PaginationItem";r.propTypes={className:a.string,isDisabled:a.bool,isActive:a.bool,isPrev:a.bool,isFirst:a.bool,isNext:a.bool,isLast:a.bool,children:a.node,onClick:a.func};r.defaultProps={className:void 0,isDisabled:!1,isActive:!1,isPrev:!1,isFirst:!1,isNext:!1,isLast:!1,children:null,onClick:void 0};const u=j.forwardRef(({ariaLabel:o,className:s,children:i,size:d,...m},p)=>e.jsx("nav",{ref:p,"aria-label":o,className:s,...m,children:e.jsx("ul",{className:b("pagination",{[`pagination-${d}`]:d},"m-0"),children:i})}));u.displayName="Pagination";u.propTypes={ariaLabel:a.string.isRequired,children:a.node.isRequired,className:a.string,size:a.oneOf(["sm","lg"])};u.defaultProps={className:void 0,size:null};const I={3:3,5:5,10:10,25:25,50:50},L=(o,s,i)=>o.filter((d,m)=>m+1>(s-1)*i&&m+1<=s*i),v=({setCurrentPage:o,currentPage:s,perPage:i,setPerPage:d,data:m,label:p})=>{const x=m.length,n=Math.ceil(x/i),c=()=>{let t=[],l=s-1;for(;l>=s-1&&l>0;)t.push(e.jsx(r,{onClick:()=>o(s-1),children:l},l)),l-=1;for(t=t.reverse(),t.push(e.jsx(r,{isActive:!0,onClick:()=>o(s),children:s},s)),l=s+1;l<=s+1&&l<=n;)t.push(e.jsx(r,{onClick:()=>o(s+1),children:l},l)),l+=1;return t},f=()=>{const t=i*(s-1)+1,l=i*s;return e.jsxs("span",{className:"pagination__desc",children:["Showing ",t," to ",l>x?x:l," of ",x," ",p]})};return e.jsxs(N,{children:[e.jsx(k,{children:e.jsx("span",{className:"text-muted",children:f()})}),e.jsxs(y,{className:"d-flex",children:[n>1&&e.jsxs(u,{ariaLabel:p,children:[e.jsx(r,{isFirst:!0,isDisabled:!(s-1>0),onClick:()=>o(1)}),e.jsx(r,{isPrev:!0,isDisabled:!(s-1>0),onClick:()=>o(s-1)}),s-1>1&&e.jsx(r,{onClick:()=>o(s-2),children:"..."}),c(),s+1<n&&e.jsx(r,{onClick:()=>o(s+2),children:"..."}),e.jsx(r,{isNext:!0,isDisabled:!(s+1<=n),onClick:()=>o(s+1)}),e.jsx(r,{isLast:!0,isDisabled:!(s+1<=n),onClick:()=>o(n)})]}),e.jsx(C,{size:"sm",ariaLabel:"Per",onChange:t=>{d(parseInt(t.target.value,10)),o(1)},value:i.toString(),children:Object.keys(I).map(t=>e.jsx(R,{value:t,children:t},t))})]})]})};v.propTypes={setCurrentPage:a.func.isRequired,currentPage:a.number.isRequired,perPage:a.number.isRequired,setPerPage:a.func.isRequired,data:a.array.isRequired,label:a.string};v.defaultProps={label:"items"};const q=(o,s=null)=>{const[i,d]=j.useState(s);return{items:j.useMemo(()=>{const n=[...o];return i!==null&&n.sort((c,f)=>c[i.key]<f[i.key]?i.direction==="ascending"?-1:1:c[i.key]>f[i.key]?i.direction==="ascending"?1:-1:0),n},[o,i]),requestSort:n=>{let c="ascending";i&&i.key===n&&i.direction==="ascending"&&(c="descending"),d({key:n,direction:c})},getClassNamesFor:n=>i&&i.key===n?i.direction:"d-none",sortConfig:i}};export{I as P,v as a,L as d,q as u};