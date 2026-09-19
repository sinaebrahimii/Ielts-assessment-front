"use client";

import LoginForm from "@/features/auth/components/login-form";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 bg-bg-dark font-vazirmatn overflow-hidden">
      {/* Interactive Form Card */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <LoginForm />
      </div>

      {/* Ambient Neural Background Mesh */}
      <BackgroundBeams className="bg-bg-dark opacity-40 pointer-events-none" />
    </main>
  );
}
