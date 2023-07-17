import {IsString, IsNotEmpty, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
	email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string

    @IsString()
    @IsNotEmpty()
    avatar: string
	
}