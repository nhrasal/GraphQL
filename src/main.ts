import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { utilities, WinstonModule } from 'nest-winston';
import * as path from 'path';
import { format, transports } from 'winston';
import { AppModule } from './app.module';
import { ENV } from './ENV';

const PORT = ENV.port || 8001;
const API_PREFIX = ENV.API_PREFIX;

const fileTransport = !ENV.isDevelopment
  ? [
      new transports.File({
        format: format.combine(
          utilities.format.nestLike(),
          format.json(),
          format.timestamp(),
        ),
        filename: ENV.logFilePath,
      }),
    ]
  : [];

const appOptions: NestApplicationOptions = {
  cors: true,
  logger: WinstonModule.createLogger({
    exitOnError: true,

    transports: [
      new transports.Console({
        format: format.combine(utilities.format.nestLike()),
      }),
      ...fileTransport,
    ],
  }),
};
async function bootstrap() {
  const app: any = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix(API_PREFIX);

  // app.useStaticAssets(path.join(__dirname, '../uploads'));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
