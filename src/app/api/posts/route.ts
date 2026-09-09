import { NextResponse } from 'next/server';
import { supabaseUrl, supabaseHeaders } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const query = type
    ? `select=*&type=eq.${type}&order=id.desc`
    : 'select=*&order=id.desc';

  const res = await fetch(supabaseUrl('posts', query), {
    headers: supabaseHeaders,
    cache: 'no-store',
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const row = {
    title: body.title,
    content: body.content || '',
    status: body.status || '공지',
    type: body.type || 'notice',
  };

  const res = await fetch(supabaseUrl('posts'), {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify(row),
  });
  const data = await res.json();
  return NextResponse.json(data?.[0] ?? { success: true });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const body = await request.json();
  const row = {
    title: body.title,
    content: body.content || '',
    status: body.status,
  };

  const res = await fetch(supabaseUrl('posts', `id=eq.${id}`), {
    method: 'PATCH',
    headers: supabaseHeaders,
    body: JSON.stringify(row),
  });
  const data = await res.json();
  return NextResponse.json(data?.[0] ?? { success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  await fetch(supabaseUrl('posts', `id=eq.${id}`), {
    method: 'DELETE',
    headers: supabaseHeaders,
  });
  return NextResponse.json({ success: true });
}
