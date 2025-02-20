import React from "react";
import FilterSelect from "./FilterSelect";

type Props = {};

export default function AnalyticsFilter({}: Props) {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="text-sm font-semibold text-secondary-50">
          Filter data of
        </div>
        <FilterSelect />
      </div>
    </div>
  );
}
