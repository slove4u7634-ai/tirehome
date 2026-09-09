import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainBanner from '@/components/MainBanner';
import SearchForm from '@/components/SearchForm';
import WeeklyBest from '@/components/WeeklyBest';
import MonthlyBest from '@/components/MonthlyBest';
import MdPick from '@/components/MdPick';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      <div className="w-full relative bg-gray-900 border-none">
        <MainBanner />
      </div>

      <section className="relative z-30">
        <div className="mx-auto">
          <SearchForm />
        </div>
      </section>

      <div className="mt-8 md:mt-12">
        <div className="w-full h-12 bg-gradient-to-r from-red-600 via-rose-500 to-purple-600 flex items-center justify-center overflow-hidden relative shadow-2xl border-y border-white/10 z-30 animate-gradient-x bg-[length:200%_200%]">
          <span className="text-white font-black text-sm lg:text-base tracking-tight whitespace-nowrap shimmer-text">
            ⚡ [타이어 최저가 선언] 대한민국에서 타이어가 가장 싼 매장! 4짝 교체 시 휠얼라인먼트 무상 & 당일 장착 ⚡
          </span>
        </div>
      </div>

      <div className="mt-6 md:mt-10 pb-16 md:pb-0">
        <MonthlyBest />
        <WeeklyBest />
        <MdPick />

        <section className="py-8 md:py-16 bg-white overflow-hidden my-4 md:my-10">
          <div className="max-w-[1240px] mx-auto">
            <div className="px-4 md:px-8 flex items-end justify-between mb-6 md:mb-10">
              <div>
                <Link href="/events" className="flex items-center gap-2 mb-1 group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 text-orange-500 transition-transform group-hover:scale-110">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                    이벤트 / 혜택
                  </h2>
                </Link>
                <p className="text-gray-400 font-bold text-sm">타이어몰 회원만을 위한 매주 특별한 선물</p>
              </div>
              <Link className="flex items-center gap-1 text-gray-400 hover:text-orange-500 font-bold text-sm transition-all" href="/events">
                전체보기 &gt;
              </Link>
            </div>
            <div className="flex overflow-x-auto gap-4 px-4 pb-4">
              <Link href="/events/1" className="block shrink-0 transition-transform hover:-translate-y-1">
                <img src="/img/banner_1.jpg" alt="이벤트 배너" className="w-[85vw] md:w-[400px] h-[150px] object-cover rounded-xl shadow-md" />
              </Link>
              <Link href="/events/2" className="block shrink-0 transition-transform hover:-translate-y-1">
                <img src="/img/banner_2.jpg" alt="이벤트 배너" className="w-[85vw] md:w-[400px] h-[150px] object-cover rounded-xl shadow-md" />
              </Link>
              <Link href="/events/3" className="block shrink-0 transition-transform hover:-translate-y-1">
                <img src="/img/banner_3.jpg" alt="이벤트 배너" className="w-[85vw] md:w-[400px] h-[150px] object-cover rounded-xl shadow-md" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
