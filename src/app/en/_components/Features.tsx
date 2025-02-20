import featureImage1 from "../../../public/_featureCardImg1.svg";
import featureImage2 from "../../../public/_featureCardImg2.svg";
import featureImage4 from "../../../public/_featureCardImg4.svg";
import featureImage5 from "../../../public/_featureCardImg5.svg";
import featureImage7 from "../../../public/_featureCardImg7.svg";
import featureImage8 from "../../../public/_featureCardImg8.svg";
import FeatureCard from "./FeatureCard";
type Props = {};

type Feature = {
  title: string;
  description: string;
  image: string;
};
const features: Feature[] = [
  {
    title: "No-code required",
    description:
      "Build your chatbot effortlessly, with no coding required. Customize it to align with your brand and customer needs!",
    image: featureImage1,
  },
  {
    title: "AI-powered conversational Chatbot",
    description:
      "Stop using traditional chatbots. Start creating AI chatbots capable of handling complex queries through training with website data, or files.",
    image: featureImage2,
  },
  {
    title: "WhatsApp Chatbot",
    description:
      "Create a chatbot on the WhatsApp platform to respond to your customers and automate marketing campaigns.",
    image: featureImage4,
  },
  {
    title: "Outbound Bots",
    description:
      "Contact your customers wherever and whenever they are by using email, WhatsApp, and SMS marketing automation tools.",
    image: featureImage5,
  },
  {
    title: "Integrations",
    description:
      "Easily connect Buraq with the tools and applications in just a few minutes, to make the workflow smoother and enhance efficiency.",
    image: featureImage7,
  },
  {
    title: "All Features",
    description: "Explore all the features of the Buraq platform.",
    image: featureImage8,
  },
];

export default function Fearures({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mx-auto mt-5 flex w-full max-w-[598px] flex-col rounded-none bg-white px-[22px] py-[22px] md:rounded-[16px] md:bg-[#E9E9FD] xl:mt-0 xl:max-w-full xl:rounded-none xl:px-10 xl:py-[103px] 2xl:px-20">
        <div dir="ltr" className="flex flex-col items-center gap-3 xl:gap-10">
          <h3 className="text-center text-[22px] font-semibold text-[#12141D] xl:text-start xl:text-[56px]">
            Features
          </h3>
          <p className="text-center text-base font-semibold text-[#12141D] xl:text-start xl:text-[40px]">
            Make Chatbot Magic without touching a line of code
          </p>
        </div>
        <div className="mt-4 grid w-full grid-cols-1 gap-[18px] sm:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-[46px]">
          {features.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
