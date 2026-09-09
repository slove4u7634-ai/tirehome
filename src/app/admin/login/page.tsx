"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (document.cookie.includes('adminAuth=true')) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123!') {
      // Set cookie for 7 days
      document.cookie = "adminAuth=true; path=/; max-age=604800";
      router.push('/admin/dashboard');
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-black text-white">
          사이트 관리자 로그인
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-gray-700">관리자 아이디</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">비밀번호</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="password123!"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-black text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                관리자 접속
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">테스트 계정: admin / password123!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
