"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const carData: Record<string, string[]> = {
  "현대": ["아반떼", "쏘나타", "그랜저", "투싼", "싼타페", "팰리세이드"],
  "기아": ["K3", "K5", "K8", "스포티지", "쏘렌토", "카니발"],
  "쉐보레/대우": ["스파크", "말리부", "트랙스", "트레일블레이저", "이쿼녹스"],
  "르노삼성": ["SM6", "QM6", "XM3"],
  "쌍용/KGM": ["티볼리", "코란도", "토레스", "렉스턴"],
  "BMW": ["3시리즈", "5시리즈", "7시리즈", "X3", "X5"],
  "벤츠": ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  "아우디": ["A4", "A6", "A8", "Q5", "Q7"],
  "렉서스": ["ES", "NX", "RX", "LS"],
  "크라이슬러": ["300C"],
  "폭스바겐": ["골프", "티구안", "제타", "아테온"],
  "푸조": ["3008", "5008", "208", "508"],
  "혼다": ["어코드", "CR-V", "시빅"],
  "닛산": ["알티마", "맥시마"],
  "토요타": ["캠리", "라브4", "프리우스"],
  "닷지": ["차저", "챌린저"],
  "랜드로버": ["디스커버리", "레인지로버", "디펜더"],
  "링컨": ["코세어", "에비에이터", "네비게이터"],
  "미니": ["쿠퍼", "컨트리맨", "클럽맨"]
};

export default function SearchForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'size' | 'car' | 'ai'>('size');
  
  // State for Size Search
  const [sizeW, setSizeW] = useState('');
  const [sizeR, setSizeR] = useState('');
  const [sizeI, setSizeI] = useState('');

  const handleSearchClick = () => {
    if (activeTab === 'size') {
      if (!sizeW || !sizeR || !sizeI) {
        alert('사이즈를 모두 선택해주세요.');
        return;
      }
      router.push(`/brands?size=${sizeW}/${sizeR}R${sizeI}`);
    } else {
      alert('현재는 사이즈 검색만 지원됩니다.');
    }
  };

  // State for Car Search
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel(""); // Reset model when brand changes
  };

  return (
    <div className="w-full relative px-4 md:px-0">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl shadow-gray-400/20 p-4 md:p-8 border border-gray-100 -mt-12 md:mt-0 relative z-30 animate-in fade-in slide-in-from-bottom duration-700">
        
        {/* Tabs */}
        <div className="flex w-full bg-gray-100 rounded-xl p-1 mb-4 md:mb-6">
          <button 
            onClick={() => setActiveTab('size')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3 text-[11px] md:text-sm font-black rounded-lg transition-all duration-300 ${activeTab === 'size' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
            <span className={activeTab === 'size' ? 'text-gray-900' : ''}>사이즈로 찾기</span>
          </button>
          <button 
            onClick={() => setActiveTab('car')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3 text-[11px] md:text-sm font-black rounded-lg transition-all duration-300 ${activeTab === 'car' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span className={activeTab === 'car' ? 'text-gray-900' : ''}>차종으로 찾기</span>
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3 text-[11px] md:text-sm font-black rounded-lg transition-all duration-300 ${activeTab === 'ai' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0 3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span className={activeTab === 'ai' ? 'text-gray-900' : ''}>AI 빠른검색</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-3 min-h-[140px]">
          
          {/* 1. 사이즈로 찾기 */}
          {activeTab === 'size' && (
            <div className="grid grid-cols-3 gap-2 animate-in fade-in zoom-in duration-300">
              <select 
                value={sizeW} 
                onChange={(e) => setSizeW(e.target.value)}
                className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-[11px] md:text-base appearance-none transition-all"
              >
                <option value="" disabled>단면폭</option>
                {['145','155','165','175','185','186','195','205','215','225','235','245','255','265','275','285','295','305','315','325','335','345','355','500','550','650','700'].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <select 
                value={sizeR} 
                onChange={(e) => setSizeR(e.target.value)}
                className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-[11px] md:text-base appearance-none transition-all"
              >
                <option value="" disabled>편평비</option>
                {['25','30','35','40','45','50','55','60','65','70','75','76','80','85'].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
              <select 
                value={sizeI} 
                onChange={(e) => setSizeI(e.target.value)}
                className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-[11px] md:text-base appearance-none transition-all"
              >
                <option value="" disabled>인치</option>
                {['12','13','14','15','16','17','18','19','20','21','22','23','24'].map(val => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          )}

          {/* 2. 차종으로 찾기 */}
          {activeTab === 'car' && (
            <div className="grid grid-cols-2 gap-2 animate-in fade-in zoom-in duration-300">
              <select 
                className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-[11px] md:text-base appearance-none transition-all" 
                value={selectedBrand}
                onChange={handleBrandChange}
              >
                <option value="" disabled>브랜드</option>
                {Object.keys(carData).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              
              <select 
                className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-[11px] md:text-base appearance-none transition-all" 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
              >
                <option value="" disabled>차종</option>
                {selectedBrand && carData[selectedBrand].map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          )}

          {/* 3. AI 빠른검색 */}
          {activeTab === 'ai' && (
            <div className="flex gap-2 animate-in fade-in zoom-in duration-300">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="차량번호를 입력해주세요 (예: 123가4567)" 
                  className="w-full p-2.5 md:p-4 bg-gray-50 border border-gray-100 rounded-lg md:rounded-xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-sm md:text-base transition-all"
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
          )}

          <button 
            onClick={handleSearchClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 md:py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-lg mt-4"
          >
            <span>타이어 찾기</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
