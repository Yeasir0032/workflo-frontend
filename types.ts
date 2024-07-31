type TaskItem = {
  // id: number;
  title: string;
  details: string;
  createdAt: number;
  deadline: string;
  priority: Priority;
};
interface TaskColumnDataType {
  id: number;
  status: TaskStatus;
  cards: TaskItem[];
}

type TaskStatus = "To do" | "In progress" | "Under review" | "Finished" | "";
type Priority = "Urgent" | "Medium" | "Low" | "";
