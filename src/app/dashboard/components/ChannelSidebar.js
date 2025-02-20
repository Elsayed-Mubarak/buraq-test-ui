"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const ChannelSidebar = () => {
  const [webDropdown, setWebDropdown] = useState(false);
  const [whatsappDropdown, setWhatsappDropdown] = useState(false);

  const toggleWebDropdown = () => setWebDropdown(!webDropdown);
  const toggleWhatsappDropdown = () => setWhatsappDropdown(!whatsappDropdown);

  return (
    <div className="w-64 h-screen bg-white p-6">
      <h2 className="text-blue-500 font-semibold text-lg">Channels</h2>

      <div className="mt-4">
  
        <div onClick={toggleWebDropdown} className="cursor-pointer">
          <p className="text-blue-600">Web {webDropdown ? '▾' : '▸'}</p>
        </div>
        {webDropdown && (
          <ul className="ml-4 mt-2 space-y-2">
            <li className="cursor-pointer">
              <Link href="/channels/web/appearance">Appearance</Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/channels/web/general-settings">General Settings</Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/channels/web/popup-messages">Popup Messages</Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/channels/web/trigger-conditions">Trigger Conditions</Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/channels/web/configuration">Configuration</Link>
            </li>
          </ul>
        )}


        <div onClick={toggleWhatsappDropdown} className="mt-4 cursor-pointer">
          <p className="text-blue-600">WhatsApp {whatsappDropdown ? '▾' : '▸'}</p>
        </div>
        {whatsappDropdown && (
          <ul className="ml-4 mt-2 space-y-2 text-blue-600">
            <li className="cursor-pointer">
              <Link href="dashboard/pages/channels/whatsapp/TemplateMessages">Template Messages</Link>
            </li>
            <li className="cursor-pointer">
              <Link href="dashboard/pages/channels/whatsapp/whatsappconfig">Configuration</Link>
            </li>
          </ul>
        )}

        <div className="mt-4 cursor-pointer">
          <Link href="/channels/facebook">
            <p className="text-blue-600">Facebook</p>
          </Link>
        </div>
        <div className="mt-4 cursor-pointer">
          <Link href="/channels/sms">
            <p className="text-blue-600">SMS</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar;
