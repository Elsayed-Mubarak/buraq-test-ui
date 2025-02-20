interface ContentBlock {
    getText: () => string;
}

interface Callback {
    (start: number, end: number): void;
}

export const variableStrategy = (contentBlock: ContentBlock, callback: Callback, contentState: any) => {
    const regex = /\*\w+?\*/g; // Match variables like *variableName*
    const text = contentBlock.getText();
    let matchArr;
    while ((matchArr = regex.exec(text)) !== null) {
        callback(matchArr.index, matchArr.index + matchArr[0].length);
    }
}
