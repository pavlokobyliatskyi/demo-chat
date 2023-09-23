import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesUploadPolicyInput } from './inputs/files.upload-policy.input';
import { Inject, UseGuards } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Files } from '@demo-chat/shared';
import { UploadPolicyType } from '../../../types';
import { AccessTokenGuard } from '../../../guards';

@Resolver()
export class FilesMutationsResolver {
  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection
  ) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => UploadPolicyType, {
    name: 'generateUploadPolicy',
    description: 'Generate a policy for uploading a file.',
  })
  public async generateUploadPolicy(
    @Args('args') args: FilesUploadPolicyInput
  ) {
    return await this.amqpConnection.request<Files.FilesGetPresignedPostPolicyQueryContract.Response>(
      {
        exchange:
          Files.FilesGetPresignedPostPolicyQueryContract.exchange.files.name,
        routingKey:
          Files.FilesGetPresignedPostPolicyQueryContract.routing
            .getPresignedPostPolicyQuery.name,
        payload: {
          name: args.name,
          size: args.size,
          type: args.type,
        } as Files.FilesGetPresignedPostPolicyQueryContract.Request,
      }
    );
  }
}
