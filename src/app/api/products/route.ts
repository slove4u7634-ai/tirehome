import { NextResponse } from 'next/server';
import { supabaseUrl, supabaseHeaders } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch(supabaseUrl('products', 'select=*&order=id.asc'), {
    headers: supabaseHeaders,
    cache: 'no-store',
  });
  const data = await res.json();
  // http 이미지 URL을 https로 자동 변환 (Mixed Content 오류 방지)
  const fixed = Array.isArray(data) ? data.map((p: any) => ({
    ...p,
    img: p.img ? p.img.replace(/^http:\/\//i, 'https://') : p.img,
    detailImg: p.detailImg ? p.detailImg.replace(/^http:\/\//i, 'https://') : p.detailImg,
  })) : data;
  return NextResponse.json(fixed);
}

export async function POST(request: Request) {
  const body = await request.json();

  const rows = Array.isArray(body)
    ? body.map(({ id: _id, createdAt: _c, ...item }) => item)
    : [{ ...body, id: undefined, createdAt: undefined }].map(({ id: _id, createdAt: _c, ...item }) => item);

  const res = await fetch(supabaseUrl('products'), {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify(rows),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, data });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');
  if (!idParam) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const body = await request.json();
  const ids = idParam.split(',').map(Number);

  // Strip undefined-able fields, only send what's provided
  const updateData: Record<string, any> = {};
  const fields = ['brand','name','subtitle','tags','size','price','img','detailImg','isWeeklyBest','isMonthly','isMdPick'];
  for (const f of fields) {
    if (body[f] !== undefined) updateData[f] = body[f];
  }

  const query = ids.length === 1 ? `id=eq.${ids[0]}` : `id=in.(${ids.join(',')})`;

  const res = await fetch(supabaseUrl('products', query), {
    method: 'PATCH',
    headers: supabaseHeaders,
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  return NextResponse.json({ success: true, data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');
  if (!idParam) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const ids = idParam.split(',').map(Number);
  const query = ids.length === 1 ? `id=eq.${ids[0]}` : `id=in.(${ids.join(',')})`;

  await fetch(supabaseUrl('products', query), {
    method: 'DELETE',
    headers: supabaseHeaders,
  });
  return NextResponse.json({ success: true });
}
