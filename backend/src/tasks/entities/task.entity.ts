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

  @ApiProperty({ example: false, description: '完了フラグ', type: Boolean })
  isCompleted: boolean;

  @ApiProperty({
    example: new Date('2021-1-1'),
    description: '作成日',
    type: Date,
  })
  createdAt: Date;
}
