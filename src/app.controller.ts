import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from './authGuards/auth-guard';
import { User } from './decorators/user.decorator';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('user')
  async createUser(@Body() user: CreateUserDto) {
    return await this.appService.createUser(user);
  }

  @Post('signin')
  async signin(@Body() signinUser: SigninUserDto){
    return await this.appService.signin(signinUser)
  }

  @UseGuards(AuthGuard)
  @Post('publication')
  async createPublication(@Body() publication: CreatePublicationDto, @User() user){
    return await this.appService.createPublication(publication, user.id)
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  async getPublications(@User() user){
    return await this.appService.getAllPublications(user.id)
  }
}
