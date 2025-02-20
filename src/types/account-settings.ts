import { FormState } from "./FormStateResponse";

export enum Currency {
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    AED = "AED",
}

export type IAccountSettings = {
    readonly _id: string;
    name: string;
    timezone: string;
    currency: Currency;
    businessValue: number;
    hourlyCost: number;
    profilePicture: any;
    enable2FA: boolean;
    token: string
}


export interface IAccountSettingsStore {
    formState: FormState;
    data: IAccountSettings;
    getData: (...props: any[]) => Promise<any>;
    editiData: (...props: any[]) => Promise<any>;
    editAccountSettingsImage: (data: any, ...props: any[]) => Promise<any>;
    deleteAccountImage: (...props: any[]) => Promise<any>;
}