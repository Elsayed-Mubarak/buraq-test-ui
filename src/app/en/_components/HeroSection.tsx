import MainButton from "./MainButton";

type Props = {};

export default function HeroSection({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mx-auto flex max-w-[1138px] flex-col items-center justify-center gap-2 px-5 pt-[137px] md:gap-6 md:pt-[67px] xl:pt-[111px]">
        <h3 className="font-zarid-bold text-center text-[28px] font-bold leading-[26px] text-[#12141D] md:text-[42px] md:leading-[86px] xl:text-[80px]">
          Use the power of AI chatbots and get ahead of 99% of your competitors
        </h3>
        <p className="text-center text-[18px] font-medium leading-[22px] text-[#4E5A65] md:hidden">
          Why settle for an ordinary chatbot when your customers deserve
          excellence?
        </p>
        <p className="text-center text-lg font-normal text-[#6B6B6B] xl:text-2xl">
          Provide instant yet effective AI agents in less time and cost. By
          building Arabic or English bots tailored to your clients and brand
          voice.&nbsp;
        </p>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <MainButton href="/signup" type="primary">
              Try for free
            </MainButton>
            <MainButton
              href="https://calendar.app.google/cUySyQzqt8rKftiA8"
              type="secondary"
            >
              Get a demo
            </MainButton>
          </div>
          <p className="mt-4 hidden text-[22px] font-medium italic leading-5 text-[#353EE7] md:block xl:mt-8">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
