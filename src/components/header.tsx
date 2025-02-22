"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeaderComponent() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const user = localStorage.getItem("user");
      if (!user) {
        setError("Unauthorized. Please login.");
        return;
      }

      const { token } = JSON.parse(user);

      const res = await fetch("/api/task", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError("Failed to load tasks.");
        return;
      }

      const data = await res.json();
      setTasks(data);
    };

    // fetchTasks();
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">To-Do App</h1>
        <nav>
          <Link href="/tasks" className="mr-4 hover:underline">
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
