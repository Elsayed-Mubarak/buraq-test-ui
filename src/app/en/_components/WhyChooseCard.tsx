import Image from "next/image";

type ParnterType = {
  title: string;
  description: string;
  image: string;
};

type Props = { item: ParnterType };
export default function WhyChooseCard({ item }: Props) {
  return (
    <div className="flex h-auto min-h-[411px] w-full max-w-[855px] flex-col items-center justify-center rounded-[11px] bg-[#F8F8FE] px-[26px] py-5 xl:min-h-[957px] xl:rounded-[30px] xl:px-[76px]">
      <Image
        alt="img"
        width="430"
        height="327"
        className="h-[127px] w-[167px] xl:h-[327px] xl:w-[430px]"
        src={item.image}
      />
      <div className="mt-[30px] xl:mt-[135px]">
        <h3 className="font-zarid-bold text-center text-[20px] font-bold leading-normal text-[#12141D] xl:text-[40px]">
          {item.title}
        </h3>
        <p className="mt-[9px] text-center text-[16px] font-normal leading-normal text-[#12141D] xl:mt-3 xl:text-[32px]">
          {item.description.split("•").map((ele) => (
            <span key={ele}>
              •{ele} <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
