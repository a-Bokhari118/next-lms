import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export const adminGetSingleLesson = async (lessonId: string) => {
  await requireAdmin();
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      thumbnailKey: true,
      videoKey: true,
      description: true,
      position: true,
    },
  });
  if (!lesson) {
    notFound();
  }
  return lesson;
};

export type AdminSingleLessonType = Awaited<
  ReturnType<typeof adminGetSingleLesson>
>;
