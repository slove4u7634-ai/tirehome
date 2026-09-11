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
    <section className="py-10 md:py-16 bg-gradient-to-r from-orange-50 via-white to-orange-50 relative overflow-hidden rounded-2xl border border-gray-100">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="w-full mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex items-end justify-between mb-8 group">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-orange-500 rounded-full"></span>🔥 주간 BEST 타이어
            </h2>
            <p className="mt-2 text-gray-500 font-medium text-sm md:text-base">지금 가장 핫한 인기 타이어!</p>
          </div>
          <Link className="flex items-center gap-1 text-gray-400 hover:text-orange-600 font-bold text-sm transition-all" href="/brands?filter=weekly">
            전체보기 &gt;
          </Link>
        </div>
        
        {bestProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {bestProducts.map((prod) => (
              <Link href={"/products/pt-" + prod.id} key={prod.id} className="group block">
                <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm md:shadow-sm group-hover:shadow-xl transition-all duration-300 relative flex flex-row md:flex-col">
                  <div className="relative w-1/3 min-h-[120px] md:w-full md:aspect-square bg-gray-50 flex items-center justify-center p-3 md:p-6 group-hover:bg-orange-50 transition-colors shrink-0">
                    <img src={prod.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[9px] md:text-xs font-black px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-sm md:rounded-md shadow-sm text-gray-700 border border-gray-100">
                        {prod.brand === 'KUMHO' ? '금호타이어' : prod.brand === 'HANKOOK' ? '한국타이어' : prod.brand === 'NEXEN' ? '넥센타이어' : prod.brand}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 md:p-5 flex flex-col justify-center bg-white border-l md:border-l-0 border-gray-50 md:border-t-0">
                    <h3 className="text-base md:text-lg font-black text-gray-900 mb-1 leading-snug md:leading-tight group-hover:text-orange-500 transition-colors line-clamp-2 min-h-0 md:min-h-[3.5rem]">
                      {prod.name}
                    </h3>
                    {prod.size && <p className="text-[10px] md:text-xs text-orange-500 font-black mb-1">{prod.size}</p>}
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold mb-2 md:mb-auto line-clamp-1">{prod.subtitle}</p>
                    <div className="flex items-end justify-between mt-auto pt-2 md:pt-4">
                      <div className="flex flex-col">
                        {prod.originalPrice && prod.originalPrice > prod.price && (
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-red-500 font-black text-xs md:text-sm">{Math.round((prod.originalPrice - prod.price) / prod.originalPrice * 100)}%</span>
                            <span className="text-gray-400 font-medium text-[10px] md:text-xs line-through">{prod.originalPrice.toLocaleString()}원</span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg md:text-xl font-black text-gray-900">{prod.price.toLocaleString()}</span>
                          <span className="text-[10px] md:text-sm font-bold text-gray-600">원</span>
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
            <div className="h-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="h-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="h-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
            <div className="h-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-sm font-bold text-gray-300">관리자 추천 대기 중</div>
          </div>
        )}
      </div>
    </section>
  );
}
