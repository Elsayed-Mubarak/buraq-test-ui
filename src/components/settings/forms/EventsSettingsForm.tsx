"use client";

import ReusableCheckbox from "@/components/shared/ReusableCheckbox";
import ReusableSwitch from "@/components/shared/ReusableSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import eventsSettings from "@/constants/settings/events.data";
import useEventsSettings from "@/stores/settings/account/useEventSettings.store";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

function EventsSettingsForm() {
    const [data, setData] = useState<{ events: string[], isActive: boolean, token: string, webhookUrl: string }>({
        events: [],
        isActive: false,
        token: "",
        webhookUrl: "",
    });

    const {
        data: _data,
        fetchData,
        mutateData
    } = useEventsSettings();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (_data) {
            setData({
                events: _data.events,
                isActive: _data.isActive,
                token: _data.token,
                webhookUrl: _data.webhookUrl,
            });
        }
    }, [_data])

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();

            const res = await mutateData(data);

            if (res.status === 200) {
                toast.success("Successfully set up your event")
            }

        } catch (error) {
            toast.error("Failed to set your event")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-xl w-full">
                <div className="flex items-center gap-2 my-4">
                    <Label htmlFor="enable-events" className="text-gray-500 text-base">
                        Enable events
                    </Label>
                    <ReusableSwitch
                        isChecked={data.isActive}
                        setIsChecked={(val) => setData((prev) => ({
                            ...prev,
                            isActive: val
                        }))}
                        id="enable-events"
                    />
                </div>

                <div className="my-4">
                    <Label className="text-gray-500 text-base">Webhook Endpoint</Label>
                    <Input
                        className="rest-input w-full text-gray-500 placeholder:font-medium placeholder:text-lg disabled:bg-gray-200 disabled:hover:border-transparent !text-base "
                        disabled={!data.isActive}
                        onChange={(e) => setData((prev) => ({
                            ...prev,
                            webhookUrl: e.target.value
                        }))}
                        value={data.webhookUrl}
                        placeholder="https://"
                    />
                    <p className="text-xs text-gray-500">
                        Enter your webhook endpoint where the selected events will be sent.
                    </p>
                </div>

                <div className="my-4">
                    <Label className="text-gray-500 text-base">Webhook Endpoint</Label>
                    <Input
                        className="rest-input w-full text-gray-500 placeholder:font-medium placeholder:text-lg disabled:bg-gray-200 disabled:hover:border-transparent !text-base "
                        disabled={!data.isActive}
                        onChange={(e) => setData((prev) => ({
                            ...prev,
                            token: e.target.value
                        }))}
                        value={data.token}
                        placeholder="Add a token to authenticate"
                    />
                    <p className="text-xs text-gray-500">
                        As soon as you enter the webhook URL, we will send a HTTP POST request with the above token, and your endpoint must respond with the token value.
                    </p>
                </div>
            </div>

            {eventsSettings.map((item) => (
                <div key={item.id} className="my-2 flex items-end gap-2">
                    <div className="mb-1">
                        <ReusableCheckbox
                            isChecked={data?.events?.includes(item.value) || false}
                            setIsChecked={(isChecked) => {
                                setData((prev: any) => {
                                    const events = isChecked
                                        ? [...prev.events, item.value]
                                        : prev.events.filter((event: any) => event !== item.value);
                                    return { ...prev, events };
                                });
                            }}
                            disabled={!data.isActive}
                        />
                    </div>

                    <div className="mt-2">
                        <Label className="text-nodeSettings text-base">{item.label}</Label>
                        <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                </div>
            ))}

            <Button
                disabled={!data.isActive}
                type="submit"
                className="rest-input px-10 py-2 bg-blue-700 text-white font-medium block w-[80px] disabled:bg-gray-500 text-base mt-5"
            >
                Save
            </Button>

        </form>
    )
}

export default EventsSettingsForm