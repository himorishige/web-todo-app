import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class ResponseTaskDto {
  @ApiProperty({
    example: 'ok',
    description: '取得ステータス',
    type: String,
  })
  status: string;

  @ApiProperty({
    type: Task,
  })
  data: Task;
}

export class ResponseTasksDto {
  @ApiProperty({
    example: 'ok',
    description: '取得ステータス',
    type: String,
  })
  status: string;

  @ApiProperty({
    type: [Task],
  })
  data: Task[];
}

export class ResponseRemoveTaskDto {
  @ApiProperty({
    example: 'ok',
    description: '取得ステータス',
    type: String,
  })
  status: string;

  @ApiProperty({
    type: String,
  })
  data: string;
}
