"use client";
import { useForm } from "react-hook-form";
import Artboard from "../../../public/Artboard.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import BuraqTextLogo from "../../../public/text-logo.svg";
import Link from "next/link";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { mutate: signupFunc, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("User successfully registered");
      router.push("/login");
      reset();
    },
    onError: (error: any) => {
      toast.error(error);
      console.log(error)
    },
  });

  function onSubmit(data: any) {
    if (!phone) {
      toast.error("Phone number is required");
      return
    }
    const newData = { ...data, phoneNumber: `+${phone}` };
    signupFunc({ ...newData });
  }

  return (
    <div className="flex h-screen">
      <div className="hidden flex-1 justify-center overflow-y-auto bg-[#f3f3f3] md:flex">
        <div className="flex w-[80%] items-start justify-center">
          <Image src={Artboard} className="w-[80%]" alt="artboard image" />
        </div>
      </div>
      <div className="mb-8 flex flex-1 justify-center overflow-y-auto">
        <div className="w-[480px]">
          <div className="m-10 flex justify-center">
            <Image
              src={BuraqTextLogo}
              width={135}
              height={50}
              alt="buraq text logo"
            />
          </div>
          <div className="rounded-[20px] border border-primary-50 p-10">
            <div className="text-center">
              <p className="mb-2 text-2xl font-semibold text-secondary-50">
                Get started building bots
              </p>
              <p className="mb-5 text-sm font-semibold text-[#808080]">
                No credit card required • Unlimited trial period <br />• Build
                with no-code
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                <div className="group relative mb-4 w-full flex-1">
                  <label
                    className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="block w-full focus:outline-none focus:border-primary-500 rounded-md border border-primary-50 p-2 text-black hover:border-primary-600"
                    type="text"
                    {...register("firstName", {
                      required: "This field is required",
                    })}
                  />
                </div>
                <div className="group relative mb-4 w-full flex-1">
                  <label
                    className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="block w-full focus:outline-none focus:border-primary-500 rounded-md border border-primary-50 p-2 text-black hover:border-primary-600"
                    type="text"
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
              <div className="group relative mb-7">
                <span className="absolute bottom-[-18px] text-[12px] font-semibold text-[#f00]">
                  {errors?.email?.message && String(errors.email.message)}
                </span>
                <label
                  className={`sibling mb-1 block text-sm font-semibold group-focus-within:text-primary-500 ${typeof errors?.email?.message === 'string' && errors.email.message.length > 0 ? "text-[#f00]" : "text-secondary-50"}`}
                  htmlFor="email"
                >
                  Business Email
                </label>
                <input
                  className={`block w-full  focus:outline-none focus:border-primary-500 rounded-md border p-2 text-black hover:border-primary-600 ${typeof errors?.email?.message === 'string' && errors.email.message.length > 0 ? "border-[#f00]" : "border-primary-50"}`}
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

              <div className="group relative mb-4">
                <label
                  className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <PhoneInput
                  country={"eg"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputProps={{
                    required: true,
                  }}
                  inputStyle={{
                    display: "block",
                    width: "100%",
                    border: "0",
                    color: "#000",
                    height: "42px",
                  }}
                  buttonStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    border: "0",
                  }}
                  containerStyle={{
                    border: "1px solid #e4e4e4",
                    borderRadius: "6px",
                  }}
                />
              </div>
              <div className="group relative mb-4">
                <span className="absolute bottom-[-18px] text-[12px] font-semibold text-[#f00]">
                  {errors?.company?.message && String(errors.company.message)}
                </span>
                <label
                  className={`sibling mb-1 block text-sm font-semibold group-focus-within:text-primary-500 ${typeof errors?.company?.message === 'string' && errors.company.message.length > 0 ? "text-[#f00]" : "text-secondary-50"}`}
                  htmlFor="company"
                >
                  Company Name
                </label>
                <input
                  className={`block w-full  focus:outline-none focus:border-primary-500 rounded-md border p-2 text-black hover:border-primary-600 ${typeof errors?.company?.message === 'string' && errors.company.message.length > 0 ? "border-[#f00]" : "border-primary-50"}`}
                  type="text"
                  {...register("company", {
                    required: "This field is required",
                  })}
                />
              </div>
              <div className="group relative mb-7">
                <span className="absolute bottom-[-18px] text-[12px] font-semibold text-[#f00]">
                  {errors?.password?.message && String(errors.password.message)}
                </span>
                <label
                  className={`sibling mb-1 block text-sm font-semibold group-focus-within:text-primary-500 ${typeof errors?.password?.message === 'string' && errors.password.message.length > 0 ? "text-[#f00]" : "text-secondary-50"}`}
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    className={`block w-full  focus:outline-none focus:border-primary-500 rounded-md border p-2 text-black hover:border-primary-600 ${typeof errors?.password?.message === 'string' && errors.password.message.length > 0 ? "border-[#f00]" : "border-primary-50"}`}
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
              <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#808080]">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="terms"
                  id=""
                />
                <p>
                  I agree to Buraq's{" "}
                  <Link className="underline" href="">
                    Terms & Conditions
                  </Link>{" "}
                  &{" "}
                  <Link className="underline" href="">
                    Privacy Policy.
                  </Link>
                </p>
              </div>
              <button
                disabled={isPending}
                className="block h-9 w-full rounded-lg bg-primary-500 font-semibold text-white transition-all duration-200 hover:bg-primary-600 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                {isPending ? "loading..." : "Sign up"}
              </button>
            </form>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm">
            <p className="font-semibold text-secondary-50">
              Already have an account?
            </p>
            <Link href="/login" className="font-semibold text-primary-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

