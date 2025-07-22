import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  createLink?: string;
}

export const EmptyState = ({
  title = "No courses found",
  description = "Get started by creating your first course",
  createLink = "/admin/courses/create",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-4 text-center">
      <div className="relative h-40 w-40 mb-6">
        <Image
          src="/window.svg"
          alt="Empty courses"
          fill
          className="opacity-50"
        />
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {description}
      </p>
      <Link href={createLink}>
        <Button size="lg">Create your first course</Button>
      </Link>
    </div>
  );
};
