import { Inject, Injectable } from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { MemberEntity } from '../entities/member.entity';
import { Members } from '@demo-chat/shared';

@Injectable()
export class MembersService {
  constructor(
    @Inject(MemberRepository) private readonly repository: MemberRepository
  ) {}

  public async create(args: Members.IMember) {
    const memberEntity = new MemberEntity({
      chatId: args.chatId,
      userId: args.userId,
    });
    return await this.repository.create(memberEntity);
  }

  public async findByUserId(userId: string) {
    return await this.repository.findMany({ userId });
  }

  public async findByChatId(chatId: string) {
    return await this.repository.findMany({ chatId });
  }
}
