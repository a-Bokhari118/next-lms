import "server-only";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function getSingleCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      smallDescription: true,
      category: true,
      duration: true,
      level: true,
      fileKey: true,
      description: true,
      chapters: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
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
  return course;
}

export type PublicSingleCourseType = Awaited<
  ReturnType<typeof getSingleCourse>
>;
