"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "../api/auth-api";
import { storeToken } from "../action/auth-actions";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        const data = await signIn({
          username: value.username,
          password: value.password,
        });

        await storeToken(data.access_token);

        router.push("/");
      } catch {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
    },
  });

  return (
    <div
      className="w-full max-w-sm rounded-xl border bg-bg-container p-8 shadow-sm text-white"
      dir="rtl"
    >
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">
          {isLogin ? "ورود به حساب" : "ثبت‌نام حساب جدید"}
        </h2>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* شماره تلفن */}
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              !value ? "شماره تلفن الزامی است" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>شماره تلفن</Label>
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="text-right bg-bg-light placeholder:text-[#B1BED1] border-none text-white"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-400">
                  {field.state.meta.errors.join("، ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* رمز عبور */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              !value ? "رمز عبور الزامی است" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>رمز عبور</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="رمز عبور"
                className="bg-bg-light placeholder:text-[#B1BED1] border-none text-white"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-400">
                  {field.state.meta.errors.join("، ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* خطای عمومی */}
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {/* دکمه فرم */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-primary-600 text-white hover:bg-primary-700 cursor-pointer border border-primary-600 disabled:opacity-50"
            >
              {isSubmitting ? "در حال ورود..." : isLogin ? "ورود" : "ثبت‌نام"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      {/* متن تغییر حالت (Toggle) */}
      <div className="mt-4 text-center text-sm text-stone-300">
        {isLogin ? (
          <p>
            حساب کاربری ندارید؟{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-primary-400 hover:text-primary-300 cursor-pointer underline underline-offset-4"
            >
              می‌خواهم ثبت‌نام کنم
            </button>
          </p>
        ) : (
          <p>
            حساب کاربری دارید؟{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              وارد شوید
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
