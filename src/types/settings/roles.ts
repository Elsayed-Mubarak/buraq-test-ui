export interface IRolesStore {
    roles: any[];
    role: any;
    rolesWithTeammates: any[];
    getAllRoles: (...props: any[]) => Promise<any>;
    getRoleById: (id: string) => Promise<any>;
    getRolesWithTeammate: (...props: any[]) => Promise<any>;
    addRole: (...props: any[]) => Promise<any>;
}
