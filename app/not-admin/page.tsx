import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="p-6 max-w-md w-full">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-muted-foreground">
            Sorry, you don&apos;t have admin privileges to access this area.
          </p>
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
