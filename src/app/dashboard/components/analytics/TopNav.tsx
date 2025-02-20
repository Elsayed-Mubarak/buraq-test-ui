"use client";
import React, { useEffect, useState } from "react";
import AnalyticsSelect from "./AnalyticsSelect";
import { useAuthStore } from "../../../../stores/useAuthStore";

type Props = {};

export default function TopNav({}: Props) {
  const {authUser} = useAuthStore()
  const [analyticsViewing, setAnalyticsViewing] = useState<string>("chatbot");
  useEffect(() => {
    // console.log(analyticsViewing);
  }, [analyticsViewing]);
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-semibold text-secondary-50">Hey,{authUser?.firstName} </div>
        <span>👋</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-semibold text-secondary-50">
          You are viewing
        </div>
        <AnalyticsSelect
          analyticsViewing={analyticsViewing}
          setAnalyticsViewing={setAnalyticsViewing}
        />
      </div>
    </div>
  );
}
