"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/brands?size=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); // 검색 시 모바일 메뉴 닫기
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-col w-full">
          
          {/* 상단 1열: 로고(좌측), 검색창 및 관리자(우측) */}
          <div className="flex h-20 md:h-28 items-center justify-between w-full">
            
            {/* 좌측 영역: 로고 */}
            <div className="flex-shrink-0 flex items-center">
              <Link className="flex items-center group" href="/">
                <div className="flex flex-col items-start leading-none pt-1">
                  <div className="flex items-center gap-0.5">
                    <span className="text-3xl md:text-5xl font-black text-[#1B3A8C] tracking-tighter" style={{ fontFamily: 'Arial Black, sans-serif' }}>TIRE</span>
                    <span className="text-3xl md:text-5xl font-black text-white bg-[#F5C400] px-1 md:px-2 pb-1 md:pb-1.5 pt-0.5 md:pt-1 italic tracking-tighter shadow-sm" style={{ fontFamily: 'Arial Black, sans-serif' }}>TO</span>
                    <span className="text-3xl md:text-5xl font-black text-[#1B3A8C] tracking-tighter" style={{ fontFamily: 'Arial Black, sans-serif' }}>DAY</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#1B3A8C] tracking-[0.1em] pl-0.5 mt-1 md:mt-1.5" style={{ fontFamily: 'Arial, sans-serif' }}>타이어투데이</span>
                </div>
              </Link>
            </div>

            {/* 우측 영역: 검색창 & 아이콘 */}
            <div className="flex justify-end items-center gap-6">
              
              {/* 모바일 햄버거 버튼 */}
              {/* 모바일 햄버거 버튼 */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -mr-2 text-gray-500 hover:text-orange-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* 검색창 */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-5 py-3 w-[320px] lg:w-[400px]">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="사이즈를 검색해보세요." 
                  className="bg-transparent border-none outline-none text-sm w-full font-bold text-gray-700 placeholder-gray-400" 
                />
                <button type="submit" className="text-gray-600 hover:text-gray-900 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>

              {/* 관리자 아이콘 */}
              <Link className="hidden md:flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors" href="/admin/login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 하단 2열: 구분선 및 좌측 정렬된 메뉴 카테고리 */}
          <div className="hidden md:block border-t border-gray-100 py-5">
            <nav className="flex w-full justify-start gap-8 lg:gap-14 items-center pl-2">
              <Link className="text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors whitespace-nowrap" href="/brands">브랜드관</Link>
              <Link className="text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors whitespace-nowrap" href="/events">이벤트 / 혜택</Link>
              <Link className="text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors whitespace-nowrap" href="/cs">고객센터</Link>
              <Link className="text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors whitespace-nowrap" href="/reviews">장착후기</Link>
              <Link className="text-lg lg:text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors whitespace-nowrap" href="/reservation/check">예약확인</Link>
            </nav>
          </div>

          {/* 최하단 빨간 배너 (컨테이너 너비와 동일하게) */}
          <div className="w-full bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 animate-gradient-x bg-[length:200%_200%] text-white py-3 text-center flex items-center justify-center border-t border-white/10 mb-2 rounded-sm shadow-md">
            <span className="text-sm md:text-base font-black tracking-tight shimmer-text px-2">
              ⚡ [타이어 최저가 선언] 대한민국에서 타이어가 가장 싼 매장! 4짝 교체 시 휠얼라인먼트 무상 & 당일 장착 ⚡
            </span>
          </div>
        </div>
      </div>

      {/* 모바일 서랍 메뉴 (Drawer) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex justify-end">
          {/* 어두운 배경 오버레이 (클릭 시 닫힘) */}
          <div 
            className="absolute inset-0 bg-black/50 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* 서랍 컨텐츠 */}
          <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* 닫기 버튼 & 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-lg text-[#1B3A8C]">전체메뉴</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 모바일 전용 검색창 */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="사이즈를 검색해보세요." 
                  className="bg-transparent border-none outline-none text-sm w-full font-bold text-gray-700 placeholder-gray-400" 
                />
                <button type="submit" className="text-orange-500 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* 모바일 메뉴 리스트 */}
            <nav className="flex flex-col py-2">
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/brands" className="px-6 py-4 text-base font-bold text-gray-800 border-b border-gray-50 hover:bg-gray-50">브랜드관</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/events" className="px-6 py-4 text-base font-bold text-gray-800 border-b border-gray-50 hover:bg-gray-50">이벤트 / 혜택</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/cs" className="px-6 py-4 text-base font-bold text-gray-800 border-b border-gray-50 hover:bg-gray-50">고객센터</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/reviews" className="px-6 py-4 text-base font-bold text-gray-800 border-b border-gray-50 hover:bg-gray-50">장착후기</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/reservation/check" className="px-6 py-4 text-base font-bold text-gray-800 border-b border-gray-50 hover:bg-gray-50">예약확인</Link>
            </nav>
            
            <div className="mt-auto p-6 bg-gray-50">
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/admin/login" className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                관리자 로그인
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
