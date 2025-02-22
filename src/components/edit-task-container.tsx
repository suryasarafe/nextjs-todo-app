"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Task, TaskStatus } from "@prisma/client";
import Cookies from "js-cookie";

export default function EditTaskContainer({ givenTask }: { givenTask: Task | null }) {
  const router = useRouter();
  const { taskId } = useParams();


  const [task, setTask] = useState<Partial<Task>>({} as Task);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    setToken(token!);
    setRole(role!);

    if (givenTask != null) {
      setTask(givenTask!);
      setLoading(false);
    } else {
      fetch(`/api/task/${taskId}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setTask(data.tasks || {});
          setLoading(false);
        })

    }
  }, [taskId, givenTask]);

  const handleUpdate = async () => {
    if (!canEdit()) {
      delete task.title;
      delete task.description;
      delete task.assignedToId;
    }
    const res = await fetch(`/api/task/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      router.push("/home");
    } else {
      alert("Failed to update task");
    }
  };

  if (loading) return <p>Loading...</p>;

  const canEdit = () => {
    if (role == "LEAD") {
      return true;
    } else {
      return false;
    }
  }

  if (!task) {
    return <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Task Not found</h2>
    </div>
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <label>Title</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        readOnly={!canEdit()}
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <label>Description</label>
      <input
        type="text"
        className="w-full p-2 border mb-4"
        readOnly={!canEdit()}
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

      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpdate}>
        Update Task
      </button>
    </div>
  );
}
