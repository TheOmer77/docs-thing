'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const THEMES = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;

export const ThemeMenu = () => {
  const { setTheme, theme } = useTheme();
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild disabled={!isClient}>
            <Button variant='flat' size='lg' icon className='md:size-10'>
              <SunIcon className='rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0' />
              <MoonIcon className='absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {Object.entries(THEMES).map(([value, displayName]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {displayName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
