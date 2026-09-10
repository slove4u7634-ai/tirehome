"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  
  const resolvedParams = use(params);

  useEffect(() => {
    // Extract ID (e.g., 'pt-1' -> 1)
    const id = resolvedParams.id.replace('pt-', '');
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === parseInt(id));
        setProduct(found);
        setIsLoading(false);
      });
  }, [resolvedParams.id]);

  if (isLoading) {
    return <div className="flex-1 bg-white flex items-center justify-center min-h-[500px]">로딩 중...</div>;
  }

  if (!product) {
    return <div className="flex-1 bg-white flex items-center justify-center min-h-[500px]">상품을 찾을 수 없습니다.</div>;
  }

  const realPrice = product.price;

  // 뱃지 색상 매핑
  const brandKor = product.brand === 'KUMHO' ? '금호타이어' : product.brand === 'HANKOOK' ? '한국타이어' : product.brand === 'NEXEN' ? '넥센타이어' : product.brand;
  const tagColor = product.tags.includes('SUV용') || product.tags.includes('SUV/RV') ? 'text-green-500 border-green-200' : 'text-blue-500 border-blue-200';
  const categoryTag = product.tags.find((t: string) => t.includes('SUV') || t.includes('승용차')) || '승용차용';

  return (
    <div className="flex-1 bg-white">
      {/* 빵판 (Breadcrumb) */}
      <div className="border-b border-gray-100 py-4 mb-4 md:mb-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1240px] flex gap-2 text-sm text-gray-400 font-medium">
          <Link href="/" className="hover:text-gray-900">홈</Link>
          <span>&gt;</span>
          <Link href="/brands" className="hover:text-gray-900">브랜드별 타이어</Link>
          <span>&gt;</span>
          <span className="font-bold text-gray-900">{brandKor}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-[1240px] pb-16 md:pb-24">
        
        {/* 상단: 이미지 & 구매 정보 */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 mb-24 animate-in fade-in slide-in-from-bottom duration-500">
          
          {/* 좌측: 상품 이미지 */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-50 p-8 flex items-center justify-center aspect-square transition-transform duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
              <img src={product.img || product.image} alt={product.name || product.title} className="w-[85%] h-[85%] object-contain" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600?text=Tire'; }} />
            </div>
          </div>

          {/* 우측: 상품 정보 및 옵션 선택 */}
          <div className="md:w-1/2 flex flex-col justify-center">
            
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <span className="bg-orange-600 text-white text-[11px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{brandKor}</span>
                <span className={`bg-transparent border text-[11px] font-black px-2 py-0.5 rounded uppercase ${tagColor}`}>{categoryTag}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight tracking-tight">{product.name || product.title}</h1>
              <p className="text-gray-500 font-medium mb-6 text-base">{product.subtitle}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {Array.from(new Set(product.tags)).map((tag: any, idx: number) => (
                  <span key={idx} className="text-sm font-bold text-gray-500 border border-gray-200 px-4 py-1.5 rounded-full hover:border-gray-300 transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 규격 및 가격 박스 */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-bold text-sm">규격 / 사이즈</span>
                <span className="text-orange-600 font-black text-lg">{product.size}</span>
              </div>
              <div className="h-px bg-gray-100 w-full mb-6"></div>
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-black text-base">판매가격</span>
                <div className="flex flex-col items-end">
                  {product.originalPrice && product.originalPrice > realPrice && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-red-500 font-black text-sm">{Math.round((product.originalPrice - realPrice) / product.originalPrice * 100)}%</span>
                      <span className="text-gray-400 font-medium text-xs line-through">{product.originalPrice.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-black text-gray-900">{realPrice.toLocaleString()}</span>
                    <span className="font-bold text-gray-400 ml-1 text-lg">원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 수량 및 장착 옵션 (기능 유지) */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="font-bold text-gray-700 text-sm">수량 (본)</span>
                <div className="flex items-center w-28 bg-white border border-gray-200 rounded-lg overflow-hidden h-9 shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 hover:bg-gray-50 font-black text-gray-600 transition-colors">-</button>
                  <div className="flex-1 text-center font-bold text-sm text-gray-900">{quantity}</div>
                  <button onClick={() => setQuantity(quantity + 1)} className="flex-1 hover:bg-gray-50 font-black text-gray-600 transition-colors">+</button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`p-4 rounded-xl font-bold border-2 transition-all text-sm flex flex-col items-center justify-center gap-1 border-orange-500 bg-orange-50/50 text-orange-600 shadow-sm`}
                >
                  지정 장착점 방문
                  <span className={`text-xs font-medium text-orange-500`}>(무료 장착)</span>
                </div>
              </div>
            </div>

            {/* 방문장착 예약 버튼 */}
            <div className="flex gap-3">
              <Link href={`/reservation?productId=${product.id}&qty=${quantity}`} className="flex-1 py-4 bg-[#FF4500] text-white text-center font-black text-lg rounded-xl shadow-[0_8px_20px_rgba(255,69,0,0.3)] hover:bg-[#E63E00] hover:shadow-[0_10px_25px_rgba(255,69,0,0.4)] transition-all transform hover:-translate-y-0.5">
                지정 장착점 방문 예약하기
              </Link>
            </div>

          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex w-full border-t border-b border-gray-200 mb-12 sticky top-[56px] md:top-[80px] bg-white z-40 animate-in fade-in slide-in-from-bottom duration-500 delay-150">
          <button onClick={() => setActiveTab('info')} className={`flex-1 py-4 text-center font-bold text-sm md:text-base transition-colors ${activeTab === 'info' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>상품 기본정보</button>
          <button onClick={() => setActiveTab('review')} className={`flex-1 py-4 text-center font-bold text-sm md:text-base transition-colors ${activeTab === 'review' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>리뷰 <span className="text-orange-500 text-xs ml-0.5 bg-orange-50 px-1.5 py-0.5 rounded-full">0</span></button>
          <button onClick={() => setActiveTab('qna')} className={`flex-1 py-4 text-center font-bold text-sm md:text-base transition-colors ${activeTab === 'qna' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>문의</button>
          <button onClick={() => setActiveTab('delivery')} className={`flex-1 py-4 text-center font-bold text-sm md:text-base transition-colors ${activeTab === 'delivery' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>배송 및 반품</button>
        </div>

        {/* 탭 콘텐츠 영역 */}
        <div className="animate-in fade-in duration-500 min-h-[400px]">
          
          {/* 상품 기본정보 탭 */}
          {activeTab === 'info' && (
            <div className="max-w-5xl mx-auto flex flex-col items-center pb-10">
              
              {/* 상품 정보 테이블 */}
              <div className="w-full mb-16">
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6">상품 기본정보</h3>
                <div className="border-t-2 border-gray-900">
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">상품명</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">{product.name || product.title}</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">크기</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">{product.size}</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">제조사</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">{brandKor}</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">원산지</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">한국 / 중국 외 다수 (제품/포장 참조)</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">동일모델의 출시년월</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">발송일 기준 최대 1년 이내 (평균 3-6개월 이내)</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                    <div className="w-32 md:w-56 bg-gray-50/50 p-4 flex items-center font-bold text-xs md:text-sm text-gray-700">KC인증</div>
                    <div className="flex-1 p-4 text-xs md:text-sm text-gray-700 font-medium">상세페이지 참조</div>
                  </div>
                </div>
              </div>

              {/* 상품 상세 이미지 */}
              {product.detailImg ? (
                product.detailImg.split(/\r?\n/).map((imgUrl: string, idx: number) => {
                  if (!imgUrl.trim()) return null;
                  return (
                    <img key={idx} src={imgUrl.trim()} alt={`${product.name} 상세 설명 ${idx + 1}`} className="w-full h-auto object-contain block" />
                  );
                })
              ) : (
                <div className="w-full max-w-4xl">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center tracking-tight mt-10">최고의 주행 경험을 선사합니다</h2>
                  <p className="text-gray-500 text-center mb-12 text-lg md:text-xl font-medium leading-relaxed">
                    압도적인 퍼포먼스와 정숙성으로<br/>어떤 노면에서도 완벽한 드라이빙을 경험해보세요.
                  </p>
                  <div className="w-full aspect-[4/3] bg-gray-50 rounded-3xl flex items-center justify-center mb-8 border border-gray-100">
                    <span className="text-gray-300 font-black tracking-widest uppercase text-xl">상세 이미지 영역 1</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 리뷰 탭 */}
          {activeTab === 'review' && (
            <div className="max-w-5xl mx-auto py-10 text-center border-t border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">등록된 리뷰가 없습니다.</h3>
              <p className="text-gray-500 text-sm">첫 번째 리뷰를 남겨주세요!</p>
            </div>
          )}

          {/* 문의 탭 */}
          {activeTab === 'qna' && (
            <div className="max-w-5xl mx-auto py-10 text-center border-t border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">상품 문의내역이 없습니다.</h3>
              <p className="text-gray-500 text-sm mb-6">상품에 대해 궁금한 점을 남겨주시면 친절히 답변해 드립니다.</p>
              <button className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">문의하기</button>
            </div>
          )}

          {/* 배송 및 반품 탭 */}
          {activeTab === 'delivery' && (
            <div className="max-w-5xl mx-auto py-10 px-4 md:px-0">
              <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-black text-gray-900 mb-6">배송 안내</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-medium mb-10">
                  <li>배송 방법: 택배 또는 지정 장착점 무료 배송</li>
                  <li>배송 지역: 전국 (제주/도서산간 지역 제외)</li>
                  <li>배송 비용: 무료 장착(지정점) 또는 일반 배송비 20,000원 추가</li>
                  <li>배송 기간: 결제일로부터 1~3일 (주말/공휴일 제외)</li>
                </ul>

                <h3 className="text-lg font-black text-gray-900 mb-6">교환 및 반품 안내</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 font-medium">
                  <li>타이어 장착(휠 결합) 후에는 교환 및 반품이 절대 불가합니다.</li>
                  <li>단순 변심에 의한 반품/교환시 왕복 배송비는 고객님 부담입니다. (타이어 부피 특성상 비용이 높을 수 있습니다)</li>
                  <li>제품 수령 후 7일 이내 교환 및 반품이 가능합니다.</li>
                  <li>제품 하자의 경우 고객센터(1588-0000)로 먼저 문의해주시기 바랍니다.</li>
                </ul>
              </div>
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
}
