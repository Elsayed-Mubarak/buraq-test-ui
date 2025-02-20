import Link from "next/link";
import { useEffect, useState } from "react";
import useFlowStore from "../../../reactflowstate/store";
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from "../../../../ui/select";
import NodeSettingsHeader from "../../../node-settings-bar/node-settings-header";
import TriggerFiltersInbound from "./trigger-filters-inbound";
import TriggerConfigContent from "./trigger-config-inbound";
import { svgs } from "../../../shared/SVG";
import VariableInputForm from "./variable-input-form";
import { ITriggerWhatsappNodeContent } from "@/types/workflows/nodes/trigger/inbound-whatsapp";
import useTriggerWhatsappInbound from "@/stores/nodes/trigger/inbound-whatsapp.store";


//TODO: install react-hook-form for form validation and then integrate th work with backend


function TriggerInboundSettingsContent() {
    const [whatsappNumber, setWhatsappNumber] = useState<string>();
    const [filters, setFilters] = useState(false);
    const [config, setConfig] = useState(false);
    const [store, setStore] = useState(false);

    const {
        fetchPhoneNumber,
        whatsappPhoneNumbers,
        onChangeData
    } = useTriggerWhatsappInbound();

    useEffect(() => {
        fetchPhoneNumber();
    }, [fetchPhoneNumber])

    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ITriggerWhatsappNodeContent;

    return (
        <div className="">
            <NodeSettingsHeader icon={svgs.trigger} text="Bot is triggered if…" />
            <div className="pt-4 pb-8">
                <h5 className="text-sm text-gray-500 font-semibold">
                    Trigger block is the prerequisite with which its underlying conversation flow is executed
                </h5>
                <div className="flex flex-col gap-4">
                    {/* Filters */}
                    <div >
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                name="filters"
                                id="filters"
                                className="rounded"
                                checked={filters}
                                onChange={() => setFilters(!filters)}
                            />
                            <label
                                htmlFor="filters"
                                className="text-sm mx-2"
                            >
                                Add filters to trigger this bot only on certain condition(s)
                            </label>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 mt-1">
                            As your account can have multiple bots, you could enable this option and define conditions based on which this bot&apos;s flow is to be triggered. It is not mandatory.
                        </p>
                        {filters && <TriggerFiltersInbound />}
                    </div>


                    {/* Config */}
                    <div>
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                name="config"
                                id="config"
                                className="rounded"
                                checked={config}
                                onChange={() => setConfig(!config)}
                            />
                            <label
                                htmlFor="config"
                                className="text-sm mx-2"
                            >
                                Configure contact subscription status when bot is triggered
                            </label>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 mt-1">
                            Unsubscribed contacts can talk to bot but cannot receive outbound messages until resubscribed.
                        </p>

                        {config && <TriggerConfigContent />}
                    </div>

                    {/* Store */}
                    <div>
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                name="store"
                                id="store"
                                className="rounded"
                                checked={store}
                                onChange={() => setStore(!store)}
                            />
                            <label
                                htmlFor="store"
                                className="text-sm mx-2"
                            >
                                Store/Inject other values into variables
                            </label>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 mt-1">
                            Map the query parameters, or inject data to our code snippet via JSON payload to store the data into variables which you can use in the flow.
                        </p>
                        {store && <VariableInputForm />}
                    </div>

                    {/* Whatsapp Number */}
                    <div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-[#092445] font-medium mb-0.5 text-[15px]">
                                WhatsApp Number
                            </h3>
                            <Link href={'#'} className="text-[13px] text-blue-700 font-medium">+Add</Link>
                        </div>
                        <Select
                            onValueChange={(value) => onChangeData(selectedNode, {
                                ...nodeContent,
                                phoneNumber: value,
                            })}
                        >
                            <SelectTrigger className="hover:border-indigo-500 transition-all ease-linear duration-50 ring-transparent ring-0 ">
                                {nodeContent?.phoneNumber || "Select"}
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {whatsappPhoneNumbers.map((item, idx) => (
                                    <SelectItem
                                        key={idx}
                                        value={item?.phoneNumber}
                                        className="text-[#092445] font-semibold cursor-pointer"
                                    >
                                        {item.phoneNumber}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {whatsappNumber &&
                            <p className="text-xs font-semibold text-[#F1B000] flex items-center gap-1 mt-1">
                                <span>Connected number;</span>
                                <span>{whatsappNumber}</span>
                            </p>
                        }
                        <p className="text-xs font-semibold text-gray-400 mt-1">
                            Incoming message from this WhatsApp Number will trigger this WhatsApp bot. You can add your WhatsApp API configuration from the
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TriggerInboundSettingsContent