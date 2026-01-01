/**
 * ThemeProvider Component
 * Manages dark/light mode theme state and persistence
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'light' to avoid hydration mismatch
  // The script in layout.tsx will set the correct theme before React hydrates
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from script or localStorage after mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if script already set it
    const htmlHasDark = document.documentElement.classList.contains('dark');
    const initialTheme = htmlHasDark ? 'dark' : 'light';
    
    // Check localStorage to override script if needed
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const finalTheme = (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : initialTheme;
    
    setThemeState(finalTheme);
    
    // Ensure DOM matches
    const root = document.documentElement;
    if (finalTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setMounted(true);
  }, []);

  // Apply theme to document whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    // Tailwind only needs 'dark' class - if not present, it's light mode
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (mounted) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = React.useCallback(() => {
    console.log('toggleTheme called');
    setThemeState((prev) => {
      console.log('Previous theme:', prev);
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      console.log('New theme:', newTheme);
      
      // Immediately update DOM for instant feedback
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        console.log('HTML classes before:', root.classList.toString());
        if (newTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        console.log('HTML classes after:', root.classList.toString());
        localStorage.setItem('theme', newTheme);
        console.log('Saved to localStorage:', newTheme);
      }
      return newTheme;
    });
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide context, even before mounted (for SSR)
  // The theme will be updated once mounted on the client
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
