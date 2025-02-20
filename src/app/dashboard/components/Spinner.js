export default function Spinner({ width = "12", height = "12" }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span
        className={`w-${width} h-${height}  border-4 border-b-[#fff]  rounded-full  inline-block animate-spin border-primary-600`}
      ></span>
    </div>
  );
}
