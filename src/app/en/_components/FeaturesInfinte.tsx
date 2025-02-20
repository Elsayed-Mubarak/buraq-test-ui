import Marquee from "react-fast-marquee";
type Props = {};
export default function FeaturesInfinte({}: Props) {
  return (
    <div className="m-auto max-w-[2050px] overflow-hidden">
      <div className="mt-[137px] flex w-screen flex-col gap-4 overflow-hidden md:mt-[48px] xl:mt-[131px] xl:gap-5">
        <Marquee gradient={false} speed={100} autoFill={true}>
          <div className="flex gap-[11px] pr-[11px] xl:gap-[30px] xl:pr-[30px]">
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: "rgb(52, 174, 255)",
                background: "rgb(226, 246, 255)",
              }}
            >
              Arabic chatbot
            </button>
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: " rgb(72, 104, 120)",
                background: " rgb(225, 238, 245)",
              }}
            >
              Personalized Answers
            </button>
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: " rgb(0, 0, 179)",
                background: " rgb(199, 199, 249)",
              }}
            >
              Satisfied Customers
            </button>
          </div>
        </Marquee>
        <Marquee gradient={false} speed={100} direction="right" autoFill={true}>
          <div className="flex gap-[11px] pr-[11px] xl:gap-[30px] xl:pr-[30px]">
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: " rgb(49, 53, 219)",
                background: " rgb(233, 233, 253)",
              }}
            >
              Increase engagement
            </button>
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: " rgb(0, 132, 120)",
                background: " rgb(221, 241, 241)",
              }}
            >
              Boost Sales
            </button>
            <button
              type="button"
              className="font-zarid-bold h-[55px] min-w-[256px] flex-shrink-0 rounded-[142px] text-[28px] font-bold tracking-[-0.3px] md:min-w-[309px] xl:h-[142px] xl:!min-w-[683px] xl:text-[55px] xl:tracking-[-0.768px]"
              style={{
                color: " rgb(119, 125, 241)",
                background: " rgb(233, 233, 253)",
              }}
            >
              Cost Reduction
            </button>
          </div>
        </Marquee>
      </div>
    </div>
  );
}
