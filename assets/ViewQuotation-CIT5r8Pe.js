import{z as c,r as e,j as o,n as m}from"./index-CV3AXN6v.js";import{F as d,Q as v}from"./Quotation-CO8Yv_7f.js";import"./Nav-BTVDOdlr.js";import"./Badge-B7NMrV4B.js";import"./enumQuotationStatus-4-mPBSBD.js";import"./timezone-BBQz1r9h.js";const _=()=>{const{quotation_rev_id:a}=c(),[t,i]=e.useState(),n=async s=>{const r={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};m.get(`http://127.0.0.1:5000/quotation/revision/${s}`,r).then(u=>{i(u.data)})};return e.useEffect(()=>{i(null),a&&n(a)},[a]),o.jsx(o.Fragment,{children:t?o.jsx(d,{data:t,children:o.jsx(v,{mode:"view",quotation_id:t.quotation_id,quotation_rev_id:a,quotation_no:t.quotation_no,status:t.status,revision:t.revision,variance:t.variance})}):o.jsx(o.Fragment,{})})};export{_ as default};
