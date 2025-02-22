"use client";

import { Tasks } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export default function TaskContainer() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    
    fetch("/api/task", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => {
        setTasks([]);
        console.error("Error fetching tasks:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Task List</h2>
      <ul className="mt-4">
        {tasks.map((task) => (
          <Link key={task.id} href={'/home/' + task.id} className="hover:scale-125">
            <li key={task.id} className="p-2 border-b">
              <strong>{task.title}</strong> - {task.status}
              {task.assignedTo ? ` (Assigned to: ${task.assignedTo.username})` : " (Unassigned)"}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
