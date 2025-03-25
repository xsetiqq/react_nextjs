import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <Frown size={64} className="text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">
        Oops! We can&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
