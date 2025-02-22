"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/home" className="mr-4">
          <h1 className="text-xl font-bold">To-Do App</h1>
        </Link>
        <nav>
          <Link href="/home" className="mr-4 hover:underline">
            Tasks
          </Link>
          <Link href="/logout" className="hover:underline">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
