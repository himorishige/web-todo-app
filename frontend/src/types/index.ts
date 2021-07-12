export type Task = {
  id: string;
  title: string;
  description: string;
  priority: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponseType<T> = {
  status: string;
  data: T;
};

type AllKeyOf<T> = T extends never ? never : keyof T;
type Omit<T, K> = { [P in Exclude<keyof T, K>]: T[P] };
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type WithOptional<T, K extends AllKeyOf<T>> = T extends never
  ? never
  : Omit<T, K> & Optional<T, K>;
