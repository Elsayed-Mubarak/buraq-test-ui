"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../../../../lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Calendar } from "./calendar"

export function DatePicker() {
    const [dates, setDates] = React.useState<Date[]>([]) 

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal w-full flex flex-wrap overflow-y-auto",
                        dates.length === 0 && "text-muted-foreground",
                        dates.length > 4 && "h-[100px]"
                    )}
                >
                    <CalendarIcon className="w-4 h-4 me-auto"/>
                    {dates.length > 0 ? (
                        dates.map((date, index) => (
                            <span key={index} className="rounded p-1 bg-gray-200 mx-1 mb-1 text-[#092445] inline-block font-semibold">
                                {format(date, "dd-MMM")}
                            </span>
                        ))
                    ) : (
                        <span className="me-auto">Pick dates</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    className="bg-white"
                    aria-multiselectable
                    mode="multiple" 
                    selected={dates}
                    onSelect={(value: any) => {
                        if (Array.isArray(value)) {
                            setDates(value as Date[])
                        } else if (value instanceof Date) {
                            setDates([value])
                        }
                    }}
                    initialFocus 
                />
            </PopoverContent>
        </Popover>
    )
}
