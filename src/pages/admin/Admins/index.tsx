import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Admins = () => {
  const [tabValue, setTabValue] = useState("adminList");
  return (
    <div>
      <h1 className="text-xl font-medium">Manage Admin Accounts</h1>
      <Tabs
        defaultValue="adminList"
        className="mt-4"
        onValueChange={setTabValue}
      >
        <div className="flex items-center justify-between">
          <TabsList className="sm:w-80">
            <TabsTrigger value="adminList" className="cursor-pointer">
              Admins
            </TabsTrigger>
            <TabsTrigger value="createAdmin" className="cursor-pointer">
              Create Admin
            </TabsTrigger>
          </TabsList>

          {tabValue === "adminList" && (
            <Button variant="outline" size="icon" className="cursor-pointer">
              <RefreshCw />
            </Button>
          )}
        </div>

        <div className="mt-2">
          <TabsContent value="adminList">
            <p>Admin account list</p>
          </TabsContent>

          <TabsContent value="createAdmin">
            <div className="flex flex-col gap-4 w-full sm:max-w-2xl">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-base">
                  Name
                </Label>

                <Input id="name" value="" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input id="email" value="" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
                <Input id="password" value="" />
              </div>

              <div>
                <Label htmlFor="role" className="text-base mb-2">
                  Select Role
                </Label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="light">Admin</SelectItem>
                    <SelectItem value="dark">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-fit cursor-pointer" size="lg">
                Add Admin
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-4"></div>
    </div>
  );
};

export default Admins;
