"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, LessonSchemaType } from "@/lib/zod-schema";

export const updateLesson = async (
  lessonId: string,
  values: LessonSchemaType
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const validatedData = lessonSchema.safeParse(values);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: validatedData.data.name,
        description: validatedData.data.description,
        thumbnailKey: validatedData.data.thumbnailKey,
        videoKey: validatedData.data.videoKey,
      },
    });
    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
};
