'use client';

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
import { useIsClient } from '@/hooks/use-is-client';

const THEMES = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;

export const ThemeMenu = () => {
  const { setTheme, theme } = useTheme();
  const isClient = useIsClient();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild disabled={!isClient}>
            <Button variant='flat' size='lg' icon className='md:size-10'>
              <SunIcon className='scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90' />
              <MoonIcon className='absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0' />
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
