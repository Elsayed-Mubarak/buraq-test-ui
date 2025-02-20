import { ArrowLeft, ChevronDown } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useCreateTemplateStore from "@/stores/useCreateTemplate";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
    errorsObject: any;
    setErrorsObject: any;
}
const languages = [
    { name: "Afrikaans", value: "af" },
    { name: "Albanian", value: "sq" },
    { name: "Arabic", value: "ar" },
    { name: "Azerbaijani", value: "az" },
    { name: "Bengali", value: "bn" },
    { name: "Bulgarian", value: "bg" },
    { name: "Catalan", value: "ca" },
    { name: "Chinese (Simplified)", value: "zh_CN" },
    { name: "Chinese (Traditional, HK)", value: "zh_HK" },
    { name: "Chinese (Traditional, TW)", value: "zh_TW" },
    { name: "Croatian", value: "hr" },
    { name: "Czech", value: "cs" },
    { name: "Danish", value: "da" },
    { name: "Dutch", value: "nl" },
    { name: "English", value: "en" },
    { name: "English (UK)", value: "en_GB" },
    { name: "English (US)", value: "en_US" },
    { name: "Estonian", value: "et" },
    { name: "Filipino", value: "fil" },
    { name: "Finnish", value: "fi" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Greek", value: "el" },
    { name: "Gujarati", value: "gu" },
    { name: "Hausa", value: "ha" },
    { name: "Hebrew", value: "he" },
    { name: "Hindi", value: "hi" },
    { name: "Hungarian", value: "hu" },
    { name: "Indonesian", value: "id" },
    { name: "Irish", value: "ga" },
    { name: "Italian", value: "it" },
    { name: "Japanese", value: "ja" },
    { name: "Kannada", value: "kn" },
    { name: "Kazakh", value: "kk" },
    { name: "Korean", value: "ko" },
    { name: "Lao", value: "lo" },
    { name: "Latvian", value: "lv" },
    { name: "Lithuanian", value: "lt" },
    { name: "Macedonian", value: "mk" },
    { name: "Malay", value: "ms" },
    { name: "Malayalam", value: "ml" },
    { name: "Marathi", value: "mr" },
    { name: "Norwegian", value: "nb" },
    { name: "Persian", value: "fa" },
    { name: "Polish", value: "pl" },
    { name: "Portuguese (Brazil)", value: "pt_BR" },
    { name: "Portuguese (Portugal)", value: "pt_PT" },
    { name: "Punjabi", value: "pa" },
    { name: "Romanian", value: "ro" },
    { name: "Russian", value: "ru" },
    { name: "Serbian", value: "sr" },
    { name: "Slovak", value: "sk" },
    { name: "Slovenian", value: "sl" },
    { name: "Spanish", value: "es" },
    { name: "Spanish (Argentina)", value: "es_AR" },
    { name: "Spanish (Spain)", value: "es_ES" },
    { name: "Spanish (Mexico)", value: "es_MX" },
    { name: "Swahili", value: "sw" },
    { name: "Swedish", value: "sv" },
    { name: "Tamil", value: "ta" },
    { name: "Telugu", value: "te" },
    { name: "Thai", value: "th" },
    { name: "Turkish", value: "tr" },
    { name: "Ukrainian", value: "uk" },
    { name: "Urdu", value: "ur" },
    { name: "Uzbek", value: "uz" },
    { name: "Vietnamese", value: "vi" },
    { name: "Zulu", value: "zu" }
];

export default function CreateTemplateHeader({ errorsObject, setErrorsObject }: Props) {
    const router = useRouter();
    const { templateName, setTemplateName, phoneNumber, setPhoneNumber, category, setCategory, language, setLanguage } = useCreateTemplateStore();
    const selectedLanguage = languages.find((item) => item.value === language);
    const [openSelectLanguage, setOpenSelectLanguage] = useState(false);
    function handleInputChange(e: any) {
        setTemplateName(e.target.value)
        if (templateName.length > 0) {
            setErrorsObject({ ...errorsObject, templateNameError: false })
        }
    }
    function handlePhoneNumberChange(value: any) {
        setPhoneNumber(value);
        if (value) {
            setErrorsObject({ ...errorsObject, phoneNumberError: false })
        }
    }
    function handleCategoryChange(value: any) {
        setCategory(value);
        if (value) {
            setErrorsObject({ ...errorsObject, categoryError: false })
        }
    }
    return (
        <>
            <div className='mb-5'>
                <div className='flex items-center gap-8 pt-5 mb-6'>
                    <button onClick={() => router.back()}>
                        <ArrowLeft className='text-secondary-50 h-5 w-5' />
                    </button>
                    <div className='max-w-[571px] min-w-[238px] w-[238px] relative'>
                        <input value={templateName} onChange={handleInputChange} type="text" placeholder='Template name' className={`w-full p-2 text-lg font-semibold bg-white border-b-2 focus:border-primary-500 border-[#e4e4e4] outline-0 focus:outline-none ${errorsObject.templateNameError && "border-red-500"}`} />
                        {errorsObject.templateNameError && <span className="text-[#f00] text-[11px] absolute top-[105%] left-0 block">This field cannot be empty</span>}
                    </div>
                </div>
                <div className='flex justify-between w-[803px] gap-[30px]'>
                    <div className='flex-1 relative'>
                        <div className={`${errorsObject.phoneNumberError ? "text-[#f00]" : "text-secondary-50"} text-sm mb-1`}>WhatsApp Business Number</div>
                        <Select value={phoneNumber} onValueChange={handlePhoneNumberChange}>
                            <SelectTrigger className={`w-full h-8 text-sm  text-secondary-50 focus:ring-0 focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500 ${!phoneNumber && "opacity-50"} ${errorsObject.phoneNumberError && "border-[#f00]"}`}>
                                <SelectValue placeholder="Please select one" />
                            </SelectTrigger>
                            <SelectContent className='w-full bg-white text-sm p-0'>
                                <SelectGroup className='p-0'>
                                    <SelectItem className='text-sm text-secondary-50 py-2 px-4 my-1 cursor-pointer hover:bg-[#f3f3f3]' value="+966597373049">+966597373049</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errorsObject.phoneNumberError && <span className="absolute top-[105%] text-[#f00] text-[11px]">This field cannot be empty</span>}
                    </div>
                    <div className='flex-1 relative'>
                        <div className={` ${errorsObject.categoryError ? "text-[#f00]" : "text-secondary-50"} text-sm mb-1`}>Template Category</div>
                        <Select disabled={!phoneNumber} value={category} onValueChange={handleCategoryChange}>
                            <SelectTrigger className={`w-full h-8 text-sm text-secondary-50 focus:ring-0 focus:ring-offset-0 focus:border-transparent hover:border-primary-500 focus:border-primary-500 ${!category && "opacity-50"} ${!phoneNumber && "bg-[#f3f3f3]"} ${errorsObject.categoryError && "border-[#f00]"}`}>
                                <SelectValue placeholder="Please select one" />
                            </SelectTrigger>
                            <SelectContent className='w-full bg-white text-sm p-0 py-1'>
                                <SelectGroup className='p-0'>
                                    <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="MARKETING">Markiting</SelectItem>
                                    <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="Utility">Utility</SelectItem>
                                    <SelectItem className='text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3]' value="authentication">Authentication</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errorsObject.categoryError && <span className="absolute top-[105%] text-[#f00] text-[11px]">This field cannot be empty</span>}
                    </div>
                    <div className='flex-1'>
                        <div className='text-secondary-50 text-sm mb-1'>Template Language</div>
                        <Popover open={openSelectLanguage} onOpenChange={setOpenSelectLanguage}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full h-8 flex items-center justify-between text-sm text-secondary-50 focus:ring-0 focus:ring-offset-0 focus:border-transparent hover:bg-white hover:border-primary-500 focus:border-primary-500">
                                    <span>
                                        {selectedLanguage?.name || "Please select one"}
                                    </span>
                                    <ChevronDown className={`${openSelectLanguage ? "rotate-180" : ""} transition-all duration-300`} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-[248px] h-[200px] bg-white text-sm p-0 py-1 flex flex-col overflow-y-auto">
                                {languages.map((lang) => (
                                    <button key={lang.value} onClick={() => {
                                        setLanguage(lang.value)
                                        setOpenSelectLanguage(false)
                                    }} className='w-full text-sm text-secondary-50 py-2 px-4 cursor-pointer hover:bg-[#f3f3f3] text-left'>{lang.name}</button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    )
}