import { Link } from '@/i18n/navigation';

interface AboutLinkProps {
  currentLocale: 'en' | 'ru';
}

export function AboutLink({ currentLocale }: Readonly<AboutLinkProps>) {
  return (
    <Link
      href="/about"
      locale={currentLocale}
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
  );
}
