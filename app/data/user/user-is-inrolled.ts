import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function userIsInrolled(courseId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return false;
  }
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      courseId_userId: {
        courseId: courseId,
        userId: session.user.id,
      },
    },
    select: {
      status: true,
    },
  });
  if (enrollment?.status === "ACTIVE") {
    return true;
  }
  return false;
}
