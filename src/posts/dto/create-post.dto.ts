import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostDto {
  @IsString()
  @MinLength(1)
  content: string;

  @Transform((params) => params.value.replace(/(\s*)/g, '').split(','))
  tag: string[];

  @IsString()
  location: string;
}
