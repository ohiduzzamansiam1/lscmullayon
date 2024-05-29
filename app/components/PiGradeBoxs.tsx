"use client";

import { updateGradeBox } from "@/lib/actions";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

export default function PiGradeBoxs({
  studentId,
  piGrade,
}: {
  studentId: string;
  piGrade: number;
}) {
  const [localGrade, setLocalGrade] = React.useState(piGrade);

  async function handleGradeBoxChange() {
    const res = await updateGradeBox({
      grade: localGrade,
      studentId: studentId,
    });

    if (!res.success) {
      setLocalGrade(piGrade);
      toast.error(res.message);
    }
  }

  return (
    <>
      <form action={handleGradeBoxChange}>
        <div className="flex items-center gap-2 scale-150">
          <button
            type="submit"
            name="1"
            className={cn(
              "w-0 h-0 border-l-[9px] border-l-transparent border-b-[15px] border-b-green-500 border-r-[9px] border-r-transparent opacity-10 cursor-pointer",
              localGrade === 1 && "opacity-100"
            )}
            onClick={() => {
              setLocalGrade(localGrade === 1 ? 0 : 1);
            }}
          />
          <button
            type="submit"
            name="2"
            className={cn(
              "rounded-full size-[15px] bg-yellow-400 opacity-10 cursor-pointer",
              localGrade === 2 && "opacity-100"
            )}
            onClick={() => {
              setLocalGrade(localGrade === 2 ? 0 : 2);
            }}
          />
          <button
            type="submit"
            name="3"
            className={cn(
              "rounded-[2px] size-[14px] ml-[1px] bg-red-500 opacity-10 cursor-pointer",
              localGrade === 3 && "opacity-100"
            )}
            onClick={() => {
              setLocalGrade(localGrade === 3 ? 0 : 3);
            }}
          />
        </div>
      </form>
    </>
  );
}
