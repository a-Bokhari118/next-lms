import CourseSidebar from "../_components/course-sidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

export default async function DashboardCourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);
  return (
    <div className="flex flex-1">
      <div className="w-80 xl:w-96 h-full border-r border-border shrink-0">
        <CourseSidebar course={course} />
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
