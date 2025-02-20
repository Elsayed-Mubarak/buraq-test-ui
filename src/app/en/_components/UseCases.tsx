import Image from "next/image";
import useCaseImage from "../../../public/useCaseImage1.svg";
type Props = { title: string };

export default function UseCases({ title }: Props) {
  return (
    <div className="m-auto max-w-[2050px] overflow-hidden">
      <div className="mt-[56px] flex w-full flex-col gap-[25px] px-5 md:mt-[63px] md:px-10 xl:mt-[201px] 2xl:px-20">
        <h3 className="mx-auto max-w-[335px] text-center text-[28px] font-semibold leading-[47px] text-[#12141D] md:max-w-[509.514px] md:text-[56px] md:leading-[53px] xl:max-w-[1085.021px] xl:leading-[100.397px]">
          {title}
        </h3>
      </div>
      <div className="mt-[35px] flex w-full justify-center gap-[76px] px-10 md:mt-[51px]">
        <div className="xxsm:max-w-[239px] xsm:max-w-[505px] flex h-auto w-full max-w-full flex-col gap-[11px] rounded-[16px] bg-[#E9E9FD] px-4 py-4 md:px-[18px] md:py-[28px] xl:px-8 xl:py-12">
          <Image
            src={useCaseImage}
            height={916}
            width={242}
            className="h-full w-full"
            alt=""
          />
          <h3 className="font-zarid-bold text-[14px] font-bold leading-normal text-[#12141D] md:text-[28px]">
            AI chatbots
          </h3>
          <p className="h-[42px] overflow-hidden text-start text-[14px] font-normal leading-normal text-[#12141D] md:h-[90px] xl:text-[28px]">
            <span className="line-clamp-2">
              Personal and helpful responses trained by AI.
            </span>
          </p>
        </div>
        <div className="xxsm:max-w-[239px] xsm:max-w-[505px] flex h-auto w-full max-w-full flex-col gap-[11px] rounded-[16px] bg-[#E9E9FD] px-4 py-4 md:px-[18px] md:py-[28px] xl:px-8 xl:py-12">
          <Image
            src={useCaseImage}
            height={916}
            width={242}
            className="h-full w-full"
            alt=""
          />
          <h3 className="font-zarid-bold text-[14px] font-bold leading-normal text-[#12141D] md:text-[28px]">
            Marketing automation
          </h3>
          <p className="h-[42px] overflow-hidden text-start text-[14px] font-normal leading-normal text-[#12141D] md:h-[90px] xl:text-[28px]">
            <span className="line-clamp-2">
              Send exclusive discounts to your existing customers.
            </span>
          </p>
        </div>
        <div className="xxsm:max-w-[239px] xsm:max-w-[505px] flex h-auto w-full max-w-full flex-col gap-[11px] rounded-[16px] bg-[#E9E9FD] px-4 py-4 md:px-[18px] md:py-[28px] xl:px-8 xl:py-12">
          <Image
            src={useCaseImage}
            height={916}
            width={242}
            className="h-full w-full"
            alt=""
          />
          <h3 className="font-zarid-bold text-[14px] font-bold leading-normal text-[#12141D] md:text-[28px]">
            Sales bot
          </h3>
          <p className="h-[42px] overflow-hidden text-start text-[14px] font-normal leading-normal text-[#12141D] md:h-[90px] xl:text-[28px]">
            <span className="line-clamp-2">Automate appointment booking</span>
          </p>
        </div>
      </div>
    </div>
  );
}
