import { Hero } from "@/components/hero";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
