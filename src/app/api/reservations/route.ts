import { NextResponse } from 'next/server';
import { supabaseUrl, supabaseHeaders } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const res = await fetch(supabaseUrl('posts', 'select=*&type=eq.reservation&order=id.desc'), {
      headers: supabaseHeaders,
      cache: 'no-store',
    });
    const data = await res.json();
    
    // Convert from Post format to Reservation format
    const reservations = data.map((post: any) => {
      let content: any = {};
      try { content = JSON.parse(post.content); } catch (e) {}
      return {
        id: post.id,
        status: post.status,
        createdAt: post.date || new Date().toISOString(),
        ...content
      };
    });
    
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const row = {
      title: body.customer?.name || '새 방문예약',
      content: JSON.stringify(body),
      status: 'pending',
      type: 'reservation',
      date: new Date().toISOString()
    };

    const res = await fetch(supabaseUrl('posts'), {
      method: 'POST',
      headers: supabaseHeaders,
      body: JSON.stringify(row),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, reservation: data?.[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    
    const row = {
      status: body.status
    };

    const res = await fetch(supabaseUrl('posts', `id=eq.${body.id}`), {
      method: 'PATCH',
      headers: supabaseHeaders,
      body: JSON.stringify(row),
    });
    const data = await res.json();
    return NextResponse.json({ success: true, reservation: data?.[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
