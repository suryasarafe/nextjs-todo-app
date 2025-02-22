"use client";

import { Tasks } from "@/lib/interfaces";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function AssignTaskContainer() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    fetch("/api/task", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));

    fetch("/api/user", {
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleAssign = async () => {
    if (!selectedTask || !selectedUser) return alert("Select both task and user");

    const res = await fetch(`/api/task/${selectedTask}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTo: selectedUser }),
    });

    if (res.ok) {
      alert("Task assigned successfully!");
    } else {
      alert("Failed to assign task");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Assign Task</h2>

      <label className="block mb-2">Select Task:</label>
      <select
        className="w-full p-2 border mb-4"
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="">-- Select Task --</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <label className="block mb-2">Assign To:</label>
      <select
        className="w-full p-2 border mb-4"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Assign Task
      </button>
    </div>
  );
}
