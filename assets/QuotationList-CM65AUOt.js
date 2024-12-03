import{o as n,p as Q,u as _,r as o,g as y,j as e,P as B,S as A,b as T,B as c,d as E,a as Y,A as m,C as R,f as I,h as z,i as H,k as M,F as U,I as C,l as V,m as $,n as O}from"./index-Bn5G_ddx.js";import{B as G}from"./Badge-5jUYUbLd.js";import{P as W,u as J,d as K,a as X}from"./useSortableData-DUGjtvWF.js";import{Q as b}from"./enumQuotationStatus-DULFW2t5.js";import{u as Z,c as ee,t as ae}from"./timezone-VzYIm2UN.js";import"./Select-VA8a_XJf.js";n.extend(Z);n.extend(Q);n.extend(ee);n.extend(ae);function te(s){const d=s==null?void 0:s.toUpperCase();var i=b[d];return i==null&&(i=b.NONE),i.color}const ce=()=>{const s=_(),[d,i]=o.useState(!1),[u,S]=o.useState([]),[p,l]=o.useState([]),v=async()=>{const a={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};O.get("undefined/quotation/all_quotations_table",a).then(t=>{S(t.data.quotations),l(t.data.quotations)})};o.useEffect(()=>{v()},[]);const[h,f]=o.useState(1),[x,N]=o.useState(W[5]),{items:j,requestSort:w,getClassNamesFor:L}=J(p),g=a=>{const t=a.search.toString().toLowerCase(),k=P(t);a.search?l(k):l(u)},r=y({initialValues:{search:""},onSubmit:g,onReset:()=>l(u)}),P=a=>u.filter(t=>t.prepared_by.toLowerCase().includes(a)||t.client.toLowerCase().includes(a)||n(`${t.quotation_date}`).format("DD-MM-YYYY").includes(a)||t.quotation_no.toLowerCase().includes(a)||t.end_user.toLowerCase().includes(a)||t.revision.toString().toLowerCase().includes(a)||t.quotation_amount.toFixed(2).toString().toLowerCase().includes(a)||t.cost.toFixed(2).toString().toLowerCase().includes(a)||t.margin.toFixed(2).toString().toLowerCase().includes(a)||t.status.toLowerCase().includes(a)||t.site_location.toLowerCase().includes(a)||t.building.toLowerCase().includes(a)),q=a=>{s(`view/${a}`)},F=a=>{s(`edit/${a}`)},D=()=>{s("create")};return e.jsxs(B,{title:"Quotation",children:[e.jsx(A,{children:e.jsxs(T,{children:[e.jsx(c,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>s(-1),children:"Back"}),e.jsx(E,{}),e.jsx("strong",{className:"fs-5",children:"Quotation"})]})}),e.jsxs(Y,{container:"fluid",children:[d&&e.jsx(m,{color:"success",isLight:!0,icon:"Create",isDismissible:!0,children:"Create Success"}),e.jsxs(R,{stretch:!0,children:[e.jsx(I,{className:"table-responsive",isScrollable:!0,children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(z,{children:e.jsx(H,{children:e.jsx(M,{tag:"div",className:"h3",children:"Quotation"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(m,{color:"light",isLight:!0,children:e.jsx("form",{onSubmit:r.handleSubmit,children:e.jsx(U,{children:e.jsxs("div",{className:"d-flex","data-tour":"search",children:[e.jsx("label",{className:"border-0 bg-transparent",children:e.jsx(C,{icon:"Search",size:"2x",color:"primary"})}),e.jsx(V,{id:"search",placeholder:"Search...",className:"border-0 shadow-none bg-transparent",onChange:a=>{r.handleChange(a),a.target.value.length>2&&$(()=>g({...r.values,search:a.target.value}),1e3)(),a.target.value.length===0&&r.resetForm()},value:r.values.search})]})})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(c,{color:"success",className:"float-end",icon:"Create",tag:"a",onClick:()=>D(),children:"Create"})}),e.jsx("div",{className:"col-md-12",children:e.jsxs("table",{className:"table table-modern",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),e.jsx("th",{children:"Prepared By"}),e.jsx("th",{children:"Client"}),e.jsxs("th",{onClick:()=>w("quotation_date"),className:"cursor-pointer text-decoration-underline",children:["Quotation Date",e.jsx(C,{size:"lg",className:L("quotation_date"),icon:"FilterList"})]}),e.jsx("th",{children:"Quotation No."}),e.jsx("th",{children:"End User"}),e.jsx("th",{children:"Revision"}),e.jsx("th",{children:"Quotation Amount"}),e.jsx("th",{children:"Cost"}),e.jsx("th",{children:"Margin"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Site Location"}),e.jsx("th",{children:"Building"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:K(j,h,x).map((a,t)=>e.jsxs("tr",{children:[e.jsx("td",{children:t+1}),e.jsx("td",{children:a.prepared_by}),e.jsx("td",{children:a.client}),e.jsx("td",{children:n.utc(`${a.quotation_date}`).local().format("DD-MM-YYYY HH:mm:ss")}),e.jsx("td",{children:a.quotation_no}),e.jsx("td",{children:a.end_user}),e.jsx("td",{children:a.variance+"."+a.revision}),e.jsx("td",{children:a.quotation_amount.toFixed(2)}),e.jsx("td",{children:a.cost.toFixed(2)}),e.jsx("td",{children:a.margin.toFixed(2)}),e.jsx("td",{children:e.jsx(G,{className:"statusBadge",color:te(a.status),children:e.jsx("h6",{children:a.status})})}),e.jsx("td",{children:a.site_location}),e.jsx("td",{children:a.building}),e.jsx("td",{children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-auto",children:e.jsx(c,{color:"primary",icon:"RemoveRedEye",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>q(a.quotation_rev_id)})}),e.jsx("div",{className:"col-auto",children:e.jsx(c,{color:"primary",icon:"Edit",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>F(a.quotation_rev_id)})})]})})]},a.id))})]})})]})}),e.jsx(X,{data:j,label:"items",setCurrentPage:f,currentPage:h,perPage:x,setPerPage:N})]})]})]})};export{ce as default};
