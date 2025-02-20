"use client";
import { useState } from "react";
import FaqCard from "./FaqCard";

type FaqType = {
  id: number;
  title: string;
  description: string;
};

type Props = {};

const faqs: FaqType[] = [
  {
    id: 1,
    title: "What does the Buraq platform do?",
    description:
      "The Buraq platform enables the creation of AI-powered chatbots to enhance customer experience and streamline communication between companies and their audiences efficiently.",
  },
  {
    id: 2,
    title:
      "What is the difference between traditional automated chatbots and Buraq AI chatbots?",
    description:
      "Traditional automated chatbots rely on pre-defined rules for responding, whereas Buraq's AI-powered chatbots utilize advanced artificial intelligence technology.<br>They leverage machine learning and natural language processing(NLP) to accurately understand and analyze user queries, providing sophisticated, personalized responses based on context and content.",
  },
  {
    id: 3,
    title: "How can the Buraq AI chatbot assist in customer service?",
    description:
      "Converting website visitors into potential customers: by providing instant responses to inquiries without delay.<br>Addressing common inquiries: Offering immediate and accurate answers to frequently asked questions and basic inquiries without human intervention.<br>Boosting Sales: Guiding customers to appropriate services and actions based on their queries.Collecting and analyzing information: Gathering customer data to identify trends and needs, enhancing service offerings.<br>Offering multi-channel support: Operating across diverse channels like email, social media platforms, and messaging apps for a seamless customer experience.",
  },
  {
    id: 4,
    title: "Can I trust the responses of the Buraq Al chatbot?",
    description:
      "Absolutely! You can rely on the Al-Buraq chatbot to provide reliable and accurate support to your customers.<br> The chatbot uses advanced artificial intelligence technology to analyze queries and provide relevant answers, ensuring customer satisfaction.",
  },
  {
    id: 5,
    title: "Is there a free trial?",
    description:
      "Certainly! You can explore the benefits and features of the trial of the Al Buraq chatbot for free.",
  },
  {
    id: 6,
    title:
      "How can I build a chatbot if I lack technical programming experience?",
    description:
      "We're your partners in simplifying the chatbot-building process.Whether you're new to the industry or lack technical experience, we offer all the support you need to begin.<br> Here's how:Easy-to-use interface and comprehensive educational resources to guide you through every step of the building process.<br>Technical support is available to build the chatbot on your behalf, saving you time and effort.",
  },
  {
    id: 7,
    title:
      "What are the costs associated with building a chatbot after the free trial?",
    description: "It starts from 399 SAR to 899 SAR",
  },
];

export default function Faq({}: Props) {
  const [isOpen, setIsOpen] = useState(null);
  return (
    <div className="m-auto max-w-[2050px]">
      <div className="mt-[175px] flex w-full flex-col items-center px-5 md:px-10 xl:mt-[204px] 2xl:px-20">
        <h3 className="font-zarid-bold text-[22px] font-bold leading-normal tracking-[-1px] text-[#12141D] md:text-[34px] md:leading-[41px] xl:text-[64px] xl:leading-[83px] xl:tracking-[-1.295px]">
          Frequently asked questions
        </h3>
        <p className="mb-6 mt-[12px] text-[14px] font-normal leading-normal text-[#12141D] md:text-[18px] xl:mb-[55px] xl:mt-[22px] xl:text-[32px]">
          Answering the most frequently asked questions
        </p>
        {faqs.map((item) => (
          <FaqCard
            key={item.id}
            item={item}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
    </div>
  );
}
