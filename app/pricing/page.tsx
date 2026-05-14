import { Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const plans = [
  { name: 'Free', price: '$0', description: 'For trying app ideas.', features: ['3 projects', 'Basic builder UI', 'Community launch checklist'] },
  { name: 'Pro', price: '$19', description: 'For active builders.', features: ['Unlimited projects', 'GitHub export planned', 'Deployment workflow planned'] },
  { name: 'Founder', price: '$49', description: 'For SaaS launches.', features: ['Team-ready workspace', 'Payment-ready templates', 'Priority roadmap access'] },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Pricing</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Simple plans for every builder</h1>
          <p className="mt-4 text-slate-600">Razorpay checkout will be added in the next phase. These CTAs are placeholders for now.</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="p-6">
              <h2 className="text-xl font-bold text-slate-950">{plan.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-500">/month</span>
              </div>
              <Button actionMessage="Coming in next phase" className="mt-6 w-full">
                Choose {plan.name}
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
    </main>
  );
}
