import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({
    example: '4de93414-2332-4834-b94d-c99bbe7de92b',
    description: 'ID',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: '牛乳を買ってくる',
    description: 'タスク名',
    type: String,
  })
  title: string;

  @ApiProperty({
    example: 'メグミルクを2本',
    description: 'タスク用メモ',
    type: String,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: '優先度',
    type: Number,
  })
  priority: number;

  @ApiProperty({ example: false, description: '完了フラグ', type: Boolean })
  isCompleted: boolean;

  @ApiProperty({
    example: new Date('2021-1-1').toISOString(),
    description: '作成日時',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: new Date('2021-2-1').toISOString(),
    description: '更新日時',
    type: String,
  })
  updatedAt: string;
}
