export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponseType<T> = {
  status: string;
  data: T;
};
