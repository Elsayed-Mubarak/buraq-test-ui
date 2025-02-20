
import LiveChatLayout from "@/components/live-chat/LiveChatLayout";

export const metadata = {
  title: "Live Chat | Buraq",
};
type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return <LiveChatLayout>{children}</LiveChatLayout>;
}

export default Layout;
