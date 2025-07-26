import "server-only";

import { prisma } from "@/lib/db";
import { requireUser } from "./require-user";

export async function getEnrolledCourses() {
  const user = await requireUser();
  const courses = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    select: {
      Course: {
        select: {
          id: true,
          title: true,
          slug: true,
          smallDescription: true,
          duration: true,
          level: true,
          fileKey: true,
          category: true,
          chapters: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return courses;
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];
