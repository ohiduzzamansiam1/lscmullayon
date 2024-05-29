"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateClassForm from "./CreateClassForm";
function CreateClassButton() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs">
          <Plus className="size-4 mr-1" /> New Class
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new class</DialogTitle>
        </DialogHeader>
        <CreateClassForm handleOpen={handleOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateClassButton;
