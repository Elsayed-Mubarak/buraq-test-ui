"use client"
import { useState } from "react";
import Card from "../../components/botTypes/TemplateCard";
import templateImage from "../../components/shared/imgs/template_img.png"; // Correctly import the image
import { useRouter, useSearchParams } from "next/navigation";

import { axiosInstance } from "@/lib/axios";
import { ObjectId } from "bson";

export default function Home() {


  const templates = [
    {
      title: "Lead Generation for B2B",
      description:
        "Probe visitors coming to your channels by asking qualifying questions and generate quality SQLs.",
      image: templateImage, // Use imported image
    },
    {
      title: "Appointment Booking",
      description:
        "Collect the necessary details to book an appointment for your service through bots.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for Insurance Policy",
      description:
        "Reduce operational expenses, improve customer experience without increasing overhead with a virtual manager.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for B2B",
      description:
        "Probe visitors coming to your channels by asking qualifying questions and generate quality SQLs.",
      image: templateImage, // Use imported image
    },
    {
      title: "Appointment Booking",
      description:
        "Collect the necessary details to book an appointment for your service through bots.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for Insurance Policy",
      description:
        "Reduce operational expenses, improve customer experience without increasing overhead with a virtual manager.",
      image: templateImage, // Use imported image
    },
  ];

  // State to manage search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter templates based on the search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const router = useRouter()

  const handleBack = () => {
    router.back();
  };

  const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL || "https://dev.white-lab.io";

  const searchParams = useSearchParams();
  const channel = searchParams.get('channel');

  const handleClickBuild = async () => {
    try {
      const isOutbound = channel === 'ongoing' || channel === 'one-off';

      const response = await axiosInstance.post(
        `${base_url}/bot/workflow/${isOutbound ? 'outbound' : 'inbound'}`,
        {
          title: "un titled bot",
          channel: {
            type: channel,
            data: {
              "whatapp_number": ""
            }
          },
          data: {
            nodeName: "Trigger",
            nodeContent: {
              id: new ObjectId().toHexString(),
              triggerBot: {
                flag: false,
                groups: [
                  {
                    id: new ObjectId().toHexString(),
                    conditions: [
                      {
                        id: new ObjectId().toHexString(),
                        filterType: "date-range",
                        value: "",
                        valueCondition: "WITHIN",
                        nextConditionId: null,
                      }
                    ],
                    nextGroupId: null,
                  },
                ],
              },
              contactSubscription: {
                flag: false,
                subscription: "Subscribed",
              },
              storeVariables: {
                flag: false,
                injectVariables: [
                  {
                    id: new ObjectId().toHexString(),
                    key: "",
                    variable: "",
                  },
                ],
              },
              phoneNumber: "",
            },
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
  };

  return (
    <>

      {/* Main Content */}
      <main className="flex-1  px-20 py-5 ">
        <div className="flex mb-6">
          <button
            onClick={handleBack}
            className="flex items-center  text-black hover:text-blue-500"
          >
            <span className="mr-7">←</span>
          </button>
          <h1 className="text-2xl text-[rgb(9, 36, 69)] font-bold">
            What do you want your chatbot to do?
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between  ">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="  border-spacing-1 rounded-xl w-[40%] text-sm placeholder:text-xs hover:border-blue-700 active:shadow-2xl"
          />


          <button onClick={handleClickBuild} className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-700">
            Build from scratch

          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <Card
                key={index}
                title={template.title}
                description={template.description}
                image={template.image}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No templates found.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
