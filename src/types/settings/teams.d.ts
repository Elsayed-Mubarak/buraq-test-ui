export interface ITeamStore {
    data: any[];
    getData: (...props: any[]) => Promise<any[]>;
    createTeam: (...props: any[]) => Promise<any>;
    deleteTeam: (...props: any[]) => Promise<any>;
    getDataById: (id: string) => Promise<any>;
    editTeam: (...props: any[]) => Promise<any>;
}