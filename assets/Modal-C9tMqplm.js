import{r as t,y as q,z as U,D as B,E as A,L as D,j as m,T as G,G as E,H as o,J as W,K as _}from"./index-Cl5CWA3E.js";function $(){const s=t.useRef(!1);return q(()=>(s.current=!0,()=>{s.current=!1}),[]),s}function J(){const s=$(),[r,e]=t.useState(0),n=t.useCallback(()=>{s.current&&e(r+1)},[r]);return[t.useCallback(()=>U.postRender(n),[n]),r]}class V extends t.Component{getSnapshotBeforeUpdate(r){const e=this.props.childRef.current;if(e&&r.isPresent&&!this.props.isPresent){const n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function Q({children:s,isPresent:r}){const e=t.useId(),n=t.useRef(null),u=t.useRef({width:0,height:0,top:0,left:0});return t.useInsertionEffect(()=>{const{width:l,height:f,top:p,left:R}=u.current;if(r||!n.current||!l||!f)return;n.current.dataset.motionPopId=e;const c=document.createElement("style");return document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${e}"] {
            position: absolute !important;
            width: ${l}px !important;
            height: ${f}px !important;
            top: ${p}px !important;
            left: ${R}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[r]),t.createElement(V,{isPresent:r,childRef:n,sizeRef:u},t.cloneElement(s,{ref:n}))}const j=({children:s,initial:r,isPresent:e,onExitComplete:n,custom:u,presenceAffectsLayout:l,mode:f})=>{const p=B(X),R=t.useId(),c=t.useMemo(()=>({id:R,initial:r,isPresent:e,custom:u,onExitComplete:a=>{p.set(a,!0);for(const d of p.values())if(!d)return;n&&n()},register:a=>(p.set(a,!1),()=>p.delete(a))}),l?void 0:[e]);return t.useMemo(()=>{p.forEach((a,d)=>p.set(d,!1))},[e]),t.useEffect(()=>{!e&&!p.size&&n&&n()},[e]),f==="popLayout"&&(s=t.createElement(Q,{isPresent:e},s)),t.createElement(A.Provider,{value:c},s)};function X(){return new Map}function Y(s){return t.useEffect(()=>()=>s(),[])}const g=s=>s.key||"";function Z(s,r){s.forEach(e=>{const n=g(e);r.set(n,e)})}function ee(s){const r=[];return t.Children.forEach(s,e=>{t.isValidElement(e)&&r.push(e)}),r}const te=({children:s,custom:r,initial:e=!0,onExitComplete:n,exitBeforeEnter:u,presenceAffectsLayout:l=!0,mode:f="sync"})=>{const p=t.useContext(D).forceRender||J()[0],R=$(),c=ee(s);let a=c;const d=t.useRef(new Map).current,x=t.useRef(a),y=t.useRef(new Map).current,b=t.useRef(!0);if(q(()=>{b.current=!1,Z(c,y),x.current=a}),Y(()=>{b.current=!0,y.clear(),d.clear()}),b.current)return t.createElement(t.Fragment,null,a.map(i=>t.createElement(j,{key:g(i),isPresent:!0,initial:e?void 0:!1,presenceAffectsLayout:l,mode:f},i)));a=[...a];const v=x.current.map(g),w=c.map(g),P=v.length;for(let i=0;i<P;i++){const h=v[i];w.indexOf(h)===-1&&!d.has(h)&&d.set(h,void 0)}return f==="wait"&&d.size&&(a=[]),d.forEach((i,h)=>{if(w.indexOf(h)!==-1)return;const T=y.get(h);if(!T)return;const K=v.indexOf(h);let N=i;if(!N){const H=()=>{d.delete(h);const F=Array.from(y.keys()).filter(C=>!w.includes(C));if(F.forEach(C=>y.delete(C)),x.current=c.filter(C=>{const z=g(C);return z===h||F.includes(z)}),!d.size){if(R.current===!1)return;p(),n&&n()}};N=t.createElement(j,{key:g(T),isPresent:!1,onExitComplete:H,custom:r,presenceAffectsLayout:l,mode:f},T),d.set(h,N)}a.splice(K,0,N)}),a=a.map(i=>{const h=i.key;return d.has(h)?i:t.createElement(j,{key:g(i),isPresent:!0,presenceAffectsLayout:l,mode:f},i)}),t.createElement(t.Fragment,null,d.size?a:a.map(i=>t.cloneElement(i)))};function M(s,r,e=window){const n=t.useRef();t.useEffect(()=>{n.current=r},[r]),t.useEffect(()=>{if(!(e&&e.addEventListener))return;const l=f=>n.current(f);return e.addEventListener(s,l),()=>{e.removeEventListener(s,l)}},[s,e])}const I=t.forwardRef(({tag:s,id:r,children:e,className:n,...u},l)=>m.jsx(G,{tag:s,ref:l,id:r,className:E("modal-title",n),...u,children:e}));I.displayName="ModalTitle";I.propTypes={id:o.string.isRequired,children:o.node.isRequired,className:o.string,tag:o.oneOf(["h1","h2","h3","h4","h5","h6","div","span"])};I.defaultProps={className:void 0,tag:"h5"};const L=t.forwardRef(({children:s,className:r,setIsOpen:e,...n},u)=>m.jsxs("div",{ref:u,className:E("modal-header",r),...n,children:[s,e&&m.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",onClick:()=>e(!1)})]}));L.displayName="ModalHeader";L.propTypes={children:o.node.isRequired,className:o.string,setIsOpen:o.func};L.defaultProps={className:void 0,setIsOpen:void 0};const k=t.forwardRef(({children:s,className:r,...e},n)=>m.jsx("div",{ref:n,className:E("modal-body",r),...e,children:s}));k.displayName="ModalBody";k.propTypes={children:o.node.isRequired,className:o.string};k.defaultProps={className:void 0};const O=t.forwardRef(({children:s,className:r,...e},n)=>m.jsx("div",{ref:n,className:E("modal-footer",r),...e,children:s}));O.displayName="ModalFooter";O.propTypes={children:o.node.isRequired,className:o.string};O.defaultProps={className:void 0};const S=({children:s,isOpen:r,setIsOpen:e,id:n,titleId:u,isStaticBackdrop:l,isScrollable:f,isCentered:p,size:R,fullScreen:c,isAnimation:a,...d})=>{const x=t.useRef(null),y=t.useRef(null);t.useLayoutEffect(()=>(r&&document.body.classList.add("modal-open"),()=>{document.body.classList.remove("modal-open")}));const b=i=>{y.current&&!y.current.contains(i.target)&&!l&&e(!1)};M("mousedown",b),M("touchstart",b);const v=i=>{y.current&&!y.current.contains(i.target)&&l&&(x.current.classList.add("modal-static"),setTimeout(()=>x.current.classList.remove("modal-static"),300))};M("mousedown",v),M("touchstart",v),M("keydown",i=>{i.key==="Escape"&&e(!1)});const P=a?{initial:{opacity:0,y:"-50%"},animate:{opacity:1,x:"0%",y:"0%"},exit:{opacity:0,y:"-50%"},transition:{ease:"easeInOut",duration:.3}}:null;return m.jsx(W,{children:m.jsx(te,{mode:"wait",children:r&&m.jsxs(m.Fragment,{children:[m.jsx(_.div,{ref:x,className:E("modal",{fade:a},"show"),role:"dialog",style:{display:"block"},id:n,tabIndex:-1,"aria-labelledby":u,"aria-hidden":"true","data-bs-backdrop":l?"static":null,"data-bs-keyboard":l?"false":null,...P,...d,children:m.jsx("div",{ref:y,className:E("modal-dialog",{"modal-dialog-scrollable":f,"modal-dialog-centered":p,[`modal-${R}`]:R,[`modal-fullscreen${typeof c=="string"?`-${c}-down`:""}`]:c}),children:m.jsx("div",{className:"modal-content",children:s})})},"modal"),m.jsx("div",{className:E("modal-backdrop",{fade:a},"show")})]})})})};S.propTypes={isOpen:o.bool.isRequired,setIsOpen:o.func.isRequired,children:o.node.isRequired,id:o.string,titleId:o.string,isStaticBackdrop:o.bool,isScrollable:o.bool,isCentered:o.bool,size:o.oneOf([null,"sm","lg","xl"]),fullScreen:o.oneOfType([o.oneOf(["sm","md","lg","xl","xxl"]),o.bool]),isAnimation:o.bool};S.defaultProps={id:void 0,isStaticBackdrop:!1,isScrollable:!1,isCentered:!1,size:null,fullScreen:!1,isAnimation:!0,titleId:void 0};export{S as M,L as a,I as b,k as c,O as d};