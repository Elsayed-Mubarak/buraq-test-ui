import { addDays, format } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { cn } from "../../../lib/utils"
import { Calendar } from "./ui/calendar"
import { GoArrowRight } from "react-icons/go";

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal w-full",
                            !date && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <span className="flex items-center gap-2 justify-start text-sm font-semibold">
                                    {format(date.from, "LLL dd, y")}
                                    <GoArrowRight />
                                    {format(date.to, "LLL dd, y")}
                                </span>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


