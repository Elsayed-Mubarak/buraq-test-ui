import React from "react";

export default function FunctionCallEmpty() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[576px] flex-col items-center justify-center text-center">
        <div className="text-2xl font-semibold text-[#092445]">
          Get started with Function Call
        </div>
        <div className="mb-8 mt-2 text-lg leading-6 text-[#0f0f0f]">
          Create functions that run during conversations with your AI chatbot to
          perform specific tasks. For example, you can retrieve ticket status,
          check real-time balances, and more.
        </div>
        <button className="min-w-36 rounded-lg bg-[#343de6] px-5 py-2 text-white transition-all duration-300 hover:bg-[#040ecc]">
          Contact Sales
        </button>
      </div>
    </div>
  );
}
