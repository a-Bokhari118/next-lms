"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
} from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";

export const editCourse = async (
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> => {
  const session = await requireAdmin();

  try {
    const validatedData = courseSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...validatedData.data,
        price: Number(validatedData.data.price),
        duration: Number(validatedData.data.duration),
      },
    });
    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
};

export const reorderLessons = async (
  courseId: string,
  lessons: { id: string; position: number }[],
  chapterId: string
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "No lessons to reorder",
      };
    }
    const update = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId,
        },
        data: {
          position: lesson.position,
        },
      })
    );
    await prisma.$transaction(update);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to reorder lessons",
    };
  }
};

export const reorderChapters = async (
  courseId: string,
  chapters: { id: string; position: number }[]
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No chapters to reorder",
      };
    }
    const update = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId,
        },
        data: {
          position: chapter.position,
        },
      })
    );
    await prisma.$transaction(update);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapters reordered successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to reorder chapters",
    };
  }
};

export const createChapter = async (
  data: ChapterSchemaType
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const validatedData = chapterSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.chapter.findFirst({
        where: {
          courseId: data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.chapter.create({
        data: {
          title: validatedData.data.name,
          courseId: data.courseId,
          position: maxPosition ? maxPosition.position + 1 : 1,
        },
      });
      revalidatePath(`/admin/courses/${data.courseId}/edit`);
    });
    return {
      status: "success",
      message: "Chapter created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
};
