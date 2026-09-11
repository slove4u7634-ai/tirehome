import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full mx-auto max-w-[1600px] px-4 md:px-8 pb-8">
      <footer className="bg-gray-900 text-gray-400 py-8 md:py-12 px-4 md:px-12 rounded-2xl mt-auto shadow-lg">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-b border-gray-800 pb-6 md:pb-10 mb-6 md:mb-8">
            <div className="md:col-span-2">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <img src="/logo.jpg" alt="타이어투데이 로고" className="h-8 md:h-20 w-auto object-contain" />
              <span className="text-xl md:text-4xl font-black text-white tracking-tight leading-none">타이어투데이</span>
            </div>
            <p className="hidden md:block text-sm leading-relaxed mb-6 max-w-sm">
              전국 어디서나 믿을 수 있는 타이어 전문 쇼핑몰. <br />
              최고의 품질과 서비스로 안전한 드라이빙을 약속합니다.
            </p>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Link href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors text-xs md:text-base">F</Link>
              <Link href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors text-xs md:text-base">I</Link>
              <Link href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors text-xs md:text-base">Y</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">쇼핑 안내</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-orange-500 transition-colors text-sm">회사소개</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors text-sm">이용약관</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors text-sm">개인정보처리방침</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors text-sm">이용안내</Link></li>
            </ul>
          </div>
          <div className="mt-2 md:mt-0">
            <h3 className="hidden md:block text-white font-bold mb-4 uppercase tracking-wider text-sm">고객센터</h3>
            <div className="text-2xl md:text-3xl font-black text-orange-500 mb-1 md:mb-2">1588-0000</div>
            <p className="text-[10px] md:text-sm mb-1 text-gray-400">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
            <p className="hidden md:block text-sm mb-4">점심 12:00 - 13:00</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 text-center md:text-left gap-3 md:gap-0">
          <p className="hidden md:block">상호: 타이어투데이 | 대표: 아무개 | 사업자등록번호: 123-45-67890</p>
          <div className="md:hidden flex flex-col gap-1 items-center">
            <div className="flex gap-2"><Link href="#">이용약관</Link>|<Link href="#">개인정보처리방침</Link></div>
            <p className="mt-1">타이어투데이 | 대표: 아무개</p>
          </div>
          <p className="mt-1 md:mt-0">© 2026 타이어투데이. All rights reserved.</p>
        </div>
        </div>
      </footer>
    </div>
  );
}
