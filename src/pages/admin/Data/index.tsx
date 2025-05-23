import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataPage = () => {
  return (
    <div>
      <h1 className="text-xl font-medium">Knowledge Base</h1>
      <Tabs defaultValue="categories" className="mt-4">
        <div className="flex items-center justify-between">
          <TabsList className="sm:w-fit">
            <TabsTrigger value="categories" className="cursor-pointer">
              Manage Categories
            </TabsTrigger>
            <TabsTrigger value="upload" className="cursor-pointer">
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="documents" className="cursor-pointer">
              View Documents
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-2">
          <TabsContent value="categories">
            <h2 className="text-xl font-medium">Create Information Category</h2>
            <div className="grid w-full items-center gap-2 mt-2">
              <Label htmlFor="picture" className="text-base">
                Add Text Data
              </Label>
              <Input
                id="textData"
                placeholder="Enter category name"
                className="max-w-sm"
              />
              <Button className="w-fit mt-2">Add Category</Button>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <h2 className="text-xl font-medium">Upload Document</h2>
            <div className="grid w-full items-center gap-2 mt-2">
              <Label htmlFor="picture" className="text-base">
                Add Text Data
              </Label>
              <Input
                id="textData"
                placeholder="Enter category name"
                className="max-w-sm"
              />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select Category --" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-fit mt-2">Add Category</Button>
            </div>
          </TabsContent>
          <TabsContent value="documents">Documents</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DataPage;
