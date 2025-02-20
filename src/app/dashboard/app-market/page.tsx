"use client";
import { Search } from "lucide-react";
import appMarketData from "../../../data/appMarketData";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
type Props = {};

export default function AppMarketPage({}: Props) {
  const pathName = usePathname();
  return (
    <>
      <div className="mt-14 flex h-[40px] items-center justify-end gap-2">
        <div className="relative h-full w-[300px]">
          <input
            placeholder="Search apps"
            className="peer block h-full w-full rounded-[3px] border border-[#808080] pl-8 text-sm outline-0 transition-all duration-100 hover:border-primary-600 focus:border-primary-600 focus:shadow-[#343de6_0_0_4px]"
            type="text"
          />
          <span className="text-[#808080] peer-focus:text-primary-600">
            <Search className="absolute left-2 top-[50%] h-5 w-5 translate-y-[-50%]" />
          </span>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-10 pb-14">
        {appMarketData.map((item) => (
          <Link
            href={`${pathName}${item.href}`}
            key={item.title}
            className="h-[176px] cursor-pointer rounded-lg border-2 shadow-[#cdcdcd_0_2px_20px] hover:border-primary-500"
          >
            <div className="relative p-4">
              <Image
                src={item.image}
                height={50}
                width={item.href === "/zoho-crm" ? 100 : 50}
                alt={item.title}
              />
            </div>
            <div className="mb-[6px] flex items-center pl-4">
              <div className="font-semibold text-secondary-50">
                {item.title}
              </div>
            </div>
            <div className="max-w-[228px] pl-4 text-[11px] font-semibold text-secondary-50">
              {item.description}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
