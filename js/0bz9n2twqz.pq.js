;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="9786e452-d606-3516-587d-c6290c0ceb94")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,875744,e=>{e.v({root:"RoleBadge-module__zj-yvq__root"})},389133,e=>{"use strict";var r=e.i(276385),t=e.i(712903),s=e.i(177037),i=e.i(596139),a=e.i(480028),n=e.i(744006),l=e.i(244945),o=e.i(875744);let u=({tagline:e,name:t,color:s,iconLeft:i})=>{let a=(0,r.jsx)(n.Pill,{text:t,colorway:s,iconLeft:i,clsx:o.default.root,variant:"muted",compact:!0});return e?(0,r.jsx)(l.Tooltip,{isDisabled:!e,tooltip:e,children:a}):a},d=()=>(0,r.jsx)(u,{name:i.corePlanName,color:"orange",iconLeft:(0,r.jsx)(t.default,{size:12,color:s.brandOrange})});e.s(["CoreBadge",0,d,"DefaultBadge",0,u,"RoleBadge",0,{Default:u,Admin:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Admin",name:"Admin",color:"yellow"}),Detective:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Detective",name:"Detective",color:"green"}),Featured:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Verified",name:"Verified",color:"blue"}),Hacker:({tagline:e})=>(0,r.jsx)(u,{tagline:e??`${i.hackerPlanName} users are subscribed to Replit's paid ${i.hackerPlanName} Plan.`,name:i.hackerPlanName,color:"green"}),Core:d,Pro:()=>(0,r.jsx)(u,{name:i.proPlanName,color:"blue",iconLeft:(0,r.jsx)(t.default,{size:12,color:a.tokens.blueStrongest})}),LanguageJammer:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Language Jammer",name:"Language Jammer",color:"purple"}),ReplitRep:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Replit Rep",name:"Replit Rep",color:"magenta"}),ReplitRepEdu:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Replit Rep EDU",name:"Replit Rep EDU",color:"green"}),Patron:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Patron",name:"Patron",color:"purple"}),Pythonista:({tagline:e})=>(0,r.jsx)(u,{tagline:e??"Pythonista",name:"Pythonista",color:"teal"})}])},449859,e=>{"use strict";var r,t=e.i(276385),s=e.i(389133),i=((r={}).Admin="ADMIN",r.Detective="DETECTIVE",r.Featured="FEATURED",r.LanguageJammer="LANGUAGE_JAMMER",r.Moderator="MODERATOR",r.ReplitRep="REPLIT_REP",r.ReplitRepEdu="REPLIT_REP_EDU",r.Patron="PATRON",r.Pythonista="PYTHONISTA",r.Student="STUDENT",r.Teacher="TEACHER",r.Hacker="hacker",r.HackerPro="hacker_pro",r.Pro="pro",r);e.s(["RUIUserRoles",()=>i,"UserRoleBadge",0,({userRole:e,tagline:r,name:i})=>{switch(e){case"DETECTIVE":return(0,t.jsx)(s.RoleBadge.Detective,{tagline:r});case"MODERATOR":return null;case"LANGUAGE_JAMMER":return(0,t.jsx)(s.RoleBadge.LanguageJammer,{tagline:r});case"FEATURED":return(0,t.jsx)(s.RoleBadge.Featured,{tagline:r});case"ADMIN":return(0,t.jsx)(s.RoleBadge.Admin,{tagline:r});case"REPLIT_REP":return(0,t.jsx)(s.RoleBadge.ReplitRep,{tagline:r});case"REPLIT_REP_EDU":return(0,t.jsx)(s.RoleBadge.ReplitRepEdu,{tagline:r});case"PATRON":return(0,t.jsx)(s.RoleBadge.Patron,{tagline:r});case"PYTHONISTA":return(0,t.jsx)(s.RoleBadge.Pythonista,{tagline:r});case"hacker":return(0,t.jsx)(s.RoleBadge.Hacker,{tagline:r});case"hacker_pro":return(0,t.jsx)(s.RoleBadge.Core,{});case"pro":return(0,t.jsx)(s.RoleBadge.Pro,{});default:return(0,t.jsx)(s.RoleBadge.Default,{tagline:r,name:i})}}])},21875,e=>{"use strict";var r=e.i(276385),t=e.i(871579),s=e.i(825419),i=e.i(488299),a=e.i(744006),n=e.i(8047),l=e.i(449859),o=e.i(61732);let u={[l.RUIUserRoles.Admin]:"Admin",[l.RUIUserRoles.Moderator]:"Community Moderator",[l.RUIUserRoles.Teacher]:"Teacher",[l.RUIUserRoles.Student]:"Student"};e.s(["User",0,function({src:e,username:l,email:d,fullName:c,displayName:g,small:p,role:m,localRole:h,plan:f,className:x,style:R}){return(0,r.jsxs)(o.View,{row:!0,gap:8,align:"center",shrink:!0,className:x,style:R,children:[(0,r.jsx)(s.Avatar,{src:e,username:l??d,fullName:c,size:p?24:32,layout:"intrinsic"}),(0,r.jsxs)(o.View,{grow:!0,shrink:!0,row:!0,gap:4,align:"center",children:[void 0!==g?(0,r.jsxs)(o.View,{className:"UserInfo",gap:4,children:[(0,r.jsx)(n.Text,{multiline:!1,children:g}),(0,r.jsxs)(n.Text,{variant:"small",color:"dimmest",multiline:!1,translate:"no",children:[l?`@${l}`:"",d?`${d}`:""]})]}):(0,r.jsx)(n.Text,{multiline:!1,translate:"no",children:l}),void 0!==f&&(0,r.jsx)(i.IconButton,{alt:"plan subscriber",colorway:"primary",children:(0,r.jsx)(t.default,{})}),void 0!==m&&(0,r.jsx)(a.Pill,{colorway:"primary",text:u[m]}),void 0!==h&&(0,r.jsx)(a.Pill,{text:h})]})]})}])},276887,e=>{"use strict";var r=e.i(908796),t=e.i(569910),s=e.i(596139);e.s(["convertToSalesLedPlanNameIfApplicable",0,function(e,t){if(e===`Replit ${s.replitTeamsPlanName}`){if(t?.dealType===r.OrgDealType.Enterprise)return(0,s.getEnterprisePlanDisplayName)(!1);if(t?.dealType===r.OrgDealType.EnterpriseTrial)return(0,s.getEnterprisePlanDisplayName)(!0);if(t?.dealType===r.OrgDealType.Trial)return`Replit ${s.replitTeamsPlanName} Trial`}return e},"getFormattedOrgWorkspaceName",0,({isInOrg:e,ownerName:r,maxNameLength:t=20})=>{if(!r)return"Personal Workspace";let s=r.trim();return s.length>t&&!e?"Personal Workspace":e?`${s} Workspace`:`${s}'s Workspace`},"isCappedPlan",0,function(e){return e===r.PlanId.CoreV3||e===r.PlanId.Pro},"isEnterpriseOrg",0,function(e){return e?.dealType===r.OrgDealType.Enterprise||e?.dealType===r.OrgDealType.EnterpriseTrial},"orgGroupToDisplayName",0,function(e){switch(e){case r.SystemOrgGroupType.SystemAdmins:return"Admin";case r.SystemOrgGroupType.SystemMembers:return"Member";case r.SystemOrgGroupType.SystemGuests:return"Guest";case r.SystemOrgGroupType.SystemViewers:return"Viewer";default:(0,t.default)(e)}}])},842088,e=>{e.v({input:"OrgUpgradeRequestModal-module__AkvMRq__input"})},416004,938762,e=>{"use strict";var r=e.i(276385),t=e.i(389959),s=e.i(351623),i=e.i(299020),a=e.i(344480);e.i(975473);let n={},l=s.gql`
    mutation CreateViewerUpgradeRequest($input: CreateViewerUpgradeRequestInput!) {
  createViewerUpgradeRequest(input: $input) {
    ... on ViewerUpgradeRequest {
      id
      status
    }
  }
}
    `;function o(e){let r={...n,...e};return i.useMutation(l,r)}let u=s.gql`
    query OrgViewerUpgradeRequest($orgId: String!, $upgradeRequestInput: OrgUpgradeRequestInput!) {
  currentUser {
    id
    org(orgId: $orgId) {
      ... on Org {
        id
        upgradeRequest(input: $upgradeRequestInput) {
          ... on ViewerUpgradeRequest {
            id
            status
          }
        }
      }
    }
  }
}
    `;e.s(["OrgViewerUpgradeRequestDocument",0,u,"useCreateViewerUpgradeRequestMutation",0,o,"useOrgViewerUpgradeRequestQuery",0,function(e){let r={...n,...e};return a.useQuery(u,r)}],938762);var d=e.i(709485),c=e.i(151027),g=e.i(410458),p=e.i(415541),m=e.i(643484),h=e.i(528710),f=e.i(528326),x=e.i(8047),R=e.i(61732),w=e.i(842088);e.s(["default",0,({isOpen:e,orgName:s,orgId:i,onClose:a,onSuccess:n})=>{let[l,y]=(0,t.useState)(""),{scimViewerUpgradeLink:j}=(0,g.default)(i),_=j&&!!j.trim(),[v,{loading:T}]=o({onCompleted:()=>{n()}});return(0,t.useEffect)(()=>{e&&(0,p.track)(d.events.ORG_VIEWER_SEAT_UPGRADE_MODAL_VIEWED,{orgId:i,context:(0,c.getOrgTrackingContext)({id:i})})},[e,i]),(0,r.jsx)(f.Modal,{isOpen:e,onRequestClose:a,children:(0,r.jsxs)(R.View,{gap:16,children:[(0,r.jsx)(x.Text,{variant:"subheadDefault",children:_?"Upgrade Your Access":"Request a Member Seat"}),(0,r.jsx)(x.Text,{color:"dimmer",children:_?`Get full member access to ${s}'s Replit workspace by requesting an upgrade in your company ticketing system.`:`Send a request to your team's admin for full member access in ${s}'s Replit workspace.`}),_?(0,r.jsx)(x.Text,{color:"dimmer",children:"You'll be redirected to complete the upgrade process."}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(R.View,{gap:8,children:[(0,r.jsx)(x.Text,{children:"Add a message to your request (optional)"}),(0,r.jsx)(h.Input,{clsx:w.default.input,type:"text",value:l,onChange:e=>y(e.target.value),placeholder:"Tell your admin what you want to create on Replit"})]}),(0,r.jsx)(x.Text,{color:"dimmer",children:"Until they respond you will still have limited viewer access."})]}),(0,r.jsx)(R.View,{row:!0,justify:"end",children:(0,r.jsx)(m.Button,{text:_?"Go to upgrade page":"Request upgrade",colorway:"primary",variant:"default",loading:!_&&T,isDisabled:!_&&T,onClick:()=>{_?(window.open(j,"_blank"),(0,p.track)(d.events.ORG_VIEWER_SEAT_UPGRADE_REQUESTED,{orgId:i,context:(0,c.getOrgTrackingContext)({id:i}),customUpgradeLink:!0}),a()):(v({variables:{input:{orgId:i,requestReason:l}},refetchQueries:[u]}),(0,p.track)(d.events.ORG_VIEWER_SEAT_UPGRADE_REQUESTED,{orgId:i,context:(0,c.getOrgTrackingContext)({id:i}),customUpgradeLink:!1}))}})})]})})}],416004)},648552,e=>{"use strict";var r=e.i(389959),t=e.i(908796),s=e.i(672220),i=e.i(320216),a=e.i(151027),n=e.i(933302);e.s(["useOrgSwitcher",0,function(){let{showError:e}=(0,i.default)(),l=(0,n.useSyncStatsigOrgContext)(),o=(0,a.useSetOptimisticOrg)(),[u]=(0,s.useCurrentUserOrgContextUpdateOrgContextMutation)({refetchQueries:[{query:s.CurrentUserOrgContextDocument}],onCompleted(r){r.updateOrgContext&&"Org"!==r.updateOrgContext.__typename&&e("Something went wrong switching workspaces. Please try again.")},onError(){e("Something went wrong switching workspaces. Please try again.")}});return(0,r.useCallback)(e=>{let r=e.type===t.OrgstypeEnumType.Personal,s=r?{orgId:void 0,orgSlug:void 0,orgRole:void 0,orgDealContext:void 0}:{orgId:e.id,orgSlug:e.slug,orgRole:e.orgRole,orgDealContext:e.orgDealContext};l(s.orgId,r?void 0:e.orgDealContext.dealType),o(s),u({variables:{input:{orgId:s.orgId}}})},[l,o,u])}])},294827,e=>{"use strict";var r=e.i(908796),t=e.i(351623),s=e.i(344480);e.i(975473);let i={},a=t.gql`
    fragment PersonalWorkspacesDisabledCurrentUser on CurrentUser {
  id
  personalWorkspacesDisabled
}
    `,n=t.gql`
    query PersonalWorkspacesDisabled {
  currentUser {
    ...PersonalWorkspacesDisabledCurrentUser
  }
}
    ${a}`;e.s(["usePersonalWorkspacesDisabled",0,function(){let e,{data:t}=(e={...i,...void 0},s.useQuery(n,e)),a=t?.currentUser,l=a?.personalWorkspacesDisabled??r.PersonalWorkspacesDisabledMode.None,o=l!==r.PersonalWorkspacesDisabledMode.None;return{shouldHidePersonalWorkspace:l===r.PersonalWorkspacesDisabledMode.Personal||l===r.PersonalWorkspacesDisabledMode.Full,restrictionMode:l,isRestrictedDomain:o}}],294827)},752533,e=>{e.v({dropdownAvatarAndName:"AvatarDropdown-module__n3A4ZW__dropdownAvatarAndName",dropdownItem:"AvatarDropdown-module__n3A4ZW__dropdownItem",dropdownItemSelected:"AvatarDropdown-module__n3A4ZW__dropdownItemSelected",orgNameText:"AvatarDropdown-module__n3A4ZW__orgNameText",overflowIndicator:"AvatarDropdown-module__n3A4ZW__overflowIndicator",sectionHeader:"AvatarDropdown-module__n3A4ZW__sectionHeader",workspaceContainerWrapper:"AvatarDropdown-module__n3A4ZW__workspaceContainerWrapper",workspaceDropdownContainer:"AvatarDropdown-module__n3A4ZW__workspaceDropdownContainer"})},795859,e=>{"use strict";var r=e.i(276385),t=e.i(914981),s=e.i(389959),i=e.i(908796),a=e.i(183035),n=e.i(320216),l=e.i(648552),o=e.i(294827),u=e.i(955410),d=e.i(448942),c=e.i(276887),g=e.i(406664),p=e.i(825419),m=e.i(744006),h=e.i(8047),f=e.i(61732),x=e.i(752533);let R=({currentUser:e,selected:t,onClick:s})=>{let i=(0,g.useCreateInteractive)({variant:"listItem"});return(0,r.jsxs)(f.View,{clsx:[i.clsx,t?x.default.dropdownItemSelected:x.default.dropdownItem],style:i.style,onClick:s,row:!0,align:"center",justify:t?"space-between":void 0,px:8,py:4,children:[(0,r.jsxs)(f.View,{clsx:x.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(p.Avatar,{src:e.image,username:e.username,fullName:e.fullName,size:20}),(0,r.jsx)(h.Text,{variant:"text",color:t?"default":"dimmer",multiline:!1,clsx:x.default.orgNameText,children:"Personal"})]}),(0,r.jsx)(f.View,{align:"center",row:!0,children:t?(0,r.jsx)(a.default,{size:16}):null})]})},w=({selected:e,org:s,currentOrgId:o,groupType:R,isNewPillStyle:w=!1,onRoute:y})=>{let j=(0,g.useCreateInteractive)({variant:"listItem"}),{showError:_}=(0,n.default)(),{trackClick:v}=(0,u.useTrackClick)(),T=(0,l.useOrgSwitcher)(),{name:P,slug:k}=s,{home:b}=(0,d.orgLinks)({slug:k}),S=(0,t.useRouter)();return(0,r.jsxs)(f.View,{clsx:[j.clsx,e?x.default.dropdownItemSelected:x.default.dropdownItem],style:j.style,onClick:()=>{e||v({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:o?"shared":"personal",target_workspace_type:"shared"}}),s.currentUserRole?(T({type:i.OrgType.Team,id:s.id,slug:s.slug,orgRole:s.currentUserRole,orgDealContext:s.dealContext}),y()):_("Something went wrong, please try again."),S.push(b.href)},row:!0,align:"center",justify:e?"space-between":void 0,px:8,py:4,children:[(0,r.jsxs)(f.View,{clsx:x.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(p.Avatar,{src:s.image??null,username:P,fullName:s.name,size:20}),(0,r.jsxs)(f.View,{row:!0,align:"center",gap:8,children:[(0,r.jsx)(h.Text,{variant:"text",color:e?"default":"dimmer",multiline:!1,translate:"no",clsx:x.default.orgNameText,children:P}),R&&w?(0,r.jsx)(m.Pill,{text:(0,c.orgGroupToDisplayName)(R),compact:!0}):null,R&&!w?(0,r.jsx)(h.Text,{variant:"small",color:"dimmest",children:(0,c.orgGroupToDisplayName)(R)}):null]})]}),(0,r.jsx)(f.View,{align:"center",row:!0,children:e?(0,r.jsx)(a.default,{size:16}):null})]})};e.s(["OrgDropdown",0,({currentUser:e,currentOrgId:a,loading:n=!1,hasOrgs:d=!1,onRoute:c})=>{let g=(0,t.useRouter)(),p=(0,s.useRef)(null),[m,y]=(0,s.useState)(!1),{shouldHidePersonalWorkspace:j}=(0,o.usePersonalWorkspacesDisabled)(),{trackClick:_}=(0,u.useTrackClick)(),v=(0,l.useOrgSwitcher)();return((0,s.useEffect)(()=>{let e=()=>{if(p.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=p.current;y(e>r&&!(t+r>=e-1))}};e(),window.addEventListener("resize",e);let r=p.current;return r&&r.addEventListener("scroll",e),()=>{window.removeEventListener("resize",e),r&&r.removeEventListener("scroll",e)}},[]),e?.orgs&&"CurrentUserOrganizationConnection"===e.orgs.__typename&&!n&&d)?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(f.View,{children:[(0,r.jsx)(f.View,{clsx:x.default.sectionHeader,row:!0,align:"center",p:8,children:(0,r.jsx)(h.Text,{variant:"small",color:"dimmest",children:"Switch Workspace"})}),(0,r.jsxs)(f.View,{clsx:x.default.workspaceContainerWrapper,children:[(0,r.jsxs)(f.View,{innerRef:p,clsx:x.default.workspaceDropdownContainer,children:[j?null:(0,r.jsx)(R,{currentUser:e,selected:void 0===a,onClick:()=>{a&&_({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:"shared",target_workspace_type:"personal"}}),v({type:i.OrgType.Personal}),g.push("/home","/~",{shallow:!1})}}),e.orgs.items.map(({org:e,type:t})=>(0,r.jsx)(w,{org:e,groupType:t,selected:e.id===a,currentOrgId:a,onRoute:c},e.id))]}),m?(0,r.jsx)(f.View,{clsx:x.default.overflowIndicator}):null]})]})}):null},"OrgDropdownItem",0,w,"PersonalDropdownItem",0,R])},970311,e=>{e.v({placeholder:"DefaultOrgIcon-module__jpmNua__placeholder"})},897395,644756,e=>{"use strict";var r=e.i(276385),t=e.i(389959),s=e.i(351623),i=e.i(85085),a=e.i(884033),n=e.i(344480);e.i(975473);let l={},o=s.gql`
    query GetOwnerPillOrgs {
  currentUser {
    id
    ...OrgSwitcherCurrentUser
  }
}
    ${i.OrgSwitcherCurrentUserFragmentDoc}`;function u(e){let r={...l,...e};return n.useQuery(o,r)}let d=s.gql`
    query GetOwnerPillWorkspaceDropdown {
  currentUser {
    ...WorkspaceDropdownCurrentUser
  }
}
    ${a.WorkspaceDropdownCurrentUserFragmentDoc}`;function c(e){let r={...l,...e};return n.useQuery(d,r)}e.s(["GetOwnerPillOrgsDocument",0,o,"useGetOwnerPillOrgsQuery",0,u,"useGetOwnerPillWorkspaceDropdownQuery",0,c],644756);var g=e.i(167392),p=e.i(568430),m=e.i(269848),h=e.i(151027),f=e.i(612343),x=e.i(61732),R=e.i(970311);let w=()=>(0,r.jsx)(x.View,{align:"center",justify:"center",br:"full",clsx:R.default.placeholder,children:(0,r.jsx)(f.default,{size:12})});var y=e.i(276887),j=e.i(825419),_=e.i(643484),v=e.i(773222),T=e.i(795859),P=e.i(914981),k=e.i(908796),b=e.i(40916),S=e.i(596139),I=e.i(856010),A=e.i(648552),E=e.i(294827),U=e.i(955410);e.i(450717);var C=e.i(242917),D=e.i(480028),O=e.i(406664),M=e.i(919073),L=e.i(744006),$=e.i(8047),W=e.i(158323),N=e.i(752533);let F=({onClick:e,showCoreBadge:t=!1})=>{let s=(0,O.useCreateInteractive)({variant:"listItem"});return(0,r.jsxs)(x.View,{clsx:[s.clsx,N.default.dropdownItem],style:s.style,onClick:e,row:!0,align:"center",justify:t?"space-between":void 0,px:8,py:4,gap:16,children:[(0,r.jsxs)(x.View,{clsx:N.default.dropdownAvatarAndName,row:!0,align:"center",gap:8,children:[(0,r.jsx)(x.View,{row:!0,align:"center",justify:"center",px:2,children:(0,r.jsx)(b.default,{color:D.tokens.foregroundDimmest,size:16})}),(0,r.jsx)($.Text,{variant:"text",color:"dimmer",multiline:!1,children:"Create workspace"})]}),t?(0,r.jsx)(W.default,{plan:S.corePlanName,size:"small"}):null]})},G=({currentOrgId:e,onRoute:s,currentUser:i,onlyUnifiedPlanEnabled:a=!1})=>{let n=(0,P.useRouter)(),l=(0,t.useRef)(null),[o,u]=(0,t.useState)(!1),{shouldHidePersonalWorkspace:d}=(0,E.usePersonalWorkspacesDisabled)(),{show:c}=(0,C.useGlobalModal)(),{trackClick:g}=(0,U.useTrackClick)(),p=(0,A.useOrgSwitcher)();(0,t.useEffect)(()=>{let e=()=>{if(l.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=l.current;u(e>r&&!(t+r>=e-1))}};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[i]);let m=(0,I.useIsUnifiedPlanEnabled)({currentUser:i}),h=(e,r)=>{if(g({productArea:"workspaces",target:"open_create_workspace_modal_button",properties:{canCreateWorkspace:r}}),m&&!r){s(),c("MembershipPurchaseModal",{analyticsContext:{upgrade:{context:"header_avatar"}}});return}s(),c("CreateWorkspaceModal",{customerId:e})};(0,t.useEffect)(()=>{let e=()=>{if(l.current){let{scrollHeight:e,clientHeight:r,scrollTop:t}=l.current;u(e>r&&!(t+r>=e-1))}},r=l.current;if(r)return r.addEventListener("scroll",e),()=>r.removeEventListener("scroll",e)},[i]);let f=i.customer.orgs;if("OrgConnection"!==f.__typename||"CustomerConnection"!==i.customers.__typename)return null;let R=i.customers.items.filter(e=>e.id!==i.customer.id&&(!a||e.isUnifiedPlanEnabled));return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(x.View,{clsx:N.default.workspaceContainerWrapper,children:[(0,r.jsxs)(x.View,{innerRef:l,clsx:N.default.workspaceDropdownContainer,children:[!a||m?(0,r.jsxs)(r.Fragment,{children:[d?null:(0,r.jsx)(x.View,{clsx:N.default.sectionHeader,row:!0,align:"center",p:8,children:(0,r.jsx)($.Text,{variant:"small",color:"dimmest",children:"Your workspaces"})}),d?null:(0,r.jsx)(T.PersonalDropdownItem,{currentUser:i,selected:void 0===e,onClick:()=>{e&&g({productArea:"workspaces",target:"switch_workspace_item",properties:{previous_workspace_type:"shared",target_workspace_type:"personal"}}),p({type:k.OrgType.Personal}),n.push("/home","/~",{shallow:!1})}}),f.items.map(t=>(0,r.jsx)(T.OrgDropdownItem,{org:t,selected:t.id===e,currentOrgId:e,isNewPillStyle:!0,onRoute:s},t.id)),i.customer.isUnifiedPlanEnabled&&!d&&i.customer.authorizations.createWorkspace.code!==k.CustomerAuthorizationCode.ScimEnabled&&i.customer.authorizations.createWorkspace.code!==k.CustomerAuthorizationCode.WorkosEnabled?(0,r.jsx)(F,{onClick:()=>h(i.customer.id,i.customer.authorizations.createWorkspace.isAuthorized),showCoreBadge:!i.customer.authorizations.createWorkspace.isAuthorized}):null]}):null,R.map(t=>{if("OrgConnection"!==t.orgs.__typename)return null;let i=t.orgs.items,a=t.name?.trim()||"",n=t.authorizations.createWorkspace.isAuthorized;return(0,r.jsxs)(M.ShadesSurface,{elevate:!1,border:{side:"top"},background:!1,children:[a?(0,r.jsxs)(x.View,{clsx:N.default.sectionHeader,row:!0,align:"center",gap:8,p:8,children:[(0,r.jsx)($.Text,{variant:"small",color:"dimmest",children:a}),n?(0,r.jsx)(L.Pill,{text:"Admin",compact:!0}):null]}):null,i.map(t=>(0,r.jsx)(T.OrgDropdownItem,{org:t,selected:t.id===e,currentOrgId:e,groupType:!n&&t.currentUserRole?t.currentUserRole:void 0,isNewPillStyle:!0,onRoute:s},t.id)),n&&t.isUnifiedPlanEnabled?(0,r.jsx)(F,{onClick:()=>h(t.id,n)}):null]},t.id)})]}),o?(0,r.jsx)(x.View,{clsx:N.default.overflowIndicator}):null]})})};e.s(["OwnerPill",0,function({ownerName:e,image:s,currentOrgId:i,isNewDesignEnabled:a=!1,loading:n=!1,onlyUnifiedPlanEnabled:l,alignment:o,stretch:d}){let f,[x,R]=(0,t.useState)(!1),P=(0,h.useCurrentUserStoredOrgContext)(),k=!a,{data:b}=u({skip:!k}),{data:S}=c({skip:k,fetchPolicy:"cache-and-network",ssr:!1});if(k&&!b)return null;let I=b?.currentUser,A=I?.orgs,E=A?.__typename==="CurrentUserOrganizationConnection"?A.items:[];if(k&&(!I||A?.__typename!=="CurrentUserOrganizationConnection")||k&&!E.length)return null;let U=(0,r.jsx)(j.Avatar,{src:s??null,username:e,size:24}),C=(0,y.getFormattedOrgWorkspaceName)({ownerName:e,isInOrg:!!i});return f=!k&&S?.currentUser?(0,r.jsx)(G,{currentOrgId:P.orgId,currentUser:S.currentUser,onRoute:()=>{R(!1)},onlyUnifiedPlanEnabled:l}):k&&I?(0,r.jsx)(T.OrgDropdown,{currentUser:I,currentOrgId:P.orgId,loading:!1,hasOrgs:E.length>0,onRoute:()=>{R(!1)}}):(0,r.jsx)(r.Fragment,{}),(0,r.jsxs)(v.PopoverTrigger,{isOpen:x,onOpenChange:R,placement:"bottom",label:"Switch Workspace",style:{marginLeft:"-6px"},children:[(0,r.jsx)(_.Button,{style:{paddingLeft:4},borderRadius:"full",iconLeft:n?(0,r.jsx)(m.default,{}):i?s?U:(0,r.jsx)(w,{}):U,iconRight:x?(0,r.jsx)(p.default,{}):(0,r.jsx)(g.default,{}),text:n?"":C,loading:n,alignment:o,stretch:d}),f]})}],897395)},882263,e=>{"use strict";var r=e.i(351623),t=e.i(344480);e.i(975473);let s={},i=r.gql`
    query GetCloudFreeUsage {
  currentUser {
    id
    cloudFreeUsageLimits {
      ... on FreemiumCloudUsageLimits {
        usage
        limit
        nextCreditsAt
      }
      ... on Error {
        message
      }
    }
  }
}
    `;e.s(["useGetCloudFreeUsage",0,function({skip:e}={}){var r;let a,{data:n,loading:l,error:o,refetch:u}=(r={skip:e},a={...s,...r},t.useQuery(i,a));return{loading:l,error:o,cloudUsage:n?.currentUser?.cloudFreeUsageLimits.__typename==="FreemiumCloudUsageLimits"?n?.currentUser?.cloudFreeUsageLimits:void 0,refetch:u}}],882263)},90397,e=>{e.v({icon:"PlanUsageMeter-module__klJjbG__icon",meterWrapper:"PlanUsageMeter-module__klJjbG__meterWrapper",title:"PlanUsageMeter-module__klJjbG__title",usageString:"PlanUsageMeter-module__klJjbG__usageString"})},22834,e=>{"use strict";var r=e.i(276385),t=e.i(389959),s=e.i(480028),i=e.i(8047),a=e.i(244945),n=e.i(61732),l=e.i(90397);e.s(["UsageMeterWrapper",0,({icon:e,usageString:s,title:o,tooltip:u,children:d})=>(0,r.jsxs)(n.View,{grow:!0,row:!0,gap:8,align:"center",children:[(0,r.jsx)(n.View,{clsx:l.default.icon,children:(0,t.cloneElement)(e,{className:l.default.icon})}),(0,r.jsxs)(n.View,{grow:!0,gap:2,children:[(0,r.jsx)(i.Text,{height:"singleLine",color:"dimmer",className:l.default.title,children:o}),(0,r.jsx)(n.View,{row:!0,align:"center",gap:4,children:(0,r.jsx)(i.Text,{color:"dimmest",height:"singleLine",className:l.default.usageString,children:s})})]}),(0,r.jsx)(n.View,{clsx:l.default.meterWrapper,children:u?(0,r.jsx)(a.Tooltip,{tooltip:u,children:d}):d})]}),"getPercentageBorderColor",0,function({decimal:e}){return e>.25?s.tokens.blueDimmest:s.tokens.greyDimmest},"getPercentageFillColor",0,function({decimal:e}){return e>.25?s.tokens.blueDimmer:s.tokens.greyDimmer}])},374652,e=>{"use strict";var r=e.i(135173),t=e.i(480028);e.s(["getBorderColor",0,({replCount:e,limit:s=r.STARTER_PLAN_REPL_LIMIT})=>e/s>=.25?t.tokens.blueDimmest:t.tokens.greyDimmest,"getFillColor",0,({replCount:e,limit:s=r.STARTER_PLAN_REPL_LIMIT})=>e/s>=.25?t.tokens.blueDimmer:t.tokens.greyDimmer])},999529,e=>{e.v({fontMedium:"PlanUsageMonitor-module__4qxt2q__fontMedium",header:"PlanUsageMonitor-module__4qxt2q__header"})},765269,e=>{"use strict";var r=e.i(276385),t=e.i(596139),s=e.i(135173),i=e.i(3466),a=e.i(929773),n=e.i(730497),l=e.i(934440),o=e.i(882263),u=e.i(8047),d=e.i(61732),c=e.i(103490),g=e.i(480028),p=e.i(462229),m=e.i(691636),h=e.i(201894),f=e.i(22834);let x=(0,p.cssRecord)({measureBar:[m.rcss.height(10),m.rcss.borderRadius(2),m.rcss.overflow("visible")],measureBarProgress:[m.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),R=({used:e=0,quota:t=1,loading:s})=>{let i=Math.min(1,e/t);return(0,r.jsx)(f.UsageMeterWrapper,{title:"Agent credits",icon:(0,r.jsx)(c.default,{}),usageString:s?"Loading...":`${Math.floor(100*i)}% used`,children:(0,r.jsx)(h.MeasureBar,{className:"measureBar",total:1,tooltipHidden:!0,current:i,loading:s,css:[x.measureBar,{".measureBarProgress":[m.rcss.border({color:(0,f.getPercentageBorderColor)({decimal:i})}),x.measureBarProgress]}],color:(0,f.getPercentageFillColor)({decimal:i}),backgroundColor:g.tokens.backgroundHigher})})};var w=e.i(490262);let y=(0,p.cssRecord)({measureBar:[m.rcss.height(10),m.rcss.borderRadius(2),m.rcss.overflow("visible")],measureBarProgress:[m.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),j=({used:e=0,quota:t=1,loading:s})=>{let i=Math.min(1,e/t);return(0,r.jsx)(f.UsageMeterWrapper,{title:"Cloud credits",icon:(0,r.jsx)(w.default,{}),usageString:s?"Loading...":`${Math.floor(100*i)}% used`,children:(0,r.jsx)(h.MeasureBar,{className:"measureBar",total:1,tooltipHidden:!0,current:i,loading:s,css:[y.measureBar,{".measureBarProgress":[m.rcss.border({color:(0,f.getPercentageBorderColor)({decimal:i})}),y.measureBarProgress]}],color:(0,f.getPercentageFillColor)({decimal:i}),backgroundColor:g.tokens.backgroundHigher})})};var _=e.i(919073),v=e.i(108431);let T=2/3,P=({publicRepls:e,agentUsage:i,showReplsLimit:n=!0,showAgentUsage:l=!0})=>{let o,u=(0,a.useReplLimit)(),c="data"===u.type?u.starterPlanReplLimit:s.STARTER_PLAN_REPL_LIMIT,g=(o=[],n&&o.push({type:"Apps",percentage:e/c}),l&&o.push({type:`${t.freePlanName} plan usage`,percentage:i}),o),p=g.filter(e=>e.percentage>1),m=g.filter(e=>1===e.percentage),h=g.filter(e=>e.percentage>=.85&&e.percentage<1),f=g.filter(e=>e.percentage>=T&&e.percentage<.85),x=null;return p.length>0?x=(0,r.jsx)(_.ShadesSurface,{colorShade:"themeError",br:"container",children:(0,r.jsx)(v.StatusBanner,{text:"You've exceeded your usage limit"})}):m.length>0?x=(0,r.jsx)(_.ShadesSurface,{colorShade:"themeError",br:"container",children:(0,r.jsx)(v.StatusBanner,{text:"You've reached your usage limit"})}):h.length>0?x=(0,r.jsx)(_.ShadesSurface,{colorShade:"themeBrandInverted",br:"container",children:(0,r.jsx)(v.StatusBanner,{text:"You're nearing your usage limit"})}):f.length>0&&(x=(0,r.jsx)(_.ShadesSurface,{colorShade:"themeWarning",br:"container",children:(0,r.jsx)(v.StatusBanner,{text:"Approaching your usage limit"})})),x?(0,r.jsx)(d.View,{pb:4,children:x}):null};var k=e.i(806930),b=e.i(374652);let S=(0,p.cssRecord)({measureBar:[m.rcss.height(10),m.rcss.borderRadius(2),m.rcss.overflow("visible"),{pointerEvents:"none"}],measureBarProgress:[m.rcss.borderRadius(2),{marginTop:-1,marginLeft:-1,boxSizing:"content-box"}]}),I=({publicRepls:e,loading:t})=>{let i=e??0,n=(0,a.useReplLimit)(),l="data"===n.type?n.starterPlanReplLimit:s.STARTER_PLAN_REPL_LIMIT;return(0,r.jsx)(f.UsageMeterWrapper,{title:"Free Apps",tooltip:`You can create ${Math.max(0,l-i)} more Apps for free. Upgrade to create unlimited Public and Private Apps.`,icon:(0,r.jsx)(k.default,{}),usageString:t?"Loading...":`${i}/${l} created`,children:(0,r.jsx)(h.MeasureBar,{total:l,current:i,loading:t,color:(0,b.getFillColor)({replCount:i,limit:l}),tooltipHidden:!0,css:[S.measureBar,{".measureBarProgress":[m.rcss.border({color:(0,b.getBorderColor)({replCount:i,limit:l})}),S.measureBarProgress]}],backgroundColor:g.tokens.backgroundHigher})})};var A=e.i(999529);let E=({publicRepls:e,replsLimitLoading:s,agentUsage:a,showReplsLimit:n=!0,showAgentUsage:l=!0,cloudUsage:o,upgradeButtonColorway:c="primary"})=>{let g=0;return a?.usage!==void 0&&a?.limit!==void 0&&a.limit>0&&(g=a.usage/a.limit),(0,r.jsxs)(d.View,{px:12,pt:12,pb:12,gap:8,children:[(0,r.jsx)(d.View,{row:!0,justify:"space-between",align:"center",pb:4,clsx:A.default.header,children:(0,r.jsx)(u.Text,{className:A.default.fontMedium,color:"dimmer",height:"singleLine",children:"Your Starter Plan"})}),(0,r.jsx)(P,{publicRepls:e,agentUsage:g,showReplsLimit:n,showAgentUsage:l}),(0,r.jsxs)(d.View,{pb:4,gap:8,children:[n?(0,r.jsx)(I,{publicRepls:e,loading:s}):null,l?(0,r.jsx)(R,{used:a?.usage,quota:a?.limit,loading:a.loading}):null]}),(0,r.jsx)(d.View,{pb:4,gap:8,children:(0,r.jsx)(j,{used:o?.usage,quota:o?.limit,loading:o.loading})}),(0,r.jsx)(i.default,{dataCy:"sidebar-upgrade-btn",context:"sidebar",text:`Upgrade to Replit ${t.corePlanName}`,colorway:c,variant:"default",modalHeadingText:`Upgrade to Replit ${t.corePlanName}`,redirectPath:"/home"})]})};e.s(["PlanUsageMonitorUI",0,E,"default",0,()=>{let e,t,i=(0,a.useReplLimit)(),u="loading"===i.type,d=(0,n.useFlag)({controlName:"flag-happy-birthday",default:!1}),{agentUsage:c,agentUsageV2:g,loading:p}=(0,l.useGetAgentFreeUsage)(),{cloudUsage:m,loading:h}=(0,o.useGetCloudFreeUsage)(),f="data"===i.type?i.replCount:0,x=f/("data"===i.type?i.starterPlanReplLimit:s.STARTER_PLAN_REPL_LIMIT);return g?(e=g.usage,t=g.limit):(e=c?.usage,t=c?.limit),(0,r.jsx)(E,{agentUsage:{usage:e,limit:t,loading:p},publicRepls:f,replsLimitLoading:u,showReplsLimit:x>=.25,showAgentUsage:!d,cloudUsage:{usage:m?.usage,limit:m?.limit,loading:h},upgradeButtonColorway:d?"grey":"primary"})}],765269)},371884,e=>{"use strict";var r=e.i(389959),t=e.i(223808),s=e.i(295798);let i={default:200,long:1e3};e.s(["useFormField",0,function(e,a,{debounceDelay:n="default"}={}){let[l,o]=(0,r.useState)(!1),[u,d]=(0,r.useState)(e),[c,g]=(0,r.useState)(null),[p,m]=(0,r.useState)(!1),h=(0,r.useRef)(u),f=(0,s.default)(a),x=(0,s.default)(e=>{if(!e){g(null),m(!0);return}g(e),"warning"===e.severity&&m(!0)}),R=(0,r.useCallback)(function(){let e=h.current,r=f.current(e);return r instanceof Promise?r.then(r=>{h.current===e&&x.current(r)}):x.current(r),r},[f,x]),w=(0,r.useRef)((0,t.default)(()=>R(),i[n])),y=(0,r.useCallback)(function(e,{preventTouch:r=!1,preventValidation:t=!1}={}){e!==h.current&&(h.current=e,m(!1),g(null),d(e),t||w.current(),r||o(!0))},[]),j=(0,r.useCallback)(function(e){w.current(),w.current.flush()},[]);return(0,r.useEffect)(()=>w.current.cancel,[]),{value:u,error:c?.severity&&"error"!==c.severity?null:c,warning:c?.severity==="warning"?c:null,touched:l,setValue:y,handleBlur:j,validate:R,isValid:p,setTouched:o}}])},975486,e=>{"use strict";e.s(["ORG_NAME_MAX_LENGTH",0,50,"ORG_NAME_MIN_LENGTH",0,2,"ORG_PATH_PREFIX",0,"/t/"])},448942,e=>{"use strict";var r=e.i(975486);let t=({slug:e})=>`${r.ORG_PATH_PREFIX}${e}`,s=`${r.ORG_PATH_PREFIX}[orgSlug]`,i=s+"/groups/[groupSlug]/[groupId]";e.s(["newOrgLink",0,{href:"/pricing",as:void 0},"orgGroupLinks",0,({orgSlug:e,groupId:r,groupSlug:s})=>{let a=(({orgSlug:e,groupId:r,groupSlug:s})=>{let i=t({slug:e});return`${i}/groups/${s}/${r}`})({orgSlug:e,groupId:r,groupSlug:s});return{members:{href:a+"/members",routerPath:i+"/members",as:void 0},settings:{href:a+"/settings",routerPath:i+"/settings",as:void 0},permissions:{href:a+"/permissions",routerPath:i+"/permissions",as:void 0}}},"orgLinks",0,({slug:e})=>{let i=t({slug:e});return{home:{href:i,routerPath:`${r.ORG_PATH_PREFIX}[orgSlug]`,as:void 0},repls:{href:i+"/repls",routerPath:s+"/repls",as:void 0},deployments:{href:i+"/deployments",routerPath:s+"/deployments",as:void 0},members:{href:i+"/members",routerPath:s+"/members",as:void 0},connectors:{href:i+"/integrations",routerPath:s+"/integrations",as:void 0},groups:{href:i+"/groups",routerPath:s+"/groups",as:void 0},settings:{href:i+"/settings",routerPath:s+"/settings",as:void 0},usage:{href:i+"/usage",routerPath:s+"/usage",as:void 0},analytics:{href:i+"/analytics",routerPath:s+"/analytics",as:void 0},profile:{href:i+"/profile/settings",routerPath:s+"/profile/settings",as:void 0},security:{href:i+"/security",routerPath:s+"/security",as:void 0}}},"scimOnboardingRedirectLink",0,({orgSlug:e})=>({href:`${r.ORG_PATH_PREFIX}${e}/scim-onboarding-portal`,as:void 0})])},481148,e=>{e.v({self:"LimitedInputLabel-module__zIizLq__self"})},925654,e=>{"use strict";var r=e.i(276385),t=e.i(8047),s=e.i(481148);e.s(["default",0,({maxLength:e=140,value:i="",hideLabel:a=!1})=>(0,r.jsxs)(t.Text,{clsx:s.default.self,multiline:!1,color:"dimmer",children:[i.length," / ",e," ",a?"":"characters"]})])},266883,e=>{"use strict";let r=/^[A-Za-z]:\//;function t(e=""){return e?e.replace(/\\/g,"/").replace(r,e=>e.toUpperCase()):e}let s=/^[/\\]{2}/,i=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,a=/^[A-Za-z]:$/,n=/.(\.[^./]+|\.)$/,l=function(e){if(0===e.length)return".";let r=(e=t(e)).match(s),i=o(e),n="/"===e[e.length-1];return 0===(e=function(e,r){let t="",s=0,i=-1,a=0,n=null;for(let l=0;l<=e.length;++l){if(l<e.length)n=e[l];else if("/"===n)break;else n="/";if("/"===n){if(i===l-1||1===a);else if(2===a){if(t.length<2||2!==s||"."!==t[t.length-1]||"."!==t[t.length-2]){if(t.length>2){let e=t.lastIndexOf("/");-1===e?(t="",s=0):s=(t=t.slice(0,e)).length-1-t.lastIndexOf("/"),i=l,a=0;continue}else if(t.length>0){t="",s=0,i=l,a=0;continue}}r&&(t+=t.length>0?"/..":"..",s=2)}else t.length>0?t+=`/${e.slice(i+1,l)}`:t=e.slice(i+1,l),s=l-i-1;i=l,a=0}else"."===n&&-1!==a?++a:a=-1}return t}(e,!i)).length?i?"/":n?"./":".":(n&&(e+="/"),a.test(e)&&(e+="/"),r)?i?`//${e}`:`//./${e}`:i&&!o(e)?`/${e}`:e},o=function(e){return i.test(e)};e.s(["d",0,function(e){let r=t(e).replace(/\/$/,"").split("/").slice(0,-1);return 1===r.length&&a.test(r[0])&&(r[0]+="/"),r.join("/")||(o(e)?"/":".")},"e",0,function(e){if(".."===e)return"";let r=n.exec(t(e));return r&&r[1]||""},"j",0,function(...e){let r="";for(let t of e)if(t)if(r.length>0){let e="/"===r[r.length-1],s="/"===t[0];e&&s?r+=t.slice(1):r+=e||s?t:`/${t}`}else r+=t;return l(r)}])},66982,e=>{"use strict";var r=e.i(276385),t=e.i(389959),s=e.i(480028);e.s(["ExactMatchSubString",0,({source:e,match:t})=>{if(!e.toLowerCase().includes(t.toLowerCase()))return(0,r.jsx)(r.Fragment,{children:e});let[s,i]=e.split(RegExp(`${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(.+)?`,"i"));return(0,r.jsx)(r.Fragment,{children:[s,(0,r.jsx)("b",{children:e.substr(s.length,t.length)},t),i]})},"HighlightMatches",0,({source:e,matches:i,matchStyle:a={fontWeight:500,color:s.tokens.foregroundDefault},style:n={color:s.tokens.foregroundDimmest,maxWidth:"100%",wordWrap:"break-word"}})=>{let l,o=0,u=[],d=function(e){return(0,r.jsx)("span",{style:a,children:e})};return i.forEach(({column:r,length:t})=>{u.push(e.slice(o,r)),u.push(d(e.slice(r,r+t))),o=r+t}),u.push(e.slice(o)),l=u.map((e,s)=>(0,r.jsx)(t.Fragment,{children:e},s)),(0,r.jsx)("span",{style:n,children:l})}])},402841,e=>{"use strict";e.s(["REPL_DESCRIPTION_MAX_LENGTH",0,1e3])},748538,e=>{"use strict";var r=e.i(351623),t=e.i(299020);let s={},i=r.gql`
    fragment EditReplFormRepl on Repl {
  id
  title
  description
  imageUrl
  iconUrl
  templateInfo {
    iconUrl
    imageUrl
  }
  authorizations {
    editMetadata {
      isAuthorized
      code
      message
    }
  }
}
    `,a=r.gql`
    mutation EditReplFormEdit($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      ...EditReplFormRepl
    }
  }
}
    ${i}`;e.s(["EditReplFormReplFragmentDoc",0,i,"useEditReplFormEditMutation",0,function(e){let r={...s,...e};return t.useMutation(a,r)}])},517414,317349,781258,80593,e=>{"use strict";var r=e.i(351623),t=e.i(299020);let s={},i=r.gql`
    fragment DeleteReplDialogRepl on Repl {
  id
  title
}
    `,a=r.gql`
    mutation DeleteReplDialogReplDelete($id: String!) {
  deleteRepl(id: $id) {
    id
  }
}
    `;e.s(["DeleteReplDialogReplFragmentDoc",0,i,"useDeleteReplDialogReplDeleteMutation",0,function(e){let r={...s,...e};return t.useMutation(a,r)}],317349);var n=e.i(748538),l=e.i(344480);e.i(975473);let o={},u=r.gql`
    fragment TransferReplToOrgDialogRepl on Repl {
  id
  title
  slug
  owner {
    ... on User {
      id
      username
    }
    ... on Team {
      id
      username
    }
  }
}
    `,d=r.gql`
    query TransferReplToOrgDialogOrgs {
  currentUser {
    id
    orgs(count: 30) {
      __typename
      ... on CurrentUserOrganizationConnection {
        items {
          org {
            id
            name
            slug
            image
            type
          }
          type
        }
      }
      ... on Error {
        message
      }
    }
  }
}
    `,c=r.gql`
    mutation TransferReplToOrgDialogTransfer($orgId: String!, $replIds: [String!]!) {
  transferReplToOrganization(input: {orgId: $orgId, replIds: $replIds}) {
    ... on TransferReplToOrganizationSuccess {
      runId
      results {
        replId
        success
        error
      }
      successCount
      errorCount
    }
    ... on UnauthorizedError {
      message
    }
    ... on UserError {
      message
    }
    ... on TooManyRequestsError {
      message
    }
  }
}
    `;e.s(["TransferReplToOrgDialogReplFragmentDoc",0,u,"useTransferReplToOrgDialogOrgsQuery",0,function(e){let r={...o,...e};return l.useQuery(d,r)},"useTransferReplToOrgDialogTransferMutation",0,function(e){let r={...o,...e};return t.useMutation(c,r)}],781258);let g={},p=r.gql`
    fragment LeaveMultiplayerReplDialogRepl on Repl {
  id
  title
}
    `,m=r.gql`
    mutation LeaveMultiplayerReplDialogRemove($id: String!) {
  removeSharedRepl(replId: $id) {
    id
  }
}
    `;e.s(["LeaveMultiplayerReplDialogReplFragmentDoc",0,p,"useLeaveMultiplayerReplDialogRemoveMutation",0,function(e){let r={...g,...e};return t.useMutation(m,r)}],80593);let h={},f=r.gql`
    fragment ComponentsReplActions on Repl {
  id
  url
  title
  slug
  user {
    id
    username
  }
  ...DeleteReplDialogRepl
  ...EditReplFormRepl
  ...TransferReplToOrgDialogRepl
  ...LeaveMultiplayerReplDialogRepl
  owner {
    __typename
    ... on Team {
      id
    }
    ... on User {
      id
    }
  }
  org {
    id
  }
  isStarred
  isCurrentUserStarred
  isStackTemplate
  authorizations {
    deleteRepl {
      isAuthorized
    }
    editFolder {
      isAuthorized
    }
    fork {
      isAuthorized
    }
    removeSelf {
      isAuthorized
    }
    star {
      isAuthorized
    }
  }
}
    ${i}
${n.EditReplFormReplFragmentDoc}
${u}
${p}`,x=r.gql`
    mutation ReplActionsUpdateRepl($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      isStarred
    }
  }
}
    `,R=r.gql`
    mutation ReplActionsToggleReplPin($input: ToggleReplPinInput!) {
  toggleReplPin(input: $input) {
    ... on Repl {
      id
      isCurrentUserStarred
    }
    ... on Error {
      message
    }
  }
}
    `,w=r.gql`
    mutation AddOrgStackTemplate($orgId: String!, $replId: String!, $order: Float) {
  addOrgStackTemplate(orgId: $orgId, replId: $replId, order: $order) {
    success
    message
    repl {
      id
      isStackTemplate
    }
  }
}
    `,y=r.gql`
    mutation RemoveOrgStackTemplate($orgId: String!, $replId: String!) {
  removeOrgStackTemplate(orgId: $orgId, replId: $replId) {
    success
    message
    repl {
      id
      isStackTemplate
    }
  }
}
    `,j=r.gql`
    mutation ReplActionsMoveToFolder($replIds: [String!]!, $folderIds: [String!]!, $destFolderId: String!) {
  moveItemsToFolder(
    replIds: $replIds
    folderIds: $folderIds
    destFolderId: $destFolderId
  ) {
    ... on Repl {
      __typename
      id
      folderId
    }
  }
}
    `;e.s(["ComponentsReplActionsFragmentDoc",0,f,"useAddOrgStackTemplateMutation",0,function(e){let r={...h,...e};return t.useMutation(w,r)},"useRemoveOrgStackTemplateMutation",0,function(e){let r={...h,...e};return t.useMutation(y,r)},"useReplActionsMoveToFolderMutation",0,function(e){let r={...h,...e};return t.useMutation(j,r)},"useReplActionsToggleReplPinMutation",0,function(e){let r={...h,...e};return t.useMutation(R,r)},"useReplActionsUpdateReplMutation",0,function(e){let r={...h,...e};return t.useMutation(x,r)}],517414)},185074,371989,e=>{"use strict";var r=e.i(276385);e.i(214847);var t=e.i(20397),s=e.i(864300);let i="https://replit.com/birthday",a="/public/images/free-agent-day/hero.png";e.s(["HERO_IMAGE_URL",0,a,"LEARN_MORE_URL",0,i,"TOUR_PATH_ALLOW_LIST",0,["/home","/t/[orgSlug]"]],371989);var n=e.i(643484),l=e.i(528326),o=e.i(8047),u=e.i(61732),d=e.i(727223);e.s(["HappyTenthBirthdayModal",0,function({isOpen:e,onRequestClose:c,onAction:g}){let p=(0,s.useIntl)();return(0,r.jsx)(l.Modal,{isOpen:e,onRequestClose:c,maxWidth:500,centered:!0,noPadding:!0,preventOutsideModalClickClose:!0,children:(0,r.jsxs)(u.View,{br:16,style:{overflow:"hidden"},children:[(0,r.jsx)(d.default,{src:a,alt:p.formatMessage({id:"home.birthdayTourTitle",defaultMessage:"Replit Agent is free today!"}),width:500,height:240,style:{display:"block",width:"100%",height:"auto",objectFit:"cover"},priority:!0}),(0,r.jsxs)(u.View,{px:24,pt:20,gap:8,children:[(0,r.jsx)(o.Text,{variant:"subheadDefault",color:"dimmest",children:(0,r.jsx)(t.FormattedMessage,{id:"home.birthdayTourEyebrow",defaultMessage:"Replit's 10th birthday"})}),(0,r.jsx)(o.Text,{variant:"headerDefault",children:(0,r.jsx)(t.FormattedMessage,{id:"home.birthdayTourTitle",defaultMessage:"Replit Agent is free today!"})}),(0,r.jsx)(o.Text,{color:"dimmest",children:(0,r.jsx)(t.FormattedMessage,{id:"home.birthdayTourBody",defaultMessage:"To celebrate 10 years of building together, agent usage is completely free for everyone today. Terms apply. <link>Learn more.</link>",values:{link:e=>(0,r.jsx)("a",{href:i,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"underline",color:"inherit"},children:e})}})})]}),(0,r.jsx)(u.View,{row:!0,justify:"end",px:24,pt:24,pb:24,children:(0,r.jsx)(n.Button,{text:p.formatMessage({id:"home.birthdayTourCta",defaultMessage:"Start building"}),colorway:"primary",onClick:g,dataCy:"happy-10th-birthday-modal-cta"})})]})})}],185074)},145275,e=>{e.v({paginationRow:"IndexPagination-module__t95pHW__paginationRow",surface:"IndexPagination-module__t95pHW__surface"})},222826,e=>{"use strict";var r=e.i(276385),t=e.i(389959),s=e.i(656077),i=e.i(927600),a=e.i(269848),n=e.i(919073),l=e.i(488299),o=e.i(334353),u=e.i(8047),d=e.i(61732),c=e.i(145275);e.s(["default",0,({currentPage:e,pageSize:g,totalItems:p,goToNextPage:m,goToPreviousPage:h})=>{let{loading:f}=(0,t.useContext)(o.IndexContext),x=Math.max(Math.ceil(p/g),1),R=(0,t.useRef)(null),w=(0,t.useRef)(40);return(0,t.useLayoutEffect)(()=>{R.current&&(w.current=R.current.offsetHeight+1)},[R]),(0,r.jsx)(n.ShadesSurface,{clsx:c.default.surface,style:{minHeight:w.current},innerRef:R,elevate:!1,children:(0,r.jsx)(d.View,{clsx:c.default.paginationRow,row:!0,gap:8,p:8,align:"center",justify:"center",children:f?(0,r.jsx)(a.default,{}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.IconButton,{alt:"Previous page",disabled:0===e,onClick:h,children:(0,r.jsx)(s.default,{})}),(0,r.jsxs)(u.Text,{variant:"small",color:"dimmer",children:["Page ",e+1," of ",x]}),(0,r.jsx)(l.IconButton,{alt:"Next page",disabled:e>=x-1,onClick:m,children:(0,r.jsx)(i.default,{})})]})})})}])},33602,e=>{"use strict";var r,t=e.i(908796),s=e.i(462229),i=e.i(691636),a=e.i(127384);let n=(0,s.cssRecord)({pageHeader:[i.rcss.flex.row,i.rcss.justify.spaceBetween,i.rcss.align.center],pageHeaderOrgName:[i.rcss.maxWidth(240)],pageHeaderActions:[i.rcss.rowWithGap(8),i.rcss.align.center],pageTitle:[i.rcss.rowWithGap(8),i.rcss.align.center,i.rcss.flex.growAndShrink(1)],pageTitleText:[i.rcss.maxWidth("100%"),i.rcss.flex.growAndShrink(1)],pageContent:[i.rcss.colWithGap(32)],pageSection:[i.rcss.colWithGap(12)],pageSidebarOffset:[{paddingLeft:a.SIDEBAR_WIDTH}],sidebarSectionHeaderText:[i.rcss.p(8),i.rcss.px(16),{fontWeight:500}],indexTableWrapper:[i.rcss.display.flex,i.rcss.position.relative,i.rcss.justify.spaceBetween,i.rcss.overflow("auto"),i.rcss.width("100%")],onboardingSurface:[i.rcss.p(12),i.rcss.borderRadius(),i.rcss.border()],tooltipWrapper:[i.rcss.rowWithGap(8),i.rcss.align.center],searchBar:[i.rcss.maxWidth(400)]});t.SystemOrgGroupType.SystemAdmins,t.SystemOrgGroupType.SystemMembers,t.SystemOrgGroupType.SystemGuests;var l=((r={}).Index="Index",r.OrgGroup="OrgGroup",r);e.s(["NUM_ORGS_PER_PAGE",0,20,"SidebarType",()=>l,"orgStyles",0,n,"sortSystemGroups",0,e=>[t.Org_GroupstypeEnumType.SystemAdmins,t.Org_GroupstypeEnumType.SystemMembers,t.Org_GroupstypeEnumType.SystemGuests].reduce((r,t)=>{let s=e.find(e=>e.type===t);return s&&r.push(s),r},[])])},906595,e=>{e.v({root:"ReplResult-module__xjVmeG__root"})},407617,e=>{"use strict";var r=e.i(276385),t=e.i(421376),s=e.i(389959),i=e.i(2001),a=e.i(595996),n=e.i(480028),l=e.i(61732),o=e.i(618457),u=e.i(921125),d=e.i(906595);let c=(0,n.cvarsFrom)("ReplResult.module.css",["--height"]);function g({repl:e,height:n,isActive:p,searchQuery:m}){let{title:h}=e,f=(0,s.useMemo)(()=>m?i.default.match(m,h):null,[m,h]);return(0,r.jsx)(t.default,{...(0,u.replLinkProps)(e),children:(0,r.jsxs)(l.View,{clsx:d.default.root,row:!0,gap:6,px:6,style:{[c.height]:n+"px"},align:"center",children:[(0,r.jsx)(a.default,{alt:e.title,size:32,iconUrl:e.iconUrl}),(0,r.jsx)(l.View,{grow:!0,shrink:!0,gap:2,translate:"no",children:(0,r.jsx)(o.HighlightMatches,{text:e.title,highlight:f?.ranges,dimmed:!p})})]})})}e.s(["ReplResult",0,g,"toReplResult",0,function(e,t,s){var i,n;return{match:(i=e,n=t,()=>({score:1,render:{height:44,content:(0,r.jsx)(g,{repl:n,height:44,searchQuery:i})}})),data:{type:"action",label:t.title,icon:(0,r.jsx)(a.default,{alt:t.title,size:16,iconUrl:t.iconUrl}),run:()=>s(t)}}}])}]);

//# debugId=9786e452-d606-3516-587d-c6290c0ceb94
//# sourceMappingURL=0o-xgofy1.50b.js.map