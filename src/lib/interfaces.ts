export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: string;
  notes: string;
  assignedTo: { username: string } | null;
  createdBy: { username: string } | null;
}

export interface BaseResponse<T> {
  status: boolean;
  data: T;
  error?: string;
  message?: string;
}