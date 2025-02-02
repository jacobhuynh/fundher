import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-6xl font-bold tracking-tight">
            Apply for Women's Scholarships and Grants with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore a curated list of funding opportunities and unlock new
            possibilities for your education and career.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/browse">
              <div className="rounded-full bg-indigo-600 h-14 w-48 flex items-center justify-center text-white border-2 border-gray-300 font-bold">
                Join Us
              </div>
            </Link>
            <Link href="#features">
              <div className="rounded-full bg-white h-14 w-48 flex items-center justify-center border-2 border-gray-300 font-bold">
                Features
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="w-10 h-10 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
}
