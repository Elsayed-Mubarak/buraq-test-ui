"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

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

  const base_url = process.env.NEXT_PUBLIC_BACKEND_APP_API_URL

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
    resetOptions: { keepDefaultValues: true }
  });

  const onSubmit = async (values: any) => {
    try {

      if (values) {
        const response = await axiosInstance.post(`${base_url}/bot/workflow/outbound`, {
          title: values.title
        });
        if (onWorkflowCreated) {

          onWorkflowCreated(response.data);
          // setWorkflows((prev:any) =>[...prev , values]);
        }
        setOpen(false);
        form.reset();

      }
    }
    catch (error) {
      console.log(error);
    }

  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <button className="text-start gap-2 flex justify-start items-center" >
          {
            icon
          }
          <div>
            <p className="font-semibold text-[#0b2646]">Build an OutBound Bot</p>
            <p className="text-gray-500 text-xs font-medium">Bot responds to outcoming queries</p>
          </div>

        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workflow</DialogTitle>
          <DialogDescription>Enter the workflow title below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
