import { Separator } from "@/components/ui/separator";
import { checkAuth } from "@/helpers/auth.helper";
import { prisma } from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import ClassCard from "../components/ClassCard";
import CreateClassButton from "../components/CreateClassButton";
import LoadingLogo from "../components/LoadingLogo";

const getClasses = async (teacherId: string) => {
  const classes = await prisma.class.findMany({
    where: {
      teacherId,
    },
    include: {
      totalStudent: true,
    },
  });
  return classes;
};

export default async function ClassesPage() {
  await checkAuth();
  return (
    <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl h-full shadow-2xl shadow-black/10 border border-black/5 overflow-hidden">
      <div className="flex items-center justify-between p-4 px-6">
        <h1 className="font-bold text-sm md:text-base">All Classes</h1>

        <CreateClassButton />
      </div>

      <Separator className="bg-black/5" />

      <div className="flex-1 overflow-x-hidden overflow-y-scroll no-scrollbar">
        <Suspense fallback={<LoadingLogo />}>
          <ShowClasses />
        </Suspense>
      </div>
    </div>
  );
}

async function ShowClasses() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const classes = await getClasses(user?.id ?? "");

  const sortedClasses = classes.sort((a, b) => {
    const classA = parseInt(a.class, 10);
    const classB = parseInt(b.class, 10);

    if (classA !== classB) {
      return classB - classA; // Sort by className in descending order
    }

    return a.section.localeCompare(b.section); // Sort by section in ascending order
  });

  console.log(sortedClasses[1].totalStudent[0].totalStudents);

  return (
    <>
      {!classes.length && <NoClass />}

      {classes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-3 p-4">
          {sortedClasses.map((c) => (
            <ClassCard
              key={c.id}
              className={c.class}
              section={c.section}
              id={c.id}
              totalStudent={c.totalStudent[0]?.totalStudents}
            />
          ))}
        </div>
      )}
    </>
  );
}

function NoClass() {
  return (
    <>
      <div className="w-full h-full grid place-content-center">
        <h1 className="text-sm font-medium text-muted-foreground">
          No Classes.
        </h1>
      </div>
    </>
  );
}
