import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="flex h-16 md:h-32 items-center justify-between gap-8">

          {/* 모바일 햄버거 */}
          <div className="flex md:hidden">
            <button className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link className="flex items-center group" href="/">
              <svg viewBox="0 0 340 70" className="h-10 md:h-16 w-auto transition-transform group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
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

          {/* PC 메뉴 */}
          <nav className="hidden md:flex flex-1 justify-evenly items-center w-full px-2 lg:px-6">
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/brands">브랜드별 타이어</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/">차종별 타이어</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/events">이벤트 / 혜택</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/cs">고객센터</Link>
            <Link className="text-2xl font-bold text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap" href="/reviews">장착후기</Link>
          </nav>

          {/* 우측 아이콘 */}
          <div className="flex items-center gap-4 md:gap-8">
            <button className="md:hidden p-2 text-gray-500 hover:text-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <div className="flex items-center gap-4 md:gap-8">
              <Link className="text-gray-500 hover:text-orange-500 flex flex-col items-center gap-1 transition-colors relative" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 md:w-9 md:h-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="hidden md:block text-sm font-medium">장바구니</span>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
              </Link>
              <Link className="hidden md:flex flex-col items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors" href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span className="text-sm font-medium">로그인</span>
              </Link>
              <Link className="hidden md:flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition-colors" href="/admin/login">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span className="text-sm font-medium">관리자</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
