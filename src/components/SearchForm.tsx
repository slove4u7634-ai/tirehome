"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  const [searchSize, setSearchSize] = useState('');

  const handleSearchClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchSize.trim()) {
      alert('사이즈를 입력해주세요. (예: 245/45R18 또는 2454518)');
      return;
    }
    router.push(`/brands?size=${searchSize}`);
  };

  return (
    <div className="w-full relative px-4 md:px-0">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-400/10 p-6 md:p-10 border border-gray-100 -mt-12 md:mt-0 relative z-30 animate-in fade-in slide-in-from-bottom duration-700">
        
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">타이어 사이즈를 검색해 보세요!</h2>
        </div>
        
        <form onSubmit={handleSearchClick} className="flex items-center w-full bg-white border-2 border-orange-500 rounded-full overflow-hidden transition-shadow focus-within:shadow-md focus-within:shadow-orange-500/20">
          <div className="pl-5 md:pl-6 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchSize}
            onChange={(e) => setSearchSize(e.target.value)}
            placeholder="사이즈를 입력하여 타이어 검색하기 (예: 2454518, 245/45R18)"
            className="flex-1 px-4 py-3 md:py-4 bg-transparent outline-none font-bold text-gray-700 text-sm md:text-lg w-full placeholder-gray-400"
          />
          <button 
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-black px-8 md:px-12 py-3 md:py-4 h-full transition-colors text-sm md:text-lg shrink-0"
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
}
