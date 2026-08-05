import Header from '@/components/layout/Header';
import PricingClient from '@/components/pricing/PricingClient';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PricingClient />
    </main>
  );
}
