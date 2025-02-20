// import { Input } from "@/components/ui/input";
// import useTextEditorStore from "@/stores/useTextEditorVariable";
// import { useEffect } from "react";
// import { BsTrash } from "react-icons/bs";
// import { IoMdClose } from "react-icons/io";
// import { IoCheckmark } from "react-icons/io5";

// interface Props {
//     value: string;
//     onChange: (...props: any[]) => void;
// }

// function FallbackValue({ value, onChange }: Props) {
//     const { openFallback, setFallback } = useTextEditorStore();

//     useEffect(() => {
//         return () => {
//             setFallback(false);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         openFallback && (
//             <div className="w-[320px] bg-white border rounded-md p-2 relative top-0 right-0 !z-[100]">
//                 <div className="flex items-center justify-between  text-nodeSettings">
//                     <p className="text-sm">Enter variable fallack value</p>
//                     <button
//                         type="button"
//                         onClick={() => setFallback(!openFallback)}
//                     >
//                         <IoMdClose className="w-4 h-4" />
//                     </button>
//                 </div>
//                 <div className="flex gap-2 mt-1">
//                     <Input
//                         className="rest-input flex-1 h-[34px]"
//                         onChange={(e) => onChange(e.target.value)}
//                         value={value}
//                     />
//                     <button
//                         type="button"
//                         className="rounded-md flex items-center justify-center text-white bg-blue-700 p-1 w-10"
//                     >
//                         <IoCheckmark className="w-5 h-5" />
//                     </button>
//                     <button
//                         type="button"
//                         className="rounded-md flex items-center justify-center text-gray-500 bg-gray-200 p-1 w-10"
//                     >
//                         <BsTrash className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>
//         )
//     )
// }

// export default FallbackValue


import { Input } from "@/components/ui/input";
import useTextEditorStore from "@/stores/useTextEditorVariable";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

interface Props {
    value: string;
    onChange: (val: string) => void;
}

function FallbackValue({ value, onChange }: Props) {
    const { openFallback, setFallback } = useTextEditorStore();
    const [inputValue, setInputValue] = useState(value || ""); // Local state

    useEffect(() => {
        return () => {
            setFallback(false);
        };
    }, []);

    useEffect(() => {
        setInputValue(value); // Sync when `value` prop changes
    }, [value]);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(e.target.value);
    //     onChange(e.target.value); // Send update to parent
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue); // ✅ Automatically updates the correct fallback
    };

    if (!openFallback) return null;

    return (
        <div className="w-[320px] bg-white border rounded-md p-2 absolute top-0 right-0 z-[100]">
            <div className="flex items-center justify-between text-nodeSettings">
                <p className="text-sm">Enter variable fallback value</p>
                <button type="button" onClick={() => setFallback(false)}>
                    <IoMdClose className="w-4 h-4" />
                </button>
            </div>
            <div className="flex gap-2 mt-1">
                <Input
                    className="rest-input flex-1 h-[34px]"
                    onChange={handleInputChange}
                    value={inputValue} // Use local state for controlled behavior
                />
                <button
                    type="button"
                    className="rounded-md flex items-center justify-center text-white bg-blue-700 p-1 w-10"
                >
                    <IoCheckmark className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="rounded-md flex items-center justify-center text-gray-500 bg-gray-200 p-1 w-10"
                >
                    <BsTrash className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default FallbackValue;
