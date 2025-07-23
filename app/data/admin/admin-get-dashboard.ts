import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetDashboard() {
  await requireAdmin();
  const [totalUsers, totalCourses, totalLessons, totalCustomers] =
    await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.lesson.count(),
      prisma.user.count({
        where: {
          enrollments: {
            some: {},
          },
        },
      }),
    ]);

  return {
    totalUsers,
    totalCourses,
    totalLessons,
    totalCustomers,
  };
}
