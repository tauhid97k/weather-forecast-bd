import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="text-center mt-8 h-screen grid place-items-center">
      <div className="text-center">
        <h1>Home Page</h1>
        <div className="flex items-center gap-4 mt-8">
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/first-card">First Card</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/second-card">Second Card</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/daily-summery">Daily Summery</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
