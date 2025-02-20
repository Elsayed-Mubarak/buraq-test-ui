export type VariablesTypes = "Contact" | "Conversation";

export interface IVariables {
    readonly _id: string;
    variableName: string;
    type: VariablesTypes | string;
    description: string;
    format: string;
}

export enum VariableFormat {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean",
    DATE = "date",
    NAME = "name",
    EMAIL = "email",
    PHONE = "phone",
    REGEX = "regex",
}


export interface IVariablesStore {
    variables: IVariables[] | [];
    activeVariables: any[];
    archivedVariables: any[];

    addVariables: (props: IVariables) => Promise<any>;

    getVariables: () => Promise<IVariables[]>;
    getActiveVariables: (...props: any[]) => Promise<any[]>;
    getArchivedVariables: (...props: any[]) => Promise<any[]>;

    archiveVariable: (...props: any[]) => Promise<any>;
    restoreVariable: (...props: any[]) => Promise<any>;
    editVariable: (id: string, data: any) => Promise<any>;
    getVariableById: (id: string) => Promise<any>;
}

