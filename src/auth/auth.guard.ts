import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWTHelper } from 'src/helper/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext();

    const authHeader = request.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || !token || token == null)
      throw new UnauthorizedException('No Token Added! 💔');

    const payload = await getPayloadFromToken(token);

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
