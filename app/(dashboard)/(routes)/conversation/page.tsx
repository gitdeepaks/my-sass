"use client";

import { HeaDing } from "@/components/HeaDing";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { fromSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const { ChatCompletionRequestMessage } = require("openai");

const ConversationPage = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<
    (typeof ChatCompletionRequestMessage)[]
  >([]);
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoding = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof fromSchema>) => {
    try {
      const userMessages = {
        role: "user",
        content: data.prompt,
      };

      const newMessage = [...messages, userMessages];
      const response = await axios.post("/api/conversation", {
        messages: newMessage,
      });

      setMessages((current) => [...current, userMessages, response.data]);
    } catch (error) {
      //TODO: Oprn ProModel
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <HeaDing
        title="Conversation"
        description="Conversation Model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoding}
                        placeholder="Enter a prompt for what ever you want"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoding}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-violet-500/10"
                      : "bg-violet-500/20"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
