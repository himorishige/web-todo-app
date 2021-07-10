import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40, {
    message: 'The name of the task should be no longer than 40 characters.',
  })
  @ApiProperty({
    example: '牛乳を買ってくる',
    description: 'タスク名',
    type: String,
  })
  title: string;

  @IsString()
  @MaxLength(140, {
    message: 'The name of the task should be no longer than 140 characters.',
  })
  @ApiProperty({
    example: 'メグミルク2本',
    description: 'タスク用メモ',
    type: String,
    nullable: true,
  })
  description?: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '優先度',
    type: Number,
  })
  priority: number;

  @IsBoolean()
  @ApiProperty({ example: false, description: '完了フラグ', type: Boolean })
  isCompleted: boolean;
}
