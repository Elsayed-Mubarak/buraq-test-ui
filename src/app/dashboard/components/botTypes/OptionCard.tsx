"use client"
import { axiosInstance } from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";

type OptionCardProps = {
  icon: any;
  label: string;
  comingSoon?: boolean;  // Optional prop to show a "Coming Soon" badge
}

const OptionCard = ({ icon, label, comingSoon }: OptionCardProps) => {

  const router = useRouter();

  const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL || "https://dev.white-lab.io";

  const handleClick = async () => {

    if (label === "Ongoing" || label === "one-off") {
      try {
        const response = await axiosInstance.post(
          `${base_url}/bot/workflow/outbound`,
          {
            title: "un titled bot",
            channel: {
              type: label,
              data: {
                "whatapp_number": ""
              }
            }
          }
        );


        if (response.status === 201) {
          const workflow = response.data;
          if (workflow && workflow.id) {
            router.push(`/dashboard/botbuilder/workflows/${workflow.id}`);
           
          } else {
            console.error("Workflow ID is missing!");
          }
        }
      } catch (error) {
        console.error("Failed to build workflow:", error);
      }
      return ; 
    }

    if (!label || label === "Voice") {
      console.error("Label is required to create search params.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("channel", label.toLowerCase());

    router.push(`choose-template?${params.toString()}`);
  }


  return (
    <button onClick={handleClick} className="relative  w-48 h-44  bg-white shadow-md rounded-lg flex flex-col items-center justify-evenly border-2 hover:border-blue-500 transition-shadow cursor-pointer overflow-clip">
      <div className="  bg-[#f3f3f3] p-5 rounded-full">{icon}</div>
      <p className="text-lg font-bold  text-[rgb(58 58 58)] ">{label}</p>
      {comingSoon && (
        <span className="font-semibold  absolute top-6 left-7 translate-x-[-50%] translate-y-[50%]  -rotate-45 bg-blue-700 text-white text-sm w-full text-center ps-4">
          Coming Soon
        </span>
      )}
    </button>
  );
};

export default OptionCard;
