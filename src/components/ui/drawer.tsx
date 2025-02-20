'use client';

import type { ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/cn';

export const {
  Close: DrawerClose,
  Portal: DrawerPortal,
  Trigger: DrawerTrigger,
} = DrawerPrimitive;

export const Drawer = (props: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root {...props} shouldScaleBackground={false} />
);

export const DrawerOverlay = ({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay
    data-slot='drawer-overlay'
    className={cn(
      'fixed inset-0 z-50 bg-neutral-950/50 print:hidden',
      className
    )}
    {...props}
  />
);

export const DrawerContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal data-slot='drawer-portal'>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      data-slot='drawer-content'
      className={cn(
        'group/drawer-content fixed z-50 flex h-auto w-dvw max-w-screen-sm flex-col bg-popover pb-[env(safe-area-inset-bottom)] shadow focus-visible:outline-none',
        'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mx-auto data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-lg',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mx-auto data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:rounded-t-lg',
        'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-80 data-[vaul-drawer-direction=right]:rounded-l-lg',
        'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-80 data-[vaul-drawer-direction=left]:rounded-r-lg',
        className
      )}
      {...props}
    >
      <div className='mx-auto mt-4 hidden h-1 w-10 rounded-full bg-muted transition-[height,margin] group-data-[vaul-drawer-direction=bottom]/drawer-content:block' />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

export const DrawerHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
);

export const DrawerFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);

export const DrawerTitle = ({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    className={cn('font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
