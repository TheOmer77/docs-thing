import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@radix-ui/react-tooltip';

import { DocProvider } from './doc';
import { ModalProvider } from './modal';

export const Provider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <TooltipProvider>
      <DocProvider>
        <ModalProvider>{children}</ModalProvider>
      </DocProvider>
    </TooltipProvider>
  </ThemeProvider>
);
