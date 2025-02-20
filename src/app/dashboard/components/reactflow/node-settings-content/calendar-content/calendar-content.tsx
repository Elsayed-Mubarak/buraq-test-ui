import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import DateSelection from "./date-selection"
import ExcludeDates from "./exclude-dates"

function CalendarSettingsContent() {
    return (
        <>
            <NodeSettingsHeader icon={svgs.calender} text="Calendar 1" />
            <h3 className="text-sm font-semibold text-gray-500">
                Opens a calendar UI in the chat interface through which the user can select their desired date
            </h3>

            <Tabs defaultValue="date-selection" className="w-full mt-4">
                <TabsList>
                    <TabsTrigger
                        value="date-selection"
                        className="data-[state=active]:bg-blue-100 text-base font-semibold px-4
                        text-center data-[state=active]:text-blue-500 text-gray-500 bg-opacity-40 bg-gray-100 
                        data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                        Date selection
                    </TabsTrigger>
                    <TabsTrigger
                        value="exclude-dates"
                        className="data-[state=active]:bg-blue-100 text-base font-semibold px-4
                        text-center data-[state=active]:text-blue-500 text-gray-500 bg-opacity-40 bg-gray-100
                        data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                        Exclude dates
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="date-selection">
                    <DateSelection />
                </TabsContent>
                <TabsContent value="exclude-dates">
                    <ExcludeDates />
                </TabsContent>
            </Tabs>

        </>
    )
}






export default CalendarSettingsContent