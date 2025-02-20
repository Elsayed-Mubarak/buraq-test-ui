"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import highNote from "../../../public/_highNote.svg";
import search from "../../../public/_search.svg";
import integrationImage1 from "../../../public/integrations/_analytics.svg";
import integrationImage2 from "../../../public/integrations/_calendly1.svg";
import integrationImage3 from "../../../public/integrations/_chatGPT.svg";
import integrationImage4 from "../../../public/integrations/_dialogflow.svg";
import integrationImage5 from "../../../public/integrations/_googleSheet.svg";
import integrationImage6 from "../../../public/integrations/_hubspot.svg";
import integrationImage7 from "../../../public/integrations/_slack.svg";

type Props = {};

export default function Integrations({}: Props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const integrationsImages = [
    integrationImage1,
    integrationImage2,
    integrationImage3,
    integrationImage4,
    integrationImage5,
    integrationImage6,
    integrationImage7,
  ];
  return (
    <div className="mt-[87px] flex w-full flex-col items-center justify-center md:mt-[300px]">
      <div className="m-auto max-w-[2050px] px-5 md:px-10 2xl:px-20">
        <div className="max-w-[1415px]">
          <p className="font-zarid-bold text-center text-[28px] font-bold leading-[22px] text-[#12141D] md:text-[42.711px] md:leading-[46.242px] xl:text-[80px] xl:leading-[86.613px]">
            Integrations
          </p>
          <h3 className="mt-2 text-center text-[18px] font-medium leading-[22px] text-[#3D4152] md:mt-[18px] md:text-[21.356px] md:font-normal md:leading-[21.071px] xl:mt-9 xl:text-[40px] xl:font-normal xl:leading-[40px]">
            Connect the Buraq chatbot with any application or system in just a
            few minutes through:
          </h3>
        </div>
      </div>
      <Slider
        className="mt-[31px] flex w-screen items-center overflow-hidden md:mt-[108px] xl:mt-[206px]"
        {...settings}
      >
        {integrationsImages.map((img, index) => (
          <div key={index}>
            <Image
              alt="hubSpot"
              width="172"
              height="172"
              className="max-h-[47.175px] min-h-[47.175px] min-w-[47.175px] max-w-[47.175px] xl:max-h-[172px] xl:min-h-[172px] xl:min-w-[172px] xl:max-w-[172px]"
              src={img}
            />
          </div>
        ))}
      </Slider>
      <div className="m-auto w-full max-w-[2050px] px-5 md:px-10 2xl:px-20">
        <div className="mx-auto mt-[29px] w-[179px] md:w-[156px] xl:mt-[54px] xl:w-[292px]">
          <button className="flex h-[49px] w-full items-center justify-center rounded-[100px] border border-[#12141D] bg-transparent text-[12px] font-semibold leading-5 text-[#12141D] md:h-[38px] md:text-[10px] xl:h-[72px] xl:text-[20px]">
            <span dir="ltr" className="flex flex-row items-center gap-x-[6px]">
              Explore Integrations
              <ChevronRightIcon className="h-5 w-5" />
            </span>
          </button>
        </div>
        <div className="mt-[50px] flex w-full flex-col items-start md:items-center xl:mt-[56px]">
          <div className="max-w-[852px]">
            <div dir="ltr" className="flex h-auto w-full">
              <h3 className="font-zarid-extra-bold min-w-[52px] text-[34px] font-black leading-[100%] text-[#343DE6] md:min-w-[73px] md:text-[46px] xl:min-w-[138px] xl:text-[88px]">
                01
              </h3>
              <div>
                <h3 className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] md:text-[24.559px] xl:text-[46px]">
                  App Integration
                </h3>
                <p className="text-[16px] font-normal text-[#3D4152] md:text-[17.084px] xl:text-[32px]">
                  Choose from a wide range of apps in our store
                </p>
              </div>
            </div>
          </div>
          <div
            dir="ltr"
            className="mt-3 grid w-full grid-cols-1 gap-[18px] md:grid-cols-2 xl:mt-[86px] xl:gap-8"
          >
            <div dir="ltr" className="flex h-auto w-full">
              <h3 className="font-zarid-extra-bold min-w-[52px] text-[34px] font-black leading-[100%] text-[#343DE6] md:min-w-[73px] md:text-[46px] xl:min-w-[138px] xl:text-[88px]">
                02
              </h3>
              <div>
                <h3 className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] md:text-[24.559px] xl:text-[46px]">
                  HTTP request
                </h3>
                <p className="text-[16px] font-normal text-[#3D4152] md:text-[17.084px] xl:text-[32px]">
                  Send an HTTP request to your business applications to send
                  information.
                </p>
              </div>
            </div>
            <div dir="ltr" className="flex h-auto w-full">
              <h3 className="font-zarid-extra-bold min-w-[52px] text-[34px] font-black leading-[100%] text-[#343DE6] md:min-w-[73px] md:text-[46px] xl:min-w-[138px] xl:text-[88px]">
                03
              </h3>
              <div>
                <h3 className="font-zarid-bold text-[24px] font-bold leading-normal text-[#12141D] md:text-[24.559px] xl:text-[46px]">
                  Custom integrations
                </h3>
                <p className="text-[16px] font-normal text-[#3D4152] md:text-[17.084px] xl:text-[32px]">
                  Link any app from the market effortlessly and seamlessly with
                  the Buraq Al chatbot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto w-full max-w-[2050px] px-0 md:px-10 2xl:px-20">
        <div className="min-h-auto mx-auto mt-[157px] flex w-screen max-w-[1810px] flex-col-reverse items-center justify-center gap-2 rounded-none bg-[#E9E9FD] p-[30px] md:w-full md:flex-col md:gap-[19px] md:rounded-[12px] xl:mt-[186px] xl:min-h-[484px] xl:items-start xl:rounded-[6px] xl:p-[61px]">
          <h3 className="w-full max-w-[1490px] text-center text-[25px] font-semibold leading-[26px] xl:text-start xl:text-[56px] xl:leading-[57px]">
            Easily integrate Buraq with any API using our dynamic integration
            feature.Get started in minutes with our hassle-free installation
            process, no technical knowledge is required. Learn more.
          </h3>
          <div className="flex w-full justify-center gap-5 md:justify-end">
            <Image
              alt="hightNoe"
              width="182"
              height="182"
              className="w-[38px] md:w-[100px] 2xl:w-[182px]"
              src={highNote}
            />
            <Image
              alt="hightNoe"
              width="182"
              height="182"
              className="w-[38px] md:w-[100px] 2xl:w-[182px]"
              src={search}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
