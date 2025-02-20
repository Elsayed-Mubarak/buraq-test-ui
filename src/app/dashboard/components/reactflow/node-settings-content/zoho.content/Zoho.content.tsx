import CustomSelect from "@/components/workflow/nodeSettings/CustomSelect";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header"
import { svgs } from "../../shared/SVG"
import { zohoAddAccountLink, zohoFileds } from "@/constants"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useFlowStore from "../../reactflowstate/store";
import { IZohoCRMWhatsappNodeContent } from "@/types/workflows/nodes/zoho-crm/in-bound/whatsapp.";
import ActionButton from "@/components/workflow/nodeSettings/ActionButton";
import useZohoWhatsappStore from "@/stores/nodes/zoho-crm/inbound-whatsapp.store";

const dummyAccounts = [
    { id: '1', email: 'd@d.com', value: 'd', name: 'd' },
    { id: '2', email: 'a@a.com', value: 'a', name: 'a' }
]

function ZohoContentSettings() {
    const handlePopup = () => {
        window.open(zohoAddAccountLink, '_app', 'width=800,height=850');
    }

    const { addZohoField, onChangeAccount, deleteZohoField, onChangeData } = useZohoWhatsappStore();
    const { selectedNode } = useFlowStore();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as IZohoCRMWhatsappNodeContent;

    return (
        <div>
            <NodeSettingsHeader icon={svgs.zoho} text="Zoho CRM 1" />

            <h3 className="node-settings-desc my-3">
                Create a lead on your Zoho CRM account and map fields with Buraq variables
            </h3>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm text-blue-500">Select the account</h4>
                    <button onClick={handlePopup} className="text-blue-500 text-sm">+Add Account</button>
                </div>
                <CustomSelect
                    data={dummyAccounts}
                    onChange={(val) => onChangeAccount(selectedNode, {
                        account: val as string
                    })}
                    triggerName={nodeContent.account || "Selec an account"}
                />
            </div>

            {nodeContent.account && (
                <div className="mt-5">
                    <h3 className="text-nodeSettings text-sm">
                        Please map the required Zoho CRM fields with the respective variables
                    </h3>
                    <p className="my-2 text-xs text-gray-500">
                        Prefix and end a variable name with # to use its value,or type as usual to pass a static value
                    </p>

                    <div>
                        <div className="flex items-center gap-2 my-2">
                            <div className="w-1/2">
                                <Select disabled>
                                    <SelectTrigger disabled className='ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent capitalize disabled:pointer-events-none pointer-events-none bg-[#f3f3f3] text-nodeSettings'>
                                        Last Name
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="last-name">Last Name</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <Input
                                    value={nodeContent.zohoFileds[0].value as string}
                                    onChange={(e) => onChangeData(selectedNode, nodeContent.zohoFileds[0].id, {
                                        value: e.target.value as string
                                    })}
                                    className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                                />
                            </div>
                        </div>

                        {nodeContent.zohoFileds.length > 1 && nodeContent.zohoFileds.slice(1).map((item) => (
                            <div className="flex items-center gap-2 my-2 relative" key={item.id}>
                                <div className="w-1/2">
                                    <CustomSelect
                                        data={zohoFileds}
                                        onChange={(val) => onChangeData(selectedNode, item.id, {
                                            filed: val as string
                                        })}
                                        triggerName="Select"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Input
                                        value={item.value as string}
                                        onChange={(e) => onChangeData(selectedNode, item.id, {
                                            value: e.target.value as string
                                        })}
                                        className="h-[34px] ring-0 ring-transparent outline-none focus:outline-none focus:ring-0 focus:ring-transparent border-gray-300 hover:border-indigo-500"
                                    />
                                </div>

                                <ActionButton
                                    action="delete"
                                    handleClick={() => deleteZohoField(selectedNode, item.id)}
                                />
                            </div>
                        ))}

                        <div className="my-3">
                            <ActionButton
                                action="add"
                                handleClick={() => addZohoField(selectedNode)}
                                text="Zoho CRM field"
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ZohoContentSettings