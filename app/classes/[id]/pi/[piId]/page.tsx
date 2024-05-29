import LoadingLogo from "@/app/components/LoadingLogo";
import PiGradeBoxs from "@/app/components/PiGradeBoxs";
import StudentRollBox from "@/app/components/StudentRollBox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "@/helpers/auth.helper";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getPis(piId: string) {
  return await prisma.student.findMany({
    where: {
      piId: piId,
    },
    include: {
      pi: {
        include: {
          class: {
            include: {
              teacher: true,
            },
          },
        },
      },
    },
  });
}

export default async function PiGradingRoute({
  params,
}: {
  params: { piId: string };
}) {
  return (
    <>
      <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl h-full shadow-2xl shadow-black/10 border border-black/5 overflow-scroll no-scrollbar">
        <div className="flex items-center justify-center p-4 px-6">
          <Suspense fallback={<Skeleton className="w-24 h-3" />}>
            <TotalStudentsHeading piId={params.piId} />
          </Suspense>

          {/* Any action button on right side on top */}
        </div>

        <Separator className="bg-black/5" />

        <Suspense fallback={<LoadingLogo />}>
          <ShowStudents piId={params.piId} />
        </Suspense>
      </div>
    </>
  );
}

async function TotalStudentsHeading({ piId }: { piId: string }) {
  const totalStudents = (await getPis(piId)).length;

  return (
    <>
      <h1 className="font-semibold text-sm">
        Total students - {totalStudents}
      </h1>
    </>
  );
}

async function ShowStudents({ piId }: { piId: string }) {
  await checkAuth();

  const students = await getPis(piId);

  const teacherIdOfClass = students[0].pi.class.teacherId;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (user?.id !== teacherIdOfClass) {
    redirect("/classes");
  }

  return (
    <>
      {students
        .sort((a, b) => parseInt(a.roll) - parseInt(b.roll))
        .map((s) => (
          <div
            className={cn("border-b flex items-center justify-between pr-11")}
            key={s.id}
          >
            <StudentRollBox
              grade={s.grade}
              studentId={s.id}
              roll={s.roll}
              isRedMarked={s.isRedMarked}
            />

            <PiGradeBoxs piGrade={s.grade} studentId={s.id} />
          </div>
        ))}
    </>
  );
}
