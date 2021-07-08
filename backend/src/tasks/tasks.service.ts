import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
    {
      id: '1',
      title: '牛乳を買ってくる',
      createdAt: new Date().toLocaleDateString(),
      isCompleted: false,
    },
  ];

  async create(taskTitle: CreateTaskDto): Promise<Task> {
    const inputTask: Task = {
      id: uuid(),
      title: taskTitle.title,
      isCompleted: false,
      createdAt: Date.now().toLocaleString(),
    };
    this.tasks.push(inputTask);
    return inputTask;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}
