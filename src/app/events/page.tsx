import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="flex-1 bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1240px]">
        <div className="flex flex-col items-center justify-center text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-orange-500 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tighter">
            이벤트 / 혜택
          </h1>
          <p className="text-gray-400 font-bold text-sm md:text-base">티어몰 회원님들을 위한 아주 특별한 선물</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          {[1, 2, 3].map((item) => (
            <Link href={`/events/${item}`} key={item} className="block rounded-2xl overflow-hidden shadow-md group border border-gray-100 hover:border-orange-500 transition-colors hover:shadow-lg">
              <div className="aspect-[2/1] overflow-hidden bg-gray-50">
                <img src={`/img/banner_${item}.jpg`} alt={`이벤트 ${item}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-bold text-lg text-gray-900 mb-2">특별 혜택 이벤트 {item}</h3>
                <p className="text-sm text-gray-500">2026.09.01 ~ 2026.09.30</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
