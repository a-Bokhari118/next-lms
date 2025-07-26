import { getSingleCourse } from "@/app/data/course/get-course";
import RenderEditorText from "@/components/rich-text-editor/render-editor-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
} from "@tabler/icons-react";
import { Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Layers, GraduationCap, Medal } from "lucide-react";
import { userIsInrolled } from "@/app/data/user/user-is-enrolled";
import { EnrollmentButton } from "./_components/inrollment-button";
import Link from "next/link";

export default async function CourseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getSingleCourse(slug);
  const imageUrl = useConstructUrl(course.fileKey);
  const isInrolled = await userIsInrolled(course.id);
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <Image src={imageUrl} alt={course.title} fill priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
              {course.smallDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconChartBar className="size-4" />
              {course.level}
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconCategory className="size-4" />
              {course.category}
            </Badge>
            <Badge className="flex items-center gap-1 px-3 py-1">
              <IconClock className="size-4" />
              {course.duration}h
            </Badge>
          </div>
          <Separator className="my-8" />
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Description
            </h2>
            <RenderEditorText json={JSON.parse(course.description)} />
          </div>
        </div>
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Content
            </h2>
            <div>
              {course.chapters.length} chapters |{" "}
              {course.chapters.reduce(
                (acc, chapter) => acc + chapter.lessons.length,
                0
              ) || 0}{" "}
              lessons
            </div>
          </div>

          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                  <CollapsibleTrigger>
                    <div>
                      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h2 className="text-xl font-semibold text-left">
                                {chapter.title}
                              </h2>
                              <p className="text-sm text-muted-foreground mt-1 text-left">
                                {chapter.lessons.length}{" "}
                                {chapter.lessons.length > 1
                                  ? "lessons"
                                  : "lesson"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <Badge variant="outline" className="text-xs">
                              {chapter.lessons.length}{" "}
                              {chapter.lessons.length > 1
                                ? "lessons"
                                : "lesson"}
                            </Badge> */}
                            <IconChevronDown className="size-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t bg-muted/20">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonsIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center size-8 justify-center rounded-full bg-background border-2 border-primary/30">
                              <Play className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium ">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Lesson {lessonsIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Price</span>
                <span className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(course.price)}
                </span>
              </div>

              <div className="mb-6 space-y-3 rounded-lg bg-muted/20 p-4">
                <h4 className="font-medium">Course Overview:</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/20 text-primary">
                      <Layers className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Structure</p>
                      <p className="text-sm text-muted-foreground">
                        {course.chapters.length} chapters with{" "}
                        {course.chapters.reduce(
                          (acc, chapter) => acc + chapter.lessons.length,
                          0
                        )}{" "}
                        lessons
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/20 text-primary">
                      <GraduationCap className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Learning Format</p>
                      <p className="text-sm text-muted-foreground">
                        Self-paced online learning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center size-8 justify-center rounded-full bg-primary/20 text-primary">
                      <Medal className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certificate</p>
                      <p className="text-sm text-muted-foreground">
                        Earn upon completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {isInrolled ? (
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/dashboard`}>View Course</Link>
                  </Button>
                ) : (
                  <EnrollmentButton courseId={course.id} />
                )}

                <div className="rounded-lg border p-4">
                  <h5 className="font-medium mb-2">Enrollment Benefits:</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="size-4" /> Lifetime course access
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-4" /> Mobile & desktop learning
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-4" /> Downloadable resources
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-4" /> Progress tracking
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
