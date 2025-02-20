export type userType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "ADMIN" | "USER" | "SUPERADMIN" | "";
    createdAt: string;
    updatedAt: string;
}