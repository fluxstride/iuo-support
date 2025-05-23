/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateMessage } from "@/api/inbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/App";
import { useMutation } from "@tanstack/react-query";

interface Message {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  readStatus: "read" | "unread";
}

const ViewMessage = ({ message }: { message: Message }) => {
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const response = await updateMessage({ ...data, readStatus: "read" });
      return response;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
      queryClient.invalidateQueries({
        queryKey: ["messagesCount"],
      });
    },
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && message.readStatus === "unread") {
          mutate(message);
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="flex flex-col gap-4 p-3 pb-0 hover:bg-blue-50 rounded-md transition-all duration-300 cursor-pointer">
          <div>
            <p className="font-medium text-sm">Name</p>
            <p>{message.name}</p>
          </div>

          <div>
            <p className="font-medium text-sm">Email</p>
            <p>{message.email}</p>
          </div>

          <p className="text-sm text-blue-400">Click to view</p>

          <Separator />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Message</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <p>{message.name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <p>{message.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-right">
              Phone number
            </Label>
            <p>{message.phoneNumber}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-right">
              Message
            </Label>
            <p>{message.message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessage;
