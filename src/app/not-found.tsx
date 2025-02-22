import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Page youre looking for cannot be found or have been moved',
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-4">404</h1>
        <h2 className="text-xl font-bold text-center mb-4">Page not found</h2>

        <p className="text-black mt-4 px-14">
          Page youre looking for cannot be found or have been moved
        </p>
        <div className="m-4 mt-16 text-center">
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
