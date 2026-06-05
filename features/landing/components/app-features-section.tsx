import { BentoGrid } from "@/components/ui/bento-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturesBento } from "./bento-grid";
const AppFeatures = () => {
  return (
    <div className="bg-linear-to-b from-primary-background font-vazirmatn to-primary-container w-full">
      <h4
        dir="rtl "
        className="text-gray-200 font-black text-4xl text-center mt-5"
      >
        AIelts امکانات
      </h4>
      <Tabs defaultValue="overview" className="w-full ">
        <TabsList className="mx-auto bg-[#64748B] gap-4 flex justify-center my-5">
          <TabsTrigger
            className="cursor-pointer data-[state=active]:text-primary-background text-[#F8FBFE]"
            value="overview"
          >
            بازخورد هوشمند
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer data-[state=active]:text-primary-background text-[#F8FBFE]"
            value="analytics"
          >
            برنامه درسی شخصی
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer data-[state=active]:text-primary-background text-[#F8FBFE]"
            value="reports"
          >
            گزارش پیشرفت
          </TabsTrigger>
        </TabsList>
        <TabsContent dir="rtl" value="overview" className="px-6 pb-10">
          <FeaturesBento />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppFeatures;
