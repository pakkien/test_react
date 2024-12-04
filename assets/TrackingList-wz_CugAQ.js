import{o as c,p as $,u as V,r as a,g as C,j as e,P as G,S as J,b as W,B as x,d as K,a as X,C as Z,f as ee,h as te,i as se,k as ae,A as oe,F as ne,I as o,l as ie,m as re,n as le}from"./index-kEYLbuat.js";import{B as ce,Q as N}from"./enumQuotationStatus-CFQwIRpJ.js";import{P as de,u as ue,d as xe,a as he}from"./useSortableData-EuEGScEu.js";import{M as je,a as me,b as Se,c as ge,d as pe}from"./Modal-BdmbD1o8.js";import{u as Ce,c as Ne,t as fe}from"./timezone-CO9ZUVlf.js";import"./Select-CSHxy0wJ.js";c.extend(Ce);c.extend($);c.extend(Ne);c.extend(fe);function be(l){const h=l==null?void 0:l.toUpperCase();var r=N[h];return r==null&&(r=N.NONE),r.color}const ze=()=>{const l=V(),[h,r]=a.useState(!1),[f,b]=a.useState(!1),[v,_]=a.useState(!1),[L,k]=a.useState(!0),[F,w]=a.useState(null),[q,z]=a.useState(void 0),[y,B]=a.useState(!0),[ve,P]=a.useState(!1),[A,D]=a.useState(!0),M=()=>{b(!1),_(!1),k(!0),w("xl"),z(void 0),B(!0),P(!1),D(!0)},T=C({initialValues:{po_no:"",po_date:"",po_amount:"",po_attach_file:"",so_no:"",so_attach_file:"",invoice_no:"",invoice_date:"",payment_terms:"",invoice_amount:"",invoice_attach_file:"",remarks:"",status_overwrite:""},onSubmit:t=>{console.log(JSON.stringify(t))}}),[j,I]=a.useState([]),[E,u]=a.useState([]),O=async()=>{const t={headers:{Authorization:`${localStorage.getItem("bts_token")}`}};le.get("undefined/quotation/all_quotations_table",t).then(s=>{I(s.data.quotations),u(s.data.quotations)})};a.useEffect(()=>{O()},[]);const[m,Y]=a.useState(1),[S,H]=a.useState(de[5]),{items:g,requestSort:n,getClassNamesFor:i}=ue(E),p=t=>{const s=t.search.toString().toLowerCase(),U=Q(s);t.search?u(U):u(j)},d=C({initialValues:{search:""},onSubmit:p,onReset:()=>u(j)}),Q=t=>j.filter(s=>s.prepared_by.toLowerCase().includes(t)||s.client.toLowerCase().includes(t)||c(`${s.quotation_date}`).format("DD/MM/YYYY").includes(t)||s.quotation_no.toLowerCase().includes(t)||s.end_user.toLowerCase().includes(t)||s.revision.toString().toLowerCase().includes(t)||s.quotation_amount.toFixed(2).toString().toLowerCase().includes(t)||s.cost.toFixed(2).toString().toLowerCase().includes(t)||s.margin.toFixed(2).toString().toLowerCase().includes(t)||s.status.toLowerCase().includes(t)||s.site_location.toLowerCase().includes(t)||s.building.toLowerCase().includes(t)),R=(t,s)=>{l(`view/${t}/${s}`)};return e.jsxs(G,{title:"Tracking List",children:[e.jsx(J,{children:e.jsxs(W,{children:[e.jsx(x,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>l(-1),children:"Back"}),e.jsx(K,{}),e.jsx("strong",{className:"fs-5",children:"Tracking List"})]})}),e.jsx(X,{container:"fluid",children:e.jsxs(Z,{stretch:!0,children:[e.jsx(ee,{className:"table-responsive",isScrollable:!0,children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(te,{children:e.jsx(se,{children:e.jsx(ae,{tag:"div",className:"h3",children:"Tracking List"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(oe,{color:"light",isLight:!0,children:e.jsx("form",{onSubmit:d.handleSubmit,children:e.jsx(ne,{children:e.jsxs("div",{className:"d-flex","data-tour":"search",children:[e.jsx("label",{className:"border-0 bg-transparent",children:e.jsx(o,{icon:"Search",size:"2x",color:"primary"})}),e.jsx(ie,{id:"search",placeholder:"Search...",className:"border-0 shadow-none bg-transparent",onChange:t=>{d.handleChange(t),t.target.value.length>2&&re(()=>p({...d.values,search:t.target.value}),1e3)(),t.target.value.length===0&&d.resetForm()},value:d.values.search})]})})})})}),e.jsx("div",{className:"col-md-4"}),e.jsx("div",{className:"col-md-12",children:e.jsxs("table",{className:"table table-modern",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),e.jsxs("th",{onClick:()=>n("created_by"),className:"cursor-pointer text-decoration-underline",children:["Prepared By",e.jsx(o,{size:"lg",className:i("created_by"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("client"),className:"cursor-pointer text-decoration-underline",children:["Client",e.jsx(o,{size:"lg",className:i("client"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("quotation_date"),className:"cursor-pointer text-decoration-underline",children:["Quotation Date",e.jsx(o,{size:"lg",className:i("quotation_date"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("quotation_no"),className:"cursor-pointer text-decoration-underline",children:["Quotation No.",e.jsx(o,{size:"lg",className:i("quotation_no"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("end_user"),className:"cursor-pointer text-decoration-underline",children:["End User",e.jsx(o,{size:"lg",className:i("end_user"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("revision"),className:"cursor-pointer text-decoration-underline",children:["Revision",e.jsx(o,{size:"lg",className:i("revision"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("quotation_amount"),className:"cursor-pointer text-decoration-underline",children:["Quotation Amount",e.jsx(o,{size:"lg",className:i("quotation_amount"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("cost"),className:"cursor-pointer text-decoration-underline",children:["Cost",e.jsx(o,{size:"lg",className:i("cost"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("margin"),className:"cursor-pointer text-decoration-underline",children:["Margin",e.jsx(o,{size:"lg",className:i("margin"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("status"),className:"cursor-pointer text-decoration-underline",children:["Status",e.jsx(o,{size:"lg",className:i("status"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("site_location"),className:"cursor-pointer text-decoration-underline",children:["Site Location",e.jsx(o,{size:"lg",className:i("site_location"),icon:"FilterList"})]}),e.jsxs("th",{onClick:()=>n("building"),className:"cursor-pointer text-decoration-underline",children:["Building",e.jsx(o,{size:"lg",className:i("building"),icon:"FilterList"})]}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:xe(g,m,S).map((t,s)=>e.jsxs("tr",{children:[e.jsx("td",{children:s+1}),e.jsx("td",{children:t.prepared_by}),e.jsx("td",{children:t.client}),e.jsx("td",{children:c.utc(`${t.quotation_date}`).local().format("DD-MM-YYYY HH:mm:ss")}),e.jsx("td",{children:t.quotation_no}),e.jsx("td",{children:t.end_user}),e.jsx("td",{children:t.revision}),e.jsx("td",{children:t.quotation_amount.toFixed(2)}),e.jsx("td",{children:t.cost.toFixed(2)}),e.jsx("td",{children:t.margin.toFixed(2)}),e.jsx("td",{children:e.jsx(ce,{className:"statusBadge",color:be(t.status),children:e.jsx("h6",{children:t.status})})}),e.jsx("td",{children:t.site_location}),e.jsx("td",{children:t.building}),e.jsx("td",{children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-auto",children:e.jsx(x,{color:"primary",icon:"RemoveRedEye",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>R(t.quotation_id,t.variance)})}),e.jsx("div",{className:"col-auto",children:e.jsx(x,{color:"primary",icon:"Add",shadow:"none",hoverShadow:"lg",tag:"a",onClick:()=>{r(!0),M()}})})]})})]},t.id))})]})})]})}),e.jsx(he,{data:g,label:"items",setCurrentPage:Y,currentPage:m,perPage:S,setPerPage:H})]})}),e.jsxs(je,{isOpen:h,setIsOpen:r,titleId:"subItemEditModal",isStaticBackdrop:f,isScrollable:v,isCentered:L,size:F,fullScreen:q,isAnimation:y,children:[e.jsx(me,{setIsOpen:A?r:void 0,children:e.jsx(Se,{id:"editAdditionalInfoModal",children:"Edit Additional Info"})}),e.jsx(ge,{children:e.jsx(e.Fragment,{})}),e.jsx(pe,{children:e.jsx(x,{color:"info",icon:"Save",onClick:T.handleSubmit,children:"Save"})})]})]})};export{ze as default};
