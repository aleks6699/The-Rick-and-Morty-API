import {
  createContext,
  useState,
  useCallback,
  type PropsWithChildren,
  useEffect,
} from 'react';

type Theme = 'light' | 'dark';

const ThemeValueContext = createContext<Theme>('light');
const ThemeActionsContext = createContext<() => void>(() => {});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  };

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeValueContext.Provider value={theme}>
      <ThemeActionsContext.Provider value={toggleTheme}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeValueContext.Provider>
  );
};

export { ThemeProvider, ThemeValueContext, ThemeActionsContext };
