import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TokenGeneratorPayload } from 'src/@types/token.types';
import { BcryptHelper } from 'src/helper/bcrypt.helper';
import { JWTHelper } from 'src/helper/jwt.helper';
import { User } from '../users-mongos/entities/user.entity';
import { UsersService } from '../users-mongos/users.service';
import { LoginInput } from './dto/loginUser.input';
import { LoginResponse } from './dto/loginUser.response';
@Resolver(() => User)
export class AuthResolver {
  jwtHelper = new JWTHelper();
  bcryptHelper = new BcryptHelper();

  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);

    if (!user) throw new NotFoundException('User not found!');

    if (!user.isActive)
      throw new BadRequestException('User has been deactivated!');

    const isValidPassword = await this.bcryptHelper.compareHash(
      loginInput.password,
      user.password,
    );

    if (!isValidPassword) throw new BadRequestException('Credential not match');

    const tokenPayload: TokenGeneratorPayload = {
      id: user.id,
      email: user.email,
    };

    const token: any = await this.jwtHelper.generateAccessToken(tokenPayload);

    const refreshToken = await this.jwtHelper.generateRefreshToken(
      tokenPayload,
    );
    return {
      email: loginInput.email,
      accessToken: token?.token,
      refreshToken: refreshToken?.token,
    };
  }

  @Mutation(() => User)
  logout(@Args('_id', { type: () => String }) id: string) {
    // return this.usersService.remove(id);
  }
}
