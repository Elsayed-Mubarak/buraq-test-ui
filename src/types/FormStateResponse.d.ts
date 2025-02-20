export type FormState = {
    status: "error" | "success" | "undefined";
    errors?: {
        [key: string]: string[]
    };
    message?: string | null;
}