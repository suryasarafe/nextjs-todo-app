import EditTaskContainer from "@/components/edit-task-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Task",
  description: "Page for editing Task"
}

export default async function EditTaskPage() {
  return <section>
    <EditTaskContainer />
  </section>
}
