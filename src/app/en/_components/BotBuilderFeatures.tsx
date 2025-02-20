import Image from "next/image";
import buildFeatureImage1 from "../../../public/building_blocks_assistant/buildFeature1.jpg";
import buildFeatureImage2 from "../../../public/building_blocks_assistant/buildFeature2.jpg";
import buildFeatureImage3 from "../../../public/building_blocks_assistant/buildFeature3.jpg";
import buildFeatureImage4 from "../../../public/building_blocks_assistant/buildFeature4.jpg";
import buildFeatureImage5 from "../../../public/building_blocks_assistant/buildFeature5.jpg";

const buildFeaturesItems = [
  {
    id: 1,
    title: "Sub-flows",
    description:
      "Organizing complex flows using flows making it easy to navigate as well.",
    image: buildFeatureImage1,
  },
  {
    id: 2,
    title: "Versioning",
    description: "Roll back to any versions of your chatbot flows at any time.",
    image: buildFeatureImage2,
  },
  {
    id: 3,
    title: "Cloning",
    description: "Build a copy of your chatbot with the click of a button.",
    image: buildFeatureImage3,
  },
  {
    id: 4,
    title: "Auto-layout",
    description:
      "Declutter your chatbot flow by neatly arranging all the action blocks on the canvas.",
    image: buildFeatureImage4,
  },
  {
    id: 5,
    title: "Search",
    description: "Find what you are looking for in the bot-builder with ease.",
    image: buildFeatureImage5,
  },
];

type Props = {};

export default function BotBuilderFeatures({}: Props) {
  return (
    <div className="mt-[88px] flex w-full flex-col items-center justify-center px-5 md:mt-[106px] md:px-[77px] xl:mt-[638px] xl:px-20">
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-zarid-bold md:font-zarid-serif max-w-full text-center text-[28px] font-bold leading-[22px] tracking-[-0.92px] text-[#141414] md:max-w-[456px] md:text-[45px] md:font-semibold md:leading-[52px] xl:max-w-[855px] xl:text-[86px] xl:leading-[103px] xl:tracking-[-1.725px]">
          Few more features you’ll often use
        </h3>
        <p className="mt-4 max-w-full text-center text-[18px] font-medium leading-[22px] text-[#141414] md:mt-0 md:max-w-[316px] md:text-[17px] md:font-normal md:leading-[25px] xl:max-w-[593px] xl:text-[32px] xl:leading-[47px]">
          Building bots has never been easier. With our utility tools what takes
          hours, now takes minutes.
        </p>
      </div>
      <div className="mt-[30px] grid w-full grid-cols-1 gap-[21px] sm:grid-cols-2 md:mt-[58px] xl:mt-[110px] xl:gap-10">
        {buildFeaturesItems.map((item) => (
          <div
            key={item.id}
            className="xxl:min-h-[538.072px] flex min-h-[auto] w-full flex-col items-start gap-[0.001px] overflow-hidden rounded-[11px] px-5 py-5 shadow-md md:px-10 md:py-[52px] md:shadow-[none] xl:rounded-[21.558px] xl:px-[76px] xl:py-[98px]"
          >
            <Image
              src={item.image}
              alt="Building Card Flow Image"
              width="506.61"
              height="294.94"
              className="w-full rounded-[11.498px] xl:rounded-[21.558px]"
            />
            <div className="flex w-full flex-col items-center justify-center gap-[2px] pt-10 xl:gap-[10.78px] xl:pt-[76px]">
              <h1 className="font-zarid-bold text-[15.926px] font-bold leading-[19px] text-[#12141D] md:text-[17px] md:leading-[21px] xl:text-[32.07px] xl:leading-[39px]">
                {item.title}
              </h1>
              <p className="undefined text-center text-[15px] font-normal leading-normal text-[#12141D] md:text-[17px] xl:text-[32px]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
