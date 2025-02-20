import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

type Props = {
    value: any,
    setValue: any,
}

export default function ReactQuillEditor({ value, setValue }: Props, ref: any) {
    const modules = {
        toolbar: [
            ["bold", "italic"],
        ],
    };
    return (
        <ReactQuill
            className="h-[120px]"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
        />
    )
}