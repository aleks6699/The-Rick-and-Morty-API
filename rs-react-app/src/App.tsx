import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [, setSearchParams] = useSearchParams();

  function handleClick(value: string) {
    setSearchParams({ search: value, page: '1' });
    localStorage.setItem('searchTerm', value);
    setSearchTerm(value);
  }
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <Header onClick={handleClick} />

        <MainContent value={searchTerm} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
