import { adminGetSingleCourse } from "@/app/data/admin/admin-get-single-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseForm } from "./_components/edit-course-form";
import { CourseStructure } from "./_components/course-structure";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const courseId = (await params).courseId;
  const course = await adminGetSingleCourse(courseId);
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Edit Course: <span className="text-primary">{course.title}</span>
      </h1>

      <Tabs defaultValue="info" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Course Info</TabsTrigger>
          <TabsTrigger value="content">Course Content</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Course Info</CardTitle>
              <CardDescription>
                Edit the course information here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={course} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Edit the course content here.</CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure data={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
