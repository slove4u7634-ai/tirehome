"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const [installType, setInstallType] = useState('visit'); // visit or delivery
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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
  const totalPrice = realPrice * quantity + (installType === 'visit' ? 0 : 20000); // 장착점 무료, 배송비 2만원 가산

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

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setInstallType('visit')}
                  className={`p-4 rounded-xl font-bold border-2 transition-all text-sm flex flex-col items-center justify-center gap-1 ${installType === 'visit' ? 'border-orange-500 bg-orange-50/50 text-orange-600 shadow-sm' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                  지정 장착점 방문
                  <span className={`text-xs font-medium ${installType === 'visit' ? 'text-orange-500' : 'text-gray-400'}`}>(무료 장착)</span>
                </button>
                <button 
                  onClick={() => setInstallType('delivery')}
                  className={`p-4 rounded-xl font-bold border-2 transition-all text-sm flex flex-col items-center justify-center gap-1 ${installType === 'delivery' ? 'border-orange-500 bg-orange-50/50 text-orange-600 shadow-sm' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                >
                  일반 택배 배송
                  <span className={`text-xs font-medium ${installType === 'delivery' ? 'text-orange-500' : 'text-gray-400'}`}>(배송비 2만원 추가)</span>
                </button>
              </div>
            </div>

            {/* 총 결제 금액 */}
            {(quantity > 1 || installType === 'delivery') && (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                <span className="font-bold text-gray-600 text-sm">총 결제 예상 금액</span>
                <div>
                  <span className="text-xl font-black text-orange-500">{totalPrice.toLocaleString()}</span>
                  <span className="text-gray-500 font-bold ml-1 text-sm">원</span>
                </div>
              </div>
            )}

            {/* 장바구니 / 구매 버튼 */}
            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-900 font-black text-lg rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                장바구니
              </button>
              <button className="flex-[2] py-4 bg-[#FF4500] text-white font-black text-lg rounded-xl shadow-[0_8px_20px_rgba(255,69,0,0.3)] hover:bg-[#E63E00] hover:shadow-[0_10px_25px_rgba(255,69,0,0.4)] transition-all transform hover:-translate-y-0.5">
                바로 구매하기
              </button>
            </div>

          </div>
        </div>

        {/* 상세 설명 (임의 내용) */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-150">
          <div className="flex items-center justify-center relative mb-16">
            <div className="absolute w-full h-px bg-gray-200 left-0"></div>
            <h2 className="text-2xl font-black text-gray-900 bg-white px-8 relative z-10 tracking-wider">PRODUCT DETAILS</h2>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center pb-10">
            {product.detailImg ? (
              product.detailImg.split(/\r?\n/).map((imgUrl: string, idx: number) => {
                if (!imgUrl.trim()) return null;
                return (
                  <img key={idx} src={imgUrl.trim()} alt={`${product.name} 상세 설명 ${idx + 1}`} className="w-full h-auto object-contain block" />
                );
              })
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center tracking-tight">최고의 주행 경험을 선사합니다</h2>
                <p className="text-gray-500 text-center mb-12 text-lg md:text-xl font-medium leading-relaxed">
                  압도적인 퍼포먼스와 정숙성으로<br/>어떤 노면에서도 완벽한 드라이빙을 경험해보세요.
                </p>
                <div className="w-full aspect-[4/3] bg-gray-50 rounded-3xl flex items-center justify-center mb-8 border border-gray-100">
                  <span className="text-gray-300 font-black tracking-widest uppercase text-xl">상세 이미지 영역 1</span>
                </div>
                <div className="w-full aspect-[4/3] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-100">
                  <span className="text-gray-300 font-black tracking-widest uppercase text-xl">상세 이미지 영역 2</span>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
