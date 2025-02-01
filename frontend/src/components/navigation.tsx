"use client";

import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Features
            </Link>
            <Link
              href="/about_us"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              About Us
            </Link>
          </nav>
        </div>
        <div className="text-sm flex justify-center items-center font-bold rounded-xl h-12 w-24 inset-0 shadow-lg border border-gray-300 transition-all hover:shadow-indigo-400 hover:scale-102">
          <div>Sign In</div>
        </div>
      </div>
    </header>
  );
}
