"use client"
import OptionCard from '../../components/botTypes/OptionCard';
import { useRouter } from 'next/navigation';
import InstagramIcon from '../../components/botTypes/svgs/InstagramIcon';
import WhatsAppIcon from '../../components/botTypes/svgs/WhatsAppIcon';
import WebIcon from '../../components/botTypes/svgs/WebIcon';
import FacebookIcon from '../../components/botTypes/svgs/FacebookIcon';
import SMSIcon from '../../components/botTypes/svgs/SMSIcon';
import VoiceIcon from '../../components/botTypes/svgs/VoiceIcon';

export default function Page () {


  const router = useRouter()

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };
  
  return (
    <div className="min-h-screen  w-3/5 m-auto p-7 flex flex-col items-start justify-start ">
      <div className=' flex text-2xl  font-bold'>
      <button
        onClick={handleBack}
        className="flex items-center  text-black hover:text-blue-500"
      >
        <span className="mr-7">←</span> 
      </button>
      <h1 className="text-center ">Where would you like to deploy your bot?</h1>
      </div>

      <div className="w-full flex  gap-5 flex-wrap justify-center items-center m-auto " >
        <OptionCard icon={<WebIcon/>} label="Web"  />
        <OptionCard icon={<WhatsAppIcon/>} label="WhatsApp" />
        <OptionCard icon={<InstagramIcon/>} label="Instagram"  />
        <OptionCard icon={<SMSIcon/>} label="SMS" />
        <OptionCard icon={<FacebookIcon/>} label="Facebook" />
        <OptionCard icon={<VoiceIcon/>} label="Voice" comingSoon />
      </div>
  </div>
  );
}


