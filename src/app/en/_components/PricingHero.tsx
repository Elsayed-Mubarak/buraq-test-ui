"use client";

import { useState } from "react";

type Props = {};
export default function PricingHero({}: Props) {
  const [pricingPlan, setPricingPlan] = useState("monthly");
  return (
    <>
      <div className="wrapper flex items-center justify-center bg-[#F6F6FF] pb-[39px] lg:pb-[162px]">
        <div className="xxl:mt-[136px] mt-[72px] flex w-full max-w-[325px] flex-col items-center justify-center xl:max-w-[665px]">
          <h3 className="text-[28px] font-bold leading-[30px] text-[#12141D] md:text-[44px] md:font-semibold md:leading-[55px] xl:text-[86.232px] xl:leading-[102.478px] xl:tracking-[-1.725px]">
            Our pricing
          </h3>
          <p className="mt-[8px] text-[16px] font-normal leading-[25px] text-[#12141D] md:mt-[17px] xl:mt-8 xl:text-[32px] xl:leading-[47.427px]">
            Find best plan for your chatbot needs
          </p>
          <div className="mt-[21px] w-[290px] md:w-[355px] xl:mt-8 xl:w-[665px]">
            <div className="flex h-[48px] w-full items-center justify-between rounded-full border border-[#12141D] md:h-[50px] xl:h-[95px]">
              <h3
                onClick={() => setPricingPlan("monthly")}
                className={`${pricingPlan === "monthly" ? "bg-[#343DE6] text-white" : "bg-transparent text-[#12141D]"} flex h-full w-[133px] cursor-pointer items-center justify-center gap-2 rounded-[200px] text-[16px] font-semibold capitalize leading-5 md:w-[202px] md:text-[19px] md:leading-[21px] xl:w-[380px] xl:gap-4 xl:text-[36px] xl:leading-10`}
              >
                Monthly
              </h3>
              <h3
                onClick={() => setPricingPlan("yearly")}
                className={`${pricingPlan === "yearly" ? "bg-[#343DE6] text-white" : "bg-transparent text-[#12141D]"} flex h-full w-[133px] cursor-pointer items-center justify-center gap-2 rounded-[200px] text-[16px] font-semibold capitalize leading-5 md:w-[202px] md:text-[19px] md:leading-[21px] xl:w-[380px] xl:gap-4 xl:text-[36px] xl:leading-10`}
              >
                Yearly
                <span
                  className={`${pricingPlan === "yearly" ? "bg-[#7357FF]" : "bg-[#34AEFF]"} flex h-[19px] w-[47px] items-center justify-center whitespace-nowrap rounded-full p-[4px_9px] text-[10.44px] font-medium capitalize !leading-none text-white xl:h-[32px] xl:w-[92px] xl:p-[8px_16px] xl:text-[18px] xl:leading-4`}
                >
                  Save 20%
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper w-full bg-[#F6F6F6]">
        <div className="wrapper bg-[#F6F6FF] pb-5">
          <div className="xxl:gap-[30px] xxl:px-20 grid w-full grid-cols-4 gap-[15px] px-10">
            <div className="xxl:min-h-[866px] xxl:p-[37px] relative min-h-[397px] w-full min-w-[192px] max-w-[192px] rounded-[6px] border border-[#E4E4E7] p-[17px] text-white md:min-h-[462px] md:min-w-full md:max-w-full md:p-5">
              <p className="xxl:text-[22.77px] xxl:leading-[30px] text-[10px] font-bold leading-[13px] text-[#12141D] md:text-[14px] md:leading-4">
                Pro Plan
              </p>
              <h3 className="xxl:gap-[18px] xxxl:text-[48px] xxl:leading-[60px] xxl:mt-[11px] mt-[7px] flex h-[28px] items-center gap-[9px] whitespace-nowrap text-[22px] font-bold leading-[27px] text-[#12141D] md:min-h-[33px] md:text-[25.6px] md:leading-[32px] xl:min-h-[61px]">
                399{pricingPlan === "yearly" ? "0" : ""} SAR
                <span className="xxl:text-[24px] xxl:leading-[26px] font-zarid-serif text-[11px] font-normal leading-[11px] text-[#12141D] md:text-[14px] md:leading-[13px]">
                  / {pricingPlan === "yearly" ? "year" : "month"}
                </span>
              </h3>
              <p className="xxl:text-[24px] xxl:leading-[32px] xxl:mt-[25px] mt-3 text-[11px] font-normal leading-[15px] text-[#52525B] md:text-[14px] md:leading-[17px]">
                Startups and New Entrepreneurs
              </p>
              <div className="xxl:mt-[69px] mx-auto mt-[31px] max-w-[144px] md:mt-9 md:max-w-[168px] xl:max-w-[315px]">
                <button className="flex h-[31px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-bold leading-5 text-[#12141D] md:h-[37px] xl:h-[60px] xl:text-[20px]">
                  <span className="flex flex-row items-center gap-x-[6px]">
                    Contact Us
                  </span>
                </button>
              </div>
              <div className="xxl:mt-[37px] mt-[18px] flex flex-col gap-3 md:mt-5">
                <h3 className="xxl:text-[20px] xxl:leading-[35.422px] text-[9px] font-bold leading-[16px] text-[#12141D] md:text-[12px] md:leading-6">
                  Features
                </h3>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;2000 Chats
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Unlimited Users
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with Zapier
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Chat
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Support
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Relation Manager
                </p>
              </div>
            </div>
            <div className="xxl:min-h-[866px] xxl:p-[37px] relative min-h-[397px] w-full min-w-[192px] max-w-[192px] rounded-[0px_0px_6px_6px] border border-[#E4E4E7] bg-[#12141D] p-[17px] md:min-h-[462px] md:min-w-full md:max-w-full md:p-5">
              <p className="xxl:text-[22.77px] xxl:leading-[30px] text-[10px] font-bold leading-[13px] text-white md:text-[14px] md:leading-4">
                Growth Plan
              </p>
              <h3 className="xxl:gap-[18px] xxxl:text-[48px] xxl:leading-[60px] xxl:mt-[11px] mt-[7px] flex h-[28px] items-center gap-[9px] whitespace-nowrap text-[22px] font-bold leading-[27px] text-white md:min-h-[33px] md:text-[25.6px] md:leading-[32px] xl:min-h-[61px]">
                599{pricingPlan === "yearly" ? "0" : ""} SAR
                <span className="xxl:text-[24px] xxl:leading-[26px] font-zarid-serif text-[11px] font-normal leading-[11px] text-white md:text-[14px] md:leading-[13px]">
                  / {pricingPlan === "yearly" ? "year" : "month"}
                </span>
              </h3>
              <p className="xxl:text-[24px] xxl:leading-[32px] xxl:mt-[25px] mt-3 text-[11px] font-normal leading-[15px] text-[#D6D6D6] md:text-[14px] md:leading-[17px]">
                Scaleups and Mid-sized Businesses
              </p>
              <div className="xxl:mt-[69px] mx-auto mt-[31px] max-w-[144px] md:mt-9 md:max-w-[168px] xl:max-w-[315px]">
                <button className="lg:font-zarid-serif flex h-[31px] w-full items-center justify-center rounded-[100px] bg-[#353EE7] text-[12px] font-bold leading-5 text-white md:h-[37px] md:text-[18px] lg:font-semibold xl:h-[60px] xl:text-[20px]">
                  <span
                    dir="ltr"
                    className="flex flex-row items-center gap-x-[6px]"
                  >
                    Contact Us
                  </span>
                </button>
              </div>
              <div className="xxl:mt-[37px] mt-[18px] flex flex-col gap-3 md:mt-5">
                <h3 className="xxl:text-[20px] xxl:leading-[35.422px] text-[9px] font-bold leading-[16px] text-white md:text-[12px] md:leading-6">
                  Features
                </h3>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;4000 Chats
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Unlimited Users
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with more than 10 Platforms
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Chat
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;AI Studio
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Support in 24 Hours
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#D6D6D6] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Relation Manager
                </p>
              </div>
              <div className="xxl:h-[66px] xxl:top-[-66px] absolute left-0 top-[-35px] flex h-[35px] w-full items-center justify-center rounded-[6px_6px_0px_0px] bg-[#34AEFF]">
                <h3 className="xxl:text-[24px] xxl:leading-8 text-[12px] font-bold leading-[17px] text-[#12141D]">
                  MOST POPULAR
                </h3>
              </div>
            </div>
            <div className="xxl:min-h-[866px] xxl:p-[37px] relative min-h-[397px] w-full min-w-[192px] max-w-[192px] rounded-[6px] border border-[#E4E4E7] p-[17px] text-white md:min-h-[462px] md:min-w-full md:max-w-full md:p-5">
              <p className="xxl:text-[22.77px] xxl:leading-[30px] text-[10px] font-bold leading-[13px] text-[#12141D] md:text-[14px] md:leading-4">
                Leadership Plan
              </p>
              <h3 className="xxl:gap-[18px] xxxl:text-[48px] xxl:leading-[60px] xxl:mt-[11px] mt-[7px] flex h-[28px] items-center gap-[9px] whitespace-nowrap text-[22px] font-bold leading-[27px] text-[#12141D] md:min-h-[33px] md:text-[25.6px] md:leading-[32px] xl:min-h-[61px]">
                899{pricingPlan === "yearly" ? "0" : ""} SAR
                <span className="xxl:text-[24px] xxl:leading-[26px] font-zarid-serif text-[11px] font-normal leading-[11px] text-[#12141D] md:text-[14px] md:leading-[13px]">
                  / {pricingPlan === "yearly" ? "year" : "month"}
                </span>
              </h3>
              <p className="xxl:text-[24px] xxl:leading-[32px] xxl:mt-[25px] mt-3 text-[11px] font-normal leading-[15px] text-[#52525B] md:text-[14px] md:leading-[17px]">
                Corporates and Market Leaders
              </p>
              <div className="xxl:mt-[69px] mx-auto mt-[31px] max-w-[144px] md:mt-9 md:max-w-[168px] xl:max-w-[315px]">
                <button className="flex h-[31px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-bold leading-5 text-[#12141D] md:h-[37px] xl:h-[60px] xl:text-[20px]">
                  <span
                    dir="ltr"
                    className="flex flex-row items-center gap-x-[6px]"
                  >
                    Contact Us
                  </span>
                </button>
              </div>
              <div className="xxl:mt-[37px] mt-[18px] flex flex-col gap-3 md:mt-5">
                <h3 className="xxl:text-[20px] xxl:leading-[35.422px] text-[9px] font-bold leading-[16px] text-[#12141D] md:text-[12px] md:leading-6">
                  Features
                </h3>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;8000 Chats
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Unlimited Users
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with more than 10 Platforms
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with any API
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Chat
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;AI Studio
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Support
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Relation Manager
                </p>
              </div>
            </div>
            <div className="xxl:min-h-[866px] xxl:p-[37px] relative min-h-[397px] w-full min-w-[192px] max-w-[192px] rounded-[6px] border border-[#E4E4E7] p-[17px] text-white md:min-h-[462px] md:min-w-full md:max-w-full md:p-5">
              <p className="xxl:text-[22.77px] xxl:leading-[30px] text-[10px] font-bold leading-[13px] text-[#12141D] md:text-[14px] md:leading-4">
                Customized Plan
              </p>
              <h3 className="xxl:gap-[18px] xxxl:text-[48px] xxl:leading-[60px] xxl:mt-[11px] mt-[7px] flex h-[28px] items-center gap-[9px] whitespace-nowrap text-[22px] font-bold leading-[27px] text-[#12141D] md:min-h-[33px] md:text-[25.6px] md:leading-[32px] xl:min-h-[61px]">
                Contact Us
                <span className="xxl:text-[24px] xxl:leading-[26px] font-zarid-serif text-[11px] font-normal leading-[11px] text-[#12141D] md:text-[14px] md:leading-[13px]"></span>
              </h3>
              <p className="xxl:text-[24px] xxl:leading-[32px] xxl:mt-[25px] mt-3 text-[11px] font-normal leading-[15px] text-[#52525B] md:text-[14px] md:leading-[17px]">
                Customized Plan
              </p>
              <div className="xxl:mt-[69px] mx-auto mt-[31px] max-w-[144px] md:mt-9 md:max-w-[168px] xl:max-w-[315px]">
                <button className="flex h-[31px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-bold leading-5 text-[#12141D] md:h-[37px] xl:h-[60px] xl:text-[20px]">
                  <span
                    dir="ltr"
                    className="flex flex-row items-center gap-x-[6px]"
                  >
                    Contact Us
                  </span>
                </button>
              </div>
              <div className="xxl:mt-[37px] mt-[18px] flex flex-col gap-3 md:mt-5">
                <h3 className="xxl:text-[20px] xxl:leading-[35.422px] text-[9px] font-bold leading-[16px] text-[#12141D] md:text-[12px] md:leading-6">
                  Features
                </h3>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Number of conversations as needed
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Unlimited Users
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with more than 10 Platforms
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Integrate with any API
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Chat
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;AI Studio
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Live Support
                </p>
                <p className="xxl:text-[22px] xxl:leading-[43.013px] text-[10px] font-medium leading-[19px] text-[#52525B] md:text-[14px] md:leading-[22px]">
                  •&nbsp;&nbsp;Relation Manager
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-[35px] w-[149px] md:mt-[88px] md:w-[153px] xl:w-[234px]">
            <button className="flex h-[48px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-semibold leading-5 text-[#12141D] md:h-[54px] xl:h-[60px] xl:text-[18px]">
              <span className="flex flex-row items-center gap-x-[6px]">
                Compare plans
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
