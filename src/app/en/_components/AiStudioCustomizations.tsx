import Image from "next/image";
import aiStudioImage5 from "../../../public/ai_studio_images/aistudioImage5.jpg";
import aiStudioImage6 from "../../../public/ai_studio_images/aistudioImage6.jpg";
import aiStudioImage7 from "../../../public/ai_studio_images/aistudioImage7.jpg";
import aiStudioImage8 from "../../../public/ai_studio_images/aistudioImage8.jpg";
import aiStudioImage9 from "../../../public/ai_studio_images/aistudioImage9.jpg";

type Props = {};

const aiStudioCustomizeItems = [
  {
    id: 1,
    title: "Answer questions from your data",
    description:
      "Isolate your AI model by making it answer from your dataset only.",
    image: aiStudioImage7,
  },
  {
    id: 1,
    title: "Collect feedback for improvement",
    description:
      "To improve your AI model, collect and analyse feedback from each response.",
    image: aiStudioImage8,
  },
  {
    id: 1,
    title: "Data is safe and secure guaranteed",
    description: "Your training data is safe with us in an encrypted format.",
    image: aiStudioImage9,
  },
];

export default function AiStudioCustomizations({}: Props) {
  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center bg-[#E9E9FD] px-5 pt-[42px] md:pt-[163px] xl:px-[76px] xl:pt-[157px]">
        <h3 className="max-w-[980px] text-center text-[28px] font-semibold leading-[22px] tracking-[-0.92px] text-[#141414] md:text-[45px] md:leading-[55px] xl:text-[86px] xl:leading-[103px] xl:tracking-[-1.725px]">
          Make the AI model truly yours with customizations
        </h3>
        <p className="mt-4 max-w-[341px] text-center text-[18px] font-normal leading-[22px] text-[#141414] md:mt-[83px] md:text-[15px] md:leading-[25px] xl:max-w-[640px] xl:text-[29px] xl:leading-[47px]">
          Utilize our extensive customization options to tailor your AI models'
          responses according to your preferences.
        </p>
        <div className="mt-[42px] grid w-full grid-cols-1 gap-[23px] pb-[42px] sm:grid-cols-2 md:mt-[55px] xl:mt-[104px] xl:gap-10">
          <div className="xxl:min-h-[538.072px] flex min-h-[auto] w-full flex-col items-start gap-[0.001px] overflow-hidden rounded-[11px] bg-[#FBF8FF] px-5 py-5 shadow-md md:px-10 md:py-[52px] md:shadow-[none] xl:rounded-[21.558px] xl:px-[76px] xl:py-[98px]">
            <Image
              alt="Building Card Flow Image"
              width="506.61"
              height="294.94"
              className="w-full rounded-[11.498px] xl:rounded-[21.558px]"
              src={aiStudioImage5}
            />
            <div className="flex w-full flex-col items-center justify-center gap-[2px] pt-10 xl:gap-[10.78px] xl:pt-[76px]">
              <h1 className="font-zarid-bold text-[15.926px] font-bold leading-[19px] text-[#12141D] md:text-[17px] md:leading-[21px] xl:text-[32.07px] xl:leading-[39px]">
                Choose your model
              </h1>
              <p className="undefined text-center text-[15px] font-normal leading-normal text-[#12141D] md:text-[17px] xl:text-[32px]">
                With a lot of LLM models out there, choose the one you want for
                better accuracy. Currently we support only OpenAI's GPT.
              </p>
            </div>
          </div>
          <div className="xxl:min-h-[538.072px] flex min-h-[auto] w-full flex-col items-start gap-[0.001px] overflow-hidden rounded-[11px] bg-[#FBF8FF] px-5 py-5 shadow-md md:px-10 md:py-[52px] md:shadow-[none] xl:rounded-[21.558px] xl:px-[76px] xl:py-[98px]">
            <Image
              alt="Building Card Flow Image"
              width="506.61"
              height="294.94"
              className="w-full rounded-[11.498px] xl:rounded-[21.558px]"
              src={aiStudioImage6}
            />
            <div className="flex w-full flex-col items-center justify-center gap-[2px] pt-10 xl:gap-[10.78px] xl:pt-[76px]">
              <h1 className="font-zarid-bold text-[15.926px] font-bold leading-[19px] text-[#12141D] md:text-[17px] md:leading-[21px] xl:text-[32.07px] xl:leading-[39px]">
                Give custom instructions
              </h1>
              <p className="undefined text-center text-[15px] font-normal leading-normal text-[#12141D] md:text-[17px] xl:text-[32px]">
                Get answers to questions in a way that you want by sending
                custom instructions to the GPT model.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[42px] grid w-full grid-cols-1 gap-[23px] pb-[42px] sm:grid-cols-3 md:mt-[55px] md:pb-[110px] xl:mt-[24px] xl:gap-10">
          {/*  */}
          {aiStudioCustomizeItems.map((item) => (
            <div
              key={item.id}
              className="xxl:min-h-[538.072px] flex min-h-[auto] w-full flex-col items-start gap-[0.001px] overflow-hidden rounded-[11px] bg-[#FBF8FF] px-5 py-5 shadow-md md:px-10 md:py-[52px] md:shadow-[none] xl:rounded-[21.558px] xl:px-[76px] xl:py-[98px]"
            >
              <Image
                alt="Building Card Flow Image"
                width="506.61"
                height="294.94"
                className="w-full rounded-[11.498px] xl:rounded-[21.558px]"
                src={item.image}
              />
              <div className="flex w-full flex-col items-center justify-center gap-[2px] pt-10 xl:gap-[10.78px] xl:pt-[76px]">
                <h1 className="font-zarid-bold text-[15.926px] font-bold leading-[19px] text-[#12141D] md:text-[17px] md:leading-[21px] xl:text-[32.07px] xl:leading-[39px]">
                  {item.title}
                </h1>
                <p className="xxl:!text-[32px] text-start text-[15px] font-normal leading-normal text-[#12141D] md:text-center md:text-[17px] lg:!text-center xl:!text-start xl:!text-[25px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
