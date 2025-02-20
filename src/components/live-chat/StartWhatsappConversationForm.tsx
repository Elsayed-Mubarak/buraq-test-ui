import { useEffect, useMemo, useState } from 'react'
import SelectTemplate from './SelectTemplate'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { v4 as uuidv4 } from "uuid"
import { Info } from 'lucide-react';
import ToolTip from '../shared/ToolTip';

// function extractPlaceholdersFromTemplate(template: any) {


//         let result: { type: string; placeholders: { name: string; type: string }[] }[] = [];

//         if (!template || !Array.isArray(template.components)) {
//             return result;
//         }
//         template.components.forEach((component: any) => {
//             if (component.type === "HEADER" && component.example?.header_text) {
//                 result.push({
//                     type: "HEADER",
//                     placeholders: component.example.header_text.flatMap((item: any) =>
//                         typeof item === "string" ? [{ name: item, type: "HEADER" }] : []
//                     ),
//                 });
//             }
//             if (component.type === "BODY" && component.example?.body_text) {
//                 result.push({
//                     type: "BODY",
//                     placeholders: component.example.body_text.flatMap((item: any) =>
//                         Array.isArray(item) ? item.filter(i => typeof i === "string").map(i => ({ name: i, type: "BODY" })) : []
//                     ),
//                 });
//             }
//             if (component.type === "BUTTONS" && Array.isArray(component.buttons)) {
//                 component.buttons.forEach((button: any) => {
//                     if (button.type === "URL" && Array.isArray(button.example)) {
//                         result.push({
//                             type: "BUTTONS",
//                             placeholders: button.example.filter((item: any) => typeof item === "string").map((i: any) => ({ name: i, type: "BUTTONS" })),
//                         });
//                     }
//                 });
//             }
//         });

//         return result;


// }
function extractPlaceholdersFromTemplate(template: any) {
    let result: { type: string; placeholders: { name: string; type: string }[] }[] = [];

    if (!template || !Array.isArray(template.components)) {
        return result;
    }

    if (template.parameter_format === 'POSITIONAL') {
        template.components.forEach((component: any) => {
            if (component.type === "HEADER" && component.example?.header_text) {
                result.push({
                    type: "HEADER",
                    placeholders: component.example.header_text.flatMap((item: any) =>
                        typeof item === "string" ? [{ name: item, type: "HEADER" }] : []
                    ),
                });
            }
            if (component.type === "BODY" && component.example?.body_text) {
                result.push({
                    type: "BODY",
                    placeholders: component.example.body_text.flatMap((item: any) =>
                        Array.isArray(item) ? item.filter(i => typeof i === "string").map(i => ({ name: i, type: "BODY" })) : []
                    ),
                });
            }
            if (component.type === "BUTTONS" && Array.isArray(component.buttons)) {
                component.buttons.forEach((button: any) => {
                    if (button.type === "URL" && Array.isArray(button.example)) {
                        result.push({
                            type: "BUTTONS",
                            placeholders: button.example.filter((item: any) => typeof item === "string").map((i: any) => ({ name: i, type: "BUTTONS" })),
                        });
                    }
                });
            }
        });
    } else if (template.parameter_format === 'NAMED') {
        template.components.forEach((component: any) => {
            if (component.type === "HEADER" && component.example?.header_text_named_params) {
                result.push({
                    type: "HEADER",
                    placeholders: component.example.header_text_named_params.map((param: any) => ({
                        name: param.param_name,
                        type: "HEADER"
                    })),
                });
            }
            if (component.type === "BODY" && component.example?.body_text_named_params) {
                result.push({
                    type: "BODY",
                    placeholders: component.example.body_text_named_params.map((param: any) => ({
                        name: param.param_name,
                        type: "BODY"
                    })),
                });
            }
            if (component.type === "BUTTONS" && Array.isArray(component.buttons)) {
                component.buttons.forEach((button: any) => {
                    if (button.type === "URL" && Array.isArray(button.example)) {
                        const placeholders = button.example.flatMap((url: string) => {
                            const matches = url.match(/{{(.*?)}}/g);
                            return matches ? matches.map(match => ({
                                name: match.replace(/{{|}}/g, ""),
                                type: "BUTTONS"
                            })) : [];
                        });

                        if (placeholders.length > 0) {
                            result.push({
                                type: "BUTTONS",
                                placeholders,
                            });
                        }
                    }
                });
            }
        });
    }

    return result;
}

type Props = {
    channel: "whatsapp" | "sms";
    phone: string;
    setChannel: React.Dispatch<React.SetStateAction<"whatsapp" | "sms">>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setTemplate: any,
    template: any,
    setConversationVariables: any,
    variblesErrors: any;
    setVariblesErrors: any
}

export default function StartWhatsappConversationForm({
    setTemplate,
    template,
    channel,
    phone,
    setChannel,
    setPhone,
    setConversationVariables,
    variblesErrors,
    setVariblesErrors
}: Props) {

    const [inputValues, setInputValues] = useState<any[]>([]);

    const extractedPlaceholders = useMemo(() => extractPlaceholdersFromTemplate(template), [template]);

    useEffect(() => {
        const initialValues: { id: string; name: string; type: string; value: string }[] = [];

        extractedPlaceholders.forEach(({ placeholders }) => {
            placeholders.forEach(({ name, type }: any) => {
                if (name) {
                    initialValues.push({
                        id: uuidv4(),
                        name,
                        type,
                        value: "",
                    });
                }
            });
        });
        setInputValues(initialValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extractedPlaceholders]);

    const handleInputChange = (id: string, newValue: string) => {
        setInputValues((prevValues) =>
            prevValues.map((item) =>
                item.id === id ? { ...item, value: newValue } : item
            )
        );
    };

    useEffect(() => {
        setConversationVariables(inputValues)
    }, [inputValues, setConversationVariables])
    return (
        <div className="max-h-[360px] overflow-auto pr-2">
            <div className="mb-4">
                <div className="mb-1 text-sm font-semibold text-black">
                    Channel
                </div>
                <select value={channel} onChange={(e) => setChannel(e.target.value as "whatsapp" | "sms")} className="w-full cursor-pointer rounded-lg border border-primary-50 p-2 text-sm font-semibold text-secondary-50 outline-none">
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                </select>
            </div>
            <div className="mb-4">
                <div className="mb-1 text-sm font-semibold text-black">
                    From
                </div>

                <select className="w-full cursor-pointer rounded-lg border border-primary-50 p-2 text-sm font-semibold text-secondary-50 outline-none">
                    <option value="whatsapp">+966551090662</option>
                </select>
            </div>
            <div className="mb-4 select-none">
                <label htmlFor="to" className="mb-1 text-sm font-semibold text-black">
                    To
                </label>
                <PhoneInput
                    country={"sa"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    inputStyle={{
                        display: "block",
                        width: "100%",
                        color: "#000",
                        height: "35px",
                        border: "0",
                    }}
                    buttonStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                        border: "0",
                    }}
                    containerStyle={{
                        border: "1px solid #e4e4e4",
                        borderRadius: "6px"
                    }}
                    dropdownStyle={{
                        maxWidth: "280px",
                        maxHeight: "140px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        borderRadius: "6px",
                        border: "1px solid #e4e4e4",
                    }}
                />
            </div>
            <div className="mb-4">
                <div className="mb-1 text-sm font-semibold text-black">
                    Template
                </div>
                <SelectTemplate setTemplate={setTemplate} template={template} />
            </div>
            {inputValues.length > 0 && (
                <div className="border-t-2 border-primary-50 pt-2">
                    <div className="mb-2 font-semibold flex items-center gap-1">
                        <div>Values for variables</div>
                        <span>
                            <ToolTip title='asas'>
                                <Info className='h-4 w-4' />
                            </ToolTip>
                        </span>
                    </div>
                    {inputValues.map(({ id, name, value }) => (
                        <div key={id} className="mb-4">
                            <label className="mb-1 text-sm font-semibold">{`{{${name}}}`}</label>
                            <input
                                placeholder='Enter value'
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(id, e.target.value)}
                                className={`w-full rounded-lg border  p-2 text-sm font-semibold text-secondary-50 outline-none hover:border-primary-600 focus:border-primary-600 ${(variblesErrors && value === "") ? "border-[#f00]" : "border-primary-50"}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}