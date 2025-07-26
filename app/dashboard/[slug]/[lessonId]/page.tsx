import { getLessonContent } from "@/app/data/course/get-lesson-content";
import CourseContent from "./_components/course-content";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<CourseContentSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
}

async function LessonContentLoader({ lessonId }: { lessonId: string }) {
  const lesson = await getLessonContent(lessonId);
  return <CourseContent lesson={lesson} />;
}

const CourseContentSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-background pl-6">
      {/* Video skeleton */}
      <div className="aspect-video bg-muted rounded-lg w-full" />

      {/* Button skeleton */}
      <div className="py-4 border-b">
        <Skeleton className="h-10 w-[180px]" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-3 pt-3">
        <Skeleton className="h-9 w-2/3" /> {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  );
};
