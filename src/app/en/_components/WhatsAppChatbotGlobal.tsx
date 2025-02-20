import Image from "next/image";
import whatsappGlobalImage from "../../../public/mapImage.svg";
type Props = {};

export default function WhatsAppChatbotGlobal({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="undefined mt-[56px] flex w-full flex-col gap-[25px] px-5 md:mt-[63px] md:px-10 xl:mt-[201px] 2xl:px-20">
        <h3 className="mx-auto max-w-[335px] text-center text-[28px] font-semibold italic leading-[22px] text-[#12141D] md:max-w-[509.514px] md:text-[55.036px] md:leading-[66.043px] md:text-[#141414] xl:max-w-[1265.439px] xl:text-[86.232px] xl:leading-[103.478px]">
          WhatsApp chatbots elevate business conversations to 2.8B users
        </h3>
        <p className="mx-auto max-w-[335px] text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:max-w-[583.935px] md:text-[18.919px] md:font-normal md:leading-[30.27px] md:text-[#141414] xl:max-w-[593px] xl:text-[24px] xl:leading-[47.427px] xl:text-[#141414]">
          WhatsApp chatbots offer versatile solutions for businesses, like
          customers ,support, appointment scheduling, order management, lead
          generation,and more — helping cater to an audience of 2.8 billion
          users.
        </p>
      </div>
      <div className="mb-[111px] mt-[35px] flex w-full justify-center gap-[76px] px-5 md:mb-[88px] md:mt-[31px] md:px-10 xl:mb-[204px] xl:mt-[123px] xl:px-10">
        <Image
          alt="image"
          width="50"
          height="50"
          className="h-auto w-[334px] rounded-[8.848px] md:w-[894.406px] md:rounded-[43.116px] xl:w-[1627.621px] xl:rounded-[43.116px]"
          src={whatsappGlobalImage}
        />
      </div>
    </div>
  );
}
