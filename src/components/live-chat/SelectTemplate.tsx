"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { getApprovedTemplates } from "@/service/templateServices"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useChatStore } from "@/stores/useChatStore"

type SelectTemplateProps = {
    setTemplate: (template: any) => void,
    template: any
}
export default function SelectTemplate({ setTemplate, template }: SelectTemplateProps) {
    const allTemplates = useChatStore((state) => state.templates)
    const setTemplates = useChatStore((state) => state.setTemplates)

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const { data: templates } = useQuery({
        queryKey: ["approved-templates"],
        queryFn: getApprovedTemplates,
        staleTime: 1000 * 60 * 60,
        // enabled: !allTemplates.length
    })
    useEffect(() => {
        if (templates) {
            setTemplates(templates)
            setTemplate(templates[0])
            setValue(templates[0].name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templates])
    // useEffect(() => {
    //     if (allTemplates) {
    //         setTemplate(allTemplates[0])
    //         setValue(allTemplates[0]?.name)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [allTemplates])

    if (!templates) return null
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[100%] justify-between text-secondary-50"
                >
                    {template?.name}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] h-[200px] p-0 z-[99999] bg-white shadow-lg rounded-lg">
                <Command>
                    <CommandInput className="h-9" />
                    <CommandList>
                        <CommandEmpty>No template found.</CommandEmpty>
                        <CommandGroup>
                            {templates.map((template: any) => (
                                <CommandItem
                                    className="cursor-pointer hover:bg-primary-50 text-secondary-50"
                                    key={template.name}
                                    value={template.name}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setTemplate(template)
                                        setOpen(false)
                                    }}
                                >
                                    {template.name}
                                    <Check
                                        className={cn(
                                            "ml-auto text-primary-600 h-8 w-8",
                                            value === template.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
