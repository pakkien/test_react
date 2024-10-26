import{u as G,r as s,g as S,j as e,P,S as N,b as f,B as r,d as Q,a as A,A as p,C as F,f as k,h as B,i as D,k as Z,F as Y,I as g,l as E,m as R,t as j}from"./index-C0miWbVf.js";import{B as I}from"./Badge-PKl2RQ7t.js";import{P as M,u as V,d as H,a as z}from"./PaginationButtons-C8_bh5kv.js";import"./Select-CLu69Mmt.js";function U(o){switch(o.toLowerCase()){case"in progress":return"danger";case"closed":return"dark";case"awarded":return"success";default:return"primary"}}const d=[{id:"1",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27,status:"In Progress",site_location:"Penang",building:"Lab 1"},{id:"2",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-03T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Closed",site_location:"Penang",building:"Lab 1"},{id:"3",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-02T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6000.1,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"4",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-01T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6000.03,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"5",prepared_by:"Gary",client:"Tech Group",quotation_date:"2023-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"6",prepared_by:"Gary",client:"Tech Group",quotation_date:"2025-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"7",prepared_by:"Gary",client:"Tech Group",quotation_date:"2022-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"8",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"9",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"},{id:"10",prepared_by:"Gary",client:"Tech Group",quotation_date:"2024-04-04T16:00:00.000Z",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"}],X=()=>{const o=G(),[_,$]=s.useState(!1),[c,i]=s.useState(d),[l,b]=s.useState(1),[u,m]=s.useState(M[5]),{items:h,requestSort:q,getClassNamesFor:C}=V(c),x=t=>{const a=t.search.toString().toLowerCase(),y=T(a);t.search?i(y):i(d)},n=S({initialValues:{search:""},onSubmit:x,onReset:()=>i(d)}),T=t=>c.filter(a=>a.prepared_by.toLowerCase().includes(t)||a.client.toLowerCase().includes(t)||j(`${a.quotation_date}`).format("DD/MM/YYYY").includes(t)||a.quotation_no.toLowerCase().includes(t)||a.end_user.toLowerCase().includes(t)||a.revision.toString().toLowerCase().includes(t)||a.quotation_amount.toFixed(2).toString().toLowerCase().includes(t)||a.cost.toFixed(2).toString().toLowerCase().includes(t)||a.margin.toFixed(2).toString().toLowerCase().includes(t)||a.percent.toFixed(2).toString().toLowerCase().includes(t)||a.status.toLowerCase().includes(t)||a.site_location.toLowerCase().includes(t)||a.building.toLowerCase().includes(t)),v=()=>{o("view-quotation")},w=()=>{o("edit-quotation")},L=()=>{o("create-quotation")};return e.jsxs(P,{title:"Quotation",children:[e.jsx(N,{children:e.jsxs(f,{children:[e.jsx(r,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>o(-1),children:"Back"}),e.jsx(Q,{}),e.jsx("strong",{className:"fs-5",children:"Quotation"})]})}),e.jsxs(A,{container:"fluid",children:[_&&e.jsx(p,{color:"success",isLight:!0,icon:"Create",isDismissible:!0,children:"Create Success"}),e.jsxs(F,{stretch:!0,children:[e.jsx(k,{className:"table-responsive",isScrollable:!0,children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(B,{children:e.jsx(D,{children:e.jsx(Z,{tag:"div",className:"h3",children:"Quotation"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(p,{color:"light",isLight:!0,children:e.jsx("form",{onSubmit:n.handleSubmit,children:e.jsx(Y,{children:e.jsxs("div",{className:"d-flex","data-tour":"search",children:[e.jsx("label",{className:"border-0 bg-transparent",children:e.jsx(g,{icon:"Search",size:"2x",color:"primary"})}),e.jsx(E,{id:"search",placeholder:"Search...",className:"border-0 shadow-none bg-transparent",onChange:t=>{n.handleChange(t),t.target.value.length>2&&R(()=>x({...n.values,search:t.target.value}),1e3)(),t.target.value.length===0&&n.resetForm()},value:n.values.search})]})})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(r,{color:"success",className:"float-end",icon:"Create",tag:"a",onClick:()=>L(),children:"Create"})}),e.jsx("div",{className:"col-md-12",children:e.jsxs("table",{className:"table table-modern",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),e.jsx("th",{children:"Prepared By"}),e.jsx("th",{children:"Client"}),e.jsxs("th",{onClick:()=>q("quotation_date"),className:"cursor-pointer text-decoration-underline",children:["Quotation Date",e.jsx(g,{size:"lg",className:C("quotation_date"),icon:"FilterList"})]}),e.jsx("th",{children:"Quotation No."}),e.jsx("th",{children:"End User"}),e.jsx("th",{children:"Revision"}),e.jsx("th",{children:"Quotation Amount"}),e.jsx("th",{children:"Cost"}),e.jsx("th",{children:"Margin"}),e.jsx("th",{children:"%"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Site Location"}),e.jsx("th",{children:"Building"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:H(h,l,u).map((t,a)=>e.jsxs("tr",{children:[e.jsx("td",{children:a+1}),e.jsx("td",{children:t.prepared_by}),e.jsx("td",{children:t.client}),e.jsx("td",{children:j(`${t.quotation_date}`).format("DD/MM/YYYY")}),e.jsx("td",{children:t.quotation_no}),e.jsx("td",{children:t.end_user}),e.jsx("td",{children:t.revision}),e.jsx("td",{children:t.quotation_amount.toFixed(2)}),e.jsx("td",{children:t.cost.toFixed(2)}),e.jsx("td",{children:t.margin.toFixed(2)}),e.jsxs("td",{children:[t.percent.toFixed(2),"%"]}),e.jsx("td",{children:e.jsx(I,{className:"statusBadge",color:U(t.status),children:e.jsx("h6",{children:t.status})})}),e.jsx("td",{children:t.site_location}),e.jsx("td",{children:t.building}),e.jsx("td",{children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-auto",children:e.jsx(r,{color:"primary",icon:"RemoveRedEye",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>v()})}),e.jsx("div",{className:"col-auto",children:e.jsx(r,{color:"primary",icon:"Edit",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>w()})})]})})]},t.id))})]})})]})}),e.jsx(z,{data:h,label:"items",setCurrentPage:b,currentPage:l,perPage:u,setPerPage:m})]})]})]})};export{X as default};
