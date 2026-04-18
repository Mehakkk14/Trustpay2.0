import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/jobs/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, 'jobs', params.id);
    const docSnap = await getDoc(docRef);

    return NextResponse.json({ data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/jobs/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const docRef = doc(db, 'jobs', params.id);
    await updateDoc(docRef, updates);
    
    const updatedDoc = await getDoc(docRef);
    return NextResponse.json({ data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
