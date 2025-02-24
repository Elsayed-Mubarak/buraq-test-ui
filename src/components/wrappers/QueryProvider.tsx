"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

type Props = {
    children: React.ReactNode
}

export default function QueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}