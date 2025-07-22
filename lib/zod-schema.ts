import { z } from "zod";
import { CourseLevel, CourseStatus } from "./generated/prisma";

export const Categoies = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "AI",
  "Machine Learning",
  "Blockchain",
  "Cybersecurity",
  "DevOps",
  "Cloud Computing",
  "Game Development",
  "Design",
  "Marketing",
  "Business",
  "Personal Development",
  "Health and Fitness",
  "Music",
  "Photography",
  "Writing",
  "Language Learning",
] as const;
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  fileKey: z.string().min(1, { message: "Thumbnail is required" }),
  price: z.string().min(1, { message: "Price must be at least 1" }),
  duration: z
    .string()
    .min(1, { message: "Duration must be at least 1" })
    .max(500, { message: "Duration must be less than 500" }),
  level: z.enum(CourseLevel),
  category: z.enum(Categoies, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters" })
    .max(200, {
      message: "Small description must be less than 200 characters",
    }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  status: z.enum(CourseStatus, { message: "Status is required" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

export const chapterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  courseId: z.string().uuid({ message: "Invalid Course ID" }),
});

export type ChapterSchemaType = z.infer<typeof chapterSchema>;

export const lessonSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  courseId: z.string().uuid({ message: "Invalid Course ID" }),
  chapterId: z.string().uuid({ message: "Invalid Chapter ID" }),
  description: z.string().optional(),
  thumbnailKey: z.string().optional(),
  videoKey: z.string().optional(),
});

export type LessonSchemaType = z.infer<typeof lessonSchema>;
