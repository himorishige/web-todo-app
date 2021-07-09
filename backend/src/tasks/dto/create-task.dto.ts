import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '牛乳を買ってくる',
    description: 'タスク名',
    type: String,
  })
  title: string;

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
