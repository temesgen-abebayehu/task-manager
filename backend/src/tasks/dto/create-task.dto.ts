import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, MinLength } from 'class-validator';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Title must not be empty' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
