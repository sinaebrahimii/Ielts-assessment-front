// components/app-sidebar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PenLine,
  SquarePen,
  Sparkles,
  FileCheck,
  type LucideIcon,
  ArrowUpLeft,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { APP_NAME } from "@/lib/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type NavItem = { title: string; href: string; icon: LucideIcon };

const MAIN_NAV: NavItem[] = [
  { title: "ارزیابی جدید رایتینگ", href: "/essay", icon: SquarePen },
  { title: "کارنامه و بازخوردها", href: "/profile", icon: FileCheck },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex h-10 items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:hidden"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <PenLine className="size-4 text-primary-800" aria-hidden />
            </span>
            <span className="truncate text-sm font-bold tracking-tight">
              {APP_NAME}
            </span>
          </Link>
          <SidebarTrigger className="text-sidebar-foreground/70 hover:text-sidebar-accent-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation Links */}
        <SidebarGroup>
          <SidebarGroupLabel>بخش‌های سامانه</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map(({ title, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={title}
                    >
                      <Link href={href}>
                        <Icon className="size-4" />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Middle Section: IELTS Examiner Call To Action Card */}
        <div className="mt-auto px-2 py-3 group-data-[collapsible=icon]:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-3.5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5 animate-pulse" />
              <span>شبیه‌ساز رسمی اگزمینر</span>
            </div>
            <p className="mt-1.5 text-xs text-sidebar-foreground/80 leading-relaxed font-normal">
              متن خود را ثبت کنید تا تحلیل ۴ معیاره با نمره دقیق Band دریافت
              کنید.
            </p>
            <Link
              href="/essay"
              className="mt-3 inline-flex w-full items-center justify-between rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow transition hover:opacity-90 active:scale-[0.98]"
            >
              <span className="text-primary-800">نگارش رایتینگ</span>
              <ArrowUpLeft className="size-3.5 text-primary-800" />
            </Link>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
