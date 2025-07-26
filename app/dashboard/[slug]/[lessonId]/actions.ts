"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function markLessonAsCompleted(
  lessonId: string,
  slug: string
): Promise<ApiResponse> {
  const session = await requireUser();

  try {
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.id,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: session.id,
        lessonId,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);
    return {
      status: "success",
      message: "Progress updated",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to mark lesson as completed",
    };
  }
}
