"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ReservationCheckPage() {
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<any[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone2 || !phone3) {
      alert('예약자명과 휴대폰번호를 정확히 입력해주세요.');
      return;
    }

    setLoading(true);
    const searchPhone = `${phone1}-${phone2}-${phone3}`;

    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      
      const matched = data.filter((r: any) => 
        r.customer?.name === name && r.customer?.phone === searchPhone
      );
      
      setReservations(matched);
    } catch (error) {
      alert('예약 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return '예약대기';
      case 'confirmed': return '예약확정';
      case 'completed': return '장착완료';
      case 'cancelled': return '취소됨';
      default: return '상태알수없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-red-50 text-red-600 border-red-200';
      case 'confirmed': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-600 border-green-200';
      case 'cancelled': return 'bg-gray-50 text-gray-500 border-gray-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="min-h-[800px] bg-zinc-950 py-16 px-4 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent transform rotate-45"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[150%] bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent transform rotate-45"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-black/80 backdrop-blur-md border border-[#d4af37]/30 p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">타이어투데이 방문장착예약 확인</h1>
            <p className="text-zinc-400 text-sm md:text-base">예약 신청 시 등록하신 이름(예약자명)과 휴대폰번호를 입력하세요</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="border border-zinc-800 p-6 md:p-8 space-y-6 bg-black/40">
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-zinc-300 font-bold text-sm md:w-24 shrink-0">예약자명</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-zinc-300 font-bold text-sm md:w-24 shrink-0">휴대폰번호</label>
                <div className="flex-1 flex items-center gap-2">
                  <select 
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    className="w-[30%] bg-zinc-900 border border-zinc-800 text-white p-3 rounded-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  >
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  <input 
                    type="text" 
                    maxLength={4}
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-[35%] bg-zinc-900 border border-zinc-800 text-white p-3 text-center rounded-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                  <input 
                    type="text" 
                    maxLength={4}
                    value={phone3}
                    onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-[35%] bg-zinc-900 border border-zinc-800 text-white p-3 text-center rounded-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  />
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-center">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#FF4500] hover:bg-[#E63E00] text-white font-bold py-4 px-16 rounded-md shadow-lg transition-colors flex items-center gap-2 disabled:opacity-70 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                {loading ? '조회중...' : '예약조회'}
              </button>
            </div>
          </form>

          {reservations !== null && (
            <div className="mt-12 bg-zinc-900/80 p-6 border border-zinc-800">
              <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-700 pb-2">조회 결과 ({reservations.length}건)</h2>
              
              {reservations.length === 0 ? (
                <div className="text-center py-10 text-zinc-500">
                  입력하신 정보로 조회된 예약 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res: any) => (
                    <div key={res.id} className="bg-zinc-800 p-5 border border-zinc-700 rounded-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-sm text-zinc-400">접수일: {new Date(res.createdAt).toLocaleString()}</div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                          {getStatusText(res.status)}
                        </span>
                      </div>
                      <div className="text-white mb-2">
                        <span className="font-bold text-[#d4af37] mr-2">예약상품</span> 
                        {res.product?.name} ({res.product?.size}) - {res.product?.qty}개
                      </div>
                      <div className="text-zinc-300 text-sm">
                        <span className="font-bold text-zinc-500 mr-2">방문일시</span> 
                        {res.schedule?.date} {res.schedule?.time}
                      </div>
                      <div className="text-zinc-300 text-sm mt-1">
                        <span className="font-bold text-zinc-500 mr-2">예약차량</span> 
                        {res.customer?.car} ({res.customer?.carNumber})
                      </div>
                      <div className="mt-4 pt-3 border-t border-zinc-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
                        <div className="text-zinc-400 text-xs">현금/카드동일(VAT포함)</div>
                        <div className="text-lg font-black text-white">
                          결제예정금액: <span className="text-[#FF4500] text-xl ml-1">{res.product?.totalPrice ? res.product.totalPrice.toLocaleString() : '0'}</span>원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
