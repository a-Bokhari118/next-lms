"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { UserButton } from "./user-button";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];
const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center px-4 md:px-6 lg:px-8 h-20">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="NEXT LMS" width={100} height={100} />
          <span className="text-2xl font-bold">NEXT LMS</span>
        </Link>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between ">
          <div className="flex items-center space-x-4">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? (
              <Skeleton className="w-10 h-10 rounded-full" />
            ) : session ? (
              <UserButton
                user={{
                  email: session.user.email,
                  name: session.user.name,
                  image: session.user.image || "",
                }}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
