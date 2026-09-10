"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ReservationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const qty = parseInt(searchParams.get('qty') || '4');
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCostPopup, setShowCostPopup] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phonePrefix: '010',
    phoneMid: '',
    phoneLast: '',
    carBrand: '',
    carModel: '',
    carNumber: '',
    visitDate: '',
    visitTime: '오전09시 ~ 오전10시',
    alignment: false,
    message: '',
    agree: false
  });

  useEffect(() => {
    if (productId) {
      fetch(`/api/products`)
        .then(res => res.json())
        .then(data => {
          const found = data.find((p: any) => p.id === parseInt(productId));
          setProduct(found);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneMid || !formData.phoneLast || !formData.carBrand || !formData.carNumber || !formData.visitDate) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    if (!formData.agree) {
      alert('개인정보 제공에 동의해주세요.');
      return;
    }

    setSubmitting(true);
    
    const reservationData = {
      product: product ? {
        id: product.id,
        name: product.name,
        size: product.size,
        price: product.price,
        qty: qty,
        totalPrice: product.price * qty
      } : null,
      customer: {
        name: formData.name,
        phone: `${formData.phonePrefix}-${formData.phoneMid}-${formData.phoneLast}`,
        car: `${formData.carBrand} ${formData.carModel}`,
        carNumber: formData.carNumber
      },
      schedule: {
        date: formData.visitDate,
        time: formData.visitTime
      },
      options: {
        alignment: formData.alignment,
        message: formData.message
      }
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      
      if (res.ok) {
        alert('방문예약신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.');
        router.push('/');
      } else {
        throw new Error('예약 실패');
      }
    } catch (err) {
      alert('예약 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-[500px] flex items-center justify-center">로딩중...</div>;
  if (!product) return <div className="min-h-[500px] flex items-center justify-center">선택된 상품이 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <h1 className="text-2xl font-black mb-8 border-b-2 border-gray-900 pb-4">방문예약신청</h1>
      
      {/* Product Info */}
      <div className="bg-white border border-gray-200 mb-10">
        <div className="flex bg-gray-100 text-center font-bold text-sm text-gray-700 py-3 border-b border-gray-200">
          <div className="w-24 md:w-32">상품이미지</div>
          <div className="flex-1">상품명</div>
          <div className="w-32 hidden md:block">사이즈</div>
          <div className="w-24">총수량</div>
          <div className="w-32">무료장착가격</div>
        </div>
        <div className="flex items-center text-center py-4 text-sm font-medium">
          <div className="w-24 md:w-32 flex justify-center">
            <img src={product.img} alt={product.name} className="w-16 h-16 object-contain" />
          </div>
          <div className="flex-1 text-left px-4">
            <span className="text-gray-500 mr-2">[{product.brand}]</span>
            {product.name}
            <div className="md:hidden mt-1 text-xs text-gray-500">사이즈: {product.size}</div>
          </div>
          <div className="w-32 hidden md:block">{product.size}</div>
          <div className="w-24">
            <span className="border px-3 py-1 bg-gray-50">{qty} EA</span>
          </div>
          <div className="w-32 font-bold">{(product.price * qty).toLocaleString()}원</div>
        </div>
        <div className="bg-[#FF9933] text-white p-4 flex justify-between font-black text-lg">
          <span>현금/카드동일 (부가세포함)</span>
          <span>{(product.price * qty).toLocaleString()} 원</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200">
        {/* Form Table */}
        <div className="border-b border-gray-200">
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">고객명 *</div>
            <div className="flex-1 p-4">
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 w-full md:w-64" required />
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">연락처 *</div>
            <div className="flex-1 p-4 flex gap-2 items-center">
              <select value={formData.phonePrefix} onChange={e => setFormData({...formData, phonePrefix: e.target.value})} className="border p-2">
                <option>010</option><option>011</option><option>016</option>
              </select>
              <span>-</span>
              <input type="text" maxLength={4} value={formData.phoneMid} onChange={e => setFormData({...formData, phoneMid: e.target.value})} className="border p-2 w-20" required />
              <span>-</span>
              <input type="text" maxLength={4} value={formData.phoneLast} onChange={e => setFormData({...formData, phoneLast: e.target.value})} className="border p-2 w-20" required />
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">차량선택 *</div>
            <div className="flex-1 p-4 flex gap-2">
              <input type="text" placeholder="제조사 (예: 기아)" value={formData.carBrand} onChange={e => setFormData({...formData, carBrand: e.target.value})} className="border p-2 w-32" required />
              <input type="text" placeholder="차종 (예: K5)" value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} className="border p-2 w-48" required />
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">차량번호 *</div>
            <div className="flex-1 p-4">
              <input type="text" placeholder="예: 12가3456" value={formData.carNumber} onChange={e => setFormData({...formData, carNumber: e.target.value})} className="border p-2 w-full md:w-64" required />
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">장착방문일시 *</div>
            <div className="flex-1 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <label className="flex items-center gap-1"><input type="radio" checked readOnly className="accent-[#FF4500]" /> 예약방문장착</label>
              <input type="date" value={formData.visitDate} onChange={e => setFormData({...formData, visitDate: e.target.value})} className="border p-2 text-sm" required />
              <span className="text-[#FF4500] text-xs">* 택배배송은 별도 문의주세요 (미정)</span>
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">예약시간 *</div>
            <div className="flex-1 p-4">
              <select value={formData.visitTime} onChange={e => setFormData({...formData, visitTime: e.target.value})} className="border p-2">
                <option>오전09시 ~ 오전10시</option>
                <option>오전10시 ~ 오전11시</option>
                <option>오전11시 ~ 오후12시</option>
                <option>오후13시 ~ 오후14시</option>
                <option>오후14시 ~ 오후15시</option>
                <option>오후15시 ~ 오후16시</option>
                <option>오후16시 ~ 오후17시</option>
                <option>오후17시 ~ 오후18시</option>
              </select>
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-start pt-6">매장정보</div>
            <div className="flex-1 p-4 flex gap-6 items-start">
              <div className="w-48 h-32 bg-gray-200 hidden md:flex items-center justify-center text-sm font-bold text-gray-500 overflow-hidden relative">
                 <img src="/img/banner_1.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Shop" />
                 <span className="relative z-10 bg-white/80 px-2 py-1">타이어투데이 일산본점</span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <h3 className="font-black text-lg mb-2">타이어투데이 일산본점</h3>
                <div className="flex gap-2"><span className="bg-[#FF9933] text-white px-2 py-0.5 text-xs">매장주소</span> <span>경기도 고양시 일산서구 덕이로 292</span></div>
                <div className="flex gap-2"><span className="bg-[#FF9933] text-white px-2 py-0.5 text-xs">영업시간</span> <span>평일 09:00 ~ 19:00 | 토/공휴일 09:00 ~ 18:00</span></div>
                <div className="flex gap-2"><span className="bg-[#FF9933] text-white px-2 py-0.5 text-xs">문의전화</span> <span className="font-bold text-gray-400">미정</span></div>
              </div>
            </div>
          </div>
          <div className="flex border-b border-gray-100">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-center">휠 얼라인먼트</div>
            <div className="flex-1 p-4 text-sm flex items-center gap-2 flex-wrap relative">
              <input type="checkbox" checked={formData.alignment} onChange={e => setFormData({...formData, alignment: e.target.checked})} className="accent-[#FF4500]" />
              <span>휠 얼라인먼트 무상점검요청 (점검 후 교정작업 진행 시 비용발생)</span>
              
              <div className="relative inline-block ml-1">
                <button 
                  type="button" 
                  onClick={() => setShowCostPopup(!showCostPopup)} 
                  className="text-[#FF4500] hover:underline focus:outline-none"
                >
                  비용확인하기
                </button>
                
                {showCostPopup && (
                  <div className="absolute top-full left-0 md:left-full md:-ml-32 mt-2 w-72 bg-[#2d2d2d] text-white p-4 rounded shadow-2xl z-50 text-xs border border-gray-700">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between w-full">
                          <span className="text-gray-100">국산 승용차량</span> 
                          <span className="font-bold text-white text-sm">44,000원~66,000원</span>
                        </div>
                        <div className="flex justify-between w-full border-t border-gray-600 pt-2">
                          <span className="text-gray-100">수입차</span> 
                          <span className="font-bold text-white text-sm">55,000원~88,000원</span>
                        </div>
                        <p className="text-gray-400 mt-1">(일부 차종별 금액 상이하니 별도 문의)</p>
                      </div>
                      <button type="button" onClick={() => setShowCostPopup(false)} className="text-gray-400 hover:text-white font-black px-2 ml-2 -mt-1 -mr-2">X</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-32 md:w-48 bg-gray-50 p-4 font-bold text-sm flex items-start pt-4">남기실말씀</div>
            <div className="flex-1 p-4">
              <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full border p-2 h-24" />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <h3 className="font-bold text-lg mt-10 mb-4">개인정보제공동의</h3>
        <div className="border border-gray-200 bg-gray-50 p-4">
          <div className="flex border-b border-white pb-4 mb-4">
            <div className="w-32 font-bold text-sm pt-2">약관동의</div>
            <div className="flex-1">
              <div className="border bg-white p-3 text-xs text-gray-600 h-32 overflow-y-auto mb-2 leading-relaxed">
                당사는 (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.<br/>
                <br/>
                ■ 개인정보의 수집, 이용 목적 : 방문예약신청<br/>
                ■ 수집하는 개인정보의 항목 : 성명, 연락처, 차량번호 외
              </div>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={formData.agree} onChange={e => setFormData({...formData, agree: e.target.checked})} className="accent-[#FF4500]" />
                약관에 동의합니다.
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button type="submit" disabled={submitting} className="bg-[#FF4500] hover:bg-[#E63E00] text-white font-black text-xl px-16 py-4 rounded transition-colors disabled:opacity-50">
            {submitting ? '신청중...' : '방문예약신청'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">로딩중...</div>}>
      <ReservationForm />
    </Suspense>
  );
}
