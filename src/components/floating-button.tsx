"use client";

import Link from "next/link";

export default function FloatingButton() {
  return (
    <Link
      href="/home/create"
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white 
                 p-4 rounded-full shadow-lg transition-all flex items-center justify-center"
    >
      <p className="text-xl">+</p>
    </Link>
  );
}
