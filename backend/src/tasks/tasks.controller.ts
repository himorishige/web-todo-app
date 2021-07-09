import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseTaskDto, ResponseTasksDto } from './dto/response-task.dto';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Successfully created.',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Create a Task.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);

    return { status: 'ok', data: task };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Found the records.',
    type: ResponseTasksDto,
  })
  @ApiOperation({ summary: 'Get a list of tasks.' })
  async findAll() {
    const tasks = await this.tasksService.findAll();

    return { status: 'ok', data: tasks };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Found the record.',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Get a single task.' })
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    return { status: 'ok', data: task };
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated.',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Update the task with the specified ID.' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(id, updateTaskDto);

    return { status: 'ok', data: task };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted.',
    type: ResponseTaskDto,
  })
  @ApiOperation({ summary: 'Remove the task with the specified ID.' })
  async remove(@Param('id') id: string) {
    const task = await this.tasksService.remove(id);

    return { status: 'ok', data: task };
  }
}
