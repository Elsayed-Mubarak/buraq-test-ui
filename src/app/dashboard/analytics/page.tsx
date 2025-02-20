"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAuthStore } from '@/stores/useAuthStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: '#f0f0f0',
      },
      ticks: {
        stepSize: 10,
      }
    },
  },
  maintainAspectRatio: false,
};

export default function AnalyticsPage() {
  const authUser = useAuthStore((state) => state.authUser)
  // Performance metrics data
  const performanceMetrics = [
    { title: "Business value generated", value: "$450", change: "-30.8%", isNegative: true },
    { title: "Hours Saved", value: "53.8", change: "-52.3%", isNegative: true },
    { title: "Cost Saved", value: "$1.08K", change: "-52.3%", isNegative: true },
    { title: "CSAT", value: "0.0", rating: 0, totalRatings: [0, 0, 0, 0, 0] },
    { title: "Avg. conversation duration", value: "1h 2m", change: "-52.3%", isNegative: true },
    { title: "Engagement %", value: "1.1%", change: "+10.0%", isNegative: false },
    { title: "Conversion %", value: "32.1%", change: "-13.5%", isNegative: true },
    { title: "Abandonment %", value: "45.5%", change: "+48.0%", isNegative: true },
  ];

  // Chart data
  const conversationsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversations',
        data: [10, 8, 25, 5, 3, 2, 8],
        backgroundColor: [
          '#FF6B6B',  // Red/Orange
          '#FF6B6B',
          '#90CAF9',  // Light Blue
          '#FF9F40',  // Orange
          '#4CAF50',  // Green
          '#FF6B6B',  // Red/Orange
          '#81C784',  // Light Green
        ],
        borderWidth: 0,
      },
    ],
  };

  const contactsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Contacts',
        data: [8, 6, 6, 12, 0, 0, 10],
        backgroundColor: [
          '#FFB74D',  // Orange
          '#90CAF9',  // Light Blue
          '#90CAF9',  // Light Blue
          '#90CAF9',  // Light Blue
          '#FF7043',  // Deep Orange
          '#FFFFFF',  // Empty
          '#81C784',  // Light Green
        ],
        borderWidth: 0,
      },
    ],
  };

  // Countries data
  const countriesData = [
    { country: "N/A", conversations: 34, contacts: 4 },
    { country: "Saudi Arabia", conversations: 8, contacts: 1 },
    { country: "Morocco", conversations: 5, contacts: 2 },
    { country: "Algeria", conversations: 4, contacts: 1 },
    { country: "Egypt", conversations: 3, contacts: 1 },
  ];

  // Flow engagement data
  const flowEngagementData = [
    { action: "Bot is triggered if...", hits: 55, exitPercentage: "23.6%" },
    { action: "HTTP request 1", hits: 36, exitPercentage: "0.0%" },
    { action: "Collect file 2", hits: 17, exitPercentage: "0.0%" },
    { action: "Webhook 1", hits: 14, exitPercentage: "0.0%" },
    { action: "Send message 1", hits: 9, exitPercentage: "0.0%" },
  ];

  return (
    <div className="px-12 py-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Hey {authUser?.firstName}! 👋</h1>
        <div className="flex flex-wrap items-center gap-4">
          <select className="border rounded-md px-3 py-1.5 bg-white text-sm">
            <option>All Bots</option>
          </select>
          <span className="text-gray-600">for</span>
          <select className="border rounded-md px-3 py-1.5 bg-white text-sm">
            <option>29-Nov-24</option>
          </select>
          <select className="border rounded-md px-3 py-1.5 bg-white text-sm">
            <option>05-Dec-24</option>
          </select>
          <span className="text-gray-600">grouped by</span>
          <select className="border rounded-md px-3 py-1.5 bg-white text-sm">
            <option>Country</option>
          </select>
        </div>
      </div>

      {/* Performance Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-white">
              <h3 className="text-sm text-gray-600 mb-4">{metric.title}</h3>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-800">{metric.value}</span>
                {metric.change && (
                  <span className={`text-sm px-2 py-0.5 rounded ${metric.isNegative ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {metric.change}
                  </span>
                )}
                {metric.rating !== undefined && (
                  <div className="flex flex-col items-end">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-gray-300 text-lg">★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 mt-1">Average</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Acquisition Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Acquisition</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversations Chart */}
          <Card className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium text-gray-800">Conversations</h3>
                <span className="text-sm text-gray-500">0.0%</span>
              </div>
              <span className="text-2xl font-semibold text-gray-800">52</span>
            </div>
            <div className="h-[200px]">
              <Bar data={conversationsData} options={options} />
            </div>
          </Card>

          {/* Contacts Chart */}
          <Card className="p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium text-gray-800">Contacts</h3>
                <span className="text-sm text-red-500">-16.5%</span>
              </div>
              <span className="text-2xl font-semibold text-gray-800">9</span>
            </div>
            <div className="h-[200px]">
              <Bar data={contactsData} options={options} />
            </div>
          </Card>
        </div>

        {/* Acquisitions by country */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="font-medium text-gray-800 mb-6">Acquisitions by country</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="text-left">
                  <th className="py-2 font-medium text-gray-600">Country</th>
                  <th className="font-medium text-gray-600">Conversations</th>
                  <th className="font-medium text-gray-600">Contacts</th>
                </tr>
              </thead>
              <tbody>
                {countriesData.map((row, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3">{row.country}</td>
                    <td>{row.conversations}</td>
                    <td>{row.contacts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Flow Engagement Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Flow Engagement</h2>
        <Card className="p-6 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="text-left">
                  <th className="py-2 font-medium text-gray-600">Action Block</th>
                  <th className="font-medium text-gray-600">Hits</th>
                  <th className="font-medium text-gray-600">% Exit</th>
                </tr>
              </thead>
              <tbody>
                {flowEngagementData.map((row, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3">{row.action}</td>
                    <td>{row.hits}</td>
                    <td>{row.exitPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Note */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">ℹ</span>
            <div>
              <p className="font-medium text-gray-800">Note:</p>
              <p className="text-sm text-gray-600">
                The data is fetched according to your account timezone i.e. GMT+03:00 Asia/Baghdad.
                <br />
                To change the timezone, visit your account profile -&gt; select timezone and save the changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
