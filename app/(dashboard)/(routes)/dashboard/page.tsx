import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      <p className="text-6xl text-green-500">Hello AI SASS(Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
