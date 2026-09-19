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
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "../api/auth-api";
import { storeToken } from "../action/auth-actions";
import Link from "next/link";

type AuthMode = "login" | "signup";

export default function LoginForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setApiError(null);
      try {
        const data = await signIn({
          username: value.username,
          password: value.password,
        });

        await storeToken(data.access_token);
        router.push("/");
      } catch {
        setApiError(
          mode === "login"
            ? "شماره تلفن یا رمز عبور اشتباه است."
            : "خطا در ثبت‌نام، لطفاً مجدداً تلاش کنید.",
        );
      }
    },
  });

  return (
    <div
      dir="rtl"
      className="relative w-full max-w-5xl mx-auto min-h-[620px] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
    >
      {/* Dynamic Background Light Accent */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />

      {/* -------------------- LEFT BRANDING / SHOWCASE (Tablet & Desktop) -------------------- */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 border-l border-white/5 bg-gradient-to-br from-white/[0.04] via-transparent to-purple-950/20">
        <div>
          {/* Logo / Brand Header */}
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

          {/* Value Prop */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>ارزیابی استاندارد با دقت اگزمینر Band 9</span>
            </div>

            <h2 className="text-2xl xl:text-3xl font-black text-white leading-snug">
              نوشته‌های خود را هوشمندانه بسنجید و به نمره دلخواه برسید.
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed">
              دسترسی لحظه‌ای به فیدبک هوش مصنوعی، تحلیل خط‌به‌خط گرامر و افزایش
              دامنه واژگان آکادمیک در چند ثانیه.
            </p>
          </div>
        </div>

        {/* Live Mini Preview Metric */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 flex items-center gap-1.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              ایجنت‌های آنلاین
            </span>
            <span className="font-mono text-emerald-400">
              99.4% دقت ارزیابی
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-neutral-400">
            <span>میانگین ارتقای نمره داوطلبان</span>
            <span className="font-bold text-white font-mono">+1.5 Band</span>
          </div>
        </div>
      </div>

      {/* -------------------- RIGHT INTERACTIVE FORM CONTAINER -------------------- */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 z-10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-base font-black text-white">AIelts</span>
          </Link>
          <span className="text-xs text-neutral-400 font-mono">
            Band 8.5 Engine
          </span>
        </div>

        {/* Segmented Mode Switcher */}
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
            <span className="relative z-10">ثبت‌ نام جدید</span>
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {mode === "login" ? "خوش آمدید " : "شروع سفر تسلط بر رایتینگ "}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {mode === "login"
              ? "اطلاعات حساب خود را جهت ورود وارد کنید."
              : "حساب کاربری خود را بسازید و اولین ارزیابی را رایگان بگیرید."}
          </p>
        </div>

        {/* Form Container */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <AnimatePresence mode="wait">
            {/* Sign Up: Full Name Input */}
            {mode === "signup" && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <form.Field
                  name="fullName"
                  validators={{
                    onChange: ({ value }) =>
                      mode === "signup" && !value
                        ? "نام و نام خانوادگی الزامی است"
                        : undefined,
                  }}
                >
                  {(field) => (
                    <div className="space-y-1.5 pb-1">
                      <label className="text-xs font-semibold text-neutral-300">
                        نام و نام خانوادگی
                      </label>
                      <div className="relative flex items-center">
                        <User
                          className="absolute right-3.5 text-neutral-500 pointer-events-none"
                          size={18}
                        />
                        <input
                          id={field.name}
                          type="text"
                          placeholder="مثلاً: علی رضایی"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full h-11 pr-11 pl-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phone Number Field */}
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "شماره همراه الزامی است";
                if (!/^09\d{9}$/.test(value))
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
                    size={18}
                  />
                  <input
                    id={field.name}
                    type="tel"
                    dir="ltr"
                    placeholder="09123456789"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full h-11 pr-11 pl-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm tracking-widest text-right focus:border-purple-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-300">
                    رمز عبور
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock
                    className="absolute right-3.5 text-neutral-500 pointer-events-none"
                    size={18}
                  />
                  <input
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full h-11 pr-11 pl-11 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-purple-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
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

          {/* API Server Error Display */}
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

          {/* Submit Action */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-11 mt-2 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>در حال پردازش...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === "login"
                        ? "ورود به داشبورد"
                        : "ایجاد حساب کاربری"}
                    </span>
                    <ArrowLeft size={16} />
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Footer legal notes */}
        <p className="mt-8 text-center text-[11px] text-neutral-500 leading-relaxed">
          با ورود یا ثبت‌نام در سامانه،{" "}
          <a href="#" className="underline text-neutral-400 hover:text-white">
            قوانین و شرایط استفاده
          </a>{" "}
          و{" "}
          <a href="#" className="underline text-neutral-400 hover:text-white">
            حفظ حریم خصوصی
          </a>{" "}
          AIelts را می‌پذیرید.
        </p>
      </div>
    </div>
  );
}
