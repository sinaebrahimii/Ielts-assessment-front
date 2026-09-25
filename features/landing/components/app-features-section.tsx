// features/landing/components/app-features-section.tsx
import { BentoGrid } from "@/components/ui/bento-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturesBento } from "./bento-grid";
import { ProgressReportShowcase } from "./progress-report-showcase";
import PersonalStudyPlanTab from "./study-plan-showcase";
const AppFeatures = () => {
  return (
    <div className="bg-linear-to-b from-bg-dark font-vazirmatn to-bg w-full py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h4
          dir="rtl"
          className="text-gray-100 font-black text-3xl sm:text-4xl text-center mb-3"
        >
          امکانات و ابزارهای هوشمند AIelts
        </h4>
        <p className="text-center text-neutral-400 text-sm max-w-xl mx-auto mb-8">
          مسیر تحلیلی و گام‌به‌گام برای رسیدن به بالاترین نمره رایتینگ با
          بازخورد تخصصی
        </p>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mx-auto bg-bg-light gap-2 sm:gap-4 flex justify-center mb-8 p-1.5 rounded-2xl border border-white/5">
            <TabsTrigger
              className="cursor-pointer text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-neutral-300 transition-all"
              value="overview"
            >
              بازخورد هوشمند
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-neutral-300 transition-all"
              value="reports"
            >
              گزارش پیشرفت
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-neutral-300 transition-all"
              value="curriculum"
            >
              برنامه درسی شخصی
            </TabsTrigger>
          </TabsList>

          <TabsContent dir="rtl" value="overview" className="pb-10">
            <FeaturesBento />
          </TabsContent>

          <TabsContent dir="rtl" value="reports" className="pb-10">
            <ProgressReportShowcase />
          </TabsContent>
          <TabsContent value="curriculum" dir="rtl">
            <PersonalStudyPlanTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppFeatures;
