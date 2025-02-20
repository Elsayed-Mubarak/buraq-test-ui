"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import BuraqTextLogo from "../../../public/text-logo.svg";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../stores/useAuthStore";
export default function LoginPage() {
  const router = useRouter();
  const { login, authUser, token } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const {
    mutate: loginFunc,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("login successfully ");
      router.push("/dashboard/analytics");
      reset();
    },
    onError: (error: any) => {
      console.log(error)
      toast.error(error);
    },
  });
  function onSubmit(data: any) {
    loginFunc({ ...data });
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10 mt-24">
        <Image src={BuraqTextLogo} width={170} alt="buraq text logo" />
      </div>
      <div className="w-[480px] rounded-[20px] border border-primary-50 p-10">
        <div className="text-center">
          <p className="mb-2 text-2xl font-semibold text-secondary-50">
            Welcome back
          </p>
          <p className="mb-5 text-sm font-semibold text-[#808080]">
            Sign in and build some bots
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="group relative mb-7">
            <span className="absolute bottom-[-18px] text-[12px] font-semibold text-[#f00]">
              {errors?.email?.message && String(errors.email.message)}
            </span>
            <label
              className={`sibling group-focus-within:text-primary-500" mb-1 block text-sm font-semibold ${typeof errors?.email?.message === "string" && errors.email.message.length > 0 ? "text-[#f00]" : "text-secondary-50"}`}
            >
              Email
            </label>
            <input
              className={`block w-full focus:border-primary-500 focus:outline-none rounded-md border p-2 text-black hover:border-primary-600 ${typeof errors?.email?.message === "string" && errors.email.message.length > 0 ? "border-[#f00]" : "border-primary-50"}`}
              type="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Valid email is rquired",
                },
              })}
            />
          </div>
          <div className="group relative mb-7">
            <span className="absolute bottom-[-18px] text-[12px] font-semibold text-[#f00]">
              {errors?.password?.message && String(errors.password.message)}
            </span>
            <div className="flex items-center justify-between">
              <label
                className={`sibling mb-1 block text-sm font-semibold group-focus-within:text-primary-500 ${typeof errors?.password?.message === "string" && errors.password.message.length > 0 ? "text-[#f00]" : "text-secondary-50"}`}
                htmlFor="password"
              >
                Password
              </label>
              <Link
                className="text-sm font-semibold text-primary-500 hover:underline"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className={`${typeof errors?.password?.message === "string" && errors.password.message.length > 0 ? "border-[#f00]" : "border-primary-50"} focus:border-primary-500 focus:outline-none block w-full rounded-md border p-2 text-black hover:border-primary-600`}
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be greater than 6 characters",
                  },
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-[#808080]"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
          <button
            disabled={isPending}
            className="block h-9 w-full rounded-lg bg-primary-500 font-semibold text-white transition-all duration-200 hover:bg-primary-600 disabled:pointer-events-none disabled:cursor-not-allowed"
          >
            {isPending ? "loading..." : "Log in"}
          </button>
        </form>
      </div>
      <div className="my-10 flex items-center gap-2 text-sm">
        <p className="font-semibold text-secondary-50">
          Don't have an account?
        </p>
        <Link href="/signup" className="font-semibold text-primary-500">
          Sign up
        </Link>
      </div>
    </div>
  );
}
