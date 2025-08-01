import { MainContent } from './components/MainContent/MainContent';
import { Header } from './components/Header/Header';
import { ErrorBoundary } from './ErrorBoundary';
import { ThemeProvider } from './provider/ThemeProvider';
import { useSyncedSearchParam } from './hooks/useSyncedSearchParam';

function App() {
  const { value, handleClick } = useSyncedSearchParam();

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
          <Header onClick={handleClick} initialValue={value} />
          <MainContent value={value} />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
