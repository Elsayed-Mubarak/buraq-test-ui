"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import companies_image_1 from "../../../public/companies_images/companies_image_1.jpg";
import companies_image_2 from "../../../public/companies_images/companies_image_2.webp";
import companies_image_3 from "../../../public/companies_images/companies_image_3.webp";
import companies_image_4 from "../../../public/companies_images/companies_image_4.svg";
import companies_image_5 from "../../../public/companies_images/companies_image_5.svg";
import companies_image_6 from "../../../public/companies_images/companies_image_6.svg";
import companies_image_7 from "../../../public/companies_images/companies_image_7.webp";
import companies_image_8 from "../../../public/companies_images/companies_image_8.webp";
import companies_image_9 from "../../../public/companies_images/companies_image_9.webp";
import companies_image_10 from "../../../public/companies_images/companies_image_10.webp";
import companies_image_11 from "../../../public/companies_images/companies_image_11.webp";
import Image from "next/image";

type Props = {};

export default function TrustedBy({}: Props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const campaniesImages = [
    companies_image_1,
    companies_image_2,
    companies_image_3,
    companies_image_4,
    companies_image_5,
    companies_image_6,
    companies_image_7,
    companies_image_8,
    companies_image_9,
    companies_image_10,
    companies_image_11,
  ];

  return (
    <div className="mt-[84px] flex w-full flex-col items-center justify-center gap-[34px] xl:mt-[147px] xl:gap-9">
      <h3 className="font-zarid-bold px-5 text-center text-[28px] font-bold leading-[22px] text-[#12141D] md:px-10 md:text-[29px] md:font-semibold md:leading-[53px] xl:text-[56px] 2xl:px-20">
        We work with well-known companies
      </h3>
      <Slider
        className="flex w-screen items-center justify-between gap-[39px] overflow-hidden xl:gap-[111px]"
        {...settings}
      >
        {campaniesImages.map((img, index) => (
          <div key={index}>
            <Image
              src={img}
              height={150}
              width={150}
              alt="campany image"
              className="inline-block max-h-[150px] max-w-[150px] cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
