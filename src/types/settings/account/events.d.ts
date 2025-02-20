export interface IEventSettingsStore {
    data: any;
    fetchData: () => Promise<any>;
    mutateData: (data: any) => Promise<any>;
}