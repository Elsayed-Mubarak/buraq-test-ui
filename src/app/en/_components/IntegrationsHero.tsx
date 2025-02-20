import Image from "next/image";
import heroImage from "../../../public/integrations/integration-Header-image.svg";
type Props = {};

export default function IntegrationsHero({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="overflow-hidden pt-[10px] xl:pt-[69px]">
        <div className="flex h-auto w-full flex-col items-center justify-between bg-[#E9E9FD] px-5 md:h-[568px] md:flex-row md:px-0 md:pl-[77px] xl:h-[925px] xl:px-[100px] xl:pl-[146px]">
          <div className="flex h-full w-full flex-col items-center justify-center pt-[88px] md:w-2/4 md:items-start md:pt-0">
            <h3 className="font-zarid-bold md:font-zarid-serif max-w-[335px] text-center text-[28px] font-bold leading-[30px] text-[#12141D] md:mb-[11px] md:text-start md:text-[48px] md:font-semibold md:leading-[55.188px] xl:max-w-[720px] xl:text-start xl:text-[86px] xl:leading-[103.478px] xl:tracking-[-1.725px]">
              Supercharge your workflow with integrations
            </h3>
            <p className="mt-2 max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:max-w-[326.67px] md:text-start md:text-[18px] xl:mt-[29px] xl:max-w-[612px] xl:text-start xl:text-[32px] xl:font-normal xl:leading-[47px] xl:text-[#1A1A1A]">
              Buraq fits into your existing system, integrating seamlessly with
              the tools that you are already using.
            </p>
            <div className="mt-[39px] flex w-full justify-center gap-5 md:mt-[34px] md:justify-start xl:mt-[65px]"></div>
          </div>
          <div className="mt-[76px] flex h-full w-full items-center justify-center md:mt-0 md:w-2/4 md:pr-[76px] xl:p-0">
            <Image
              alt="hero_img"
              width="702"
              height="1283"
              className="h-full w-full pb-[48px] md:pb-0"
              src={heroImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
