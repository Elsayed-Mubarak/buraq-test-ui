// // // import './index.css';

// // // import { Calendar } from "@/app/dashboard/components/ui/calendar";
// // // import { Button } from "@/components/ui/button";
// // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// // // import { cn } from "@/lib/utils";
// // // import { addDays, format } from "date-fns";
// // // import { useState } from "react";
// // // import { DateRange } from "react-day-picker";
// // // import { GoArrowRight } from "react-icons/go";

// // // interface Props {
// // //     className?: string;
// // //     onChange: (...props: any[]) => void;
// // //     value: {
// // //         from: string,
// // //         to: string,
// // //     }
// // // }

// // // export function DatePickerWithRange({
// // //     className,
// // // }: Props) {

// // //     const [date, setDate] = useState<DateRange | undefined>({
// // //         from: new Date(2022, 0, 20),
// // //         to: addDays(new Date(2022, 0, 20), 20),
// // //     });

// // //     return (
// // //         <div className={cn("", className)}>
// // //             <Popover>
// // //                 <PopoverTrigger asChild>
// // //                     <Button
// // //                         id="date"
// // //                         variant="outline"
// // //                         className={cn(
// // //                             "flex items-center justify-between text-left font-normal w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm !h-8",
// // //                             !date && "text-muted-foreground"
// // //                         )}
// // //                     >
// // //                         {date?.from ? (
// // //                             date.to ? (
// // //                                 <span className="flex items-center gap-2 text-sm text-nodeSettings">
// // //                                     {format(date.from, "dd-MMM-yy")}
// // //                                     <GoArrowRight className="text-nodeSettings" />
// // //                                     {format(date.to, "dd-MMM-yy")}
// // //                                 </span>
// // //                             ) : (
// // //                                 format(date.from, "dd-MMM-yy")
// // //                             )
// // //                         ) : (
// // //                             <span>Pick a date</span>
// // //                         )}
// // //                     </Button>
// // //                 </PopoverTrigger>
// // //                 <PopoverContent className="w-full p-0 bg-white rounded-lg shadow-lg">
// // //                     <Calendar
// // //                         mode="range"
// // //                         defaultMonth={date?.from}
// // //                         selected={date}
// // //                         onSelect={setDate}
// // //                         numberOfMonths={1}
// // //                         className="rounded-lg border shadow-md"
// // //                     />
// // //                 </PopoverContent>
// // //             </Popover>
// // //         </div>
// // //     );
// // // }



// // import "./index.css";

// // import { Calendar } from "@/app/dashboard/components/ui/calendar";
// // import { Button } from "@/components/ui/button";
// // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// // import { cn } from "@/lib/utils";
// // import { format, parse } from "date-fns";
// // import { useState, useEffect } from "react";
// // import { DateRange } from "react-day-picker";
// // import { GoArrowRight } from "react-icons/go";

// // interface Props {
// //     className?: string;
// //     onChange: (updatedDate: { from: string; to: string }) => void;
// //     value: {
// //         from: string;
// //         to: string;
// //     };
// // }

// // export function DatePickerWithRange({ className, onChange, value }: Props) {
// //     // Parse the initial `value` and set it as the state
// //     const [date, setDate] = useState<DateRange | undefined>(() => ({
// //         from: value.from ? parse(value.from, "dd-MMM-yy", new Date()) : undefined,
// //         to: value.to ? parse(value.to, "dd-MMM-yy", new Date()) : undefined,
// //     }));

// //     // Update parent when date changes
// //     useEffect(() => {
// //         if (date?.from && date?.to) {
// //             onChange({
// //                 from: format(date.from, "dd-MMM-yy"),
// //                 to: format(date.to, "dd-MMM-yy"),
// //             });
// //         }
// //     }, [date]);

// //     return (
// //         <div className={cn("", className)}>
// //             <Popover>
// //                 <PopoverTrigger asChild>
// //                     <Button
// //                         id="date"
// //                         variant="outline"
// //                         className={cn(
// //                             "flex items-center justify-between text-left font-normal w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm !h-8",
// //                             !date?.from && "text-muted-foreground"
// //                         )}
// //                     >
// //                         {date?.from ? (
// //                             date.to ? (
// //                                 <span className="flex items-center gap-2 text-sm text-nodeSettings">
// //                                     {format(date.from, "dd-MMM-yy")}
// //                                     <GoArrowRight className="text-nodeSettings" />
// //                                     {format(date.to, "dd-MMM-yy")}
// //                                 </span>
// //                             ) : (
// //                                 format(date.from, "dd-MMM-yy")
// //                             )
// //                         ) : (
// //                             <span>Pick a date</span>
// //                         )}
// //                     </Button>
// //                 </PopoverTrigger>
// //                 <PopoverContent className="w-full p-0 bg-white rounded-lg shadow-lg">
// //                     <Calendar
// //                         mode="range"
// //                         defaultMonth={date?.from}
// //                         selected={date}
// //                         onSelect={setDate}
// //                         numberOfMonths={1}
// //                         className="rounded-lg border shadow-md"
// //                     />
// //                 </PopoverContent>
// //             </Popover>
// //         </div>
// //     );
// // }

// import "./index.css";

// import { Calendar } from "@/app/dashboard/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { format, parse, isWithinInterval, isSameDay } from "date-fns";
// import { useState, useEffect } from "react";
// import { DateRange, DayPicker } from "react-day-picker";
// import { GoArrowRight } from "react-icons/go";

// interface Props {
//     className?: string;
//     onChange: (updatedDate: { from: string; to: string }) => void;
//     value: {
//         from: string;
//         to: string;
//     };
// }

// export function DatePickerWithRange({ className, onChange, value }: Props) {
//     // Parse the initial `value` and set it as the state
//     const [date, setDate] = useState<DateRange | undefined>(() => ({
//         from: value.from ? parse(value.from, "dd-MMM-yy", new Date()) : undefined,
//         to: value.to ? parse(value.to, "dd-MMM-yy", new Date()) : undefined,
//     }));

//     // Update parent when date changes
//     useEffect(() => {
//         if (date?.from && date?.to) {
//             onChange({
//                 from: format(date.from, "dd-MMM-yy"),
//                 to: format(date.to, "dd-MMM-yy"),
//             });
//         }
//     }, [date]);

//     return (
//         <div className={cn("", className)}>
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         id="date"
//                         variant="outline"
//                         className={cn(
//                             "flex items-center justify-between text-left font-normal w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm !h-8",
//                             !date?.from && "text-muted-foreground"
//                         )}
//                     >
//                         {date?.from ? (
//                             date.to ? (
//                                 <span className="flex items-center gap-2 text-sm text-nodeSettings">
//                                     {format(date.from, "dd-MMM-yy")}
//                                     <GoArrowRight className="text-nodeSettings" />
//                                     {format(date.to, "dd-MMM-yy")}
//                                 </span>
//                             ) : (
//                                 format(date.from, "dd-MMM-yy")
//                             )
//                         ) : (
//                             <span>Pick a date</span>
//                         )}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-full p-0 bg-white rounded-lg shadow-lg">
//                     <Calendar
//                         mode="range"
//                         defaultMonth={date?.from}
//                         selected={date}
//                         onSelect={setDate}
//                         numberOfMonths={1}
//                         className="rounded-lg border shadow-md"
//                         modifiers={{
//                             selectedRange: (day) =>
//                                 date?.from &&
//                                 date?.to &&
//                                 isWithinInterval(day, { start: date.from, end: date.to }),
//                             selectedStart: (day) => date?.from && isSameDay(day, date.from),
//                             selectedEnd: (day) => date?.to && isSameDay(day, date.to),
//                         }}
//                         modifiersClassNames={{
//                             selectedRange: "bg-blue-100 text-blue-700",
//                             selectedStart: "bg-blue-500 text-white rounded-l-md",
//                             selectedEnd: "bg-blue-500 text-white rounded-r-md",
//                         }}
//                     />
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// }



import "./index.css";

import { Calendar } from "@/app/dashboard/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parse, isWithinInterval, isSameDay } from "date-fns";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { GoArrowRight } from "react-icons/go";

interface Props {
    className?: string;
    onChange: (updatedDate: { from: string; to: string }) => void;
    value: {
        from: string;
        to: string;
    };
}

export function DatePickerWithRange({ className, onChange, value }: Props) {
    // Parse the initial `value` and set it as the state
    const [date, setDate] = useState<DateRange | undefined>(() => ({
        from: value.from ? parse(value.from, "dd-MMM-yy", new Date()) : undefined,
        to: value.to ? parse(value.to, "dd-MMM-yy", new Date()) : undefined,
    }));

    // Update parent when date changes
    useEffect(() => {
        if (date?.from && date?.to) {
            onChange({
                from: format(date.from, "dd-MMM-yy"),
                to: format(date.to, "dd-MMM-yy"),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    return (
        <div className={cn("", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="outline"
                        className={cn(
                            "flex items-center justify-between text-left font-normal w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm !h-8",
                            !date?.from && "text-muted-foreground"
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <span className="flex items-center gap-2 text-sm text-nodeSettings">
                                    {format(date.from, "dd-MMM-yy")}
                                    <GoArrowRight className="text-nodeSettings" />
                                    {format(date.to, "dd-MMM-yy")}
                                </span>
                            ) : (
                                format(date.from, "dd-MMM-yy")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white rounded-lg shadow-lg">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                        className="rounded-lg border shadow-md"
                        modifiers={{
                            selectedRange: (day) =>
                                date?.from && date?.to
                                    ? isWithinInterval(day, { start: date.from, end: date.to })
                                    : false, // Ensures a boolean return
                            selectedStart: (day) => (date?.from ? isSameDay(day, date.from) : false),
                            selectedEnd: (day) => (date?.to ? isSameDay(day, date.to) : false),
                        }}
                        modifiersClassNames={{
                            selectedRange: "bg-blue-100 text-blue-700",
                            selectedStart: "bg-blue-500 text-white rounded-l-md",
                            selectedEnd: "bg-blue-500 text-white rounded-r-md",
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
