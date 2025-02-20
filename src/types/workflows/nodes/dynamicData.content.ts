import { ObjectId } from "bson";

export interface IDynamicDataNodeContent {
    id: string;
    name: string;
    dataVariable: string | null;
    renderAs: 'Button' | 'Carousel';
    question: string;
    buttonType: 'Branch' | 'Action';
    buttonTitle: string;
    enableSearch: boolean;
    enableMultiSelect: boolean;
    buttonsLayout: 'HORIZONTAL' | 'VERTICAL';
    buttonsSorting: 'A-Z' | 'Z-A' | 'RANDOM' | 'AS DEFINED';
    buttonPayload: string;
    saveResponseVariable: string | null;
    savePayloadResponseVariable: string | null;
}

export const dynamicDataInitialData: IDynamicDataNodeContent = {
    id: new ObjectId().toHexString(),
    name: 'Dynamic Data',
    dataVariable: null,
    renderAs: 'Button',
    question: "Hi there! My name is...",
    buttonType: 'Branch',
    buttonTitle: '',
    enableSearch: false,
    enableMultiSelect: false,
    buttonsLayout: 'HORIZONTAL',
    buttonsSorting: 'AS DEFINED',
    buttonPayload: '',
    saveResponseVariable: null,
    savePayloadResponseVariable: null,
}
