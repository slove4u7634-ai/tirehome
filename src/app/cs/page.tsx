"use client";

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  date: string;
  status: string;
  type: string;
}

export default function CustomerServicePage() {
  const [activeTab, setActiveTab] = useState('notice');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setExpandedId(null);
    fetch(`/api/posts?type=${activeTab}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, [activeTab]);

  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1000px]">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Customer Service</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">고객센터</h1>
          <p className="text-gray-500 text-sm md:text-base">무엇을 도와드릴까요? 궁금하신 점을 해결해 드립니다.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          
          {/* 고객센터 상단 정보 (전화번호 등) */}
          <div className="bg-gray-900 p-8 flex flex-col md:flex-row items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold mb-1">타이어몰 고객만족센터</h2>
              <p className="text-gray-400 text-sm">운영시간: 평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00) / 주말 및 공휴일 휴무</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-3xl font-black text-orange-500 tracking-tighter">1588-0000</p>
              <p className="text-sm font-bold mt-1">이메일 문의: cs@tiremell.co.kr</p>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('notice')}
              className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'notice' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              공지사항
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'faq' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              자주 묻는 질문 (FAQ)
            </button>
            <button 
              onClick={() => alert("로그인이 필요한 서비스입니다.")}
              className="flex-1 py-4 text-center font-bold text-lg text-gray-500 hover:text-gray-900 transition-colors"
            >
              1:1 문의
            </button>
          </div>

          {/* 게시판 리스트 */}
          <div className="p-4 md:p-8">
            <div className="border-t-2 border-gray-900">
              {/* 테이블 헤더 */}
              <div className="flex p-4 border-b border-gray-200 font-bold text-gray-600 text-center bg-gray-50 hidden md:flex">
                <div className="w-20">번호</div>
                <div className="w-24">분류</div>
                <div className="flex-1">제목</div>
                <div className="w-32">등록일</div>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500 font-bold">불러오는 중입니다...</div>
              ) : posts.length === 0 ? (
                <div className="p-8 text-center text-gray-500 font-bold">등록된 게시글이 없습니다.</div>
              ) : (
                posts.map((item) => (
                  <div key={item.id}>
                    <div 
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="flex flex-col md:flex-row p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className="w-20 text-center text-gray-400 font-medium hidden md:block">{item.id}</div>
                      <div className="w-24 text-center mb-2 md:mb-0">
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                          {item.status}
                        </span>
                      </div>
                      <div className="flex-1 font-bold text-gray-900 group-hover:text-orange-500 transition-colors flex justify-between items-center">
                        <span>{item.title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                      <div className="w-32 text-gray-400 text-sm md:text-center mt-2 md:mt-0">
                        {item.date}
                      </div>
                    </div>
                    {/* 내용 영역 */}
                    {expandedId === item.id && (
                      <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed animate-in slide-in-from-top-2 duration-200">
                        {(item as any).content || '내용이 없습니다.'}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2 mt-8">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors font-bold">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-500 text-white font-bold shadow-md shadow-orange-500/30">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors font-bold">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors font-bold">&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
