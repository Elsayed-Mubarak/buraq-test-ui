export interface ISendText {
    label?: string | undefined
    text: string | undefined;
    setText: (text: string) => void;
}

export interface IRichMessageProps extends ISendText {
    index?: number | null;
}
