import { Controller, Inject, Logger } from '@nestjs/common';
import { EmailsService } from '../../emails/services/emails.service';
import {
  AmqpConnection,
  RabbitPayload,
  RabbitRPC,
} from '@golevelup/nestjs-rabbitmq';
import { Auth, Otps } from '@demo-chat/shared';

@Controller()
export class AuthEvents {
  private readonly logger = new Logger(AuthEvents.name);

  constructor(
    @Inject(EmailsService) private readonly emailsService: EmailsService,
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @RabbitRPC({
    exchange: Auth.AuthSignUpEventContract.exchange.auth.name,
    routingKey: Auth.AuthSignUpEventContract.routing.signUpEvent.name,
    queue: Auth.AuthSignUpEventContract.queue.emails.name,
    queueOptions: Auth.AuthSignUpEventContract.queue.emails.options,
  })
  public async signUp(
    @RabbitPayload() args: Auth.AuthSignUpEventContract.Request
  ): Promise<Auth.AuthSignUpEventContract.Response> {
    this.logger.log(`Sign up ${JSON.stringify(args)}`);

    // Generate otp code
    const { code } =
      await this.amqpConnection.request<Otps.OtpsGenerateCommandContract.Response>(
        {
          exchange: Otps.OtpsGenerateCommandContract.exchange.otps.name,
          routingKey: Otps.OtpsGenerateCommandContract.routing.generate.name,
          payload: {
            key: args.email,
          } as Otps.OtpsGenerateCommandContract.Request,
        }
      );

    // Send email with otp to user email
    await this.emailsService.sendEmail({
      to: args.email,
      subject: 'Confirm Sign Up Otp Code',
      text: `Welcome!`,
      html: `Otp Code: ${code}`,
    });
  }

  @RabbitRPC({
    exchange: Auth.AuthSignInEventContract.exchange.auth.name,
    routingKey: Auth.AuthSignInEventContract.routing.signInEvent.name,
    queue: Auth.AuthSignInEventContract.queue.emails.name,
    queueOptions: Auth.AuthSignInEventContract.queue.emails.options,
  })
  public async signIn(
    @RabbitPayload() args: Auth.AuthSignInEventContract.Request
  ): Promise<Auth.AuthSignInEventContract.Response> {
    this.logger.log(`Sign in ${JSON.stringify(args)}`);

    // Generate otp code
    const { code } =
      await this.amqpConnection.request<Otps.OtpsGenerateCommandContract.Response>(
        {
          exchange: Otps.OtpsGenerateCommandContract.exchange.otps.name,
          routingKey: Otps.OtpsGenerateCommandContract.routing.generate.name,
          payload: {
            key: args.email,
          } as Otps.OtpsGenerateCommandContract.Request,
        }
      );

    // Send email with otp to user email
    await this.emailsService.sendEmail({
      to: args.email,
      subject: 'Confirm Sign In Otp Code',
      text: `Welcome back again!`,
      html: `Otp Code: ${code}`,
    });
  }
}
