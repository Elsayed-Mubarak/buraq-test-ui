"use client"
import OptionCard from '../../../dashboard/components/botTypes/OptionCard';
import { useRouter } from 'next/navigation';
import InstagramIcon from '../../../dashboard/components/botTypes/svgs/InstagramIcon';
import WhatsAppIcon from '../../../dashboard/components/botTypes/svgs/WhatsAppIcon';
import WebIcon from '../../../dashboard/components/botTypes/svgs/WebIcon';
import { FaceIcon } from '@radix-ui/react-icons';
import FacebookIcon from '../../../dashboard/components/botTypes/svgs/FacebookIcon';
import SMSIcon from '../../../dashboard/components/botTypes/svgs/SMSIcon';
import VoiceIcon from '../../../dashboard/components/botTypes/svgs/VoiceIcon';
import OneOff from '../../components/botTypes/svgs/outbound/OneOff';
import OutGoing from '../../components/botTypes/svgs/outbound/OutGoing';

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
      <h1 className="text-center ">What type of campaign would this bot run?</h1>
      </div>

      <div className="w-full flex  gap-5 flex-wrap justify-center items-center m-auto " >
        <OptionCard icon={<OneOff/>} label="one-off"  />
        <OptionCard icon={<OutGoing/>} label="Ongoing" />
      </div>
  </div>
  );
}


