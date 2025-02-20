import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
type FaqType = {
  id: number;
  title: string;
  description: string;
};
type Props = { item: FaqType; isOpen: number | null; setIsOpen: any };

export default function FaqCard({ item, isOpen, setIsOpen }: Props) {
  return (
    <div className="w-full border-b border-t border-b-[#DEDEDE] border-t-[#DEDEDE] pb-[27px] pt-[22px] md:pb-[28px] md:pt-[28px] xl:pb-[61px] xl:pt-[58px]">
      <div
        onClick={() => setIsOpen(item.id === isOpen ? null : item.id)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <h3 className="pr-2 text-[12px] font-normal leading-[14px] text-[#12141D] md:text-[24px] md:leading-[26px] xl:text-[40px] xl:font-normal xl:leading-[53px]">
          {item.title}
        </h3>
        <div>
          {isOpen === item.id ? (
            <ChevronUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDownIcon className="h-6 w-6" />
          )}
        </div>
      </div>
      {isOpen === item.id && (
        <p className="max-w-[1605px] text-[10px] font-normal leading-[14px] text-[#777] md:text-[20px] md:leading-5 xl:text-[32px] xl:leading-[41px]">
          {item.description.split("<br>").map((ele) => (
            <span key={ele}>
              {ele}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
