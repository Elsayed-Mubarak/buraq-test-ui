import Image from "next/image";

type WorkCard = {
  title: string;
  description: string;
  image: string;
  span?: boolean;
  justify?: boolean;
};
type Props = { item: WorkCard };

export default function HowBuildCard({ item }: Props) {
  return (
    <div
      className={`flex ${item.span && "row-span-2"} ${item.justify ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex w-full max-w-[710px] flex-col justify-between rounded-2xl bg-white p-6 xl:p-[56px]`}
      >
        <div>
          <h3 className="font-zarid-bold text-[21px] font-bold text-[#12141D] xl:text-[46px]">
            {item.title}
          </h3>
          <p className="mt-[13px] max-w-[561px] text-[18px] font-normal text-[#777] xl:text-[40px]">
            {item.description}
          </p>
        </div>
        <div className="mt-5 w-full">
          <Image src={item.image} className="ml-auto" alt={item.title} />
        </div>
      </div>
    </div>
  );
}
