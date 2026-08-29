import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { NextRequest } from 'next/server';

export const STANDARD_BUILD_COST = 15;

function getAdminApp(): App | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;

  if (getApps().length) return getApp();

  const serviceAccount = JSON.parse(raw);
  return initializeApp({ credential: cert(serviceAccount) });
}

export function isFirebaseAdminConfigured() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim());
}

export async function verifyFirebaseRequest(request: NextRequest): Promise<DecodedIdToken | null> {
  const app = getAdminApp();
  if (!app) return null;

  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new Error('AUTH_REQUIRED');

  try {
    return await getAuth(app).verifyIdToken(token, true);
  } catch {
    throw new Error('AUTH_INVALID');
  }
}

export async function consumeBuildCredits(uid: string) {
  const app = getAdminApp();
  if (!app) return null;

  const db = getFirestore(app);
  const ref = db.collection('users').doc(uid);
  const now = new Date();

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data();
    const resetAt = data?.creditsResetAt instanceof Timestamp ? data.creditsResetAt.toDate() : null;
    const shouldReset = !resetAt || resetAt <= now;
    const plan = data?.plan === 'Pro' ? 'Pro' : 'Free';
    const allowance = plan === 'Pro' ? 1500 : 75;
    const balance = shouldReset ? allowance : Number(data?.creditsBalance ?? allowance);

    if (balance < STANDARD_BUILD_COST) throw new Error('INSUFFICIENT_CREDITS');

    const nextReset = shouldReset ? addOneMonth(now) : resetAt;
    const nextBalance = balance - STANDARD_BUILD_COST;
    transaction.set(
      ref,
      {
        plan,
        creditsBalance: nextBalance,
        creditsResetAt: Timestamp.fromDate(nextReset),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { balance: nextBalance, cost: STANDARD_BUILD_COST, plan };
  });
}

export async function activateProPlan(uid: string, paymentId: string) {
  const app = getAdminApp();
  if (!app) throw new Error('FIREBASE_ADMIN_NOT_CONFIGURED');

  const now = new Date();
  await getFirestore(app).collection('users').doc(uid).set(
    {
      plan: 'Pro',
      creditsBalance: 1500,
      creditsResetAt: Timestamp.fromDate(addOneMonth(now)),
      razorpayPaymentId: paymentId,
      subscriptionActivatedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

function addOneMonth(value: Date) {
  const next = new Date(value);
  next.setMonth(next.getMonth() + 1);
  return next;
}
