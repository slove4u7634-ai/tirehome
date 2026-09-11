import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainBanner from '@/components/MainBanner';
import SearchForm from '@/components/SearchForm';
import WeeklyBest from '@/components/WeeklyBest';
import MonthlyBest from '@/components/MonthlyBest';
import MdPick from '@/components/MdPick';
import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/events';

export default async function Home() {
  let events = [...EVENTS_DATA];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts?type=event`, { next: { revalidate: 0 } });
    const data = await res.json();
    if (data && Array.isArray(data) && data.length > 0) {
      events = data.map((post: any) => {
        try {
          const content = JSON.parse(post.content);
          return {
            id: String(post.id),
            title: post.title,
            date: content.date || post.date,
            image: content.img || '',
            content: content.content || ''
          };
        } catch {
          return null;
        }
      }).filter(Boolean) as any;
    }
  } catch (err) {
    console.error('Failed to fetch events:', err);
  }
  return (
    <div className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
        <div className="hidden md:block w-full relative bg-gray-900 border-none rounded-xl overflow-hidden mt-2 shadow-lg">
          <MainBanner />
        </div>

        <section className="relative z-30 mt-6">
          <SearchForm />
        </section>

        <div className="w-full mt-6 md:mt-8">
          <img src="/img/main.png" alt="방문 및 장착방법 안내" className="w-full h-auto rounded-xl shadow-md" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
        <div className="mt-6 md:mt-10 pb-16 md:pb-0 flex flex-col gap-8 md:gap-12">
          <MonthlyBest />
          <WeeklyBest />
          <MdPick />

          <section className="py-8 md:py-12 bg-white overflow-hidden">
            <div className="flex items-end justify-between mb-6 md:mb-10">
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
            <div className="flex flex-col md:flex-row md:overflow-x-auto gap-4 md:pb-4 scrollbar-hide">
              {events.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id} className="block shrink-0 transition-transform hover:-translate-y-1">
                  <img src={event.image} alt={event.title} className="w-full md:w-[400px] h-auto md:h-[150px] object-cover rounded-xl shadow-md border border-gray-100" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
