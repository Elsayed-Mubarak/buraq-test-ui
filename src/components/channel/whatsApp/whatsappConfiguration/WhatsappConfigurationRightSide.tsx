
export default function WhatsappConfigurationRightSide() {
    return (
        <div className="fixed top-0 right-0 w-[324px] h-full">
            <div className="w-full h-full bg-[#f3f3f3] px-6 pt-11 pb-20">
                <div className="text-secondary-50 font-bold text-lg leading-snug mb-5">How do I connect the WhatsApp Business API with Buraq?</div>
                <div className="mb-5">
                    <div className="text-sm text-secondary-50 mb-1">Step 1 : Enter the details of the WhatsApp Business API</div>
                    <div className="text-sm text-[#808080]">Enter the provider SSID, account name and phone number</div>
                </div>
                <div className="mb-5">
                    <div className="text-sm text-secondary-50 mb-1">Step 2 : Connect the bot</div>
                    <div className="text-sm text-[#808080]">Select the chatbot that you’d like to connect with the WhatsApp Business API</div>
                </div>
                <div>
                    <div className="text-sm text-secondary-50 mb-1">Step 3 : Test the integration</div>
                    <div className="text-sm text-[#808080]">Send a message to the phone number mapped with the WhatsApp Business account.</div>
                </div>
            </div>
        </div>
    )
}