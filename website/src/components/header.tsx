'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
      const tokenValue = match ? decodeURIComponent(match[1]) : '';
      setIsAuthenticated(!!tokenValue && tokenValue.trim() !== '');
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    setIsAuthenticated(false)
    router.refresh()
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            NBA Explorer
          </a>
          <nav className="flex items-center gap-8 text-base ml-12">
            <a href="/players" className="text-gray-300 hover:text-white transition-colors font-medium">Players</a>
            <a href="/teams" className="text-gray-300 hover:text-white transition-colors font-medium">Teams</a>
            <a href="/matchs" className="text-gray-300 hover:text-white transition-colors font-medium">Games</a>
          </nav>
        </div>

        <div className="flex items-center">
          {!loading && (
            <>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium px-6 py-2 rounded-lg hover:from-orange-500 hover:to-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Login
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
