'use client';
import { usePathname } from '@/i18n/navigation';
import { ToggleTheme } from '../toggleTheme/ToggleTheme';
import { LanguageSelector } from './LanguageSelector';
import { AboutLink } from './AboutLink';
import { SearchInput } from './SearchInput';

export function Header() {
  const pathname = usePathname();

  const localeMatch = RegExp(/^\/(en|ru)/).exec(pathname);
  const currentLocale: 'en' | 'ru' =
    localeMatch && (localeMatch[1] === 'en' || localeMatch[1] === 'ru')
      ? localeMatch[1]
      : 'en';

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AboutLink currentLocale={currentLocale} />
        <SearchInput currentLocale={currentLocale} />
        <LanguageSelector />
        <ToggleTheme />
      </div>
    </header>
  );
}
