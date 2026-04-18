import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, getDoc, orderBy, QueryConstraint } from 'firebase/firestore';
import type { Dispute } from '@/types/database';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/disputes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');
    const status = searchParams.get('status');
    const raisedBy = searchParams.get('raised_by');

    const constraints: QueryConstraint[] = [orderBy('created_at', 'desc')];

    if (jobId) {
      constraints.push(where('job_id', '==', jobId));
    }
    if (status) {
      constraints.push(where('status', '==', status));
    }
    if (raisedBy) {
      constraints.push(where('raised_by', '==', raisedBy.toLowerCase()));
    }

    const q = query(collection(db, 'disputes'), ...constraints);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/disputes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dispute: Omit<Dispute, 'id'> = {
      job_id: body.job_id,
      raised_by: body.raised_by.toLowerCase(),
      raised_against: body.raised_against.toLowerCase(),
      reason: body.reason,
      status: 'open',
      refund_to_client: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'disputes'), dispute);
    const createdDispute = { id: docRef.id, ...dispute };

    // Mark job as disputed
    const jobDocRef = doc(db, 'jobs', body.job_id);
    await updateDoc(jobDocRef, {
      status: 'disputed',
      dispute_reason: body.reason,
      disputed: true,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ data: createdDispute }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
