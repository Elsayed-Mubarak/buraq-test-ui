import Image from "next/image";
import heroImage from "../../../public/featureHeaderHeroImage.svg";

type Props = {};

export default function WhatsAppChatBotHero({}: Props) {
  return (
    <div className="overflow-hidden pt-[10px] xl:pt-[69px]">
      <div className="flex h-auto w-full flex-col items-center justify-between bg-[#E9E9FD] px-5 md:h-[568px] md:flex-row md:px-0 md:pl-[77px] xl:h-[925px] xl:pl-[146px]">
        <div className="flex h-full w-full flex-col items-center justify-center pt-[88px] md:w-2/4 md:items-start md:pt-0">
          <h3 className="font-zarid-bold md:font-zarid-serif max-w-[335px] text-center text-[28px] font-bold leading-[30px] text-[#12141D] md:mb-[11px] md:max-w-[363.406px] md:text-start md:text-[48px] md:font-semibold md:leading-[55.188px] xl:max-w-[581.387px] xl:text-start xl:text-[86px] xl:leading-[103.478px] xl:tracking-[-1.725px]">
            Build a WhatsApp Chatbot in minutes
          </h3>
          <p className="mt-2 max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:max-w-[363.406px] md:text-start md:text-[18px] xl:mt-[29px] xl:max-w-[766.439px] xl:text-start xl:text-[32px] xl:font-normal xl:leading-[47px] xl:text-[#1A1A1A]">
            Scale your business interactions on WhatsApp with ease, using our
            no-code WhatsApp Chatbot builder.
          </p>
          <div className="mt-[39px] flex w-full justify-center gap-5 md:mt-[34px] md:justify-start xl:mt-[65px]">
            <div className="w-[133px] md:w-[132.134px] xl:w-[146px]">
              <button className="flex h-[48px] w-full items-center justify-center rounded-[100px] bg-[#353EE7] font-semibold leading-5 text-white md:h-[54.302px] md:text-[20.363px] xl:h-[60px] xl:text-[18px]">
                <span className="flex flex-row items-center gap-x-[6px]">
                  Try Free
                </span>
              </button>
            </div>
            <div className="w-[133px] md:w-[132.134px] xl:w-[146px]">
              <button className="flex h-[48px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent font-semibold leading-5 text-[#12141D] md:h-[54.302px] md:text-[20.363px] xl:h-[60px] xl:text-[18px]">
                <span className="flex flex-row items-center gap-x-[6px]">
                  Request a trial
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[30px] flex h-[97%] w-screen items-center justify-center md:w-2/4 xl:mt-[22px]">
          <Image
            alt="hero_img"
            width="702"
            height="1283"
            className="h-full w-full"
            src={heroImage}
          />
        </div>
      </div>
    </div>
  );
}
