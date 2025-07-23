"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zod-schema";

export const createCourse = async (
  data: CourseSchemaType
): Promise<ApiResponse> => {
  const session = await requireAdmin();

  try {
    const validatedData = courseSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    const stripeProductData = await stripe.products.create({
      name: validatedData.data.title,
      description: validatedData.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: Number(validatedData.data.price) * 100,
      },
    });

    const course = await prisma.course.create({
      data: {
        ...validatedData.data,
        userId: session?.user.id!,
        stripePriceId: stripeProductData.default_price as string,
        price: Number(validatedData.data.price),
        duration: Number(validatedData.data.duration),
      },
    });
    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
};
