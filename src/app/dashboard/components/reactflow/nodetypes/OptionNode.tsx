
export default function OptionNode({ data }: any) {

  return (
    <div className=" bg-[gray] rounded-lg p-4 text-gray-700 text-sm font-medium italic">
      <div className="text-center text-white">{data.nodeName}</div>
    </div>

  )
}
