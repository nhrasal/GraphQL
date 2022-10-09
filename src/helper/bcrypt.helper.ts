import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

@Injectable()
export class BcryptHelper {
  public async hashString(
    plainText: string,
    saltRounds: number = SALT_ROUNDS,
  ): Promise<string> {
    return hash(plainText, saltRounds);
  }

  public async compareHash(
    plainText: string,
    hashString: string,
  ): Promise<boolean> {
    return compare(plainText, hashString);
  }
}
