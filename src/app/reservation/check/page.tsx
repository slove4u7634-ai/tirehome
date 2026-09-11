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
    <div className="min-h-[800px] bg-gray-50 py-16 px-4 flex flex-col items-center relative">
      <div className="relative w-full max-w-3xl">
        <div className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm rounded-xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">방문장착 예약 확인</h1>
            <p className="text-gray-500 text-sm md:text-base">예약 신청 시 등록하신 이름(예약자명)과 휴대폰번호를 입력하세요</p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="border border-gray-200 p-6 md:p-8 space-y-6 bg-gray-50 rounded-lg">
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-gray-700 font-bold text-sm md:w-24 shrink-0">예약자명</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="flex-1 bg-white border border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-gray-700 font-bold text-sm md:w-24 shrink-0">휴대폰번호</label>
                <div className="flex-1 flex items-center gap-2">
                  <select 
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    className="w-[30%] bg-white border border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
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
                    className="w-[35%] bg-white border border-gray-300 text-gray-900 p-3 text-center rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <input 
                    type="text" 
                    maxLength={4}
                    value={phone3}
                    onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-[35%] bg-white border border-gray-300 text-gray-900 p-3 text-center rounded-md focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-center">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-16 rounded-md shadow-md transition-colors flex items-center gap-2 disabled:opacity-70 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                {loading ? '조회중...' : '예약조회'}
              </button>
            </div>
          </form>

          {reservations !== null && (
            <div className="mt-12 bg-gray-50 p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">조회 결과 ({reservations.length}건)</h2>
              
              {reservations.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  입력하신 정보로 조회된 예약 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res: any) => (
                    <div key={res.id} className="bg-white p-5 border border-gray-200 rounded-md shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-sm text-gray-500">접수일: {new Date(res.createdAt).toLocaleString()}</div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                          {getStatusText(res.status)}
                        </span>
                      </div>
                      <div className="text-gray-900 mb-2">
                        <span className="font-bold text-orange-500 mr-2">예약상품</span> 
                        {res.product?.name} ({res.product?.size}) - {res.product?.qty}개
                      </div>
                      <div className="text-gray-600 text-sm">
                        <span className="font-bold text-gray-700 mr-2">방문일시</span> 
                        {res.schedule?.date} {res.schedule?.time}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        <span className="font-bold text-gray-700 mr-2">예약차량</span> 
                        {res.customer?.car} ({res.customer?.carNumber})
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
                        <div className="text-gray-500 text-xs font-medium">현금/카드동일(VAT포함)</div>
                        <div className="text-lg font-black text-gray-900">
                          결제예정금액: <span className="text-orange-500 text-xl ml-1">{res.product?.totalPrice ? res.product.totalPrice.toLocaleString() : '0'}</span>원
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
