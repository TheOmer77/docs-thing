import {
  Children,
  type ComponentProps,
  type PropsWithChildren,
  useMemo,
} from 'react';
import { Slot } from '@radix-ui/react-slot';

import {
  Tabs as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

type TabsProps = PropsWithChildren<{
  items: string[];
  defaultIndex?: number;
}>;
type TabProps = PropsWithChildren<
  Pick<ComponentProps<typeof TabsContent>, 'value'>
>;

export const Tabs = ({ items, defaultIndex = 0, children }: TabsProps) => {
  const uniqueItems = useMemo(() => [...new Set(items)], [items]);
  const childComponents = useMemo(
    () =>
      Children.toArray(children)
        .filter(
          child =>
            typeof child !== 'string' &&
            typeof child !== 'number' &&
            typeof child !== 'bigint'
        )
        .slice(0, uniqueItems.length),

    [children, uniqueItems.length]
  );

  return (
    <TabsRoot defaultValue={uniqueItems[defaultIndex]}>
      <TabsList>
        {uniqueItems.map(item => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {childComponents.map((child, idx) => (
        //@ts-expect-error Child will probably be Tab, otherwise value could
        // be passed to DOM element
        <Slot key={uniqueItems[idx]} value={uniqueItems[idx]}>
          {child}
        </Slot>
      ))}
    </TabsRoot>
  );
};

export const Tab = ({ value, children }: TabProps) => (
  <TabsContent value={value} className='[&_pre]:mt-0'>
    {children}
  </TabsContent>
);
