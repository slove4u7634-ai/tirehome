import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col w-full">
          {/* 상단 1열: 햄버거(모바일), 로고(중앙), 우측 아이콘 */}
          <div className="flex h-16 md:h-28 items-center justify-between w-full relative">
            
            {/* 좌측 영역: 모바일 햄버거, PC에서는 빈 공간으로 밸런스 */}
            <div className="flex md:flex-1">
              <div className="flex md:hidden">
                <button className="p-2 -ml-2 text-gray-500 hover:text-orange-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 중앙 영역: 로고 */}
            <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <Link className="flex items-center group" href="/">
                <svg viewBox="0 0 340 70" className="h-10 md:h-20 w-auto transition-transform group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
                  {/* 노란 평행사변형 배경 - TO 전체 커버 */}
                  <polygon points="152,4 232,4 218,66 138,66" fill="#F5C400"/>
                  {/* TIRE */}
                  <text x="0" y="55" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="56" fill="#1B3A8C" letterSpacing="-1">TIRE</text>
                  {/* T (흰색) */}
                  <text x="148" y="55" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="56" fill="white" letterSpacing="-1">T</text>
                  {/* O (흰색) */}
                  <text x="182" y="55" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="56" fill="white">O</text>
                  {/* DAY */}
                  <text x="222" y="55" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="56" fill="#1B3A8C" letterSpacing="-1">DAY</text>
                  {/* 타이어투데이 */}
                  <text x="4" y="68" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#1B3A8C" letterSpacing="1">타이어투데이</text>
                </svg>
              </Link>
            </div>

            {/* 우측 영역: 아이콘 */}
            <div className="flex md:flex-1 justify-end items-center gap-4 md:gap-8">
              <button className="md:hidden p-2 -mr-2 text-gray-500 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              <div className="flex items-center gap-4 md:gap-8">

                <Link className="hidden md:flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors" href="/admin/login">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <span className="text-sm font-medium">관리자</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 하단 2열: PC 메뉴 카테고리 */}
          <nav className="hidden md:flex w-full justify-center gap-10 lg:gap-20 items-center pb-6">
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/brands">브랜드관</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/events">이벤트 / 혜택</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/cs">고객센터</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/reviews">장착후기</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/reservation/check">예약확인</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
