import { IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(20, { message: 'Title must be at least 20 characters long' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(200, { message: 'Content must be at least 200 characters long' })
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Category must be at least 200 characters long' })
  category: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
