"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  // وضعیت برای تعیین اینکه آیا کاربر در صفحه ورود است یا ثبت‌نام
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="w-full max-w-sm rounded-xl border bg-bg -container p-8 shadow-sm text-white"
      dir="rtl"
    >
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold">
          {isLogin ? "ورود به حساب" : "ثبت‌نام حساب جدید"}
        </h2>
      </div>

      <form className="space-y-5">
        {/* شماره تلفن */}
        <div className="space-y-2">
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            className="text-right bg-bg-light placeholder:text-[#B1BED1] border-none text-white "
            required
          />
        </div>

        {/* رمز عبور */}
        <div className="space-y-2">
          <Label htmlFor="password">رمز عبور</Label>
          <Input
            id="password"
            type="password"
            placeholder="رمز عبور"
            className="bg-bg-light  placeholder:text-[#B1BED1] border-none text-white "
            required
          />
        </div>

        {/* دکمه فرم */}
        <Button
          type="submit"
          className="w-full  bg-primary-600 text-white hover:bg-primary-700 cursor-pointer border border-primary-600"
        >
          {isLogin ? "ورود" : "ثبت‌نام"}
        </Button>
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
