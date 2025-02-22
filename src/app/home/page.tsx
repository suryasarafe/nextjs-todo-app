import { Metadata } from "next";
import TaskContainer from "../../components/task-container";
import AssignTaskContainer from "@/components/assign-task";
import { cookies } from "next/headers";
import FloatingButton from "@/components/floating-button";

export const metadata: Metadata = {
  title: "Home",
  description: "you see the Todo App home screen, you need to login or register to continue."
}


export default async function HomePage() {
  const cookieStore = cookies();
  const role = (await cookieStore).get("role")?.value;

  return <section>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 p-4">
        <TaskContainer />
      </div>

      {role == "LEAD" && (
        <div className="flex-1 p-4">
          <div>
            <AssignTaskContainer />
          </div>
          <FloatingButton />
        </div>
      )}
    </div>
  </section>
}
