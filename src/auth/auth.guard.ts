import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTHelper } from 'src/helper/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!request.headers['authorization'] || !token || token == null)
      throw new UnauthorizedException('No Token Added! 💔');

    // const payload = await getPayloadFromToken(token);

    request.user = {};

    return request;
  }
}

async function getPayloadFromToken(token: string): Promise<any> {
  try {
    const jwtHelper = new JWTHelper();
    const payload = await jwtHelper.decodeToken(token);
    return payload;
  } catch (error) {
    throw new UnauthorizedException('Invalid Token! 💩');
  }
}
