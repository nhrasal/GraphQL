import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseLogger } from '../@logger/Base.logger';
import { getNewLogger } from '../@logger/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: BaseLogger = getNewLogger('AllExceptionsFilter');

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception.message, exception);
  }
}
