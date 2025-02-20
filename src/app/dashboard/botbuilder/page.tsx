"use client";
import { useState, useEffect } from "react";
import WorkflowCard from "../components/workflow/workflow-card";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import CreateBotTypeButton from "../components/shared/CreateBotTypeButton";
import { useBotStore } from "@/stores/useBot.store";


const TabList = () => {
  const [activeTab, setActiveTab] = useState("inbound");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    bots,
    inboundBots,
    outboundBots,
    getBots,
    getInboundBots,
    getOutboundBots,
  } = useBotStore();


  useEffect(() => {
    getBots();
    activeTab === "inbound" ? getInboundBots() : getOutboundBots();
  }, [getBots, getInboundBots, getOutboundBots, activeTab]);



  const filteredWorkflows = (() => {
    switch (activeTab) {
      case "inbound":
        return inboundBots.filter((workflow) =>
          workflow.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "outbound":
        return outboundBots.filter((workflow) =>
          workflow.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return bots;
    }
  })();


  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bot Builder</h1>
          <p className="text-gray-500 text-sm max-w-[500px]">
            Manage your bots, or build new ones for different channels or web pages. Every single bot under your account is listed here.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Button className="bg-primary-500 hover:bg-primary-500 text-white px-6 py-1.5 rounded-lg font-semibold ring-transparent ring-none outline-none">
                Build a Bot
              </Button>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white rounded-xl border w-[280px]" align="end">
            <DropdownMenuItem asChild>
              <div className="flex items-center gap-3 hover:bg-gray-100 transition-colors rounded-lg cursor-pointer">
                <CreateBotTypeButton
                  icon={<FiArrowDownLeft className="text-[#343de6] w-6 h-6" />}
                  type={"inbound"}
                />
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <div className="flex items-center gap-3 hover:bg-gray-100 transition-colors rounded-lg cursor-pointer">
                <CreateBotTypeButton
                  icon={<FiArrowUpRight className="text-[#343de6] w-6 h-6" />}
                  type={"outbound"}
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Workflow Creation Buttons */}
        <div className="flex space-x-4">

        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex items-center justify-between gap-6 border-gray-200 mb-4 pb-2">
        {/* Tabs */}
        <div className="flex items-center w-[45%] border-b">
          <button
            className={`px-4 py-2 ${activeTab === "inbound"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              } w-1/2`}
            onClick={() => setActiveTab("inbound")}
          >
            Inbound
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "outbound"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              } w-1/2`}
            onClick={() => setActiveTab("outbound")}
          >
            Outbound
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center relative w-[55%]  border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 gap-2">
          <IoIosSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search your bot here"
            className="w-full border-0 ring-0 outline-none focus:ring-0 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        {filteredWorkflows.length > 0 ? (
          filteredWorkflows.map((workflow) => (
            <WorkflowCard workflow={workflow} key={workflow.id} />
          ))
        ) : (
          <p className="text-gray-700">No workflows found.</p>
        )}
      </div>


    </div>
  );
};

export default TabList;
