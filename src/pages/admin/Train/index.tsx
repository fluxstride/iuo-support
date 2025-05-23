import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Train = () => {
  return (
    <div>
      <h1 className="text-xl font-medium">Add Training Data</h1>
      <div className="mt-4">
        <div className="grid w-full max-w-sm items-center gap-3 ">
          <Label htmlFor="document" className="text-base">
            Upload Document
          </Label>
          <Input id="document" type="file" />
          <Button className="w-fit mt-2">Upload Document</Button>
        </div>

        <div className="grid w-full items-center gap-2 mt-20">
          <Label htmlFor="picture" className="text-base">
            Add Text Data
          </Label>
          <Textarea id="textData" placeholder="Paste text here..." />
          <Button className="w-fit mt-2">Upload Text</Button>
        </div>
      </div>
    </div>
  );
};

export default Train;
