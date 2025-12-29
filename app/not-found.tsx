import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
        404
      </h1>

      <p className="text-neutral-500 mt-4 text-sm">
        The page you’re looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 text-sm text-neutral-300 hover:text-white transition"
      >
        ← Go back home
      </Link>
    </div>
  );
}
