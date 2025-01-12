import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsProps {
  tab1Content: React.ReactNode;
  tab2Content: React.ReactNode;
}

export function EmbededCode({ tab1Content, tab2Content }: TabsProps) {
  return (
    <Tabs defaultValue="Html" className="overflow-hidden max-h-full">
      <TabsList className="flex w-full justify-start border-b border-gray-300 dark:border-gray-700">
        <TabsTrigger
          value="Html"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-b-green-500 dark:data-[state=active]:border-b-blue-400 data-[state=active]:rounded-none flex items-center"
        >
          Html
        </TabsTrigger>
        <TabsTrigger
          value="Nextjs"
          className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 dark:data-[state=active]:border-b-blue-400 data-[state=active]:rounded-none flex items-center"
        >
          Nextjs
        </TabsTrigger>
      </TabsList>
      <div className=" max-h-full  ">
        <TabsContent
          className="p-2 max-h-full overflow-auto w-full  "
          value="Html"
        >
          {tab1Content}
        </TabsContent>
        <TabsContent
          className="p-2 max-h-full overflow-auto w-full "
          value="Nextjs"
        >
          {tab2Content}
        </TabsContent>
      </div>
    </Tabs>
  );
}
