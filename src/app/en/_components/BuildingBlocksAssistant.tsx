"use client";
import Image from "next/image";
import { useState } from "react";

import buildCollectImage1 from "../../../public/building_blocks_assistant/_BuildingCardCollect1.svg";
import buildCollectImage2 from "../../../public/building_blocks_assistant/_BuildingCardCollect2.svg";
import buildCollectImage3 from "../../../public/building_blocks_assistant/_BuildingCardCollect3.svg";
import buildCollectImage4 from "../../../public/building_blocks_assistant/_buildCollectCard4.svg";
import buildCollectImage5 from "../../../public/building_blocks_assistant/_buildCollectCard5.svg";
import buildCollectImage6 from "../../../public/building_blocks_assistant/_buildCollectCard6.svg";
import buildCollectImage7 from "../../../public/building_blocks_assistant/_buildCollectCard7.svg";

import buildLogicalImage1 from "../../../public/building_blocks_assistant/_BuildingCardLogical1.svg";
import buildLogicalImage2 from "../../../public/building_blocks_assistant/_BuildingCardLogical2.svg";
import buildLogicalImage3 from "../../../public/building_blocks_assistant/_BuildingCardLogical3.svg";
import buildLogicalImage4 from "../../../public/building_blocks_assistant/_BuildingCardLogical4.svg";
import buildLogicalImage5 from "../../../public/building_blocks_assistant/_BuildingCardLogical5.svg";
import buildLogicalImage6 from "../../../public/building_blocks_assistant/_BuildingCardLogical6.svg";

import buildOutboundImage1 from "../../../public/building_blocks_assistant/_BuildingCardOutbound1.svg";
import buildOutboundImage2 from "../../../public/building_blocks_assistant/_BuildingCardOutbound2.svg";
import buildOutboundImage3 from "../../../public/building_blocks_assistant/_BuildingCardOutbound3.svg";

import buildFunctionImage1 from "../../../public/building_blocks_assistant/_BuildingCardFunction1.svg";
import buildFunctionImage2 from "../../../public/building_blocks_assistant/_BuildingCardFunction2.svg";
import buildFunctionImage3 from "../../../public/building_blocks_assistant/_BuildingCardFunction3.svg";
import buildFunctionImage4 from "../../../public/building_blocks_assistant/_BuildingCardFunction4.svg";
import buildFunctionImage5 from "../../../public/building_blocks_assistant/_BuildingCardFunction5.svg";

type BuildType = {
  id: number;
  title: string;
  description: string;
  image: string;
};
const buildCollectItems: BuildType[] = [
  {
    id: 1,
    title: "Input",
    description: "Collect information from your visitors with open text input.",
    image: buildCollectImage1,
  },
  {
    id: 2,
    title: "Button",
    description: "Make it easy to share input by showing a list of buttons.",
    image: buildCollectImage2,
  },
  {
    id: 3,
    title: "Carousel",
    description:
      "Set of cards displaying an item with clear call-to-action buttons.",
    image: buildCollectImage3,
  },
  {
    id: 4,
    title: "Calendar",
    description: "Get your visitor to submit a date with a date picker.",
    image: buildCollectImage4,
  },
  {
    id: 5,
    title: "Form",
    description: "Collect multiple information in one go with a form.",
    image: buildCollectImage5,
  },
  {
    id: 6,
    title: "File upload",
    description: "Gather documents or files from the visitor.",
    image: buildCollectImage6,
  },
  {
    id: 7,
    title: "Slider",
    description: "Let users select from a range of values.",
    image: buildCollectImage7,
  },
];
const buildLogicalItems: BuildType[] = [
  {
    id: 1,
    title: "Branch",
    description: "Define conditions to branch the flow as you need.",
    image: buildLogicalImage1,
  },
  {
    id: 2,
    title: "Javascript",
    description:
      "Execute javascript functions that perform an operation you want.",
    image: buildLogicalImage2,
  },
  {
    id: 3,
    title: "Dynamic data",
    description:
      "Dynamically render a set of buttons or carousels through API response.",
    image: buildLogicalImage3,
  },
  {
    id: 4,
    title: "Flow",
    description: "Create sub-flows to organize your complex chat flows.",
    image: buildLogicalImage4,
  },
  {
    id: 5,
    title: "Jump",
    description: "Jump to a point in your chatbot flow when needed.",
    image: buildLogicalImage5,
  },
  {
    id: 6,
    title: "Delay",
    description: "Set aside a delay before moving to the next step.",
    image: buildLogicalImage6,
  },
];
const buildOutboundItems: BuildType[] = [
  {
    id: 1,
    title: "Send Email",
    description: "Send an HTML email to a group of users",
    image: buildOutboundImage1,
  },
  {
    id: 2,
    title: "Send WhatsApp",
    description:
      "Sends an interactive template message to a set of people on WhatsApp.",
    image: buildOutboundImage2,
  },
  {
    id: 3,
    title: "Send SMS",
    description: "Sends a text message to a set of people",
    image: buildOutboundImage3,
  },
];
const buildFunctionItems: BuildType[] = [
  {
    id: 1,
    title: "AI model",
    description: "Get a question asked smartly answered through an AI model.",
    image: buildFunctionImage1,
  },
  {
    id: 2,
    title: "Human handover",
    description:
      "Transfer the conversation to a human agent for manual assistance.",
    image: buildFunctionImage2,
  },
  {
    id: 3,
    title: "HTTP request",
    description:
      "Executes a HTTP request to your systems to push/pull information.",
    image: buildFunctionImage3,
  },
  {
    id: 4,
    title: "Webhook",
    description:
      "Waits for an action to complete before proceeding to the next step.",
    image: buildFunctionImage4,
  },
  {
    id: 5,
    title: "Email notification",
    description:
      "Sends a email notification with the required body to the defined users.",
    image: buildFunctionImage5,
  },
];

type Props = {};
export default function BuildingBlocksAssistant({}: Props) {
  let displayedItems = buildCollectItems;
  type SelectedItem = "collect" | "logical" | "outbound" | "function";
  const [selectedItem, setSelectedItem] = useState<SelectedItem>("collect");

  if (selectedItem === "collect") displayedItems = buildCollectItems;
  if (selectedItem === "logical") displayedItems = buildLogicalItems;
  if (selectedItem === "outbound") displayedItems = buildOutboundItems;
  if (selectedItem === "function") displayedItems = buildFunctionItems;
  return (
    <>
      <div className="mt-[88px] flex w-full flex-col items-center justify-center px-5 xl:mt-[177px] xl:pl-[149px] xl:pr-[139px]">
        <h3 className="font-zarid-bold xl:font-zarid-serif max-w-[335px] text-center text-[28px] font-bold leading-[22px] tracking-[-0.942px] text-[#141414] md:max-w-[435px] md:text-[47px] md:leading-[56px] xl:max-w-[798px] xl:text-[86.232px] xl:font-semibold xl:leading-[103.478px] xl:tracking-[-1.725px]">
          Building blocks that bring your assistant to life
        </h3>
        <p className="mt-4 max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:mt-[49px] md:max-w-[499px] md:text-[16px] md:font-normal md:leading-[25px] md:text-[#141414] xl:mt-[90px] xl:max-w-[914px] xl:text-[29px] xl:leading-[47px]">
          Personalize the chat experience with over 40 action blocks to choose
          from.
        </p>
        <div className="xxl:max-w-[1632px] mb-[66px] mt-[42px] w-full max-w-[346px] sm:max-w-[848px] xl:mb-[120px]">
          <div className="xxl:h-[120px] flex h-[46px] w-full items-center justify-between rounded-full border border-[#000] p-[2px] sm:h-[64px] md:p-0">
            <h3
              onClick={() => setSelectedItem("collect")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "collect" ? "bg-[#353ee7] text-white" : "text-[#12141d]"} `}
            >
              COLLECT
            </h3>
            <h3
              onClick={() => setSelectedItem("logical")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "logical" ? "bg-[#353ee7] text-white" : "text-[#12141d]"} `}
            >
              LOGICAL
            </h3>
            <h3
              onClick={() => setSelectedItem("outbound")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "outbound" ? "bg-[#353ee7] text-white" : "text-[#12141d]"} `}
            >
              OUTBOUND
            </h3>
            <h3
              onClick={() => setSelectedItem("function")}
              className={`xxl:w-[384px] xxl:text-[36px] xxl:leading-10 flex h-full w-[73px] cursor-pointer items-center justify-center rounded-full text-[13px] font-semibold capitalize leading-[9px] sm:w-[200px] sm:text-[18px] md:text-[19.84px] md:leading-[21.84px] ${selectedItem === "function" ? "bg-[#353ee7] text-white" : "text-[#12141d]"} `}
            >
              FUNCTION
            </h3>
          </div>
        </div>
      </div>
      <div className="mb-[88px] w-full px-[53px] md:px-[77px] xl:px-[146px]">
        <div className="grid w-full grid-cols-1 gap-[28px] sm:grid-cols-2 lg:grid-cols-3 xl:gap-[53px]">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="xxl:min-h-[538.072px] flex min-h-[auto] w-full flex-col items-start overflow-hidden rounded-[11px] shadow-md md:shadow-[none] xl:rounded-[21.558px]"
            >
              <Image
                alt="Building Card Flow Image"
                width={506.61}
                height={294.94}
                className="w-full rounded-[11.498px] xl:rounded-[21.558px]"
                src={item.image}
              />
              <div className="flex w-full flex-col items-center justify-center gap-[2px] px-[23px] py-[28px] xl:gap-[10.78px] xl:px-[43.12px] xl:py-[53.89px]">
                <h1 className="font-zarid-bold text-[15.926px] font-bold leading-[19px] text-[#12141D] md:text-[17px] md:leading-[21px] xl:text-[32.07px] xl:leading-[39px]">
                  {item.title}
                </h1>
                <p className="undefined text-center text-[15px] font-normal leading-normal text-[#12141D] md:text-[17px] xl:text-[32px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
