'use client';
import { useContext } from 'react';
import {
  ThemeActionsContext,
  ThemeValueContext,
} from '../provider/ThemeProvider';

export const useTheme = () => {
  if (!ThemeValueContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return useContext(ThemeValueContext);
};

export const useThemeActions = () => {
  if (!ThemeActionsContext) {
    throw new Error('useThemeActions must be used within a ThemeProvider');
  }
  return useContext(ThemeActionsContext);
};
