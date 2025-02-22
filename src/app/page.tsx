"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">Simplify Your Tasks</h1>
        <p className="text-lg text-gray-600 mt-4">
          Manage tasks effortlessly with our collaborative To-Do App. Assign tasks, track progress, and stay productive.
        </p>
      </section>

      <section className="mt-8">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}
