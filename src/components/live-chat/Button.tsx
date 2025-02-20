type ButtonProps = {
  children: React.ReactNode;
  onClick: any
  type?: string;
  className?: string;
};
export default function Button({ children, onClick, type, className }: ButtonProps) {
  return (
    <button
      disabled={type === "disable"}
      onClick={onClick}
      className={`${type === "disable" ? "cursor-not-allowed bg-[#f3f3f3] text-[#808080]" : "text-white bg-primary-500 hover:bg-primary-600"} py-2 px-5 font-semibold h-9  border-0 outline-0   rounded-lg text-sm cursor-pointer transition-all duration-300 flex items-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
