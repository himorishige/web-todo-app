import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class Task {
  @ApiProperty({ example: uuid(), description: 'ID' })
  id: string;

  @ApiProperty({ example: '牛乳を買ってくる', description: 'タスク名' })
  title: string;

  @ApiProperty({ example: false, description: '完了フラグ' })
  isCompleted: boolean;

  @ApiProperty({ example: new Date('2021-1-1'), description: '作成日' })
  createdAt: Date;
}
