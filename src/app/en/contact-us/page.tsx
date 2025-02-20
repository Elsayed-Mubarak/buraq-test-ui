import Image from "next/image";
import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import contactUsWaterMark from "../../../public/contact_us/contactUsWatermark.svg";
import formLogo from "../../../public/contact_us/formBuraqLogo.svg";
import formVector1 from "../../../public/contact_us/formVector1.svg";
import formVector2 from "../../../public/contact_us/formVector2.svg";
import formVector3 from "../../../public/contact_us/formVector3.svg";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="relative flex h-full w-full items-center justify-center px-5 pb-[115px] pt-[100px] md:pt-[190px] xl:pb-[373px]">
        <div className="relative z-10 flex h-[925px] w-full flex-col items-center justify-center rounded-[24px] border border-[#DEE6EC] bg-white px-5 shadow-md md:h-[1020px] md:w-[563px] md:px-[64px] xl:w-[722px]">
          <div className="flex flex-col items-center">
            <Image alt="logo" width="65" height="51" src={formLogo} />
            <h3 className="mt-6 text-[32px] font-semibold text-[#2C303E] xl:mt-[43px]">
              Contact Us
            </h3>
            <p className="mt-[10px] text-center text-sm font-normal leading-normal text-[#2C303E] md:mt-[33px] md:text-start md:leading-[30px] xl:text-xl">
              Contact our team to explore how we can help you achieve your
              goals.
            </p>
          </div>
          <form className="w-full">
            <div className="relative mt-10 w-full">
              <div className="flex w-full flex-col gap-[5px]">
                <label className="text-base font-medium text-[#12141D] md:text-lg xl:text-[24px]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-[6px] border border-[#DEE6EC] bg-white px-[17px] py-3 text-xl font-normal text-[#12141D] outline-none"
                  name="fullname"
                  value=""
                />
              </div>
              <div className="absolute text-xs text-red-500 md:text-sm">
                Full name is required
              </div>
            </div>
            <div className="relative mt-[27px] w-full">
              <div className="flex w-full flex-col gap-[5px]">
                <label className="text-base font-medium text-[#12141D] md:text-lg xl:text-[24px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="rounded-[6px] border border-[#DEE6EC] bg-white px-[17px] py-3 text-xl font-normal text-[#12141D] outline-none"
                  name="email"
                  value=""
                />
              </div>
              <div className="false absolute text-xs text-red-500 md:text-sm">
                Email is required
              </div>
            </div>
            <div className="relative mt-[27px] flex w-full flex-col gap-[5px]">
              <label className="text-base font-medium text-[#12141D] md:text-lg xl:text-[24px]">
                Reason
              </label>
              <div>
                <select
                  name="reason"
                  role="select-box"
                  aria-placeholder="Reason"
                  className="formik-select__dropdown !h-[54px] !w-full rounded-[6px] border border-[#DEE6EC] bg-white px-2 text-base font-normal text-[#12141D] !outline-none md:text-lg xl:text-[24px]"
                >
                  <option value="">Reason</option>
                  <option value="Pro Plan" className="my-2">
                    Pro
                  </option>
                  <option value="Growth Plan" className="my-2">
                    Growth
                  </option>
                  <option value="Leadership Plan" className="my-2">
                    Leadership
                  </option>
                  <option value="Customized Plan" className="my-2">
                    Customized
                  </option>
                </select>
              </div>
              <div className="false absolute bottom-[-20px] text-xs text-red-500 md:text-sm">
                Required
              </div>
            </div>
            <div className="mt-[27px] w-full">
              <div className="flex w-full flex-col gap-[5px]">
                <label className="text-base font-medium text-[#12141D] md:text-lg xl:text-[24px]">
                  Message
                </label>
                <textarea
                  name="message"
                  className="h-[118px] resize-none rounded-[6px] border border-[#DEE6EC] bg-white px-[17px] py-3 text-xl font-normal text-[#12141D] outline-none"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 w-full">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-[100px] bg-[#0061FE] text-[12px] font-semibold leading-5 text-white md:h-[31px] xl:h-[60px] xl:text-[18px]"
              >
                <span
                  dir="ltr"
                  className="flex flex-row items-center gap-x-[6px]"
                >
                  Contact us
                </span>
              </button>
            </div>
          </form>
          <div className="absolute bottom-[-25px] flex w-full items-center justify-around md:bottom-[-34px] xl:bottom-[-47px]">
            <Image
              alt="vector"
              width="100"
              height="105"
              className="h-[61px] w-[64px] md:h-[77px] md:w-[73px] xl:h-[105px] xl:w-[100px]"
              src={formVector3}
            />
            <Image
              alt="vector"
              width="100"
              height="105"
              className="h-[61px] w-[64px] md:h-[77px] md:w-[73px] xl:h-[105px] xl:w-[100px]"
              src={formVector2}
            />
            <Image
              alt="vector"
              width="100"
              height="105"
              className="h-[61px] w-[64px] md:h-[77px] md:w-[73px] xl:h-[105px] xl:w-[100px]"
              src={formVector1}
            />
          </div>
        </div>
        <Image
          alt="contactUsWatermark"
          width="1920"
          height="444"
          className="absolute top-0 z-[-1] h-auto w-full"
          src={contactUsWaterMark}
        />
      </div>
      <Footer />
    </div>
  );
}
