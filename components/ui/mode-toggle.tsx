'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <span className="sr-only">Changer le thème</span>
    </Button>
  );
}
