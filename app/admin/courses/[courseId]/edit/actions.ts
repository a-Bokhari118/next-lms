"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schema";

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
