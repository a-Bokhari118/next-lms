import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export const adminGetSingleCourse = async (courseId: string) => {
  await requireAdmin();
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      price: true,
      level: true,
      fileKey: true,
      slug: true,
      status: true,
      category: true,
      description: true,
      chapters: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              videoKey: true,
              position: true,
            },
          },
        },
      },
    },
  });
  if (!course) {
    notFound();
  }
  return course;
};

export type AdminSingleCourseType = Awaited<
  ReturnType<typeof adminGetSingleCourse>
>;
