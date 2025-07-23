"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { enrollInCourse } from "../actions";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(enrollInCourse(courseId));
      if (error) {
        toast.error("Unexpected error occurred");
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };
  return (
    <Button className="w-full" onClick={onSubmit} disabled={isPending}>
      {isPending ? "Enrolling..." : "Enroll Now"}
    </Button>
  );
}
