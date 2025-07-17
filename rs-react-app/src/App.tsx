import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { ThemeProvider } from './provider/ThemeProvider';

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
      <ThemeProvider>
        <div
          className="
  min-h-screen
  bg-gradient-to-br
  from-gray-900 to-gray-800
  light:from-gray-100 light:to-white
  text-white light:text-gray-900
  transition-colors duration-300
  p-4 md:p-8
"
        >
          <Header onClick={handleClick} />
          <MainContent value={searchTerm} />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
