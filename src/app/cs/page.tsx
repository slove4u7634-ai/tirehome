"use client";

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  date: string;
  status: string;
  type: string;
  content?: string;
}

export default function CustomerServicePage() {
  const [activeTab, setActiveTab] = useState('notice');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 1:1 Inquiry States
  const [isWritingInquiry, setIsWritingInquiry] = useState(false);
  const [authenticatedPosts, setAuthenticatedPosts] = useState<Record<number, boolean>>({});
  const [passwordModalId, setPasswordModalId] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [checkNameInput, setCheckNameInput] = useState('');
  
  // Write Form States
  const [newInquiryTitle, setNewInquiryTitle] = useState('');
  const [newInquiryName, setNewInquiryName] = useState('');
  const [newInquiryPassword, setNewInquiryPassword] = useState('');
  const [newInquiryContent, setNewInquiryContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setIsLoading(true);
    setExpandedId(null);
    setIsWritingInquiry(false);
    setCurrentPage(1);
    fetch(`/api/posts?type=${activeTab}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, [activeTab]);

  const maskName = (name: string) => {
    if (!name) return '익명';
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryTitle || !newInquiryName || !newInquiryPassword || !newInquiryContent) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (newInquiryPassword.length !== 4 || isNaN(Number(newInquiryPassword))) {
      alert("비밀번호는 4자리 숫자로 입력해주세요.");
      return;
    }
    
    setIsSubmitting(true);
    const contentPayload = JSON.stringify({
      author: newInquiryName,
      password: newInquiryPassword,
      body: newInquiryContent,
      reply: ''
    });

    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newInquiryTitle,
          content: contentPayload,
          status: '답변대기',
          type: 'inquiry'
        })
      });
      alert("문의가 정상적으로 등록되었습니다.");
      setIsWritingInquiry(false);
      setNewInquiryTitle('');
      setNewInquiryName('');
      setNewInquiryPassword('');
      setNewInquiryContent('');
      
      setIsLoading(true);
      const res = await fetch(`/api/posts?type=inquiry`);
      const data = await res.json();
      setPosts(data);
      setIsLoading(false);
    } catch (err) {
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostClick = (item: Post) => {
    if (activeTab === 'inquiry') {
      if (expandedId === item.id) {
        setExpandedId(null);
        return;
      }
      if (authenticatedPosts[item.id]) {
        setExpandedId(item.id);
      } else {
        setPasswordModalId(item.id);
        setPasswordInput('');
        setCheckNameInput('');
      }
    } else {
      setExpandedId(expandedId === item.id ? null : item.id);
    }
  };

  const handlePasswordCheck = (item: Post) => {
    try {
      const parsed = JSON.parse(item.content || '{}');
      if (parsed.password === passwordInput && parsed.author === checkNameInput) {
        setAuthenticatedPosts(prev => ({ ...prev, [item.id]: true }));
        setPasswordModalId(null);
        setExpandedId(item.id);
      } else {
        alert("이름 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch {
      alert("데이터를 확인할 수 없습니다.");
    }
  };

  const renderContent = (item: Post) => {
    if (activeTab === 'inquiry') {
      try {
        const parsed = JSON.parse(item.content || '{}');
        return (
          <div className="text-left">
            <div className="mb-4">
              <span className="font-bold text-gray-900 block mb-2">문의 내용</span>
              <p className="text-gray-700 whitespace-pre-wrap">{parsed.body}</p>
            </div>
            {parsed.reply ? (
              <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <span className="font-bold text-orange-600 block mb-2">관리자 답변</span>
                <p className="text-gray-800 whitespace-pre-wrap">{parsed.reply}</p>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-500 font-medium text-center">
                아직 답변이 등록되지 않았습니다.
              </div>
            )}
          </div>
        );
      } catch {
        return "내용을 불러올 수 없습니다.";
      }
    }
    return item.content || '내용이 없습니다.';
  };

  const getAuthorName = (item: Post) => {
    if (activeTab === 'inquiry') {
      try {
        const parsed = JSON.parse(item.content || '{}');
        return maskName(parsed.author);
      } catch {
        return '익명';
      }
    }
    return '관리자';
  };

  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1000px]">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Customer Service</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">고객센터</h1>
          <p className="text-gray-500 text-sm md:text-base">무엇을 도와드릴까요? 궁금하신 점을 해결해드립니다.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          
          {/* 고객센터 상단 정보 */}
          <div className="bg-gray-900 p-8 flex flex-col md:flex-row items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold mb-1">타이어투데이 고객만족센터</h2>
              <p className="text-gray-400 text-sm">운영시간: 평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00) / 주말 및 공휴일 휴무</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-3xl font-black text-orange-500 tracking-tighter">1588-0000</p>
              <p className="text-sm font-bold mt-1">이메일 문의: cs@tiretoday.co.kr</p>
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
              onClick={() => setActiveTab('inquiry')}
              className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'inquiry' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'}`}
            >
              1:1 문의
            </button>
          </div>

          {/* 게시글 리스트 영역 */}
          <div className="p-4 md:p-8">
            
            {activeTab === 'inquiry' && !isWritingInquiry && (
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setIsWritingInquiry(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  문의하기
                </button>
              </div>
            )}

            {isWritingInquiry ? (
              <div className="border-2 border-gray-100 rounded-xl p-6 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">1:1 문의 작성</h3>
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">제목</label>
                    <input 
                      type="text" 
                      value={newInquiryTitle} 
                      onChange={(e) => setNewInquiryTitle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" 
                      placeholder="문의 제목을 입력해주세요" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">작성자 이름</label>
                      <input 
                        type="text" 
                        value={newInquiryName} 
                        onChange={(e) => setNewInquiryName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" 
                        placeholder="예: 홍길동" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">비밀번호 (숫자 4자리)</label>
                      <input 
                        type="password" 
                        maxLength={4}
                        value={newInquiryPassword} 
                        onChange={(e) => setNewInquiryPassword(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" 
                        placeholder="비밀번호 4자리 (확인용)" 
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">문의 내용</label>
                    <textarea 
                      value={newInquiryContent} 
                      onChange={(e) => setNewInquiryContent(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 min-h-[200px]" 
                      placeholder="문의하실 내용을 자세히 입력해주세요." 
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button 
                      type="button"
                      onClick={() => setIsWritingInquiry(false)}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300"
                    >
                      {isSubmitting ? '등록 중...' : '문의 등록'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="border-t-2 border-gray-900">
                {/* 테이블 헤더 */}
                <div className="flex p-4 border-b border-gray-200 font-bold text-gray-600 text-center bg-gray-50 hidden md:flex">
                  <div className="w-16">번호</div>
                  {activeTab !== 'inquiry' && <div className="w-24">분류</div>}
                  <div className="flex-1">제목</div>
                  <div className="w-24">작성자</div>
                  <div className="w-28">등록일</div>
                  {activeTab === 'inquiry' && <div className="w-24">상태</div>}
                </div>

                {isLoading ? (
                  <div className="p-8 text-center text-gray-500 font-bold">불러오는 중입니다...</div>
                ) : posts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 font-bold">등록된 게시글이 없습니다.</div>
                ) : (
                  paginatedPosts.map((item) => (
                    <div key={item.id}>
                      <div 
                        onClick={() => handlePostClick(item)}
                        className="flex flex-col md:flex-row p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        <div className="w-16 text-center text-gray-400 font-medium hidden md:block">{item.id}</div>
                        
                        {activeTab !== 'inquiry' && (
                          <div className="w-24 text-center mb-2 md:mb-0">
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                              {item.status}
                            </span>
                          </div>
                        )}

                        <div className="flex-1 font-bold text-gray-900 group-hover:text-orange-500 transition-colors flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            {activeTab === 'inquiry' && (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                              </svg>
                            )}
                            {item.title}
                          </span>
                          {(!passwordModalId || passwordModalId !== item.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="w-24 text-gray-500 text-sm md:text-center mt-2 md:mt-0">
                          {getAuthorName(item)}
                        </div>

                        <div className="w-28 text-gray-400 text-sm md:text-center mt-2 md:mt-0">
                          {item.date?.substring(0, 10)}
                        </div>

                        {activeTab === 'inquiry' && (
                          <div className="w-24 text-center mt-2 md:mt-0">
                            <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${item.status === '답변완료' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                              {item.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 비밀번호 입력 창 */}
                      {passwordModalId === item.id && (
                        <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center animate-in slide-in-from-top-2 duration-200">
                          <p className="text-gray-900 font-bold mb-4">비밀글입니다. 이름과 비밀번호를 입력해주세요.</p>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              value={checkNameInput}
                              onChange={(e) => setCheckNameInput(e.target.value)}
                              placeholder="작성자 이름"
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 w-32 text-center"
                            />
                            <input 
                              type="password"
                              maxLength={4}
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value.replace(/[^0-9]/g, ''))}
                              placeholder="비밀번호 4자리"
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 w-32 text-center tracking-widest"
                            />
                            <button 
                              onClick={() => handlePasswordCheck(item)}
                              className="bg-gray-900 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              확인
                            </button>
                            <button 
                              onClick={() => setPasswordModalId(null)}
                              className="bg-white border border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 내용 영역 */}
                      {expandedId === item.id && (
                        <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 text-gray-700 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                          {renderContent(item)}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 페이지네이션 */}
            {!isWritingInquiry && totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors font-bold disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md font-bold transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                        : 'border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors font-bold disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
