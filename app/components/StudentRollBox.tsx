"use client";

import { updateStudentRedMark } from "@/lib/actions";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

export default function StudentRollBox({
  studentId,
  roll,
  isRedMarked,
  grade,
}: {
  studentId: string;
  roll: string;
  isRedMarked: boolean;
  grade: number;
}) {
  const [localIdRedMarked, setLocalRedMarked] = React.useState(isRedMarked);

  async function handleRedMark() {
    const res = await updateStudentRedMark({
      studentId: studentId,
      isRedMarked: localIdRedMarked,
    });

    if (!res.success) {
      setLocalRedMarked(isRedMarked);
      toast.error(res.message);
    }
  }

  return (
    <form action={handleRedMark}>
      <button
        type="submit"
        className={cn(
          "py-4 relative flex items-center justify-center border-r min-w-[4rem] transition duration-500 bg-white",
          grade !== 0 && "bg-green-100"
        )}
        onClick={() => {
          setLocalRedMarked(!localIdRedMarked);
        }}
      >
        {localIdRedMarked && (
          <div className="size-9 border-2 border-red-500 rounded-full bg-transparent absolute"></div>
        )}
        {roll}
      </button>
    </form>
  );
}
