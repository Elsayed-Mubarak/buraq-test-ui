"use client"
import OperationHours from "@/components/settings/OperationHours";
import ResuableButton from "@/components/shared/ReusableButton"
import ReusableCheckbox from "@/components/shared/ReusableCheckbox"
import ReusableSwitch from "@/components/shared/ReusableSwitch"
import SpinnerFull from "@/components/shared/SpinnerFull";
import { getHumanHandoverSettings, updateHumanHandoverSettings } from "@/service/liveChatSettingsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = {}

const formatSchedule = (schedule: any) => {
    const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ];

    const timeToMinutes = (time: any) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    return daysOfWeek.map((day) => {
        const { enabled, startTime, endTime } = schedule[day];
        return {
            day: day.charAt(0).toUpperCase() + day.slice(1), // Capitalize the day
            isChecked: enabled,
            range: [timeToMinutes(startTime), timeToMinutes(endTime)],
        };
    });
};

const formatToSchedule = (inputArray: any) => {
    const minutesToTime = (minutes: any) => {
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const mins = (minutes % 60).toString().padStart(2, '0');
        return `${hours}:${mins}`;
    };

    return inputArray.reduce((acc: any, { day, isChecked, range }: { day: string, isChecked: boolean, range: number[] }) => {
        const dayKey = day.toLowerCase();
        acc[dayKey] = {
            enabled: isChecked,
            startTime: minutesToTime(range[0]),
            endTime: minutesToTime(range[1]),
        };
        return acc;
    }, {});
};

export default function Page({ }: Props) {
    const queryClient = useQueryClient();
    const [activeHumanHandover, setActiveHumanHandover] = useState(true);
    const [assignedToUnassignedTabOnFailure, setAssignedToUnassignedTabOnFailure] = useState(false);
    const [considerActiveTabsOnly, setConsiderActiveTabsOnly] = useState(false);

    const [days, setDays] = useState([
        { day: 'Monday', isChecked: true, range: [600, 1140] },
        { day: 'Tuesday', isChecked: true, range: [600, 1140] },
        { day: 'Wednesday', isChecked: true, range: [600, 1140] },
        { day: 'Thursday', isChecked: true, range: [600, 1140] },
        { day: 'Friday', isChecked: true, range: [600, 1140] },
        { day: 'Saturday', isChecked: false, range: [600, 1140] },
        { day: 'Sunday', isChecked: false, range: [600, 1140] },
    ]);

    const [state, setState] = useState(
        days.map((d) => ({
            ...d,
            setIsChecked: (checked: boolean) => {
                setState((prev) =>
                    prev.map((item) =>
                        item.day === d.day ? { ...item, isChecked: checked } : item
                    )
                );
            },
            setRange: (range: number[]) => {
                setState((prev) =>
                    prev.map((item) =>
                        item.day === d.day ? { ...item, range: range } : item
                    )
                );
            },
        }))
    );
    const { data, isLoading } = useQuery({
        queryKey: ["humanHandover"],
        queryFn: getHumanHandoverSettings
    })

    const { mutate: updateSettings, isPending } = useMutation({
        mutationFn: updateHumanHandoverSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["humanHandover"] });
            toast.success("Human Handover updated successfully");
        },
        onError: (error: any) => {
            toast.error(error);
        }
    })

    function sendToBackend() {
        const updatedData = state.map(({ day, isChecked, range }) => ({
            day,
            isChecked,
            range,
        }));

        const body = {
            humanHandoverEnabled: activeHumanHandover,
            assignToUnassignedTabOnFailure: assignedToUnassignedTabOnFailure,
            considerActiveTabsOnly: considerActiveTabsOnly,
            operationalHours: formatToSchedule(updatedData),
        }

        updateSettings(body)
    }

    useEffect(() => {
        if (data) {
            setActiveHumanHandover(data.humanHandoverEnabled)
            setAssignedToUnassignedTabOnFailure(data.assignToUnassignedTabOnFailure)
            setConsiderActiveTabsOnly(data.considerActiveTabsOnly)

            setState(formatSchedule(data.operationalHours).map((d: any) => ({
                ...d,
                setIsChecked: (checked: boolean) => {
                    setState((prev) =>
                        prev.map((item) =>
                            item.day === d.day ? { ...item, isChecked: checked } : item
                        )
                    );
                },
                setRange: (range: number[]) => {
                    setState((prev) =>
                        prev.map((item) =>
                            item.day === d.day ? { ...item, range: range } : item
                        )
                    );
                },
            })))
            console.log(formatSchedule(data.operationalHours))
        }
    }, [data])

    if (isLoading) return <SpinnerFull />
    return (
        <div className="py-4 px-12">
            <div className="text-2xl font-semibold text-secondary-50 mb-6">Human Handover preferences</div>
            <div className="mb-3">
                <div className="flex items-center gap-2">
                    <div className="text-lg text-secondary-50">Human Handover</div>
                    <div>
                        <ReusableSwitch isChecked={activeHumanHandover} setIsChecked={setActiveHumanHandover} disabled={false} />
                    </div>
                </div>
                <p className="text-[#808080] text-sm mt-[-8px]">This will allow visitors to speak with available human agents</p>
            </div>
            <div>
                <div className="select-none">
                    <ReusableCheckbox
                        isChecked={assignedToUnassignedTabOnFailure}
                        setIsChecked={setAssignedToUnassignedTabOnFailure}
                        label={`Assign conversations to the " Unassigned" tab if the human handover action fails due to unavailability of the team`}
                        fontSize="14px"
                        labelColor="#092445"
                        disabled={false}
                        size="small"
                    />
                </div>
                <div className="select-none">
                    <ReusableCheckbox
                        isChecked={considerActiveTabsOnly}
                        setIsChecked={setConsiderActiveTabsOnly}
                        label={`Assignment rules only consider users who have an active Buraq tab on their browser`}
                        fontSize="14px"
                        labelColor="#092445"
                        disabled={false}
                        size="small"
                    />
                </div>
            </div>
            <hr className="my-4" />
            <div className="mb-3">
                <div className="flex items-center gap-2">
                    <div className="text-lg text-secondary-50">Operational Hours</div>
                    <span className="text-[#808080] text-sm">(GMT+02:00) Africa/Cairo</span>
                </div>
                <div className="text-sm text-[#808080]">Human Handover will be effective for the selected days and time ranges</div>
            </div>
            <div>
                {state.map((dayState, idx) => (
                    <OperationHours
                        key={idx}
                        day={dayState.day}
                        isChecked={dayState.isChecked}
                        setIsChecked={dayState.setIsChecked}
                        setRange={dayState.setRange}
                        range={dayState.range}
                        activeHumanHandover={activeHumanHandover}
                    />
                ))}
            </div>

            <ResuableButton disabled={!activeHumanHandover || isPending} onClick={() => sendToBackend()}>{
                isPending ? "Saving..." : "Save"}</ResuableButton>
        </div>
    )
}
