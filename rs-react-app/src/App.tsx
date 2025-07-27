import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { useSearchParams } from 'react-router';
import { useSearchSync } from './hooks/useSearchSync';

function App() {
  const [, setSearchParams] = useSearchParams();
  const { value, setValue } = useSearchSync();

  function handleClick(value: string) {
    setSearchParams({ search: value, page: '1' });
    localStorage.setItem('searchTerm', value);
    setValue(value);
  }
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <Header onClick={handleClick} initialValue={value} />
        <MainContent value={value} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
