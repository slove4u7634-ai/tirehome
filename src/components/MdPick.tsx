"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MdPick() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?t=' + Date.now(), { cache: 'no-store' });
        const data = await res.json();
        const mdpicks = data.filter((p: any) => p.isMdPick).slice(0, 4);
        setProducts(mdpicks);
      } catch (error) {
        console.error('Failed to fetch md pick products', error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-orange-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 group">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
              <span className="w-1.5 h-10 bg-orange-500"></span>MD&apos;s PICK
            </h2>
            <p className="mt-4 text-zinc-400 font-medium text-sm md:text-lg tracking-tight">타이어 전문가가 자신 있게 추천하는 완벽한 선택</p>
          </div>
          <Link className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white font-bold text-sm transition-colors border border-zinc-700 hover:border-zinc-500 rounded-full px-5 py-2 mt-6 md:mt-0" href="/mdpick">
            전체 라인업 보기 &gt;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <Link href={"/products/pt-" + prod.id} key={prod.id} className="group block">
              <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition-colors duration-300">
                <div className="relative h-64 w-full bg-zinc-800/50 flex items-center justify-center p-8 group-hover:bg-zinc-800 transition-colors">
                  <img src={prod.img} alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} className="w-full h-full object-contain mix-blend-screen drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-zinc-950 text-orange-500 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-orange-500/30">
                      {prod.brand}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium mb-6 line-clamp-2 leading-relaxed">{prod.subtitle || '뛰어난 퍼포먼스와 안정성을 경험해보세요.'}</p>
                  
                  <div className="flex items-end justify-between mt-6">
                    <div className="flex flex-col">
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-red-500 font-black text-sm">{Math.round((prod.originalPrice - prod.price) / prod.originalPrice * 100)}%</span>
                          <span className="text-gray-400 font-medium text-xs line-through">{prod.originalPrice.toLocaleString()}원</span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-white">{prod.price.toLocaleString()}</span>
                        <span className="text-sm font-bold text-gray-400">원</span>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
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
