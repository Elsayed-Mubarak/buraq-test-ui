"use client";
import { Button } from "../ui/button";
import {
  Dialog,

  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";


import { useState } from "react";

const formSchema = z.object({
  title: z.string({ message: "Workflow Name is required" })
});

interface Workflow {
  _id: string;
  title: string;
  active: boolean;
  nodes?: any[];
  connections?: any[];
}

interface CreateWorkflowButtonProps {
  onWorkflowCreated: (data: Workflow) => void;
  icon: any
}

export default function CreateWorkflowButton({ onWorkflowCreated, icon }: CreateWorkflowButtonProps) {
  const [open, setOpen] = useState(false);





  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="text-start gap-2 flex justify-start items-center" >
          {
            icon
          }
          <div>
            <p className="font-semibold text-[#0b2646]">Build an Inbound Bot</p>
            <p className="text-gray-500 text-xs font-medium">Bot responds to incoming queries</p>
          </div>

        </button>
      </DialogTrigger>

    </Dialog>
  );
}
