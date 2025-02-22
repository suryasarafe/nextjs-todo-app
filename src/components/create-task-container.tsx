"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task, TaskStatus } from "@prisma/client";
import Cookies from "js-cookie";

export default function CreateTaskContainer() {
  const router = useRouter();

  const [task, setTask] = useState<Task>(
    {
      title: '',
      description: '',
      notes: '',
      status: "NOT_STARTED",
    } as Task
  );

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token!);
    setLoading(false);
  }, []);

  const handleSubmit = async () => {
    const res = await fetch(`/api/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      router.push("/home");
    } else {
      alert("Failed to Create task");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>

      <label>Title</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <label>Description</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        value={task.description ?? ''}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <label>Notes</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        value={task.notes ?? ''}
        onChange={(e) => setTask({ ...task, notes: e.target.value })}
      />

      <label>Status</label>
      <select
        className="w-full p-2 border mb-4"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value as TaskStatus })}
      >
        <option value={TaskStatus.NOT_STARTED}>Not Started</option>
        <option value={TaskStatus.ON_PROGRESS}>On Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
        <option value={TaskStatus.REJECT}>Reject</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>
        Create Task
      </button>
    </div>
  );
}
