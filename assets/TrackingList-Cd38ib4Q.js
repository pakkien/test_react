import{u as o,j as e,P as d,S as c,b as l,B as s,e as h,a as u,C as x,g as j,h as g,i as p,l as _}from"./index-ioQ9WToT.js";import{B as b}from"./Badge-CAz3L6iU.js";function q(r){switch(r.toLowerCase()){case"in progress":return"danger";case"closed":return"dark";case"awarded":return"success";default:return"primary"}}const L=()=>{const r=o(),n=()=>{r("view-quotation")},a=[{id:"1",prepared_by:"Gary",client:"Tech Group",quotation_date:"31/01/2024",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"In Progress",site_location:"Penang",building:"Lab 1"},{id:"2",prepared_by:"Gary",client:"Tech Group",quotation_date:"31/01/2024",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Closed",site_location:"Penang",building:"Lab 1"},{id:"3",prepared_by:"Gary",client:"Tech Group",quotation_date:"31/01/2024",quotation_no:"Q-012345",end_user:"Tech Group",revision:0,quotation_amount:9800,cost:6e3,margin:3500,percent:27.96,status:"Awarded",site_location:"Penang",building:"Lab 1"}];return e.jsxs(d,{title:"Tracking List",children:[e.jsx(c,{children:e.jsxs(l,{children:[e.jsx(s,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>r(-1),children:"Back"}),e.jsx(h,{}),e.jsx("strong",{className:"fs-5",children:"Tracking List"})]})}),e.jsx(u,{container:"fluid",children:e.jsxs(x,{stretch:!0,children:[e.jsx(j,{children:e.jsx(g,{children:e.jsx(p,{tag:"div",className:"h3",children:"Tracking List"})})}),e.jsx(_,{className:"table-responsive",isScrollable:!0,children:e.jsxs("table",{className:"table table-modern",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),e.jsx("th",{children:"Prepared By"}),e.jsx("th",{children:"Client"}),e.jsx("th",{children:"Quotation Date"}),e.jsx("th",{children:"Quotation No."}),e.jsx("th",{children:"End User"}),e.jsx("th",{children:"Revision"}),e.jsx("th",{children:"Quotation Amount"}),e.jsx("th",{children:"Cost"}),e.jsx("th",{children:"Margin"}),e.jsx("th",{children:"%"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Site Location"}),e.jsx("th",{children:"Building"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:a.map((t,i)=>e.jsxs("tr",{children:[e.jsx("td",{children:i+1}),e.jsx("td",{children:t.prepared_by}),e.jsx("td",{children:t.client}),e.jsx("td",{children:t.quotation_date}),e.jsx("td",{children:t.quotation_no}),e.jsx("td",{children:t.end_user}),e.jsx("td",{children:t.revision}),e.jsx("td",{children:t.quotation_amount}),e.jsx("td",{children:t.cost}),e.jsx("td",{children:t.margin}),e.jsxs("td",{children:[t.percent,"%"]}),e.jsx("td",{children:e.jsx(b,{className:"statusBadge",color:q(t.status),children:e.jsx("h6",{children:t.status})})}),e.jsx("td",{children:t.site_location}),e.jsx("td",{children:t.building}),e.jsx("td",{children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-auto",children:e.jsx(s,{color:"primary",icon:"Edit",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>n()})})})})]},t.id))})]})})]})})]})};export{L as default};
