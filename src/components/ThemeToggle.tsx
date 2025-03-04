import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={24} className="text-amber-500" />
      ) : (
        <Moon size={24} className="text-blue-600" />
      )}
    </button>
  );
}