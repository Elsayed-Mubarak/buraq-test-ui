import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CustomCombobox from "@/components/workflow/nodeSettings/ComboBox";
import NodeSettingsHeader from "../../node-settings-bar/node-settings-header";
import { svgs } from "../../shared/SVG";
import { Card } from "../../../ui/card";


const SmsContentSettings = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);

  const options = []; // Populate this with real data


  return (
    <>
      <NodeSettingsHeader
        icon={svgs.send_sms}
        text={"send sms "}
        onChange={(e) => { }}
      />

      <Card className="shadow-none border-none">
        <h5 className="mt-6 text-sm mb-6">
          Send outbound SMS messages to a list of contacts to engage them in a conversation.
        </h5>

        <div className="mb-6">
          <label className=" p-1 block text-sm font-medium text-gray-700">From</label>
          <CustomCombobox data={[]} />
          {fromError && <p className="text-red-500 text-sm mt-1">This field cannot be empty</p>}
        </div>

        <div className="mb-6">
          <label className=" p-1 block text-sm font-medium text-gray-700">To</label>
          <CustomCombobox data={[]} />

          {toError && <p className="text-red-500 text-sm mt-1">This field cannot be empty</p>}
        </div>

        <div className="mb-6">
          <label className=" p-1 block text-sm font-medium text-gray-700">Message</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="resize-none "
            rows={10}
          />
          <p className="text-gray-400 text-xs text-right">{message.length}/160</p>
        </div>



      </Card>

    </>

  );
};

export default SmsContentSettings;



