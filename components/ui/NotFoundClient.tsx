"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BackgroundBeams = dynamic(
  () =>
    import("@/components/ui/background-beams").then(
      (m) => m.BackgroundBeams
    ),
  { ssr: false }
);

export default function NotFoundClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
          404
        </h1>

        <p className="text-neutral-500 mt-4 text-sm">
          The page you're looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 text-sm text-neutral-300 hover:text-white transition"
        >
          We will redirect you back shortly. Click this text if not.
        </Link>
      </div>

      <BackgroundBeams />
    </div>
  );
}
