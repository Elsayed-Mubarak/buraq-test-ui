"use client";
import { useState } from "react";
import weBuildImage1 from "../../../public/_weBuildItImg1.svg";
import weBuildImage2 from "../../../public/_weBuildItImg2.svg";
import weBuildImage3 from "../../../public/_weBuildItImg3.svg";

import workCardImage1 from "../../../public/_workCardImg1.svg";
import workCardImage2 from "../../../public/_workCardImg2.svg";
import workCardImage3 from "../../../public/_workCardImg3.svg";
import workCardImage4 from "../../../public/_workCardImg4.svg";
import workCardImage5 from "../../../public/_workCardImg5.svg";
import workCardImage6 from "../../../public/_workCardImg6.svg";
import HowBuildCard from "./HowBuildCard";


type WorkCard = {
  title: string;
  description: string;
  image: string;
  span?: boolean;
  justify?: boolean;
};
type Props = {};
const weBuildFeaturesItems: WorkCard[] = [
  {
    title: "Build by Visual Builder",
    description: "Build a chatbot from scratch without coding.",
    image: workCardImage1,
    justify: true,
  },
  {
    title: "Choose from various elements",
    description:
      "More than 40 designs for your bot conversations, including buttons, sliders, and carousel to improve user experience.",
    image: workCardImage2,
    justify: false,
  },
  {
    title: "Receive assistance",
    description:
      "Access product tutorial videos for guidance in building your bot.",
    image: workCardImage3,
    justify: true,
  },
  {
    title: "Integrate with your apps",
    description: "Easily link your bot with your applications and websites.",
    image: workCardImage4,
    justify: false,
  },
  {
    title: "Security Privacy",
    description:
      "Your data is securely stored on our cloud servers with high encryption.",
    image: workCardImage5,
    justify: true,
  },
  {
    title: "Dedicated support",
    description:
      "Enjoy the assistance of an account manager throughout the product-building process and beyond.",
    image: workCardImage6,
    justify: false,
  },
];
const youBuildFeaturesItems: WorkCard[] = [
  {
    title: "Create a bot in 5 days",
    description:
      "Our team works to understand your needs, and then build your chatbot in less than a week.",
    image: weBuildImage1,
    justify: true,
    span: true,
  },
  {
    title: "24/7 support",
    description:
      "Because we built this bot, we will be responsible for it every second.",
    image: workCardImage3,
    justify: false,
  },
  {
    title: "Copywriter",
    description:
      "To enhance sales with compelling responses tailored to each customer's journey.",
    image: workCardImage2,
    justify: false,
  },
  {
    title: "Regular meetings",
    description:
      "To ensure your satisfaction with the bot we built it and its desired outcomes.",
    image: weBuildImage2,
    justify: true,
  },
  {
    title: "Business Analyst",
    description:
      "To understand client needs, analyze operations, and offer solutions to improve performance.",
    image: weBuildImage3,
    justify: false,
  },
];

export default function HowBuild({}: Props) {
  const [howToBuild, setHowToBuild] = useState("we");
  let displayedCards =
    howToBuild === "we" ? weBuildFeaturesItems : youBuildFeaturesItems;
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[56px] flex w-full flex-col items-center justify-center bg-[#fbfcff] px-5 pb-10 pt-8 md:mt-[64px] md:px-10 xl:mt-[280px] xl:pb-[394px] 2xl:px-20">
        <div className="flex max-w-[1134px] flex-col items-center justify-center">
          <h3 className="text-[28px] font-bold !leading-normal text-[#12141D] md:text-2xl md:font-semibold xl:text-[56px]">
            How to build Buraq AI chatbot?
          </h3>
          <div className="mt-[18px] w-[243px] xl:mt-[63px] xl:w-[745px]">
            <div className="flex h-[37px] w-full flex-row rounded-[200px] border-[1px] border-[#12141D] xl:h-[120px] xl:border-[2px]">
              <div
                onClick={() => setHowToBuild("we")}
                className={`${howToBuild === "we" ? "bg-[#353EE7] text-white" : "bg-transparent text-[#12141D]"} flex h-full w-1/2 cursor-pointer items-center justify-center rounded-[200px]`}
              >
                <p className="text-[11px] font-semibold xl:text-[32px]">
                  You build it yourself
                </p>
              </div>
              <div
                onClick={() => setHowToBuild("yourSelf")}
                className={`${howToBuild === "yourSelf" ? "bg-[#353EE7] text-white" : "bg-transparent text-[#12141D]"} flex h-full w-1/2 cursor-pointer items-center justify-center rounded-[200px]`}
              >
                <p className="text-[11px] font-semibold xl:text-[32px]">
                  We build it for you
                </p>
              </div>
            </div>
          </div>
          <p className="mt-[18px] text-center text-[18px] font-semibold leading-10 text-[#777] xl:mt-[63px] xl:text-[36px]">
            Save time and effort and enjoy additional features
          </p>
        </div>
        <div className="mt-[18px] grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:mt-[84px] xl:gap-8">
          {displayedCards.map((item) => (
            <HowBuildCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
