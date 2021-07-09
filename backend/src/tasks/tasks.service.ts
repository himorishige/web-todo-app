import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
    {
      id: '1',
      title: '牛乳を買ってくる',
      isCompleted: false,
      createdAt: new Date('2021-1-1'),
    },
  ];

  async create(inputTask: CreateTaskDto): Promise<Task> {
    const task: Task = {
      id: uuid(),
      title: inputTask.title,
      isCompleted: inputTask.isCompleted,
      createdAt: new Date(Date.now()),
    };
    this.tasks.push(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  async update(inputTask: Task): Promise<Task> {
    const target = await this.findOne(inputTask.id);
    if (target === null) {
      throw new NotFoundException(`Task not found. id: ${inputTask.id}`);
    }

    const index = this.tasks.findIndex((task) => task.id === target.id);
    this.tasks.splice(index, 1);
    const task: Task = { ...inputTask };
    this.tasks.push(task);
    return task;
  }

  async delete(id: string) {
    this.tasks.filter((task) => task.id !== id);
    return id;
  }
}
