'use client';
import { useIsMounted } from '@/hooks/useIsMounted';
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
  const [theme, setTheme] = useState<Theme>('light');
  const isMounted = useIsMounted();

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  if (!isMounted) return null;

  return (
    <ThemeValueContext.Provider value={theme}>
      <ThemeActionsContext.Provider value={toggleTheme}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeValueContext.Provider>
  );
};

export { ThemeProvider, ThemeValueContext, ThemeActionsContext };
