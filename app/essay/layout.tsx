// app/essay/layout.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";

import "../globals.css";
import "../app-shell.css";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/features/auth/components/user-provider";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `ثبت رایتینگ | ${APP_NAME}`,
  description: "ارزیابی تخصصی و هوشمند مقاله آیلتس",
};

export default async function EssayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <html lang="fa" dir="rtl" className="dark app-shell h-full antialiased">
      <body className="min-h-full font-vazirmatn">
        <UserProvider>
          <TooltipProvider>
            <SidebarProvider side="right" defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarInset>
                <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur md:hidden">
                  <SidebarTrigger className="size-9" />
                  <span className="text-sm font-bold">{APP_NAME}</span>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </UserProvider>
      </body>
    </html>
  );
}
