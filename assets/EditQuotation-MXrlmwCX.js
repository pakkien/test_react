import{z as d,r as i,j as o,n as c}from"./index-DTAKSd_D.js";import{F as m,Q as _}from"./Quotation-DFWU3Hwq.js";import"./Nav-DyEHFcLd.js";import"./Badge-Dyqa8Lbt.js";const p=()=>{const{quotation_rev_id:a}=d(),[t,n]=i.useState(),e=async s=>{const r={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};c.get(`http://127.0.0.1:5000/quotation/revision/${s}`,r).then(u=>{n(u.data)})};return i.useEffect(()=>{a&&e(a)},[]),o.jsx(o.Fragment,{children:t?o.jsx(m,{data:t,children:o.jsx(_,{mode:"edit",quotation_id:t.quotation_id,quotation_rev_id:t.quotation_revision_id,quotation_no:t.quotation_no,status:t.status,revision:t.revision})}):o.jsx(o.Fragment,{})})};export{p as default};
