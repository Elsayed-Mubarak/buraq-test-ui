import Image from "next/image";
import IntroductionCard1 from "../../../public/introductionCard1.svg";
import IntroductionCard2 from "../../../public/introductionCard2.svg";
import IntroductionCard3 from "../../../public/introductionCard3.svg";

type Props = {};

export default function ChatBot({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[118px] flex w-full flex-col items-center px-5 md:px-10 xl:mt-[165px] 2xl:px-20">
        <h3 className="font-zarid-bold xl:font-zarid-serif mb-[52px] text-center text-[28px] font-bold leading-normal xl:text-[56px] xl:font-semibold xl:leading-[100px]">
          You are NOT alone
        </h3>
        <div className="flex flex-col items-center gap-[18px] xl:gap-12">
          <div>
            <h3 className="hidden text-center text-[56px] font-semibold leading-[100px] text-[#12141D] xl:block">
              Introducing
            </h3>
            <h3 className="font-zarid-bold text-center text-[28px] font-bold leading-[22px] text-[#12141D] xl:text-[80px] xl:leading-[86px]">
              Buraq Al chatbot
            </h3>
          </div>
          <p className="max-w-[1415px] text-center text-[20px] font-medium leading-[22px] text-[#777] xl:font-normal xl:leading-[20px] xl:text-[#3D4152]">
            Everything you need to automate the whole customer journey (From
            customer service to completing the purchase process) in ONE place!
          </p>
          <p className="max-w-[1415px] text-center text-[20px] font-medium leading-[22px] text-[#777] xl:font-normal xl:leading-[20px] xl:text-[#3D4152]">
            By building a chatbot customized for your project Without Codes!
          </p>
          <p className="max-w-[1415px] text-center text-[20px] font-medium leading-[22px] text-[#777] xl:font-normal xl:leading-[20px] xl:text-[#3D4152]">
            Buraq AI Chatbot offers three bots in one platform to guide
            customers from initial interaction to completing purchases. It
            handles queries, FAQs, retargeting, and checkout.
          </p>
          <div className="mt-[66px] grid w-full grid-cols-1 gap-[13px] md:grid-cols-2 xl:mt-0 xl:grid-cols-3 xl:gap-[23px]">
            <div className="flex min-h-[547px] w-full flex-col justify-between gap-4 rounded-[24px] border border-[#92A3BA] p-[17px] xl:min-h-[935px] xl:p-[30px]">
              <div>
                <h3 className="font-zarid-bold text-[51px] font-black leading-normal text-[#343DE6] xl:text-[88px]">
                  01
                </h3>
                <p className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] xl:text-[46px] xl:leading-[47px]">
                  AI agent
                </p>
                <p className="mt-[7px] text-[20px] font-normal leading-normal text-[#3D4152] xl:mt-[13px] xl:text-[32px] xl:leading-[46px]">
                  - To answer more than 70% of queries. - Transfer chats
                  directly to the human in cases of complex questions. -
                  Automatically book appointments without human agents.
                </p>
              </div>
              <div className="flex w-full justify-center">
                <Image
                  src={IntroductionCard1}
                  className="h-[177px] w-[101px] xl:h-[302] xl:w-[172px]"
                  height={302}
                  width={172}
                  alt=""
                />
              </div>
            </div>
            <div className="flex min-h-[547px] w-full flex-col justify-between gap-4 rounded-[24px] border border-[#92A3BA] p-[17px] xl:min-h-[935px] xl:p-[30px]">
              <div>
                <h3 className="font-zarid-bold text-[51px] font-black leading-normal text-[#343DE6] xl:text-[88px]">
                  02
                </h3>
                <p className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] xl:text-[46px] xl:leading-[47px]">
                  Marketing automation
                </p>
                <p className="mt-[7px] text-[20px] font-normal leading-normal text-[#3D4152] xl:mt-[13px] xl:text-[32px] xl:leading-[46px]">
                  - To answer more than 70% of queries. - Transfer chats
                  directly to the human in cases of complex questions. -
                  Automatically book appointments without human agents.
                </p>
              </div>
              <div className="flex w-full justify-center">
                <Image
                  src={IntroductionCard2}
                  className="h-[177px] w-[101px] xl:h-[302] xl:w-[172px]"
                  height={302}
                  width={172}
                  alt=""
                />
              </div>
            </div>
            <div className="flex min-h-[547px] w-full flex-col justify-between gap-4 rounded-[24px] border border-[#92A3BA] p-[17px] xl:min-h-[935px] xl:p-[30px]">
              <div>
                <h3 className="font-zarid-bold text-[51px] font-black leading-normal text-[#343DE6] xl:text-[88px]">
                  03
                </h3>
                <p className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] xl:text-[46px] xl:leading-[47px]">
                  Sales bot
                </p>
                <p className="mt-[7px] text-[20px] font-normal leading-normal text-[#3D4152] xl:mt-[13px] xl:text-[32px] xl:leading-[46px]">
                  - To answer more than 70% of queries. - Transfer chats
                  directly to the human in cases of complex questions. -
                  Automatically book appointments without human agents.
                </p>
              </div>
              <div className="flex w-full justify-center">
                <Image
                  src={IntroductionCard3}
                  className="h-[129px] w-[287px] xl:h-[222] xl:w-[491px]"
                  height={302}
                  width={172}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
