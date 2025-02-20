import Image from "next/image";
import websiteLogo from "../../../public/websiteLogo.svg";
import buraqWatreMark1 from "../../../public/chatbotWaterMark1.svg";
import buraqWatreMark2 from "../../../public/chatbotWatermark4Rotate.svg";
import MainButton from "./MainButton";
type Props = {};

export default function Poster({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[112px] w-full px-5 md:px-10 xl:mt-[206px] 2xl:px-20">
        <div className="relative flex h-auto min-h-[290px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-none border-[#000] bg-[#e9e9fd] md:min-h-[307px] xl:min-h-[571px] xl:rounded-[16px] xl:border">
          <Image
            src={websiteLogo}
            height={46}
            width={236}
            className="h-[36px] w-[95px] md:h-[29px] md:w-[133px] xl:h-[54px] xl:w-[236px]"
            alt="logo"
          />
          <p className="font-zarid-bold text-center text-[16px] font-bold leading-[normal] tracking-[-0.403px] text-[#141414] md:text-[25.814px] xl:mt-[30px] xl:text-[70px] xl:tracking-[-2px]">
            Start building your own chatbot now
          </p>
          <div className="relative z-[5] mb-[10px] mt-4 flex items-center gap-2 xl:mt-20 xl:gap-4">
            <div className="relative flex flex-col items-center">
              <MainButton href="/signup" type="primary">
                Get started free
              </MainButton>
              <p className="absolute bottom-[-10px] mt-2 whitespace-nowrap text-[14px] font-medium italic leading-[4px] text-[#353EE7] md:bottom-[-22px] md:mt-[19.5px] md:text-[11.831px] md:leading-[10.756px] xl:bottom-[-37px] xl:mt-[19px] xl:text-[22px] xl:leading-5">
                No credit card required
              </p>
            </div>
            <MainButton
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2XVpqFk8H3HOBQpZWn0a5uhJVmvXpkRgZpGhnu4wep9XuBNiZsxpSzyaM2ygaUwb5ntnu-3k7k"
              type="secondary"
            >
              Get a demo
            </MainButton>
          </div>
          <div className="absolute bottom-0 z-0 mb-[-10px] flex w-full justify-between md:mb-0">
            <Image
              src={buraqWatreMark1}
              width={565}
              height={446}
              className="xxxl:w-auto xxxl:mb-0 mb-[-20px] h-auto w-[100px] md:mb-[-80px] md:w-[210px] xl:w-[255px] 2xl:w-[300px]"
              alt="buraq watre nark "
            />
            <Image
              src={buraqWatreMark2}
              width={565}
              height={446}
              className="xxxl:w-auto xxxl:mb-0 mb-[-20px] h-auto w-[100px] md:mb-[-80px] md:w-[210px] xl:w-[255px] 2xl:w-[300px]"
              alt="buraq watre nark "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
