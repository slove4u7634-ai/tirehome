export default function BestPage() {
  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Weekly Best</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
            🔥 주간 BEST 타이어
          </h1>
          <p className="text-gray-500 text-sm md:text-base">지금 가장 핫한 인기 타이어!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center group cursor-pointer hover:shadow-xl hover:border-orange-500 transition-all">
              <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 group-hover:scale-110 transition-transform"></div>
              <p className="font-black text-gray-900 text-lg mb-1">인기 타이어 모델 {item}</p>
              <p className="text-gray-400 text-sm mb-3">최고급 승차감과 저소음</p>
              <p className="text-orange-500 font-black text-xl">115,000원</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
