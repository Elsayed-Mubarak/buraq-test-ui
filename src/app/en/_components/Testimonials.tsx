"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import vector1 from "../../../public/_formVector1.svg";
import vector2 from "../../../public/_formVector2.svg";
import vector3 from "../../../public/_formVector3.svg";
import Image from "next/image";

type Props = {};

export default function Testimonials({}: Props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[85px] flex w-full flex-col items-center justify-center overflow-hidden px-5 md:px-10 xl:mt-[229px] 2xl:px-20">
        <h3 className="font-zarid-bold md:font-zarid-serif text-center text-[28px] font-bold leading-normal text-[#12141D] md:font-semibold xl:text-[56px] xl:leading-[100px]">
          Does This Sound Like You
        </h3>
        <div className="mt-[22px] w-full">
          <Slider {...settings}>
            <div className="voiceCardShadow relative flex h-[128px] w-full flex-col items-center justify-center overflow-hidden rounded-[8px] px-5 xl:h-[324px]">
              <h3 className="absolute left-5 top-[64%] text-[63px] font-semibold text-[#343DE6] opacity-40 xl:left-[50px] xl:top-[-150px] xl:text-[459px]">
                “
              </h3>
              <p
                dir="ltr"
                className="text-[15px] font-semibold leading-[15px] text-[#333955] xl:text-[40px] xl:leading-[40px]"
              >
                “I need a way to book appointments automatically with my clients
                by showing specific templates”.
              </p>
              <div className="absolute bottom-0 right-[54px] flex gap-[19px] opacity-40 xl:gap-[49px]">
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector1}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector2}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector3}
                />
              </div>
            </div>
            <div className="voiceCardShadow relative flex h-[128px] w-full flex-col items-center justify-center overflow-hidden rounded-[8px] px-5 xl:h-[324px]">
              <h3 className="absolute left-5 top-[64%] text-[63px] font-semibold text-[#343DE6] opacity-40 xl:left-[50px] xl:top-[-150px] xl:text-[459px]">
                “
              </h3>
              <p
                dir="ltr"
                className="text-[15px] font-semibold leading-[15px] text-[#333955] xl:text-[40px] xl:leading-[40px]"
              >
                “I need a way to book appointments automatically with my clients
                by showing specific templates”.
              </p>
              <div className="absolute bottom-0 right-[54px] flex gap-[19px] opacity-40 xl:gap-[49px]">
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector1}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector2}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector3}
                />
              </div>
            </div>
            <div className="voiceCardShadow relative flex h-[128px] w-full flex-col items-center justify-center overflow-hidden rounded-[8px] px-5 xl:h-[324px]">
              <h3 className="absolute left-5 top-[64%] text-[63px] font-semibold text-[#343DE6] opacity-40 xl:left-[50px] xl:top-[-150px] xl:text-[459px]">
                “
              </h3>
              <p
                dir="ltr"
                className="text-[15px] font-semibold leading-[15px] text-[#333955] xl:text-[40px] xl:leading-[40px]"
              >
                “I need a way to book appointments automatically with my clients
                by showing specific templates”.
              </p>
              <div className="absolute bottom-0 right-[54px] flex gap-[19px] opacity-40 xl:gap-[49px]">
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector1}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector2}
                />
                <Image
                  alt="vector"
                  width="58"
                  height="58"
                  data-nimg="1"
                  className="h-[23px] w-[23px] xl:h-[58px] xl:w-[58px]"
                  src={vector3}
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
