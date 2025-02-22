export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: string;
  notes: string;
  assignedTo: { username: string } | null;
  createdBy: { username: string } | null;
}