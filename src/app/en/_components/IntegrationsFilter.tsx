"use client";
import Image from "next/image";
import chatGPT from "../../../public/integrations/_chatGPT.svg";
import googleCalendar from "../../../public/integrations/_google_Calendar_icon_.svg";
import slack from "../../../public/integrations/_slack-logo.svg";
import hubspot from "../../../public/integrations/_hubspot.svg";
import calendly from "../../../public/integrations/_calendly-Logo.svg";
import googleSheet from "../../../public/integrations/_googleSheet.svg";
import gAnalytics from "../../../public/integrations/_gAnalytics.svg";
import googleDialogflow from "../../../public/integrations/_google-Dialogflow.svg";
import zohoCRM from "../../../public/integrations/_zoho-CRM.svg";
import { useState } from "react";

type IntergrationType = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
};

const integrationsItems: IntergrationType[] = [
  {
    id: 1,
    title: "ChatGpt",
    description:
      "Train your AI models using data or documents from your website and intelligent chatbot applications.",
    category: "ai",
    image: chatGPT,
  },
  {
    id: 2,
    title: "Google",
    description:
      "Visit your calendar for available options and to request new appointments.",
    category: "scheduling",
    image: googleCalendar,
  },
  {
    id: 3,
    title: "Slack",
    description:
      "Report to your channels and follow up on mobile chat software, or let your agents take over chats directly from Slack.",
    category: "channels",
    image: slack,
  },
  {
    id: 4,
    title: "HubSpot",
    description:
      "Find customers interested in your HubSpot account as well as a variety of WotNot.",
    category: "utility",
    image: hubspot,
  },
  {
    id: 5,
    title: "Calendly",
    description:
      "Allow visitors to book appointments on your chatbot using your Calendly event.",
    category: "scheduling",
    image: calendly,
  },
  {
    id: 6,
    title: "Google Sheets",
    description:
      "Archives or archives were found using your Google Sheet filter criteria.",
    category: "utility",
    image: googleSheet,
  },
  {
    id: 7,
    title: "GAnalytics",
    description:
      "Allow visitors to book meetings with you or your away teammates based on availability shown on your calendar.",
    category: "ticketing",
    image: gAnalytics,
  },
  {
    id: 8,
    title: "Google Dialogflow",
    description:
      "Allow visitors to book meetings with you or your away teammates based on availability shown on your calendar.",
    category: "ticketing",
    image: googleDialogflow,
  },
  {
    id: 9,
    title: "Zoho CRM",
    description:
      "They are known as the new client in Zoho CRM and tell the map using WotNot variables.",
    category: "crm",
    image: zohoCRM,
  },
];
type Props = {};
export default function IntegrationsFilter({}: Props) {
  const [selectedItem, setSelectedItem] = useState("all");
  let displayedItems = integrationsItems;
  if (selectedItem === "all") displayedItems = integrationsItems;
  if (selectedItem === "ai")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "ai");
  if (selectedItem === "crm")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "crm");
  if (selectedItem === "scheduling")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "scheduling");
  if (selectedItem === "ticketing")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "ticketing");
  if (selectedItem === "utility")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "utility");
  if (selectedItem === "channels")
    displayedItems = integrationsItems
      .slice()
      .filter((el) => el.category === "channels");
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[29px] md:mt-[89px] md:flex xl:mt-[177px]">
        <div className="px-5 md:mt-[25px] md:px-[80px] 2xl:px-[110px]">
          <p className="mb-[15px] text-[16px] font-bold leading-[18.984px] text-[#8C8B8B] md:mb-[12.38px] md:leading-[34px] xl:mb-[16.7px] xl:p-5 xl:text-[21px]">
            Categories
          </p>
          <div className="flex flex-row gap-x-4 md:flex-col xl:gap-x-0">
            <div
              onClick={() => setSelectedItem("all")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "all" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                All Integrations
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("ai")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "ai" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                Al
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("crm")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "crm" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                CRM
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("scheduling")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "scheduling" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                Scheduling
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("ticketing")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "ticketing" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                Ticketing
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("utility")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "utility" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                Utility
              </p>
            </div>
            <div
              onClick={() => setSelectedItem("channels")}
              className={`flex h-[35px] w-fit min-w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-[200px] p-[10px] md:h-[34px] md:w-[148px] md:items-start md:justify-start md:p-[10px] xl:h-[63px] xl:w-[269px] xl:p-[18px] ${selectedItem === "channels" ? "bg-[#353ee7] text-white" : "text-[#3a3a3a]"} `}
            >
              <p className="whitespace-nowrap text-[16px] font-normal leading-[17.085px] xl:text-[21.558px] xl:leading-[31.043px]">
                Channels
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4">
            <p
              className={`${selectedItem === "ai" || selectedItem === "crm" ? "uppercase" : "capitalize"} p-5 text-[16px] font-semibold leading-[14.665px] tracking-[-0.111px] text-[#141414] md:text-[23.73px] xl:mb-[33px] xl:text-[43.116px] xl:leading-[56.913px] xl:tracking-[-0.431px]`}
            >
              {selectedItem}
              {selectedItem === "all" && " integrations"}
            </p>
            <div className="flex flex-col items-center justify-center gap-[18px] md:w-auto md:flex-row md:flex-wrap md:items-start md:justify-start xl:w-auto xl:gap-[32px]">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex h-[170px] w-[335px] gap-5 rounded-[16.168px] p-[44px_43px_62px] shadow-md md:h-[167px] md:w-[330px] md:p-[26px_43px_62px] xl:h-[305px] xl:w-[601px] xl:p-[79px_77px_112px]"
                >
                  <div className="">
                    <Image
                      alt="img"
                      width="64"
                      height="64"
                      className="h-[35.674px] min-w-[35.674px] md:h-[64px] md:w-[64px]"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-[18px] font-semibold leading-normal text-[#141414] md:text-[18px] xl:text-[32.606px]">
                      {item.title}
                    </p>
                    <p className="text-[16px] font-normal leading-[17.304px] text-[#8C8B8B] md:max-w-[339.607px] md:text-[16px] xl:text-[24px] xl:leading-[31.043px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
