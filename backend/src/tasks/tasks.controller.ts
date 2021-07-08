import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Task,
  })
  getTasks(): Task[] {
    return this.tasksService.findAll();
  }
}
