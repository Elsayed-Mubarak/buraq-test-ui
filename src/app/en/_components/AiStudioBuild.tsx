import Image from "next/image";

import aiStudioImage1 from "../../../public/ai_studio_images/aistudioImage1.jpg";
import aiStudioImage2 from "../../../public/ai_studio_images/aistudioImage2.jpg";
import aiStudioImage3 from "../../../public/ai_studio_images/aistudioImage3.jpg";
import aiStudioImage4 from "../../../public/ai_studio_images/aistudioImage4.jpg";

type Props = {};
const aiStudioItems = [
  {
    id: 1,
    title: "Train with Webpages",
    description:
      "Enter a website domain or sitemap address, and our AI studio will conduct a comprehensive scan of the domain, capturing all its URLs. This data is then used to train the AI model, guaranteeing accurate responses from your GPT chatbots.",
    image: aiStudioImage1,
  },
  {
    id: 2,
    title: "Train with Files",
    description:
      "Upload the documents you wish to train the GPT chatbot with, and it will extract content to answer any question. Supported file types include PDF, CSV, XLS, and TXT.",
    image: aiStudioImage2,
  },
  {
    id: 3,
    title: "Handoff to humans when your AI fails to answer",
    description:
      "Not always will your AI chatbot know the answer, and when it happens, transfer the chat to a human agent.",
    image: aiStudioImage3,
  },
  {
    id: 4,
    title: "Your GPT chatbot answers questions in 50+ languages",
    description:
      "Your GPT chatbot smartly understands the language in which a question is asked and answers it accordingly, making the experience truly personalized.",
    image: aiStudioImage4,
  },
];
export default function AiStudioBuild({}: Props) {
  return (
    <>
      <div className="m-auto max-w-[2050px]">
        <div className="mb-[80px] mt-[56px] flex w-full flex-col gap-[25px] px-5 md:mt-[63px] md:px-10 lg:mb-[80px] xl:mb-0 xl:mt-[201px] 2xl:px-20">
          <h3
            dir="ltr"
            className="mx-auto max-w-[335px] text-center text-[28px] font-semibold italic leading-[22px] text-[#12141D] md:max-w-[509.514px] md:text-[55.036px] md:leading-[66.043px] md:text-[#141414] xl:max-w-[1265.439px] xl:text-[86.232px] xl:leading-[103.478px]"
          >
            Build GPT chatbots your way, wowing your customers
          </h3>
          <p
            dir="ltr"
            className="max-w-[ 335px] mx-auto text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:max-w-[583.935px] md:text-[18.919px] md:font-normal md:leading-[30.27px] md:text-[#141414] xl:max-w-[593px] xl:text-[24px] xl:leading-[47.427px] xl:text-[#141414]"
          >
            In just 5 minutes, you can choose to train a GPT chatbot using your
            website domain or a set of documents.
          </p>
        </div>
      </div>
      <div className="bg-[#E9E9FD] md:mt-[88x] md:p-[0px] xl:mt-[110px] xl:pt-[80px]">
        <div className="m-auto max-w-[2050px]">
          {/*  */}
          {aiStudioItems.map((item) => (
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
                  <p className="cursor-pointer text-[14.293px] font-semibold leading-[15.881px] text-[#353EE7] md:leading-[15.881px] xl:text-[29.642px] xl:font-normal xl:leading-[47.427px]"></p>
                </div>
              </div>
              <div className="xxl:w-[50%] mt-[34px] flex w-[100%] flex-col items-center justify-center md:mt-0 md:w-[45%] md:items-center md:justify-center xl:w-[45%]">
                <Image
                  alt="img"
                  width="900"
                  height="900"
                  className="h-auto w-[303px] object-contain sm:w-[240px] xl:w-[931.285px]"
                  src={item.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
