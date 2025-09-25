'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) {
    return (
      <button className="flex items-center gap-1 text-white dark:text-gray-200 transition" disabled>
        <FiMoon size={16} />
      </button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-1 text-white dark:text-gray-200 hover:text-gray-300 transition"
      aria-label="Toggle Dark Mode"
    >
      <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
};

export default DarkModeToggle;
