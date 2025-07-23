import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px] p-6 shadow-lg border border-border">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            Payment Successful!
          </h1>

          <p className="text-muted-foreground max-w-sm">
            Thank you for your purchase! You now have access to your course.
            Start learning right away.
          </p>

          <div className="flex flex-col gap-2 w-full mt-4">
            <Link href="/courses">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                Start Learning
              </Button>
            </Link>

            <Link href="/">
              <Button className="w-full" variant="outline">
                Return to Home
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your inbox
          </p>
        </div>
      </Card>
    </div>
  );
}
