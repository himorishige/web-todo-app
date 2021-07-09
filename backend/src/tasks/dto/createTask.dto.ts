import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '牛乳を買ってくる',
    description: 'タスク名',
    type: String,
  })
  title: string;

  @IsBoolean()
  @ApiProperty({ example: false, description: '完了フラグ', type: Boolean })
  isCompleted: boolean;

  @IsDate()
  @ApiProperty({
    example: new Date('2021-1-1'),
    description: '作成日',
    type: Date,
  })
  createdAt: Date;
}
