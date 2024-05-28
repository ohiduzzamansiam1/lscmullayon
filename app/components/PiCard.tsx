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
import { deleteChapter } from "@/lib/actions";
import { Loader, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function PiCard({
  id,
  chapter,
  classId,
}: {
  chapter: number;
  id?: string;
  classId: string;
}) {
  const [isDeletingChapter, setIsDeletingChapter] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const router = useRouter();

  return (
    <div className="border border-black/5 rounded-2xl relative shadow-2xl shadow-black/5 mx-auto w-full h-40 flex flex-col">
      <button
        className="text-3xl text-center font-bold flex-1 w-full grid place-content-center"
        onClick={() => {
          setIsChapterLoading(true);

          setTimeout(() => {
            router.push(`/classes/${id}/pi/${id}`);
            setTimeout(() => {
              setIsChapterLoading(false);
            }, 9999999);
          }, 500);
        }}
      >
        {isChapterLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          <>
            <p className="text-xs font-normal text-muted-foreground">Chapter</p>
            {chapter}
          </>
        )}
      </button>

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
                chapter and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant={"destructive"}
                  onClick={async () => {
                    setIsDeletingChapter(true);
                    const res = await deleteChapter({
                      id: id ?? "",
                    });
                    if (res.success) {
                      setIsDeletingChapter(false);
                      setDeleteModalOpen(false);
                      toast.success(res.message);
                    }
                  }}
                  disabled={isDeletingChapter}
                >
                  {isDeletingChapter ? (
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

export default PiCard;
