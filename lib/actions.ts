"use server";

import { prisma } from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const createClass = async ({
  className,
  section,
}: {
  className: string;
  section: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    const isClassExists = await prisma.class.findFirst({
      where: {
        class: className,
        section: section,
        teacherId: user?.id,
      },
    });

    if (!isClassExists) {
      await prisma.class.create({
        data: {
          class: className,
          section: section,
          teacherId: user?.id ?? "",
        },
      });
      revalidatePath("/classes");
      return {
        message: `Class ${className}-${section} created!`,
        success: true,
      }; // Return a success message.
    }

    return {
      message: `Class ${className}-${section} already exists!`,
      success: false,
    };
  } catch (error: any) {
    return { message: error.message, success: false }; // Return an error message.
  }
};

export const deleteClass = async ({ id }: { id: string }) => {
  try {
    await prisma.class.delete({ where: { id } });
    revalidatePath("/classes");
    return {
      message: `Class deleted!`,
      success: true,
    }; // Return a success message.
  } catch (error: any) {
    return { message: error.message, success: false }; // Return an error message.
  }
};

export const deleteChapter = async ({
  id,
  classId,
}: {
  id: string;
  classId: string;
}) => {
  try {
    await prisma.pi.delete({ where: { id } });
    revalidatePath("/classes/" + classId);
    return {
      message: `Chapter deleted!`,
      success: true,
    }; // Return a success message.
  } catch (error: any) {
    return { message: error.message, success: false }; // Return an error message.
  }
};

export const checkStudentsInClass = async ({ id }: { id: string }) => {
  try {
    const students = await prisma.totalStudent.findMany({
      where: { classId: id },
    });
    return students;
  } catch (error: any) {
    return null; // Return an error message.
  }
};

export const createPi = async ({
  classId,
  chapter,
}: {
  classId: string;
  chapter: number;
}) => {
  try {
    if (chapter === 0)
      return {
        message: `Chapter cannot be 0!`,
        success: false,
      };

    const piExists = await prisma.pi.findFirst({
      where: {
        classId,
        chapter,
      },
    });

    if (piExists) {
      return {
        message: `Chapter ${chapter} already exists!`,
        success: false,
      };
    }

    const pi = await prisma.pi.create({
      data: {
        classId,
        chapter,
      },
    });

    const totalStudentNumber = await prisma.totalStudent.findFirst({
      where: { classId: classId },
    });

    for (let i = 0; i < totalStudentNumber!.totalStudents; i++) {
      await prisma.student.create({
        data: { roll: String(i + 1), piId: pi.id },
      });
    }

    revalidatePath("/classes/" + classId);
    return {
      message: `Pi created!`,
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return { message: error.message, success: false };
  }
};

export const createStudentsNumber = async ({
  howMany,
  classId,
}: {
  howMany: number;
  classId: string;
}) => {
  try {
    await prisma.totalStudent.create({
      data: {
        classId,
        totalStudents: howMany,
      },
    });
    revalidatePath("/classes");
    return {
      message: `Students added!`,
      success: true,
    }; // Return a success message.
  } catch (error: any) {
    return { message: error.message, success: false }; // Return an error message.
  }
};

export const updateGradeBox = async ({
  studentId,
  grade,
}: {
  studentId: string;
  grade: number;
}) => {
  try {
    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        grade: grade,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateStudentRedMark = async ({
  studentId,
  isRedMarked,
}: {
  studentId: string;
  isRedMarked: boolean;
}) => {
  try {
    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        isRedMarked: isRedMarked,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
