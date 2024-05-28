import CreatePiButton from "@/app/components/CreatePiButton";
import LoadingLogo from "@/app/components/LoadingLogo";
import PiCard from "@/app/components/PiCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/prisma/db";
import { Suspense } from "react";

const getPis = async (classId: string) => {
  return await prisma.class.findFirst({
    where: {
      id: classId,
    },
    include: {
      pi: true,
    },
  });
};

export default function PiRoute({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl h-full shadow-2xl shadow-black/10 border border-black/5 overflow-hidden">
      <div className="flex items-center justify-between p-4 px-6">
        <ClassHeading classId={params.id} />

        <CreatePiButton classId={params.id} />
      </div>

      <Separator className="bg-black/5" />

      <div className="flex-1 overflow-x-hidden overflow-y-scroll no-scrollbar">
        <Suspense fallback={<LoadingLogo />}>
          <ShowPis classId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function ShowPis({ classId }: { classId: string }) {
  const classPi = await getPis(classId);

  return (
    <>
      {!classPi?.pi.length ? (
        <NoPi />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 p-4">
          {classPi?.pi
            .sort((a, b) => a.chapter - b.chapter)
            .map((pi) => (
              <PiCard
                key={pi.id}
                chapter={pi.chapter}
                id={pi.id}
                classId={classId}
              />
            ))}
        </div>
      )}
    </>
  );
}

function NoPi() {
  return (
    <>
      <div className="w-full h-full grid place-content-center">
        <h1 className="text-sm font-medium text-muted-foreground">
          No Performance Indicatior found.
        </h1>
      </div>
    </>
  );
}

async function ClassHeading({ classId }: { classId: string }) {
  const classPi = await getPis(classId);
  return (
    <Suspense fallback={<Skeleton className="w-24 h-3" />}>
      <h1 className="font-bold text-sm md:text-base" id="all_classes_text">
        All Chapters ({classPi?.class} {"->"} {classPi?.section})
      </h1>
    </Suspense>
  );
}
