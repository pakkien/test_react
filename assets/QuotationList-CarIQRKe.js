import{o as l,p as z,u as y,r,g as D,j as e,P as Q,S as B,b as A,B as x,d as T,a as E,A as p,C as Y,f as M,h as R,i as I,k as H,F as U,I as a,l as V,m as $,n as O}from"./index-CAoBQBr_.js";import{B as G,Q as b}from"./enumQuotationStatus-DysqsUbd.js";import{P as W,u as J,d as K,a as X}from"./useSortableData-DXFSUSr9.js";import{u as Z,c as ee,t as se}from"./timezone-DclgvS36.js";import{c as te,a as ae}from"./calculations-DcGNHpkU.js";import"./Select-DMbBziSw.js";l.extend(Z);l.extend(z);l.extend(ee);l.extend(se);function oe(i){const h=i==null?void 0:i.toUpperCase();var d=b[h];return d==null&&(d=b.NONE),d.color}const ue=()=>{const i=y(),[h,d]=r.useState(!1),[j,L]=r.useState([]),[S,u]=r.useState([]),v=async()=>{const s={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};O.get("undefined/quotation/all_quotations_table",s).then(t=>{L(t.data.quotations),u(t.data.quotations)})};r.useEffect(()=>{v()},[]);const[m,_]=r.useState(1),[g,f]=r.useState(W[5]),{items:N,requestSort:o,getClassNamesFor:n}=J(S),C=s=>{const t=s.search.toString().toLowerCase(),P=F(t);s.search?u(P):u(j)},c=D({initialValues:{search:""},onSubmit:C,onReset:()=>u(j)}),F=s=>j.filter(t=>t.prepared_by.toLowerCase().includes(s)||t.client.toLowerCase().includes(s)||l(`${t.quotation_date}`).format("DD-MM-YYYY").includes(s)||t.quotation_no.toLowerCase().includes(s)||t.end_user.toLowerCase().includes(s)||t.revision.toString().toLowerCase().includes(s)||t.quotation_amount.toFixed(2).toString().toLowerCase().includes(s)||t.cost.toFixed(2).toString().toLowerCase().includes(s)||t.margin.toFixed(2).toString().toLowerCase().includes(s)||t.status.toLowerCase().includes(s)||t.site_location.toLowerCase().includes(s)||t.building.toLowerCase().includes(s)),k=s=>{i(`view/${s}`)},q=s=>{i(`edit/${s}`)},w=()=>{i("create")};return e.jsxs(Q,{title:"Quotation",children:[e.jsx(B,{children:e.jsxs(A,{children:[e.jsx(x,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>i(-1),children:"Back"}),e.jsx(T,{}),e.jsx("strong",{className:"fs-5",children:"Quotation"})]})}),e.jsxs(E,{container:"fluid",children:[h&&e.jsx(p,{color:"success",isLight:!0,icon:"Create",isDismissible:!0,children:"Create Success"}),e.jsxs(Y,{stretch:!0,children:[e.jsx(M,{className:"table-responsive",isScrollable:!0,children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(R,{children:e.jsx(I,{children:e.jsx(H,{tag:"div",className:"h3",children:"Quotation"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(p,{color:"light",isLight:!0,children:e.jsx("form",{onSubmit:c.handleSubmit,children:e.jsx(U,{children:e.jsxs("div",{className:"d-flex","data-tour":"search",children:[e.jsx("label",{className:"border-0 bg-transparent",children:e.jsx(a,{icon:"Search",size:"2x",color:"primary"})}),e.jsx(V,{id:"search",placeholder:"Search...",className:"border-0 shadow-none bg-transparent",onChange:s=>{c.handleChange(s),s.target.value.length>2&&$(()=>C({...c.values,search:s.target.value}),1e3)(),s.target.value.length===0&&c.resetForm()},value:c.values.search})]})})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(x,{color:"success",className:"float-end",icon:"Create",tag:"a",onClick:()=>w(),children:"Create"})}),e.jsx("div",{className:"col-md-12",children:e.jsxs("table",{className:"table table-modern",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),e.jsxs("th",{onClick:()=>o("created_by"),className:"cursor-pointer text-decoration-underline",children:["Prepared By",e.jsx(a,{size:"lg",className:n("created_by"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("client"),className:"cursor-pointer text-decoration-underline",children:["Client",e.jsx(a,{size:"lg",className:n("client"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("quotation_date"),className:"cursor-pointer text-decoration-underline",children:["Quotation Date",e.jsx(a,{size:"lg",className:n("quotation_date"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("quotation_no"),className:"cursor-pointer text-decoration-underline",children:["Quotation No.",e.jsx(a,{size:"lg",className:n("quotation_no"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("end_user"),className:"cursor-pointer text-decoration-underline",children:["End User",e.jsx(a,{size:"lg",className:n("end_user"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("revision"),className:"cursor-pointer text-decoration-underline",children:["Revision",e.jsx(a,{size:"lg",className:n("revision"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("quotation_amount"),className:"cursor-pointer text-decoration-underline",children:["Quotation Amount",e.jsx(a,{size:"lg",className:n("quotation_amount"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("cost"),className:"cursor-pointer text-decoration-underline",children:["Cost",e.jsx(a,{size:"lg",className:n("cost"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("margin"),className:"cursor-pointer text-decoration-underline",children:["Margin",e.jsx(a,{size:"lg",className:n("margin"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("margin_percent"),className:"cursor-pointer text-decoration-underline",children:["%",e.jsx(a,{size:"lg",className:n("margin_percent"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("status"),className:"cursor-pointer text-decoration-underline",children:["Status",e.jsx(a,{size:"lg",className:n("status"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("site_location"),className:"cursor-pointer text-decoration-underline",children:["Site Location",e.jsx(a,{size:"lg",className:n("site_location"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>o("building"),className:"cursor-pointer text-decoration-underline",children:["Building",e.jsx(a,{size:"lg",className:n("building"),icon:"FilterList"})]}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:K(N,m,g).map((s,t)=>e.jsxs("tr",{children:[e.jsx("td",{children:t+1}),e.jsx("td",{children:s.prepared_by}),e.jsx("td",{children:s.client}),e.jsx("td",{children:l.utc(`${s.quotation_date}`).local().format("DD-MM-YYYY HH:mm:ss")}),e.jsx("td",{children:s.quotation_no}),e.jsx("td",{children:s.end_user}),e.jsx("td",{children:s.revision}),e.jsx("td",{children:s.quotation_amount?s.quotation_amount.toFixed(2):null}),e.jsx("td",{children:s.cost?s.cost.toFixed(2):null}),e.jsx("td",{children:s.quotation_amount&&s.cost?te(s.cost,s.quotation_amount):null}),e.jsx("td",{children:s.quotation_amount&&s.cost?ae(s.cost,s.quotation_amount):null}),e.jsx("td",{children:e.jsx(G,{className:"statusBadge",color:oe(s.status),children:e.jsx("h6",{children:s.status})})}),e.jsx("td",{children:s.site_location}),e.jsx("td",{children:s.building}),e.jsx("td",{children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-auto",children:e.jsx(x,{color:"primary",icon:"RemoveRedEye",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>k(s.quotation_rev_id)})}),e.jsx("div",{className:"col-auto",children:e.jsx(x,{color:"primary",icon:"Edit",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>q(s.quotation_rev_id)})})]})})]},s.id))})]})})]})}),e.jsx(X,{data:N,label:"items",setCurrentPage:_,currentPage:m,perPage:g,setPerPage:f})]})]})]})};export{ue as default};
