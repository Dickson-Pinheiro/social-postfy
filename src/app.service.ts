import { BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import { PrismaAppRepository } from './repository/implementations/prismaApp.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePublicationDto } from './dto/create-publication.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AppService {

  constructor(
    private appRepository: PrismaAppRepository,
    private JwtService: JwtService
    ){}
  

  async createUser( user: CreateUserDto) {
    const userWithEmail = await this.appRepository.findUserByEmail(user.email)
    if(userWithEmail) throw new ConflictException()
    const hashPassword = bcrypt.hashSync(user.password, 10)
    return await this.appRepository.createUser({...user, password: hashPassword})
  }

  async createPublication(publication: CreatePublicationDto, user_id: number) {
    return await this.appRepository.createPublication(publication, user_id)
  }

  async getAllPublications(user_id: number){
    return this.appRepository.findPublicationByUserId(user_id)
  }

  async getUserById(id: number){
    return this.appRepository.findUserById(id)
  }

  async signin(userLogin: SigninUserDto){
    const userWithEmail = await this.appRepository.findUserByEmail(userLogin.email)
    if(!userWithEmail) throw new ConflictException()
    const validPassword = bcrypt.compareSync(userLogin.password, userWithEmail.password)
    if(!validPassword) throw new ConflictException()
    const token = this.createToken(userWithEmail)
    return {token}
  }

  private createToken(user: User){
    return this.JwtService.sign({id: user.id}, { expiresIn: '3h'})
  }

  checkToken(token: string) {
    try {
      const data = this.JwtService.verify(token);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
