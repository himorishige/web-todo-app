import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './repositories/tasks.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksRepository, TasksService],
})
export class TasksModule {}
