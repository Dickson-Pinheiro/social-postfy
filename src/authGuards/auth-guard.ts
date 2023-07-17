import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly AppService: AppService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const token = authorization?.split(' ')[1];
      const data = this.AppService.checkToken(token);
      const user = await this.AppService.getUserById(Number(data.id));

      request.user = user;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}