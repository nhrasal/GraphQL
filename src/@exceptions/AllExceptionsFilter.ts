import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { BaseLogger } from '../@logger/Base.logger';
import { getNewLogger } from '../@logger/logger';
import { PlaceException } from './Place.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: BaseLogger = getNewLogger('AllExceptionsFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request = ctx.getRequest();
    let statusCode: number;
    let errorMessages: string[] = [exception.message];
    let message: string = exception.message;
    let msg: string;
    if (exception instanceof PlaceException) {
      msg = exception.message;
    } else if (exception instanceof ThrottlerException) {
      statusCode = exception.getStatus();
      msg = 'Unknown request';
    } else if (exception instanceof TypeError) {
      this.logger.error(exception.message, exception.stack, exception.name);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      if (exception.message) {
        errorMessages = [exception.message];
        message = exception.message;
      } else {
        errorMessages = ['internal server error'];
        message = 'internal server error';
      }
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      errorMessages =
        typeof res.message === 'string' ? [res.message] : res.message;
      message = typeof res.message === 'string' ? res.message : '';
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessages = errorMessages.length
        ? errorMessages
        : ['internal server error'];
    }

    this.logger.error(exception.message, exception);

    const res = {
      success: false,
      statusCode: statusCode,
      message: message || msg || 'something went wrong',
      errorMessages,
      // timestamp: new Date().toISOString(),
      // path: request.url,
      devMessage: 'something went wrong',
    };
    // TODO::redirect to url need to handle properly
    if (
      (request.originalUrl.search('password-verification') > 0 ||
        request.originalUrl.search('verify') > 0) &&
      statusCode === 503
    ) {
      response.status(301);
      return;
    }

    response.status(statusCode).json(res);
  }
}
