import { cn } from "@/lib/utils";
import Link from "next/link";
import { Check, Play } from "lucide-react";

export default function LessonItem({
  lesson,
  slug,
  isActive,
  completed,
}: {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };
  slug: string;
  isActive: boolean;
  completed: boolean;
}) {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={cn(
        "flex items-center gap-3 w-full p-2.5 rounded-md hover:bg-secondary/20 transition-all",
        "text-sm text-muted-foreground hover:text-primary",
        completed && "bg-secondary/40",
        isActive && "ring-1 ring-primary"
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          completed ? "bg-emerald-500/20" : "bg-primary/20"
        )}
      >
        {completed ? (
          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
        ) : (
          <Play className="h-4 w-4 text-primary shrink-0" />
        )}
      </div>
      <span className="text-sm font-medium w-4 shrink-0">
        {lesson.position}.
      </span>
      <span className="line-clamp-1">{lesson.title}</span>
    </Link>
  );
}
