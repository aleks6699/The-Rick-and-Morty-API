'use client';
import { Link, useRouter } from '@/i18n/navigation';
import { ToggleTheme } from '../toggleTheme/ToggleTheme';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function Header() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const router = useRouter();
  const [inputValue, setInputValue] = useState(search || '');
  const locale = useLocale();

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/about`}
          locale={locale}
          className="
            text-white light:text-black
            bg-gradient-to-r from-indigo-600 to-purple-600 
            light:bg-gradient-to-r light:from-gray-200 light:to-gray-300
            light:border light:border-gray-300
            px-5 py-2.5 rounded-lg
            text-base font-semibold
            transition-all duration-300
            shadow-md hover:shadow-lg
            hover:from-indigo-700 hover:to-purple-700
            light:hover:from-gray-300 light:hover:to-gray-400
            transform hover:scale-105 active:scale-95
            min-w-[100px] text-center
          "
        >
          About
        </Link>

        <input
          type="search"
          className="
            flex-1 min-w-[150px] md:min-w-[200px]
            bg-gray-700 light:bg-white 
            text-white light:text-black
            light:border light:border-gray-300
            rounded-lg px-4 py-2 text-base shadow-md 
              placeholder-gray-400 light:placeholder-gray-500
              focus:ring-2 focus:ring-blue-400 focus:outline-none
            transition-all duration-300
          "
          placeholder="Search character..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          onClick={() => {
            if (inputValue) {
              router.push({
                pathname: '/',
                query: { search: inputValue },
              });
            }
          }}
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
          "
        >
          Search
        </button>

        <ToggleTheme />
      </div>
    </header>
  );
}
