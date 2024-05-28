import { prisma } from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    const dbTeacher = await prisma.teacher.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (!dbTeacher) {
      await prisma.teacher.create({
        data: {
          id: user?.id ?? "",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.redirect(new URL("/classes", request.url));
}
