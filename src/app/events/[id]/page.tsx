import Link from 'next/link';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[800px]">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700">
          
          <div className="p-8 border-b border-gray-100 text-center">
            <span className="inline-block bg-orange-100 text-orange-600 font-bold text-xs px-3 py-1 rounded-full mb-4">진행중인 이벤트</span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">특별 혜택 이벤트 {id}</h1>
            <p className="text-gray-500">2026.09.01 ~ 2026.09.30</p>
          </div>

          <div className="w-full bg-gray-100">
            <img src={`/img/banner_${id}.jpg`} alt={`이벤트 ${id} 상세 이미지`} className="w-full h-auto" />
          </div>

          <div className="p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-gray-600 mb-8">
              이벤트 {id}에 대한 상세 내용이 이곳에 들어갑니다.<br/>
              고객님을 위한 특별한 혜택을 놓치지 마세요!
            </p>
            
            <Link href="/events" className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
              목록으로 돌아가기
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
