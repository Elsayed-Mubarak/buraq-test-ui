import Link from "next/link";

type Props = {
  children: React.ReactNode;
  type: "primary" | "secondary";
  href: string;
};

export default function MainButton({ children, type, href }: Props) {
  const baseStyles =
    "flex items-center justify-center rounded-[100px] text-[12px] font-semibold leading-5 md:h-[31px] xl:h-[60px] xl:text-[18px]";
  const styles =
    type === "primary"
      ? "h-12 w-[74px] bg-[#353EE7] text-white md:w-[147px]"
      : "h-12 w-[74px] border border-[#12141D] bg-transparent text-[#12141D] md:w-[147px]";

  return (
    <Link href={href} className={`${baseStyles} ${styles}`}>
      {children}
    </Link>
  );
}
