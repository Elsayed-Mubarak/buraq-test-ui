"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command";
import { cn } from "../../../../lib/utils";
import { TfiAngleDown } from "react-icons/tfi";
import { CiCircleRemove } from "react-icons/ci";
import { useVariablesStore } from "@/stores/settings/useVariables.store";
export function Combobox({
    placeholder,
    value = [],
    onValueChange,
}: {
    placeholder: string;
    value: string[];
    onValueChange: (newValue: string[]) => void;
}) {
    const { getActiveVariables, activeVariables } = useVariablesStore();
    const [open, setOpen] = React.useState(false);
    const [frameworks, setFrameworks] = React.useState<{ value: string; label: string }[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    // Fetch active variables when the component mounts
    React.useEffect(() => {
        getActiveVariables(); // Fetch active variables
    }, [getActiveVariables]);
    // Update frameworks state when activeVariables changes
    React.useEffect(() => {
        if (activeVariables) {
            setFrameworks(
                activeVariables.map((variable) => ({
                    value: variable.variableName,
                    label: variable.variableName,
                }))
            );
        }
    }, [activeVariables]);
    const toggleValue = (val: string) => {
        const isActiveVariable = frameworks.some((fw) => fw.value === val);
        const formattedValue = `#${val}`;
        const updatedValues = value.includes(formattedValue)
            ? value.filter((item) => item !== formattedValue) // Remove if already selected
            : [...value, formattedValue]; // Add formatted value if not selected
        onValueChange(updatedValues);
    };
    const addNewValue = () => {
        if (inputValue && !frameworks.find((fw) => fw.value === inputValue)) {
            const formattedValue = `#${inputValue}`;
            const newFramework = { value: inputValue, label: inputValue };
            setFrameworks((prev) => [...prev, newFramework]);
            onValueChange([...value, formattedValue]);
        }
        setInputValue(""); // Clear the input field
    };
    return (
        <div className="space-y-2 px-2 border rounded-md">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full bg-white justify-between px-1 hover:bg-transparent h-auto"
                    >
                        <span className="flex gap-2 flex-wrap relative">
                            {value.length > 0 ? (
                                value.map((val) => {
                                    const displayValue = val.startsWith("#") ? val.slice(1) : val;
                                    return (
                                        <span
                                            key={val}
                                            className="flex items-center px-2 py-1 bg-gray-100 rounded text-sm font-medium z-30 relative"
                                            onClick={() => toggleValue(displayValue)}
                                        >
                                            {displayValue}
                                            <CiCircleRemove className="w-4 h-4 border rounded-full flex items-center justify-center absolute bg-white -top-1 -right-2 z-30" />
                                        </span>
                                    );
                                })
                            ) : (
                                <span className="text-gray-400">{placeholder}</span>
                            )}
                        </span>
                        <TfiAngleDown className="h-[10px] w-[10px] shrink-0 me-0.5" strokeWidth={"1px"} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] bg-white p-0">
                    <Command className="w-[300px]">
                        <CommandInput
                            className="h-7 ring-0 outline-none"
                            value={inputValue}
                            onValueChange={setInputValue}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addNewValue();
                                }
                            }}
                        />
                        <CommandList className="h-[300px] overflow-x-auto">
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={() => toggleValue(framework.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value.includes(`#${framework.value}`)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}



// "use client";
// import * as React from "react";
// import { Check } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "./popover";
// import { Button } from "./button";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
// } from "./command";
// import { cn } from "../../../../lib/utils";
// import { TfiAngleDown } from "react-icons/tfi";
// import { CiCircleRemove } from "react-icons/ci";
// import { useVariablesStore } from "@/stores/settings/useVariables.store";
// import useFlowStore from "../reactflow/reactflowstate/store";
// export function Combobox({
//     placeholder,
//     value = [],
//     onValueChange,
// }: {
//     placeholder: string;
//     value: string[];
//     onValueChange: (newValue: string[]) => void;
// }) {

//     const { activeVariables } = useFlowStore();
//     const [open, setOpen] = React.useState(false);
//     const [frameworks, setFrameworks] = React.useState<{ value: string; label: string }[]>([]);
//     const [inputValue, setInputValue] = React.useState("");

//     // Update frameworks state when activeVariables changes
//     React.useEffect(() => {
//         if (activeVariables) {
//             setFrameworks(
//                 activeVariables.map((variable) => ({
//                     value: variable.variableName,
//                     label: variable.variableName,
//                 }))
//             );
//         }
//     }, [activeVariables]);
//     const toggleValue = (val: string) => {
//         const isActiveVariable = frameworks.some((fw) => fw.value === val);
//         const formattedValue = `*${val}*`;
//         // const formattedValue = `#${val}`;
//         const updatedValues = value.includes(formattedValue)
//             ? value.filter((item) => item !== formattedValue) // Remove if already selected
//             : [...value, formattedValue]; // Add formatted value if not selected
//         onValueChange(updatedValues);
//     };
//     const addNewValue = () => {
//         if (inputValue && !frameworks.find((fw) => fw.value === inputValue)) {
//             const formattedValue = `${inputValue}`;
//             const newFramework = { value: inputValue, label: inputValue };
//             setFrameworks((prev) => [...prev, newFramework]);
//             onValueChange([...value, formattedValue]);
//         }
//         setInputValue(""); // Clear the input field
//     };
//     return (
//         <div className="space-y-2 px-2 border rounded-md">
//             <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                     <Button
//                         variant="ghost"
//                         role="combobox"
//                         aria-expanded={open}
//                         className="w-full bg-white justify-between px-1 hover:bg-transparent h-auto"
//                     >
//                         <span className="flex gap-2 flex-wrap relative">
//                             {value.length > 0 ? (
//                                 value.map((val) => {
//                                     // const displayValue = val.startsWith("*") ? val.slice(1) : val;
//                                     const displayValue = val.startsWith("*") && val.endsWith("*") ? val.slice(1, -1) : val;
//                                     return (
//                                         <span
//                                             key={val}
//                                             className="flex items-center px-2 py-1 bg-gray-100 rounded text-sm font-medium z-30 relative"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 toggleValue(displayValue);
//                                             }}
//                                         >
//                                             {displayValue}
//                                             <CiCircleRemove className="w-4 h-4 border rounded-full flex items-center justify-center absolute bg-white -top-1 -right-2 z-30" />
//                                         </span>
//                                     );
//                                 })
//                             ) : (
//                                 <span className="text-gray-400">{placeholder}</span>
//                             )}
//                         </span>
//                         <TfiAngleDown className="h-[10px] w-[10px] shrink-0 me-0.5" strokeWidth={"1px"} />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[300px] bg-white p-0">
//                     <Command className="w-[300px]">
//                         <CommandInput
//                             className="h-7 ring-0 outline-none"
//                             value={inputValue}
//                             onValueChange={setInputValue}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     addNewValue();
//                                 }
//                             }}
//                         />
//                         <CommandList className="h-[300px] overflow-y-auto">
//                             <CommandGroup>
//                                 {frameworks.map((framework) => (
//                                     <CommandItem
//                                         key={framework.value}
//                                         value={framework.value}
//                                         onSelect={() => toggleValue(framework.value)}
//                                     >
//                                         <Check
//                                             className={cn(
//                                                 "mr-2 h-4 w-4",
//                                                 value.includes(`#${framework.value}`)
//                                                     ? "opacity-100"
//                                                     : "opacity-0"
//                                             )}
//                                         />
//                                         {framework.label}
//                                     </CommandItem>
//                                 ))}
//                             </CommandGroup>
//                         </CommandList>
//                     </Command>
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// }