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
    example: {
      updatedAt: '2021-07-10T07:31:51.095Z',
      createdAt: '2021-07-09T12:09:03.565Z',
      priority: 1,
      description: 'メグミルク',
      id: '5672a87d-5129-4987-a579-fde08a8c5d41',
      isCompleted: false,
      title: '牛乳を買ってくる',
    },
    description: 'タスク詳細データ',
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
    example: [
      {
        createdAt: '2021-07-10T08:52:01.696Z',
        priority: 0,
        id: 'bbeff447-6b94-402d-8961-7ab44e9f6fc7',
        updatedAt: '2021-07-10T08:52:01.696Z',
        title: '卵を買ってくる',
        description: '',
        isCompleted: false,
      },
      {
        updatedAt: '2021-07-10T07:31:51.095Z',
        createdAt: '2021-07-09T12:09:03.565Z',
        priority: 1,
        description: 'メグミルク',
        id: '5672a87d-5129-4987-a579-fde08a8c5d41',
        isCompleted: false,
        title: '牛乳を買ってくる',
      },
    ],
    type: [Task],
    description: 'タスク詳細データの配列',
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
    example: 'Successfully removed.',
    description: 'メッセージ',
    type: String,
  })
  data: string;
}
