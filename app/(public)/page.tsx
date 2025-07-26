"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Book,
  ChartArea,
  Gamepad,
  Headset,
  MonitorPlay,
  Quote,
  Star,
  Trophy,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Expert-Led Instruction",
    description: "Learn from industry professionals with real-world experience",
    icon: Book,
    color: "text-blue-500",
  },
  {
    title: "Interactive Learning",
    description:
      "Hands-on projects and real-world scenarios for practical success",
    icon: Gamepad,
    color: "text-purple-500",
  },
  {
    title: "Flexible Curriculum",
    description: "Learn at your own pace with unlimited access to courses",
    icon: ChartArea,
    color: "text-green-500",
  },
  {
    title: "Vibrant Community",
    description:
      "Connect with learners and educators worldwide access to course",
    icon: UsersIcon,
    color: "text-orange-500",
  },
];

const STATS = [
  { number: "50K+", label: "Active Students" },
  { number: "300+", label: "Expert Instructors" },
  { number: "1000+", label: "Course Library" },
  { number: "95%", label: "Success Rate" },
];

const BENEFITS = [
  {
    title: "Self-Paced Learning",
    description: "Study at your own speed and schedule",
    icon: MonitorPlay,
  },
  {
    title: "Certification",
    description: "Earn recognized certificates upon completion",
    icon: Trophy,
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it",
    icon: Headset,
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
  {
    name: "John Doe",
    role: "Software Engineer",
    content:
      "The platform is user-friendly and the courses are well-structured. I've learned a lot and it's been a great experience.",
    rating: 5,
  },
];

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center py-20 bg-gradient-to-b from-background to-background/50">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-grid-white/10" />
        </motion.div>

        <div className="container px-4">
          <motion.div
            className="text-center space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <Badge variant="outline" className="px-6 py-2 text-lg">
              Transform Your Future
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Master New Skills
              <br />
              <span className="text-primary">Shape Your Future</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join our global learning community and unlock your potential with
              expert-led courses
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: 0.2 } },
              }}
            >
              <Link href="/courses">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`${feature.color} mb-4`}>
                      <feature.icon className="size-12" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What You&apos;ll Get
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <benefit.icon className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Student Success Stories
            </h2>
          </motion.div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                      <Quote className="size-8 mb-4 text-primary" />
                      <p className="mb-4 text-muted-foreground italic">
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
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Join thousands of students already learning on our platform
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
