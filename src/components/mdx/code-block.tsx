import {
  type ComponentPropsWithoutRef,
  type RefObject,
  useRef,
  useState,
} from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsClient } from '@/hooks/use-is-client';
import { cn } from '@/lib/cn';

type CopyCodeButtonProps = {
  codeRef: RefObject<HTMLElement | null>;
  className?: string;
};

const CopyCodeButton = ({ codeRef, className }: CopyCodeButtonProps) => {
  const [justCopied, setJustCopied] = useState(false);
  const isClient = useIsClient();

  const handleCopy = async () => {
    if (!codeRef.current || justCopied || !window?.isSecureContext) return;

    await navigator.clipboard.writeText(codeRef.current.innerText);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  if (!isClient || !window?.isSecureContext) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          icon
          variant='flat'
          size='sm'
          className={cn('text-muted-foreground print:hidden', className)}
          onClick={handleCopy}
        >
          {justCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy code</TooltipContent>
    </Tooltip>
  );
};

export const CodeBlock = ({
  children,
  title,
  className,
  ...props
}: ComponentPropsWithoutRef<'pre'>) => {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className='relative'>
      {title ? (
        <div className='flex h-10 flex-row items-center rounded-t-lg border-b bg-[--tw-prose-pre-bg] pe-2 ps-4'>
          <span className='font-mono text-sm text-muted-foreground'>
            {title}
          </span>
          <CopyCodeButton codeRef={preRef} className='ms-auto' />
        </div>
      ) : (
        <CopyCodeButton codeRef={preRef} className='absolute end-2 top-1' />
      )}
      <pre
        {...props}
        ref={preRef}
        className={cn('px-4', title && 'mt-0 rounded-t-none', className)}
      >
        {children}
      </pre>
    </div>
  );
};
