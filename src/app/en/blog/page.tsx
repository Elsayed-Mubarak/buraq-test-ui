import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="xlg:px-20 m-auto max-w-[2050px] px-5 pt-[50px] md:px-10 md:pt-[69px] xl:bg-[#FAFBFC] xl:pt-[140px]">
        <div className="mb-[25px] flex items-center justify-center pb-6 md:bg-none xl:pb-[85.33px]">
          <div className="mt-8 flex w-full flex-col items-center justify-center md:mt-[72px] xl:mt-[136px]">
            <h3 className="text-[24px] font-bold leading-[28.8px] tracking-normal text-[#12141D] md:text-[44px] md:font-semibold md:leading-[55.19px] md:tracking-[-0.92px] xl:text-[85.33px] xl:!font-bold xl:leading-[102.4px] xl:tracking-normal">
              Our Blog
            </h3>
            <p className="mt-[8px] text-sm font-normal leading-[9.29px] text-[#12141D] md:mt-[17px] md:text-base md:leading-[25.29px] xl:mt-8 xl:text-[32px] xl:leading-[47.43px]">
              Discover Buraq's Latest Blogs on AI Customer Support
            </p>
            <div className="mt-[17.07px] flex w-full items-center justify-center xl:mt-16">
              <div className="flex w-full items-center justify-center gap-5 rounded-[8px] border-[0.54px] border-[#12141d]/[0.08] bg-white p-[4.33px] md:max-h-[69.33px] md:w-[797px] md:border-[1.33px] md:p-[10.67px] xl:max-h-[75.67px] xl:w-[815px] xl:p-[10.67px]">
                <div className="flex h-[22.5px] flex-1 items-center gap-[3.25px] self-stretch rounded-full border-[0.41px] border-gray-300 bg-[#F3F5FF] px-[4.87px] py-[6.5px] md:h-auto md:gap-1 md:border md:border-solid md:px-4 md:py-3">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <input
                    className="mt-[3px] w-full border-none bg-transparent text-[10px] leading-[9.75px] outline-none focus:ring-0 md:text-base md:leading-[24px] xl:text-xl"
                    type="search"
                    placeholder="Search"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="xxl:text-[22px] xxl:min-w-[135px] xxl:leading-[33px] min-w-[70px] text-[10px] leading-[15px] md:text-base">
                    <div className="flex items-center gap-2">
                      <div className="text-[#12141D]">Category</div>
                      <div>
                        <ChevronDownIcon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid w-full grid-cols-1 gap-y-[30px] md:grid-cols-3 md:gap-x-[21.84px] md:gap-y-[42.68px] xl:gap-x-[42.67px] xl:gap-y-[85.33px]"></div>
          <div className="flex max-w-[501.33px] justify-center gap-[12px] py-[28px] md:gap-[21.33px] md:py-[106px]">
            <button className="flex h-[31.33px] w-[31.33px] items-center justify-center rounded-full border border-[#1111111A] md:h-[36.67px] md:w-[36.67px] xl:h-[53.33px] xl:w-[53.33px]">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button className="flex h-[31.33px] w-[31.33px] items-center justify-center rounded-full border border-[#1111111A] md:h-[36.67px] md:w-[36.67px] xl:h-[53.33px] xl:w-[53.33px]">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
