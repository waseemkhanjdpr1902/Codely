import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await request.json();

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ success: false, error: 'Payment is not configured yet.' }, { status: 503 });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ success: false, error: 'Missing payment verification fields.' }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false, error: 'Payment verification failed.' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    plan,
    paymentId: razorpay_payment_id,
  });
}
