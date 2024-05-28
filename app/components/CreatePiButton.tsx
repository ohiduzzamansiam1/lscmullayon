"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Plus } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPi } from "@/lib/actions";
import { toast } from "sonner";

const formSchema = z.object({
  chapter: z.string(),
});

function CreatePiButton({ classId }: { classId: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.chapter) return;

    const res = await createPi({
      chapter: parseInt(values.chapter),
      classId,
    });

    if (res!?.success) {
      setTimeout(() => form.reset(), 300);
      toast.success(res!?.message);
      setOpen(false);
    } else {
      form.setError("chapter", { message: res!?.message });
      toast.error(res!?.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs">
          <Plus className="size-4 mr-1" /> New Chapter
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a chapter</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <FormField
                control={form.control}
                name="chapter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="e.g. 7"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Remember, this app has some minor issues while it was made within
              2 days.
            </p>
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                !form.getFieldState("chapter").isDirty
              }
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePiButton;
