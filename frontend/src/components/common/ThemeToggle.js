import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-orange-500"
      aria-label="Toggle theme"
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <FaMoon className="text-xs text-blue-600" />
        ) : (
          <FaSun className="text-xs text-yellow-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
