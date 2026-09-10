import Link from 'next/link';
import { EVENTS_DATA } from '@/lib/events';
import { notFound } from 'next/navigation';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = EVENTS_DATA.find(e => e.id === resolvedParams.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[800px]">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700">
          
          <div className="p-8 border-b border-gray-100 text-center">
            <span className="inline-block bg-orange-100 text-orange-600 font-bold text-xs px-3 py-1 rounded-full mb-4">진행중인 이벤트</span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{event.title}</h1>
            <p className="text-gray-500 font-medium">{event.date}</p>
          </div>

          <div className="w-full bg-gray-100">
            <img src={event.image} alt={event.title} className="w-full h-auto object-cover" />
          </div>

          <div className="p-8 md:p-12 min-h-[300px]">
            <div className="text-gray-700 leading-relaxed font-medium whitespace-pre-wrap text-base md:text-lg">
              {event.content}
            </div>
            
            <div className="mt-16 text-center border-t border-gray-100 pt-10">
              <Link href="/events" className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-800 transition-colors">
                목록으로 돌아가기
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
