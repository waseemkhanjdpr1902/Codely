'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { PlanName, setPlan } from '@/lib/local-workspace';

type Plan = {
  name: PlanName;
  price: string;
  period: string;
  amount: number;
  description: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: 'Free',
    price: '₹0',
    period: '',
    amount: 0,
    description: 'For trying Codely and building small tools.',
    features: ['5 AI generations/month', 'Basic tools', 'Copy code', 'Local storage projects'],
  },
  {
    name: 'Starter',
    price: '₹499',
    period: '/month',
    amount: 49900,
    description: 'For students, freelancers, and small business owners.',
    features: ['100 AI generations/month', 'Save projects', 'Export code', 'Error fixer', 'UI enhancer'],
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    amount: 99900,
    description: 'For regular builders who need all tools.',
    features: ['Unlimited fair-use generations', 'All tools', 'Priority generation', 'Premium templates', 'Deployment guide', 'Commercial usage'],
  },
  {
    name: 'Lifetime',
    price: '₹2,999',
    period: 'one-time',
    amount: 299900,
    description: 'For founders who want lifetime access.',
    features: ['All Pro features', 'Lifetime access', 'Future updates'],
  },
];

export default function PricingClient() {
  const router = useRouter();
  const [busyPlan, setBusyPlan] = useState<PlanName | ''>('');
  const [message, setMessage] = useState('');

  async function subscribe(plan: Plan) {
    setMessage('');

    if (plan.name === 'Free') {
      setPlan('Free');
      setMessage('Free plan is active. You have 5 generations this month.');
      return;
    }

    setBusyPlan(plan.name);

    try {
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.name, amount: plan.amount }),
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || 'Payment is not configured yet.');
      }

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error('Payment is not configured yet.');
      }

      await loadRazorpay();

      const razorpay = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Codely',
        description: `${plan.name} plan`,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, plan: plan.name }),
          });
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            setPlan(plan.name);
            router.push(`/payment/success?plan=${encodeURIComponent(plan.name)}`);
          } else {
            router.push('/payment/failed?reason=verification');
          }
        },
        modal: {
          ondismiss: () => setMessage('Payment was closed. You can try again anytime.'),
        },
        theme: { color: '#2563eb' },
      });

      razorpay.open();
    } catch (paymentError: any) {
      setMessage(paymentError?.message || 'Payment is not configured yet.');
    } finally {
      setBusyPlan('');
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Pricing</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Simple plans for every builder</h1>
        <p className="mt-4 text-slate-600">Start free. Upgrade when you need more AI generations, exports, and launch features.</p>
      </div>

      {message && (
        <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-amber-100 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-800">
          {message}
        </div>
      )}

      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-6 ${plan.name === 'Pro' ? 'border-blue-300 shadow-md shadow-blue-100' : ''}`}>
            <h2 className="text-xl font-bold text-slate-950">{plan.name}</h2>
            <p className="mt-2 min-h-12 text-sm text-slate-600">{plan.description}</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && <span className="pb-1 text-sm text-slate-500">{plan.period}</span>}
            </div>
            <Button onClick={() => subscribe(plan)} disabled={busyPlan === plan.name} className="mt-6 w-full">
              {busyPlan === plan.name && <Loader2 size={16} className="animate-spin" />}
              {plan.name === 'Free' ? 'Use Free Plan' : `Subscribe to ${plan.name}`}
            </Button>
            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex gap-3 text-sm text-slate-600">
                  <Check size={16} className="mt-0.5 shrink-0 text-blue-600" />
                  {feature}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function loadRazorpay() {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load Razorpay checkout.'));
    document.body.appendChild(script);
  });
}
