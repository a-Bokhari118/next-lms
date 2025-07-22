import { adminGetSingleLesson } from "@/app/data/admin/admin-get-lesson";
import { LessonForm } from "./_components/lesson";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>;
}) {
  const { lessonId, chapterId, courseId } = await params;
  const lesson = await adminGetSingleLesson(lessonId);
  return (
    <LessonForm lesson={lesson} chapterId={chapterId} courseId={courseId} />
  );
}
