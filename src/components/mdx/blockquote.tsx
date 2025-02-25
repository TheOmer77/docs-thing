import {
  Children,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { AlertOctagonIcon, InfoIcon } from 'lucide-react';

import { Alert, AlertTitle } from '@/components/ui/alert';

type AlertVariant = Exclude<
  ComponentProps<typeof Alert>['variant'],
  null | undefined
>;
type AlertType = { variant: AlertVariant; icon: ReactNode };

const ALERT_TYPES = [
  { variant: 'info', icon: <InfoIcon /> },
  { variant: 'danger', icon: <AlertOctagonIcon /> },
] as const satisfies AlertType[];

const getAlertType = (initialContent: ReactNode) => {
  if (typeof initialContent !== 'string') return;
  return ALERT_TYPES.find(({ variant }) =>
    initialContent.toLowerCase().startsWith(`[!${variant}]`)
  );
};

export const MdxBlockquote = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'blockquote'>) => {
  const [firstChild, ...restChildren] = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<PropsWithChildren>[];
  const initialContent = Children.toArray(firstChild?.props.children)[0];
  const alertType = getAlertType(initialContent),
    alertPrefix = alertType ? `[!${alertType?.variant}]` : undefined;

  return alertType && alertPrefix ? (
    <Alert variant={alertType.variant} className='my-[1.25em]'>
      <Slot className='size-4'>{alertType.icon}</Slot>
      <AlertTitle className='-mt-1 mb-0 leading-normal [&+*]:mt-1 [&~*]:prose-sm [&~:last-child]:mb-0'>
        {Children.toArray(firstChild?.props.children)[0]
          ?.toString()
          ?.slice(alertPrefix.length)}
        {Children.toArray(firstChild?.props.children)?.slice(1)}
      </AlertTitle>
      {restChildren}
    </Alert>
  ) : (
    <blockquote {...props} className={className}>
      {children}
    </blockquote>
  );
};
