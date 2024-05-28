"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClass } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  className: z.string(),
  section: z.string(),
});

function CreateClassForm({ handleOpen }: { handleOpen: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      section: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.className || !values.section) return;
    const res = await createClass({
      className: values.className,
      section: values.section,
    });

    if (res.success) {
      handleOpen();
      toast.success(res.message);
      form.reset();
    } else {
      form.setError("className", { message: res.message });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="max-h-[100px] lg:max-h-max">
                          <SelectItem value="6">Class 6</SelectItem>
                          <SelectItem value="7">Class 7</SelectItem>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                          <SelectItem value="10">Class 10</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Textarea placeholder="Description (optional)" disabled />

          <p className="text-xs text-muted-foreground leading-relaxed">
            Remember, this app has some minor issues while it was made within 2
            days.
          </p>
          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting ||
              !form.getFieldState("className").isDirty ||
              !form.getFieldState("section").isDirty
            }
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              "Create Class"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default CreateClassForm;
