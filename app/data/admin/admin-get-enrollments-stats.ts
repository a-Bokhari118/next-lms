import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";

export async function adminGetEnrollmentsStats() {
  await requireAdmin();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let last30DaysEnrollments: { date: string; enrollments: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last30DaysEnrollments.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });

    enrollments.forEach((enrollment) => {
      const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
      const dayIndex = last30DaysEnrollments.findIndex(
        (day) => day.date === enrollmentDate
      );
      if (dayIndex !== -1) {
        last30DaysEnrollments[dayIndex].enrollments++;
      }
    });
  }
  return last30DaysEnrollments;
}
