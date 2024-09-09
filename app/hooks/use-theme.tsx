'use client';
import { useEffect, useState } from 'react';

type Theme = 'cupcake' | 'dark';

// This hook will check the user's system preferences for dark mode and set the theme accordingly.
export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<Theme>('cupcake');

  useEffect(() => {
    // Listen for changes to the user's system preferences.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('mediaQuery..', mediaQuery);
    setIsDark(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsDark(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    // Initialize the theme based on the user's system preferences.
    const theme = isDark ? 'dark' : 'cupcake';
    setTheme(theme);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [isDark]);

  useEffect(() => {
    // Set the theme when the user changes it.
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return { isDark, theme, setTheme };
}
