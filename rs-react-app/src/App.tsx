import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { ButtonError } from './components/ButtonError/ButtonError';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );

  const handleSetSearchTerm = (term: string) => {
    localStorage.setItem('searchTerm', term);
    setSearchTerm(term);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <Header searchTerm={searchTerm} setSearchTerm={handleSetSearchTerm} />

        <MainContent searchTerm={searchTerm} />
        <ButtonError forceError={false} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
