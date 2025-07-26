import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import { getAllCourses } from "../data/course/get-all-courses";
import { EmptyState } from "@/components/empty-state";
import { PublicCourseCard } from "../(public)/_components/public-course-card";
import { CourseProgressCard } from "./_components/course-progress-card";

export default async function DashboardPage() {
  const [allCourses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-sm text-muted-foreground">
          Courses you have access to
        </p>
      </div>
      <div>
        {enrolledCourses && enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Courses Enrolled"
            description="You dont have any courses enrolled"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      <section className="mt-10 ">
        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-sm text-muted-foreground">
            All courses available to you
          </p>
        </div>
        {allCourses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id
            )
        ).length === 0 ? (
          <EmptyState
            title="No Courses Available"
            description="You dont have any courses available to you"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allCourses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )
              )
              .map((course) => (
                <PublicCourseCard key={course.id} course={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
