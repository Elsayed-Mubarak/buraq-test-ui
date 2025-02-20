import parnterCard1 from "../../../public/partnerCard1.svg";
import parnterCard2 from "../../../public/partnerCard2.svg";
import parnterCard3 from "../../../public/partnerCard3.svg";
import parnterCard4 from "../../../public/partnerCard4.svg";
import WhyChooseCard from "./WhyChooseCard";
type Props = {};

type ParnterType = {
  title: string;
  description: string;
  image: string;
};

const parnters: ParnterType[] = [
  {
    title: "Increase engagement",
    description:
      " By initiating conversations with your website visitors to respond to their queries and objections.• Turn Visitors into Potential Customers:• Through personalized and effective responses by feeding the bot with website data and files to provide accurate answers.",
    image: parnterCard1,
  },
  {
    title: "Cost Reduction",
    description:
      " By answering FAQs with fewer agents, thanks to smart responses trained by artificial intelligence.",
    image: parnterCard2,
  },
  {
    title: "Boost Sales",
    description:
      " By taking over qualified sales conversations directly to the sales team.• Automate marketing campaigns across various platforms (WhatsApp, email, and SMS).",
    image: parnterCard3,
  },
  {
    title: "Scale",
    description:
      " Integrate Buraq chatbot with various applications such as Calendar for automatic appointment booking.• Manage all customer messages in one place (Live chat), including via mobile!",
    image: parnterCard4,
  },
];

export default function WhyChoose({}: Props) {
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[218px] flex w-full flex-col items-center px-5 md:mt-[191px] md:px-10 2xl:px-20">
        <div className="flex max-w-[1415px] flex-col items-center">
          <h3 className="text-[14px] font-semibold leading-normal text-[#12141D] xl:text-[40px]">
            Why choose Buraq over other AI chatbot platforms?
          </h3>
          <h3 className="font-zarid-bold mt-0 flex h-[100px] max-w-[1209px] items-center justify-center text-center text-[20px] font-bold leading-6 text-[#12141D] xl:mt-[23px] xl:h-auto xl:text-[80px] xl:leading-[88px]">
            We consider you a partner in success, where your project is our
            project, and your success is our success.
          </h3>
          <p className="mt-0 max-w-[1415px] text-center text-[14px] font-normal leading-[14px] text-[#3D4152] xl:mt-[23px] xl:text-[40px] xl:leading-10">
            It’s more than AI chatbots. Buraq is an AI-driven marketing platform
            that works for you, 24/7, to help you achieve your goals.
          </p>
          <h3 className="mt-8 text-[14px] font-semibold leading-normal text-[#12141D] xl:text-[40px]">
            There are 4 main reasons to choose Buraq:
          </h3>
        </div>
        <div className="mt-[85px] grid w-full grid-cols-1 !gap-4 md:grid-cols-2 xl:mt-[123px] xl:!gap-10">
          {parnters.map((item) => (
            <WhyChooseCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
