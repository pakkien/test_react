import{W as _,x as m,r as e,j as o,n as v}from"./index-B1vmnCLl.js";import{F as x,Q as f}from"./Quotation-BCg8EkmC.js";import"./Progress--tQyIR3-.js";import"./enumQuotationStatus-iZ0lHAYm.js";import"./timezone-b4PsR3zM.js";const j=()=>{const{state:a}=_(),s=a==null?void 0:a.create_new_variance,{quotation_rev_id:i}=m(),[t,n]=e.useState(),r=async u=>{const c={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};v.get(`undefined/quotation/revision/${u}`,c).then(d=>{n(d.data)})};return e.useEffect(()=>{n(null),i&&r(i)},[i]),o.jsx(o.Fragment,{children:t?o.jsx(x,{data:t,children:o.jsx(f,{mode:"edit",quotation_id:t.quotation_id,quotation_rev_id:t.quotation_revision_id,quotation_no:t.quotation_no,status:t.status,revision:t.revision,create_new_variance:s,variance:t.variance})}):o.jsx(o.Fragment,{})})};export{j as default};