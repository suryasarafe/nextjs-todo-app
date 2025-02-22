import CreateTaskContainer from "@/components/create-task-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Task",
  description: "Page for creating Task"
}

export default async function EditTaskPage() {
  return <section>
    <CreateTaskContainer />
  </section>
}
