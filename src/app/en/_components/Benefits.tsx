import Image from "next/image";
import benefitImage from "../../../public/benefits.jpg";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
type Props = {};

export default function Benefits({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[92px] grid w-full grid-cols-1 justify-items-center !gap-10 px-5 sm:grid-cols-2 md:px-10 xl:mt-[202px] 2xl:px-20">
        <div className="flex h-auto w-full max-w-[855px] flex-col items-center justify-center gap-[23px] rounded-[9px] bg-[#F3EBFF] p-[23px_15px] xl:h-[957px] xl:gap-[76px] xl:rounded-[30px] xl:p-[76px]">
          <Image
            src={benefitImage}
            alt="chatFrame"
            width="560"
            height="496"
            className="h-[150px] w-[169px] xl:h-[496px] xl:w-[560px]"
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-zarid-bold text-[14px] font-bold text-[#12141D] xl:text-[32px]">
              Easy to install
            </h3>
            <p className="mt-[10px] text-center text-[18px] font-normal md:text-[13px] xl:text-[32px]">
              You can get up and running in just minutes with our hassle-free
              installation process, no technicalities required.
            </p>
            <div className="mt-10 w-[144px] xl:w-[170px]">
              <button className="flex h-12 w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-semibold leading-5 text-[#12141D] md:h-[31px] xl:h-[60px] xl:text-[18px]">
                <span className="flex flex-row items-center gap-x-[6px]">
                  Load More
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full max-w-[855px] flex-col items-center justify-center gap-[23px] rounded-[9px] bg-[#e2f6ff] p-[23px_15px] xl:h-[957px] xl:gap-[76px] xl:rounded-[30px] xl:p-[76px]">
          <Image
            src={benefitImage}
            alt="chatFrame"
            width="560"
            height="496"
            className="h-[150px] w-[169px] xl:h-[496px] xl:w-[560px]"
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-zarid-bold text-[14px] font-bold text-[#12141D] xl:text-[32px]">
              Enterprise Security
            </h3>
            <p className="mt-[10px] text-center text-[18px] font-normal md:text-[13px] xl:text-[32px]">
              Your data is securely stored on our cloud servers with high
              encryption.
            </p>
            <div className="mt-10 w-[144px] xl:w-[170px]">
              <button className="flex h-12 w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-semibold leading-5 text-[#12141D] md:h-[31px] xl:h-[60px] xl:text-[18px]">
                <span className="flex flex-row items-center gap-x-[6px]">
                  Load More
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
