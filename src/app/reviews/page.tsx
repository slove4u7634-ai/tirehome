"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetch('/api/posts?type=review')
      .then(res => res.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = reviews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2">Customer Reviews</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">생생한 장착후기</h1>
            <p className="text-gray-500 text-sm md:text-base">타이어투데이를 이용해주신 고객님들의 솔직한 장착후기입니다.</p>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
              <p className="text-gray-500 font-bold">장착후기를 불러오는 중입니다...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.436 3 11.996c0 2.29.968 4.36 2.532 5.864l-1.05 2.1a.75.75 0 00.93.992l2.368-.946A9.155 9.155 0 0012 20.25z" />
                </svg>
              </div>
              <p className="text-gray-500 font-bold text-lg mb-2">등록된 장착후기가 없습니다.</p>
              <p className="text-gray-400 text-sm">첫 번째 장착후기를 기다리고 있습니다!</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {paginatedReviews.map(review => {
                  let reviewData = { img: '', link: '', desc: '' };
                  try {
                    reviewData = JSON.parse(review.content);
                  } catch (e) {
                    reviewData.desc = review.content;
                  }

                  return (
                    <a 
                      key={review.id} 
                      href={reviewData.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative group hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.2)] hover:border-orange-200 transition-all flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden shrink-0">
                        {reviewData.img ? (
                          <img src={reviewData.img} alt={review.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">NO IMAGE</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                      </div>
                      
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-2 shrink-0">
                          <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                            네이버 블로그
                          </span>
                          <span className="text-xs text-gray-400 font-bold">
                            {new Date(review.date || review.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-500 transition-colors line-clamp-2 min-h-[3rem] shrink-0">
                          {review.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
                          {reviewData.desc}
                        </p>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between text-sm font-bold text-gray-400 group-hover:text-orange-500 transition-colors">
                          <span>리뷰 보러가기</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    이전
                  </button>
                  <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 shrink-0 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${currentPage === i + 1 ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    다음
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
