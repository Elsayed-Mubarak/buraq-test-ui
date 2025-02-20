import ReactQuill from "react-quill"
import { ReactQuillModules } from "../../../constants"
import React from "react";

function RichMessage({ value, setValue }: { value: string, setValue: (val: string) => void }) {

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={ReactQuillModules}
            className="h-[120px]"
        />
    )
}

export default React.memo(RichMessage);