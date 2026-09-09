"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

interface Post {
  id: number;
  title: string;
  date: string;
  status: string;
  type: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [type, setType] = useState('notice'); // notice, faq, product
  
  // Post state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState('공지');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Product state
  const [newProdBrand, setNewProdBrand] = useState('KUMHO');
  const [newProdName, setNewProdName] = useState('');
  const [newProdSubtitle, setNewProdSubtitle] = useState('');
  const [newProdSize, setNewProdSize] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('승용차용');
  const [newProdFeatures, setNewProdFeatures] = useState('사계절용');
  const [newProdImg, setNewProdImg] = useState('');
  const [newProdDetailImg, setNewProdDetailImg] = useState('');
  const [editingProdId, setEditingProdId] = useState<number | null>(null);

  // Product search & filter state
  const [searchProdBrand, setSearchProdBrand] = useState('ALL');
  const [searchProdKeyword, setSearchProdKeyword] = useState('');
  const [displayFilter, setDisplayFilter] = useState('ALL'); // ALL, isMonthly, isWeeklyBest, isMdPick
  
  // Bulk selection state
  const [selectedProdIds, setSelectedProdIds] = useState<number[]>([]);

  const handleBulkDelete = async () => {
    if (selectedProdIds.length === 0) return alert('삭제할 상품을 선택해주세요.');
    if (!confirm(`선택한 ${selectedProdIds.length}개의 상품을 일괄 삭제하시겠습니까?`)) return;
    
    await fetch(`/api/products?id=${selectedProdIds.join(',')}`, { method: 'DELETE' });
    setSelectedProdIds([]);
    fetchProducts();
  };

  const handleBulkMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!confirm(`선택한 ${selectedProdIds.length}개의 상품의 대표이미지를 일괄 변경하시겠습니까?`)) {
      e.target.value = '';
      return;
    }

    try {
      alert('대표이미지 업로드 중입니다...');
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('업로드 실패');
      const data = await res.json();
      
      const updateRes = await fetch(`/api/products?id=${selectedProdIds.join(',')}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img: data.url }),
      });
      
      if (!updateRes.ok) throw new Error('상품 업데이트 실패');
      
      alert('대표이미지 일괄 변경이 완료되었습니다.');
      setSelectedProdIds([]);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('대표이미지 일괄 변경 중 오류가 발생했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  const handleBulkDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (!confirm(`선택한 ${selectedProdIds.length}개의 상품에 ${files.length}개의 이미지를 상세 설명으로 일괄 등록하시겠습니까?`)) {
      e.target.value = '';
      return;
    }

    try {
      alert('이미지 업로드 중입니다. 잠시만 기다려주세요...');
      const fileArray = Array.from(files);
      const uploadedUrls: string[] = [];
      
      for (const file of fileArray) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length === 0) throw new Error('업로드된 이미지가 없습니다');
      const detailImgStr = uploadedUrls.join('\n');
      
      const res = await fetch(`/api/products?id=${selectedProdIds.join(',')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          detailImg: detailImgStr
        }),
      });
      
      if (!res.ok) throw new Error('Failed to update products');
      
      alert('일괄 등록이 완료되었습니다.');
      setSelectedProdIds([]);
      fetchProducts();
    } catch (error) {
      console.error('Bulk update failed', error);
      alert('일괄 등록 중 오류가 발생했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  const handleBulkDetailImgUrl = async () => {
    const imgUrl = prompt('선택한 상품들에 공통으로 적용할 상세 이미지 URL을 입력하세요.\n(여러 장일 경우 URL 사이에 콤마(,)를 넣어서 구분해주세요)');
    if (imgUrl === null) return;
    
    const formattedImgUrl = imgUrl.split(',').map(s => s.trim()).filter(Boolean).join('\n');
    
    if (!confirm(`선택한 ${selectedProdIds.length}개의 상품에 입력하신 URL을 일괄 적용하시겠습니까?`)) return;
    
    await fetch(`/api/products?id=${selectedProdIds.join(',')}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detailImg: formattedImgUrl })
    });
    
    setSelectedProdIds([]);
    fetchProducts();
    alert('상세 이미지 URL 일괄 적용이 완료되었습니다!');
  };

  useEffect(() => {
    if (!document.cookie.includes('adminAuth=true')) {
      router.push('/admin/login');
      return;
    }
    if (type === 'product') {
      fetchProducts();
    } else {
      fetchPosts();
    }
  }, [type]);

  const fetchPosts = async () => {
    const res = await fetch(`/api/posts?type=${type}`);
    const data = await res.json();
    setPosts(data);
  };

  const fetchProducts = async () => {
    const res = await fetch(`/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (type === 'product') {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    } else {
      await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  const handleEditClick = (post: Post) => {
    setEditingId(post.id);
    setNewTitle(post.title);
    setNewContent((post as any).content || '');
    setNewStatus(post.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProdEditClick = (prod: any) => {
    setEditingProdId(prod.id);
    setNewProdBrand(prod.brand);
    setNewProdName(prod.name);
    setNewProdSubtitle(prod.subtitle || '');
    setNewProdSize(prod.size || '');
    setNewProdPrice(String(prod.price));
    setNewProdImg(prod.img || '');
    setNewProdDetailImg(prod.detailImg || '');
    
    // Split category and features from tags
    const tags = prod.tags || [];
    const cat = tags.find((t: string) => t === '승용차용' || t === 'SUV용' || t === 'SUV/RV') || '승용차용';
    const features = tags.filter((t: string) => t !== cat).join(', ');
    setNewProdCategory(cat);
    setNewProdFeatures(features);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
    setNewStatus('공지');
    
    setEditingProdId(null);
    setNewProdBrand('KUMHO');
    setNewProdName('');
    setNewProdSubtitle('');
    setNewProdSize('');
    setNewProdPrice('');
    setNewProdCategory('승용차용');
    setNewProdFeatures('사계절용');
    setNewProdImg('');
    setNewProdDetailImg('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setNewProdImg(data.url);
      }
    } catch (err) {
      console.error(err);
      alert('이미지 업로드 실패');
    }
  };

  const handleDetailImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          newImages.push(data.url);
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    if (newImages.length > 0) {
      setNewProdDetailImg(prev => prev ? prev + '\n' + newImages.join('\n') : newImages.join('\n'));
    }
    
    // Reset file input so same files can be selected again if needed
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'product') {
      if (!newProdName || !newProdPrice) return alert('상품명과 가격을 입력하세요.');
      
      let parsedPrice = parseFloat(newProdPrice);
      if (parsedPrice >= 1000) {
        parsedPrice = parsedPrice / 10000;
      }

      const featuresList = newProdFeatures.split(',').map(t => t.trim()).filter(Boolean);
      const tags = [newProdCategory, ...featuresList];
      
      const payload = {
        brand: newProdBrand,
        name: newProdName,
        subtitle: newProdSubtitle,
        size: newProdSize,
        price: parsedPrice,
        tags,
        img: newProdImg,
        detailImg: newProdDetailImg
      };

      if (editingProdId) {
        await fetch(`/api/products?id=${editingProdId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      handleCancelEdit();
      fetchProducts();
      return;
    }

    if (!newTitle) return alert('제목을 입력하세요');
    
    if (editingId) {
      await fetch(`/api/posts?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent, status: newStatus })
      });
      setEditingId(null);
    } else {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent, type, status: newStatus })
      });
    }
    
    setNewTitle('');
    setNewContent('');
    fetchPosts();
  };

  const filteredProducts = products.filter(p => {
    if (displayFilter !== 'ALL' && !p[displayFilter]) return false;
    if (searchProdBrand !== 'ALL' && p.brand !== searchProdBrand) return false;
    if (searchProdKeyword) {
      const keyword = searchProdKeyword.toLowerCase();
      const queryDigits = keyword.replace(/[^0-9]/g, '');
      const sizeDigits = p.size ? p.size.replace(/[^0-9]/g, '') : '';
      
      const matchName = p.name.toLowerCase().includes(keyword);
      const matchSize = (p.size && p.size.toLowerCase().includes(keyword)) || 
                        (queryDigits && sizeDigits && sizeDigits.includes(queryDigits));

      if (!matchName && !matchSize) {
        return false;
      }
    }
    return true;
  });

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const XLSX = (window as any).XLSX;
        if (!XLSX) {
          alert('엑셀 처리 라이브러리가 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.');
          return;
        }
        
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        let startIndex = 0;
        for (let i = 0; i < json.length; i++) {
          const row = json[i] as any[];
          if (row[0] === '상품명' || (row[3] === '브랜드' && row[5] === '차종')) {
            startIndex = i + 1;
            break;
          }
        }
        if (startIndex === 0) startIndex = 2; // fallback
        
        const bulkProducts = [];
        
        for (let i = startIndex; i < json.length; i++) {
          const row = json[i] as any[];
          if (!row || row.length === 0 || !row[0]) continue;
          
          const rawName = String(row[0]);
          const rawPrice = parseFloat(row[1]);
          const rawImgStr = row[2] ? String(row[2]) : '';
          const rawBrand = row[3] ? String(row[3]) : '금호타이어';
          const rawCategory = row[5] ? String(row[5]) : '승용차용';
          const rawSubtitle = row[6] ? String(row[6]) : '';
          const rawFeatures = row[7] ? String(row[7]) : '';
          const rawDetailImgStr = row[8] ? String(row[8]) : '';
          
          const sizeMatch = rawName.match(/\d{3}\/\d{2}[A-Z]*\d{2}/i);
          const size = sizeMatch ? sizeMatch[0] : '';
          
          let name = rawName.replace(rawBrand, '').replace(size, '').trim();
          
          let price = isNaN(rawPrice) ? 0 : rawPrice;
          if (price >= 1000) price = price / 10000;
          
          const imgUrls = rawImgStr.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
          const img = imgUrls.length > 0 ? imgUrls[0] : '';
          
          const detailImgUrls = rawDetailImgStr.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
          const detailImg = detailImgUrls.join('\n');
          
          let brandCode = 'KUMHO';
          if (rawBrand.includes('한국')) brandCode = 'HANKOOK';
          else if (rawBrand.includes('넥센')) brandCode = 'NEXEN';
          else if (rawBrand.includes('미쉐린')) brandCode = 'MICHELIN';
          else if (rawBrand.includes('콘티넨탈')) brandCode = 'CONTINENTAL';
          
          const featureTags = rawFeatures.split(',').map(t => t.trim()).filter(Boolean);
          
          bulkProducts.push({
            brand: brandCode,
            name: name,
            subtitle: rawSubtitle,
            size: size,
            price: price,
            tags: [rawCategory, ...featureTags],
            img: img,
            detailImg: detailImg
          });
        }
        
        if (bulkProducts.length > 0) {
          if (confirm(`총 ${bulkProducts.length}개의 상품을 엑셀로 일괄 등록하시겠습니까?`)) {
            const res = await fetch('/api/products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bulkProducts)
            });
            const result = await res.json();
            if (result.success) {
              alert(`${result.count}개 상품 등록 완료!`);
              fetchProducts();
            }
          }
        } else {
          alert('등록할 데이터가 없습니다. 양식을 확인해주세요.');
        }
      } catch (error) {
        console.error(error);
        alert('엑셀 파일 처리 중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <Script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js" strategy="lazyOnload" />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-black text-gray-900">게시판/상품 관리자 대시보드</h1>
          <button 
            onClick={() => {
              document.cookie = "adminAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              router.push('/');
            }}
            className="text-sm font-bold text-gray-500 hover:text-red-500"
          >
            로그아웃
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => { setType('notice'); handleCancelEdit(); }}
            className={`px-4 py-2 font-bold rounded-lg ${type === 'notice' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            공지사항 관리
          </button>
          <button 
            onClick={() => { setType('faq'); handleCancelEdit(); }}
            className={`px-4 py-2 font-bold rounded-lg ${type === 'faq' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            FAQ 관리
          </button>
          <button 
            onClick={() => { setType('product'); handleCancelEdit(); }}
            className={`px-4 py-2 font-bold rounded-lg ${type === 'product' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            상품 등록 관리
          </button>
        </div>

        {/* 새 글 작성 / 상품 등록 폼 */}
        <form onSubmit={handleSubmit} className={`mb-8 p-6 rounded-xl border flex flex-col gap-4 ${(editingId || editingProdId) ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">
                {type === 'product' ? (editingProdId ? '📦 상품 수정하기' : '📦 새 상품 등록') : (editingId ? '📝 게시글 수정하기' : '✏️ 새 게시글 작성')}
              </span>
              {(editingId || editingProdId) && <span className="text-xs text-orange-500 font-bold bg-orange-100 px-2 py-0.5 rounded-full">수정 모드 (ID: {editingId || editingProdId})</span>}
            </div>
            {type === 'product' && !editingProdId && (
              <label className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1.5 px-3 rounded cursor-pointer transition-colors flex items-center gap-1 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                엑셀 파일로 대량 등록
                <input 
                  type="file" 
                  accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
                  onChange={handleExcelUpload} 
                  className="hidden" 
                />
              </label>
            )}
          </div>

          {type === 'product' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">브랜드</label>
                  <select value={newProdBrand} onChange={(e) => setNewProdBrand(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                    <option value="KUMHO">금호타이어</option>
                    <option value="HANKOOK">한국타이어</option>
                    <option value="NEXEN">넥센타이어</option>
                    <option value="MICHELIN">미쉐린</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">차종 분류</label>
                  <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                    <option value="승용차용">승용차용</option>
                    <option value="SUV용">SUV용</option>
                    <option value="승합/화물용">승합/화물용</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">상품명</label>
                  <input type="text" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="예: 마제스티9 솔루스 TA91" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">서브타이틀</label>
                  <input type="text" value={newProdSubtitle} onChange={(e) => setNewProdSubtitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="예: 사계절용 프리미엄 컴포트 타이어" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">특징 태그 (콤마로 구분)</label>
                  <input type="text" value={newProdFeatures} onChange={(e) => setNewProdFeatures(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="예: 사계절용, 저소음" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">사이즈</label>
                  <input type="text" value={newProdSize} onChange={(e) => setNewProdSize(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="예: 245/45R18" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">가격 (만 단위)</label>
                  <input type="number" step="0.1" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="13.5 (135000 입력시 자동변환)" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-bold text-gray-700">상품 이미지</label>
                  <div className="flex gap-2">
                    <input type="text" value={newProdImg} onChange={(e) => setNewProdImg(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm" placeholder="이미지 URL 직접 입력..." />
                    <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg cursor-pointer transition-colors text-sm flex items-center justify-center">
                      <span>파일 첨부</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700">상세 설명 이미지 (선택 - 여러 장 가능)</label>
                  <div className="flex gap-2 items-start">
                    <textarea 
                      value={newProdDetailImg} 
                      onChange={(e) => setNewProdDetailImg(e.target.value)} 
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm min-h-[80px]" 
                      placeholder="상세 이미지 URL 직접 입력 (여러 장일 경우 줄바꿈으로 구분)..." 
                    />
                    <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg cursor-pointer transition-colors text-sm flex items-center justify-center h-fit">
                      <span>다중 파일 첨부</span>
                      <input type="file" accept="image/*" multiple onChange={handleDetailImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-4 items-end">
                <div className="w-32">
                  <label className="block text-sm font-bold text-gray-700 mb-1">분류 뱃지</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  >
                    {type === 'notice' ? (
                      <>
                        <option value="공지">공지</option>
                        <option value="이벤트">이벤트</option>
                      </>
                    ) : (
                      <>
                        <option value="타이어">타이어</option>
                        <option value="장착">장착</option>
                        <option value="배송">배송</option>
                        <option value="교환/반품">교환/반품</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">게시글 제목</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="제목을 입력하세요..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">게시글 내용</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:border-orange-500"
                  placeholder="내용을 입력하세요..."
                ></textarea>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            {(editingId || editingProdId) && (
              <button type="button" onClick={handleCancelEdit} className="bg-white border border-gray-300 text-gray-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-50">
                취소
              </button>
            )}
            <button type="submit" className={`${(editingId || editingProdId) ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-900 hover:bg-gray-800'} text-white font-bold px-8 py-2 rounded-lg transition-colors`}>
              {type === 'product' ? (editingProdId ? '상품 수정' : '상품 등록') : (editingId ? '수정 완료' : '게시글 등록')}
            </button>
          </div>
        </form>

        {/* 제품 검색 필터 */}
        {type === 'product' && (
          <div className="mb-6 flex gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200 self-start inline-flex">
            <button onClick={() => setDisplayFilter('ALL')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${displayFilter === 'ALL' ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>전체 상품</button>
            <button onClick={() => setDisplayFilter('isMonthly')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${displayFilter === 'isMonthly' ? 'bg-white shadow-sm text-purple-600 border border-purple-200' : 'text-gray-500 hover:text-gray-700'}`}>이달의 상품</button>
            <button onClick={() => setDisplayFilter('isWeeklyBest')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${displayFilter === 'isWeeklyBest' ? 'bg-white shadow-sm text-yellow-600 border border-yellow-200' : 'text-gray-500 hover:text-gray-700'}`}>주간 BEST</button>
            <button onClick={() => setDisplayFilter('isMdPick')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${displayFilter === 'isMdPick' ? 'bg-white shadow-sm text-orange-600 border border-orange-200' : 'text-gray-500 hover:text-gray-700'}`}>MD 추천</button>
          </div>
        )}

        {type === 'product' && (
          <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-between">
            <div className="flex gap-2">
              <select 
                value={searchProdBrand} 
                onChange={(e) => setSearchProdBrand(e.target.value)} 
                className="p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-orange-500 font-medium"
              >
                <option value="ALL">전체 브랜드</option>
                <option value="KUMHO">금호타이어</option>
                <option value="HANKOOK">한국타이어</option>
                <option value="NEXEN">넥센타이어</option>
                <option value="MICHELIN">미쉐린</option>
              </select>
              <input 
                type="text"
                value={searchProdKeyword}
                onChange={(e) => setSearchProdKeyword(e.target.value)}
                placeholder="상품명 또는 사이즈 검색"
                className="p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-orange-500 flex-1 max-w-xs"
              />
            </div>
            {selectedProdIds.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-gray-500 mr-2">{selectedProdIds.length}개 선택됨</span>
                
                <button 
                  onClick={handleBulkDetailImgUrl}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded text-sm font-bold transition-colors"
                >
                  공통 상세이미지 추가(URL)
                </button>
                                <label className="bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded text-sm font-bold transition-colors cursor-pointer flex items-center mb-0 mr-2">
                    대표이미지 일괄변경
                    <input type="file" accept="image/*" onChange={handleBulkMainImageUpload} className="hidden" />
                  </label>
                  
                  <label className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded text-sm font-bold transition-colors cursor-pointer flex items-center mb-0">
                  공통 상세이미지 추가(파일)
                  <input type="file" accept="image/*" multiple onChange={handleBulkDetailImageUpload} className="hidden" />
                </label>

                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                
                <div className="flex items-center gap-1 border border-gray-200 rounded p-1 bg-white">
                  <select 
                    id="bulkDisplayType"
                    className="text-sm font-bold text-gray-700 bg-transparent outline-none cursor-pointer"
                  >
                    <option value="isMonthly">이달의 상품</option>
                    <option value="isWeeklyBest">주간 BEST</option>
                    <option value="isMdPick">MD 추천</option>
                  </select>
                  <button 
                    onClick={async () => {
                      const type = (document.getElementById('bulkDisplayType') as HTMLSelectElement).value;
                      const label = type === 'isMonthly' ? '이달의 상품' : type === 'isWeeklyBest' ? '주간 BEST' : 'MD 추천';
                      if (!confirm(`선택한 ${selectedProdIds.length}개의 상품을 [${label}]에 진열하시겠습니까?`)) return;
                      await fetch(`/api/products?id=${selectedProdIds.join(',')}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [type]: true }) });
                      setSelectedProdIds([]); fetchProducts(); alert(`[${label}] 진열 등록이 완료되었습니다!`);
                    }}
                    className="bg-gray-800 text-white hover:bg-gray-700 px-3 py-1 rounded text-xs font-bold transition-colors ml-2"
                  >
                    진열 ON
                  </button>
                  <button 
                    onClick={async () => {
                      const type = (document.getElementById('bulkDisplayType') as HTMLSelectElement).value;
                      const label = type === 'isMonthly' ? '이달의 상품' : type === 'isWeeklyBest' ? '주간 BEST' : 'MD 추천';
                      if (!confirm(`선택한 ${selectedProdIds.length}개의 상품을 [${label}] 진열에서 해제하시겠습니까?`)) return;
                      await fetch(`/api/products?id=${selectedProdIds.join(',')}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [type]: false }) });
                      setSelectedProdIds([]); fetchProducts(); alert(`[${label}] 진열이 해제되었습니다.`);
                    }}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    진열 OFF
                  </button>
                </div>

                <div className="w-px h-6 bg-gray-200 mx-1"></div>

                <button 
                  onClick={handleBulkDelete}
                  className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded text-sm font-bold transition-colors"
                >
                  선택 일괄 삭제
                </button>
              </div>
            )}
          </div>
        )}

        {/* 목록 표시 */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                {type === 'product' && (
                  <th className="p-4 w-12 text-center">
                    <input 
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-orange-500"
                      checked={selectedProdIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProdIds(filteredProducts.map(p => p.id));
                        } else {
                          setSelectedProdIds([]);
                        }
                      }}
                    />
                  </th>
                )}
                <th className="p-4 font-bold text-gray-600 w-16 text-center">ID</th>
                {type === 'product' ? (
                  <>
                    <th className="p-4 font-bold text-gray-600 w-24">브랜드</th>
                    <th className="p-4 font-bold text-gray-600">상품명</th>
                    <th className="p-4 font-bold text-gray-600 w-32">사이즈</th>
                    <th className="p-4 font-bold text-gray-600 w-32">가격</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 font-bold text-gray-600 w-24">분류</th>
                    <th className="p-4 font-bold text-gray-600">제목</th>
                    <th className="p-4 font-bold text-gray-600 w-32">등록일</th>
                  </>
                )}
                <th className="p-4 font-bold text-gray-600 w-32 text-center">관리</th>
              </tr>
            </thead>
            <tbody>
              {type === 'product' ? (
                filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">검색된 상품이 없습니다.</td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 cursor-pointer accent-orange-500"
                          checked={selectedProdIds.includes(prod.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProdIds(prev => [...prev, prod.id]);
                            } else {
                              setSelectedProdIds(prev => prev.filter(id => id !== prod.id));
                            }
                          }}
                        />
                      </td>
                      <td className="p-4 text-center text-gray-500 font-medium">{prod.id}</td>
                      <td className="p-4 font-bold text-gray-600">{prod.brand}</td>
                      <td className="p-4 font-bold text-gray-900">{prod.name}</td>
                      <td className="p-4 text-sm text-gray-500">{prod.size}</td>
                      <td className="p-4 font-bold text-orange-500">{prod.price}만~</td>
                      <td className="p-4 text-center space-x-2">
                        <button 
                          onClick={() => handleProdEditClick(prod)}
                          className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => handleDelete(prod.id)}
                          className="text-xs font-bold bg-red-50 text-red-500 px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">등록된 게시글이 없습니다.</td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-center text-gray-500 font-medium">{post.id}</td>
                      <td className="p-4">
                        <span className="bg-white border border-gray-200 text-xs font-bold px-2 py-1 rounded">
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">{post.title}</td>
                      <td className="p-4 text-sm text-gray-500">{post.date}</td>
                      <td className="p-4 text-center space-x-2">
                        <button 
                          onClick={() => handleEditClick(post)}
                          className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors"
                        >
                          수정
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="text-xs font-bold bg-red-50 text-red-500 px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
