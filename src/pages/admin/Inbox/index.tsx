import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnreadMessages from "./UnreadMessages";
import ReadMessages from "./ReadMessages";

const Inbox = () => {
  return (
    <div>
      <h1 className="text-xl font-medium">Inbox</h1>
      <Tabs defaultValue="unread" className="mt-4">
        <div className="flex items-center justify-between">
          <TabsList className="sm:w-80">
            <TabsTrigger value="unread" className="cursor-pointer">
              Unread
            </TabsTrigger>
            <TabsTrigger value="read" className="cursor-pointer">
              Read
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="unread">
          <UnreadMessages />
        </TabsContent>

        <TabsContent value="read">
          <ReadMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inbox;
