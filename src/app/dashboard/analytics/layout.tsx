"use client";

import React from 'react';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-auto bg-background">
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}
