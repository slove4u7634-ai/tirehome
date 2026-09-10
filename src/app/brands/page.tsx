"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BrandsPage() {
  const brands = [
    { eng: "KUMHO", kor: "금호타이어" },
    { eng: "HANKOOK", kor: "한국타이어" },
    { eng: "NEXEN", kor: "넥센타이어" },
    { eng: "MICHELIN", kor: "미쉐린" },
    { eng: "CONTINENTAL", kor: "콘티넨탈" },
    { eng: "BRIDGESTONE", kor: "브리지스톤" },
    { eng: "PIRELLI", kor: "피렐리" },
  ];

  const categories = ["승용차용", "SUV용", "전기차용", "승합/화물용"];
  const features = ["사계절용", "겨울용", "여름용", "스포츠형", "컴포트형", "저소음"];

  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedFeature, setSelectedFeature] = useState<string>("ALL");
  const [searchSize, setSearchSize] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("recommend"); // recommend, low_price, high_discount
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;
  
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand, selectedCategory, selectedFeature, searchSize, sortOption]);

  let filteredProducts = allProducts;
  if (selectedBrand !== "ALL") {
    filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
  }
  if (selectedCategory !== "ALL") {
    filteredProducts = filteredProducts.filter(p => p.tags.includes(selectedCategory));
  }
  if (selectedFeature !== "ALL") {
    filteredProducts = filteredProducts.filter(p => p.tags.includes(selectedFeature));
  }
  if (searchSize.trim() !== "") {
    const queryDigits = searchSize.replace(/[^0-9]/g, '');
    filteredProducts = filteredProducts.filter(p => {
      const sizeDigits = p.size.replace(/[^0-9]/g, '');
      if (queryDigits && sizeDigits) {
        return sizeDigits.includes(queryDigits);
      }
      return p.size.toLowerCase().includes(searchSize.toLowerCase());
    });
  }

  // Sorting
  if (sortOption === "low_price") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "high_discount") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
      return discountB - discountA;
    });
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex-1 bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        
        {/* 상단 통합 검색 바 */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <div className="flex-1 flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <input 
              type="text" 
              value={searchSize}
              onChange={(e) => setSearchSize(e.target.value)}
              placeholder="단면폭 / 편평비 / 인치 (예: 245/45R18 또는 2454518)"
              className="w-full px-4 py-3 outline-none font-bold text-gray-700"
            />
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors shrink-0">
            재검색
          </button>
        </div>

        {/* 필터 옵션 영역 */}
        <div className="border border-gray-200 rounded-xl mb-8">
          {/* 브랜드 필터 */}
          <div className="flex flex-col md:flex-row border-b border-gray-100">
            <div className="bg-gray-50 md:w-32 p-4 flex items-center justify-center border-r border-gray-100 shrink-0">
              <span className="font-bold text-sm text-orange-500">타이어 브랜드</span>
            </div>
            <div className="p-4 flex flex-wrap gap-2 flex-1">
              <button 
                onClick={() => setSelectedBrand("ALL")}
                className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedBrand === "ALL" ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                #전체
              </button>
              {brands.map(b => (
                <button 
                  key={b.eng}
                  onClick={() => setSelectedBrand(b.eng)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedBrand === b.eng ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  #{b.kor}
                </button>
              ))}
            </div>
          </div>
          
          {/* 차종 필터 */}
          <div className="flex flex-col md:flex-row border-b border-gray-100">
            <div className="bg-gray-50 md:w-32 p-4 flex items-center justify-center border-r border-gray-100 shrink-0">
              <span className="font-bold text-sm text-gray-700">차종</span>
            </div>
            <div className="p-4 flex flex-wrap gap-2 flex-1">
              <button 
                onClick={() => setSelectedCategory("ALL")}
                className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedCategory === "ALL" ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                #전체
              </button>
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedCategory === c ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  #{c}
                </button>
              ))}
            </div>
          </div>

          {/* 특장점 필터 */}
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-50 md:w-32 p-4 flex items-center justify-center border-r border-gray-100 shrink-0">
              <span className="font-bold text-sm text-gray-700">특장점</span>
            </div>
            <div className="p-4 flex flex-wrap gap-2 flex-1">
              <button 
                onClick={() => setSelectedFeature("ALL")}
                className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedFeature === "ALL" ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                #전체
              </button>
              {features.map(f => (
                <button 
                  key={f}
                  onClick={() => setSelectedFeature(f)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${selectedFeature === f ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  #{f}
                </button>
              ))}
            </div>
            <div className="p-4 flex items-center justify-end border-t md:border-t-0 md:border-l border-gray-100">
              <button 
                onClick={() => { setSelectedBrand("ALL"); setSelectedCategory("ALL"); setSelectedFeature("ALL"); setSearchSize(""); }}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm font-bold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 정렬 및 뷰 모드 툴바 */}
        <div className="flex justify-between items-end border-b-2 border-black pb-3 mb-6">
          <div className="text-sm text-gray-500 font-bold">
            총 <span className="text-orange-500">{filteredProducts.length}</span>개의 상품이 있습니다.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-sm font-bold">
              <button onClick={() => setSortOption("low_price")} className={sortOption === 'low_price' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}>낮은 가격순</button>
              <button onClick={() => setSortOption("high_discount")} className={sortOption === 'high_discount' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}>할인율 높은순</button>
              <button onClick={() => setSortOption("recommend")} className={sortOption === 'recommend' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}>추천순</button>
            </div>
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-orange-500' : 'text-gray-300 hover:text-gray-500'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'text-orange-500' : 'text-gray-300 hover:text-gray-500'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 상품 목록 */}
        {isLoading ? (
          <div className="py-20 text-center text-gray-500 font-bold">상품 정보를 불러오는 중입니다...</div>
        ) : paginatedProducts.length === 0 ? (
          <div className="py-20 text-center border rounded-xl bg-gray-50">
            <p className="text-gray-500 font-bold text-lg mb-2">조건에 맞는 타이어가 없습니다.</p>
            <p className="text-gray-400 text-sm">필터를 초기화하거나 다른 조건으로 다시 검색해보세요.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'flex flex-col gap-4'}>
            {paginatedProducts.map(product => {
              const brandKor = brands.find(b => b.eng === product.brand)?.kor || product.brand;
              const discountRate = product.originalPrice && product.originalPrice > product.price 
                ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) 
                : 0;

              if (viewMode === 'list') {
                return (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:border-orange-500 hover:shadow-lg transition-all p-4 md:p-6 items-center gap-6">
                    {/* 좌측: 브랜드 로고 및 상품 이미지 */}
                    <Link href={`/products/pt-${product.id}`} className="w-full md:w-48 shrink-0 flex flex-col items-center justify-center">
                      <span className="font-black text-gray-800 text-[10px] tracking-wider mb-2 bg-gray-100 px-2 py-0.5 rounded-full">{brandKor}</span>
                      <img src={product.img} alt={product.name} className="w-32 h-32 md:w-40 md:h-40 object-contain hover:scale-105 transition-transform" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200?text=Tire'; }} />
                    </Link>
                    
                    {/* 중앙: 스펙 및 해시태그 */}
                    <div className="flex-1 flex flex-col justify-center w-full">
                      <Link href={`/products/pt-${product.id}`} className="block group">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg md:text-xl font-black text-gray-700">{product.size}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-orange-500 transition-colors mb-2">{product.name}</h3>
                        <p className="text-sm font-bold text-gray-500 mb-4">{product.subtitle}</p>
                      </Link>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Array.from(new Set(product.tags)).map((tag: any, idx: number) => (
                          <span key={idx} className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">#{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                        <div className="flex items-center gap-1 text-orange-400">
                          <span>⭐</span> {product.rating || 0}점
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💬</span> {product.reviewCount || 0}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">🚚 무료배송</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1">🔧 무료장착</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 우측: 가격 및 구매 버튼 */}
                    <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col items-end md:justify-center shrink-0">
                      {discountRate > 0 && (
                        <div className="flex items-center gap-2 mb-1 w-full justify-end">
                          <span className="text-red-500 font-black text-sm">{discountRate}%</span>
                          <span className="text-gray-400 font-medium text-xs line-through">{product.originalPrice.toLocaleString()}원</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 mb-6 text-orange-500">
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">₩</span>
                        <span className="text-3xl font-black">{product.price.toLocaleString()}</span>
                        <span className="font-bold">원</span>
                      </div>
                      
                      <div className="flex gap-2 w-full">
                        <button className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors shrink-0 bg-white shadow-sm hover:shadow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </button>
                        <button className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors shrink-0 bg-white shadow-sm hover:shadow">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                          </svg>
                        </button>
                        <Link href={`/products/pt-${product.id}`} className="flex-1 bg-white border-2 border-orange-500 text-orange-500 rounded-lg flex items-center justify-center font-bold hover:bg-orange-500 hover:text-white transition-colors shadow-sm hover:shadow">
                          자세히 보기
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // 그리드 뷰 렌더링
                return (
                  <Link href={`/products/pt-${product.id}`} key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden relative group hover:border-orange-500 transition-colors flex flex-col h-full p-4">
                    <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-1 rounded-bl-lg z-10">
                      {brandKor}
                    </div>
                    <div className="flex justify-center shrink-0 mb-4 h-40">
                      <img src={product.img} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200?text=Tire'; }} />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <p className="text-sm font-black text-gray-700 mb-1 shrink-0">{product.size}</p>
                      <h3 className="text-base font-black text-gray-900 mb-1 leading-tight group-hover:text-orange-500 transition-colors shrink-0 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                        {Array.from(new Set(product.tags)).map((tag: any, idx: number) => (
                          <span key={idx} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">#{tag}</span>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-3 shrink-0">
                        {discountRate > 0 && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-red-500 font-black text-xs">{discountRate}%</span>
                            <span className="text-gray-400 font-medium text-[10px] line-through">{product.originalPrice.toLocaleString()}원</span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-1 text-orange-500">
                          <span className="text-xl font-black leading-none">{product.price.toLocaleString()}</span>
                          <span className="text-xs font-bold ml-0.5">원</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        )}
        
        {/* 페이지네이션 */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 mb-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              이전
            </button>
            <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 shrink-0 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${currentPage === i + 1 ? 'bg-orange-500 text-white shadow-md border border-orange-500' : 'text-gray-600 border border-transparent hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
