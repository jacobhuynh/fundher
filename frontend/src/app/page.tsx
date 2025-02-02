import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { About } from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Features />
        <About />
        <Footer />
      </main>
    </div>
  );
}
