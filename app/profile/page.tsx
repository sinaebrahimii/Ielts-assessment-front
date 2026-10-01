// app/profile/page.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import { Calendar, Mail, Phone, User } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { getFullName, useUser } from "@/features/auth/components/user-provider";

type Row = {
  label: string;
  icon: LucideIcon;
  value: string;
  /** Latin text (numbers, emails) should render left-to-right. */
  ltr?: boolean;
};

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-14">
        <Skeleton className="h-8 w-32" />
        <div className="mt-8 flex flex-col gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-14">
        <p className="text-sm text-muted-foreground">
          اطلاعات حساب دریافت نشد. صفحه را دوباره بارگذاری کنید.
        </p>
      </div>
    );
  }

  const rows: Row[] = [
    { label: "نام و نام خانوادگی", icon: User, value: getFullName(user) },
    { label: "شماره تلفن", icon: Phone, value: user.phone_number, ltr: true },
    ...(user.email
      ? [{ label: "ایمیل", icon: Mail, value: user.email, ltr: true }]
      : []),
    {
      label: "تاریخ ثبت‌نام",
      icon: Calendar,
      value: new Date(user.created_at).toLocaleDateString("fa-IR"),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-14">
      <h1 className="text-2xl font-bold">پروفایل</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        مشخصات ثبت‌شده برای حساب شما
      </p>

      <dl className="mt-8 divide-y divide-border rounded-xl border bg-card">
        {rows.map(({ label, icon: Icon, value, ltr }) => (
          <div
            key={label}
            className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </dt>
            <dd
              dir={ltr ? "ltr" : undefined}
              className={`min-w-0 break-words text-sm font-medium ${
                ltr ? "text-start sm:text-end" : ""
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
