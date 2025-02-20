export type Teammates = {
  readonly _id: string;
  teammates: any[];
};

export interface ITeammatesStore {
  teammate: any;
  teammates: any[];
  getTeammates: (...props: any[]) => Promise<any[]>;
  getTeammateById: (id: string) => Promise<any>;
  editTeammate: (id: string, data: any) => Promise<any>;
  deleteTeamate: (id: string) => Promise<any>;
  inviteTeammate: (...props: any[]) => Promise<any>;
  addTeamate: (token: string, data: any) => Promise<any>;
}
