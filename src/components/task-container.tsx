"use client";

import { Tasks } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TaskStatus } from "@prisma/client";


export default function TaskContainer() {
  const checkColor = (status: string): string => {
    switch (status) {
      case TaskStatus.NOT_STARTED:
        return 'text-gray-600 font-bold';
      case TaskStatus.ON_PROGRESS:
        return 'text-blue-600 font-bold';
      case TaskStatus.DONE:
        return 'text-green-600 font-bold';
      case TaskStatus.REJECT:
        return 'text-red-600 font-bold';

      default:
        return 'bg-transparent';
    }
  }
  const [tasks, setTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");

    fetch("/api/task", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks || []));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Task List</h2>
      <ul className="mt-4">
        {tasks.map((task) => (
          <Link key={task.id} href={'/home/' + task.id} className="hover:scale-125">
            <li key={task.id} className="p-2 border-b flex justify-center">
              <div className="flex-1">
                <strong>{task.title}</strong>
              </div>
              <div className="flex-1">
                <span className={`${checkColor(task.status)} w-30`}>
                  {task.status}
                </span>
              </div>
              <div className="flex-1">
                {task.assignedTo ? `Assigned to: ${task.assignedTo.username}` : "Unassigned"}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
