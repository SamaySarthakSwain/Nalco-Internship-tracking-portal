import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      className="rounded-full w-9 h-9 relative hover:bg-secondary/80 transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 90, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-sky-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -90, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
