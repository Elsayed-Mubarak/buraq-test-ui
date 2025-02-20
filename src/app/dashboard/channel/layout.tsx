import ChannelSidebar from "@/components/channel/ChannelSidebar";


type Props = {
  children: React.ReactNode;
}
export default function ChannelLayout({ children }: Props) {
  return (
    <div className="w-full h-full pl-[230px]">
      <ChannelSidebar />
      <div>{children}</div>
    </div>
  )
}

