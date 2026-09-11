"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-16">
        
        {/* 홈 */}
        <Link href="/" className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={pathname === '/' ? "2" : "1.5"} stroke="currentColor" className={`w-6 h-6 ${pathname === '/' ? 'text-orange-500' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className={`text-[10px] ${pathname === '/' ? 'text-orange-500 font-bold' : ''}`}>홈</span>
        </Link>

        {/* 검색 (브랜드별) */}
        <Link href="/brands" className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={pathname.startsWith('/brands') ? "2" : "1.5"} stroke="currentColor" className={`w-6 h-6 ${pathname.startsWith('/brands') ? 'text-orange-500' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className={`text-[10px] ${pathname.startsWith('/brands') ? 'text-orange-500 font-bold' : ''}`}>검색</span>
        </Link>

        {/* 예약내역 */}
        <Link href="/reservation/check" className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={pathname.startsWith('/reservation') ? "2" : "1.5"} stroke="currentColor" className={`w-6 h-6 ${pathname.startsWith('/reservation') ? 'text-orange-500' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
          <span className={`text-[10px] ${pathname.startsWith('/reservation') ? 'text-orange-500 font-bold' : ''}`}>예약내역</span>
        </Link>

        {/* 마이페이지 */}
        <Link href="/mypage" className="flex-1 flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={pathname.startsWith('/mypage') ? "2" : "1.5"} stroke="currentColor" className={`w-6 h-6 ${pathname.startsWith('/mypage') ? 'text-orange-500' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className={`text-[10px] ${pathname.startsWith('/mypage') ? 'text-orange-500 font-bold' : ''}`}>마이페이지</span>
        </Link>

      </div>
    </div>
  );
}
