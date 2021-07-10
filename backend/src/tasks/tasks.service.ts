import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { TasksRepository } from 'src/repositories/tasks.repository';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

let dynamoDB: AWS.DynamoDB.DocumentClient;
if (process.env.IS_OFFLINE === 'true') {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: process.env.DYNAMODB_ENDPOINT,
  });
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

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
