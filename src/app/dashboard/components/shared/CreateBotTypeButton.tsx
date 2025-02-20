import Link from "next/link";



type createBotTypeButton = {
    icon: any;
    type : string;
}

export default function CreateBotTypeButton({ icon , type }: createBotTypeButton) {

   
    const handleClick = () => {
        console.log('Clicked on'+ type);
    }

    return (
        <Link href={type== 'inbound'?'botbuilder/choose-channel':'botbuilder/choose-campaign-type'}  className="text-start gap-2 flex justify-start items-center hover:bg-gray-100 transition-colors w-full" onClick={handleClick}  >
            {
                icon
            }
            <div>
                <p className="font-semibold text-[#0b2646]">Build an {type} Bot</p>
                <p className="text-gray-500 text-xs font-medium">Bot responds to incoming queries</p>
            </div>

        </Link>
    )
}
