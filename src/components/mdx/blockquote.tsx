import {
  Children,
  type ComponentPropsWithoutRef,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AlertOctagonIcon, InfoIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const ALERT_TYPES = {
  info: {
    prefix: '[!info]',
    className: 'border-primary first:[&>*]:text-primary',
    icon: <InfoIcon />,
  },
  danger: {
    prefix: '[!danger]',
    className: 'border-danger first:[&>*]:text-danger',
    icon: <AlertOctagonIcon />,
  },
} as const satisfies Record<
  string,
  { prefix: `[!${string}]`; className: string; icon: ReactNode }
>;

const getAlertType = (initialContent: ReactNode) => {
  if (typeof initialContent !== 'string') return;
  return Object.values(ALERT_TYPES).find(({ prefix }) =>
    initialContent.toLowerCase().startsWith(prefix)
  );
};

export const MdxBlockquote = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'blockquote'>) => {
  const childrenArr = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<PropsWithChildren>[];
  const initialContent = Children.toArray(childrenArr[0]?.props.children)[0];
  const alertType = getAlertType(initialContent);

  return alertType ? (
    <div
      className={cn(
        'my-[1.6em] border-s-[0.25rem] ps-em [&>:nth-child(2)]:mt-0',
        alertType.className,
        className
      )}
    >
      <p
        className={cn(
          'mb-2 flex flex-row items-center [&>*]:text-inherit [&>svg]:me-3 [&>svg]:shrink-0'
        )}
      >
        {alertType.icon}
        {Children.toArray(childrenArr[0]?.props.children)[0]
          ?.toString()
          .slice(alertType.prefix.length)}
        {Children.toArray(childrenArr[0]?.props.children).slice(1)}
      </p>
      {childrenArr.slice(1)}
    </div>
  ) : (
    <blockquote {...props} className={className}>
      {children}
    </blockquote>
  );
};
