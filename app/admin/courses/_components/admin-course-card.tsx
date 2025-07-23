import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Link from "next/link";
import {
  Badge,
  BookOpen,
  Eye,
  MoreVertical,
  Pen,
  Timer,
  Trash2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const AdminCourseCard = ({ course }: { course: AdminCourseType }) => {
  const url = useConstructUrl(course.fileKey);
  console.log(url);
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/courses/${course.slug}`}>
                <Eye /> Preview Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Pen /> Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/courses/${course.id}/delete`}
                className="text-destructive"
              >
                <Trash2 className="text-destructive" /> Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={url}
        alt={course.title}
        width={600}
        height={400}
        className="w-full rounded-t-lg object-cover aspect-video h-full"
      />
      <CardContent className="p-4">
        <Link
          className="font-medium text-lg line-clamp-2 hover:underline  transition-colors"
          href={`/admin/courses/${course.id}`}
        >
          {course.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-tight mt-2">
          {course.smallDescription}
        </p>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Timer className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <BookOpen className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.level}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Badge className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{course.status}</p>
          </div>
        </div>
        <Link
          href={`/admin/courses/${course.id}/edit`}
          className={buttonVariants({
            className: "mt-4 w-full",
          })}
        >
          <Pen /> Edit Course
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminCourseCard;

export const AdminCourseCardSkeleton = () => {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full aspect-video h-[300px] rounded-t-lg object-cover" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="w-3/4 h-6 rounded mb-2" />
        <Skeleton className="w-full  mb-4 rounded" />
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6  rounded-md " />
            <Skeleton className="h-4 w-10  rounded " />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6  rounded-md " />
            <Skeleton className="h-4 w-10  rounded " />
          </div>
        </div>
        <Skeleton className="mt-4 w-full h-10 rounded" />
      </CardContent>
    </Card>
  );
};
