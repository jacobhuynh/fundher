"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Hand from "../assets/hand.png";

export function Hero() {
  return (
    <div className="h-screen border-b-2 border-gray-300 flex items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-300">
      <div className="relative flex w-full max-w-7xl mx-auto px-6 items-center justify-between">
        <div className="w-[735px]">
          <h1 className="text-6xl font-bold tracking-tight">
            Apply for <span className="text-indigo-600">Women's</span>{" "}
            Scholarships and Grants with Ease
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore a curated list of funding opportunities and unlock new
            possibilities for your education and career.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/register">
              <div className="rounded-xl shadow-lg bg-white h-14 w-48 flex items-center justify-center border border-gray-300 font-bold transform-gpu transition duration-200 hover:scale-105  hover:shadow-[0_4px_12px_rgba(99,102,241,0.4)] focus:outline-none focus:ring-2 focus:ring-gray-100 active:scale-95">
                Join Us
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-end">
          <Image
            src={Hand}
            alt="Hand Illustration"
            className="w-[400px] h-[600px] object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="w-10 h-10 text-gray-400 animate-bounce" />
      </div>
    </div>
  );
}
