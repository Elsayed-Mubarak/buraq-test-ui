import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import websiteLogo from "../../../public/websiteLogo.svg";
import Link from "next/link";
import MainButton from "./MainButton";
import featureImage1 from "../../../public/_featureCardImg1.svg";
import featureImage2 from "../../../public/_featureCardImg2.svg";
import featureImage3 from "../../../public/_featureCardImg8.svg";
import featureImage4 from "../../../public/_featureCardImg4.svg";
import featureImage5 from "../../../public/_featureCardImg5.svg";
import featureImage6 from "../../../public/_featureCardImg7.svg";

type Props = {};
const botPages = [
  {
    title: "Bot for sales",
    description:
      "Automation in booking appointments and speed in transferring conversations to the relevant team",
    href: "bot-for-sales",
  },
  {
    title: "Bot to automate campaigns",
    description: "Sending exclusive discounts to your existing customers",
    href: "bot-to-automate",
  },
  {
    title: "Bot for customer service",
    description:
      "Personal useful and quick responses fed by artificial intelligence and files",
    href: "bot-for-customer",
  },
];
const featuresPages = [
  {
    title: "bot builder",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage1,
    href: "bot-builder",
  },
  {
    title: "whatsApp chatbot",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage5,
    href: "whatsapp-chatbot",
  },
  {
    title: "ai studio",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage2,
    href: "ai-studio",
  },
  {
    title: "integrations",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage6,
    href: "integrations",
  },
  {
    title: "outbound bots",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage5,
    href: "outbound-bots",
  },
  {
    title: "all features",
    description:
      "Embed a stylish and easily customizable chat widget into your website or app",
    image: featureImage3,
    href: "all-features",
  },
];

export default function MainNav({}: Props) {
  return (
    <div className="fixed left-0 right-0 top-0 z-[100] w-full bg-white shadow-md">
      <div className="xlg:pz-20 relative m-auto mx-auto flex h-[50px] w-full max-w-[2050px] items-center justify-between gap-[10px] bg-white px-5 md:h-[69px] md:px-10 xl:h-[140px]">
        <Image
          src={websiteLogo}
          width={158}
          height={46}
          className="h-[26px] w-[116px] cursor-pointer md:h-[26px] md:w-[77px] xl:h-[46px] xl:w-[158px]"
          alt="website logo"
        />
        <div className="hidden md:block">
          <div className="xl:gap[57px] hidden items-center gap-[30px] md:flex">
            <div className="hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en">
                  <p className="whitespace-nowrap text-sm font-normal leading-10 text-[#12141d] xl:text-xl xl:leading-5">
                    Why Buraq
                  </p>
                </Link>
              </div>
            </div>
            <div className="hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="group flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en">
                  <p className="whitespace-nowrap text-xs font-normal leading-10 text-[#6c6c6c] xl:text-xl xl:leading-5">
                    Features
                  </p>
                </Link>
                <ChevronDownIcon className="h-4 w-4 group-hover:rotate-180" />
                <div className="absolute left-0 top-[55%] hidden w-full px-20 group-hover:block">
                  <div className="grid grid-cols-1 gap-5 rounded-lg bg-[#f6f6f6] p-5 shadow-lg md:grid-cols-2 2xl:grid-cols-3">
                    {featuresPages.map((page) => (
                      <Link
                        key={page.title}
                        href={`/en/${page.href}`}
                        className="flex items-center gap-5 rounded-lg bg-white px-8 py-4"
                      >
                        <div>
                          <Image
                            src={page.image}
                            alt="features"
                            height={120}
                            width={120}
                          />
                        </div>
                        <div>
                          <div className="mb-2 font-semibold capitalize">
                            {page.title}
                          </div>
                          <div className="text-sm">{page.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="group hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en">
                  <p className="whitespace-nowrap text-xs font-normal leading-10 text-[#6c6c6c] xl:text-xl xl:leading-5">
                    Use cases
                  </p>
                </Link>
                <ChevronDownIcon className="h-4 w-4 group-hover:rotate-180" />
                <div className="absolute top-[55%] hidden group-hover:block">
                  <div className="flex max-w-[500px] flex-col gap-5 rounded-lg bg-[#f6f6f6] p-5 shadow-lg md:grid-cols-2 2xl:grid-cols-3">
                    <h4 className="text-[24px] font-semibold">
                      Solutions by Use Case
                    </h4>
                    {botPages.map((page) => (
                      <Link
                        key={page.title}
                        href={`/en/${page.href}`}
                        className="rounded-lg bg-white px-8 py-4"
                      >
                        <div className="mb-2 font-semibold capitalize">
                          {page.title}
                        </div>
                        <div className="text-sm">{page.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en/pricing">
                  <p className="whitespace-nowrap text-xs font-normal leading-10 text-[#6c6c6c] xl:text-xl xl:leading-5">
                    Pricing
                  </p>
                </Link>
              </div>
            </div>
            <div className="hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en/contact-us">
                  <p className="whitespace-nowrap text-xs font-normal leading-10 text-[#6c6c6c] xl:text-xl xl:leading-5">
                    Contact
                  </p>
                </Link>
              </div>
            </div>
            <div className="hidden items-center md:flex md:gap-[30px] lg:gap-[42px] xl:gap-10 2xl:gap-20">
              <div className="flex cursor-pointer items-center gap-x-1 xl:gap-x-2">
                <Link href="/en/blog">
                  <p className="whitespace-nowrap text-xs font-normal leading-10 text-[#6c6c6c] xl:text-xl xl:leading-5">
                    Blog
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-[30px] md:flex xl:gap-[57px]">
          <div className="hidden md:block">
            <button className="font-poppins-font flex h-[19px] w-[40px] items-center justify-center gap-1 rounded-full bg-[#F5F5F5] p-[4px_8px] xl:h-[37px] xl:w-[76px] xl:gap-2 xl:p-[8px_16px]">
              <GlobeAltIcon className="h-[9px] w-[9px] xl:h-[18px] xl:w-[18px]" />
              <p className="text-[7px] font-normal leading-normal text-[#040F16] xl:text-[14px]">
                AR
              </p>
            </button>
          </div>
          <div className="hidden items-center gap-2 md:flex xl:gap-4">
            <MainButton href="/signup" type="secondary">
              Request a trial
            </MainButton>
            <MainButton href="/login" type="primary">
              Login
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
