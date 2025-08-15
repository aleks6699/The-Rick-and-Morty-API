'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locales = ['en', 'ru'];
  const cleanPathname = pathname.replace(/^\/(en|ru)/, '') || '/';

  const [currentLocale, setCurrentLocale] = useState<string>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');

    setCurrentLocale(savedLocale || 'en');
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale as 'en' | 'ru');
    localStorage.setItem('locale', newLocale);

    const currentQuery: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentQuery[key] = value;
    });

    router.push(
      {
        pathname: cleanPathname,
        query: Object.keys(currentQuery).length > 0 ? currentQuery : undefined,
      },
      { locale: newLocale }
    );
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLocaleChange(e.target.value)}
      className="
        bg-gray-700 light:bg-white
        text-white light:text-black
        border border-gray-300
        rounded-lg px-3 py-2 text-base
        shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
        transition-all duration-300
        cursor-pointer
      "
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
