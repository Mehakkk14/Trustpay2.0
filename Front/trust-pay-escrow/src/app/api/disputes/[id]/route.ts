import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/disputes/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, 'disputes', params.id);
    const docSnap = await getDoc(docRef);

    return NextResponse.json({ data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/disputes/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const disputeRef = doc(db, 'disputes', params.id);
    const disputeSnap = await getDoc(disputeRef);

    if (!disputeSnap.exists()) {
      return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }

    const dispute = disputeSnap.data();

    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    await updateDoc(disputeRef, updates);

    // If dispute is resolved, update job status accordingly
    if (body.status === 'resolved') {
      const jobDocRef = doc(db, 'jobs', dispute.job_id);
      await updateDoc(jobDocRef, {
        status: 'completed',
        disputed: false,
        updated_at: new Date().toISOString(),
      });
    }

    const updatedDoc = await getDoc(disputeRef);
    return NextResponse.json({ data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
