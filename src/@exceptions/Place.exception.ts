import { HttpException, HttpStatus } from '@nestjs/common';

export class PlaceException extends HttpException {
  constructor(message: string, status = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}
