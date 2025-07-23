import { PublicCourse } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ArrowRight, BookOpen, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const PublicCourseCard = ({ course }: { course: PublicCourse }) => {
  const tumbnailUrl = useConstructUrl(course.fileKey);
  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{course.level}</Badge>
      <Image
        src={tumbnailUrl}
        alt={course.title}
        width={600}
        height={400}
        className="w-full rounded-t-xl  h-full aspect-video object-cover"
      />
      <CardContent className="p-4">
        <Link
          href={`/courses/${course.slug}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {course.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-tight mt-2">
          {course.smallDescription}
        </p>
        <div className="flex items-center gap-x-5 mt-4">
          <div className="flex items-center gap-x-2">
            <Timer className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {course.duration}h
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <BookOpen className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <span className="text-sm text-muted-foreground">
              {course.category}
            </span>
          </div>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className={buttonVariants({
            variant: "outline",
            className: "mt-4 w-full",
          })}
        >
          Read More
          <ArrowRight className="size-4 ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
};

export const PublicCourseCardSkeleton = () => {
  return (
    <Card className="group relative py-0 gap-0">
      {/* Badge skeleton */}
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-5 w-16" />
      </div>

      {/* Image skeleton */}
      <Skeleton className="w-full aspect-video rounded-t-xl" />

      <CardContent className="p-4">
        {/* Title skeleton */}
        <Skeleton className="h-7 w-[80%] mb-2" />

        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-[60%] mt-2" />

        {/* Stats skeleton */}
        <div className="flex items-center gap-x-5 mt-4">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  );
};
