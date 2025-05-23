/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/api/inbox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import iuoLogo from "@/assets/iuo-logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useNavigate } from "react-router";

const FormShema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

const TalkToHuman = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <div className="flex items-center p-4 sm:p-6 gap-2">
        <div className="w-15 h-15 p-1 rounded-full bg-[#261a6d]">
          <img src={iuoLogo} />
        </div>
        <p className="text-xl font-bold">IUO Support</p>
      </div>
      <Button
        className="w-fit ml-[735px] mt-20"
        variant="outline"
        onClick={goBack}
      >
        Go back
      </Button>
      <Card className="mx-auto max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Need to Talk to a Human?</CardTitle>
          <CardDescription className="text-base">
            Please provide your contact information and your message, and out
            support team will get back to you as soon as posible
          </CardDescription>
          <UserMessageForm />
        </CardHeader>
      </Card>
    </>
  );
};

export default TalkToHuman;

const UserMessageForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormShema>>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await sendMessage(data);
      return response;
    },
    onSuccess: async () => {
      toast.success("Message Sent");
      form.reset();
      navigate(-1);
    },
    onError: (error: any) => {
      toast.error(JSON.stringify(error.response.data, null, 2));
    },
  });

  const onSubmit = (data: z.infer<typeof FormShema>) =>
    mutate(data as unknown as any);
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 w-full sm:max-w-2xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-fit" size="lg" disabled={isPending}>
              Send message
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};
