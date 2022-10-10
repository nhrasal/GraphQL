import { config } from 'dotenv';
import * as path from 'path';
export function toBool(value: string): boolean {
  return value === 'true';
}
config({
  path: path.join(process.cwd(), `${process.env.NODE_ENV || 'dev'}.env`),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV = {
  APP_ENV: process.env.APP_ENV,
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  logFilePath: process.env.LOG_FILE_PATH || 'logs/place.log',
  OTP_Timeout: process.env.OTP_Timeout,

  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,
  APP_URL: process.env.APP_URL,

  // hash salt
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  BASE_URL: process.env.BASE_URL,

  // throttle configuration
  THROTTLE_TTL: +process.env.THROTTLE_TTL || 60,
  THROTTLE_LIMIT: +process.env.THROTTLE_LIMIT || 100,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: parseInt(process.env.MAIL_PORT),
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS || 'noreply@jamiitech.com',

  // jwt token configuration
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_TOKEN_ALGORITHM: process.env.JWT_ACCESS_TOKEN_ALGORITHM,
  JWT_ACCESS_TOKEN_EXPIRE_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  JWT_REFRESH_TOKEN_ALGORITHM: process.env.JWT_REFRESH_TOKEN_ALGORITHM,
  JWT_REFRESH_TOKEN_EXPIRE_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,

  //  QUEUE ATTEMPTS
  QUEUE_ATTEMPTS: process.env.QUEUE_ATTEMPTS || 5,
  QUEUE_DELAY: process.env.QUEUE_DELAY || 5000,
  QUEUE_BACKOFF: process.env.QUEUE_BACKOFF || 5000,
  QUEUE_TIMEOUT: process.env.QUEUE_TIMEOUT || 300000,

  Redis: {
    tls: toBool(process.env.BULL_REDIS_TLS) ? {} : null,
    host: process.env.BULL_REDIS_HOST,
    port: +process.env.BULL_REDIS_PORT,
    username: process.env.BULL_REDIS_USERNAME,
    password: process.env.BULL_REDIS_PASSWORD,
  },

  DB: {
    type: 'mongodb',
    host: process.env.ORM_HOST || 'localhost',
    port: +process.env.ORM_PORT,
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    database: process.env.ORM_DATABASE,
    synchronize: process.env.ORM_SYNCHRONIZE,
    logging: process.env.ORM_LOGGING,
  },
};

export const ormConfig: any = {
  type: ENV.DB.type,
  host: ENV.DB.host,
  port: +ENV.DB.port,
  username: ENV.DB.username,
  password: ENV.DB.password,
  database: 'test',

  synchronize: toBool(ENV.DB.synchronize),
  logging: toBool(ENV.DB.logging),
};
