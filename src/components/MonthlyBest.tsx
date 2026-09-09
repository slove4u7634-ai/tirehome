"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MonthlyBest() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?t=' + Date.now(), { cache: 'no-store' });
        const data = await res.json();
        const monthly = data.filter((p: any) => p.isMonthly).slice(0, 4);
        setProducts(monthly);
      } catch (error) {
        console.error('Failed to fetch monthly products', error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 overflow-hidden relative shadow-inner">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-10 group text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-3 drop-shadow-md">
            ✨ 이달의 추천 상품
          </h2>
          <p className="mt-3 text-purple-200 font-medium text-sm md:text-base">놓치면 후회할 이번 달 최고의 타이어 라인업</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((prod) => (
            <Link href={"/products/pt-" + prod.id} key={prod.id} className="group block">
              <div className="aspect-[3/4] bg-white rounded-2xl border-4 border-transparent hover:border-purple-400 overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 relative flex flex-col transform group-hover:-translate-y-2">
                <div className="relative h-[65%] w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
                  <img src={prod.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} className="w-full h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md border border-indigo-500">
                      BEST
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-5 flex flex-col bg-white border-t border-gray-100">
                  <span className="text-[10px] font-bold text-indigo-500 mb-1">{prod.brand}</span>
                  <h3 className="text-lg font-black text-gray-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-bold mb-auto line-clamp-1">{prod.subtitle || prod.size}</p>
                  
                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-red-500 font-black text-sm">{Math.round((prod.originalPrice - prod.price) / prod.originalPrice * 100)}%</span>
                          <span className="text-gray-400 font-medium text-xs line-through">{prod.originalPrice.toLocaleString()}원</span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-gray-900">{prod.price.toLocaleString()}</span>
                        <span className="text-sm font-bold text-gray-600">원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
