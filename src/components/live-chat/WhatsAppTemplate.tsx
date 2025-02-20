import { ArrowLeft, ExternalLink } from "lucide-react"
import Image from "next/image"

type Props = {
    template: any
}

export default function WhatsappTemplate({ template }: Props) {

    const { components } = template
    if (!template) return null
    return (
        <div>
            <div className="mb-2 text-sm font-semibold">
                Template will look like this
            </div>
            <div className="flex h-[350px] flex-col">
                <div className="flex items-center gap-1 bg-[#075e55] p-2 text-sm font-semibold text-white">
                    <div>
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <div className="rounded-full bg-white p-1">
                        <Image
                            width={20}
                            height={20}
                            src="/logo.png"
                            alt="buraq logo"
                        />
                    </div>
                    <div>Buraq</div>
                </div>

                <div className="flex-1 bg-[#E8E1D9] px-2 py-1">
                    <div className="w-[85%] rounded-md bg-white p-2 text-[12px]">
                        {/* <div className="mb-2">{`{{name}}`}</div> */}
                        <p className="mb-2">
                            {components?.map((component: any) =>
                                component.type === "HEADER" ? component?.text : null
                            )}
                        </p>
                        <p className="mb-2">
                            {components?.map((component: any) =>
                                component.type === "BODY" ? component?.text : null
                            )}
                        </p>
                        <p className="mb-2">
                            {components?.map((component: any) =>
                                component.type === "FOOTER" ? component?.text : null
                            )}
                        </p>
                        <div className="flex flex-col gap-1">
                            {components?.map((component: any) =>
                                component.type === "BUTTONS" ? component?.buttons?.map((btn: any, index: number) => (
                                    <div key={index} className="cursor-pointer  flex items-center border-t border-primary-50 justify-center gap-2 p-2 text-primary-600">
                                        <span>
                                            <ExternalLink className="h-4 w-4" />
                                        </span>
                                        <span>{btn.text}</span>
                                    </div>
                                )) : null
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}