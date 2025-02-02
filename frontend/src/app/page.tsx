import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Navigation } from "@/components/navigation";
import { Dashboard } from "@/components/dashboard";
import { Tracker } from "@/components/tracker";
import { Footer } from "@/components/footer";
import { About } from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <main className="flex-1">
        <Navigation />
        <Hero />
        <Features />
        <About />
        <Footer />
      </main> */}
      <main className="flex-1">
        <Dashboard />
        <Tracker />
      </main>
    </div>
  );
}
