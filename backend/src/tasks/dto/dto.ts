import { IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 140, { message: '140文字以内で入力してください' })
  readonly title: string;
}
