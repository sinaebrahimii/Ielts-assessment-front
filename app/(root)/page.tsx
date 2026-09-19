import HeroSection from "@/features/landing/components/hero-section";
import { AgentArchitectureSection } from "@/features/landing/components/agent-architecture-section";
import { InteractiveFeedbackDemo } from "@/features/landing/components/interactive-feedback-demo";
import AppFeatures from "@/features/landing/components/app-features-section";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-bg-dark text-white selection:bg-purple-500/30 selection:text-purple-200">
      <HeroSection />
      <AgentArchitectureSection />
      <InteractiveFeedbackDemo />
      <AppFeatures />
    </main>
  );
}
