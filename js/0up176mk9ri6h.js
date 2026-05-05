;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a3593630-164d-bf48-fe9f-04c470838ce3")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,228290,e=>{e.v({container:"index-module__z1kyYa__container",menu:"index-module__z1kyYa__menu",notificationIndicator:"index-module__z1kyYa__notificationIndicator",popover:"index-module__z1kyYa__popover"})},237671,980224,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(532764),o=e.i(351623),r=e.i(344480);e.i(975473);var a=e.i(846545);let s={},l=o.gql`
    query notificationCount {
  currentUser {
    id
    notificationCount
  }
}
    `,c=o.gql`
    subscription notificationCountChanges {
  notificationCount
}
    `;function u(){var e;let t,n,{data:o,refetch:u,client:d}=(t={...s,...void 0},r.useQuery(l,t)),m=(0,i.useCallback)(e=>{o?.currentUser&&d.writeQuery({query:l,data:{...o,currentUser:{...o.currentUser,notificationCount:e}}})},[o?.currentUser?.id]);return e={onData:({data:{data:e}})=>{"number"==typeof e?.notificationCount&&m(e.notificationCount)}},n={...s,...e},a.useSubscription(c,n),{count:Math.max(0,o?.currentUser?.notificationCount||0),refetch:u,setUnreadCount:m}}e.s(["default",0,u],980224);var d=e.i(488299),m=e.i(773222),p=e.i(61732),f=e.i(228290);e.s(["NavMenu",0,function(e){let[o,r]=(0,i.useState)(!1),{count:a}=u();return(0,t.jsxs)(p.View,{clsx:f.default.container,children:[(0,t.jsxs)(m.PopoverTrigger,{isOpen:o,onOpenChange:t=>{r(t),e.onOpenChange?.(t)},label:"Menu",placement:"bottom start",clsx:f.default.popover,offset:2,containerPadding:2,children:[(0,t.jsx)(d.IconButton,{alt:"Menu",size:28,tooltipBehavior:"hidden",children:(0,t.jsx)(n.default,{})}),(0,t.jsx)(p.View,{p:4,clsx:f.default.menu,br:6,children:"function"==typeof e.children?e.children(()=>r(!1)):e.children})]}),a>0?(0,t.jsx)(p.View,{clsx:f.default.notificationIndicator}):null]})}],237671)},841114,e=>{"use strict";var t=e.i(351623),i=e.i(344480);e.i(975473);var n=e.i(299020);let o={},r=t.gql`
    query ThemePreferenceCurrentUser {
  currentUser {
    id
    workspacePreferences
  }
}
    `,a=t.gql`
    mutation ThemePreferenceUpdate($input: JSON!) {
  updateWorkspacePreferences(input: $input) {
    id
    workspacePreferences
  }
}
    `;var s=e.i(320216);e.s(["useThemePreference",0,function(){var e;let t,l,{showError:c}=(0,s.default)(),{data:u}=(e={ssr:!0},t={...o,...e},i.useQuery(r,t)),d=u?.currentUser?.__typename==="CurrentUser"?u.currentUser:null,m=d?.workspacePreferences.theme,p=null==m,[f]=(l={...o,...void 0},n.useMutation(a,l)),h=async e=>{if(!d)return;let t="system"===e?null:e;null===t&&p||(t!==m||p)&&await f({variables:{input:{theme:t}},optimisticResponse:{__typename:"RootMutationType",updateWorkspacePreferences:{__typename:"CurrentUser",id:d.id,workspacePreferences:{...d.workspacePreferences,theme:t}}},onError:()=>c("Something went wrong setting the active theme - please try again.")})};return{isSystemTheme:p,setActiveTheme:h}}],841114)},64017,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(351623),o=e.i(344480);e.i(975473);let r={},a=n.gql`
    query currentUser {
  currentUser {
    __typename
    id
    username
    isSubscribed
    isMemberOfAnyOrg
  }
}
    `;var s=e.i(787527),l=e.i(252204),c=e.i(295652),u=e.i(612343),d=e.i(596139),m=e.i(3466),p=e.i(480028),f=e.i(462229),h=e.i(316431),x=e.i(691636),g=e.i(419635),N=e.i(108431),j=e.i(8047),y=e.i(61732),v=e.i(908796);let C=[{value:"billing-issue",title:"Billing",showFrontForm:!0},{value:"account-issue",title:"Account",showFrontForm:!0},{value:"technical-issue",title:"Technical",showFrontForm:!0}];var I=e.i(299020);let w={},b=n.gql`
    mutation frontSupportRequest($input: FrontSupportRequestInput!) {
  frontSupportRequest(input: $input) {
    ... on UserError {
      message
    }
    ... on TooManyRequestsError {
      message
    }
    ... on UnauthorizedError {
      message
    }
    ... on FrontSupportRequestSuccess {
      success
    }
    __typename
  }
}
    `;var _=v,k=e.i(269848),T=e.i(320216),S=e.i(415541),R=e.i(709485),M=e.i(643484),L=e.i(528710);let A={},$=n.gql`
    fragment ReplSelectorRepl on Repl {
  id
  title
  timeUpdated
  url
  slug
  owner {
    ... on User {
      id
      username
      image
      fullName
    }
    ... on Team {
      id
      username
      image
    }
  }
  iconUrl
  templateLabel
  publishedAs
}
    `,P=n.gql`
    query ReplSelector($search: String!, $excludePrivate: Boolean, $excludeMultiplayer: Boolean) {
  currentUser {
    id
    replSearch(
      search: $search
      excludePrivate: $excludePrivate
      excludeMultiplayer: $excludeMultiplayer
    ) {
      id
      ...ReplSelectorRepl
    }
  }
}
    ${$}`;var q=e.i(602686),O=e.i(619158),U=e.i(760982),F=e.i(585544),B=e.i(365757);let V="__not_app_specific__",E="Not related to a specific app";function z(e){return e.owner?`${e.owner.username}/${e.title}`:e.title}function W({onSelect:e}){var n;let r,[a,s]=(0,i.useState)(""),[l,c]=(0,i.useState)(null),u=(0,i.useRef)([]),d=(0,O.default)(a,150),m=u.current.find(e=>e.id===l),f=""===a?"":d,{data:h,loading:x}=(n={variables:{search:l&&m&&f===z(m)?"":f,excludeMultiplayer:!1}},r={...A,...n},o.useQuery(P,r)),g=h?.currentUser?.replSearch??[];return u.current=g,(0,t.jsxs)(U.ComboBox,{"aria-label":"Select an app",placeholder:"Select an app",menuTrigger:"focus",style:{width:"100%"},selectedKey:l,inputValue:a,onInputChange:t=>{if(s(t),l&&l!==V){let i=u.current.find(e=>e.id===l);i&&t===z(i)||(c(null),e(null))}else l===V&&t!==E&&(c(null),e(null))},triggerIcon:l?(0,t.jsx)(q.default,{}):void 0,triggerButtonProps:l?{onClick:()=>{c(null),s(""),e(null)}}:void 0,isLoading:x&&0===g.length,emptyMessage:"No apps found",maxHeight:240,onSelectionChange:t=>{if(c(t),null===t)return void e(null);if(t===V){e("none"),s(E);return}let i=u.current.find(e=>e.id===t);i&&(e(i),s(z(i)))},children:[(0,t.jsx)(F.BaseListBoxItem,{id:V,textValue:E,children:(0,t.jsx)(j.Text,{color:"dimmer",multiline:!1,children:E})},V),g.map(e=>(0,t.jsx)(F.BaseListBoxItem,{id:e.id,textValue:z(e),children:(0,t.jsxs)(y.View,{row:!0,gap:8,align:"center",children:[e.iconUrl?(0,t.jsx)(B.default,{alt:e.title,iconUrl:e.iconUrl,size:16}):null,(0,t.jsx)(y.View,{row:!0,align:"center",children:e.owner?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{style:{color:p.tokens.greyDimmer},children:[e.owner.username,"/"]}),(0,t.jsx)("span",{children:e.title})]}):(0,t.jsx)("span",{children:e.title})})]})},e.id))]})}let D=({onDone:e,type:n,subcategory:o,config:r={titleField:"Subject",titleDescription:"Briefly describe what's going on",titlePlaceholder:"I am unable to...",bodyField:"Description",bodyDescription:"Please detail what you're experiencing, and any additional information that can help us help you.",bodyPlaceholder:"I am currently experiencing...",allowAttachments:!0},categoryType:a=_.SupportCategoryType.AccountBilling})=>{var s;let l,c=a===_.SupportCategoryType.Technical,{showError:u,showConfirm:d}=(0,T.default)(),[m,p]=(0,i.useState)(""),[f,h]=(0,i.useState)(""),[x,g]=(0,i.useState)(null);(0,i.useEffect)(()=>{g(null)},[a]);let[N,{loading:v}]=(s={onError:e=>{u(e.toString())},onCompleted:t=>{e(),"FrontSupportRequestSuccess"===t.frontSupportRequest.__typename?d("Your message was successfully sent. We will be in touch via email shortly."):u(t.frontSupportRequest.message)}},l={...w,...s},I.useMutation(b,l));return(0,t.jsxs)(y.View,{gap:16,style:{minWidth:0},children:[c?(0,t.jsxs)(y.View,{gap:8,children:[(0,t.jsx)(j.Text,{variant:"subheadDefault",multiline:!1,children:"App name"}),(0,t.jsx)(W,{onSelect:g})]}):null,r.titleField?(0,t.jsxs)(y.View,{gap:8,children:[(0,t.jsx)(j.Text,{variant:"subheadDefault",multiline:!1,children:r.titleField}),(0,t.jsx)(L.Input,{value:m,onChange:e=>p(e.target.value),placeholder:r.titleDescription??r.titlePlaceholder})]}):null,(0,t.jsxs)(y.View,{gap:8,children:[r.bodyField?(0,t.jsx)(j.Text,{variant:"subheadDefault",multiline:!1,children:r.bodyField}):null,(0,t.jsx)(L.MultiLineInput,{style:{width:"100%",boxSizing:"border-box"},value:f,onChange:e=>h(e.target.value),placeholder:c?"What's happening? Include steps to reproduce and any error messages you're seeing.\n\n1. Go to...\n2. Click on...\n3. See error...":r.bodyDescription??r.bodyPlaceholder,rows:6})]}),(0,t.jsxs)(y.View,{row:!0,gap:4,justify:"end",children:[(0,t.jsx)(M.Button,{text:"Cancel",onClick:e}),(0,t.jsx)(M.Button,{text:"Submit",onClick:()=>{let e=r.titleField&&m.length>3,t=f.length>20,i=!c||null!==x,s="none"!==x?x:null;if(!e||!t||!i){let n=[];i||n.push("Please select an app"),e||n.push("Subject must be at least 3 characters"),t||n.push("Description must be at least 20 characters"),u(n.join(". ")+".");return}let l=s?.title,d=s?.id;N({variables:{input:{title:m,body:[f,c&&l?`

App Name: ${l}`:""].join(""),type:a,replId:c?d||"N/A":void 0,clientInformation:{pageUrl:location.href,browser:window.navigator.userAgent}}}}),(0,S.track)(R.events.HELP_FORM_SUBMITTED,{category:n,subcategory:o})},colorway:"primary",loading:v,iconLeft:v?(0,t.jsx)(k.default,{}):void 0})]})]})},H=(0,f.cssRecord)({container:[x.rcss.flex.column,x.rcss.colWithGap(16)],flexButtons:[{borderTop:"solid 1px "+p.tokens.backgroundHighest,"@media(max-width: 500px)":{display:"block","& > *":{margin:"0 0 8px 0 !important"}}}]});e.s(["default",0,({onRequestClose:e,items:n,initialOptionPlaceholder:f="Choose an option",formConfig:I})=>{let w,[b,_]=(0,i.useState)(null),[k,T]=(0,i.useState)(null),{data:S,loading:R}=(w={...r,...void 0},o.useQuery(a,w)),M=S?.currentUser?.isSubscribed,L=S?.currentUser?.isMemberOfAnyOrg;(0,i.useEffect)(()=>{b?.subcategories&&T(b.subcategories[0])},[b]);let A=(0,i.useMemo)(()=>n||(M||L?C:[]),[n,M,L]);return(0,t.jsxs)(y.View,{css:H.container,children:[A.length>0?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j.Text,{variant:"subheadDefault",multiline:!1,children:"Get help"}),(0,t.jsx)(N.StatusBanner,{colorway:"primary",text:`Hi there, ${R?"":S?.currentUser?.username+"!"} How can we help?`}),(0,t.jsx)(h.Select,{"aria-label":"Select support category",items:A,selectedItem:b,onChange:e=>_(e),placeholder:f}),null!==b?(0,t.jsxs)(y.View,{children:[(0,t.jsx)(y.View,{css:[x.rcss.pb(b.showFrontForm||k?.showFrontForm?16:0)],gap:8}),b.subcategories?.length&&k?(0,t.jsx)(y.View,{css:[x.rcss.pb(b.showFrontForm||k?.showFrontForm?16:0),x.rcss.border({direction:"top",color:p.tokens.backgroundHighest})],pt:16,gap:8,children:(0,t.jsx)(h.Select,{"aria-label":"Select subcategory",items:b.subcategories,selectedItem:k,onChange:e=>T(e)})}):null,b.showFrontForm||k?.showFrontForm?(0,t.jsx)(y.View,{css:[x.rcss.border({direction:"top",color:p.tokens.backgroundHighest})],pt:16,children:(0,t.jsx)(D,{onDone:e,type:b.value,config:I,categoryType:function(e){switch(e){case"billing-issue":return v.SupportCategoryType.Billing;case"account-issue":return v.SupportCategoryType.Account;case"technical-issue":return v.SupportCategoryType.Technical;default:return}}(b.value)})}):null]}):null]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j.Text,{variant:"subheadBig",multiline:!1,children:"Subscription is required for Support"}),(0,t.jsx)(m.default,{context:"support_dialog",text:`Upgrade to Replit ${d.corePlanName}`,colorway:"primary"})]}),(0,t.jsxs)(y.View,{css:H.flexButtons,pt:16,row:!0,gap:8,children:[(0,t.jsx)(g.ButtonLink,{href:"https://docs.replit.com/legal-and-security-info/abuse-report",target:"_blank",text:"Report abuse",iconRight:(0,t.jsx)(l.default,{}),iconLeft:(0,t.jsx)(c.default,{}),size:"small"}),(0,t.jsx)(g.ButtonLink,{href:"https://docs.replit.com",target:"_blank",text:"Read the docs",iconRight:(0,t.jsx)(l.default,{}),iconLeft:(0,t.jsx)(s.default,{}),size:"small"}),(0,t.jsx)(g.ButtonLink,{href:"https://replit.com/community",target:"_blank",text:"Check the community",iconRight:(0,t.jsx)(l.default,{}),iconLeft:(0,t.jsx)(u.default,{}),size:"small"})]})]})}],64017)},413325,e=>{e.v({buttonGroupContainer:"List-module__a4KWka__buttonGroupContainer",compact:"List-module__a4KWka__compact",emptyState:"List-module__a4KWka__emptyState",emptyStateContainer:"List-module__a4KWka__emptyStateContainer",list:"List-module__a4KWka__list",loadMoreContainer:"List-module__a4KWka__loadMoreContainer",textCenter:"List-module__a4KWka__textCenter"})},638046,e=>{e.v({count:"NotificationsItem-module__00pi2G__count"})},286093,765185,736372,556278,566032,e=>{"use strict";var t=e.i(276385),i=e.i(389959),n=e.i(351623);let o=n.gql`
    fragment NotificationItemCreator on User {
  id
  image
  username
  fullName
  url
}
    `,r=n.gql`
    fragment NotificationItemRepliedToPostNotification on RepliedToPostNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,a=n.gql`
    fragment NotificationItemRepliedToCommentNotification on RepliedToCommentNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,s=n.gql`
    fragment NotificationItemMentionedInPostNotification on MentionedInPostNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,l=n.gql`
    fragment NotificationItemMentionedInCommentNotification on MentionedInCommentNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,c=n.gql`
    fragment NotificationItemAnswerAcceptedNotification on AnswerAcceptedNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,u=n.gql`
    fragment NotificationItemMultiplayerJoinedEmailNotification on MultiplayerJoinedEmailNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,d=n.gql`
    fragment NotificationItemMultiplayerJoinedLinkNotification on MultiplayerJoinedLinkNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,m=n.gql`
    fragment NotificationItemMultiplayerInvitedNotification on MultiplayerInvitedNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,p=n.gql`
    fragment NotificationItemMultiplayerOverlimitNotification on MultiplayerOverlimitNotification {
  id
  text
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,f=n.gql`
    fragment NotificationItemWarningNotification on WarningNotification {
  id
  text
  url
  timeCreated
  seen
}
    `,h=n.gql`
    fragment NotificationItemTeamInvite on TeamInvite {
  id
  team {
    id
    displayName
    username
  }
}
    `,x=n.gql`
    fragment NotificationItemTeamInviteNotification on TeamInviteNotification {
  id
  text
  url
  timeCreated
  seen
  invite {
    id
    ...NotificationItemTeamInvite
  }
}
    ${h}`,g=n.gql`
    fragment NotificationItemTeamOrganizationInvite on TeamOrganizationInvite {
  id
  organization {
    id
    name
  }
}
    `,N=n.gql`
    fragment NotificationItemTeamOrganizationInviteNotification on TeamOrganizationInviteNotification {
  id
  text
  url
  timeCreated
  seen
  invite {
    id
    ...NotificationItemTeamOrganizationInvite
  }
}
    ${g}`,j=n.gql`
    fragment NotificationTeamTemplateSubmittedNotification on TeamTemplateSubmittedNotification {
  id
  text
  url
  timeCreated
  seen
  repl {
    id
    url
  }
}
    `,y=n.gql`
    fragment NotificationTeamTemplateReviewedStatusNotification on TeamTemplateReviewedStatusNotification {
  id
  text
  url
  timeCreated
  seen
  repl {
    id
    url
  }
}
    `,v=n.gql`
    fragment NotificationReplCommentCreatedNotification on ReplCommentCreatedNotification {
  id
  url
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,C=n.gql`
    fragment NotificationReplCommentReplyCreatedNotification on ReplCommentReplyCreatedNotification {
  id
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,I=n.gql`
    fragment NotificationReplCommentMentionNotification on ReplCommentMentionNotification {
  id
  timeCreated
  seen
  creator {
    id
    ...NotificationItemCreator
  }
}
    ${o}`,w=n.gql`
    fragment NotificationItemNewFollower on NewFollowerNotification {
  id
  timeCreated
  seen
  url
  creator {
    ...NotificationItemCreator
  }
}
    ${o}`,b=n.gql`
    fragment BasicNotificationItemNotification on BasicNotification {
  id
  text
  url
  timeCreated
  seen
  context
}
    `,_=n.gql`
    fragment NotificationItemEgressLimitNotification on EgressLimitNotification {
  id
  url
  timeCreated
  seen
  variant
  limitGib
  percentage
}
    `,k=n.gql`
    fragment NotificationItemOrgUpgradeRequestReviewedNotification on OrgUpgradeRequestReviewedNotification {
  id
  timeCreated
  seen
  url
  creator {
    ...NotificationItemCreator
  }
  isAccepted
  orgId
}
    ${o}`;var T=e.i(344480);e.i(975473);let S={},R=n.gql`
    fragment NotificationItems on Notification {
  ... on BasicNotification {
    id
    ...BasicNotificationItemNotification
  }
  ... on MentionedInPostNotification {
    id
    ...NotificationItemMentionedInPostNotification
  }
  ... on RepliedToPostNotification {
    id
    ...NotificationItemRepliedToPostNotification
  }
  ... on MentionedInCommentNotification {
    id
    ...NotificationItemMentionedInCommentNotification
  }
  ... on RepliedToCommentNotification {
    id
    ...NotificationItemRepliedToCommentNotification
  }
  ... on AnswerAcceptedNotification {
    id
    ...NotificationItemAnswerAcceptedNotification
  }
  ... on MultiplayerInvitedNotification {
    id
    ...NotificationItemMultiplayerInvitedNotification
  }
  ... on MultiplayerJoinedEmailNotification {
    id
    ...NotificationItemMultiplayerJoinedEmailNotification
  }
  ... on MultiplayerJoinedLinkNotification {
    id
    ...NotificationItemMultiplayerJoinedLinkNotification
  }
  ... on MultiplayerOverlimitNotification {
    id
    ...NotificationItemMultiplayerOverlimitNotification
  }
  ... on WarningNotification {
    id
    ...NotificationItemWarningNotification
  }
  ... on TeamInviteNotification {
    id
    ...NotificationItemTeamInviteNotification
  }
  ... on TeamOrganizationInviteNotification {
    id
    ...NotificationItemTeamOrganizationInviteNotification
  }
  ... on TeamTemplateSubmittedNotification {
    id
    ...NotificationTeamTemplateSubmittedNotification
  }
  ... on TeamTemplateReviewedStatusNotification {
    id
    ...NotificationTeamTemplateReviewedStatusNotification
  }
  ... on ReplCommentCreatedNotification {
    id
    ...NotificationReplCommentCreatedNotification
  }
  ... on ReplCommentReplyCreatedNotification {
    id
    ...NotificationReplCommentReplyCreatedNotification
  }
  ... on ReplCommentMentionNotification {
    id
    ...NotificationReplCommentMentionNotification
  }
  ... on NewFollowerNotification {
    id
    ...NotificationItemNewFollower
  }
  ... on OrgUpgradeRequestReviewedNotification {
    id
    ...NotificationItemOrgUpgradeRequestReviewedNotification
  }
  ... on EgressLimitNotification {
    id
    ...NotificationItemEgressLimitNotification
  }
  ... on OrgUpgradeRequestReviewedNotification {
    id
    ...NotificationItemOrgUpgradeRequestReviewedNotification
  }
}
    ${b}
${s}
${r}
${l}
${a}
${c}
${m}
${u}
${d}
${p}
${f}
${x}
${N}
${j}
${y}
${v}
${C}
${I}
${w}
${k}
${_}`,M=n.gql`
    query notifications($after: String, $count: Int, $seen: Boolean) {
  currentUser {
    id
  }
  notifications(after: $after, count: $count, seen: $seen) {
    items {
      ...NotificationItems
    }
    pageInfo {
      nextCursor
    }
  }
}
    ${R}`;var L=e.i(299020);let A={},$=n.gql`
    mutation MarkAllNotificationsAsSeen {
  markAllNotificationsAsSeen {
    id
    notificationCount
  }
}
    `;var P=e.i(183035),q=e.i(269848),O=e.i(421376),U=e.i(927600),F=e.i(415541),B=e.i(709485),V=e.i(480028),E=e.i(462229),z=e.i(723517),W=e.i(691636);let D=(0,E.cssRecord)({root:[W.rcss.display.flex,W.rcss.align.center,W.rcss.p(12),{'&[data-has-link="true"]':[{pointerEvents:"none","a, button":{pointerEvents:"all"}}],'&[data-last-item="true"]':[W.rcss.border({width:1,color:V.tokens.outlineDimmest,direction:"bottom"})]}],notificationLinkWrapper:[[{borderWidth:0,":nth-last-child(2)>a":{borderBottomLeftRadius:V.tokens.space8,borderBottomRightRadius:V.tokens.space8,"::after":{borderBottomLeftRadius:V.tokens.space8,borderBottomRightRadius:V.tokens.space8}}}]],notificationLink:[z.interactive.listItem,W.rcss.color.foregroundDefault,W.rcss.display.block,W.rcss.focusRingOnAfter,W.rcss.position.relative,{":focus-visible":{boxShadow:"none !important"},"::after":{content:'""',position:"absolute",top:0,right:0,bottom:0,left:0,display:"block",zIndex:1}}],content:[W.rcss.flex.grow(1),W.rcss.pr(12)],indicatorLink:[W.rcss.display.flex,W.rcss.align.center],indicator:[W.rcss.width(6),W.rcss.height(6),W.rcss.backgroundColor.blueStronger,W.rcss.borderRadius("full"),W.rcss.mr(2)]}),H=({condition:e,children:t,wrap:n})=>e?(0,i.cloneElement)(n(t)):t;function G({children:e,seen:i,href:n,as:o,isLastItem:r=!1}){let a=!!(n||o);return(0,t.jsx)(H,{condition:a,wrap:e=>(0,t.jsxs)("div",{css:D.notificationLinkWrapper,children:[o&&n?(0,t.jsx)(O.default,{as:o,href:n,css:D.notificationLink,children:e}):null,!o&&n&&"object"==typeof n?(0,t.jsx)(O.default,{href:n,css:D.notificationLink,children:e}):null,o||"string"!=typeof n?null:(0,t.jsx)("a",{css:D.notificationLink,href:n,children:e})]}),children:(0,t.jsxs)("div",{onClick:()=>{a&&(0,F.track)(B.events.NOTIFICATION_ITEM_CLICKED,{seen:i})},css:D.root,"data-has-link":a,"data-last-item":r,children:[(0,t.jsx)("div",{css:D.content,children:e}),a?(0,t.jsxs)("div",{css:D.indicatorLink,children:[!i&&(0,t.jsx)("div",{css:D.indicator}),(0,t.jsx)(U.default,{color:V.tokens.foregroundDimmest})]}):null]})})}var K=e.i(192915),Y=e.i(967629),J=e.i(825419),Q=e.i(8047),X=e.i(472499),Z=e.i(61732);let ee=(0,Y.css)([W.rcss.position.relative,W.rcss.display.flex,{flex:"1 1 auto"}]),et=(0,E.cssRecord)({content:ee,contentContainer:[ee,W.rcss.rowWithGap(12),W.rcss.align.center],itemText:[W.rcss.pb(4),{overflowWrap:"break-word"}],itemTextNewFollowerWrapper:[W.rcss.display.flex,W.rcss.flex.column],usernameLink:[W.rcss.borderRadius(4),W.rcss.focusRing,{":focus":{outlineOffset:0}}],userAvatarLink:[W.rcss.width(32),W.rcss.height(32),W.rcss.minWidth(32),W.rcss.minHeight(32),W.rcss.borderRadius(16),W.rcss.focusRing,{":focus":{outlineOffset:0}}]}),ei=({seen:e,url:i,as:n,href:o,text:r,timeCreated:a,creator:s,invite:l,orgInvite:c,isLastItem:u=!1,...d})=>{let m,p;return i&&((m=new URL("/"===i[0]?`https://replit.com${i}`:i)).searchParams.set("from","notifications"),p=(i.startsWith("http")&&"https:"===m.protocol?m.protocol+"//"+m.hostname:"")+m.pathname+m.search+m.hash),(0,t.jsx)(G,{seen:e,compact:d.compact,isLastItem:u,as:n,href:o||p,children:(0,t.jsxs)("div",{css:et.contentContainer,children:[s?(0,t.jsx)(O.default,{...(0,K.userLinkProps)(s),css:et.userAvatarLink,children:(0,t.jsx)(J.Avatar,{size:32,src:s.image,username:s.username,fullName:s.fullName})}):null,(0,t.jsxs)(Z.View,{shrink:!0,children:[(0,t.jsxs)("div",{css:et.itemText,children:[s?(0,t.jsx)(O.default,{...(0,K.userLinkProps)(s),css:et.usernameLink,children:s.username}):null," ",r,l?(0,t.jsx)(t.Fragment,{children:` ${l.team.displayName}. Click here to join`}):null,c?(0,t.jsx)(t.Fragment,{children:` the ${c.organization.name} workspace. Click here to join`}):null]}),(0,t.jsx)(Q.Text,{variant:"small",color:"dimmer",multiline:!1,children:(0,t.jsx)(X.Timestamp,{date:a})})]})]})})},en=({notification:e,isLastItem:i,setAsSeen:n,...o})=>{if("ReplCommentCreatedNotification"===e.__typename||"ReplCommentReplyCreatedNotification"===e.__typename||"ReplCommentMentionNotification"===e.__typename){let r={ReplCommentCreatedNotification:"commented on your repl",ReplCommentReplyCreatedNotification:"replied to your comment on your repl",ReplCommentMentionNotification:"mentioned you in your repl"}[e.__typename];return(0,t.jsx)(ei,{isLastItem:i,text:r||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,creator:e.creator||void 0})}if("BasicNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:e.text||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("MentionedInPostNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"mentioned you in their post",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("MentionedInCommentNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"mentioned you in their comment",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("RepliedToPostNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"replied to your post",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("RepliedToCommentNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"replied to your comment",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("AnswerAcceptedNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"accepted your answer (you earned 5 cycles!)",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("WarningNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"You have been warned by a moderator.  Click here to learn more.",seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("TeamInviteNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"You have been invited to join",invite:e.invite||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("TeamOrganizationInviteNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:"You have been invited to join",orgInvite:e.invite||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("MultiplayerJoinedEmailNotification"===e.__typename||"MultiplayerJoinedLinkNotification"===e.__typename||"MultiplayerInvitedNotification"===e.__typename||"MultiplayerOverlimitNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:e.text?e.text.split(" ").slice(1).join(" "):"",creator:e.creator||void 0,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url});if("TeamTemplateSubmittedNotification"===e.__typename||"TeamTemplateReviewedStatusNotification"===e.__typename)return(0,t.jsx)(ei,{isLastItem:i,text:e.text,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.repl?.url||e.url});if("NewFollowerNotification"===e.__typename){let r=e.creator?(0,K.userLinkProps)(e.creator):null;return(0,t.jsx)(G,{seen:n||e.seen,compact:o.compact,as:r?.as,href:r?.href,isLastItem:i,children:(0,t.jsxs)("div",{css:et.contentContainer,children:[(0,t.jsx)(J.Avatar,{size:32,src:e.creator?.image??null,username:e.creator?.username??"",fullName:e.creator?.fullName}),(0,t.jsx)("div",{css:et.content,children:(0,t.jsx)("div",{css:et.itemTextNewFollowerWrapper,children:(0,t.jsxs)("div",{css:et.itemText,children:[(0,t.jsxs)("div",{children:[e.creator?(0,t.jsx)(O.default,{...(0,K.userLinkProps)(e.creator),children:e.creator.username}):"[deleted]"," started following you"]}),(0,t.jsx)(Q.Text,{variant:"small",color:"dimmer",multiline:!1,children:(0,t.jsx)(X.Timestamp,{date:e.timeCreated})})]})})})]})})}return"OrgUpgradeRequestReviewedNotification"===e.__typename?(0,t.jsx)(ei,{creator:e.creator||void 0,isLastItem:i,text:e.isAccepted?"approved your request to join the workspace":"rejected your request to join the workspace",seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url}):"EgressLimitNotification"===e.__typename?(0,t.jsx)(ei,{creator:void 0,isLastItem:i,text:"egress_reached_limit"===e.variant?"You have reached your data transfer limit for the month. Your Apps' data transfer is being throttled, and will be shut off. Upgrade your plan or purchase additional data transfer with Cycles to resume normal speeds.":`You have used ${e.percentage}% of your monthly data transfer limit. If you reach the limit, your Apps data transfer will be throttled and eventually shut off. Upgrade your plan or purchase additional data transfer with Cycles to prevent disruptions to your Apps.`,seen:n||e.seen,compact:o.compact,timeCreated:e.timeCreated,url:e.url}):null},eo={},er=n.gql`
    mutation MarkNotificationsAsSeen($ids: [Int!]) {
  markNotificationsAsSeen(ids: $ids)
}
    `;var ea=e.i(980224);let es=e=>{var t;let n,[o,r]=(0,i.useState)([]),{count:a,setUnreadCount:s}=(0,ea.default)(),l=e.notificationIds.filter(e=>-1===o.indexOf(e)),[c,{data:u}]=(t={variables:{ids:l}},n={...eo,...t},L.useMutation(er,n));return(0,i.useEffect)(()=>{0!==l.length&&(r([...o,...l]),c())},[l,c]),(0,i.useEffect)(()=>{u?.markNotificationsAsSeen&&s(Math.max(0,a-u.markNotificationsAsSeen))},[u,s]),null};var el=e.i(766299),ec=e.i(643484),eu=e.i(449525),ed=e.i(413325);e.s(["default",0,e=>{var n,o;let r,a,[s,l]=(0,i.useState)(!0),{count:c}=(0,ea.default)(),[u,d]=(0,i.useState)(!1),{data:m,loading:p,fetchMore:f}=(n={fetchPolicy:"cache-and-network",ssr:!1,notifyOnNetworkStatusChange:!0,variables:{...e.count?{count:e.count}:{},...s?{seen:!1}:{}}},r={...S,...n},T.useQuery(M,r)),h=(m?.notifications?.items??[]).filter(e=>"AnnotationNotification"!==e.__typename&&"ThreadNotification"!==e.__typename),[x]=(o={onCompleted(){d(!1)},optimisticResponse:{__typename:"RootMutationType",markAllNotificationsAsSeen:{__typename:"CurrentUser",id:m?.currentUser?.id,notificationCount:0}}},a={...A,...o},L.useMutation($,a)),g=(0,el.useIdSeed)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(Z.View,{row:!0,gap:16,justify:"space-between",clsx:[ed.default.list,{[ed.default.compact]:e.compact}],children:[(0,t.jsx)("div",{clsx:[ed.default.buttonGroupContainer,{[ed.default.compact]:e.compact&&c>0}],children:(0,t.jsxs)(eu.ButtonGroup,{name:g("visibility"),value:s.toString(),primary:!0,onChange:()=>l(!s),row:!0,stretch:!0,children:[(0,t.jsx)(eu.ButtonGroupItem,{id:g("true"),value:"true",text:"Unread"}),(0,t.jsx)(eu.ButtonGroupItem,{id:g("false"),value:"false",text:"All"})]})}),c>0&&(0,t.jsx)(ec.Button,{text:u?"Marking all...":"Mark as read",disabled:p,iconLeft:(0,t.jsx)(P.default,{}),stretch:!0,onClick:()=>{d(!0),x()}})]}),(0,t.jsxs)(Z.View,{children:[!p||m&&m.notifications?null:(0,t.jsx)(Z.View,{p:64,align:"center",children:(0,t.jsx)(q.default,{})}),0===h.length&&(0,t.jsx)("div",{clsx:[ed.default.emptyStateContainer,{[ed.default.compact]:e.compact}],children:(0,t.jsx)(Z.View,{clsx:[ed.default.emptyState,{[ed.default.compact]:e.compact}],children:(0,t.jsx)(Q.Text,{variant:"text",color:"dimmer",multiline:!1,clsx:ed.default.textCenter,children:s?"You're all caught up!":"No notifications"})})}),h.length?(0,t.jsxs)(t.Fragment,{children:[h.map((i,n)=>(0,t.jsx)(en,{compact:e.compact,notification:i,isLastItem:n===h.length-1,setAsSeen:!0},i.id)),e.markAsSeen&&(0,t.jsx)(es,{notificationIds:h.filter(e=>"seen"in e&&!e.seen).map(e=>e.id)})]}):null,e.loadMore&&m?.notifications.pageInfo.nextCursor?(0,t.jsx)("div",{clsx:[ed.default.loadMoreContainer,{[ed.default.compact]:e.compact}],children:(0,t.jsx)(ec.Button,{text:p?"Loading...":"Load more",onClick:()=>{p||f({variables:{after:m&&m.notifications&&!s?m.notifications.pageInfo.nextCursor:null},updateQuery:(e,t)=>{if(!t||!t.fetchMoreResult)return e;let{fetchMoreResult:i}=t,n=e?e.notifications.items:[],o={...i};return o.notifications.items=[...n,...i.notifications.items],o}})},disabled:p})}):null]})]})}],286093);var em=e.i(914981),ep=e.i(908796),ef=e.i(712903),eh=e.i(255701),ex=e.i(195206),eg=e.i(334028),eN=e.i(177037),ej=e.i(596139),ey=e.i(294827),ev=e.i(776065),eC=e.i(926233),eI=e.i(983420),ew=e.i(295231);function eb({right:e,label:i,...n}){return(0,t.jsxs)(ew.BaseMenuItem,{textValue:i,...n,children:[(0,t.jsxs)(Z.View,{gap:6,pl:2,row:!0,align:"center",grow:!0,shrink:!0,children:[(0,t.jsx)(eI.IconProvider,{size:16,children:n.icon}),(0,t.jsx)(ew.MenuItemLabel,{children:i})]}),e??null]})}e.s(["MenuItemWithRightContent",0,eb],765185);var e_=e.i(648880),ek=e.i(919073),eT=e.i(638046);function eS({count:e,onAction:i}){return(0,t.jsx)(ew.BaseMenuItem,{textValue:"Notifications",onAction:i,children:(0,t.jsxs)(Z.View,{align:"center",row:!0,gap:6,justify:"space-between",grow:!0,shrink:!0,children:[(0,t.jsxs)(Z.View,{align:"center",grow:!0,shrink:!0,row:!0,gap:6,children:[(0,t.jsx)(e_.default,{}),(0,t.jsx)(Q.Text,{children:"Notifications"})]}),e?(0,t.jsx)(ek.ShadesSurface,{clsx:eT.default.count,colorShade:"themeError",align:"center",justify:"center",children:(0,t.jsx)(Q.Text,{variant:"small",children:e})}):null]})})}e.s(["AccountItems",0,function({currentUser:e,setActiveModal:i,notificationCount:n,isUnifiedPlanEnabled:o,onClose:r}){let a=(0,em.useRouter)(),s=(0,K.userLinkProps)(e),{shouldHidePersonalWorkspace:l}=(0,ey.usePersonalWorkspacesDisabled)();return(0,t.jsxs)(t.Fragment,{children:[o?(0,t.jsx)(ew.MenuItem,{label:"Settings",icon:(0,t.jsx)(eh.default,{}),onAction:()=>{(0,ev.updatePathWithQueryParams)({router:a,params:[{mode:"add",key:eC.SETTINGS_SHOW_PARAM,value:"true"}]}),r?.()}}):(0,t.jsx)(eb,{label:"Account",as:"/account",href:"/account",dataCy:"avatar-dropdown-account-link",icon:e.isMemberOfAnyOrg?(0,t.jsx)(eh.default,{}):(0,t.jsx)(J.Avatar,{size:16,src:e.image,username:e.username,fullName:e.fullName}),right:e.userSubscriptionType===ep.UserSubscriptionTypeEnum.HackerPro?(0,t.jsxs)(Z.View,{row:!0,align:"center",gap:4,children:[(0,t.jsx)(ef.default,{size:12,color:eN.brandOrange}),(0,t.jsx)(Q.Text,{variant:"small",color:"dimmer",translate:"no",children:ej.corePlanName})]}):null}),l||o?null:(0,t.jsx)(ew.MenuItem,{label:"Profile",as:s.as,href:s.href,dataCy:"avatar-dropdown-account-link",icon:(0,t.jsx)(eg.default,{})}),(0,t.jsx)(eS,{count:n,onAction:()=>{i("notifications")}}),(0,t.jsx)(ew.Separator,{}),(0,t.jsx)(ew.MenuItem,{label:"CLUI",as:"/~/cli",href:"/~/cli",icon:(0,t.jsx)(ex.default,{})}),(0,t.jsx)(ew.Separator,{})]})}],736372),e.i(711706);var eR=e.i(320216);e.s(["DevCopyUsernameItem",0,function({currentUser:e}){let{showConfirm:i}=(0,eR.default)();return(0,t.jsx)(t.Fragment,{children:null})}],556278);var eM=e.i(625251),eL=e.i(787527),eA=e.i(399245),e$=e.i(222878),eP=e.i(735362),eq=e.i(761201),eO=e.i(519979);function eU(){return(0,t.jsx)(ew.MenuItem,{icon:(0,t.jsx)(eO.default,{}),label:"Status",href:"https://status.replit.com"})}var eF=e.i(773222);e.s(["HelpItem",0,function({setActiveModal:e,children:i}){return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(eM.SubmenuTrigger,{children:[(0,t.jsx)(ew.BaseMenuItem,{textValue:"Help",children:(0,t.jsxs)(Z.View,{align:"center",row:!0,gap:6,justify:"space-between",grow:!0,shrink:!0,children:[(0,t.jsxs)(Z.View,{align:"center",grow:!0,shrink:!0,row:!0,gap:6,children:[(0,t.jsx)(e$.default,{}),(0,t.jsx)(Q.Text,{children:"Help"})]}),(0,t.jsx)(U.default,{size:12})]})}),(0,t.jsx)(eF.RawPopover,{offset:4,children:(0,t.jsx)(Z.View,{p:4,children:(0,t.jsxs)(ew.Menu,{"aria-label":"Help",children:[(0,t.jsx)(eU,{}),(0,t.jsx)(ew.MenuItem,{label:"Get help",icon:(0,t.jsx)(e$.default,{size:16}),onAction:()=>{e("support"),(0,F.track)(B.events.HELP_FORM_OPENED,{type:"New Help Form"})}}),(0,t.jsx)(ew.MenuItem,{icon:(0,t.jsx)(eA.default,{}),label:"Community Hub",href:eq.COMMUNITY_URL}),(0,t.jsx)(ew.MenuItem,{icon:(0,t.jsx)(eP.default,{}),label:"View updates",href:eq.LINKS_DOCS.CHANGELOG,onAction:()=>{(0,F.track)(B.events.CHANGELOG_OPENED)}}),(0,t.jsx)(ew.MenuItem,{icon:(0,t.jsx)(eL.default,{}),label:"Read the docs",href:eq.LINKS_DOCS.HOME,onAction:()=>{(0,F.track)(B.events.DOCS_OPENED,{source:"help_menu"})}}),i]})})})]})})}],566032)},70219,e=>{"use strict";var t=e.i(276385),i=e.i(408116),n=e.i(98346),o=e.i(443197),r=e.i(295231);e.s(["LogoutItem",0,function(){let e=(0,i.useApolloClient)();return(0,t.jsx)(r.MenuItem,{label:"Log out",icon:(0,t.jsx)(n.default,{}),onAction:async()=>{await (0,o.signOut)(e),window.location.href="/logout"}})}])},246613,e=>{"use strict";var t=e.i(276385),i=e.i(914981),n=e.i(625251),o=e.i(908796),r=e.i(183035),a=e.i(151027),s=e.i(320216),l=e.i(648552),c=e.i(294827),u=e.i(448942),d=e.i(276887),m=e.i(765185),p=e.i(825419),f=e.i(295231),h=e.i(8047),x=e.i(61732);e.s(["TeamsItem",0,function({currentUser:e}){let g=(0,a.useCurrentUserStoredOrgContext)(),{loading:N}=g,j=(0,l.useOrgSwitcher)(),{shouldHidePersonalWorkspace:y}=(0,c.usePersonalWorkspacesDisabled)(),v="CurrentUserOrganizationConnection"===e.orgs.__typename?e.orgs.items:null,{showError:C}=(0,s.default)(),I=(0,i.useRouter)();return!v?.length||N?null:(0,t.jsxs)(n.MenuSection,{children:[(0,t.jsx)(f.MenuHeader,{text:"Switch Workspace"}),y?null:(0,t.jsx)(m.MenuItemWithRightContent,{icon:(0,t.jsx)(p.Avatar,{size:16,src:e.image,username:e.username,fullName:e.fullName}),label:"Personal",onAction:()=>{j({type:o.OrgType.Personal}),I.push("/home","/~",{shallow:!1})},right:void 0===g.orgId?(0,t.jsx)(r.default,{}):void 0,selected:void 0===g.orgId}),v.map(({org:e,type:i})=>(0,t.jsxs)(f.BaseMenuItem,{textValue:e.name,onAction:()=>(e=>{if(!e.currentUserRole)return void C("Something went wrong, please try again.");j({type:o.OrgType.Team,id:e.id,slug:e.slug,orgRole:e.currentUserRole,orgDealContext:e.dealContext});let{home:t}=(0,u.orgLinks)({slug:e.slug});I.push(t.href,t.as)})(e),children:[(0,t.jsxs)(x.View,{grow:!0,shrink:!0,row:!0,gap:6,align:"center",children:[(0,t.jsx)(p.Avatar,{size:16,src:e.image??null,username:e.name,fullName:e.name}),(0,t.jsx)(h.Text,{translate:"no",children:e.name}),i?(0,t.jsx)(h.Text,{variant:"small",color:"dimmest",children:(0,d.orgGroupToDisplayName)(i)}):null]}),e.id===g.orgId?(0,t.jsx)(r.default,{}):null]},e.id)),(0,t.jsx)(f.Separator,{})]})}])},13465,e=>{"use strict";var t=e.i(276385),i=e.i(625251),n=e.i(927600),o=e.i(155119),r=e.i(759317),a=e.i(393428),s=e.i(308521),l=e.i(401036),c=e.i(841114),u=e.i(295231),d=e.i(773222),m=e.i(8047),p=e.i(61732);e.s(["ThemeItem",0,function(){let{currentTheme:e}=(0,l.useTheme)(),{setActiveTheme:f,isSystemTheme:h}=(0,c.useThemePreference)(),x="Custom";return h?x="System":"replitDark"===e.id?x="Dark":"replitLight"===e.id&&(x="Light"),(0,t.jsxs)(i.SubmenuTrigger,{children:[(0,t.jsx)(u.BaseMenuItem,{textValue:"Theme",children:(0,t.jsxs)(p.View,{align:"center",row:!0,gap:6,justify:"space-between",grow:!0,shrink:!0,children:[(0,t.jsxs)(p.View,{align:"center",grow:!0,shrink:!0,row:!0,gap:6,children:[(0,t.jsx)(a.default,{}),(0,t.jsx)(m.Text,{multiline:!1,children:"Theme"})]}),(0,t.jsxs)(p.View,{row:!0,gap:4,align:"center",children:[(0,t.jsx)(m.Text,{color:"dimmer",children:x}),(0,t.jsx)(n.default,{size:12})]})]})}),(0,t.jsx)(d.RawPopover,{offset:4,children:(0,t.jsx)(p.View,{p:4,children:(0,t.jsxs)(u.Menu,{"aria-label":"Theme",children:[(0,t.jsx)(u.MenuItem,{label:"Light",icon:(0,t.jsx)(s.default,{size:16}),onAction:()=>f("replitLight")}),(0,t.jsx)(u.MenuItem,{label:"Dark",icon:(0,t.jsx)(r.default,{size:16}),onAction:()=>f("replitDark")}),(0,t.jsx)(u.MenuItem,{label:"System",icon:(0,t.jsx)(o.default,{size:16}),onAction:()=>f("system")})]})})})]})}])}]);

//# debugId=a3593630-164d-bf48-fe9f-04c470838ce3
//# sourceMappingURL=0cg9vi.496wqn.js.map