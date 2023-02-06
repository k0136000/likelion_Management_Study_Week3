import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class PatchPostDto {
  // @Transform((params) => {
  //   params.value.trim();
  // })
  //해당 유저가 db내 존재하는지 확인하는 유효성 검사 필요.
  @IsString()
  @MinLength(1)
  contentID: string;

  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(1)
  content: string;

  @IsString()
  @Transform((params) => params.value.replace(/(\s*)/g, '').split(','))
  tag: Array<string> = [];

  @Transform((params) => params.value.trim())
  @IsString()
  location: string;
}
