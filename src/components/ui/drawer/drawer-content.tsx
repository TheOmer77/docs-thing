'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/cn';

import { DrawerOverlay } from './drawer-overlay';

export const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // data-vaul-drawer-direction
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        `fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto w-dvw max-w-screen-sm flex-col bg-background pb-[env(safe-area-inset-bottom)] shadow shadow-neutral-900/50 focus-visible:outline-none data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=top]:mx-auto data-[vaul-drawer-direction=left]:h-full data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=left]:w-80 data-[vaul-drawer-direction=right]:w-80 data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=left]:rounded-r-lg data-[vaul-drawer-direction=right]:rounded-l-lg data-[vaul-drawer-direction=top]:rounded-b-lg dark:bg-card [&>[data-drawer-handle]]:data-[vaul-drawer-direction=left]:hidden [&>[data-drawer-handle]]:data-[vaul-drawer-direction=right]:hidden`,
        className
      )}
      {...props}
    >
      <div
        data-drawer-handle=''
        className='mx-auto mt-4 h-1 w-10 rounded-full bg-muted transition-[height,margin]'
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));
DrawerContent.displayName = 'DrawerContent';
