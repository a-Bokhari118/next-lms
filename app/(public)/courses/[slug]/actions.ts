"use server";

import { requireUser } from "@/app/data/user/require-user";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function enrollInCourse(
  courseId: string
): Promise<ApiResponse | never> {
  const user = await requireUser();
  let checkoutUrl: string;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (userWithStripeCustomerId && userWithStripeCustomerId.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          courseId_userId: {
            courseId: courseId,
            userId: user.id,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });

      if (existingEnrollment && existingEnrollment.status === "ACTIVE") {
        return {
          status: "error",
          message: "You are already enrolled in this course",
        };
      }
      let enrollment;
      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            amount: course.price,
            status: "PENDING",
            updatedAt: new Date(),
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: courseId,
            amount: course.price,
            status: "PENDING",
            updatedAt: new Date(),
          },
        });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: "price_1RnzdeCNQdPurw36zcqRByWi",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.BETTER_AUTH_URL}/payment/success`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          userId: user.id,
          courseId: courseId,
          enrollmentId: enrollment.id,
        },
      });

      return {
        enrollment: enrollment,
        checkoutUrl: checkoutSession.url,
      };
    });
    checkoutUrl = result.checkoutUrl!;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return {
        status: "error",
        message: "Failed to create checkout session",
      };
    }
    return {
      status: "error",
      message: "Failed to enroll in course",
    };
  }

  redirect(checkoutUrl);
}
