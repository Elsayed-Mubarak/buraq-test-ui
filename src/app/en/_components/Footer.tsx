import Image from "next/image";
import FooterImage from "../../../public/footerLogo.svg";
type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="mt-[140px] w-screen max-w-full bg-[#12141D]">
      <div className="wrapper mx-auto flex h-auto w-full flex-col justify-between bg-[#12141D] xl:h-[675px]">
        <div>
          <div className="flex w-full flex-col items-center justify-between gap-2 border-b border-b-[#575757] px-5 pb-8 pt-8 md:flex-row md:px-10 xl:pb-[34px] xl:pt-[64px] 2xl:px-20">
            <p className="text-[28px] font-semibold leading-normal text-[#EEEEEE] 2xl:text-[36px]">
              An artificial intelligence customer support team at your service.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-[117px] md:w-[63px] xl:w-[147px]">
                <a href="https://app.buraq.ai/">
                  <button className="flex h-12 w-full items-center justify-center rounded-[100px] border border-white bg-transparent text-[12px] font-semibold leading-5 text-white md:h-[31px] xl:h-[60px] xl:text-[18px]">
                    <span
                      dir="ltr"
                      className="flex flex-row items-center gap-x-[6px]"
                    >
                      log in
                    </span>
                  </button>
                </a>
              </div>
              <div className="w-[117px] md:w-[63px] xl:w-[147px]">
                <a href="https://calendar.app.google/cUySyQzqt8rKftiA8">
                  <button className="flex h-12 w-full items-center justify-center rounded-[100px] bg-[#353EE7] text-[12px] font-semibold leading-5 text-white md:h-[31px] xl:h-[60px] xl:text-[18px]">
                    <span
                      dir="ltr"
                      className="flex flex-row items-center gap-x-[6px]"
                    >
                      Demo
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between px-10 pt-[56px] md:flex-row xl:pt-[76px] 2xl:px-20">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="flex flex-row gap-4 md:flex-col">
                <Image
                  alt="footer-logo"
                  width={242}
                  height={54}
                  className="mb-[9px] h-[34px] w-[130px] cursor-pointer xl:h-[54px] xl:w-[200px]"
                  src={FooterImage}
                />

                <a
                  className="cursor-pointer text-[18px] font-normal leading-normal text-[#B1B1B1]"
                  href="https://www.linkedin.com/company/buraqsa"
                >
                  Linkedin
                </a>
                <a
                  className="cursor-pointer text-[18px] font-normal leading-normal text-[#B1B1B1]"
                  href="https://x.com/buraq_group"
                >
                  Twitter
                </a>
                <a
                  className="cursor-pointer text-[18px] font-normal leading-normal text-[#B1B1B1]"
                  href="https://www.instagram.com/buraqsa/"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="mr-0 mt-[47px] flex flex-wrap justify-between gap-x-20 text-center md:mt-0 md:flex-nowrap md:justify-normal md:text-start xl:mr-[10%] xl:gap-x-[150px] 2xl:mr-[20%] 2xl:gap-x-[200px]">
              <div className="mt-5 flex flex-col gap-4">
                <h3 className="mb-[5px] text-base font-semibold leading-[27px] text-[#EEEEEE] xl:text-[18px]">
                  Company
                </h3>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en#"
                >
                  About us
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en#"
                >
                  Customers
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/contact-us"
                >
                  Contact us
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en#"
                >
                  Support
                </a>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <h3 className="mb-[5px] text-base font-semibold leading-[27px] text-[#EEEEEE] xl:text-[18px]">
                  Features
                </h3>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/bot-builder"
                >
                  Bot Builder
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/whatsapp-chatbot"
                >
                  WhatsApp Chatbot
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/ai-studio"
                >
                  AI Studio
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/integrations"
                >
                  Integrations
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/outbound-bots"
                >
                  Outbound Bots
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/all-features"
                >
                  All Features
                </a>
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <h3 className="mb-[5px] text-base font-semibold leading-[27px] text-[#EEEEEE] xl:text-[18px]">
                  Cases Usage
                </h3>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/bot-for-sales"
                >
                  Bot for sales
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/bot-to-automate"
                >
                  Bot to automate campaigns
                </a>
                <a
                  className="text-base font-normal leading-[27px] text-[#B1B1B1] xl:text-[18px]"
                  href="/en/bot-for-customer"
                >
                  Bot for customer service
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex h-auto w-full items-center justify-center px-8 pb-[111px] pt-5 md:mt-0 md:pb-5">
          <div className="font-inter-font flex items-center gap-1 text-center text-[12.5px] font-normal leading-[25px] tracking-[-0.25px] text-[rgba(255,_255,_255,_0.56)] md:text-sm">
            <p>
              © مؤسسة النواة السداسية لتقنية المعلومات | All Rights Reserved
            </p>
            {" | "}
            <a className="underline underline-offset-4" href="/en/privacy">
              Privacy Policy
            </a>
            {" | "}
            <a
              className="underline underline-offset-4"
              href="/en/terms-and-conditions"
            >
              Terms And Conditions
            </a>
            {" | "}
            <a
              className="underline underline-offset-4"
              href="/en/exchange-policy"
            >
              Returns &amp; Exchange Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
