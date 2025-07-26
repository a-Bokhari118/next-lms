"use client";
import { PublicSingleLessonType } from "@/app/data/course/get-lesson-content";
import RenderEditorText from "@/components/rich-text-editor/render-editor-text";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookIcon, CheckCircle, OctagonAlert } from "lucide-react";
import { useTransition } from "react";
import { markLessonAsCompleted } from "../actions";
import { toast } from "sonner";

export default function CourseContent({
  lesson,
}: {
  lesson: PublicSingleLessonType;
}) {
  const [isPending, startTransition] = useTransition();
  const VideoPlayer = ({
    videoKey,
    thumbnailKey,
  }: {
    videoKey: string;
    thumbnailKey: string;
  }) => {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <OctagonAlert className="size-20 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No Video Available</p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          poster={thumbnailUrl}
          controls
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const handleMarkAsCompleted = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonAsCompleted(lesson.id, lesson.chapter.course.slug)
      );

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
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        videoKey={lesson.videoKey ?? ""}
        thumbnailKey={lesson.thumbnailKey ?? ""}
      />
      <div className="py-4 border-b">
        {lesson.lessonProgress.length > 0 ? (
          <>
            <Button
              variant="outline"
              className="text-green-600 hover:text-green-600"
            >
              <CheckCircle className="size-4 mr-2 text-green-600 " />
              Completed
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={handleMarkAsCompleted}
              disabled={isPending}
            >
              <CheckCircle className="size-4 mr-2 text-green-600" />
              {isPending ? "Marking as completed..." : "Mark as completed"}
            </Button>
          </>
        )}
      </div>
      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold leading-tight text-foreground mb-2">
          {lesson.title}
        </h1>
        {lesson.description && (
          <RenderEditorText json={JSON.parse(lesson.description)} />
        )}
      </div>
    </div>
  );
}
