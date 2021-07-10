import { Injectable } from '@nestjs/common';
import { TasksRepository } from './repositories/tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto) {
    const createTask = await this.tasksRepository.create(createTaskDto);
    return createTask;
  }

  async findAll() {
    const findAllTasks = await this.tasksRepository.findAll();
    return findAllTasks;
  }

  async findOne(id: string) {
    const findOneTask = await this.tasksRepository.findOne(id);
    return findOneTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksRepository.update(id, updateTaskDto);
    return updatedTask;
  }

  async remove(id: string) {
    const removedTask = await this.tasksRepository.remove(id);
    return removedTask;
  }
}
