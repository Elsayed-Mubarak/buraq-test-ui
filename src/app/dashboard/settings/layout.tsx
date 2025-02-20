import SettingsSidebar from "@/components/settings/SettingsSidebar";

type Props = {
  children: React.ReactNode;
};
export const metadata = {
  title: "User Profile | Buraq",
};
export default function SettingLayout({ children }: Props) {
  return (
    <div className="w-full h-full">
      <SettingsSidebar />
      <div className="pl-[230px]">{children}</div>
    </div>
  );
}
