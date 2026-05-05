;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="82960cfb-cb34-8ea2-cc7a-313e0d667733")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,798926,e=>{e.v({prose:"Prose-module__aikpka__prose"})},827320,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(8047),r=e.i(798926);e.s(["Prose",0,({children:e,...o})=>(0,t.jsx)(n.Text,{multiline:!0,clsx:r.default.prose,...o,children:i.Children.map(e,e=>"string"==typeof e?(0,t.jsx)("span",{children:e}):e)})])},272290,e=>{"use strict";var t=e.i(351623);let i=t.gql`
    fragment DeploymentLink on HostingDeployment {
  id
  replitAppSubdomain
  domains2 {
    id
    domain
    state
  }
  currentBuild {
    id
    provider
  }
}
    `;var n=e.i(319801);let r=t.gql`
    fragment BuildDebugSummary on HostingDebugSummary {
  id
  sessionId
  eventId
  type
}
    `,o=t.gql`
    fragment ReplDomain2 on Domain {
  id
  hosting_deployment_id
  domain
  state
}
    `,s=t.gql`
    fragment CustomDomain on Domain {
  ...ReplDomain2
}
    ${o}`,a=t.gql`
    fragment TargetHostingDeployment on HostingDeployment {
  id
  replitAppSubdomain
  timeCreated
  securityScanEnabled
  uptimeCheckEnabled
  agentInboxEnabled
  agentInboxConfig {
    position
    logoSrc
    bgColor
  }
  replitBadgeEnabled
  scheduledDeletionTime
  latestBuildStatus
  geography
}
    `,l=t.gql`
    fragment MachineConfiguration on HostingMachineConfiguration {
  id
  label
  vcpu
  memory
  slug
}
    `,u=t.gql`
    fragment HostingBuildArtifactFields on HostingBuildArtifact {
  id
  name
  type
  folderName
  services {
    id
    name
    paths
    hasRunCommand
  }
}
    `,m=t.gql`
    fragment CurrentBuild2 on HostingBuild {
  id
  description
  status
  hasDeployLogs
  suspendedReason
  timeCreated
  hasImageTag
  envVars {
    name
    value
  }
  debugSummary {
    ...BuildDebugSummary
  }
  repl {
    id
    slug
    apexProxy
    domains {
      ... on Domain {
        ...CustomDomain
      }
    }
    org {
      id
    }
    owner {
      ... on Team {
        id
        username
      }
      ... on User {
        id
        username
      }
    }
    hostingDeployment {
      ... on HostingDeployment {
        ...TargetHostingDeployment
        ...DeploymentLink
      }
    }
  }
  provider
  machineConfiguration {
    ...MachineConfiguration
  }
  maxMachineInstances
  machineJob {
    timezone
    crontab
  }
  user {
    id
    displayName
    username
    image
    fullName
  }
  isPrivate
  hasPrivatePassword
  rollbackSourceBuildId
  isStandby
  artifacts {
    ...HostingBuildArtifactFields
  }
}
    ${r}
${s}
${a}
${i}
${l}
${u}`,d=t.gql`
    fragment DeploymentStatus on HostingDeployment {
  id
  currentBuild {
    id
    status
    suspendedReason
    timeCreated
    user {
      id
      displayName
    }
    provider
  }
  inProgressBuild {
    id
  }
  latestBuildStatus
}
    `,c=t.gql`
    fragment DeploymentItem on HostingDeployment {
  id
  replitAppSubdomain
  domains2 {
    id
    domain
    state
  }
  repl {
    id
    title
    iconUrl
    config {
      isAgentStack
    }
    ...ReplLinkRepl
  }
  ...DeploymentLink
  ...DeploymentStatus
}
    ${n.ReplLinkReplFragmentDoc}
${i}
${d}`;e.s(["BuildDebugSummaryFragmentDoc",0,r,"CurrentBuild2FragmentDoc",0,m,"DeploymentItemFragmentDoc",0,c,"HostingBuildArtifactFieldsFragmentDoc",0,u,"MachineConfigurationFragmentDoc",0,l,"TargetHostingDeploymentFragmentDoc",0,a],272290)},845822,e=>{"use strict";e.s(["AGENT_USAGE_UNIT",0,"checkpoint","ASSISTANT_USAGE_UNIT",0,"edit request","AUTOSCALE_ESTIMATED_DAILY_COMPUTE_MINUTES",0,10,"CHEAPER_CORE_FLEXIBLE_SPEND_USD",0,20,"CORE_FLEXIBLE_SPEND_USD",0,25,"NUM_REPLS_IN_PAGE",0,10,"PRO_FLEXIBLE_SPEND_USD",0,100,"TEAMS_CREDITS_PER_YEARLY_SEAT_USD",0,480,"TEAMS_FLEXIBLE_SPEND_PER_MONTHLY_SEAT_USD",0,40,"defaultAutoscaleDeploymentCostDetails",0,{computeUnitsPerCpu:18,computeUnitsPerRam:2,costPerComputeUnitUsd:32e-7,fixedCostPerMonth:"1"},"defaultAzureContainerAppDeploymentCostDetails",0,{"aca-1-2":{costPerHour:.2,costPerMonth:"144"},"aca-2-4":{costPerHour:.3,costPerMonth:"216"},"aca-4-8":{costPerHour:.5,costPerMonth:"360"}},"defaultAzureVmDeploymentCostDetails",0,{Standard_E2_v5:{costPerHour:.2,costPerMonth:"144"},Standard_E4_v5:{costPerHour:.4,costPerMonth:"288"},Standard_E8_v5:{costPerHour:.7,costPerMonth:"504"}},"defaultRvmDeploymentCostDetails",0,{"e2-micro":{costPerHour:.014,costPerMonth:"10"},"e2-small":{costPerHour:.028,costPerMonth:"20"},"e2-medium":{costPerHour:.042,costPerMonth:"30"},"n1-custom-1-4096":{costPerHour:.055,costPerMonth:"40"},"e2-standard-2":{costPerHour:.11,costPerMonth:"80"},"e2-standard-4":{costPerHour:.22,costPerMonth:"160"},"c3d-standard-8":{costPerHour:.44,costPerMonth:"320"},"c3d-standard-16":{costPerHour:.88,costPerMonth:"640"}},"defaultScheduledDeploymentCostDetails",0,{costPerComputeUnitUsd:32e-7,fixedCostPerMonth:"1",fixedConfigurationCostPerSec:"0.000070"},"defaultStaticDeploymentCostDetails",0,{outboundDataCostPerGib:"0.10"},"displayCost",0,(e,t=2)=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:15,minimumFractionDigits:t})])},450717,e=>{"use strict";e.i(329467),e.i(242917),e.i(839713),e.s([])},319801,e=>{"use strict";var t=e.i(351623);let i=t.gql`
    fragment ReplLinkRepl on Repl {
  id
  url
  nextPagePathname
}
    `;e.s(["ReplLinkReplFragmentDoc",0,i])},410458,e=>{"use strict";var t=e.i(908796),i=e.i(351623),n=e.i(344480);e.i(975473);let r={},o=i.gql`
    query CustomerSettings($orgId: String!) {
  currentUser {
    id
    org(orgId: $orgId) {
      ... on Org {
        id
        customer {
          ... on Customer {
            id
            subscriptionSummary {
              __typename
            }
            settings {
              requirePrivateDeployments
              requirePrivateDevUrls
              disablePasswordProtectedDeployments
              adminOnlyPasswordProtectedDeploymentsBypass
              banPublicApps
              banSourceCodeExport
              banAttachmentUploads
              adminOnlyPublicDeployments
              higherPowerModelDisabled
              modelfarmDisabled
              openrouterDisabled
              openaiDisabled
              anthropicDisabled
              geminiDisabled
              scimViewerUpgradeLink
              requireGitRemoteBeforeDeployment
              adminOnlyGitRemoteBeforeDeploymentBypass
              requirePrivateRemote
              adminOnlyPrivateRemoteBypass
              allowedGitProvider
              allowedGitRemoteTarget
              requireSecurityScanOnDeployment
              adminOnlySecurityScanOnDeploymentBypass
              disableImport
              disableIntegrations
              disableFrameworks
            }
          }
        }
      }
    }
  }
}
    `;var s=e.i(151027);e.s(["default",0,function(e){var i;let a,{orgRole:l}=(0,s.useCurrentUserStoredOrgContext)(),{data:u,loading:m,error:d}=(i={skip:!e,variables:{orgId:e}},a={...r,...i},n.useQuery(o,a));if(m||d)return{loading:m,error:d,requirePrivateDeployments:void 0,requirePrivateDevUrls:void 0,adminOnlyPublicDeployments:void 0,disablePasswordProtectedDeployments:void 0,adminOnlyPasswordProtectedDeploymentsBypass:void 0,banAttachmentUploads:void 0,requireGitRemoteBeforeDeployment:void 0,adminOnlyGitRemoteBeforeDeploymentBypass:void 0,requirePrivateRemote:void 0,adminOnlyPrivateRemoteBypass:void 0,allowedGitProvider:void 0,allowedGitRemoteTarget:void 0,requireSecurityScanOnDeployment:void 0,adminOnlySecurityScanOnDeploymentBypass:void 0,disableImport:void 0,disableIntegrations:void 0,disableFrameworks:void 0,higherPowerModelDisabled:void 0,modelfarmDisabled:void 0,openrouterDisabled:void 0,openaiDisabled:void 0,anthropicDisabled:void 0,geminiDisabled:void 0,scimViewerUpgradeLink:""};let c=u?.currentUser?.org,p=c?.__typename==="Org"?c.customer:void 0,g=p?.__typename==="Customer"?p.settings:void 0,y=p?.__typename==="Customer"&&p.subscriptionSummary?.__typename==="CustomerSubscriptionSummarySalesContract",f=g?.requirePrivateDeployments??!1,h=g?.requirePrivateDevUrls??!1,b=g?.disablePasswordProtectedDeployments??!1,v=g?.adminOnlyPasswordProtectedDeploymentsBypass??!1,S=g?.banPublicApps??!1,D=g?.banSourceCodeExport??!1,P=g?.banAttachmentUploads??!1,x=g?.adminOnlyPublicDeployments??!1,E=g?.higherPowerModelDisabled??!1,C=g?.modelfarmDisabled??null,T=!1;T=null!=C?C:!!y;let R=g?.openrouterDisabled??!1,w=g?.openaiDisabled??!1,_=g?.anthropicDisabled??!1,A=g?.geminiDisabled??!1,k=g?.scimViewerUpgradeLink??null,B=g?.requireGitRemoteBeforeDeployment??!1,M=g?.adminOnlyGitRemoteBeforeDeploymentBypass??!1,N=g?.requirePrivateRemote??!1,j=g?.adminOnlyPrivateRemoteBypass??!1,I=g?.allowedGitProvider??null,L=g?.allowedGitRemoteTarget??null,U=g?.requireSecurityScanOnDeployment??!1,F=g?.adminOnlySecurityScanOnDeploymentBypass??!1,O=g?.disableImport??!1,q=g?.disableIntegrations??!1,H=g?.disableFrameworks??!1;return{loading:m,error:d,requirePrivateDeployments:f,requirePrivateDevUrls:h,disablePasswordProtectedDeployments:b,adminOnlyPasswordProtectedDeploymentsBypass:v,banPublicApps:S,banSourceCodeExport:D,banAttachmentUploads:P,adminOnlyPublicDeployments:x,higherPowerModelDisabled:E,modelfarmDisabled:T,openrouterDisabled:R,openaiDisabled:w,anthropicDisabled:_,geminiDisabled:A,isAdmin:l&&l===t.SystemOrgGroupType.SystemAdmins,scimViewerUpgradeLink:k,requireGitRemoteBeforeDeployment:B,adminOnlyGitRemoteBeforeDeploymentBypass:M,requirePrivateRemote:N,adminOnlyPrivateRemoteBypass:j,allowedGitProvider:I,allowedGitRemoteTarget:L,requireSecurityScanOnDeployment:U,adminOnlySecurityScanOnDeploymentBypass:F,disableImport:O,disableIntegrations:q,disableFrameworks:H}}],410458)},871752,e=>{"use strict";var t=e.i(324753),i=e.i(272391);function n(e,i){return(0,t.default)(e,{credentials:"same-origin",headers:{"Content-Type":"application/json",Accept:"application/json","X-Requested-With":"XMLHttpRequest"},method:"post",body:JSON.stringify(i)})}e.s(["postJson",0,function(e,t={}){var r,o;let s;return r=n(e,t),o=e,s=new i.default("Unknown http error"),Promise.resolve(r).then(async e=>{let t;if(e.ok)return e.json();let i=e.headers.get("content-type");if(i&&i.includes("application/json"))t=await e.json();else{let i=await e.text();try{t=JSON.parse(i)}catch(e){t={message:i}}}throw t.message&&(s.message=t.message),s.setExtras({url:o,responseBody:t,responseData:{status:e.status,statusText:e.statusText,redirected:e.redirected,type:e.type,url:e.url}}).setTag("httpError","true"),s})},"wrapPost",0,n])},559357,e=>{"use strict";var t=e.i(276385),i=e.i(68701),n=e.i(295621),r=e.i(480028),o=e.i(462229),s=e.i(337867),a=e.i(919073),l=e.i(691636),u=e.i(61732);let{cssVars:m,styleTokens:d}=(0,s.createCssVarTokens)(["fontSize","gap","xPadding"]),c=(0,o.cssRecord)({chord:[l.rcss.display.inlineFlex,l.rcss.rowWithGap(12)],shortcut:[l.rcss.display.inlineFlex,{flexDirection:"row",fontSize:d.fontSize,"& > div":{marginRight:d.gap},"& > div:last-child":{marginRight:0}}]}),p=(0,o.cssRecord)({root:[l.rcss.position.relative,l.rcss.justify.center,{fontSize:"inherit",color:"inherit",textAlign:"center",textTransform:"capitalize",paddingLeft:d.xPadding,paddingRight:d.xPadding},l.rcss.font.default],border:[l.rcss.coverContainer,l.rcss.borderRadius(4),{opacity:.5,border:"1px solid",borderColor:r.tokens.outlineStrongest}],text:[{fontSize:d.fontSize}]}),g=e=>({Ctrl:e?"⌃":"Ctrl",Cmd:e?"⌘":"Cmd",Alt:e?"⌥":"Alt",Shift:e?"⇧":"Shift",Enter:"↵",ArrowLeft:"←",ArrowRight:"→",ArrowUp:"↑",ArrowDown:"↓"," ":"Space"});function y({text:e,small:n=!1,isActive:o=!1,hideBorder:s=!1,...l}){let d=(0,i.useIsMac)(),c=l.fontSize??(n?12:14),f=Math.round(1.4*c),h=Math.round(c*(s?.1:.2)),b={[m.fontSize]:c+"px",[m.xPadding]:h+"px",height:f,minWidth:s?void 0:f};o&&(b.fontWeight=r.tokens.fontWeightMedium);let v={borderColor:r.tokens.foregroundDefault,opacity:1};return(0,t.jsxs)(a.ShadesSurface,{elevate:!!o&&"1x",css:p.root,style:b,children:["string"==typeof e?(0,t.jsx)(u.View,{css:p.text,children:g(d)[e]??e}):e,s?null:(0,t.jsx)(u.View,{css:p.border,style:o?v:void 0})]})}e.s(["KeyBlock",0,y,"KeyComboBlocks",0,function e(i){if((0,n.isKeyChord)(i.keyCombo))return(0,t.jsx)(u.View,{"data-testid":`Keybinding:${i.keyCombo.join(" ")}`,css:c.chord,className:i.className,children:i.keyCombo.map((n,r)=>(0,t.jsx)(e,{...i,keyCombo:n},r))});let r=(0,n.keyCombinationOrPrefixToKeys)(i.keyCombo),o=i.fontSize??(i.small?12:14),s=i.hideBorder?0:Math.round(.2*o);return(0,t.jsx)(u.View,{"data-testid":`Keybinding:${i.keyCombo}`,css:c.shortcut,className:i.className,style:{[m.gap]:s+"px"},title:i.keyCombo,children:r.map(e=>(0,t.jsx)(y,{text:e,hideBorder:i.hideBorder,fontSize:o,isActive:i?.match?.includes(e.toLowerCase())},e))})},"keyComboText",0,function(e,t){return((0,n.isKeyChord)(e)?e:[e]).map(e=>(0,n.keyCombinationOrPrefixToKeys)(e).map(e=>g(t)[e]??e.toUpperCase()).join("")).join(" ")}])},119474,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(295621),r=e.i(23818);function o(){let e=(0,r.useResolveKeyCombo)(),t=(0,i.useRef)(null);return(0,i.useEffect)(function(){let i=i=>{let o=(0,n.getKeyCombination)(i);if(!o)return;let s=o;t.current&&(s=(0,n.keyChord)(t.current,o));let a=e(s);switch(a.kind){case r.ResolutionResultKindEnum.NoMatch:t.current=null;break;case r.ResolutionResultKindEnum.WaitingForChord:t.current=a.key,i.preventDefault();break;case r.ResolutionResultKindEnum.MatchFound:for(let{run:e,bubble:n=!0}of(t.current=null,a.matches))if(!1!==e()&&(i.preventDefault(),!n))break}};return document.addEventListener("keydown",i),()=>{document.removeEventListener("keydown",i)}},[e]),null}e.i(559357),e.s(["KeybindingsProvider",0,function(e){let i=(0,r.useInitStore)(e);return(0,t.jsxs)(r.KeybindingsContext.Provider,{value:i,children:[e.children,(0,t.jsx)(o,{})]})}])},74768,e=>{"use strict";var t=e.i(351623),i=e.i(344480);e.i(975473);var n=e.i(299020);let r={},o=t.gql`
    fragment ReplAgentSettingsReplConfig on ReplConfig {
  isInPlanningPhase
  initialStackBlueprint
  agentSettings {
    thinkingEnabled
    modelProfile
    enableAutomatedTesting
    enableAutoCheckpointing
    autoApprovePlan
    webSearchEnabled
    imageGenerationEnabled
    chatMode
    autonomyLevel
    maxAutonomyEnabled
  }
}
    `,s=t.gql`
    query ReplAgentSetting($replId: String!) {
  currentUser {
    id
  }
  getRepl(id: $replId) {
    ... on Repl {
      id
      timeCreated
      config {
        ...ReplAgentSettingsReplConfig
      }
    }
  }
}
    ${o}`,a=t.gql`
    mutation UpdateReplAgentSettings($input: UpdateReplInput!) {
  updateRepl(input: $input) {
    repl {
      id
      config {
        ...ReplAgentSettingsReplConfig
      }
    }
  }
}
    ${o}`;e.s(["ReplAgentSettingDocument",0,s,"ReplAgentSettingsReplConfigFragmentDoc",0,o,"useReplAgentSettingQuery",0,function(e){let t={...r,...e};return i.useQuery(s,t)},"useUpdateReplAgentSettingsMutation",0,function(e){let t={...r,...e};return n.useMutation(a,t)}])},614161,e=>{"use strict";var t=e.i(389959);e.s(["useGlobalListeners",0,function(){let e=(0,t.useRef)(new Map),i=(0,t.useCallback)((t,i,n,r)=>{let o=(null==r?void 0:r.once)?(...t)=>{e.current.delete(n),n(...t)}:n;e.current.set(n,{type:i,eventTarget:t,fn:o,options:r}),t.addEventListener(i,o,r)},[]),n=(0,t.useCallback)((t,i,n,r)=>{var o;let s=(null==(o=e.current.get(n))?void 0:o.fn)||n;t.removeEventListener(i,s,r),e.current.delete(n)},[]),r=(0,t.useCallback)(()=>{e.current.forEach((e,t)=>{n(e.eventTarget,e.type,t,e.options)})},[n]);return(0,t.useEffect)(()=>r,[r]),{addGlobalListener:i,removeGlobalListener:n,removeAllGlobalListeners:r}}])},142406,e=>{"use strict";var t=e.i(276385),i=e.i(269848),n=e.i(643484),r=e.i(8047),o=e.i(61732);e.s(["default",0,function({prompt:e,desc:s,confirmText:a,loading:l=!1,onCancel:u,onConfirm:m,danger:d,icon:c}){return(0,t.jsxs)(o.View,{gap:24,children:[(0,t.jsx)(r.Header,{level:3,variant:"headerDefault",children:e}),(0,t.jsx)(r.Text,{children:s}),(0,t.jsxs)(o.View,{row:!0,gap:12,justify:"end",children:[u?(0,t.jsx)(n.Button,{disabled:l,onClick:u,text:"Cancel"}):null,(0,t.jsx)(n.Button,{colorway:d?"negative":"primary",disabled:l,onClick:m,text:a||"Ok",iconLeft:l?(0,t.jsx)(i.default,{}):c})]})]})}])},394384,e=>{"use strict";var t=e.i(918232);let i=RegExp("^.*\\(.*\\).*$"),n=["latn","arab","hanidec","deva","beng"];class r{parse(e){return s(this.locale,this.options,e).parse(e)}isValidPartialNumber(e,t,i){return s(this.locale,this.options,e).isValidPartialNumber(e,t,i)}getNumberingSystem(e){return s(this.locale,this.options,e).options.numberingSystem}constructor(e,t={}){this.locale=e,this.options=t}}let o=new Map;function s(e,t,i){let r=a(e,t);if(!e.includes("-nu-")&&!r.isValidPartialNumber(i)){for(let o of n)if(o!==r.options.numberingSystem){let n=a(e+(e.includes("-u-")?"-nu-":"-u-nu-")+o,t);if(n.isValidPartialNumber(i))return n}}return r}function a(e,t){let i=e+(t?Object.entries(t).sort((e,t)=>e[0]<t[0]?-1:1).join():""),n=o.get(i);return n||(n=new l(e,t),o.set(i,n)),n}class l{parse(e){let n=this.sanitize(e);if(this.symbols.group&&(n=d(n,this.symbols.group,"")),this.symbols.decimal&&(n=n.replace(this.symbols.decimal,".")),this.symbols.minusSign&&(n=n.replace(this.symbols.minusSign,"-")),n=n.replace(this.symbols.numeral,this.symbols.index),"percent"===this.options.style){let e=n.indexOf("-"),t=(n=n.replace("-","")).indexOf(".");-1===t&&(t=n.length),n=n.replace(".",""),n=t-2==0?`0.${n}`:t-2==-1?`0.0${n}`:t-2==-2?"0.00":`${n.slice(0,t-2)}.${n.slice(t-2)}`,e>-1&&(n=`-${n}`)}let o=n?+n:NaN;if(isNaN(o))return NaN;if("percent"===this.options.style){var s,a;let e={...this.options,style:"decimal",minimumFractionDigits:Math.min((null!=(s=this.options.minimumFractionDigits)?s:0)+2,20),maximumFractionDigits:Math.min((null!=(a=this.options.maximumFractionDigits)?a:0)+2,20)};return new r(this.locale,e).parse(new(0,t.NumberFormatter)(this.locale,e).format(o))}return"accounting"===this.options.currencySign&&i.test(e)&&(o*=-1),o}sanitize(e){return e=e.replace(this.symbols.literals,""),this.symbols.minusSign&&(e=e.replace("-",this.symbols.minusSign)),"arab"===this.options.numberingSystem&&(this.symbols.decimal&&(e=(e=e.replace(",",this.symbols.decimal)).replace(String.fromCharCode(1548),this.symbols.decimal)),this.symbols.group&&(e=d(e,".",this.symbols.group))),"fr-FR"===this.options.locale&&(e=d(e,".",String.fromCharCode(8239))),e}isValidPartialNumber(e,t=-1/0,i=1/0){return e=this.sanitize(e),this.symbols.minusSign&&e.startsWith(this.symbols.minusSign)&&t<0?e=e.slice(this.symbols.minusSign.length):this.symbols.plusSign&&e.startsWith(this.symbols.plusSign)&&i>0&&(e=e.slice(this.symbols.plusSign.length)),!(this.symbols.group&&e.startsWith(this.symbols.group)||this.symbols.decimal&&e.indexOf(this.symbols.decimal)>-1&&0===this.options.maximumFractionDigits)&&(this.symbols.group&&(e=d(e,this.symbols.group,"")),e=e.replace(this.symbols.numeral,""),this.symbols.decimal&&(e=e.replace(this.symbols.decimal,"")),0===e.length)}constructor(e,t={}){var i,n;this.locale=e,this.formatter=new Intl.NumberFormat(e,t),this.options=this.formatter.resolvedOptions(),this.symbols=function(e,t,i,n){var r,o,s,a,l;let d=new Intl.NumberFormat(e,{...i,minimumSignificantDigits:1,maximumSignificantDigits:21,roundingIncrement:1,roundingPriority:"auto",roundingMode:"halfExpand"}),p=d.formatToParts(-10000.111),g=d.formatToParts(10000.111),y=m.map(e=>d.formatToParts(e)),f=null!=(l=null==(r=p.find(e=>"minusSign"===e.type))?void 0:r.value)?l:"-",h=null==(o=g.find(e=>"plusSign"===e.type))?void 0:o.value;h||(null==n?void 0:n.signDisplay)!=="exceptZero"&&(null==n?void 0:n.signDisplay)!=="always"||(h="+");let b=null==(s=new Intl.NumberFormat(e,{...i,minimumFractionDigits:2,maximumFractionDigits:2}).formatToParts(.001).find(e=>"decimal"===e.type))?void 0:s.value,v=null==(a=p.find(e=>"group"===e.type))?void 0:a.value,S=[...new Set([...p.filter(e=>!u.has(e.type)).map(e=>c(e.value)),...y.flatMap(e=>e.filter(e=>!u.has(e.type)).map(e=>c(e.value)))])].sort((e,t)=>t.length-e.length),D=0===S.length?RegExp("[\\p{White_Space}]","gu"):RegExp(`${S.join("|")}|[\\p{White_Space}]`,"gu"),P=[...new Intl.NumberFormat(i.locale,{useGrouping:!1}).format(0x24cb016ea)].reverse(),x=new Map(P.map((e,t)=>[e,t]));return{minusSign:f,plusSign:h,decimal:b,group:v,literals:D,numeral:RegExp(`[${P.join("")}]`,"g"),index:e=>String(x.get(e))}}(e,this.formatter,this.options,t),"percent"===this.options.style&&((null!=(i=this.options.minimumFractionDigits)?i:0)>18||(null!=(n=this.options.maximumFractionDigits)?n:0)>18)&&console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.")}}let u=new Set(["decimal","fraction","integer","minusSign","plusSign","group"]),m=[0,4,2,1,11,20,3,7,100,21,.1,1.1];function d(e,t,i){return e.replaceAll?e.replaceAll(t,i):e.split(t).join(i)}function c(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}e.s(["NumberParser",0,r])},410528,e=>{"use strict";var t={};t={"ar-AE":{Empty:"فارغ"},"bg-BG":{Empty:"Изпразни"},"cs-CZ":{Empty:"Prázdné"},"da-DK":{Empty:"Tom"},"de-DE":{Empty:"Leer"},"el-GR":{Empty:"Άδειο"},"en-US":{Empty:"Empty"},"es-ES":{Empty:"Vacío"},"et-EE":{Empty:"Tühjenda"},"fi-FI":{Empty:"Tyhjä"},"fr-FR":{Empty:"Vide"},"he-IL":{Empty:"ריק"},"hr-HR":{Empty:"Prazno"},"hu-HU":{Empty:"Üres"},"it-IT":{Empty:"Vuoto"},"ja-JP":{Empty:"空"},"ko-KR":{Empty:"비어 있음"},"lt-LT":{Empty:"Tuščias"},"lv-LV":{Empty:"Tukšs"},"nb-NO":{Empty:"Tom"},"nl-NL":{Empty:"Leeg"},"pl-PL":{Empty:"Pusty"},"pt-BR":{Empty:"Vazio"},"pt-PT":{Empty:"Vazio"},"ro-RO":{Empty:"Gol"},"ru-RU":{Empty:"Не заполнено"},"sk-SK":{Empty:"Prázdne"},"sl-SI":{Empty:"Prazen"},"sr-SP":{Empty:"Prazno"},"sv-SE":{Empty:"Tomt"},"tr-TR":{Empty:"Boş"},"uk-UA":{Empty:"Пусто"},"zh-CN":{Empty:"空"},"zh-TW":{Empty:"空白"}};var i=e.i(451147),n=e.i(389959),r=e.i(593678),o=e.i(614161),s=e.i(278052);e.s(["useSpinButton",0,function(e){var a;let l=(0,n.useRef)(void 0),{value:u,textValue:m,minValue:d,maxValue:c,isDisabled:p,isReadOnly:g,isRequired:y,onIncrement:f,onIncrementPage:h,onDecrement:b,onDecrementPage:v,onDecrementToMin:S,onIncrementToMax:D}=e,P=(0,s.useLocalizedStringFormatter)((a=t)&&a.__esModule?a.default:a,"@react-aria/spinbutton");(0,n.useEffect)(()=>()=>clearTimeout(l.current),[]);let x=(0,n.useRef)(!1),E=()=>{x.current=!0},C=()=>{x.current=!1},T=""===m?P.format("Empty"):(m||`${u}`).replace("-","−");(0,n.useEffect)(()=>{x.current&&((0,i.clearAnnouncer)("assertive"),(0,i.announce)(T,"assertive"))},[T]);let R=(0,r.useEffectEvent)(e=>{clearTimeout(l.current),null==f||f(),l.current=window.setTimeout(()=>{(void 0===c||isNaN(c)||void 0===u||isNaN(u)||u<c)&&R(60)},e)}),w=(0,r.useEffectEvent)(e=>{clearTimeout(l.current),null==b||b(),l.current=window.setTimeout(()=>{(void 0===d||isNaN(d)||void 0===u||isNaN(u)||u>d)&&w(60)},e)}),_=e=>{e.preventDefault()},{addGlobalListener:A,removeAllGlobalListeners:k}=(0,o.useGlobalListeners)();return{spinButtonProps:{role:"spinbutton","aria-valuenow":void 0===u||isNaN(u)?void 0:u,"aria-valuetext":T,"aria-valuemin":d,"aria-valuemax":c,"aria-disabled":p||void 0,"aria-readonly":g||void 0,"aria-required":y||void 0,onKeyDown:e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&!g)switch(e.key){case"PageUp":if(h){e.preventDefault(),null==h||h();break}case"ArrowUp":case"Up":f&&(e.preventDefault(),null==f||f());break;case"PageDown":if(v){e.preventDefault(),null==v||v();break}case"ArrowDown":case"Down":b&&(e.preventDefault(),null==b||b());break;case"Home":S&&(e.preventDefault(),null==S||S());break;case"End":D&&(e.preventDefault(),null==D||D())}},onFocus:E,onBlur:C},incrementButtonProps:{onPressStart:()=>{R(400),A(window,"contextmenu",_)},onPressEnd:()=>{clearTimeout(l.current),k()},onFocus:E,onBlur:C},decrementButtonProps:{onPressStart:()=>{w(400),A(window,"contextmenu",_)},onPressEnd:()=>{clearTimeout(l.current),k()},onFocus:E,onBlur:C}}}],410528)},588992,e=>{"use strict";var t=e.i(389959),i=e.i(489859);e.s(["default",0,function(e,n){let[r,o]=(0,t.useState)(n),[s,a]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{let t=i.default.get(e);null!=t&&o(t),a(!0)},[e]),(0,t.useEffect)(()=>{s&&i.default.set(e,r)},[e,r,s]),[r,o,s]}])},20397,e=>{"use strict";var t=e.i(847159),t=t;let i=t.default;e.s(["FormattedMessage",0,i],20397)},365757,e=>{"use strict";var t=e.i(276385),i=e.i(595996);e.s(["default",0,function({alt:e,iconUrl:n,size:r,className:o}){return(0,t.jsx)(i.default,{size:r,iconUrl:n,className:o,alt:e})}])},316431,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(295798),r=e.i(585544),o=e.i(19322),s=e.i(8047),a=e.i(61732);e.s(["Select",0,function({id:e,items:l,"aria-label":u,initialSelectedItem:m,selectedItem:d,onChange:c,placeholder:p,dataCy:g,disabled:y,className:f}){let h,b=(0,n.default)(c),v=l.map(e=>({...e,id:e.title}));d?h=d.title:m&&(h=m.title);let S=m?m.title:void 0;return(0,t.jsx)(o.Select,{id:e,"aria-label":u,items:v,selectedKey:h,defaultSelectedKey:S,onSelectionChange:e=>{let t=l.find(t=>t.title===e);t&&b.current(t)},placeholder:p,dataCy:g,isDisabled:y,className:f,selectValue:e=>e.selectedItem?(0,t.jsxs)(a.View,{row:!0,grow:!0,shrink:!0,gap:8,align:"center",children:[e.selectedItem.icon?(0,i.cloneElement)(e.selectedItem.icon,{size:16}):null,(0,t.jsx)(s.Text,{multiline:!1,children:e.selectedItem.title})]}):(0,t.jsx)(a.View,{row:!0,grow:!0,shrink:!0,gap:8,align:"center",children:(0,t.jsx)(s.Text,{color:"dimmer",multiline:!1,children:p})}),children:e=>(0,t.jsx)(r.ListBoxItem,{id:e.title,label:e.title,description:e.subtitle,icon:e.icon,dataCy:e.dataCy},e.title)})}])},677302,e=>{e.v({input:"ComboBox-module__pAhpoG__input",item:"ComboBox-module__pAhpoG__item",listbox:"ComboBox-module__pAhpoG__listbox",popover:"ComboBox-module__pAhpoG__popover",trigger:"ComboBox-module__pAhpoG__trigger"})},760982,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(969407),r=e.i(336799),o=e.i(654647),s=e.i(167392),a=e.i(269848),l=e.i(295798),u=e.i(406664),m=e.i(379778),d=e.i(197649),c=e.i(480890),p=e.i(488299),g=e.i(528710),y=e.i(33583),f=e.i(773222),h=e.i(8047),b=e.i(61732),v=e.i(677302);let S=i.forwardRef(function({label:e,children:u,dataCy:d,isLoading:S,onLoadMore:D,emptyMessage:x,maxHeight:E,allowsEmptyCollection:C=!0,icon:T,triggerIcon:R,triggerButtonProps:w,..._},A){let k,B,M=(0,n.useIsSSR)(),N=(0,m.useView)({gap:4}),j=(0,m.useView)({gap:2,p:4}),I=(k=(0,l.default)(D),B=(0,i.useRef)(!0),(0,i.useCallback)(e=>{let t=e.currentTarget;t.scrollTop+t.clientHeight>=t.scrollHeight-400?B.current&&(B.current=!1,k.current?.()):B.current=!0},[k]));return P({id:_.id,label:e,"aria-labelledby":_["aria-labelledby"],"aria-label":_["aria-label"]}),(0,t.jsx)(r.ComboBox,{..._,clsx:N.className,style:{..._.style,...N.style},allowsEmptyCollection:C,"data-cy":d,children:M?null:(0,t.jsxs)(t.Fragment,{children:[e?(0,t.jsx)(y.Label,{children:e}):null,(0,t.jsxs)(b.View,{row:!0,align:"center",children:[(0,t.jsx)(g.DecoratedInput,{ref:A,iconLeft:T,clsx:v.default.input}),(0,t.jsx)(p.IconButton,{alt:"open",isTooltipOpen:!1,clsx:v.default.trigger,slot:w?.onClick?null:void 0,...w,children:R||(0,t.jsx)(s.default,{})})]}),(0,t.jsx)(c.FieldError,{}),(0,t.jsx)(f.RawPopover,{clsx:v.default.popover,UNSTABLE_portalContainer:_.portalContainer,children:(0,t.jsx)(o.ListBox,{clsx:[v.default.listbox,j.className],style:{...j.style,maxHeight:E},onScroll:I,renderEmptyState:()=>S?(0,t.jsx)(b.View,{p:16,row:!0,align:"center",justify:"center",children:(0,t.jsx)(a.default,{})}):(0,t.jsx)(b.View,{px:6,row:!0,align:"center",children:(0,t.jsx)(h.Text,{color:"dimmer",children:x??"No results"})}),children:u})})]})})}),D=(0,i.forwardRef)(function({label:e,dataCy:i,...n},r){let s=(0,u.useCreateInteractive)({variant:"nofill"});return(0,t.jsx)(o.ListBoxItem,{...n,ref:r,textValue:e,"data-cy":i,className:(0,d.default)(s.clsx,v.default.item),style:s.style,children:(0,t.jsx)(h.Text,{multiline:!1,children:e})})}),P=function(){};e.s(["ComboBox",0,S,"ComboBoxListBoxItem",0,D])},935984,e=>{"use strict";var t=e.i(351623),i=e.i(344480),n=e.i(975473),r=e.i(299020);let o={},s=t.gql`
    fragment TourServiceTour on TourSeen {
  id
  seen
}
    `,a=t.gql`
    query TourServiceToursSeen($tours: [String!]!) {
  currentUser {
    id
    toursSeen(tours: $tours) {
      id
      ...TourServiceTour
    }
  }
}
    ${s}`,l=t.gql`
    mutation TourServiceDismissTour($name: String!) {
  markTourAsSeen2(input: {name: $name}) {
    __typename
    ... on TourSeen {
      id
      ...TourServiceTour
    }
    ... on UserError {
      message
    }
    ... on UnauthorizedError {
      message
    }
  }
}
    ${s}`;e.s(["TourServiceDismissTourDocument",0,l,"TourServiceToursSeenDocument",0,a,"useTourServiceDismissTourMutation",0,function(e){let t={...o,...e};return r.useMutation(l,t)},"useTourServiceToursSeenLazyQuery",0,function(e){let t={...o,...e};return n.useLazyQuery(a,t)},"useTourServiceToursSeenQuery",0,function(e){let t={...o,...e};return i.useQuery(a,t)}])},777198,e=>{"use strict";var t=e.i(389959),i=e.i(935984);function n(e,n){let{data:r,loading:o}=(0,i.useTourServiceToursSeenQuery)({variables:{tours:e}}),[s,{loading:a}]=(0,i.useTourServiceDismissTourMutation)({variables:{name:e},optimisticResponse:{__typename:"RootMutationType",markTourAsSeen2:{__typename:"TourSeen",id:e,seen:!0}},onCompleted:n}),[l,{loading:u}]=(0,i.useTourServiceDismissTourMutation)({variables:{name:e},optimisticResponse:{__typename:"RootMutationType",markTourAsSeen2:{__typename:"TourSeen",id:e,seen:!1}}}),m=!!r?.currentUser?.toursSeen[0].seen;return(0,t.useMemo)(()=>({isLoading:o,isDone:m,setAsDone:s,unsetAsDone:l,isMutating:a||u}),[o,m,s,l,a,u])}e.s(["useDismissibleElement",0,function(e){let{isLoading:t,isDone:i,setAsDone:r,unsetAsDone:o}=n(e);return{isLoading:t,isDone:i,setAsDone:r,unsetAsDone:o}},"useMemoedDismissibleElement",0,n])},289884,e=>{"use strict";var t=e.i(389959);e.s(["default",0,function(e,i){let n=(0,t.useRef)(null),r=(0,t.useCallback)(t=>{n.current?.contains(t.target)||e(t)},i);return(0,t.useEffect)(()=>(document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}),[r]),n}])},906026,e=>{"use strict";var t=e.i(813724);e.s(["differenceInDays",()=>t.default])},172852,29498,e=>{"use strict";var t=e.i(559713),i=e.i(214816),n=e.i(847240);function r(e,r){(0,n.default)(2,arguments);var o=(0,t.default)(r);return(0,i.default)(e,36e5*o)}e.s(["default",0,r],29498),e.s(["addHours",0,r],172852)}]);

//# debugId=82960cfb-cb34-8ea2-cc7a-313e0d667733
//# sourceMappingURL=0rai0rfbo0~cq.js.map