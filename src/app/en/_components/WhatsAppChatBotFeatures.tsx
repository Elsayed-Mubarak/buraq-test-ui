import Image from "next/image";
import whtasappFeatureImage2 from "../../../public/_designChat1.svg";
import whtasappFeatureImage1 from "../../../public/_runChat.svg";
import whtasappFeatureImage3 from "../../../public/_supportChat.svg";
const whatsAppChatBotFeaturesItems = [
  {
    id: 1,
    title: "Support customers 24/7 on WhatsApp",
    description:
      "Improve customer support with WhatsApp chatbots,Provide immediate assistance and engage agents, when needed. ,,Boost CSAT, NPS, and agent ,productivity.",
    lable: "Learn More →",
    image: whtasappFeatureImage3,
    href: "",
  },
  {
    id: 2,
    title: "Generating qualified potential clients With WhatsApp interactions",
    description:
      "Engage with incoming messages and utilize Click to WhatsApp ads to generate more qualified leads.",
    lable: "Learn More →",
    image: whtasappFeatureImage3,
    href: "",
  },
  {
    id: 3,
    title: "Run promotional campaigns that drive sales",
    description:
      "Upload your contact lists and run your marketing cadence to generate higher CTR and replies.",
    lable: "Design your WhatsApp",
    image: whtasappFeatureImage1,
    href: "",
  },
  {
    id: 4,
    title: "Design your WhatsApp Chatbot with zero code",
    description:
      "Easily design conversational flows visually, no coding required. Build WhatsApp chatbots for various business needs and analyze data for insights to enhance performance.",
    lable: "WhatsApp chatbots power business",
    image: whtasappFeatureImage2,
    href: "",
  },
];
type Props = {};

export default function WhatsAppChatBotFeatures({}: Props) {
  return (
    <div className="w-screen max-w-full bg-[#12141D]">
      <div className="bg-[#E9E9FD] md:mt-[88x] md:p-[0px] xl:mt-[110px] xl:pt-[80px]">
        <div className="max-w-[2050px]">
          {whatsAppChatBotFeaturesItems.map((item) => (
            <div
              key={item.id}
              className="xxl:p-[90px] flex w-full flex-col pt-[88px] md:flex-row md:p-[50px]"
            >
              <div className="xxl:w-[70%] xxl:px-[145px] xxl:pt-[175px] flex w-[100%] flex-col items-center justify-center md:w-[50%] xl:w-[50%] xl:items-start xl:justify-start xl:px-[45px] xl:pt-[120px]">
                <h3 className="xxl:max-w-[70%] font-zarid-bold md:font-zarid-serif max-w-[336px] text-center text-[28px] font-bold leading-[22px] text-[#12141D] md:max-w-[347.036px] md:text-start md:text-[28.744px] md:font-semibold md:leading-[40.241px] md:text-[#141414] xl:max-w-[70%] xl:text-[53.895px] xl:leading-[75.453px]">
                  {item.title}
                </h3>
                <p className="mt-[16px] max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:mt-0 md:max-w-[347.036px] md:text-start md:text-[12.8px] md:font-normal md:leading-[25.295px] md:text-[#141414] xl:max-w-[70%] xl:text-[24px] xl:leading-[47.427px]">
                  {item.description}
                </p>
                <div className="mt-[41px] flex flex-col items-start justify-start md:w-[347.036px] xl:w-[70%]">
                  <p className="cursor-pointer text-[14.293px] font-semibold leading-[15.881px] text-[#353EE7] md:leading-[15.881px] xl:text-[29.642px] xl:font-normal xl:leading-[47.427px]">
                    {item.lable}
                  </p>
                </div>
              </div>
              <div className="xxl:w-[50%] mt-[34px] flex w-[100%] flex-col items-center justify-center md:mt-0 md:w-[45%] md:items-end md:justify-end xl:w-[45%]">
                <Image
                  alt="img"
                  width="50"
                  height="50"
                  className="h-auto w-[303px] xl:w-[931.285px]"
                  src={item.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
