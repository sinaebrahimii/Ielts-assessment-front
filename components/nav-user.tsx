"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronsUpDown, Loader2, LogOut, UserRound } from "lucide-react";

import { getFullName, useUser } from "@/features/auth/components/user-provider";
import { clearAuthToken } from "@/lib/token";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

/** Links shown in the middle of the user popover. Add new entries here. */
const USER_MENU_LINKS = [
  { title: "پروفایل", href: "/profile", icon: UserRound },
];

const menuRowClass =
  "flex h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-sm outline-none transition-colors md:h-9 [&_svg]:size-4 [&_svg]:shrink-0";

export function NavUser() {
  const { user, loading } = useUser();
  const { isMobile, state, setOpenMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [logoutFailed, setLogoutFailed] = React.useState(false);

  const fullName = getFullName(user) || "حساب کاربری";
  const initial = user?.first_name?.[0] ?? "؟";

  function closeAll() {
    setOpen(false);
    if (isMobile) setOpenMobile(false);
  }

  async function handleLogout() {
    setLoggingOut(true);
    setLogoutFailed(false);
    try {
      await clearAuthToken();
      router.replace("/login");
    } catch {
      setLoggingOut(false);
      setLogoutFailed(true);
    }
  }

  if (loading) {
    return (
      <div className="flex h-12 items-center gap-2 p-2 group-data-[collapsible=icon]:p-0">
        <Skeleton className="size-8 shrink-0 rounded-lg" />
        <div className="flex flex-1 flex-col gap-1.5 group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <span className="flex size-8 text-primary-800 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold ">
                {initial}
              </span>
              <span className="grid flex-1 text-start leading-tight">
                <span className="truncate text-sm font-medium">{fullName}</span>
                {user && (
                  <span
                    dir="ltr"
                    className="truncate text-end text-xs text-sidebar-foreground/60"
                  >
                    {user.phone_number}
                  </span>
                )}
              </span>
              <ChevronsUpDown className="ms-auto size-4 text-sidebar-foreground/50" />
            </SidebarMenuButton>
          </PopoverTrigger>

          <PopoverContent
            side={isMobile || state === "expanded" ? "top" : "left"}
            align="end"
            sideOffset={8}
            className="w-(--radix-popover-trigger-width) min-w-60 gap-0 p-1.5"
          >
            {/* Top: who is signed in */}
            <div className="px-2.5 py-2">
              <p className="truncate text-sm font-semibold">{fullName}</p>
              {user && (
                <p
                  dir="ltr"
                  className="truncate text-end text-xs text-muted-foreground"
                >
                  {user.email ?? user.phone_number}
                </p>
              )}
            </div>

            <Separator className="my-1" />

            {/* Middle: links */}
            <nav aria-label="حساب کاربری" className="flex flex-col gap-0.5">
              {USER_MENU_LINKS.map(({ title, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAll}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`${menuRowClass} hover:bg-accent focus-visible:bg-accent aria-[current=page]:bg-accent aria-[current=page]:font-medium [&_svg]:text-muted-foreground`}
                >
                  <Icon aria-hidden />
                  {title}
                </Link>
              ))}
            </nav>

            <Separator className="my-1" />

            {/* Bottom: logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className={`${menuRowClass} cursor-pointer text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {loggingOut ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <LogOut className="rtl:-scale-x-100" aria-hidden />
              )}
              خروج از حساب
            </button>
            {logoutFailed && (
              <p role="alert" className="px-2.5 pt-1 text-xs text-destructive">
                خروج انجام نشد. دوباره تلاش کنید.
              </p>
            )}
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
