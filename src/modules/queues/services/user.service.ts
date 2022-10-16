import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ENV } from 'src/ENV';
const { BASE_URL, API_PREFIX, MAIL_FROM_ADDRESS } = ENV;

@Processor('userQueue')
export class userQueueService {
  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  async OnQueueActive(job: Job<{ data: any }>) {
    console.log(`${job.name} - job active now`);
  }

  @OnQueueCompleted()
  async OnQueueCompletedEvent(job: Job<{ data: any }>) {
    console.log(`${job.name} - job done`);
    await job.remove();
  }

  @OnQueueFailed()
  async OnQueueFailed(job: Job<{ data: any }>) {
    return job;
  }

  @Process('accountVerification')
  async accountVerification(job: Job<{ data: any }>) {
    const requestData: any = job.data;
    try {
      await this.mailerService.sendMail({
        to: `"${requestData.firstName} ${requestData.lastName}" <${requestData.email}>`,
        from: `"Place" <${MAIL_FROM_ADDRESS}>`,
        subject: 'Account Verification :: Place',
        html: `<b>Welcome ${requestData.firstName} ${requestData.lastName}</b>
        <br />
        please click on the following link to verify your email: 
        <a clicktracking="off" href="${BASE_URL}${API_PREFIX}/customers/verify/${requestData.token}">Verify Account</a>
        `,
      });
    } catch (err) {
      console.log(err);
    }
  }
  @Process('accountVerificationComplete')
  async accountVerificationComplete(job: Job<{ data: any }>) {
    const requestData: any = job.data;
    try {
      await this.mailerService.sendMail({
        to: `"${requestData?.firstName} ${requestData?.lastName}" <${requestData?.email}>`,
        from: `"Place" <${MAIL_FROM_ADDRESS}>`,
        subject: 'Account Verification :: Place',
        html: `<b>Welcome ${requestData?.firstName} ${requestData?.lastName}</b>
            <br />
            You've activated your account. Next time you shop with us, log in for faster checkout.
            `,
      });
    } catch (err) {}
  }

  @Process('passwordResetMessage')
  async passwordResetMessage(job: Job<{ data: any }>) {
    const userData: any = job.data;

    try {
      await this.mailerService
        .sendMail({
          to: `"${userData?.firstName} ${userData?.lastName}" <${userData?.email}>`,
          from: `"Place" <${ENV.MAIL_FROM_ADDRESS}>`,
          subject: 'Password Reset  :: Place',
          html: `<b>Hello, ${userData?.firstName} ${userData?.lastName}</b>
          <br />
          Your password has been reset. Please try to login and continue to shopping.
          <br/>
          Thank you.
          `,
        })
        .then((res) => {
          console.log('Password Reset notification');
        })
        .catch((err) => {
          this.failedJobProcess(job.attemptsMade, job.name, err, userData);
        });
    } catch (err) {}
  }

  private async failedJobProcess(
    attempts: number,
    jobName: string,
    error: any,
    payload: any,
  ) {
    if (attempts !== 5) return;
    try {
      //   this.failedJob.add('failedJobStore', {
      //     queueName: 'userQueue',
      //     jobName: jobName,
      //     payload: payload,
      //     error: error,
      //   });
    } catch (err) {}
  }
}
