import AssignTaskContainer from "@/components/assign-task"
import EditTaskContainer from "@/components/edit-task-container"
import { Metadata } from "next"
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Edit Task",
  description: "Page for editing Task"
}

export default async function EditTaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const result = await fetch(
    `${process.env.API_URL}/api/task/${taskId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader
      }
    }
  );
  if (!result.ok) {
    return <p>No Data</p>
  }

  const data = await result.json();
  const role = cookieStore.get("role")?.value;
  return <section>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 p-4">
        <EditTaskContainer givenTask={data.tasks} />
      </div>

      {
        role == 'LEAD' ?
          <div className="flex-1 p-4">
            <AssignTaskContainer givenTask={data.tasks} />
          </div> : null
      }
    </div>
  </section>
}
