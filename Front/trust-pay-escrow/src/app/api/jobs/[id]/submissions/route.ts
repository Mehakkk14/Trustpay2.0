import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, getDoc, orderBy } from 'firebase/firestore';
import type { WorkSubmission } from '@/types/database';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/jobs/[id]/submissions
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const q = query(
      collection(db, 'work_submissions'),
      where('job_id', '==', params.id),
      orderBy('created_at', 'desc')
    );

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

// POST /api/jobs/[id]/submissions
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const submission: Omit<WorkSubmission, 'id'> = {
      job_id: params.id,
      freelancer_address: body.freelancer_address.toLowerCase(),
      submission_cid: body.submission_cid,
      submission_text: body.submission_text,
      submission_date: new Date().toISOString(),
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'work_submissions'), submission);
    const createdSubmission = { id: docRef.id, ...submission };

    // Update job status to submitted
    const jobDocRef = doc(db, 'jobs', params.id);
    await updateDoc(jobDocRef, {
      status: 'submitted',
      work_submission_cid: body.submission_cid,
      work_submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ data: createdSubmission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
