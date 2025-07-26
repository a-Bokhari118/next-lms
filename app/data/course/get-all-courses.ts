import "server-only";

import { prisma } from "@/lib/db";

export async function getAllCourses() {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return courses;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
