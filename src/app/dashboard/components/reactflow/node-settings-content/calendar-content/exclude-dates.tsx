import { DatePickerWithRange } from "../../../DatePickerWithRange"
import { DatePicker } from "../../../ui/DatePicker"
import { Label } from "../../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../ui/select"

function ExcludeDates() {
    return (
        <div className="flex flex-col">
            <Select>
                <p className="text-sm font-semibold text-[#092445]">Exclude Days</p>
                <SelectTrigger className="ring-0 ring-transparent focus:outline-none outline-none">
                    Select the days to be excluded
                </SelectTrigger>
                <SelectContent className="bg-white w-full">
                    <SelectItem className="capitalize" value="mon">Monday</SelectItem>
                    <SelectItem className="capitalize" value="tes">Tuesday</SelectItem>
                    <SelectItem className="capitalize" value="wes">Wensday</SelectItem>
                    <SelectItem className="capitalize" value="thr">Thrusday</SelectItem>
                    <SelectItem className="capitalize" value="fri">Friday</SelectItem>
                    <SelectItem className="capitalize" value="sat">Saturday</SelectItem>
                    <SelectItem className="capitalize" value="sun">Suunday</SelectItem>
                </SelectContent>
                <p className="text-xs font-semibold text-gray-500">
                    Click on the calendar icon to select a specific dateSelect days that are to be excluded from the calendar
                </p>
            </Select>

            <div className="mt-6">
                <p className="text-sm text-[#092445] font-semibold mb-1">Exclude Specific Dates</p>
                <DatePicker/>
                <p className="text-xs font-semibold text-gray-500 mt-1">Click on the calendar icon to select a specific date</p>
            </div>
        </div>
    )
}

export default ExcludeDates