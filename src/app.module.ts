import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { PrismaAppRepository } from './repository/implementations/prismaApp.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService, PrismaAppRepository],
})
export class AppModule {}
