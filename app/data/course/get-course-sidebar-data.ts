import "server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../user/require-user";

export async function getCourseSidebarData(slug: string) {
  const session = await requireUser();
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      category: true,
      duration: true,
      level: true,
      fileKey: true,
      chapters: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: session.id,
                },
                select: {
                  lessonId: true,
                  completed: true,
                },
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) {
    return notFound();
  }

  const enrolledCourse = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        courseId: course.id,
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
  return course;
}

export type CourseSidebarType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;
