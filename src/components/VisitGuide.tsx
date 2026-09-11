"use client";

import React from 'react';

export default function VisitGuide() {
  return (
    <div className="w-full bg-[#f8f9fa] rounded-2xl py-12 px-6 md:px-12 shadow-sm border border-gray-100 flex flex-col items-center">
      
      {/* Title Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* Logo-like text */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-3xl md:text-4xl font-black text-[#1B3A8C] tracking-tighter">TIRE</span>
          <span className="text-3xl md:text-4xl font-black text-white bg-[#F5C400] px-2 italic tracking-tighter leading-none py-1 shadow-sm">TO</span>
          <span className="text-3xl md:text-4xl font-black text-[#1B3A8C] tracking-tighter">DAY</span>
        </div>
        <div className="text-[#1B3A8C] font-bold text-sm tracking-widest mb-3">타이어투데이</div>
        <h2 className="text-2xl md:text-3xl font-black text-[#1B3A8C]">타이어투데이 방문 및 장착방법 안내</h2>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-8">
        
        {/* Step 1 */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 flex flex-col items-center text-center h-full border border-gray-50 transform hover:-translate-y-1 transition-transform">
          <div className="h-28 w-28 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3 relative inline-block">
            타이어 <span className="text-gray-900 bg-[#F5C400] px-1">검색</span>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">나에게 맞는 타이어<br/>검색 후 예약 진행해 주세요.</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-[#1B3A8C]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="block md:hidden text-[#1B3A8C] my-2 transform rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 flex flex-col items-center text-center h-full border border-gray-50 transform hover:-translate-y-1 transition-transform">
          <div className="h-28 w-28 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3">
            타이어 장착일 예약
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">예약하시면 고객님께<br/>해피콜을 드립니다.</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-[#1B3A8C]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="block md:hidden text-[#1B3A8C] my-2 transform rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 flex flex-col items-center text-center h-full border border-gray-50 transform hover:-translate-y-1 transition-transform">
          <div className="h-28 w-28 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3">
            매장방문<br/>무료장착 후 결제
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">무료장착 및 휠 밸런스<br/>받으시고 현장에서 결제해<br/>주세요.</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:block text-[#1B3A8C]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="block md:hidden text-[#1B3A8C] my-2 transform rotate-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

        {/* Step 4 */}
        <div className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 flex flex-col items-center text-center h-full border border-gray-50 transform hover:-translate-y-1 transition-transform relative">
          <div className="absolute top-4 left-4 bg-blue-100 text-[#1B3A8C] font-black text-sm px-3 py-1 rounded-md shadow-sm border border-blue-200">
            1년
          </div>
          <div className="h-28 w-28 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-14 h-14 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827M11.42 15.17l-3.328-3.328a2.652 2.652 0 113.75-3.75l3.328 3.328m-3.75 3.75l-4.5 4.5a1.5 1.5 0 01-2.12-2.12l4.5-4.5" />
            </svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-3">
            장착후 사후관리!!
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">1년주기 위치교환, 휠 밸런스<br/>무상으로 관리해 드립니다.</p>
        </div>

      </div>
    </div>
  );
}
