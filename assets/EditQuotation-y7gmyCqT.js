import{W as m,x as _,r as e,j as o,n as v}from"./index-l41crQj2.js";import{F as x,Q as f}from"./Quotation-BJYALlqb.js";import"./Progress-D8ES01_J.js";import"./enumQuotationStatus-fGXB6CFb.js";import"./timezone-BIdJqI_Z.js";import"./calculations-CG2cx_7e.js";const Q=()=>{const{state:a}=m(),s=a==null?void 0:a.create_new_variance,{quotation_rev_id:i}=_(),[t,n]=e.useState(),r=async u=>{const c={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};v.get(`undefined/quotation/revision/${u}`,c).then(d=>{n(d.data)})};return e.useEffect(()=>{n(null),i&&r(i)},[i]),o.jsx(o.Fragment,{children:t?o.jsx(x,{data:t,children:o.jsx(f,{mode:"edit",quotation_id:t.quotation_id,quotation_rev_id:t.quotation_revision_id,quotation_no:t.quotation_no,status:t.status,revision:t.revision,create_new_variance:s,variance:t.variance})}):o.jsx(o.Fragment,{})})};export{Q as default};
