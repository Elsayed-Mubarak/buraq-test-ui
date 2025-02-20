import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image: string;
};
type Props = { item: Feature };

export default function FeatureCard({ item }: Props) {
  return (
    <div>
      <div className="xxl:p-[60px] flex h-[283px] w-full cursor-pointer flex-col items-center justify-center gap-[37px] rounded-[20px] bg-[#E9E9FD] p-[35px] md:bg-white xl:h-[450px] xl:gap-[63px]">
        <div className="h-[95px] w-[95px] xl:h-[164px] xl:w-[164px]">
          <Image
            alt={item.title}
            width={164}
            height={164}
            className="object-cover"
            src={item.image}
          />
        </div>
        <div>
          <h3 className="font-zarid-bold text-center text-base font-bold text-[#12141D] xl:text-[28px]">
            {item.title}
          </h3>
          <p className="mt-3 text-center text-sm font-normal text-[#12141D] xl:text-2xl">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
