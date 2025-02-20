"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import BuraqTextLogo from "../../../public/text-logo.svg";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10 mt-24">
        <Image src={BuraqTextLogo} width={170} alt="buraq text logo" />
      </div>
      <div className="w-[480px] rounded-[20px] border border-primary-50 p-10">
        <div className="text-center">
          <p className="mb-2 text-2xl font-semibold text-secondary-50">
            Forgot your password?
          </p>
          <p className="mb-5 text-sm font-semibold text-[#808080]">
            Fear not. We'll email you the instructions to reset your password.
          </p>
        </div>
        <form>
          <div className="group mb-7">
            <label
              className="sibling mb-1 block text-sm font-semibold text-secondary-50 group-focus-within:text-primary-500"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full rounded-md border border-primary-50 p-2 text-black hover:border-primary-600"
              type="email"
            />
          </div>

          <button className="block h-9 w-full rounded-lg bg-primary-500 font-semibold text-white transition-all duration-200 hover:bg-primary-600">
            Send the link
          </button>
        </form>
      </div>
      <div className="my-10 flex items-center gap-2 text-sm">
        <Link href="/login" className="font-semibold text-primary-500">
          Return to login
        </Link>
      </div>
    </div>
  );
}
