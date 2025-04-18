import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Sidebar from './../../components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
   <>
 <div className="flex h-screen">
 <Sidebar/>
  
  <div className="grow overflow-y-auto">
  <div className="flex flex-col">
     <div className="bg-blue-400 px-6 py-2">
       <Tabs defaultValue="current" className="w-full">
         <TabsList className="bg-transparent h-12">
           <TabsTrigger
             value="current"
             className="text-white data-[state=active]:bg-white data-[state=active]:text-foreground h-full px-8"
           >
             Current
           </TabsTrigger>
           <TabsTrigger
             value="seasonal"
             className="text-white data-[state=active]:bg-white data-[state=active]:text-foreground h-full px-8"
           >
             Seasonal
           </TabsTrigger>
           <TabsTrigger
             value="outlook"
             className="text-white data-[state=active]:bg-white data-[state=active]:text-foreground h-full px-8"
           >
             Outlook
           </TabsTrigger>
         </TabsList>
       </Tabs>
     </div>
     
     
  
     
   </div>
   <div className="grow">
     {children}
     </div>
  </div>
 </div>
    </>
  );
};

export default DashboardLayout;
