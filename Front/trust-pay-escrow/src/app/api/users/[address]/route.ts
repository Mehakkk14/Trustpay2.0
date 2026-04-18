import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types/database';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/[address]
export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const docRef = doc(db, 'user_profiles', params.address.toLowerCase());
    const docSnap = await getDoc(docRef);

    return NextResponse.json({ data: docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/users/[address]
export async function POST(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const body = await request.json();
    const address = params.address.toLowerCase();
    
    const profile: Partial<UserProfile> = {
      id: address,
      name: body.name,
      bio: body.bio,
      skills: body.skills || [],
      hourly_rate: body.hourly_rate || '0',
      role: body.role || 'both',
      profile_image_cid: body.profile_image_cid,
      profile_image_url: body.profile_image_url,
      joined_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 0,
      total_jobs_completed: 0,
      total_earned: '0',
    };

    const docRef = doc(db, 'user_profiles', address);
    await setDoc(docRef, profile, { merge: true });
    
    const updatedDoc = await getDoc(docRef);
    return NextResponse.json({ data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/users/[address]
export async function PUT(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const body = await request.json();
    const address = params.address.toLowerCase();
    
    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const docRef = doc(db, 'user_profiles', address);
    await updateDoc(docRef, updates);
    
    const updatedDoc = await getDoc(docRef);
    return NextResponse.json({ data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
