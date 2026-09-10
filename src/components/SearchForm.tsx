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
        
        <div className="mb-4 text-center">
          <h2 className="text-xl md:text-2xl font-black text-gray-900">타이어 사이즈로 찾기</h2>
        </div>
        {/* Search Only By Size */}
        <div className="space-y-3 min-h-[140px]">
          
          {/* 1. 사이즈로 찾기 */}
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
