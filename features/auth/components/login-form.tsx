// features/auth/components/login-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Phone,
  Lock,
  User,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "../api/auth-api";
import { setAuthToken } from "@/lib/token";
import { HTTPError } from "ky";
import Link from "next/link";

type AuthMode = "login" | "signup";

export default function LoginForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setApiError(null);
      try {
        if (mode === "login") {
          const data = await signIn({
            username: value.phoneNumber,
            password: value.password,
          });
          await setAuthToken(data.access_token);
          router.push("/profile");
        } else {
          // 1. Sign up user
          await signUp({
            first_name: value.firstName.trim(),
            last_name: value.lastName.trim(),
            phone_number: value.phoneNumber.trim(),
            email: value.email.trim() ? value.email.trim() : undefined,
            password: value.password,
          });

          // 2. Automatically log in after registration
          const tokenData = await signIn({
            username: value.phoneNumber.trim(),
            password: value.password,
          });

          await setAuthToken(tokenData.access_token);
          router.push("/profile");
        }
      } catch (err) {
        if (err instanceof HTTPError) {
          try {
            const errJson = (await err.response.json()) as { detail?: string };
            setApiError(errJson.detail || "خطایی در پردازش اطلاعات رخ داد.");
          } catch {
            setApiError(
              mode === "login"
                ? "شماره تلفن یا رمز عبور اشتباه است."
                : "خطا در ثبت‌نام، لطفاً ورودی‌های خود را مجدداً بررسی کنید.",
            );
          }
        } else {
          setApiError("برقراری ارتباط با سرور با خطا مواجه شد.");
        }
      }
    },
  });

  return (
    <div
      dir="rtl"
      className="relative w-full max-w-5xl mx-auto min-h-[620px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-vazirmatn"
    >
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />

      {/* LEFT BRANDING */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-l border-white/5 bg-gradient-to-br from-white/[0.04] via-transparent to-purple-950/20">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group mb-10"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform duration-200">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white">
                AIelts
              </span>
              <span className="text-[10px] text-purple-300 font-mono">
                NEXT-GEN EXAMINER
              </span>
            </div>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>ارزیابی هوشمند با استانداردهای آزمون آیلتس</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-black text-white leading-snug">
              نوشته‌های خود را هوشمندانه بسنجید و به نمره هدف برسید.
            </h2>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 z-10">
        {/* Tab Switcher */}
        <div className="relative flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setApiError(null);
            }}
            className={`relative flex-1 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              mode === "login"
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {mode === "login" && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-purple-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">ورود به حساب</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setApiError(null);
            }}
            className={`relative flex-1 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              mode === "signup"
                ? "text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {mode === "signup" && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-purple-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">ثبت‌‌ نام جدید</span>
          </button>
        </div>

        <div className="mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {mode === "login" ? "خوش آمدید" : "ثبت‌نام کاربر جدید"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {mode === "login"
              ? "شماره تلفن و رمز عبور خود را وارد کنید."
              : "مشخصات خود را برای افتتاح حساب وارد فرمایید."}
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <AnimatePresence mode="wait">
            {mode === "signup" && (
              <motion.div
                key="signup-extra-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                {/* First Name & Last Name in one row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <form.Field
                    name="firstName"
                    validators={{
                      onChange: ({ value }) =>
                        mode === "signup" && !value.trim()
                          ? "نام الزامی است"
                          : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300">
                          نام
                        </label>
                        <div className="relative flex items-center">
                          <User
                            className="absolute right-3.5 text-neutral-500 pointer-events-none"
                            size={17}
                          />
                          <input
                            type="text"
                            placeholder="مثلاً: علی"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full h-11 pr-10 pl-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] outline-none"
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-rose-400">
                            {field.state.meta.errors.join("، ")}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="lastName"
                    validators={{
                      onChange: ({ value }) =>
                        mode === "signup" && !value.trim()
                          ? "نام خانوادگی الزامی است"
                          : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300">
                          نام خانوادگی
                        </label>
                        <div className="relative flex items-center">
                          <User
                            className="absolute right-3.5 text-neutral-500 pointer-events-none"
                            size={17}
                          />
                          <input
                            type="text"
                            placeholder="مثلاً: محمدی"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full h-11 pr-10 pl-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] outline-none"
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-rose-400">
                            {field.state.meta.errors.join("، ")}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Optional Email */}
                <form.Field name="email">
                  {(field) => (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        ایمیل{" "}
                        <span className="text-neutral-500 font-normal">
                          (اختیاری)
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail
                          className="absolute right-3.5 text-neutral-500 pointer-events-none"
                          size={17}
                        />
                        <input
                          type="email"
                          dir="ltr"
                          placeholder="example@domain.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full h-11 pr-10 pl-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] outline-none"
                        />
                      </div>
                    </div>
                  )}
                </form.Field>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phone Number Field */}
          <form.Field
            name="phoneNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "شماره همراه الزامی است";
                if (!/^09\d{9}$/.test(value.trim()))
                  return "شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود";
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  شماره موبایل
                </label>
                <div className="relative flex items-center">
                  <Phone
                    className="absolute right-3.5 text-neutral-500 pointer-events-none"
                    size={17}
                  />
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="09123456789"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full h-11 pr-10 pl-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm tracking-widest text-right focus:border-purple-500 focus:bg-white/[0.08] outline-none"
                  />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    {field.state.meta.errors.join("، ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "رمز عبور الزامی است";
                if (value.length < 6)
                  return "رمز عبور باید حداقل ۶ کاراکتر باشد";
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  رمز عبور
                </label>
                <div className="relative flex items-center">
                  <Lock
                    className="absolute right-3.5 text-neutral-500 pointer-events-none"
                    size={17}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full h-11 pr-10 pl-11 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    {field.state.meta.errors.join("، ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{apiError}</span>
            </motion.div>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-11 mt-2 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>در حال برقراری ارتباط...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === "login" ? "ورود به حساب" : "ثبت‌ نام و ورود"}
                    </span>
                    <ArrowLeft size={16} />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
