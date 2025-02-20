"use client";

import Image from "next/image";
import { useState } from "react";
import test from "../../../public/bot_builder/_testImage.svg";
import deploy from "../../../public/bot_builder/_deployImage1.svg";
import customize from "../../../public/bot_builder/_customizeImage.svg";
import monitor from "../../../public/bot_builder/_monitorImage1.svg";
import design from "../../../public/bot_builder/_designImage1.svg";

type Props = {};

export default function DesignBuildChatbot({}: Props) {
  type SelectedItem = "design" | "test" | "deploy" | "customize" | "monitor";
  const [selectedItem, setSelectedItem] = useState<SelectedItem>("design");
  const images = {
    test,
    deploy,
    customize,
    monitor,
    design,
  };
  return (
    <>
      <div className="mt-[88px] flex w-full flex-col items-center justify-center px-5 xl:mt-[177px] xl:pl-[149px] xl:pr-[139px]">
        <h3 className="font-zarid-bold xl:font-zarid-serif max-w-[335px] text-center text-[28px] font-bold leading-[22px] tracking-[-0.942px] text-[#141414] md:max-w-[435px] md:text-[47px] md:leading-[56px] xl:max-w-[798px] xl:text-[86.232px] xl:font-semibold xl:leading-[103.478px] xl:tracking-[-1.725px]">
          Build powerful and smart chatbots in minutes
        </h3>
        <p className="mt-4 max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:mt-[49px] md:max-w-[499px] md:text-[16px] md:font-normal md:leading-[25px] md:text-[#141414] xl:mt-[90px] xl:max-w-[914px] xl:text-[29px] xl:leading-[47px]">
          With our no-code bot builder it literally takes you minutes to build
          build your chatbots. You can also opt to get it custom-built by our
          bot experts.
        </p>
        <div className="xxl:max-w-[1632px] mb-[66px] mt-[42px] w-full max-w-[346px] sm:max-w-[848px] xl:mb-[120px]">
          <div className="xxl:h-[120px] flex h-[46px] w-full items-center justify-between rounded-full border border-[#000] p-[2px] sm:h-[64px] md:p-0">
            <h3
              onClick={() => setSelectedItem("design")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "design" ? "bg-[#353ee7] text-white" : "text-[#12141d]"}`}
            >
              Design
            </h3>
            <h3
              onClick={() => setSelectedItem("test")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "test" ? "bg-[#353ee7] text-white" : "text-[#12141d]"}`}
            >
              Test
            </h3>
            <h3
              onClick={() => setSelectedItem("customize")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "customize" ? "bg-[#353ee7] text-white" : "text-[#12141d]"}`}
            >
              Customize
            </h3>
            <h3
              onClick={() => setSelectedItem("deploy")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "deploy" ? "bg-[#353ee7] text-white" : "text-[#12141d]"}`}
            >
              Deploy
            </h3>
            <h3
              onClick={() => setSelectedItem("monitor")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "monitor" ? "bg-[#353ee7] text-white" : "text-[#12141d]"}`}
            >
              Monitor
            </h3>
          </div>
        </div>
      </div>
      <div className="mb-[88px] flex w-full flex-col items-center justify-center px-[53px] md:px-[77px] xl:px-[146px]">
        <h3 className="mx-auto mb-[30px] w-full max-w-[335px] text-center text-[20px] font-medium leading-[22px] text-[#777] md:mb-[75px] md:max-w-[483px] md:text-[13.212px] md:font-normal md:leading-[17px] md:text-[#000] xl:mb-[96px] xl:max-w-[877px] xl:text-[28px] xl:leading-normal">
          Select how you want to create your chatbot: choose from our repository
          of industry-specific chatbot templates or build it from scratch using
          our no-code chatbot builder.
        </h3>
        <Image
          alt="img"
          width="1627"
          height="786"
          className="h-full w-full rounded-[8px] xl:rounded-[43px]"
          src={images[selectedItem]}
        />
      </div>
    </>
  );
}
