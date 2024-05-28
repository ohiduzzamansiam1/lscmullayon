"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkStudentsInClass,
  createStudentsNumber,
  deleteClass,
} from "@/lib/actions";
import { Loader, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ClassCard({
  className,
  section,
  id,
}: {
  className: string;
  section: string;
  id?: string;
}) {
  const [isDeletingClass, setIsDeletingClass] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [isStudentChecking, setIsStudentChecking] = useState(false);
  const [isStudentCreatingNumber, setIsStudentCreatingNumber] = useState(false);

  const router = useRouter();

  async function handleCheckStudents() {
    const res = await checkStudentsInClass({ id: id ?? "" });

    // No students in that class
    if (res !== null && !res.length) {
      setAddStudentModalOpen(true);
      setTimeout(() => setIsStudentChecking(false), 200);
    } else {
      router.push("/classes/" + id);
    }
  }

  async function handleCreateStudentNumber(formData: FormData) {
    const howMany = Number(formData.get("howMany"));

    const res = await createStudentsNumber({ howMany, classId: id ?? "" });

    if (res.success) {
      toast.success(res.message);
      setAddStudentModalOpen(false);
      setTimeout(() => setIsStudentCreatingNumber(false), 200);
      router.push("/classes/" + id);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="border border-black/5 rounded-2xl relative shadow-2xl shadow-black/5 mx-auto w-full h-40 flex flex-col">
      <Dialog open={addStudentModalOpen} onOpenChange={setAddStudentModalOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Students of Class {className}/{section}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Sorry, it seems that there are no students in this class. Add the
              total number of students in this class
            </DialogDescription>
          </DialogHeader>

          <form
            action={handleCreateStudentNumber}
            onSubmit={() => setIsStudentCreatingNumber(true)}
          >
            <Label className="text-xs">Students</Label>
            <Input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="e.g. 62"
              name="howMany"
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isStudentCreatingNumber}
            >
              {isStudentCreatingNumber ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Add Students"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <form
        action={handleCheckStudents}
        onSubmit={() => setIsStudentChecking(true)}
        className="text-2xl font-bold flex-1 w-full grid place-content-center"
      >
        <button type="submit" disabled={isStudentChecking}>
          {isStudentChecking ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <>
              <p className="text-xs font-normal text-muted-foreground">Class</p>
              {className}/{section}
            </>
          )}
        </button>
      </form>

      <div className="p-2 py-3 flex justify-end absolute bottom-0 right-0">
        <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <AlertDialogTrigger>
            <Trash2 className="size-3 text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                class and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant={"destructive"}
                  onClick={async () => {
                    setIsDeletingClass(true);
                    const res = await deleteClass({ id: id ?? "" });
                    if (res.success) {
                      setIsDeletingClass(false);
                      setDeleteModalOpen(false);
                      toast.success(res.message);
                    }
                  }}
                  disabled={isDeletingClass}
                >
                  {isDeletingClass ? (
                    <Loader className="size-5 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ClassCard;
