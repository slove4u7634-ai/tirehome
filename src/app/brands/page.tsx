"use client";

import { useState, useEffect } from 'react';

export default function BrandsPage() {
  const brands = [
    { eng: "KUMHO", kor: "금호타이어" },
    { eng: "HANKOOK", kor: "한국타이어" },
    { eng: "NEXEN", kor: "넥센타이어" },
    { eng: "MICHELIN", kor: "미쉐린" },
    { eng: "CONTINENTAL", kor: "콘티넨탈" },
    { eng: "BRIDGESTONE", kor: "브리지스톤" },
    { eng: "PIRELLI", kor: "피렐리" },
    { eng: "DUNLOP", kor: "던롭" },
    { eng: "GOODYEAR", kor: "굿이어" },
  ];

  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchSize, setSearchSize] = useState<string>("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL에서 size 파라미터 읽어오기
    const searchParams = new URLSearchParams(window.location.search);
    const sizeParam = searchParams.get('size');
    if (sizeParam) {
      setSearchSize(sizeParam);
    }

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1000px]">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Brand Selection</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">브랜드별 타이어 찾기</h1>
          <p className="text-gray-500 text-sm md:text-base">원하시는 타이어 브랜드를 선택해주세요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-10 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-lg font-black text-gray-900">브랜드별 찾기</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brand Category</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <button 
              onClick={() => { setSelectedBrand("ALL"); setSelectedCategory("ALL"); setSearchSize(""); }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                selectedBrand === "ALL" 
                  ? "bg-orange-500 text-white shadow-orange-500/30" 
                  : "bg-gray-50 hover:bg-gray-100 text-gray-900 shadow-transparent"
              }`}
            >
              <span className="font-bold text-sm">전체브랜드</span>
            </button>
            {brands.map((brand, idx) => {
              const isSelected = selectedBrand === brand.eng;
              return (
                <button 
                  key={idx} 
                  onClick={() => { setSelectedBrand(brand.eng); setSelectedCategory("ALL"); setSearchSize(""); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                    isSelected 
                      ? "bg-orange-500 text-white shadow-orange-500/30" 
                      : "bg-gray-50 hover:bg-gray-100 text-gray-900 shadow-transparent"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? "text-orange-200" : "text-gray-400"}`}>
                    {brand.eng}
                  </span>
                  <span className="font-bold text-sm">{brand.kor}</span>
                </button>
              );
            })}
          </div>
        </div>

        {(selectedBrand === "ALL" && !searchSize) ? (
          <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom duration-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
              </svg>
            </div>
            <p className="text-gray-500 font-bold">원하시는 브랜드를 선택해주세요.</p>
          </div>
        ) : isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <p className="text-gray-500 font-bold">상품 정보를 불러오는 중입니다...</p>
          </div>
        ) : (() => {
          let filteredProducts = allProducts;
          if (selectedBrand !== "ALL") {
            filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
          }
          if (selectedCategory !== "ALL") {
            filteredProducts = filteredProducts.filter(p => p.tags.includes(selectedCategory));
          }
          if (searchSize.trim() !== "") {
            const queryDigits = searchSize.replace(/[^0-9]/g, '');
            filteredProducts = filteredProducts.filter(p => {
              const sizeDigits = p.size.replace(/[^0-9]/g, '');
              // 만약 둘 다 숫자가 남아있다면 숫자로 비교, 아니면 기존 문자열 포함 여부로 비교
              if (queryDigits && sizeDigits) {
                return sizeDigits.includes(queryDigits);
              }
              return p.size.toLowerCase().includes(searchSize.toLowerCase());
            });
          }

          return (
            <div className="animate-in fade-in slide-in-from-bottom duration-300">
              {/* 상단 필터 및 배너 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                      {selectedBrand === "ALL" ? "전체 타이어 검색결과" : brands.find(b => b.eng === selectedBrand)?.kor}
                    </h2>
                    <div className="flex bg-gray-100 rounded-full p-1 text-sm font-bold">
                      <button 
                        onClick={() => setSelectedCategory("ALL")}
                        className={`px-4 py-1.5 rounded-full transition-colors ${selectedCategory === "ALL" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        전체
                      </button>
                      <button 
                        onClick={() => setSelectedCategory("승용차용")}
                        className={`px-4 py-1.5 rounded-full transition-colors ${selectedCategory === "승용차용" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        승용차용
                      </button>
                      <button 
                        onClick={() => setSelectedCategory("SUV/RV")}
                        className={`px-4 py-1.5 rounded-full transition-colors ${selectedCategory === "SUV/RV" ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        SUV용
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      <input 
                        type="text" 
                        value={searchSize}
                        onChange={(e) => setSearchSize(e.target.value)}
                        placeholder="사이즈 입력 (예: 245/45R18)" 
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-colors text-sm w-full md:w-64"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium">{filteredProducts.length}개의 상품이 검색되었습니다.</p>
              </div>

              {/* 상품 리스트 */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                  {filteredProducts.map(product => (
                    <a key={product.id} href={`/products/pt-${product.id}`} className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative group hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.2)] hover:border-orange-200 transition-all flex flex-col h-full">
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl z-10">
                        {brands.find(b => b.eng === product.brand)?.kor || product.brand}
                      </div>
                      <div className="p-4 bg-gray-100/50 flex justify-center shrink-0">
                        <img src={product.img} alt={product.name} className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200?text=Tire'; }} />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-black text-gray-900 mb-1 leading-tight group-hover:text-orange-500 transition-colors shrink-0 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                        <p className="text-xs text-gray-400 font-bold mb-3 shrink-0">{product.subtitle}</p>
                        <div className="flex flex-wrap gap-1 mb-6 shrink-0">
                          {Array.from(new Set(product.tags)).map((tag: any, idx: number) => (
                            <span key={idx} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50 shrink-0">
                          <div>
                            <p className="text-orange-500 font-black text-lg leading-none mb-1">{product.size}</p>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-red-500 font-black text-sm">{Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%</span>
                                <span className="text-gray-400 font-medium text-xs line-through">{product.originalPrice.toLocaleString()}원</span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-gray-900 leading-none">{product.price.toLocaleString()}</span>
                              <span className="text-sm font-bold text-gray-500 ml-0.5">원~</span>
                            </div>
                          </div>
                          <button className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                  <p className="text-gray-500 font-bold">검색 조건에 맞는 상품이 없습니다.</p>
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
