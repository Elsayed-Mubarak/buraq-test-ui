export type ProfileSettings = {
    readonly id: string;
    readonly _id: string;
    firstName: string;
    lastName: string;
    useName: string;
    email: string;
    profilePicture?: any;
}


export interface IProfileStore {
    data: ProfileSettings;
    image: any;
    getProfileData: (...props: any[]) => Promise<ProfileSettings | void>;
    editProfileSettings: (data: any, ...props: any[]) => Promise<any>;
    editProfileSettingsImage: (data: any, ...props: any[]) => Promise<any>;
    deleteProfileImage: (...props: any[]) => Promise<any>;
}