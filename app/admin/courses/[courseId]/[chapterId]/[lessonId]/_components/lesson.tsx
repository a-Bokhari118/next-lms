"use client";

import { AdminSingleLessonType } from "@/app/data/admin/admin-get-lesson";
import { Uploader } from "@/components/file-uploader.tsx/uploader";
import RichTextEditor from "@/components/rich-text-editor/editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../actions";
import { toast } from "sonner";

export const LessonForm = ({
  lesson,
  chapterId,
  courseId,
}: {
  lesson: AdminSingleLessonType;
  chapterId: string;
  courseId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson.title,
      chapterId: chapterId,
      courseId: courseId,
      description: lesson.description ?? undefined,
      thumbnailKey: lesson.thumbnailKey ?? undefined,
      videoKey: lesson.videoKey ?? undefined,
    },
  });

  const onSubmit = (values: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(lesson.id, values)
      );
      if (error) {
        toast.error("Something went wrong, please try again");
      }
      if (result?.status === "success") {
        toast.success("Lesson updated successfully");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className={buttonVariants({ variant: "outline", className: "mb-6" })}
      >
        <ArrowLeft className="size-4" />
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>Update the lesson details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="thumbnailKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
                      <FormControl>
                        <Uploader
                          value={field.value}
                          onChange={field.onChange}
                          fileTypeAccepted="image"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="videoKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video</FormLabel>
                      <FormControl>
                        <Uploader
                          value={field.value}
                          onChange={field.onChange}
                          fileTypeAccepted="video"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
