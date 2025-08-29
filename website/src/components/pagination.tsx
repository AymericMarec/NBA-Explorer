'use client';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const makeUrl = (page: number) => {
    params.set('cursor', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {currentPage > 0 ? (
        <a href={makeUrl(currentPage - 1)}>
          <button className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        </a>
      ) : (
        <div></div>
      )}
      
      <div className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold">
        Page {currentPage+1}
      </div>
      
      <a href={makeUrl(currentPage + 1)}>
        <button className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Next
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </a>
    </div>
  );
}
