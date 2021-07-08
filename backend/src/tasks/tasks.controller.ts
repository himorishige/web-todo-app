import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'create Task' })
  @ApiResponse({
    status: 200,
    description: 'created success',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'found records',
    type: [Task],
  })
  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksService.findAll();

    if (!tasks.length) {
      throw new NotFoundException(`No tasks found`);
    }

    return tasks;
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'found record',
    type: Task,
  })
  async findOne(@Param() { id }: any): Promise<Task> {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }
}
