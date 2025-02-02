import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Navigation } from "@/components/navigation";
import { Dashboard } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <main className="flex-1">
        <Navigation />
        <Hero />
        <Features />
      </main> */}
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}
