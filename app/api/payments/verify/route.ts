import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { activateProPlan, verifyFirebaseRequest } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let user;
  try {
    user = await verifyFirebaseRequest(request);
  } catch {
    return NextResponse.json({ success: false, error: 'Please sign in again.' }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ success: false, error: 'Secure payment activation is not configured.' }, { status: 503 });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await request.json();

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ success: false, error: 'Payment is not configured yet.' }, { status: 503 });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ success: false, error: 'Missing payment verification fields.' }, { status: 400 });
  }

  if (plan !== 'Pro') {
    return NextResponse.json({ success: false, error: 'Invalid plan.' }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const providedSignature = Buffer.from(String(razorpay_signature), 'utf8');
  const validSignature = Buffer.from(expectedSignature, 'utf8');
  if (providedSignature.length !== validSignature.length || !crypto.timingSafeEqual(providedSignature, validSignature)) {
    return NextResponse.json({ success: false, error: 'Payment verification failed.' }, { status: 400 });
  }

  const orderResponse = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`,
    },
    cache: 'no-store',
  });
  const order = await orderResponse.json();
  if (!orderResponse.ok || order.amount !== 199900 || order.currency !== 'INR' || order.notes?.plan !== 'Pro') {
    return NextResponse.json({ success: false, error: 'Payment order does not match the Pro plan.' }, { status: 400 });
  }

  await activateProPlan(user.uid, razorpay_payment_id);

  return NextResponse.json({
    success: true,
    plan,
    paymentId: razorpay_payment_id,
  });
}
