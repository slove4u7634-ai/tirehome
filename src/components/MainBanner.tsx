"use client";

import { useState, useEffect } from 'react';

const banners = [
  { img: '/img/banner_1.jpg', title1: '내 차에 딱 맞는', title2: '타이어 찾기', desc: '프리미엄 타이어부터 가성비 모델까지\n전문가가 엄선한 최고의 라인업을 경험하세요.' },
  { img: '/img/banner_2.jpg', title1: '스피드를 즐기는', title2: '완벽한 퍼포먼스', desc: '고속 주행에도 흔들림 없는 안정감,\n스포츠 타이어 기획전을 만나보세요.' },
  { img: '/img/banner_3.jpg', title1: '조용하고 편안한', title2: '최고의 승차감', desc: '노면 소음을 잡아주는 정숙성 설계,\n가족을 위한 프리미엄 컴포트 타이어.' },
];

export default function MainBanner() {
  const [current, setCurrent] = useState(0);
  const [activeBanners, setActiveBanners] = useState(banners); // Use default as fallback

  useEffect(() => {
    fetch('/api/posts?type=banner')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const parsedBanners = data.map((post: any) => {
            try {
              const content = JSON.parse(post.content);
              return {
                img: content.img,
                title1: content.title1 || '',
                title2: content.title2 || '',
                desc: content.desc || '',
              };
            } catch {
              return null;
            }
          }).filter(Boolean);
          if (parsedBanners.length > 0) {
            setActiveBanners(parsedBanners);
          }
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center">
      {/* 1번 배너의 비율을 맞춰주기 위한 투명 이미지 */}
      <img src={activeBanners[0]?.img} alt="placeholder" className="w-full h-auto opacity-0 pointer-events-none" />

      {activeBanners.map((banner, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 z-0 ${current === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img src={banner.img} alt={`배너 ${idx + 1}`} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4 animate-in fade-in slide-in-from-top duration-1000 pointer-events-none">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl tracking-tight leading-tight transition-all">
          {activeBanners[current]?.title1} <br className="md:hidden" />
          <span className="text-orange-500 font-black">{activeBanners[current]?.title2}</span>
        </h2>
        <p className="hidden md:block mt-6 text-white/90 font-bold text-xl max-w-2xl mx-auto leading-relaxed whitespace-pre-line drop-shadow-lg">
          {activeBanners[current]?.desc}
        </p>
      </div>
      
      <div className="absolute bottom-16 md:bottom-12 left-0 right-0 flex justify-center space-x-2 md:space-x-3 z-30">
        {activeBanners.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 shadow-md ${current === idx ? 'bg-orange-500 w-8 md:w-20' : 'bg-white/40 w-3 md:w-6 hover:bg-white/60'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
