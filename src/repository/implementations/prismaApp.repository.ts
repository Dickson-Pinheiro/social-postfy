import { Injectable } from '@nestjs/common';
import { AppRepository } from '../app.Repository';
import { CreatePublicationDto } from '../../dto/create-publication.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaAppRepository implements AppRepository {
  constructor(
    private prismaService: PrismaService
  ){}
  async createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto
    })
  }
  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: true
      }
    })
  }
  async findUserById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        password: true
      }
    })
  }
  async createPublication({dateToPublish, image, socialMedia, text, title}: CreatePublicationDto, user_id: number) {
    return this.prismaService.publication.create({
      data: {
         dateToPublish: new Date(dateToPublish).toISOString(),
         image,
         socialMedia,
         text,
         title,
         user_id
      },
    })
  }
  async findPublicationByUserId(user_id: number) {
    return this.prismaService.publication.findMany({
      where: {
        user_id
      }
    })
  }
}
