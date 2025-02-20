import * as React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "../../../ui/calendar";
import { cn } from "@/lib/utils";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";

type TimeUnit = "hours" | "days";
type TimePeriod = "AM" | "PM";
type Timezone = "GMT+02:00 Africa/Cairo" | "GMT+01:00 Europe/London" | "GMT-05:00 America/New_York";

type ToggleProps = {
    value: "fixed" | "relative";
    onChange: (value: "fixed" | "relative") => void;
};

const CustomToggle = ({ value, onChange }: ToggleProps) => (
    <div className="w-full flex border rounded-md overflow-hidden">
        {["fixed", "relative"].map((option) => (
            <button
                key={option}
                className={`px-2 py-1 flex-1 text-center transition-colors ${value === option ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
                onClick={() => onChange(option as "fixed" | "relative")}
            >
                {option.toUpperCase()}
            </button>
        ))}
    </div>
);

export default function DelayContentSettings(): JSX.Element {
    const [timeType, setTimeType] = useState<"fixed" | "relative">("fixed");
    const [waitFor, setWaitFor] = useState<string>("1");
    const [unit, setUnit] = useState<TimeUnit>("days");
    const [date, setDate] = useState<Date | undefined>();
    const [hour, setHour] = useState("09");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");
    const [period, setPeriod] = useState<TimePeriod>("AM");
    const [timezone, setTimezone] = useState<Timezone>("GMT+02:00 Africa/Cairo");

    return (
        <>
            <NodeSettingsHeader
                icon={svgs.delay}
                text={"delay"}
                onChange={(e) => { }}
            />

            <Card className="p-4  space-y-4 w-full border-none shadow-none">

                <p className="mt-3 mb-3 text-sm text-gray-600">Contacts wait for the designated date & time before advancing in the flow.</p>

                <CustomToggle value={timeType} onChange={setTimeType} />

                {timeType === "relative" ? (
                    <div className="flex space-x-2 items-center">
                        <Input type="number" value={waitFor} onChange={(e) => setWaitFor(e.target.value)} className="w-16" />
                        <Select value={unit} onValueChange={(value) => setUnit(value as TimeUnit)}>
                            <SelectTrigger className="w-24">
                                <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <div className="space-y-2 mt-4 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <DatePickerDemo onDateChange={setDate} />
                        <div className="flex justify-between items-center space-x-2">
                            <div className="flex flex-col  gap-1 w-20">
                                <label className=" text-sm font-medium text-gray-700">Hours</label>

                                <Select value={hour} onValueChange={setHour}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Hour" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* {[...Array(12).keys()].map((h) => (
                                            <SelectItem key={h} value={String(h + 1).padStart(2, "0")}>{String(h + 1).padStart(2, "0")}</SelectItem>
                                        ))} */}
                                        <SelectItem value="1">
                                            one
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col  gap-1 w-20">
                                <label className=" text-sm font-medium text-gray-700">Minutes</label>
                                <Select value={minute} onValueChange={setMinute}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Minute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* {[...Array(60).keys()].map((m) => (
                                            <SelectItem key={m} value={String(m).padStart(2, "0")}>{String(m).padStart(2, "0")}</SelectItem>
                                        ))} */}
                                        <SelectItem value="1">
                                            one
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col  gap-1 w-20">

                                <label className=" text-sm font-medium text-gray-700">Unit</label>
                                {/* <Select value={period} onValueChange={setPeriod}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="AM/PM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AM">AM</SelectItem>
                                        <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select> */}
                            </div>
                        </div>

                    </div>

                )}

                <h5 className="mt-8 mb-8 text-sm text-gray-500 font-semibold">
                    During the period in which the contacts are waiting to be executed, you can view those contacts below.
                </h5>

                <Button variant="outline" className="w-full">Contacts In Queue (0)</Button>
            </Card>
        </>

    );
}


export function DatePickerDemo({ onDateChange }: { onDateChange: (date: Date | undefined) => void }) {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <p className=" w-full text-center">Pick a date</p>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        onDateChange(selectedDate);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
