import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ENV } from 'src/ENV';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = ENV;

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: false,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Place Dev" <dev@place.com>',
      },
    }),
  ],
})
export class CustomMailerModule {}
