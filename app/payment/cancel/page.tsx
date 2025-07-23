import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px] p-6 shadow-lg border border-border">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-destructive/10 p-3">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground max-w-sm">
            Your payment process has been cancelled. No charges have been made
            to your account.
          </p>

          <div className="flex flex-col gap-2 w-full mt-4">
            <Link href="/courses">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Browse Courses
              </Button>
            </Link>

            <Link href="/">
              <Button className="w-full" variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
