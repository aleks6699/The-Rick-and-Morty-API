'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function SearchInput() {
  const currentLocale = useLocale();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [inputValue, setInputValue] = useState(search || '');
  const t = useTranslations('searchInput');

  return (
    <>
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
        placeholder={t('placeholder')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Link
        href={`/?search=${inputValue}&page=1`}
        locale={currentLocale}
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
        {t('search')}
      </Link>
    </>
  );
}
