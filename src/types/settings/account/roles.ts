export interface IRolesStore {
    roles: any[];
    role: any;
    getAllRoles: (...props: any[]) => Promise<any>;
    getRoleById: (id: string) => Promise<any>;
}
