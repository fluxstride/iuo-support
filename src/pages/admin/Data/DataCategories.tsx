import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

const dataCategories = [
  { id: 1, name: "Admission", value: "admission" },
  { id: 2, name: "Developer", value: "developer/creator/designer" },
  { id: 3, name: "Faculty", value: "faculty" },
  { id: 4, name: "Courses", value: "courses" },
  { id: 5, name: "Fees", value: "fees" },
  { id: 6, name: "Hostel", value: "hostel" },
  { id: 7, name: "Calendar", value: "calendar" },
  { id: 8, name: "Support", value: "support" },
  { id: 9, name: "General", value: "general" },
];

export function DataCategories() {
  return (
    <Table className="border-1 rounded-sm">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataCategories.map((dataCategory) => (
          <TableRow key={dataCategory.id}>
            <TableCell className="font-medium">{dataCategory.name}</TableCell>
            <TableCell>
              <div className="-ml-4 flex space-x-1  items-center">
                <Button variant="ghost" className="">
                  <Edit />
                  {/* Edit */}
                </Button>
                <div className="h-5">
                  <Separator orientation="vertical" />
                </div>
                <Button variant="ghost">
                  <Trash2 />
                  {/* Delete */}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{dataCategories.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
