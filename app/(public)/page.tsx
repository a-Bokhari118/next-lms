"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { authClient } from "@/lib/auth-client";
import {
  Book,
  ChartArea,
  Gamepad,
  Headset,
  Quote,
  Star,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FEATURES = [
  {
    title: "Expert-Led Instruction",
    description:
      "Gain valuable knowledge by learning directly from industry professionals and seasoned educators who bring real-world experience to every lesson",
    icon: <Book className="size-12" />,
  },
  {
    title: "Interactive Learning",
    description:
      "Immerse yourself in hands-on projects and apply your skills to real-world scenarios that prepare you for practical success",
    icon: <Gamepad className="size-12" />,
  },
  {
    title: "Flexible Curriculum",
    description:
      "Learn on your own schedule with unlimited access to a comprehensive library of expertly crafted courses",
    icon: <ChartArea className="size-12" />,
  },
  {
    title: "Community",
    description:
      "Join a vibrant global community where learners and educators come together to share knowledge, experiences, and inspiration",
    icon: <UsersIcon className="size-12" />,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    content:
      "This platform transformed my learning journey. The expert-led courses and hands-on projects helped me transition into tech seamlessly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "The quality of instruction and the flexibility of the curriculum made it possible for me to upskill while working full-time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    content:
      "The community aspect is incredible. I've learned so much from both the instructors and fellow students. Highly recommended!",
    rating: 5,
  },
];

export default function Home() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const router = useRouter();

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center justify-center space-y-8">
          <Badge variant="outline">Where Education Meets Innovation</Badge>
          <h1 className="text-4xl md:text-6xl tracking-tight font-bold">
            Take Your Education to the Next Level
          </h1>
          <p className="text-lg text-muted-foreground max-w-[1000px] md:text-2xl text-center">
            Empower yourself to grow by learning from expert-led courses, or
            take the lead by sharing your own knowledge through creating
            impactful educational content. Whether you're here to gain new
            skills or to teach what you know.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Sign In
            </Link>{" "}
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        {FEATURES.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl  mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied learners who have transformed their
            careers
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full  mx-auto"
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 h-full">
                  <Quote className="size-8 mb-4 text-primary" />
                  <p className="mb-4 text-muted-foreground">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
    </>
  );
}
