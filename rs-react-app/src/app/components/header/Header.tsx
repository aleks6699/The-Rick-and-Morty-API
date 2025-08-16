import { ToggleTheme } from '../toggleTheme/ToggleTheme';
import { AboutLink } from './AboutLink';
import { LanguageSelector } from './LanguageSelector';
import { SearchInput } from './SearchInput';

export function Header() {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AboutLink />
        <SearchInput />
        <LanguageSelector />
        <ToggleTheme />
      </div>
    </header>
  );
}
