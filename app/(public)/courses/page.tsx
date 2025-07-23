import { getAllCourses } from "@/app/data/course/get-all-courses";
import { Suspense } from "react";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/public-course-card";

export default function CoursesPage() {
  return (
    <div className="mt-6">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Explore our courses and find the one that's right for you.
        </p>
      </div>
      <Suspense fallback={<RenderCoursesSkeleton />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}

const RenderCourses = async () => {
  const courses = await getAllCourses();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

const RenderCoursesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};
