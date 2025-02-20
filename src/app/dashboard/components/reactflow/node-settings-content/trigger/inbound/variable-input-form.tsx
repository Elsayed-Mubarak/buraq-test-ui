import { Input } from '../../../../ui/input';
import ActionButton from '@/components/workflow/nodeSettings/ActionButton';
import useFlowStore from '../../../reactflowstate/store';
import { ITriggerWhatsappNodeContent } from '@/types/workflows/nodes/trigger/inbound-whatsapp';
import useTriggerWhatsappInbound from '@/stores/nodes/trigger/inbound-whatsapp.store';
import VariablesDropdown from '@/components/workflow/nodeSettings/VariablesDropdown';


const VariableInputForm = () => {
    const { selectedNode, activeVariables } = useFlowStore();

    const { addVariable, deleteVaraible, onChangeVariable } = useTriggerWhatsappInbound();

    if (!selectedNode) return null;

    const nodeContent = selectedNode.data.nodeContent as ITriggerWhatsappNodeContent;

    return (
        <div className="flex flex-col space-y-2 mt-3">
            <div className='flex items-center justify-start gap-8'>
                <p className='text-xs text-nodeSettings w-1/2 '>
                    Object Path/Parameter
                </p>
                <p className='text-sm text-nodeSettings w-1/2'>
                    value
                </p>
            </div>
            {nodeContent.storeVariables.injectVariables.map((item, index) => (
                <div key={index} className="flex gap-2 relative">
                    <div className="w-1/2">
                        <Input
                            type="text"
                            value={item.key}
                            onChange={(e) => onChangeVariable(selectedNode, item.id, {
                                ...item,
                                key: e.target.value
                            })
                            }
                            className="rest-input"
                        />
                    </div>
                    <div className="w-1/2">
                        <div className='bg-white relative'>
                            <VariablesDropdown
                                triggerName={item.variable || "variable"}
                                onChange={(e) => onChangeVariable(selectedNode, item.id, {
                                    ...item,
                                    variable: e.target.value
                                })}
                            />
                        </div>

                    </div>
                    {nodeContent.storeVariables.injectVariables.length > 1 && (
                        <ActionButton
                            action="delete"
                            handleClick={() => deleteVaraible(selectedNode, item.id)}
                        />
                    )}
                </div>
            ))}

            <ActionButton
                action='add'
                handleClick={() => addVariable(selectedNode)}
                text='Add'
            />
        </div>
    );
};

export default VariableInputForm;
