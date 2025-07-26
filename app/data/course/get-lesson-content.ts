import "server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../user/require-user";

export async function getLessonContent(lessonId: string) {
  const session = await requireUser();
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      videoKey: true,
      thumbnailKey: true,
      position: true,
      lessonProgress: {
        where: {
          userId: session.id,
        },
        select: {
          lessonId: true,
          completed: true,
        },
      },
      chapter: {
        select: {
          courseId: true,
          course: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });
  if (!lesson) {
    return notFound();
  }

  const enrolledCourse = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        courseId: lesson.chapter.courseId,
        userId: session.id,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrolledCourse || enrolledCourse.status !== "ACTIVE") {
    return notFound();
  }

  return lesson;
}

export type PublicSingleLessonType = Awaited<
  ReturnType<typeof getLessonContent>
>;
