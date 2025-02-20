import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";
import heroImage from "../../../public/feature5HeroImg.svg";
import Image from "next/image";
import UseCases from "../_components/UseCases";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="m-auto max-w-[2050px]">
        <div className="overflow-hidden pt-[10px] xl:pt-[69px]">
          <div className="flex h-auto w-full flex-col items-center justify-between bg-transparent px-5 md:h-[568px] md:flex-row md:bg-white md:px-0 md:pl-[77px] xl:h-[925px] xl:pl-[146px]">
            <div className="flex h-full w-full flex-col items-center justify-center pt-[88px] md:w-2/4 md:items-start md:pt-0">
              <h3 className="font-zarid-bold md:font-zarid-serif text-center text-[28px] font-bold leading-[30px] text-[#12141D] md:mb-[11px] md:text-start md:text-[48px] md:font-semibold md:leading-[55.188px] xl:text-start xl:text-[86px] xl:leading-[103.478px] xl:tracking-[-1.725px]">
                Increase sales by reaching more people through offers and
                promotions
              </h3>
              <p className="mt-2 text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:text-start md:text-[18px] xl:mt-[29px] xl:text-start xl:text-[32px] xl:font-normal xl:leading-[47px] xl:text-[#1A1A1A]"></p>
              <div className="mt-[39px] flex w-full justify-center gap-5 md:mt-[34px] md:justify-start xl:mt-[65px]">
                <div className="w-[133px] md:w-[132.134px] xl:w-[146px]">
                  <button className="flex h-[48px] w-full items-center justify-center rounded-[100px] bg-[#353EE7] font-semibold leading-5 text-white md:h-[54.302px] md:text-[20.363px] xl:h-[60px] xl:text-[18px]">
                    <span
                      dir="ltr"
                      className="flex flex-row items-center gap-x-[6px]"
                    >
                      Get try
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[60px] flex h-full w-screen items-center justify-center md:mt-0 md:w-2/4">
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
        <div className="mt-[88px] w-full px-5 md:px-10 xl:mt-[125px] xl:px-[146px]">
          <p className="mx-auto max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:max-w-[569px] md:text-[16px] md:leading-[25px] md:text-[#141414] xl:max-w-[1346px] xl:text-[34px] xl:leading-[57px]">
            Create instant success for your outbound promotional campaign with
            our WhatsApp chatbot. It arrives to thousands of customers
            simultaneously via their favorite channel, WhatsApp. It increases
            brand awareness, offers discounts, introduces new products, and
            performs many other external marketing activities. Use multimedia
            elements like photos, videos, and GIFs to enhance the impact of the
            message. Include calls to action to stimulate conversion by
            redirecting recipients to your website.
          </p>
        </div>
        <UseCases title="Use cases" />
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
