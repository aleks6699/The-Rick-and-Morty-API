'use client';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const locales = ['en', 'ru'];

  const handleLocaleChange = (newLocale: string) => {
    const params = searchParams.toString();
    const url = params ? `${pathname}?${params}` : pathname;

    router.push(url, { locale: newLocale });
  };

  return (
    <select
      value={locale}
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
