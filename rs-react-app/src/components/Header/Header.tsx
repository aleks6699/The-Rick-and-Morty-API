import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export function Header({ onClick }: { onClick: (value: string) => void }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [value, setValue] = useState<string>(search || '');
  return (
    <header className="container flex flex-col mx-auto md:flex-row gap-4 mb-8">
      <Link
        to="/about"
        className="
    text-white text-lg font-semibold 
    px-6 py-3 rounded-lg
    bg-gradient-to-r from-indigo-600 to-purple-600
    hover:from-indigo-700 hover:to-purple-700
    transition-all duration-300
    shadow-lg hover:shadow-xl
    transform hover:scale-105 active:scale-95
    border-2 border-transparent hover:border-indigo-400
    flex items-center justify-center
    min-w-[120px]
  "
      >
        About
      </Link>

      <input
        type="text"
        className="bg-gray-700 text-white border-0 rounded-lg p-4 text-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 transition-all duration-300 shadow-lg"
        placeholder="Search character..."
        value={value.trim()}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={() => onClick(value.trim())}
        className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        Search
      </button>
    </header>
  );
}
