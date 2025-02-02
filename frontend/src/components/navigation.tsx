"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-lg">
              fundHer.
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="relative transition-colors text-foreground hover:text-[#7c3aed] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7c3aed] after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </Link>
            <Link
              href="/about_us"
              className="relative transition-colors text-foreground hover:text-[#7c3aed] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7c3aed] after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
          </nav>
        </div>
        <div className="bg-indigo-600 text-sm flex justify-center items-center font-bold rounded-xl h-12 w-24 inset-0 shadow-lg transition-all text-white">
          <div>Sign In</div>
        </div>
      </div>
    </header>
  );
}
