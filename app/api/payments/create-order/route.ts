import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const planAmounts: Record<string, number> = {
  Starter: 49900,
  Pro: 99900,
  Lifetime: 299900,
};

export async function POST(request: NextRequest) {
  const { plan } = await request.json();
  const amount = planAmounts[plan];

  if (!amount) {
    return NextResponse.json({ success: false, error: 'Invalid plan selected.' }, { status: 400 });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ success: false, error: 'Payment is not configured yet.' }, { status: 503 });
  }

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency: 'INR',
      receipt: `codely_${plan.toLowerCase()}_${Date.now()}`,
      notes: { plan },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ success: false, error: data.error?.description || 'Could not create Razorpay order.' }, { status: 502 });
  }

  return NextResponse.json({ success: true, order: data });
}
