import{z as c,r as e,j as t,n as m}from"./index-DTAKSd_D.js";import{F as d,Q as v}from"./Quotation-DFWU3Hwq.js";import"./Nav-DyEHFcLd.js";import"./Badge-Dyqa8Lbt.js";const g=()=>{const{quotation_rev_id:a}=c(),[o,s]=e.useState(),i=async n=>{const r={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};m.get(`http://127.0.0.1:5000/quotation/revision/${n}`,r).then(u=>{s(u.data)})};return e.useEffect(()=>{a&&i(a)},[]),t.jsx(t.Fragment,{children:o?t.jsx(d,{data:o,children:t.jsx(v,{mode:"view",quotation_rev_id:a,quotation_no:o.quotation_no,status:o.status,revision:o.revision})}):t.jsx(t.Fragment,{})})};export{g as default};
