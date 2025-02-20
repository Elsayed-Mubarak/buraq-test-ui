import React from "react";

type Props = {
  children: React.ReactNode;
};
export const metadata = {
  title: "App Market | Buraq",
};
export default function AppMarketLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-[900px] py-3">
        <div>
          <div className="text-2xl font-semibold text-secondary-50">
            App Market
          </div>
          <p className="text-[#808080]">
            Discover and integrate your favourite apps with Buraq
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
