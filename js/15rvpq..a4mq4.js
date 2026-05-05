;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="27d47ab1-f6d5-d6f2-b8a4-79651c1d1dc7")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,662704,e=>{"use strict";var t=e.i(968323);e.s(["isEligibleForUsageExplanationDetail",0,{NEEDS_PAYMENT_METHOD:"A payment method is required. Navigate to Account > Billing to resolve.",NEEDS_SUBSCRIPTION:"A subscription is required. Navigate to Account > Billing to resolve.",NEEDS_SUBSCRIPTION_OR_PAYMENT_METHOD:"Either a subscription or payment method is required. Navigate to Account > Billing to resolve.",NEEDS_SMS_VERIFICATION:"A verified phone number is required. Navigate to Account > Verification to resolve.",NEEDS_UNBANNING:"Your account currently has restrictions in place. Please reach out to support@replit.com for assistance.",INCLUDED_IN_SUBSCRIPTION:"Plan found.",HAS_PAYMENT_METHOD:"Payment method found.",INSUFFICIENT_BUDGET:"You've reached your monthly usage budget. Navigate to Account > Billing to increase your budget.",PAYMENT_DELINQUENT:"Your payment is past due. Please update your payment method to continue using Replit.",ENTERPRISE_EXEMPTION:"Enterprise deal orgs are exempt from suspension, banning, and payment method requirements.",USER_USAGE_ALERT_THRESHOLD_EXCEEDED:"You have reached your team's usage budget. Request a budget increase from your team admin.",GROUP_USAGE_ALERT_THRESHOLD_EXCEEDED:"You have reached your group's usage budget. Request a budget increase from your team admin."},"validateAlertThresholds",0,function(e,i){let r,n;return(null!==e&&e<.01&&(r="Usage alert value must be at least 0.01 or unset."),null!==i&&i<.01&&(n="Usage limit value must be at least 0.01 or unset."),null!==e&&null!==i&&i<=e&&(r=`Usage alert ($${e}) must be less than the usage budget ($${i}).`,n=`Usage budget ($${i}) must be greater than the usage alert ($${e}).`),r||n)?(0,t.Err)({softAlertError:r,hardAlertError:n}):(0,t.Ok)({softAlertValue:e,hardAlertValue:i})}])},730029,e=>{"use strict";var t=e.i(351623);let i=t.gql`
    fragment CoreSubscriptionPlanStatus on CurrentUser {
  hasCore: subscriptionIsType(subscriptionType: HACKER_PRO)
}
    `;e.s(["CoreSubscriptionPlanStatusFragmentDoc",0,i])},568644,e=>{"use strict";var t=e.i(351623),i=e.i(299020);let r={},n=t.gql`
    fragment EditUsageBasedBillingAlertsFormOrg on Org {
  id
  name
}
    `,a=t.gql`
    fragment EditUsageBasedBillingAlertsFormInitialConfig on CustomerAlerts {
  hardAlert {
    id
    threshold
  }
  softAlert {
    id
    threshold
  }
}
    `,s=t.gql`
    fragment EditUsageBasedBillingAlertsFormCustomerAlerts on Customer {
  id
  usageInterval {
    spendingControls {
      ... on CustomerSpendingControls {
        alerts {
          ...EditUsageBasedBillingAlertsFormInitialConfig
        }
      }
    }
  }
}
    ${a}`,l=t.gql`
    mutation EditUsageBasedBillingAlertsFormOrgUpdateAlerts($input: UpdateCustomerSpendingAlertsInput!) {
  updateCustomerSpendingAlerts(input: $input) {
    ... on Customer {
      id
      name
    }
    ... on Error {
      message
    }
  }
}
    `;e.s(["EditUsageBasedBillingAlertsFormCustomerAlertsFragmentDoc",0,s,"EditUsageBasedBillingAlertsFormOrgFragmentDoc",0,n,"useEditUsageBasedBillingAlertsFormOrgUpdateAlertsMutation",0,function(e){let t={...r,...e};return i.useMutation(l,t)}])},599200,e=>{e.v({budgetInput:"BudgetInput-module__VvBYpa__budgetInput",closeButton:"BudgetInput-module__VvBYpa__closeButton",inputContainer:"BudgetInput-module__VvBYpa__inputContainer",inputIcon:"BudgetInput-module__VvBYpa__inputIcon"})},89807,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(330666),n=e.i(602686),a=e.i(983420),s=e.i(706323),l=e.i(416298),o=e.i(528710),d=e.i(33583),u=e.i(108431),c=e.i(61732),g=e.i(599200);e.s(["BudgetInput",0,({type:e,value:m,label:p,error:h,onChange:f})=>{let x=(0,i.useId)(),C=(0,i.useId)();return(0,t.jsxs)(c.View,{gap:8,children:[p?(0,t.jsx)(d.Label,{color:"dimmer",htmlFor:x,children:p}):null,(0,t.jsxs)(c.View,{clsx:g.default.inputContainer,children:[(0,t.jsxs)(a.default,{alt:"Dollars",clsx:g.default.inputIcon,children:[(0,t.jsx)(s.default,{size:24}),(0,t.jsx)(r.VisuallyHidden,{children:"Dollars"})]}),(0,t.jsx)(o.Input,{id:x,type:"number",min:0,value:m,clsx:g.default.budgetInput,"aria-describedby":C,onChange:e=>f(e.target.value)}),m?(0,t.jsx)(c.View,{clsx:g.default.closeButton,onClick:()=>f(""),role:"button",tabIndex:0,"aria-label":`Clear monthly usage ${"hard"===e?"limit":"alert"}`,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),f(""))},children:(0,t.jsx)(n.default,{size:16})}):null]}),h?(0,t.jsx)(u.StatusBanner,{id:C,icon:(0,t.jsx)(l.default,{}),text:h,colorway:"negative"}):null]})}])},961998,e=>{"use strict";var t=e.i(351623),i=e.i(730029),r=e.i(568644),n=e.i(344480);e.i(975473);let a={},s=t.gql`
    fragment UsageOverviewCurrentUserPlanStatus on CurrentUser {
  id
  ...CoreSubscriptionPlanStatus
}
    ${i.CoreSubscriptionPlanStatusFragmentDoc}`,l=t.gql`
    fragment UsageOverviewCurrentUser on CurrentUser {
  id
  ...UsageOverviewCurrentUserPlanStatus
  customer {
    ...EditUsageBasedBillingAlertsFormCustomerAlerts
  }
  paymentMethod {
    ... on PaymentMethod {
      id
      last4
      expirationMonth
      expirationYear
    }
  }
  billingInfo {
    planInfo {
      amount
      interval
    }
  }
  usageBasedBillingBudget {
    ... on UsageBasedBillingBudget {
      id
      hasReachedBudget
    }
    ... on UnauthorizedError {
      message
    }
  }
  usageBasedBilling {
    __typename
    ... on UserUsageBasedBillingSummary {
      capabilities {
        hasOrbCustomer
      }
    }
  }
  usageInterval {
    ... on UsageInterval {
      __typename
      startDate
      endDate
      totalAmountUsd
      subtotalAmountUsd
      planDiscountUsd
      credits {
        ... on Credits {
          availableAdditionalCredits
          availableSubscriptionCredits
          totalGrantedAdditionalCredits
          totalGrantedSubscriptionCredits
        }
        ... on Error {
          message
        }
      }
    }
  }
}
    ${s}
${r.EditUsageBasedBillingAlertsFormCustomerAlertsFragmentDoc}`,o=t.gql`
    query UsageOverviewCurrentUser {
  currentUser {
    id
    username
    timeCreated
    isSubscribed
    ...UsageOverviewCurrentUser
  }
}
    ${l}`,d=t.gql`
    query UserDetailedCredits {
  currentUser {
    id
    usageInterval {
      ... on UsageInterval {
        __typename
        detailedCredits {
          ... on DetailedCredits {
            totalRemainingCredits
            totalUsedCredits
            remainingCreditsByType {
              subscription
              creditPackPurchase
              referral
              gift
              additional
            }
            usedCreditsByType {
              subscription
              creditPackPurchase
              referral
              gift
              additional
            }
            creditBlocksByType {
              creditPackPurchase {
                blockId
                creditType
                currentBalance
                effectiveDate
                expiryDate
                initialBalance
              }
              referral {
                blockId
                creditType
                currentBalance
                effectiveDate
                expiryDate
                initialBalance
              }
              gift {
                blockId
                creditType
                currentBalance
                effectiveDate
                expiryDate
                initialBalance
              }
            }
          }
          ... on Error {
            message
          }
        }
      }
    }
  }
}
    `;e.s(["UsageOverviewCurrentUserDocument",0,o,"useUsageOverviewCurrentUserQuery",0,function(e){let t={...a,...e};return n.useQuery(o,t)},"useUserDetailedCreditsQuery",0,function(e){let t={...a,...e};return n.useQuery(d,t)}])},935126,e=>{"use strict";var t=e.i(351623),i=e.i(568644);let r=t.gql`
    fragment TotalUsageOrg on Org {
  id
  ...EditUsageBasedBillingAlertsFormOrg
  customer {
    ... on Customer {
      ...EditUsageBasedBillingAlertsFormCustomerAlerts
    }
    ... on Error {
      message
    }
  }
}
    ${i.EditUsageBasedBillingAlertsFormOrgFragmentDoc}
${i.EditUsageBasedBillingAlertsFormCustomerAlertsFragmentDoc}`;var n=e.i(344480);e.i(975473);let a={},s=t.gql`
    fragment OrgUsageBillingAlertsConfig on UsageBasedBillingAlertsConfig {
  hardAlert {
    id
    threshold
  }
  softAlert {
    id
    threshold
  }
  globalAlert {
    id
    threshold
  }
  groupAlerts {
    id
    groupId
    threshold
    group {
      id
      name
    }
  }
}
    `,l=t.gql`
    fragment OrgUsagePeriodInformation on UsageInterval {
  startDate
  endDate
  totalAmountUsd
  subtotalAmountUsd
  credits {
    ... on Credits {
      availableAdditionalCredits
      availableSubscriptionCredits
      totalGrantedAdditionalCredits
      totalGrantedSubscriptionCredits
    }
    ... on Error {
      message
    }
  }
}
    `,o=t.gql`
    fragment OrgUsageAuthorizations on OrgAuthorizations {
  viewSubscription {
    isAuthorized
    message
  }
  viewUsage {
    isAuthorized
    message
  }
  viewUsageAlerts {
    isAuthorized
    message
  }
  editUsageAlerts {
    isAuthorized
    message
  }
  editUsageLimit {
    isAuthorized
    message
  }
}
    `,d=t.gql`
    fragment OrgUsageBasedBillingBudget on UsageBasedBillingBudget {
  id
  hasReachedBudget
}
    `,u=t.gql`
    query OrgUsagePeriodInformation($orgId: String!) {
  currentUser {
    id
    org(orgId: $orgId) {
      __typename
      ... on Org {
        id
        ...TotalUsageOrg
        usageInterval {
          ... on UsageInterval {
            ...OrgUsagePeriodInformation
          }
          ... on Error {
            message
          }
        }
        paymentMethod {
          ... on PaymentMethod {
            __typename
            id
          }
          ... on Error {
            message
          }
        }
        usageBasedBillingBudget {
          ... on UsageBasedBillingBudget {
            ...OrgUsageBasedBillingBudget
          }
          ... on Error {
            message
          }
        }
        usageBasedBillingAlerts {
          ... on UsageBasedBillingAlertsConfig {
            ...OrgUsageBillingAlertsConfig
          }
          ... on Error {
            message
          }
        }
        planInfo {
          __typename
          ... on OrgPlanInfo {
            name
            planId
            planEndDate
            planStartDate
          }
          ... on Error {
            message
          }
        }
        authorizations {
          ...OrgUsageAuthorizations
        }
      }
    }
  }
}
    ${r}
${l}
${d}
${s}
${o}`,c=t.gql`
    query OrgDetailedCredits($orgId: String!) {
  currentUser {
    id
    org(orgId: $orgId) {
      __typename
      ... on Org {
        id
        usageInterval {
          ... on UsageInterval {
            __typename
            detailedCredits {
              ... on DetailedCredits {
                totalRemainingCredits
                totalUsedCredits
                remainingCreditsByType {
                  subscription
                  creditPackPurchase
                  referral
                  gift
                  additional
                }
                usedCreditsByType {
                  subscription
                  creditPackPurchase
                  referral
                  gift
                  additional
                }
                creditBlocksByType {
                  creditPackPurchase {
                    blockId
                    creditType
                    currentBalance
                    effectiveDate
                    expiryDate
                    initialBalance
                  }
                  referral {
                    blockId
                    creditType
                    currentBalance
                    effectiveDate
                    expiryDate
                    initialBalance
                  }
                  gift {
                    blockId
                    creditType
                    currentBalance
                    effectiveDate
                    expiryDate
                    initialBalance
                  }
                }
              }
              ... on Error {
                message
              }
            }
          }
        }
      }
    }
  }
}
    `;e.s(["OrgUsageBillingAlertsConfigFragmentDoc",0,s,"OrgUsagePeriodInformationDocument",0,u,"useOrgDetailedCreditsQuery",0,function(e){let t={...a,...e};return n.useQuery(c,t)},"useOrgUsagePeriodInformationQuery",0,function(e){let t={...a,...e};return n.useQuery(u,t)}],935126)},52464,e=>{e.v({budgetForm:"ReachedHardAlertLimit-module__jxr0eq__budgetForm",usageList:"ReachedHardAlertLimit-module__jxr0eq__usageList"})},983217,966081,408699,e=>{"use strict";var t=e.i(276385),i=e.i(261348),r=e.i(336187),n=e.i(76112),a=e.i(89807),s=e.i(389959),l=e.i(961998),o=e.i(351623),d=e.i(299020);let u={},c=o.gql`
    fragment CustomerSpendingAlertsInitialConfig on CustomerAlerts {
  softAlert {
    id
    threshold
  }
  hardAlert {
    id
    threshold
  }
}
    `,g=o.gql`
    mutation EditCustomerSpendingAlerts($input: UpdateCustomerSpendingAlertsInput!) {
  updateCustomerSpendingAlerts(input: $input) {
    ... on Customer {
      id
      name
    }
    ... on Error {
      message
    }
  }
}
    `;function m(e){let t={...u,...e};return d.useMutation(g,t)}e.s(["CustomerSpendingAlertsInitialConfigFragmentDoc",0,c,"EditCustomerSpendingAlertsDocument",0,g,"useEditCustomerSpendingAlertsMutation",0,m],966081);var p=e.i(935126),h=e.i(662704),f=e.i(371884),x=e.i(320216);function C(e,t){let i=e.trim(),r=t.trim(),n=""!==i?Number.parseFloat(i):null,a=""!==r?Number.parseFloat(r):null;return null!=n&&Number.isNaN(n)||null!=a&&Number.isNaN(a)?{ok:!1,error:{softAlertError:Number.isNaN(n)?"Please enter a number":void 0,hardAlertError:Number.isNaN(a)?"Please enter a number":void 0}}:(0,h.validateAlertThresholds)(n,a)}function y({customerId:e,initialSettings:t,onDone:i}){let r=t?.softAlert?.threshold.toString()??"",n=t?.hardAlert?.threshold.toString()??"",a=(0,f.useFormField)(r,e=>{let t=C(e,o.value);if(!t.ok&&t.error.softAlertError)return{severity:"error",message:t.error.softAlertError}}),o=(0,f.useFormField)(n,e=>{let t=C(a.value,e);if(!t.ok&&t.error.hardAlertError)return{severity:"error",message:t.error.hardAlertError}}),{showConfirm:d,showError:u}=(0,x.default)(),c=a.validate,g=o.validate;(0,s.useEffect)(()=>{c(),g()},[a.value,o.value,c,g]);let[h,B]=m({onError(e){u(e.message)},onCompleted(e){"Customer"!==e.updateCustomerSpendingAlerts.__typename?u(e.updateCustomerSpendingAlerts.message):(d("Updated usage settings"),i())},refetchQueries:[l.UsageOverviewCurrentUserDocument,p.OrgUsagePeriodInformationDocument]});return{saveAlerts:()=>{if(a.validate()||o.validate())return;let t=C(a.value,o.value);t.ok&&h({variables:{input:{customerId:e,softAlertThreshold:t.value.softAlertValue,hardAlertThreshold:t.value.hardAlertValue}}})},softAlertField:a,hardAlertField:o,loading:B.loading}}e.s(["useEditCustomerSpendingAlertsForm",0,y],408699);var B=e.i(480028),_=e.i(643484),b=e.i(190545),v=e.i(827320),A=e.i(108431),U=e.i(8047),S=e.i(61732),j=e.i(52464);function D(e){let{hardAlertField:i,saveAlerts:r,loading:n}=y(e);return(0,t.jsxs)(b.Form,{clsx:j.default.budgetForm,onSubmit:e=>{e.preventDefault(),r()},children:[(0,t.jsx)(a.BudgetInput,{type:"hard",value:i.value,onChange:i.setValue,error:i.error?.message,label:"Usage budget"}),(0,t.jsx)(_.Button,{type:"submit",text:"Save",colorway:"primary",loading:n})]})}e.s(["ReachedHardBudgetLimit",0,function({billingPeriodEndDate:e,initialSettings:a,customerId:s,customerName:l,totalRemainingCredits:o,onDone:d}){return(0,t.jsxs)(S.View,{p:16,gap:16,children:[(0,t.jsxs)(S.View,{row:!0,gap:8,align:"center",children:[(0,t.jsx)(n.default,{size:20,color:B.tokens.accentNegativeDefault}),(0,t.jsx)(U.Text,{variant:"subheadDefault",children:"Usage budget reached"})]}),(0,t.jsxs)(S.View,{gap:16,children:[(0,t.jsxs)(U.Text,{children:[`Your account, ${l}, has reached its usage budget.`," All services have been suspended and will remain unavailable until you increase your budget or usage resets",e?` on ${(0,i.format)(new Date(e),"MMM do, hh:mm aaa")}`:" when your billing period ends","."]}),(0,t.jsxs)(v.Prose,{children:[(0,t.jsx)(U.Text,{children:"What this means:"}),(0,t.jsxs)("ul",{clsx:j.default.usageList,children:[(0,t.jsx)("li",{children:"Agent access, cloud services and deployments are halted."}),(0,t.jsx)("li",{children:"Active deployments are offline and inaccessible."})]})]}),(0,t.jsx)(U.Text,{children:"Increase your usage budget now to immediately restore services and avoid further disruptions."}),o>0&&(0,t.jsx)(A.StatusBanner,{icon:(0,t.jsx)(r.default,{size:20}),text:(0,t.jsxs)(S.View,{gap:4,children:[(0,t.jsx)(S.View,{children:(0,t.jsxs)(U.Text,{children:["You have $",o," unused free credits available. You can utilize these credits once you increase your budget limit."]})}),(0,t.jsx)(S.View,{children:(0,t.jsx)(U.Text,{variant:"small",color:"dimmer",children:"Credits apply immediately when services resume."})})]})}),(0,t.jsx)(D,{customerId:s,initialSettings:a,onDone:d})]})]})}],983217)},686337,e=>{e.v({endPlaceholder:"MultiStepDialog-module__Flqloa__endPlaceholder",loadingContainer:"MultiStepDialog-module__Flqloa__loadingContainer",root:"MultiStepDialog-module__Flqloa__root",startPlaceholder:"MultiStepDialog-module__Flqloa__startPlaceholder",stepBubble:"MultiStepDialog-module__Flqloa__stepBubble",stepContainer:"MultiStepDialog-module__Flqloa__stepContainer",stepContainerRoomy:"MultiStepDialog-module__Flqloa__stepContainerRoomy"})},325173,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(138716),n=e.i(752539),a=e.i(269848),s=e.i(480028),l=e.i(643484),o=e.i(244945),d=e.i(61732),u=e.i(686337);let c=(0,i.createContext)(null);function g({onNextStep:e,nextButtonProps:i,onPrevStep:a,prevButtonProps:s,stepProgress:c,footerLeading:m}){if(null!=m){let g=c.current>0&&!0!==s.hidden,h=c.current<c.total&&!0!==i.hidden;return(0,t.jsxs)(d.View,{pt:24,row:!0,align:"center",gap:8,children:[(0,t.jsx)(d.View,{grow:!0,shrink:!0,basis:0,row:!0,justify:"start",align:"center",children:g?(0,t.jsx)(o.Tooltip,{isDisabled:!s.disabled||!s.disabledReason,tooltip:s.disabledReason,children:(0,t.jsx)(l.Button,{iconLeft:(0,t.jsx)(r.default,{}),text:"Back",...s,onClick:e=>{s.onClick?.(e),a()}},"prev-step-button")}):m}),(0,t.jsx)(p,{currentStep:c.current,totalSteps:c.total}),(0,t.jsx)(d.View,{grow:!0,shrink:!0,basis:0,row:!0,justify:"end",align:"center",children:h?(0,t.jsx)(o.Tooltip,{isDisabled:!i.disabled||!i.disabledReason,tooltip:i.disabledReason,children:(0,t.jsx)(l.Button,{iconRight:(0,t.jsx)(n.default,{}),colorway:"primary",type:"submit",text:"Continue",...i,onClick:t=>{i.onClick?.(t),e()}},"next-step-button")}):(0,t.jsx)(d.View,{clsx:u.default.endPlaceholder})})]})}return(0,t.jsxs)(d.View,{pt:16,row:!0,justify:"space-between",children:[0===c.current||s.hidden?(0,t.jsx)(d.View,{clsx:u.default.startPlaceholder}):(0,t.jsx)(o.Tooltip,{isDisabled:!s.disabled||!s.disabledReason,tooltip:s.disabledReason,children:(0,t.jsx)(l.Button,{iconLeft:(0,t.jsx)(r.default,{}),text:"Back",...s,onClick:e=>{s.onClick?.(e),a()}},"prev-step-button")}),(0,t.jsx)(p,{currentStep:c.current,totalSteps:c.total}),c.current===c.total||i.hidden?(0,t.jsx)(d.View,{clsx:u.default.endPlaceholder}):(0,t.jsx)(o.Tooltip,{isDisabled:!i.disabled||!i.disabledReason,tooltip:i.disabledReason,children:(0,t.jsx)(l.Button,{iconRight:(0,t.jsx)(n.default,{}),colorway:"primary",type:"submit",text:"Continue",...i,onClick:t=>{i.onClick?.(t),e()}},"next-step-button")})]})}let m={backgroundColor:s.tokens.accentPrimaryDefault,filter:`drop-shadow(0px 0px 6px ${s.tokens.accentPrimaryDefault})`};function p({currentStep:e,totalSteps:i}){return(0,t.jsx)(d.View,{row:!0,gap:4,justify:"center",align:"center",children:Array.from({length:i},(i,r)=>(0,t.jsx)(d.View,{clsx:u.default.stepBubble,style:r===e?m:void 0},r))})}e.s(["default",0,function(e){let{children:r,onNextStep:n,onPrevStep:s,stepIndex:l,loading:o,stepProgress:m,nextButtonProps:p,prevButtonProps:h,contentContainerClassName:f,footerLeading:x}=e,C=i.Children.toArray(r),y=m??{current:l,total:C.length},[B,_]=(0,i.useState)({}),[b,v]=(0,i.useState)({}),A={...p,...B},U={...h,...b};function S(){_({}),v({})}let j=(0,i.useMemo)(()=>({setNextButtonProps:_,setPrevButtonProps:v}),[]);if(l<0||l>=C.length)throw Error("Invalid step index");return(0,t.jsx)(c.Provider,{value:j,children:(0,t.jsx)(d.View,{clsx:u.default.root,grow:!0,shrink:!0,children:o?(0,t.jsx)(d.View,{clsx:u.default.loadingContainer,children:(0,t.jsx)(a.default,{})}):(0,t.jsxs)(d.View,{clsx:null!=x?u.default.stepContainerRoomy:u.default.stepContainer,className:f,children:[C[l],(0,t.jsx)(g,{onNextStep:function(){S(),null==A.onClick&&n()},onPrevStep:function(){S(),null==U.onClick&&s()},nextButtonProps:A,prevButtonProps:U,stepProgress:y,footerLeading:x})]})})})},"useDefaultStepNavigation",0,function(){let[e,t]=(0,i.useState)(0);return{stepIndex:e,handleNextStep:(0,i.useCallback)(()=>t(e=>e+1),[]),handlePrevStep:(0,i.useCallback)(()=>t(e=>e-1),[])}},"useDialogStep",0,function({nextButtonProps:e,prevButtonProps:t}){let r=(0,i.useContext)(c);if(null==r)throw Error("useDialogStep must be used within a MultiStepDialog");let{setNextButtonProps:n,setPrevButtonProps:a}=r;(0,i.useEffect)(()=>{null!=e&&n(e)},[n,e]),(0,i.useEffect)(()=>{null!=t&&a(t)},[a,t])}])},651241,e=>{e.v({bodyText:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__bodyText",headerGrid:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__headerGrid",headerIconWrap:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__headerIconWrap",headline:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__headline",heroFrame:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__heroFrame",heroImage:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__heroImage",heroLoadingOverlay:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__heroLoadingOverlay",subline:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__subline",sublineRow:"ReachedMonthlyCreditLimitRedesign-module__S3J11q__sublineRow"})},337807,e=>{"use strict";var t=e.i(276385),i=e.i(389959),r=e.i(370589),n=e.i(752539),a=e.i(269848),s=e.i(76112),l=e.i(480028),o=e.i(325173),d=e.i(8047),u=e.i(61732),c=e.i(651241);e.s(["ReachedMonthlyCreditLimitRedesign",0,function({billingPeriodEndDate:e,appPreviewImageUrl:g,appPreviewImageLoading:m=!1}){(0,o.useDialogStep)({nextButtonProps:{text:"Keep building",iconRight:(0,t.jsx)(n.default,{})}});let p=(0,r.default)(new Date(e),"MMM do, hh:mm aaa"),h=!!g,[f,x]=(0,i.useState)(!1),[C,y]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{x(!1),y(!1)},[g]),(0,t.jsxs)(u.View,{gap:20,children:[(0,t.jsxs)(u.View,{clsx:c.default.headerGrid,children:[(0,t.jsx)(u.View,{clsx:c.default.headerIconWrap,children:(0,t.jsx)(s.default,{"aria-hidden":!0,color:l.tokens.foregroundDefault,size:18})}),(0,t.jsx)(d.Text,{clsx:c.default.headline,variant:"subheadDefault",children:"Look at you go! You've used your credits."}),(0,t.jsx)(u.View,{clsx:c.default.sublineRow,children:(0,t.jsx)(d.Text,{clsx:c.default.subline,variant:"text",color:"dimmer",children:"Continue building and only pay for what you use."})})]}),m||h&&!C?(0,t.jsxs)(u.View,{clsx:c.default.heroFrame,br:12,children:[h&&!C?(0,t.jsx)("img",{alt:"",className:c.default.heroImage,decoding:"async",src:g,style:{opacity:+!!f},onError:()=>y(!0),onLoad:()=>x(!0)}):null,m||h&&!C&&!f?(0,t.jsx)(u.View,{clsx:c.default.heroLoadingOverlay,align:"center",justify:"center",children:(0,t.jsx)(a.default,{size:24,color:l.tokens.foregroundDimmer})}):null]}):null,(0,t.jsxs)(d.Text,{clsx:c.default.bodyText,color:"dimmer",children:["From this point on, all usage will be pay-as-you-go. Monthly credits will be added on ",p,"."]})]})}])},617299,e=>{e.v({viewUsagePageButton:"ReachedSoftAlertLimit-module__GKWBFq__viewUsagePageButton"})},591082,e=>{"use strict";var t=e.i(276385),i=e.i(76112),r=e.i(419635),n=e.i(8047),a=e.i(61732),s=e.i(617299);e.s(["ReachedSoftAlertLimit",0,({orgSlug:e,customerName:l,threshold:o,onDone:d})=>{let u=e?`/t/${e}/usage`:"/usage",c=o.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2});return(0,t.jsxs)(a.View,{p:16,gap:16,children:[(0,t.jsxs)(a.View,{row:!0,gap:8,align:"center",children:[(0,t.jsx)(i.default,{size:20}),(0,t.jsx)(n.Text,{variant:"subheadDefault",children:"You've hit your usage alert"})]}),(0,t.jsxs)(n.Text,{children:[`Your account, ${l}, has spent ${c} beyond its included credits - the alert threshold you set. This is just a notification; your services are still active and you can continue using Replit on a pay-as-you-go basis.`," "]}),(0,t.jsx)(n.Text,{children:"To set a hard usage budget or adjust this alert, visit the Usage Page."}),(0,t.jsx)(r.ButtonLink,{iconLeft:(0,t.jsx)(i.default,{}),text:"View usage page",href:u,clsx:s.default.viewUsagePageButton,onClick:d})]})}])},726979,e=>{e.v({header:"ReachedMonthlyCreditLimit-module__RGotgG__header",headerText:"ReachedMonthlyCreditLimit-module__RGotgG__headerText",learnMoreLink:"ReachedMonthlyCreditLimit-module__RGotgG__learnMoreLink",monthlyCreditsBar:"ReachedMonthlyCreditLimit-module__RGotgG__monthlyCreditsBar",monthlyCreditsHeaderText:"ReachedMonthlyCreditLimit-module__RGotgG__monthlyCreditsHeaderText",root:"ReachedMonthlyCreditLimit-module__RGotgG__root",usageList:"ReachedMonthlyCreditLimit-module__RGotgG__usageList"})},902782,e=>{"use strict";var t=e.i(276385),i=e.i(914981),r=e.i(389959),n=e.i(830675),a=e.i(252204),s=e.i(336187),l=e.i(761201),o=e.i(983217),d=e.i(370589),u=e.i(269848),c=e.i(76112),g=e.i(845822),m=e.i(89807),p=e.i(408699),h=e.i(643484),f=e.i(190545),x=e.i(827320),C=e.i(8047),y=e.i(61732),B=e.i(726979);function _({billingPeriodEndDate:e,customerName:i}){return(0,t.jsxs)(y.View,{p:16,gap:16,children:[(0,t.jsxs)(y.View,{clsx:B.default.header,children:[(0,t.jsx)(c.default,{size:20}),(0,t.jsx)(C.Text,{variant:"subheadDefault",clsx:B.default.headerText,children:"Your included credits have been used"})]}),(0,t.jsxs)(y.View,{gap:2,children:[(0,t.jsxs)(y.View,{row:!0,gap:8,align:"center",children:[(0,t.jsx)(C.Text,{clsx:B.default.monthlyCreditsHeaderText,children:"Credits"}),(0,t.jsx)(C.Text,{variant:"small",color:"dimmest",children:"100% used"})]}),(0,t.jsx)(y.View,{clsx:B.default.monthlyCreditsBar,br:4})]}),(0,t.jsxs)(x.Prose,{children:[(0,t.jsxs)(C.Text,{children:["Your account, ",i,", has used all its included credits. From this point on, any usage will be billed to your payment method on a pay-as-you-go basis."]}),(0,t.jsxs)("ul",{clsx:B.default.usageList,children:[(0,t.jsxs)("li",{children:["Variable pricing per Agent ",g.AGENT_USAGE_UNIT]}),(0,t.jsx)("li",{children:"Additional costs for deployments, object storage, and outbound data transfer may apply"})]})]}),(0,t.jsxs)(C.Text,{color:"dimmer",children:["Monthly credits will reset on"," ",(0,d.default)(new Date(e),"MMM do, hh:mm aaa"),"."]}),(0,t.jsx)(y.View,{row:!0,gap:8,align:"center",justify:"space-between",children:(0,t.jsxs)(y.View,{tag:"a",clsx:B.default.learnMoreLink,row:!0,gap:4,align:"center",target:"_blank",href:l.LINKS_DOCS.AGENT_ASSISTANT_BILLING,children:["Learn more about usage-based billing ",(0,t.jsx)(a.default,{})]})})]})}function b({hasPreviousUsageAlert:e,softAlertField:i,saveAlerts:r,loading:n}){return(0,t.jsxs)(f.Form,{clsx:B.default.root,onSubmit:e=>{e.preventDefault(),r()},children:[(0,t.jsx)(y.View,{clsx:B.default.header,children:(0,t.jsx)(C.Text,{variant:"subheadDefault",clsx:B.default.headerText,children:e?"Would you like to edit your usage alert?":"Would you like to set a usage alert?"})}),(0,t.jsx)(C.Text,{children:"You can stay on top of your spending by setting a usage alert. Choose an amount, and we'll notify you if your spending reaches it — no interruptions, just a helpful heads-up."}),(0,t.jsx)(m.BudgetInput,{type:"soft",value:i.value,onChange:i.setValue,error:i.error?.message,label:"Usage alert"}),(0,t.jsx)(y.View,{row:!0,children:(0,t.jsx)(h.Button,{type:"submit",text:"Set usage alert",colorway:"primary",loading:n,iconLeft:n?(0,t.jsx)(u.default,{}):void 0,stretch:!1})})]})}function v(e){let i=!!e.initialSettings?.softAlert,{softAlertField:r,saveAlerts:n,loading:a}=(0,p.useEditCustomerSpendingAlertsForm)(e);return(0,t.jsx)(b,{hasPreviousUsageAlert:i,softAlertField:r,saveAlerts:n,loading:a})}var A=e.i(337807),U=e.i(591082),S=e.i(943427),j=e.i(908796),D=e.i(351623),I=e.i(344480);e.i(975473);let w={},E=D.gql`
    query LiveReplAppPreviewUrl($replId: String!) {
  repl(id: $replId) {
    ... on Repl {
      id
      latestAgentScreenshotUrl
      latestAgentStatus {
        statusV2
        appImageUrl
      }
      artifacts {
        artifactId
        kind
        latestScreenshotUri
      }
    }
  }
}
    `,R=D.gql`
    query RecentReplAppPreview($count: Int!) {
  recentRepls(count: $count) {
    id
    latestAgentScreenshotUrl
    latestAgentStatus {
      statusV2
      appImageUrl
    }
    artifacts {
      artifactId
      kind
      latestScreenshotUri
    }
  }
}
    `;var N=e.i(796424);let P=new Set(["/replEnvironmentDesktop","/replEnvironmentMobile","/replView"]);function T(e){if(null==e||e.latestAgentStatus?.statusV2===j.AgentStatusV2.PausedWithError)return null;let t=(e.artifacts??[]).filter(e=>(0,S.isArtifactKindPreviewable)(e.kind??"web")).map(e=>e.latestScreenshotUri).find(e=>null!=e&&""!==e);if(t)return t;let i=e.latestAgentScreenshotUrl?.trim();return i||(e.latestAgentStatus?.appImageUrl?.trim()??null)}var k=e.i(966081),M=e.i(846545),q=e.i(299020);let L={},O=D.gql`
    fragment UsageBasedBillingAlertNotification on UsageBasedBillingAlertNotification {
  id
  threshold
  billingPeriodEnd
  alert {
    id
    threshold
    alertActionType
  }
  customer {
    id
    name
    usageInterval {
      spendingControls {
        ... on CustomerSpendingControls {
          alerts {
            ...CustomerSpendingAlertsInitialConfig
          }
        }
      }
      credits {
        ... on CustomerCredits {
          totalRemainingCredits
        }
      }
    }
    orgs {
      ... on OrgConnection {
        items {
          id
          slug
        }
      }
    }
  }
  user {
    id
  }
}
    ${k.CustomerSpendingAlertsInitialConfigFragmentDoc}`,V=D.gql`
    subscription UBBAlertNotifications {
  usageBasedBillingAlertNotifications {
    id
    ...UsageBasedBillingAlertNotification
  }
}
    ${O}`,F=D.gql`
    query UsageBasedBillingAlertCurrentUser {
  currentUser {
    ... on CurrentUser {
      id
      customer {
        id
      }
    }
  }
}
    `,$=D.gql`
    mutation DismissUBBAlertNotification($input: UpdateUbbAlertNotificationInput!) {
  updateUbbAlertNotification(input: $input) {
    ... on UsageBasedBillingAlertNotification {
      id
      isDismissed
    }
    ... on Error {
      message
    }
  }
}
    `,G={},Y=D.gql`
    fragment UsageBasedBillingCreditBalanceDepletedNotification on UsageBasedBillingCreditBalanceDepletedNotification {
  id
  billingPeriodEnd
  customer {
    id
    name
    usageInterval {
      spendingControls {
        ... on CustomerSpendingControls {
          alerts {
            ...CustomerSpendingAlertsInitialConfig
          }
        }
      }
    }
  }
}
    ${k.CustomerSpendingAlertsInitialConfigFragmentDoc}`,z=D.gql`
    subscription UBBCreditDepletedNotifications {
  usageBasedBillingCreditBalanceDepletedNotifications {
    id
    ...UsageBasedBillingCreditBalanceDepletedNotification
  }
}
    ${Y}`,H=D.gql`
    query UsageBasedBillingCreditBalanceDepletedCurrentUser {
  currentUser {
    ... on CurrentUser {
      id
      customer {
        id
      }
    }
  }
}
    `,Q=D.gql`
    mutation DismissUBBCreditBalanceDepletedNotification($input: UpdateUbbCreditBalanceDepletedNotificationInput!) {
  updateUbbCreditBalanceDepletedNotification(input: $input) {
    ... on UsageBasedBillingCreditBalanceDepletedNotification {
      id
      isDismissed
    }
    ... on Error {
      message
    }
  }
}
    `;var J=e.i(476601),K=e.i(528326),W=e.i(325173),X=e.i(242599),Z=e.i(933302);function ee(e){let t=e.customer?.usageInterval?.spendingControls;if(t?.__typename==="CustomerSpendingControls")return t.alerts}function et({notification:e,creditDepletedCustomerId:n,isPersonalCustomer:o,onDismissCreditBalanceDepletedNotifications:d}){let[u,c]=(0,r.useState)(0),g=(0,Z.useExperimentParam)("core_monthly_credit_exhausted_modal_redesign_2026_04","show_celebratory_modal",!1)&&o,{url:m,loading:p}=function(e){var t,n;let a,s,l=function(){let e=(0,r.useContext)(N.default),t=(0,i.useRouter)();if(null!=e)return e;if(!P.has(t.pathname))return null;let n=t.query.replId;return null==n?null:Array.isArray(n)?n[0]??null:String(n)}(),{data:o,loading:d}=(t={variables:{count:1},skip:e.skip,fetchPolicy:"cache-first",nextFetchPolicy:"cache-first"},a={...w,...t},I.useQuery(R,a)),{data:u,loading:c}=(n={variables:{replId:l??""},skip:e.skip||null==l},s={...w,...n},I.useQuery(E,s)),g=(0,r.useMemo)(()=>{let e=o?.recentRepls?.[0],t=e?T(e):null;if(t)return t;let i=u?.repl;return i?.__typename!=="Repl"?null:T(i)},[o?.recentRepls,u?.repl]);return{url:g,loading:null==g&&(d||c),replId:l}}({skip:!g}),h=e=>{1!==u||o?2===u&&o?e():c(e=>e+1):e()};return(0,t.jsx)(K.Modal,{isOpen:!0,onRequestClose:()=>d(e.id),noPadding:!0,maxWidth:"600px",children:(0,t.jsxs)(W.default,{stepIndex:u,onNextStep:()=>h(()=>{d(e.id)}),onPrevStep:()=>void c(e=>e-1),footerLeading:g?(0,t.jsxs)(y.View,{tag:"a",row:!0,gap:4,align:"center",target:"_blank",href:l.LINKS_DOCS.AGENT_ASSISTANT_BILLING,color:"accent",children:["Learn more about billing",(0,t.jsx)(a.default,{})]}):void 0,children:[g?(0,t.jsx)(A.ReachedMonthlyCreditLimitRedesign,{appPreviewImageLoading:p,appPreviewImageUrl:m,billingPeriodEndDate:e.billingPeriodEnd}):(0,t.jsx)(_,{customerName:e.customer?.name??"",billingPeriodEndDate:e.billingPeriodEnd}),(0,t.jsx)(v,{customerId:n,initialSettings:ee(e),onDone:()=>h(()=>{d(e.id)})}),o?(0,t.jsxs)(y.View,{gap:16,children:[(0,t.jsxs)(y.View,{row:!0,align:"center",gap:8,children:[(0,t.jsx)(s.default,{size:20}),(0,t.jsx)(C.Text,{variant:"subheadDefault",children:"Refer and earn more credits!"})]}),(0,t.jsx)(X.default,{trackingContext:"usage-page-notification-modal"})]}):null]})})}function ei({creditBalanceDepletedNotification:e,softAlert:i,hardAlert:a,isPersonalCustomer:s,onDismissCreditBalanceDepletedNotifications:l,onDismissAlertNotification:d}){let u=e?.customer?.id,c=a?.customer?.id,g=i?.customer?.id;if((0,r.useEffect)(()=>{null!=e&&e.customer?.id==null&&(n.captureMessage("UBBNotificationView: credit depleted notification missing customerId",{level:"error",extra:{notificationId:e.id}}),l(e.id))},[e,l]),(0,r.useEffect)(()=>{null!=a&&a.customer?.id==null&&(n.captureMessage("UBBNotificationView: hard alert notification missing customerId",{level:"error",extra:{notificationId:a.id}}),d(a,"hard"))},[a,d]),(0,r.useEffect)(()=>{null!=i&&i.customer?.id==null&&(n.captureMessage("UBBNotificationView: soft alert notification missing customerId",{level:"error",extra:{notificationId:i.id}}),d(i,"soft"))},[i,d]),e&&null!=u)return(0,t.jsx)(et,{notification:e,creditDepletedCustomerId:u,isPersonalCustomer:s,onDismissCreditBalanceDepletedNotifications:l});if(a&&null!=c){let e;return(0,t.jsx)(K.Modal,{isOpen:!0,onRequestClose:()=>{d(a,"hard")},children:(0,t.jsx)(o.ReachedHardBudgetLimit,{billingPeriodEndDate:a.billingPeriodEnd,initialSettings:ee(a),customerId:c,customerName:a.customer?.name??"",totalRemainingCredits:(e=a.customer?.usageInterval?.credits,e?.__typename==="CustomerCredits"?e.totalRemainingCredits:0),onDone:()=>{d(a,"hard")}},a.id)})}if(i&&null!=g){let e=i.customer?.orgs?.__typename==="OrgConnection"?i.customer.orgs.items[0]?.slug:void 0;return(0,t.jsx)(K.Modal,{isOpen:!0,onRequestClose:()=>{d(i,"soft")},children:(0,t.jsx)(U.ReachedSoftAlertLimit,{threshold:i.alert.threshold,orgSlug:e,customerName:i.customer?.name??"",onDone:()=>{d(i,"soft")}},i.id)})}return null}e.s(["UBBNotificationModals",0,function(){let e=(0,i.useRouter)(),n=(0,J.shouldShowUsageAlert)(e.pathname),a=!n,{notifications:s,loading:l,error:o,personalCustomerId:d,onDismiss:u}=function({skip:e=!1}={}){var t,i;let n,a,s,{data:l,loading:o}=(t={skip:e},n={...G,...t},I.useQuery(H,n)),{data:d,loading:u,error:c}=(i={skip:e||l?.currentUser?.__typename!=="CurrentUser"||o},a={...G,...i},M.useSubscription(z,a)),[g]=(s={...G,...void 0},q.useMutation(Q,s)),[m,p]=(0,r.useState)(new Set);return{notifications:(d?.usageBasedBillingCreditBalanceDepletedNotifications??[]).filter(({id:e})=>!m.has(e)),loading:u,error:c,personalCustomerId:l?.currentUser?.__typename==="CurrentUser"?l.currentUser.customer.id:void 0,onDismiss:e=>{p(t=>new Set([...t,e])),g({variables:{input:{notificationId:e}}})}}}({skip:a}),{softAlertNotifications:c,hardAlertNotifications:g,loading:m,error:p,onDismiss:h}=function({skip:e=!1}={}){var t,i;let n,a,s,{data:l,loading:o}=(t={skip:e},n={...L,...t},I.useQuery(F,n)),{data:d,loading:u,error:c}=(i={skip:e||l?.currentUser?.__typename!=="CurrentUser"||o},a={...L,...i},M.useSubscription(V,a)),[g]=(s={...L,...void 0},q.useMutation($,s)),[m,p]=(0,r.useState)(new Set),h=d?.usageBasedBillingAlertNotifications??[],f=e=>h.filter(t=>t.alert.alertActionType===e&&!m.has(t.id)),x=f("soft"),C=f("hard"),y=(e,t)=>{p(t=>new Set([...t,e])),g({variables:{input:{notificationAlertId:e,timeDismissed:t}}})};return{softAlertNotifications:x,hardAlertNotifications:C,loading:u,error:c,onDismiss:(e,t)=>{let i=new Date().toISOString();if(y(e.id,i),"hard"===t){let t=x.find(t=>t.customer?.id===e.customer?.id);t&&y(t.id,i)}}}}({skip:a});if(!n||m||p||l||o)return null;let f=s.length>0?s[0]:null,x=c.length>0?c[0]:null,C=g.length>0?g[0]:null,y=f?.customer?.id;return(0,t.jsx)(ei,{creditBalanceDepletedNotification:f,softAlert:x,hardAlert:C,isPersonalCustomer:null!=y&&d===y,onDismissCreditBalanceDepletedNotifications:u,onDismissAlertNotification:h})},"UBBNotificationView",0,ei],902782)}]);

//# debugId=27d47ab1-f6d5-d6f2-b8a4-79651c1d1dc7
//# sourceMappingURL=12sszllnqw5a_.js.map