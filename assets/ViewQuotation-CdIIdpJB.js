import{r as h,n as S,j as e,M as Y,o as f,p as ne,u as de,C as k,h as T,i as A,k as B,f as w,I as M,G as Q,B as C,t as V,g as me,s as E,F as l,l as n,v as xe,P as ue,S as je,b as ve,d as Z,e as ge,a as _e,N as ee,O as se,Q as ae,R as L,x as Ne}from"./index-CAoBQBr_.js";import{f as J,p as ie,u as be,P as pe,A as K,a as X,N as fe,b as q}from"./Accordion-BTBvPTZb.js";import{Q as H,B as te}from"./enumQuotationStatus-DysqsUbd.js";import{u as ce,c as re,t as oe}from"./timezone-DclgvS36.js";import{C as he}from"./Checks-iEXQd0pk.js";const ke=t=>{const[s,d]=h.useState([]),[p,c]=h.useState([]),r=async(m,g)=>{const N={headers:{Authorization:`${localStorage.getItem("bts_token")}`},params:{variance:`${g}`}};S.get(`undefined/quotation/revisions/${m}`,N).then(a=>{d(a.data.data)})};h.useEffect(()=>{r(t.quotation_id,t.variance),s.map(m=>_(m.quotation_revision_id))},[s.length]);const _=async m=>{const g={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};S.get(`undefined/quotation/${m}/attachments`,g).then(N=>{if(N.data.attachments){const a=Object.assign({data:s.filter(F=>F.quotation_revision_id==m)[0],attachment_list:N.data.attachments});p==null||p.push(a)}})},y=async(m,g)=>{S.get(`undefined/quotation/attachment/${m}`,{responseType:"blob",headers:{Authorization:`${localStorage.getItem("bts_token")}`}}).then(N=>{J(N.data,g)})};return e.jsx(e.Fragment,{children:p.map((m,g)=>e.jsxs("div",{children:[e.jsxs("a",{href:"/quotation/view/"+m.data.quotation_revision_id,target:"_blank",children:["Revision ",m.data.revision]}),e.jsx("br",{}),m.attachment_list&&m.attachment_list.map(N=>e.jsxs("li",{children:[e.jsx("span",{onClick:()=>y(N.id,N.filename),children:e.jsx(Y,{title:N.filename,flip:["auto"],children:e.jsx("a",{style:{cursor:"pointer"},children:N.filename})})}),e.jsx("br",{})]}))]},g))})};f.extend(ce);f.extend(ne);f.extend(re);f.extend(oe);const we=t=>{de();const[s,d]=h.useState([]),p=async(r,_)=>{const y={headers:{Authorization:`${localStorage.getItem("bts_token")}`},params:{variance:`${_}`}};S.get(`undefined/quotation/revisions/${r}`,y).then(m=>{d(m.data.data)})};h.useEffect(()=>{p(t.quotation_id,t.variance)},[]);const c=r=>f.utc(r).local().format("YYYY-MMM-DD HH:mm:ss");return e.jsx(e.Fragment,{children:s.map(r=>e.jsxs(e.Fragment,{children:[e.jsxs("a",{href:"/quotation/view/"+r.quotation_revision_id,target:"_blank",children:["Revision ",r.revision]})," - Created at: ",c(r.created_at),e.jsx("br",{})]}))})},W=10,G=t=>{const[s,d]=h.useState([]);h.useEffect(()=>{d(t.attachment_list)},[t.attachment_list]);const p=async(i,x,j)=>{S.get(`undefined/tracking_list/attachment/${i}/${x}`,{responseType:"blob",headers:{Authorization:`${localStorage.getItem("bts_token")}`}}).then(v=>{J(v.data,j)})},c=i=>{let x=s.filter(j=>j.id!=i);d(x)},[r,_]=h.useState([]),[y,m]=h.useState([]),[g,N]=h.useState(!1),a=async i=>{var x=new FormData;x.append("file",i);var j={onUploadProgress:function(v){const $=v.total&&v.loaded?Math.round(v.loaded*100/v.total):0;_(I=>{const D=[...I];return D.map(O=>O.name==i.name?O.upload_percent=$:null),D})},headers:{Authorization:`${localStorage.getItem("bts_token")}`}};S.post(`undefined/tracking_list/attachment/${t.attachment_type}`,x,j).then(function(v){const $=v.data.attachment_id;_(I=>{const D=[...I];return D.map(O=>O.name==i.name?O.upload_id=$:null),D})}).catch(function(v){_($=>{const I=[...$];return I.map(D=>D.name==i.name?D.upload_error="Error":null),I})})},F=h.useCallback((i,x)=>{i!=null&&i.length&&(_(j=>[...j,...i.map(v=>Object.assign(v,{preview:ie,upload_percent:0,upload_id:"",upload_error:""}))]),i.map(j=>a(j))),x!=null&&x.length&&m(j=>[...j,...x])},[]),{getRootProps:P,getInputProps:o,isDragActive:b}=be({accept:{"application/*":[".pdf"]},maxSize:1024*1500,maxFiles:W-r.length,disabled:g,onDrop:F});h.useEffect(()=>()=>r.forEach(i=>URL.revokeObjectURL(i.preview)),[r]),h.useEffect(()=>{let x=r.filter(v=>v.upload_percent==100&&v.upload_id&&!v.upload_error).map(v=>v.upload_id),j=s.map(v=>v.id);t.setAttachmentIds([...x,...j],t.attachment_type)},[r,s]),h.useEffect(()=>{r.length+s.length>=W?N(!0):N(!1)},[r.length+s.length]);const u=i=>{_(x=>x.filter(j=>j.name!==i))},z=i=>{m(x=>x.filter(({file:j})=>j.name!==i))},U=()=>{_([]),m([])};function R(i,x=2){if(!+i)return"0 Bytes";const j=1024,v=x<0?0:x,$=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],I=Math.floor(Math.log(i)/Math.log(j));return`${parseFloat((i/Math.pow(j,I)).toFixed(v))} ${$[I]}`}return e.jsxs(k,{shadow:"none",borderSize:0,borderColor:"light",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsxs(B,{tag:"div",className:"h5",children:["Attachments"," ",r!=null&&r.length||s!=null&&s.length?" - "+((r==null?void 0:r.length)+(s==null?void 0:s.length))+"/"+W:""]})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4 ",children:[e.jsxs("div",{hidden:g,...P({className:t.className}),children:[e.jsx("input",{...o()}),e.jsx("div",{className:"border border-2 border-light border d-flex justify-content-center align-items-center",style:{height:150},children:e.jsxs("p",{className:"lead",children:[e.jsx(M,{icon:"Upload",size:"2x"}),b?"Drop the files here ...":"Drag & drop files here, or click to select files"]})})]}),s.map(i=>{var x;return e.jsx("div",{className:"col-xl-3 col-lg-6 col-md-12",children:e.jsx(k,{borderColor:"success",className:"shadow-none border border-2 rounded-2",children:e.jsx(w,{children:e.jsx("div",{className:"row g-3",children:e.jsxs("div",{className:"col d-flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"ratio ratio-1x1",style:{width:60},children:e.jsx("div",{className:Q("d-flex align-items-center justify-content-center","overflow-hidden"),children:e.jsx("img",{src:ie,alt:i.filename,width:50})})})})}),e.jsx("div",{className:"flex-grow-1 ms-3 d-flex justify-content-between",children:e.jsx("div",{className:"w-100",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"fw-bold text-truncate",style:{maxWidth:"10rem"},onClick:()=>p(t.attachment_type,i.id,i.filename),children:e.jsx(Y,{title:i.filename,flip:["auto"],children:e.jsx("a",{style:{cursor:"pointer"},children:i.filename})})}),e.jsx("div",{})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:(x=i.filename.split(".").pop())==null?void 0:x.toUpperCase()})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:R(i.size)})})]})})}),e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"float-end",children:e.jsx(C,{color:"dark",isLight:!0,icon:"Close",size:"sm",rounded:1,onClick:()=>c(i.id)})})})})]})})})})},i.id)}),r.map(i=>e.jsx("div",{className:"col-xl-3 col-lg-6 col-md-12",children:e.jsx(k,{borderColor:i.upload_error?"danger":i.upload_percent!=100?"info":"success",className:"shadow-none border border-2 rounded-2",children:e.jsx(w,{children:e.jsx("div",{className:"row g-3",children:e.jsxs("div",{className:"col d-flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"ratio ratio-1x1",style:{width:60},children:e.jsx("div",{className:Q("d-flex align-items-center justify-content-center","overflow-hidden"),children:e.jsx("img",{src:i.preview,alt:i.name,width:50,onLoad:()=>{URL.revokeObjectURL(i.preview)}})})})})}),e.jsx("div",{className:"flex-grow-1 ms-3 d-flex justify-content-between",children:e.jsx("div",{className:"w-100",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"fw-bold text-truncate",style:{maxWidth:"10rem"},children:e.jsx(Y,{title:i.name,flip:["auto"],children:e.jsx("a",{style:{cursor:"pointer"},children:i.name})})}),e.jsx("div",{})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:i.type})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:R(i.size)})}),e.jsx("div",{className:"col-12",children:i.upload_error?e.jsx("div",{className:"text-danger",children:i.upload_error}):i.upload_percent!=100?e.jsx(pe,{isAnimated:!0,value:i.upload_percent,max:100,color:"success",height:"0.5rem"}):e.jsxs("div",{className:"text-success",children:[e.jsx(M,{icon:"Check",size:"lg",color:"success"})," ","Uploaded"]})})]})})}),e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"float-end",children:e.jsx(C,{color:"dark",isLight:!0,icon:"Close",size:"sm",rounded:1,onClick:()=>u(i.name)})})})})]})})})})},i.name)),y.map(({file:i,errors:x})=>e.jsx("div",{className:"col-xl-3 col-lg-6 col-md-12",children:e.jsx(k,{borderColor:"danger",className:"shadow-none border border-2 rounded-2",children:e.jsx(w,{children:e.jsx("div",{className:"row g-3",children:e.jsxs("div",{className:"col d-flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"ratio ratio-1x1",style:{width:60},children:e.jsx("div",{className:Q("d-flex align-items-center justify-content-center","overflow-hidden"),children:e.jsx(M,{icon:"ErrorOutline",size:"4x",color:"danger"})})})})}),e.jsx("div",{className:"flex-grow-1 ms-3 d-flex justify-content-between",children:e.jsx("div",{className:"w-100",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"fw-bold text-truncate",style:{maxWidth:"10rem"},children:e.jsx(Y,{title:i.name,flip:["auto"],children:e.jsx("a",{style:{cursor:"pointer"},children:i.name})})}),e.jsx("div",{})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:i.type})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"text-muted",children:R(i.size)})}),e.jsx("div",{className:"col-12",children:x.map(j=>e.jsx("div",{className:"text-danger",children:j.message}))})]})})}),e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"position-relative",children:e.jsx("div",{className:"float-end",children:e.jsx(C,{color:"dark",isLight:!0,icon:"Close",size:"sm",rounded:1,onClick:()=>z(i.name)})})})})]})})})})})),e.jsx("div",{children:e.jsx(C,{color:"danger",icon:"Delete",tag:"a",hidden:!(r.length>0||y.length>0),onClick:U,isLight:!0,children:"Remove all files"})})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]})};f.extend(ce);f.extend(ne);f.extend(re);f.extend(oe);const Fe=t=>{const[s,d]=h.useState(),[p,c]=h.useState([]),[r,_]=h.useState([]),[y,m]=h.useState([]),g=(o,b)=>{switch(b){case"purchase_order":{c(o);break}case"sale_order":{_(o);break}case"invoice":{m(o);break}}},N=async o=>{const b={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};S.get(`undefined/tracking_list/quotation/${o}`,b).then(u=>{console.log(u.data),d(u.data)})};h.useEffect(()=>{t.quotation_id&&N(t.quotation_id)},[]);const a=me({initialValues:{po_no:s?s.purchase_order.po_no:"",po_date:s?f.utc(`${s.purchase_order.po_date}`).local().format("YYYY-MM-DD"):"",po_amount:s?s.purchase_order.po_amount:"",so_no:s?s.sale_order.so_no:"",so_date:s?f.utc(`${s.sale_order.so_date}`).local().format("YYYY-MM-DD"):"",invoice_no:s?s.invoice.invoice_no:"",invoice_date:s?f.utc(`${s.invoice.invoice_date}`).local().format("YYYY-MM-DD"):"",payment_terms:s?s.invoice.payment_terms:"",invoice_amount:s?s.invoice.invoice_amount:"",remarks:s?s.remarks:"",status_overwrite:s?s.status_overwrite:""},enableReinitialize:!0,validate:o=>({}),onSubmit:async o=>{const b=Object.assign({quotation_id:t.quotation_id,remarks:o.remarks,status_overwrite:o.status_overwrite,purchase_order:{po_no:o.po_no,po_date:F(o.po_date),po_amount:o.po_amount,attachments:p},sale_order:{so_no:o.so_no,so_date:F(o.so_date),attachments:r},invoice:{invoice_no:o.invoice_no,invoice_date:F(o.invoice_date),invoice_amount:o.invoice_amount,payment_terms:o.payment_terms,attachments:y}});console.log(JSON.stringify(b)),P(b)}}),F=(o,b="YYYY-MM-DD",u=f.tz.guess())=>f.tz(o,b,u).utc().format("YYYY-MM-DDTHH:mm:ss"),P=async o=>{const b={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};s?S.put(`undefined/tracking_list/${s.tracking_list_id}`,o,b).then(u=>{E(e.jsxs("span",{className:"d-flex align-items-center",children:[e.jsx(M,{icon:"Info",size:"lg",className:"me-1"}),e.jsx("span",{children:"Updated Successfully"})]}),"Tracking Details Updated.")}).catch(u=>E(e.jsxs("span",{className:"d-flex align-items-center",children:[e.jsx(M,{icon:"Info",size:"lg",className:"me-1"}),e.jsx("span",{children:"Error!"})]}),u)):S.post("undefined/tracking_list/",o,b).then(u=>{E(e.jsxs("span",{className:"d-flex align-items-center",children:[e.jsx(M,{icon:"Info",size:"lg",className:"me-1"}),e.jsx("span",{children:"Updated Successfully"})]}),"Tracking Details Updated.")}).catch(u=>E(e.jsxs("span",{className:"d-flex align-items-center",children:[e.jsx(M,{icon:"Info",size:"lg",className:"me-1"}),e.jsx("span",{children:"Error!"})]}),u))};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"col-md-12",children:e.jsxs("div",{className:"row g-4",hidden:!s,children:[e.jsx("div",{className:"col-md-4",children:e.jsxs("span",{className:"text-muted",children:["Tracking Revision: ",s==null?void 0:s.revision]})}),e.jsx("div",{className:"col-md-4",children:e.jsxs("span",{className:"text-muted",children:["Last Updated By: ",s==null?void 0:s.created_by]})}),e.jsx("div",{className:"col-md-4",children:e.jsxs("span",{className:"text-muted",children:["Last Updated: ",f.utc(`${s==null?void 0:s.created_at}`).local().format("DD-MM-YYYY HH:mm:ss")]})})]})}),e.jsx("br",{}),e.jsxs("form",{children:[e.jsxs(k,{shadow:"none",borderSize:2,borderColor:"light",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h4",children:"Purchase Order"})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"po_no",label:"PO No.",children:e.jsx(n,{placeholder:"Enter PO No.",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.po_no,isValid:a.isValid,isTouched:a.touched.po_no,invalidFeedback:a.errors.po_no,validFeedback:"Valid PO No."})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"po_date",label:"PO Date.",children:e.jsx(n,{placeholder:"Enter PO Date",type:"date",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.po_date,isValid:a.isValid,isTouched:a.touched.po_date,invalidFeedback:a.errors.po_date,validFeedback:"Valid PO Date."})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"po_amount",label:"PO Amount.",children:e.jsx(n,{type:"number",placeholder:"Enter PO Amount",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.po_amount,isValid:a.isValid,isTouched:a.touched.po_amount,invalidFeedback:a.errors.po_amount,validFeedback:"Valid PO Amount"})})}),e.jsx("div",{className:"col-md-12",children:e.jsx(G,{attachment_type:"purchase_order",attachment_list:s!=null&&s.purchase_order.po_attachments?s==null?void 0:s.purchase_order.po_attachments:[],setAttachmentIds:g})})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]}),e.jsxs(k,{shadow:"none",borderSize:2,borderColor:"light",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h4",children:"Sales Order"})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"so_no",label:"SO No.",children:e.jsx(n,{placeholder:"Enter SO No.",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.so_no,isValid:a.isValid,isTouched:a.touched.so_no,invalidFeedback:a.errors.so_no,validFeedback:"Valid SO No."})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"so_date",label:"SO Date.",children:e.jsx(n,{placeholder:"Enter SO Date",type:"date",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.so_date,isValid:a.isValid,isTouched:a.touched.so_date,invalidFeedback:a.errors.so_date,validFeedback:"Valid SO Date."})})}),e.jsx("div",{className:"col-md-12",children:e.jsx(G,{attachment_type:"sale_order",attachment_list:s!=null&&s.sale_order.so_attachments?s==null?void 0:s.sale_order.so_attachments:[],setAttachmentIds:g})})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]}),e.jsxs(k,{shadow:"none",borderSize:2,borderColor:"light",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h4",children:"Invoice"})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"invoice_no",label:"Invoice No.",children:e.jsx(n,{placeholder:"Enter Invoice No.",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.invoice_no,isValid:a.isValid,isTouched:a.touched.invoice_no,invalidFeedback:a.errors.invoice_no,validFeedback:"Valid Invoice No."})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"invoice_date",label:"Invoice Date.",children:e.jsx(n,{placeholder:"Enter Invoice Date",type:"date",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.invoice_date,isValid:a.isValid,isTouched:a.touched.invoice_date,invalidFeedback:a.errors.invoice_date,validFeedback:"Valid Invoice Date."})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"payment_terms",label:"Payment Terms",children:e.jsx(n,{placeholder:"Enter Payment Terms",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.payment_terms,isValid:a.isValid,isTouched:a.touched.payment_terms,invalidFeedback:a.errors.payment_terms,validFeedback:"Valid Payment Terms"})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"invoice_amount",label:"Invoice Amount",children:e.jsx(n,{type:"number",placeholder:"Enter Invoice Amount",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.invoice_amount,isValid:a.isValid,isTouched:a.touched.invoice_amount,invalidFeedback:a.errors.invoice_amount,validFeedback:"Valid Invoice Amount"})})}),e.jsx("div",{className:"col-md-12",children:e.jsx(G,{attachment_type:"invoice",attachment_list:s!=null&&s.invoice.invoice_attachments?s==null?void 0:s.invoice.invoice_attachments:[],setAttachmentIds:g})})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]}),e.jsxs(k,{shadow:"none",borderSize:2,borderColor:"light",children:[e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"remarks",label:"Remarks",children:e.jsx(n,{placeholder:"Enter Remarks",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.remarks,isValid:a.isValid,isTouched:a.touched.remarks,invalidFeedback:a.errors.remarks,validFeedback:"Valid Remarks"})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"status_overwrite",label:"Status Overwrite",children:e.jsx(n,{placeholder:"Enter Status Overwrite",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.status_overwrite,isValid:a.isValid,isTouched:a.touched.status_overwrite,invalidFeedback:a.errors.status_overwrite,validFeedback:"Valid Status Overwrite"})})}),e.jsx("div",{className:"col-md-12"})]})}),e.jsx(V,{children:e.jsx(xe,{children:e.jsx(C,{color:"success",isLight:!0,onClick:a.submitForm,children:"Save"})})})]})]})]})},Ce=t=>e.jsx("div",{className:"pb-0",children:e.jsx("div",{className:"col-xl-12",children:e.jsx(K,{id:"SubItemAccordion",color:"dark",activeItemId:"SubItemAccordionItem_"+t.itemIndex,children:e.jsx(X,{id:"SubItemAccordionItem_"+t.itemIndex,title:"Sub Items",children:t.sub_items.map((s,d)=>e.jsx(e.Fragment,{children:e.jsxs(k,{id:"#subItem_card_id#"+d,shadow:"none",borderColor:"light",borderSize:1,children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h3",children:t.sectionMode==!0?`${t.sectionIndex+1}.${t.itemIndex+1}.${d+1}  Sub Item ${d+1}`:`${t.itemIndex+1}.${d+1}   Sub Item ${d+1}`})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(l,{id:"product_desc",label:"Product Description | Job Scope",isFloating:!0,children:e.jsx(n,{value:s.product_description,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"brand",label:"Brand",isFloating:!0,children:e.jsx(n,{value:s.brand,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"model",label:"Model",isFloating:!0,children:e.jsx(n,{value:s.model,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"remarks",label:"Remarks",isFloating:!0,children:e.jsx(n,{value:s.remarks,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-3",children:e.jsx(l,{id:"quantity",label:"Quantity",isFloating:!0,children:e.jsx(n,{value:s.quantity,disabled:!0})})}),e.jsx("div",{className:"col-3",children:e.jsx(l,{id:"unit",label:"Unit",isFloating:!0,children:e.jsx(n,{value:s.unit,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"unit_cost",label:"Unit Cost",isFloating:!0,children:e.jsx(n,{value:s.unit_cost,disabled:!0})})}),e.jsx("div",{className:"col-2 d-flex align-items-center",children:e.jsx(l,{id:"estimated_cost",label:"Estimated Cost",children:e.jsx(he,{checked:s.estimated_cost,disabled:!0,type:"checkbox"})})})]})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"total_cost",label:"Total Cost",isFloating:!0,children:e.jsx(n,{value:s.total_cost,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"margin",label:"Margin",isFloating:!0,children:e.jsx(n,{value:s.margin,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"margin_percentage",label:"Margin Percentage",isFloating:!0,children:e.jsx(n,{value:s.margin_percentage,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"unit_price",label:"Unit Price",isFloating:!0,children:e.jsx(n,{value:s.unit_price,disabled:!0})})})]})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"total_price",label:"Total Price",isFloating:!0,children:e.jsx(n,{value:s.total_price,disabled:!0})})}),e.jsx("div",{className:"col-md-12"})]})})]},d)}))})})},t.itemIndex)}),le=t=>e.jsx("div",{className:"pb-0",children:t.items.map((s,d)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-xl-12",children:e.jsx(K,{id:"ItemAccordion",color:"dark",activeItemId:"ItemAccordionItem_"+d,children:e.jsx(X,{id:"ItemAccordionItem_"+d,title:t.sectionMode?`${t.sectionIndex+1}.${d+1} Item ${d+1}`:`${d+1}.0 Item ${d+1}`,children:e.jsxs(k,{id:"#item_card_id#"+d,shadow:"none",borderSize:1,borderColor:"light",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsxs(B,{tag:"div",className:"h3",children:["Item ",d+1,".0   "]})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(l,{id:"product_desc",label:"Product Description | Job Scope",isFloating:!0,children:e.jsx(n,{value:s.product_description,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"brand",label:"Brand",isFloating:!0,children:e.jsx(n,{value:s.brand,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"model",label:"Model",isFloating:!0,children:e.jsx(n,{value:s.model,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"remarks",label:"Remarks",isFloating:!0,children:e.jsx(n,{value:s.remarks,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-3",children:e.jsx(l,{id:"quantity",label:"Quantity",isFloating:!0,children:e.jsx(n,{value:s.quantity,disabled:!0})})}),e.jsx("div",{className:"col-3",children:e.jsx(l,{id:"unit",label:"Unit",isFloating:!0,children:e.jsx(n,{value:s.unit,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"unit_cost",label:"Unit Cost",isFloating:!0,children:e.jsx(n,{value:s.unit_cost,disabled:!0})})}),e.jsx("div",{className:"col-2 d-flex align-items-center",children:e.jsx(l,{id:"estimated_cost",label:"Estimated Cost",children:e.jsx(he,{checked:s.estimated_cost,disabled:!0,type:"checkbox"})})})]})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"total_cost",label:"Total Cost",isFloating:!0,children:e.jsx(n,{value:s.total_cost,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"margin",label:"Margin",isFloating:!0,children:e.jsx(n,{value:s.margin,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"margin_percentage",label:"Margin Percentage",isFloating:!0,children:e.jsx(n,{value:s.margin_percentage,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(l,{id:"unit_price",label:"Unit Price",isFloating:!0,children:e.jsx(n,{value:s.unit_price,disabled:!0})})})]})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"total_price",label:"Total Price",isFloating:!0,children:e.jsx(n,{value:s.total_price,disabled:!0})})}),e.jsx("div",{className:"col-md-12"}),e.jsx("div",{className:"col-md-12",children:e.jsx(Ce,{itemIndex:d,sub_items:s.sub_items,sectionMode:t.sectionMode,sectionIndex:t.sectionIndex})}),e.jsx("div",{className:"col-md-12"})]})})]},s.item_id)})})})}))}),ye=t=>(console.log(t.sections),e.jsx("div",{className:"pb-0",children:t.sectionMode?t.sections.map((s,d)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"col-xl-12",children:e.jsx(K,{id:"SectionAccordion",color:"dark",activeItemId:"SectionAccordionItem_"+d,children:e.jsx(X,{id:"SectionAccordionItem_"+d,title:`${d+1}.0  `+s.name,children:e.jsx(le,{items:s.items,sectionMode:t.sectionMode,sectionIndex:d})})})})})):t.sections.map((s,d)=>e.jsx(le,{items:s.items,sectionMode:t.sectionMode,sectionIndex:d}))})),Se=t=>{var b;const s=de(),[d,p]=h.useState(Number(t.variance)),[c,r]=h.useState(t.data[0]);h.useEffect(()=>{if(t.data){const u=t.data.filter(z=>z.variance==d)[0];console.log(JSON.stringify(c)),N(H[u.status.toUpperCase()])}},[d]);const _="Tracking View",y=(b=c==null?void 0:c.status)==null?void 0:b.toUpperCase();var m=H[y];m==null&&(m=H.NONE);const[g,N]=h.useState(m),[a,F]=h.useState("Quotation"),P=u=>{s(`../quotation/edit/${c.quotation_revision_id}`,{state:{create_new_variance:u}})},o=async(u,z,U,R)=>{S.get(`undefined/quotation/${u}/pdf/${z}`,{responseType:"blob",headers:{Authorization:`${localStorage.getItem("bts_token")}`},params:{with_watermark:`${R}`}}).then(i=>{J(i.data,U+".pdf")})};return e.jsx(e.Fragment,{children:e.jsxs(ue,{title:_,children:[e.jsxs(je,{children:[e.jsxs(ve,{children:[e.jsx(C,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>s(-1),children:"Back"}),e.jsx(Z,{}),e.jsx("strong",{className:"fs-5",children:_}),e.jsx(Z,{}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-12",children:e.jsxs("span",{children:["Quotation No: ",c.quotation_no,"    ",e.jsx(te,{className:"statusBadge",color:g.color,children:g.name})]})}),e.jsx("div",{className:"col-md-12",children:e.jsxs("span",{children:["Revision: ",c.revision]})})]})]}),e.jsx(ge,{children:e.jsx(C,{color:"info",onClick:()=>P(!0),children:"Create New Variation"})})]}),e.jsxs(_e,{container:"fluid",children:[e.jsxs(k,{children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h3",children:_})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"QuotationDate",label:"Quotation Date",isFloating:!0,children:e.jsx(n,{value:c.created_at,disabled:!0})})}),e.jsx("div",{className:"col-md-3",children:e.jsx(l,{id:"client_code",label:"Client Code",isFloating:!0,children:e.jsx(n,{value:c.client_code,disabled:!0})})}),e.jsx("div",{className:"col-md-6",children:e.jsx(l,{id:"client",label:"Client",isFloating:!0,children:e.jsx(n,{value:c.client,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"end_user",label:"End User",isFloating:!0,children:e.jsx(n,{value:c.end_user,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"site_location",label:"Site Location",isFloating:!0,children:e.jsx(n,{value:c.site_location,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"building",label:"Building",isFloating:!0,children:e.jsx(n,{value:c.building,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"pic",label:"PIC",isFloating:!0,children:e.jsx(n,{value:c.pic,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(l,{id:"pic_email",label:"PIC Email",isFloating:!0,children:e.jsx(n,{value:c.pic_email,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"pic_contact_number",label:"PIC Contact No.",isFloating:!0,children:e.jsx(n,{value:c.pic_contact_number,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(l,{id:"project_ref",label:"Project Reference",isFloating:!0,children:e.jsx(n,{value:c.project_reference,disabled:!0})})})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]}),e.jsx(k,{children:e.jsxs(w,{children:[e.jsxs(fe,{design:"pills",children:[e.jsx(q,{isActive:a=="Quotation",children:e.jsxs(ee,{isButtonGroup:!0,children:[e.jsx("div",{className:a=="Quotation"?"btn active nav-link":"btn nav-link",onClick:()=>F("Quotation"),children:d==0?"Quotation":"Variation "+d}),e.jsx(se,{children:e.jsx(C,{className:a=="Quotation"?"btn active nav-link":"btn nav-link"})}),e.jsx(ae,{children:t.data.map(u=>e.jsx(L,{onClick:()=>{p(u.variance),F("Quotation")},children:u.variance==0?"Quotation":"Variation "+u.variance}))})]})}),e.jsx(q,{onClick:()=>F("Attachments"),isActive:a=="Attachments",children:e.jsx(C,{children:"Attachments"})}),e.jsx(q,{onClick:()=>F("Revisions"),isActive:a=="Revisions",children:e.jsx(C,{children:"Revisions"})}),e.jsx(q,{onClick:()=>F("TrackingDetails"),isActive:a=="TrackingDetails",children:e.jsx(C,{children:"Tracking Details"})})]}),e.jsx("hr",{}),e.jsx("div",{hidden:a!="Attachments",children:e.jsx(ke,{quotation_id:t.quotation_id,variance:d})},"attachmentsTab"+d),e.jsx("div",{hidden:a!="Revisions",children:e.jsx(we,{quotation_id:t.quotation_id,variance:d})},"revisionsTab"+d),e.jsx("div",{hidden:a!="TrackingDetails",children:e.jsx(Fe,{quotation_id:t.quotation_id})},"trackingDetailsTab"),e.jsxs("div",{hidden:a!="Quotation",children:[e.jsxs("div",{className:"row gt-4",children:[e.jsxs("div",{className:"col-md-6 d-flex",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-md-12",children:[e.jsxs("span",{children:["Quotation No: ",c.quotation_no,"   "]}),e.jsx(te,{className:"statusBadge",color:g.color,children:g.name}),"   ",e.jsx("br",{}),e.jsxs("span",{children:["Revision: ",c.revision]})]})}),e.jsxs(ee,{children:[e.jsx(se,{hasIcon:!1,children:e.jsx(C,{color:"info",isLight:!0,icon:"Download",children:"PDF"})}),e.jsxs(ae,{children:[e.jsx(L,{children:e.jsx("span",{onClick:()=>o(t.quotation_id,c.quotation_revision_id,c.quotation_no,!1),children:"No Watermark"})}),e.jsx(L,{onClick:()=>o(t.quotation_id,c.quotation_revision_id,c.quotation_no,!0),children:"With Watermark"})]})]})]}),e.jsx("div",{className:"col-md-6 d-flex justify-content-end",children:e.jsx(C,{color:"info",className:"order-2 float-end",onClick:()=>P(!1),children:"Create Revision"})})]}),e.jsx("br",{}),e.jsx(ye,{sections:c.sections,sectionMode:c.is_section_valid})]})]})}),e.jsxs(k,{hidden:a!="Quotation",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h3",children:"Options"})})}),e.jsx(w,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"lead_time",label:"Lead Time",children:e.jsx(n,{value:c.lead_time,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"payment_terms",label:"Payment Terms",children:e.jsx(n,{value:c.payment_terms,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"validity",label:"Validity",children:e.jsx(n,{value:c.validity,disabled:!0})})}),e.jsx("div",{})]})}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]}),e.jsxs(k,{hidden:a!="Quotation",children:[e.jsx(T,{children:e.jsx(A,{children:e.jsx(B,{tag:"div",className:"h3",children:"Summary"})})}),e.jsxs(w,{className:"pb-0",children:[e.jsx(e.Fragment,{}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(l,{id:"reference_status",label:"Reference Status",isFloating:!0,children:e.jsx(n,{value:c.reference_status,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"total",label:"Total",isFloating:!0,children:e.jsx(n,{value:c.total_cost,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(l,{id:"note",label:"Note",isFloating:!0,children:e.jsx(n,{value:c.note,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(l,{id:"g_total",label:"G/Total (RM)",isFloating:!0,children:e.jsx(n,{value:c.grand_total,disabled:!0})})})]})]}),e.jsx(V,{children:e.jsx(e.Fragment,{})})]})]})]})})},Ve=()=>{const{quotation_id:t,variance:s}=Ne(),[d,p]=h.useState(),c=async r=>{const _={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};S.get(`undefined/quotation/latest_revisions/${r}`,_).then(y=>{p(y.data.data)})};return h.useEffect(()=>{p(null),t&&c(t)},[t]),e.jsx(e.Fragment,{children:d?e.jsx(Se,{data:d,variance:s,quotation_id:t}):e.jsx(e.Fragment,{})})};export{Ve as default};
