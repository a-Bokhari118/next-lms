"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
} from "@/lib/zod-schema";
import { revalidatePath } from "next/cache";

export const editCourse = async (
  data: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const validatedData = courseSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.course.update({
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
          courseId: validatedData.data.courseId,
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

export const createLesson = async (
  data: LessonSchemaType
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const validatedData = lessonSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.lesson.findFirst({
        where: {
          chapterId: validatedData.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.lesson.create({
        data: {
          title: validatedData.data.name,
          chapterId: validatedData.data.chapterId,
          description: validatedData.data.description,
          thumbnailKey: validatedData.data.thumbnailKey,
          videoKey: validatedData.data.videoKey,
          position: maxPosition ? maxPosition.position + 1 : 1,
        },
      });
      revalidatePath(`/admin/courses/${data.courseId}/edit`);
    });
    return {
      status: "success",
      message: "Lesson created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create lesson",
    };
  }
};

export const deleteLesson = async (
  lessonId: string,
  chapterId: string,
  courseId: string
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const chapterWithLessons = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        lessons: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });
    if (!chapterWithLessons) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }
    const lessons = chapterWithLessons.lessons;
    const lessonToDelete = lessons.find((lesson) => lesson.id === lessonId);
    if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found",
      };
    }

    const remainingLessons = lessons.filter((lesson) => lesson.id !== lessonId);
    const update = remainingLessons.map((lesson, index) =>
      prisma.lesson.update({
        where: { id: lesson.id },
        data: { position: index + 1 },
      })
    );
    await prisma.$transaction([
      ...update,
      prisma.lesson.delete({
        where: { id: lessonId },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Lesson deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to delete lesson",
    };
  }
};

export const deleteChapter = async (
  chapterId: string,
  courseId: string
): Promise<ApiResponse> => {
  await requireAdmin();

  try {
    const courseWithChapters = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });
    if (!courseWithChapters) {
      return {
        status: "error",
        message: "Course not found",
      };
    }
    const chapters = courseWithChapters.chapters;
    const chapterToDelete = chapters.find(
      (chapter) => chapter.id === chapterId
    );
    if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found",
      };
    }

    const remainingChapters = chapters.filter(
      (chapter) => chapter.id !== chapterId
    );
    const update = remainingChapters.map((chapter, index) =>
      prisma.chapter.update({
        where: { id: chapter.id },
        data: { position: index + 1 },
      })
    );
    await prisma.$transaction([
      ...update,
      prisma.lesson.deleteMany({ where: { chapterId } }),
      prisma.chapter.delete({
        where: { id: chapterId },
      }),
    ]);
    revalidatePath(`/admin/courses/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to delete chapter",
    };
  }
};
