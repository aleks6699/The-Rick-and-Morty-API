'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function SearchInput({
  currentLocale,
}: Readonly<{ currentLocale: string }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const cleanPathname = pathname.replace(/^\/(en|ru)/, '') || '/';

  const [inputValue, setInputValue] = useState(search || '');
  useEffect(() => {
    setInputValue(search || '');
  }, [search]);
  const handleSearch = () => {
    const query: Record<string, string> = {};
    if (inputValue?.trim()) {
      query.search = inputValue.trim();
    }
    query.page = '1';

    router.push({ pathname: '/', query }, { locale: currentLocale });
  };

  const handleClearSearch = () => {
    setInputValue('');
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'search' && key !== 'page') {
        query[key] = value;
      }
    });

    router.push({ pathname: cleanPathname, query }, { locale: currentLocale });
  };

  return (
    <>
      <div className="flex-1 min-w-[150px] md:min-w-[200px] relative">
        <input
          type="search"
          className="
              w-full
              bg-gray-700 light:bg-white 
              text-white light:text-black
              light:border light:border-gray-300
              rounded-lg px-4 py-2 pr-10 text-base shadow-md 
              placeholder-gray-400 light:placeholder-gray-500
              focus:ring-2 focus:ring-blue-400 focus:outline-none
              transition-all duration-300
            "
          placeholder="Search character..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            } else if (e.key === 'Escape') {
              handleClearSearch();
            }
          }}
        />

        {inputValue && (
          <button
            onClick={handleClearSearch}
            className="
                absolute right-2 top-1/2 transform -translate-y-1/2
                text-gray-400 light:text-gray-500
                hover:text-white light:hover:text-black
                transition-colors duration-200
              "
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <button
        onClick={handleSearch}
        disabled={!inputValue?.trim()}
        className="
            text-white light:text-black
            bg-gradient-to-r from-blue-500 to-purple-600 
            light:bg-gradient-to-r light:from-blue-100 light:to-purple-100
            light:border light:border-gray-300
            px-6 py-2.5 rounded-lg
            text-base font-semibold
            transition-all duration-300
            shadow-md hover:shadow-lg
            hover:from-blue-600 hover:to-purple-700
            light:hover:from-blue-200 light:hover:to-purple-200
            transform hover:scale-105 active:scale-95
            min-w-[100px]
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:scale-100 disabled:hover:shadow-md
          "
      >
        Search
      </button>
    </>
  );
}
