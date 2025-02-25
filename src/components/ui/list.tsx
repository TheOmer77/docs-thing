'use client';

import { Children, type ComponentProps, type ReactNode, useRef } from 'react';
import { createContextScope, type Scope } from '@radix-ui/react-context';
import {
  createRovingFocusGroupScope,
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/cn';

const LIST_GROUP_NAME = 'List',
  LIST_ITEM_NAME = 'ListItem';

type ScopedProps<P> = P & { __scopeList?: Scope };
type ListContextValue = { rovingFocus: boolean; disabled: boolean };

export const [createListContext, createListScope] = createContextScope(
  LIST_GROUP_NAME,
  [createRovingFocusGroupScope]
);
export const useRovingFocusGroupScope = createRovingFocusGroupScope();

export const [ListContext, useListContext] =
  createListContext<ListContextValue>(LIST_GROUP_NAME);

type RovingFocusGroupProps = ComponentProps<typeof RovingFocusGroup>;

export type ListProps = ComponentProps<'ul'> & {
  disabled?: boolean;
  rovingFocus?: boolean;
  loop?: RovingFocusGroupProps['loop'];
  dir?: RovingFocusGroupProps['dir'];
};

const ListUl = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul
    {...props}
    role='group'
    className={cn('flex w-full flex-col gap-px rounded-lg px-2', className)}
  />
);

export const List = ({
  __scopeList,
  disabled = false,
  rovingFocus = true,
  loop = false,
  ...props
}: ScopedProps<ListProps>) => {
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeList);
  const ul = <ListUl {...props} />;

  return (
    <ListContext
      scope={__scopeList}
      rovingFocus={rovingFocus}
      disabled={disabled}
    >
      {rovingFocus ? (
        <RovingFocusGroup
          asChild
          {...rovingFocusGroupScope}
          orientation='vertical'
          loop={loop}
        >
          {ul}
        </RovingFocusGroup>
      ) : (
        ul
      )}
    </ListContext>
  );
};

export type ListItemProps = ScopedProps<ComponentProps<'button'>> & {
  asChild?: boolean;
};

export const ListItem = ({
  __scopeList,
  asChild,
  className,
  children,
  ...props
}: ListItemProps) => {
  const context = useListContext(LIST_ITEM_NAME, __scopeList);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeList);
  const disabled = context.disabled || props.disabled;
  const rovingFocusItemRef = useRef<HTMLDivElement>(null);

  const ItemComp = asChild ? Slot : 'button';
  const itemButton = (
    <ItemComp
      {...props}
      disabled={disabled}
      className={cn(
        'flex min-h-12 w-full items-center rounded-lg bg-mix-transparent px-4 py-2 text-start text-base transition-[background-color] duration-100 outline-none select-none mix-with-muted-foreground *:z-10 focus-visible:outline-none focus-visible:mix-amount-10% active:duration-0 active:mix-amount-20% disabled:text-muted aria-[current=page]:mix-amount-10% data-[state=open]:mix-amount-10% md:min-h-10 md:text-sm [&:not(:disabled):not(:active)]:hover:mix-amount-10%',
        className
      )}
    >
      {asChild
        ? children
        : Children.map(children, child =>
            typeof child === 'string' || typeof child === 'number' ? (
              <span>{child}</span>
            ) : (
              child
            )
          )}
    </ItemComp>
  );

  return (
    <li className='p-0'>
      {context.rovingFocus ? (
        <RovingFocusGroupItem
          asChild
          {...rovingFocusGroupScope}
          focusable={!disabled}
          ref={rovingFocusItemRef}
        >
          {itemButton}
        </RovingFocusGroupItem>
      ) : (
        itemButton
      )}
    </li>
  );
};

export type ListItemTextProps = ComponentProps<'div'> & {
  primary: ReactNode;
  secondary?: ReactNode;
};

export const ListItemText = ({
  primary,
  secondary,
  className,
  ...props
}: ListItemTextProps) => (
  <div {...props} className={cn(`flex flex-col`, className)}>
    {primary && (
      <span className='flex flex-row items-center gap-1 text-base text-foreground md:text-sm'>
        {primary}
      </span>
    )}
    {secondary && (
      <span className='text-sm text-muted-foreground md:text-xs'>
        {secondary}
      </span>
    )}
  </div>
);

export const ListItemIcon = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Slot>) => (
  <Slot
    {...props}
    className={cn(
      'me-6 size-4.5 text-muted-foreground last:ms-auto last:me-0 md:me-4 md:text-base',
      className
    )}
  >
    {children}
  </Slot>
);

export const ListSubheader = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    {...props}
    className={cn(
      'sticky top-0 z-20 inline-block w-full p-2 text-sm font-medium text-muted-foreground select-none md:text-xs',
      className
    )}
  />
);
