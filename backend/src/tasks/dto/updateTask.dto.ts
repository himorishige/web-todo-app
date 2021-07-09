import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './createTask.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
