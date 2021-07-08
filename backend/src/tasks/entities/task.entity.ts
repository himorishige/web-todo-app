import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class Task {
  @ApiProperty({ example: uuid(), description: 'ID', type: String })
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
    example: new Date('2021-1-1').toLocaleDateString(),
    description: '作成日',
    type: String,
  })
  createdAt: string;
}
