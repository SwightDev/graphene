"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
          ERROR
        </h1>

        <p className="text-neutral-500 max-w-lg mx-auto mt-4 text-sm text-center">
          It seems the site is currently experiencing an issue.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={reset}
            className="px-4 py-2 text-sm rounded bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Try again
          </button>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>
    </div>
  );
}
