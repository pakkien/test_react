import{j as e,C as _,l as b,F as t,p as s,r as n,m,n as l,u as y,P as R,S as F,b as B,B as u,e as w,f as C,a as U,g as M,h as S,i as D,q as T}from"./index-BkMeGOXt.js";import{B as N}from"./Badge-BfDbSGj8.js";import{S as Q}from"./SubItemDetails-gajSD2B9.js";import{A as X,a as A}from"./Accordion-MlJfpE0p.js";const E=a=>e.jsx(_,{className:"rounded-2",children:e.jsx(b,{children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(t,{id:"productDesc",label:"Product Description | Job Scope",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.product_desc,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"Brand",label:"Brand",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.brand,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"Model",label:"Model",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.model,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"Remarks",label:"Remarks",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.remarks,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4",children:e.jsx(t,{id:"Quantity",label:"Quantity",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.quantity,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(t,{id:"Unit",label:"Unit",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.unit,disabled:!0})})}),e.jsx("div",{className:"col-4",children:e.jsx(t,{id:"UnitCost",label:"Unit Cost",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.unit_cost,disabled:!0})})})]})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"TotalCost",label:"Total Cost",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.total_cost,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"Margin",label:"Margin",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.margin,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"UnitPrice",label:"Unit Price (RM)",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.unit_price,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"TotalPrice",label:"Total Price (RM)",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:a.item.total_price,disabled:!0})})}),e.jsx("div",{className:"col-md-12",children:a.item.sub_item.length>0&&e.jsx(X,{id:"subitemAccordion",activeItemId:"subitemAccordionitem",color:"dark",children:e.jsx(A,{id:"subitemAccordionitem",title:a.item.product_desc+" - Breakdown",icon:"List",children:a.item.sub_item.map((i,r)=>e.jsx(Q,{sub_item:i}))})})}),e.jsx("div",{className:"col-md-12"}),e.jsx("div",{className:"col-md-12"})]})})}),v=n.forwardRef(({children:a,className:i,...r},o)=>e.jsx("span",{ref:o,className:m("nav-link","cursor-pointer",i),"aria-current":"page",...r,children:a}));v.displayName="NavLinkDropdown";v.propTypes={children:l.node.isRequired,className:l.string};v.defaultProps={className:void 0};const x=n.forwardRef(({children:a,className:i,isActive:r,isDisable:o,...c},h)=>a.type.displayName==="Dropdown"?n.cloneElement(a,{tag:"li",className:m(a.props.className,"nav-item")}):e.jsx("li",{ref:h,className:m("nav-item",i),...c,children:n.cloneElement(a,{className:m(a.props.className,{active:r,disabled:o},"nav-link")})}));x.displayName="NavItem";x.propTypes={children:l.node.isRequired,className:l.string,isActive:l.bool,isDisable:l.bool};x.defaultProps={className:void 0,isActive:!1,isDisable:!1};const j=n.forwardRef(({tag:a,children:i,className:r,design:o,isFill:c,isJustified:h,isVertical:f,verticalBreakpoint:p,...q},k)=>e.jsx(a,{ref:k,className:m("nav",{[`nav-${o}`]:o,"nav-fill":c,"nav-justified":h},{[`flex${p?`-${p}`:""}-column`]:f||!!p},r),...q,children:i}));j.displayName="Nav";j.propTypes={children:l.node.isRequired,className:l.string,tag:l.oneOf(["ul","nav"]),design:l.oneOf(["tabs","pills"]),isFill:l.bool,isJustified:l.bool,isVertical:l.bool,verticalBreakpoint:l.oneOf(["sm","md","lg","xl","xxl"])};j.defaultProps={className:void 0,tag:"ul",design:"pills",isFill:!1,isJustified:!1,isVertical:!1,verticalBreakpoint:null};const d={quotation_id:"ad399d47-a038-4fb4-9f31-2f142c143611",quotation_data:[{quotation_no:"24001S1-TGH",quotation_id:"ad399d47-a038-4fb4-9f31-2f142c143611",quotation_rev_id:"c33d08b9-8ec3-41a1-8b0a-66033a3c7214",rev:0,quotation_date:"31/01/2024",client:"client_name",end_user:"someEndUserName",site_location:"Penang",building:"PG1",pic:"123",email:"sometester@gmail.com",project_ref:"abcProject",state:"awarded",item:[{item_id:"09ee02e9-8115-42ad-8648-74c901b96940",quotation_rev_id:"c33d08b9-8ec3-41a1-8b0a-66033a3c7214",product_desc:"item1",brand:"prodtBrand",model:"ModelX",remarks:"dummyRemarks",quantity:"300",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[{sub_item_id:"60c07ea8-f677-4e0c-b232-8756842ee174",item_id:"09ee02e9-8115-42ad-8648-74c901b96940",product_desc:"item1_subItem1",brand:"prodtBrand",model:"ModelX44",remarks:"dummyRemarks",quantity:"222",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"},{sub_item_id:"d23c57b7-38c1-45c4-a253-f8f7affe0447",item_id:"09ee02e9-8115-42ad-8648-74c901b96940",product_desc:"item1_subItem2",brand:"prodtBrand",model:"ModelX55",remarks:"dummyRemarks",quantity:"444",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"}]},{item_id:"7043ac52-22c1-474c-898c-ae4a3d8d44aa",quotation_rev_id:"c33d08b9-8ec3-41a1-8b0a-66033a3c7214",product_desc:"item2",brand:"prodtBrand2",model:"ModelX2",remarks:"dummyRemarks2",quantity:"3",unit:"Unit2",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[{sub_item_id:"24e651fe-720e-4aa3-bd25-95398b39e440",item_id:"7043ac52-22c1-474c-898c-ae4a3d8d44aa",product_desc:"item2_subItem1",brand:"prodtBrand",model:"ModelX444",remarks:"dummyRemarks",quantity:"3",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"}]},{item_id:"fca38a36-659a-4e68-84f5-3c95eea6e9cb",quotation_rev_id:"c33d08b9-8ec3-41a1-8b0a-66033a3c7214",product_desc:"item3",brand:"prodtBrand2",model:"ModelX2",remarks:"dummyRemarks2",quantity:"3",unit:"Unit2",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[]}],reference_status:"-",note:"-",total:"12400.0",g_total:"12400.0"},{quotation_no:"24001S1-TGH-Variation-01",quotation_id:"ad399d47-a038-4fb4-9f31-2f142c143611",quotation_rev_id:"998bf269-5741-4445-83ca-f251cb608c5e",quotation_date:"31/01/2024",rev:1,client:"client_name1",end_user:"someEndUserName1",site_location:"Penang1",building:"PG11",pic:"1231",email:"sometester@gmail.com1",project_ref:"abcProject1",state:"closed",item:[{item_id:"09ee02e9-8115-42ad-8648-74c901b96940",quotation_rev_id:"998bf269-5741-4445-83ca-f251cb608c5e",product_desc:"item1",brand:"prodtBrand",model:"ModelX",remarks:"dummyRemarks",quantity:"300",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[{sub_item_id:"60c07ea8-f677-4e0c-b232-8756842ee174",item_id:"09ee02e9-8115-42ad-8648-74c901b96940",product_desc:"item1_subItem1",brand:"prodtBrand",model:"ModelX44",remarks:"dummyRemarks",quantity:"222",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"},{sub_item_id:"d23c57b7-38c1-45c4-a253-f8f7affe0447",item_id:"09ee02e9-8115-42ad-8648-74c901b96940",product_desc:"item1_subItem2",brand:"prodtBrand",model:"ModelX55",remarks:"dummyRemarks",quantity:"444",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"}]},{item_id:"7043ac52-22c1-474c-898c-ae4a3d8d44aa",quotation_rev_id:"998bf269-5741-4445-83ca-f251cb608c5e",product_desc:"item2",brand:"prodtBrand2",model:"ModelX2",remarks:"dummyRemarks2",quantity:"3",unit:"Unit2",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[{sub_item_id:"24e651fe-720e-4aa3-bd25-95398b39e440",item_id:"7043ac52-22c1-474c-898c-ae4a3d8d44aa",product_desc:"item2_subItem1",brand:"prodtBrand",model:"ModelX444",remarks:"dummyRemarks",quantity:"3",unit:"Unit",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750"}]},{item_id:"fca38a36-659a-4e68-84f5-3c95eea6e9cb",quotation_rev_id:"998bf269-5741-4445-83ca-f251cb608c5e",product_desc:"item3",brand:"prodtBrand2",model:"ModelX2",remarks:"dummyRemarks2",quantity:"3",unit:"Unit2",unit_cost:"300.0",total_cost:"3000.0",margin:"0.8",unit_price:"375",total_price:"3750",sub_item:[]}],reference_status:"-",note:"-",total:"12400.0",g_total:"12400.0"}]};function g(a){switch(a.toLowerCase().trim()){case"inprogress":return"danger";case"closed":return"dark";case"awarded":return"success";default:return"primary"}}const H=()=>{const a=y(),[i,r]=n.useState(0);return e.jsxs(R,{title:"View Quotation",children:[e.jsxs(F,{children:[e.jsxs(B,{children:[e.jsx(u,{color:"info",isLink:!0,icon:"ArrowBack",onClick:()=>a(-1),children:"Back"}),e.jsx(w,{}),e.jsxs("div",{className:"row g-6",children:[e.jsx("div",{className:"col-md-12",children:e.jsxs("strong",{className:"fs-5",children:["Quotation No: ",d.quotation_data[i].quotation_no,"   ",e.jsx(N,{className:"statusBadge",color:g(d.quotation_data[i].state),children:e.jsx("h6",{children:d.quotation_data[i].state})})]})}),e.jsx("div",{className:"col-md-12",children:e.jsxs("div",{className:"fs-8",children:["Revision: 1.",d.quotation_data[i].rev]})})]})]}),e.jsxs(C,{children:[e.jsx(u,{color:"info",isLight:!0,icon:"Download",onClick:()=>a(-1),children:"PDF"}),e.jsx(u,{color:"info",onClick:()=>a(-1),children:"Create Variation"})]})]}),e.jsx(U,{container:"fluid",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-xl-12 col-lg-12 col-md-12",children:e.jsxs(_,{tag:"form",children:[e.jsx(M,{children:e.jsx(S,{children:e.jsx(D,{tag:"div",className:"h3",children:"View Quotation"})})}),e.jsx(b,{className:"pb-0",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"QuotationDate",label:"Quotation Date",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].quotation_date,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(t,{id:"Client",label:"Client",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].client,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"EndUser",label:"End User",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].end_user,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"SiteLocation",label:"Site Location",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].site_location,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"Building",label:"Building",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].building,disabled:!0})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"PIC",label:"PIC",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].pic,disabled:!0})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(t,{id:"Email",label:"Email",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].email,disabled:!0})})})]})}),e.jsx(T,{children:e.jsx(e.Fragment,{})})]})}),e.jsxs("div",{className:"col-xl-12 col-lg-12 col-md-12",children:[e.jsx(_,{children:e.jsxs(b,{children:[e.jsx(j,{children:d.quotation_data.map((o,c)=>e.jsx(x,{onClick:()=>r(c),isActive:c==i,children:e.jsx(u,{children:c==0?"Quotation":"Variation "+c})}))}),e.jsx("hr",{}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-xl-12 col-lg-12 col-md-12",children:["Quotation No:"," ",d.quotation_data[i].quotation_no,"   ",e.jsx(N,{className:"statusBadge",color:g(d.quotation_data[i].state),children:e.jsx("h6",{children:d.quotation_data[i].state})})]}),e.jsxs("h6",{children:["Revision: 1.",i]})]}),d.quotation_data[i].item.map((o,c)=>e.jsx(E,{item:o}))]})}),e.jsx(_,{children:e.jsx(b,{children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-12",children:e.jsx("h4",{children:"Summary"})}),e.jsx("div",{className:"col-md-8",children:e.jsx(t,{id:"referenceStatus",label:"Reference Status",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].reference_status})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"total",label:"Total (RM)",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].total})})}),e.jsx("div",{className:"col-md-8",children:e.jsx(t,{id:"note",label:"Note",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].note})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(t,{id:"gtotal",label:"G/Total (RM)",isFloating:!0,children:e.jsx(s,{placeholder:"Name",value:d.quotation_data[i].g_total})})})]})})})]})]})})]})};export{H as default};