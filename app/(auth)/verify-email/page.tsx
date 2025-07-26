"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { LineSquiggle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailRequest />;
    </Suspense>
  );
}

const VerifyEmailRequest = () => {
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const isOtpValid = otp.length === 6;
  const handleVerify = () => {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified");
            router.push("/");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  };
  return (
    <div className="flex items-center justify-center ">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Enter the OTP code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <InputOTP
              maxLength={6}
              className="gap-2"
              value={otp}
              onChange={(val) => setOtp(val)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <LineSquiggle />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={emailPending || !isOtpValid}
          >
            {emailPending ? "Verifying..." : "Verify Email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
