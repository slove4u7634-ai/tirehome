// 기존 db.json 데이터를 Supabase로 마이그레이션하는 스크립트
// 실행: node src/scripts/migrate.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/db.json');

const SUPABASE_URL = 'https://fjwtldwqhyamrrlslker.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Yc9PtJDclmsoVTOa4aJHNg_lIxE-oBY';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
};

async function migrate() {
  const raw = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(raw);

  // Products 마이그레이션
  const products = (db.products || []).map(({ id: _id, createdAt: _c, ...p }) => ({
    brand: p.brand || '',
    name: p.name || '',
    subtitle: p.subtitle || '',
    tags: p.tags || [],
    size: p.size || '',
    price: parseFloat(p.price) || 0,
    img: p.img || '',
    // base64 이미지는 제외 (URL만 유지)
    detailImg: p.detailImg && !p.detailImg.startsWith('data:') ? p.detailImg : '',
    isWeeklyBest: p.isWeeklyBest || false,
    isMonthly: p.isMonthly || false,
    isMdPick: p.isMdPick || false,
  }));

  if (products.length > 0) {
    console.log(`📦 상품 ${products.length}개 마이그레이션 중 (5개씩 배치)...`);
    const batchSize = 5;
    let success = 0;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(batch),
      });
      if (res.ok) {
        success += batch.length;
        console.log(`  ✅ ${i+1}~${Math.min(i+batchSize, products.length)}번 완료`);
      } else {
        const err = await res.json();
        console.error(`  ❌ ${i+1}~${i+batchSize}번 오류:`, err);
      }
    }
    console.log(`✅ 상품 ${success}/${products.length}개 완료!`);
  }

  // Posts 마이그레이션
  const posts = (db.posts || []).map(({ id: _id, ...p }) => ({
    type: p.type || 'notice',
    title: p.title || '',
    content: p.content || '',
    status: p.status || '공지',
  }));

  if (posts.length > 0) {
    console.log(`📝 게시글 ${posts.length}개 마이그레이션 중...`);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(posts),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(`✅ 게시글 ${posts.length}개 완료!`);
    } else {
      console.error('❌ 게시글 오류:', result);
    }
  }

  console.log('🎉 마이그레이션 완료!');
}

migrate().catch(console.error);
