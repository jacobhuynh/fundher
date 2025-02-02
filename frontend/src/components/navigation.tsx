"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg">fundHer.</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="relative transition-colors text-foreground hover:text-[#7c3aed] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7c3aed] after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="relative transition-colors text-foreground hover:text-[#7c3aed] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#7c3aed] after:transition-all after:duration-300 hover:after:w-full"
            >
              About Us
            </Link>
          </nav>
        </div>
        <a href="/sign_in" className="hidden md:flex">
          <div className="bg-indigo-600 text-sm flex justify-center items-center font-bold rounded-xl h-12 w-24 text-white shadow-xl transform-gpu transition duration-200 hover:scale-105 hover:bg-indigo-700 hover:shadow-[0_4px_12px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-95">
            Sign In
          </div>
        </a>
      </div>
    </header>
  );
}
