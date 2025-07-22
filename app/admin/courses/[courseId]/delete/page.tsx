"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "./actions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DeleteCourse() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("Unexpected error occurred");
        return;
      }
      if (result.status === "success") {
        toast.success("Course deleted successfully");
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle>Delete Course</CardTitle>
          <CardDescription>
            Are you sure you want to delete this course? This action is
            irreversible.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Link
            href={`/admin/courses`}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
