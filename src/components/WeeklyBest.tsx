"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyBest() {
  const [bestProducts, setBestProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const res = await fetch('/api/products?t=' + Date.now(), { cache: 'no-store' });
        const data = await res.json();
        const weeklyBest = data.filter((p: any) => p.isWeeklyBest).slice(0, 4);
        setBestProducts(weeklyBest);
      } catch (error) {
        console.error('Failed to fetch best products', error);
      }
    };
    fetchBestProducts();
  }, []);

  return (
    <section className="py-12 border-b border-gray-100 last:border-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-8 group">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-orange-500 rounded-full"></span>🔥 주간 BEST 타이어
            </h2>
            <p className="mt-2 text-gray-500 font-medium text-sm md:text-base">지금 가장 핫한 인기 타이어!</p>
          </div>
          <Link className="flex items-center gap-1 text-gray-400 hover:text-orange-600 font-bold text-sm transition-all" href="/best">
            전체보기 &gt;
          </Link>
        </div>
        
        {bestProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestProducts.map((prod) => (
              <Link href={"/products/pt-" + prod.id} key={prod.id} className="group block">
                <div className="aspect-[3/4] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 relative flex flex-col">
                  <div className="relative h-[65%] w-full bg-gray-50 flex items-center justify-center p-6 group-hover:bg-orange-50 transition-colors">
                    <img src={prod.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/80 backdrop-blur-sm text-xs font-black px-2.5 py-1 rounded-md shadow-sm text-gray-700 border border-gray-100">
                        {prod.brand === 'KUMHO' ? '금호타이어' : prod.brand === 'HANKOOK' ? '한국타이어' : prod.brand === 'NEXEN' ? '넥센타이어' : prod.brand}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col bg-white">
                    <h3 className="text-lg font-black text-gray-900 mb-1 leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold mb-auto">{prod.subtitle || prod.size}</p>
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold line-through mb-0.5">{(prod.price * 10000 * 1.3).toLocaleString()}원</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-orange-600">{(prod.price * 10000).toLocaleString()}</span>
                          <span className="text-sm font-bold text-gray-600">원~</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="aspect-[3/4] bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
          </div>
        )}
      </div>
    </section>
  );
}
