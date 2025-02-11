import {
  Children,
  type ComponentProps,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
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
  id?: string;
}>;
type TabProps = PropsWithChildren<
  Pick<ComponentProps<typeof TabsContent>, 'value'>
>;

export const Tabs = ({ items, defaultIndex = 0, id, children }: TabsProps) => {
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

  const [value, setValue] = useState<string | undefined>(undefined);

  const handleValueChange = (value: string) => {
    setValue(value);

    if (!id) return;
    window.localStorage.setItem(id, value);
    window.dispatchEvent(new StorageEvent('storage', { key: id }));
  };

  // Also avoids hydration error
  useEffect(() => {
    if (!id) return;

    const initialStorageValue = window.localStorage.getItem(id);
    if (initialStorageValue) setValue(initialStorageValue);

    const storageListener = () => {
      const storageValue = window.localStorage.getItem(id);
      if (storageValue && uniqueItems.includes(storageValue))
        setValue(storageValue);
    };
    addEventListener('storage', storageListener);
    return () => removeEventListener('storage', storageListener);
  }, [id, uniqueItems]);

  return (
    <TabsRoot
      value={value}
      defaultValue={uniqueItems[defaultIndex]}
      onValueChange={handleValueChange}
    >
      <TabsList>
        {uniqueItems.map(item => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {childComponents.map((child, idx) => (
        //@ts-expect-error Child will probably be a Tab, otherwise value could
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
