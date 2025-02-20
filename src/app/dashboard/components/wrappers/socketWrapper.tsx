"useClient";
import webSocketSingleton from "@/service/socket";
import { useAuthStore } from "@/stores/useAuthStore";
import React, { ReactNode, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


interface ISocketWrapper {
    children: ReactNode;
}

const SocketWrapper = ({ children }: ISocketWrapper) => {
    const token = useAuthStore((state) => state.token);
    const queryClient = useQueryClient();
    const router = useRouter();
    useEffect(() => {
        if (token) {
            webSocketSingleton.init(token);
            webSocketSingleton.setQueryClient(queryClient);
            webSocketSingleton.setRouter(router);
        } else {
            console.log("No token, WebSocket not initialized");
        }
        return () => {
            webSocketSingleton.close();
            webSocketSingleton.removeQueryClient();
            webSocketSingleton.removeRouter();
        };
    }, [token, queryClient, router]);
    return <>{children}</>;
};

export default SocketWrapper;