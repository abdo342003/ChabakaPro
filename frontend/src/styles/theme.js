// Palette de couleurs unifiée pour tout le projet
export const theme = {
  colors: {
    // Couleurs principales
    primary: {
      50: '#e0f2fe',
      100: '#bae6fd',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7', // Cyan principal
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Orange principal
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    accent: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Bleu accent
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
  },
  
  gradients: {
    primary: 'from-cyan-500 to-blue-600',
    secondary: 'from-orange-500 to-red-600',
    hero: 'from-gray-900 via-blue-900 to-gray-900',
    card: 'from-white via-blue-50 to-cyan-50',
    cardDark: 'from-gray-800 to-gray-900',
  },
  
  shadows: {
    card: 'shadow-xl hover:shadow-2xl',
    button: 'shadow-lg hover:shadow-xl',
    glow: 'shadow-cyan-500/50',
  },
  
  transitions: {
    default: 'transition-all duration-300',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-500',
  },
};
