"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [isPendingEmailOtp, startTransitionEmailOtp] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter();
  const signInWithGithub = async () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  };
  const handleEmailOtp = () => {
    startTransitionEmailOtp(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification OTP sent to email");
            router.push(`/verify-email?email=${email}`);
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={signInWithGithub}
          disabled={isPending}
        >
          <GithubIcon className="size-4" />
          {isPending ? "Signing in..." : "Sign in with Github"}
        </Button>
        <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="x@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleEmailOtp}
            disabled={isPendingEmailOtp}
          >
            {isPendingEmailOtp ? "Sending OTP..." : "Continue with email"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
