"use client"
import CreateTemplateHeader from '@/components/channel/whatsApp/templateMessages/createTemplate/CreateTemplateHeader';
import TemplateEditor from '@/components/channel/whatsApp/templateMessages/createTemplate/TemplateEditor';
import TemplatePreview from '@/components/channel/whatsApp/templateMessages/createTemplate/TemplatePreview';
import { createTemplate, reriveMediaHandler } from '@/service/templateServices';
import useCreateTemplateStore from '@/stores/useCreateTemplate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


function transformString(input: any) {
    return input.toLowerCase().replace(/ /g, '_');
}
function findPlaceholders(text: any) {
    const regex = /\{\{(.*?)\}\}/g;
    let matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

type Props = {}

export default function CreateTemplatePage({ }: Props) {
    const queryClient = useQueryClient()
    const {
        templateName,
        phoneNumber,
        language,
        category,
        buttons,
        headerObject,
        bodyObject,
        footerObject,
        resetStore
    } = useCreateTemplateStore()

    const [errorsObject, setErrorsObject] = useState<any>({
        templateNameError: false,
        phoneNumberError: false,
        categoryError: false,
        bodyError: false,
        buttonsError: [],
    })

    const { mutate: createNewTemplate, isPending } = useMutation({
        mutationFn: createTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["approved-templates"] })
            resetStore()
            toast.success("Template submitted successfully, please wait for approval")
        },
        onError: (error: any) => {
            toast.error("Failed to create template:", error)
        }
    })

    async function handleCreateTemplate() {

        let header;
        let footer;
        let body;
        let mediaHandlerResponse;

        if (headerObject.type === "image" || headerObject.type === "video" || headerObject.type === "document") {

            const formData = new FormData();
            formData.append("file", headerObject.value);
            formData.append("phoneNumber", phoneNumber);
            try {
                const response = await reriveMediaHandler(formData)
                mediaHandlerResponse = response.result.h;
                header = {
                    type: "HEADER",
                    format: headerObject.type.toUpperCase(),
                    example: {
                        header_handle: [mediaHandlerResponse]
                    }
                }
            } catch (error) {
                console.log(error)
                toast.error("Failed to handle file")
            }
        }

        if (headerObject.type === "text") {
            const headerValue = headerObject.value;
            const variables = findPlaceholders(headerValue);
            if (variables.length > 0) {
                header = {
                    type: "HEADER",
                    text: headerValue,
                    format: "TEXT",
                    example: {
                        header_text: variables
                    }
                }
            } else {
                header = {
                    type: "HEADER",
                    text: headerObject.value,
                    format: "TEXT",
                }
            }
        }

        if (bodyObject.value.length > 0) {
            const bodyValue = JSON.parse(bodyObject.value)
            const variables = findPlaceholders(bodyValue)
            if (variables.length > 0) {
                body = {
                    type: "BODY",
                    text: bodyValue,
                    example: {
                        body_text: [variables]
                    }
                }
            } else {
                body = {
                    type: "BODY",
                    text: bodyValue
                }
            }
        }
        if (footerObject.value.length > 0) {
            footer = {
                type: "FOOTER",
                text: footerObject.value
            }
        }

        const buttonsData = buttons.map((btn: any) => {
            if (btn.type === "quick-reply") {
                return {
                    type: "QUICK_REPLY",
                    text: btn.label
                };
            } else if (btn.type === "url") {
                const variables = findPlaceholders(btn.value);
                return variables.length > 0
                    ? {
                        type: "URL",
                        text: btn.label,
                        url: btn.value,
                        example: variables
                    }
                    : {
                        type: "URL",
                        text: btn.label,
                        url: btn.value
                    };
            } else {
                return {
                    type: "PHONE_NUMBER",
                    text: btn.label,
                    phone_number: btn.value
                };
            }
        });


        const transformedString = transformString(templateName);
        const data = {
            phoneNumber: phoneNumber,
            templateData: {
                name: transformedString,
                category,
                language,
                components: [
                    header,
                    footer,
                    body,
                    buttons.length > 0 ? { type: "BUTTONS", buttons: buttonsData } : undefined,
                ].filter(Boolean),
            }
        }

        let hasError = false;
        const newErrorsObject = { ...errorsObject };

        if (!data.phoneNumber) {
            newErrorsObject.phoneNumberError = true;
            hasError = true;
        }

        if (!data.templateData.name) {
            newErrorsObject.templateNameError = true;
            hasError = true;
        }

        if (!data.templateData.category) {
            newErrorsObject.categoryError = true;
            hasError = true;
        }

        if ((body?.text === undefined) || (body?.text === '')) {
            newErrorsObject.bodyError = true;
            hasError = true;
        }
        console.log(body?.text)

        if (buttons.length > 0) {
            buttons.forEach((btn: any) => {
                if ((btn.type === "url" || btn.type === "call") && btn.value.trim() === "") {
                    newErrorsObject.buttonsError = [...(newErrorsObject.buttonsError || []), btn.id];
                    hasError = true;
                }
            });
        }

        setErrorsObject(newErrorsObject);

        console.log(data)

        if (hasError) return;

        createNewTemplate(data)
    }

    useEffect(() => {
        return () => resetStore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='py-4 px-9'>
            <CreateTemplateHeader errorsObject={errorsObject} setErrorsObject={setErrorsObject} />
            <div className='flex gap-8'>
                <TemplateEditor errorsObject={errorsObject} setErrorsObject={setErrorsObject} />
                <TemplatePreview />
            </div>
            <div className='pt-5 mt-3 border-t border-[#cdcdcd]'>
                <button disabled={isPending} onClick={handleCreateTemplate} className='h-9 px-5 bg-primary-500 text-white text-sm rounded-lg transition-all duration-300 hover:bg-primary-600 flex items-center justify-center'>
                    {isPending ? "Creating..." : "Create Template"}
                </button>
            </div>
        </div>
    )
}

{/* <div className="bg-slate-400 p-4 w-[250px] rounded-lg text-secondary-50" dangerouslySetInnerHTML={{ __html: value }}>
</div> */}
