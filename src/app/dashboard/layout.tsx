"use client";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import Sidebar from "@/components/sidebar/Sidebar";
import MainLoader from "@/components/shared/MainLoader";
import SocketWrapper from "@/components/wrappers/ScketWrapper";

type Props = {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    const validateAuth = async () => {
      await checkAuth();
    };
    validateAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <MainLoader />
  return (
    <SocketWrapper>
      <div className="h-screen w-full ps-16">
        <Sidebar />
        <div className="h-full">{children}</div>
      </div>
    </SocketWrapper>
  );
}
