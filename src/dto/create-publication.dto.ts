import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsDateString()
  @IsNotEmpty()
  dateToPublish: Date;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;
}
