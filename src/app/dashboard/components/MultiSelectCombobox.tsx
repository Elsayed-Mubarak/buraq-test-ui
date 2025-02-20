"use client";

import { ChevronsUpDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { useState } from "react";

const predefinedFrameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

interface Props {
    subConditionId: string;
    selectedValues: string[];
    onChangeSubConditions: (subConditionId: string, newValues: string[]) => void;
}

export function MultiSelectCombobox({ subConditionId, selectedValues, onChangeSubConditions, }: Props) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddValue = (value: string) => {
        if (!selectedValues.includes(value) && value.trim() !== "") {
            const newValues = [...selectedValues, value];
            onChangeSubConditions(subConditionId, newValues);
        }
        setInputValue("");
    };

    const handleRemoveValue = (value: string) => {
        const newValues = selectedValues.filter((v) => v !== value);
        onChangeSubConditions(subConditionId, newValues);
    };

    const allFrameworks = [
        ...predefinedFrameworks,
        ...selectedValues.map((val) => ({ value: val, label: val })),
    ].filter(
        (value, index, self) =>
            index === self.findIndex((t) => t.label === value.label)
    );

    return (
        <div>
            {/* Popover for Combobox */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {inputValue || "Type or select frameworks..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-white">
                    <Command>
                        <CommandInput
                            placeholder="Search or type..."
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {allFrameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={() => handleAddValue(framework.label)}
                                    >
                                        {framework.label}
                                    </CommandItem>
                                ))}
                                {inputValue.trim() !== "" &&
                                    !allFrameworks.some((f) => f.label === inputValue) && (
                                        <CommandItem
                                            key="custom-value"
                                            onSelect={() => {
                                                handleAddValue(inputValue);
                                                setOpen(false);
                                            }}
                                            className="cursor-pointer px-3 py-2 bg-gray-50 hover:bg-blue-100"
                                        >
                                            Add "{inputValue}"
                                        </CommandItem>
                                    )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-2 px-3">
                {selectedValues.map((tag) => (
                    <span
                        key={tag}
                        className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-md shadow-md text-sm"
                    >
                        {tag}
                        <button
                            className="ml-1 text-blue-500 hover:text-red-500"
                            onClick={() => handleRemoveValue(tag)}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
